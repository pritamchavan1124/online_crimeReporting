import React from 'react'
import { Dropdown } from 'react-bootstrap';

function CTDropDownElement(props){
const {ct,handleCaseTypeDropdown}=props

return(
    <div>
        <Dropdown.Item as="Button">
            <div
            onClick={(e)=>{
                handleCaseTypeDropdown(ct.id,ct.caseType)  
            }}>
                {ct.caseType}
            </div>
        </Dropdown.Item>
    </div>
)

}
export default CTDropDownElement