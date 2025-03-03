import express, { Router } from 'express';
import {addNewProduct} from '../controllers/addNewProductControllers';
import {getAllProducts} from '../controllers/getAllProductsControllers';

const router: Router = express.Router();

router.post("/add-new-product", addNewProduct)
router.get("/all-products", getAllProducts)
router.get("/product/:id")


export default router;

