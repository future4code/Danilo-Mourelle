"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdManager = void 0;
var uuid_1 = require("uuid");
var IdManager = /** @class */ (function () {
    function IdManager() {
    }
    IdManager.prototype.generateId = function () {
        return uuid_1.v4();
    };
    return IdManager;
}());
exports.IdManager = IdManager;
