// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Function to GET to root directory and retrieve current workouts.
function getPhysicians() {
    var req = new XMLHttpRequest();
    
      req.open("GET", "http://flip1.engr.oregonstate.edu:9919/", true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
  
        // Constants to create DOMParser and grab response.
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(response, 'text/html');
  
        // Use DOM to get just innerHTML of the table.
        document.getElementById("physicianTable").innerHTML = newDoc.getElementById("physicianTable").innerHTML;
  
        // Add event listener for each delete button.
        document.querySelectorAll('.deleteRow').forEach(function(item) {
          item.addEventListener('click', function(event) {
            deleteRow(item.value);
            event.preventDefault();
        })});
  
        // Add event listener for each edit button.
        document.querySelectorAll('.editRow').forEach(function(item) {
          item.addEventListener('click', function(event) {
            editRow(item.value);
            event.preventDefault();
        })});
  
        // Add event listener for each update button.
        document.querySelectorAll('.updateRow').forEach(function(item) {
          item.addEventListener('click', function(event) {
            updateRow(item.value);
            event.preventDefault();
        })});
      } else {
      console.log("Error in network request: " + req.statusText);
    }});
    
    req.send();
  };

// Event listener for submit button for adding a new row.
document.getElementById("addPhysician").addEventListener("click", function(event) {
    // Variable for request.
    var req = new XMLHttpRequest();
  
    // Variables for each entry in form.
    var lastName = document.getElementById("addLast").value;
    var firstName = document.getElementById("addFirst").value;
    var specialty = document.getElementById("addSpecialty").value;
  
    if (lastName && firstName && specialty) {
      req.open('POST', 'http://flip1.engr.oregonstate.edu:9919/physicians?lastName=' + lastName + "&firstName=" + firstName + "&specialty=" + specialty, true);
  
      // Event listener that fires when entire page is loaded, and triggers function.
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = req.responseText;
          console.log(response);
  
          // Get workout rows for database to display latest data on page.
          getWorkouts();
  
        } else {
        console.log("Error in network request: " + req.statusText);
      }});
     
      req.send();
  
      // Prevent page from reloading.
      event.preventDefault();
    } else {
      alert("Please fill in all fields.")
  }});
  
  // Function to delete row and takes id of row as a parameter.
  function deleteRow(idVal) {
    var req = new XMLHttpRequest();
    var id = idVal;
      
    req.open('GET', 'http://flip1.engr.oregonstate.edu:9919/physicians?id=' + id, true);
      
    // Event listener that fires when entire page is loaded, and triggers function.
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
  
        // Get workout rows for database to display latest data on page.
        getPhysicians();
      
      } else {
      console.log("Error in network request: " + req.statusText);
    }});
    req.send();
  };
  
  // Function to update row and takes id of row as a parameter.
  function updateRow(idVal) {
    var req = new XMLHttpRequest();
    var id = idVal;
    var table = document.getElementById("mainPhysicianTable");
    var rowIndex = findRow(idVal)
    
    // Variables for each entry in row that needs to be upated after editing.
    var lastName = table.rows[rowIndex].cells[1].innerHTML;
    var firstName = table.rows[rowIndex].cells[2].innerHTML;
    var specialty = table.rows[rowIndex].cells[3].innerHTML;
  
    req.open('POST', 'http://flip1.engr.oregonstate.edu:9919/update?id=' + id + "&lastName=" + lastName + "&firstName=" + firstName + "&specialty=" + specialty, true);
  
    // Event listener that fires when entire page is loaded, and triggers function.
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
        
        // Change each cell back to being uneditable.
        table.rows[rowIndex].cells[1].contentEditable = false;
        table.rows[rowIndex].cells[2].contentEditable = false;
        table.rows[rowIndex].cells[3].contentEditable = false;
  
        getPhysicians();
  
      } else {
      console.log("Error in network request: " + req.statusText);
    };
    req.send();
  })};
  
  // Function to make table cells editable.
  function editRow(idVal) {
    var table = document.getElementById("mainPhysicianTable");
    var rowIndex = findRow(idVal)
    // Let each cell in a particular row be editable.
    table.rows[rowIndex].cells[1].contentEditable = true;
    table.rows[rowIndex].cells[2].contentEditable = true;
    table.rows[rowIndex].cells[3].contentEditable = true;
  };
  
  // Function to find row with matching id value and return row index.
  function findRow(idVal) {
    var table = document.getElementById("mainPhysicianTable");
    var rowIndex;
  
    // For loop to iterate through table rows.
    for (var i = 0, row; row = table.rows[i]; i++) {
  
      if (row.cells[0].innerHTML == idVal) {
        var rowIndex = i;
        return rowIndex;
  }}};