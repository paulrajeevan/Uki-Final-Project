import express from 'express'
import { getTeacherProfile, updateTeacherProfile } from '../controllers/teacherController.js'
import {protect, authorize} from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/profile')
router.get(protect, authorize('teacher'),getTeacherProfile)
router.put(protect, authorize('teacher'),updateTeacherProfile)

export default router;