import { Paper, Title, Accordion } from '@mantine/core'
import { CategoryI } from '../../data/categories'
import Product from '../products/Product'
import ProductForm from '../products/ProductForm'

type CategoryProps = {
  categoryData: CategoryI
}

export default function Category({ categoryData }: CategoryProps) {
  return (
    <Accordion.Item value={categoryData.name} mb={'lg'}>
      <Paper style={{
        background: '#19376D',
      }} p='sm'>
          <Accordion.Control>
            <Paper p={'sm'} style={{
        background: '#576CBC',
      }} radius={'md'}>
              <Title align='center' order={2} fw={500}>
                {categoryData.name}
              </Title>
            </Paper>
          </Accordion.Control>
          <ProductForm category={categoryData} />
          <Accordion.Panel>
            {categoryData.products.map((product) => {
              return <Product key={product.id} productData={product} />
            })}
          </Accordion.Panel>
      </Paper>
    </Accordion.Item>
  )
}
