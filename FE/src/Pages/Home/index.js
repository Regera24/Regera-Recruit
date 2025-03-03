import './style.scss'
import { useState, useEffect} from 'react';
import { fetchData, fetchData1, fetchData2 } from '../../Utils/Fetch';
import { Link } from 'react-router-dom';
import Intro from './Intro';
import Read from './Read';
import Process from './Process';
import Filter from './Filter';
import Hint from './Hint';
import Feedback from './Feedback';

function Home(){
  const [data, setData] = useState([]);
  const [city,setCity] = useState([]);
  const [tag,setTag]  = useState([]);
  const [datasource,setDatasource] = useState([]);
  const [request,setRequest] = useState([]);

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getData = async () =>{
      const response = await fetchData1("http://localhost:9999/job/all");
      setDatasource(response.data.map((item)=>{
        
        return {
          ...item,
          "companyName": item.companyDTO.companyName,
          "city": item.cityDTOList.reduce((acc, current) => {
          return acc + (acc ? ', ' : '') + current.value;
        }, '')
        }
      }));
      
      const res2 = await fetchData1("http://localhost:9999/job/new");
      setData(res2.data.map((item) => {
        return {
          ...item,
          "city": item.cityDTOList.reduce((acc, current) => {
            return acc + (acc ? ', ' : '') + current.value;
          }, '')
        };
      }));

      const response2 = await fetchData1("http://localhost:9999/city");
      setCity(response2.data.map((item)=>{
        return {
          "value": item.id,
          "label": item.value
        }
      }))

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

  const handleChange1 = (value)=>{
    setRequest({
      "jobReq": value
    })
  }

  const handleChange2 = (value)=>{
    setRequest({
      ...request,
      "cityReq":value
    })
  }

  const handleFilter = async () =>{
    const response = await fetchData2('http://localhost:9999/job', request);
    setDatasource(response.data.map((item)=>{
      return {
        ...item,
        "companyName": item.companyDTO.companyName,
        "city": item.cityDTOList.reduce((acc, current) => {
          return acc + (acc ? ', ' : '') + current.value;
        }, '')
      }
    }));
  }

  return (
    <div className="home">
      <div className='home__inner'>
        <Intro/>
        <Read/>
        <Process/>
        {
          (city.length > 0 && tag.length>0 && datasource.length > 0) && (
            <Filter options={tag} loptions={city} handleChange1={handleChange1} handleChange2={handleChange2} handleFilter={handleFilter} datasource={datasource}/>
          )
        }

        {
          (data.length > 0 ?
            <Hint data={data}/>
           : <div></div>) 
        }

        <Feedback/>
      </div>
    </div>
  )
}

export default Home;