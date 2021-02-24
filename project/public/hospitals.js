// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Function to GET to root directory and retrieve current workouts.
function searchHospitals(hospitalName, city, state, zip) {
    var req = new XMLHttpRequest();
    
    req.open("GET", "http://flip1.engr.oregonstate.edu:9919/hospitals/search?hospitalName=" + hospitalName + "&city=" + city + "&state=" + state + "&zip=" + zip, true);
    req.setRequestHeader("Content-Type", "application/json");

    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
  
        // Constants to create DOMParser and grab response.
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(response, 'text/html');

        // Use DOM to get just innerHTML of the table.
        document.getElementById("searchHospitalTable").innerHTML = newDoc.getElementById("searchHospitalTable").innerHTML; 
  
      } else {
      console.log("Error in network request: " + req.statusText);
    }});
    
    req.send();
    event.preventDefault();
  };

function getHospitals() {
    var req = new XMLHttpRequest();
    
    req.open("GET", "http://flip1.engr.oregonstate.edu:9919/hospitals", true);
    req.setRequestHeader("Content-Type", "application/json");

    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
  
        // Constants to create DOMParser and grab response.
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(response, 'text/html');

        // Use DOM to get just innerHTML of the table.
        document.getElementById("hospitalTableBody").innerHTML = newDoc.getElementById("hospitalTableBody").innerHTML;
    
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
    event.preventDefault();
};


// Event listener for submit button for adding a new row.
document.getElementById("addHospital").addEventListener("click", function(event) {
    // Variable for request.
    var req = new XMLHttpRequest();
  
    // Variables for each entry in form.
    var hospitalName = document.getElementById("addName").value;
    var city = document.getElementById("addCity").value;
    var state = document.getElementById("addState").value;
    var zip = document.getElementById("addZip").value;

    if (hospitalName && city && state && zip) {
      req.open('POST', 'http://flip1.engr.oregonstate.edu:9919/hospitals?hospitalName=' + hospitalName + "&city=" + city + "&state=" + state + "&zip=" + zip, true);
      req.setRequestHeader("Content-Type", "application/json");
      
      // Event listener that fires when entire page is loaded, and triggers function.
      req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
          var response = req.responseText;
          console.log(response);
  
          // Get workout rows for database to display latest data on page.
          getHospitals();
  
        } else {
        console.log("Error in network request: " + req.statusText);
      }});
     
      req.send();
  
      // Prevent page from reloading.
      event.preventDefault();
    } else {
      alert("Please fill in all fields.")
  }});

// Event listener for submit button for searching for a Physician.
document.getElementById("searchHospital").addEventListener("click", function(event) {
    // Variable for request.
    var req = new XMLHttpRequest();
  
    // Variables for each entry in form.
    var hospitalName = document.getElementById("searchName").value;
    var city = document.getElementById("searchCity").value;
    var state = document.getElementById("searchState").value;
    var zip = document.getElementById("searchZip").value;

    searchHospitals(hospitalName, city, state, zip);
    
  });
  
  // Function to delete row and takes id of row as a parameter.
function deleteRow(idVal) {
    var req = new XMLHttpRequest();
    var id = idVal;

    req.open('DELETE', 'http://flip1.engr.oregonstate.edu:9919/hospitals/delete?id=' + id, true);
      
    // Event listener that fires when entire page is loaded, and triggers function.
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
  
        // Get workout rows for database to display latest data on page.
        getHospitals();
      
      } else {
      console.log("Error in network request: " + req.statusText);
    }});
    req.send();
  };
  
// Function to update row and takes id of row as a parameter.
function updateRow(idVal) {
    var req = new XMLHttpRequest();
    var id = idVal;
    var table = document.getElementById("mainHospitalTable");
    var rowIndex = findRow(idVal)

    // Variables for each entry in row that needs to be upated after editing.
    var hospitalName = table.rows[rowIndex].cells[1].innerHTML;
    var city = table.rows[rowIndex].cells[2].innerHTML;
    var state = table.rows[rowIndex].cells[3].innerHTML;
    var zip = table.rows[rowIndex].cells[4].innerHTML;

    req.open('POST', 'http://flip1.engr.oregonstate.edu:9919/hospitals/update?id=' + id + "&hospitalName=" + hospitalName + "&city=" + city + "&state=" + state, + "&zip=" + zip, true);

    // Event listener that fires when entire page is loaded, and triggers function.
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
        var response = req.responseText;
        console.log(response);
        
        // Change each cell back to being uneditable.
        table.rows[rowIndex].cells[1].contentEditable = false;
        table.rows[rowIndex].cells[2].contentEditable = false;
        table.rows[rowIndex].cells[3].contentEditable = false;
        table.rows[rowIndex].cells[4].contentEditable = false;

        getHospitals();

        } else {
        console.log("Error in network request: " + req.statusText);
      }});
      req.send();
    };

// Function to make table cells editable.
function editRow(idVal) {
    var table = document.getElementById("mainHospitalTable");
    var rowIndex = findRow(idVal)
    // Let each cell in a particular row be editable.
    table.rows[rowIndex].cells[1].contentEditable = true;
    table.rows[rowIndex].cells[2].contentEditable = true;
    table.rows[rowIndex].cells[3].contentEditable = true;
    table.rows[rowIndex].cells[4].contentEditable = false;
    };

// Function to find row with matching id value and return row index.
function findRow(idVal) {
    var table = document.getElementById("mainHospitalTable");
    var rowIndex;

    // For loop to iterate through table rows.
    for (var i = 0, row; row = table.rows[i]; i++) {

        if (row.cells[0].innerHTML == idVal) {
        var rowIndex = i;
        return rowIndex;
}}};

getHospitals();