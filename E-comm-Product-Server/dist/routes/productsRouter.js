"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addNewProductControllers_1 = require("../controllers/addNewProductControllers");
const getAllProductsControllers_1 = require("../controllers/getAllProductsControllers");
const getProductByIdControllers_1 = require("../controllers/getProductByIdControllers");
const deleteProductByIdControllers_1 = require("../controllers/deleteProductByIdControllers");
const router = express_1.default.Router();
router.post("/add-new-product", addNewProductControllers_1.addNewProduct);
router.get("/all-products", getAllProductsControllers_1.getAllProducts);
router.get("/product/:id", getProductByIdControllers_1.getProductById);
router.delete("/delete-product/:id", deleteProductByIdControllers_1.deleteProductById);
exports.default = router;
