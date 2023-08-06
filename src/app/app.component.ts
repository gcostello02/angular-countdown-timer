import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-countdown-timer';
  year: number = localStorage.getItem('year') ? parseInt(localStorage.getItem('year')!) : new Date().getFullYear()+1;
  month: number = localStorage.getItem('month') ? parseInt(localStorage.getItem('month')!) : 0;
  day: number = localStorage.getItem('day') ? parseInt(localStorage.getItem('day')!) : 1;
  hour: number = localStorage.getItem('hour') ? parseInt(localStorage.getItem('hour')!) : 0;
  minute: number = localStorage.getItem('minute') ? parseInt(localStorage.getItem('minute')!) : 0;

  targetDate: Date = new Date(this.year, this.month, this.day, this.hour, this.minute);
  currentDate: Date = new Date();
  secondsBetween: number = Math.floor((this.targetDate.getTime() - this.currentDate.getTime())/1000);
  daysLeft = Math.floor(this.secondsBetween / 86400).toString();
  hoursLeft = Math.floor((this.secondsBetween % 86400) / 3600).toString().length === 1 ? '0' + Math.floor((this.secondsBetween % 86400) / 3600).toString() : Math.floor((this.secondsBetween % 86400) / 3600).toString();
  minutesLeft = Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString().length === 1 ? '0' + Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString() : Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString();
  secondsLeft = (((this.secondsBetween % 86400) % 3600) % 60).toString().length === 1 ? '0' + (((this.secondsBetween % 86400) % 3600) % 60).toString() : (((this.secondsBetween % 86400) % 3600) % 60).toString();
  inputShowing: boolean = true;

  ngOnInit(): void {
    let yearInput = document.getElementById("year") as HTMLInputElement | null;
    yearInput ? yearInput.value = this.targetDate.getFullYear().toString() : null;
    let monthInput = document.getElementById("month") as HTMLInputElement | null;
    monthInput ? monthInput.value = this.targetDate.getMonth().toString() : null;
    let dayInput = document.getElementById("day") as HTMLInputElement | null;
    dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    let hourInput = document.getElementById("hour") as HTMLInputElement | null;
    hourInput ? hourInput.value = this.targetDate.getHours().toString() : null;
    let minuteInput = document.getElementById("minute") as HTMLInputElement | null;
    minuteInput ? minuteInput.value = this.targetDate.getMinutes().toString() : null;
    let secondInput = document.getElementById("second") as HTMLInputElement | null;
    secondInput ? secondInput.value = this.targetDate.getSeconds().toString() : null;
    this.calculate();

    if(this.targetDate.getHours() < 10){
      let hourInput = document.getElementById("hour") as HTMLInputElement | null;
      hourInput ? hourInput.value = '0' + this.targetDate.getHours().toString() : null;
    }
    if(this.targetDate.getMinutes() < 10){
      let hourInput = document.getElementById("minute") as HTMLInputElement | null;
      hourInput ? hourInput.value = '0' + this.targetDate.getMinutes().toString() : null;
    }
  }

  setMonth(event: any) {
    if(event.target.value == 1 && this.targetDate.getDate() >= 29) {
      this.targetDate.setDate(28);
      this.localStorageChange('day', 28);
      this.targetDate.setMonth(event.target.value);
      this.localStorageChange('month', event.target.value);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if ((event.target.value == 3 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 5 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 8 && this.targetDate.getDate() >= 31) ||
    (event.target.value == 10 && this.targetDate.getDate() >= 31)) {
      this.targetDate.setMonth(0);
      this.targetDate.setDate(30);
      this.localStorageChange('day', 30);
      this.targetDate.setMonth(event.target.value);
      this.localStorageChange('month', event.target.value);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else {
      this.targetDate.setMonth(event.target.value);
      this.localStorageChange('month', event.target.value);
    }
    console.log(this.targetDate);
    this.calculate();
  }

  setDay(event: any) {
    if(event.target.value < 1 || event.target.value > 31) {
      alert("Invalid Day Input");
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if (event.target.value >= 29 && this.targetDate.getMonth() == 1 && this.targetDate.getFullYear() % 4 == 0) {
      this.targetDate.setDate(29);
      this.localStorageChange('day', 29);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if (event.target.value >= 29 && this.targetDate.getMonth() == 1) {
      this.targetDate.setDate(28);
      this.localStorageChange('day', 28);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    } else if ((event.target.value >= 31 && this.targetDate.getMonth() == 3) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 5) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 8) ||
      (event.target.value >= 31 && this.targetDate.getMonth() == 10)) {
        this.targetDate.setDate(30);
        this.localStorageChange('day', 30);
        let dayInput = document.getElementById("day") as HTMLInputElement | null;
        dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
      }
    else {
      this.targetDate.setDate(event.target.value);
      this.localStorageChange('day', event.target.value);
    }
    console.log(this.targetDate);
    this.calculate();
  }

  setYear(event: any) {
    if(this.targetDate.getMonth() == 1 && this.targetDate.getDate() == 29 && event.target.value % 4 != 0) {
      this.targetDate.setDate(28);
      this.localStorageChange('day', 28);
      let dayInput = document.getElementById("day") as HTMLInputElement | null;
      dayInput ? dayInput.value = this.targetDate.getDate().toString() : null;
    }
    if(event.target.value < new Date().getFullYear()) {
      alert("Invalid Year Input");
      let yearInput = document.getElementById("year") as HTMLInputElement | null;
      yearInput ? yearInput.value = this.targetDate.getFullYear().toString() : null;
    } else {
      this.targetDate.setFullYear(event.target.value);
      this.localStorageChange('year', event.target.value);
      console.log(this.targetDate);
    }
    this.calculate();
  }

  setHour(event: any) {
    if(event.target.value < 0 || event.target.value > 23) {
      alert("Invalid Hour Input");
      let hourInput = document.getElementById("hour") as HTMLInputElement | null;
      hourInput ? hourInput.value = this.targetDate.getHours().toString() : null;
    } else {
      this.targetDate.setHours(event.target.value);
      this.localStorageChange('hour', event.target.value);
      console.log(this.targetDate);
    }
    if(this.targetDate.getHours() < 10){
      let hourInput = document.getElementById("hour") as HTMLInputElement | null;
      hourInput ? hourInput.value = '0' + this.targetDate.getHours().toString() : null;
    }
    this.calculate();
  }

  setMinute(event: any) {
    if(event.target.value < 0 || event.target.value > 59) {
      alert("Invalid Minute Input");
      let minuteInput = document.getElementById("minute") as HTMLInputElement | null;
      minuteInput ? minuteInput.value = this.targetDate.getMinutes().toString() : null;
    } else {
      this.targetDate.setMinutes(event.target.value);
      this.localStorageChange('minute', event.target.value);
      console.log(this.targetDate);
    }
    if(this.targetDate.getMinutes() < 10){
      let hourInput = document.getElementById("minute") as HTMLInputElement | null;
      hourInput ? hourInput.value = '0' + this.targetDate.getMinutes().toString() : null;
    }
    this.calculate();
  }

  updateSeconds() {
    this.currentDate = new Date();
    this.secondsBetween = Math.floor((this.targetDate.getTime() - this.currentDate.getTime())/1000);
    if(this.secondsBetween <= 0){
      this.daysLeft = '0';
      this.hoursLeft = '0';
      this.minutesLeft = '0';
      this.secondsLeft = '0';
    } else {
      this.daysLeft = Math.floor(this.secondsBetween / 86400).toString();
      this.hoursLeft = Math.floor((this.secondsBetween % 86400) / 3600).toString().length === 1 ? '0' + Math.floor((this.secondsBetween % 86400) / 3600).toString() : Math.floor((this.secondsBetween % 86400) / 3600).toString();
      this.minutesLeft = Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString().length === 1 ? '0' + Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString() : Math.floor(((this.secondsBetween % 86400) % 3600) / 60).toString();
      this.secondsLeft = (((this.secondsBetween % 86400) % 3600) % 60).toString().length === 1 ? '0' + (((this.secondsBetween % 86400) % 3600) % 60).toString() : (((this.secondsBetween % 86400) % 3600) % 60).toString();
    }
  }

  calculate() {
    setInterval(() => {
      this.updateSeconds();
    }, 1000);
  }

  localStorageChange(key: string, value: number) {
    localStorage.setItem(key, value.toString());
  }

}
