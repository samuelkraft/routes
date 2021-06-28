import { ReactNode } from 'react'

type SelectProps = {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void
  children: ReactNode
}

const Select = ({ value, onChange, children }: SelectProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="py-1.5 pl-3 pr-8 text-sm text-left border border-gray-200 rounded-md appearance-none "
    >
      {children}
    </select>
    <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
)
export default Select
