import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeCustom'
})
export class TimeCustomPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    let currentDate = new Date();
    let valueDate = new Date(value);

    console.log(currentDate);
    console.log(valueDate);


    let currentDateHour = currentDate.getHours();
    let valueDateHour = valueDate.getHours();
    let currentDateMinute = currentDate.getMinutes();
    let valueDateMinute = valueDate.getMinutes();
    let currentDateSecond = currentDate.getSeconds();
    let valueDateSecond = valueDate.getSeconds();

    let hour = Math.abs(currentDateHour - valueDateHour);
    let minute = Math.abs(currentDateMinute - valueDateMinute);
    let second = Math.abs(currentDateSecond - valueDateSecond);
    console.log(hour, minute, second);


    return currentDate;
  }

}
