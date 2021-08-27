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
      // 前端随机获取一个中奖ID，后续工作希望使用NodeJS在后端进行抽奖
      let prize = Math.floor(Math.random() * 8)
      console.log(prize)
      // 随机算出一个动画执行的最小次数，这里可以随机变更数值，按自己的需求来
      let randtimes = itemId.length * Math.floor(Math.random() * 4 + 3)
      // 设置状态
      this.setState({
        activedId: 0,
        prizeId: prize,
        times: randtimes,
        actTimes: 0,
        isRolling: true,
        gold: this.state.gold - 10
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


// 以下是我写的Hooks版本，目前似乎无法完成动画效果，有小伙伴可以看看为什么吗
// function App()
// {
//   const [activedId, setActivedId] = useState(0);
//   const [prizeId, setPrizeId] = useState('');
//   const [times, setTimes] = useState(0);
//   const [actTimes, setActTimes] = useState(0);
//   const [isRolling, setIsRolling] = useState(false);
//   const [gold, setGold] = useState(0);

//   const Charge = () => {
//     // 充值金币
//     setGold(gold + 100)
//   }

//   const handleBegin = () => {
//     if (!isRolling && gold > 10)
//     {
//       setGold(gold - 10)
//       setIsRolling(true)
//       setActivedId(0)
//       // 前端生成随机数决定抽奖结果，后续希望用NodeJS实现后端抽奖
//       let prize = Math.floor(Math.random() * 8)
//       console.log(prize)
//       setPrizeId(prize)
//       // 前端随机决定转动次数
//       let time = itemId.length * Math.floor(Math.random() * 4 + 3)
//       setTimes(time);
      
//       const begin = setInterval(() => 
//       {
//         if (activedId === prizeId && actTimes > times) 
//         {
//           clearInterval(begin)
//           setIsRolling(false)
//           alert('恭喜获得 '+ content[prizeId] +'！请联系管理员兑换奖品')
//         }
//         if (activedId === 7) {
//           setActivedId(0)
//         } 
//         else 
//         {
//           setActivedId(activedId + 1)
//         }
      
//         setActTimes(actTimes + 1)

//       }, 70)
//     }
//     else if (!isRolling && gold < 10)
//     {
//       alert('金币余额不足，请充值')
//     }
//   }
  
//   return (
//           <div className="App">
//             <p>
//               金币: {gold}
//             </p>
//             <div className="prize">
//               <div className="prize__container">
//                 <div className="container__area">
//                   <div className="begin__btn" onClick={handleBegin}>
//                     点击开始
//                   </div>
//                   <div className="area__row">
//                     <RowItem content={content[0]} itemId={itemId[0]} activedId={activedId} />
//                     <RowItem content={content[1]} itemId={itemId[1]} activedId={activedId} />
//                     <RowItem content={content[2]} itemId={itemId[2]} activedId={activedId} />
//                   </div>
//                   <div className="area__row">
//                     <RowItem content={content[7]} itemId={itemId[7]} activedId={activedId} />
//                     <RowItem content={content[3]} itemId={itemId[3]} activedId={activedId} />
//                   </div>
//                   <div className="area__row">
//                     <RowItem content={content[6]} itemId={itemId[6]} activedId={activedId} />
//                     <RowItem content={content[5]} itemId={itemId[5]} activedId={activedId} />
//                     <RowItem content={content[4]} itemId={itemId[4]} activedId={activedId} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button className="charge__btn" onClick={Charge}>充值</button>
//           </div>
//         );
// }

export default App;
