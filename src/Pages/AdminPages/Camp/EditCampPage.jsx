import React from 'react'
import ModalComponent from '../../../Component/Modal'
import { useState } from 'react';
import { useForm ,form} from "@mantine/form";
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
  
} from "@mantine/core";
import { DatePickerInput,DatePicker } from "@mantine/dates";
import { IconPhoto } from '@tabler/icons-react';
import { ValueComponent } from '../../../utils/multiUpload';
import { Errornotification,Successnotification } from '../../../utils/notification';
import { addEventImages } from '../../../services/EventPageService';
import { useFormik } from 'formik';


export default function EditCampPage() {

 
  // const[edit,setEdit]=useState(data)
  
 

  const[value,setValue]=useState("")
  const[cadetName,setCadetName]=useState()
  // const[date,setDate]=useState()
  const[image,setImage]=useState()
  const[loader,setLoader] = useState(false)
   const[date,setDate]=useState()

  // console.log("editabke",edit);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      cadet_regimentNo:"",
        cadet_name:"",
        camp_name:"",
        camp_place:"",
        camp_type:"",
        date:{
          start:new Date(),
          end:new Date(),
        },
        campImages:[]
        // cadet_regimentNo:data.cadet_regimentNo,
        // cadet_name:data.cadet_name,
        // camp_name:data.camp_name,
        // camp_place:data.camp_place,
        // camp_type:data.camp_type,
        // date:{
        //   start:new Date(),
        //   end:new Date(),
        // },
        // campImages:[]
    },
  });
console.log("formik",form.values);

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
  // await AddCamp(form).then(res=>
  //   {
  //     console.log(res.data)
  //     if(res.data){
  //      //  setVisible(false)
  //       Successnotification(res.data.message)
  //       setOpen(false)
  //       setLoader(false)
  //       // window.location.reload();
  //     }
  //   }).catch(err=>{
  //     console.log(err)
  //     setLoader(false)
  //     Errornotification(err.message)
  //   })
}

else{
 Errornotification("Error While uploading Image");
}



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



  return (
    <>
 
     
         
           <Text>Hello</Text>
            <Grid>
            <Grid.Col xs={12}>
              <Text>Modal Opened</Text>
           
            <form onSubmit={form.handleSubmit}>

              
     
     {/* <Select
      label="Your favorite framework/library"
      placeholder="Pick one"
      data={dropDown}
      searchable
      onChange={(e)=>{setValue(e)}}
      {...form.getInputProps("cadet_regimentNo")}
       value={value}
    /> */}
    <TextInput
              
                withAsterisk
                label="Cadet Name"
                placeholder={cadetName}
                value={form.values.cadet_regimentNo}
                onChange={form.handleChange}
                // {...form.getInputProps("cadet_name")}
    />
     <TextInput
                withAsterisk
                label="Camp Name"
                placeholder="Ex:National Camp Name"
                value={form.values.cadet_name}
                onChange={form.handleChange}
                // {...form.getInputProps("camp_name")}
    />

              <TextInput
                placeholder="Sulur"
                label="Camp Place"
                value={form.values.camp_place}
                onChange={form.handleChange}
                // {...form.getInputProps("camp_place")}
              />
 <Select
   
      data={['National','State']}
      label="Camp Type"
      variant="filled"
      withAsterisk
      value={form.values.camp_type}
      onChange={form.handleChange}
      // {...form.getInputProps("camp_type")}
    />
      <DatePickerInput
      clearable
      type="range"
      label="Pick dates range"
      valueFormat="MM/DD/YYYY"
      placeholder="Pick dates range"
      // value={form.values.date.start-form.values.date.end}
      onChange={(e)=>{setDate(e)}}
      mx="auto"
      maw={400}
    />
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
          <Button type="submit" color="teal">create</Button>
        </Group>
            </form>
            </Grid.Col>
            </Grid>
          

    </>
  )
}
