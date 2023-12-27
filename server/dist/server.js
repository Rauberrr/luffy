"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new App_1.default();
if (process.env.PORT != null) {
    app.list(parseInt(process.env.PORT));
}
else {
    app.list(9001);
}
