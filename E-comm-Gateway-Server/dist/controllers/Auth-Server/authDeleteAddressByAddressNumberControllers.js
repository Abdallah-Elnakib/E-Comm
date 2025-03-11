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
exports.deleteAddressByAddressNumber = void 0;
const FetchAnotherServer_1 = require("../../utils/FetchAnotherServer");
const deleteAddressByAddressNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const { addressNumber } = req.body;
        if (!addressNumber) {
            res.status(400).json({ message: "Address number is required" });
            return;
        }
        if (!user_id) {
            res.status(400).json({ message: "User id is required" });
            return;
        }
        const response = yield (0, FetchAnotherServer_1.fetchAnotherServer)(`${process.env.AUTHSERVER}/api/auth/address/delete/${user_id}`, 'DELETE', { addressNumber });
        if ('status' in response) {
            const responseData = yield response.json();
            res.status(response.status).json(responseData);
        }
        else {
            res.status(500).json({ message: "Error from auth server" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteAddressByAddressNumber = deleteAddressByAddressNumber;
