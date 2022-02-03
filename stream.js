class Rating {
  constructor(id, timestamp, rating) {
    this.id = id;
    this.timestamp = timestamp;
    this.rating = rating;
  }
}

/*
Design a stream that accepts ratings for games (by game id) which are received in chronological order. Ratings can be received at roughly the same time. 

Your system should record each rating and be able to return the highest avg rated game.
*/

class Stream {
  constructor() {
    this.games = {};
    // this.games = {
    //   1: {
    //     rating: 0,
    //     ratings: 0,
    //   }
    // }
  }

  rankGame(r) {
    if (!(r.id in this.games)) this.games[r.id] = {rating: 0, ratings: 0};
    this.games[r.id].rating += r.rating;
    this.games[r.id].ratings++;
  }

  getHighestRanked() { 
    let max = -Infinity;
    let gameId;
    for (let game in this.games) {
      const avgRating = this.getAvg(game)
      if (avgRating > max) { // if there's are several highest ranked, we'll return the first
        max = avgRating;
        gameId = game;
      }
    }
    return gameId;
  }

  getAvg(game) { // 1
    return this.games[game].rating / this.games[game].ratings;
  }
}


const r1 = new Rating(1, 1, 3);
const r2 = new Rating(1, 2, 5);
const r3 = new Rating(2, 3, 5);
const r4 = new Rating(2, 4, 1);
const stream = new Stream();
stream.rankGame(r1);
stream.rankGame(r2);
stream.rankGame(r3);
stream.rankGame(r4);
console.log(stream.getHighestRanked());