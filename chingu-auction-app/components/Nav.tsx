'use client'
// I'm thinking we can avoid making this a client component by separating out
// the dropdowns into their own client components later
import Logo from '../public/assets/images/chingu_logo.png'
import Avatar from '../public/assets/images/blank-avatar.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState, Fragment } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = (props) => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)
  console.log(props.session, 'nav session log')
  return (
    <div>
      <header>
        <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
          <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
            <Link href='/' className='flex items-center'>
              <Image
                src={Logo}
                className='mr-3 sm:h-15 rounded object-contain'
                width={60}
                alt='Chingu Auction Logo'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                Chingu Auction
              </span>
            </Link>
            {props.session ? (
              <div className='flex gap-3 md:gap-5'>
                <Link
                  href='/addauction'
                  className='block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0'
                >
                  Add Item
                </Link>
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src={Avatar}
                        alt='avatar'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='/profile'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='/settings'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={() => signOut()}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className='sm:hidden flex items-center justify-center'>
                <Link
                  href='/login'
                  className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                >
                  Log in
                </Link>
                <Link
                  href='/signup'
                  className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                >
                  Sign up
                </Link>
              </div>
            )}
            {/* desktop navigation */}
            <div className='sm:flex hidden items-center lg:order-2'>
              {props.session ? (
                <div className='flex gap-3 md:gap-5'>
                  <Link
                    href='/addauction'
                    className='block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0'
                  >
                    Add Item
                  </Link>
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='absolute -inset-1.5' />
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          className='h-8 w-8 rounded-full'
                          src={Avatar}
                          alt='avatar'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/profile'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='/settings'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href='/'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <Link
                    href='/login'
                    className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                  >
                    Log in
                  </Link>
                  <Link
                    href='/signup'
                    className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800'
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
            <div className='hidden md:justify-between items-center w-full lg:flex lg:w-auto lg:order-1'>
              <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                <li>
                  <Link
                    href='/'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/auctions'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            {/* hamburger */}
            <div onClick={handleClick} className='md:hidden z-10'>
              {!nav ? (
                <Bars3Icon className='w-10 text-white' />
              ) : (
                <XMarkIcon className='w-10 text-white' />
              )}
            </div>
            {/* mobile navigation */}

            <div
              className={
                !nav
                  ? 'hidden'
                  : 'justify-between items-center w-full lg:flex lg:w-auto lg:order-1'
              }
            >
              <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                <li>
                  <Link
                    href='/'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/auctions'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    Auctions
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    onClick={handleClick}
                    className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Nav
