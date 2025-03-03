import { Checkbox, Table, Tag} from 'antd';
import {SyncOutlined,CheckCircleOutlined,FormOutlined} from '@ant-design/icons';
function TB(props){
  const { datasource, handleCheckboxChange, idCvChoose } = props;
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
      title: 'Choose',
      dataIndex:'id',
      key:'id',
      align:'center',
      render: (id) => <div className="hover"><Checkbox checked={idCvChoose==id} onChange={()=>handleCheckboxChange(id)} name='check'>Choose</Checkbox></div> 
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