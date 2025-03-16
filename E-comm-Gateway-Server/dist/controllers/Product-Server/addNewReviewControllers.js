"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewReview = void 0;
const FetchAnotherServer_1 = require("../../utils/FetchAnotherServer");
const addNewReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_id, rating, review, reviewer_name, reviewer_email } = req.body;
        if (!product_id || !rating || !review || !reviewer_name || !reviewer_email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const response = yield (0, FetchAnotherServer_1.fetchAnotherServer)(`${process.env.PRODUCTSERVER}/api/reviews/add-new-review`, 'POST', { product_id, rating, review, reviewer_name, reviewer_email });
        if ('status' in response) {
            const responseData = yield response.json();
            res.status(response.status).json(responseData);
        }
        else {
            res.status(500).json({ message: "Error from product server" });
        }
    }
    catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.addNewReview = addNewReview;
