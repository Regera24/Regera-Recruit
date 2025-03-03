import TB from "./TB";
import './style.scss'
function PickCv(props){
  const { datasource, handleCheckboxChange,idCvChoose, handleCancel ,handleApply} = props;
  return (
    <div className="choosecv">
        <h2>Choose your cv</h2>
        <TB idCvChoose={idCvChoose} handleCheckboxChange={handleCheckboxChange} datasource={datasource}/>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div onClick={handleCancel} className="choosecv__button">Cancel</div>
          <div onClick={handleApply} className="choosecv__button">Apply</div>
        </div>
    </div>
  )
}

export default PickCv;