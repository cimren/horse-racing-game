export const getRandomElements = (arr: Array<object>, count: number): Array<object> => {
  const arrayCopy = [...arr]
  const newArray = []

  for (let i = 0; i < count; i++) {
    const randNum = Math.floor(Math.random() * arrayCopy.length)
    const splicedItem = arrayCopy.splice(randNum, 1)[0]
    newArray.push(splicedItem)
  }
  return newArray
}

export const getOrdinalSuffix = (index: number): string => {
  const suffixes = ['st', 'nd', 'rd', 'th']
  const suffix = index < 4 ? suffixes[index] : 'th'
  return `${index + 1}${suffix}`
}
