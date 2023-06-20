const counties = [];

const compatibility = [
  ['0'],
  ['1', '2'],
  ['3', '4'],
  ['5'],
  ['6', '7'],
  ['8', '9', '10', '11', '12', '13'],
  ['14', '15', '16', '17', '18'],
  ['19', '20'],
  ['21', '22', '23', '24'],
];

const getCompatibilityMap = () => {
  const compatibilityMap = new Map();

  for (let c in compatibility) {
    const arr = compatibility[c]
    for (let e of arr) {
      compatibilityMap.set(e.toString(), c);
    }
  }

  return compatibilityMap;
};

const criteria = [
  "total",
  "males",
  "females",
  "paid",
  "unpaid",
  "unemployment_rate",
  "females_unemployment_rate",
  "males_unemployment_rate",
  "no_studies",
  "gimnazial",
  "highschool",
  "post_highschool",
  "professional",
  "universitar",
  "between25_29",
  "between30_39",
  "between40_49",
  "between50_55",
  "over55",
  "urban",
  "rural",
  "females_urban",
  "females_rural",
  "males_urban",
  "males_rural",
];

const chosen = [];

export { counties, criteria, getCompatibilityMap, compatibility, chosen };
