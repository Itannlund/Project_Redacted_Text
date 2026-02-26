//start point
let points = 100
let gameloop = true

function point_set(points: number, action: number): Number | boolean {
    //remove points
    if (action === 1 && points === 10) {
        gameloop = false
        return gameloop //går att göra att gameloopen bryts ifall man gör fel gisning och har
                        // 0 poäng, går också göra med while (points > 0)
    }
    if (action === 2) {
        return points //incase something should happen when correct guess
    }
    else (action === 1)
        points = points - 10 //10 can be changed depending on difficulty
        return points
}



