import { User } from "./UserInterface";
import moment = require("moment");

export class Student implements User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private birthDate: moment.Moment,
    public hobbies: string[]
  ) { }

  getStudentAge(): number {
    return moment().diff(this.birthDate, "years")
  }
}