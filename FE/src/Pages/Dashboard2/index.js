import { Col, Row, Tag, Spin } from "antd";
import "./style.scss";
import { useEffect, useState } from "react";
import { fetchDataWithToken } from '../../Utils/Fetch';
import {FallOutlined,RiseOutlined,UserOutlined,SolutionOutlined,MailOutlined} from '@ant-design/icons';
import Chart from "./Chart";
import TB from "../Dashboard2/TB";
import DemoPie from "./PieChart";
import { getToken} from '../../Utils/UserInfo/getIn4'; 
import API from '../../Utils/API/API';
function Dashboard2(){
  const [data,setData] = useState();
  const token = getToken();
  useEffect(()=>{
    const getData = async ()=>{
      const response = await fetchDataWithToken(API.COMPANY.GET_INFO,token);
      setData(response.data);
    }
    getData();
  },[])

  return (
      data ? (<div className="dashboard2">
        <Row>
        <Col span={8} className="dashboard2__left">
              <h3>Overview</h3>
              <h4>KPIs</h4>
              <div className="dashboard2__left__item">
                  <p className="dashboard2__left__item__title">Current Employees</p>
                  <div>
                    <p className="dashboard2__left__item__num">{data.quantityPeople} <UserOutlined /></p>
                    <div>
                      <Tag className="tag" color="green"><RiseOutlined /> 60%</Tag>
                    </div>
                    
                  </div>
                  <div className="space"></div>
              </div>
              <div className="dashboard2__left__item">
                  <p className="dashboard2__left__item__title">Current Applied CVs</p>
                  <div>
                    <p className="dashboard2__left__item__num">{data.numberOfCv} <SolutionOutlined /></p>
                    <div>
                    <Tag className="tag" color="red"><FallOutlined /> 10% </Tag>
                    </div>
                  </div>
                  <div className="space"></div>
              </div>
              <div className="dashboard2__left__item">
                  <p className="dashboard2__left__item__title">Current Opening Jobs</p>
                  <div>
                    <p className="dashboard2__left__item__num">{data.jobDTOList.length} <MailOutlined /></p>
                    <div><Tag className="tag" color="yellow"><FallOutlined /> 15%</Tag></div>
                  </div>
                  <div className="space"></div>
              </div>
              <h4>Analytics</h4>
              <div style={{width:'70%', padding:'0px 50px'}}>
              <DemoPie company={data}/>
              </div>
          </Col>
          <Col span={16} className="dashboard2__right"> 
            <h3>This Year Growth</h3>
            <Chart/>
            <TB datasource={data.jobDTOList}/>
          </Col>
        </Row>
    </div>)
    : (
      <>
        <div style={{marginTop:'1000px'}}></div>
        <div className='spin'>
          <Spin size='large' ></Spin>
        </div>
      </>)
  )
}

export default Dashboard2;