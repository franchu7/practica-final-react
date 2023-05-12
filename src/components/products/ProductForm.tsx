import { Modal, TextInput, Group, Button, Text, NumberInput, rem, Image, Paper } from '@mantine/core'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai'
import { RiGalleryFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'
import { CategoryI, defaultCats } from '../../data/categories'
import { ProductI } from '../../data/products'

type ProductFormProps = {
  category: CategoryI
}

export default function ProductForm({ category }: ProductFormProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [image, setImage] = useState<FileWithPath[]>([])
  const [srcImage, setSrcImage] = useState<string>('/defaultCover.jpg')

  const previewImg = image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target!.result as string
      setSrcImage(src)
    }
    reader.readAsDataURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{
          onLoad: () => URL.revokeObjectURL(imageUrl),
        }}
      />
    )
  })

  const form = useForm({
    initialValues: {
      code: '',
      title: '',
      description: '',
      price: '',
      stock: '',
      image: '',
    },

    validate: {
      code: (value) => (/^[a-zA-Z0-9]+$/.test(value) ? null : 'Código no válido'),
      title: (value) => (/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/.test(value) ? null : 'Nombre no válido'),
      description: (value) => (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) ? null : 'Descripción no válida'),
      price: (value) => (/^\d+(\.\d{1,2})?$/.test(value) ? null : 'Precio no válido'),
      stock: (value) => (/^\d+$/.test(value) ? null : 'Stock no válido'),
    },
  })
  return (
    <>
      <Modal
        size={'md'}
        opened={opened}
        onClose={() => {
          form.reset()
          setImage([])
          close()
        }}
        title={
          <Text fz={'xl'} fw={500}>
            Añadir nuevo juego de {category.name.split(' ')[2]}
          </Text>
        }
      >
        <form
          onSubmit={form.onSubmit((values) => {
            form.reset()
            const newProduct: ProductI = { id: uuidv4(), ...values, stock: parseInt(values.stock), price: parseFloat(values.price), image: srcImage }
            const categories = (localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')!) : defaultCats) as CategoryI[]
            const updatedCategories = categories.map((cat) => {
              if (cat.id === category.id) {
                return {
                  ...cat,
                  products: [...cat.products, newProduct],
                }
              }
              return cat
            })
            localStorage.setItem('categories', JSON.stringify(updatedCategories))
            window.dispatchEvent(new Event('storage'))
            close()
          })}
        >
          <TextInput withAsterisk label='Código del producto' placeholder='Código del juego' {...form.getInputProps('code')} />
          <TextInput withAsterisk label='Nombre del producto' placeholder='Nombre el juego' {...form.getInputProps('title')} />
          <TextInput withAsterisk label='Descripción del producto' placeholder='Descripción del juego' {...form.getInputProps('description')} />
          <TextInput withAsterisk label='Precio del producto' placeholder='Precio del juego' {...form.getInputProps('price')} />
          <NumberInput withAsterisk min={1} label='Stock del producto' placeholder='Stock del juego' {...form.getInputProps('stock')} />
          <Text fw={500} fz={'sm'} mt={'xs'}>
            Imagen del producto
          </Text>
          <Dropzone onDrop={setImage} maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE} maxFiles={1} my={'md'}>
            <Group position='center' style={{ minHeight: rem(220), pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <AiOutlineCloudUpload size='3.2rem' />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <AiOutlineClose size='3.2rem' />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <RiGalleryFill size='3.2rem' />
              </Dropzone.Idle>

              <Paper>
                <Text size='xl' inline>
                  Arrastre la imagen aquí o haga clic para seleccionar el archivo.
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                  El tamaño máximo de archivo es 3MB.
                </Text>
              </Paper>
            </Group>
          </Dropzone>
          {previewImg}
          <Group position='right' mt='md'>
            <Button
              color='gray'
              onClick={() => {
                form.reset()
                setImage([])
                close()
              }}
            >
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </Group>
        </form>
      </Modal>
      <Button
        ml={'lg'}
        style={{
          background: 'green',
        }}
        onClick={open}
      >
        Añadir juego
      </Button>
    </>
  )
}
