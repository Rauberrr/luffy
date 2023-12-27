"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.router();
        void this.db();
    }
    list(port) {
        this.app.listen(port, () => {
            console.log('app rodando na url: http://localhost:' + port);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use((0, cors_1.default)());
    }
    router() {
        this.app.use(routes_1.default);
    }
    async db() {
        try {
            await database_1.default.sync();
            console.log('Modelos sincronizados com o banco de dados.');
        }
        catch (error) {
            console.error('Erro ao sincronizar modelos:', error);
        }
    }
}
exports.default = App;
