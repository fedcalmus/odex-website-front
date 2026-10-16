// Armenian labels for the API's shared taxonomies. Keys are the backend's
// stable snake_case values (apps/common/constants.py) — never rename them.
// Wording is the admin panel's own (outdoor-admin-frontend hy.json), so the
// public site and the back office name things the same way.

export const REGION_LABELS: Readonly<Record<string, string>> = {
  yerevan: "Երևան",
  aragatsotn: "Արագածոտն",
  ararat: "Արարատ",
  armavir: "Արմավիր",
  gegharkunik: "Գեղարքունիք",
  kotayk: "Կոտայք",
  lori: "Լոռի",
  shirak: "Շիրակ",
  syunik: "Սյունիք",
  tavush: "Տավուշ",
  vayots_dzor: "Վայոց ձոր",
};

export const ACTIVITY_TYPE_LABELS: Readonly<Record<string, string>> = {
  hiking: "Արշավական",
  trail_running: "Վազք",
  cycling: "Հեծանիվ",
  climbing: "Մագլցում",
  zipline: "Զիպ լայն",
  skydiving: "Ազատ անկում",
  parachuting: "Պարաշուտ",
  paragliding: "Պարապլան",
  hang_gliding: "Դելտապլան",
  sup_boarding: "Սապ բորդ",
  yachting: "Յախտա",
  surfing: "Սերֆինգ",
  kayaking: "Կայակինգ",
  rafting: "Ռաֆտինգ",
  canyoneering: "Կանյոնի հաղթահարում",
  wakeboarding: "Վեյքբորդինգ",
  skiing: "Դահուկ",
  snowboarding: "Սնուուբորդ",
  other: "Այլ",
};
