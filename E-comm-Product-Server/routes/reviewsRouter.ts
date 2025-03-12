import express, { Router } from 'express';
import {addNewReview} from '../controllers/addNewReviewControllers';
import {getReviewById} from '../controllers/getReviewByIdControllers';
import {getReviewByProductId} from '../controllers/getReviewByProductIdControllers';
import {deleteReviewById} from '../controllers/deleteReviewByIdControllers';

const router: Router = express.Router();



router.post("/add-new-review", addNewReview)
router.get("/review/:id", getReviewById)
router.get('/product/:id', getReviewByProductId)
router.delete("/review/delete-review/:id", deleteReviewById)

export default router;