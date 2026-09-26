import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const alt = 'Samuel Baldasso · Mid-Level Android Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = (locale === 'en' ? 'en' : 'pt-BR') as 'pt-BR' | 'en';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#090d16',
          color: '#f8fafc',
          padding: 64,
          fontFamily: 'sans-serif',
          border: '12px solid #1e293b',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#064e3b',
              color: '#3ddc84',
              padding: '8px 20px',
              borderRadius: 24,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Android Native · Kotlin · Jetpack Compose
          </div>
          <div style={{ color: '#94a3b8', fontSize: 20 }}>github.com/samuelbaldasso</div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {profile.fullName}
          </div>
          <div style={{ fontSize: 28, color: '#3ddc84', fontWeight: 600 }}>
            {profile.headline[typedLocale]}
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {profile.valueProposition[typedLocale]}
          </div>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: 'flex', gap: 14 }}>
          {[
            'Clean Architecture',
            'MVI / UDF',
            'Offline-First',
            'Dagger Hilt',
            'Room Database',
            'Turbine',
          ].map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: '#1a233a',
                color: '#cbd5e1',
                padding: '8px 16px',
                borderRadius: 12,
                fontSize: 16,
                border: '1px solid #334155',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
