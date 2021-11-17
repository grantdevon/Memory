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
  cardsTotal = 54;
  imageDir = "../assets/cards/"
  imageNames = ["2_black_f", "2_black_s", "2_red_d", "2_red_h",
  "3_black_f", "3_black_s", "3_red_d", "3_red_h",
  "4_black_f", "4_black_s", "4_red_d", "4_red_h",
  "5_black_f", "5_black_s", "5_red_d", "5_red_h",
  "6_black_f", "6_black_s", "6_red_d", "6_red_h",
  "7_black_f", "7_black_s", "7_red_d", "7_red_h",
  "8_black_f", "8_black_s", "8_red_d", "8_red_h",
  "9_black_f", "9_black_s", "9_red_d", "9_red_h",
  "10_black_f", "10_black_s", "10_red_d", "10_red_h",
  "A_black_f", "A_black_s", "A_red_d", "A_red_h",
  "J_black_f", "J_black_s", "J_red_d", "J_red_h",
  "Q_black_f", "Q_black_s", "Q_red_d", "Q_red_h",
  "K_black_f", "K_black_s", "K_red_d", "K_red_h","Joker_1", "Joker_2" ]

  openCards = 0

  images = []
  firstcard: string;
  secondCard: string

  player1: {
    name: string,
    score: string
  }

  player2: {
    name: string,
    score: string

  }


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
    this.populateImages(this.imageNames)
    this.shuffle(this.images)
    console.log(this.images.length)
    
    
  }

  populateImages(imageNames) {
    this.images = []
    for (let i in imageNames) {      
      this.images.push({
        name: imageNames[i],
        isFlipped: false,

      })
    }
    

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

  shuffle(a) {
    var j,x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i-1];
      a[i-1] = a[j];
      a[j] = x
    }
  }
 
  resetSelects() {
    
  }

  selectCard(c) {
    let img = []

    if(c.isFlipped) {
      this.presentAlert("new player")
    } else {

    }
    
    c.isFlipped = true
  
  if ( this.openCards == 2) {
     this.presentAlert("new player")
  } else {

    // this.images.forEach(res => {
    //     console.log(res)

    // }) 

    for (let i in this.images) {
      if (this.images[i].isFlipped == true) {
        img.push(this.images[i])
        

      } 
     
    }
    console.log(img.length)
  }
     
  }

  getLength(a){
    return a.length
  }

  // get length of open cards
  // if its 2  and no match then next player
    // if its 2  and  match then get two points then next player 


}
