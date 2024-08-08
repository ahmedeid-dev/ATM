import { register, login } from "./user.controllers.js";
import { Router } from "express";

const userRouter = Router();
userRouter
    .post('/register', register)
    .post('/login', login)

// ! export userRouter
export default userRouter