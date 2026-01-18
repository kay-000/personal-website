import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import emailjs from '@emailjs/browser';
import '../styles/ContactForm.css';

interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

const ContactForm: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Bot trap
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessage('');
    setStatus('idle');
  };

  const validateForm = () => {
    // Check honeypot (bots will fill this)
    if (honeypot) return false;

    // Must be logged in
    if (!user) return false;

    // Validate message (no excessive length, no scripts)
    if (message.length < 10 || message.length > 5000) return false;
    if (/<script|javascript:|onerror=/i.test(message)) return false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      // Get current timestamp
      const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // EmailJS configuration - using verified Google account info
      const result = await emailjs.send(
        'service_u9imagc',  // EmailJS service ID
        'template_rrmqcfd', // EmailJS template ID
        {
          from_name: user!.name,         // Verified by Google
          from_email: user!.email,       // Verified by Google
          message: message,
          to_email: 'kmcfarla@andrew.cmu.edu',
          subject: '🌐 New message from personal website (Verified)',
          time: timestamp,
        },
        'hJSi7-1hPJSi3HJWC' // EmailJS public key
      );

      console.log('Email sent successfully:', result);
      setStatus('success');
      // Clear form
      // setName('');
      // setEmail('');
      setMessage('');
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Show login if not authenticated
  if (!user) {
    return (
      <div className="contact-form">
        <p style={{ marginBottom: '15px', textAlign: 'center' }}>
          Sign in with Google to send a verified message
        </p>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.error('Login Failed');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
          }}
          useOneTap
        />
        {status === 'error' && (
          <div className="status-message error" style={{ marginTop: '15px' }}>
            Login failed. Please try again.
          </div>
        )}
      </div>
    );
  }

  // Show contact form for authenticated users
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Honeypot field - hidden from users, bots will fill it */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Show logged in user info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        {user.picture && <img src={user.picture} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold' }}>{user.name}</div>
          <div style={{ fontSize: '14px', color: '#666' }}>{user.email}</div>
        </div>
        <button type="button" onClick={handleLogout} style={{ padding: '5px 10px', fontSize: '14px' }}>
          Logout
        </button>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (10-5000 characters)"
        required
        minLength={10}
        maxLength={5000}
        disabled={status === 'sending'}
      />

      {status === 'success' && (
        <div className="status-message success">Message sent successfully! ✓</div>
      )}
      {status === 'error' && (
        <div className="status-message error">Failed to send message. Please check your input and try again.</div>
      )}

      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm;