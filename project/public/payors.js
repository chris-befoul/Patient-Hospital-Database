initPayTable()
document.addEventListener('DOMContentLoaded', searchPayTable);
document.addEventListener('DOMContentLoaded', clearPaySearch);


function buildPayTable(data){
    var table = document.createElement("table");
    table.setAttribute("id", "PayorTable");
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

        var cell11 = document.createElement("td");
        var Delete = document.createElement("button");
        Delete.setAttribute("id", "Delete");
        Delete.setAttribute('value', "Delete");
        Delete.innerHTML = "Delete";
        cell11.appendChild(Delete);
        row.appendChild(cell11);
        /*
        Delete.addEventListener("click", function (event){
            var payID = this.parentNode.parentNode.lastElementChild.firstElementChild.firstElementChild
            payID = payorID.value;
            var curID = {};
            curID.id = payID;
            curID.Delete = 'Delete';
            var req = new XMLHttpRequest();
            req.addEventListener('load',function(){
                if(req.status >= 200 && req.status < 400){
                    console.log(req.responseText);
                } else {
                    console.log("Error in network request: " + req.statusText);
                }});
            req.open('POST', "http://flip1.engr.oregonstate.edu:9919/payors",true);
            req.setRequestHeader('Content-type', "application/json");
            req.send(JSON.stringify(curID));
            initPayTable()
            event.preventDefault();
        })
         */
        var cell12 = document.createElement("td");
        var hid = document.createElement("input");
        hid.setAttribute("type", "hidden");
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

function searchPayTable() {
    document.getElementById('searchPay').addEventListener("click", function (event) {
        var form = {
            submit: document.getElementById('searchPay').value,
            company: document.getElementById('SearchCompany').value,
        };
        console.log(form);
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

function clearPaySearch() {
    document.getElementById('clearPay').addEventListener("click", function (event) {
        initPayTable();
        event.preventDefault();
    });
}

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