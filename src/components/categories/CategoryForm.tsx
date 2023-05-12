import { Modal, TextInput, Group, Button, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { v4 as uuidv4 } from 'uuid'
import { CategoryI, defaultCats } from '../../data/categories'

export default function CategoryFOrm() {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => (/^(Juegos de\s)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) ? null : 'Nombre no válido. Debe comenzar con "Juegos de"'),
    },
  })
  return (
    <>
      <Modal
        size={'md'}
        opened={opened}
        onClose={() => {
          form.reset()
          close()
        }}
        title={
          <Text fz={'xl'} fw={500}>
            Añadir nueva categoría
          </Text>
        }
      >
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset()
            const categories = (localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')!) : defaultCats) as CategoryI[]
            const newCategories = [...categories, { id: uuidv4(), ...values, products: [] }]
            localStorage.setItem('categories', JSON.stringify(newCategories))
            window.dispatchEvent(new Event('storage'))
            close()
          })}
        >
          <TextInput withAsterisk label='Nombre de la categoría' placeholder='Ejemplo: Juegos de terror' {...form.getInputProps('name')} />
          <Group position='right' mt='md'>
            <Button
              color='gray'
              onClick={() => {
                form.reset()
                close()
              }}
            >
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </Group>
        </form>
      </Modal>
      <Button style={{
        background: 'green',
      }}  onClick={open}>
        Añadir categoría
      </Button>
    </>
  )
}
