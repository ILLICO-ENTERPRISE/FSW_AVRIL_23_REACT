import './Card.css';

const Card = (props) => {
  const {id, userId, title} = props;
 
  return (
    <div className="CardCss">
      <p>Id: {id}</p><hr/>
      <p>UserId: {userId}</p>
      <p>Title: {title}</p>
    </div>
  )
}

export default Card;