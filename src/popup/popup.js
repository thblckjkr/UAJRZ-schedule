let getInfo = document.getElementById('getTableInfo');

/* chrome.storage.sync.get('color', function(data) {
   getInfo.setAttribute('value', data.color);
}); */

// #GridView_MateriasPorCursarPlan
getInfo.onclick = function(e) {
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //If we are in the respective tab
      chrome.tabs.executeScript(
         tabs[0].id,
         {code: 'document.body.style.backgroundColor = "#fff";'}
      );
   });
};