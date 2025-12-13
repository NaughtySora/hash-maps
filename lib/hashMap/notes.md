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
