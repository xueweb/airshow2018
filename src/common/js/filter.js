import vue from "vue"

vue.filter("trim", (value) => {
  if (!value) return '';
  if (value.charAt(value.length - 1) !== '路') {
    return value.substring(0, 2)
  }
});
