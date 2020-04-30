import { User } from "./UserInterface";
import moment = require("moment");
import { specialty } from "../helper/Enums";

export class Teacher implements User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private birthDate: moment.Moment,
    public specialties: specialty[]
  ) { }
}