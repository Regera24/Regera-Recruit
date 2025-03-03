import { Table, Tag} from 'antd';
import {SyncOutlined,CheckCircleOutlined} from '@ant-design/icons';
function TB(props){
  const { datasource } = props;
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
      title: 'Status',
      dataIndex:'status',
      key:'status',
      align:'center',
      render: (status) => status ? <Tag icon={<SyncOutlined spin />}  color='processing'>Processing</Tag> : <Tag icon={<CheckCircleOutlined />} color='success'>Completed</Tag>
    }
  ];
  return (
    <div className='dashboard__chart__tb'>
      <h3>Job Processing</h3>
      <div>
        <Table pagination={{ pageSize: 4  }} columns={columns} dataSource={datasource}></Table>
      </div>
    </div>
  )
}

export default TB;