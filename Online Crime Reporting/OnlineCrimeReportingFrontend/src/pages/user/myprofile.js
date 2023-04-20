import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import loading from "../../imagesForTitle/loading.gif"
import Input from "../../components/input";
import Button from "../../components/button";


const MyUserProfile=()=>{


    const [id,setId]=useState(0)
    const [isLoading, setLoading] = useState(true);
    const [showFlag,setShowFlag] = useState(false);
    const [userProf,setUserProf]=useState()
    const [addressLine,setAddressLine]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [addressList,setAddressList]=useState([])
    const [addressName,setAddressName]=useState("Select Address")
    const [addressId, setAddressId] = useState(0)
    const location=useLocation()
    const navigate=useNavigate()
    const loadingGif=loading;
     //Following function is used for auto-Adjustable height of div-container
     const [menuHeight, setMenuHeight]= useState(null) 
     function calcHeight(el){
         const height=el.offsetHeight;
          setMenuHeight(height);
     }


     let addressID=0;
     let regionName ="";
     let pinCodeVal =0;
    //  let address={id:addressId} 
     const handleAddressDropdown=(id, region1, pinCode1)=>{
         console.log("this is what i getting",id, region1)
            addressID=id;
           setAddressId(addressID);
             const newRegName=region1+"";
           regionName=newRegName;
           pinCodeVal=pinCode1;
          // address={id:addressID}
        console.log("Address Id Selected=",addressID)
        console.log("Address region =",regionName)
        console.log("Address pincode =",pinCodeVal)
        setAddressName(regionName+" "+pinCodeVal);
        }


    const getMyProfileDetails=(userid)=>{
    axios.get(config.serverURL+'/api/user/myprofile/'+userid,{
        headers:{'Authorization': 'Bearer '+ sessionStorage['token']}
    }).then((response)=>{
        const result=response['data']
        setUserProf(result)
        setLoading(false)
    }).catch((error)=>{
        toast.error(error)
        navigate('/user/myhome', {state : {userId:id}}) 
    })
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
    const updateDetails=()=>{
        if(mobileNo.length===0 || mobileNo.length!==10){
            toast.error('Please re-enter your new Mobile No. & ensure its of 10 digit only')
        }else if(addressLine.length===0){
            toast.error('Please enter your new Address Line')
        }else if(addressId===0){
            toast.error('Please select the new Address')
        }else{
            const body={
                id,mobileNo,addressLine,addressId
            }
            axios.put(config.serverURL+'/api/user/updateuser',body,{
                headers:{'Authorization': 'Bearer '+ sessionStorage['token']} 
            }).then((response)=>{
                const result=response['data']
                console.log(result)
                if(response.status===200){
                    toast.success('Updated Succesfully')
                    getMyProfileDetails(id);
                }
            }).catch((error)=>{
                toast.error(error)
            })
        }       
    }


    useEffect(()=>{
       const { userId }=location.state;
       setId(userId);
       console.log(userId);
       getMyProfileDetails(userId);
       getAddressList();
    },[])

    if (isLoading) {
        return <div className="container" style={{display: 'flex',
          height: '100vh',
          width: '100vw', 
          alignItems: 'center',
          justifyContent: 'center',}}><img src={loadingGif} alt='loading img'></img></div>;
      }

return (
    <div style={{ overflowY: 'scroll', height: 'calc(100vh - 127px)' }}>
    <div className="container" style={{ height:menuHeight}}>
        <div style={styles.container}>
        <h3 style={{textAlign:'center', margin:20, color:'#795da3'}}>MY DETAILS</h3>
        <table className="table table-striped">
            <tbody>
                <tr>
                    <td><b>Name:</b></td>
                    <td>{userProf.name}</td>
                    <td><b>Date Of Birth:</b></td>
                    <td>{userProf.dob}</td>
                </tr>
                <tr>
                    <td><b>Mobile No.:</b></td>
                    <td>{userProf.mobileNo}</td>
                    <td><b>Email address:</b></td>
                    <td>{userProf.email}</td>
                </tr>
                <tr>                    
                    <td><b>Address Line:</b></td>
                    <td>{userProf.addressLine}</td>
                    <td><b>Gender:</b></td>
                    <td>{userProf.gender}</td>
                </tr>
                <tr>                    
                    <td><b>Address Region:</b></td>
                    <td>{userProf.address.region}</td>
                    <td><b>Address Pincode:</b></td>
                    <td>{userProf.address.pinCode}</td>
                </tr>
            </tbody>
        </table> 
        <hr />
        
        <h4 style={{textAlign:'center', margin:20, color:'#795da3'}}>Wish to Update Mobile No. Or Address ?</h4>
        <Button onClick={()=>{showFlag ? setShowFlag(false) : setShowFlag(true)}} title='Click Here to Update' />
        {showFlag &&
        <div style={{marginTop:10}}>
            <div className="mb-3">
             <label>New Contact number* (must be 10 digit only)</label>
             <input type='tel'  pattern="[0-9]{10}" onChange={(e)=>{setMobileNo(e.target.value)}}  className="form-control"/>
            </div>
            <Input onChange={(e)=>{setAddressLine(e.target.value)}} title='Enter new Address Line'/>
            <div className="mb-3" style={{display:'flex'}}>
          <div className="btn-group">
             <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            Select New Address 
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
            {addressList.map((ad)=>{
                return (
                <li key={ad.id}><button className="dropdown-item" type="button" onClick={()=>handleAddressDropdown(ad.id,ad.region,ad.pinCode)}>{ad.region+" "+ad.pinCode}</button></li>
                )
            })}
         </ul>
        </div>
        <div style={{marginLeft:10, width:'100%'}}><input value={addressName} className="form-control" disabled/></div>
        </div>
           <Button onClick={updateDetails} title='Save the Updated Details'/>     
        </div>}
        </div>
    </div>
    </div>
)
}
const styles={
    
    container: {
        width: 800,
        padding: 20,
        position: 'relative',
        top: 50,
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
}
export default MyUserProfile