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
exports.deleteAddressById = void 0;
const userModel_1 = require("../models/userModel");
const deleteAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { addressNumber } = req.body;
    try {
        const user = yield userModel_1.User.findById(user_id);
        if (!user) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }
        if (!addressNumber) {
            res.status(400).json({ message: "Address Numeber is required" });
            return;
        }
        if (addressNumber !== 'address1' && addressNumber !== 'address2' && addressNumber !== 'address3') {
            res.status(401).json({ message: "Invalid Address Number" });
            return;
        }
        delete user.address[addressNumber];
        yield user.save();
        res.status(200).json({ message: "Address deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteAddressById = deleteAddressById;
