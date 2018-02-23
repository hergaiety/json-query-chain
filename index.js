module.exports = class Query {
  constructor (data) {
    this.data = data
  }

  get results () {
    return this.data
  }

  filter (func) {
    this.data = this.data.filter(func)
    return this
  }

  filterBy (key, func) {
    if (this.data.length && typeof this.data[0] === 'object') {
      this.data = this.data.filter(item => func(item[key]))
    } else console.warn('Attempted to use filterBy with a flat array')
    return this
  }

  search (term, key) {
    switch (typeof term) {
      case 'boolean':
        if (this.data.length && typeof this.data[0] === 'object') {
          this.data = this.data.filter(item => item[key] === term)
        } else console.warn('Attempted to use search by boolean with a flat array')
        break
      case 'string':
        let regFind = new RegExp(term, 'gi')
        let getMatches = item => {
          if (typeof item === 'string') {
            return (item.match(regFind) || []).length
          } else {
            return (item[key].match(regFind) || []).length
          }
        }
        this.data = [...this.data].sort(getMatches).filter(getMatches)
        break
    }
    return this
  }

  sort (func) {
    this.data = [...this.data].sort(func)
    return this
  }

  sortBy (key) {
    if (this.data.length && typeof this.data[0] === 'object') {
      this.data = [...this.data].sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      })
    } else console.warn('Attempted to use sortBy with a flat array')
    return this
  }

  paginate (page = 1, perPage = 10) {
    let min = page * perPage - perPage
    let max = min + perPage
    this.data = this.data.slice(min, max)
    return this
  }
}
