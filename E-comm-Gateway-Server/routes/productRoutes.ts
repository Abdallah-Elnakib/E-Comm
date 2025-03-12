import express, { Router } from 'express';
import {addNewProduct} from '../controllers/Product-Server/addNewProductControllers';
import {getAllProducts} from '../controllers/Product-Server/getAllProductsControllers';
import {getProductById} from '../controllers/Product-Server/getProductByIdControllers';
import {editProductById} from '../controllers/Product-Server/editProductByIdControllers';
import {deleteProductById} from '../controllers/Product-Server/deleteProductByIdControllers';
import {undeleteProductById} from '../controllers/Product-Server/unDeleteProductByIdControllers';
import {getProductRating} from '../controllers/Product-Server/getProductRatingControllers';

import {verifyJWT} from '../middleware/verifyJwt';

const router: Router = express.Router();


router.get("/all-products", getAllProducts)
router.get("/product/:id", getProductById)

router.use(verifyJWT);

router.post("/add-new-product", addNewProduct)
router.put("/edit-product/:id", editProductById)
router.delete("/delete-product/:id", deleteProductById)
router.patch("/undelete-product/:id", undeleteProductById)

router.get('/product/rating/:id', getProductRating)


export default router;