import { ProductI, defaultProds } from './products'
import { v4 as uuidv4 } from 'uuid'

export interface CategoryI {
  id: string
  name: string
  products: ProductI[]
}

// Default categories
export const defaultCats: CategoryI[] = [
  { id: uuidv4(), name: 'Juegos de terror', products: defaultProds.slice(0, 3) },
  { id: uuidv4(), name: 'Juegos de plataformas', products: defaultProds.slice(3, 4) },
  { id: uuidv4(), name: 'Juegos de acción', products: defaultProds.slice(4, 5) },
]
