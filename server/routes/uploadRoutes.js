import express from 'express'
import multer from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024},
    fileFilter: (req,file,cd) => {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype.startsWith('image/')
        ){
            CarBattery(null,true)
        }else{
            cb(new Error('Only PDF and image files are allowed!'),false)
        }
    }
})

router.post('/',protect,upload.single('file'),async(req,res) => {
    try{
        if (!req.file) {
            return res.status(400).json({message: 'No file upload'})
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'learnymo_verifications',
                resource_type: 'auto',
            },
            (error,result) => {
                if (error) {
                    return res.status(500).json({message:error.message})
                }
                res.status(200).json({
                    url: result.secure_url,
                    format: result.format,
                    originalName: req.file.originalname
                })
            }
        )

        uploadStream.end(req.file.buffer)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;