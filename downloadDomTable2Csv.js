async function downloadCsv(downLoadFileName) {
    return new Promise((resolve, reject) => {
        // ライブラリの読み込み
        // https://www.npmjs.com/package/excellentexport
        let scriptLibrary = document.createElement("script");
        scriptLibrary.setAttribute("type", "text/javascript");
        scriptLibrary.setAttribute(
            "src",
            "https://cdn.jsdelivr.net/npm/excellentexport@3.4.3/dist/excellentexport.min.js"
        );
        document.head.appendChild(scriptLibrary);
        // ライブラリの読み込み待ち時間
        // 3秒後にダウンロード開始
        setTimeout(function () {
            let downloadButton = document.createElement("a");

            downloadButton.setAttribute("download", downLoadFileName);

            downloadButton.setAttribute("href", "#");

            downloadButton.setAttribute(
                "onclick",
                "return ExcellentExport.csv(this, 'targetTableId');"
            );

            downloadButton.click();

            downloadButton.remove();
            let successMessage = "Complete Download";
            let resultInfo = {
                status: 0,
                message: successMessage,
            };
            resolve(resultInfo);
        }, 3000);
    });
}

async function undefineTargetDom(targetTableXpath) {
    return new Promise((resolve, reject) => {
        let targetTableDom = document
            .evaluate(
                targetTableXpath,
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            )
            .snapshotItem(0);
        if (targetTableDom === undefined || targetTableDom === null) {
            let errorMessage = "Can not define table dom";
            alert(errorMessage);
            let errorInfo = {
                status: 1,
                message: errorMessage,
            };
            reject(errorInfo);
        }
        // 対象DOMテーブルに一意のIDを付番
        targetTableDom.removeAttribute("id");

        resolve(targetTableDom);
    });
}

async function defineTargetDom(targetTableXpath) {
    return new Promise((resolve, reject) => {
        let targetTableDom = document
            .evaluate(
                targetTableXpath,
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            )
            .snapshotItem(0);
        if (targetTableDom === undefined || targetTableDom === null) {
            let errorMessage = "Can not define table dom";
            alert(errorMessage);
            let errorInfo = {
                status: 1,
                message: errorMessage,
            };
            reject(errorInfo);
        }
        // 対象DOMテーブルに一意のIDを付番
        targetTableDom.setAttribute("id", "targetTableId");

        resolve(targetTableDom);
    });
}

async function checkInputTargetTableXpath() {
    return new Promise((resolve, reject) => {
        let targetTableXpath = prompt("Please Input TargetTableXpath");

        if (targetTableXpath === undefined || targetTableXpath === "") {
            let errorMessage = "Must Input TargetTableXpath";
            alert(errorMessage);
            let errorInfo = {
                status: 1,
                message: errorMessage,
            };
            reject(errorInfo);
        }

        let resultInfo = {
            tableXpath: targetTableXpath,
        };
        resolve(resultInfo);
    });
}

async function checkInputDownLoadFileName() {
    return new Promise((resolve, reject) => {
        let targetDownLoadFileName = prompt(
            "Please Input DownLoadFileName. Not Include Suffix."
        );
        let suffix = ".tsv";
        let timeStamp = formatDateTime(new Date(), "yyyy-MM-ddTHH-mm-ss");
        if (targetDownLoadFileName === undefined || targetDownLoadFileName === "") {
            targetDownLoadFileName = "sample-" + timeStamp + suffix;
        }
        let resultInfo = {
            downLoadFileName: targetDownLoadFileName + "-" + timeStamp + suffix,
        };
        resolve(resultInfo);
    });
}

function formatDateTime(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
    return format;
}

async function main() {
    let tableXpathInfo = await checkInputTargetTableXpath();

    console.log(tableXpathInfo);

    let downLoadFileNameInfo = await checkInputDownLoadFileName();

    console.log(downLoadFileNameInfo);

    defineTargetDom(tableXpathInfo.tableXpath)
        .then((resultInfo) => {
            console.log(resultInfo);
            return downloadCsv(downLoadFileNameInfo.downLoadFileName);
        })
        .then((resultInfo) => {
            console.log(resultInfo);
            return undefineTargetDom(tableXpathInfo.tableXpath);
        })
        .then((resultInfo) => {
            console.log(resultInfo);
        })
        .catch((errorInfo) => {
            console.log(errorInfo);
        });
}

main();
