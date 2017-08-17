module.exports = class Query {
  constructor (data) {
    this.data = data.map(item => {
      item.sortScore = 0;
      return item;
    });
  };

  get results () {
    return this.data;
  };

  filter (func) {
    this.data = this.data.filter(func);
    return this;
  };

  filterBy (key, func) {
    this.data = this.data.filter(item => func(item[key]));
    return this;
  };

  search (key, term, score = 0) {
    switch (typeof term) {
      case 'boolean':
        this.data = this.data.filter(item => item[key] === term);
        break;
      case 'string':
        if (term.length >= 3) {
          this.data = this.data.filter(item => {
            let regFind = new RegExp(term, 'gi');
            let termMatches = (item[key].match(regFind) || []).length;
            item.sortScore += termMatches;
            return termMatches;
          });
        }
        break;
    }
    return this;
  };

  sort (key = 'sortScore') {
    this.data = this.data.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    return this;
  };

  paginate (page = 1, perPage = 10) {
    let min = page * perPage - perPage;
    let max = min + perPage;
    this.data = this.data.slice(min, max);
    return this;
  };
};
