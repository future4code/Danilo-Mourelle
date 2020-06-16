"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productRouter_1 = require("./router/productRouter");
var app = express_1.default();
app.use(express_1.default.json());
exports.default = app;
app.use('/product', productRouter_1.productRouter);
