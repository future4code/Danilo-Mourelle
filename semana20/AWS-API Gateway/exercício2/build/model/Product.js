"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(id, name, price, imageLink) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
    }
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.getImageLink = function () {
        return this.imageLink;
    };
    return Product;
}());
exports.Product = Product;
