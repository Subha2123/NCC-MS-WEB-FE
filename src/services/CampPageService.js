import axios from 'axios'


const GetAllCamp= (match) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    
    const url=`http://localhost:7654/api/admin/viewCamp?match=${JSON.stringify(match)}`
    return axios.get(url)
       
}

const AddCamp=(payload)=>{
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/addCamp`
    return axios.post(url,payload)
}

const updateCamp=(token,payload)=>{
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/addCamp`
    return axios.get(url,payload)
}

const deleteCampImages = (payload) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/deleteImage?payload=${payload}`
    return axios.patch(url)
}

const deleteCamp = (payload)=>{
    //     let headers={
    //      'Accept': 'application/json',
    //      'Content-Type': 'application/json',
    //      'auth':token
    //  }
     const url=`http://localhost:7654/api/admin/deleteCamp/?match=${
        JSON.stringify(payload)
     }`
     return axios.delete(url) 
     }
     



export {GetAllCamp,AddCamp,updateCamp,deleteCampImages,deleteCamp}