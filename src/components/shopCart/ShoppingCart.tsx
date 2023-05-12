import { Stack, Paper, Title, Group, Alert } from '@mantine/core'
import CartProduct from './CartProduct'
import { useState, useEffect } from 'react'
import { CartProductI } from '../../data/products'
import ActionConfirm from '../ActionConfirm'

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<CartProductI[]>(JSON.parse(localStorage.getItem('shopping-cart')!) || [])
  const [viewAlert, setViewAlert] = useState(false)

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
      <Paper
        p={'md'}
        style={{
          background: '#455696',
        }}
      >
        <Title order={1} fw={500} align='center'>
          Cesta de la compra
        </Title>
      </Paper>
      <ActionConfirm msg={'¿Está seguro/a de quiere vaciar la cesta?'} type={'empty-cart'} isEmptyCart={shoppingCart.length === 0} />
      <Paper
        style={{
          background: '#19376D',
        }}
        p='md'
      >
        <Paper
          style={{
            background: '#576CBC',
          }}
          p='sm'
        >
          {shoppingCart.length > 0 ? (
            <Stack>
              <>
                {shoppingCart.map((product) => {
                  return <CartProduct key={product.id} productData={product} />
                })}
              </>
              <Paper
                style={{
                  background: '#7889c9',
                }}
                p={'md'}
                radius={'md'}
              >
                <Group position={'apart'}>
                  <Paper
                    style={{
                      background: '#9aa6d6',
                    }}
                    p={'xs'}
                  >
                    <Title order={3} fw={500}>
                      Total: {shoppingCart.reduce((acc, product) => acc + product.amount, 0).toFixed(2)} €
                    </Title>
                  </Paper>
                  <ActionConfirm
                    msg={'¿Está seguro/a de quiere realizar el pedido?'}
                    type={'order'}
                    isEmptyCart={shoppingCart.length === 0}
                    setViewAlert={setViewAlert}
                  />
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
      {viewAlert && (
        <Alert withCloseButton color='green' title={'¡Pedido realizado con éxito!'} onClose={() => setViewAlert(false)}>
          <Paper></Paper>
        </Alert>
      )}
    </Stack>
  )
}
