import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeCustom',
})
export class TimeCustomPipe implements PipeTransform {
  transform(value: Date, args?: any): any {
    let currentDate = new Date();
    let valueDate = new Date(value);

    let milisecond = currentDate.getTime() - valueDate.getTime();

    let minutes = Math.floor((milisecond / (1000 * 60)) % 60);
    let hours = Math.floor((milisecond / (1000 * 60 * 60)) % 24);
    let hoursTotal = Math.floor(milisecond / (1000 * 60 * 60));
    let days = hoursTotal >= 24 ? Math.floor(hoursTotal / 24) : 0;
    let weeks = days >= 7 ? Math.floor(days / 7) : 0;
    let months = weeks >= 4 ? Math.floor(weeks / 4) : 0;

    if (months > 0) {
      return `${months} months`;
    }

    if (weeks > 0) {
      return `${weeks} weeks`;
    }

    if (days > 1) {
      return `${days} days`;
    }

    if (hours < 1) {
      if (minutes < 1) {
        return `1 minutes`;
      }
      return `${minutes} minutes`;
    }

    return `${hours} hours`;
  }
}
