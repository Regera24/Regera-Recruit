import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchToken } from "../../Fetch";

export default function Authenticate() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);


  useEffect(() => {
    const codeTokenRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(codeTokenRegex);

    if (isMatch) {
      const code = isMatch[1];
      const getToken =  async (code) =>{
        const res = await fetchToken(`http://localhost:9999/auth/outbound/authenticate?code=${code}`);
        localStorage.setItem("token",res.data.token)
        setIsLoggedin(true);
      }
      getToken(code);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  return (
    <>
      
    </>
  );
}