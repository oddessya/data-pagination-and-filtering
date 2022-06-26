/*
This function will create and insert/append the elements needed to display a "page" of nine students from the array of student data.
*/

/* 
Create the 'showPage' function
This function will create and insert the elements needed to display a "page" of nine students
*/
 function showPage(list, page){
   studentList.innerHTML= '';
// loop whole list of students 
   for (i=0; i < list.length; i++){
// create 2 variables to find the first and last item of the given page
      let startIndex = page * 9 - 9;
      let endIndex = page * 9;

      if (i >= startIndex && i < endIndex){
         let studentDetails = 
         `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${list[i].registered.date}</span>
         </div>
         </li>`;
         studentList.insertAdjacentHTML('beforeend', studentDetails);
      }
   }
}
/*
Create the `addPagination` function
This function will create and append the elements needed for the pagination buttons
*/ 

function addPagination(list){
   // Create var to specify number of buttons required for the list
      const buttons_num = Math.ceil(list.length/9)
   // Create var to select a class 'link-list' and set it to empty string.
      const linklist = document.querySelector('.link-list');
      linklist.innerHTML = '';
   // Do a for loop that will create page number button for the list.
      for(i = 1; i <= buttons_num; i++ ){
         linklistHTML = 
         `<li>
         <button type="button">${[i]}</button>
         </li>`;
         
   // Insert DOM element
      linklist.insertAdjacentHTML('beforeend', linklistHTML)
        
   // Make first button active state.
      let firstButton = document.querySelector('li > button');
      firstButton.className = 'active';
      };
      
   // change clicked buttons to active state 
      linklist.addEventListener('click', (e) => {
         buttonClicked = e.target;
         if (buttonClicked.tagName === 'BUTTON'){
      // remove active state from current button
            let activeState = document.querySelector('.active');
            activeState.classList.remove('active');
      // add active state to clicked button
            e.target.className = 'active';
      // run the desired page by reading the button's text content.
            showPage(list,e.target.textContent)
         }
      });
   }
   
   // Call functions
   
   // 
   showPage(data,1);
   addPagination(data);
   
   /***********
    * Create the search bar in header.
    * 
   ***********/
   
   // create variable to select header in HTML
   const js_header = document.querySelector('header');
   // create variable to store and create label element
   let searchBar = document.createElement('label');
   // set attribute and class for the label to searchBar
   searchBar.setAttribute('for', 'search')
   searchBar.className = 'student-search';
   
   //create element for span, input, button by adding innerHTML
   
   searchBar.innerHTML = 
   `<span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>`; 
   
   // append searchBar to header
   js_header.appendChild(searchBar);
   
   
   // create h3 after the searchbar to contain the text 'No results found'. Default to display none.
   
   const h3 = document.createElement('h3');
   h3.className = 'no-results';
   h3.style.display = 'none';
   h3.textContent = "No results found.";
   js_header.insertAdjacentElement("afterend", h3);
   
   /** 
      Create function to push objects matching input value into an empty array.
   */  
   
   function searchName(input,list){
      let searchList = [];
   // create a for loop to go through the list to find student based on first or last name
      for (i = 0; i < list.length; i++){
   // create a conditional statement to check if the input includes any first name or last name. Reminder to change to lower case.      
         if(list[i].name.first.toLowerCase().includes(input.value.toLowerCase()) || list[i].name.last.toLowerCase().includes(input.value.toLowerCase()) ){
   // if it matches, push it into the searchList array.
            searchList.push(list[i]);
         }
      }
   // show the text 'No results found' if searchList has no results.
      if (searchList.length === 0) {
         h3.style.display = '';
       } else {
         h3.style.display = 'none';
       };
   
   // run showPage and addPagination functions according to the searchList
   
   
   showPage(searchList,1);
   addPagination(searchList);
   
   
   };
   
   //Add an event listener to the search 
   search.addEventListener("keyup", () => {
   
      //Create a conditional statement that shows if there is input (value.length is not 0), use the function searchName to filter for names. if there is no input, show the list of students on the page
         if(search.value.length != 0) {
            searchName(search, data);
         } else {
           showPage(data, 1)
           addPagination(data);
         }
      })