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
exports.addNewProduct = void 0;
const connDB_1 = require("../config/connDB");
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, price, stock } = req.body;
        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const con = yield (0, connDB_1.connDB)();
        const sql = "INSERT INTO Product (Title, Description, Category, Price, Rating, Stock) VALUES ?";
        const values = [[title, description, category, price, 0, stock]];
        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error inserting product: ", err);
                res.status(500).json({ message: "Internal server error" });
                con.end();
                return;
            }
            res.status(200).json({ message: "Product added successfully" });
            return;
            con.end();
        });
    }
    catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.addNewProduct = addNewProduct;
