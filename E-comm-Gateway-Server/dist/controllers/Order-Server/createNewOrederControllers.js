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
exports.createNewOrder = void 0;
const FetchAnotherServer_1 = require("../../utils/FetchAnotherServer");
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, FetchAnotherServer_1.fetchAnotherServer)(`${process.env.ORDERSERVER}/api/orders/create-order`, 'POST', req.body);
        console.log(response);
        if ('status' in response) {
            const responseData = yield response.json();
            res.status(response.status).json(responseData);
            return;
        }
        else {
            res.status(500).json({ message: "Error from order server" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createNewOrder = createNewOrder;
