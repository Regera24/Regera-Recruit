import { Col, Row, Table, Tag } from 'antd';
import { UserOutlined , HomeOutlined, SolutionOutlined, FileSearchOutlined, RiseOutlined, FallOutlined} from '@ant-design/icons'
import './style.scss'
import Chart from './Chart'
import DemoPie from './PieChart'
import { useState } from 'react';

function AdminDashboard(){
  const [selectionType, setSelectionType] = useState('checkbox');

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Company Name',
      dataIndex: 'age',
    },
    {
      title: 'Send At',
      dataIndex: 'address',
    },
    {
      title: 'View Details',
      dataIndex: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sydney No. 1 Lake Park',
    },
  ];

  return (
    <div className="admindb">
      <h2 className='admindb__head'>Dashboard</h2>
      <Row className='section-one'>
        <Col span={6}>
          <div className='section-one__box section-one__box-green'>
            <UserOutlined style={{color:'green'}} className='section-one__box__icon' />
            <div className='section-one__box__num'>2999</div>
            <div className='section-one__box__text section-one__box__text-red'>
              <FallOutlined /> 5% ~ the last month
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className='section-one__box section-one__box-blue'>
            <HomeOutlined style={{color:'rgb(2, 91, 149)'}} className='section-one__box__icon' />
            <div className='section-one__box__num'>2999</div>
            <div className='section-one__box__text section-one__box__text-green'>
              <RiseOutlined /> 2% ~ the last month
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div div className='section-one__box section-one__box-black'>
            <FileSearchOutlined className='section-one__box__icon' />
            <div className='section-one__box__num'>2999</div>
            <div className='section-one__box__text section-one__box__text-green'>
              <RiseOutlined /> 4% ~ the last month
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className='section-one__box section-one__box-orangered'>
            <SolutionOutlined style={{color:'orangered'}} className='section-one__box__icon' />
            <div className='section-one__box__num'>2999</div>
            <div className='section-one__box__text section-one__box__text-green'>
              <RiseOutlined /> 1% ~ the last month
            </div>
          </div>
        </Col>
      </Row>

      <Row className='section-two'>
        <Col span={15}>
          <div className='section-two__chart'>
            <Chart/>
          </div>
        </Col>
        <Col span={9}>
          <div className='section-two__chart'>
              <DemoPie/>
          </div>
        </Col>
      </Row>

      <div className='section-three'>
        <h3>Jobs Recruit Request</h3>
        <div className='section-three__table'>
          <Table columns={columns} dataSource={data}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
          />
        </div>
      </div>

      <div className='section-three'>
        <h3>Manage Accounts</h3>
        <div className='section-three__table'>
          <Table columns={columns} dataSource={data}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;