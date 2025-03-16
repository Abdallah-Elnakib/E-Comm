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
exports.getReviewByProductId = void 0;
const connDB_1 = require("../config/connDB");
const getReviewByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }
        const con = yield (0, connDB_1.connDB)();
        const sql = "SELECT * FROM reviews WHERE Product_id = ?";
        con.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Error fetching reviews: ", err);
                res.status(500).json({ message: "Internal server error" });
                con.end();
                return;
            }
            res.status(200).json(result);
            con.end();
            return;
        });
    }
    catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getReviewByProductId = getReviewByProductId;
