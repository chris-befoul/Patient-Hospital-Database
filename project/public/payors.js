initPayTable()              // Calls function to initialize table at load of payors page.
document.addEventListener('DOMContentLoaded', searchPayTable);
document.addEventListener('DOMContentLoaded', clearPaySearch);

// Function builds table to payors page via DOM calls using data gathered from Payors table in database
function buildPayTable(data){
    var table = document.createElement("table");
    table.setAttribute("id", "PayorTable");
    // Constructs the header for the table to be displayed on payors page.
    var headrow = document.createElement("tr");
    var headcell1 = document.createElement("th");
    headcell1.append(document.createTextNode("Company Name"));
    headcell1.style.border = "solid black";
    headrow.appendChild(headcell1);
    var headcell2 = document.createElement("th");
    headcell2.append(document.createTextNode("City"));
    headcell2.style.border = "solid black";
    headrow.appendChild(headcell2);
    var headcell3 = document.createElement("th");
    headcell3.append(document.createTextNode("State"));
    headcell3.style.border = "solid black";
    headrow.appendChild(headcell3);
    var headcell4 = document.createElement("th");
    headcell4.append(document.createTextNode("Zip"));
    headcell4.style.border = "solid black";
    headrow.appendChild(headcell4);
    table.appendChild(headrow);

    var tableData = data.results;
    // Loops through data gathered to fill in appropriate cells with said data.
    for (var i=0; i<tableData.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        cell1.appendChild(document.createTextNode(tableData[i].company));
        cell1.style.border = "solid black";
        row.appendChild(cell1)
        var cell2 = document.createElement("td");
        cell2.appendChild(document.createTextNode(tableData[i].city));
        cell2.style.border = "solid black";
        row.appendChild(cell2);
        var cell3 = document.createElement("td");
        cell3.appendChild(document.createTextNode(tableData[i].state));
        cell3.style.border = "solid black";
        row.appendChild(cell3);
        var cell4 = document.createElement("td");
        cell4.appendChild(document.createTextNode(tableData[i].zip));
        cell4.style.border = "solid black";
        row.appendChild(cell4);

        // Constructs DELETE, EDIT, and UPDATE buttons for table.
        var cell11 = document.createElement("td");
        var Delete = document.createElement("button");
        Delete.setAttribute("id", "Delete");
        Delete.setAttribute('value', "Delete");
        Delete.innerHTML = "Delete";
        cell11.appendChild(Delete);
        row.appendChild(cell11);
        // Event listener performs POST call using payorID for given entry as request.
        Delete.addEventListener("click", function (event){
            var payID = this.parentNode.nextSibling.firstChild
            payID = payID.value;
            var curID = {};
            curID.id = payID;
            curID.Delete = 'Delete';
            var req = new XMLHttpRequest();
            req.addEventListener('load',function(){
                initPayTable();                                                // Resets table after performing delete
                if(req.status >= 200 && req.status < 400){
                    console.log(req.responseText);
                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.open('POST', "http://flip1.engr.oregonstate.edu:9919/payors",true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(curID));
            alert("Payor has been deleted from Hardison-Kim Hospital database.");  // Notifies entry has been deleted
            event.preventDefault();
        })
        var cell12 = document.createElement("td");
        var hid = document.createElement("input");
        hid.setAttribute("type", "hidden");             // Hides payorID from user
        hid.setAttribute('name','id');
        hid.setAttribute("value", tableData[i].payorID);
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
            count ++;
            if (count > 1){
                initPayTable();
            };
            this.parentNode.parentNode.lastElementChild.lastElementChild.style.display = "block";  // UPDATE button becomes visible
            var table = document.getElementById("PayorTable");
            table.rows[curRow].cells[0].contentEditable = true;
            table.rows[curRow].cells[1].contentEditable = true;
            table.rows[curRow].cells[2].contentEditable = true;
            table.rows[curRow].cells[3].contentEditable = true;
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
        Update.style.display = "none";
        cell14.appendChild(Update);
        row.appendChild(cell14);
        // POST call to send changes made to payor's information in table.
        Update.addEventListener('click', function (event){
            var req = new XMLHttpRequest();
            var curRow = this.parentNode.parentNode.rowIndex;       // Index of current row being updated
            var updatePay = {};
            var table = document.getElementById("PayorTable");
            updatePay.submit = "Update";
            updatePay.company = table.rows[curRow].cells[0].innerHTML;
            updatePay.city = table.rows[curRow].cells[1].innerHTML;
            updatePay.state = table.rows[curRow].cells[2].innerHTML;
            updatePay.zip = table.rows[curRow].cells[3].innerHTML;
            updatePay.payID = table.rows[curRow].cells[5].lastElementChild.value;
            req.addEventListener("load", function(){
                initPayTable();
            });
            req.open("POST", "http://flip1.engr.oregonstate.edu:9919/payors", true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(updatePay));
            alert("Payor has been updated.");
            event.preventDefault();
        })
        table.appendChild(row);
    }
    return table;
}

// Function for filtering payors to desired selection
function searchPayTable() {
    document.getElementById('searchPay').addEventListener("click", function (event) {
        var form = {
            submit: document.getElementById('searchPay').value,
            company: document.getElementById('SearchCompany').value,
        };
        var req = new XMLHttpRequest();

        req.addEventListener("load", function () {
            var response = req.responseText;
            response = JSON.parse(response);
            var updatedTable = buildPayTable(response);
            if (document.body.contains(document.getElementById("PayorTable"))) {
                document.body.removeChild(document.getElementById("PayorTable"));
                updatedTable.id = "PayorTable";
                document.body.appendChild(updatedTable);
            } else {
                updatedTable.id = "PayorTable";
                document.body.appendChild(updatedTable);
            }
        });
        req.open('POST', "http://flip1.engr.oregonstate.edu:9919/payors", true);
        req.setRequestHeader('Content-type', "application/json");
        req.send(JSON.stringify(form));
        event.preventDefault();
    });
}

// Function used to clear filter/search results to reinitialize table
function clearPaySearch() {
    document.getElementById('clearPay').addEventListener("click", function (event) {
        initPayTable();
        event.preventDefault();
    });
}

// Function to call for data to populate table initially
function initPayTable() {
    var req = new XMLHttpRequest();
    const request = {submit: "all"};

    req.addEventListener("load", function(){
        var response = req.responseText;
        response = JSON.parse(response);
        var updatedTable = buildPayTable(response);
        if (document.body.contains(document.getElementById("PayorTable"))){
            document.body.removeChild(document.getElementById("PayorTable"));
            updatedTable.id = "PayorTable";
            document.body.appendChild(updatedTable);
        } else {
            updatedTable.id = "PayorTable";
            document.body.appendChild(updatedTable);
        }
    });
    req.open("POST", "http://flip1.engr.oregonstate.edu:9919/payors", true);
    req.setRequestHeader('Content-type', "application/json");
    req.send(JSON.stringify(request));
}