import moment = require("moment");
import { specialty, databases } from "./helper/Enums";
import { Teacher } from "./Classes/Teacher";
import { SchoolManager } from "./Classes/SchoolManager";
import { Student } from "./Classes/Student";
import { Mission } from "./Classes/Mission";
import { DaytimeMission } from "./Classes/DaytimeClass";
import { NightMission } from "./Classes/NightClass";

const artur = new SchoolManager

const joaoAlves = new Teacher(
  "João",
  'joao@lbn.com',
  '10',
  moment('22/12/90', 'DD/MM/YY'),
  [
    specialty.CSS,
    specialty.TYPESCRIPT,
    specialty.OOP
  ])

const goli = new Teacher(
  "Goli",
  'goli@lbn.com',
  '2',
  moment("15/08/1996", "DD/MM/YYYY"),
  [
    specialty.BACKEND,
    specialty.TYPESCRIPT,
    specialty.OOP,
  ]
)

const danilo = new Student(
  'Danilo',
  'danilomourelle@outlook.com',
  '1',
  moment('28/12/1987', 'DD/MM/YYYY'),
  ['Séries', 'Filmes', 'Code', 'YouTube']
)

const daniel = new Student(
  'Daniel',
  'dcs@outlook.com',
  '2',
  moment('18/08/1994', 'DD/MM/YYYY'),
  ['Video-game', 'Futebol', 'Finanças']
)

const sagan = new DaytimeMission(
  'best',
  moment('13/01/2020', 'DD/MM/YYYY'),
  moment('27/07/2020', 'DD/MM/YYYY'),
)
sagan.setName('Sagan')

const jullian = new NightMission(
  'ok',
  moment('17/02/2020', 'DD/MM/YYYY'),
  moment('04/09/2020', 'DD/MM/YYYY'),
)
jullian.setName('Jullian-na-night')

artur.getDataBase(databases.students)
artur.registerStudent(daniel)
artur.registerStudent(danilo)
artur.setDataBase(databases.students)

artur.getDataBase(databases.teachers)
artur.registerTeacher(joaoAlves)
artur.registerTeacher(goli)
artur.setDataBase(databases.teachers)

sagan.addStudent(daniel)
sagan.addStudent(danilo)
sagan.addTeacher(joaoAlves)
sagan.addTeacher(goli)

jullian.addStudent(daniel)
jullian.addStudent(danilo)
jullian.addTeacher(joaoAlves)
jullian.addTeacher(goli)

artur.getDataBase(databases.missions)
artur.registerMission(sagan)
artur.registerMission(jullian)
artur.setDataBase(databases.missions)
