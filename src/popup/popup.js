let clean = document.getElementById('btn-clean');
let save = document.getElementById('btn-save');
let select = document.getElementById('select-campus');

var pending = []; var template = [];

function ajax(url, method, callback, params = null) {
   var obj;
   try {   
    obj = new XMLHttpRequest();  
   } catch(e){   
     try {     
       obj = new ActiveXObject("Msxml2.XMLHTTP");     
     } catch(e) {     
       try { 
         obj = new ActiveXObject("Microsoft.XMLHTTP");       
       } catch(e) {       
         alert("Your browser does not support Ajax.");       
         return false;       
       }     
     }   
   }
   obj.onreadystatechange = function() {
    if(obj.readyState == 4) {
       callback(obj);
    } 
   }
   obj.open(method, url, true);
   obj.send(params);
   return obj; 
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

// Export the data and compare keys
function ex(stringfile){
   var data = stringfile.split("\n");
   var final = [];
   final.push(data[0]);
   for(var i = 0; i < data.length; i++){
      var temp = data[i].split(",");
      for(var j = 1; j < pending.length; j++){
         if( temp[ template.UACJ.columnID ].split("-").join("") == pending[j][ template.UACJ.columnName ] ){
            final.push( temp.join(",") );
         }
      }
   }
   final = final.join('\n');
   // Final text is in final, so download it
   download(final, "horario.csv", "text/csv");
}

chrome.storage.local.get( [ 'subjectsPending', 'template' ], function(data) {
   // Check if there is no information
   if ( !( data.subjectsPending.length == 0) ){
      document.getElementById('count').innerText = data.subjectsPending.length;
   }
   template = data.template;
   pending = data.subjectsPending;

   var campus = template.UACJ.campus;
   for(var i = 0; i < campus.length; i++){
      var opt = document.createElement('option');
      opt.value = campus[i].documentName;
      opt.innerHTML = campus[i].name;
      select.appendChild(opt);
   }
});

clean.onclick = function(){
   chrome.storage.local.set( { subjectsPending : [] } );
   document.getElementById('count').innerText = 0;
}

save.onclick = function(){
   // Check if there is no information
   if ( pending.length == 0 ){
      alert("No hay datos para guardar");
   }else{
      var file = select.options[select.selectedIndex].value;;
      var url = chrome.runtime.getURL(file);

      ajax(url, "GET", function(file){
         ex(file.response);
      })
   }
}