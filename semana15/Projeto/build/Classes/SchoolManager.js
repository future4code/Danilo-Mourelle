"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileManger_1 = require("./FileManger");
const Enums_1 = require("../helper/Enums");
class SchoolManager {
    registerTeacher(teacher) {
        SchoolManager.TEACHERS.push(teacher);
    }
    registerStudent(student) {
        SchoolManager.STUDENTS.push(student);
    }
    registerMission(mission) {
        SchoolManager.MISSIONS.push(mission);
    }
    getDataBase(database) {
        switch (database) {
            case Enums_1.databases.missions:
                SchoolManager.MISSIONS = FileManger_1.missions.readFile();
                console.log(SchoolManager.MISSIONS);
                break;
            case Enums_1.databases.students:
                SchoolManager.STUDENTS = FileManger_1.studants.readFile();
                break;
            case Enums_1.databases.teachers:
                SchoolManager.TEACHERS = FileManger_1.teachers.readFile();
                break;
            default:
                break;
        }
    }
    setDataBase(database) {
        switch (database) {
            case Enums_1.databases.missions:
                console.log(SchoolManager.MISSIONS);
                FileManger_1.missions.writeFile(SchoolManager.MISSIONS);
                break;
            case Enums_1.databases.students:
                FileManger_1.studants.writeFile(SchoolManager.STUDENTS);
                break;
            case Enums_1.databases.teachers:
                FileManger_1.teachers.writeFile(SchoolManager.TEACHERS);
                break;
            default:
                break;
        }
    }
}
exports.SchoolManager = SchoolManager;
SchoolManager.TEACHERS = [];
SchoolManager.STUDENTS = [];
SchoolManager.MISSIONS = [];
//# sourceMappingURL=SchoolManager.js.map