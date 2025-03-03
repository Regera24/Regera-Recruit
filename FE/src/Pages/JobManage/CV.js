import { Col, Row, Form, Input, Button, Table, Tag, Select, message  } from 'antd';
import { CloseOutlined, CloseCircleOutlined, CheckCircleOutlined, SyncOutlined} from '@ant-design/icons';
import {useState, useContext} from 'react';
import { updateStatus } from '../../Utils/Fetch';
import { getToken, getUsername} from '../../Utils/UserInfo/getIn4';  
import { SharedContext } from '../../Components/Layout';

function CV(props){
  const {sharedState ,setSharedState } = useContext(SharedContext);
  const { cv , handleCloseCV } = props;
  const [id,setId] = useState()
  const [modal3,setModal3] = useState(0);
  const [state,setState] = useState();
  const token = getToken();
  const handleChange = (value, id)=>{
    setId(id);
    setModal3(value);
  }
  const handleFetchChange = async () =>{
    if(modal3!=0){
      const res = await updateStatus(`http://localhost:9999/company/status/cv/${id}/${modal3}`,token)
      if(res){
        setModal3(0);
        openMessage();
      }
    }
  }
  const getStatusIcon = (statusId) => {
    switch (statusId) {
      case 1:
        return <SyncOutlined spin />;
      case 2:
        return <CheckCircleOutlined />;
      case 3:
        return <CloseCircleOutlined />;
      default:
        return null;
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
    }, 1000);
  };

  const getStatusText = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Pending'
      case 2:
        return 'Accept'
      case 3:
        return 'Reject'
      default:
        return null;
    }
  };
  const columns = [
    {
      title:'Candidate Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title:'Apply At',
      dataIndex: 'applyAt',
      key: 'applyAt',
      align: 'center'
    },
    {
      title:'Status',
      dataIndex:'status',
      key:'status',
      align: 'center',
      render: (text, record) => {
        return (
          <div>  
            <Select onChange={(value)=>handleChange(value,record.id)} defaultValue={record.status.id} style={{ width: 200 }}>
              <Select.Option value={1}>
                <div style={{textAlign:'center'}}><Tag color='yellow' icon={getStatusIcon(1)}>Pending</Tag></div>
              </Select.Option>
              <Select.Option value={2}>
                <div style={{textAlign:'center'}}><Tag color='green' icon={getStatusIcon(2)}>Accept</Tag></div>
              </Select.Option>
              <Select.Option value={3}>
                <div style={{textAlign:'center'}}><Tag color='red' icon={getStatusIcon(3)}>Reject</Tag></div>
              </Select.Option>
            </Select>
          </div>
        )
      } 
    },
    {
      title:'View details',
      dataIndex:'cvId',
      key:'cvId',
      align: 'center',
      render: (cvId) => <a target='_blank' href={'cv/'+cvId}><Button type='primary'>Details </Button></a>
    }
  ]
  return (
    <>  
        {contextHolder}
        <div className='overlay'></div>
        <div  className='jobmanage__edit fade-in' style={{width:'800px'}}>
          <h2>List CVs
            <Table columns={columns} dataSource={cv}/>
          </h2>
          <div onClick={handleCloseCV} className='jobmanage__edit__close'>
              <CloseOutlined />
          </div>
        </div>
        {
          modal3!=0 && (
            <div>
              <div style={{zIndex:'1000000'}} className='overlay'></div>
              <div style={{width:'400px',zIndex:'1000001'}} className='jobmanage__edit fade-in'>
                <h2 style={{textAlign:'center'}}>Are u sure to change this Cv status to {getStatusText(modal3)}</h2>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Button style={{margin:'10px'}}  type="primary" danger onClick={()=>{setModal3(0);setSharedState(!sharedState)}}>No</Button>
                  <Button style={{margin:'10px'}} type="primary" onClick={()=>{handleFetchChange()}}>Yes</Button>
                </div>
              </div>
            </div>
          )
        }
      </>
  )
}

export default CV;