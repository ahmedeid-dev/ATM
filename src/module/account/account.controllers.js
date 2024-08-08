import Transaction from '../../../database/model/transaction.model.js';
import Account from './../../../database/model/account.model.js';
import catchError from "../../../utils/catchError.js"
import appError from '../../../utils/appError.js';

// ! createAccount controller
const createAccount = catchError(async (req, res, next) => {
    const { balance } = req.body
    const { id } = req.user
    const account = await Account.create({ balance, user: id })
    res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: account
    })
})

// ! balance controller
const balance = catchError(async (req, res, next) => {
    const { id } = req.user
    const account = await Account.findOne({ user: id })
        .populate('User', 'username')

    if (!account) return next(new appError('Account not found', 404))

    res.status(200).json({
        success: true,
        message: 'Account balance fetched successfully',
        data: account
    })
})


// ! deposit controller
const deposit = catchError(async (req, res, next) => {
    const { id } = req.user
    const { amount } = req.body
    const account = await Account.findOne({ user: id })

    if (!account) return next(new appError('Account not found', 404))

    account.balance += amount

    const transaction = await Transaction.create({
        amount,
        type: 'deposit',
        createdBy: id,
        account: account._id
    })
    await account.save()

    res.status(200).json({
        success: true,
        message: 'Deposit successful',
        data: account
    })
})

// ! withdraw controller
const withdraw = catchError(async (req, res, next) => {
    const { id } = req.user
    const { amount } = req.body
    const account = await Account.findOne({ user: id })

    if (!account) return next(new appError('Account not found', 404))

    if (account.balance < amount) return next(new appError('Insufficient balance', 400))

    account.balance -= amount

    const transaction = await Transaction.create({
        amount,
        type: 'withdraw',
        createdBy: id,
        account: account._id
    })

    await account.save()

    res.status(200).json({
        success: true,
        message: 'Withdrawal successful',
        data: account
    })
})

// ! transactions controller
const transactions = catchError(async (req, res, next) => {
    const { id } = req.user
    const account = await Account.findOne({ user: id })

    if (!account) return next(new appError('Account not found', 404))

    const allTransactions = await Transaction.find({ account: account._id })
        .populate('createdBy', 'username')
        .populate('account', 'balance')

    res.status(200).json({
        success: true,
        message: 'Transactions fetched successfully',
        allTransactions
    })
})

// ! export controllers
export {
    balance,
    deposit,
    withdraw,
    transactions,
    createAccount,
}