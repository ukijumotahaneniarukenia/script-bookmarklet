function watchElapseTimeSecondsNG(waitTimeSeconds, watchTimeSeconds) {
  let elapsedTimeSeconds = 0;
  const timer = setInterval(() => {
    console.log("ElapsedTimeSeconds", ++elapsedTimeSeconds);
    if (waitTimeSeconds === elapsedTimeSeconds) {
      clearInterval(timer);
    }
  }, watchTimeSeconds * 1000);
}

function watchElapseTimeSecondsOK(waitTimeSeconds, watchTimeSeconds) {
  let elapsedTimeSeconds = 0;
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      console.log("ElapsedTimeSeconds", ++elapsedTimeSeconds);
      if (waitTimeSeconds - 1 === elapsedTimeSeconds) {
        clearInterval(timer);
        resolve(++elapsedTimeSeconds);
      }
    }, watchTimeSeconds * 1000);
  });
}

function processAfterXXXSeconds(waitTimeSeconds, ...processPatternArgs) {
  let processPattern = processPatternArgs[0];
  if (
    processPattern === undefined ||
    processPattern === null ||
    processPattern === ""
  ) {
    processPattern = "NG";
  }
  console.log("Start processAfterXXXSeconds", waitTimeSeconds);
  return new Promise((resolve, reject) => {
    if (processPattern === "NG") {
      watchElapseTimeSecondsNG(waitTimeSeconds, 1);
    } else {
      watchElapseTimeSecondsOK(waitTimeSeconds, 1).then((message) => {
        console.log("ElapsedTimeSeconds", message);
      });
    }
    setTimeout(() => {
      resolve("resolved");
    }, waitTimeSeconds * 1000);
  });
}

async function mainNG() {
  console.log("Start");
  const a = await processAfterXXXSeconds(5);
  console.log(a);
  const b = await processAfterXXXSeconds(3);
  console.log(b);
  const c = await processAfterXXXSeconds(2);
  console.log(c);
  console.log("End");
}

async function mainOK() {
  console.log("Start");
  const a = await processAfterXXXSeconds(5, "OK");
  console.log(a);
  const b = await processAfterXXXSeconds(3, "OK");
  console.log(b);
  const c = await processAfterXXXSeconds(2, "OK");
  console.log(c);
  console.log("End");
}

mainOK();
// mainNG();
