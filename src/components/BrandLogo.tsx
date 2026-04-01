import React, { CSSProperties } from 'react';

type BrandLogoProps = {
  imageWidth?: number | string;
  imageHeight?: number | string;
  showTagline?: boolean;
  tagline?: string;
  taglineColor?: string;
  align?: 'left' | 'center';
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  taglineStyle?: CSSProperties;
  className?: string;
};

const resolveSize = (value: number | string | undefined, fallback: string) => {
  if (typeof value === 'number') return `${value}px`;
  return value || fallback;
};

export default function BrandLogo({
  imageWidth = 168,
  imageHeight = 56,
  showTagline = false,
  tagline = '',
  taglineColor = '#6B7280',
  align = 'left',
  style,
  imageStyle,
  taglineStyle,
  className,
}: BrandLogoProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        justifyContent: 'center',
        gap: showTagline ? '4px' : 0,
        textDecoration: 'none',
        ...style,
      }}
    >
      <img
        src="/images/SafariTix-Logo.png"
        alt="SafariTix"
        style={{
          width: resolveSize(imageWidth, '168px'),
          height: resolveSize(imageHeight, '56px'),
          objectFit: 'contain',
          display: 'block',
          maxWidth: '100%',
          ...imageStyle,
        }}
      />
      {showTagline ? (
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: taglineColor,
            textTransform: 'uppercase',
            lineHeight: 1.1,
            ...taglineStyle,
          }}
        >
          {tagline}
        </span>
      ) : null}
    </div>
  );
}
