"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addNewReviewControllers_1 = require("../controllers/addNewReviewControllers");
const getReviewByIdControllers_1 = require("../controllers/getReviewByIdControllers");
const getReviewByProductIdControllers_1 = require("../controllers/getReviewByProductIdControllers");
const deleteReviewByIdControllers_1 = require("../controllers/deleteReviewByIdControllers");
const router = express_1.default.Router();
router.post("/add-new-review", addNewReviewControllers_1.addNewReview);
router.get("/review/:id", getReviewByIdControllers_1.getReviewById);
router.get('/product/:id', getReviewByProductIdControllers_1.getReviewByProductId);
router.delete("/review/delete-review/:id", deleteReviewByIdControllers_1.deleteReviewById);
exports.default = router;
