import axios from 'axios'

const GetAllStudent= (query={},project={}) => {

    const url= `http://localhost:9876/api/admin/viewStudent?project=${JSON.stringify(project)}&match=${JSON.stringify(query)}` 

    return axios.get(url)
       
}


const addStudent = (token,payload) => {
    let headers={
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'auth':token
    }
    const url=`http://localhost:9876/api/admin/addStudent`
    return axios.post(url,payload,{headers:headers})
}



const deleteStudent = (token,payload)=>{
   let headers={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'auth':token
}
const url=`http://localhost:9876/api/admin/deleteStudent/${payload}`
return axios.delete(url,{headers:headers}) 
}

const addStudentProfile = (payload) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:9876/api/admin/uploadProfile`
    return axios.post(url,payload)
}


const updateStudent=(query,payload)=>{
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:9876/api/admin/updateStudent?regimentNo=${query}`
    return axios.patch(url,payload)

}

const CadetFileUpload = (payload) => {
    // let headers={
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'auth':token
    // }
    const url=`http://localhost:9876/api/admin/fileUpload`
    return axios.post(url,payload)
}



export {GetAllStudent,addStudent,deleteStudent,addStudentProfile,updateStudent,CadetFileUpload}