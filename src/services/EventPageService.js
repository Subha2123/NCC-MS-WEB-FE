import axios from 'axios'

const GetAllEvent= (query) => {
    const url=`http://localhost:7654/api/admin/viewEvent?match=${
        JSON.stringify(query)
    }`
    return axios.get(url)
       
}


const GetAllRecentEvent= () => {
    const url=`http://localhost:7654/api/admin/recentEvent`
    return axios.get(url)
       
}



const addEvent = (token,payload) => {
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    const url=`http://localhost:7654/api/admin/addEvent`
    return axios.post(url,payload,{headers:headers})
}

const addEventImages = (payload) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/uploadImages`
    return axios.post(url,payload)
}

const deleteEventImages = (payload) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/deleteImage?payload=${payload}`
    return axios.patch(url)
}

const updateEvent=(payload)=>{
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:7654/api/admin/updateEvent`
    return axios.patch(url,payload)

}

const deleteEvent = (payload)=>{
//     let headers={
//      'Accept': 'application/json',
//      'Content-Type': 'application/json',
//      'auth':token
//  }
 const url=`http://localhost:7654/api/admin/deleteEvent/?match=${
    JSON.stringify(payload)
 }`
 return axios.delete(url) 
 }
 



export {GetAllEvent,addEvent,addEventImages,deleteEventImages,updateEvent,deleteEvent,GetAllRecentEvent}