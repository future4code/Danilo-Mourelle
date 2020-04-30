import { Teacher } from "./Teacher"
import { Student } from "./Student"
import { Mission } from "./Mission"
import { missions, studants, teachers } from "./FileManger"
import { databases } from "../helper/Enums"

export class SchoolManager {
  public static TEACHERS: Teacher[] = []
  public static STUDENTS: Student[] = []
  public static MISSIONS: Mission[] = []

  registerTeacher(teacher: Teacher): void {
    SchoolManager.TEACHERS.push(teacher)
  }

  registerStudent(student: Student): void {
    SchoolManager.STUDENTS.push(student)
  }
  registerMission(mission: Mission): void {
    SchoolManager.MISSIONS.push(mission)
  }

  getDataBase(database: databases): void {
    switch (database) {
      case databases.missions:
        SchoolManager.MISSIONS = missions.readFile()
        console.log(SchoolManager.MISSIONS)
        break;

      case databases.students:
        SchoolManager.STUDENTS = studants.readFile()
        break;

      case databases.teachers:
        SchoolManager.TEACHERS = teachers.readFile()
        break;

      default:
        break;
    }
  }
  setDataBase(database: databases): void {
    switch (database) {
      case databases.missions:
        console.log(SchoolManager.MISSIONS)
        missions.writeFile(SchoolManager.MISSIONS)
        break;

      case databases.students:
        studants.writeFile(SchoolManager.STUDENTS)
        break;

      case databases.teachers:
        teachers.writeFile(SchoolManager.TEACHERS)
        break;

      default:
        break;
    }
  }
}
