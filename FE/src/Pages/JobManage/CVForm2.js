import './style.scss';
import { Form, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { fetchData1 } from '../../Utils/Fetch';
function CVForm2(props){
    const [cv, setCV] = useState();
    const { cvid } = useParams();
    useEffect(()=>{
        const getData = async ()=>{
            const res = await fetchData1(`http://localhost:9999/public/cv/${cvid}`);
            setCV(res.data)
        }
        getData();
    },[])
  return ( 
     cv ? (
        <form style={{marginTop:'150px', marginBottom:'50px'}} className="cv-container form">
            <div className="headerc">
                <div className="profile-image">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s' alt="Profile Image"/>
                </div>
                <div className="name-title">
                    <input value={cv.name} required  name='name' className='name-title__title' />
                    <input value={cv.title} required  name='title' className='name-title__job' />
                    <input value={cv.description}  name='description' className='name-title__des' />
                </div>
            </div>

            <div className="contact-info">
                <div className="section">
                    <h3>Personal Information</h3>
                    <ul>
                        <li>Email: <input value={cv.email}   name='email'/></li>
                        <li>Phone: <input value={cv.phone}   name='phone'/></li>
                        <li>Address: <input value={cv.address}   name='address'/></li>
                        <li>Link: <input value={cv.linkProject}   name='linkProject'/></li>
                    </ul>
                </div>

                <div className="section">
                    <h3>Study</h3>
                    <textarea value={cv.study} name='study' >
                    </textarea>
                </div>

                <div className="section">
                    <h3>Skills</h3>
                    <textarea value={cv.skills} name='skills' >
                    </textarea>
                </div>
            </div>

            <div className="experience">
                <h3>Work Experience</h3>
                <textarea value={cv.exp} name='exp' >
                </textarea>
            </div>
        </form>
     ) : (
        <>
          <div style={{marginTop:'1000px'}}></div>
          <div className='spin'>
            <Spin size='large' ></Spin>
          </div>
        </>)  
  )
}

export default CVForm2;