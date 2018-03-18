# json-query-chain

[![Build Status](https://travis-ci.org/sharpshark28/json-query-chain.svg?branch=master)](https://travis-ci.org/sharpshark28/json-query-chain) [![npm version](https://badge.fury.io/js/json-query-chain.svg)](https://badge.fury.io/js/json-query-chain) ![Code Coverage](coverage.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/4dc20d8b5e6a7334044d/maintainability)](https://codeclimate.com/github/sharpshark28/json-query-chain/maintainability)

Chain queries onto arrays and arrays of objects to return precise results. See [example usages in the tests](./index.test.js) running on [this test data](./testdata.json).

## Usage

```javascript
import Query from 'json-query-chain';

let query = new Query(someJsonData)
.search('isActiveUser', true)
.results;

console.log('Results: ', query);
```

### Chainable Methods

#### Search

##### By Boolean

Acts as a smart filter returning only elements who's key matches the expected result.

```javascript
.search(true, 'isActiveUser')
```

##### By String

Sorts and filters out any elements in the array not matching the requested value while attempting to raise the best results to the top (most frequent number of occurrences).

```javascript
.search('steele', 'name')
```

#### Filter

Simpler version of search using a custom function in the chain.

```javascript
.filter(a => a.age >= 21)
```

##### By Key

Like `.filter()`, but narrowed down by key.

```javascript
.filterBy('age', x => x >= 21)
```

#### Sort

A chainable version of javascript's built in array sort.

```
.sort((a, b) => a > b)
```

##### By Boolean

Abstracted sort by matching a key to a boolean.

```javascript
.sortBy('isActiveUser')
```

##### By String

Sorts alphabetically based on key.

```javascript
.sortBy('name')
```

##### By Number

Sorts by ascending numerical order based on key.

```javascript
.sortBy('netWorth')
```

#### Pagination

Page 1 with 5 results per page.

```javascript
.paginate(1, 5)
```

Page 2 with default of 10 results per page.

```javascript
.paginate(2)
```

## Tests

`npm test` runs tests through Jest
