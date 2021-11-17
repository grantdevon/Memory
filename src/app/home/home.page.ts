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


  images = []
  img = []

  player1 = {}

  player2 = {}

  players = []


  constructor(
    private alert: AlertController
  ) {
    
  }

  ngOnInit() {
    
    this.isStartScreen = true
    this.gameScreen = false
    this.player1Name = "Grant"
    this.player2Name = "Devon"
 
    this.populateImages(this.imageNames)
    this.shuffle(this.images)

    this.setUpPlayers()
    
  }

  setUpPlayers(){
    this.player1Setup()
    this.player2Setup()
    this.players.push(this.player1)
    this.players.push(this.player2)
    setTimeout(() => {
      this.whoGoesFirstPopUp(this.player1Name, this.player2Name)
    }, 300)
  }

  async whoGoesFirstPopUp(player1Name, player2Name){
    const choosePlayer = await this.alert.create({
      message: "Please choose who goes first",
      backdropDismiss: false,
      buttons: [{
        text: player1Name,
        handler: () => {
          this.setPlayerToActive(player1Name)
        }
      },
    {
      text: player2Name,
      handler: () => {
        this.setPlayerToActive(player2Name)
      }
    }]
    })

    await choosePlayer.present()
  }

  setPlayerToActive(playerName){
    this.players.forEach(player => {
      if (player.name ===  playerName){
        player.isActive = true
      } 
    })
  }

  player1Setup(){
    this.player1 = {}
    this.player1 = {
      name: this.player1Name,
      score: 0,
      isActive: false
    }
  }

  player2Setup(){
    this.player2 = {}
    this.player2 = {
      name: this.player2Name,
      score: 0,
      isActive: false
    }
  }

  populateImages(imageNames) {
    this.images = []
    for (let i in imageNames) {      
      this.images.push({
        name: imageNames[i],
        isFlipped: false,
        isMatched: false,
        playerName: ""
      })
    }
  }


  letsPlay() {
    if (this.player1Name != undefined && this.player2Name != undefined) {
      this.isStartScreen = false
      this.gameScreen = true
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

    if(c.isFlipped) {
      this.presentAlert("Please select a different card")
    } 

    c.isFlipped = true
  
    for (let i in this.images) {
      if (this.images[i].isFlipped == true && this.images[i].isMatched == false) {
        this.img.push(this.images[i])
        
        if (this.img.length > 2){
          // this.presentAlert("fok!")
          this.img = []
          // this.flipCardsBack()
        }

      } 
     
    }
    if (this.img.length == 2) {
      // check if cards match else switch to new player and set img.isFlipped to false
      
      
      // check if cards match
      // return true if match, current player also gets 2 points, remove cards
      const isMatch = this.checkIfCardsMatch(this.img)
     
      if (isMatch){
        this.presentAlert("It's a match!")
        c.isMatched = true
        this.img = []
      } else {
        this.img = []
        this.flipCardsBack()
      }
      console.log(isMatch);
      this.img = []
      

      // flip cards back

    } else if (this.img.length > 2){
      this.img = []
      console.log(this.img);
      

    } else {
      this.img = []
    }
     
  }

  checkIfCardsMatch(img){
    let firstCardName = img[0].name
    let secondCardName = img[1].name

    // remove last char from strings
    let firstCardNameSliced = firstCardName.slice(0, -1)
    let secondCardNameSliced = secondCardName.slice(0, -1)

    if (firstCardNameSliced === secondCardNameSliced) {
      this.flipIsMatchSwitch(img)
      return true;
    } else {
      return false;
    }

  } 

  flipIsMatchSwitch(img){
    for (let i in this.images) {
      for (let j in img){
        if (this.images[i] == img[j]){
          this.images[i].isMatched = true
        }
      }
      
    }
  }

  flipCardsBack(){
    
    for (let i in this.images) {
      if (this.images[i].isFlipped == true && this.images[i].isMatched == false) {
        setTimeout(() => {
          this.images[i].isFlipped = false

        }, 500)
        
      } 
     
    }
  }


}
