function PrizeList(props)
{
    const {List} = props
    const newArr = [];
    List.forEach((ele,index) => {
      var temp = <li key={index}>{ele}</li>;
      newArr.push(temp);
    })
    return (
        <div className="showLists">
          <ul className="listStyle">{newArr}</ul>
        </div>
    )
}

export default PrizeList