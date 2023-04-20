import React from 'react'
import ModalComponent from '../../Component/Modal';
import { PasswordInput,Button, Group,LoadingOverlay,Text,Code, Paper,Box,Image,Divider,Grid,Space,Badge, Title } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { changePassword } from '../../services/ProfileServices';
import { Errornotification, Successnotification } from '../../utils/notification';
import moment from 'moment';

export default function ProfileView() {


    const[opened,setOpened]=useState(true)
    const[visible,setVisible]=useState(false)

    let token=localStorage.getItem('student')
  
    const parseToken=JSON.parse(token)
    console.log("getToken", parseToken.data);

    let user=parseToken.data

    const form = useForm({
        enableReinitialize: true,
        initialValues: {
            
            new_pass:"",
            confirm_pass:"",
            
        },
      });


    async function handleChange(form){
        setVisible(true)
     console.log("form", form);
     await changePassword(form,parseToken.token).then(res => {
          console.log(res.data);
          Successnotification(res.data.message)
          setVisible(false)
     })
     .catch(err => {
      console.log(err);
      setVisible(false)
      Errornotification(err.message)
     })
    }


  return (
  
    <>
  
   {/* <center> */}


 
    <Paper mt={20}  w={"90%"} 
    //  bg={"cyan"}
      sx={{
      // marginLeft:50,
      // display:'flex',flexDirection:'row',justifyContent:'space-between'
    
    }} shadow="xs" >
         <Grid>
         <Grid.Col md={8}>

     
<Box sx={{
   width:"30%",
   height:490,
   borderRight:'2px solid whitesmoke'
  //  backgroundColor:"gray"
}}>


<Group position='center'>
<img style={{
// marginTop:10,
borderRadius:"50%",
width:"200px",
height:"200px"

}} src={user?.image?.profile_img} />


</Group>
<Divider  color="whitesmoke" size={"sm"} my="xl" />

<Text align='center' fw="bold" color='brown' >{user.name.toUpperCase()}</Text>
<Text align='center' fw="bold"  >{user.regimentNo.toUpperCase()}</Text>


</Box>
</Grid.Col>
<Title c="orange" order={4}>
  Contact Details
</Title>
<Grid.Col md={6}>
<Text><span style={{
  color:"GrayText",

}}>Email:</span>&nbsp;&nbsp;{user.email}</Text>

<Group style={{display:'flex'}}>
<Text c="grey">Mobile:</Text>
<Badge>{user.mobileNo}</Badge>
</Group>

<Title c="orange" order={4}>
  Personal Details
</Title>
<Group style={{display:'flex'}}>
<Text c="grey">DOB:</Text>
<Text>{moment(user.dob).format('YYYY/MM/DD')}</Text>
</Group>
<Group>
<Text c="grey">Blood Group:</Text><Code fz={"md"}>{user.bg}</Code>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Food Type:</Text>
<Text>{user.vegOrNonveg.toUpperCase()}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Aadhar Number:</Text>
<Text>{user.aadharNo}</Text>
</Group>


<Title c="orange" order={4}>
  Acadamic Details
</Title>
<Group style={{display:'flex'}}>
<Text c="grey">Rank:</Text>
<Text>{user.rank}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Batch:</Text>
<Badge>{user.batch}</Badge>
</Group>

<Group style={{display:'flex'}}>
<Text c="grey">Enrolling Officer:</Text>
<Text>{user.EnrollingOfficer}</Text>
</Group>

<Group style={{display:'flex'}}>
<Text c="grey">Incharge:</Text>
<Text>{user.incharge}</Text>
</Group>

<Group style={{display:'flex'}}>
<Text c="grey">Date of Enroll:</Text>
<Text>{moment(user.dateOfEnroll).format('YYYY/MM/DD')}</Text>
</Group>

<Title c="orange" order={4}>
  Bank Details
</Title>

<Group style={{display:'flex'}}>
<Text c="grey">Holder Name:</Text>
<Text>{user.bankDetails.holdername}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Acc NO:</Text>
<Text>{user.bankDetails.accNo}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Bank:</Text>
<Text>{user.bankDetails.bankName}</Text>
</Group>

<Group style={{display:'flex'}}>
<Text c="grey">IFSC code:</Text>
<Text>{user.bankDetails.ifscCode}</Text>
</Group>

<Group style={{display:'flex'}}>
<Text c="grey">Branch:</Text>
<Text>{user.bankDetails.branch}</Text>
</Group>

<Title c="orange" order={4}>
  Address
</Title>
<Group style={{display:'flex'}}>
<Text c="grey">Address Line 1:</Text>
<Text>{user.address.line1}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">Address Line 2:</Text>
<Text>{user.address.line2}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">City:</Text>
<Text>{user.address.city}</Text>
</Group>
<Group style={{display:'flex'}}>
<Text c="grey">State:</Text>
<Text>{user.address.state}</Text>
</Group>

</Grid.Col>
 <Grid.Col md={2}>
      {/* <Group position='right'> */}
      <Button  color='white' variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}  onClick={()=>setOpened(true)}>Change Password</Button>
     
      {/* </Group> */}

      </Grid.Col>
    
     
     </Grid>
    </Paper>
   
    {/* </center> */}

{/* change password */}
    <ModalComponent
    open={opened}
    close={()=>setOpened(false)}
    props={(
        <>
        <Text align="center" fw="bold" color="brown">Change Password</Text>
         <form onSubmit={form.onSubmit((values) => handleChange(values))}>
        <PasswordInput label="New Password" placeholder='Enter new Password'
        {...form.getInputProps('new_pass')}
        />
        <PasswordInput label="Confirm Password" placeholder="Enter confirmation password"
        {...form.getInputProps('confirm_pass')}
        
        />
        <Group mt="md" position='center'>
            <Button type="submit" color='dark' sx={{
                backgroundColor:"ButtonFace"
            }}>Change</Button>
        </Group>
        </form>
        </>
    )}
     />
        <LoadingOverlay visible={visible} overlayBlur={2} />
    </>
  )
}
