import {Row, Checkbox, Col, Input, Button, Form} from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, GithubOutlined, GoogleOutlined,LinkedinOutlined} from '@ant-design/icons';

function Body(props){
  const {form, checked, company, handleFinish, handleChange, handleCheck} = props;
  return (
    <div className='user__body'>
      <div className='user__body__checkbox'>
        <Checkbox onChange={handleChange}>Change Information</Checkbox>
      </div>
      <Form
      form={form}
      disabled={!checked}
      initialValues={company}
      onFinish={handleFinish}
      >
        <h2 style={{marginTop:'0px',marginLeft:'20px'}}>Basic Information</h2>
        <Row gutter={[16,16]}>
          <Col span={12}>
            <Form.Item name='companyName'>
              <Input addonBefore='Company Name'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='email'>
              <Input addonBefore='Email'/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16,16]}>
          <Col span={12}>
            <Form.Item name='phone'>
              <Input  addonBefore='Phone Number'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='address'>
              <Input addonBefore='Address'/>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16,16]}>
          <Col span={12}>
            <Form.Item name='workTime'>
              <Input addonBefore='Working Time'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='website'>
              <Input addonBefore='Website'/>
            </Form.Item>
          </Col>
        </Row>

        <h2 style={{marginTop:'0px',marginLeft:'20px'}}>BIO</h2>
        <Form.Item name='detail'>
          <Input.TextArea rows={7} placeholder='Write something about yourself'/>
        </Form.Item>

        <h2 style={{marginTop:'0px',marginLeft:'20px'}}>Social Connection</h2>
        <div style={{display:'flex'}}>
          <div style={{color:'blue'}} className='user__body__icon user__body__icon__fb'>
            <FacebookOutlined style={{marginRight:'5px', fontSize:'20px'}}  /> Facebook
          </div>
          <div style={{color:'#f77084'}} className='user__body__icon user__body__icon__ins'>
            <InstagramOutlined style={{marginRight:'5px', fontSize:'20px'}}  /> Instagram
          </div>
          <div style={{color:'#4db8ee'}} className='user__body__icon user__body__icon__tw'>
            <TwitterOutlined style={{marginRight:'5px', fontSize:'20px'}} /> Twitter
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{color:'#551a8b'}} className='user__body__icon user__body__icon__gh'>
            <GithubOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  Github
          </div>
          <div style={{color:'#f53e2d'}} className='user__body__icon user__body__icon__gg'>
            <GoogleOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  Google
          </div>
          <div style={{color:'#2180ff'}} className='user__body__icon user__body__icon__lk'>
            <LinkedinOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  LinkedIn
          </div>
        </div>

        {
          checked && (
            <>
              <Row style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'30px'}}>
                <Col style={{margin:'0px 10px'}}>
                  <Button className='user__body__bt' onClick={handleCheck}>Cancel</Button>
                </Col>
                <Col style={{margin:'0px 10px'}}>
                  <Button htmlType='submit' className='user__body__bt'>Save Changes</Button>
                </Col>
              </Row>
            </>
          )
        }

      </Form>
    </div>
  )
}

export default Body;