function RowItem(props) 
{
  const {content, itemId, activedId} = props;
  return (
      <div className = {activedId === itemId ? 'row__item row__item-active' : 'row__item'} id = {`row_item_${itemId}`}>
        {content}
      </div>
  )
}

export default RowItem