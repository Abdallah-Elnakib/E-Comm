import express, { Router } from 'express';
import {addNewReview} from '../controllers/Product-Server/addNewReviewControllers';
import {getReviewById} from '../controllers/Product-Server/getReviewByIdControllers';
import {getReviewByProductId} from '../controllers/Product-Server/getReviewByProductIdControllers';
import {deleteReviewById} from '../controllers/Product-Server/deleteReviewByIdControllers';
import {verifyJWT} from '../middleware/verifyJwt';

const router: Router = express.Router();

router.get("/review/:id", getReviewById)
router.get('/product/:id', getReviewByProductId)

router.use(verifyJWT);

router.post("/add-new-review", addNewReview)
router.delete("/review/delete-review/:id", deleteReviewById)

export default router;