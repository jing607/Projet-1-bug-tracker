/* Header Burger */
function toggleMenu () {  
  const navbar = document.querySelector('.nav-main');
  const burger = document.querySelector('.burger');
  
  burger.addEventListener('click', (e) => {    
    navbar.classList.toggle('show-nav');
  });    
  // bonus
  const navbarLinks = document.querySelectorAll('.nav-main a');
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {    
      navbar.classList.toggle('show-nav');
    }); 
  })
   
}
toggleMenu();


/* Table */
function load() {
  fetch("https://greenvelvet.alwaysdata.net/bugTracker/api/");
}

function fetch(address) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
      if (request.readyState === 4) {                  
          // request finished and response is ready
          
          console.log (request.status);
          if (request.status === 200) {
              // Fetch successful

              parseToTable(request.responseText);
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
                              "state" : 0\
                            }\
                           ],\
                      "last_timestamp":1327243631\
                    }\
                }'

                parseToTable (example);
              
          }
      }
  }

  request.open('Get', address);

  // Start the ajax request.
  request.send();

}

function timestampToDate (number) {
  // Return yyyy-mm-dd HH:mm:ss from a timestamp

  var dateObj = new Date(number * 1000);

  return dateObj.toISOString().replace("T"," ").substring(0, 19);
}

function parseToTable (array) {
// From the server object, parse and inset to table 

// Parse the argument to an array
var array = JSON.parse(array);
var table_body = document.getElementById('table_body');

array["result"]["bug"].forEach( function(element, elementIndex) {

    let table_row = document.createElement("tr");
    let table_row_state = document.createElement("select");
    let table_row_state_0 = document.createElement("option");
    let table_row_state_1 = document.createElement("option");
    let table_row_state_2 = document.createElement("option");
    let td_temp, td_button, td_span;

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
    table_row_state.classList.add("dropdown");

    // Add change event listener to select element
    table_row_state.addEventListener('click', ((event) => {
      // Refresh table bug count
      countBug();
    }));

    td_temp = document.createElement("td");
    td_temp.appendChild(table_row_state);
    table_row.appendChild(td_temp);

    // append delete button
    td_temp = document.createElement("td");
    td_button = document.createElement("button");
    td_span = document.createElement("span");      
    td_span.appendChild(document.createTextNode("delete"));
    td_span.classList.add("material-symbols-rounded");
    td_button.appendChild(td_span);
    td_button.appendChild(document.createTextNode("supprimer"));
    td_button.classList.add("text-btn-icon");
    td_temp.appendChild(td_button);
    table_row.appendChild(td_temp);

    // add click event listener to button
    // Delete table row if button is clicked
    td_button.addEventListener('click', ((event) => {

      
      // Remove table row on click
      table_row.remove();
      
      // Refresh table bug count
      countBug();
    })
  ) 

    table_body.appendChild(table_row);
})

// Refresh table bug count
countBug();console.log (window.location.pathname);
}

function countBug() {
  // Count how many bugs in the current table

  var table_body = document.getElementById('table_body');
  var table_body_children = table_body.children;
  var bugCount = table_body_children.length, bugEnCours = 0, bugTraite = 0;
  for (var i = 0; i < bugCount; i++) {
      var tableRow = table_body_children[i];
      var tableRowStatus = tableRow.children[3].children[0].value;
      if (tableRowStatus == 1) {
          bugEnCours += 1;
      } else if (tableRowStatus == 2) {
          bugTraite += 1;
      }

  }
  console.log("Bug au total: ", bugCount,", bug en cours: ",bugEnCours,", bug traité: ",bugTraite);
  
  try {
    document.getElementById('bug_count_total').textContent = bugCount;
    document.getElementById('bug_count_inpr').textContent = bugEnCours;
    document.getElementById('bug_count_finish').textContent = bugTraite;
  }
  
  catch (e) {
    document.getElementById('bug_count_todo').textContent = bugCount-bugEnCours-bugTraite;
  }
  
}

window.onload = function() {

// Add click event listner for create bug submit button
// Redirect page to list html
var a = document.getElementById('bugForm');
a.addEventListener('submit', ((event) => {
  
  event.preventDefault();

  // Create bug
  console.log (window.location.pathname);

  // Redirect page to list html
  window.location.replace("list.html");
}));
}

