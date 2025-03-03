import './style.scss';
import { Form, Input, Button, message,Checkbox } from 'antd';
import { SmileOutlined,TeamOutlined
  ,EnvironmentOutlined,PhoneOutlined,FieldTimeOutlined,WifiOutlined,FileSearchOutlined,UserAddOutlined,GithubOutlined,FacebookOutlined,GoogleOutlined,MailOutlined,UserOutlined} from '@ant-design/icons'
import { useNavigate  } from 'react-router-dom';
import { fetchData, addData, checkAccount, checkValid, registerAccount } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
import Opacity from '../../Animation/Opacity';
function Register(){
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data,setData] = useState([]); 
  const [company, isCompany] = useState(false);
  const [next, setNext] = useState(false);
  const [acc,setAcc] = useState();

  const handleChangeCompany = ()=>{
    isCompany(!company);
  }


  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Sign up successfully',
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

  // const onFinish = (values) =>{
  //   if(data.length > 0 ){
  //     const exist = data.filter((item)=>item.email===values.email);
  //     if(exist.length===0){
  //       const last = data[data.length - 1].id;
  //       const newAcc = {
  //         email: values.email,
  //         password: values.password,
  //         name: values.username,
  //         id: last + 1
  //       }
  //       addData('https://recruit-j7xv.onrender.com/company',newAcc);
  //       success();
  //       setTimeout(()=>{
  //         navigate('/login');
  //       },1000)
  //     }
  //     else{
  //       error();
  //     }
  //   }
  // }

  const handleBack = ()=>{
    setNext(false);
  }

  const handleNext = ()=>{
      setNext(true);
  }

  const handleCreateCompanyAccount = async(values) => {
      const check = await checkValid('http://localhost:9999/check/company', {...values});
      if(check==true){
        const create = await registerAccount('http://localhost:9999/check/register/company',{
          "account":{
            ...acc
          },
          "company":{
            ...values
          }

        })
        if(create){
          success();
          setTimeout(()=>{
            navigate('/login');
          },1000)
        }else{
          error('Failed to create account');
        }
      }else{
        error(check);
      }
  }

  const handleCreateUserAccount = async(values) => {
    const check = await checkValid('http://localhost:9999/check/candidate', {...values});
    if(check==true){
      const create = await registerAccount('http://localhost:9999/check/register/candidate',{
        "account":{
          ...acc
        },
        "candidate":{
          ...values
        }

      })
      if(create){
        success();
        setTimeout(()=>{
          navigate('/login');
        },2000)
      }else{
        error('Failed to create account');
      }
    }else{
      error(check);
    }
  }



  const handleNavi = ()=>{
    navigate('/login');
  }

  const handleFinishForm1 = async (values) =>{
    setAcc(values)
    const check = await checkAccount('http://localhost:9999/check/account', {...values});
    if(check){
      handleNext();
    }else{
      error('Username has already been registered!');
    }
  }

  return (
    <div className="register">
      {contextHolder}
      {
        (next ) ? 
        (
           company ? <>
           <Opacity>
           <div className='register__overlay'></div>
           <div className='register__form'>
              <h2 className='register__title'>CONTINUE FORM</h2>
              <h5 className='register__slogan'>Join Us Today and Start Your Journey to Success!</h5>
              <Form onFinish={handleCreateCompanyAccount}>
                <Form.Item
                  name="companyName"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input company name!',
                    }
                  ]}
                >
                  <Input size='large' placeholder='Input your company name' className='register__form__item__input register__form__item__input__mail' addonAfter={<TeamOutlined />}/>
                </Form.Item>

                <Form.Item
                  name="address"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your address!',
                    },
                  ]}
                >
                  <Input size='large' placeholder='Input Address' className='register__form__item__input register__form__item__input__user' addonAfter={<EnvironmentOutlined />}/>
                </Form.Item>

                <Form.Item
                  initialValue={acc ? acc.email : ''}
                  name="email"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                    {
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Wrong email!',
                    },
                  ]}
                >
                  <Input size='large' placeholder='Input your Email' className='register__form__item__input register__form__item__input__mail' addonAfter={<MailOutlined />}/>
                </Form.Item>

                <Form.Item
                  name="phone"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone!',
                      
                    },
                    {
                      pattern: /^0\d{8,9}$/,
                      message: 'Phone number must be 9 or 10 digits and start with 0!',
                    },
                  ]}
                >
                  <Input size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input phone' addonAfter={<PhoneOutlined />}/>
                </Form.Item>
                <Form.Item
                  name="workTime"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your work time!',
                    }
                  ]}
                >
                  <Input size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input work time' addonAfter={<FieldTimeOutlined />}/>
                </Form.Item>
                <Form.Item
                  name="website"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your website!',
                    }
                  ]}
                >
                  <Input size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input website' addonAfter={<WifiOutlined />}/>
                </Form.Item>
                <Form.Item
                  name="description"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your website!',
                    }
                  ]}
                >
                  <Input size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input description' addonAfter={<FileSearchOutlined />}/>
                </Form.Item>
                <Form.Item
                  name="quantityPeople"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your number of employees!',
                    },
                    {
                      pattern: /^[1-9]\d*$/,
                      message: 'The number of employees must be a positive integer!',
                    },
                  ]}
                >
                  <Input size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input number of employees' addonAfter={<UserAddOutlined />}/>
                </Form.Item>
                <Form.Item
                  name="detail"
                  className='register__form__item'
                  
                >
                  <TextArea rows={4}  size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input detail'/>
                </Form.Item>
                
                <Form.Item className='register__form__b'>
                <Button onClick={handleBack} className='register__form__b__button' htmlType="submit">Back
                </Button>
                  <Button className='register__form__b__button' htmlType="submit">Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
           </Opacity>
           </> : 
           <>
              <Opacity>
              <div className='register__overlay overlay__oke2'></div>
                <div className='register__form form__oke2'>
                    <h2 className='register__title'>CONTINUE FORM</h2>
                    <h5 className='register__slogan'>Join Us Today and Start Your Journey to Success!</h5>
                    <Form onFinish={handleCreateUserAccount}>
                      <Form.Item
                        name="name"
                        className='register__form__item'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          }
                        ]}
                      >
                        <Input id="name" size='large' placeholder='Input your name' className='register__form__item__input register__form__item__input__mail' addonAfter={<UserOutlined />}/>
                      </Form.Item>
                      <Form.Item
                      name="email"
                      className='register__form__item'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                        },
                        {
                          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Wrong email!',
                        },
                      ]}
                    >
                      <Input id='email' size='large' placeholder='Input your Email' className='register__form__item__input register__form__item__input__mail' addonAfter={<MailOutlined />}/>
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      className='register__form__item'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone!',
                          
                        },
                        {
                          pattern: /^0\d{8,9}$/,
                          message: 'Phone number must be 9 or 10 digits and start with 0!',
                        },
                      ]}
                    >
                      <Input id='phoneNumber' size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input phone' addonAfter={<PhoneOutlined />}/>
                    </Form.Item>

                      <Form.Item className='register__form__b'>
                      <Button onClick={handleBack} className='register__form__b__button' htmlType="submit">Back
                      </Button>
                        <Button id='submitButton' className='register__form__b__button' htmlType="submit">Register
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
              </Opacity>

           </>
        ) : 
        <>
          <div className='register__overlay overlay__oke'></div>
            <div className='register__form form__oke'>
              <h2 className='register__title'>SIGN UP</h2>
              <h5 className='register__slogan'>Join Us Today and Start Your Journey to Success!</h5>
              <div className='register__icon'>
                <GoogleOutlined className='register__icon__i'/>
                <FacebookOutlined className='register__icon__i'/>
                <GithubOutlined className='register__icon__i'/>
              </div>
              <Form onFinish={handleFinishForm1}>

                <Form.Item
                  initialValue={acc ? acc.username : ''}
                  name="username"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input id="username" size='large' placeholder='Input Username' className='register__form__item__input register__form__item__input__user' addonAfter={<UserOutlined />}/>
                </Form.Item>

                <Form.Item
                  initialValue={acc ? acc.password : ''}
                  name="password"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    }
                  ]}
                >
                  <Input.Password id='password' size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input password'/>
                </Form.Item>
                <Form.Item
                  initialValue={acc ? acc.password : ''}
                  name="passwordagain"
                  className='register__form__item'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password again!',
                    },({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    })
                  ]}
                >
                  <Input.Password id='passwordAgain' size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input password again'/>
                </Form.Item>
                <Form.Item
                    name="type"
                    wrapperCol={{ offset: 8, span: 16 }}
                    >
                    <Checkbox checked={company} onChange={handleChangeCompany}>Register as Company</Checkbox>
                </Form.Item>
                <h5 className='register__form__text'>You've already had an account. <span onClick={handleNavi} className='register__form__text__bold'>Sign in here!</span></h5>
                <Form.Item className='register__form__b'>
                  <Button id="nextButton" className='register__form__b__button' htmlType="submit">Next
                  </Button>
                </Form.Item>
              </Form>
            </div>  
        </>
      }
    </div>
  )
}

export default Register;