"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("uuid");
const User = database_1.default.define('user', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    img: {
        type: sequelize_1.DataTypes.BLOB('long')
    }
});
exports.default = User;
