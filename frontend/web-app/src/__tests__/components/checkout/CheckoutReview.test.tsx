import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutReview } from '@/src/components/checkout/CheckoutReview'
import { useCartStore } from '@/src/stores/useCartStore'

jest.mock('@/stores/useCartStore')

const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>

describe('CheckoutReview', () => {
  const mockOnBack = jest.fn()
  const mockOnSubmitOrder = jest.fn()

  const mockCart = {
    id: 'cart1',
    items: [
      {
        productId: 1,
        productName: 'Test Product',
        price: 10.99,
        quantity: 2,
        pictureUrl: 'test.jpg',
        brand: 'TestBrand',
        type: 'Electronics',
      }
    ]
  }

  const mockDeliveryMethod = {
    id: 1,
    shortName: 'Standard',
    deliveryTime: '5-7 days',
    description: 'Standard delivery',
    price: 0,
  }

  const mockShippingAddress = {
    name: 'John Doe',
    line1: '123 Main St',
    line2: null,
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseCartStore.mockReturnValue({
      cart: mockCart,
      selectedDelivery: mockDeliveryMethod,
      shippingAddress: mockShippingAddress,
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

  it('renders order review information', () => {
    render(
      <CheckoutReview
        onBack={mockOnBack}
        onSubmitOrder={mockOnSubmitOrder}
        isSubmitting={false}
      />
    )

    expect(screen.getByText('Order Review')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText('Standard')).toBeInTheDocument()
  })

  it('calculates order total correctly', () => {
    render(
      <CheckoutReview
        onBack={mockOnBack}
        onSubmitOrder={mockOnSubmitOrder}
        isSubmitting={false}
      />
    )

    // 2 items × $10.99 = $21.98
    expect(screen.getByText('$21.98')).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CheckoutReview
        onBack={mockOnBack}
        onSubmitOrder={mockOnSubmitOrder}
        isSubmitting={false}
      />
    )

    const backButton = screen.getByText('← Back to Delivery')
    await user.click(backButton)

    expect(mockOnBack).toHaveBeenCalled()
  })

  it('calls onSubmitOrder when submit button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CheckoutReview
        onBack={mockOnBack}
        onSubmitOrder={mockOnSubmitOrder}
        isSubmitting={false}
      />
    )

    const submitButton = screen.getByText('Submit Order')
    await user.click(submitButton)

    expect(mockOnSubmitOrder).toHaveBeenCalled()
  })

  it('disables submit button when submitting', () => {
    render(
      <CheckoutReview
        onBack={mockOnBack}
        onSubmitOrder={mockOnSubmitOrder}
        isSubmitting={true}
      />
    )

    const submitButton = screen.getByText('Submitting Order...')
    expect(submitButton).toBeDisabled()
  })
})
