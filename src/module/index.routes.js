import accountRouter from "./account/account.routes.js"
import globalError from "../middleware/globalError.js"
import userRouter from "./user/user.routes.js"

const bootstrap = (app) => {
    app.get('/', (req, res, next) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to Task Manager'
        })
    })
    app.use("/users", userRouter)
    app.use("/accounts", accountRouter)
    app.use("*", (req, res, next) => {
        res.status(404).json({
            success: false,
            message: `Page not found ${req.originalUrl}`
        })
    })
    app.use(globalError)

}

export default bootstrap