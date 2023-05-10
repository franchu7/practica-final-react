import { Grid, Stack, Group, Text, Image, MediaQuery, Button, Paper } from '@mantine/core'
import { ProductI } from '../../data/products'
import { useState } from 'react'
import { addProductToCart } from '../../logic/productsLogic'

type ProductProps = {
  productData: ProductI
}

export default function Product({ productData }: ProductProps) {
  const [hoveredImg, setHoveredImg] = useState(false)
  const handleMouseEnter = () => {
    setHoveredImg(true)
  }
  const handleMouseLeave = () => {
    setHoveredImg(false)
  }

  return (
    <Paper my={'md'} bg={'white'} radius={'lg'} p={'md'}>
      <Grid align='center'>
        <Grid.Col sm={3}>
          <Stack spacing={'xs'}>
            <MediaQuery
              smallerThan={'sm'}
              styles={{
                transform: 'none !important',
              }}
            >
              <Image
                radius={'lg'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                opacity={productData.stock === 0 ? 0.5 : 1}
                style={{
                  transition: 'transform 0.5s ease-in-out',
                  transform: productData.stock === 0 ? 'none' : hoveredImg ? 'scale(1.4)' : 'scale(1)',
                  position: 'relative',
                  zIndex: 1,
                }}
                src={productData.image}
              />
            </MediaQuery>
            <Button color={'yellow'} disabled={productData.stock === 0} onClick={() => addProductToCart(productData)}>
              <Text size={'90%'}>Agregar a la cesta</Text>
            </Button>
          </Stack>
        </Grid.Col>
        <Grid.Col sm={9}>
          <Stack spacing={'sm'}>
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
              <Text fw={500}>Precio:</Text>
              <Text fz={'sm'}>{productData.price.toFixed(2)} €</Text>
            </Group>
            <Group spacing={'xs'}>
              <Text fw={500}>Stock:</Text>
              <Text fz={'sm'}>{`${productData.stock} ${productData.stock === 1 ? 'unidad' : 'unidades'}`}</Text>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
