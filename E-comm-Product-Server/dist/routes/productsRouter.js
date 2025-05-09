"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addNewProductControllers_1 = require("../controllers/addNewProductControllers");
const getAllProductsControllers_1 = require("../controllers/getAllProductsControllers");
const getProductByIdControllers_1 = require("../controllers/getProductByIdControllers");
const editProductByIdControllers_1 = require("../controllers/editProductByIdControllers");
const deleteProductByIdControllers_1 = require("../controllers/deleteProductByIdControllers");
const unDeleteProductByIdControllers_1 = require("../controllers/unDeleteProductByIdControllers");
const getProductRatingControllers_1 = require("../controllers/getProductRatingControllers");
const checkRequestAuthentication_1 = require("../middleware/checkRequestAuthentication");
const router = express_1.default.Router();
router.use(checkRequestAuthentication_1.checkRequestAuthentication);
router.get("/all-products", getAllProductsControllers_1.getAllProducts);
router.get("/product/:id", getProductByIdControllers_1.getProductById);
router.post("/add-new-product", addNewProductControllers_1.addNewProduct);
router.put("/edit-product/:id", editProductByIdControllers_1.editProductById);
router.delete("/delete-product/:id", deleteProductByIdControllers_1.deleteProductById);
router.patch("/undelete-product/:id", unDeleteProductByIdControllers_1.undeleteProductById);
router.get('/product/rating/:id', getProductRatingControllers_1.getProductRating);
exports.default = router;
