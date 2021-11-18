# ionic installation
see https://ionicframework.com/docs/intro/cli to install ionic cli

# run project
run `npm i` then run `ionic serve`

# demo url
see https://memory-9710a.web.app/home for a live example 

# personal notes about the project
This project is a *working concept*. Given the limited amount of time (in this case time is described as "limited" because I have a full time job) I rushed this project a bit. 
For now the rules are met but there a many more things still to be done properly:
1. Refactor code, generate services and create individual pages for future scalablity if needed
2. Scalable UI
3. Card flip animation
4. Card timing on live example needs work
5. Smaller things that ties in with 1. e.g refactor code (track score management with NGRX, NGXS. make it less loopy)

These rules have been met:
1. The game should consist of 2 players
2. Only 1 player can play at a time.
3. Shuffle the deck of cards
4. Display all 54 cards (jokers included) face down
5. Clicking the back of a card should turn a card over
6. Player can turn over 2 cards at a time
7. When two cards are turned over:
    7.1 If the number and color of the cards match, the player collects the pair and the cards are removed from the board
    7.2 If the cards do not match, they are turned back over and remain in position
8. The players with the most cards wins

I have also made it that the jokers match.

# To the reader
I hope all is well and I wish you a wonderful day. Peace ☮️ and Love ❤️