# json-query-chain

[![Build Status](https://travis-ci.org/sharpshark28/json-query-chain.svg?branch=master)](https://travis-ci.org/sharpshark28/json-query-chain) [![npm version](https://badge.fury.io/js/json-query-chain.svg)](https://badge.fury.io/js/json-query-chain) ![Code Coverage](coverage.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/4dc20d8b5e6a7334044d/maintainability)](https://codeclimate.com/github/sharpshark28/json-query-chain/maintainability)

Chain queries onto POJOs to return precise results.

## Usage

```javascript
import Query from 'json-query-chain';

let myQ = new Query(someJsonData)
.search('isActiveUser', true)
.results;
```

### Chainable Methods

#### Search

Currently supports booleans and strings. (See [#1](https://github.com/sharpshark28/json-query-chain/issues/1) for Integer Support)

##### By Boolean

```javascript
.search('isActiveUser', true)
```

##### By String

```javascript
.search('name', 'steele')
```

#### Filter

Simpler version of search using a custom function in the chain.

```javascript
.filter(a => a.age >= 21)
```

##### By Key

```javascript
.filterBy('age', x => x >= 21)
```

#### Sort

```
.sort((a, b) => a > b)
```

##### By Boolean

```javascript
.sortBy('isActiveUser')
```

##### By String

```javascript
.sortBy('name')
```

##### By Number

```javascript
.sortBy('netWorth')
```

#### Pagination

Page 1 with 5 results per page.

```javascript
.paginate(1, 5)
```

Page 2 wtih default of 10 results per page.

```javascript
.paginate(2)
```

## Tests

`npm test` runs tests through Jest
