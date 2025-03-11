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
exports.updateAddress = void 0;
const FetchAnotherServer_1 = require("../../utils/FetchAnotherServer");
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { addressNumber, address } = req.body;
    if (!user_id) {
        res.status(400).json({ message: "User id is required" });
        return;
    }
    if (!addressNumber || !address) {
        res.status(400).json({ message: "Address number and address are required" });
        return;
    }
    const { street, city, state, zip } = address;
    if (!street || !city || !state || !zip) {
        res.status(400).json({ message: "All address fields are required" });
        return;
    }
    const response = yield (0, FetchAnotherServer_1.fetchAnotherServer)(`${process.env.AUTHSERVER}/api/auth/address/update-address/${user_id}`, 'PUT', { addressNumber, address });
    if ('status' in response) {
        const responseData = yield response.json();
        res.status(response.status).json(responseData);
        return;
    }
    else {
        res.status(500).json({ message: "Error from auth server" });
    }
});
exports.updateAddress = updateAddress;
