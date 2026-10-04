import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please provide a name'],
            trim:true
        },
        email:{
            type:String,
            required:[true,'Please provide an email'],
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type: String,
            required:[true,'Please provide a password'],
            minlength:6,
            select:false
        },
        role:{
            type: String,
            enum:['student','teacher','admin'],
            default:'student'
        },
        phone:{
            type:String,
            trim:true
        },
        avatar:{
            type:String,
            default:''
        },
        walletBalance: {
            type: Number,
            default:0
        },

        teacherProfile:{
            bio:{type: String,default:''},
            qualifications: [{type: String}],
            subjects: [{type: String}],
            verificationStatus: {
                type: String,
                enum: ['pending','approved','rejected'],
                default:'pending'
            },
            hourlyRate: {type:Number,default:0},
            rating: {type:Number,default:5.0}
        },

        studentProfile: {
            grade: {type: String,default:''},
            school: {type: String,default: ''}
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre('save',async function (next){
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User', userSchema)

export default User;