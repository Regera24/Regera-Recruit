import { Liquid } from '@ant-design/plots'

function LiquidChart2(props){
  const {cvr, total} = props;

  const config6 = {
    percent: cvr/total,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    shape: 'pin',
    style: {
      backgroundFill: 'pink',
    },
  };
  return (
    <div className='dashboard__chart__c dashboard__chart__c__c2'>
      <h3>Unread/Total</h3>
        <div>
          <Liquid {...config6} />
        </div>
    </div>
  )
}

export default LiquidChart2;