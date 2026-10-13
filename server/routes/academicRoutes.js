import express from 'express'
import { getAcademicHierarchy,createAcademicSubject,seedAcademicData } from '../controllers/academicController.js'

const router = express.Router()

router.get('/', getAcademicHierarchy)
router.post('/',createAcademicSubject)
router.post('/seed', seedAcademicData)

export default router