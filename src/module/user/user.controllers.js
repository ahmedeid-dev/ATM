import User from './../../../database/model/user.model.js';
import catchError from './../../../utils/catchError.js';
import appError from '../../../utils/appError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// ! register controller
const register = catchError(async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.create({ username, password })
    user.password =undefined
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    })
})

// ! login controller
const login = catchError(async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new appError('Incorrect username or password', 401))
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, "secret")
    user.password =undefined
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: user,
        token
    })
})

// ! export controllers
export {
    register,
    login
}