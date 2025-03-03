import { Col, Button, Form,Checkbox, Radio, Select, Input, TreeSelect, DatePicker ,InputNumber } from "antd";
import {DollarOutlined, FormOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { fetchData1 } from "../../Utils/Fetch";
function SearchRight(props){
  const { handleFilter} = props;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [tag,setTag] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    const getData = async()=>{
      const res = await fetchData1('http://localhost:9999/tag');
      setTag(res.data.map((item)=>{
        return {
          "value": item.id,
          "label": item.value
        }}));
      const res2 = await fetchData1('http://localhost:9999/city');
      setCity(res2.data.map((item)=>{
        return {
          "value": item.id,
          "label": item.value
        }}));
    }
    getData();

  },[])

  const onReset = () => {
    form.resetFields(); 
  };
  const onFinish = async (values) => {
    handleFilter(values);
  };

  return (
    <>
      <Col className='search__right' span={7}>
      <div className='search__details'>
        <h2 style={{ textAlign: 'center', fontSize: '28px' }}>Filter</h2>
        <Form
          form={form} 
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish} 
        >
          <Form.Item label="Company" name="company">
            <Input id="companyName" placeholder="write company name" />
          </Form.Item>
          <Form.Item label="Location" name="cityReq">
            <Select
              id="citySelect"
              allowClear
              options={city}
              mode="multiple"
              placeholder="Please select location"
            />
          </Form.Item>
          <Form.Item label="Tag" name="jobReq">
            <Select
              allowClear
              options={tag}
              mode="multiple"
              placeholder="Please select job tags"
            />
          </Form.Item>
          <Form.Item label="Job Type" name="jobType">
            <Select
              placeholder="Please select job type"
            >
              <Select.Option value="Full">Full-time</Select.Option>
              <Select.Option value="part">Part-time</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="From Salary" name="fromSalary">
            <InputNumber id="fromSalary" placeholder="Salary start at "/>
          </Form.Item>
          <Form.Item label="To Salary" name="toSalary">
            <InputNumber placeholder="Salary to "/>
          </Form.Item>
          <Form.Item label="Begin Date" name="createAt">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea placeholder="write some description" rows={4} />
          </Form.Item>

          <Form.Item label="Sort By" name="sort">
            <Select
              defaultValue={'none'}
              placeholder=""
            >
              <Select.Option value="none">None</Select.Option>
              <Select.Option value="date">Newest</Select.Option>
              <Select.Option value="dateR">Oldest</Select.Option>
              <Select.Option value="offer">Offer Increase</Select.Option>
              <Select.Option value="offerR">Offer Decrease</Select.Option>
            </Select>
          </Form.Item>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,width:'100%'}}>
            <Form.Item>
              <Button htmlType="button" className="search__details__button" onClick={onReset}>Reset</Button>
            </Form.Item>
            <Form.Item>
              <Button id="filterButton" className="search__details__button" htmlType="submit">Filter</Button>
            </Form.Item>
            </div>
        </Form>
      </div>
    </Col>
    </>
  )
}

export default SearchRight;