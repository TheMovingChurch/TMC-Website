import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/container'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [showMobile, setShowMobile] = useState(false);

  const handleMobileMenu = (e) => {
    e.preventDefault();

    setShowMobile(!showMobile);
  }

  return (
    <nav className="mb-20 mt-8">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
              <Link href="/">
                <a className="hover:underline">Home</a>
              </Link>
              .
            </h2>
            {showMobile ?
              <FaTimes
                className="text-lg md:hidden"
                onClick={handleMobileMenu}
              />
              :
              <FaBars
                className="text-lg md:hidden"
                onClick={handleMobileMenu}
              />
            }
          </div>
          <div className={`${showMobile ? 'flex w-full' : 'hidden'} md:flex md:w-1/5`}>
            <ul className="w-full flex flex-col md:flex-row justify-evenly">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  )
}
