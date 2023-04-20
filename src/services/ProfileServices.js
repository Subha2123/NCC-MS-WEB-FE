
import axios from 'axios'

const adminLogin= (payload) => {
    const url=`http://localhost:9876/api/admin/login`
    return axios.post(url,payload)
       
}

const cadetLogin= (payload) => {

    const url=`http://localhost:9876/api/student/login`
    return axios.post(url,payload)
       
}


const changePassword=(payload,token)=>{
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    const url=`http://localhost:9876/api/student/change-password`
      return axios.post(url,payload,{headers})
}


export {adminLogin,cadetLogin,changePassword}