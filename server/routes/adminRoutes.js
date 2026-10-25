import express from 'express'
import { getPendingTeachers, verifyTeacher } from '../controllers/adminController'
import {protect, authorize} from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('./teachers/pending', protect, authorize('admin'), getPendingTeachers)
router.put('/teachers/:id/verify', protect, authorize('admin'), verifyTeacher)

export default router;