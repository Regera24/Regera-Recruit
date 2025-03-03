import './style.scss'
import { useState, useEffect } from 'react';
import { fetchData } from '../../Utils/Fetch';
import {Avatar, Badge, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import LiquidChart1 from './LiquidChart1';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
import LiquidChart2 from './LiquidChart2';
import TB from './TB';
import LineChart from './LineChart';
import Loading from '../JobManage/Loading';
function Dashboard(){
  const [user, setUser] = useState();
  const [number,setNumber] = useState({});
  const token = localStorage.getItem('token');
  const [datasource,setDatasource] = useState([]);
  const [job, setJob] = useState([]);
  const [cvr, setCVR] = useState([]);
  const [total, setTotal] = useState([]);
  const [da, setDa] = useState([]);
  const navigate = useNavigate();
  const handleUser = () => {
    navigate('/user');
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getUser = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/company?token=${token}`);
        setUser(response[0]);
        const response1 = await fetchData(`https://recruit-j7xv.onrender.com/jobs?idCompany=${response[0].id}`)
        setNumber({
          data: [
            {
              type: 'Number of Employees',
              value: response[0].quantityPeople
            },
            {
              type: 'Number of Jobs',
              value: response1.length
            }
          ],
          colorField: 'type',
          angleField:'value',
          label: {
            text: 'value',
            position: 'outside',
          },
          autoFit: false,
          height: 300,
          legend: {
            color: {
              title: false,
              position: 'right',
              rowPadding: 5,
            },
          },
        }
        );

        const response3 = await fetchData(`https://recruit-j7xv.onrender.com/jobs?idCompany=${response[0].id}`);
        setJob([response3]);
        const response4 = await fetchData(`https://recruit-j7xv.onrender.com/cv?idCompany=${response[0].id}`);
        setDa(response3.map((job,index)=>{
          let count = 0;
          for(let i =0 ; i < response4.length; i++){
            if(response4[i].idJob === job.id){
              ++count;
            }
          }
          return {
            id: job.id,
            name: job.name,
            num: count
          }
        }))
        setTotal(response4.length);
        let count = 0;
        for(let i =0 ; i < response4.length; i++){
          if(response4[i].statusRead){
            ++count;
          }
        }
        setCVR(count);
        setDatasource(response3.map((item,index)=>{
          return {
            key: index,
            jobName: item.name,
            createAt: item.createAt,
            lastUpdate: item.updateAt,
            status: item.status
          }
        }))
      }
    }
    getUser();
  },[])


  return (
      <div className='dashboard'>
        {user ? 
        <>
          <div onClick={handleUser} className='dashboard__user'>
            <Badge className='dashboard__user__avt' color='green' dot size='default'> <Avatar className='dashboard__user__avt__bg' size={50} src={user.img}></Avatar> </Badge>
            <h2 className='dashboard__user__name'>{user.companyName}</h2>
          </div>

          <div className='dashboard__chart'>
            <Row gutter={[10, 10]}>
              <Col span={9}>
                <PieChart number={number} />
              </Col>

              <Col span={6}>
                <LiquidChart1/>
              </Col>
            
              <Col span={9}>
                <AreaChart/>
              </Col>

              <Col span={14}>
                <BarChart da={da} />
              </Col>

              <Col span={10}>
                <LiquidChart2 cvr={cvr} total={total} />
              </Col>

              <Col span={12}>
                <TB datasource={datasource}/>
              </Col>

              <Col span={12}>
                <LineChart/>
              </Col>
            </Row>
          </div>
        </>
        : 
        <Loading/>}
      </div>
  )
}

export default Dashboard;