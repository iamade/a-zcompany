
import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '@/src/stores/useCartStore'

// Mock the API
jest.mock('@/lib/api', () => ({
  cartApi: {
    getCart: jest.fn(),
    setCart: jest.fn(),
    deleteCart: jest.fn(),
  },
}))

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  it('should add item to cart', async () => {
    const { result } = renderHook(() => useCartStore())
    
    const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'A test product for unit testing',
    price: 10.99,
    pictureUrl: 'https://example.com/test-product.png',
    type: 'Electronics',
    brand: 'TestBrand',
    quantityInStock: 50
      // ... other properties
    }

    await act(async () => {
      await result.current.addItemToCart(mockProduct, 2)
    })

    expect(result.current.cart?.items).toHaveLength(1)
    expect(result.current.cart?.items[0].quantity).toBe(2)
  })
})
