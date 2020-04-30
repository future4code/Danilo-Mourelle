import fs = require("fs");

export class FileManager {
  constructor(private filePath: string) { }

  public setFilePath(path: string): void {
    this.filePath = path;
  }

  public writeFile(data: any): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  public readFile(): any {
    const data = fs.readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }
}

export const teachers = new FileManager("./JSON/teachers.json");
export const studants = new FileManager("./JSON/students.json");
export const missions = new FileManager("./JSON/missions.json");


/* // imprime as infos do arquivo
console.log(teachers.readFile());



// escreve no arquivo
teachers.writeFile({
  id: "1",
  name: "Goli",
});

// imprime as infos do arquivo
console.log(teachers.readFile()); */
