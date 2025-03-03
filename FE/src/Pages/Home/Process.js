import { Row, Col} from 'antd';
import { RocketOutlined} from '@ant-design/icons';
import Upper from '../../Animation/Upper';
import Down from '../../Animation/Down';
function Process(){
  return (
    <div className='home__process'>
      <Down>
        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <h2>Recruit Process</h2>
          <p className='home__process__text'>From posting jobs to screening candidates, manage everything in one place. Focus on building a strong team while we support you to make informed decisions.</p>
        </div>
      </Down>
      <Row className='home__process__list'>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Create JD</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Post Job</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Find Person</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Get CV</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Contact</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
        <Col className='home__process__list__item' span={4}>
          <Upper>
            <div className='home__process__list__item__inner'>
              <RocketOutlined className='home__process__list__item__inner__icon' />
              <h3>Complete</h3>
              <p>Godard pabst prism fam cuche.</p>
            </div>
          </Upper>
        </Col>
      </Row>
    </div>
  )
}

export default Process;