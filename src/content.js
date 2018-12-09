function inArray(col, obj, array){
   for (var i = 0; i < array.length; i++) {
      if (array[i][col] === obj[col]) {
          return true;
      }
   }
   return false;
}

document.addEventListener('DOMContentLoaded', function(){
   chrome.storage.local.get( ['template', 'subjectsPending'] , function(data){
      var template = data.template;

      // Start to trying to get the table and it's contents
      var $table = $('#' + template.UACJ.tableId);
      
      var myRows = [];
      var $headers = $table.find("th");
      var $rows = $table.find("tbody tr").each(function(index) {
         $cells = $(this).find("td");
         myRows[index] = {};
         $cells.each(function(cellIndex) {
            myRows[index][$($headers[cellIndex]).html()] = $(this).text();
         });
      });
   
      // Remove the last two rows
      myRows.pop(); myRows.pop();
      // Get the pending one's, and set the info
      var pending = data.subjectsPending;

      for(var i = 0; i < myRows.length; i++){
         
         if(! inArray( template.UACJ.columnName, myRows[i], pending) ){
            pending.push(myRows[i]);
         }
      }

      chrome.storage.local.set( { subjectsPending : pending } );
   });
}, false);