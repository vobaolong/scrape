'use client'

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon
} from 'lucide-react'
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const routes = [
  {
    href: '',
    label: 'Home',
    icon: HomeIcon
  },
  {
    href: 'workflows',
    label: 'WorkFlows',
    icon: Layers2Icon
  },
  {
    href: 'credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon
  },
  {
    href: 'billing',
    label: 'Billing',
    icon: CoinsIcon
  }
]
function DesktopSidebar() {
  const pathName = usePathname()
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || routes[0]

  return (
    <div className='hidden relative md:block min-w-[280px] max-w-[280px] w-full h-screen overflow-hidden bg-primary/5 dark:bg-primary/30 text-muted-foreground dark:text-foreground border-r-2 border-separate'>
      <div className='flex items-center justify-center border-separate p-4 gap-2 border-b-[1px]'>
        <Logo />
      </div>
      <div className='p-2'>TODO Credits</div>
      <div className='flex flex-col gap-1 p-2'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? 'sidebarItemActive'
                  : 'sidebarItem'
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathName.includes(route.href)
    ) || routes[0]

  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-center px-8'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className='w-[400px] sm:w-[540px] space-y-4'
            side={'left'}
          >
            <Logo />
            <div className='flex flex-col gap-1'>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? 'sidebarItemActive'
                        : 'sidebarItem'
                  })}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default DesktopSidebar
