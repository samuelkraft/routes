import { useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

// Components
import Route from 'components/route'
import Button from 'components/button'
import Select from 'components/select'

// Types
import type { Routes } from 'types'

// Data
const gpxUtils = require('../utils/gpxutils.js')

type RoutesProps = {
  routes: Routes
}

const Home = ({ routes }: RoutesProps) => {
  const [sorting, setSorting] = useState('added')
  const randomRoute = routes[Math.floor(Math.random() * routes.length)]

  const sortRoutes = (a, b) => {
    switch (sorting) {
      case 'alphabetically':
        return a.geoJson.features[0].properties.name.localeCompare(b.geoJson.features[0].properties.name, 'sv')
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return b.distance - a.distance
      case 'elevation':
        return b.elevation - a.elevation
      default:
        return new Date(b.added).valueOf() - new Date(a.added).valueOf()
    }
  }

  return (
    <div className="pt-3">
      <nav className="flex justify-end">
        <Button onClick={() => window.open('mailto:samuelkraft@me.com?subject=🏃‍♀️ I want to add a route to Trail Runner!')}>
          Add Route
        </Button>
      </nav>
      <header className="py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="261" height="43" viewBox="0 0 261 43" className="mx-auto mb-3">
          <g fill="none">
            <path
              fill="#75A134"
              d="M20.043 10.721a1.585 1.585 0 0 0 2.027-2.438L12.57.367a1.583 1.583 0 0 0-2.027 0L1.044 8.283a1.585 1.585 0 1 0 2.027 2.438l6.903-5.755v5.375l-8.93 7.441a1.585 1.585 0 1 0 2.027 2.438l6.903-5.755v5.375l-8.93 7.442a1.585 1.585 0 1 0 2.027 2.438l6.903-5.755v12.452a1.583 1.583 0 0 0 3.166 0V23.965l6.903 5.755a1.585 1.585 0 0 0 2.027-2.438l-8.93-7.442v-5.375l6.903 5.755a1.585 1.585 0 0 0 2.027-2.438l-8.93-7.441V4.966l6.903 5.755zm12.096-4.386a6.333 6.333 0 1 0 0 12.666 6.333 6.333 0 0 0 0-12.666zm0 9.5a3.166 3.166 0 1 1 0-6.333 3.166 3.166 0 0 1 0 6.333z"
            />
            <path
              fill="#2F3427"
              d="M59.719 32V14.078h5.094V9.594H49.484v4.484h5.047V32h5.188Zm12.89 0v-6.203h2.438L79.016 32h6.015l-4.484-7.078c1.406-.656 2.5-1.628 3.281-2.914C84.61 20.72 85 19.286 85 17.703c0-1.094-.193-2.13-.578-3.11a7.773 7.773 0 0 0-1.649-2.577 7.936 7.936 0 0 0-2.578-1.766c-1.005-.438-2.127-.656-3.367-.656h-9.406V32h5.187Zm3.547-10.438H72.61v-7.734h3.547c.542 0 1.037.107 1.485.32.448.214.825.495 1.132.844.308.35.547.76.72 1.235.171.474.257.966.257 1.476s-.086 1-.258 1.469a3.83 3.83 0 0 1-.719 1.226c-.307.35-.687.63-1.14.844a3.42 3.42 0 0 1-1.477.32ZM91.86 32l.875-2.719h7.97l.859 2.719h5.625L99.094 9.594h-4.766l-8 22.406h5.531Zm7.563-6.781h-5.438L96.734 16l2.688 9.219ZM114.703 32V9.594h-5.25V32h5.25Zm15.844 0v-4.484h-6.375V9.594h-5.188V32h11.563Zm15.875 0v-6.203h2.437L152.83 32h6.015l-4.485-7.078c1.407-.656 2.5-1.628 3.282-2.914.78-1.287 1.172-2.722 1.172-4.305 0-1.094-.193-2.13-.579-3.11a7.773 7.773 0 0 0-1.648-2.577 7.936 7.936 0 0 0-2.578-1.766c-1.005-.438-2.128-.656-3.367-.656h-9.407V32h5.188Zm3.547-10.438h-3.547v-7.734h3.547c.541 0 1.036.107 1.484.32.448.214.826.495 1.133.844.307.35.547.76.719 1.235.172.474.258.966.258 1.476s-.086 1-.258 1.469a3.83 3.83 0 0 1-.719 1.226c-.307.35-.688.63-1.14.844a3.42 3.42 0 0 1-1.477.32Zm22.937 11.016c1.854 0 3.513-.325 4.977-.976 1.463-.651 2.708-1.521 3.734-2.61a11.09 11.09 0 0 0 2.336-3.765c.531-1.422.797-2.899.797-4.43 0-1.531-.266-3.008-.797-4.43a11.09 11.09 0 0 0-2.336-3.765c-1.026-1.089-2.27-1.956-3.734-2.602-1.464-.646-3.123-.969-4.977-.969s-3.515.323-4.984.969c-1.469.646-2.716 1.513-3.742 2.602a11.09 11.09 0 0 0-2.336 3.765 12.555 12.555 0 0 0-.797 4.43c0 1.542.266 3.02.797 4.437a11.108 11.108 0 0 0 2.336 3.758c1.026 1.089 2.273 1.959 3.742 2.61 1.469.65 3.13.976 4.984.976Zm0-4.672c-1.02 0-1.937-.198-2.75-.593a6.284 6.284 0 0 1-2.062-1.586 7.042 7.042 0 0 1-1.29-2.274 8.034 8.034 0 0 1-.445-2.656c0-.917.149-1.802.446-2.656a7.042 7.042 0 0 1 1.289-2.274 6.194 6.194 0 0 1 2.062-1.578c.813-.39 1.73-.586 2.75-.586 1.032 0 1.95.195 2.758.586a6.3 6.3 0 0 1 2.063 1.578c.567.662 1 1.42 1.296 2.274.297.854.446 1.74.446 2.656 0 .917-.149 1.802-.446 2.656a6.966 6.966 0 0 1-1.296 2.274 6.37 6.37 0 0 1-2.07 1.585c-.813.396-1.73.594-2.75.594Zm23.36 4.672c1.343 0 2.554-.213 3.632-.64 1.079-.428 1.995-1.008 2.75-1.743a7.547 7.547 0 0 0 1.743-2.601c.406-1 .609-2.078.609-3.235V9.594h-5.187v14.719c0 .52-.086 1.01-.258 1.468a3.68 3.68 0 0 1-.719 1.196 3.409 3.409 0 0 1-2.57 1.117c-.532 0-1.01-.102-1.438-.305a3.595 3.595 0 0 1-1.11-.812 3.593 3.593 0 0 1-.726-1.204 4.168 4.168 0 0 1-.258-1.46V9.592h-5.171V24.36c0 1.146.203 2.222.609 3.227a7.53 7.53 0 0 0 1.742 2.61c.755.734 1.667 1.314 2.734 1.741 1.068.428 2.274.641 3.618.641ZM217.5 32V14.078h5.094V9.594h-15.328v4.484h5.047V32h5.187Zm21.375 0v-4.156h-8.484v-4.938h8.484v-4.062h-8.484v-5.078h8.484V9.594h-13.672V32h13.672Zm11.594.578c1.24 0 2.372-.156 3.398-.469 1.026-.312 1.912-.77 2.656-1.375a6.244 6.244 0 0 0 1.743-2.25c.416-.895.625-1.922.625-3.078 0-1.104-.24-2.047-.72-2.828a6.878 6.878 0 0 0-1.835-1.984c-.745-.542-1.589-1-2.531-1.375a74.683 74.683 0 0 0-2.79-1.047c-.958-.344-1.729-.732-2.312-1.164-.583-.432-.875-1.024-.875-1.774 0-.77.266-1.349.797-1.734s1.172-.578 1.922-.578c.896 0 1.583.289 2.062.867.48.578.72 1.367.72 2.367h5.187c0-.958-.167-1.864-.5-2.718a6.557 6.557 0 0 0-1.493-2.274c-.661-.661-1.492-1.182-2.492-1.562-1-.38-2.161-.57-3.484-.57-1.031 0-2.02.132-2.969.398a7.712 7.712 0 0 0-2.508 1.195 6.077 6.077 0 0 0-1.742 1.984c-.437.792-.656 1.698-.656 2.72 0 1.135.203 2.085.61 2.85.406.766.95 1.42 1.632 1.962.682.541 1.487 1.005 2.414 1.39.927.386 1.901.771 2.922 1.157.49.187.948.372 1.375.554.427.182.797.39 1.11.625.312.235.557.508.734.82.177.313.265.693.265 1.141 0 .792-.28 1.427-.843 1.906-.563.48-1.26.72-2.094.72-1.063 0-1.925-.342-2.586-1.024-.661-.683-.992-1.633-.992-2.852h-5.188c0 1.281.214 2.417.64 3.406a7.144 7.144 0 0 0 1.774 2.508 7.652 7.652 0 0 0 2.68 1.555c1.031.354 2.146.531 3.344.531Z"
            />
          </g>
        </svg>
        <p className="text-forest-darkest">A curated selection of trails for hiking &amp; running</p>
      </header>
      <section>
        <div className="sticky top-0 z-10 flex justify-between px-5 py-4 -mx-5 bg-blur">
          <h1 className="text-2xl font-bold text-forest-darkest">All routes</h1>
          <div className="flex">
            <Link href={`/${randomRoute.slug}`}>
              <a
                title="Randomize route"
                className="flex items-center px-2 mr-2 transition-all bg-white border border-gray-200 rounded hover:border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[18px] h-auto"
                >
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </a>
            </Link>
            <Select value={sorting} onChange={e => setSorting(e.target.value)}>
              <option value="added">Recently added</option>
              <option value="rating">Rating</option>
              <option value="distance">Distance</option>
              <option value="elevation">Elevation gain</option>
              <option value="alphabetically">Alphabetically</option>
            </Select>
          </div>
        </div>
        <ol className="pt-1">
          {routes.sort(sortRoutes).map(route => (
            <Route key={route.slug} route={route} />
          ))}
        </ol>
      </section>
      <footer className="pb-6 text-center text-gray-500">
        A project by{' '}
        <a href="https://twitter.com/samuelkraft" target="_blank" rel="noopener noreferrer" className="text-forest">
          @samuelkraft
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
    },
  }
}

export default Home
