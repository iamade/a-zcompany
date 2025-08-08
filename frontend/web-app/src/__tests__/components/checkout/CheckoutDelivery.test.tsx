import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CheckoutDelivery } from '@/src/components/checkout/CheckoutDelivery'
import { useAuthStore } from '@/src/stores/useAuthStore'
import { useCartStore } from '@/src/stores/useCartStore'

// Mock the stores
jest.mock('@/stores/useAuthStore')
jest.mock('@/stores/useCartStore')

const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>
const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>

describe('CheckoutDelivery', () => {
  const mockOnNext = jest.fn()
  const mockSetShippingAddress = jest.fn()
  const mockSetSelectedDelivery = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockUseAuthStore.mockReturnValue({
      currentUser: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        address: {
          line1: '123 Main St',
          line2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US'
        }
      },
      loading: false,
      isAuthenticated: true,
      isAdmin: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      getUserInfo: jest.fn(),
      updateAddress: jest.fn(),
      checkAuthState: jest.fn(),
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
      setSelectedDelivery: mockSetSelectedDelivery,
      createCart: jest.fn(),
      createOrder: jest.fn(),
      clearCart: jest.fn(),
      setShippingAddress: mockSetShippingAddress,
    })
  })

  it('renders shipping address form and delivery options', () => {
    render(<CheckoutDelivery onNext={mockOnNext} />)

    expect(screen.getByText('Shipping Address')).toBeInTheDocument()
    expect(screen.getByText('Delivery Options')).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Address Line 1')).toBeInTheDocument()
    expect(screen.getByText('Standard')).toBeInTheDocument()
    expect(screen.getByText('Express')).toBeInTheDocument()
    expect(screen.getByText('Next Day')).toBeInTheDocument()
  })

  it('pre-fills form with user address data', () => {
    render(<CheckoutDelivery onNext={mockOnNext} />)

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Apt 4B')).toBeInTheDocument()
    expect(screen.getByDisplayValue('New York')).toBeInTheDocument()
    expect(screen.getByDisplayValue('NY')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10001')).toBeInTheDocument()
    expect(screen.getByDisplayValue('US')).toBeInTheDocument()
  })

  it('allows user to select delivery method', async () => {
    const user = userEvent.setup()
    render(<CheckoutDelivery onNext={mockOnNext} />)

    const expressOption = screen.getByLabelText(/Express/)
    await user.click(expressOption)

    expect(mockSetSelectedDelivery).toHaveBeenCalledWith({
      id: 2,
      shortName: 'Express',
      deliveryTime: '2-3 days',
      description: 'Express delivery',
      price: 9.99,
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<CheckoutDelivery onNext={mockOnNext} />)

    // Clear required field
    const nameInput = screen.getByLabelText('Full Name')
    await user.clear(nameInput)

    const submitButton = screen.getByText('Continue to Review')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    expect(mockOnNext).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<CheckoutDelivery onNext={mockOnNext} />)

    const submitButton = screen.getByText('Continue to Review')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockSetShippingAddress).toHaveBeenCalledWith({
        name: 'John Doe',
        line1: '123 Main St',
        line2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
      })
      expect(mockOnNext).toHaveBeenCalled()
    })
  })
})
