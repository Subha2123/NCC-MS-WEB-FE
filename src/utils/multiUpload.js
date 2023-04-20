import { FileInput, FileInputProps, Group, Center, rem } from '@mantine/core';
import { IconX, IconPhoto } from '@tabler/icons-react';
import { useState } from 'react';

function Value({ file }) {

    const [close,setClose]=useState(true)
    return (
      <Center
        inline
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
          fontSize: theme.fontSizes.xs,
          padding: `${rem(3)} ${rem(7)}`,
          borderRadius: theme.radius.sm,
        })}
      >
        <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
        <span
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            maxWidth: rem(200),
            display: 'inline-block',
          }}
        >
          {file.name}
          <IconX  size={rem(14)} style={{ marginLeft: rem(5) }} />
        </span>
      </Center>
    );
  }


  const ValueComponent=({ value }) => {
    if (Array.isArray(value)) {
      return (
        <Group spacing="sm" py="xs">
          {value.map((file, index) => (
            <Value file={file} key={index} />
          ))}
        </Group>
      );
    }
  
    return <Value file={value} />;
  };


  export {ValueComponent}