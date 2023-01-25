import mongoose from "mongoose";

// 连接数据库
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DB_URI,{
                useUnifiedTopology:true,
                useNewUrlParser:true,
                // useCreateIndex:false,
            })
        console.log(`Mongodb connected with server : ${conn.connection.host}`.green)
    }
    catch(error){
        console.log(`Error:${error.message}`.red)
        process.exit(1)
    }
}

export default connectDB;