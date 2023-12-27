"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let sequelize;
if (process.env.DATABASE != null) {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE);
}
else {
    throw new Error('Variável de ambiente DATABASE não definida');
}
exports.default = sequelize;
