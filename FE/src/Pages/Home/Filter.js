import { Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Opacity from '../../Animation/Opacity';
function Filter(props){
  const { options, loptions, handleChange1, handleChange2, datasource, handleFilter} =  props;
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      with:'25%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Job title',
      dataIndex: 'title',
      key: 'title',
      with:'20%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Offer',
      dataIndex: 'luong',
      key: 'luong',
      with:'20%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'city',
      dataIndex: 'city',
      key: 'city',
      with:'30%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Details',
      dataIndex: 'id',
      key: 'id',
      with:'5%',
      textWrap: 'word-break',
      ellipsis: true,
      render: (id)=> <a href={'/job/'+id} target='_blank'>Details</a>
    }
  ];
  return (
    <Opacity>
      <div className='home__filter'>
        <h2 className='home__filter__title'>Filter Jobs</h2>
        <div className='home__filter__select'>
          <Select
            mode="multiple"
            placeholder="Please select job tags"
            style={{ width: '48%' , height:'50px'}}
            options={options}
            allowClear
            className='home__filter__select__tag'
            onChange={handleChange1}
          />
          <Select
            mode="multiple"
            placeholder="Please select locations"
            style={{ width: '48%' , height:'50px'}}
            options={loptions}
            allowClear
            className='home__filter__select__location'
            onChange={handleChange2}
          />
          <Button onClick={handleFilter} className='home__filter__select__button' style={{ width: '4%' , height:'50px'}}>
            <SearchOutlined />
          </Button>
        </div>
        <div className='home__filter__table'>
          <Table dataSource={datasource} columns={columns} pagination />
        </div>
      </div>
    </Opacity>
  )
}

export default Filter;