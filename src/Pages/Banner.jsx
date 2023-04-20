import { createStyles, Text, Title,Badge, TextInput, Button, Image,rem, Paper, Group,} from '@mantine/core';
import { IconBlockquote, IconEqualDouble, IconQuote, IconQuoteOff } from '@tabler/icons-react';



const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column-reverse',
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: '40%',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  body: {
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan('sm')]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    // lineHeight: 1,
    // marginBottom: theme.spacing.md,
  },

  controls: {
    display: 'flex',
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: '100%',
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export function Banner({slider}) {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        {/* <Title order={4} c="brown">NATIONAL CADET CORPS</Title> */}

     
        <Text align='center' mt="md" fw={300} fz="lg" mb={5}>
          Our Motto
        </Text>
        <Title align='center'  c="brown">
        <IconQuote style={{
          marginBottom:'10px'
        }} mb={10} />UNITY & DISCIPLINE<IconQuote style={{
          marginBottom:'10px'
        }} mb={10} />
        </Title>

        <Paper  shadow="xl" radius="xl" p="xl" mt={50} className='glowingButton' >
            <marquee>
            <Badge>
                Few points to Note
                </Badge>

            </marquee>
           
            <Text fs={"italic"} ff={"cursive"} mt="lg" sx={{
              
            }} >
            To Provide a Suitable Environment to Motivate the Youth to Take Up a Career in the Armed Forces. To Develop Character, Comradeship, Discipline, Leadership, Secular Outlook, Spirit of Adventure, and Ideals of Selfless Service amongst the Youth of the Country
            </Text>
        </Paper>

        <div className={classes.controls}>
          
        </div>
      </div>
      {slider}
      {/* <Image src={"https://res.cloudinary.com/dfwwkem7o/image/upload/v1679147436/ou7ap2mbp5jxzg94dtkv.jpg"} className={classes.image} /> */}
    </div>
  );
}