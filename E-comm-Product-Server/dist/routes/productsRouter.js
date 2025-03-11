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
const router = express_1.default.Router();
router.get("/all-products", getAllProductsControllers_1.getAllProducts);
router.get("/product/:id", getProductByIdControllers_1.getProductById);
// router.use(verifyAuth);
router.post("/add-new-product", addNewProductControllers_1.addNewProduct);
router.put("/edit-product/:id", editProductByIdControllers_1.editProductById);
router.delete("/delete-product/:id", deleteProductByIdControllers_1.deleteProductById);
exports.default = router;
