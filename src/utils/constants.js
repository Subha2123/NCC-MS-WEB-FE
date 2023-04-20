import {IconSchool,IconLiveView,IconCampfire} from '@tabler/icons-react'

export const ROUTE_PATH = {
    home: '/',
    admin: '/admin',
    student:'/student',
    camp: '/camp',
    event:'/event',
    cadetPage:'/cadet'
    
  }

  export const drawerOptions = [
    
    {
      label:'Student',
      icon: <IconSchool />,
      initiallyOpened: true,
      parentLink:ROUTE_PATH.student,
    },
    {
      label: 'Event',
      icon:<IconLiveView />,
      initiallyOpened: true,
      parentLink: ROUTE_PATH.event,
    },
    {
      label: 'Camp',
      icon:<IconCampfire /> ,
      initiallyOpened: true,
      parentLink: ROUTE_PATH.camp,
    } 
  ]
  