
import { Modal, Button, Group } from '@mantine/core';

export default function ModalComponent({open,close,title,props,size="md"}) {


  return (
    <>
      <Modal 
      opened={open} 
      onClose={close} title={title} 
      size={size}
      >
        {/* Modal content */}
        {props}
      </Modal>

    
    </>
  );
}