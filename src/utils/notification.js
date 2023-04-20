import { showNotification } from "@mantine/notifications";
import { IconActivity, IconX ,IconCheck} from "@tabler/icons-react";

  function Errornotification(message) {
   showNotification({
   autoClose: 3000,
   message:message,
   loading: false,
   icon:<IconX color="white" size="1.1rem" />,
   backgroundColor:'red',
   color:"red",
   
   })
 
}

function Successnotification(message) {
    showNotification({
    autoClose:3000,
    message:message,
    icon:<IconCheck color="white" size="1.1rem" />,
    loading: false,
    color:"teal"
    })
}
export {Errornotification,Successnotification}