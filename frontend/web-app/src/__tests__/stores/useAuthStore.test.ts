import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/src/stores/useAuthStore'
import { accountApi } from '@/src/lib/api'
import type { User, Address } from '@/src/types'

// Mock the API
jest.mock('@/lib/api', () => ({
  accountApi: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    getUserInfo: jest.fn(),
    updateAddress: jest.fn(),
  },
}))

const mockAccountApi = accountApi as jest.Mocked<typeof accountApi>

describe('useAuthStore', () => {
  const mockAddress: Address = {
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US',
  }

  const mockUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: mockAddress,
  }

  const mockUserWithoutAddress: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    address: {
      line1: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset store state
    useAuthStore.setState({
      currentUser: null,
      loading: false,
      isAuthenticated: false,
    })
  })

  describe('login', () => {
    it('should login successfully and set user data', async () => {
      mockAccountApi.login.mockResolvedValue(mockUser)
      mockAccountApi.getUserInfo.mockResolvedValue(mockUser)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.login('john@example.com', 'password123')
      })

      expect(mockAccountApi.login).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123',
      })
      expect(result.current.currentUser).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.loading).toBe(false)
    })

    it('should handle login failure', async () => {
      const error = new Error('Invalid credentials')
      mockAccountApi.login.mockRejectedValue(error)

      const { result } = renderHook(() => useAuthStore())

      await expect(
        act(async () => {
          await result.current.login('john@example.com', 'wrongpassword')
        })
      ).rejects.toThrow('Invalid credentials')

      expect(result.current.currentUser).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.loading).toBe(false)
    })
  })

  describe('register', () => {
    it('should register successfully', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      }

      mockAccountApi.register.mockResolvedValue(mockUser)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.register(userData)
      })

      expect(mockAccountApi.register).toHaveBeenCalledWith(userData)
      expect(result.current.loading).toBe(false)
    })
  })

  describe('logout', () => {
    it('should logout and clear user data', async () => {
      // Set initial authenticated state
      useAuthStore.setState({
        currentUser: mockUser,
        isAuthenticated: true,
      })

      mockAccountApi.logout.mockResolvedValue()

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.logout()
      })

      expect(mockAccountApi.logout).toHaveBeenCalled()
      expect(result.current.currentUser).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
    })
  })

  describe('getUserInfo', () => {
    it('should get user info successfully', async () => {
      mockAccountApi.getUserInfo.mockResolvedValue(mockUser)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.getUserInfo()
      })

      expect(mockAccountApi.getUserInfo).toHaveBeenCalled()
      expect(result.current.currentUser).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.loading).toBe(false)
    })

    it('should handle getUserInfo failure', async () => {
      const error = new Error('Unauthorized')
      mockAccountApi.getUserInfo.mockRejectedValue(error)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.getUserInfo()
      })

      expect(result.current.currentUser).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.loading).toBe(false)
    })
  })

  describe('updateAddress', () => {
    it('should update user address', async () => {
      const newAddress: Address = {
        line1: '456 Oak St',
        line2: 'Suite 100',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'US',
      }

      useAuthStore.setState({
        currentUser: mockUser,
        isAuthenticated: true,
      })

      mockAccountApi.updateAddress.mockResolvedValue(newAddress)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.updateAddress(newAddress)
      })

      expect(mockAccountApi.updateAddress).toHaveBeenCalledWith(newAddress)
      expect(result.current.currentUser?.address).toEqual(newAddress)
      expect(result.current.loading).toBe(false)
    })

    it('should handle updateAddress failure', async () => {
      const newAddress: Address = {
        line1: '456 Oak St',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90210',
        country: 'US',
      }

      useAuthStore.setState({
        currentUser: mockUser,
        isAuthenticated: true,
      })

      const error = new Error('Update failed')
      mockAccountApi.updateAddress.mockRejectedValue(error)

      const { result } = renderHook(() => useAuthStore())

      await expect(
        act(async () => {
          await result.current.updateAddress(newAddress)
        })
      ).rejects.toThrow('Update failed')

      expect(result.current.loading).toBe(false)
    })
  })

  describe('checkAuthState', () => {
    it('should not interfere if user is already authenticated', async () => {
      useAuthStore.setState({
        currentUser: mockUser,
        isAuthenticated: true,
      })

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.checkAuthState()
      })

      
      expect(mockAccountApi.getUserInfo).not.toHaveBeenCalled()
      expect(result.current.currentUser).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })

    it('should try to get user info if not authenticated', async () => {
      mockAccountApi.getUserInfo.mockResolvedValue(mockUser)

      const { result } = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.checkAuthState()
      })

      expect(mockAccountApi.getUserInfo).toHaveBeenCalled()
      expect(result.current.currentUser).toEqual(mockUser)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

 
})
