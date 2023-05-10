import { Stack, Paper, Title, Accordion } from '@mantine/core'
import Category from './Category'
import CategoryForm from './CategoryForm'
import { useEffect, useState } from 'react'
import { CategoryI, defaultCats } from '../../data/categories'

export default function CategoriesList() {
  const [categories, setCategories] = useState<CategoryI[]>(JSON.parse(localStorage.getItem('categories')!) || defaultCats)

  const handleStorageChange = () => {
    const categoriesLS = localStorage.getItem('categories')
    if (categoriesLS) setCategories(JSON.parse(categoriesLS))
    else setCategories(defaultCats)
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
          Categorías
        </Title>
      </Paper>
      <CategoryForm />
      <Accordion variant='separated' transitionDuration={600} multiple>
        {categories.map((category) => {
          return <Category key={category.id} categoryData={category} />
        })}
      </Accordion>
    </Stack>
  )
}
