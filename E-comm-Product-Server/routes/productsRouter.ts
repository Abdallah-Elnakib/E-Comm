import express, { Router } from 'express';
import {addNewProduct} from '../controllers/addNewProductControllers';
import {getAllProducts} from '../controllers/getAllProductsControllers';
import {getProductById} from '../controllers/getProductByIdControllers';
import {editProductById} from '../controllers/editProductByIdControllers';
import {deleteProductById} from '../controllers/deleteProductByIdControllers';
import {undeleteProductById} from '../controllers/unDeleteProductByIdControllers';
import {getProductRating} from '../controllers/getProductRatingControllers';

const router: Router = express.Router();





router.get("/all-products", getAllProducts)
router.get("/product/:id", getProductById)

router.post("/add-new-product", addNewProduct)
router.put("/edit-product/:id", editProductById)
router.delete("/delete-product/:id", deleteProductById)
router.patch("/undelete-product/:id", undeleteProductById)
router.get('/product/rating/:id', getProductRating)

export default router;

