
import { PopOver,Grid, Group, Paper,Text,Skeleton,Box,Image, SimpleGrid, Button, Center,Collapse, Modal, Popover, Badge, Loader, LoadingOverlay } from '@mantine/core';
import React from 'react'
import { useEffect, useState } from 'react';
import ModalComponent from '../../../Component/Modal';
import { GetAllCamp, deleteCamp } from '../../../services/CampPageService'
import moment from 'moment';
import { IconEdit, IconTrash, IconTrashFilled } from '@tabler/icons-react';
import { Errornotification, Successnotification } from '../../../utils/notification';

export default function ViewCampPage() {
    const [data,setData]=useState([])
    const [deleteModal, setDeleteModal] = useState(false);
    const[open,setOpen]=useState(false)
    const[deleteId,setDeleteId] = useState()
    const[loader,setLoader] = useState(false)
  

    const token=localStorage.getItem('admin')
    const parseToken=JSON.parse(token)
   
    useEffect(()=>{
        loadData()
      },[])



      async function loadData(){

        await GetAllCamp({status:true}).then(res=>{
            console.log("res",res.data);
         setData(res.data);
        }).catch(err=>{
         console.log(err);
        })

      
   } 
   
//    console.log("data",data);


async function handleDelete(){
  setLoader(true)
  
  //  console.log("del",deleteId);
   await deleteCamp({_id:deleteId,status:false}).then(res=>{
    console.log(res.data);
    Successnotification(res.data.message)
    setLoader(false)
    setDeleteModal(false)
    window.location.reload()
   }).catch(err=>{
    console.log(err);
    Errornotification(err.message)
   })
}

  return (
    <>
   
     <Paper mt={20}  style={{
       backgroundColor:"whitesmoke",
       }}  w={"100%"} shadow="xs" p="md">
     
        
        <Grid >
    {
        data.map((item,idx)=>{
            console.log("item",item);
            return (
                <>
                <Grid.Col md={3} xs={12} sx={{
                    
                    display: 'flex',
                 }}>
                     
             <Paper  shadow="xs" p="md"> 
             <Group position='apart'>
             <Text color={"brown"} fw="bolder">{item.camp_name}</Text>
             <Group>
             <IconEdit  onClick={()=>
                setOpen(true)
                } color='gray' size={15}/>
             <IconTrash onClick={()=>{
              setDeleteModal(true)
              setDeleteId(item._id)
            }
             
              } color="red" size={15} />
             </Group>
         
             </Group>
           {
            item.campImages.map((image)=>(
                <Center>
                <Box>
                <Image style={{
                    maxWidth: "720px",
                    maxHeight: "660px",
                    //  position:"absolute"
                
                }}  alt={`campImage${idx}`}  src={image.profile_img}></Image>
                </Box>
                </Center>
            ))
           }
         
             <SimpleGrid mt={"md"} cols={2}>
             <Badge  color={"teal"} h={25}>{item.cadet_regimentNo}</Badge>
             <Text fw={"bold"}>{item.cadet_name}</Text>  
           
              </SimpleGrid><br ></br>
             <Button onClick={()=>setOpen(true)} variant="subtle">
             <Text>{item.camp_place}</Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text fw={200} c={item.camp_type=="State"?"lime":"coral"}>{item.camp_type.toUpperCase()}</Text>
            </Button><br /><br />
            <Group position='right'>
             {/* <Text  fz={13} >{moment().format('DD/mm/yyyy')}-{moment(item.end_date).format('DD/mm/yyyy')}</Text> */}
             </Group>
            
            
              </Paper>
                </Grid.Col>

             
             
             </>
            )
        })
        
    }
  
    </Grid>  
  
    </Paper>

    <ModalComponent open={open} close={()=>setOpen(false)} props={
        (
            <>
            <Text>Edit Camp</Text>
            </>
        )
    }></ModalComponent>


          {/* delete modal */}
          <ModalComponent
        centered
        open={deleteModal}
        close={() => setDeleteModal(false)}
        props=
          {
            loader==false?(
              <Box
            sx={(theme) => ({
              textAlign: "center",
            })}
          >
            <Text>Are You Confirm Wants to Delete?</Text>&nbsp;
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
                textAlign: "center",
                justifyContent: "space-evenly",
                padding: theme.spacing.xs,
                borderRadius: theme.radius.md,
                cursor: "pointer",
              })}
              display={"flex"}
            >
              <Button onClick={()=>handleDelete()}  color="green">
                YES
              </Button>
              <Button color={"red"} onClick={() => setDeleteModal(false)}>
                NO
              </Button>
            </Box>
          </Box>
            ):(
              <Group position='center'>
               <Loader   size={40} color='green' ></Loader>
             
              </Group>
            
            )
          }
          
        
      ></ModalComponent>
  
 
 

    </>
  )
}
