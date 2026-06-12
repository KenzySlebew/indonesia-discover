/**
 * Destination data for the CTA carousel.
 *
 * IMAGE USAGE:
 * Place images in: public/images/destinations/
 * Supported formats: .jpg .jpeg .webp .png
 * Recommended size: 1200x800px (3:2 ratio)
 *
 * VIDEO USAGE (CTA section only):
 * Place videos in: public/videos/destinations/
 * If video exists, it plays in the carousel card instead of the image.
 * If video is missing/fails, falls back to image automatically.
 */

export interface Destination {
  id: number;
  title: string;
  location: string;
  description: string;
  /** Local image path — relative to /public */
  image: string;
  /** Optional local video path — relative to /public */
  video?: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    title: 'Gunung Bromo',
    location: 'Jawa Timur',
    description: 'Keajaiban alam dengan lautan pasir luas dan kawah aktif yang menyuguhkan panorama matahari terbit paling ikonik di Indonesia.',
    image: '/images/bromo.jpg',
    video: '/videos/destinations/bromo.mp4',
  },
  {
    id: 2,
    title: 'Labuan Bajo',
    location: 'Nusa Tenggara Timur',
    description: 'Gerbang menuju Pulau Komodo, dengan sunset terbaik di Indonesia dan perairan turquoise yang memukau.',
    image: '/images/destinations/labuan-bajo.jpg',
    video: '/videos/destinations/labuan-bajo.mp4',
  },
  {
    id: 3,
    title: 'Raja Ampat',
    location: 'Papua Barat',
    description: 'Surga bawah laut dengan keanekaragaman hayati laut tertinggi di dunia, 1.500 lebih spesies ikan.',
    image: '/images/destinations/raja-ampat.jpg',
    video: '/videos/destinations/raja-ampat.mp4',
  },
  {
    id: 4,
    title: 'Candi Borobudur',
    location: 'Jawa Tengah',
    description: 'Candi Buddha terbesar di dunia, warisan UNESCO yang megah dikelilingi kabut pagi dan panorama Merapi.',
    image: '/images/destinations/borobudur.jpg',
    video: '/videos/destinations/borobudur.mp4',
  },
  {
    id: 5,
    title: 'Danau Toba',
    location: 'Sumatera Utara',
    description: 'Danau vulkanik terbesar di dunia dengan Pulau Samosir di tengahnya — keajaiban geologis dan budaya Batak.',
    image: '/images/destinations/danau-toba.jpg',
    video: '/videos/destinations/danau-toba.mp4',
  },
];
