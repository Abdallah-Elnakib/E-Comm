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
exports.getAllProducts = void 0;
const connDB_1 = require("../config/connDB");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, connDB_1.connDB)().then((con) => {
            console.log("Connected Database!.......");
            const sql = "SELECT * FROM Product";
            con.query(sql, function (err, result) {
                if (err) {
                    console.error("Error fetching products: ", err);
                    res.status(500).json({ message: "Internal server error" });
                    con.end();
                    return;
                }
                res.status(200).json({ products: result });
                con.end();
                return;
            });
        }).catch((err) => {
            console.error("Database connection failed: ", err);
            res.status(500).json({ message: "Internal server error" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllProducts = getAllProducts;
