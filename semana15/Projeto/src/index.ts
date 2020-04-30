import moment = require("moment");
import { specialty } from "../helper/Enums";
import { Teacher } from "./Classes/Teacher";

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