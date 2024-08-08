import { model, Schema, Types } from "mongoose";

// ! create Transaction Schema
const transactionSchema = Schema({
    amount: String,
    type: {
        type: String,
        enum: ['deposit', 'withdraw']
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    account: {
        type: Types.ObjectId,
        ref: "Account"
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        versionKey: false
    })

// ! Create Transaction Model
const Transaction = model("Transaction", transactionSchema)

// ! Export Transaction Model
export default Transaction