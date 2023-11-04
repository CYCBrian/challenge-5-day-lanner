// Wrap all code inside the this function to ensure that the functions within only execute after the browser has finished rendering all the elements in the HTML.
$(document).ready(function(){


// To save users' input to local storage.
  // Create a function that saves users' input
  function saveFunction(){
    // Initialize a variable that captures all elements with an id as the key.
    var key = $(this).parent().attr("id");
    // Initialize a variable that will capture the value inside elements with class name "description".
    var value = $(this).siblings(".description").val();
    // Stor those two variables together locally as a key value pair so that the web app knows which value belongs to which key and vice versa.
    localStorage.setItem(key, value);
  };
  // Create an event listener that runs the function we just created when users click the save button.
  $(".saveBtn").on("click", saveFunction);


// To change the color of each time block based on the current hour of the day.
  // Create a function that will handle the background color change of each time block.
  function hourlyColorUpdate() {
    // Initialize a variable and give it a value of the current hour using dayjs
    var currentHour = dayjs().hour();
    // Create a function that will loop through each of the time blocks
    $(".time-block").each(function() {
      // Initialize a variable that will get the value of the time blocks' id by splitting the id at the hyphen, thereby creating a array, and using the 2nd value of the array.
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      // If the value of blockHour is smaller than the value of currentHour, it will add the css class "past" to the .time-block, turning it grey.
      if (blockHour < currentHour) {
        $(this).addClass("past");
      // If the value of blockHour is equal to the value of currentHour, it will add the css class "present" to the .time-block, turning it red.
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      // Otherwise, it will add the css class "future" to the .time-block, turning it green.
      } else {
        $(this).addClass("future");
      }
    });
  };
  // Run the function that we just created.
  hourlyColorUpdate();
  // Set the function so that it only runs once every hour.
  setInterval(hourlyColorUpdate, 60 * 60 * 1000);


// To retrieve user input that was save in localStorage via saveFunction and set the value of the corresponding textarea elements.
  // Create a function that will handle the retrieval and display
  function getFunction(){
    // Iterate over each element with the class name "time-block" and perform a callback function
    $(".time-block").each( function() {
      // Initialize a variable that captures all elements with an id as the key.
      var key = $(this).attr("id");
      // Initialize variable that retrieves the corresponding value from localStorage base on the element's ID
      var value = localStorage.getItem(key)
      // Set the value of the child elements with the class name "description" to the retrieve value/
      $(this).children(".description").val(value);
    })
  }
  // Run the function we just created.
  getFunction();


// To display the current day of the week.
  // Create a function that will handle the display
  function dateDisplay(){
    // Initialize a variable that will capture the day of the week, month and day of the week and format it to be presented as a word, value, value.
    var currentDay = dayjs().format("dddd, MMMM D");
    // Targeting the element with the id currentDay, we give it text content using string literal.
    $("#currentDay").text(`Oh it's you... Anyways, today is ${currentDay}.`);
  }
  // Run the function we just created.
  dateDisplay();
  // Set the function so that it only runs once every day.
  setInterval(dateDisplay, 24 * 60 * 60 * 1000);

})