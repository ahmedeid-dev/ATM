import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// ! Create User Schema
const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Username is required"]
    },
    password: String
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        versionKey: false
    })

// ! Encrypt User Password
userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10)
})
// ! Create User Model
const User = model("User", userSchema)

// ! Export User Model
export default User