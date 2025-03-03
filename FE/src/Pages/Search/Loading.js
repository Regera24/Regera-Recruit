import { Spin } from 'antd';
function Loading(){
  return (
    <>
      <div className='spin'> <Spin size="large" /></div>
    </>
  )
}

export default Loading;