import { Image } from 'antd';
function Header(props){
  const { company } = props;
  return (
    <div className='user__header'>
      <div className='user__header__image'>
        <Image
          width={300}
          height={200}
          src={company.img}
        />
      </div>
      <div className='user__header__name'>
        <h2 style={{marginBottom:'10px'}}>{company.companyName}</h2>
        <h5 style={{marginLeft:'20px', marginTop:'5px'}}>{company.email}</h5>
      </div>
    </div>
  )
}

export default Header;