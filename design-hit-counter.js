/*
362. Design Hit Counter Medium
Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).

Your system should accept a timestamp parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., timestamp is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the HitCounter class:

HitCounter() Initializes the object of the hit counter system.
void hit(int timestamp) Records a hit that happened at timestamp (in seconds). Several hits may happen at the same timestamp.
int getHits(int timestamp) Returns the number of hits in the past 5 minutes from timestamp (i.e., the past 300 seconds).
*/

class HitCounter {
  constructor() {
    this.hits = new Map();
  }

  hit(t) {
    if (!this.hits.has(t)) this.hits.set(t, 0);
    this.hits.set(t, this.hits.get(t) + 1);
  }

  getHits(t) {
    let count = 0;
    const diff = (t - 300) > 0 ? (t - 300) : 0;
    for (const [key, val] of this.hits) {
      if (key > diff) count += val;
    }
    return count;
  }
}

/*
Runtime: 104 ms, faster than 36.54% of JavaScript online submissions for Design Hit Counter.
Memory Usage: 42.7 MB, less than 5.32% of JavaScript online submissions for Design Hit Counter.

*/

const hc = new HitCounter();
hc.hit(1);       // hit at timestamp 1.
hc.hit(2);       // hit at timestamp 2.
hc.hit(3);       // hit at timestamp 3.
// console.log(hc.getHits(4));
// get hits at timestamp 4, return 3.
hc.hit(300);     // hit at timestamp 300.
// console.log(hc.getHits(300)); 
// get hits at timestamp 300, return 4.
console.log(hc.getHits(301)); 
// get hits at timestamp 301, return 3.
 