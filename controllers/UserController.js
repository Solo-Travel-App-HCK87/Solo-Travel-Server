const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User} = require('../models')

class UserController{
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body)
            res.status(201).json({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
        } catch (error) {
            res.send(error)
            console.log(error, '<<< error register server')
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email) {
                throw ('Email is required')
            }

            if (!password) {
                throw ('Password is required')
            }

            const user = await User.findOne({where: {email}})

            if (!user) {
                throw ('Invalid email or password')
            }
            const isValidPassword = checkPassword(password, user.password)

            if (!isValidPassword) {
                throw ('Invalid email or password')
            }

            const access_token = signToken({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
            res.status(200).json({access_token})
        } catch (error) {
            res.send(error)
            console.log(error, '<<< error login server')
        }
    }
} 

module.exports = UserController