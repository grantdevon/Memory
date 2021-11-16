import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  player1Name: string;
  player2Name: string;
  isStartScreen: boolean;
  gameScreen: boolean;

  constructor(
    private alert: AlertController
  ) {

  }

  ngOnInit() {
    
    this.isStartScreen = true
    this.gameScreen = false
    console.log(this.isStartScreen);
    this.player1Name  = "Grant"
    this.player2Name = "Devon"

  }

  shownames() {
    if (this.player1Name != undefined && this.player2Name != undefined) {
      this.isStartScreen = false
      this.gameScreen = true
      console.log(this.player1Name, this.player2Name)
    } else {
      this.presentAlert("Please make sure both player names are entered.")
    }
  }

  async presentAlert(msg) {
    const alert = await this.alert.create({
      header: "Alert!",
      message: msg,
      buttons: ["okay"]
    })

    await alert.present()
  }
}
