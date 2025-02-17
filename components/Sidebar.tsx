'use client'

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from './ui/button'

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
      <div className='flex flex-col p-2'>
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

export default DesktopSidebar
