import bcrypt from "bcryptjs";

const users=[
    {
        name:"Admin",
        email:"admin@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true,
    },
    {
        name:"Zhangsan",
        email:"zhangsan@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false,
    },
    {
        name:"Lisi",
        email:"lisi@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false,
    },


]

export default users