/**
 * Program pillar and statistics data for the "Berkarya untuk Indonesia" section.
 */

export interface ProgramPillar {
  icon: string; // SVG path data or icon identifier
  title: string;
  description: string;
}

export interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

export const programPillars: ProgramPillar[] = [
  {
    icon: 'compass',
    title: 'Eksplorasi Destinasi',
    description:
      'Memetakan dan memperkenalkan destinasi tersembunyi di setiap provinsi, dari sabang sampai merauke.',
  },
  {
    icon: 'heritage',
    title: 'Pelestarian Budaya',
    description:
      'Merawat tradisi, kerajinan tangan, dan kuliner lokal sebagai warisan tak ternilai untuk generasi mendatang.',
  },
  {
    icon: 'community',
    title: 'Pemberdayaan Lokal',
    description:
      'Mendukung pelaku wisata dan ekonomi kreatif daerah agar tumbuh mandiri dan berdaya saing global.',
  },
  {
    icon: 'digital',
    title: 'Promosi Digital',
    description:
      'Mengangkat cerita Indonesia lewat media modern — video, foto, dan narasi digital yang menginspirasi dunia.',
  },
];

export const statistics: Statistic[] = [
  { value: 38, suffix: '', label: 'Provinsi Terkoneksi' },
];
