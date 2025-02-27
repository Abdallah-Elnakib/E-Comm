"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authLoginControllers_1 = require("../controllers/authLoginControllers");
const authSignupController_1 = require("../controllers/authSignupController");
const authGetUserByIdControllers_1 = require("../controllers/authGetUserByIdControllers");
const authGetAllAddressController_1 = require("../controllers/authGetAllAddressController");
const authDeleteAddressByIdControllers_1 = require("../controllers/authDeleteAddressByIdControllers");
const router = express_1.default.Router();
router.post('/login', authLoginControllers_1.loginUser);
router.post('/signup', authSignupController_1.signupUser);
router.get("/:id", authGetUserByIdControllers_1.getUserById);
router.get("/address/:user_id", authGetAllAddressController_1.getAllAddress);
router.delete('/address/:user_id', authDeleteAddressByIdControllers_1.deleteAddressById);
exports.default = router;
