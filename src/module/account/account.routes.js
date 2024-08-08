import token from "../../middleware/token.js";
import { Router } from "express";
import {
    createAccount,
    deposit,
    withdraw,
    balance,
    transactions
} from "./account.controllers.js";

const accountRouter = Router();
accountRouter.use(token)
accountRouter.get("/balance", balance)
accountRouter.post("/", createAccount)
accountRouter.post("/deposit", deposit)
accountRouter.post("/withdraw", withdraw)
accountRouter.get("/transactions", transactions)

// ! export accountRouter
export default accountRouter