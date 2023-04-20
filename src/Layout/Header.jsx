import {
    Header,
    Group,
    Button,
    Text,
    Image,
    Box,
    LoadingOverlay,
    Grid
  } from "@mantine/core";
  import { useMediaQuery } from "@mantine/hooks";
  import { useState } from "react";
  import LoginFormComponent from "../Pages/ProfilePage/Login";
  import ModalComponent from "../Component/Modal";
  
  
  
  export function HeaderComponent() {
  
        const[opened,setOpened]=useState(true)
        const[visible,setVisible]=useState(false)
      let matches=useMediaQuery('(min-width:600px')
  
      const token=JSON.parse(localStorage.getItem('admin'))
    
  
  
    return (
      <Box>
       
        <Header  height={80} px="md" style={{ background: "rgb(152,0,0)" }}>
          <Group position="apart" sx={{ height: "100%" }}>
            <Group sx={{ height: "100%" }} spacing={0}>
              <Image
                alt="Logo"
                width={"100%"}
                src="https://res.cloudinary.com/delnwukcs/image/upload/v1679120142/logo_wucl0o.png"></Image>
            </Group>
            {matches?(
            <Group
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
                  
              <Text
                fz="lg"
                style={{
                  color: "white"
                }}>
                
                Rathnavel Subramaniam College of Arts and Science
              </Text>
              <Text fz="xl" variant="text" style={{ color: "white" }}>
                National Cadet Corps
              </Text>
            </Group>
            ):(
              <Group
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
                  
              <Text  fz="lg"
               style={{
                  color: "white"
                }}>RVSCAS</Text>
              <Text  fz="xl" variant="text" style={{ color: "white" }}>NCC</Text>
              </Group>
            )}
            { 
              token?.token?(
                <Group>
                <Button variant="default" onClick={()=>{
                  setVisible(true)
                  localStorage.removeItem('admin')
                  window.location.href='/'
                  setOpened(false)
                  setVisible(false)
         
                }
                }
                >Log out</Button>
              </Group>
              ):(
                <Group>
                <Button variant="default" onClick={()=>{
                  setOpened(true)
                  setVisible(false)
                }}
                  >Log in</Button>
              </Group>
               
              )
            } 
           
            <ModalComponent open={token?false:opened} close={()=>setOpened(false)} props={
              
              (
                  <LoginFormComponent />
              )
            }>
               
  
            </ModalComponent>
            <LoadingOverlay visible={visible} overlayBlur={2} />
          </Group>
        </Header>
        
      </Box>

    );
  }
  