/**
 * Liste deutscher Staedte fuer programmatic Local SEO.
 * Quelle: oeffentlich verfuegbare Stadtdaten (Statistisches Bundesamt 2024).
 * Auswahl: alle Staedte > ~70.000 Einwohner + ausgewaehlte mittelgrosse Staedte
 * mit relevanter Energie-Marktdynamik.
 *
 * Pro Stadt rendern wir /energieberatung/[slug] mit LocalBusiness-Schema,
 * Nachbarstadt-Verlinkung und stadt-spezifischem Kontext.
 */

export interface GermanCity {
  slug: string;
  name: string;
  region: string; // Bundesland
  population: number;
  postalCodePrefix: string; // erste 2 Stellen PLZ
  lat?: number;
  lng?: number;
}

export const CITIES: GermanCity[] = [
  // Mio.-Staedte
  { slug: 'berlin', name: 'Berlin', region: 'Berlin', population: 3669491, postalCodePrefix: '10', lat: 52.52, lng: 13.405 },
  { slug: 'hamburg', name: 'Hamburg', region: 'Hamburg', population: 1841179, postalCodePrefix: '20', lat: 53.5511, lng: 9.9937 },
  { slug: 'muenchen', name: 'München', region: 'Bayern', population: 1488202, postalCodePrefix: '80', lat: 48.1351, lng: 11.582 },
  { slug: 'koeln', name: 'Köln', region: 'Nordrhein-Westfalen', population: 1083498, postalCodePrefix: '50', lat: 50.9375, lng: 6.9603 },

  // 500k+
  { slug: 'frankfurt-am-main', name: 'Frankfurt am Main', region: 'Hessen', population: 753056, postalCodePrefix: '60', lat: 50.1109, lng: 8.6821 },
  { slug: 'stuttgart', name: 'Stuttgart', region: 'Baden-Württemberg', population: 626275, postalCodePrefix: '70', lat: 48.7758, lng: 9.1829 },
  { slug: 'duesseldorf', name: 'Düsseldorf', region: 'Nordrhein-Westfalen', population: 619477, postalCodePrefix: '40', lat: 51.2277, lng: 6.7735 },
  { slug: 'leipzig', name: 'Leipzig', region: 'Sachsen', population: 605407, postalCodePrefix: '04', lat: 51.3397, lng: 12.3731 },
  { slug: 'dortmund', name: 'Dortmund', region: 'Nordrhein-Westfalen', population: 588250, postalCodePrefix: '44', lat: 51.5136, lng: 7.4653 },
  { slug: 'essen', name: 'Essen', region: 'Nordrhein-Westfalen', population: 582415, postalCodePrefix: '45', lat: 51.4556, lng: 7.0116 },
  { slug: 'bremen', name: 'Bremen', region: 'Bremen', population: 569352, postalCodePrefix: '28', lat: 53.0793, lng: 8.8017 },
  { slug: 'dresden', name: 'Dresden', region: 'Sachsen', population: 556227, postalCodePrefix: '01', lat: 51.0504, lng: 13.7373 },
  { slug: 'hannover', name: 'Hannover', region: 'Niedersachsen', population: 535061, postalCodePrefix: '30', lat: 52.3759, lng: 9.7320 },
  { slug: 'nuernberg', name: 'Nürnberg', region: 'Bayern', population: 515543, postalCodePrefix: '90', lat: 49.4521, lng: 11.0767 },

  // 250k+
  { slug: 'duisburg', name: 'Duisburg', region: 'Nordrhein-Westfalen', population: 495885, postalCodePrefix: '47', lat: 51.4344, lng: 6.7623 },
  { slug: 'bochum', name: 'Bochum', region: 'Nordrhein-Westfalen', population: 364628, postalCodePrefix: '44', lat: 51.4818, lng: 7.2162 },
  { slug: 'wuppertal', name: 'Wuppertal', region: 'Nordrhein-Westfalen', population: 354382, postalCodePrefix: '42', lat: 51.2562, lng: 7.1508 },
  { slug: 'bielefeld', name: 'Bielefeld', region: 'Nordrhein-Westfalen', population: 333509, postalCodePrefix: '33', lat: 52.0302, lng: 8.5325 },
  { slug: 'bonn', name: 'Bonn', region: 'Nordrhein-Westfalen', population: 331885, postalCodePrefix: '53', lat: 50.7374, lng: 7.0982 },
  { slug: 'muenster', name: 'Münster', region: 'Nordrhein-Westfalen', population: 316403, postalCodePrefix: '48', lat: 51.9607, lng: 7.6261 },
  { slug: 'karlsruhe', name: 'Karlsruhe', region: 'Baden-Württemberg', population: 308436, postalCodePrefix: '76', lat: 49.0069, lng: 8.4037 },
  { slug: 'mannheim', name: 'Mannheim', region: 'Baden-Württemberg', population: 309721, postalCodePrefix: '68', lat: 49.4875, lng: 8.466 },
  { slug: 'augsburg', name: 'Augsburg', region: 'Bayern', population: 296478, postalCodePrefix: '86', lat: 48.3705, lng: 10.8978 },
  { slug: 'wiesbaden', name: 'Wiesbaden', region: 'Hessen', population: 278342, postalCodePrefix: '65', lat: 50.0782, lng: 8.2398 },
  { slug: 'gelsenkirchen', name: 'Gelsenkirchen', region: 'Nordrhein-Westfalen', population: 260126, postalCodePrefix: '45', lat: 51.5177, lng: 7.0857 },
  { slug: 'moenchengladbach', name: 'Mönchengladbach', region: 'Nordrhein-Westfalen', population: 261001, postalCodePrefix: '41', lat: 51.1805, lng: 6.4428 },

  // 150k+
  { slug: 'braunschweig', name: 'Braunschweig', region: 'Niedersachsen', population: 248561, postalCodePrefix: '38', lat: 52.2689, lng: 10.5267 },
  { slug: 'chemnitz', name: 'Chemnitz', region: 'Sachsen', population: 243521, postalCodePrefix: '09', lat: 50.8278, lng: 12.9214 },
  { slug: 'kiel', name: 'Kiel', region: 'Schleswig-Holstein', population: 246243, postalCodePrefix: '24', lat: 54.3233, lng: 10.1394 },
  { slug: 'aachen', name: 'Aachen', region: 'Nordrhein-Westfalen', population: 249070, postalCodePrefix: '52', lat: 50.7753, lng: 6.0839 },
  { slug: 'halle-saale', name: 'Halle (Saale)', region: 'Sachsen-Anhalt', population: 237958, postalCodePrefix: '06', lat: 51.4825, lng: 11.9700 },
  { slug: 'magdeburg', name: 'Magdeburg', region: 'Sachsen-Anhalt', population: 235775, postalCodePrefix: '39', lat: 52.1205, lng: 11.6276 },
  { slug: 'freiburg-im-breisgau', name: 'Freiburg im Breisgau', region: 'Baden-Württemberg', population: 231848, postalCodePrefix: '79', lat: 47.999, lng: 7.8421 },
  { slug: 'krefeld', name: 'Krefeld', region: 'Nordrhein-Westfalen', population: 227020, postalCodePrefix: '47', lat: 51.3388, lng: 6.5853 },
  { slug: 'mainz', name: 'Mainz', region: 'Rheinland-Pfalz', population: 218578, postalCodePrefix: '55', lat: 50.0006, lng: 8.2711 },
  { slug: 'luebeck', name: 'Lübeck', region: 'Schleswig-Holstein', population: 216277, postalCodePrefix: '23', lat: 53.8654, lng: 10.6866 },
  { slug: 'erfurt', name: 'Erfurt', region: 'Thüringen', population: 213692, postalCodePrefix: '99', lat: 50.9847, lng: 11.0299 },
  { slug: 'oberhausen', name: 'Oberhausen', region: 'Nordrhein-Westfalen', population: 209566, postalCodePrefix: '46', lat: 51.4963, lng: 6.8634 },
  { slug: 'rostock', name: 'Rostock', region: 'Mecklenburg-Vorpommern', population: 209191, postalCodePrefix: '18', lat: 54.0833, lng: 12.1333 },
  { slug: 'kassel', name: 'Kassel', region: 'Hessen', population: 201048, postalCodePrefix: '34', lat: 51.3127, lng: 9.4797 },
  { slug: 'hagen', name: 'Hagen', region: 'Nordrhein-Westfalen', population: 188814, postalCodePrefix: '58', lat: 51.3671, lng: 7.4633 },
  { slug: 'saarbruecken', name: 'Saarbrücken', region: 'Saarland', population: 179349, postalCodePrefix: '66', lat: 49.2402, lng: 6.9969 },
  { slug: 'potsdam', name: 'Potsdam', region: 'Brandenburg', population: 183154, postalCodePrefix: '14', lat: 52.3906, lng: 13.0645 },
  { slug: 'hamm', name: 'Hamm', region: 'Nordrhein-Westfalen', population: 179865, postalCodePrefix: '59', lat: 51.6739, lng: 7.815 },
  { slug: 'muelheim-an-der-ruhr', name: 'Mülheim an der Ruhr', region: 'Nordrhein-Westfalen', population: 170632, postalCodePrefix: '45', lat: 51.4275, lng: 6.8825 },
  { slug: 'ludwigshafen-am-rhein', name: 'Ludwigshafen am Rhein', region: 'Rheinland-Pfalz', population: 172253, postalCodePrefix: '67', lat: 49.481, lng: 8.4353 },
  { slug: 'leverkusen', name: 'Leverkusen', region: 'Nordrhein-Westfalen', population: 163729, postalCodePrefix: '51', lat: 51.0459, lng: 6.9874 },
  { slug: 'oldenburg', name: 'Oldenburg', region: 'Niedersachsen', population: 169077, postalCodePrefix: '26', lat: 53.1435, lng: 8.2146 },
  { slug: 'osnabrueck', name: 'Osnabrück', region: 'Niedersachsen', population: 165251, postalCodePrefix: '49', lat: 52.2799, lng: 8.0472 },
  { slug: 'solingen', name: 'Solingen', region: 'Nordrhein-Westfalen', population: 159245, postalCodePrefix: '42', lat: 51.1652, lng: 7.0671 },
  { slug: 'heidelberg', name: 'Heidelberg', region: 'Baden-Württemberg', population: 159245, postalCodePrefix: '69', lat: 49.3988, lng: 8.6724 },

  // 100k+
  { slug: 'herne', name: 'Herne', region: 'Nordrhein-Westfalen', population: 156374, postalCodePrefix: '44', lat: 51.5388, lng: 7.2257 },
  { slug: 'neuss', name: 'Neuss', region: 'Nordrhein-Westfalen', population: 153796, postalCodePrefix: '41', lat: 51.198, lng: 6.6926 },
  { slug: 'darmstadt', name: 'Darmstadt', region: 'Hessen', population: 159878, postalCodePrefix: '64', lat: 49.8728, lng: 8.6512 },
  { slug: 'regensburg', name: 'Regensburg', region: 'Bayern', population: 152610, postalCodePrefix: '93', lat: 49.0134, lng: 12.1016 },
  { slug: 'paderborn', name: 'Paderborn', region: 'Nordrhein-Westfalen', population: 150580, postalCodePrefix: '33', lat: 51.7189, lng: 8.7575 },
  { slug: 'ingolstadt', name: 'Ingolstadt', region: 'Bayern', population: 138016, postalCodePrefix: '85', lat: 48.7665, lng: 11.4257 },
  { slug: 'wuerzburg', name: 'Würzburg', region: 'Bayern', population: 127880, postalCodePrefix: '97', lat: 49.7913, lng: 9.9534 },
  { slug: 'fuerth', name: 'Fürth', region: 'Bayern', population: 129122, postalCodePrefix: '90', lat: 49.4775, lng: 10.9886 },
  { slug: 'wolfsburg', name: 'Wolfsburg', region: 'Niedersachsen', population: 124045, postalCodePrefix: '38', lat: 52.4227, lng: 10.7865 },
  { slug: 'offenbach-am-main', name: 'Offenbach am Main', region: 'Hessen', population: 130892, postalCodePrefix: '63', lat: 50.0955, lng: 8.7761 },
  { slug: 'ulm', name: 'Ulm', region: 'Baden-Württemberg', population: 126405, postalCodePrefix: '89', lat: 48.4011, lng: 9.9876 },
  { slug: 'heilbronn', name: 'Heilbronn', region: 'Baden-Württemberg', population: 125960, postalCodePrefix: '74', lat: 49.1427, lng: 9.2109 },
  { slug: 'pforzheim', name: 'Pforzheim', region: 'Baden-Württemberg', population: 125957, postalCodePrefix: '75', lat: 48.8908, lng: 8.6975 },
  { slug: 'goettingen', name: 'Göttingen', region: 'Niedersachsen', population: 119529, postalCodePrefix: '37', lat: 51.5413, lng: 9.9158 },
  { slug: 'bottrop', name: 'Bottrop', region: 'Nordrhein-Westfalen', population: 117335, postalCodePrefix: '46', lat: 51.5236, lng: 6.9286 },
  { slug: 'trier', name: 'Trier', region: 'Rheinland-Pfalz', population: 110636, postalCodePrefix: '54', lat: 49.7497, lng: 6.6371 },
  { slug: 'recklinghausen', name: 'Recklinghausen', region: 'Nordrhein-Westfalen', population: 110846, postalCodePrefix: '45', lat: 51.6133, lng: 7.1975 },
  { slug: 'reutlingen', name: 'Reutlingen', region: 'Baden-Württemberg', population: 116456, postalCodePrefix: '72', lat: 48.4914, lng: 9.2043 },
  { slug: 'bremerhaven', name: 'Bremerhaven', region: 'Bremen', population: 113557, postalCodePrefix: '27', lat: 53.5396, lng: 8.5810 },
  { slug: 'koblenz', name: 'Koblenz', region: 'Rheinland-Pfalz', population: 113844, postalCodePrefix: '56', lat: 50.3569, lng: 7.5890 },
  { slug: 'bergisch-gladbach', name: 'Bergisch Gladbach', region: 'Nordrhein-Westfalen', population: 111645, postalCodePrefix: '51', lat: 50.9925, lng: 7.1297 },
  { slug: 'jena', name: 'Jena', region: 'Thüringen', population: 111407, postalCodePrefix: '07', lat: 50.9272, lng: 11.5864 },
  { slug: 'remscheid', name: 'Remscheid', region: 'Nordrhein-Westfalen', population: 110994, postalCodePrefix: '42', lat: 51.1789, lng: 7.1925 },
  { slug: 'erlangen', name: 'Erlangen', region: 'Bayern', population: 113758, postalCodePrefix: '91', lat: 49.5897, lng: 11.0078 },
  { slug: 'moers', name: 'Moers', region: 'Nordrhein-Westfalen', population: 103725, postalCodePrefix: '47', lat: 51.4517, lng: 6.6406 },
  { slug: 'siegen', name: 'Siegen', region: 'Nordrhein-Westfalen', population: 102355, postalCodePrefix: '57', lat: 50.8748, lng: 8.0243 },
  { slug: 'hildesheim', name: 'Hildesheim', region: 'Niedersachsen', population: 100319, postalCodePrefix: '31', lat: 52.1505, lng: 9.9514 },
  { slug: 'salzgitter', name: 'Salzgitter', region: 'Niedersachsen', population: 102571, postalCodePrefix: '38', lat: 52.1538, lng: 10.4015 },
  { slug: 'cottbus', name: 'Cottbus', region: 'Brandenburg', population: 98148, postalCodePrefix: '03', lat: 51.7563, lng: 14.3329 },
  { slug: 'kaiserslautern', name: 'Kaiserslautern', region: 'Rheinland-Pfalz', population: 100030, postalCodePrefix: '67', lat: 49.4401, lng: 7.7491 },
  { slug: 'gera', name: 'Gera', region: 'Thüringen', population: 92998, postalCodePrefix: '07', lat: 50.8806, lng: 12.0826 },
  { slug: 'witten', name: 'Witten', region: 'Nordrhein-Westfalen', population: 95721, postalCodePrefix: '58', lat: 51.4435, lng: 7.3353 },
  { slug: 'iserlohn', name: 'Iserlohn', region: 'Nordrhein-Westfalen', population: 92484, postalCodePrefix: '58', lat: 51.3787, lng: 7.6736 },
  { slug: 'gueterloh', name: 'Gütersloh', region: 'Nordrhein-Westfalen', population: 100863, postalCodePrefix: '33', lat: 51.9069, lng: 8.3795 },
  { slug: 'schwerin', name: 'Schwerin', region: 'Mecklenburg-Vorpommern', population: 96084, postalCodePrefix: '19', lat: 53.6355, lng: 11.4012 },
  { slug: 'ludwigsburg', name: 'Ludwigsburg', region: 'Baden-Württemberg', population: 93515, postalCodePrefix: '71', lat: 48.8975, lng: 9.1922 },
  { slug: 'zwickau', name: 'Zwickau', region: 'Sachsen', population: 88557, postalCodePrefix: '08', lat: 50.7187, lng: 12.4922 },
  { slug: 'esslingen-am-neckar', name: 'Esslingen am Neckar', region: 'Baden-Württemberg', population: 93820, postalCodePrefix: '73', lat: 48.7406, lng: 9.3104 },
  { slug: 'duren', name: 'Düren', region: 'Nordrhein-Westfalen', population: 91500, postalCodePrefix: '52', lat: 50.8024, lng: 6.4831 },
  { slug: 'ratingen', name: 'Ratingen', region: 'Nordrhein-Westfalen', population: 87913, postalCodePrefix: '40', lat: 51.2974, lng: 6.8511 },
  { slug: 'flensburg', name: 'Flensburg', region: 'Schleswig-Holstein', population: 89504, postalCodePrefix: '24', lat: 54.7836, lng: 9.4321 },
  { slug: 'tuebingen', name: 'Tübingen', region: 'Baden-Württemberg', population: 90634, postalCodePrefix: '72', lat: 48.5216, lng: 9.0576 },
  { slug: 'lueneburg', name: 'Lüneburg', region: 'Niedersachsen', population: 75827, postalCodePrefix: '21', lat: 53.2509, lng: 10.4115 },
  { slug: 'villingen-schwenningen', name: 'Villingen-Schwenningen', region: 'Baden-Württemberg', population: 85501, postalCodePrefix: '78', lat: 48.0608, lng: 8.4569 },
  { slug: 'konstanz', name: 'Konstanz', region: 'Baden-Württemberg', population: 84911, postalCodePrefix: '78', lat: 47.6603, lng: 9.1758 },
  { slug: 'minden', name: 'Minden', region: 'Nordrhein-Westfalen', population: 81041, postalCodePrefix: '32', lat: 52.2895, lng: 8.9133 },
  { slug: 'worms', name: 'Worms', region: 'Rheinland-Pfalz', population: 83542, postalCodePrefix: '67', lat: 49.6332, lng: 8.3597 },
  { slug: 'marburg', name: 'Marburg', region: 'Hessen', population: 76851, postalCodePrefix: '35', lat: 50.8021, lng: 8.7665 },
  { slug: 'dessau-rosslau', name: 'Dessau-Roßlau', region: 'Sachsen-Anhalt', population: 78534, postalCodePrefix: '06', lat: 51.8389, lng: 12.2425 },
  { slug: 'velbert', name: 'Velbert', region: 'Nordrhein-Westfalen', population: 82141, postalCodePrefix: '42', lat: 51.3361, lng: 7.0438 },
  { slug: 'neumuenster', name: 'Neumünster', region: 'Schleswig-Holstein', population: 79487, postalCodePrefix: '24', lat: 54.0743, lng: 9.9892 },
  { slug: 'norderstedt', name: 'Norderstedt', region: 'Schleswig-Holstein', population: 79839, postalCodePrefix: '22', lat: 53.7064, lng: 10.0096 },
  { slug: 'delmenhorst', name: 'Delmenhorst', region: 'Niedersachsen', population: 77825, postalCodePrefix: '27', lat: 53.0509, lng: 8.6312 },
  { slug: 'viersen', name: 'Viersen', region: 'Nordrhein-Westfalen', population: 76674, postalCodePrefix: '41', lat: 51.2566, lng: 6.3958 },
  { slug: 'gladbeck', name: 'Gladbeck', region: 'Nordrhein-Westfalen', population: 76137, postalCodePrefix: '45', lat: 51.5728, lng: 6.9856 },
  { slug: 'aalen', name: 'Aalen', region: 'Baden-Württemberg', population: 67919, postalCodePrefix: '73', lat: 48.8372, lng: 10.0938 },
  { slug: 'rosenheim', name: 'Rosenheim', region: 'Bayern', population: 63791, postalCodePrefix: '83', lat: 47.8561, lng: 12.1289 },
  { slug: 'baden-baden', name: 'Baden-Baden', region: 'Baden-Württemberg', population: 55449, postalCodePrefix: '76', lat: 48.7606, lng: 8.2398 },
  { slug: 'ravensburg', name: 'Ravensburg', region: 'Baden-Württemberg', population: 51045, postalCodePrefix: '88', lat: 47.7811, lng: 9.6112 },
  { slug: 'bayreuth', name: 'Bayreuth', region: 'Bayern', population: 74783, postalCodePrefix: '95', lat: 49.9456, lng: 11.5713 },
];

export function getCity(slug: string): GermanCity | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Liefert bis zu N geografisch benachbarte Staedte fuer interne Verlinkung.
 * Naehe = einfache Haversine-Approximation ueber Lat/Lng.
 */
export function getNearbyCities(city: GermanCity, limit = 6): GermanCity[] {
  if (!city.lat || !city.lng) return [];
  const withDistance = CITIES
    .filter((c) => c.slug !== city.slug && c.lat && c.lng)
    .map((c) => ({
      city: c,
      d: haversine(city.lat!, city.lng!, c.lat!, c.lng!),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.city);
  return withDistance;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
