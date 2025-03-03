import './style.scss';
import { Form, Input, Button, message,Checkbox,Spin } from 'antd';
import {MailOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, SmileOutlined,UserOutlined} from '@ant-design/icons'
import { useNavigate  } from 'react-router-dom';
import { checkLogin, sendMail } from '../../Utils/Fetch';
import { useState} from 'react';

function Forget(){
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [loading,setLoading] = useState(false)
  const success = (str) => {
    messageApi.open({
      type:'success',
      content: str,
      duration: 3,
      className: 'message'
    });
  };

  const error = (str) => {
    messageApi.open({
      type: 'error',
      content: str,
      duration: 3,
    });
  };

  const handleSendEmail = async ()=>{
    if(formValues.email && formValues.username){
      setLoading(true)
      const res = await sendMail(`http://localhost:9999/forgot-password?username=${formValues.username}&role=${formValues.type ? 2 : 1}&email=${formValues.email}`);
    if(res){
      setLoading(false);
      success('Email has been sent');
    }else{
      setLoading(false);
      error('Wrong username or email!');
    }
    }else{
      setLoading(false);
      error('Wrong username or email!');
    }
  }

  const onValuesChange = (changedValues, allValues) => {
    setFormValues(allValues); 
  };

  const handleFinish = async (values) => {
    const res = await sendMail(`http://localhost:9999/change-password?username=${formValues.username}&code=${formValues.code}&password=${formValues.password}`);
    if(res){
        success('Password has been changed');
        setTimeout(()=>{
          navigate('/login');
        },1000)
    }else{
        error('Wrong code!');
    }
  }

  return (
    <div className="login">
      {contextHolder}
      <div style={{height:'65vh'}}  className='login__overlay'></div>
      <div style={{height:'65vh'}} className='login__form'>
        <h2 className='login__title'>Forget Pass</h2>
        <h5 className='login__slogan'>Join Us Today and Start Your Journey to Success!</h5>
        <Form
          onFinish={handleFinish}
          onValuesChange={onValuesChange}
          initialValues={{
            type: false, 
          }}
        >
          <Form.Item
            name="username"
            className='login__form__item'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              }
            ]}
          >
            <Input size='large' placeholder='Input your Username' className='login__form__item__input login__form__item__input__mail' addonAfter={<UserOutlined />}/>
          </Form.Item>

          <Form.Item
            name="email"
            className='login__form__item'
            rules={[
              {
                required: true,
                message: 'Please input new password!',
              }
            ]}
          >

            <Input size='large' className='login__form__item__input login__form__item__input__pass' placeholder='Input email' addonAfter={<SmileOutlined/>}/>
          </Form.Item>
          <Form.Item
            name="code"
            className='login__form__item'  
            rules={[
              {
                required: true,
                message: 'Please input code!',
              }
            ]}   
          >
            <Input size='large' className='login__form__item__input login__form__item__input__pass' placeholder='Input code' addonAfter={<MailOutlined/>}/>
          </Form.Item>

          <Form.Item
            name="password"
            className='login__form__item'
            rules={[
              {
                required: true,
                message: 'Please input new password!',
              }
            ]}
          >
            <Input.Password size='large' className='login__form__item__input login__form__item__input__pass' placeholder='Input password'/>
          </Form.Item>

          <Form.Item
                    name="type"
                    wrapperCol={{ offset: 8, span: 16 }}
                    valuePropName="checked"
                    >
                    <Checkbox>Company Account</Checkbox>
          </Form.Item>

          <h5 className='login__form__text'>Don't have an account. <span onClick={()=> navigate('/register')}  className='login__form__text__bold'>Register here!</span></h5>
          <Form.Item style={{marginTop:'20px'}} className='login__form__b'>
            <Button onClick={handleSendEmail} style={{margin:'5px'}} className='login__form__b__button' >Send Email
            </Button>
            <Button  style={{margin:'5px'}} className='login__form__b__button' htmlType="submit">Next
            </Button>
          </Form.Item>
        </Form>
      </div>
        {
          loading && (
            <>
              <div></div>
              <div className='spin'>
                <Spin size='large' ></Spin>
              </div>
            </>
          )
        }
    </div>
  )
}

export default Forget;