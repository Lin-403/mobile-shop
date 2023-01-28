import mongoose from "mongoose";
import bcrypt from "bcryptjs"
 
// 用户信息模型
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false,
    },
},{
    timestamps:true
})

// 实现用户密码加密
// pre即在数据保存到数据库之前的操作
userSchema.pre("save",async function (next){
    // 判断密码是否有修改
    if(!this.isModified("password")){
        next();
    }
    // 有变化则需要将传递过来的数据进行加密处理
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

// 实现用户密码是否匹配
userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model("User",userSchema)

export default User