import { Form, Col , Row, Input, Checkbox, Button} from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, GithubOutlined, GoogleOutlined,LinkedinOutlined} from '@ant-design/icons';
import './style.scss';
import '../User/style.scss';
import TB from './TB';
import TB2 from './TB2';
function DCBody(props){
  // const { form, company } = props;
  const { handleChange, checked, handleCheck, user, handleOpenCv, handleChangeUser, appliedJob, handleDeleteCv} = props;
  const {handleOpenModal} =props;
  return (
    <div className='user__body'>
          <div className='user__body__checkbox'>
            <Checkbox onChange={handleChange}>Change Information</Checkbox>
          </div>
            <Form
            // form={user}
            onFinish={handleChangeUser}
            initialValues={user}
            disabled={!checked}
            >
              <h2 style={{marginTop:'0px',marginLeft:'20px',marginBottom:'10px'}}>Basic Information</h2>
              <Row gutter={[16,16]}>
                <Col span={12}>
                  <Form.Item name='name'>
                    <Input addonBefore='Name'/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='email'>
                    <Input addonBefore='Email'/>
                  </Form.Item>
                </Col>
              </Row>
              
              <div className='userc__outer'>
                <h2 style={{marginTop:'0px',marginLeft:'20px',marginBottom:'10px'}}>Your CVs</h2>
                <div onClick={handleOpenModal} className='userc__button'>Create CV</div>
              </div>
              <TB handleDeleteCv={handleDeleteCv} handleOpenCv={handleOpenCv} datasource={user.cvs}/>

              <h2 style={{marginTop:'0px',marginLeft:'20px',marginBottom:'10px'}}>Your Applied Jobs</h2>
              <TB2 handleOpenCv={handleOpenCv} datasource={appliedJob}/>

              <h2 style={{marginTop:'0px',marginLeft:'20px',marginBottom:'10px'}}>Social Connection</h2>
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

export default DCBody;