/*
146. LRU Cache Medium
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
* int get(int key) Return the value of the key if the key exists, otherwise return -1.
* void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.
*/

class Node { // doubly linked
  constructor(key, val) {
    this.key = key
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {}; // map key to node
    this.size = 0;
    // this.cache = {
    //   1: new Node(1, 1),
    // }
    // create dummy nodes
    this.left = new Node(0, 0); // LRU
    this.right = new Node(0, 0);
    // connect them
    this.left.next = this.right; 
    this.right.prev = this.left;
  }

  get(key) {
    if (key in this.cache) {
      this.remove(this.cache[key]);
      this.insert(this.cache[key]);
      return this.cache[key].val;
    }
    return -1;
  }
  
  put(key, val) {
    // if exists: delete from LL, add to the end
    // add to the cache
    if (key in this.cache) {
      this.remove(this.cache[key]);
    }
    const node = new Node(key, val)
    this.cache[key] = node;
    this.insert(this.cache[key]);
    this.size++;
    if (this.size > this.capacity) {
      // remove LRU
      const lru = this.left.next;
      this.remove(lru);
      delete this.cache[lru].key;
      // remove from this.cache
    }
  }

  insert(node) {
    const prev = this.right.prev, next = this.right;
    prev.next = node;
    node.next = next;
    node.prev = prev;
    next.prev = node;
  }

  // remove from list
  remove(node) { // node should no longer be in between
    const prev = node.prev, next = node.next;
    prev.next = next;
    next.prev = prev;
    // need reference to first
    // remove first
  }

}

/*
["LRUCache","put","put","put","put","get","get"]
[[2],[2,1],[1,1],[2,3],[4,1],[1],[2]]
*/

const lRUCache = new LRUCache(2);
lRUCache.put(2, 1); // cache is {2=1}
lRUCache.put(1, 1); // cache is {2=1, 1=1}
lRUCache.put(2, 3); // cache is {1=1, 2=3}
lRUCache.put(4, 1); // cache is {2=3, 4=1}
lRUCache.get(1);    // return -1
lRUCache.get(2);    // returns 3 - cache is {4=1, 2=3}

// PASSES
// const lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4