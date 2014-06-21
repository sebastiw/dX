$(document).ready(function() {
  $('#passwordbutton').click(function() {
    changePassword();
  } );

  function changePassword() {
    jQuery.ajax( {
      url: "/rest/user/changepassword",
      type: "POST",
      dataType: 'json',
      contentType: "application/x-www-form-urlencoded",
      data: {
        password: $('#newpassword').val()
      },
      success: function( data ) {
        alert("Changed password.");
      }
    } );
  }
} );
