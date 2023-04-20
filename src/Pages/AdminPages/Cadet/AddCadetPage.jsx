
import React from 'react'
import { Dialog,Text,Box,Checkbox,Group,TextInput,Button,PasswordInput,FileInput,NumberInput, Grid,LoadingOverlay,FileButton,Tooltip,Select} from '@mantine/core'
import { useForm } from '@mantine/form';
import { useState,useEffect } from 'react'
import { YearPickerInput } from '@mantine/dates';
import { DateInput } from '@mantine/dates';
import moment from 'moment/moment';
import ModalComponent from '../../../Component/Modal';
import { addStudent,addStudentProfile } from '../../../services/StudentPageServices';
import { IconPhoto,IconFilter, IconFile } from '@tabler/icons-react';
import { Errornotification, Successnotification } from '../../../utils/notification';
import {CadetFileUpload } from '../../../services/StudentPageServices';

import {   isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';




export default function AddCadet() {


  const [open,setOpen]=useState(false)
 
  const[image,setImage]=useState(null)
  const[visible,setVisible]=useState(false)
  const[fileUploadModal,setFileUploadModal]=useState(false)
  const[file,setFile]=useState()
  

  // const[image,setImage]=useState()
  

  const form = useForm({
    initialValues: {
      name:"",
      email:"",
      password:"",
      mobileNo:"",
      batch:"",
      dateOfEnroll:"",
      EnrollingOfficer:"",
      regimentNo:"",
      rank:"",
      incharge:"",
      dob:"",
      bg:"",
      vegOrNonveg:"",
      aadharNo:"",
      holdername:"",
      bankName:"",
      accNo:"",
      branch:"",
      ifscCode :"",
      image:"",
      // url:"https://res.cloudinary.com/delnwukcs/image/upload/v1680440356/404_xoa19r.png"
    },
    
    // validate: {
    //   name: hasLength({ min: 2, max: 10 }, 'Name must be 2 characters long'),
    //   email: isEmail('Invalid email'),
    //   password: isNotEmpty('Enter password'),
    //   mobileNo:isNotEmpty('Mobile number required'),
    //   batch:isNotEmpty('Enter batch'),
    //   dateOfEnroll:isNotEmpty("Enter Date of Enroll"),
    //   regimentNo:isNotEmpty('Enter Regiment Number'),
    //   rank:isNotEmpty('Enter rank'),
    //   incharge:isNotEmpty('Enter Incharge'),
    //   dob:isNotEmpty("Enter Date of Birth"),
    //   bg:isNotEmpty("Enter Blood Group"),
    //   vegOrNonveg:isNotEmpty('Enter Food Type'),
    //   aadharNo:isNotEmpty('Enter Aadhar Number'),
    //   holdername:isNotEmpty('Holername is required'),
    //   bankName:isNotEmpty('BankName is required'),
    //   accNo:isNotEmpty('Enter Account Number'),
    //   branch:isNotEmpty('Enter Branch'),
    //   ifscCode:isNotEmpty('Enter ifsc Code'),

    // },
    

    // validate: {
    //   if(!values) 
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const token=localStorage.getItem('admin')
  const parseToken=JSON.parse(token)
 
  


  async function uploadFile(){
    setVisible(true)
    const formdata=new FormData()
    formdata.append("file",file)
    await CadetFileUpload(formdata).then(res=>{
      console.log(res.data)
      setVisible(false)
      Successnotification(res.data.message)
      window.location.reload()
    }).catch(err=>{
       console.log(err.message)
       Errornotification("Error While uploading file")
       setVisible(false)
    })

  }




  async function addProfileImages(){
    // setVisible(true)
    const formdata=new FormData()
    formdata.append("file",image)

   return  await addStudentProfile(formdata).then(res=>{
    if(res.data){
      // setVisible(false)
    } 
     return res.data;
    }).catch(err=>{
      return err
    })
  }

   async function handleSubmit(form) {
    
       setVisible(true)
     

       console.log("form",form);
    let addImage=await addProfileImages()

     if(addImage.status==200){
      form.image=addImage.data
     }
     else{
       Errornotification("Error While uploading Image");
     }

     

    //  console.log("fomr",form);


   await addStudent(parseToken,form).then(res=>
    {
      console.log(res)
      if(res.data){
        setVisible(false)
        Successnotification(res.data.message)
        setOpen(false)
        window.location.reload();
      }
    }).catch(err=>{
      // setVisible(false)
      console.log(err)
      Errornotification(err.message)
    })
  
  }

  const addFormOne=()=>(
    <Grid>
      <Grid.Col xs={6} >
      <TextInput
              withAsterisk
              label="Name"
              placeholder="Enter Cadet Name"
              {...form.getInputProps('name')}
            />
        </Grid.Col> 
        <Grid.Col xs={6} >
    <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            </Grid.Col>
            <Grid.Col xs={6} > 
            <PasswordInput
             placeholder="Password"
             label="Password"
            //  description="Password must include at least one letter, number and special character"
             {...form.getInputProps('password')}
             />
             </Grid.Col>

       <Grid.Col xs={6} >       
       <TextInput
              label="regimentNo"
              placeholder="Ex:NCC10"
              {...form.getInputProps('regimentNo')}
    />
    </Grid.Col>
      
    <Grid.Col xs={6} > 
    <NumberInput
        hideControls
        type='number'
              label="Mobile Number"
              placeholder="EX:9655639197"
              {...form.getInputProps('mobileNo')}
         />
     </Grid.Col>
     <Grid.Col xs={6} > 
       <YearPickerInput 
     clearable
     label="Enter Batch Year"
     placeholder={new Date().getFullYear()}
     mx="auto"
  {...form.getInputProps('batch')}
         />
</Grid.Col>
<Grid.Col xs={6} >       
 <NumberInput
        hideControls
           type='number'
          label="aadharNo"
          placeholder="Ex:1234 5678 9087"
          {...form.getInputProps('aadharNo')}
/>
</Grid.Col>

<Grid.Col xs={6} > 
<DateInput
         valueFormat="YYYY/MM/DD"
         label="Date of Enroll"
         placeholder={moment(new Date()).format('YYYY-MM-DD')}
          {...form.getInputProps('dateOfEnroll')}
     />
 </Grid.Col>
</Grid>
)


const addFormTwo=()=>(
  <>
<Grid>
 <Grid.Col xs={6} > 
   <TextInput
          label="Enrolling Officer"
          placeholder=" Enter EnrollingOfficer"
          {...form.getInputProps('EnrollingOfficer')}
     />

    </Grid.Col> 
    <Grid.Col xs={6} > 
 <NumberInput
 type='number'
        hideControls
          label="Rank"
          placeholder="Ex:1"
          {...form.getInputProps('rank')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
<TextInput
          label="Incharge"
          placeholder="Enter InCharge"
          {...form.getInputProps('incharge')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
<DateInput
         valueFormat="YYYY/MM/DD"
         label="DOB"
        //  placeholder={moment(new Date()).format('YYYY-MM-DD')}
          {...form.getInputProps('dob')}
     />
 </Grid.Col>
<Grid.Col xs={6} > 
<TextInput
          label="Blood Group"
          placeholder="Ex:A+"
          {...form.getInputProps('bg')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
<Select
      label="Select Food Type"
      placeholder="Pick one"
      data={["veg",'Nonveg']}
      searchable
      
      {...form.getInputProps("vegOrNonveg")}
      // value={value}
    />
    </Grid.Col>

</Grid><br />
  </>
)


const addFormThree=()=>(
  <>
   <Text color='brown' tt={"uppercase"} >Bank Details</Text>
      <Grid>
       
      <Grid.Col xs={6} > 
          <TextInput
          label="holdername"
          placeholder="Enter Holdername"
          {...form.getInputProps('holdername')}
/>
</Grid.Col>
      
<Grid.Col xs={6} > 

<TextInput
          label="bankName"
          placeholder="Ex:canara"
          {...form.getInputProps('bankName')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
 <NumberInput
 type='number'
        hideControls
          label="accNo"
          placeholder="Enter AccNo"
          {...form.getInputProps('accNo')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
<TextInput
          label="branch"
          placeholder="Enter branch"
          {...form.getInputProps('branch')}
/>
</Grid.Col>
<Grid.Col xs={6} > 
<TextInput
          label="ifscCode"
          placeholder="Ex:CNRB12345"
          {...form.getInputProps('ifscCode')}
/>
</Grid.Col>
</Grid>
<br />
  </>
)

const addFormFour=()=>(
  <>
     <Group>
      <Text fs={9} color='brown'>PROFILE IMAGE</Text>
     <FileInput
              accept="image/png,image/jpeg"
              placeholder="Upload Profile Image"
            
              withAsterisk
              sx={{
                width: "100%",
              }}
              icon={<IconPhoto size={20} />}
              onChange={(e) => {
                setImage(e);
              }}

          
            />
      </Group>
  </>
)





  
  return (
   <>
    
 <Box sx={{ maxWidth: "100%" }} style={{
  
 }}>
<Group position='right' style={{
  marginRight:10,
}}>
  
<Button size="sm"   variant='filled' color="#bf4b4b" onClick={()=>setOpen(true)}>ADD</Button>
<Button  onClick={()=>{
  setFileUploadModal(true)
}} color='brwown' variant='outline'>Upload File</Button>


</Group>

  <ModalComponent  open={open} close={()=>setOpen(false)} size="lg" props={
              (
          <>
           <Box mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
          <Grid.Col xs={12}>
          <>{addFormOne()}</>
           <>{addFormTwo()}</>
          </Grid.Col>
          <Grid.Col xs={12}>
          <>{addFormThree()}</>
        <>{addFormFour()}</>

          </Grid.Col>
        </Grid>
        
       
       

        <Group position="center" mt="md">
          <Button type="submit" color="teal" disabled={!form.isDirty()}>create</Button>
        </Group>
      </form>
    </Box>
      
          
  </>
               
               )
              }>
           
  </ModalComponent>
</Box>

<LoadingOverlay visible={visible} overlayBlur={2} />

{/* file Upload  Modal */}
<ModalComponent open={fileUploadModal} close={()=>setFileUploadModal(false)}
 props={(
<>
  <Text color="brown" >Select File</Text>
 
  <FileInput
              mt={"md"}
              clearable  
              accept=".xlsx, .xls, .csv"
              placeholder="Upload File"
            
              withAsterisk
              sx={{
                width: "100%",
              }}
              icon={<IconFile size={20} />}
              onChange={(e) => {
                setFile(e);
              }}

          
            />
             <Text fz={15} color='dimmed' mt="md">Note:Regiment No&Email&Mobile Number must be unique </Text>
            <Group position='center'>
           

<Button disabled={file?false:true} onClick={()=>uploadFile()} mt={"md"} color='brwown' variant='outline'>Upload</Button>
</Group>
    

          
    
  </>
 )}
>

</ModalComponent>

</>
)}





      


  
 
  




 
   
 
