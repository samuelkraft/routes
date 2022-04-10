import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from './button'

const Nav = () => {
  const router = useRouter()
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-4">
        <Link href="/">
          <a className={router.pathname === '/' ? 'text-forest font-bold text-base' : 'text-gray-400 font-bold'}>Routes</a>
        </Link>
        <Link href="/blog">
          <a className={router.pathname === '/blog' ? 'text-forest font-bold' : 'text-gray-400 font-bold'}>Blog</a>
        </Link>
      </div>
      <Button onClick={() => window.open('mailto:samuelkraft@me.com?subject=🏃‍♀️ I want to add a route to Trail Runner!')}>Add Route</Button>
    </nav>
  )
}

export default Nav
