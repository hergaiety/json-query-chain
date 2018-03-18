const Query = require('./index')
const TestData = require('./testdata.json')

const arrayOf100Things = [...Array(100).keys()]

test('should not modify passed data without chain alterations', () => {
  let query = new Query(TestData)
    .results

  expect(query).toMatchObject(TestData)
})

describe('.paginate()', () => {
  test('with a flat array', () => {
    let query = new Query(arrayOf100Things)
      .paginate()
      .results

    expect(query.length).toBe(10)
  })

  test('using default params', () => {
    let query = new Query(TestData)
      .paginate()
      .results

    expect(query.length).toBe(9)
  })

  test('with custom page length, first page', () => {
    let query = new Query(TestData)
      .paginate(1, 3)
      .results

    expect(query.length).toBe(3)
    expect(query[0].name).toBe('Haynes Meadows')
  })

  test('with custom page length, second page', () => {
    let query = new Query(TestData)
      .paginate(2, 3)
      .results

    expect(query.length).toBe(3)
    expect(query[0].name).toBe('Howard Buckley')
  })
})

describe('.search()', () => {
  test('partial string in flat array of strings', () => {
    let query = new Query(['bar', 'foo', 'foobar', 'foofoobar'])
      .search('foo')
      .results

    expect(query[0]).toBe('foofoobar')
    expect(query).toContain('foo')
    expect(query).not.toContain('bar')
  })

  test('by name with value/key', () => {
    let query = new Query(TestData)
      .search('steele', 'name')
      .results

    expect(query.length).toBe(2)
  })

  test('by boolean isActive', () => {
    let query = new Query(TestData)
      .search(true, 'isActive')
      .results

    expect(query.length).toBe(4)
  })

  test('by boolean isActive, false', () => {
    let query = new Query(TestData)
      .search(false, 'isActive')
      .results

    expect(query.length).toBe(5)
  })

  test('warn when searching a flat array of booleans', () => {
    let consoleWarnSpy = jest.spyOn(global.console, 'warn')
    consoleWarnSpy.mockImplementation(() => {})

    let query = new Query(arrayOf100Things)
      .search(true, 'N/A')
      .results

    expect(query).toEqual(arrayOf100Things)
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockReset()
    consoleWarnSpy.mockRestore()
  })
})

describe('.sort()', () => {
  test('with flat array', () => {
    let alphabetical = (a, b) => a > b

    let query = new Query(['foo', 'bar', 'foobar'])
      .sort(alphabetical)
      .results

    expect(query[0]).toBe('bar')
    expect(query[1]).toBe('foo')
    expect(query[2]).toBe('foobar')
  })

  test('with an array of objects', () => {
    let alphabetical = (a, b) => a.name > b.name

    let query = new Query(TestData)
      .sort(alphabetical)
      .results

    expect(query[0].name).toBe('Dudley Conner')
    expect(query[query.length - 1].name).toBe('Wade Steele')
  })
})

describe('.sortBy()', () => {
  test('by boolean', () => {
    let query = new Query(TestData)
      .sortBy('isActive')
      .results

    expect(query[0].name).toBe('Katelyn Steele')
  })

  test('by number', () => {
    let query = new Query(TestData)
      .sortBy('netWorth')
      .results

    expect(query[0].name).toBe('Howard Buckley') // Negative
    expect(query[1].name).toBe('Natalia Petty') // 0
    expect(query[query.length - 1].name).toBe('Newman Mays') // Richest
  })

  test('by string', () => {
    let query = new Query(TestData)
      .sortBy('name')
      .results

    expect(query[0].name).toBe('Dudley Conner')
  })

  test('warn when using sortBy with a flat array', () => {
    let consoleWarnSpy = jest.spyOn(global.console, 'warn')
    consoleWarnSpy.mockImplementation(() => {})

    let query = new Query(arrayOf100Things)
      .sortBy('N/A')
      .results

    expect(query).toEqual(arrayOf100Things)
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockReset()
    consoleWarnSpy.mockRestore()
  })
})

describe('.filter()', () => {
  test('with a flat array', () => {
    let isEven = a => !(a % 2)

    let query = new Query(arrayOf100Things)
      .filter(isEven)
      .results

    expect(query).toContain(2)
    expect(query).not.toContain(1)
  })

  test('with an array of objects', () => {
    let isAgeOver33 = a => a.age > 33

    let query = new Query(TestData)
      .filter(isAgeOver33)
      .results

    expect(query[0].name).toBe('Howard Buckley')
  })
})

describe('.filterBy()', () => {
  test('by key', () => {
    let isNumGT33 = num => num > 33

    let query = new Query(TestData)
      .filterBy('age', isNumGT33)
      .results

    expect(query[0].name).toBe('Howard Buckley')
  })

  test('warn when using filterBy with a flat array', () => {
    let consoleWarnSpy = jest.spyOn(global.console, 'warn')
    consoleWarnSpy.mockImplementation(() => {})

    let query = new Query(arrayOf100Things)
      .filterBy('N/A', () => {})
      .results

    expect(query).toEqual(arrayOf100Things)
    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockReset()
    consoleWarnSpy.mockRestore()
  })
})

describe('chaining everything together', () => {
  test('with a flat array', () => {
    let query = new Query(['bar', 'foo', 'foobar', 'foofoobar'])
      .search('foo')
      .sort()
      .paginate(1, 2)
      .results

    expect(query.length).toBe(2)
    expect(query[0]).toBe('foo')
    expect(query[1]).toBe('foobar')
  })

  test('with an array of objects', () => {
    let query = new Query(TestData)
      .search(true, 'isActive')
      .sortBy('name')
      .paginate(1, 2)
      .results

    expect(query.length).toBe(2)
    expect(query[0].name).toBe('Dudley Conner')
    expect(query[query.length - 1].name).toBe('Haynes Meadows')
  })
})
