import Link from 'next/link'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academy', href: '/academy' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-lighter">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-white">ayman taher</span>
            </Link>
            <p className="text-gray-text text-sm max-w-md">
              Product Design Lead and Education Consultant specializing in creating exceptional user experiences for web and mobile platforms.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-end">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-3">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-text hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-dark-lighter">
          <p className="text-center text-sm text-gray-text">
            © {new Date().getFullYear()} Ayman Taher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
