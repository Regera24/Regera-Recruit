import { Carousel, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import Down from "../../Animation/Down";
import Upper from "../../Animation/Upper";
function Hint(props){
  const { data} = props;
  return (
    <div style={{backgroundColor:"#e8eff9", width:'100%', display:'flex', alignContent:"center", justifyContent:"center"}}>
      <div className="home__carousel">
        <Down><h2 className='home__carousel__hint'>New Jobs</h2></Down>
            <Upper>
              <Carousel autoplay className='home__carousel__cr'>
                {
                  data.map((item,index)=>{
                    return <div key={index} className='home__carousel__cr__item'>
                      <Row>
                        <Col span={12}>
                          <div className='home__carousel__cr__item__image'>
                            <img alt='img' className='home__carousel__cr__item__image__img' src={item.companyDTO.img}></img>
                          </div>
                        </Col>
                        <Col style={{paddingLeft:'10px'}} span={12}>
                          <h3 className='home__carousel__cr__item__cpn'>Company: {item.companyDTO.companyName}</h3>
                          <h4 className='home__carousel__cr__item__pos'>Position: {item.title}</h4>
                          <h4 className='home__carousel__cr__item__salary'>Salary: {item.luong}</h4>
                          <h4 className='home__carousel__cr__item__location'>Location: {item.city}</h4>
                        
                          <Button className='home__carousel__cr__item__button'><a target="_blank" href={'/job/'+item.id}>Details</a></Button>
                        
                        </Col>
                      </Row>
                    </div>
                  })
                }
              </Carousel>
            </Upper>
      </div>
    </div>
  )
}

export default Hint;