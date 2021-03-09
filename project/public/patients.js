initPatTable()  // Calls function to initialize table at load of patients page.
document.addEventListener('DOMContentLoaded', searchPatTable);
document.addEventListener('DOMContentLoaded', clearPatSearch);

// Function builds table to patients page via DOM calls using data gathered from Patients table in database
function buildPatTable(data){
    var table = document.createElement("table");
    table.setAttribute("id", "PatientTable");
    // Constructs the header for the table to be displayed on patients page.
    var headrow = document.createElement("tr");
    var headcell1 = document.createElement("th");
    headcell1.append(document.createTextNode("First Name"));
    headcell1.style.border = "solid black";
    headrow.appendChild(headcell1);
    var headcell2 = document.createElement("th");
    headcell2.append(document.createTextNode("Last Name"));
    headcell2.style.border = "solid black";
    headrow.appendChild(headcell2);
    var headcell3 = document.createElement("th");
    headcell3.append(document.createTextNode("DOB"));
    headcell3.style.border = "solid black";
    headrow.appendChild(headcell3);
    var headcell4 = document.createElement("th");
    headcell4.append(document.createTextNode("Address"));
    headcell4.style.border = "solid black";
    headrow.appendChild(headcell4);
    var headcell5 = document.createElement("th");
    headcell5.append(document.createTextNode("City"));
    headcell5.style.border = "solid black";
    headrow.appendChild(headcell5);
    var headcell6 = document.createElement("th");
    headcell6.append(document.createTextNode("State"));
    headcell6.style.border = "solid black";
    headrow.appendChild(headcell6);
    var headcell7 = document.createElement("th");
    headcell7.append(document.createTextNode("Zip Code"));
    headcell7.style.border = "solid black";
    headrow.appendChild(headcell7);
    var headcell8 = document.createElement("th");
    headcell8.append(document.createTextNode("Gender"));
    headcell8.style.border = "solid black";
    headrow.appendChild(headcell8);
    var headcell9 = document.createElement("th");
    headcell9.append(document.createTextNode("Primary Diagnosis"));
    headcell9.style.border = "solid black";
    headrow.appendChild(headcell9);
    var headcell10 = document.createElement("th");
    headcell10.append(document.createTextNode("Physician ID"));
    headcell10.style.border = "solid black";
    headrow.appendChild(headcell10);
    var headcell11 = document.createElement("th");
    headcell11.append(document.createTextNode("Payor ID"));
    headcell11.style.border = "solid black";
    headrow.appendChild(headcell11);
    table.appendChild(headrow);

    var tableData = data.results;
    // Loops through data gathered to fill in appropriate cells with said data.
    for (var i=0; i<tableData.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        cell1.appendChild(document.createTextNode(tableData[i].firstName));
        cell1.style.border = "solid black";
        row.appendChild(cell1)
        var cell2 = document.createElement("td");
        cell2.appendChild(document.createTextNode(tableData[i].lastName));
        cell2.style.border = "solid black";
        row.appendChild(cell2);
        var cell3 = document.createElement("td");
        var datePick = document.createElement("input")
        datePick.setAttribute("type", "hidden");
        datePick.setAttribute("value", tableData[i].dob);
        datePick.setAttribute("id", "datePick");
        cell3.appendChild(datePick);
        var d = new Date(tableData[i].dob)
        var month = d.getMonth() + 1
        var day = d.getDate() + 1
        var year = d.getFullYear()
        d = [month, day, year].join('-');
        tableData[i].dob = d                                        // Formats date to MM-DD-YYYY
        var textDate = document.createTextNode(tableData[i].dob)
        var dateBox = document.createElement("div");
        dateBox.appendChild(textDate);
        cell3.appendChild(dateBox);
        cell3.style.border = "solid black";
        row.appendChild(cell3);
        var cell4 = document.createElement("td");
        cell4.appendChild(document.createTextNode(tableData[i].address));
        cell4.style.border = "solid black";
        row.appendChild(cell4);
        var cell5 = document.createElement("td");
        cell5.appendChild(document.createTextNode(tableData[i].city));
        cell5.style.border = "solid black";
        row.appendChild(cell5);
        var cell5 = document.createElement("td");
        cell5.appendChild(document.createTextNode(tableData[i].state));
        cell5.style.border = "solid black";
        row.appendChild(cell5);
        var cell6 = document.createElement("td");
        cell6.appendChild(document.createTextNode(tableData[i].zip));
        cell6.style.border = "solid black";
        row.appendChild(cell6);
        var cell7 = document.createElement("td");
        var textGender = document.createTextNode(tableData[i].gender);
        var genderBox = document.createElement("div");
        genderBox.appendChild(textGender);
        cell7.appendChild(genderBox);
        cell7.style.border = "solid black";
        row.appendChild(cell7);
        var cell8 = document.createElement("td");
        cell8.appendChild(document.createTextNode(tableData[i].primDiagnosis));
        cell8.style.border = "solid black";
        row.appendChild(cell8);
        var cell9 = document.createElement("td");
        var physID = document.createElement("div");
        physID.appendChild(document.createTextNode(tableData[i].physicianID));
        cell9.appendChild(physID);
        cell9.style.border = "solid black";
        row.appendChild(cell9);
        var cell10 = document.createElement("td");
        var payID = document.createElement("div");
        payID.appendChild(document.createTextNode(tableData[i].payorID));
        cell10.appendChild(payID);
        cell10.style.border = "solid black";
        row.appendChild(cell10);

        // Constructs DELETE, EDIT, and UPDATE buttons for table.
        var cell11 = document.createElement("td");
        var Delete = document.createElement("button");
        Delete.setAttribute("id", "Delete");
        Delete.setAttribute('value', "Delete");
        Delete.innerHTML = "Delete";
        cell11.appendChild(Delete);
        row.appendChild(cell11);
        // Event listener performs POST call using patientID for given entry as request.
        Delete.addEventListener("click", function (event){
            var patID = this.parentNode.nextSibling.firstChild
            patID = patID.value;
            var curID = {};
            curID.id = patID;
            curID.Delete = 'Delete';
            var req = new XMLHttpRequest();
            req.addEventListener('load',function(){
                if(req.status >= 200 && req.status < 400){
                    console.log(req.responseText);
                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.open('POST', "http://flip1.engr.oregonstate.edu:9919/patients",true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(curID));
            initPatTable();                                                 // Resets table after performing delete
            alert("Patient has been deleted from Hardison-Kim Hospital database.");  // Notifies entry has been deleted
            event.preventDefault();
        })
        var cell12 = document.createElement("td");
        var hid = document.createElement("input");
        hid.setAttribute("type", "hidden");                // Hides patientID from user
        hid.setAttribute('name','id');
        hid.setAttribute('id','id');
        hid.setAttribute("value", tableData[i].patientID);
        cell12.appendChild(hid);
        row.appendChild(cell12);
        var cell13 = document.createElement("td");
        var Edit = document.createElement("button");
        Edit.setAttribute("id", "Edit");
        Edit.setAttribute('value', "Edit");
        Edit.innerHTML = "Edit";
        cell13.appendChild(Edit);
        row.appendChild(cell13);

        var count = 0;
        Edit.addEventListener('click', function (event){
            curRow = this.parentNode.parentNode.rowIndex
            this.parentNode.parentNode.lastElementChild.lastElementChild.style.display = "block";  // Allows UPDATE button to be seen by user
            var table = document.getElementById("PatientTable");
            var form = {submit: "payID"};
            var req = new XMLHttpRequest();
            req.addEventListener("load", function(){
                var response = req.responseText;
                response = JSON.parse(response);
                var select = document.createElement("select");          // DOM call to create drop down menu
                select.id = "payID"

                // Loops through gathered payorIDs to fill drop down menu
                for (const val of response.results) {
                   var option = document.createElement("option");
                   option.value = val.payorID;
                   option.text = val.payorID;
                   select.appendChild(option);
                }
                option = document.createElement('option');
                option.value = "NULL";
                option.text = "None";
                select.appendChild(option);
                // Conditional sets initial value in drop down menu
                if (table.rows[curRow].cells[10].innerText === "null"){
                    select.value = "NULL";
                } else {    select.value = Number(table.rows[curRow].cells[10].innerText);
                }
                table.rows[curRow].cells[10].appendChild(select);
                table.rows[curRow].cells[10].firstElementChild.remove();        // Ensures only drop down menu is in cell
            });
            req.open("POST", "http://flip1.engr.oregonstate.edu:9919/patients", true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(form));
            count ++;
            // Conditional checks to see how many times EDIT has been clicked to reset table in clicked more than once
            if (count > 1){
                initPatTable();
            };
            // Allows cells' data to be edited
            table.rows[curRow].cells[0].contentEditable = true;
            table.rows[curRow].cells[1].contentEditable = true;
            table.rows[curRow].cells[2].contentEditable = true;
            table.rows[curRow].cells[2].firstElementChild.setAttribute("type", "date");
            table.rows[curRow].cells[2].lastElementChild.remove();
            table.rows[curRow].cells[3].contentEditable = true;
            table.rows[curRow].cells[4].contentEditable = true;
            table.rows[curRow].cells[5].contentEditable = true;
            table.rows[curRow].cells[6].contentEditable = true;
            var originalGender = document.getElementById("genderMenu");
            var genderDrop = originalGender.cloneNode(true);
            genderDrop.setAttribute('id', 'genderDrop');
            genderDrop.setAttribute('value', table.rows[curRow].cells[7].innerHTML);
            genderDrop.value = table.rows[curRow].cells[7].innerText;               // Initializes drop down menu value
            table.rows[curRow].cells[7].appendChild(genderDrop);               // Adds gender drop menu to table
            table.rows[curRow].cells[7].firstElementChild.remove();           // Ensures drop down menu is only in cell
            table.rows[curRow].cells[8].contentEditable = true;
            var original1 = document.getElementById("PhysID");
            var physDrop = original1.cloneNode(true);
            physDrop.setAttribute('id', 'physDrop');
            // Conditional sets value selected in drop down menu
            if (table.rows[curRow].cells[9].innerText === "null"){
                physDrop.value = "NULL";
            } else {    physDrop.value = Number(table.rows[curRow].cells[9].innerText);
            };
            table.rows[curRow].cells[9].appendChild(physDrop);              // Adds physDrop menu to table
            table.rows[curRow].cells[9].firstElementChild.remove();         // Ensures drop menu is only in cell
            // Conditonal checks Edit count to alert user of functionality of buttons.
            if (count === 1) {
                alert('Click "Update" to save changes made or "Edit" to undo/restore data.');
            };
            event.preventDefault();
        })
        var cell14 = document.createElement("td");
        var Update = document.createElement("button");
        Update.setAttribute("id", "Update");
        Update.setAttribute('value', "Update");
        Update.innerHTML = "Update";
        Update.style.display = "none";                                      // Hides Update button from user's
        cell14.appendChild(Update);
        row.appendChild(cell14);
        // POST call to send changes made to patient's information in table.
        Update.addEventListener('click', function (event){
            var req = new XMLHttpRequest();
            var curRow = this.parentNode.parentNode.rowIndex;               // Index of current row being updated
            var updatePat = {};
            var table = document.getElementById("PatientTable");
            updatePat.submit = "Update";
            updatePat.fname = table.rows[curRow].cells[0].innerHTML;
            updatePat.lname = table.rows[curRow].cells[1].innerHTML;
            updatePat.dob = table.rows[curRow].cells[2].lastElementChild.value;
            updatePat.address = table.rows[curRow].cells[3].innerHTML;
            updatePat.city = table.rows[curRow].cells[4].innerHTML;
            updatePat.state = table.rows[curRow].cells[5].innerHTML;
            updatePat.zip = table.rows[curRow].cells[6].innerHTML;
            updatePat.gender = table.rows[curRow].cells[7].lastElementChild.value;
            updatePat.diagnosis = table.rows[curRow].cells[8].innerHTML;
            updatePat.physID = table.rows[curRow].cells[9].lastElementChild.value;
            updatePat.payID = table.rows[curRow].cells[10].lastElementChild.value;
            updatePat.patID = table.rows[curRow].cells[12].lastElementChild.value;
            req.addEventListener("load", function(){
                initPatTable();
            });
            req.open("POST", "http://flip1.engr.oregonstate.edu:9919/patients", true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(updatePat));
            alert("Patient has been updated.");
            event.preventDefault();
        })
        table.appendChild(row);
    }
    return table;
}

// Function for filtering patients to desired selection
function searchPatTable() {
    document.getElementById('searchPat').addEventListener("click", function (event) {
        var form = {
            submit: document.getElementById('searchPat').value,
            firstName: document.getElementById('searchFirst').value,
            lastName: document.getElementById('searchLast').value,
            searchDOB: new Date(document.getElementById('searchDOB').value),
        };
        var req = new XMLHttpRequest();

        req.addEventListener("load", function () {
            var response = req.responseText;
            response = JSON.parse(response);
            var updatedTable = buildPatTable(response);
            if (document.body.contains(document.getElementById("PatientTable"))) {
                document.body.removeChild(document.getElementById("PatientTable"));
                updatedTable.id = "PatientTable";
                document.body.appendChild(updatedTable);
            } else {
                updatedTable.id = "PatientTable";
                document.body.appendChild(updatedTable);
            }
        });
        req.open("POST", "http://flip1.engr.oregonstate.edu:9919/patients", true);
        req.setRequestHeader('Content-type', "application/json");
        req.send(JSON.stringify(form));
        event.preventDefault();
    });
}

// Function used to clear filter/search results to reinitialize table
function clearPatSearch() {
    document.getElementById('clear').addEventListener("click", function (event) {
        initPatTable();
        event.preventDefault();
    });
}

// Function to call for data to populate table initially
function initPatTable() {
    var req = new XMLHttpRequest();
    const request = {submit: "all"};

    req.addEventListener("load", function(){
        var response = req.responseText;
        response = JSON.parse(response);
        var updatedTable = buildPatTable(response);
        if (document.body.contains(document.getElementById("PatientTable"))){
            document.body.removeChild(document.getElementById("PatientTable"));
            updatedTable.id = "PatientTable";
            document.body.appendChild(updatedTable);
        } else {
            updatedTable.id = "PatientTable";
            document.body.appendChild(updatedTable);
        }
    });
    req.open("POST", "http://flip1.engr.oregonstate.edu:9919/patients", true);
    req.setRequestHeader('Content-type', "application/json");
    req.send(JSON.stringify(request));
}