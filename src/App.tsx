import { Grid, AppShell, Paper } from '@mantine/core'
import { useEffect } from 'react'
import CategoriesList from './components/categories/CategoriesList'
import ShoppingCart from './components/shopCart/ShoppingCart'

function App() {
  useEffect(() => {
    document.title = 'Sitio de Compra Online'
  }, [])

  return (
    <Paper
      style={{
        background: '#051223',
      }}
      
    >
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
    </Paper>
  )
}

export default App
