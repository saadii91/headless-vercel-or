import { getMenu } from 'lib/bigcommerce';
import Link from 'next/link';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const menu = await getMenu('next-js-frontend-footer-menu');
  const categories = await getMenu('next-js-frontend-header-menu');

  return (
    <footer className="relative bg-[#285e2c] text-white">
      {/* 3D Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none h-6" />

      {/* Main Links Area */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm">
        {/* NAVIGATE */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/20 pb-2">NAVIGATE</h4>
          <ul className="space-y-3 text-green-50/80">
            {menu.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="hover:text-white transition-colors">
                  {item.title}
                </Link>
              </li>
            ))}
            <li><Link href="/blog" className="hover:text-white transition-colors">Gardening Blog</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/20 pb-2">CATEGORIES</h4>
          <ul className="space-y-3 text-green-50/80">
            {categories.map((cat) => (
              <li key={cat.path}>
                <Link href={cat.path} className="hover:text-white transition-colors">{cat.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MY ACCOUNT */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/20 pb-2">MY ACCOUNT</h4>
          <ul className="space-y-3 text-green-50/80">
            <li>
              <Link href="/login.php" className="hover:text-white transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/login.php?action=create_account" className="hover:text-white transition-colors">
                Register
              </Link>
            </li>
            <li>
              <Link href="/account.php?action=order_status" className="hover:text-white transition-colors">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/account.php?action=address_book" className="hover:text-white transition-colors">
                Addresses
              </Link>
            </li>
            <li>
              <Link href="/wishlist.php" className="hover:text-white transition-colors">
                Wish Lists
              </Link>
            </li>
          </ul>
        </div>

        {/* CONNECT WITH US */}
        <div>
          <h4 className="font-bold text-lg mb-6 border-b border-white/20 pb-2">CONNECT WITH US</h4>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-lg shadow-inner">
                {/* Phone SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <p className="font-semibold text-white">CALL US</p>
                <a href="tel:9316927325" className="text-green-50/80 hover:text-white transition-all">9316927325</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-white/10 p-2 rounded-lg shadow-inner">
                {/* MapPin SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <p className="text-green-50/80 leading-relaxed">
                12845 State Route 108<br />Altamont TN 37301
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 py-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-green-100/40">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="hover:text-white transition-colors cursor-default">
            Freshly Shipped From Our Nursery to Your Door
          </p>
        </div>
      </div>
    </footer>
  );
}