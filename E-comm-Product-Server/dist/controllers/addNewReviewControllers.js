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
const connDB_1 = require("../config/connDB");
const milesFormulas_1 = require("../utils/milesFormulas");
const addNewReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield (0, connDB_1.connDB)();
        const { product_id, rating, review, reviewer_name, reviewer_email } = req.body;
        if (!product_id || !rating || !review || !reviewer_name || !reviewer_email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (rating < 1 || rating > 5) {
            res.status(400).json({ message: "Rating should be between 1 and 5" });
            return;
        }
        con.query('SELECT * FROM Product WHERE Id = ?', [product_id], (err, results) => {
            if (err) {
                console.error("Error fetching product: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                con.end();
                return;
            }
            const sql = "INSERT INTO reviews (Product_id, Rating, Review, Reviewer_name, Reviewer_email) VALUES ?";
            const values = [[product_id, rating, review, reviewer_name, reviewer_email]];
            con.query(sql, [values], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.error("Error inserting review: ", err);
                    res.status(500).json({ message: "Internal server error" });
                    con.end();
                    return;
                }
                if (rating === 5 || rating === 4)
                    yield (0, milesFormulas_1.sendMailRating_5)(reviewer_email);
                if (rating === 3)
                    yield (0, milesFormulas_1.sendMailRating_3)(reviewer_email);
                if (rating === 1 || rating === 2)
                    yield (0, milesFormulas_1.sendMailRating_1)(reviewer_email);
                res.status(200).json({ message: "Review added successfully" });
                con.end();
                return;
            }));
        });
    }
    catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.addNewReview = addNewReview;
