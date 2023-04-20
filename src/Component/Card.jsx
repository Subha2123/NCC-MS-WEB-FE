import React, { useState } from 'react'
import { Card, Grid, Image, SimpleGrid} from '@mantine/core';

export default function CardComponent({head,images,props}) {

  const[arr,setArr]=useState(images)
  const [img,setImage]=useState(arr[0]?.profile_img)

  return (
    <div>
      <Grid p={10} > 
        <Grid.Col xs={11} >
      <Card withBorder shadow="sm" radius="md" sx={{
        height:'400px',
        display:'flex',
        flexDirection:'column',
        justifyContent:"space-between",
        // backgroundColor:"#f3f6f4"
      }} >
      <Card.Section withBorder inheritPadding py="xs">{head}</Card.Section>


      <Card.Section display="flex" sx={{
        alignItems:'center',
        justifyContent:'center',
      }} >
        <Image alt='No Image' 
        src={img}
         width={"84%"}/>
      </Card.Section>

      {/* <Card.Section inheritPadding mt="sm" pb="md">
        

        <SimpleGrid cols={3}>
          {images.map((item,idx)=>{    
            console.log(idx); 
            return (
             
              <Image onClick={()=>setImage(item.profile_img)} width={100} src={item.profile_img} key={item} radius="sm" />
              
             
            )
          })}
        
       
        </SimpleGrid>
       
      </Card.Section> */}
      {props}
    </Card>
    </Grid.Col>
    </Grid>
    </div>
    
  )
}
