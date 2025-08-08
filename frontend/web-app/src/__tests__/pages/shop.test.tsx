import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShopPage from '@/src/app/shop/page'
import { useShopStore } from '@/src/stores/useShopStore'
import { useCartStore } from '@/src/stores/useCartStore'

jest.mock('@/stores/useShopStore')
jest.mock('@/stores/useCartStore')

const mockUseShopStore = useShopStore as jest.MockedFunction<typeof useShopStore>
const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>

describe('ShopPage', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'Description 1',
      price: 10.99,
      pictureUrl: 'test1.jpg',
      type: 'Electronics',
      brand: 'TestBrand',
      quantityInStock: 50,
    },
    {
      id: 2,
      name: 'Test Product 2',
      description: 'Description 2',
      price: 25.99,
      pictureUrl: 'test2.jpg',
      type: 'Clothing',
      brand: 'AnotherBrand',
      quantityInStock: 30,
    },
  ]

  const mockPagination = {
    data: mockProducts,
    pageIndex: 1,
    pageSize: 6,
    count: 2,
    pageCount: 1,
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseShopStore.mockReturnValue({
      products: mockPagination,
      brands: ['TestBrand', 'AnotherBrand'],
      types: ['Electronics', 'Clothing'],
      params: {
        brands: [],
        types: [],
        sort: 'name',
        search: '',
        pageNumber: 1,
        pageSize: 6,
      },
      loading: false,
      getProducts: jest.fn(),
      getBrands: jest.fn(),
      getTypes: jest.fn(),
      setParams: jest.fn(),
      setPageNumber: jest.fn(),
    })

    mockUseCartStore.mockReturnValue({
      cart: null,
      selectedDelivery: null,
      loading: false,
      getCart: jest.fn(),
      setCart: jest.fn(),
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
      updateItemQuantity: jest.fn(),
      deleteCart: jest.fn(),
      setSelectedDelivery: jest.fn(),
      createCart: jest.fn(),
      createOrder: jest.fn(),
      clearCart: jest.fn(),
      setShippingAddress: jest.fn(),
    })
  })

  it('renders shop page with products', () => {
    render(<ShopPage />)

    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Test Product 1')).toBeInTheDocument()
    expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    expect(screen.getByText('$10.99')).toBeInTheDocument()
    expect(screen.getByText('$25.99')).toBeInTheDocument()
  })

  it('displays loading state', () => {
    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      loading: true,
    })

    render(<ShopPage />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('allows filtering by brand', async () => {
    const user = userEvent.setup()
    const mockSetParams = jest.fn()

    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      setParams: mockSetParams,
    })

    render(<ShopPage />)

    const brandFilter = screen.getByLabelText('TestBrand')
    await user.click(brandFilter)

    expect(mockSetParams).toHaveBeenCalledWith({
      brands: ['TestBrand'],
    })
  })

  it('allows filtering by type', async () => {
    const user = userEvent.setup()
    const mockSetParams = jest.fn()

    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      setParams: mockSetParams,
    })

    render(<ShopPage />)

    const typeFilter = screen.getByLabelText('Electronics')
    await user.click(typeFilter)

    expect(mockSetParams).toHaveBeenCalledWith({
      types: ['Electronics'],
    })
  })

  it('allows searching products', async () => {
    const user = userEvent.setup()
    const mockSetParams = jest.fn()

    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      setParams: mockSetParams,
    })

    render(<ShopPage />)

    const searchInput = screen.getByPlaceholderText('Search products...')
    await user.type(searchInput, 'test search')

    await waitFor(() => {
      expect(mockSetParams).toHaveBeenCalledWith({
        search: 'test search',
        pageNumber: 1,
      })
    })
  })

  it('allows adding products to cart', async () => {
    const user = userEvent.setup()
    const mockAddItemToCart = jest.fn()

    mockUseCartStore.mockReturnValue({
      ...mockUseCartStore(),
      addItemToCart: mockAddItemToCart,
    })

    render(<ShopPage />)

    const addToCartButtons = screen.getAllByText('Add to Cart')
    await user.click(addToCartButtons[0])

    expect(mockAddItemToCart).toHaveBeenCalledWith(mockProducts[0], 1)
  })

  it('handles pagination', async () => {
    const user = userEvent.setup()
    const mockSetPageNumber = jest.fn()

    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      products: {
        ...mockPagination,
        pageCount: 3,
        pageIndex: 1,
      },
      setPageNumber: mockSetPageNumber,
    })

    render(<ShopPage />)

    const nextPageButton = screen.getByText('Next')
    await user.click(nextPageButton)

    expect(mockSetPageNumber).toHaveBeenCalledWith(2)
  })

  it('displays empty state when no products found', () => {
    mockUseShopStore.mockReturnValue({
      ...mockUseShopStore(),
      products: {
        ...mockPagination,
        data: [],
        count: 0,
      },
    })

    render(<ShopPage />)

    expect(screen.getByText('No products found')).toBeInTheDocument()
  })
})
