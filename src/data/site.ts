import type { ImageMetadata } from 'astro';

import shopfront from '../assets/work/424682.webp';
import expoGazebo from '../assets/work/424683.webp';
import expoCounter from '../assets/work/424684.webp';
import frosting from '../assets/work/424685.webp';
import cateringCounter from '../assets/work/424686.webp';
import plinthA from '../assets/work/424687.webp';
import plinthB from '../assets/work/424688.webp';
import ledStage from '../assets/work/424690.webp';
import menuBoard from '../assets/work/424691.webp';
import storefront from '../assets/work/424692.webp';
import propA from '../assets/work/424693.webp';
import propB from '../assets/work/424694.webp';
import backdropA from '../assets/work/424695.webp';
import gazebo from '../assets/work/424696.webp';
import backdropB from '../assets/work/424697.webp';
import carA from '../assets/work/424698.webp';
import carB from '../assets/work/424699.webp';
import stageA from '../assets/work/424700.webp';
import stageB from '../assets/work/424701.webp';

import svcEvents from '../assets/services/events.webp';
import svcCars from '../assets/services/car-wraps.webp';
import svcVinyl from '../assets/services/vinyl-decals.webp';
import svcWallpaper from '../assets/services/wallpaper.webp';
import svcGifting from '../assets/services/corporate-gifting.webp';
import svcGazebos from '../assets/services/gazebos.webp';

export const site = {
  name: 'Blackrose',
  tagline: 'Expert branding solutions for your home and business',
  email: 'traymond565@gmail.com',
  website: 'www.blackrosebranding.co.in',
  whatsapp: '27838747567',
  phoneDisplay: '+27 83 874 7567',
  // TODO: replace '#' with the real profile links
  socials: [
    { name: 'Facebook', href: 'https://www.facebook.com/brandingwithraymic', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'TikTok', href: '#', icon: 'tiktok' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  ],
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    title: 'Events',
    image: svcEvents,
    alt: 'Speaker on a stage in front of a large screen and a seated audience',
    copy: 'Media walls, branded counters, stage sets and backdrops: designed, built and installed on site for launches, expos and conferences.',
  },
  {
    title: 'Car Wraps',
    image: svcCars,
    alt: 'White sports car under spotlights in a dark garage',
    copy: 'Cut-vinyl lettering and wraps that turn your car or fleet into a moving billboard.',
  },
  {
    title: 'Vinyl & Decals',
    image: svcVinyl,
    alt: 'Bright retail store interior with branded shelving and displays',
    copy: 'Shopfront graphics, window frosting, signage lettering and decals for glass, walls and other smooth surfaces.',
  },
  {
    title: 'Wallpaper',
    image: svcWallpaper,
    alt: 'Yellow armchair against a clean feature wall in a modern room',
    copy: 'Custom printed wallpaper and feature walls that bring your brand, or your personal style, into a home or office.',
  },
  {
    title: 'Corporate Gifting',
    image: svcGifting,
    alt: 'Pink gift box tied with a gold ribbon on a blush background',
    copy: 'Branded gifts and merchandise for your clients and team.',
  },
  {
    title: 'Gazebos',
    image: svcGazebos,
    alt: 'Market stalls under canopies with produce on display',
    copy: 'Fully branded gazebos for markets, sports days and outdoor events.',
  },
];

export type Category = 'Signage' | 'Vehicles' | 'Events' | 'Displays';

export type Project = {
  title: string;
  category: Category;
  description: string;
  images: { src: ImageMetadata; alt: string }[];
  /** grid span on desktop */
  span: 'tall' | 'wide' | 'square';
  /** extra grid classes for edge cases */
  extra?: string;
};

export const projects: Project[] = [
  {
    title: 'Stage & Lounge Set',
    category: 'Events',
    description: 'Red-on-red conference stage with branded backwall, risers and lounge seating.',
    span: 'wide',
    images: [
      { src: stageA, alt: 'Red branded stage with lounge chairs and a carpet on a white riser' },
      { src: stageB, alt: 'Wide view of the red branded stage set under event lighting' },
    ],
  },
  {
    title: 'Retail Display Plinth',
    category: 'Displays',
    description: 'Full-wrap printed plinth with a high-gloss motorcycle-chrome graphic.',
    span: 'tall',
    images: [
      { src: plinthA, alt: 'Black display plinth wrapped in a chrome motorcycle print' },
      { src: plinthB, alt: 'Second angle of the wrapped motorcycle display plinth' },
    ],
  },
  {
    title: 'Vehicle Door Branding',
    category: 'Vehicles',
    description: 'Bold cut-vinyl lettering applied across the rear doors of a hatchback.',
    span: 'square',
    images: [
      { src: carA, alt: 'Silver hatchback with large red vinyl lettering on the doors' },
      { src: carB, alt: 'Close view of red vinyl lettering on the car doors' },
    ],
  },
  {
    title: 'Shopfront & Menu Boards',
    category: 'Signage',
    description: 'Complete storefront: fascia sign, illuminated menu board and a branded event gazebo.',
    span: 'square',
    images: [
      { src: storefront, alt: 'Navy fascia sign above a butchery storefront under a blue sky' },
      { src: menuBoard, alt: 'Black menu board with white lettering and QR codes' },
      { src: gazebo, alt: 'Navy branded gazebo outside the storefront' },
    ],
  },
  {
    title: 'LED Stage Branding',
    category: 'Events',
    description: 'Stage dressing and reflective floor branding for a keynote under LED walls.',
    span: 'tall',
    images: [{ src: ledStage, alt: 'Red-lit stage with an LED wall reflecting on a glossy floor' }],
  },
  {
    title: 'Exhibition Activation',
    category: 'Events',
    description: 'Gazebos, media wall and white branded counters for an outdoor vehicle showcase.',
    span: 'wide',
    images: [
      { src: expoCounter, alt: 'Two white branded counters in front of a logo media wall' },
      { src: expoGazebo, alt: 'Row of white gazebos with branded counters at an outdoor event' },
    ],
  },
  {
    title: 'Launch Backdrop',
    category: 'Events',
    description: 'Textured curved feature wall, printed panel and white plinth stage for a beauty launch.',
    span: 'square',
    images: [
      { src: backdropA, alt: 'Curved copper-textured wall with a white plinth stage' },
      { src: backdropB, alt: 'Alternative view of the textured launch backdrop' },
    ],
  },
  {
    title: 'Corporate Entrance',
    category: 'Signage',
    description: 'Illuminated logo sign and gradient privacy frosting across a glass entrance.',
    span: 'square',
    images: [{ src: shopfront, alt: 'Glass shop entrance with an illuminated logo and frosted gradient film' }],
  },
  {
    title: 'Photo Booth Prop',
    category: 'Displays',
    description: 'Freestanding selfie prop with a mirror cut-out and script graphics.',
    span: 'tall',
    images: [
      { src: propA, alt: 'White arch-shaped prop with a telephone illustration and a mirror' },
      { src: propB, alt: 'Second angle of the white arch photo booth prop' },
    ],
  },
  {
    title: 'Decorative Frosting',
    category: 'Signage',
    description: 'Floral cut frosting film on sliding glass doors for privacy with character.',
    span: 'tall',
    images: [{ src: frosting, alt: 'Sliding glass doors with a frosted floral pattern' }],
  },
  {
    title: 'Mobile Bar Counter',
    extra: 'sm:max-lg:col-span-2 sm:max-lg:row-span-1',
    category: 'Displays',
    description: 'Matte black catering counter with a white script logo.',
    span: 'tall',
    images: [{ src: cateringCounter, alt: 'Black counter with a white script catering logo' }],
  },
];

export const process = [
  { title: 'Brief', copy: 'Send us a WhatsApp with photos of the space or vehicle and what you need it to do.' },
  { title: 'Design', copy: 'We design it and you approve it before anything is built.' },
  { title: 'Produce', copy: 'We print, cut and fabricate each piece.' },
  { title: 'Install', copy: 'We install on location.' },
];
