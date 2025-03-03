import { Col, Button } from "antd";
import { Link } from "react-router-dom";
import {DollarOutlined, FormOutlined, EnvironmentOutlined ,CalendarOutlined  } from '@ant-design/icons';

function SearchLeft(props){
  const { datasource } = props;
  return (
    <>
      {
        datasource && (
          <>
            <Col className='search__left' span={16}>
              <h1>Search Results : </h1>
                <div className='search__job'>
                  <h2>Reference Job : </h2>
                    {datasource.length>0 ? 
                      <ul className='search__job__list'>
                        {
                          datasource.map((item)=>{
                            return (
                              <li className='search__job__list__item' key={item.id}>
                                  <h4 className='search__job__list__item__title'>
                                      {item.title} - {item.companyDTO.companyName}
                                  </h4>
                                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',color:'green', padding:'0px 30px'}} className='search__job__list__item__location' >
                                    <div>
                                      <EnvironmentOutlined/> <span></span>
                                      {
                                        item.cityDTOList.reduce((acc, current) => {
                                          return acc + (acc ? ', ' : '') + current.value;
                                        }, '')
                                      }
                                    </div>
                                    <div className="luong" style={{paddingLeft:'100px', display:'inline-block'}}> {item.luong}</div>
                                  </div>
                                  <div className='search__job__list__item__tag' style={{display:'flex',alignItems:'center',justifyContent:'space-between',color:'orangered', padding:'0px 30px'}}  >
                                    <div>
                                      <FormOutlined/> <span>  </span>
                                      {
                                        item.tagDTOList.reduce((acc, current) => {
                                          return acc + (acc ? ', ' : '') + current.value;
                                        }, '')
                                      }
                                    </div>
                                    <div style={{paddingLeft:'100px', display:'inline-block'}}> <CalendarOutlined/>  {item.createAt}</div>
                                  </div>
                                  <div className='search__job__list__item__button'>
                                    <a href={'/job/'+item.id}><Button className='search__job__list__item__button__btn'>Details</Button></a>
                                  </div>
                              </li>
                            )
                          })
                        } 
                      </ul>
                      : <h3 style={{paddingLeft:'50px'}}>No Results</h3>
                    }
                    
                </div>
              </Col>
              <Col span={2}></Col>
          </>
        )
      }
    </>
  )
}

export default SearchLeft;