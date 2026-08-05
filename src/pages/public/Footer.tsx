import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../../components/BrandLogo';

type FooterLink = {
  label: string;
  to: string;
};

const companyLinks: FooterLink[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Popular Routes', to: '/routes' },
  { label: 'Bus Operators', to: '/operators' },
  { label: 'Careers', to: '/careers' },
];

const supportLinks: FooterLink[] = [
  { label: 'Help Center', to: '/help-center' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Cancellation Policy', to: '/cancellation-policy' },
];

const legalLinks: FooterLink[] = [
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Cookie Policy', to: '/cookies' },
  { label: 'Accessibility', to: '/accessibility' },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex">
              <BrandLogo imageWidth={176} imageHeight={58} style={{ marginBottom: '16px' }} />
            </Link>
            <p className="max-w-sm text-sm leading-6 text-white/70">
              Modern bus ticketing, tracking, and subscriptions across Rwanda.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F4A261]">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link className="text-sm text-white/70 transition hover:text-[#F4A261]" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F4A261]">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link className="text-sm text-white/70 transition hover:text-[#F4A261]" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F4A261]">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link className="text-sm text-white/70 transition hover:text-[#F4A261]" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/65">© {new Date().getFullYear()} SafariTix. All rights reserved.</p>
          <p className="text-sm text-white/65">info@safaritix.rw · +250 793 216 602</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
