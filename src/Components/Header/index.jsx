import {
  createStyles,
  Header,
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
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  }
}));

const mockdata = [
  // An array of mock data objects
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
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false); // State and toggle function for the drawer
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false); // State and toggle function for the links
  const { classes, theme } = useStyles(); // Accessing the classes and theme from the useStyles hook
  const [colorScheme, setColorScheme] = useState('light'); // State variable for color scheme
  const [username, setUsername] = useState(''); // State variable for username
  const [password, setPassword] = useState(''); // State variable for password

  const handleSignupSubmit = () => {
    // Perform signup logic here
    console.log('Signup Data:', { username, password });

    // Close the modal after submitting
    closeSignupModal();
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      {/* Rendered links based on the mock data */}
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
      {/* Header component */}
      <Header height={60} px="md" className={classes.header}>
        <Group position="apart" sx={{ height: '100%' }}>
          {/* Logo or image */}
          {/* Omitted for brevity */}

          {/* Links */}
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
                  {/* Dropdown footer */}
                  {/* Omitted for brevity */}
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            {/* Settings button */}
            <Button onClick={toggleColorScheme}>Settings</Button>

            {/* Dark/Light Mode button */}
            <Button
              onClick={toggleColorScheme}
              leftIcon={<>{colorScheme === 'light' ? <IconSun /> : <IconMoon />}</>}
            >
              {colorScheme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Group>

          {/* Login and signup buttons */}
          <Group className={classes.hiddenMobile}>
            <Button variant="default" onClick={openLoginModal}>
              Log in
            </Button>
            <Button onClick={openSignupModal}>Sign up</Button>
          </Group>

          {/* Burger menu for mobile */}
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      {/* Drawer component */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {/* ScrollArea component */}
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <a href="#" className={classes.link}>
            Home
          </a>

          {/* Dropdown links */}
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

          {/* Buttons */}
          <Group position="center" grow pb="xl" px="md">
            <Button onClick={toggleColorScheme} leftIcon={colorScheme === 'light' ? IconSun : IconMoon}>
              Dark/Light {colorScheme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <Button variant="default" onClick={openLoginModal}>
              Log in
            </Button>
            <Button variant="default" onClick={openSignupModal}>
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderMenu;
