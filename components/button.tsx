import { ReactNode } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ type = 'button', children, onClick, disabled }: ButtonProps): JSX.Element => (
  <button
    className="rounded-full px-3 py-1 text-[15px] font-semibold text-forest bg-forest-lightest hover:bg-forest-light disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-150"
    type={type === 'submit' ? 'submit' : 'button'}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
