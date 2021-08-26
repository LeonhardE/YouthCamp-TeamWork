import React, { Component } from 'react';
import './App.css';
import RowItem from './component/RowItem.js'

class App extends Component 
{
  constructor() 
  {
    super()
    this.state = 
    {
      // 奖品内容
      content: ['爱奇艺会员', 'MacBook', '精美图书', '餐饮代金券', 'B站大会员', '巴厘岛7日游', 'iPhone 12', '钻石100'],
      // 九宫格ID
      itemId: [0, 1, 2, 3, 4, 5, 6, 7],
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
    // this.state.isRolling为false的时候才能开始抽，不然会重复抽取，造成无法预知的后果
    if (!this.state.isRolling && this.state.gold > 10) 
    {
      // 点击抽奖之后，我个人做法是将于九宫格有关的状态都还原默认
      const balance = this.state.gold - 10
      this.setState({
        activedId: '',
        prizeId: null,
        times: 0,
        actTimes: 0,
        isRolling: true,
        gold: balance
      }, () => {
        // 状态还原之后才能开始真正的抽奖
        this.handlePlay()
      })
    }
    else if (!this.state.isRolling && this.state.gold < 10)
    {
      // 余额不足
      alert('金币余额不足，请充值')
    }
  }

  reCharge()
  {
    // 充值
    const balance = this.state.gold + 100
    this.setState({
      gold: balance
    })
  }

  handlePlay() 
  {
    // 随机获取一个中奖ID
    let prize = Math.floor(Math.random() * 8)
    console.log(prize)
    this.setState({
      prizeId: prize,
      activedId: 0
    })
    // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
    let times = this.state.itemId.length * Math.floor(Math.random() * 4 + 3)
    this.setState({
      times: times
    })
    // 抽奖正式开始↓↓
    this.begin = setInterval(() => 
    {
      let num;

      if (this.state.activedId === this.state.prizeId && this.state.actTimes > this.state.times) 
      {
        // 符合上述所有条件时才是中奖的时候，两个ID相同并且动画执行的次数大于(或等于也行)设定的最小次数
        clearInterval(this.begin)
        this.setState({
          isRolling: false
        })
        alert('恭喜获得 '+ this.state.content[this.state.prizeId] +'！请联系管理员兑换奖品')
        return
      }

      // 以下是动画执行时对id的判断
      if (this.state.activedId === '') 
      {
        num = 0
        this.setState({
          activedId: num
        })
      } 
      else 
      {
        num = this.state.activedId
        if (num === 7) {
          num = 0
          this.setState({
            activedId: num
          })
        } 
        else 
        {
          num = num + 1
          this.setState({
            activedId: num
          })
        }
      }

      this.setState({
        actTimes: this.state.actTimes + 1
      })

    }, 40)
  }

  render() 
  {
    const {content, itemId, activedId, gold} = this.state;
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
        <button className="charge__btn" onClick={() => this.reCharge()}>充值</button>
      </div>
    );
  }
}

export default App;
