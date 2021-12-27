import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "date"
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    const currentDate: string[] = value.split(".");
    const number: number = Number(currentDate[0]);
    const month: number = Number(currentDate[1]);
    const year: string = currentDate[2];
    let newDate: string = "";
    switch (month){
      case 1:{
        newDate = number + " января, " + year + " г.";
        break;
      }
      case 2:{
        newDate = number + " февраля, " + year + " г.";
        break;
      }
      case 3:{
        newDate = number + " марта, " + year + " г.";
        break;
      }
      case 4:{
        newDate = number + " апреля, " + year + " г.";
        break;
      }
      case 5:{
        newDate = number + " мая, " + year + " г.";
        break;
      }
      case 6:{
        newDate = number + " июня, " + year + " г.";
        break;
      }
      case 7:{
        newDate = number + " июля, " + year + " г.";
        break;
      }
      case 8:{
        newDate = number + " августа, " + year + " г.";
        break;
      }
      case 9:{
        newDate = number + " сентября, " + year + " г.";
        break;
      }
      case 10:{
        newDate = number + " октября, " + year + " г.";
        break;
      }
      case 11:{
        newDate = number + " ноября, " + year + " г.";
        break;
      }
      case 12:{
        newDate = number + " декабря, " + year + " г.";
        break;
      }
      default:
        break;
    }
    return newDate;
  }

}
