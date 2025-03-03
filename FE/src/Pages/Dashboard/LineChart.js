import { Line } from '@ant-design/plots'
import {useState, useEffect} from 'react';
function LineChart(){
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
  }
  return (
    <div className='dashboard__chart__tb'>
      <h3>Average Salary</h3>
      <div>
        <Line {...config} />
      </div>
    </div>
  )
}

export default LineChart;