import React, { Component } from 'react';
import './App.css';
import RowItem from './component/RowItem.js'

const content = ['爱奇艺会员', 'MacBook', '精美图书', '餐饮代金券', 'B站大会员', '巴厘岛7日游', 'iPhone 12', '钻石100']
const itemId = [0, 1, 2, 3, 4, 5, 6, 7]

class App extends Component 
{
  constructor() 
  {
    super()
    this.state = 
    {
      // 被选中的格子的ID
      activedId: '',
      // 中奖ID
      prizeId: null,
      // 获得prizeId之后计算出的动画次数
      times: 0,
      // 当前动画次数
      actTimes: 0,
      // 是否正在抽奖
      isRolling: false,
      // 金币
      gold: 0
    }
  }

  handleBegin() 
  {
    // 判断是否在抽取过程中，以及金币是否足够
    if (!this.state.isRolling && this.state.gold > 10) 
    {
      // 通过后台API获取奖品Id和转动次数
      fetch('http://localhost:5000/prize')
      .then(res => res.json())
      .then((data) => {
        console.log("data")
        console.log(data.data.id)
        console.log(data.data.time)
        // 设置状态
        this.setState({
          activedId: 0,
          actTimes: 0,
          isRolling: true,
          gold: this.state.gold - 10,
          prizeId: data.data.id,
          times: data.data.time
        })
      })
      // 抽奖动画执行开始
      this.begin = setInterval(() => 
      {
        if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) 
        {
          // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
          clearInterval(this.begin)
          this.setState({
            isRolling: false
          })
          alert('恭喜获得 '+ content[this.state.prizeId] +'！请联系管理员兑换奖品')
          return
        }
        // 以下是动画执行时对id的判断
        if (this.state.activedId === 7) 
        {
          this.setState({
            activedId: 0,
            actTimes: this.state.actTimes + 1
          })
        } 
        else 
        {
          this.setState({
            activedId: this.state.activedId + 1,
            actTimes: this.state.actTimes + 1
          })
        }
      }, 70)
    }
    else if (!this.state.isRolling && this.state.gold < 10)
    {
      // 余额不足
      alert('金币余额不足，请充值')
    }
  }

  chargeGold()
  {
    // 充值
    this.setState({
      gold: this.state.gold + 100
    })
  }

  render() 
  {
    const {activedId, gold} = this.state;
    return (
      <div className="App">
        <p>
          金币: {gold}
        </p>
        <div className="prize">
          <div className="prize__container">
            <div className="container__area">
              <div className="begin__btn" onClick={() => this.handleBegin()}>
                点击开始
              </div>
              <div className="area__row">
                <RowItem content={content[0]} itemId={itemId[0]} activedId={activedId} />
                <RowItem content={content[1]} itemId={itemId[1]} activedId={activedId} />
                <RowItem content={content[2]} itemId={itemId[2]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={content[7]} itemId={itemId[7]} activedId={activedId} />
                <RowItem content={content[3]} itemId={itemId[3]} activedId={activedId} />
              </div>
              <div className="area__row">
                <RowItem content={content[6]} itemId={itemId[6]} activedId={activedId} />
                <RowItem content={content[5]} itemId={itemId[5]} activedId={activedId} />
                <RowItem content={content[4]} itemId={itemId[4]} activedId={activedId} />
              </div>
            </div>
          </div>
        </div>
        <button className="charge__btn" onClick={() => this.chargeGold()}>充值</button>
      </div>
    );
  }
}

export default App;
