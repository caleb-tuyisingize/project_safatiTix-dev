import React, { CSSProperties, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './header';
import {
  Ticket,
  MapPin,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  Clock,
  Shield,
  Smartphone,
  Bus,
  CheckCircle,
  XCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  Quote,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';

interface LandingPageProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export function LandingPage({ onLoginClick, onSignupClick }: LandingPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'commuters' | 'companies'>('commuters');

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/app/login');
    }
  };

  const handleSignupClick = () => {
    if (onSignupClick) {
      onSignupClick();
    } else {
      navigate('/app/signup');
    }
  };

  const coreServices = [
    {
      icon: Ticket,
      title: 'Instant Ticket Booking',
      description: 'Book your bus seat in seconds. Choose from multiple routes, select your preferred seat, and get instant confirmation with a digital ticket.',
      color: '#0077B6'
    },
    {
      icon: MapPin,
      title: 'Real-Time Bus Tracking',
      description: 'Track your bus live on the map. See exact location, estimated arrival time, and never miss your ride with smart notifications.',
      color: '#27AE60'
    },
    {
      icon: XCircle,
      title: 'Easy Cancellations',
      description: 'Plans changed? Cancel or reschedule your ticket up to 10 minutes before departure with instant refunds to your wallet.',
      color: '#E63946'
    },
    {
      icon: CreditCard,
      title: 'Secure Mobile Payments',
      description: 'Pay safely with MTN Mobile Money, Airtel Money, or credit/debit cards. All transactions are encrypted and PCI-compliant.',
      color: '#F4A261'
    }
  ];

  const commuterBenefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'No more queuing at bus stations. Book from anywhere in 30 seconds.'
    },
    {
      icon: Shield,
      title: 'Travel with Confidence',
      description: 'Official RURA-certified routes. Verified bus companies. Guaranteed seats.'
    },
    {
      icon: Smartphone,
      title: 'Digital Tickets',
      description: 'QR code tickets on your phone. No paper, no hassle, just scan and board.'
    },
    {
      icon: Award,
      title: 'Loyalty Rewards',
      description: 'Earn points on every trip. Redeem for discounts and free rides.'
    }
  ];

  const companyBenefits = [
    {
      icon: TrendingUp,
      title: 'Increase Revenue',
      description: 'Fill more seats with online bookings. Reduce no-shows by 70%.'
    },
    {
      icon: Users,
      title: 'Reach More Passengers',
      description: 'Get discovered by thousands of daily commuters searching for routes.'
    },
    {
      icon: Calendar,
      title: 'Smart Fleet Management',
      description: 'Real-time dashboard to manage schedules, drivers, and buses efficiently.'
    },
    {
      icon: CheckCircle,
      title: 'Automated Operations',
      description: 'Digital check-ins, automated ticketing, and instant payment settlements.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Search Your Route',
      description: 'Enter your departure and destination cities. Select your travel date and number of passengers.',
      icon: MapPin
    },
    {
      step: '2',
      title: 'Choose Your Bus',
      description: 'Browse available trips with prices, departure times, and bus amenities. Pick your preferred seat.',
      icon: Bus
    },
    {
      step: '3',
      title: 'Pay Securely',
      description: 'Complete payment via Mobile Money or card. Receive instant confirmation and digital ticket.',
      icon: CreditCard
    },
    {
      step: '4',
      title: 'Board & Travel',
      description: 'Show your QR code ticket to the driver. Track your bus in real-time and enjoy your journey.',
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: 'Jean Claude Uwimana',
      role: 'Business Executive, Kigali',
      avatar: 'JC',
      comment: 'SafariTix has transformed my daily commute. I book my seat from the office, track the bus, and never waste time waiting. The app is incredibly reliable.',
      rating: 5,
      verified: true
    },
    {
      name: 'Marie Claire Mugabo',
      role: 'Transport Company Owner',
      avatar: 'MC',
      comment: 'Since joining SafariTix, our occupancy rate increased by 85%. The platform brings us customers we would never reach. Payment settlement is instant and transparent.',
      rating: 5,
      verified: true
    },
    {
      name: 'Patrick Nkusi',
      role: 'University Student, Huye',
      avatar: 'PN',
      comment: 'As a student traveling weekly between Huye and Kigali, SafariTix saves me money and stress. I love the student discounts and the ability to choose window seats!',
      rating: 5,
      verified: true
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Users' },
    { value: '200+', label: 'Bus Companies' },
    { value: '15,000+', label: 'Daily Bookings' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  const styles: Record<string, CSSProperties> = {
    // Layout
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 20px',
      position: 'relative',
      zIndex: 1,
    },
    
    // Hero Section
    heroSection: {
      background: 'linear-gradient(145deg, #0B5F8E 0%, #0A6FA5 35%, #074163 100%)',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '72px',
      paddingBottom: '88px',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        'radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 36%), radial-gradient(circle at right center, rgba(244,162,97,0.12), transparent 28%), url("data:image/svg+xml,%3Csvg width=\'120\' height=\'120\' viewBox=\'0 0 120 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23ffffff\' stroke-opacity=\'0.08\' stroke-width=\'1\'%3E%3Cpath d=\'M20 28h80M20 60h80M20 92h80\'/%3E%3Cpath d=\'M32 16v88M60 16v88M88 16v88\'/%3E%3C/g%3E%3C/svg%3E")',
      opacity: 0.45,
    },
    heroContent: {
      textAlign: 'center',
      maxWidth: '860px',
      margin: '0 auto 34px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2,
    },
    largeLogo: {
      marginBottom: '18px',
      display: 'inline-flex',
      justifyContent: 'center',
    },
    logoImage: {
      filter: 'brightness(0) invert(1) drop-shadow(0 10px 22px rgba(0,0,0,0.22))',
    },
    slogan: {
      fontSize: 'clamp(1rem, 2.4vw, 1.3rem)',
      fontWeight: '600',
      color: '#D8F0FF',
      marginBottom: '18px',
      letterSpacing: '1px',
      fontStyle: 'italic',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.18)',
    },
    heroTitle: {
      fontSize: 'clamp(2.9rem, 6.2vw, 5.3rem)',
      fontWeight: '900',
      lineHeight: '1.02',
      marginBottom: '20px',
      textShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
      letterSpacing: '-0.04em',
      fontFamily: 'Montserrat, Inter, sans-serif',
    },
    heroSubtitle: {
      fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      lineHeight: '1.6',
      color: 'rgba(255, 255, 255, 0.93)',
      marginBottom: '28px',
      maxWidth: '620px',
    },
    ctaButtons: {
      display: 'flex',
      gap: '14px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '34px',
      width: '100%',
    },
    primaryCTA: {
      background: '#0077B6',
      color: '#FFFFFF',
      border: '1px solid rgba(255,255,255,0.16)',
      borderRadius: '999px',
      padding: '18px 28px',
      fontSize: '1rem',
      fontWeight: '800',
      cursor: 'pointer',
      boxShadow: '0 14px 28px rgba(0, 119, 182, 0.28)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      minWidth: '216px',
    },
    secondaryCTA: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.22)',
      borderRadius: '999px',
      padding: '18px 28px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      minWidth: '182px',
    },
    statsBar: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '18px',
      background: 'rgba(255, 255, 255, 0.09)',
      backdropFilter: 'blur(14px)',
      borderRadius: '24px',
      padding: '24px 22px',
      border: '1px solid rgba(255, 255, 255, 0.16)',
      position: 'relative',
      zIndex: 2,
    },
    statItem: {
      textAlign: 'center',
    },
    statValue: {
      fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
      fontWeight: '900',
      color: '#FDE7C9',
      marginBottom: '6px',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.9)',
      fontWeight: '600',
      letterSpacing: '0.02em',
    },
    heroIllustration: {
      position: 'absolute',
      right: '4%',
      bottom: '18px',
      width: '180px',
      height: '120px',
      borderRadius: '28px',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
      border: '1px solid rgba(255,255,255,0.16)',
      boxShadow: '0 24px 50px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      color: '#FFFFFF',
      opacity: 0.9,
      zIndex: 1,
      pointerEvents: 'none',
    },
    heroIllustrationLabel: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.85)',
    },

    // Sections Common
    sectionPadding: {
      padding: '100px 20px',
    },
    sectionHeader: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 60px',
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '800',
      color: '#2B2D42',
      marginBottom: '16px',
      lineHeight: '1.2',
    },
    sectionSubtitle: {
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: '#6b7280',
      lineHeight: '1.6',
    },

    // Services
    servicesSection: {
      background: '#F5F7FA',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    serviceCard: {
      background: '#FFFFFF',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
    },
    serviceIconWrapper: {
      width: '72px',
      height: '72px',
      borderRadius: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      transition: 'transform 0.3s ease',
    },
    serviceTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2B2D42',
      marginBottom: '12px',
    },
    serviceDescription: {
      fontSize: '1rem',
      color: '#6b7280',
      lineHeight: '1.6',
    },

    // Benefits
    benefitsSection: {
      background: '#FFFFFF',
    },
    benefitsTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '60px',
      flexWrap: 'wrap',
    },
    tabButton: {
      padding: '16px 32px',
      borderRadius: '50px',
      border: '2px solid #e5e7eb',
      background: '#FFFFFF',
      color: '#2B2D42',
      fontSize: '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    tabButtonActive: {
      background: '#0077B6',
      color: '#FFFFFF',
      borderColor: '#0077B6',
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '24px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    benefitCard: {
      background: '#F5F7FA',
      borderRadius: '20px',
      padding: '32px',
      transition: 'all 0.3s ease',
    },
    benefitIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '14px',
      background: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    benefitTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#2B2D42',
      marginBottom: '10px',
    },
    benefitDescription: {
      fontSize: '0.938rem',
      color: '#6b7280',
      lineHeight: '1.6',
    },

    // How It Works
    howItWorksSection: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '40px',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
    },
    stepCard: {
      background: '#FFFFFF',
      borderRadius: '20px',
      padding: '36px',
      textAlign: 'center',
      position: 'relative',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
    },
    stepNumber: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #0077B6 0%, #005a8c 100%)',
      color: '#FFFFFF',
      fontSize: '1.75rem',
      fontWeight: '900',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: '0 8px 16px rgba(0, 119, 182, 0.3)',
    },
    stepIcon: {
      width: '48px',
      height: '48px',
      margin: '0 auto 20px',
      color: '#0077B6',
    },
    stepTitle: {
      fontSize: '1.375rem',
      fontWeight: '700',
      color: '#2B2D42',
      marginBottom: '12px',
    },
    stepDescription: {
      fontSize: '0.938rem',
      color: '#6b7280',
      lineHeight: '1.6',
    },

    // Testimonials
    testimonialsSection: {
      background: '#FFFFFF',
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    testimonialCard: {
      background: '#F5F7FA',
      borderRadius: '24px',
      padding: '40px',
      position: 'relative',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
    },
    quoteIcon: {
      position: 'absolute',
      top: '20px',
      right: '24px',
      width: '40px',
      height: '40px',
      color: '#0077B6',
      opacity: 0.2,
    },
    testimonialHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '24px',
    },
    avatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #0077B6 0%, #005a8c 100%)',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      fontWeight: '700',
    },
    testimonialInfo: {
      flex: 1,
    },
    testimonialName: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#2B2D42',
      marginBottom: '4px',
    },
    testimonialRole: {
      fontSize: '0.875rem',
      color: '#6b7280',
    },
    stars: {
      display: 'flex',
      gap: '4px',
      marginBottom: '20px',
    },
    testimonialComment: {
      fontSize: '1rem',
      color: '#2B2D42',
      lineHeight: '1.7',
      fontStyle: 'italic',
      marginBottom: '16px',
    },
    verifiedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: '#27AE60',
      color: '#FFFFFF',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },

    // CTA Banner
    ctaBannerSection: {
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #0077B6 0%, #005a8c 100%)',
      color: '#FFFFFF',
      textAlign: 'center',
    },
    ctaBannerTitle: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: '900',
      marginBottom: '24px',
      lineHeight: '1.2',
    },
    ctaBannerSubtitle: {
      fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
      color: 'rgba(255, 255, 255, 0.95)',
      marginBottom: '40px',
      maxWidth: '700px',
      margin: '0 auto 40px',
    },
    ctaBannerButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },

    // App Badges
    appBadgesSection: {
      padding: '60px 20px',
      background: '#FFFFFF',
      textAlign: 'center',
    },
    appBadgesTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2B2D42',
      marginBottom: '32px',
    },
    appBadges: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    appBadge: {
      background: '#2B2D42',
      color: '#FFFFFF',
      padding: '12px 24px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      minWidth: '200px',
    },
    appStoreIcon: { width: '32px', height: '32px' },
    badgeSubText: { fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' },
    badgeMainText: { fontSize: '1.125rem', fontWeight: '700' },

    // Footer
    footer: {
      padding: '80px 20px 30px',
      background: '#2B2D42',
      color: '#FFFFFF',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px',
      marginBottom: '60px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerBrand: {
      maxWidth: '300px',
    },
    footerLogo: {
      marginBottom: '20px',
      filter: 'brightness(0) invert(1)',
    },
    footerDescription: {
      fontSize: '0.938rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    socialIcons: {
      display: 'flex',
      gap: '12px',
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    footerTitle: {
      fontSize: '1.125rem',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#F4A261', // Brand Orange for accents
    },
    footerLinks: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.8)',
      textDecoration: 'none',
      display: 'block',
      padding: '8px 0',
      fontSize: '0.938rem',
      transition: 'color 0.2s',
      cursor: 'pointer',
    },
    footerBottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '30px',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerBottomContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    copyright: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    footerBottomLinks: {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap',
    },
  };

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroGlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.72; }
          50% { transform: translate3d(0, -8px, 0) scale(1.02); opacity: 0.95; }
        }
        .hero-reveal {
          opacity: 0;
          animation: heroFadeUp 0.8s ease forwards;
        }
        .hero-delay-1 { animation-delay: 0.08s; }
        .hero-delay-2 { animation-delay: 0.18s; }
        .hero-delay-3 { animation-delay: 0.28s; }
        .hero-delay-4 { animation-delay: 0.38s; }
        .hero-cta {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }
        .hero-cta:hover {
          transform: translateY(-2px);
        }
        .hero-illustration {
          animation: heroGlow 6s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .hero-cta-group {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-cta {
            width: 100%;
            min-width: 0 !important;
          }
          .hero-stats {
            display: none !important;
          }
          .hero-illustration {
            display: none;
          }
        }
      `}</style>
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div className="hero-reveal hero-delay-1" style={styles.largeLogo}>
              <BrandLogo
                align="center"
                imageWidth={520}
                imageHeight={170}
                style={{ ...styles.logoImage, width: '100%' }}
                imageStyle={styles.logoImage}
              />
            </div>
            <div className="hero-reveal hero-delay-2" style={styles.slogan}>On Time, Every Time.</div>

            <h1 className="hero-reveal hero-delay-3" style={styles.heroTitle}>
              Rwanda's premium
              <br />
              <span style={{ color: '#F4A261' }}>Bus Ticketing Platform</span>
            </h1>
            <p className="hero-reveal hero-delay-3" style={styles.heroSubtitle}>
              Book tickets instantly, track buses in real-time, and travel smarter across Rwanda.
              Join 50,000+ passengers who book with confidence every day.
            </p>

            <div className="hero-cta-group hero-reveal hero-delay-4" style={styles.ctaButtons}>
              <button
                onClick={handleSignupClick}
                style={styles.primaryCTA}
                className="hero-cta"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 18px 36px rgba(0, 119, 182, 0.32)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 14px 28px rgba(0, 119, 182, 0.28)';
                }}
              >
                Book Ticket Now
                <ArrowRight size={20} />
              </button>
              <button
                onClick={handleLoginClick}
                style={styles.secondaryCTA}
                className="hero-cta"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.36)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                }}
              >
                <Bus size={18} />
                Track Bus
              </button>
            </div>
          </div>

          <div className="hero-illustration" style={styles.heroIllustration}>
            <div style={styles.heroIllustrationLabel}>Live Fleet</div>
            <Bus size={42} strokeWidth={1.8} />
            <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Real-time tracking</div>
          </div>

          <div className="hero-stats" style={styles.statsBar}>
            {stats.map((stat, idx) => (
              <div key={idx} style={styles.statItem}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section style={{ ...styles.sectionPadding, ...styles.servicesSection }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Everything You Need in One Platform</h2>
            <p style={styles.sectionSubtitle}>
              SafariTix brings convenience, reliability, and modern technology to bus travel in Rwanda
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {coreServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  style={styles.serviceCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                    e.currentTarget.style.borderColor = service.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ ...styles.serviceIconWrapper, background: `${service.color}15` }}>
                    <Icon size={36} color={service.color} />
                  </div>
                  <h3 style={styles.serviceTitle}>{service.title}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ ...styles.sectionPadding, ...styles.benefitsSection }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Why Choose SafariTix?</h2>
            <p style={styles.sectionSubtitle}>
              Built for commuters and bus companies with features that matter
            </p>
          </div>

          {/* Tabs */}
          <div style={styles.benefitsTabs}>
            <button
              style={{
                ...styles.tabButton,
                ...(activeTab === 'commuters' ? styles.tabButtonActive : {}),
              }}
              onClick={() => setActiveTab('commuters')}
            >
              For Passengers
            </button>
            <button
              style={{
                ...styles.tabButton,
                ...(activeTab === 'companies' ? styles.tabButtonActive : {}),
              }}
              onClick={() => setActiveTab('companies')}
            >
              For Bus Companies
            </button>
          </div>

          {/* Benefits Grid */}
          <div style={styles.benefitsGrid}>
            {(activeTab === 'commuters' ? commuterBenefits : companyBenefits).map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  style={styles.benefitCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F5F7FA';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.benefitIcon}>
                    <Icon size={28} color="#0077B6" />
                  </div>
                  <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                  <p style={styles.benefitDescription}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ ...styles.sectionPadding, ...styles.howItWorksSection }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>How SafariTix Works</h2>
            <p style={styles.sectionSubtitle}>
              Book your ticket in 4 simple steps – it takes less than 2 minutes
            </p>
          </div>

          <div style={styles.stepsGrid}>
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} style={styles.stepCard}>
                  <div style={styles.stepNumber}>{step.step}</div>
                  <div style={styles.stepIcon}>
                    <Icon size={48} />
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ ...styles.sectionPadding, ...styles.testimonialsSection }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Trusted by Thousands Across Rwanda</h2>
            <p style={styles.sectionSubtitle}>
              See what our users say about their SafariTix experience
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} style={styles.testimonialCard}>
                <Quote style={styles.quoteIcon} />
                <div style={styles.testimonialHeader}>
                  <div style={styles.avatar}>{testimonial.avatar}</div>
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
                <div style={styles.stars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#F4A261" color="#F4A261" />
                  ))}
                </div>
                <p style={styles.testimonialComment}>"{testimonial.comment}"</p>
                {testimonial.verified && (
                  <div style={styles.verifiedBadge}>
                    <CheckCircle size={14} />
                    Verified Passenger
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={styles.ctaBannerSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaBannerTitle}>Ready to Travel Smarter?</h2>
          <p style={styles.ctaBannerSubtitle}>
            Join thousands of passengers booking with SafariTix every day. Your next journey is just a tap away.
          </p>
          <div style={styles.ctaBannerButtons}>
            <button
              onClick={handleSignupClick}
              style={{
                ...styles.primaryCTA,
                background: '#F4A261',
                fontSize: '1.25rem',
                padding: '20px 48px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(244, 162, 97, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(244, 162, 97, 0.4)';
              }}
            >
              Create Free Account
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section style={styles.appBadgesSection}>
        <div style={styles.container}>
          <h3 style={styles.appBadgesTitle}>Download the SafariTix Mobile App</h3>
          <div style={styles.appBadges}>
            {/* Apple App Store Badge */}
            <div
              style={styles.appBadge}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <svg style={styles.appStoreIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div style={styles.badgeSubText}>Download on the</div>
                <div style={styles.badgeMainText}>App Store</div>
              </div>
            </div>

            {/* Google Play Badge */}
            <div
              style={styles.appBadge}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <svg style={styles.appStoreIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.6.4-1.1 1-1.1.2 0 .4.1.6.2l14.8 8.5c.5.3.7.9.4 1.4-.1.2-.3.4-.5.5L4.5 21.5c-.5.3-1.1.1-1.4-.4-.1-.2-.1-.4-.1-.6zm2-1.8l9.6-5.5L5 8.1v10.6zm0-12.7l9.6 5.5 2.1-1.2L5 4.8v1.2z"/>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div style={styles.badgeSubText}>GET IT ON</div>
                <div style={styles.badgeMainText}>Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerGrid}>
            <div style={styles.footerBrand}>
              <div style={styles.footerLogo}>
                <BrandLogo imageWidth={200} imageHeight={66} />
              </div>
              <p style={styles.footerDescription}>
                Transforming bus travel in Rwanda. SafariTix provides a fast, secure, and reliable way to book tickets and manage your journey.
              </p>
              <div style={styles.socialIcons}>
                <div style={styles.socialIcon}><Facebook size={20} /></div>
                <div style={styles.socialIcon}><Twitter size={20} /></div>
                <div style={styles.socialIcon}><Instagram size={20} /></div>
                <div style={styles.socialIcon}><Linkedin size={20} /></div>
              </div>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Quick Links</h4>
              <ul style={styles.footerLinks}>
              <li><Link to="/about" style={styles.footerLink}>About Us</Link></li>
              <li><Link to="/routes" style={styles.footerLink}>Popular Routes</Link></li>
              <li><Link to="/operators" style={styles.footerLink}>Bus Operators</Link></li>
              <li><Link to="/careers" style={styles.footerLink}>Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Support</h4>
              <ul style={styles.footerLinks}>
              <li><Link to="/help-center" style={styles.footerLink}>Help Center</Link></li>
              <li><Link to="/faqs" style={styles.footerLink}>FAQs</Link></li>
              <li><Link to="/contact" style={styles.footerLink}>Contact Us</Link></li>
              <li><Link to="/cancellation-policy" style={styles.footerLink}>Cancellation Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Legal</h4>
              <ul style={styles.footerLinks}>
              <li><Link to="/terms" style={styles.footerLink}>Terms of Service</Link></li>
              <li><Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link to="/cookies" style={styles.footerLink}>Cookie Policy</Link></li>
              <li><Link to="/accessibility" style={styles.footerLink}>Accessibility</Link></li>
              </ul>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={styles.footerBottomContent}>
              <div style={styles.copyright}>
                © {new Date().getFullYear()} SafariTix. All rights reserved.
              </div>
              <div style={styles.footerBottomLinks}>
                <span style={styles.copyright}>Made with ❤️ in Rwanda</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
