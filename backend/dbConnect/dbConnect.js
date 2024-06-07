const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config({ path : "./config/config.env" });

const connectDatabase = async (req,res) => {
    try {
        await mongoose.connect("mongodb+srv://shreyansharipur:12345@cluster0.8ds2hha.mongodb.net/EditIt")
        console.log(" Connected to database ")
    } catch (error) {
        res.status(200).json({
            message : " Not connected to server "
        })
    }
}



module.exports = connectDatabase;

