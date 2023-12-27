"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// import User from './User'
const uuid_1 = require("uuid");
const Posts = database_1.default.define('post', {
    postId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.UUID
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
// User.hasMany(Posts)
exports.default = Posts;
