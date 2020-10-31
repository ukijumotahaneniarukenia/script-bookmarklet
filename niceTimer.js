function watchElapsedTime(elapsedTimeSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(elapsedTimeSeconds + 1);
    }, 1000);
  });
}

function limitCondtion(elapsedTimeSeconds, upperLimitSeconds) {
  return new Promise((resolve) => {
    resolve(elapsedTimeSeconds < upperLimitSeconds);
  });
}

async function main(upperLimitSeconds) {
  for (let i = 0; await limitCondtion(i, upperLimitSeconds); i++) {
    console.log(await watchElapsedTime(i));
  }
};

main(7);
