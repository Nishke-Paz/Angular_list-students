import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "name"
})
export class NamePipe implements PipeTransform {

  transform(value: string): string {
    let name = "";
    name += value.slice(0, 1).toUpperCase();
    name += value.slice(1, value.length).toLowerCase();
    return name;
  }

}
