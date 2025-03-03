import './style.scss';
import { fetchDataWithoutToken } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
import {Col, Flex, Image, Row, Rate} from 'antd';
import { Form,  Spin } from 'antd';
import { useParams } from 'react-router-dom';
import DCHead from './DCHead';
import DCBody from './DCBody';
import Rating from './Rating';
import { getToken, getUsername} from '../../Utils/UserInfo/getIn4'; 
import API from '../../Utils/API/API';
function DCompany(){
  const params = useParams();
  const [company, setCompany] = useState({});
  const token = getToken();
  const [form] = Form.useForm();
  const [spin,setSpin] = useState(false);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getCompany = async ()=>{
      const response = await fetchDataWithoutToken(API.PUBLIC.COMPANY_INFO(params.id));
      setCompany(response.data);
      form.setFieldsValue(response.data);
    }
    getCompany();
  },[form, token])

  return (
    ((company && company.reviews) ? (
      <>
        <div className="user company">
          <DCHead company={company}/>
          <DCBody company={company} form={form} />
          <div className='review'>
            <h2 style={{marginTop:'0px',marginLeft:'20px',fontSize:'21px'}}>Reviews & Comments:</h2>
                <div className='review__tq'>
                  <h1>{company.reviews.reduce((sum,review) => sum+review.rating,0)/company.reviews.length}</h1>
                  <Flex className='custom-rate' gap="middle" vertical>
                    <Rate tooltips={desc} value={company.reviews.reduce((sum,review) => sum+review.rating,0)/company.reviews.length} />
                  </Flex>
                  <h4>({company.reviews.length} reviews)</h4>
                </div>
        
                {
                  company.reviews.map((review)=>{
                    return (
                      <Rating review={review}/>
                    )
                  })
                }
            </div>
        </div>
      </>
    ): 
    <>
      <div style={{marginTop:'1000px'}}></div>
      <div className='spin'>
        <Spin size='large' ></Spin>
      </div>
    </>
    )
  )
}

export default DCompany;