import { useEffect, useState } from "react"

const useAddUserDb = newUser =>{
    const [data,setData] =useState('')
    const user = {
        name: newUser?.name||newUser?.displayName||'',
        email:newUser?.email||newUser?.email||'',
        phoneNumber:newUser?.phoneNumber||'',
        matricValue:newUser?.matricValue||'',
        address:newUser?.addressValue||''
    }
    console.log(user);
    useEffect(()=>{
        //https://jomtapaubackend-singapore.onrender.com/user
        fetch('http://localhost:5000/user',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setData(data);
        })
    },[newUser])

    return [data]
}
export default useAddUserDb;