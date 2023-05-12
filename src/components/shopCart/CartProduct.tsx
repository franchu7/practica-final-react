import { Paper, Grid, Stack, Button, Group, Image, Text } from '@mantine/core'
import { CartProductI } from '../../data/products'
import { removeProductFromCart } from '../../logic/productsLogic'

type CartProductProps = {
  productData: CartProductI
}

export default function CartProduct({ productData }: CartProductProps) {
  return (
    <Paper my={'md'} style={{
      background: '#576CBC',
    }} radius={'lg'} p={'md'}>
      <Grid align='center'>
        <Grid.Col sm={3}>
          <Stack spacing={'xs'}>
            <Image radius={'lg'} src={productData.image} />
            <Button color='red' onClick={() => removeProductFromCart(productData)}>
              <Text size={'90%'}>Eliminar de la cesta</Text>
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col sm={9}>
          <Stack spacing={'sm'} style={{
              background: '#9aa6d6',
            }} p={'xs'}>
            <Group spacing={'xs'}>
              <Text fw={500}>Código de producto:</Text>
              <Text fz={'sm'}>{productData.code}</Text>
            </Group>
            <Group spacing={'xs'}>
              <Text fw={500}>Nombre:</Text>
              <Text fz={'sm'}>{productData.title}</Text>
            </Group>
            <Group spacing={'xs'}>
              <Text fw={500}>Descripción:</Text>
              <Text fz={'sm'}>{productData.description}</Text>
            </Group>
            <Group spacing={'xs'}>
              <Text fw={500}>Unidades:</Text>
              <Text fz={'sm'}>{`${productData.quantity} ${productData.quantity === 1 ? 'unidad' : 'unidades'}`}</Text>
            </Group>
            <Group spacing={'xs'}>
              <Text fw={500}>Importe:</Text>
              <Text fz={'sm'}>{productData.amount.toFixed(2)} €</Text>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
