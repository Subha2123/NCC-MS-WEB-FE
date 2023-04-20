
import { createStyles,Navbar, ScrollArea, Title ,Box,Group, Badge} from '@mantine/core';
import {FaUser,FaSignOutAlt} from 'react-icons/fa'
import { useMediaQuery } from '@mantine/hooks';

import { NavbarLinkGroup } from './NavbarLinksGroup';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },
  navbar:{
    zIndex:-1
  },
  main: {
    flex:1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  mainLink: {
    width:150,
    height:150,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  title: {
    boxSizing:'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    textAlign:'center'
  },
  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration:'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.xl,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height:100,
    lineHeight:'50px',
    

    '&:hover': {
      
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.green,
      
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      color: theme.white,
    },
  },
 
}));



export default function NavigationBar({options}) {


  const token=localStorage.getItem('admin')
  const parseToken=JSON.parse(token)

  const { classes, cx } = useStyles();

 

  let matches=useMediaQuery('(min-width:600px')

  const links = options.map((item) => <NavbarLinkGroup {...item} key={item.label} icon={item.icon} />)
  console.log(links);

  return (
    <>
    <Navbar height="84%" fixed={true}
     width={matches?{
        sm:300
    }:{sm:100}} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
        <Box style={{
  display:'flex',flexDirection:'row',justifyContent:'flex-start'
}}>
<Box style={{
   width:70,  
   height:70,
  borderRadius:"50%",
  backgroundColor:'black',
  alignContent:'center',
  marginTop:10,
  marginLeft:10
 
}}>
<FaUser style={{
  padding:10,
  alignItems:'center',
  justifyContent:'center'
}} size={50} color="white" />
</Box>

<Box style={{
  paddingLeft:30,
  marginTop:20
}}>
<Title fz="lg" >{parseToken?.data?.name}</Title>
<Title fz="sm" color={"dimmed"}>{parseToken?.data?.email}</Title>

</Box>

</Box>
<Group position='right'>
<Badge color={"green"} fz="md" fw={700}>{parseToken?.data?.isAdmin===true?'Admin':null}</Badge>
</Group>

    </Group>
      </Navbar.Section>

      <Navbar.Section grow  component={ScrollArea}>
      <div className={classes.main}>
        
          <Title fz="xl" color="orange" className={classes.title}>Dashboard</Title>
          {links}
          
          
        </div>
        <Box style={{
            display:'flex',flexDirection:'row',justifyContent:'center',
        }}>
        <FaSignOutAlt style={{
            marginTop:50
        }}
        size={20} />&nbsp;&nbsp;
        <a  style={{
            textDecoration:'none',
            fontSize:20,
            fontWeight:200,
            textAlign:'center',
            marginTop:50,
            color:'red'
            
        }}
        href='/admin'>Logout</a>
        </Box>
      </Navbar.Section>

     
    </Navbar>
    
    </>
  );
}{/* <a  href='/admin/student'  className={cx(classes.link, { [classes.linkActive]: activeLink === 'Student' })}><IconSchool/>Student</a>
<a  href='/event' className={cx(classes.link, { [classes.linkActive]: activeLink === 'Event' })}><IconLiveView /> Event</a>
<a  href='/camp' className={cx(classes.link, { [classes.linkActive]: activeLink === 'Camp' })}><IconCampfire /> Camp</a>
*/}