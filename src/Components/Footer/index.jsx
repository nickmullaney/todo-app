import { createStyles, Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import logo from '../../assets/Todozies.gif';
import React, { useEffect, useRef, useState } from 'react';

// Create CSS styles using the createStyles function from @mantine/core
const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 'auto', // push footer to the bottom of the page
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    width: '100%',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  const footerRef = useRef(null);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const footerHeight = footerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const newMarginTop = windowHeight - footerHeight;
      setMarginTop(newMarginTop);
    };

    handleResize(); // Initial calculation

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const footerStyle = {
    marginTop: `calc(${marginTop}px - ${rem(footerRef.current ? footerRef.current.offsetHeight : 0)})`,
  };

  return (
    <div className={classes.footer} ref={footerRef} style={footerStyle}>
      <Container className={classes.inner}>
        {/* Render the logo */}
        <img src={logo} alt="Logo" height={50} />

        {/* Display copyright information */}
        &copy; Todozies, 2023. All rights reserved.

        {/* Render social media icons */}
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
