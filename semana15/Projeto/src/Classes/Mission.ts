import moment = require("moment");
import { Student } from "./Student";
import { Teacher } from "./Teacher";

export abstract class Mission {
  protected name: string = ''
  protected studentsList: Student[] = []
  protected teachersList: Teacher[] = []

  constructor(
    protected id: string,
    protected startDate: moment.Moment | undefined,
    protected endDate: moment.Moment,
  ) { }

  public setName(name: string) {
    this.name = name;
  }
  public addTeacher(teacher: Teacher) {
    this.teachersList.push(teacher);
  }

  public addStudent(student: Student) {
    this.studentsList.push(student);
  }
}