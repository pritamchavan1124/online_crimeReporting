import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import config from "../../config"

const CriminalRecords = () => {
  console.log('inside criminal record')
    const [criminalRecords, setCriminalRecords] = useState([])

    const navigate = useNavigate()

    useEffect(() => { getAllCriminal() }, [] )

    const getAllCriminal = () => {
        axios.get(config.serverURL + '/api/admin/criminal/getcriminals', {
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        })
        .then((response) => {
            const result = response.data
                console.log(result)
                // set the homes to the state member
                setCriminalRecords(result)
              
        }).catch(error=>{
          console.log('Something went wrong', error);
          toast.error(error)
        })
    }

    //delete criminal by its id

    const deleteCriminal = (id) => {
        axios
          .delete(config.serverURL + '/api/admin/criminal/' + id,{
            headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
          })
          .then((response) => {
            toast.success("Criminal deleted Successfully")
              // reload the screen
              getAllCriminal()
            
          })
          .catch(error=>{
            console.log('Something went wrong', error);
            toast.error(error)
          })
      }

    return (
        <div className='container'>
      <h3 style={styles.h3}> Criminal Records </h3>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Criminal Name</th>
            <th>caseType</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {criminalRecords.map((criminalRecord) => {
            return (
              <tr>
                <td>{criminalRecord.id}</td>
                <td>{criminalRecord.crName}</td>
                <td>{criminalRecord.caseType}</td>
                
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
    )
}

const styles = {
  container: {
    width: 800,
    height:1000,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#81D4FA',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  addButton: {
      position: 'relative',
      width: '20%',
      height: 40,
      backgroundColor: '#81D4FA',
      color: 'white',
      borderRadius: 5,
      border: 'none',
      marginTop: 20,
    },
}
export default CriminalRecords