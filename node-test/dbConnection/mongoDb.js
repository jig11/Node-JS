const mongoose = require("mongoose");
require('dotenv').config();

async function connectDb()
{
    const MONGODB_CONNSTR = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/`;
    //console.log(MONGODB_CONNSTR);
    try{
        await mongoose.connect(MONGODB_CONNSTR,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("✅ Mongodb connected successfully !!!")
    }
    catch(err){
        console.log('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
}

module.exports = connectDb;