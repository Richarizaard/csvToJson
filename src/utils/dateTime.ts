// Converts 'M/D/YYYY' to 'YYYY-MM-DD' format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// Calculates age by using the current date, or death date, whichever comes first
export function calculateAge(birthday: string, deathday: string): number {
  const birthDate = new Date(birthday)
  const deathDate = new Date(deathday)
  const today = new Date()

  const finalDate =
    deathDate instanceof Date && !isNaN(deathDate.getTime()) ? deathDate : today
  const month = finalDate.getMonth() - birthDate.getMonth()

  let age = finalDate.getFullYear() - birthDate.getFullYear()
  if (month < 0 || (month === 0 && finalDate.getDate() < birthDate.getDate())) {
    age -= 1
  }

  return age
}
