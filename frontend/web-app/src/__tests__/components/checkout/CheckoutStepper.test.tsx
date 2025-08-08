import { render, screen } from '@testing-library/react'
import { CheckoutStepper } from '@/src/components/checkout/CheckoutStepper'

describe('CheckoutStepper', () => {
  const mockSteps = [
    { number: 1, title: 'Delivery', completed: true },
    { number: 2, title: 'Complete', completed: false },
  ]

  it('renders all steps correctly', () => {
    render(<CheckoutStepper steps={mockSteps} currentStep={1} />)
    
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
  })

it('highlights current step', () => {
  const mockSteps = [
    { number: 1, title: 'Delivery', completed: false }, 
    { number: 2, title: 'Complete', completed: false },
  ]
  
  render(<CheckoutStepper steps={mockSteps} currentStep={1} />)
  
  const currentStepElement = screen.getByText('1')
  expect(currentStepElement).toHaveClass('bg-green-500')
})
})