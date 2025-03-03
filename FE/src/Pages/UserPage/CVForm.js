import './style.scss';
import { Form } from 'antd';
function CVForm(props){
    const {handleOpenModal, handleSubmit, handleInputChange} =props;

  return (
    <form className="cv-container form" onSubmit={handleSubmit}>
        <div className="headerc">
            <div className="profile-image">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s' alt="Profile Image"/>
            </div>
            <div className="name-title">
                <input required onChange={handleInputChange} name='name' className='name-title__title' placeholder='Nguyen Van A'/>
                <input required onChange={handleInputChange} name='title' className='name-title__job' placeholder='Business Analyst'/>
                <input onChange={handleInputChange} name='description' className='name-title__des' placeholder='write your short description here'/>
            </div>
        </div>

        <div className="contact-info">
            <div className="section">
                <h3>Personal Information</h3>
                <ul>
                    <li>Email: <input onChange={handleInputChange} placeholder='reg@gmail.com' name='email'/></li>
                    <li>Phone: <input onChange={handleInputChange} placeholder='0123456789' name='phone'/></li>
                    <li>Address: <input onChange={handleInputChange} placeholder='123Street, Paris, France' name='address'/></li>
                    <li>Link: <input onChange={handleInputChange} placeholder='...github.com' name='linkProject'/></li>
                </ul>
            </div>

            <div className="section">
                <h3>Study</h3>
                <textarea onChange={handleInputChange} name='study' placeholder='Write your study here'>
                </textarea>
            </div>

            <div className="section">
                <h3>Skills</h3>
                <textarea onChange={handleInputChange} name='skills' placeholder='Write your skills here'>
                </textarea>
            </div>
        </div>

        <div className="experience">
            <h3>Work Experience</h3>
            <textarea onChange={handleInputChange} name='exp' placeholder='Write your exp here'>
            </textarea>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div onClick={handleOpenModal} className='userc__button'>Cancel</div>
            <button type='submit' className='userc__button'>Save</button>
        </div>
    </form>
  )
}

export default CVForm;