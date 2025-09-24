const { checkPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class UserController {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (error) {
      next(error);
      console.log(error, '<<< error register server');
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        next({ name: 'isEmail' });
        return;
      }

      if (!password) {
        next({ name: 'isPassword' });
        return;
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        next({ name: 'Unauthorized', message: 'Invalid email or password' });
        return;
      }
      const isValidPassword = checkPassword(password, user.password);

      if (!isValidPassword) {
        next({ name: 'Unauthorized', message: 'Invalid email or password' });
        return;
      }

      const access_token = signToken({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        ImageUrl: user.ImageUrl,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
      console.log(error, '<<< error login server');
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = req.user;

      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        ImageUrl: user.ImageUrl,
        lastName: user.lastName,
        email: user.email,
      });
    } catch (error) {
      next(error);
      console.log(error, '<<< error get user by id server');
    }
  }

  static async patchImageUser(req, res, next) {
    try {

      if (!req.file) {
        next({ name: 'isImage' });
        return;
      }

      const base64Image = req.file.buffer.toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'Solo-Travel',
      });

      const user = await User.findByPk(req.user.id);
      if (!user) {
        next({ name: 'Unauthorized', message: 'User not found' });
        return;
      }

      await user.update({ ImageUrl: result.secure_url });
      res.status(200).json({ message: 'User image updated successfully' });
    } catch (error) {
      next(error);
      console.log(error, '<<< error patch user by id server');
    }
  }
}

module.exports = UserController;
