import User from '../models/User.js'

export const getPendingTeachers = async (req,res) => {
    try {
        const teachers= await User.find({
            role: 'teacher',
            'teacherProfile.verificationStatus': 'pending',
        }).select('-password')

        res.status(200).json(teachers)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

export const verifyTeacher = async (req,res) => {
    try {
        const {status} = req.body

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({message: "Status must be either 'approved' or 'rejected'"})
        }

        const teacher = await User.findById(req.params.id)

        if (!teacher || teacher.role !== 'teacher'){
            return res.status(404).json({message: 'Teacher not found'})
        }

        teacher.teacherProfile.verificationStatus = status
        await teacher.save()

        res.status(200).json({
            message: `Teacher verification ${status} successfully`,
            teacher: {
                _id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                verificationStatus: teacher.teacherProfile.verificationStatus
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}