import { createStyles, Text, Container, ActionIcon, Group } from '@mantine/core';


export  function FooterComponent(){

    const useStyles = createStyles((theme) => ({
        footer: {
          position:'fixed',
          bottom:0,
          width:"100%",
          paddingTop: theme.spacing.xl * 1,
          paddingBottom: theme.spacing.xl * 1,
          backgroundColor:  "rgb(152,0,0)",
          borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
          }`,
        },
    }))
    const {classes} = useStyles()
  return (
    <footer className={classes.footer}>
    
      <Container>
        <Text color="white" size="sm" align='center'>
        © 2023 RVSCAS. All Rights Reserved
        </Text>

       
      </Container>
    </footer>
  );
}