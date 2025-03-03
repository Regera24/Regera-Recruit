import { Table,Tag } from 'antd';
import { FormOutlined} from '@ant-design/icons'
function CVTable(props){
  const { job, handleOpenDes, setOpenCV, cv } = props;
  const columns = [
    {
      title:'Job Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title:'View Job description',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => <Tag onClick={()=>handleOpenDes(id)} className='hover' icon={<FormOutlined />}  color='green'>View JD</Tag>
    },
    {
      title:'View Applied CV',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Tag onClick={()=>setOpenCV(id)}  className='hover' icon={<FormOutlined />}  color='green'>View Cvs</Tag>,
      align: 'center'
    }
  ]
  return (
    <div className='cvmanage'>
      <h2 className='cvmanage__title'>CV List</h2>
      <div className='cvmanage__table'>
        {
          (true) && <Table columns={columns} dataSource={job} ></Table>
        }
      </div>
    </div>
  )
}

export default CVTable;