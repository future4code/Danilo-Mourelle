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
exports.handler = void 0;
const knex_1 = __importDefault(require("knex"));
let connectionKnex = null;
const connection = () => {
    if (connectionKnex === null) {
        connectionKnex = knex_1.default({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE_NAME,
            },
        });
    }
    return connectionKnex;
};
const destroyConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (connectionKnex !== null) {
        yield connectionKnex.destroy();
        connectionKnex = null;
    }
});
function createUser(name, cartoonName, imageLink) {
    return __awaiter(this, void 0, void 0, function* () {
        yield connection()
            .insert({
            name,
            cartoon_name: cartoonName,
            image_link: imageLink
        })
            .into('Cartoon');
    });
}
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, cartonName, imageLink } = event;
        if (!name || !cartonName || !imageLink) {
            throw new Error('Missing Inputs');
        }
        yield createUser(name, cartonName, imageLink);
        return { message: "User created" };
    }
    catch (err) {
        return { message: err.message };
    }
    finally {
        yield destroyConnection();
    }
});
