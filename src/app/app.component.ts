import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-countdown-timer';
  targetDate: Date = new Date(2024, 0, 1, 0, 0);

  setMonth(event: any) {
    this.targetDate.setMonth(event.target.value);
    console.log(this.targetDate);
  }

  setDay(event: any) {
    if(event.target.value < 1 || event.target.value > 31) {
      alert("Invalid Day Input");
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else {
      this.targetDate.setDate(event.target.value);
      console.log(this.targetDate);

    }
  }

  setYear(event: any) {
    if(event.target.value < 2023) {
      alert("Invalid Year Input");
      let yearInput = document.getElementById("year") as HTMLInputElement | null;
      yearInput ? yearInput.value = this.targetDate.getFullYear().toString() : null;
    } else {
      this.targetDate.setFullYear(event.target.value);
      console.log(this.targetDate);

    }
  }

  setHour(event: any) {
    if(event.target.value < 0 || event.target.value > 23) {
      alert("Invalid Hour Input");
      let hourInput = document.getElementById("hour") as HTMLInputElement | null;
      hourInput ? hourInput.value = this.targetDate.getHours().toString() : null;
    } else {
      this.targetDate.setHours(event.target.value);
      console.log(this.targetDate);
    }
  }

  setMinute(event: any) {
    if(event.target.value < 0 || event.target.value > 59) {
      alert("Invalid Minute Input");
      let minuteInput = document.getElementById("minute") as HTMLInputElement | null;
      minuteInput ? minuteInput.value = this.targetDate.getHours().toString() : null;
    } else {
      this.targetDate.setMinutes(event.target.value);
      console.log(this.targetDate);
    }
  }

}
