import { Button, Table, Switch, Tag } from 'antd';
import { updateStatus } from '../../Utils/Fetch';
import { getToken } from '../../Utils/UserInfo/getIn4';

function JMTable(props){
  const { job, handleOpenCreate, handleOpenEdit, success, error } = props;
  const token = getToken();

  const handleChange = async (value,id) =>{
    let x = (value ? 1 : 0);
    const res = await updateStatus(`http://localhost:9999/company/job/status/${id}?status=${x}`,token);
    if(res){
      success();
    }else{
      error();
    }
  }

  const columns = [
    {
      title:'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title:'Offer',
      dataIndex: 'luong',
      key: 'luong',
    },
    {
      title:'Tags',
      dataIndex: 'tagDTOList',
      key: 'tagDTOList',
      render: tagDTOList => tagDTOList.map((item,index)=>{
        return <Tag key={index} color='success'>{item.value}</Tag>
      })
    },
    {
      title:'Location',
      dataIndex: 'cityDTOList',
      key: 'cityDTOList',
      render: cityDTOList => cityDTOList.map((item,index)=>{
        return <Tag key={index} color='success'>{item.value}</Tag>
      })
    },
    {
      title:'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title:'Last Update',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Status',
      dataIndex:'status',
      key:'status',
      render: (status,index,record) =>  <Switch onChange={(value)=>handleChange(value,index.id)} checkedChildren="End" unCheckedChildren="On going" defaultChecked={status} />
    },
    {
      title: 'Edit',
      dataIndex:'id',
      key: 'id',
      render: (id)=> <div onClick={()=>handleOpenEdit(id)}><Button type='primary' >Edit</Button></div>
    }
  ];

  return (
    <div className='jobmanage__table'>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h2 className='jobmanage__table__title'>Jobs List</h2>
        <Button onClick={handleOpenCreate} className='jobmanage__table__create'>Create Job</Button>
      </div>
      <div className='jobmanage__table__tb'>
        <Table dataSource={job} columns={columns}></Table>
      </div>
    </div>
  )
}

export default JMTable;