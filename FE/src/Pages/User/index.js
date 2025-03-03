import './style.scss';
import { fetchData, updateData } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
import { Form, notification, Spin } from 'antd';
import Header from './Header';
import Body from './Body';
import { getToken} from '../../Utils/UserInfo/getIn4'; 

function User(){
  const [company, setCompany] = useState();
  const token = getToken();
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [spin,setSpin] = useState(false);

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getCompany = async ()=>{
      const response = await fetchData(`http://localhost:9999/company/info`,token);
      setCompany(response.data);
    }
    getCompany();
  },[])

  const handleChange = (e)=>{
    setChecked(e.target.checked);
  }
  const handleCheck = ()=>{
    setChecked(!checked);
  }

  const success = () => {
    api['success']({
      message: 'Save changes successfully!',
      description:
        'Your data has been changed.',
      duration: 2,
    });
  };

  const warn = () => {
    api['warning']({
      message: 'Nothing change!',
      description:
        'Nothing change, please check it again!.',
      duration: 2,
    });
  };

  const handleFinish = async (values) =>{
    const response = await updateData('http://localhost:9999/company',company.id,{...company,...values},token);
    setSpin(true);
    if(response){
      setTimeout(()=>{
        success();
        setSpin(false)
      },2000)
    }
    else{
      setTimeout(()=>{
        warn();
        setSpin(false);
      },2000)
    }
  }

  return (
    (company && form ? (
      <>
        <div className="user">
        {contextHolder}
          <Header company={company} />
          <Body form={form} checked={checked} company={company} handleFinish={handleFinish} handleChange={handleChange} handleCheck={handleCheck} />
          {
            spin && (
              <div className='spin'>
                <Spin size='large' ></Spin>
              </div>
            )
          }
        </div>
      </>
    ): <>
      <div style={{marginTop:'1000px'}}></div>
      <div className='spin'>
        <Spin size='large' ></Spin>
      </div>
    </>)
  )
}

export default User;