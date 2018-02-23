const Query = require('./index')
const TestData = require('./testdata.json')

const arrayOf100Things = [...Array(100).keys()]

test('should not modify passed data without chain alterations', () => {
  let query = new Query(TestData)
    .results

  expect(query).toMatchObject(TestData)
})

test('should paginate with flat array data', () => {
  let query = new Query(arrayOf100Things)
    .paginate()
    .results

  expect(query.length).toBe(10)
})

test('should paginate with default params', () => {
  let query = new Query(TestData)
    .paginate()
    .results

  expect(query.length).toBe(9)
})

test('should paginate with custom page length', () => {
  let query = new Query(TestData)
    .paginate(1, 3)
    .results

  expect(query.length).toBe(3)
  expect(query[0].name).toBe('Haynes Meadows')
})

test('should paginate to second page with custom page length', () => {
  let query = new Query(TestData)
    .paginate(2, 3)
    .results

  expect(query.length).toBe(3)
  expect(query[0].name).toBe('Howard Buckley')
})

test('should search and sort on flat array of strings', () => {
  let query = new Query(['bar', 'foo', 'foobar', 'foofoobar'])
    .search('foo')
    .results

  expect(query[0]).toBe('foofoobar')
  expect(query).toContain('foo')
  expect(query).not.toContain('bar')
})

test('should search by flat array by boolean', () => {
  let consoleWarnSpy = jest.spyOn(global.console, 'warn')
  consoleWarnSpy.mockImplementation(() => {})

  let query = new Query(arrayOf100Things)
    .search(true, 'dumbKey')
    .results

  expect(query).toEqual(arrayOf100Things)
  expect(consoleWarnSpy).toHaveBeenCalled()

  consoleWarnSpy.mockReset()
  consoleWarnSpy.mockRestore()
})

test('should search by boolean isActive', () => {
  let query = new Query(TestData)
    .search(true, 'isActive')
    .results

  expect(query.length).toBe(4)
})

test('should search partial matching on strings with flat array', () => {
  let query = new Query(['foo', 'bar', 'foobar'])
    .search('foo')
    .results

  expect(query[0]).toBe('foobar')
  expect(query[1]).toBe('foo')
})

test('should search by name', () => {
  let query = new Query(TestData)
    .search('steele', 'name')
    .results

  expect(query.length).toBe(2)
})

test('should sort alphabetically with custom function', () => {
  let alphabetical = (a, b) => a.name > b.name

  let query = new Query(TestData)
    .sort(alphabetical)
    .results

  expect(query[0].name).toBe('Dudley Conner')
  expect(query[query.length - 1].name).toBe('Wade Steele')
})

test('should sort alphabetically with flat array', () => {
  let query = new Query(['foo', 'bar', 'foobar'])
    .sort((a, b) => a > b)
    .results

  expect(query[0]).toBe('bar')
  expect(query[1]).toBe('foo')
  expect(query[2]).toBe('foobar')
})

test('should sortBy do nothing with flat array', () => {
  let consoleWarnSpy = jest.spyOn(global.console, 'warn')
  consoleWarnSpy.mockImplementation(() => {})

  let query = new Query(arrayOf100Things)
    .sortBy('dumbKey')
    .results

  expect(query).toEqual(arrayOf100Things)
  expect(consoleWarnSpy).toHaveBeenCalled()

  consoleWarnSpy.mockReset()
  consoleWarnSpy.mockRestore()
})

test('should sortBy boolean isActive', () => {
  let query = new Query(TestData)
    .sortBy('isActive')
    .results

  expect(query[0].name).toBe('Katelyn Steele')
})

test('should sortBy number netWorth', () => {
  let query = new Query(TestData)
    .sortBy('netWorth')
    .results

  expect(query[0].name).toBe('Howard Buckley') // Negative
  expect(query[1].name).toBe('Natalia Petty') // 0
  expect(query[query.length - 1].name).toBe('Newman Mays') // Richest
})

test('should sortBy string name', () => {
  let query = new Query(TestData)
    .sortBy('name')
    .results

  expect(query[0].name).toBe('Dudley Conner')
})

test('should filter a flat array', () => {
  let isEven = a => !(a % 2)

  let query = new Query(arrayOf100Things)
    .filter(isEven)
    .results

  expect(query).toContain(2)
  expect(query).not.toContain(1)
})

test('should filter', () => {
  let isAgeOver33 = a => a.age > 33

  let query = new Query(TestData)
    .filter(isAgeOver33)
    .results

  expect(query[0].name).toBe('Howard Buckley')
})

test('should filter by key, with flat array', () => {
  let consoleWarnSpy = jest.spyOn(global.console, 'warn')
  consoleWarnSpy.mockImplementation(() => {})

  let query = new Query(arrayOf100Things)
    .filterBy('dumbKey', () => {})
    .results

  expect(query).toEqual(arrayOf100Things)
  expect(consoleWarnSpy).toHaveBeenCalled()

  consoleWarnSpy.mockReset()
  consoleWarnSpy.mockRestore()
})

test('should filter by key', () => {
  let isNumGT33 = num => num > 33

  let query = new Query(TestData)
    .filterBy('age', isNumGT33)
    .results

  expect(query[0].name).toBe('Howard Buckley')
})

test('should chain everything together', () => {
  let query = new Query(TestData)
    .search(true, 'isActive')
    .sortBy('name')
    .paginate(1, 2)
    .results

  expect(query.length).toBe(2)
  expect(query[0].name).toBe('Dudley Conner')
  expect(query[query.length - 1].name).toBe('Haynes Meadows')
})
