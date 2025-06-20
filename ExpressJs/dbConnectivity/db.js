const mongoose = require("mongoose");
const pinologger = require('../middleware/pinoMiddleware');
// require('dotenv').config();

async function connectDb()
{
    const MONGODB_CONNSTR = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SERVER}/`;
    try{
        await mongoose.connect(MONGODB_CONNSTR,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        pinologger.info("✅ Mongodb connected successfully !!!")
    }
    catch(err){
        pinologger.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    }
}

module.exports = connectDb;