import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "grade"
})
export class GradePipe implements PipeTransform {

  transform(value: number): string {
    let grade: string = String(value);
    if (value === 5){
      grade += " (отл.)";
    } else if (value >= 4){
      grade += " (хор.)";
    } else if (value >= 3){
      grade += " (удовл.)";
    } else {
      grade += " (неуд.)";
    }
    return grade;
  }

}
