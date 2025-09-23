console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const cors = require('cors')
const express = require('express')
const UserController = require('./controllers/UserController');
const PackageController = require('./controllers/PackageController');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/register', UserController.register)
app.post('/login', UserController.login);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});






app.get('/packages', PackageController.getPackageList)
app.get('/packages/:id', PackageController.getPackageById)
