import React from 'react';

const SIZES = '(min-width: 1024px) 540px, 90vw';
const srcSet = (ext) =>
  `/images/portrait-480.${ext} 480w, /images/portrait-720.${ext} 720w, /images/portrait-960.${ext} 960w`;

// Responsive AVIF/WebP portrait. `priority` marks the above-the-fold hero use.
export default function Portrait({ priority = false, className = '', style }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={SIZES} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={SIZES} />
      <img
        src="/images/portrait-720.webp"
        alt="Portrait of Naresh B A"
        width={960}
        height={1280}
        sizes={SIZES}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        draggable={false}
        className={className}
        style={style}
      />
    </picture>
  );
}
