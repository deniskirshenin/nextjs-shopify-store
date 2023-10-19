import { Suspense } from 'react';
import Link from 'next/link';
import { getMenu } from '@/app/lib/shopify';
import { Menu } from '@/app/lib/types';
import Logo from '../Logo';
import Search from './Search';
import OpenCart from '../cart/OpenCart';
import Cart from '../cart/Cart';
import Banner from '../Banner';

const Header = async () => {
  const menu = await getMenu('menu');
  console.log(menu);

  return (
    <header className="bg-white sticky top-0 z-10">
      <Banner />
      <nav className="relative">
        <div className="block flex-none md:hidden">
          {/* <MobileMenu menu={menu} /> */}
        </div>
        <div className="flex flex-wrap w-full mx-auto px-[54px] h-[65px]">
          {menu.length ? (
              <ul className="text-sm flex flex-wrap items-center justify-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-black font-light p-4 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          <div className="flex flex-1 justify-center w-full">
            <Link href="/" className="flex w-full items-center justify-center md:w-auto">
              <Logo />
            </Link>
          </div>
          <div className="flex justify-end items-center">
            <Search />
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;