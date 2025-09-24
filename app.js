console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { User, RoomMessage } = require('./models');
const cors = require('cors');
const multer = require('multer');
const express = require('express');
const UserController = require('./controllers/UserController');
const PackageController = require('./controllers/PackageController');
const { errorHandling } = require('./middlewares/errorHandling');
const { authentication } = require('./middlewares/authentication');
const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { createServer } = require('http');
const { Server } = require('socket.io');
const { verifyToken } = require('./helpers/jwt');
const { TransactionController } = require('./controllers/TransactionController');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', async (socket) => {
  const access_token = socket.handshake.auth.access_token;
  if (!access_token) {
    console.log('No access token provided');
    return;
  }
  const payload = verifyToken(access_token);
  const user = await User.findByPk(payload.id);
  const roomId = socket.handshake.auth.roomId;
  const prev = await RoomMessage.findAll({
    where: { RoomId: roomId },
    include: { model: User },
    order: [['createdAt', 'ASC']],
  });

  io.emit(`travel:${roomId}`, prev);

  socket.on('chat_message', async (msg) => {
    console.log(msg);

    await RoomMessage.create({
      SenderId: user.id,
      RoomId: roomId,
      message: msg.message,
    });

    const data = await RoomMessage.findAll({
      where: { RoomId: roomId },
      include: { model: User },
      order: [['createdAt', 'ASC']],
    });

    io.emit(`travel:${roomId}`, data);
  });
});

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.use(authentication);
app.get('/profile',  UserController.getProfile);
app.get('/packages', PackageController.getPackageList);
app.get('/packages/:id', PackageController.getPackageById);
app.post('/buys/:packagesId', TransactionController.createTransaction);
app.patch(
  '/profile/image',
  upload.single('ImageUrl'),
  UserController.patchImageUser
);

app.use(errorHandling);

httpServer.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
