function main() {
  console.group("Convert Image Dom to DataUrl");

  const targetImageDomList = Array.from(document.querySelectorAll("img"));

  targetImageDomList.map((targetImageDom) => {
    let targetCanvasDom = document.createElement("canvas");
    let targetCanvasDomContext = targetCanvasDom.getContext("2d");
    targetCanvasDom.width = targetImageDom.width;
    targetCanvasDom.height = targetImageDom.height;

    try {
      targetCanvasDomContext.drawImage(targetImageDom, 0, 0);
      const targetItemInfo = {
        imageDom: targetImageDom,
        imageDataUrl: targetCanvasDom.toDataURL(),
      };
      console.log(targetItemInfo);
    } catch (error) {
      console.log(error);
    }
  });
  console.groupEnd("Convert Image Dom to DataUrl");
}

main();
