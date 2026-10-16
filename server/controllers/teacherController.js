import { use } from 'react'
import User from '../models/User.js'

export const getTeacherProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user || user.role !== 'teacher'){
            return res.status(403).json({message: 'Teacher profile not found'})
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateTeacherProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user || user.role !== 'teacher'){
            return res.status(403).json({message: 'Teacher profile not found'})
        }

        const {name, phone, headline, bio, qualifications, subjects, hourlyRate, experienceYears, verificationDocuments} = req.body

        if (name) user.name =name
        if (phone) user.phone = phone

        user.teacherProfile.headline = headline !== undefined ? headline : user.teacherProfile.headline
        user.teacherProfile.bio = bio !== undefined ? bio : user.teacherProfile.bio
        user.teacherProfile.hourlyRate = hourlyRate !== undefined ? Number(hourlyRate) : user.teacherProfile.hourlyRate
        user.teacherProfile.experienceYears = experienceYears !== undefined ? Number(experienceYears) : user.teacherProfile.experienceYears

        if (qualifications) user.teacherProfile.qualifications = qualifications
        if (subjects) user.teacherProfile.subjects = subjects
        if (verificationDocuments) user.teacherProfile.verificationDocuments = verificationDocuments

        if (verificationDocuments && verificationDocuments.length > 0 && user.teacherProfile.verificationStatus === 'rejected'){
            user.teacherProfile.verificationStatus = 'pending'
        }

        const updatedUser = await user.save()
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}