import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutPage from '@/src/app/checkout/page'
import { useCartStore } from '@/src/stores/useCartStore'
import { useAuthStore } from '@/src/stores/useAuthStore'

// Mock the stores
jest.mock('@/stores/useCartStore')
jest.mock('@/stores/useAuthStore')

describe('CheckoutPage', () => {
  const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>

  beforeEach(() => {
    mockUseCartStore.mockReturnValue({
      cart: { id: '1', items: [/* mock items */] },
      loading: false,
      getCart: jest.fn(),
      createOrder: jest.fn(),
    })

    mockUseAuthStore.mockReturnValue({
      currentUser: { id: '1', email: 'test@test.com' },
      loading: false,
      isAuthenticated: true,
    })
  })

  it('renders checkout steps', () => {
    render(<CheckoutPage />)
    
    expect(screen.getByText('Checkout')).toBeInTheDocument()
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

  it('allows user to proceed through checkout steps', async () => {
    const user = userEvent.setup()
    render(<CheckoutPage />)
    
    // Fill out delivery form and proceed
    await user.click(screen.getByText('Continue to Review'))
    
    await waitFor(() => {
      expect(screen.getByText('Submit Order')).toBeInTheDocument()
    })
  })
})
