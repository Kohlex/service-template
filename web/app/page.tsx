'use client'

const serviceName = process.env.SERVICE_NAME || 'Kohlex Service'
const serviceSlug = process.env.SERVICE_SLUG || 'service'

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '600px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'white',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem'
        }}>
          🚀
        </div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          margin: '0 0 1rem',
          letterSpacing: '-0.02em'
        }}>
          {serviceName}
        </h1>

        <p style={{
          fontSize: '1.1rem',
          opacity: 0.9,
          margin: '0 0 2rem',
          lineHeight: 1.6
        }}>
          This service has been successfully provisioned and is ready for development.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href={`/${serviceSlug}/api/health`}
            style={{
              background: 'white',
              color: '#667eea',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'transform 0.2s'
            }}
          >
            Check API Health
          </a>
          <a
            href="https://kohlex.ai"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            Back to Kohlex
          </a>
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          Part of the Kohlex Platform
        </p>
      </div>
    </div>
  )
}
