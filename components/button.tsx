import { ReactNode } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit'
  children: ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
}

const Button = ({ type = 'button', children, onClick, disabled, href }: ButtonProps): JSX.Element => {
  const classes =
    'rounded-full px-4 py-2 text-[15px] font-semibold text-forest bg-forest-lightest hover:bg-forest-light disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-150'
  if (onClick) {
    return (
      <button className={classes} type={type === 'submit' ? 'submit' : 'button'} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  )
}

export default Button
