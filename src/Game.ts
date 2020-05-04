import { Frame } from "./Frame";
import { TooManyRollsError } from "./errors/TooManyRollsError";

export class Game {
    private frames: Frame[] = [new Frame(false)];
    private maxFrames = 10;

    constructor() {}

    public addRoll(rolledPins: number): void {
        if(this.frames.length > this.maxFrames){
            throw new TooManyRollsError
        }

        const currentFrame = this.frames[this.frames.length - 1];
        const previousFrame = this.frames[this.frames.length - 2];
        const frameFinished = currentFrame.addRoll(rolledPins, previousFrame);
        if(frameFinished){
            this.addFrame();
        }

        if(frameFinished instanceof Error){
            throw frameFinished;
        }
    }

    public get gameOver(){
        return this.frames.length >= 10;
    }

    public get score(){
        return this.frames.reduce((totalScore, frame) => totalScore + frame.getScore, 0);
    }

    private addFrame(): Frame {
        const newFrame = new Frame(this.frames.length === this.maxFrames - 1);
        this.frames.push(newFrame);
        return newFrame
    }
    

}