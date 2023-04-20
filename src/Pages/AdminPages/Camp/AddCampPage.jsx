import React from "react";
import {
  Box,
  Grid,
  SimpleGrid,
  Group,
  TextInput,
  Button,
  PasswordInput,
  FileInput,
  Modal,
  Stepper,
  NumberInput,
  NativeSelect,
  Select,
  LoadingOverlay,
  Text,
  Table
} from "@mantine/core";
import ModalComponent from "../../../Component/Modal";
import { useForm } from "@mantine/form";
import { useState,useEffect } from "react";
import { DatePickerInput,DatePicker } from "@mantine/dates";
import moment from "moment";
import { ValueComponent } from "../../../utils/multiUpload";
import { IconUpload,IconPhoto,IconZoomReset, IconRefreshDot, IconRefresh } from "@tabler/icons-react";
import { GetAllCamp, deleteCamp } from "../../../services/CampPageService";
import { useFormik } from "formik";
import { addEventImages } from "../../../services/EventPageService";
import { AddCamp } from "../../../services/CampPageService";
import { Successnotification,Errornotification } from "../../../utils/notification";
import { GetAllStudent } from "../../../services/StudentPageServices";

export default function AddCampPage() {
  const [open, setOpen] = useState(false);
  const[dropDown,setDropDown] = useState([]);
  const [data,setData]=useState([])
  const[value,setValue]=useState("")
  const[cadetName,setCadetName]=useState()
  // const[date,setDate]=useState()
  const[image,setImage]=useState()
  const[loader,setLoader] = useState(false)
  const[reStoreModal,setReStoreModal] = useState(false)
  const[reStoreData,setRestoreData] = useState([])

  // console.log("date",date);

  const form = useForm({
    enableReinitialize: true,
    initialValues: {
        cadet_regimentNo:value,
        cadet_name:cadetName,
        camp_name:"",
        camp_place:"",
        camp_type:"",
        date:{
          start:new Date(),
          end:new Date(),
        },
        campImages:[]
    },
  });
console.log("formik",form.values);

  useEffect(()=>{
    getAllCampDropdowns()
  },[])


  const token=localStorage.getItem('admin')
  const parseToken=JSON.parse(token)

  // console.log("val",value);

  async function getAllCampDropdowns() {

    await GetAllStudent({}).then(res=>{
      setData(res.data)
      setDropDown(res.data.map((val)=>val.regimentNo))

  }).catch(err=>{
   console.log(err);
  })


  await GetAllCamp({status:false}).then(res=>{
    console.log("res",res.data);
 setRestoreData(res.data);
}).catch(err=>{
 console.log(err);
})

  }
  

 
  async function addImages(){
    // setVisible(true)
    // setLoader(true)
    console.log("image",image);
    const formdata=new FormData()
    for (let i = 0; i < image?.length; i++) {
      formdata.append("files",image[i]);
      
    }
    console.log("formdata", formdata);
   return  await addEventImages(formdata).then(res=>{
    if(res.data){
      setLoader(false)
     return res.data;
    }
    }).catch(err=>{
      setLoader(false)
      return err
    })
  }
 

  

  async function handleSubmit(form) {
    
    // setVisible(true)
    setLoader(true)

 let addImage=await addImages()
 console.log("addImage",addImage);

 let tempArr=[]

  if(addImage.status==200){
    for (let i = 0; i < addImage.data.length; i++) {
      const {secure_url,public_id}=addImage.data[i]
      let obj={
        profile_img:secure_url,
        cloudinary_id:public_id
      }
     tempArr.push(obj)
      
    }
    console.log("tempArr: ", tempArr);
    form.campImages=tempArr

    console.log(form.values);

    
    console.log("form",form);
    await AddCamp(form).then(res=>
      {
        console.log(res.data)
        if(res.data){
         //  setVisible(false)
          Successnotification(res.data.message)
          setOpen(false)
          setLoader(false)
          // window.location.reload();
        }
      }).catch(err=>{
        console.log(err)
        setLoader(false)
        Errornotification(err.message)
      })
  }

  else{
   Errornotification("Error While uploading Image");
  }



}
  
async function handleRestore(id){
   console.log("id",id);
   await deleteCamp({_id:id,status:true}).then(res=>{
    console.log(res.data);
    Successnotification(res.data.message)
   
    window.location.reload()
   }).catch(err=>{
    console.log(err);
    Errornotification(err.message)
   })
}

  const rows = reStoreData.map((element,idx) => (
    <tr key={element.camp_name}>
      <td>{idx+1}</td>
      <td>{element.cadet_name}</td>
      <td>{element.camp_name}</td>
      <td>{element.cadet_regimentNo}</td>
      <td><IconRefresh color="orange" onClick={()=>handleRestore(element._id)} /></td>
      {/* <td>{element.mass}</td> */}
    </tr>
  ));



  return (
    <>
           
    
    <Group mr={40} mt={6} position="right">
    <Button size="sm"   variant="outline" color="#bf4b4b" onClick={()=>setOpen(true)}>Add</Button>
    <Button size="sm" onClick={()=>setReStoreModal(true)}  color="#bf4b4b">Restore</Button>
    </Group>
   
    <ModalComponent
          open={open}
          close={() => setOpen(false)}
          title="ADD CAMP"
          props={
         
           
            <Grid>
            <Grid.Col xs={12}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
     
     <Select
      label="Your favorite framework/library"
      placeholder="Pick one"
      data={dropDown}
      searchable
      onChange={(e)=>{setValue(e)}}
      {...form.getInputProps("cadet_regimentNo")}
      // value={value}
    />
    <TextInput
              
                withAsterisk
                label="Cadet Name"
                // placeholder={cadetName}
                {...form.getInputProps("cadet_name")}
    />
     <TextInput
                withAsterisk
                label="Camp Name"
                placeholder="Ex:National Camp Name"
                {...form.getInputProps("camp_name")}
    />

              <TextInput
                placeholder="Sulur"
                label="Camp Place"
                //  description="Password must include at least one letter, number and special character"
                {...form.getInputProps("camp_place")}
              />
 <Select
   
      data={['National','State']}
      label="Camp Type"
      variant="filled"
      withAsterisk
      {...form.getInputProps("camp_type")}
    />
      {/* <DatePickerInput
      clearable
      type="range"
      label="Pick dates range"
      valueFormat="MM/DD/YYYY"
      placeholder="Pick dates range"
      // value={date}
      onChange={(e)=>{setDate(e)}}
      mx="auto"
      maw={400}
    /> */}
        <FileInput
              accept="image/png,image/jpeg"
              placeholder="Upload Profile Image"
              label='Upload Image'
              withAsterisk
              sx={{
                width: "100%",
              }}
              multiple clearable valueComponent={ValueComponent}
              icon={<IconPhoto size={20} />}
              onChange={(e) => {
                setImage(e);
              }}

          
            />
            
      
              <br />
              <Group position="center" mt="md">
          <Button type="submit" color="teal" disabled={!form.isDirty}>create</Button>
        </Group>
            </form>
            </Grid.Col>
            </Grid>

          }></ModalComponent>


{/* Restore Data */}

<ModalComponent 
open={reStoreModal}
size="lg"
close={()=>setReStoreModal(false)}
props={(
  <>
  {
    reStoreData.map(item=>(
      <Table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Camp Name</th>
          <th>Cadet Name</th>
          <th>Regiment Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    ))
  }
 
 
  </>
)}
>

</ModalComponent>

 <LoadingOverlay  visible={loader} />
    </>
  );
}
