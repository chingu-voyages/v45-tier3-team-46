'use client'
// I'm thinking we can avoid making this a client component by separating out
// the dropdowns into their own client components later
import Logo from '../public/assets/images/chingu_logo.png'
// import Avatar from '../public/assets/images/blank-avatar.png'
import Image from 'next/image'
// import Link from 'next/link'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav = (props: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  console.log(props.session, 'nav session log')
  const menuItems = [
    'Profile',
    'Add Item',
    'Auctions',
    'About',
    'Contact',
    'Logout',
  ]

  return (
    <div>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className='bg-gradient-to-r from-cyan-500 to-blue-500 py-2 h-24'
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <Link href='/'>
              <Image
                src={Logo}
                alt='chingu auction logo'
                height={60}
                width={80}
                className='rounded'
              />
            </Link>
            <p className='font-bold text-inherit ml-2'>Chingu Auction</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Link color='foreground' href='/auctions'>
              Auctions
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='/about'>
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='/contact'>
              Contact
            </Link>
          </NavbarItem>
          {props.session ? (
            <NavbarItem>
              <Link
                color='foreground'
                href={`/user/${props.session.user.id}/profile`}
              >
                Profile
              </Link>
            </NavbarItem>
          ) : null}

          {props.session ? (
            <NavbarItem>
              <Link color='foreground' href='/addauction'>
                Add Item
              </Link>
            </NavbarItem>
          ) : null}
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem className={props.session ? 'hidden' : 'lg:flex'}>
            <Link href='/login' color='foreground'>
              Log In
            </Link>
          </NavbarItem>
          <NavbarItem>
            {props.session ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar src='https://i.pravatar.cc/150' />
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem key='profile'>
                    <Link href={`/user/${props.session.user.id}/profile`}>
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    key='logout'
                    className='text-danger'
                    color='danger'
                    onClick={() => signOut()}
                  >
                    <Link href='/'>Logout</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button as={Link} color='primary' href='/signup' variant='faded'>
                Sign Up
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={index === 0 ? 'w-full mt-10' : 'w-full mt-2'}
                color={
                  index === 1
                    ? 'warning'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                href={
                  item === 'Profile'
                    ? '/user/${id}/profile'
                    : item === 'Logout'
                    ? '/'
                    : item === 'Add Item'
                    ? '/addauction'
                    : `/${item}`.toLowerCase()
                }
                size='lg'
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )
}

export default Nav
