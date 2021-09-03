const express = require('express')
const app = express()
const port = 5000
const multiparty = require('multiparty')
// 奖品信息
let content = ['爱奇艺会员', 'MacBook', '精美图书', '餐饮代金券', 'B站大会员', '巴厘岛7日游', 'iPhone 12', '谢谢参与']
let itemId = [0, 1, 2, 3, 4, 5, 6, 7]
let probability = [5, 1, 10, 10, 10, 5, 1, 58]

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.all('*', function (req, res, next) {
  // 解决跨域访问的问题
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // 允许请求资源的方式
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
  });

app.post('/setprize', (req, res) => {
  // 更新奖品和概率列表
  console.log("req",req.body)
  let form = new multiparty.Form();
  form.parse(req, function(err,fields,file){
    console.log(fields.content);
    console.log(fields.probability);
    var str1 = JSON.stringify(fields.content)
    content = str1.substr(2,str1.length-4).split(",")

    var str2 = JSON.stringify(fields.probability)
    var arr = str2.substr(2,str2.length-4).split(",")
    var dataIntArr = []
    arr.forEach(function(data){ dataIntArr.push(+data); });
    probability = dataIntArr
  
    console.log("arr: "+content)
    console.log("arr: "+probability)
    res.send('数据已接收');
  });
})

app.get('/', (req, res) => {
  res.send('幸运大转盘后台系统')
})

app.get('/prizeinfo', function(req, res) {
  console.log("prizeinfo: "+content)
  console.log("prizeinfo: "+probability)
  // 获取奖品和概率列表
  var data = {
    code: 200,
    msg: 'OK',
    data: {
      prize_content: content,
      prize_id: itemId,
      prize_prob: probability,

    }
  }
  res.json(data)
})


app.get('/roll', function(req, res) {
  // 随机生成中奖Id和转动次数
  let prize = Math.trunc(Math.random() * 100)
  console.log("prize"+prize)
  // 获得各区间的概率
  let group = []
  let temp = 0
  for(let k = 0; k < 8; k++ ) {
    temp = temp + probability[k]
    group.push(temp);
  }
  // 按照概率生成中奖Id
  if (prize < group[0]) prize = 0
  else if (prize < group[1]) prize = 1
  else if (prize < group[2]) prize = 2
  else if (prize < group[3]) prize = 3
  else if (prize < group[4]) prize = 4
  else if (prize < group[5]) prize = 5
  else if (prize < group[6]) prize = 6
  else prize = 7
  console.log(prize)
  // 随机生成转动次数
  let times = 8 * Math.floor(Math.random() * 4 + 3)
  var data = {
    code: 200,
    msg: 'OK', 
    data: {
      id: prize,
      time: times
    }
  }
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;