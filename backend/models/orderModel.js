import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    orderItems:[{
        name:{
            type:String,
            required:true,
        },
        qty:{
            type:Number,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
            default:0,
        },
        // 关联到product表
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Product",
        }
    }],
    
    shippingAddress:{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        postalCode:{
            type:String,
            required:true,
        },
        province:{
            type:String,
            required:true,
        },
       
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentResult:{
        id:{type:String,},
        status:{type:String,},
        update_time:{type:String,},
        wechat_address:{type:String,},
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false,
    },
    deliveredAt:{type:Date},
    shippingPrice:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0,
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false,
    },
    paidAt:{type:Date},
},{
    timestamps:true
})

const Order=mongoose.model("Order",orderSchema)

export default Order