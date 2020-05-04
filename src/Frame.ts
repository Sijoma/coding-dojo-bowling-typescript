import { InvalidRollError } from './errors/InvalidRollError';

export class Frame {
    private pinsRolled: number[] = [];
    private score: number = 0;
    private maxPins: number = 10;

    constructor(private lastFrame: boolean) {}

    public get getScore() {
        return this.score
    }

    public addRoll(rolledPins: number, previousFrame?: Frame): Boolean | Error {
        const error = this.invalidRollCheck(rolledPins);
        if(error){
            return error;
        }
        if(previousFrame){
            this.calculateBonusPoints(rolledPins, previousFrame);
        }

        this.setPinsRolled(rolledPins);
        return this.isFinished();
    }

    private isFinished(): boolean {
        return (this.allPinsCleared() && !this.lastFrame) || this.outOfRolls();
    }

    private setPinsRolled(pinsRolled: number): void {
        this.pinsRolled.push(pinsRolled);
        this.score += pinsRolled;
    }

    private calculateBonusPoints(rolledPins: number, previousFrame: Frame){
        if(previousFrame.isStrike() && !(this.pinsRolled.length === 2)){
            previousFrame.score += rolledPins;
        } else if (previousFrame.isSpare() && this.pinsRolled.length === 0){
            previousFrame.score += rolledPins;
        }
    }

    private allPinsCleared(): boolean {
        return this.pinsRolled.reduce((sum, pins) => sum + pins, 0) === 10
    }

    private outOfRolls(): boolean {
        let maxRolls = 2;
        if (this.lastFrame && this.allPinsCleared) {
            maxRolls += 1
        };
        return this.pinsRolled.length === maxRolls;
    }

    private invalidRollCheck(rolledPins: number): Error | never {
        if (rolledPins > this.maxPins
            || (this.pinsRolled.length === 1 && this.pinsRolled[0] + rolledPins > this.maxPins)
        ) {
            return new InvalidRollError();
        }
    }

    private isStrike(): boolean{
        return this.pinsRolled[0] === 10;
    }

    private isSpare(): boolean{
        return (this.pinsRolled[0] + this.pinsRolled[1]) === 10
    }

}