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
exports.addNewAddress = void 0;
const userModel_1 = require("../models/userModel");
const addNewAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { address } = req.body;
    try {
        const users = yield userModel_1.User.findById({ _id: user_id });
        if (!users) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }
        const { street, city, state, zip } = address;
        if (!street || !city || !state || !zip) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        yield userModel_1.User.updateOne({ _id: user_id }, { $push: { address: address } });
        const addressOfUser = yield userModel_1.User.findById({ _id: user_id });
        res.status(200).json({ Address: addressOfUser === null || addressOfUser === void 0 ? void 0 : addressOfUser.address });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.addNewAddress = addNewAddress;
