import { Bar } from '@ant-design/plots'

function BarChart(props){
  const { da } = props;
  const config5 ={
    data: da,
    xField: 'name',
    yField: 'num',
    shapeField: 'hollow',
    colorField: 'name',
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  }

  return (
    <div className='dashboard__chart__c dashboard__chart__c__c2'>
      <h3>Applied CV</h3>
        <div>
          <Bar {...config5}/>
        </div>
    </div>
  )
}

export default BarChart;