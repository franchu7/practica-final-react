import { BackgroundImage, Grid, AppShell, Title, Paper, Button, Stack, Group, Image } from '@mantine/core'

function App() {
  return (
    <BackgroundImage h='100%' w='100%' src='/background.jpg'>
      <AppShell padding='xl'>
        <Grid>
          <Grid.Col md={6}>
            <Stack spacing={'sm'}>
              <Paper p={'md'}>
                <Title order={1} fw={500} align='center'>
                  Categorías
                </Title>
              </Paper>
              <Button color='green'>Añadir categoría</Button>
              <Paper bg={'gray'} p='md'>
                <Paper bg={'cyan'} p='sm'>
                  <Group position='center' spacing={'xl'}>
                    <Title order={2} fw={500}>
                      Juegos de terror
                    </Title>
                    <Button color='green'>Añadir juego</Button>
                  </Group>
                  <Grid>
                    <Grid.Col md={6}>
                      <Image src={'/resident_evil_2.jpg'} />
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col md={6}>
            <Paper p={'md'}>
              <Title order={1} fw={500} align='center'>
                Cesta de la compra
              </Title>
            </Paper>
          </Grid.Col>
        </Grid>
      </AppShell>
    </BackgroundImage>
  )
}

export default App
