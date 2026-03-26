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
    <nav className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      {/* MAIN HEADER ROW */}
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 lg:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-auto min-w-[120px] transition-transform group-hover:scale-105">
              <img
                src={LOGO_URL}
                alt="TN Nursery Logo"
                className="h-full w-auto object-contain object-left"
              />
            </div>
          </Link>

          {/* NAV LINKS - Now they have more room */}
          <ul className="hidden gap-6 text-[13px] font-bold lg:flex xl:gap-8">
            {fullMenu.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="whitespace-nowrap text-neutral-600 transition-colors hover:text-[#285e2c]"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4 ml-auto">
          {/* SEARCH COMPONENT (Desktop) */}
          <div className="hidden lg:block">
            <Search />
          </div>

          <div className="flex items-center gap-2">
            <Cart />
            <div className="lg:hidden">
              <MobileMenu menu={fullMenu} />
            </div>
          </div>
        </div>
      </div>

      {/* Note: If your <Search /> component contains the input field, 
          it will likely need a small CSS tweak to position itself 
          absolutely 'top-full' so it drops below this bar without 
          pushing the layout.
      */}
    </nav>
  );
}