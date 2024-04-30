export const PRODUCT_CATEGORIES = [
  {
    label: 'Ui-kit',
    value: 'single' as const,
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=ui_kits`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=ui_kits&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Best Sellers',
        href: '/products?category=ui_kits',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },




  // {
  //   label: 'Icons',
  //   value: 'icons' as const,
  //   featured: [
  //     {
  //       name: 'Fravorite Icon Picks',
  //       href: `/products?category=icons`,
  //       imageSrc: '/nav/icons/picks.jpg',
  //     },
  //     {
  //       name: 'New Arrivals',
  //       href: '/products?category=icons&sort=desc',
  //       imageSrc: '/nav/icons/new.jpg',
  //     },
  //     {
  //       name: 'Bestseller Icons',
  //       href: '/products?category=icons',
  //       imageSrc: '/nav/icons/bestsellers.jpg',
  //     },
  //   ],
  // },
];
