import { Col , Row, Form, Input, Select, InputNumber, Button } from 'antd';
import { CloseOutlined, DollarOutlined } from '@ant-design/icons';
import {useState, useEffect} from 'react';
import { fetchData1 } from '../../Utils/Fetch';
function Edit(props){
  const { edit, handleClose, handleEdit, when} = props
  const [city,setCity] = useState();
  const [tag,setTag] = useState();

  function getNumbers(str) {
    const matches = str.match(/\d+/g); 
    return matches ? matches.map(Number) : []; 
  }

  useEffect(()=>{
    const getData = async() =>{
      const response2 = await fetchData1("http://localhost:9999/city");
      setCity(response2.data.map((item)=>{
        return {
          "value": item.id,
          "label": item.value
        }
      }));
      const response3 = await fetchData1("http://localhost:9999/tag");
      setTag(response3.data.map((item)=>{
        return {
          "value": item.id,
          "label":item.value
        }
      }));
    }
    getData();
  },[])
  return (
      <>
        <div className='jobmanage__edit fade-in'>
          <h2 className='jobmanage__edit__title'>{when ? 'Job Description' :'Edit job'}</h2>
            <Form 
              disabled={when}
              onFinish={handleEdit}
              initialValues={
                {...edit,
                "fromSalary":getNumbers(edit.luong)[0], 
                "toSalary":getNumbers(edit.luong)[1],
                "tags":edit.tagDTOList.map((item)=> item.id),
                "cities": edit.cityDTOList.map((item)=> item.id)
                }
              }
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
            >
              <Form.Item
                label='Job Title'
                name='title'
                rules={[{ required: true, message: 'Please input job name!' }]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label='Salary From'
                name='fromSalary'
                rules={[
                  { required: true, message: 'Please input salary' },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Salary must be a positive number!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('toSalary') === undefined || value < getFieldValue('toSalary')) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Salary From must be less than Salary To'));
                    },
                  }),
                ]}
              >
                <InputNumber addonAfter={<DollarOutlined />}/> 
              </Form.Item>

              <Form.Item
                label='Salary To'
                name='toSalary'
                rules={[
                  { required: true, message: 'Please input salary' },
                  {
                    type: 'number',
                    min: 1,
                    message: 'Salary must be a positive number!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('fromSalary') === undefined || value > getFieldValue('fromSalary')) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Salary To must be greater than Salary From'));
                    },
                  }),
                ]}
              >
                <InputNumber addonAfter={<DollarOutlined />} /> 
              </Form.Item>

              <Form.Item
                label='Tags'
                name='tags'
                rules={[{ required: true, message: 'Please select tags' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select job tags"
                  options={tag}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label='Location'
                name='cities'
                rules={[{ required: true, message: 'Please select location' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Please select locations"
                  options={city}
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label='Job Type'
                name='jobType'
                rules={[{ required: true, message: 'Please select job Type' }]}
              >
                <Select
                  placeholder="Please select job type"
                  allowClear
                >
                  <Select.Option value='Full-time'>Full-time</Select.Option>
                  <Select.Option value='Part-time'>Part-time</Select.Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                label='Description'
                name='description'
                rules={[{ required: true, message: 'Please input description' }]}
              >
                <Input.TextArea style={{height:'120px'}} />
              </Form.Item>
              
              {
                !when && (
                  <Row className='jobmanage__edit__inline'>
                    <Col>
                      <Form.Item>
                        <Button onClick={handleClose} className='jobmanage__edit__inline__button'>Cancel</Button>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Button htmlType='submit' className='jobmanage__edit__inline__button'>Edit</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                )
              }
            </Form>
            <div onClick={handleClose} className='jobmanage__edit__close'>
              <CloseOutlined />
            </div>
        </div>
      <div className='overlay'></div>
    </>
  )
}

export default Edit;