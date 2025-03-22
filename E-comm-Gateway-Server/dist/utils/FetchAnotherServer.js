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
exports.fetchAnotherServerWithoutBody = exports.fetchAnotherServer = void 0;
const fetchAnotherServer = (url, method, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return response;
    }
    catch (error) {
        console.error(error);
        return { message: 'Internal server error' };
    }
});
exports.fetchAnotherServer = fetchAnotherServer;
const fetchAnotherServerWithoutBody = (url, method) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method,
        });
        console.log(response);
        return response;
    }
    catch (error) {
        console.error(error);
        return { message: 'Internal server error' };
    }
});
exports.fetchAnotherServerWithoutBody = fetchAnotherServerWithoutBody;
