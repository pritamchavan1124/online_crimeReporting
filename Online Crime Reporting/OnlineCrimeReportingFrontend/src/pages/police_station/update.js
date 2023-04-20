import { useEffect, useState } from "react"
import { useNavigate,useParams, useLocation } from "react-router-dom"
import { toast } from 'react-toastify'
import config from "../../config"
import axios from "axios"
import Button from "../../components/button"
import { Link } from "react-router-dom"




const UpdatePolice=()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const[uid, setUid]=useState()
    //const[id, setId]=useState()
    

   

    //Following function is used for auto-Adjustable height of div-container
    const [menuHeight, setMenuHeight]= useState(null) 
    function calcHeight(el){
        const height=el.offsetHeight;
         setMenuHeight(height);
    }
  //   useEffect(()=>{
        
  //     const { userId,pId }=location.state;
  //     setId(pId)
  //     setUid(userId)
  //     setLoading(false)
  //      console.log(userId);
  //  },[])

    const { id } = useParams();

    const[pname, setName] = useState('');
    const[pmobileNo, setMobileNo] = useState('');
    const[pgender, setGender] = useState();
    const[page, setAge] = useState('');
    const[addressLine, setAddressLine] = useState('');
    const[addressId, setAddressId] = useState();
    const[policeStationId, setPoliceStationId] = useState();
    //let policeStationId=null
    const[pemail, setEmail] = useState('');

    //let address={id:addressId}
    const [addressName,setAddressName]=useState("Select Address")
    const[addressList,setAddressList]=useState([])
    const[cd,setcd]=useState(0)


    let addressID=0;
    let regionName ="";
    let pinCodeVal =0;
    let address={addressId} 
    const handleAddressDropdown=(id, region1, pinCode1)=>{
        console.log("this is what i getting",id, region1)
           addressID=id;
          setAddressId(addressID);
            const newRegName=region1+"";
          regionName=newRegName;
          pinCodeVal=pinCode1;
          address={id:addressID}
       console.log("Address Id Selected=",addressID)
       console.log("Address region =",regionName)
       console.log("Address pincode =",pinCodeVal)
       setAddressName(regionName+" "+pinCodeVal);
       }
    const savePolice = (e) => {
        e.preventDefault();
      console.log(pgender)
      if(id){
        axios.put(config.serverURL +'/api/policestation/updatepolice',{
            id,
            pname,
              pmobileNo,
              page,
              pgender,
              pemail,
              addressLine,
              addressId,
              policeStationId,
        },{
          headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
        })
        .then((response) => {
          console.log("police updated successfully", response.data);
          const result=response.data
          console.log(result.policeStation.id)
          toast.success('Police updated Successfully')
          navigate("/police/getallpolice",{state:{userId:result.policeStation.id}});
        })
        .catch((error) => {
          console.log("Something went wrong", error);
          console.log(error)
          toast.error('Police updation failed')
        });
    }
    }

    const getAddressList=()=>{
      const url=config.serverURL+`/api/home/addresses`;
      axios.get(url).then((response)=>{
      const result=response['data']
      console.log(result)
      setAddressList(result) 
      }).catch((error)=>{
      toast.error(error)
      })
    }

    useEffect(() => {
      
      const  userId =location.state.userId;
      console.log('in use effect',userId)
     setPoliceStationId(userId)
      console.log('pls=',policeStationId)
      getAddressList();
        console.log(id);
        if(id){
          setPoliceDetails(id)
        }
      }, []);

      const setPoliceDetails=(id)=>{
        
          axios
            .get(config.serverURL+`/api/policestation/police/getpolice/`+id ,{
              headers: { 'Authorization': 'Bearer '+ sessionStorage['token'] },
            })
            .then((response) => {
                
              console.log(response.data);
              setcd(1);
              setName(response.data.pname);
              setMobileNo(response.data.pmobileNo);
              setAge(response.data.page);
              setEmail(response.data.pemail);
              setAddressLine(response.data.addressLine);
              setAddressId(response.data.addressId);
              //policeStationId=response.data.policeStationId
              setPoliceStationId(response.data.policeStationId)
              
            })
            .catch((error) => {
              console.log("Something went wrong", error);
            });
        
      }
    return(
        <div style={{marginTop:100,height:menuHeight}}>
            <div style={styles.container}>
            <div className="container">
            {cd==1?<h3>Update Police</h3>:<h3>Add Police</h3>}
            <hr/>
            <form>
                <div className="form-group" style={{padding:20}}>
                  
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="pname"
                        value={pname}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name" 
                    />

                </div>
                <div className="form-group" style={{padding:20}}>
                <label for="pmobileNo">Enter Mobile Number: </label>
                    <input 
                        type="tel" 
                        className="form-control col-4"
                        id="pmobileNo"
                        value={pmobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        placeholder="Enter mobile No"
                    />

                </div>
                <div className="form-group" style={{padding:20}}>
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="page"
                        value={page}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter Age" disabled
                    />
                </div>
               
                <div className="form-group" style={{padding:20}}>
                    <input 
                        type="pemail" 
                        className="form-control col-4"
                        id="email"
                        value={pemail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email" disabled
                    />
                </div>
                <div className="form-group" style={{padding:20}}>
                <label for="addressLine">Enter Address: </label>
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="addressLine"
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                        placeholder="Enter police address"
                    />
                </div>
               
                <div className="mb-3" style={{display:'flex'}}>
                  <div className="btn-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    Select Address 
                    </button>
                   <ul className="dropdown-menu dropdown-menu-lg-end">
                    {addressList.map((ad)=>{
                              return (
                                  <li><button className="dropdown-item" type="button" onClick={()=>handleAddressDropdown(ad.id,ad.region,ad.pinCode)}>{ad.region+" "+ad.pinCode}</button></li>
                              )
                        })}
                    </ul>
                  </div>
                  <div style={{marginLeft:10, width:'100%'}}><input value={addressName} className="form-control" disabled/></div>
                </div>
                
{/*                 
                 <Input title='Enter police station id' onChange={(e) => policeStation(e.target.value)} type='number'>
                 </Input> */}
                <div >
                    <button onClick={(e)=>savePolice(e)} style={styles.addButton}>Update</button>
                </div>
            </form>
            <hr/>
           
            {/* <Button onClick={()=>navigateBack()} title='Back'/> */}
            </div>
        </div>
        </div>
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
        width: '100%',
        height: 40,
        backgroundColor: '#795da3',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        marginTop: 20,
      },
}
export default UpdatePolice