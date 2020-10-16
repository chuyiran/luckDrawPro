

const advancedResult = (model, populate) => async (req, res, next) => {
    let query;
    const reqQuery = { ...req.query };
    // console.log(reqQuery)
    //处理关键字
    const removeFields = ["select", "sort", "page", "limit"]
    //将关键字从url中除出 其中delete是mongoose提供的删除参数方法
    removeFields.forEach(param => delete reqQuery[param])
    //将reqQuery转换为字符串,此时 reqQuery中带的关键字select与sort就已经删除了，只有查询条件了
    let queryStr = JSON.stringify(reqQuery);
    //给查询条件添加$
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/, (match) => `$${match}`)
    //赋值
    query = model.find(JSON.parse(queryStr))
    //在query基础上加条件 处理select条件
    if (req.query.select) {
        let fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }
    //处理sort关键字
    if (req.query.sort) {
        let sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    } else {
        //如果没有排序条件，则默认给出一个排序条件
        query = query.sort('averageCost')
    }
    //处理分页
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await model.countDocuments();
    query.skip(startIndex).limit(limit)
    //是否关联
    if (populate) {
        query = query.populate(populate)
    }
    //查询
    const result = await query;
    //分页返回值
    const pageination = {};
    if (startIndex > 0) {
        pageination.prev = { page: page - 1, limit }
    }
    if (endIndex < total) {
        pageination.next = { page: page + 1, limit }
    }
    res.advancedResult = {
        succes: true,
        count: result.length,
        pageination,
        data: result
    }
    next();

}
module.exports = advancedResult;