
import { useState, useEffect } from "react";
import CVForm from "./CVForm";
import DCBody from "./DCBody";
import DCHead from "./DCHead";
import {notification, Spin} from 'antd'
import { addData, deleteData, fetchData, updateData } from "../../Utils/Fetch";
import CVForm2 from "./CVForm2";
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 

function UserPage(){
  const [api, contextHolder] = notification.useNotification();
  const token = getToken();
  const username = getUsername();
  const [user,setUser] = useState();
  const [appliedJob, setAppliedJob] = useState();
  const [checked, setChecked] = useState(false);
  const [modal,setModal] = useState(false);
  const [cv,setCv] = useState();
  const [newCv,setNewCv] = useState();
  const [modal2,setModal2] = useState(false);
  const [spin,setSpin] = useState(false);
  const [reload,setReload] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCv({
      ...newCv,
      [name]: value, 
    });
  };

  const handleInputChange2 = (e) =>{
    const { name, value } = e.target;
    setCv({
     ...cv,
      [name]: value
    });
  }

  const handleDeleteCv = (id)=>{
    const response = deleteData('http://localhost:9999/candidate/cv',id,token);
    setReload(!reload)
    setSpin(true);
    if(response){
      success3();
      setSpin(false);
    }else{
      error();
      setSpin(false);
    }
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

  const success = () => {
    api['success']({
      message: 'Save changes successfully!',
      description:
        'Your data has been changed.',
      duration: 2,
    });
  };

const success2 = () => {
  api['success']({
    message: 'Create job successfully!',
    description:
      'New job has been added into data.',
    duration: 2,
  });
};

const success3 = () => {
  api['success']({
    message: 'Delete job successfully!',
    description:
      'Job has been deleted!.',
    duration: 2,
  });
};

const error = (str) => {
  api['error']({
    message: str,
    description:
      'Not responding.',
    duration: 2,
  });
};

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const response = await addData(`http://localhost:9999/candidate/cv`,
      {
      ...newCv,
      "createAt": getCurrentDate(),
      "updateAt": getCurrentDate(),     
    }, token);
    setSpin(!spin);
    if(response){
      setModal(false);
      success2();
      setSpin(false);
    }else{
      error('Cannot create new CV!');
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  useEffect(()=>{
    const getUser = async ()=>{
      const response = await fetchData(`http://localhost:9999/candidate/info`,token);
      setUser(response.data);
      const response2 = await fetchData(`http://localhost:9999/candidate/appliedjob/${response.data.id}`,token);
      console.log(response2.data)
      setAppliedJob(response2.data);
    }
    getUser();
  },[modal,modal2, reload])

  const handleChange = (e)=>{
    setChecked(e.target.checked);
  }

  const handleOpenCv = async (id)=>{
    const response = await fetchData(`http://localhost:9999/candidate/cv/${id}`,token);
    setCv(response.data);
    setModal2(!modal2);
  }

  const handleUpdate = async (e)=>{
    e.preventDefault();
    const response = await updateData(`http://localhost:9999/candidate/cv`,cv.id,{
      ...cv,
      "updateAt": getCurrentDate(),     
    },token);
    setSpin(!spin);
    if(response){
      setModal2(false);
      success();
      setSpin(false);
    }else{
      error('Cannot update CV!');
    }
  }

  const handleOpenModal2 = ()=>{
    setModal2(!modal2);
  }

  const handleOpenModal = ()=>{
    setModal(!modal);
  }
  const handleCheck = ()=>{
    setChecked(!checked);
  }

  const handleChangeUser = async (values)=>{
    const response = updateData('http://localhost:9999/candidate',user.id,{...values},token);
    setSpin(true);
    if(response){
      setTimeout(()=>{
        success();
        setSpin(false)
      },2000)
    }
    else{
      setTimeout(()=>{
        error('Error');
        setSpin(false);
      },2000)
    }
  }
  return(
      <>
        {
          user ? (
            <div className="user company">
              {contextHolder}
              <DCHead user={user}/>
              <DCBody handleDeleteCv={handleDeleteCv} appliedJob={appliedJob} handleChangeUser={handleChangeUser} handleOpenCv={handleOpenCv} user={user} handleCheck={handleCheck} checked={checked} handleChange={handleChange} handleOpenModal={handleOpenModal}/>
              {
                modal && 
                <>
                  <div className="userc__form">
                    <CVForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleOpenModal={handleOpenModal}/>
                  </div>
                  <div className='overlay'></div>
                </>
              }

              {
                modal2 && 
                <>
                  <div className="userc__form">
                    <CVForm2 cv={cv} handleInputChange={handleInputChange2} handleSubmit={handleUpdate} handleOpenModal={handleOpenModal2}/>
                  </div>
                  <div className='overlay'></div>
                </>
              }

          {
            spin && (
              <div className='spin'>
                <Spin size='large' ></Spin>
              </div>
            )
          }
            </div>
          ) : (
          <>
            <div style={{marginTop:'1000px'}}></div>
            <div className='spin'>
              <Spin size='large' ></Spin>
            </div>
          </>)
        }
      </>
  )
}
export default UserPage;