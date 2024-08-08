import catchError from "../../utils/catchError.js";
import appError from "../../utils/appError.js"
import jwt from 'jsonwebtoken';

// ! token middleware
const token = catchError((req, res, next) => {
    const token = req.headers.token

    if (!token) return next(new appError('Token not found', 401))

    const decoded = jwt.verify(token, 'secret')

    if (!decoded) return next(new appError('Invalid token', 401))

    req.user = token

    next()
})

// ! export token middleware
export default token