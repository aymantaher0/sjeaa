import React from 'react'
import {
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaDribbble,
  FaBehance,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'UX/UI Design', href: '#services' },
      { name: 'Product Development', href: '#services' },
      { name: 'Consulting', href: '#services' },
      { name: 'Workshops', href: '#services' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Work', href: '#work' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact', href: '#contact' },
    ],
    resources: [
      { name: 'Case Studies', href: '#work' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      href: 'https://linkedin.com',
      color: 'hover:bg-[#0077B5]',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: 'https://twitter.com',
      color: 'hover:bg-[#1DA1F2]',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      href: 'https://github.com',
      color: 'hover:bg-[#333]',
    },
    {
      name: 'Dribbble',
      icon: FaDribbble,
      href: 'https://dribbble.com',
      color: 'hover:bg-[#EA4C89]',
    },
    {
      name: 'Behance',
      icon: FaBehance,
      href: 'https://behance.net',
      color: 'hover:bg-[#1769FF]',
    },
  ]

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: 'hello@aymantaher.com',
      href: 'mailto:hello@aymantaher.com',
    },
    {
      icon: FaPhone,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: FaMapMarkerAlt,
      text: 'San Francisco, CA',
      href: '#',
    },
  ]

  return (
    <footer className="bg-dark-500 border-t border-dark-300" id="contact">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-bold mb-4">
                Hello, I'm{' '}
                <span className="gradient-text">Ayman Taher</span>
              </h3>
              <p className="text-neutral-400 mb-6 max-w-md">
                A passionate product designer and developer helping businesses
                create exceptional digital experiences through innovative
                design and technology.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-3 text-neutral-400 hover:text-primary transition-colors duration-200 group"
                  >
                    <contact.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{contact.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Services */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Services</h4>
                  <ul className="space-y-3">
                    {footerLinks.services.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Company</h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-300 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Ayman Taher. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
