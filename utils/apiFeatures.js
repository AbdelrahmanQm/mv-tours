class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Excluding features form the query
    const queryObj = { ...this.queryString };
    const excludedQueries = ['page', 'sort', 'filter', 'fields'];
    excludedQueries.forEach((el) => delete queryObj[el]);
    // Advanced filter (ex: api/tours?duration[lt]=5);
    // converting query from { duration : { lt : 5 }} to be { duration : { $lt : 5 }} which works with mongodb filter.
    let filterStr = JSON.stringify(this.queryString);
    filterStr = filterStr.replace(
      /\b(?:lt|lte|gt|gte)\b/,
      (match) => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(filterStr));
    return this;
  }

  filterFields() {
    if (this.queryString.filter) {
      const queryFilter = this.queryString.filter.split(',').join(' ');
      // Model.find().select('firstName lastName role')
      this.query = this.query.select(queryFilter);
    }
    return this;
  }

  sort() {
    // Sorting doc ascending or descending sort (ex: api/tours?sort=-createdAt)
    if (this.queryString.sort) {
      // Tour.find('createdAt -avgRating')
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  paginate() {
    // Paginating docs with limit and page
    const limit = this.queryString.limit * 1 || 10; // limit = 20 or default = 10 (* 1 to convert it to number))
    const page = this.queryString.page * 1 || 1; // page = 2 || default = 1 ( * 1 to convert it to number)
    const skip = limit * (page - 1); // skip 1 to 10, if limit = 10 & page = 2 >> skip = 10

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
