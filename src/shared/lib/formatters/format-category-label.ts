const CATEGORY_LABELS: Record<string, string> = {
  beauty: 'Красота',
  fragrances: 'Ароматы',
  furniture: 'Мебель',
  groceries: 'Продукты',
  'home-decoration': 'Декор для дома',
  'kitchen-accessories': 'Кухонные аксессуары',
  laptops: 'Ноутбуки',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'mobile-accessories': 'Аксессуары для телефона',
  motorcycle: 'Мотоциклы',
  'skin-care': 'Уход за кожей',
  smartphones: 'Смартфоны',
  'sports-accessories': 'Спортивные аксессуары',
  sunglasses: 'Солнцезащитные очки',
  tablets: 'Планшеты',
  tops: 'Топы',
  vehicle: 'Транспорт',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'womens-jewellery': 'Женские украшения',
  'womens-shoes': 'Женская обувь',
  'womens-watches': 'Женские часы',
}

const humanizeFallback = (value: string) =>
  value
    .split('-')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ')

export const formatCategoryLabel = (value: string) =>
  CATEGORY_LABELS[value] ?? humanizeFallback(value)
