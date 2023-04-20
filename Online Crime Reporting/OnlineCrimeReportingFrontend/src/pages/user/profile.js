import { useEffect, useState } from "react"
import { useNavigate, useParams,useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import config from "../../config"
import axios from "axios"
import Complaint from "./complaint"

const MyProfile = () => {
  const [list, setList] = useState([])

  const navigate = useNavigate()
  const location=useLocation()
  const { id } = useParams()

  //get all PoliceStation
  useEffect(() => {
    getAllComplaints()
    const { userId }=location.state;
  }, [])

  const getAllComplaints = () => {
    axios.get(config.serverURL + '/user/all', {
        headers: { token: sessionStorage['token']},
    })
      .then((response) => {
        const result = response.data
        console.log(result)
        setList(result)
      })
      .catch((error) => {
        console.log("Something went wrong", error);
        toast.error(error)
      })
   
  }

  const addComplaint = () => {
    navigate("/api/user/complaint/add")
  }

  const handleDelete = (id) => {
    console.log("Printing id", id)
    axios.delete(config.serverURL + '/user/complaint' + id, {
        headers: { token: sessionStorage['token']},
    })
      .then((response) => {
        console.log(" Complaint deleted successfully", response.data)
        getAllComplaints()
      })
      .catch((error) => {
        console.log("Something went wrong", error)
      })
  }

  return (
    <div>
      <hr></hr>
      <h3 className="text-center">List of Complaints</h3>

      <div style={{ marginTop: 10, padding: 15 }}>
        <div style={styles.container}>
          <table className="table">
            <thead className="thead-dark">
              <tr className="text-center font-weight-bold">
                <td>Complaint Description</td>
              </tr>
            </thead>
            <tbody>
              {list.map((MyProfile) => {
                return (
                  <tr key={MyProfile.id} className="text-center">
                    <td>{MyProfile.description}</td>

                    <td>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => {
                          handleDelete(MyProfile.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={addComplaint} style={styles.addButton}>
            Add Complaint
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: 800,
    height: 500,
    padding: 20,
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    padding: 0,
    margin: "auto",
    borderColor: "#BAF6FF",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px #C9C9C9",
    backgroundColor: "#F5F1FF",
  },
  addButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    margin: 5,
    marginLeft: 610,
  },
  deleteButton: {
    position: "relative",
    width: "20%",
    height: 40,
    backgroundColor: "#AD89FC",
    color: "white",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
  },
}
export default MyProfile
