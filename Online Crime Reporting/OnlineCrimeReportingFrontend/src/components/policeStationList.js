import React from 'react'
import { Dropdown } from 'react-bootstrap';

function PSDropDownElement(props){
const {ps,handlePoliceStationDropdown}=props

return(
    <div>
        <Dropdown.Item as="Button">
            <div
            onClick={(e)=>{
                handlePoliceStationDropdown(ps.id,ps.psName)  
            }}>
                {ps.psName}
            </div>
        </Dropdown.Item>
    </div>
)

}
export default PSDropDownElement