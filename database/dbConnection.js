import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://localhost:27017/atm")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log(error);
    })


export default connection;