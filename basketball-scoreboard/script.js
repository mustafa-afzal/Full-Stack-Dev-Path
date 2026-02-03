let homeScore = 0;
let awayScore = 0;

function addHome(points) {
    homeScore += points;
    document.getElementById("home-score").textContent = homeScore;
}

function addAway(points) {
    awayScore += points;
    document.getElementById("away-score").textContent = awayScore;
}
