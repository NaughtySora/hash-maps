# TreeMap
- based on some of BST trees
- deterministic performance O(log n)
- uses comparator function, (a, b): a < b ? -1 : a > b ? 1 : 0
- keys are sorted
- no collision, no hash functions

### Important concepts
- binary search trees
- invariants
- rotations
- balancing conditions
- comparator logic
- recursion vs iteration tradeoffs

## Trees
*has to use self-balancing trees to guarantee height ~ log2(n), predictable performance*
- Red-Black Tree
- AVL Tree
- B-Trees

## Structure
*uses more pointers/memory*
- key
- value
- left and right children
- parent pointer (usually)
- meta balancing meta (color, etc)

## Structure advantages
#### Range queries
- get all keys between n and m
#### Traversal ordered 
- iterations
#### Get nearest/predecessor/successor

#### Insert
- compare key
- go left or right
- insert
- rebalance if needed
#### Lookup
- compare key
- traverse left or right
- stop when found or null
#### Delete
- remove node
- reattach children
- rebalance

### Good for
- real-time systems
- adversarial inputs
- security-sensitive code
