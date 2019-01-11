import localforage from "localforage"

export default function savePic(list, query) {
  const result = [];
  const PIC = '__pic__';
  for (let i in list) {
    result.push({})
  }
  localforage.setItem(PIC)

}

class User {
  constructor() {

  }
}
