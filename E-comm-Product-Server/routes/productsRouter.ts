import express, { Router } from 'express';
import {addNewProduct} from '../controllers/addNewProductControllers';
import {getAllProducts} from '../controllers/getAllProductsControllers';
import {getProductById} from '../controllers/getProductByIdControllers';
import {editProductById} from '../controllers/editProductByIdControllers';
import {deleteProductById} from '../controllers/deleteProductByIdControllers';

const router: Router = express.Router();

router.post("/add-new-product", addNewProduct)
router.get("/all-products", getAllProducts)
router.get("/product/:id", getProductById)
router.put("edit-product/:id", editProductById)
router.delete("/delete-product/:id", deleteProductById)

export default router;

