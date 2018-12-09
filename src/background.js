chrome.runtime.onInstalled.addListener(function() {
   chrome.storage.local.set( { template : template } );
   chrome.storage.local.set( { subjectsPending : [] } );

   // Read all the url's from template and create pagesmatcher
   // So, it's a way to have a template for watching pages
   var pagesMatcher = [];
   for (var key in template){
      if (!template.hasOwnProperty(key)) continue;
      var url = template[key].baseUrl;

      pagesMatcher.push(
         new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlEquals: url },
         })
      )
      console.log(url);
   }

   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
         conditions: pagesMatcher,
         actions: [
            new chrome.declarativeContent.ShowPageAction(),
            new chrome.declarativeContent.RequestContentScript({ js: [ "resources/jquery.min.js", "content.js"] })
         ]
      }]);
   });
});