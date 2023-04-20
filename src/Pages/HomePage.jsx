import React,{useEffect, useState} from 'react'
import { GetAllRecentEvent } from '../services/EventPageService'
import { Paper ,Text,Group,Box} from '@mantine/core'
import { Carousel } from 'antd';
import { Banner } from './Banner';





export default function HomePage() {
    const[data,setData]=useState([])
    const[image,setImage]=useState([])


    const contentStyle = {
      height:'300px',
      // color:"red",
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
      alignContent:'center'
    };


    // useEffect(()=>{
    //     if(localStorage.getItem('admin')){
    //       window.location.href='/admin'
    //     }
    //       },[])


    useEffect(()=>{
        loadData()
      },[])
    
    async function loadData(){
       console.log("hello")
         await GetAllRecentEvent().then(res=>{
          setData(res.data);
          let images=res.data?.data.map(item=>{
            if(item.eventImages.length>0){
              return item.eventImages.map(img=>img.profile_img)
            }
          })
          setImage(images)
          console.log("image",images);  
         }).catch(err=>{
          console.log(err);
         })
    } 


    if(data.length>0){

      console.log("data");
  
 
 
    }

   
let flatImages=image?.flatMap(img=>img)

console.log("flatImages",flatImages)
 
    
  return (
   <>



<Banner slider={(
    <Paper ml={"md"} mt={"md"} style={{
      width:"40%",
      height:380,
      
    
     }} shadow="xs">
    <Text pt={"xl"} align='center' color='brown' >Recent Events</Text>
   
  
    <Box>
  
  
    <Carousel style={{
  
      width:"80%",
      left:50,
      marginTop:15
    }} autoplay>
      {
        flatImages?.map(item=>{
            return (
              <div>
              <img style={contentStyle} src={item} />
           </div>
            )
         
          })
      
      }
      
    </Carousel>
    </Box>
   
     </Paper>
)}>
  

</Banner>
   
 
   </>
  )
}
