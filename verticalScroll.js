function waitTime(waitTimeSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitTimeSeconds);
    }, waitTimeSeconds * 1000);
  });
}

function limitCondtion(currentWindowYCoordinate, previousWindowYCoordinate) {
  return new Promise((resolve) => {
    resolve(currentWindowYCoordinate == previousWindowYCoordinate);
  });
}

async function main(
  prevWindowYCoordinate,
  scrollYCoordinatePixel,
  waitTimeSeconds
) {
  let elapsedTime = 0;
  console.log("Elapsed Time:%s[seconds]", String(elapsedTime));
  for (;;) {
    if (await limitCondtion(window.scrollY, prevWindowYCoordinate)) {
      break;
    } else {
      prevWindowYCoordinate = window.scrollY;
      window.scrollTo(0, prevWindowYCoordinate + scrollYCoordinatePixel);
    }
    elapsedTime = elapsedTime + (await waitTime(waitTimeSeconds));
    console.log("Elapsed Time:%s[seconds]", String(elapsedTime));
  }
}

main(-1, 300, 2);
