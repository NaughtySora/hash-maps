# hash functions
*deterministic program accepts input returns a 32-bit unsigned integer*

## Categories 

| Category          | Purpose                              |
| ----------------- | ------------------------------------ |
| Non-cryptographic | Hash maps                            |
| Cryptographic     | Security                             |
| Rolling hashes    | Strings / substrings                 |
| Perfect hashes    | Static key sets                      |
| Universal hashes  | Collision resistance (probabilistic) |

## Concept - Take bytes, mix them into an integer
- uses avalanche effect
- entropy spreading

### Ingredients:
- Integer addition
- Multiplication
- XOR
- Bit shifts / rotations
- Modulo
- Prime numbers

## Collisions, Collisions must exist
- Even Cryptographic hashes like SHA-256 collisions exist theoretically, 
it just unlikely

### Pigeonhole principle:
- Infinite inputs
- Finite output space


### Collisions and entropy
- Collisions happen when hash spreads poorly
- Hash design is critical, bad hash leads to clusters O(n) lookup

### Entropy spreading techniques
- XOR + multiply
- rotations
- polynomial weighting
- prime constants

# HashMap
*uses hash function to categorize entry into bucket*

## Bucket index
- **modulo**: hash(key) % capacity
- **bitwise (faster)**:  hash(key) & (capacity - 1), n & (n - 1) === 0

## Collision
*bucket index already in use*

### handled by:
- linked lists
- arrays
- trees, keeps lookup O(log n)
- open addressing

### Hashing 
- strings by value
- numbers by value or multiplied with constant
- booleans or small integers naturally mapped
- objects hashed by identity / reference

### Hashes Needed for:
- predictable bucket indexing
- avoiding integer overflow issues

### Lookup: 
hash -> bucket -> search inside bucket O(n) | O(1) | O(log n)

### Capacity
- capacity is amount of buckets
- low capacity leads to great amount of collision
- high capacity leads to  wasted memory

### Resizing
- usually automatically
- new bucket -> rehash all exists keys
- resize factor often 70-75% of capacity triggers resizing

#### Insert
- hash key
- get bucket index
- if key present perform update, else store **key and value**
#### Lookup
- hash key
- get bucket index
- search, return
#### Delete
- hash key
- get bucket index
- search, remove

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
