"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const Enums_1 = require("./helper/Enums");
const Teacher_1 = require("./Classes/Teacher");
const SchoolManager_1 = require("./Classes/SchoolManager");
const Student_1 = require("./Classes/Student");
const DaytimeClass_1 = require("./Classes/DaytimeClass");
const NightClass_1 = require("./Classes/NightClass");
const artur = new SchoolManager_1.SchoolManager;
const joaoAlves = new Teacher_1.Teacher("João", 'joao@lbn.com', '10', moment('22/12/90', 'DD/MM/YY'), [
    Enums_1.specialty.CSS,
    Enums_1.specialty.TYPESCRIPT,
    Enums_1.specialty.OOP
]);
const goli = new Teacher_1.Teacher("Goli", 'goli@lbn.com', '2', moment("15/08/1996", "DD/MM/YYYY"), [
    Enums_1.specialty.BACKEND,
    Enums_1.specialty.TYPESCRIPT,
    Enums_1.specialty.OOP,
]);
const danilo = new Student_1.Student('Danilo', 'danilomourelle@outlook.com', '1', moment('28/12/1987', 'DD/MM/YYYY'), ['Séries', 'Filmes', 'Code', 'YouTube']);
const daniel = new Student_1.Student('Daniel', 'dcs@outlook.com', '2', moment('18/08/1994', 'DD/MM/YYYY'), ['Video-game', 'Futebol', 'Finanças']);
const sagan = new DaytimeClass_1.DaytimeMission('best', moment('13/01/2020', 'DD/MM/YYYY'), moment('27/07/2020', 'DD/MM/YYYY'));
sagan.setName('Sagan');
const jullian = new NightClass_1.NightMission('ok', moment('17/02/2020', 'DD/MM/YYYY'), moment('04/09/2020', 'DD/MM/YYYY'));
jullian.setName('Jullian-na-night');
artur.registerStudent(daniel);
artur.registerStudent(danilo);
artur.setDataBase(Enums_1.databases.students);
artur.getDataBase(Enums_1.databases.teachers);
artur.registerTeacher(joaoAlves);
artur.registerTeacher(goli);
artur.setDataBase(Enums_1.databases.teachers);
sagan.addStudent(daniel);
sagan.addStudent(danilo);
sagan.addTeacher(joaoAlves);
sagan.addTeacher(goli);
jullian.addStudent(daniel);
jullian.addStudent(danilo);
jullian.addTeacher(joaoAlves);
jullian.addTeacher(goli);
artur.getDataBase(Enums_1.databases.missions);
artur.registerMission(sagan);
artur.registerMission(jullian);
artur.setDataBase(Enums_1.databases.missions);
//# sourceMappingURL=index.js.map