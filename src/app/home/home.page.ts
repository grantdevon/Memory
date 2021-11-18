import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  gameDone: boolean;
  winnerName: string;
  winnerScore = 0;
  didNotWin: string;
  didNotWinScore = 0;
  cardsTotal = 54
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

  currentActivePlayer: string;


  constructor(
    private alert: AlertController,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    
    this.isStartScreen = true
    this.gameScreen = false
    this.gameDone = false
    this.player1Name = ""
    this.player2Name = ""
 
    this.populateImages(this.imageNames)
    this.shuffle(this.images)

    
  }

  setUpPlayers(){
    this.player1Setup()
    this.player2Setup()
    this.players.push(this.player1)
    this.players.push(this.player2)
    
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
        this.currentActivePlayer = player.name
        player.isActive = true
      } 
    })
  }

  player1Setup(){
    this.player1 = {}
    this.player1 = {
      name: this.player1Name,
      score: 0,
      isActive: false,
      isWinner: false
    }
  }

  player2Setup(){
    this.player2 = {}
    this.player2 = {
      name: this.player2Name,
      score: 0,
      isActive: false,
      isWinner: false
    }
  }

  populateImages(imageNames) {
    this.images = []
    for (let i in imageNames) {      
      this.images.push({
        name: imageNames[i],
        isFlipped: false,
        isMatched: false,
      })
    }
  }


  letsPlay() {
    if (this.player1Name != undefined && this.player2Name != undefined) {
      this.isStartScreen = false
      this.gameScreen = true
      this.setUpPlayers()
      setTimeout(() => {
        this.whoGoesFirstPopUp(this.player1Name, this.player2Name)
      }, 300)
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


  selectCard(c) {
    

    if(c.isFlipped) {
      this.presentAlert("Please select a different card")
    } 
    
    c.isFlipped = true
  
    for (let i in this.images) {
      if (this.images[i].isFlipped == true && this.images[i].isMatched == false) {
        this.img.push(this.images[i])
        
        if (this.img.length > 2){
          this.img = []
        }

      } 
     
    }
    if (this.img.length == 2) {

      const isMatch = this.checkIfCardsMatch(this.img)
     
      if (isMatch){
        
        this.presentAlert("It's a match!")
        
        c.isMatched = true
        this.img = []
      } else {
        this.img = []
        this.flipCardsBack()
      }
      this.img = []

    } else if (this.img.length > 2){
      this.img = []
      console.log(this.img);
      

    } else {
      this.img = []
    }
     
  }

  checkIfPlayerWon(){
    let total = this.player1["score"] + this.player2["score"]

    if (total == this.cardsTotal){
      this.matchWon()
    }
    
  }

  matchWon(){
    this.isStartScreen = false
    this.gameScreen = false
    this.gameDone = true

    
    if (this.player1["score"] > this.player2["score"]){
      this.player1["isWinner"] = true
    } else {
      this.player2["isWinner"] = true
    }

    this.players.forEach(player => {
      if (player.isWinner == true){
        this.winnerName = player.name
        this.winnerScore = player.score
      } 
      if (player.isWinner == false){
        this.didNotWin = player.name
        this.didNotWinScore = player.score
      } 
    })
  }

  checkIfCardsMatch(img){
    let firstCardName = img[0].name
    let secondCardName = img[1].name

    // remove last char from strings
    let firstCardNameSliced = firstCardName.slice(0, -1)
    let secondCardNameSliced = secondCardName.slice(0, -1)

    if (firstCardNameSliced === secondCardNameSliced) {
      
      // give current active player 2 points
      this.players.forEach(player => {
        if (player.isActive == true) {
          player.score = player.score+2
        }
      })
      this.switchPlayer()
      this.flipIsMatchSwitch(img)
      this.checkIfPlayerWon()
      return true;
    } else {
      this.switchPlayer()
      return false;
    }

  } 

  switchPlayer(){
    this.players.forEach(player => {
      if (player.isActive == true ){
        player.isActive = false
      } else {
        this.currentActivePlayer = player.name
        player.isActive = true
      }
    })
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

  playAgain(){
    window.location.reload()
  }


}
