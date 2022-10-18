export const realEstateSub = [
  {
    type: "land",
    label: "Land",
    icon: "ic:sharp-landscape",
  },
  {
    type: "residential",
    label: "Residential",
    icon: "bi:house-fill",
  },
  {
    type: "commercial",
    label: "Commercial",
    icon: "tabler:businessplan",
  },
  {
    type: "luxury",
    label: "Luxury",
    icon: "la:gem-solid",
  },
];
export const realEstateTypeLabelMapping = realEstateSub.reduce(
  (obj, { type, label }) => ({
    ...obj,
    [type]: label,
  }),
  {}
);

export const hashDealzSub = [
  {
    type: "deals",
    label: "Deals",
    icon: "gis:tags-o",
  },
  {
    type: "supermarket",
    label: "Supermarket",
    icon: "ps:cart-supermarket",
  },
  {
    type: "health_beauty",
    label: "Health & Beauty",
    icon: "map:beauty-salon",
  },
  {
    type: "home_office",
    label: "Home & Office",
    icon: "bx:building-house",
  },
  {
    type: "phone_tablet",
    label: "Phone & Tablets",
    icon: "bi:phone",
  },
  {
    type: "computing",
    label: "Computing",
    icon: "heroicons-outline:desktop-computer",
  },
  {
    type: "electronics",
    label: "Electronics",
    icon: "pepicons:television",
  },
  {
    type: "women_fashion",
    label: "Women's Fashion",
    icon: "icon-park-outline:full-dress-longuette",
  },
  {
    type: "men_fashion",
    label: "Men's Fashion",
    icon: "ri:shirt-line",
  },
  {
    type: "baby_products",
    label: "Baby Products",
    icon: "cil:baby",
  },
  {
    type: "gaming",
    label: "Gaming",
    icon: "carbon:game-wireless",
  },
  {
    type: "sporting_goods",
    label: "Sporting Goods",
    icon: "icon-park-outline:sport",
  },
  {
    type: "automobile",
    label: "Automobile",
    icon: "fa:automobile",
  },
];

export const hashDealzTypeLabelMapping = hashDealzSub.reduce(
  (obj, { type, label }) => ({
    ...obj,
    [type]: label,
  }),
  {}
);
