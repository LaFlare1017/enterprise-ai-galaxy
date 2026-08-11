'use client';
import { useState } from 'react';
import Image from 'next/image';
import { logoUrl, monogram } from '@/lib/utils';

/**
 * One logo tile in the landing-page marquee. Renders the brand mark from the
 * company's official domain via the favicon service (or a local asset for
 * brands whose domain has no indexed favicon); if the fetch fails it falls
 * back to a maturity-tinted monogram so the strip never shows a broken
 * image. The mark is decorative (empty alt): the company names themselves
 * are exposed to screen readers in a static list by CompanyMarquee.
 */
export function MarqueeTile({
  name,
  domain,
  color,
}: {
  name: string;
  domain?: string;
  color: string;
}) {
  const [failed, setFailed] = useState(false);

  const src = logoUrl(domain);

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt=""
        width={128}
        height={128}
        unoptimized
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-12 w-12 shrink-0 rounded-lg border border-border-subtle bg-white p-1.5 object-contain"
      />
    );
  }

  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border-subtle text-[11px] font-semibold"
      style={{ color, backgroundColor: `${color}14` }}
    >
      {monogram(name)}
    </span>
  );
}
