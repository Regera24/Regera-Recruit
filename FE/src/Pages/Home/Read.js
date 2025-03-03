import { Row, Col } from 'antd';
import left from '../../Components/png/left_img.png';
import right from '../../Components/png/righttt.png';
import { Element } from 'react-scroll';
import { motion, useInView} from 'framer-motion';
import ToLeft from '../../Animation/ToLeft';
import ToRight from '../../Animation/ToRight';
function Read(){
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,     
  });

  return (
    <div className='home__read'>
        <Element name='content'><h1>Website Value</h1></Element>
        <div className='home__read__inner'>
          <Row className='home__read__item__left home__read__item'>
            
            <Col span={10}> 
              <ToLeft>
                <img src={left}></img>
              </ToLeft>
            </Col>
            <Col span={3}></Col>
            <Col span={11} className='home__read__item__left__text home__read__item__text'>
              <ToRight>
                  <h2>Innovative job search</h2>
                  <p>Discover opportunities tailored to your career goals. Find the right match for your professional aspirations and take the next step in your career journey with confidence.</p>
              </ToRight>
            </Col>
          </Row>
          <Row className='home__read__item__right home__read__item'>
            <Col span={11} className='home__read__item__right__text home__read__item__text'>
              <ToLeft>
                <h2>Streamline the hiring process</h2>
                <p>Enhance your recruitment efforts with our efficient tools and resources. Simplify candidate evaluation, reduce time-to-hire, and ensure you find the best talent for your team.</p>
              </ToLeft>
            </Col>
            <Col span={3}></Col>
            <Col span={10}>
              <ToRight>
                <img src={right}></img>
              </ToRight>
            </Col>
          </Row>   
        </div>
    </div>
  )
}

export default Read;