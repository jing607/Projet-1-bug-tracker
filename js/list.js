
//MAIN PAGE_TABLE

function load() {
    fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/");
}
    
function fetch(address) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {                  
            // request finished and response is ready
            
            console.log (request.status);
            if (request.status === 200) {
                // Fetch successful

                // Parse the argument to an array
                var array = JSON.parse(request.responseText);
                array["result"]["bug"].forEach( function(element, elementIndex) {
                    console.log (element, elementIndex)
                })
            } else if (request.status === 404) {
                // Fetch Not Found
                
                // Example
                var example = '{\
                    "bugTracker":\
                      {\
                        "version":"0.1",\
                        "completed_in":"0.026",\
                        "status":"ok"\
                      },\
                    "result":\
                      {\
                        "status":"done",\
                        "bug":[\
                              {\
                                "id": 23,\
                                "title": "bad responsive on image",\
                                "timestamp":1327171211,\
                                "description":"adjust width on big screen",\
                                "user_id": "bill",\
                                "state" : 0\
                              },\
                              {\
                                "id": 24,\
                                "title": "js error on home page",\
                                "timestamp":1327571932,\
                                "description":"a minor syntaxe error when the page is loaded",\
                                "user_id": "paul",\
                                "state" : 1\
                              }\
                             ],\
                        "last_timestamp":1327243631\
                      }\
                  }'
                var array = JSON.parse(example);
                var table_body = document.getElementById('table_body');

                array["result"]["bug"].forEach( function(element, elementIndex) {

                    let table_row = document.createElement("tr");
                    let table_row_state = document.createElement("select");
                    let table_row_state_0 = document.createElement("option");
                    let table_row_state_1 = document.createElement("option");
                    let table_row_state_2 = document.createElement("option");
                    let td_temp, td_button;

                    // append description
                    td_temp = document.createElement("td");
                    td_temp.appendChild(document.createTextNode(element["description"]));
                    table_row.appendChild(td_temp);

                    // append date
                    td_temp = document.createElement("td");
                    td_temp.appendChild(document.createTextNode(timestampToDate(element["timestamp"])));
                    table_row.appendChild(td_temp);

                    // append nom
                    td_temp = document.createElement("td");
                    td_temp.appendChild(document.createTextNode(element["user_id"]));
                    table_row.appendChild(td_temp);

                    // append etat
                    table_row_state_0.setAttribute("value", 0);
                    table_row_state_0.appendChild(document.createTextNode("Non traité"));
                    table_row_state.appendChild(table_row_state_0);
                    table_row_state_1.setAttribute("value", 1);
                    table_row_state_1.appendChild(document.createTextNode("En cours"));
                    table_row_state.appendChild(table_row_state_1);
                    table_row_state_2.setAttribute("value", 2);
                    table_row_state_2.appendChild(document.createTextNode("Traité"));
                    table_row_state.appendChild(table_row_state_2);

                    //Mark the selected state
                    console.log (element["state"]);
                    table_row_state.value = element["state"];

                    td_temp = document.createElement("td");
                    td_temp.appendChild(table_row_state);
                    table_row.appendChild(td_temp);

                    // append delete button
                    td_temp = document.createElement("td");
                    td_button = document.createElement("button");
                    td_button.appendChild(document.createTextNode("supprimer"));
                    td_temp.appendChild(td_button);
                    table_row.appendChild(td_temp);

                    table_body.appendChild(table_row);
                })
            }
        }
    }

    request.open('Get', address);
  
    // Start the ajax request.
    request.send();

}

function timestampToDate (number) {
    // Return year/month/day from a timestamp

    var dateObj = new Date(number * 1000);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "/" + month + "/" + day;
}