import { Group,Image, Paper ,Text} from '@mantine/core'
import React from 'react'

export default function PageNotFound() {
  return (
    <div>
        <Group mt={30} position='center'>
          <Paper style={{
            width:500
          }} shadow="xs" p="md"  >
            <Text align='center' fw={"bold"} color='dimmed'>PAGE NOT FOUND!</Text>
            <Image width={"100%"} src="https://res.cloudinary.com/delnwukcs/image/upload/v1680440356/404_xoa19r.png"></Image>
            </Paper>
        </Group>
    </div>
  )
}
