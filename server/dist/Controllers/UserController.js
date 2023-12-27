"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Schema/User"));
const sequelize_1 = require("sequelize");
const UserService_1 = __importDefault(require("../Services/UserService"));
const userService = new UserService_1.default();
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        try {
            console.log('AQUI ESTA O FIND: ');
            const find = await User_1.default.findOne({
                where: { [sequelize_1.Op.or]: [{ name }, { email }] }
            });
            console.log('AQUI ESTA O FIND: ', find);
            if (find === null) {
                const response = await User_1.default.create({
                    name,
                    email,
                    password
                });
                return res.status(200).json({ msg: 'sucessfully', response });
            }
            else {
                return res.status(401).json({ msg: 'error' });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    async uploadImg(req, res) {
        const { img, userId } = req.body;
        try {
            await User_1.default.update({
                img
            }, { where: { userId } });
            const response = await User_1.default.findOne({ where: { userId } });
            if (response === null) {
                return res.status(401).json({ mgs: 'user nao encontrado' });
            }
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const response = await userService.login(email, password);
            if (response === null) {
                return res.status(401).json({ msg: 'error' });
            }
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
}
exports.default = new UserController();
