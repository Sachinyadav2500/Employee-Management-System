import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave,getLeave ,getLeaves ,getLeaveDetails ,updateLeave} from '../controller/leaveController.js'

const router= express.Router()

router.post('/add' , authMiddleware , addLeave)
router.get('/detail/:id' , authMiddleware , getLeaveDetails)
router.get('/:id/:role' , authMiddleware , getLeave)
router.get('/' , authMiddleware , getLeaves)
router.put('/:id' , authMiddleware , updateLeave)

export default router