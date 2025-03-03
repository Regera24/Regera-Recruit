import { Pie } from '@ant-design/plots'

function PieChart(props){
  const {number} = props;
  return (
    <div className='dashboard__chart__c dashboard__chart__c__pie'>
      <h3>Employees/Jobs</h3>
      <div>
        <Pie {...number}/>
      </div>
    </div>
  )
}

export default PieChart;