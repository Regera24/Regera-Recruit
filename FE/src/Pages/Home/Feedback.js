import { Row, Col } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import avt1 from '../../Components/png/avt1.jpg'
import avt2 from '../../Components/png/avt2.jpg'
import avt3 from '../../Components/png/avt3.jpg'
import Down from '../../Animation/Down';
import Upper from '../../Animation/Upper';
import LeftLeft from '../../Animation/LeftLeft';
import RightRight from '../../Animation/RightRight';

function Feedback(){
  return (
    <div className='home__feedback'>
          <Down>
            <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
              <h3>What do they say</h3>
              <p>Hear from our users who have found success with our platform. Join the community that trusts us to deliver results.</p>
            </div>
          </Down>
          <Row className='home__feedback__inner'>
            <Col className='pd' span={8}>
              <LeftLeft>
                <div className='home__feedback__inner__item'>
                  <MessageOutlined className='home__feedback__inner__item__icon' />
                  <p>I found the platform incredibly intuitive and efficient. It’s a game-changer for anyone looking to improve their productivity.</p>
                  <div className='home__feedback__inner__item__author'>
                    <img src={avt1}></img>
                    <div className='home__feedback__inner__item__author__right'>
                      <h4>John Wick</h4>
                      <p style={{color:'red'}}>Software Engineer</p>
                    </div>
                  </div>
                </div>
              </LeftLeft>
            </Col>
            <Col className='pd' span={8}>
              <Upper>
                <div className='home__feedback__inner__item'>
                  <MessageOutlined className='home__feedback__inner__item__icon' />
                  <p>As a human resource professional, this platform made hiring much simpler. It really helped speed up our recruitment process.</p>
                  <div className='home__feedback__inner__item__author'>
                    <img src={avt2}></img>
                    <div className='home__feedback__inner__item__author__right'>
                      <h4>Jasmine Nguyen</h4>
                      <p style={{color:'red'}}>Human Resource</p>
                    </div>
                  </div>
                </div>
              </Upper>
            </Col>
            <Col className='pd' span={8}>
              <RightRight>
                <div className='home__feedback__inner__item'>
                  <MessageOutlined className='home__feedback__inner__item__icon' />
                  <p>The interface is user-friendly, and I could quickly connect with clients. It’s a great tool for managing my work.</p>
                  <div className='home__feedback__inner__item__author'>
                    <img src={avt3}></img>
                    <div className='home__feedback__inner__item__author__right'>
                      <h4>James Maddie</h4>
                      <p style={{color:'red'}}>Freelancer</p>
                    </div>
                  </div>
                </div>
              </RightRight>
            </Col>
          </Row>
        </div>
  )
}

export default Feedback;