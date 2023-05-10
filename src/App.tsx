import { BackgroundImage, Grid, AppShell } from '@mantine/core'
import { useEffect } from 'react'
import CategoriesList from './components/categories/CategoriesList'
import ShoppingCart from './components/shopCart/ShoppingCart'

function App() {
  useEffect(() => {
    document.title = 'Sitio de Compra Online'
  }, [])

  return (
    <BackgroundImage h='100%' w='100%' src='/background.jpg'>
      <AppShell padding='xl'>
        <Grid>
          <Grid.Col md={6}>
            <CategoriesList />
          </Grid.Col>
          <Grid.Col md={6}>
            <ShoppingCart />
          </Grid.Col>
        </Grid>
      </AppShell>
    </BackgroundImage>
  )
}

export default App
