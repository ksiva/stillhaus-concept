// Fictional houses for a concept site. Names, prices and details are invented;
// photos are licensed stock and do not show these places.
export type House = {
  slug: string;
  name: string;
  area: string;
  country: string;
  range: "Alps" | "North";
  altitude: number; // metres
  rooms: number;
  unit: "rooms" | "cabins";
  fromEUR: number;
  arrive: string;
  rituals: string[];
  line: string;
  story: string;
  days: { t: string; d: string }[];
  cover: number;
  gallery: number[];
};

export const houses: House[] = [
  {
    slug: "haus-laerche", name: "Haus Lärche", area: "Val di Funes", country: "Italy", range: "Alps",
    altitude: 1350, rooms: 10, unit: "rooms", fromEUR: 260, arrive: "Bus from Brixen station, 35 min",
    rituals: ["Hiking", "Sauna", "Kitchen"],
    line: "A larch-wood farmhouse facing the Odle peaks, ten rooms and one long table.",
    story: "The family has farmed this slope for four generations. The barn became the rooms, the hayloft the sauna, and the kitchen still runs on what the valley grows.",
    days: [{ t: "07:00", d: "Coffee on the bench as the light reaches the peaks" }, { t: "10:00", d: "A marked trail from the door to the Geisler alm" }, { t: "17:00", d: "Hayloft sauna, then a plunge in the spring trough" }, { t: "19:30", d: "Five courses from the valley, one sitting" }],
    cover: 76, gallery: [76, 78, 33, 52, 93],
  },
  {
    slug: "nattlys", name: "Nattlys", area: "Lofoten", country: "Norway", range: "North",
    altitude: 5, rooms: 12, unit: "rooms", fromEUR: 290, arrive: "Leknes airport, 40 min by car",
    rituals: ["Northern lights", "Sauna", "Sea"],
    line: "A red fisherman's house on stilts above a quiet bay, twelve rooms over the water.",
    story: "Built for cod season in the 1890s, restored with the same red paint and the same view. In winter the aurora is the evening programme; in summer the sun forgets to set.",
    days: [{ t: "09:00", d: "Breakfast of smoked fish and rye at the window" }, { t: "11:00", d: "Kayak the bay with a guide, or don't" }, { t: "15:00", d: "Floating sauna on the fjord, sea plunge optional" }, { t: "22:00", d: "Aurora call: we knock if the sky lights up" }],
    cover: 60, gallery: [60, 66, 69, 91, 96],
  },
  {
    slug: "sjostuga-tyst", name: "Sjöstuga Tyst", area: "Värmland", country: "Sweden", range: "North",
    altitude: 90, rooms: 6, unit: "cabins", fromEUR: 180, arrive: "Karlstad station, 1 h by car",
    rituals: ["Sauna", "Lake", "Silence"],
    line: "Six cabins on a forest lake, a wood-fired sauna and a jetty for every season.",
    story: "No road noise, no screens in the cabins, one shared boathouse kitchen. Guests come for a weekend and ask, on the Sunday, whether the cabin is free next week.",
    days: [{ t: "08:00", d: "First swim off the jetty, whatever the month" }, { t: "10:00", d: "Rowing boat and a thermos to the island" }, { t: "16:00", d: "Wood-fired sauna, birch whisks on the bench" }, { t: "20:00", d: "Dinner in the boathouse, candles only" }],
    cover: 20, gallery: [20, 22, 25, 29, 31],
  },
  {
    slug: "chalet-arvenholz", name: "Chalet Arvenholz", area: "Engadin", country: "Switzerland", range: "Alps",
    altitude: 1800, rooms: 9, unit: "rooms", fromEUR: 340, arrive: "Rhaetian Railway to Pontresina, 10 min",
    rituals: ["Skiing", "Hiking", "Sauna"],
    line: "Nine rooms panelled in stone pine above the Engadin lakes, skis at the door.",
    story: "Stone pine, the arve of the name, is said to help you sleep. The chalet is lined with it, and the guestbook suggests it works.",
    days: [{ t: "08:30", d: "Bircher muesli and the valley in sunlight" }, { t: "09:30", d: "Cross-country loop from the garden gate" }, { t: "15:00", d: "Stone-pine sauna, view of the glacier" }, { t: "19:00", d: "Fondue on Thursdays, otherwise the chef's menu" }],
    cover: 77, gallery: [77, 74, 35, 46, 92],
  },
  {
    slug: "huette-zwoelf", name: "Hütte Zwölf", area: "Zillertal", country: "Austria", range: "Alps",
    altitude: 1600, rooms: 8, unit: "rooms", fromEUR: 220, arrive: "Mayrhofen station, 25 min by shuttle",
    rituals: ["Hiking", "Fire", "Kitchen"],
    line: "An old summer hut, rebuilt with eight rooms and a stove in every one.",
    story: "For a century this was a hut for cattle and herders in summer. Now it stays open in winter too, with the same thick walls and a fire lit in every room by five.",
    days: [{ t: "08:00", d: "Fresh milk from the alm, bread from the oven" }, { t: "10:00", d: "Snowshoe route to the lake, packed lunch" }, { t: "16:00", d: "Stove lit, schnapps on the house" }, { t: "19:00", d: "Kaspressknödel and a long table" }],
    cover: 80, gallery: [80, 89, 49, 51, 56],
  },
  {
    slug: "granhus", name: "Granhus", area: "Lapland", country: "Finland", range: "North",
    altitude: 240, rooms: 7, unit: "cabins", fromEUR: 240, arrive: "Rovaniemi airport, 1 h 20 by transfer",
    rituals: ["Northern lights", "Sauna", "Silence"],
    line: "Seven A-frame cabins in a spruce forest, glass gables to the night sky.",
    story: "Each cabin faces north, toward the open bog where the aurora shows best. The smoke sauna takes eight hours to heat, and is worth every one of them.",
    days: [{ t: "10:00", d: "Late breakfast; the sun is barely up in December" }, { t: "12:00", d: "Ski the frozen bog with a guide" }, { t: "16:00", d: "Smoke sauna, then a hole in the ice" }, { t: "21:00", d: "Lie back under the glass gable and wait" }],
    cover: 6, gallery: [6, 5, 10, 57, 4],
  },
  {
    slug: "fjordtun", name: "Fjordtun", area: "Sognefjord", country: "Norway", range: "North",
    altitude: 30, rooms: 11, unit: "rooms", fromEUR: 270, arrive: "Flåm railway, then 20 min by boat",
    rituals: ["Hiking", "Sea", "Kitchen"],
    line: "A farm on the fjord shore with eleven rooms and its own orchard and cider.",
    story: "The orchard has grown apples on this steep shore for three hundred years. The cider is pressed in October, and the rooms look straight down the longest fjord in Norway.",
    days: [{ t: "08:00", d: "Apple juice from the press, eggs from the farm" }, { t: "10:00", d: "Boat to the waterfall trailhead" }, { t: "16:00", d: "Cider tasting in the old barn" }, { t: "19:00", d: "Fjord trout, orchard dessert" }],
    cover: 63, gallery: [63, 85, 39, 36, 88],
  },
];

export const rituals = ["Sauna", "Hiking", "Northern lights", "Lake", "Fire", "Skiing", "Silence", "Kitchen", "Sea"];
export const bySlug = (s: string) => houses.find((h) => h.slug === s)!;
