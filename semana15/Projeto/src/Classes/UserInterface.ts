import * as moment from 'moment'
import * as fs from "fs";
import { specialty } from '../../helper/Enums'

interface User {
  name: string,
  email: string,
  id: string
}

class Student implements User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private birthDate: moment.Moment,
    public hobbies: string[]
  ) { }

}

class Teachers implements User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private birthDate: moment.Moment,
    public specialties: specialty[]
  ) { }
}

abstract class Class {
  protected name: string = ''
  constructor(
    protected id: string,
    protected startDate: moment.Moment | undefined,
    protected endDate: moment.Moment,
    protected studentsList: Student[],
    protected teachersList: Teachers[]
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

class DaytimeClass extends Class {
  
}

class NightClass extends Class {
  public setName(name: string) {
    if (name.includes("-na-night")) {
      super.setName(name)
    }
    else{
      console.log('Nome da turma noturna deve conter a experssão "-na-night"')
    }
  }
}


//********************************************************//

class FileManager {
  constructor(private filePath: string) { }

  public setFilePath(path: string): void {
    this.filePath = path;
  }

  public writeFile(data: any): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  public readFile(): any {
    const data = fs.readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }
}

const fm = new FileManager("arquivo");

// imprime as infos do arquivo
console.log(fm.readFile());

fm.setFilePath("outro-arquivo");

// escreve no arquivo
fm.writeFile({
  id: "1",
  name: "Goli",
});
