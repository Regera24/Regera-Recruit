import { Form, Row, Col, Input, Button} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
function ApplyForm(props){
  const { onCancel, handleFinish} = props;
  return (
    <>
      <div className='overlay'></div>
        <div className='detail'>
          <h2>CV Information</h2>
          <Form 
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
            onFinish={handleFinish}
          >
            <Form.Item
              label='Your Name'
              name='name'
              rules={[{ required: true, message: 'Please input your name' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Phone'
              name='phone'
              rules={[{ required: true, message: 'Please input your phone' },
                {pattern:/^\d{9,12}$/, message:'Wrong phone format'}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, message: 'Please input email' },
                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Wrong email format'}
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Address'
              name='city'
              rules={[{ required: true, message: 'Please input your address' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Link Project'
              name='linkProject'
              rules={[{ required: true, message: 'Please input Project link' }]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label='Description'
              name='description'
              rules={[{ required: true, message: 'Please input description' }]}
            >
              <Input.TextArea style={{height:'120px'}} />
            </Form.Item>
            
            <Row className='jobmanage__edit__inline'>
              <Col>
                <Form.Item>
                  <Button onClick={onCancel} className='jobmanage__edit__inline__button'>Cancel</Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button htmlType='submit' className='jobmanage__edit__inline__button'>Apply</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div onClick={onCancel} className='detail__close'>
            <CloseOutlined />
          </div>
        </div>
      </>
  )
}

export default ApplyForm;