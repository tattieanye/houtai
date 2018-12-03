const express = require('express');
const Router = express.Router();
//数据模型引入
const Goods = require('../mongo/model/goods.js')
const Goods2 = require('../mongo/model/goods2.js')
//增加商品
//添加商品信息

/**
 * @api {post} /goods/addGoods/ addGoods
 * @apiName addGoods
 * @apiGroup goods
 *
 * @apiParam {String} name  商品名称
 * @apiParam {String} type 商品类型
 * @apiParam {String} desc 商品描述
 * @apiParam {String} price 商品价格
 * @apiParam {String} imgpath 图片地址
 * @apiParam {Number} stock 商品余额
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/addGoods', (req, res) => {
  // 1.接受数据
  let { name, type, desc, price, imgpath, stock } = req.body
  Goods.insertMany({ name, type, desc, price, imgpath, stock })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: null })
    })
    .catch((err) => {

      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })

})
Router.post('/addGoods2', (req, res) => {
  // 1.接受数据
  let { name, type, desc, price, imgpath, stock } = req.body
  Goods2.insertMany({ name, type, desc, price, imgpath, stock })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: null })
    })
    .catch((err) => {

      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })

})
//查询商品

/**
 * @api {post} /goods/getGoods/ getGoods
 * @apiName getGoods
 * @apiGroup goods
 *
 * @apiParam {Number} pagesize  每页数量
 * @apiParam {Number} page 当前页数
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.get('/getGoods', (req, res) => {
  // Goods.find()查询所有
  // Goods.find({tyle:‘音乐’})//分类查询
  // Goods.find().limit(5).skip(5)//分页查询
  // 1页2条
  // 2   0
  // 2   2
  // 2   4
  // let pagesize=2//每页的条数
  // let page=1//页数o

  let obj = {};
  let { pagesize, page } = req.body
  console.log(page);
  Goods.find()
    .then((data) => {
      obj.total = data.length;
      return Goods.find().limit(Number(pagesize)).skip((Number(page) - 1) * Number(pagesize))
    })

    .then((data) => {
      obj.data = data;
      res.send({ err: 0, msg: '查询成功', data: obj })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '查询错误', data: null })
    })

})



Router.get('/getGoods2', (req, res) => {
  // Goods.find()查询所有
  // Goods.find({tyle:‘音乐’})//分类查询
  // Goods.find().limit(5).skip(5)//分页查询
  // 1页2条
  // 2   0
  // 2   2
  // 2   4
  // let pagesize=2//每页的条数
  // let page=1//页数o

  let obj = {};
  let { pagesize, page } = req.body
  console.log(page);
  Goods2.find()
    .then((data) => {
      obj.total = data.length;
      return Goods2.find().limit(Number(pagesize)).skip((Number(page) - 1) * Number(pagesize))
    })

    .then((data) => {
      obj.data = data;
      res.send({ err: 0, msg: '查询成功', data: obj })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '查询错误', data: null })
    })

})
//修改商品

/**
 * @api {post} /goods/updateGoods/ updateGoods
 * @apiName updateGoods
 * @apiGroup goods
 *
 * @apiParam {String} id  商品的主键id
 * @apiParam {String} name  商品名称
 * @apiParam {String} type 商品类型
 * @apiParam {String} desc 商品描述
 * @apiParam {String} price 商品价格
 * @apiParam {String} imgpath 图片地址
 * @apiParam {Number} stock 商品余额
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/updateGoods', (req, res) => {
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id = req.body.id;
  let { name, type, desc, price, imgpath, stock } = req.body
  console.log(id)
  console.log({ name, type, desc, price, imgpath, stock });
  Goods.update({ _id: id }, { name, type, desc, price, imgpath, stock })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })

})
//删除商品

/**
 * @api {post} /goods/delGood/ delGood
 * @apiName delGood
 * @apiGroup goods
 *
 * @apiParam {String} id  要删除的商品的主键id
 *
 * @apiSuccess {Number} err 错误码 0：ok -1 失败
 * @apiSuccess {String} msg  结果信息
 * @apiSuccess {String} data  返回数据
 */
Router.post('/delGood', (req, res) => {
  //获取商品的唯一索引 主键（_id）
  // 获取修改的值
  // 执行修改

  let id = req.body.id;
  Goods.remove({ _id: id })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: null })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })

})


// 根据传来的id找到某个对应的商品
Router.post('/findGoods', (req, res) => {
  let id = req.body.id;
  Goods.find({ _id: id })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })
})


// m模糊查询 关键字查询
Router.post('/findGoodsByKw', (req, res) => {


  let KW = req.body.KW;
  // Goods.find({name:{$regex:'肉'}})
  Goods.find({ $or: [{ name: { $regex: KW } }, { type: { $regex: KW } }, { desc: { $regex: KW } }] })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })

})


Router.post('/sortPrice', (req, res) => {

  let page = req.body.page;
  let pagesize = req.body.pagesize;
  Goods.find().limit(Number(pagesize)).skip((Number(page) - 1) * Number(pagesize)).sort({ "price": 1 })
    .then((data) => {
      res.send({ err: 0, msg: '1', data: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ err: -1, msg: '0', data: null })
    })
})
module.exports = Router;