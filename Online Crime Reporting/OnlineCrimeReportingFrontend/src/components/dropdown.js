import "../Dropdown.css"
import { useState } from "react";
//import Select from "react-select";
const Icon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20" style={{textAlign:'right'}}>
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };
/*
const Dropdown=(props)=>{
const {placeholder,options}=props
return(
    <div className="dropdown-container" >
        <div className="dropdown-input">
        <div className="dropdown-selected-value">{placeholder} 
                <div className="dropdown-menu">
                    {options.map((option)=>(
                        <div key={option.id} className="dropdown-item">{option.psName}</div>
                    ))}
                </div>
        </div>
        </div>
    </div>
)
}
*/
const Dropdown=(props)=>{
  const {title,options}=props
  const [open,setOpen]=useState(false)
  const [policeStation,setPoliceStation]=useState(0)
  const [placeHolder,setPlaceHolder]=useState('')
  
  const setPSID=(id)=>{
    console.log('b4 id:'+policeStation);
    setPoliceStation(id);
    console.log("Selected PS id: "+policeStation);
    
  }

  function DropdownItem(props){
    const {options}=props

    return(
      <div>
         {options.map((op)=>(
                        <div key={op.id} className="menu-item1" onClick={(e)=>{setPSID(op.id);setPlaceHolder(e.target.innerText);}}>{op.psName}</div>
           ))}
      </div>
    )
  }
  return(<div className="mb-3">
            <label>{title}</label>
               <div className="dropdown-menu1" onClick={()=>setOpen(!open)}> <span style={{display:'flex',justifyContent:'flex-end'}}><Icon /></span>
               {placeHolder} 
               {open && <DropdownItem options={options}/> }
                </div>              
        </div>
  )
}/*
const Dropdown=(props)=>{
  const {placeholder,options}=props
  const [policeStation,setPoliceStation]=useState(options.psName)


//   return(<div className="mb-3">
//             <label>{placeholder}</label>
//               <Select options={options} />
                
//         </div>
//   )
// }
// */

 export default Dropdown
