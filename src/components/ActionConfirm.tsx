import { Modal, Group, Button, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CategoryI } from '../data/categories'
import { CartProductI } from '../data/products'

type ConfirmDialogProps = {
  msg: string
  type: 'empty-cart' | 'order'
  disabledButton?: boolean
}

export default function ActionConfirm({ msg, type, disabledButton }: ConfirmDialogProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        color={'green'}
        title={
          <Text fz={'xl'} fw={500}>
            {msg}
          </Text>
        }
      >
        <Group position='right'>
          <Button color={'gray'} onClick={close}>
            Cancelar
          </Button>
          <Button
            color={`${type === 'empty-cart' ? 'red' : 'green'}}`}
            onClick={() => {
              if (type === 'empty-cart') {
                const categories = JSON.parse(localStorage.getItem('categories')!) as CategoryI[]
                const shopCart = JSON.parse(localStorage.getItem('shopping-cart')!) as CartProductI[]
                const updatedCategories = categories.map((cat) => {
                  const updatedProducts = cat.products.map((prod) => {
                    const updatedProd = shopCart.find((cartProd) => cartProd.id === prod.id)
                    if (updatedProd) {
                      return { ...prod, stock: prod.stock + updatedProd.quantity }
                    } else {
                      return prod
                    }
                  })
                  return { ...cat, products: updatedProducts }
                })

                localStorage.setItem('categories', JSON.stringify(updatedCategories))
              }
              localStorage.setItem('shopping-cart', JSON.stringify([]))
              window.dispatchEvent(new Event('storage'))
              close()
            }}
          >
            Continuar
          </Button>
        </Group>
      </Modal>
      <Button color={`${type === 'empty-cart' ? 'red' : 'green'}`} disabled={disabledButton}  onClick={open}>
        {type === 'empty-cart' ? 'Vaciar cesta' : 'Realizar pedido'}
      </Button>
    </>
  )
}
