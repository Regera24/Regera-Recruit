import { Area } from '@ant-design/plots'

function AreaChart(){
  const data2 = [
    {
      year: '2017',
      value: 10,
      name: 'Front-End',
    },
    {
      year: '2017',
      value: 12,
      name: 'Back-End',
    },
    {
      year: '2017',
      value: 7,
      name: 'Unity',
    },
    {
      year: '2018',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2018',
      value: 2,
      name: 'Back-End',
    },
    {
      year: '2018',
      value: 1,
      name: 'Unity',
    },
    {
      year: '2019',
      value: 1,
      name: 'Front-End',
    },
    {
      year: '2019',
      value: 7,
      name: 'Back-End',
    },
    {
      year: '2019',
      value: 1,
      name: 'Unity',
    },
    {
      year: '2020',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2020',
      value: 4,
      name: 'Back-End',
    },
    {
      year: '2020',
      value: 3.5,
      name: 'Unity',
    },
    {
      year: '2021',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2021',
      value: 5,
      name: 'Back-End',
    },
    {
      year: '2021',
      value: 5,
      name: 'Unity',
    },
    {
      year: '2022',
      value: 2,
      name: 'Front-End',
    },
    {
      year: '2022',
      value: 2,
      name: 'Back-End',
    },
    {
      year: '2022',
      value: 6,
      name: 'Unity',
    },
    {
      year: '2023',
      value: 5,
      name: 'Front-End',
    },
    {
      year: '2023',
      value: 5,
      name: 'Back-End',
    },
    {
      year: '2023',
      value: 5,
      name: 'Unity',
    },
    {
      year: '2024',
      value: 6,
      name: 'Front-End',
    },
    {
      year: '2024',
      value: 7,
      name: 'Back-End',
    },
    {
      year: '2024',
      value: 8,
      name: 'Unity',
    },
  ];

  const config2 = {
    data: data2,
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    colorField:'name',
    stack: {
      orderBy: 'maxIndex',
      reverse: true,
    },
    autoFit: false,
    height: 300,
  }
  return (
    <div className='dashboard__chart__c dashboard__chart__c__area'>
      <h3>Increasing/Decreasing Position</h3>
        <div>
          <Area {...config2}/>
        </div>
    </div>
  )
}

export default AreaChart;