import { useEffect, useState,useParams } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from 'react-toastify'
import config from "../../config"
import axios from "axios"





const Police =()=>{

    const[list,setList]=useState([])
    const[id,setId]=useState(null)

    const navigate=useNavigate()
    const location=useLocation()


    //Following function is used for auto-Adjustable height of div-container
    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }

    const handleUpdate=(ide)=>{
      console.log(id)
      navigate('/api/policestation/police/update/'+ide,{state:{userId:id}})
    }
    

    //get list of all police
    useEffect(()=>{
        const { userId }=location.state;
        setId(userId)
        console.log(userId)
       
        
        loadPolice(userId)
    },[location])

    const loadPolice = (userId) => {
        axios  
          .get(config.serverURL+'/api/policestation/police/getpoliceByPoliceStation/'+ userId,{
            headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
          })
          .then((response) => {
            const result = response.data
            console.log(result)
            setList(result)
           
          })
          .catch(error=>{
            console.log('Something went wrong', error);
            toast.error(error)
          })
      }

      const addPolice=()=>{
        console.log(id)
        navigate('/police/addpolice',{state:{userId:id}})

      }

      const deletePolice=(pId)=>{
        console.log('Printing id', pId,);
        axios
        .delete(config.serverURL +'/api/policestation/police/'+pId,{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        }
        )
          .then(response => {
            console.log('police deleted successfully', response.data);
            loadPolice(id);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })
    }
      

    return(
      <>
        <div style={{height:menuHeight}}>
           <div>
                <button onClick={addPolice} style={styles.addButton}>add police</button>
            </div>
            <hr></hr>
            <h3>List of Police</h3>
            <div style={{marginTop:50}} >
            <div style={styles.container}>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <td>name</td>
                        <td>Email</td>
                        <td>Gender</td>
                        <td>Mobile No</td>
                        <td>Age</td>
                        {/* <td>Address</td>
                        <td>PoliceStation</td> */}
                        <td>Action</td>

                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((police)=>{
                            return(
                                <tr key={police.id}>
                                    <td>{police.pname}</td>
                                    <td>{police.pemail}</td>
                                    <td>{police.pgender}</td>
                                    <td>{police.pmobileNo}</td>
                                    <td>{police.page}</td>
                                    {/* <td>{police.address['region']}</td>
                                    <td>{police.policeStation['psName']}</td> */}
                                    <td>
                                    <button className="btn btn-success ml-2" onClick={() => { handleUpdate(police.id)}}>update</button>
                                    <span>    </span>
                                    <button className="btn btn-danger ml-2" onClick={() => { deletePolice(police.id);}}>delete</button>
                                    </td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
        </div>
        </>
    )
}

const styles = {
    container: {
      width: 'auto',
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
      deleteButton: {
        position: 'relative',
        width: '10%',
        height: 20,
        backgroundColor: '#FF6347',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        marginTop: 20,
      }
}
export default Police