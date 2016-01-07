export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 4) {
      return onlyNums + ' '
    }
    if (onlyNums.length === 7) {
      return onlyNums.slice(0, 4) + ' ' + onlyNums.slice(4) + ' '
    }
  }
  if (onlyNums.length <= 4) {
    return onlyNums
  }
  if (onlyNums.length <= 7) {
    return onlyNums.slice(0, 4) + ' ' + onlyNums.slice(4)
  }
  if (onlyNums.length <= 10) {
    return onlyNums.slice(0, 4) + ' ' + onlyNums.slice(4, 7) + ' ' + onlyNums.slice(7, 10)
  }

  return onlyNums.slice(0, 1) + ' ' + onlyNums.slice(1, 5) + ' ' + onlyNums.slice(5, 8) + ' ' + onlyNums.slice(8, 11)
}
