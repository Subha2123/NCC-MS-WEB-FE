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
  LoadingOverlay
} from "@mantine/core";
import ModalComponent from "../../../Component/Modal";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { ValueComponent } from "../../../utils/multiUpload";
import { IconUpload,IconPhoto } from "@tabler/icons-react";
import { Successnotification,Errornotification } from "../../../utils/notification";
import { addEventImages,addEvent } from "../../../services/EventPageService";
import { setLocale } from "yup";
import { TroubleshootSharp } from "@mui/icons-material";
import { FaLastfmSquare } from "react-icons/fa";

export default function AddEvent() {
  const [open, setOpen] = useState(false);
  // const[visible,setVisible]=useState(false)
  const[loader,setLoader] = useState(false)

  const[image,setImage]=useState()


  const token=localStorage.getItem('admin')
  const parseToken=JSON.parse(token)

  

  const form = useForm({
    initialValues: {
      eventImages:[],
      event_name: "",
      event_place: "",
      event_date: "",
      total_students: "",
      inAssociationWith: "",
      description: "",
    },

  })

  
  async function addImages(){
    // setVisible(true)
    console.log("image",image);
    const formdata=new FormData()
    for (let i = 0; i < image.length; i++) {
      formdata.append("files",image[i]);
      
    }
  

   return  await addEventImages(formdata).then(res=>{
    if(res.data){
      // setVisible(false)
    } 
     return res.data;
    }).catch(err=>{
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
    // console.log("tempArr: ", tempArr);
    form.eventImages=tempArr
    console.log("form",form);
    await addEvent(parseToken,form).then(res=>
      {
        // console.log(res)
        if(res.data){
         //  setVisible(false)
          Successnotification(res.data.message)
          setOpen(false)
          setLoader(false)
          window.location.reload();
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


  return (
    <>
           
    
    <Group mr={40} mt={6} position="right">
    <Button size="sm"   variant="outline" color="#bf4b4b" onClick={()=>setOpen(true)}>Add</Button>
    </Group>
   
    <ModalComponent
          open={open}
          close={() => setOpen(false)}
          title="ADD EVENT"
          props={
         
           
            
            <Grid>
            <Grid.Col xs={12}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <TextInput
                withAsterisk
                label="Event Name"
                placeholder="Republic Day"
                {...form.getInputProps("event_name")}
              />

              <TextInput
                placeholder="Sulur"
                label="Event Place"
                //  description="Password must include at least one letter, number and special character"
                {...form.getInputProps("event_place")}
              />

              <DateInput
                valueFormat="YYYY/MM/DD"
                label="Event Date"
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                {...form.getInputProps("event_date")}
              />

              <NumberInput
                hideControls
                label="Total Students"
                placeholder="EX:10"
                {...form.getInputProps("total_students")}
              />

              <TextInput
                label="Association"
                placeholder="EX:RVSCAS"
                {...form.getInputProps("inAssociationWith")}
              />
              <TextInput
                label="Description"
                {...form.getInputProps("description")}
              />
                <FileInput mt={10}
                label="Upload Images"
              accept="image/png,image/jpeg"
              placeholder="Upload Profile Image"
               clearable
               multiple
              withAsterisk
              sx={{
                width: "100%",
              }}
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

<LoadingOverlay visible={loader} overlayBlur={2} />
    </>
  );
}
