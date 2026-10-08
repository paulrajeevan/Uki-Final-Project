import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req,res) => {
    try {
        const {name,email,password,role,phone,grade,school,hourlyRate,subjects}=req.body

        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(400).json({message:'User already exists with this email'})
        }

        const userData = {
            name,
            email,
            password,
            role: role || 'student',
            phone
        }

        if (role === 'teacher'){
            userData.teacherProfile = {
                hourlyRate: hourlyRate || 0,
                subjects: subjects || [],
                verificationStatus: 'pending'
            }
        }

        if (role === 'student'){
            userData.studentProfile = {
                grade: grade || '',
                school: school || ''
            }
        }

        const user = await User.create(userData)

        if (user){
            const token = generateToken(res,user._id)

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token
            })
        }else{
            res.status(400).json({message: 'Invalid user data received'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const loginUser = async (req,res)=>{
    try{
        const {email,password}=req.body

        const user = await User.findOne({email}).select('+password')

        if (user && (await user.matchPassword(password))){
            const token = generateToken(res,user._id)

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email:user.email,
                role: user.role,
                token,
            })
        }else{
            res.status(401).json({message:'Invalid email or password'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getUserProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user._id)

        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({message: 'User not found'})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}