import { Image } from 'antd';
function DCHead(props){
  const {user} = props;
  return (
    <div className='user__header'>
      <div className='user__header__image'>
        <Image
          width={300}
          height={200}
          // src={company.img}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s'
        />
      </div>
      <div className='user__header__name'>
        <h2 style={{marginBottom:'10px'}}>{user.name}</h2>
        <h5 style={{marginLeft:'20px', marginTop:'5px'}}>{user.email}</h5>
      </div>
    </div>
  )
}

export default DCHead;