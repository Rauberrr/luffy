"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Schema/User"));
class UserService {
    async login(email, password) {
        try {
            await User_1.default.findOne({ where: { email, password } });
            return { email, password };
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
exports.default = UserService;
