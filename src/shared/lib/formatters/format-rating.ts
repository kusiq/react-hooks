const ratingFormatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const formatRating = (value: number) => ratingFormatter.format(value)
