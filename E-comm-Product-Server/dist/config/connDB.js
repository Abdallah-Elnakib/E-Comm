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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connDB = void 0;
const mysql_1 = __importDefault(require("mysql"));
const connDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield mysql_1.default.createConnection({
            host: process.env.HOSTDATABASE,
            user: process.env.USERNAMEDATABASE,
            password: process.env.PASSWORSDATABASE,
            port: Number(process.env.PORTDATABASE),
            database: process.env.DATABASENAME
        });
        return con;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.connDB = connDB;
