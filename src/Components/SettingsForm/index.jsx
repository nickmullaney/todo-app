import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Button, Card, createStyles, Grid, NumberInput, Switch, Text, TextInput } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { AuthContext } from '../../Context/Auth';

// Create styles using the theme object
const useStyles = createStyles((theme) => ({
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

function SettingsForm() {
  const { classes } = useStyles();
  const [show, setShow] = useState(false); // Initialize show state variable with false
  const { loggedIn, logout } = useContext(AuthContext);

  const {
    pageItems,
    showCompleted,
    sort,
    setPageItems,
    setShowCompleted,
    setSort,
    saveLocalStorage,
  } = useContext(SettingsContext); // Access values from SettingsContext using useContext hook
  console.log({ sort }, { showCompleted }, { pageItems }); // Log values to the console

  const handleSubmit = (e) => {
    e.preventDefault();
    saveLocalStorage(); // Call saveLocalStorage function
    setShow(true); // Set show state to true
    e.target.reset(); // Reset the form
  };

  return (
    <>
      {loggedIn && (
        <>
          <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
          <Grid style={{ width: '80%', margin: 'auto' }}>
            <Grid.Col span={6}>
              <Card shadow="sm" padding="md" radius="md" style={{ marginTop: '1rem' }}>
                <form onSubmit={handleSubmit}>
                  <Text fontSize="xl" weight="bold">Update Settings</Text>
                  <Switch
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.currentTarget.checked)}
                    label="Show Completed Todos"
                  />
                  <NumberInput
                    value={pageItems}
                    label="Items Per Page"
                    onChange={(value) => setPageItems(Number(value))}
                  />
                  <TextInput
                    placeholder={sort}
                    label="Sort Keyword"
                    onChange={(e) => setSort(e.currentTarget.value)}
                  />
                  <Button type="submit">Show New Settings</Button>
                </form>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              {show && (
                <>
                  <Text fontSize="xl" weight="bold">Updated Settings</Text>
                  <Text>{showCompleted ? 'Show' : 'Hide'} Completed Todos</Text>
                  <Text>Items Per Page: {pageItems}</Text>
                  <Text>Sort Keyword: {sort}</Text>
                </>
              )}
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}

export default SettingsForm;
