import { Tabs,Grid } from '@mantine/core';
import { IconSchool, IconLiveView, IconCampfire } from '@tabler/icons-react';
import ViewCadet from './AdminPages/Cadet/ViewCadetPage';
import CadetPage from './AdminPages/CadetPage';
import CampPage from './AdminPages/CampPage';
import ViewEvent from './AdminPages/Event/ViewEvent';
import EventPage from './AdminPages/EventPage';

export default function AdminHomePage() {

  
  return (
    <Grid>
    <Grid.Col xs={12}>
    <Tabs variant="default" defaultValue="gallery">
      <Tabs.List grow>
        <Tabs.Tab value="gallery" icon={<IconSchool size="0.8rem" />}>Cadet</Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconLiveView size="0.8rem" />}>Event</Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconCampfire size="0.8rem" />}>Camp</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <CadetPage />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
      <EventPage />
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
      <CampPage />
      </Tabs.Panel>
    </Tabs>
    </Grid.Col>
    </Grid>
  );
}