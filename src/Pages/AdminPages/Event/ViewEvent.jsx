import { Input,TextInput, Card, Group, Text, Menu, ActionIcon, Image, SimpleGrid, rem ,Box, ScrollArea, Badge, Title,Button, Paper, Grid,FileInput, LoadingOverlay} from '@mantine/core';
import { IconChevronDownLeft, IconChevronRight, IconDots, IconDotsVertical, IconEdit, IconEye, IconMenu, IconTrash ,IconUpload} from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { GetAllEvent,deleteEventImages,addEventImages,updateEvent,deleteEvent } from '../../../services/EventPageService';
import CardComponent from '../../../Component/Card';
import ModalComponent from '../../../Component/Modal';
import { useFormik } from 'formik';
import { Successnotification,Errornotification } from '../../../utils/notification';



export default function ViewEvent() {

  const [data,setData]=useState([])
  const[images,setImages]=useState([])
  const[editModal,setEditModal]=useState(false)
  const[deleteModal,setDeleteModal]=useState(false)
  const[previewModal,setPreviewModal]=useState(false)
   const[event,setEvent]=useState({})
   const[imageModal,setImageModal] = useState(false)
   const[loader,setLoader] = useState(false)
   const[eventId,setEventId] = useState(null)
   const[image,setImage]=useState()
   const[newImage,setNewImage] = useState([])
 

  useEffect(()=>{
    loadData()
  },[])

async function loadData(){

     await GetAllEvent({}).then(res=>{
      setData(res.data);
     }).catch(err=>{
      console.log(err);
     })
} 

const formik = useFormik({
  enableReinitialize: true,
  initialValues:event,
  onSubmit: values => {
  handleEdit(formik.values)
   console.log(JSON.stringify(values, null, 2));
  },
});

async function handleDelete(){

  setLoader(true)
  await deleteEvent({_id:eventId}).then((res)=>{
    setLoader(false)
    setDeleteModal(false)
    Successnotification(res.data.message)
    
  })
  .catch(err=>{
    Errornotification(err.message)
  
    setLoader(false)
    setDeleteModal(false)
  })
}


async function getOneEvent(id){
  setEventId(id)
  setEditModal(true)
  await GetAllEvent({_id:id}).then(res=>{
    setEvent(res.data[0])
   }).catch(err=>{
    console.log(err);
   })
}


async function previewimages(id){
  console.log("id",id);
  if(data.length > 0){
      data.filter(item=>{
          if( item._id === id) {
            console.log("return item.eventImages", item.eventImages);
            setImages(item?.eventImages)
          }
        })
       
     
  } 
}


async function handleEdit(id) {
  
  setEvent(event)

  
  let tempArr=[]

  newImage?.data.map(item=>{
    let obj={
      profile_img:item.secure_url,
      cloudinary_id:item.public_id
    }
    tempArr.push(obj)
  })
 

  // console.log("tempArr",tempArr);

  formik.values.eventImages.push(tempArr[0])

  // console.log("payload",formik.values);


  await updateEvent(id)
  .then((res) => {
    console.log("res",res.data);
    Successnotification(res.data.message)
    setLoader(false)
    window.location.href='/event'
    // window.location.reload();
    
  })
  .catch((err) => {
    console.log(err);
    Errornotification(err.message)
  });

 }

async function handleImageDelete(public_id){
  setLoader(true)
  // console.log("public_id",public_id);
 return  await  deleteEventImages({
  _id:eventId,
  cloudinary_id:public_id
 }).then(res=>{
  // console.log("res",res.data);
  setLoader(false)
  window.location.reload()
  //  window.location.href='/'
 }).catch(err=>{
  console.log("err",err.message);
 })
}


async function addImages(){
  // setVisible(true)
  setLoader(true)
  // console.log("image",image);
  const formdata=new FormData()
  for (let i = 0; i < image?.length; i++) {
    formdata.append("files",image[i]);
    
  }
  // console.log("formdata", formdata);
 return  await addEventImages(formdata).then(res=>{
  if(res.data){
    setLoader(false)
    setImageModal(false)
    setNewImage(res.data)
   return res.data;
  }
  }).catch(err=>{
    setLoader(false)
    setImageModal(false)
    return err
  })
}
  


  return (
   <>
    <Paper mt={5} shadow="xs" p="md">
     <Grid>

 {data.map(item=>{
   
   return(
   
    <Grid.Col  md={3}>

    <CardComponent head={
      (
        <>
        <Box>
        <Group sx={6} position="apart">
          <Text fw={"bold"} fz={10} color="dimmed" >{item.event_name.toUpperCase()}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon  >
                    <IconDotsVertical size="1rem" />
                   </ActionIcon>
                 </Menu.Target>
    
                <Menu.Dropdown>
               <Menu.Item onClick={()=>{
                  setPreviewModal(true)
                  previewimages(item._id)
                  
                }
                
                  }   icon={<IconEye size={rem(14)} />} color="cyan">
                    preview
                  </Menu.Item>
                <Menu.Item onClick={()=>getOneEvent(item._id)}  icon={<IconEdit size={rem(14)} />} color="dimmed">
                               Edit
                  </Menu.Item>
                  <Menu.Item onClick={()=>{
                      setDeleteModal(true)
                    setEventId(item._id)
                  }}   icon={<IconTrash size={rem(14)} />} color="red">
                    Delete
                  </Menu.Item>
                 
                </Menu.Dropdown>
              </Menu>
        </Group>
        </Box>

      <Card.Section >
      <Group position='apart'>
        
      <Text fz={10} fw={"bold"}>&nbsp;&nbsp;{item.inAssociationWith.toUpperCase()}</Text>
      
      <Text size="xl" color="grey">{item.event_place}</Text>
      <Badge mt="sm" color="dimmed" size="sm">{moment(item.event_date).format('DD-MM-YYYY')}{""}{""}</Badge>
  
      </Group>
      </Card.Section>
      </>   
      )
    } images={item?.eventImages} 
    props={
      (
      <>
       <Box>
      <Title  size="sm" color={"cyan"}> &nbsp;Description</Title>
       <Text mt="sm"  size="sm"> &nbsp;&nbsp;{item.description}</Text>
      </Box>
      </>
      )
    }
    ></CardComponent>

</Grid.Col>



   
   )})}
    


      </Grid>
      </Paper>
      <ModalComponent open={previewModal} close={()=>setPreviewModal(false)} props={(
        <>
        <Text fw={"bold"}>All Images</Text>
        {images?.length>0?(
          <SimpleGrid  cols={2}>
          {images.map((image) => (
            
              <Image style={{
                width:"100%",
              }} alt='No image' src={image?.profile_img} key={1} radius="sm" />
            )
         
      )}
         
        </SimpleGrid>
        ):<Text align='center'  color='blue' fw={"bold"}>OOPS! There is No Images</Text>}
       
       
        </>
      )}></ModalComponent>
      

      {/* edit Modal */}

      <ModalComponent  open={editModal} close={()=>setEditModal(false)} props={
        event!==undefined ?
        (
          <>
          <Text color="cyan" fw="bold" align='center'>{formik.values.event_name}</Text>
          <form onSubmit={(values)=>{formik.handleSubmit(values)}}>
          {Object.keys(event)?.map((item, i) => { 
            if(item=="_id" || item=="__v"){
              return null
            }
            
              if(item ==="eventImages"){
                // console.log("formik",formik.values.eventImages);
                let images=formik.values.eventImages
                
        
               return(
                <>
                <Group  mt={6}  position='apart'>
                <Text color="brown" fw={"bold"}>Event Images</Text>
                <IconEdit onClick={()=>{setImageModal(true)}} color="grey"></IconEdit>
                </Group>

                <Grid>
              
                  {
  images?.map((value, i) => {
    let src=value?.profile_img
    // console.log("src",value);

   return (
    <>
  
        <Grid.Col md={6}>
   
      <Paper w={"100%"} shadow="xs" p="md">
        
     <Image alt="No Image" w={50} src={src}></Image>
     <Group position='right'>

     
     
     <IconTrash   onClick={()=>handleImageDelete(value.cloudinary_id)} mt={0} color='red' size={20}   /> 
        </Group>
     </Paper>
     </Grid.Col>
    </>
   
   )
  })
                  }
                 
                </Grid>
                </>
               )
               
              
                
              }
          
            if(item=="event_date"){
              return(
                <DatePickerInput
                mt="md"
                disabled={true}
                label={item.toUpperCase()}
                value={moment(formik.values[item]).toDate()}
                onChange={formik.handleChange}
               
                ></DatePickerInput>
              )
            }
           
           
             else  {
                
              return (
                <>
                 <Input.Wrapper mt="lg" fs={10} color="gray" label={item.toUpperCase()}>
                 <TextInput 
                          //  disabled={
                          //   item=="email"?true:
                          //  item=="regimentNo"?true:false
                          // }
                           mt="md"
                           style={{
                            borderBottom:"1px solid black",
                          }}
                         
                          variant="unstyled"
                           value={formik.values[item]}
                           name={item}
                           onChange={formik.handleChange}
                         
                           //  {...form.InputProps('name')}
                 >

                 </TextInput>
                 </Input.Wrapper>
                </>
                )
            }
          })}
  <Group position="center">
  <Button mt={20} color="orange" type='submit'>SUBMIT</Button>
  </Group>
 
        </form>
        </>
      ):
      <LoadingOverlay visible={true} />
    }></ModalComponent>



      {/* delete Modal */}

   <ModalComponent centered open={deleteModal} close={()=>setDeleteModal(false)} props={(
    <Box  sx={(theme) => ({
       textAlign:'center'
    })}>

      <Text>Are You Confirm Wants to Delete?</Text>&nbsp;
      <Box 
        sx={(theme) => ({
          // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          textAlign: 'center',
          justifyContent:'space-evenly',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          cursor: 'pointer',   
        })}
       display={"flex"}>
        <Button color="green" onClick={()=>handleDelete()}>YES</Button>
        <Button color={"red"} onClick={()=>setDeleteModal(false)}>NO</Button>
      </Box>

    </Box>

   )}></ModalComponent>


    {/* update image modal */}
    <ModalComponent open={imageModal} close={()=>setImageModal(false)} props={
        (
         
          <>
               <FileInput
               multiple
               clearable
               icon={<IconUpload />}
      placeholder="Pick file"
      label="Event Image"
      onChange={(e) => {
        setImage(e);
      }}
      // withAsterisk
    />
             <Button onClick={()=>addImages()} mt={10} color="green">Update</Button>
          </>
        )
       }>
                       
      </ModalComponent>
      <LoadingOverlay visible={loader} onBlur={2} />
   </>
 
   
  );
}