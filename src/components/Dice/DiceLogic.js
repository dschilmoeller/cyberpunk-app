// compare result with DV
export default function difficultyRoll(amount, isExploding, difficulty) {

    // Gets a number b/w 1 and 10
    function getRandomInt() {
        const min = Math.ceil(1);
        const max = Math.floor(11);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // as above, but sorted
    function rollDiceSorted(amount) {
        let dieArray = []
        for (let i = 0; i < amount; i++) {
            dieArray.push(getRandomInt());
        }
        return dieArray.sort((a, b) => (a - b));
    }

    // reroll 10s! 
    function explodingDiceSorted(amount) {
        let dieArray = []
        for (let i = 0; i < amount; i++) {
            let dieRolled = getRandomInt()
            if (dieRolled == 10) {
                amount += 1
            }
            dieArray.push(dieRolled)
        }
        return dieArray.sort((a, b) => (a - b));
    }

    let resultArray;
    let successes = 0;
    let glitches = 0;

    if (isExploding === true) {
        resultArray = explodingDiceSorted(amount)
    } else {
        resultArray = rollDiceSorted(amount)
    }

    successes = resultArray.filter((die) => die >= difficulty);
    glitches = resultArray.filter((die) => die == 1);

    let outcome = 0;

    if (successes.length > glitches.length) {
        // outcome = `Success with ${successes.length - glitches.length} successes`
        outcome = 0
    } else if (successes.length == glitches.length) {
        // outcome = `Failure with ${successes.length} hits and ${glitches.length} glitches`
        outcome = 1
    } else {
        // outcome = `Botch with ${successes.length} hits and ${glitches.length} glitches`
        outcome = 2
    }

    // return is: [sorted die array, successes, glitches, success{0}/failure{1}/botch{2}]
    return [resultArray, successes.length, glitches.length, outcome];
}
