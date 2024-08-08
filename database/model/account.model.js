import { model, Schema, Types } from "mongoose";

// ! Create Account Schema
const accountSchema = Schema({
    balance: String,
    user: {
        type: Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        versionKey: false
    })

// ! Create Account Model
const Account = model("Account", accountSchema)

// ! Export Account Model
export default Account