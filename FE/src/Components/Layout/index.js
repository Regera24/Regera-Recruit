import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import {Layout} from 'antd'
import {useEffect, useState, createContext} from 'react';
import './style.scss';
const SharedContext = createContext();
function DLayout(){
  const { Sider} = Layout;
  const [sharedState, setSharedState] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SharedContext.Provider value={{ sharedState, setSharedState }}>
      <div>
        <Header style={{marginLeft:'10%'}} collapsed={collapsed}/>
        <div className='outer' style={{display:'flex', zIndex:1}}>
          <Sider collapsed={collapsed} width={150} theme='light' className='sider' >
            <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
          </Sider>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </SharedContext.Provider>
  )
}
export { SharedContext };
export default DLayout;