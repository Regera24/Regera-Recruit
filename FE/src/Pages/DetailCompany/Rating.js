import { Flex, Rate, Avatar } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './style.scss';
function Rating(props){
  const {review} = props;
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  return (
    <div className='review__item'>
      <div className='review__item__head'>
        <div className='review__item__head__left'>
          <Avatar size="large" icon={<UserOutlined />} />
          <div style={{marginLeft:'20px'}}>
            <div>{review.author}</div>
            <div style={{fontSize:'11px', color:'rgb(177, 177, 177)'}}>{review.creatAt}</div>
          </div>
        </div>
        <Flex gap="middle" vertical>
          <Rate tooltips={desc} value={review.rating} />
        </Flex>
      </div>
      <div className='review__item__body'>{review.comment}</div>
      <div className='review__hr'></div>
    </div>
  )
}

export default Rating;