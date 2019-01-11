// let arr2=[1,2,3,4,4]
// console.log(arr2)
// export function isAllEqual(array) {
//   if (array.length >= 2) {
//     let arr = [];
//     arr.push(array[0].ticketDate);
//     for (let i = 0; i < array.length; i++) {
//       if (arr[0].ticketDate !== array[i].ticketDate) {
//         console.log(arr);
//         console.log( array[i].ticketDate);
//         return false
//       } else {
//         return true
//       }
//     }
//   } else if (array.length === 1) {
//     return true
//   }
// }


// function selcet(c) {
//   const arr = [1, 2, 3, 4, 5];
//   // arr.forEach((item, index) => {//   }
//   //   if (index === c) {
//   // })
//   // arr.findIndex(()=>{
//   //d
//   // })
//   const item=arr[c]
//   return item
//
// }
// console.log(selcet(2));
//
//  let a={
//   a:{id:1},
//   b:{id:2},
//   c:{id:3},
//   d:{id:4},
//   e:{id:15},
//  }
// for( let i in a){
//   let arr=[]
//   typeof a[i]==='undefined'
//   a[i]=[]
//   arr.push(arr[i])
//   console.log(arr)
// }
// let item
// let arr=[1,2,3,4,"d"]
// for(let i in arr){
//   if(arr[i]==="d"){
//     item=arr[i]
//     console.log(item)
//
//   }
// }

// const a = new Promise(() => {
//   return 1
// })
// a.then((a) => {
//   console.log(a);
// })
// let arr = [[1], [2], [3]];
// let c = []
// for (let i in arr) {
//   if (typeof c[i] === 'undefined') {
//     c[i] = []
//   }
//
// }
//   console.log(arr);
// let d = [];
// let arr = [[1, 2, 3], [2], [4]]
// for (let i in arr) {
//   if (arr[i].length > 0) {
//     for (let j in arr[i]) {
//       if (!d[i]) {
//         d[i] = 0;
//       }
//       d[i] += arr[i][j];
//     }
//   }
// }
// console.log(d);
//
//
// console.log(!3);

// var count=10
// function a() {
//   var count=0;
//   return function () {
//     count+=1
//     console.log(count);
//   }
//
// }
// var s=a()
// s()
// s()
// console.log(3?!3:3)

/*const arr=[{a:2,id:2},{b:1,id:3}]
arr.forEach((item)=>{
  item[id]
})
*/


// let arr=[1,2,3,3,2];
// let map=new Set([...arr]);
// console.log([...map]);

function D() {

}

D.prototype.get = function () {
  console.log(1)
}


function C() {

}

C.prototype.set = Object.create(D.prototype);


console.log(C.constructor);

