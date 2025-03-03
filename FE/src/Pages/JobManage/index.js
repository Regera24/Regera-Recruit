import { Badge, Avatar, Switch, Button, notification} from 'antd';
import {useState, useEffect,useContext} from 'react';
import { fetchData, updateData, addData, fetchData1 } from '../../Utils/Fetch';
import './style.scss'
import { useNavigate} from 'react-router-dom';
import JMTable from './JMTable';
import Edit from './Edit';
import Create from './Create';
import CV from './CV';
import Loading from './Loading';
import CVTable from './CVTable';
import { getToken, getUsername} from '../../Utils/UserInfo/getIn4'; 
import { SharedContext } from '../../Components/Layout';
function JobManage(){
  const {sharedState ,setSharedState } = useContext(SharedContext);
  const navigate = useNavigate();
  const username = getUsername();
  const token = getToken();
  const [company, setCompany] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [modal1, setModal1] = useState();
  const [modal2, setModal2] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();
  const [when,setWhen] = useState(false);
  const [cv, setCv] = useState([]);
  const [cvModal, setCvModal] = useState();
  const [jid, setJid] = useState();

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

  const error = () => {
    api['error']({
      message: 'Create job failed!',
      description:
        'New job cannot be added into data.',
      duration: 2,
    });
  };

  const error2 = () => {
    api['error']({
      message: 'Update job failed!',
      description:
        'New job cannot be updated.',
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

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  useEffect(()=>{
    const getUser = async ()=>{
      const res = await fetchData(`http://localhost:9999/company/info`,token);
      setCompany(res.data);
    }
    getUser();
    },[loading, modal1, modal2,sharedState]
  )

  const handleUser = () => {
    navigate('/user');
  }

  const handleOpenEdit = async (id) =>{
    const res = await fetchData1(`http://localhost:9999/job/${id}`);
    setEdit(res.data);
    setModal2(true);
  }

  const handleOpenCreate = () =>{
    setModal1(true);
  }

  const handleClose1 = ()=>{
    setModal1(false);
  }

  const handleClose2 = ()=>{
    setModal2(false);
    if(when==true){
      setWhen(false);
    }
  }

  const setOpenCV = async (id)=>{
      const res = await fetchData(`http://localhost:9999/company/cv/applyjob?jobId=${id}`,token);
      setCv(res.data);
      setCvModal(true);
  }

  const handleCloseCV = () =>{
    setCvModal(false);
  }

  const handleOpenDes = (id)=>{
      setWhen(true);
      handleOpenEdit(id);
  }

  const handleEdit = async (values) =>{
    const res = await updateData('http://localhost:9999/company/job', edit.id ,
      {
      ...values,
      "updateAt": getCurrentDate(),
      "cities": values.cities.map((item) => ({"id":item})),
      "tags": values.tags.map((item) => ({"id":item}))
      }, token);
      if(res){
        handleClose2();
        success();
      }
      else{
        handleClose2();
      }
  }

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  const handleFinish1 = async (values)=>{
      const response = await addData('http://localhost:9999/company/job',{
        ...values,
        "createAt": getCurrentDate(),
        "updateAt": getCurrentDate(),
        "hehe":2,
        "company":company.id,
        "status":1,
      },token)
      setLoading(true);
      if(response){
        setLoading(false);
        success2();
        handleClose1();
      }else{
        setLoading(false);
        error2();
      }
  }

  return (
      <div className='jobmanage'>
        {(company && company.jobDTOList) ? 
        <>
        {contextHolder}
       <div className='jobmanage__user'>
          <Badge className='jobmanage__user__avt' color='green' dot size='default'> <Avatar className='jobmanage__user__avt__bg' size={50} src={company.img}></Avatar> </Badge>
          <h2 className='jobmanage__user__name'>{company.companyName}</h2>
        </div>

        <JMTable success={success} error={error2} handleOpenEdit={handleOpenEdit} handleOpenCreate={handleOpenCreate} job={company.jobDTOList} />
        {
          (modal1) && (
            <Create handleClose={handleClose1} handleFinish={handleFinish1}/>
          )
        }
        {
          (modal2 && edit) && (
           <Edit when={when} edit={edit} handleClose={handleClose2} handleEdit={handleEdit} />
          )
        }
         <CVTable setOpenCV={setOpenCV} handleOpenDes={handleOpenDes} job={company.jobDTOList}/>
         {
          (cvModal && cv) && (
           <CV id={jid} handleCloseCV={handleCloseCV} cv={cv}/>
          )
         }
        {/* 
        }

        <CVTable columns2={columns2} cvsource={cvsource} cv={cv} j={j}/>

        {
          detail && (
            <CV cvd={cvd} handleClose3={handleClose3} j={j}/>
          )
        }
       */}
       {
          loading && (
           <Loading/>
          )
        }
        </>
        : <Loading/> }
    </div>
  )
}

export default JobManage;