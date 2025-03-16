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
exports.getProductRating = void 0;
const connDB_1 = require("../config/connDB");
const getProductRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield (0, connDB_1.connDB)();
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Product id is required" });
            return;
        }
        con.query('SELECT * FROM Product WHERE Id = ?', [id], (err, results) => {
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
            con.query('SELECT AVG(Rating) as avgRating FROM reviews WHERE Product_id = ?', [id], (err, results) => {
                if (err) {
                    console.error("Error fetching product rating: ", err);
                    res.status(500).json({ message: 'Internal server error' });
                    con.end();
                    return;
                }
                con.query('UPDATE Product SET Rating = ? WHERE Id = ?', [results[0].avgRating, id], (err, results) => {
                    if (err) {
                        console.error("Error updating product rating: ", err);
                        res.status(500).json({ message: 'Internal server error' });
                        con.end();
                        return;
                    }
                });
                res.status(200).json({ avgRating: results[0].avgRating });
                con.end();
                return;
            });
        });
    }
    catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getProductRating = getProductRating;
