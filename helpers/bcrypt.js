const bcrypt = require('bcryptjs')


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);

    if (typeof password === 'number') {
        password += ''
        return bcrypt.hashSync(password, salt);
    }
 
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {hashPassword, checkPassword}