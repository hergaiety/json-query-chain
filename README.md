# json-query-chain

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

#### Sort

Currently supports booleans and strings. (See [#1](https://github.com/sharpshark28/json-query-chain/issues/2) for Integer Support)

##### By Boolean

```javascript
.sort('isActiveUser', true)
```

##### By String

```javascript
.sort('name')
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
