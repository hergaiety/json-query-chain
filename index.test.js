const Query = require('./index');
const TestData = require('./testdata.json');

test('should not modify passed data without chain alterations', () => {
  let query = new Query(TestData)
  .results;

  expect(query).toMatchObject(TestData);
});

test('should paginate with default params', () => {
  let query = new Query(TestData)
  .paginate()
  .results;

  expect(query.length).toBe(9);
});

test('should paginate with custom page length', () => {
  let query = new Query(TestData)
  .paginate(1, 3)
  .results;

  expect(query.length).toBe(3);
  expect(query[0].name).toBe('Haynes Meadows')
});

test('should paginate to second page with custom page length', () => {
  let query = new Query(TestData)
  .paginate(2, 3)
  .results;

  expect(query.length).toBe(3);
  expect(query[0].name).toBe('Howard Buckley')
});

test('should search by boolean isActive', () => {
  let query = new Query(TestData)
  .search('isActive', true)
  .results;

  expect(query.length).toBe(4);
});

test('should search by name', () => {
  let query = new Query(TestData)
  .search('name', 'steele')
  .results;

  expect(query.length).toBe(2);
});

test('should sort by boolean isActive', () => {
  let query = new Query(TestData)
  .sort('isActive')
  .results;

  expect(query[0].name).toBe('Katelyn Steele');
});

test('should sort by string name', () => {
  let query = new Query(TestData)
  .sort('name')
  .results;

  expect(query[0].name).toBe('Dudley Conner');
});

test('should chain everything together', () => {
  let query = new Query(TestData)
  .search('isActive', true)
  .sort('name')
  .paginate(1, 2)
  .results;

  expect(query.length).toBe(2);
  expect(query[0].name).toBe('Dudley Conner');
  expect(query[query.length - 1].name).toBe('Haynes Meadows');
});
