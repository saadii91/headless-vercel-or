import Cart from 'components/cart';
import { getMenu } from 'lib/bigcommerce';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  const customLinks = [
    { title: 'Shipping Returns', path: '/shipping-returns/' },
    { title: 'Contact Us', path: '/contact-us/' },
    { title: 'Gardening Blog', path: '/blog' }
  ];

  const fullMenu = [...menu.slice(0, 8), ...customLinks];
  const LOGO_URL = 'https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/250x100/tn-logo-companyname_1769032683__71795.original.png';

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-4 py-3 lg:px-6">
        <div className="grid grid-cols-3 items-center lg:flex lg:justify-between">
          <div className="flex lg:hidden">
            <MobileMenu menu={fullMenu} />
          </div>

          <div className="flex justify-center lg:justify-start lg:flex-none">
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-auto min-w-[100px] md:h-12 md:min-w-[120px] transition-transform group-hover:scale-105">
                <img
                  src={LOGO_URL}
                  alt="TN Nursery Logo"
                  className="h-full w-auto object-contain"
                />
              </div>

            </Link>
          </div>

          <ul className="hidden gap-6 text-[13px] font-bold lg:flex xl:gap-8 ml-8">
            {fullMenu.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="whitespace-nowrap text-neutral-600 transition-colors hover:text-[#285e2c] relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#285e2c] after:transition-all hover:after:w-full"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2 md:gap-4 lg:ml-auto">
            <div className="hidden lg:block">
              <Search />
            </div>
            <Cart />
          </div>
        </div>
      </div>
    </nav>
  );
}