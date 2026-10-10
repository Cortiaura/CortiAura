import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

/**
 * Branded social preview image (1200×630) for each article, shown when a link is
 * shared on LinkedIn, Facebook, WhatsApp or X.
 * Usage: /api/og?title=<article title>&label=<small label above the title>
 */
export default async function handler(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const title = (searchParams.get('title') || 'The gut–brain connection, explained').slice(0, 120);
  const label = (searchParams.get('label') || 'New on the blog').slice(0, 40);

  const [garamond, instrument] = await Promise.all([
    fetch(`${origin}/fonts/eb-garamond-latin-500-normal.woff`).then((r) => r.arrayBuffer()),
    fetch(`${origin}/fonts/instrument-sans-latin-600-normal.woff`).then((r) => r.arrayBuffer()),
  ]);
  const titleSize = title.length > 70 ? 60 : title.length > 45 ? 70 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: '#680238',
          color: '#FFFFFF',
          fontFamily: 'Instrument Sans',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -140,
            top: 75,
            width: 480,
            height: 480,
            borderRadius: 240,
            background: '#970148',
            display: 'flex',
          }}
        />
        <img
          src={`${origin}/assets/symbol-white-plain.svg`}
          width={150}
          height={145}
          style={{ position: 'absolute', right: 25, top: 243 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, letterSpacing: 4, color: '#FBDDCF' }}>
            <div style={{ width: 48, height: 2, background: '#FBDDCF', marginRight: 16, display: 'flex' }} />
            {label.toUpperCase()}
          </div>
          <div style={{ fontFamily: 'EB Garamond', fontSize: titleSize, lineHeight: 1.05, display: 'flex' }}>{title}</div>
          <div style={{ display: 'flex', fontSize: 26, color: '#FBDDCF' }}>cortiaura.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'EB Garamond', data: garamond, weight: 500, style: 'normal' },
        { name: 'Instrument Sans', data: instrument, weight: 600, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    }
  );
}
