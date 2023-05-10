import { Stack, Paper, Title, Group } from '@mantine/core'
import CartProduct from './CartProduct'
import { useState, useEffect } from 'react'
import { CartProductI } from '../../data/products'
import ActionConfirm from '../ActionConfirm'

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<CartProductI[]>(JSON.parse(localStorage.getItem('shopping-cart')!) || [])

  const handleStorageChange = () => {
    setShoppingCart(JSON.parse(localStorage.getItem('shopping-cart') || '[]'))
  }

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <Stack spacing={'sm'}>
      <Paper p={'md'}>
        <Title order={1} fw={500} align='center'>
          Cesta de la compra
        </Title>
      </Paper>
      <ActionConfirm
        msg={'¿Está seguro/a de quiere vaciar la cesta?'}
        type={'empty-cart'}
        disabledButton={shoppingCart.length === 0}
      />
      <Paper bg={'gray'} p='md' withBorder>
        <Paper bg={'grape'} p='sm'>
          {shoppingCart.length > 0 ? (
            <Stack>
              <>
                {shoppingCart.map((product) => {
                  return <CartProduct key={product.id} productData={product} />
                })}
              </>
              <Paper bg={'blue'} p={'md'} radius={'md'}>
                <Group position={'apart'}>
                  <Paper bg={'white'} p={'xs'}>
                    <Title order={3} fw={500}>
                      Total: {shoppingCart.reduce((acc, product) => acc + product.amount, 0).toFixed(2)} €
                    </Title>
                  </Paper>
                  <ActionConfirm msg={'¿Está seguro/a de quiere realizar el pedido?'} type={'order'} />
                </Group>
              </Paper>
            </Stack>
          ) : (
            <Title order={3} align='center' fw={500}>
              No hay productos en la cesta
            </Title>
          )}
        </Paper>
      </Paper>
    </Stack>
  )
}
