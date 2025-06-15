import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore =create((set)=>({
     authUser:null, //initially auth user state will be none
      isSigningUp:false,
      isLoggingIng:false,
      isUpdatingProfile:false,

    isCheckingAuth:true, //initially as soon as the refresh the page we need to check
    
    checkAuth:async()=>{
        try{
         const res=await axiosInstance.get("/auth/check");
         set({authUser:res.data})
        }catch(error){
            console.log("Error in checkAuth:",error);
        set({authUser:null})
        }finally{
             set({isCheckingAuth:false});
        }
    },
    signup:async (data)=>{
           set({isSigningUp:true});
           try{
            const res=await axiosInstance.post("/auth/signup",data);
            toast.success('Account created Successfully');
            set({authUser:res.data});

           }catch(error){
            toast.error(error.response.data.message);
           }finally{
            set({isSigningUp:false})
           }
    },

      login:async (data)=>{
           set({isLoggingIng:true});
           try{
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success('loged in  Successfully');
            

           }catch(error){
            toast.error(error.response.data.message);
           }finally{
            set({isLoggingIng:false})
           }
    },
    logout :async ()=>{
     try{
       await axiosInstance.post("/auth/logout");
       set({
         authUser: null,
         isLoggingIng: false,
         isSigningUp: false
       });
       toast.success("Logged out successfully!");
       toast.success("hope You Revisit....");
     }catch(error){
       toast.error(error?.response?.data?.message || "Logout failed");
       set({
         authUser: null,
         isLoggingIng: false,
         isSigningUp: false
       });
     }
    }

}));