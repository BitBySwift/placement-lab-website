'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { validateContactForm, sanitizeInput } from '@/services/validators';
import { SOCIAL_LINKS } from '@/utils/constants';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message),
    };

    const validation = validateContactForm(sanitized);
    if (!validation.isValid) {
      toast.error(validation.error!);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/emails/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Info */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
        <div className="space-y-4 mb-8">
          {[
            { icon: '📧', label: 'Email', value: 'hello@placementlab.com' },
            { icon: '📱', label: 'Phone', value: '+91 98765 43210' },
            { icon: '📍', label: 'Location', value: 'India (Remote)' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 glass-card p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-gray-400 text-sm">{item.label}</div>
                <div className="text-white font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 w-full justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.285 7.034L.785 23.25l4.305-1.468A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.724 1.273 1.238-3.618-.234-.371A9.818 9.818 0 1112 21.818z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Your Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell us about your goals..."
            rows={5}
            className="input-field resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Sending...' : '📨 Send Message'}
        </button>
      </form>
    </div>
  );
}
