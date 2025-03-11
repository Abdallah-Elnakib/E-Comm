import express, { Router } from 'express';
import {addNewProduct} from '../controllers/addNewProductControllers';
import {getAllProducts} from '../controllers/getAllProductsControllers';
import {getProductById} from '../controllers/getProductByIdControllers';
import {editProductById} from '../controllers/editProductByIdControllers';
import {deleteProductById} from '../controllers/deleteProductByIdControllers';
import {verifyAuth} from '../middleware/verifyAuth';

const router: Router = express.Router();





router.get("/all-products", getAllProducts)
router.get("/product/:id", getProductById)

// router.use(verifyAuth);

router.post("/add-new-product", addNewProduct)
router.put("/edit-product/:id", editProductById)
router.delete("/delete-product/:id", deleteProductById)



export default router;

