
const outputId: HTMLElement | null = document.getElementById("tabId");

if (outputId !== null)
{

	chrome.storage.local.get(["id"], function(result) {
		console.log('Value currently is ' + result.key);
		outputId.innerText = result.key;
	 });
	
	console.log("popup.js here");


	
	function handleMessage(request: any, sender: any, sendResponse: any)
	{
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		if (request.greeting == "hello")
			sendResponse({ farewell: "goodbye" });
	}

	/*
	chrome.runtime.onMessage.addListener(handleMessage);
	 */


}
