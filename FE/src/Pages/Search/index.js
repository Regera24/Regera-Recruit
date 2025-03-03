import './style.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData, addData, fetchData2 } from '../../Utils/Fetch';
import {Row, Spin, notification } from 'antd'
import SearchLeft from './SearchLeft';
import SearchRight from './SearchRight';
import ApplyForm from './ApplyForm';
import Loading from './Loading';

function Search(){
  let {keywords} = useParams();
  const [datasource, setDatasource] = useState();
  const [job, setJob] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const success = () => {
    api.success({
      message: 'Apply Successfully',
      description:
        'Your CV has been sent to recuiters',
      duration: 2,
    });
  };

  const failed = () =>{
    api.error({
      message: 'Apply Failed',
      description:
        'An error occured, please try again',
      duration: 2,
    });
  }

  function getNumbers(str) {
    const matches = str.match(/\d+/g); 
    return matches ? matches.map(Number) : []; 
  }

  const handleFilter = async (value) =>{
    const response = await fetchData2('http://localhost:9999/job', 
      {...value,
        "keywords": keywords,
        "status": 1
      });

      if(value.sort=='offerR'){
        const sortedData = response.data.sort((a, b) => {
          const numA = getNumbers(a.luong)[1];
          const numB = getNumbers(b.luong)[1];
    
          return numB - numA;
        });
    
        setDatasource(sortedData.map((item) => {
          return {
            ...item
          }
        }));
      }
      else if(value.sort=='date'){
          const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.createAt); 
          const dateB = new Date(b.createAt);
    
          return dateB - dateA;
        });
    
        setDatasource(sortedData.map((item) => {
          return {
            ...item
          }
        }));
      }else if(value.sort=='dateR'){
          const sortedData = response.data.sort((a, b) => {
          const dateA = new Date(a.createAt); 
          const dateB = new Date(b.createAt);
    
          return dateA - dateB;
        });
    
        setDatasource(sortedData.map((item) => {
          return {
            ...item
          }
        }));
      }else if(value.sort=='offer'){
          const sortedData = response.data.sort((a, b) => {
          const numA = getNumbers(a.luong)[0];
          const numB = getNumbers(b.luong)[0];
    
          return numA - numB;
        });
    
        setDatasource(sortedData.map((item) => {
          return {
            ...item
          }
        }));
      }else{
        setDatasource(response.data.map((item)=>{
          return {
            ...item
          }
        }));
      }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getData = async()=>{
      const res = await fetchData2('http://localhost:9999/job',{"keywords": keywords});
      setDatasource(res.data)
    }
    getData();
  },[keywords, isLoading])


  return (
    <div className='search'>
      {contextHolder}
      {
        ( datasource) ? (
          <>
        <Row className='search__outer'>
          <SearchRight handleFilter={handleFilter} />
          <SearchLeft  datasource={datasource}/>
        </Row>
        {
          isLoading && 
            <>
              <Spin className='spin' size="large" />
            </>
        }
          </>
        ) : <Loading/> }
    </div>
  )
}

export default Search;