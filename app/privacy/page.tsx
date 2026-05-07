import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | GetToTheGate',
  description: 'Privacy Policy for GetToTheGate.com — how we collect, use, and protect your information.',
  alternates: {
    canonical: 'https://gettothegate.com/privacy/',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <main>
      <section style={{ backgroundColor: 'var(--black)', padding: '60px 0 40px' }}>
        <div className="container">
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 7vw, 72px)',
            letterSpacing: '2px',
            color: 'var(--white)',
            marginBottom: '12px',
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            Last updated: May 6, 2026
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '48px 24px 80px', maxWidth: '800px' }}>
        <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--black)' }}>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>1. Introduction</h2>
          <p>GetToTheGate.com ("we," "us," or "our") operates the website located at gettothegate.com (the "Site"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>2. Information We Collect</h2>
          <p style={{ marginBottom: '12px' }}>We may collect information about you in the following ways:</p>
          <p style={{ marginBottom: '12px' }}><strong>Information you provide:</strong> When you sign up for parking alerts or contact us, we collect your email address and any other information you choose to provide.</p>
          <p style={{ marginBottom: '12px' }}><strong>Automatically collected information:</strong> When you visit our Site, we automatically collect certain information about your device and usage, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates and times of your visits.</p>
          <p><strong>Cookies and tracking technologies:</strong> We use cookies and similar tracking technologies to track activity on our Site and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: '12px' }}>We use the information we collect to:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>Operate and improve our Site</li>
            <li style={{ marginBottom: '8px' }}>Send you parking alerts and updates you have requested</li>
            <li style={{ marginBottom: '8px' }}>Analyze usage patterns to improve user experience</li>
            <li style={{ marginBottom: '8px' }}>Comply with legal obligations</li>
            <li style={{ marginBottom: '8px' }}>Prevent fraudulent activity and ensure Site security</li>
          </ul>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>4. Affiliate Disclosure</h2>
          <p>GetToTheGate.com participates in affiliate marketing programs. This means we may earn a commission when you click on links to parking services such as SpotHero, ParkWhiz, Parking Access, and others, and complete a purchase or reservation. This comes at no additional cost to you. We only recommend services we believe provide value to our users.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>5. Third-Party Services</h2>
          <p style={{ marginBottom: '12px' }}>We use the following third-party services that may collect information about you:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}><strong>Google Analytics:</strong> We use Google Analytics to analyze Site traffic and usage. Google may collect and process data about your use of our Site. You can opt out by installing the Google Analytics opt-out browser add-on.</li>
            <li style={{ marginBottom: '8px' }}><strong>Parking affiliate partners:</strong> When you click affiliate links to SpotHero, ParkWhiz, Parking Access, Airport Parking Reservations, or other partners, you are subject to their respective privacy policies.</li>
            <li style={{ marginBottom: '8px' }}><strong>Cloudflare:</strong> We use Cloudflare for security and performance. Cloudflare may collect certain information as part of its service.</li>
          </ul>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>6. Cookies</h2>
          <p>Our Site uses cookies to enhance your experience. Cookies are small data files stored on your device. We use cookies for analytics and to remember your preferences. You can control cookie settings through your browser. Note that disabling cookies may affect the functionality of our Site.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>7. Data Retention</h2>
          <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Email addresses collected for parking alerts are retained until you unsubscribe.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>8. Your Rights</h2>
          <p style={{ marginBottom: '12px' }}>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
            <li style={{ marginBottom: '8px' }}>The right to access the personal information we hold about you</li>
            <li style={{ marginBottom: '8px' }}>The right to request correction of inaccurate information</li>
            <li style={{ marginBottom: '8px' }}>The right to request deletion of your personal information</li>
            <li style={{ marginBottom: '8px' }}>The right to opt out of marketing communications</li>
          </ul>
          <p>To exercise any of these rights, please contact us at michael@gettothegate.com.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>9. Children's Privacy</h2>
          <p>Our Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date. Your continued use of the Site after any changes constitutes your acceptance of the new policy.</p>

          <h2 style={{ fontSize: '20px', fontWeight: '600', marginTop: '40px', marginBottom: '12px' }}>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <div style={{ marginTop: '16px', padding: '24px', backgroundColor: 'var(--surface-alt)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <p style={{ marginBottom: '4px' }}><strong>GetToTheGate.com</strong></p>
            <p style={{ marginBottom: '4px' }}>Email: <a href="mailto:michael@gettothegate.com">michael@gettothegate.com</a></p>
            <p>Website: <a href="https://gettothegate.com">gettothegate.com</a></p>
          </div>

        </div>
      </div>
    </main>
  )
}