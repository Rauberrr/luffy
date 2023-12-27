"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Like = database_1.default.define('like', {
    postId: {
        type: sequelize_1.DataTypes.UUID
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    commentId: {
        type: sequelize_1.DataTypes.UUID
    }
});
exports.default = Like;
