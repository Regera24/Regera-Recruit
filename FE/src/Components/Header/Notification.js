import { BellOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './style.scss'
import { getToken, getUsername } from '../../Utils/UserInfo/getIn4';
import { notification } from 'antd';
import { showNotifications } from '../../Utils/Notification';
import { getCurrentDate } from '../../Utils/DateTime';
import API from '../../Utils/API/API';
import { getDataWithToken } from '../../Utils/Fetch';

function Notification(){

  const token = getToken();
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const username = getUsername();
  const [api, contextHolder] = notification.useNotification();

  useEffect(()=>{
    const getNotification = async () =>{
      const res = await getDataWithToken(API.NOTIFICATION.GET_NOTIS, token); 
      setNotifications(res.data);
    }
    getNotification();
  })

  useEffect(() => {
    // Kết nối WebSocket
    const client = new Client({
      brokerURL: 'ws://localhost:9999/ws', 
      connectHeaders: {},
      webSocketFactory: () => new SockJS('http://localhost:9999/ws'),
      onConnect: () => {
        console.log('Kết nối thành công!');
        client.subscribe(`/user/${username}/private`, (message) => {
          const notification = JSON.parse(message.body);
          showNotifications(api, notification.message);
          setNotifications((prev) => [...prev, notification]);
        });
      },
      debug: (str) => console.log(str),
    });

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="notification">
          <BellOutlined/>
          <ul className='notification__list'>
          <div style={{fontSize:'17px', marginLeft:'10px'}}>Notifications</div>
          <hr style={{margin:'2px 0px'}}></hr>
          {[...notifications].reverse().map((notification, index) => (
            <>
              <li key={index}>
                <div className='notification__item'>
                  <div className='notification__item__img'>
                    <img src='https://i.pinimg.com/280x280_RS/e1/08/21/e10821c74b533d465ba888ea66daa30f.jpg'></img>
                  </div>
                  <div className='notification__item__text'>
                    <div className='notification__item__text__content'>{notification.message}</div>
                    <div className='notification__item__text__time'>
                      <div>{notification.sendAt}</div>
                      <div style={{marginLeft:'10px'}}></div>
                    </div>
                  </div>
                </div>
              </li>
              <div style={{width:'100%',height:'1px', backgroundColor:'lightgray'}}></div>
            </>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Notification;