"use strict";
if (typeof (self.chrome) !== undefined) {
    console.log("Chromium browser detected");
}
else {
    console.log("Other browser than Chromium detected.");
}
(function (chrome) {
    const re = /j_jobid=(\d+)&j_postingid=([abcdef-\d]+)/;
    let jobId = 0;
    let uuid = "";
    let tabId = 0;
    function HandleRequestStart(requestDetails) {
        const found = requestDetails.url.match(re);
        tabId = requestDetails.tabId;
        console.log(`Request found, initiatior was tab ID ${tabId}`);
        console.log(requestDetails);
        if (found !== null) {
            jobId = found[1];
            uuid = found[2];
            console.log(`jobId = ${jobId}, UUID = ${uuid}`);
        }
    }
    chrome.webRequest.onBeforeRequest.addListener(HandleRequestStart, { urls: ["https://logs2.jobs.com/cloudapi/click/*"] });
})(self.browser || self.chrome);
//# sourceMappingURL=background.js.map