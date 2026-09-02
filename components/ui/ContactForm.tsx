'use client';
import { useState } from 'react';

/**
 * Feedback form. Submitting opens a pre-filled GitHub discussion-backed issue
 * so visitors can leave feedback, request a company, suggest a feature, or
 * get in contact without leaving the galaxy. Point REPO_FEEDBACK_URL at the
 * published repository before going live; the placeholder keeps the code
 * functional until then.
 */
export const REPO_FEEDBACK_URL =
  'https://github.com/LaFlare1017/enterprise-ai-galaxy/issues/new';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const inputClass =
    'w-full rounded-md border border-border-subtle bg-void/80 px-3 py-2.5 text-sm text-star-bright outline-none transition-colors placeholder:text-ui-muted/85 focus:border-star-dim';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Pre-fill happens only at submit time: the title and body are assembled
    // from the fields, so no message text sits in the markup or the bundle.
    const title = encodeURIComponent(
      `Enterprise AI Galaxy: ${name.trim() || 'a visitor'}`
    );
    const body = encodeURIComponent(
      [
        message.trim(),
        '',
        `Sent by ${name.trim() || 'Anonymous'}${email.trim() ? ` (${email.trim()})` : ''}`,
      ].join('\n')
    );
    window.open(`${REPO_FEEDBACK_URL}?title=${title}&body=${body}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Leave feedback or get in contact"
      className="rounded-xl border border-border-subtle bg-void/60 p-6 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-label text-ui-muted">
            Your name
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className={`${inputClass} mt-1.5`}
          />
        </label>
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-label text-ui-muted">
            Your email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className={`${inputClass} mt-1.5`}
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="text-[11px] font-medium uppercase tracking-label text-ui-muted">
          Message
        </span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your feedback, a company to add, or just say hi"
          className={`${inputClass} mt-1.5 resize-none`}
        />
      </label>
      <button
        type="submit"
        disabled={!message.trim()}
        className="mt-4 w-full rounded-md bg-maturity-high px-4 py-2.5 text-sm font-semibold text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send feedback
      </button>
      {sent && (
        <p className="mt-3 text-center text-[12px] text-maturity-high">
          Opening GitHub. Your message is ready to send.
        </p>
      )}
    </form>
  );
}
