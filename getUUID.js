function getUUID() {
  return URL.createObjectURL(new Blob()).slice(-36)
}

getUUID()
