const API_BASE_URL = "http://localhost:9999";

const API = {
  ADMIN: {
    
  },
  CANDIDATE:{
    GET_INFO: `${API_BASE_URL}/candidate/info`,
    UPDATE_INFO: `${API_BASE_URL}/candidate`,
    GET_CVS: `${API_BASE_URL}/candidate/cvs`,
    GET_CV_BY_ID: (id) => `${API_BASE_URL}/candidate/cv/${id}`,
    CREATE_CV: `${API_BASE_URL}/candidate/cv`,
    UPDATE_CV: (id) => `${API_BASE_URL}/candidate/cv/${id}`,
    APPLY_JOB: `${API_BASE_URL}/candidate/apply-job`,
    CHECK_APPLY_JOB: (jobId, cvId) => `${API_BASE_URL}/candidate/check-apply-job?jobId=${jobId}&cvId=${cvId}`,
  },
  COMPANY:{
    GET_INFO: `${API_BASE_URL}/company/info`,
    UPDATE_INFO: `${API_BASE_URL}/company`,
    GET_JOBS: `${API_BASE_URL}/company/`,
    GET_JOB_BY_ID: (id) => `${API_BASE_URL}/company/job/${id}`,
    CREATE_JOB: `${API_BASE_URL}/company/job`,
    UPDATE_JOB: (id) => `${API_BASE_URL}/company/job/${id}`,
  },
  AUTH:{
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
    LOGOUT:`${API_BASE_URL}/auth/logout`, 
    INTROSPECT: `${API_BASE_URL}/auth/introspect`,
    CHECK_EMAIL_PHONE: `${API_BASE_URL}/auth/check-email-phone`, 
    CHECK_USERNAME: (username) => `${API_BASE_URL}/auth/check-username/${username}`,
    SEND_OTP:(key) => `${API_BASE_URL}/auth/send-otp/${key}`,
    CHECK_OTP: `${API_BASE_URL}/auth/check-otp`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`
  },
  PUBLIC:{
    UPLOAD_IMG: `${API_BASE_URL}/public/image`,
    GET_JOBS: `${API_BASE_URL}/public/jobs`,
    COMPANY_INFO: (id) => `${API_BASE_URL}/public/company/${id}`,
    JOB_INFO: (id) => `${API_BASE_URL}/public/job/${id}`,
    GET_TAGS: `${API_BASE_URL}/public/tags`,
    GET_CITIES: `${API_BASE_URL}/public/cities`,
  },
  NOTIFICATION:{
    GET_NOTIS: `${API_BASE_URL}/notification`,
    SEND_NOTI: `${API_BASE_URL}/notification`
  }
};

export default API;