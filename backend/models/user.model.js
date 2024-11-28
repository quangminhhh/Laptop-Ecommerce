import mongoose from "mongoose";
import bcrypt from "bcryptjs";  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true,"Email is required"],
    },
    password: {
        type: String,
        required: [true,"Password is required"],
        minlenght: [6,"Password must be at least 6 characters"],
    },
    cartItems:[{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    role: {
        type: String,
        enum: ["customer","admin"],
        default: "customer"
    },
    //createdAt, updatedAt
},
{
    timestamps: true
    
}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();

});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};


const User = mongoose.model("User",userSchema);
export default User