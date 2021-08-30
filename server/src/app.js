const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('幸运大转盘后台系统')
})

app.all('*', function (req, res, next) {
  // 响应头指定了该响应的资源是否被允许与给定的origin共享。*表示所有域都可以访问，同时可以将*改为指定的url，表示只有指定的url可以访问到资源 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // 允许请求资源的方式
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
  });

app.get('/prize', function(req, res) {
  // 随机生成中奖Id和转动次数
  let prize = Math.random() * 100
  // 不同的Id对应的中奖概率分别是[0.20, 0.06, 0.15, 0.15, 0.20, 0.03, 0.06, 0.15]
  if (prize < 20)
  {
    prize = 0
  }
  else if (prize < 26)
  {
    prize = 1
  }
  else if (prize < 41)
  {
    prize = 2
  }
  else if (prize < 56)
  {
    prize = 3
  }
  else if (prize < 76)
  {
    prize = 4
  }
  else if (prize < 79)
  {
    prize = 5
  }
  else if (prize < 85)
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
    data :{
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