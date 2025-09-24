console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { User } = require('./models');
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
  console.log(access_token);
  if (!access_token) {
    console.log('No access token provided');
    return;
  }
  const payload = verifyToken(access_token);
  const user = await User.findByPk(payload.id);

  socket.on('chat_message', (msg) => {
    console.log(msg);

    const messageData = {
      message: msg.message,
      sender: user,
      access_token: access_token,
      createdAt: new Date(),
    };
    console.log(messageData);

    io.emit('message_info', messageData);
  });
});

app.post('/register', UserController.register);
app.post('/login', UserController.login);
app.use(authentication);
app.get('/profile', authentication, UserController.getProfile);
app.get('/packages', PackageController.getPackageList);
app.get('/packages/:id', PackageController.getPackageById);
app.post('/buys/:packagesId', TransactionController.createTransaction);
app.patch(
  '/profile/image',
  authentication,
  upload.single('ImageUrl'),
  UserController.patchImageUser
);

app.use(errorHandling);

app.get('/packages', PackageController.getPackageList);
app.get('/packages/:id', PackageController.getPackageById);

httpServer.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
