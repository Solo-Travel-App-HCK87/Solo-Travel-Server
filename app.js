console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const cors = require('cors')
const multer = require('multer')
const express = require('express')
const UserController = require('./controllers/UserController');
const PackageController = require('./controllers/PackageController');
const { errorHandling } = require('./middlewares/errorHandling');
const app = express()
const port = 3001
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', UserController.register)
app.post('/login', UserController.login)
app.get('/users/:id', UserController.getUserById)
app.patch('/users/:id/image', upload.single('ImageUrl'), UserController.patchImageUser)
app.get('/packages', PackageController.getPackageList)
app.get('/packages/:id', PackageController.getPackageById)

app.use(errorHandling)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});






