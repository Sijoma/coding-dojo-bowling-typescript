import { Game } from '../Game';

describe('Simple Rolls', () => {
    let game;
    beforeEach(() => {
        game = new Game();
    });
    const simpleRolls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    simpleRolls.forEach((roll) => {
        test('Simple Roll [' + roll + ']', () => {
            game.addRoll(roll)
            expect((game.score)).toBe(roll);
        })
    })

});

describe('Game Bonus Points', () => {
    let game;
    beforeEach(() => {
        game = new Game();
    });
    test('Spare Roll', () => {
        game.addRoll(5);
        game.addRoll(5);
        game.addRoll(3);
        game.addRoll(1);
        expect((game.score)).toBe(17);
    });

    test('Strike Roll', () => {
        game.addRoll(10);
        game.addRoll(2);
        game.addRoll(2);
        expect((game.score)).toBe(18);
    });

    test('Double Strike', () => {
        game.addRoll(10);
        game.addRoll(10);
        game.addRoll(5);
        expect((game.score)).toBe(40)
    })

    test('Strike -> Spare -> Gutter -> 2 Pins', () => {
        game.addRoll(10);
        game.addRoll(2);
        game.addRoll(8);
        game.addRoll(0);
        game.addRoll(2);
        expect((game.score)).toBe(32)
    })
});

describe('Game Errors', () => {
    let game;
    beforeEach(() => {
        game = new Game();
    });
    test('Invalid Roll', () => {
        game.addRoll(9);
        expect(() => game.addRoll(2)).toThrowError('Lousy Cheater! That is an invalid roll');
    })
})

describe('Single Game E2E', () => {
    const rolls = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6]
    const totalScores = [1, 5, 9, 14, 20, 24, 34, 39, 59, 59, 61, 68, 71, 83, 87, 107, 111, 127, 133]
    const game = new Game();
    rolls.forEach((roll, index) => {
        test(`Game at Roll: [${index}] - rolling a ${roll} - expecting score [${totalScores[index]}]`, () => {
            game.addRoll(roll);
            expect(game.score).toBe(totalScores[index])
        })
    })

    test('Game should be over', () => {
        expect(game.gameOver).toBe(true);
    })

    test('Roll after game has ended', () => {
        expect(() => game.addRoll(10)).toThrowError('Game is already over!');
    })
})

