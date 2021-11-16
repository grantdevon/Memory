import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  player1Name: string;
  player2Name: string;
  isStartScreen: boolean;
  constructor() {

  }

  ngOnInit() {
    
    this.isStartScreen = true
    console.log(this.isStartScreen);

  }

  shownames() {
    if (this.player1Name != undefined && this.player2Name != undefined) {
      this.isStartScreen = false
      console.log(this.player1Name, this.player2Name)
    } else {
      console.log("flippityfloppidy");
      
    }
    
  }
}
