export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function isAllEqual(array) {
  if (array.length >= 2) {
    let arr = [];
    arr.push(array[0]);
    for (let i = 0; i < array.length; i++) {
      if (arr[0].ticketDate !== array[i].ticketDate) {
        console.log( arr[0]);
        console.log( array[i]);
        return false
      } else {
        return true
      }
    }
  } else if (array.length === 1) {
    return true
  }
}
