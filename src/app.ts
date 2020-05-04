import { Game } from "./Game";
import * as readlineSync from "readline-sync";

const game = new Game();

while(!game.gameOver){
    readlineSync.keyInYN("next rolll?", () => {

    });
    const roll = Math.random() * 10;
    console.log('the roll ', roll);
    game.addRoll(roll);
    console.log("Your current score: " + game.score);

}


console.log('test', game.score);