import React, { useEffect, useState } from "react";
import CustomTable from "../../../Component/CustomTable";
import {
  GetAllStudent,
  deleteStudent,
  updateStudent,
  addStudentProfile
} from "../../../services/StudentPageServices";
import { Select,Badge,Timeline,LoadingOverlay,Dialog,Table,Button,FileInput, Paper, Grid,Box ,Group,Text, Input, TextInput, Checkbox,Image,Loader, Divider,Popover, Modal} from '@mantine/core'
import { IconEdit, IconTrash,IconFilter,IconPhoto,IconEye} from "@tabler/icons-react";
import ModalComponent from "../../../Component/Modal";
import { useFormik } from 'formik';
import moment from "moment";
import { DatePickerInput } from '@mantine/dates';
import { Errornotification, Successnotification } from "../../../utils/notification";
import { SignalWifiStatusbarNullRounded } from "@mui/icons-material";
import EditCampPage from "../Camp/EditCampPage";




export default function ViewCadet() {
  let [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCadet, setEditCadet] = useState({});
  const [fields, setFields] = useState();
  const [ObjectData,setObjectData]=useState("")
  const[loader,setLoader]=useState(false)
  const[imageModal,setImageModal] = useState(false)
  const[image,setImage]=useState()
  const[pageLoading,setPageLoading] = useState(false)
  const [campModal,setCampModal] = useState(false)
  const[filterModal,setFilterModal]=useState(false)
  const[query,setQuery]=useState(null)
  const[dropDown,setDropDown]=useState([])
  const[searchValue,setSearchValue]=useState()
  const[campEditModal,setCampEditModal]=useState(false)
  const[campEditData,setCampEditData]=useState(null)



  const token = localStorage.getItem("admin");
  const parseToken = JSON.parse(token);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoader(true)
    await GetAllStudent()
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoader(false);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getOneStudent(id) {
    // setLoader(true)
    await GetAllStudent({regimentNo:id},{password:0,_id:0,__v:0,status:0})
      .then((res) => {
        setEditCadet(res.data[0]);
        let getKeys = Object.keys(res.data);
        setFields(getKeys);
        setLoader(false)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }


  data=data.map((item,idx)=>{
    return item={...item,id:idx+1}
   
  })
 

  

  let head = ["S.No", "Name", "Regiment No", "Email","Mobile","Department", "Batch", "", "",""];

  const keys = [
    "id",
    "name",
    "regimentNo",
    "email",
    "mobileNo",
    "dept",
    "batch",

    {
      base: "/edit",
      icon: (
        <IconEdit
        color="gray"
          onClick={() => {
            setEditModal(true);
          
            
          }}
        />
      ),
     
    },
    {
      base: "/delete",
      icon: (
        <IconTrash
          onClick={(e) => {
            setDeleteModal(true);
           
          }}
          color="red"
        />
      ),
      value: "id",
      
    },
    {
      base: "/camp",
      label:'camp',
      icon: (
        <IconEye
          onClick={(e) => {
            setCampModal(true);
           
          }}
          color="black"
        />
      ),
      value: "id",
      sx:{
        backgroundColor:"grey",
      }
      
      
    },
   
  ];

  async function handleDelete(value) {
    setLoader(true)
    await deleteStudent(parseToken,value)
      .then((res) => {
        console.log(res.data);
        setLoader(false)
        Successnotification(res.data.message)

        window.location.reload()
        
      })
      .catch((err) => {
        console.log(err.message);
        Errornotification(err.message)
      });
  }

  async function handleEdit(id) {
  
   setEditCadet(editCadet)
   await updateStudent(id,formik.values)
   .then((res) => {
     console.log("res",res.data);
    //  Successnotification(res.data.message)
     setLoader(false)
    //  window.location.reload();
     
   })
   .catch((err) => {
     console.log(err);
     Errornotification(err.message)
   });

  }

// Table Props
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
      sx={prop.sx}
      leftIcon={prop.icon}
      to={prop.link}
      variant='white'
      size="sm"
      color="dark"
      value={prop.value}
      onClick={()=>{
        setLoader(false)
        getOneStudent(prop.data.regimentNo)
        setObjectData(prop.data.regimentNo)

      }}
      
    >{prop?.label}</Button>
  );
};

async function handleImageDelete(public_id){
  // setLoader(true)
  // console.log("public_id",public_id);
//  return  await  deleteEventImages({
//   _id:eventId,
//   cloudinary_id:public_id
//  }).then(res=>{
//   // console.log("res",res.data);
//   setLoader(false)
//   // window.location.reload()
//   //  window.location.href='/'
//  }).catch(err=>{
//   console.log("err",err.message);
//  })
}

// console.log("editCadet",editCadet);


const formik = useFormik({
  enableReinitialize: true,
  initialValues:editCadet,
  onSubmit: values => {
  handleEdit(ObjectData)
   console.log(JSON.stringify(values, null, 2));
  },
});

async function addProfileImages(){
  // setVisible(true)
//  setLoader(true)
    setPageLoading(true)
  const formdata=new FormData()
  formdata.append("file",image)

  await addStudentProfile(formdata).then(res=>{
  if(res.data.status==200){
    // console.log("res",res.data.data);
     let obj={
      profile_img:res.data.data.secure_url,
      cloudinary_id:res.data.data.public_id
    }
    //  console.log("obj",obj);

      formik.values.image=obj
      setLoader(false)
      setPageLoading(false)

      
     
    //  else{
    //    Errornotification("Error While uploading Image");
    //  }

    
  } 
   return res.data;
  }).catch(err=>{
    return err
  })
}






async function handleChange(val){
  console.log("val",val);


  if(val){

    let dropVal=data.map(item=>{

     if(item[val]!==undefined){
      return  item[val]
    }

     
    })


    // console.log("dropVal: ",dropVal);
    setDropDown([...new Set(dropVal)])
    // setSearchValue(null)
  }
}


async function filterData(e){
  
  await GetAllStudent(e).then(res=>{
    setData(res.data)
    if(data) {
      setFilterModal(false)
    }
  }).catch(err=>{
    console.log(err.message);
  })

}

// console.log("formik",formik.values);
  
  return (
    <>
    {/* Table */}
   
     <Paper mt={10} withBorder={true} shadow="xs" p="md">
    <Grid sx={{
      display:'flex',justifyContent:'flex-end',marginRight:40
    }}>

    
     <Popover  width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
     
      <Button  onClick={()=>setFilterModal(true)} gradient={{ from: 'teal', to: 'lime', deg: 105 }} leftIcon={<IconFilter />} variant="gradient">
      Filter
    </Button>
   
      </Popover.Target>
      <Popover.Dropdown>
      <Select
       clearable
      label="Enter Category"
      placeholder="Pick one"
      data={[
        { value: 'batch', label: 'Batch' },
        { value: 'regimentNo', label: 'Regiment Number' },
        { value: 'dept', label: 'Department'},
        { value: 'vegOrNonveg', label:'Food Type' },
        
      ]}
      // value={searchValue}
      onChange={(e)=>{
     
        handleChange(e)
        setQuery(null)
        setSearchValue(e)
      
       

      }}
    />

        <Group  mt="md">
      
        <Select
        clearable
      label="Value"
      placeholder="Pick one"
      data={dropDown}
      // value={query}

      onChange={(e)=>{
        setQuery(e)
          // setDropDown([])
        
          let obj={}
          obj[searchValue] = e
          filterData(obj)
      }}
    />
    </Group>
      </Popover.Dropdown>
    </Popover>
    </Grid>

     
   


     
 
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
                    {keys.map((row,index) => 
                   
                 
                    typeof row ===  "string" ?(
                    
                        <td>
                          {getProperty(data, row)}
                          
                          </td>
                     ):
                     (
                      <td>
                        
                          <ButtonLink sx={row.sx} label={row.label} data={data} link={row.base} icon={row.icon} />
                          
                          </td>
                           
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

  {/* delete modal */}
      <ModalComponent
        centered
        open={deleteModal}
        close={() => setDeleteModal(false)}
        props={
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
              <Button onClick={()=>handleDelete(ObjectData)} color="green">
                YES
              </Button>
              <Button color={"red"} onClick={() => setDeleteModal(false)}>
                NO
              </Button>
            </Box>
          </Box>
        }
      ></ModalComponent>

{/* edit modal */}

      <ModalComponent
       
        open={editModal}
        close={() => setEditModal(false)}
        props={
          <>
            <Text align="center">&nbsp;&nbsp;<span style={{
              color:"orange",fontWeight:"bold",

            }}>{editCadet?.name}-{editCadet?.regimentNo}</span></Text>
            {
             editCadet&&(
              <form onSubmit={formik.handleSubmit}>
              {Object.keys(editCadet)?.map((item, i) => { 
                
                  if(item=="image"){
                    if(!formik.values[item]){
                      return(
                        <Button color="orange" mt={"md"} onClick={()=>setImageModal(true)}>Update Image</Button>
                      )
                    }
                    else{
                     let src=formik.values[item]?.profile_img
                     
   
                    return (
                     <>
                     <Text mt={15} color="brown" fw="bold">Profile Image</Text>
                       <Paper w={"100%"} shadow="xs" p="md">
                         <IconEdit  onClick={()=>{setImageModal(true)}}></IconEdit>
                      <Image alt="No Profile Image" w={50} src={src}></Image>
                      </Paper>
                     </>
                    
                    )
                    }
                    
                  }
                if (item=="bankDetails") {
                      return(
                      <Box pt={20}>
                          <Text color="brown" fw="bold">BANK DETAILS</Text>
                      
                        <Grid pt={10}>
                        
                          <Grid.Col xs={6}>
                        <TextInput 
                         style={{
                          borderBottom:"1px solid black",
                        }}
                    
                        variant="unstyled"
                          label={"HolderName"}
                          value={formik.values.bankDetails?.holdername}
                          onChange={formik.handleChange}
                        ></TextInput>
                        <TextInput 
                         style={{
                          borderBottom:"1px solid black",
                        }}
                    
                        variant="unstyled"
                        type="number"
                        label={"Account Number"}
                        value={formik.values.bankDetails?.accNo}
                        onChange={formik.handleChange}
                      ></TextInput>
                      </Grid.Col>
                      <Grid.Col xs={6}>
                        <TextInput 
                         style={{
                          borderBottom:"1px solid black",
                        }}
                    
                        variant="unstyled"
                          label={"Bank Name"}
                          value={formik.values.bankDetails?.bankName}
                          onChange={formik.handleChange}
                        ></TextInput>
                        <TextInput 
                         style={{
                          borderBottom:"1px solid black",
                        }}
                    
                        variant="unstyled"
                        label={"IFSC code"}
                        value={formik.values.bankDetails?.ifscCode}
                        onChange={formik.handleChange}
                      ></TextInput>
                      </Grid.Col>
                      <Grid.Col xs={12}>
                      <TextInput 
                       style={{
                        borderBottom:"1px solid black",
                      }}
                  
                      variant="unstyled"
                        label={"Branch"}
                        value={formik.values.bankDetails?.branch}
                        onChange={formik.handleChange}
                      ></TextInput>
                      </Grid.Col>
                      </Grid>
                      </Box>
                       )
                    
                  
                
                } 
                 if (item == "dob") {
                 
                  return(
                    <DatePickerInput
                    label={item}
                    value={moment(formik.values[item])}
                    onChange={formik.handleChange}
                    ></DatePickerInput>
                  )
                }
                if(item=="dateOfEnroll"){
                  return(
                    <DatePickerInput
                    disabled={true}
                    label={item}
                    value={moment(formik.values[item]).toDate()}
                    onChange={formik.handleChange}
                   
                    ></DatePickerInput>
                  )
                }
                if(item=="isStudent"){
                 return(
                    <Checkbox mt={10} checked={formik.values[item]} label={item}></Checkbox>
                 
                 )
                }
                if(item=="camp"){

                  return(
                  <></>

                  )
    
                  

                }
               
                 else  {
                    
                  return (
                    <>
                     <Input.Wrapper mt="md" fs={10} color="gray" label={item}>
                     <TextInput 
                               disabled={
                                item=="email"?true:
                               item=="regimentNo"?true:false
                              }
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
      <Button mt={20} type="submit">Submit</Button>
      </Group>
     
            </form>
             )
            }
          
          </>
        }
      ></ModalComponent>

      {/* update image modal */}
       <ModalComponent open={imageModal} close={()=>setImageModal(false)} props={
        (
         
          <>
                     {
  pageLoading?(
    <Group position="center">
     <Loader  size={30} />
    </Group>
   
  ):(
    <FileInput
    accept="image/png,image/jpeg"
    placeholder="Update Profile Image"
  
    withAsterisk
    sx={{
      width: "100%",
    }}
    right={<Loader />}
    icon={<IconPhoto size={20} />}
    onChange={(e) => {
      setImage(e);
    }}
  ></FileInput>
  )
 
 }
          
  <Button onClick={()=>addProfileImages()} mt={10} color="green">Update Image</Button>
          </>
        )
       }>
                       
      </ModalComponent>
{/* camp modal */}
      <ModalComponent 
                    open={campModal}
                    close={()=>setCampModal(false)}
                    props={(
                      
                      <>
                      <Text align="center" fw="bold" color="orange"> CAMP DETAILS</Text>
                      {
                        editCadet&&(
                          <>
                          {
                            editCadet.camp?.length>0?(
                            
                                <>   
                                   
                              {
                                editCadet.camp?.map(item=>{
                                
                                  return( 
                                    // <Grid.Col md={6}>
                                    
                                      <>
                                      <IconEdit onClick={()=>{
                                        // setCampEditData(item)
                                        console.log("opened",item);
                                      
                                        setCampEditModal(true)
                                      }
                                      
                                      } />
                                    {/* <Grid>   */}
                                   {item.campImages?.map(img=>  
                                  
                                  
                                    <Box mt="md">

                                    <Image   style={{
                                      float:'left'
                                    }} width={200}
                                   src={img.profile_img}></Image>
                                   <Group  pl={"lg"} position="left">
                                   <Text fs={"oblique"} fw="bolder">{item.camp_type.toUpperCase()}</Text>
                                   <Badge>{item.camp_place}</Badge>
                                
                                   <Text mt={0} fw="bold" color="indigo">{item.camp_name}</Text>
                                  <Timeline active={1} bulletSize={10} lineWidth={2}>
                            <Timeline.Item title="start date">
                             <Text color="dimmed" fw="bold">{moment(item.date.start).format('DD-MM-YYYY')}</Text>
       
                               </Timeline.Item>

                              <Timeline.Item title="end date">
                             <Text color="dimmed" fw="bold">{moment(item.date.end).format('DD-MM-YYYY')}</Text>
        
                              </Timeline.Item>
                               </Timeline>
                              
                            
                                   
                                   
    </Group>
   
    <Divider my="sm"/>
  </Box>
                                 
                                  

                                 
                                  
                                   )}
                                  
                                   </>
                                
                                  )
                                })
                              }
                           </> 
                            ):(
                              <>
                              <Text align="center" mt="md">OOPS!NO DATA FOUND</Text><br />
                              <Group position="center">
                              
                              <Button size="sm" variant="outline">
                                <a style={{
                                  textDecoration:'none'
                                }} href="/camp">Add Camp Details</a>
                              </Button>
                              </Group>
                              </>

                            )
                          }
                          </>
                        )
                      }
                      </>
                      
                    )}
       ></ModalComponent>
       
  
          <Modal 
          opened={campEditModal}
         
          onClose={()=>setCampEditModal(false)}
          
          >
          <EditCampPage />
          </Modal>
        
       

        


 <LoadingOverlay visible={loader} overlayBlur={2} />

      
    </>
  );
}
