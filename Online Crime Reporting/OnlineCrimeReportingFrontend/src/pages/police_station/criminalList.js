import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import config from "../../config"


const PsCriminalRecords = () => {
  console.log('inside criminal list')
    const [pscriminalRecords, setPsCriminalRecords] = useState([])

    const navigate = useNavigate()

     //Following function is used for auto-Adjustable height of div-container
     const [menuHeight, setMenuHeight]= useState(null) 
     function calcHeight(el){
         const height=el.offsetHeight;
          setMenuHeight(height);
     }

    useEffect(() => { getAllCriminal() }, [] )

    const getAllCriminal = () => {
        axios.get(config.serverURL + '/api/policestation/criminal/getcriminals', {
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        })
        .then((response) => {
            const result = response.data
                console.log(result)
                // set the homes to the state member
                setPsCriminalRecords(result)
              
        }).catch(error=>{
          console.log('Something went wrong', error);
          toast.error(error)
        })
    }

    //delete criminal by its id

    const deleteCriminal = (crId) => {
      console.log('inside delete')
        axios
          .delete(config.serverURL + '/api/policestation/criminal/' + crId,{
            headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
          })
          .then((response) => {
            toast.success('Criminal deleted successfully!!!')
           getAllCriminal()
          })
          .catch(error=>{
            toast.error('Criminal deletion failed!!!')
            console.log('Something went wrong', error);
            toast.error(error)
          })
      }

      const addCriminal=()=>{
        navigate('/api/policestation/criminal/add')
      }

    return (
      <>
      
        <div style={{padding:40,height:menuHeight}} >
          <div style={{marginLeft:20,padding:20}}>
          <button onClick={addCriminal} style={styles.addButton}>Add Criminal</button>
          </div>
          <div style={styles.container}>
      <h3 style={styles.h3}> Criminal Records </h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pscriminalRecords.map((criminalRecord) => {
            return (
              <tr key={criminalRecord.id}>
                <td>{criminalRecord.crName}</td>
                <td>{criminalRecord.crAge}</td>
                <td>{criminalRecord.crGender}</td>
                
                <td>
                  <button
                    onClick={() => deleteCriminal(criminalRecord.id)}
                    style={styles.button}
                    className='btn btn-sm btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
        </div>
        </>
    )
}

const styles = {
  container: {
    width: 800,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#795da3',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  addButton: {
      position: 'relative',
      width: '20%',
      height: 40,
      backgroundColor: '#795da3',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 20,
    },
}
export default PsCriminalRecords