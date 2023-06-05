type mashTemp = {
  temp: {
    value: number;
    unit: string;
  };
  duration: number;
};

type malt = {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
};

type hops = {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  add: string;
  attribute: string;
};

type beer = {
  id: number;
  name: string;
  tagline: string;
  first_brewed: "04/2007";
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: {
    value: number;
    unit: string;
  };
  boil_volume: {
    value: number;
    unit: string;
  };
  method: {
    mash_temp: mashTemp[];
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist?: string;
  };
  ingredients: {
    malt: malt[];
    hops: hops[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
};

type comment = {
  id: number;
  beerId: number;
  name: string;
  comment: string;
  avatar: string;
  createdAt: string;
};
