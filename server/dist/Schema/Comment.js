"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const uuid_1 = require("uuid");
const Comment = database_1.default.define('comment', {
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    postId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    commentId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true
    },
    comment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Comment;
