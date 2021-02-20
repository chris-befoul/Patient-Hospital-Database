initPatTable()
document.addEventListener('DOMContentLoaded', searchPatTable);
document.addEventListener('DOMContentLoaded', clearPatSearch);


function buildPatTable(data){
    var table = document.createElement("table");
    table.setAttribute("id", "PatientTable");
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
        cell3.appendChild(document.createTextNode(tableData[i].dob));
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
        cell7.appendChild(document.createTextNode(tableData[i].gender));
        cell7.style.border = "solid black";
        row.appendChild(cell7);
        var cell8 = document.createElement("td");
        cell8.appendChild(document.createTextNode(tableData[i].primDiagnosis));
        cell8.style.border = "solid black";
        row.appendChild(cell8);
        var cell9 = document.createElement("td");
        cell9.appendChild(document.createTextNode(tableData[i].physicianID));
        cell9.style.border = "solid black";
        row.appendChild(cell9);
        var cell10 = document.createElement("td");
        cell10.appendChild(document.createTextNode(tableData[i].payorID));
        cell10.style.border = "solid black";
        row.appendChild(cell10);



        var cell11 = document.createElement("td");
        var Delete = document.createElement("button");
        Delete.setAttribute("id", "Delete");
        Delete.setAttribute('value', "Delete");
        Delete.innerHTML = "Delete";
        cell11.appendChild(Delete);
        row.appendChild(cell11);
        /*
        Delete.addEventListener("click", function (event){
            var patID = this.parentNode.parentNode.lastElementChild.firstElementChild.firstElementChild
            patID = patientID.value;
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
            req.open('POST', "http://flip1.engr.oregonstate.edu:9199/patients",true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(curID));
            initPatTable()
            event.preventDefault();
        })
         */
        var cell12 = document.createElement("td");
        var hid = document.createElement("input");
        hid.setAttribute("type", "hidden");
        hid.setAttribute('name','id');
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
        var cell14 = document.createElement("td");
        var Update = document.createElement("button");
        Update.setAttribute("id", "Update");
        Update.setAttribute('value', "Update");
        Update.innerHTML = "Update";
        cell14.appendChild(Update);
        row.appendChild(cell14);
        table.appendChild(row);
    }
    return table;
}

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
        req.open("POST", "http://flip1.engr.oregonstate.edu:9199/patients", true);
        req.setRequestHeader('Content-type', "application/json");
        req.send(JSON.stringify(form));
        event.preventDefault();
    });
}

function clearPatSearch() {
    document.getElementById('clear').addEventListener("click", function (event) {
        initPatTable();
        event.preventDefault();
    });
}

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
    req.open("POST", "http://flip1.engr.oregonstate.edu:9199/patients", true);
    req.setRequestHeader('Content-type', "application/json");
    req.send(JSON.stringify(request));
}