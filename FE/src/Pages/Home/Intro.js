import logo from '../../Components/png/logo-no-background.png';
import { Button } from 'antd';
import { Link } from 'react-scroll';
import Opacity from '../../Animation/Opacity';
import Down from '../../Animation/Down';
import Upper from '../../Animation/Upper';
function Intro(){
  return (
    <Opacity>
      <div className='home__intro'>
       <Down>
        <div className='home__intro__image'>
            <img alt='img' className='home__intro__image__img' src={logo}></img>
          </div>
       </Down>
        <Upper>
          <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            <h2 className='home__intro__slogan'>
              We provide the best <span className='home__intro__slogan__b'>strategy</span> <br></br>
              to grow up your <span className='home__intro__slogan__b'>business</span>
            </h2>
            <Link to='content' offset={-140} smooth={true} duration={300}><Button className='home__intro__button'>DISCOVER MORE</Button></Link>
          </div>
        </Upper>
      </div>
    </Opacity>
  )
}

export default Intro;