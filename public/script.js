// Popup form
// $(document).ready(function() { 
//   setTimeout(function() {
//     $('#form').modal('show');
//   }, 8000); // 8000 milliseconds = 8 seconds

//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip();
//   });
// });

// carousel
$(document).ready(function(){
  $("#myCarousel").carousel();
});

// customer login
$(document).ready(function() {
  // Toggle between Login and Register Forms
  $('#toggleLoginRegister').click(function() {
    $('#loginFormContainer').hide();
    $('#registerFormContainer').show();
  });

  $('#toggleRegisterLogin').click(function() {
    $('#registerFormContainer').hide();
    $('#loginFormContainer').show();
  });
});

$(document).ready(function() {
  // Close modal when close button is clicked
  $('.btn-close').click(function() {
    $('#loginRegisterModal').modal('hide');
  });
});

// adding info
var i = 0;
var txt = ' The floor plan of Mantri Pinnacle enables the best utilization of the space. The Mantri Pinnacle offers 3 BHK, 4 BHK, 5 BHK and 6 BHK luxurious Apartments in Bangalore. The master plan of Mantri Pinnacle comprises of well-designed Apartments in Bangalore.The amenities in Mantri Pinnacle include 24Hrs Backup Electricity, Bank/ATM, Cafeteria, Club House, Gated Community, Gym, Health Facilities, Indoor Games, Intercom, Landscaped Garden, Library, Maintenance Staff, Meditation Hall, Play Area, Rain Water Harvesting, Security Personnel, Swimming Pool, Tennis Court and Wifi Connection. Location of Mantri Pinnacle is suitable for those who are looking to invest in property in Bangalore with many schools, colleges, hospitals, supermarkets, recreational areas, parks and many other facilities nearby Bannerghatta Road .The address of Mantri Pinnacle is Near Meenakshi Temple, Bannerghatta Road, Bangalore, Karnataka, INDIA..Mantri Pinnacle project by Mantri Developers Pvt. Ltd. is reputed builders in Bangalore.Project Address:- Near Meenakshi Temple, Bannerghatta Road, Bangalore, Karnataka, INDIA'
var speed = 50;
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

//Brigade Carosel//
