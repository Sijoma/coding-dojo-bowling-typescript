export class TooManyRollsError extends Error{
    constructor(){
        super("Game is already over!")
    }
}