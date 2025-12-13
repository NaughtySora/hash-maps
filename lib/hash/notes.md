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