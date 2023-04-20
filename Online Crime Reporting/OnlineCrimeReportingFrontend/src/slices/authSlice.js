import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        status:false,
    },
    reducers:{
        signin: (state,action)=>{
            // the user is now signed in
            state.status = true
                 //on successful authentication
                    //as user signsin successfully he receives a token here
                    //need to store this token as with the help of this token we could use rest api's
                    //so to store token session storeage is used
                    // const token=result['data']['token']
                    // sessionStorage['token']=token OR
                    //sessionStorage['token']=result['data']['token']
                    sessionStorage['token']=action.payload['jwt']
                    //sessionStorage['token'] = result['jwt']
                    //name is receied in response (send by server on successful sigin)
                    //also after successful signin user needs to see signout option on navbar
        },
        signout: (state,action)=>{
            //the user is now signed out
            state.status = false
            //as the user is now signed out ..so remove the token and name from session storage
            sessionStorage.removeItem('token')

        },
    },
})

//export the reducer for authSlice (i.e collection of all reducers is exported)
export default authSlice.reducer
// export the actions (action is like other name of reducer)
export const {signin,signout} = authSlice.actions