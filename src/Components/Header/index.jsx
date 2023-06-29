import {
  createStyles, Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Modal,
  TextInput,
  Paper,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconList,
  IconChecklist,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import SettingsForm from '../SettingsForm';
import { ModalLogin } from '../Modals/modalLogin';
import { ModalSignup } from '../Modals/modalSignup';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },
  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),
    '&:active': theme.activeStyles,
  },
  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
}));

const mockdata = [
  {
    icon: IconList,
    title: 'To Do List',
    description: 'List of things To Do',
  },
  {
    icon: IconChecklist,
    title: 'Completed Tasks',
    description: 'These are completed tasks',
  },
];

function HeaderMenu({ openLoginModal, closeLoginModal, openSignupModal, closeSignupModal, signupOpened }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const [colorScheme, setColorScheme] = useState('light');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const handleOpenSettings = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const handleSignupSubmit = () => {
    // Perform signup logic here
    console.log('Signup Data:', { username, password });
  
    // Close the modal after submitting
    closeSignupModal();
  };
  

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const toggleColorScheme = () => {
    setColorScheme((prevColorScheme) => (prevColorScheme === 'light' ? 'dark' : 'light'));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = () => {
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    // Close the modal after submitting
    closeLoginModal();
  };

  return (
    <Box pb={120} className={classes.box}>
      <Header height={60} px="md" className={classes.header}>
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <img src={logo} alt="Logo" height={70} /> */}
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      To Do
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </a>
              </HoverCard.Target>
              <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                <Group position="apart" px="md">
                  <Text fw={500}>Features</Text>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                />
                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
                <div className={classes.dropdownFooter}>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            <Button onClick={handleOpenSettings}>Settings</Button>
            <Button onClick={toggleColorScheme} leftIcon={<>{colorScheme === 'light' ? <IconSun /> : <IconMoon />}</>}>
              {colorScheme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Button variant="default" onClick={openLoginModal}>Log in</Button>
            <Button onClick={openSignupModal}>Sign up</Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Group position="center" grow pb="xl" px="md">
            <Button onClick={toggleColorScheme} leftIcon={colorScheme === 'light' ? IconSun : IconMoon}> Dark/Light
              {colorScheme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="default" onClick={openLoginModal}>Log in</Button>
            <Button variant="default" onClick={openSignupModal}>
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>

      {/* <ModalLogin opened={openLoginModal} onClose={closeLoginModal} />
      <ModalSignup opened={openSignupModal} onClose={closeSignupModal} /> */}

      <Modal opened={settingsModalOpen} onClose={handleCloseSettingsModal}>
        <Paper padding="md">
          <Title order={2}>Settings</Title>
          <SettingsForm />
        </Paper>
      </Modal>
    </Box>
  );
}

export default HeaderMenu;
