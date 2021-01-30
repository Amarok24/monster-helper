// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Intercept_HTTP_requests

// https://developer.chrome.com/docs/extensions/reference/webRequest/

// https://github.com/GoogleChrome/chrome-extensions-samples


if (typeof (self.chrome) !== undefined)
{
	console.log("Chromium browser detected");
}
else // self.browser
{
	console.log("Other browser than Chromium detected.");
}


(function (chrome)
{
	const re: RegExp = /j_jobid=(\d+)&j_postingid=([abcdef-\d]+)/;

	let jobId: number = 0;
	let uuid: string = ""; // Monster uses a version 4 (random data based) DCE 1.1, ISO/IEC 11578:1996
	let tabId: number = 0; // requestDetails.tabId of tab where request was found

	function HandleRequestStart(requestDetails: any)
	{
		/*
		requestDetails will be an object like this:
		{
			frameId: 0,
			initiator: "https://www.monster.co.uk",
			method: "GET",
			parentFrameId: -1,
			requestId: "2076",
			tabId: 111,
			timeStamp: 1612025040557.077,
			type: "xmlhttprequest",
			url: "https://logs2.jobs.com/cloudapi/click/pixel.gif?actiontype.....
		}
		*/


		// logging to console goes into "extension" console, not the main console
		//console.log("Loading: " + requestDetails.url);
		//if (requestDetails.url.startsWith("https://job-openings.monster.com/v2/tracking"))


			const found: any[] | null = requestDetails.url.match(re);
			tabId = requestDetails.tabId;

			console.log(`Request found, initiatior was tab ID ${tabId}`);

			console.log(requestDetails);

			if (found !== null)
			{
				jobId = found[1];
				uuid = found[2];
				console.log(`jobId = ${jobId}, UUID = ${uuid}`);

/* 
				chrome.storage.local.set({id: jobId}, function(x) {
					console.log('Value is set to ' + jobId);
				 });
 */

/*
				chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
					console.log(response);
				 });
 */
			}



	}



	chrome.webRequest.onBeforeRequest.addListener(
		HandleRequestStart,
		{ urls: ["https://logs2.jobs.com/cloudapi/click/*"] }
		//{ urls: ["<all_urls>"] }
		//,["blocking"]
	);


})(self.browser || self.chrome);




// URL with jobID :
// https://job-openings.awsqaus.monster.com/v2/tracking/track?FolderId=250555726&LogType=logview&JobId=210266244&_=1611151640728

// show in WebAdmin:  XXXXXXXXX = job ID
// https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=XXXXXXXXX&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=XXXXXXXXX&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=

// https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=XXXXXXXXX&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=XXXXXXXXX&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=
