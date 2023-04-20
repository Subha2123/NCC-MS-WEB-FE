import React, { useState } from 'react'
import { Table,Button, createStyles, Paper, Box ,Group,Text} from '@mantine/core'
import ModalComponent from './Modal';

export default function CustomTable({data,head,rows}) {

  const [ObjectData,setObjectData]=useState({})
  const [editModal,setEditModal] = useState(false)
    const getProperty = (obj, prop) => {
        var parts = prop.split(".");
      
        if (Array.isArray(parts)) {
          var last = parts.length > 1 ? parts.pop() : parts;
          var l = parts.length,
            i = 1,
            current = parts[0];
      
          while ((obj = obj[current]) && i < l) {
            current = parts[i];
            i++;
          }
      
          if (typeof obj === "object") {
            return obj[last];
          }
          return obj;
        } else {
          throw "parts is not valid array";
        }
     };

     

     const ButtonLink = (prop) => {
        return (
          <Button
            leftIcon={prop.icon}
            to={prop.link}
            variant='white'
            size="sm"
            color="gray"
            value={prop.value}
            onClick={()=>{
              setEditModal(true)
              setObjectData(prop.data)}}
            
          />
        );
      };
      
    

     
  return (
    <>
    <Paper shadow="xs" p="md">
        <Group position='center'>
    <Box p={10} sx={{
      alignContent:'center',
      justifyContent:'center',
    }} w={"100%"}>

    <Table stickyHeader aria-label="sticky table">
      <thead>
        <tr>
          {head?.map(item=>(
              <th>{item}</th>
          ))}
        </tr>
      </thead>
     
         <tbody>
            {
                data.map((data,index) => (
                    <tr key={index}>
                    {rows.map((row,index) => 
                     typeof row === "string" ?(
                        <td>{getProperty(data, row)}</td>
                     ):
                     (
                      
                        <td><ButtonLink data={data} link={row.base} icon={row.icon} /></td>
                     )
                      
                    )}

                    </tr>

                ))
            }
            
        
        </tbody>
         
       
       
    
    </Table>
    </Box>
    </Group>
    </Paper>
   <ModalComponent
        open={editModal}
        close={() => setEditModal(false)}
        props={
          <>
            <Text>Edit Cadet</Text>

           <Text>{ObjectData.name}</Text>

            {/* <form>
              {Object.keys(editCadet)?.map((item, i) => {
                if (item == "bankDetails") {
                  <div>{item}</div>;
                } else if (item == "dob") {
                } else {
                
                  return (
                    <>
                    
                    </>
                    )
                }
              })}

              
      <Button>Submit</Button>
            </form> */}
          </>
        }
      ></ModalComponent>
     
    </>
  )
}
