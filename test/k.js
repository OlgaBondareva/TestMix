let someFunction = (num1, num2, callback) => {
  let number = Math.ceil(Math.random() * (num1 - num2) + num2)
  callback(number)
}

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('42')
  }, 2000)

})

someFunction(13, 15, (num) => {
  console.log('callback called! ' + num)
  promise.then(result => {
    console.log(result)
  })
})