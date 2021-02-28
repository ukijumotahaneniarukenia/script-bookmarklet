// https://validator.w3.org/

async function changeLocation() {
  return new Promise((resolve) => {
    window.location = 'http://validator.w3.org/check?uri=' + escape(window.location)
    resolve()
  })
}

async function main() {
  await changeLocation()
}

main()
