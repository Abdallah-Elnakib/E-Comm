"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addNewReviewControllers_1 = require("../controllers/Product-Server/addNewReviewControllers");
const getReviewByIdControllers_1 = require("../controllers/Product-Server/getReviewByIdControllers");
const getReviewByProductIdControllers_1 = require("../controllers/Product-Server/getReviewByProductIdControllers");
const deleteReviewByIdControllers_1 = require("../controllers/Product-Server/deleteReviewByIdControllers");
const verifyJwt_1 = require("../middleware/verifyJwt");
const router = express_1.default.Router();
router.get("/review/:id", getReviewByIdControllers_1.getReviewById);
router.get('/product/:id', getReviewByProductIdControllers_1.getReviewByProductId);
router.use(verifyJwt_1.verifyJWT);
router.post("/add-new-review", addNewReviewControllers_1.addNewReview);
router.delete("/review/delete-review/:id", deleteReviewByIdControllers_1.deleteReviewById);
exports.default = router;
