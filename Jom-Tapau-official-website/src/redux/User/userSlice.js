import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import auth from "../../firebase.init";

const initialState = {
    error : "",
    userEmail:"",
    isLoading: false,
    isRegisterLoading:false,
    isRegisterSuccess: false,
    isRegisterError: false,
}

export const registerUser = createAsyncThunk("registerUser",async (data)=>{
    const  result = await createUserWithEmailAndPassword(auth,data.emailValue,data.passwordValue);
    return result.user.email
})

// export const storeUserDB = 

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        reset:(state)=>{
            state.userEmail = "";
            state.isLoading=false;
            state.isRegisterLoading=false;
            state.isRegisterSuccess=false;
            state.isRegisterError=false;
        }
    },
    extraReducers:builder=>{
        builder
       .addCase(registerUser.pending,(state)=>{
            state.isRegisterLoading=true;
            state.isRegisterSuccess=false;
            state.isRegisterError=false;
       })
       .addCase(registerUser.fulfilled,(state,action)=>{
            state.isRegisterLoading=false;
            state.isRegisterSuccess=true;
            state.isRegisterError=false;
            state.userEmail = action.payload;
       })
       .addCase(registerUser.rejected,(state,action)=>{
            state.isRegisterLoading=false;
            state.isRegisterSuccess=false;
            state.isRegisterError=true;
            state.error = action.error.message;
        })   
    }
})


export const {} = userSlice.actions;
export default userSlice.reducer
