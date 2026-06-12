/**
 * Province data for the interactive Indonesia map.
 * Maps Highcharts hc-key to province metadata.
 *
 * IMAGE USAGE:
 * Place images in: public/images/provinces/{hc-key}.jpg
 * Example: public/images/provinces/id-ba.jpg → Bali
 *
 * If a local image is missing, the panel shows a curated Unsplash fallback.
 *
 * KEY MAPPING (verified against Highcharts id-all.topo.json):
 *   id-3700 = (unnamed geometry, idx 0 — no province data)
 *   id-1024 = Lampung (NOT Kalimantan Tengah)
 *   id-kt   = Kalimantan Tengah (NOT Kalimantan Utara)
 *   id-sl   = Sumatera Selatan (NOT Sulawesi Barat)
 *   id-sr   = Sulawesi Barat (NOT Sumatera Selatan)
 */

export interface ProvinceData {
  name: string;
  /** Local image path — relative to /public */
  imagePath: string;
  description: string;
  /** Top tourist destinations in this province */
  destinations: string[];
}

/**
 * Get the local image path for a province.
 * Convention: /images/provinces/{hcKey}.jpg
 */
export function getImagePath(hcKey: string): string {
  return `/images/provinces/${hcKey}.jpg`;
}

export const provinceData: Record<string, ProvinceData> = {
  'id-ac': {
    name: 'Aceh',
    imagePath: '/images/provinces/id-ac.jpg',
    description: 'Serambi Mekkah dengan Masjid Baiturrahman yang megah dan pantai-pantai tersembunyi.',
    destinations: ['Masjid Raya Baiturrahman', 'Pulau Weh', 'Museum Tsunami Aceh', 'Pantai Lampuuk'],
  },
  'id-su': {
    name: 'Sumatera Utara',
    imagePath: '/images/provinces/id-su.jpg',
    description: 'Danau Toba yang legendaris — danau vulkanik terbesar di dunia, dikelilingi budaya Batak yang kaya.',
    destinations: ['Danau Toba', 'Pulau Samosir', 'Bukit Lawang', 'Istana Maimun'],
  },
  'id-sb': {
    name: 'Sumatera Barat',
    imagePath: '/images/provinces/id-sb.jpg',
    description: 'Ngarai Sianok, Jam Gadang, rendang, dan budaya Minangkabau yang megah.',
    destinations: ['Ngarai Sianok', 'Lembah Harau', 'Jam Gadang', 'Pantai Air Manis'],
  },
  'id-ri': {
    name: 'Riau',
    imagePath: '/images/provinces/id-ri.jpg',
    description: 'Budaya Melayu yang kaya dengan Istana Siak dan hutan bakau pesisir.',
    destinations: ['Istana Siak Sri Indrapura', 'Candi Muara Takus', 'Sungai Kampar', 'Taman Nasional Bukit Tiga Puluh'],
  },
  'id-ja': {
    name: 'Jambi',
    imagePath: '/images/provinces/id-ja.jpg',
    description: 'Candi Muaro Jambi dan Taman Nasional Kerinci Seblat yang luar biasa.',
    destinations: ['Candi Muaro Jambi', 'Gunung Kerinci', 'Danau Kaco', 'Geopark Merangin'],
  },
  'id-sl': {
    name: 'Sumatera Selatan',
    imagePath: '/images/provinces/id-sl.jpg',
    description: 'Jembatan Ampera, pempek legendaris, dan sungai Musi yang megah.',
    destinations: ['Jembatan Ampera', 'Museum Balaputradewa', 'Pulau Kemaro', 'Taman Sriwijaya'],
  },
  'id-be': {
    name: 'Bengkulu',
    imagePath: '/images/provinces/id-be.jpg',
    description: 'Pesona Bunga Rafflesia dan Benteng Marlborough yang bersejarah.',
    destinations: ['Benteng Marlborough', 'Rumah Pengasingan Bung Karno', 'Pantai Panjang', 'Danau Dendam Tak Sudah'],
  },
  'id-1024': {
    name: 'Lampung',
    imagePath: '/images/provinces/id-1024.jpg',
    description: 'Taman Nasional Way Kambas — rumah gajah Sumatera dan Anak Krakatau.',
    destinations: ['Taman Nasional Way Kambas', 'Pantai Gigi Hiu', 'Pulau Pahawang', 'Anak Gunung Krakatau'],
  },
  'id-bb': {
    name: 'Kepulauan Bangka Belitung',
    imagePath: '/images/provinces/id-bb.jpg',
    description: 'Batu granit raksasa di pantai jernih yang menginspirasi film Laskar Pelangi.',
    destinations: ['Pantai Tanjung Tinggi', 'Pulau Lengkuas', 'Danau Kaolin', 'Museum Kata Andrea Hirata'],
  },
  'id-kr': {
    name: 'Kepulauan Riau',
    imagePath: '/images/provinces/id-kr.jpg',
    description: 'Gugusan pulau tropis dengan resort mewah dan perairan sebening kristal.',
    destinations: ['Pulau Bintan', 'Jembatan Barelang', 'Pantai Trikora', 'Pulau Penyengat'],
  },
  'id-jk': {
    name: 'DKI Jakarta',
    imagePath: '/images/provinces/id-jk.jpg',
    description: 'Ibu kota kosmopolitan Indonesia — perpaduan gedung pencakar langit modern, kuliner legendaris, dan warisan sejarah Kota Tua.',
    destinations: ['Monumen Nasional (Monas)', 'Kota Tua', 'Taman Impian Jaya Ancol', 'Taman Mini Indonesia Indah'],
  },
  'id-jr': {
    name: 'Jawa Barat',
    imagePath: '/images/provinces/id-jr.jpg',
    description: 'Bandung sang Paris van Java, Kawah Putih, dan kebun teh yang mempesona.',
    destinations: ['Kawah Putih Ciwidey', 'Gunung Tangkuban Parahu', 'Gedung Sate', 'Pantai Pangandaran'],
  },
  'id-bt': {
    name: 'Banten',
    imagePath: '/images/provinces/id-bt.jpg',
    description: 'Gerbang barat Pulau Jawa dengan Tanjung Lesung dan Baduy yang mistis.',
    destinations: ['Taman Nasional Ujung Kulon', 'Pantai Sawarna', 'Masjid Agung Banten', 'Kampung Adat Baduy'],
  },
  'id-jt': {
    name: 'Jawa Tengah',
    imagePath: '/images/provinces/id-jt.jpg',
    description: 'Jantung budaya Jawa dengan candi, batik, dan kuliner khas yang menggugah selera.',
    destinations: ['Candi Borobudur', 'Dataran Tinggi Dieng', 'Lawang Sewu', 'Kepulauan Karimunjawa'],
  },
  'id-yo': {
    name: 'DI Yogyakarta',
    imagePath: '/images/provinces/id-yo.jpg',
    description: 'Kota budaya dengan Candi Prambanan, keraton bersejarah, dan seni batik yang hidup di setiap sudut.',
    destinations: ['Jalan Malioboro', 'Keraton Yogyakarta', 'Candi Prambanan', 'Pantai Parangtritis'],
  },
  'id-ji': {
    name: 'Jawa Timur',
    imagePath: '/images/provinces/id-ji.jpg',
    description: 'Gunung Bromo yang ikonik, Kawah Ijen, dan kota pahlawan Surabaya.',
    destinations: ['Gunung Bromo', 'Kawah Ijen', 'Jatim Park', 'Taman Nasional Baluran'],
  },
  'id-ba': {
    name: 'Bali',
    imagePath: '/images/provinces/id-ba.jpg',
    description: 'Pulau Dewata yang memesona dengan pura megah, sawah terasering hijau, dan pantai berpasir putih.',
    destinations: ['Pura Tanah Lot', 'Ubud Monkey Forest', 'Pantai Kuta', 'Uluwatu Cliff Temple'],
  },
  'id-nb': {
    name: 'Nusa Tenggara Barat',
    imagePath: '/images/provinces/id-nb.jpg',
    description: 'Lombok dengan Gunung Rinjani, Gili Trawangan, dan pantai Kuta yang masih perawan.',
    destinations: ['Gunung Rinjani', 'Gili Trawangan', 'Pantai Pink Lombok', 'Sirkuit Mandalika'],
  },
  'id-nt': {
    name: 'Nusa Tenggara Timur',
    imagePath: '/images/provinces/id-nt.jpg',
    description: 'Rumah Labuan Bajo, gerbang Taman Nasional Komodo, dengan pantai pink langka.',
    destinations: ['Taman Nasional Komodo', 'Danau Kelimutu', 'Pulau Padar', 'Pantai Nembrala'],
  },
  'id-kb': {
    name: 'Kalimantan Barat',
    imagePath: '/images/provinces/id-kb.jpg',
    description: 'Kota Pontianak tepat di garis khatulistiwa, dikelilingi hutan hujan tropis.',
    destinations: ['Tugu Khatulistiwa', 'Danau Sentarum', 'Keraton Kadriah', 'Pantai Pasir Panjang'],
  },
  'id-kt': {
    name: 'Kalimantan Tengah',
    imagePath: '/images/provinces/id-kt.jpg',
    description: 'Taman Nasional Tanjung Puting — rumah orangutan Kalimantan.',
    destinations: ['Taman Nasional Tanjung Puting', 'Bukit Batu Kasongan', 'Danau Tahai', 'Istana Kuning'],
  },
  'id-ks': {
    name: 'Kalimantan Selatan',
    imagePath: '/images/provinces/id-ks.jpg',
    description: 'Pasar terapung Banjarmasin dan permata Pegunungan Meratus.',
    destinations: ['Pasar Terapung Lok Baintan', 'Pegunungan Meratus', 'Pulau Kembang', 'Pendulangan Intan Cempaka'],
  },
  'id-ki': {
    name: 'Kalimantan Timur',
    imagePath: '/images/provinces/id-ki.jpg',
    description: 'Ibu kota baru Nusantara dan Kepulauan Derawan yang eksotis.',
    destinations: ['Kepulauan Derawan', 'Danau Labuan Cermin', 'Bukit Bangkirai', 'Taman Nasional Kutai'],
  },
  'id-ku': {
    name: 'Kalimantan Utara',
    imagePath: '/images/provinces/id-ku.jpg',
    description: 'Perbatasan eksotis dengan gua-gua kuno dan sungai-sungai megah.',
    destinations: ['Taman Nasional Kayan Mentarang', 'Museum Kesultanan Bulungan', 'Air Terjun Gunung Rian', 'Pantai Tanah Kuning'],
  },
  'id-sw': {
    name: 'Sulawesi Utara',
    imagePath: '/images/provinces/id-sw.jpg',
    description: 'Taman Laut Bunaken dengan terumbu karang spektakuler dan Gunung Lokon.',
    destinations: ['Taman Nasional Bunaken', 'Danau Linow', 'Bukit Kasih', 'Gunung Lokon'],
  },
  'id-st': {
    name: 'Sulawesi Tengah',
    imagePath: '/images/provinces/id-st.jpg',
    description: 'Kepulauan Togean yang terpencil dan Lembah Bada dengan megalit misterius.',
    destinations: ['Kepulauan Togean', 'Lembah Bada', 'Taman Nasional Lore Lindu', 'Danau Poso'],
  },
  'id-se': {
    name: 'Sulawesi Selatan',
    imagePath: '/images/provinces/id-se.jpg',
    description: 'Tana Toraja yang mistis dengan tradisi pemakaman unik dan rumah Tongkonan.',
    destinations: ['Tana Toraja', 'Pantai Bira', 'Benteng Rotterdam', 'Karst Rammang-Rammang'],
  },
  'id-sg': {
    name: 'Sulawesi Tenggara',
    imagePath: '/images/provinces/id-sg.jpg',
    description: 'Wakatobi — surga snorkeling dengan terumbu karang yang dilindungi UNESCO.',
    destinations: ['Taman Nasional Wakatobi', 'Pulau Labengki', 'Pantai Nirwana', 'Benteng Keraton Buton'],
  },
  'id-go': {
    name: 'Gorontalo',
    imagePath: '/images/provinces/id-go.jpg',
    description: 'Surga tersembunyi dengan Danau Limboto dan penyelaman hiu paus.',
    destinations: ['Pulo Cinta', 'Hiu Paus Botubarani', 'Benteng Otanaha', 'Taman Laut Olele'],
  },
  'id-sr': {
    name: 'Sulawesi Barat',
    imagePath: '/images/provinces/id-sr.jpg',
    description: 'Pantai Palippis yang menawan dan budaya Mandar yang unik.',
    destinations: ['Pantai Palippis', 'Air Terjun Indo Ranu', 'Pulau Karampuang', 'Hutan Mangrove Ampallas'],
  },
  'id-ma': {
    name: 'Maluku',
    imagePath: '/images/provinces/id-ma.jpg',
    description: 'Kepulauan rempah dengan pantai Ora yang menakjubkan dan Banda Neira.',
    destinations: ['Pantai Ora', 'Banda Neira', 'Pantai Natsepa', 'Benteng Belgica'],
  },
  'id-la': {
    name: 'Maluku Utara',
    imagePath: '/images/provinces/id-la.jpg',
    description: 'Kepulauan Rempah bersejarah dengan benteng-benteng kolonial dan laut biru.',
    destinations: ['Kedaton Kesultanan Ternate', 'Pantai Sulamadaha', 'Gunung Gamalama', 'Pulau Morotai'],
  },
  'id-ib': {
    name: 'Papua Barat',
    imagePath: '/images/provinces/id-ib.jpg',
    description: 'Raja Ampat — surga diving terbaik di planet bumi.',
    destinations: ['Kepulauan Raja Ampat', 'Taman Nasional Teluk Cenderawasih', 'Pegunungan Arfak', 'Danau Framu'],
  },
  'id-pa': {
    name: 'Papua',
    imagePath: '/images/provinces/id-pa.jpg',
    description: 'Lembah Baliem dan puncak salju Carstensz — keajaiban alam terakhir Indonesia.',
    destinations: ['Lembah Baliem', 'Puncak Jaya Carstensz', 'Danau Sentani', 'Pantai Base-G'],
  },
};

/**
 * Map data formatted as objects with explicit 'hc-key' for correct Highcharts joinBy.
 * This prevents the index-based matching bug where provinces get swapped.
 */
export const mapData = Object.keys(provinceData).map((key, index) => ({
  'hc-key': key,
  value: index + 10,
}));
