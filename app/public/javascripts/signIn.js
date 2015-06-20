$(document).ready(function() {
    $('#button-signIn').click(function(){
        alert("HEJJE!");
        signIn();
    });
    $('#signInForm').keydown(function (e){
        if(e.keyCode == 13){
            signIn();
        }
    });
    function signIn(){
        jQuery.ajax({
            url: "/",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            data: {
                username: $('#user-signIn').val(),
                password: $('#pass-signIn').val()
            },
            success: function( signedIn ) {
                alert("Success was " + signedIn.success );
                if( signedIn.success ) {
                    window.location.replace("/home");
                }
            },
            error: function( error ) {
                alert("error" + error);
            }
        });
    }
});
