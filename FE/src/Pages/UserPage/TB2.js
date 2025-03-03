import { Table, Tag} from 'antd';
import {SyncOutlined,CheckCircleOutlined,FormOutlined,CloseCircleOutlined} from '@ant-design/icons';
function TB2(props){
  const { datasource, handleOpenCv } = props;
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
  const columns = [
    {
      title:'Job description',
      dataIndex: 'jobId',
      key: 'jobId',
      align:'center',
      render: (jobId) => <a target='_blank' href={'/job/'+jobId} className="hover" ><Tag icon={<FormOutlined />}  color='green'>View Job Description</Tag></a> 
    },
    {
      title: 'Cv',
      dataIndex:'cvId',
      key:'cvId',
      align:'center',
      render: (cvId) => <div className="hover" onClick={()=>handleOpenCv(cvId)}><Tag icon={<FormOutlined />}  color='green'>View cv</Tag></div> 
    },
    {
      title:'Apply At',
      dataIndex: 'applyAt',
      key: 'applyAt',
      align:'center'
    },
    {
      title:'Status',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render: (status) => {
        var color = 'green';
        if(status.id==1){
          color ='yellow';
        }
        if(status.id==3){
          color ='red';
        }
        return (
          <div><Tag icon={getStatusIcon(status.id)}  color={color} >{status.value}</Tag></div>
        )
      } 
    }
  ];
  return (
    <div className='dashboard__chart__tb'>
      <div>
        <Table pagination={{ pageSize: 4 }} columns={columns} dataSource={datasource}></Table>
      </div>
    </div>
  )
}

export default TB2;