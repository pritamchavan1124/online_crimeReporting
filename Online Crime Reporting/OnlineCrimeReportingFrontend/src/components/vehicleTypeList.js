import { Dropdown } from 'react-bootstrap';

function VTDropDownElement(props){
const {vt,handleVehicleTypeDropdown}=props

return(
    <div>
        <Dropdown.Item as="Button">
            <div
            onClick={(e)=>{
                handleVehicleTypeDropdown(vt)  
            }}>
                {vt}
            </div>
        </Dropdown.Item>
    </div>
)

}
export default VTDropDownElement