import {HomeOutlined, UserOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined  } from '@ant-design/icons';
import {  Menu } from 'antd';
import {DashboardOutlined,FormOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import { getToken, getUsername, getRole} from '../../Utils/UserInfo/getIn4'; 
import './style.scss'
function SideBar(props){
  const { toggleCollapsed, collapsed } = props;
  const role = getRole()
  const navigate = useNavigate();
  const Navi = (link) =>{
    navigate(link);
  }

  const items = [
    {
      key:'1',
      icon: collapsed ? <MenuUnfoldOutlined className='sidebar__icon' /> : <MenuFoldOutlined className='sidebar__icon'  />,
      label: 'Side Bar',
      onClick: toggleCollapsed,
      className:'menu-item-color',
    },
    {
      key: '2',
      icon: <HomeOutlined className='sidebar__icon' />,
      label: 'Home',
      className:'menu-item-color',
      onClick: ()=>Navi('/')
    },
    {
      key: '3',
      icon:<UserOutlined className='sidebar__icon' /> ,
      label: 'User',
      className:'menu-item-color',
      onClick: ()=> {
        if(role=='USER'){
          Navi('/userc')
        }
        else{
          Navi('/user')
        }
      }
    },
    {
      key: '6',
      icon:<DashboardOutlined  className='sidebar__icon' /> ,
      label: 'Dashboard',
      className:'menu-item-color',
      onClick: ()=>Navi('/dashboard')
    },
    {
      key: '8',
      icon:<FormOutlined   className='sidebar__icon' /> ,
      label: 'Manage',
      className:'menu-item-color',
      onClick: ()=>Navi('/managejobs')
    },
    {
      key:'4',
      icon:<SettingOutlined className='sidebar__icon'/>,
      label:'Settings',
      className:'menu-item-color',
    },
  ]

  const items2 = [
    {
      key:'1',
      icon: collapsed ? <MenuUnfoldOutlined className='sidebar__icon' /> : <MenuFoldOutlined className='sidebar__icon'  />,
      label: 'Side Bar',
      onClick: toggleCollapsed,
      className:'menu-item-color',
    },
    {
      key: '2',
      icon: <HomeOutlined className='sidebar__icon' />,
      label: 'Home',
      className:'menu-item-color',
      onClick: ()=>Navi('/')
    },
    {
      key: '3',
      icon:<UserOutlined className='sidebar__icon' /> ,
      label: 'User',
      className:'menu-item-color',
      onClick: ()=> {
        if(getRole()=='USER'){
          Navi('/userc')
        }
        else{
          Navi('/user')
        }
      }
    },
    {
      key:'4',
      icon:<SettingOutlined className='sidebar__icon'/>,
      label:'Settings',
      className:'menu-item-color',
    },
  ]

  return (
    <div
      style={{
        width: 150,
        display:'flex'
      }}
    >
      <Menu
        style={{ height: '100%'}}
        triggerSubMenuAction='click'
        mode='inline'
        items={role=='USER' ? items2 : items}
      />
    </div>
  )
}
export default SideBar;