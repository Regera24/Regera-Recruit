import './style.scss'
import { Row, Col, Spin, Flex, Rate, notification} from 'antd';
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchData1, fetchData2, fetchData, addData, checkStatus, checkSavedJob, deleteData2 } from '../../Utils/Fetch';
import { Link as Scroll, Element } from 'react-scroll';
import {EnvironmentOutlined,MonitorOutlined,SaveOutlined } from '@ant-design/icons'
import PickCv from './PickCv';
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 
import { SharedContext } from '../../Components/Layout';
import { getCurrentDate } from '../../Utils/DateTime';
import { sendNotification } from '../../Utils/Fetch';
import API from '../../Utils/API/API';

function DetailJob(){
  const {sharedState ,setSharedState } = useContext(SharedContext);
  const [api, contextHolder] = notification.useNotification();
  const [user,setUser] = useState();
  const [openCv,setOpenCv] = useState(false);
  const [job,setJob] = useState();
  const [similar,setSimilar] = useState();
  const params = useParams();
  const token = getToken()
  const username = getUsername()
  const role = getRole();
  const [idCvChoose,setIdCvChoose] = useState();
  const [test,setTest] = useState(false);
  const [reload,setReload] = useState(false);

  const handleCheckboxChange = (id) =>{
      setIdCvChoose(id);
  }

  const handleCancel = ()=>{
    setOpenCv(false);
  }

  const handleSendNotification = () =>{
      const message = "You got new job apply! Check it.";
      const data = {
        'message': message,
        'sendAt': getCurrentDate(),
        'targetUserEmail':job.companyDTO.email,
        "type":1
      }
      sendNotification(API.NOTIFICATION.SEND_NOTI,token, data);
    }

  const handleApply = async ()=>{
    if(idCvChoose){
      const check = await checkStatus(`http://localhost:9999/candidate/check/cv?idCv=${idCvChoose}&idJob=${job.id}`,token);
      if(check){
        const response = await addData('http://localhost:9999/candidate/apply',
          {
            "jobId":job.id,
            "cvId":idCvChoose,
            "createAt":getCurrentDate(),
          },token);
          if(response){
            setOpenCv(false);
            success();
            handleSendNotification();
          }else{
            error(response.message);
          }
        }else{
          error('Cv has been used for this Job!!!');
        }
      }else{
        error('Please choose Cv!!!');
      }
  }

  useEffect(()=>{
    const getData = async () =>{
      const response = await fetchData1(`http://localhost:9999/job/${params.jid}`)
      setJob(response.data);
      const response2 = await fetchData2(`http://localhost:9999/job/similar`, {
        "cityReq": response.data.cityDTOList.map((item)=>item.id),
        "jobReq": response.data.tagDTOList.map((item)=> item.id),
      })
      if(role=='USER'){
        const response1 = await fetchData(`http://localhost:9999/candidate/info`,token);
        setUser(response1.data);
        const res3 = await checkSavedJob(`http://localhost:9999/candidate/check/savedjob?idCandidate=${response1.data.id}&idJob=${params.jid}`,token)
        res3 ? setTest(true) : setTest(false);
      }
      setSimilar(response2.data);
    }
    getData();
  },[reload, sharedState])

  const success = () => {
    api['success']({
      message: 'Apply successfully!',
      description:
        'Your cv has been send to recruitor.',
      duration: 3,
    });
  };

  const success2 = (str) => {
    api['success']({
      message: 'Save successfully!',
      description:
        str,
      duration: 3,
    });
  };
  

  const error = (str) => {
    api['error']({
      message: "Apply failed",
      description:
        str,
      duration: 3,
    });
  };

  const handleSavedJob = async ()=>{
      if(token){
        if(role=='USER'){
            if(!test){
              const res = await checkSavedJob(`http://localhost:9999/candidate/savedjob?idCandidate=${user.id}&idJob=${params.jid}`,token)
              if(res){
                success2('The job has been saved to Saved List.');
                setReload(!reload);
                setSharedState(!sharedState);
              }else{
                error(res.message);
              }
            }else{
              const res = await deleteData2(`http://localhost:9999/candidate/${user.id}/savedjob/${params.jid}`,token);
              if(res){
                success2('The job has been deleted from Saved List.');
                setReload(!reload);
                setSharedState(!sharedState);
              }else{
                error.apply(res.message)
              }
            }
        }else{
            error('You must be a candidate to do this action');
        }
      }else{
        error('Please login to do this action');
      }
  }

  const handleOpenCv = () => {
    if(token){
      if(role=='USER' && job.status==1){
          setOpenCv(true);
      }else{
        if(role!=='USER'){
          error('You must be a candidate to apply for this job');
        }
        if(job.status==0){
          error('This job recruitment has expired!');
        }
      }
    }else{
      error('Please login to apply for this job');
    }
  };

  return (
    (job && similar && similar.length>0) ? (
      <Row className='jobdetail'>
        {contextHolder}
      <Col span={16}>
      <div class="job-container">
            <div class="job-image"> 
                <img src={job.companyDTO.img}></img>   
              </div>
          <div class="job-header">
              <div class="job-details">
                  <h1>{job.title}</h1>
                  <p class="company-name">{job.companyDTO.companyName}</p>
                  <p class="location">
                      <span class="icon">&#128205;</span> {job.companyDTO.address}
                  </p>
                  <p class="salary">
                      <span class="icon">&#128176;</span> {job.luong}
                  </p>
                  <p class="date">
                      <span class="icon">&#128197;</span> Posted at: {job.createAt}
                  </p>
                  <p class="date">
                      <span class="icon">&#128197;</span>Status: {job.status==0 ? 'Expired': 'Processing'}
                  </p>
                  <div class="job-actions">
                      <button onClick={handleOpenCv} class="apply-btn">Apply now</button>
                      <button onClick={handleSavedJob} className={'apply-btn job__save' + (test ? ' saved' : '')}><SaveOutlined /></button>
                  </div>
                  
              </div>
          </div>

          <div class="job-tabs">
              <ul>
                  <li><Scroll offset={-140} smooth={true} duration={300} to='des'>Job description</Scroll></li>
                  <li><Scroll offset={-140} smooth={true} duration={300} to='skill'>Skills required</Scroll></li>
                  <li><Scroll offset={-140} smooth={true} duration={300} to='type'>Job Type</Scroll></li>
                  <li><Scroll offset={-140} smooth={true} duration={300} to='location'>Location</Scroll></li>
                  <li><Scroll offset={-140} smooth={true} duration={300} to='about'>About company</Scroll></li>
              </ul>
          </div>

          <div class="job-description">
              <Element name='des'>
                <h2>Job description</h2>
                <ul>
                    <p>{job.description}</p>
                </ul>
              </Element>
          </div>
          <div class="job-description">
              <Element name='skill'>
                <h2>Skills required</h2>
                <ul>
                    {
                      job.tagDTOList.map((item)=>{
                        return <li>{item.value}</li>
                      })
                    }
                </ul>
              </Element>
          </div>
          <div class="job-description">
              <Element name='type'>
                <h2>Job type</h2>
                <ul>
                  <li>{job.jobType}</li>
                </ul>
              </Element>
          </div>
          <div>
              <Element name='location'>
                <h2>Work Location</h2>
                <ul>
                    {
                      job.cityDTOList.map((item)=>{
                        return <li>{item.value}</li>
                      })
                    }
                </ul>
              </Element>
          </div>
          <div>
              <Element name='about'>
                <h2>About Company</h2>
                <ul>
                    <li>Email: {job.companyDTO.email}</li>
                    <li>Phone: {job.companyDTO.phone}</li>
                    <li><a target="_blank" href={'/company/'+job.companyDTO.id}>More information</a></li>
                </ul>
              </Element>
          </div>
      </div>
      </Col>
      <Col span={8}>
        <div className='refjob'>
          <h1 style={{marginTop:'60px'}}>Similar Jobs</h1>
          {
            similar.map((item)=>{
              return <>
                <a href={'/job/'+item.id} className='refjob__item'>
              <div className='refjob__item__left'>
                    <img src={item.companyDTO.img} />
                    </div>
                    <div style={{width:'5%'}}></div>
                    <div className='refjob__item__right'>
                          <div style={{marginTop:'10px', fontSize:'15px', fontWeight:'600'}}>{item.title}</div>
                          <div style={{marginTop:'5px', color:'orangered'}}>{item.companyDTO.companyName}</div>
                          <div style={{marginTop:'5px', color:'gray'}}><EnvironmentOutlined />
                            {
                              ' ' + item.cityDTOList.map((item)=> item.value +' ' )
                            }
                          </div>
                          <div style={{marginTop:'5px', color:'green'}}>Offer: {item.luong}</div>
                          <div style={{marginTop:'5px', color:'rgb(212, 146, 21)'}}><MonitorOutlined />
                            {
                              ' ' + item.tagDTOList.map((item)=> item.value +' ' )
                            }
                          </div>
                    </div>
                </a>
                <div className='refjob__sp'></div>
              </>
            })
          }
        </div>
      </Col>
      {
        (openCv && user) && (
          <>
            <PickCv handleApply={handleApply} handleCancel={handleCancel} idCvChoose={idCvChoose} handleCheckboxChange={handleCheckboxChange} datasource={user ? user.cvs : ''}/>
            <div className='overlay'></div>
          </>
        )
      }
    </Row>
    ) : (
      <>
        <div style={{marginTop:'1000px'}}></div>
        <div className='spin'>
          <Spin size='large' ></Spin>
        </div>
      </>)
  )
}
export default DetailJob;