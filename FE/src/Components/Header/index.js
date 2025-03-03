import logo from '../png/logo-no-background.png';
import logo2 from '../png/bgbg.png';
import './style.scss';
import { Button , Input, notification } from 'antd';
import { SearchOutlined, LogoutOutlined, UserOutlined, SaveOutlined,HomeOutlined, SolutionOutlined, FileSearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link, useParams} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { getToken, getRole} from '../../Utils/UserInfo/getIn4'; 
import { deleteData, fetchData } from '../../Utils/Fetch';
import { SharedContext } from '../Layout';
import { warn, error, success } from '../../Utils/Notification';
import Notification from './Notification';
function Header(props){
  const {sharedState ,setSharedState } = useContext(SharedContext);
  const [api, contextHolder] = notification.useNotification();
  const role = getRole();
  const {collapsed} = props;
  const [keyword,setKeyWord] = useState();
  const token = getToken();
  const navigate = useNavigate();
  let {keywords} = useParams();
  const [saved,setSaved] = useState();
  const [user,setUser] = useState();
  const [reload, setReload] = useState(false);

  useEffect(()=>{
    if(role=='USER'){
      const getData = async ()=>{
        const res1 = await fetchData(`http://localhost:9999/candidate/info`,token);
        setUser(res1.data);
        const res = await fetchData(`http://localhost:9999/candidate/savedjob/${res1.data.id}`,token);
        setSaved(res.data);
      }
      getData();
    }
  },[reload, sharedState])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    navigate('/login');
  }
  const handleBackHome = ()=>{
    navigate('/');
  }
  const handleChange = (e)=>{
    setKeyWord(e.target.value);
  }
  const handleNavi = ()=>{
    if(keyword){
      navigate(`/search/${keyword}`)
    }
    else{
      warn(notification, "Please input your keywords");
    }
  }

  const handleDelete = async (id)=>{
    const res = await deleteData(`http://localhost:9999/candidate/savedjob`,id,token)
    if(res){
      success(notification, "Save data successfully");
    }else{
      error(notification,"Save data failed");
    }
    setReload(!reload);
    setSharedState(!sharedState);
  }
  return (
    <div className="header">
      {contextHolder}
      <div className={collapsed ? 'header__logo header__logo--close' : 'header__logo'}>
        <img onClick={handleBackHome} src={collapsed ? logo2 : logo} alt='img'></img>
      </div>
      <div className='header__search'>
          <div className='header__search__bar'>
            <Input id='searchBar' defaultValue={keywords} onChange={handleChange} size='large' addonAfter={<SearchOutlined id='searchButton' onClick={handleNavi} className='header__search__bar__icon' />}/>
          </div>
      </div>
      {
        token ?
        <div className='header__icon'>
          {
            role=='USER' && <>
              <div  className='header__icon__ic header__icon__ic__save' > <SaveOutlined/> 
              <div className='save__content'>
                <h3>Saved Jobs</h3>
                {
                  (saved && saved.length>0) ? (
                    saved.map((item)=>{
                      return (
                        <div>
                          <div className='header__inner'>
                            <div style={{color:'green'}}><HomeOutlined /> <span/>{item.companyName}</div>
                            <div className='header__inner__hov'  ><CloseCircleOutlined onClick={()=>handleDelete(item.id)}/></div>
                          </div>
                          <div className='header__inner'>
                            <div style={{color:'blue'}}><SolutionOutlined />  <span/>${item.jobName}</div>
                            <div className='header__inner__hov'><a target='_blank' href={'/job/'+item.jobId}><FileSearchOutlined /></a></div>
                          </div>
                          <div className='header__inner__bottom'></div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{textAlign:'center',fontSize:'14px'}}>No saved jobs yet.</div>
                  )
                }
              </div>
              </div>
            </>

          }
          <div className='header__icon__ic'> <Notification/> </div>
          <Link to={role=='USER' ? '/userc' :'user'}>
            <div id='user-icon' className='header__icon__ic header__icon__ic__user'> <UserOutlined /> </div>
          </Link>
          <div onClick={handleLogout} className='header__icon__ic header__icon__ic__log'> <LogoutOutlined /> </div>
        </div>
        :
        <div className='header__func'>
          <Link to='/login'>
            <Button className='header__func__reg'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button className='header__func__log'>Register</Button>
          </Link>
      </div>
      }
    </div>
  )
}

export default Header;