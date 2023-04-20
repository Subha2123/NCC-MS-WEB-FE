import React from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';


const AppWrapper = ({ children }) => (
  <>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "'Kanit', sans-serif",
        colorScheme: "light",
      }}>
       <NotificationsProvider>
       {children}
        </NotificationsProvider> 
      
    </MantineProvider>
  </>
);
export default AppWrapper;