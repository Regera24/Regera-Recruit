import { Liquid } from '@ant-design/plots'

function LiquidChart1(){
  const config4 = {
    percent: 0.64,
    outline: {
      border: 4,
      distance: 8,
    },
    shape: 'diamond',
    wave: {
      length: 128,
    },
    pattern: {
      type: 'line'
    },
  };

  return (
    <div className='dashboard__chart__c dashboard__chart__c__liquid'>
              <h3>Candidate Percent</h3>
                <div>
                <Liquid {...config4} />
                </div>
              </div>
  )
}

export default LiquidChart1;