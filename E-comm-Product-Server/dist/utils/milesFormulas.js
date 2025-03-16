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
exports.sendMailRating_5 = sendMailRating_5;
exports.sendMailRating_3 = sendMailRating_3;
exports.sendMailRating_1 = sendMailRating_1;
const mailSender_1 = __importDefault(require("./mailSender"));
function sendMailRating_5(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, mailSender_1.default)(email, "Thank you for your product rating.", `<h1>Thank You 😁</h1>
         <p>Thank you for rating our products. I hope you liked them. Follow us for more offers and new products.</p>`);
            console.log("Email sent successfully: ", mailResponse);
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
function sendMailRating_3(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, mailSender_1.default)(email, "Thank you for your product rating.", `<h1>Thank You 😌</h1>
         <p>Thank you for your evaluation. We are sorry if the service did not satisfy you well. 
         We will try to improve the level of service so that you are completely satisfied. Thank you for being with us and for your understanding.</p>`);
            console.log("Email sent successfully: ", mailResponse);
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
function sendMailRating_1(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, mailSender_1.default)(email, "Thank you for your product rating.", `<h1>We apologize for the inconvenience.😓</h1>
         <p>We are sorry if you did not like the products and if there was any problem, please do not hesitate to contact us to help you solve the problem or prevent this mistake from happening again. Thank you for your understanding. 
         We are happy to have you with us..</p>`);
            console.log("Email sent successfully: ", mailResponse);
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
