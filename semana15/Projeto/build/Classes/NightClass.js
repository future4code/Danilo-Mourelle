"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mission_1 = require("./Mission");
class NightMission extends Mission_1.Mission {
    setName(name) {
        if (name.includes("-na-night")) {
            super.setName(name);
        }
        else {
            console.log('Nome da turma noturna deve conter a experssão "-na-night"');
        }
    }
}
exports.NightMission = NightMission;
//# sourceMappingURL=NightClass.js.map