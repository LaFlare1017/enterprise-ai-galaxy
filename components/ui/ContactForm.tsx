'use client';
import { useState } from 'react';

/**
 * Issue form. Submitting opens a pre-filled GitHub issue so contributors can
 * request a company, suggest a feature, or flag a correction without leaving
 * the galaxy. Point REPO_ISSUES_URL at the published repository before
 * going live; the placeholder keeps the code functional until then.
 */
export const REPO_ISSUES_URL =
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
    // from the fields, so no issue text sits in the markup or the bundle.
    const title = encodeURIComponent(
      `Enterprise AI Galaxy: ${name.trim() || 'a visitor'}`
    );
    const body = encodeURIComponent(
      [
        message.trim(),
        '',
        `Filed by ${name.trim() || 'Anonymous'}${email.trim() ? ` (${email.trim()})` : ''}`,
      ].join('\n')
    );
    window.open(`${REPO_ISSUES_URL}?title=${title}&body=${body}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Report an issue"
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
          placeholder="What would you like to request, suggest, or correct?"
          className={`${inputClass} mt-1.5 resize-none`}
        />
      </label>
      <button
        type="submit"
        disabled={!message.trim()}
        className="mt-4 w-full rounded-md bg-maturity-high px-4 py-2.5 text-sm font-semibold text-void transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        File issue
      </button>
      {sent && (
        <p className="mt-3 text-center text-[12px] text-maturity-high">
          Opening GitHub to file your issue.
        </p>
      )}
    </form>
  );
}
