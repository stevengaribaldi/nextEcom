import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Metadata } from 'next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'MXN' | 'EUR';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options;
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function constructMetadata({
  title = 'Yehfedra - The go to for verified digital goods.',
  description = ' Yehfedra is an open-source marketplace The go to for verified digital goods.',
  // image = '/thumbnail.png',
  // icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [
      //   {
      //     url: image,
      //   },
      // ],
    },
    twitter: {},
    // icons,
    metadataBase: new URL('https://yehfedra.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
