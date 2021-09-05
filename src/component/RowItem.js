function RowItem(props) 
{
  const {content, itemId, activedId, pic} = props;
  return (
      <div className = {activedId === itemId ? 'row__item row__item-active' : 'row__item'} id = {`row_item_${itemId}`}>
        <img src = {pic} />
        <figcaption class="caption">{content}</figcaption>
      </div>
  )
}

export default RowItem