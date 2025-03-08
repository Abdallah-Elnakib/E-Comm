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
exports.editProductById = void 0;
const connDB_1 = require("../config/connDB");
const editProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield (0, connDB_1.connDB)();
        const id = req.params.id;
        const { title, description, category, price, stock } = req.body;
        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: 'All fields are required' });
            con.end();
            return;
        }
        con.query('UPDATE Product SET Title = ?, Description = ?, Category = ?, Price = ?, Stock = ? WHERE Id = ?', [title, description, category, price, stock, id], (err, results) => {
            if (err) {
                console.error("Error updating product: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Product not found' });
                con.end();
                return;
            }
            res.json({ message: 'Product updated successfully' });
            con.end();
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.editProductById = editProductById;
