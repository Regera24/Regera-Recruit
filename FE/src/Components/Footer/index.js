import './style.scss';
import { Row, Col} from 'antd';
import {GoogleOutlined,InstagramOutlined,YoutubeOutlined,TwitterOutlined,GithubOutlined } from '@ant-design/icons';
function Footer(){
  return (
    <>
      <div className="footer">
        <Row className='footer__row'>
          <Col className='footer__col' span={6}>
            <h3 className='footer__col__title'>Company</h3>
            <h5>About us</h5>
            <h5>Our information</h5>
            <h5>Privacy policy</h5>
            <h5>Affiliate Program</h5>
          </Col>
          <Col className='footer__col' span={6}>
           <h3 className='footer__col__title'>Get help</h3>
            <h5>FAQ</h5>
            <h5>Training</h5>
            <h5>Coaching</h5>
            <h5>Help</h5>
          </Col>
          <Col className='footer__col' span={6}>
            <h3 className='footer__col__title'>Feature</h3>
            <h5>Recruiting</h5>
            <h5>Applying job</h5>
            <h5>Finding job</h5>
          </Col>
          <Col className='footer__col' span={6}>
            <h3 className='footer__col__title'>Follow us</h3>
            <div className='footer__col__icon'>
              <div className='footer__col__icon__i'>
                <GoogleOutlined className='icon' />  
              </div>
              <div className='footer__col__icon__i'>
                <InstagramOutlined className='icon' />  
              </div>
              <div className='footer__col__icon__i'>
                <YoutubeOutlined className='icon' />  
              </div>
              <div className='footer__col__icon__i'>
                <TwitterOutlined className='icon' />  
              </div>
              <div className='footer__col__icon__i'>
                <GithubOutlined className='icon' />  
              </div> 
            </div>
          </Col>
        </Row>
        <div className='footer__text'>
          Copy right by @Regera. All rights reserved.
        </div>
      </div>
    </>
  )
}

export default Footer;