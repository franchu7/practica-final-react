import { defaultCats, CategoryI } from '../data/categories'
import { CartProductI, ProductI } from '../data/products'

export function addProductToCart(productData: ProductI) {
  const shoppingCart = (localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')!) : []) as CartProductI[]
  const categories = (localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')!) : defaultCats) as CategoryI[]

  const updatedCategories = categories.map((category) => {
    category.products.map((product) => {
      if (product.id === productData.id) {
        product.stock -= 1
      }
      return product
    })
    return category
  })

  let updatedCart: CartProductI[] = []
  if (!shoppingCart.find((product) => product.id === productData.id)) {
    updatedCart = [...shoppingCart, { ...productData, quantity: 1, amount: productData.price }]
  } else {
    updatedCart = shoppingCart.map((product) => {
      if (product.id === productData.id) {
        product.quantity += 1
        product.amount = product.quantity * productData.price
      }
      return product
    })
  }

  localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
  localStorage.setItem('categories', JSON.stringify(updatedCategories))
  window.dispatchEvent(new Event('storage'))
}

export function removeProductFromCart(productData: CartProductI) {
  const shoppingCart = (localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')!) : []) as CartProductI[]
  const categories = (localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')!) : defaultCats) as CategoryI[]

  const updatedCategories = categories.map((category) => {
    category.products.map((p) => {
      if (p.id === productData.id) {
        p.stock += 1
      }
      return productData
    })
    return category
  })

  const updatedCart = shoppingCart
    .map((p) => {
      if (p.id === productData.id) {
        p.quantity -= 1
        const price = productData.amount / productData.quantity
        p.amount -= price
      }
      return p
    })
    .filter((p) => p.quantity > 0)

  localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
  localStorage.setItem('categories', JSON.stringify(updatedCategories))
  window.dispatchEvent(new Event('storage'))
}
