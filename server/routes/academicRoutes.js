import express from 'express'
import { getAcademicHierarchy,createAcademicSubject,seedAcademicData,updateAcademicSubject,deleteAcademicSubject } from '../controllers/academicController.js'

const router = express.Router()

router.get('/', getAcademicHierarchy)
router.post('/',createAcademicSubject)
router.post('/seed', seedAcademicData)

router.put('/:id',updateAcademicSubject)
router.delete('/:id', deleteAcademicSubject)

export default router