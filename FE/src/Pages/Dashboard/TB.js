import { Table, Tag} from 'antd';
import {SyncOutlined,CheckCircleOutlined} from '@ant-design/icons';
function TB(props){
  const { datasource } = props;
  const columns = [
    {
      title:'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
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
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
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
        <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={datasource}></Table>
      </div>
    </div>
  )
}

export default TB;