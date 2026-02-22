export interface Vitamin {
  name: string;
  pct: number;
}

export interface Ingredient {
  name: string;
  subtitle: string;
  weight: string;
  icon: string;
}

export interface FoodItem {
  slug: string;
  name: string;
  nameAccent: string; // word to highlight in orange
  cuisine: string;
  rating: number;
  reviews: number;
  calories: number;
  price: string;
  prepTime: string;
  tag: string;
  color: string; // Three.js mesh color
  glowColor: string;
  macros: {
    protein: { g: number; pct: number };
    carbs: { g: number; pct: number };
    fats: { g: number; pct: number };
  };
  vitamins: Vitamin[];
  ingredients: Ingredient[];
  activeIngredient: {
    name: string;
    description: string;
  };
  relatedSlugs: string[];
  shape: 'torus' | 'sphere' | 'octahedron' | 'cylinder' | 'icosahedron';
  modelUrl?: string; // Optional path to a custom .glb file in /public/models/
}

export const foodItems: FoodItem[] = [
  {
    slug: 'sushi-platter',
    name: 'Sushi Platter',
    modelUrl: "/models/cake.glb",
    nameAccent: 'Platter',
    cuisine: 'Japanese Fusion',
    rating: 4.8,
    reviews: 5,
    calories: 582,
    price: '$24.89',
    prepTime: '20 Min prep',
    tag: '3D NOW',
    color: '#c97b3a',
    glowColor: '#f48c25',
    macros: {
      protein: { g: 32, pct: 70 },
      carbs: { g: 48, pct: 38 },
      fats: { g: 12, pct: 15 },
    },
    vitamins: [
      { name: 'Vitamin D', pct: 42 },
      { name: 'Omega-3', pct: 78 },
      { name: 'Calcium', pct: 18 },
      { name: 'Iron', pct: 24 },
    ],
    ingredients: [
      { name: 'Fresh Atlantic Salmon', subtitle: 'Wild caught • Sashimi grade', weight: '85g', icon: '🐟' },
      { name: 'Japanese Short-Grain Rice', subtitle: 'Premium Grade • Vinegar Seasoned', weight: '120g', icon: '🍚' },
      { name: 'Organic Soy Glaze', subtitle: 'Non-GMO • Naturally Fermented', weight: '15g', icon: '💧' },
      { name: 'Nori Seaweed', subtitle: 'Sun-dried • Mineral rich', weight: '8g', icon: '🌿' },
    ],
    activeIngredient: {
      name: 'Sashimi Grade Salmon',
      description: 'Wild-caught Atlantic salmon, rich in omega-3 fatty acids and high-quality protein for superior muscle synthesis.',
    },
    relatedSlugs: ['gourmet-burger', 'avocado-toast', 'quinoa-bowl', 'salmon-poke'],
    shape: 'torus',
  },
  {
    slug: 'gourmet-burger',
    name: 'Gourmet Burger',
    modelUrl: "/models/hamburger.glb",
    nameAccent: 'Burger',
    cuisine: 'American Craft',
    rating: 4.6,
    reviews: 12,
    calories: 760,
    price: '$18.99',
    prepTime: '15 Min prep',
    tag: 'POPULAR',
    color: '#8b4513',
    glowColor: '#c0713a',
    macros: {
      protein: { g: 42, pct: 65 },
      carbs: { g: 58, pct: 52 },
      fats: { g: 38, pct: 42 },
    },
    vitamins: [
      { name: 'Protein', pct: 84 },
      { name: 'Iron', pct: 55 },
      { name: 'Zinc', pct: 62 },
      { name: 'Vitamin B12', pct: 70 },
    ],
    ingredients: [
      { name: 'Wagyu Beef Patty', subtitle: 'A5 Grade • Hand-formed', weight: '180g', icon: '🥩' },
      { name: 'Brioche Bun', subtitle: 'Artisan bakery • Butter-toasted', weight: '80g', icon: '🍞' },
      { name: 'Aged Cheddar', subtitle: '12-month aged • Sharp', weight: '30g', icon: '🧀' },
      { name: 'Caramelized Onions', subtitle: 'Slow-cooked • Balsamic glaze', weight: '40g', icon: '🧅' },
    ],
    activeIngredient: {
      name: 'A5 Wagyu Beef',
      description: 'Ultra-premium Japanese Wagyu, marbled with rich intramuscular fat delivering an unrivalled umami depth and buttery texture.',
    },
    relatedSlugs: ['sushi-platter', 'med-salad', 'falafel-wrap'],
    shape: 'sphere',
  },
  {
    slug: 'med-salad',
    name: 'Med Salad',
    modelUrl: "/models/cupcake.glb",
    nameAccent: 'Salad',
    cuisine: 'Mediterranean',
    rating: 4.5,
    reviews: 8,
    calories: 320,
    price: '$14.50',
    prepTime: '10 Min prep',
    tag: 'FRESH',
    color: '#4a8c3f',
    glowColor: '#6abf5a',
    macros: {
      protein: { g: 12, pct: 28 },
      carbs: { g: 32, pct: 40 },
      fats: { g: 18, pct: 32 },
    },
    vitamins: [
      { name: 'Vitamin K', pct: 92 },
      { name: 'Folate', pct: 68 },
      { name: 'Vitamin C', pct: 76 },
      { name: 'Magnesium', pct: 38 },
    ],
    ingredients: [
      { name: 'Romaine Lettuce', subtitle: 'Fresh • Chilled', weight: '100g', icon: '🥬' },
      { name: 'Kalamata Olives', subtitle: 'Stone-pit cured • Extra virgin', weight: '30g', icon: '🫒' },
      { name: 'Feta Cheese', subtitle: 'PDO Greek • Crumbled', weight: '40g', icon: '🧀' },
      { name: 'Cherry Tomatoes', subtitle: 'Vine-ripened • Sweet', weight: '60g', icon: '🍅' },
    ],
    activeIngredient: {
      name: 'Kalamata Olives',
      description: 'Premium PDO-designated olives from Kalamata, Greece. Rich in oleocanthal with powerful anti-inflammatory properties.',
    },
    relatedSlugs: ['avocado-toast', 'quinoa-bowl', 'falafel-wrap'],
    shape: 'icosahedron',
  },
  {
    slug: 'avocado-toast',
    name: 'Artesian Avocado Toast',
    modelUrl: "/models/fullmeal.glb",
    nameAccent: 'AVOCADO TOAST',
    cuisine: 'Modern Brunch',
    rating: 4.7,
    reviews: 9,
    calories: 420,
    price: '$12.99',
    prepTime: '12 Min prep',
    tag: 'FEATURED',
    color: '#5a8c3a',
    glowColor: '#7abf4a',
    macros: {
      protein: { g: 12, pct: 30 },
      carbs: { g: 45, pct: 55 },
      fats: { g: 28, pct: 40 },
    },
    vitamins: [
      { name: 'Vitamin K', pct: 26 },
      { name: 'Folate', pct: 20 },
      { name: 'Potassium', pct: 16 },
      { name: 'Vitamin C', pct: 17 },
    ],
    ingredients: [
      { name: 'Sourdough Slice (Toasted)', subtitle: 'Artisan baked • Stone ground', weight: '80g', icon: '🍞' },
      { name: 'Hass Avocado (Mashed)', subtitle: 'Ripe • Cold-pressed lime', weight: '120g', icon: '🥑' },
      { name: 'Large Poached Egg', subtitle: 'Free-range • Runny yolk', weight: '50g', icon: '🥚' },
      { name: 'Red Pepper Flakes & Sea Salt', subtitle: 'Smoked paprika blend', weight: '2g', icon: '🌶️' },
    ],
    activeIngredient: {
      name: 'Organic Hass Avocado',
      description: 'Rich in monounsaturated fats and potassium, providing a creamy texture and heart-healthy benefits.',
    },
    relatedSlugs: ['salmon-poke', 'quinoa-bowl', 'med-salad', 'falafel-wrap'],
    shape: 'sphere',
  },
  {
    slug: 'salmon-poke',
    name: 'Salmon Poke',
    modelUrl: "/models/meal2.glb",
    nameAccent: 'Poke',
    cuisine: 'Hawaiian Fusion',
    rating: 4.9,
    reviews: 15,
    calories: 510,
    price: '$19.99',
    prepTime: '15 Min prep',
    tag: 'NEW',
    color: '#e05050',
    glowColor: '#ff7070',
    macros: {
      protein: { g: 38, pct: 75 },
      carbs: { g: 42, pct: 45 },
      fats: { g: 16, pct: 22 },
    },
    vitamins: [
      { name: 'Omega-3', pct: 85 },
      { name: 'Vitamin B12', pct: 90 },
      { name: 'Selenium', pct: 65 },
      { name: 'Vitamin D', pct: 48 },
    ],
    ingredients: [
      { name: 'Sushi-grade Salmon', subtitle: 'Wild-caught • Ocean-fresh', weight: '150g', icon: '🐟' },
      { name: 'Brown Rice Base', subtitle: 'Whole grain • Sesame seasoned', weight: '130g', icon: '🍚' },
      { name: 'Edamame Beans', subtitle: 'Steamed • Lightly salted', weight: '40g', icon: '🫘' },
      { name: 'Mango Salsa', subtitle: 'Tropical • Fresh-cut', weight: '35g', icon: '🥭' },
    ],
    activeIngredient: {
      name: 'Wild-Caught Salmon',
      description: 'Sustainably sourced, sushi-grade salmon with exceptional omega-3 content supporting cardiovascular and cognitive health.',
    },
    relatedSlugs: ['sushi-platter', 'quinoa-bowl', 'avocado-toast'],
    shape: 'octahedron',
  },
  {
    slug: 'quinoa-bowl',
    name: 'Quinoa Bowl',
    modelUrl: "/models/meal3.glb",
    nameAccent: 'Bowl',
    cuisine: 'Health Forward',
    rating: 4.4,
    reviews: 6,
    calories: 390,
    price: '$15.50',
    prepTime: '18 Min prep',
    tag: 'VEGAN',
    color: '#9b7c3a',
    glowColor: '#c9a05a',
    macros: {
      protein: { g: 18, pct: 42 },
      carbs: { g: 52, pct: 58 },
      fats: { g: 12, pct: 18 },
    },
    vitamins: [
      { name: 'Manganese', pct: 58 },
      { name: 'Phosphorus', pct: 45 },
      { name: 'Magnesium', pct: 40 },
      { name: 'Folate', pct: 38 },
    ],
    ingredients: [
      { name: 'Tri-Color Quinoa', subtitle: 'Organic • Complete protein', weight: '150g', icon: '🌾' },
      { name: 'Roasted Sweet Potato', subtitle: 'Maple glazed • Crispy', weight: '90g', icon: '🍠' },
      { name: 'Black Beans', subtitle: 'Seasoned • Fiber-rich', weight: '60g', icon: '🫘' },
      { name: 'Tahini Dressing', subtitle: 'Sesame • Lemon-garlic', weight: '30g', icon: '💛' },
    ],
    activeIngredient: {
      name: 'Tri-Color Quinoa',
      description: 'A complete plant protein containing all 9 essential amino acids. High in fiber, iron, and magnesium.',
    },
    relatedSlugs: ['med-salad', 'avocado-toast', 'falafel-wrap'],
    shape: 'cylinder',
  },
  {
    slug: 'falafel-wrap',
    name: 'Falafel Wrap',
    modelUrl: "/models/Pepperoni_pizza.glb",
    nameAccent: 'Wrap',
    cuisine: 'Middle Eastern',
    rating: 4.5,
    reviews: 11,
    calories: 460,
    price: '$13.75',
    prepTime: '14 Min prep',
    tag: 'VEGAN',
    color: '#c4a050',
    glowColor: '#e8c070',
    macros: {
      protein: { g: 20, pct: 45 },
      carbs: { g: 60, pct: 62 },
      fats: { g: 20, pct: 28 },
    },
    vitamins: [
      { name: 'Iron', pct: 48 },
      { name: 'Folate', pct: 55 },
      { name: 'Vitamin B6', pct: 35 },
      { name: 'Manganese', pct: 42 },
    ],
    ingredients: [
      { name: 'Chickpea Falafel', subtitle: 'Herb-spiced • Pan-fried', weight: '120g', icon: '⚫' },
      { name: 'Whole Wheat Pita', subtitle: 'Fresh-baked • Warm', weight: '70g', icon: '🫓' },
      { name: 'Tahini Sauce', subtitle: 'Creamy • Garlic-lemon', weight: '40g', icon: '💛' },
      { name: 'Israeli Salad Mix', subtitle: 'Cucumber, tomato, parsley', weight: '80g', icon: '🥗' },
    ],
    activeIngredient: {
      name: 'Herb-Spiced Chickpea Falafel',
      description: 'Traditional chickpea falafel blended with fresh parsley, cumin, and coriander. A plant-based protein powerhouse.',
    },
    relatedSlugs: ['quinoa-bowl', 'med-salad', 'avocado-toast'],
    shape: 'icosahedron',
  },
];

export const getFoodBySlug = (slug: string): FoodItem | undefined =>
  foodItems.find((f) => f.slug === slug);

export const mainGalleryItems = foodItems.slice(0, 3); // Sushi, Burger, Salad
