import { Table, Tag} from 'antd';
import {SyncOutlined,CheckCircleOutlined,FormOutlined,CloseCircleOutlined} from '@ant-design/icons';
function TB(props){
  const { datasource, handleOpenCv, handleDeleteCv } = props;
  const columns = [
    {
      title:'Title',
      dataIndex: 'title',
      key: 'title',
      align:'center'
    },
    {
      title:'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
      align:'center'
    },
    {
      title:'Last Update',
      dataIndex: 'updateAt',
      key: 'updateAt',
      align:'center'
    },
    {
      title: 'Detail',
      dataIndex:'id',
      key:'id',
      align:'center',
      render: (id) => <div className="hover" onClick={()=>handleOpenCv(id)}><Tag icon={<FormOutlined />}  color='green'>View details</Tag></div> 
    },
    {
      title: 'Delete',
      dataIndex:'id',
      key:'id',
      align:'center',
      render: (id) => <div className="hover" onClick={()=>handleDeleteCv(id)}><Tag icon={<CloseCircleOutlined />}  color='red'>Delete</Tag></div> 
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

export default TB;