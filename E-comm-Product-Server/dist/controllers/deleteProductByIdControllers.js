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
exports.deleteProductById = void 0;
const connDB_1 = require("../config/connDB");
const connRedisServer_1 = require("../config/connRedisServer");
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield (0, connDB_1.connDB)();
        const id = req.params.id;
        con.query('SELECT * FROM Product WHERE Id = ?', [id], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
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
            const product = results[0];
            yield connRedisServer_1.client.set(`product:${id}`, JSON.stringify(product), {
                EX: 86400,
            });
            console.log(`Product with ID ${id} saved in Redis for 24 hours`);
            con.query('DELETE FROM Product WHERE Id = ?', [id], (err, results) => {
                if (err) {
                    console.error("Error deleting product: ", err);
                    res.status(500).json({ message: 'Internal server error' });
                    con.end();
                    return;
                }
                res.json({ message: `Product deleted successfully` });
                con.end();
                return;
            });
        }));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.deleteProductById = deleteProductById;
