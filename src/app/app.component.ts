import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-countdown-timer';
  targetDate: Date = new Date(2024, 0, 1, 0, 0);
  currentDate: Date = new Date();
  secondsBetween: number = Math.floor((this.targetDate.getTime() - this.currentDate.getTime())/1000);
  daysLeft = Math.floor(this.secondsBetween / 86400);
  hoursLeft = Math.floor((this.secondsBetween % 86400) / 3600);
  minutesLeft = Math.floor(((this.secondsBetween % 86400) % 3600) / 60);
  secondsLeft = ((this.secondsBetween % 86400) % 3600) % 60;

  setMonth(event: any) {
    if(event.target.value == 1 && this.targetDate.getDate() >= 29) {
      this.targetDate.setDate(28);
      this.targetDate.setMonth(event.target.value);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if ((event.target.value == 3 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 5 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 8 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 10 && this.targetDate.getDate() >= 31)) {
      this.targetDate.setMonth(0);
      this.targetDate.setDate(30);
      this.targetDate.setMonth(event.target.value);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else {
      this.targetDate.setMonth(event.target.value);
    }
    console.log(this.targetDate);
    this.updateSeconds();
  }

  setDay(event: any) {
    if(event.target.value < 1 || event.target.value > 31) {
      alert("Invalid Day Input");
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if (event.target.value >= 29 && this.targetDate.getMonth() == 1 && this.targetDate.getFullYear() % 4 == 0) {
      this.targetDate.setDate(29);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if (event.target.value >= 29 && this.targetDate.getMonth() == 1) {
      this.targetDate.setDate(28);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if ((event.target.value >= 31 && this.targetDate.getMonth() == 3) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 5) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 8) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 10)) {
        this.targetDate.setDate(30);
        let dayInput = document.getElementById("day") as HTMLInputElement | null;
        dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
      }

    else {
      this.targetDate.setDate(event.target.value);
    }
    console.log(this.targetDate);
    this.updateSeconds();
  }

  setYear(event: any) {
    if(this.targetDate.getMonth() == 1 && this.targetDate.getDate() == 29 && event.target.value % 4 != 0) {
      this.targetDate.setDate(28);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    }
    if(event.target.value < new Date().getFullYear()) {
      alert("Invalid Year Input");
      let yearInput = document.getElementById("year") as HTMLInputElement | null;
      yearInput ? yearInput.value = this.targetDate.getFullYear().toString() : null;
    } else {
      this.targetDate.setFullYear(event.target.value);
      console.log(this.targetDate);
      this.updateSeconds();
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
      this.updateSeconds();
    }
  }

  setMinute(event: any) {
    if(event.target.value < 0 || event.target.value > 59) {
      alert("Invalid Minute Input");
      let minuteInput = document.getElementById("minute") as HTMLInputElement | null;
      minuteInput ? minuteInput.value = this.targetDate.getMinutes().toString() : null;
    } else {
      this.targetDate.setMinutes(event.target.value);
      console.log(this.targetDate);
      this.updateSeconds();
    }
  }

  setSecond(event: any) {
    if(event.target.value < 0 || event.target.value > 59) {
      alert("Invalid Second Input");
      let secondInput = document.getElementById("second") as HTMLInputElement | null;
      secondInput ? secondInput.value = this.targetDate.getSeconds().toString() : null;
    } else {
      this.targetDate.setSeconds(event.target.value);
      console.log(this.targetDate);
      this.updateSeconds();
    }
  }

  updateSeconds() {
    this.currentDate = new Date();
    this.secondsBetween = Math.floor((this.targetDate.getTime() - this.currentDate.getTime())/1000);
    if(this.secondsBetween <= 0){
      this.daysLeft = 0;
      this.hoursLeft = 0;
      this.minutesLeft = 0;
      this.secondsLeft = 0;
    } else {
      this.daysLeft = Math.floor(this.secondsBetween / 86400);
      this.hoursLeft = Math.floor((this.secondsBetween % 86400) / 3600);
      this.minutesLeft = Math.floor(((this.secondsBetween % 86400) % 3600) / 60);
      this.secondsLeft = ((this.secondsBetween % 86400) % 3600) % 60;
    }
  }

  update = setInterval(() => {
    this.updateSeconds();
  }, 1000);

}
