import { BellOutlined} from '@ant-design/icons'
import { SmileOutlined} from '@ant-design/icons'
export const errorMesssage = (str, messageApi) => {
  messageApi.open({
    type: 'error',
    content: str,
    duration: 3,
  });
};

export const successMessage = (str, messageApi) => {
  messageApi.open({
    type: 'success',
    content: str,
    duration: 3,
  });
};

  export const successWSmile = (str, messageApi) => {
    messageApi.open({
      icon: <SmileOutlined />,
      content: str,
      duration: 3,
      className: 'success-message'
    });
  };


export const warn = (notification, message)=>{
  notification.warning({
    placement: 'topRight',
    message: 'Warning',
    description:
      message,
  });
}

export const success = (notification, message)=>{
  notification.success({
    placement: 'topRight',
    message: 'Success',
    description:
      message,
  });
}

export const error = (notification, message)=>{
  notification.success({
    placement: 'topRight',
    message: 'Error',
    description:
      message,
  });
}

export const showNotifications = (api, message) =>{
  api.info({
    placement: 'bottomRight',
    message: 'New Notification',
    description: message,
    icon: <BellOutlined 
          style={{
            color: '#108ee9',
          }}
          />
  });
}