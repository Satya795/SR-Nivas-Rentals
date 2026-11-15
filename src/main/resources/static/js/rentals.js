// ============================================
// All SR Nivas homes live in this one list.
// Change a rent or add a new home here and
// every page updates by itself.
// (These are sample homes — replace with real ones.)
// ============================================

const rentals = [
  {
    id: "cozy-1bhk",
    name: "Cozy 1BHK Flat",
    type: "1BHK",
    rent: 9500,
    deposit: 30000,
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    furnishing: "Fully furnished",
    available: true,
    image: "images/home-1bhk.jpg",
    summary: "A bright, fully furnished flat with a private balcony — perfect for working professionals or students.",
    amenities: ["Air conditioner", "Study table", "Wardrobe", "Balcony", "24×7 water", "Wi-Fi ready"]
  },
  {
    id: "family-2bhk",
    name: "Family 2BHK Apartment",
    type: "2BHK",
    rent: 16000,
    deposit: 50000,
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    furnishing: "Semi furnished",
    available: true,
    image: "images/home-2bhk.jpg",
    summary: "A sunny living room, dining area and two comfortable bedrooms — made for small families.",
    amenities: ["Covered parking", "Modular kitchen", "Lift", "Power backup", "24×7 water", "CCTV"]
  },
  {
    id: "courtyard-3bhk",
    name: "Courtyard 3BHK House",
    type: "3BHK",
    rent: 25000,
    deposit: 80000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1600,
    furnishing: "Semi furnished",
    available: false,
    image: "images/home-3bhk.jpg",
    summary: "An independent house built around an open courtyard with a traditional wooden swing.",
    amenities: ["Open courtyard", "Wooden swing", "Car parking", "Pooja room", "Garden", "Power backup"]
  },
  {
    id: "villa-duplex",
    name: "Garden Duplex Villa",
    type: "4BHK",
    rent: 38000,
    deposit: 120000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2400,
    furnishing: "Unfurnished",
    available: true,
    image: "images/hero-home.jpg",
    summary: "Our signature two-storey home with a front garden, large balcony and gated entrance.",
    amenities: ["Front garden", "Large balcony", "Gated entry", "2 car parking", "Servant room", "Solar water"]
  }
];

// Turns 16000 into "₹16,000" (Indian style commas)
function formatRupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}
