const express = require('express')
const app = express()
const port = 5000
// 奖品信息
const content = ['爱奇艺会员', 'MacBook', '精美图书', '餐饮代金券', 'B站大会员', '巴厘岛7日游', 'iPhone 12', '谢谢参与']
const itemId = [0, 1, 2, 3, 4, 5, 6, 7]

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

app.get('/', (req, res) => {
  res.send('幸运大转盘后台系统')
})

app.get('/prizeinfo', function(req, res) {
  // 获取奖品列表
  var data = {
    code: 200,
    msg: 'OK',
    data: {
      prize_content: content,
      prize_id: itemId
    }
  }
  res.json(data)
})

app.get('/roll', function(req, res) {
  // 随机生成中奖Id和转动次数
  let prize = Math.random() * 100
  // 不同的Id对应的中奖概率分别是[0.05, 0.01, 0.10, 0.10, 0.10, 0.05, 0.01, 0.58]
  if (prize < 5)
  {
    prize = 0
  }
  else if (prize < 6)
  {
    prize = 1
  }
  else if (prize < 16)
  {
    prize = 2
  }
  else if (prize < 26)
  {
    prize = 3
  }
  else if (prize < 36)
  {
    prize = 4
  }
  else if (prize < 41)
  {
    prize = 5
  }
  else if (prize < 42)
  {
    prize = 6
  }
  else
  {
    prize = 7
  }
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