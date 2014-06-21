$(document).ready(function() {
  $('#addmemberbutton').click(function() {
    addMember();
  } );

  fillYears();
  function fillYears() {
    var year = (new Date()).getFullYear();
    $('#newmemberyear').append(
      '<option value="' + year + '" selected>' + year + '</option>'
    );
    for(var i = year-1; i > 1982; i--) {
      $('#newmemberyear').append(
        '<option value="' + i + '">' + i + '</option>'
      );
    }
  };

  loadMembers();
  function loadMembers() {
    jQuery.ajax( {
      url: "/rest/members",
      type: "GET",
      dataType: 'json',
      success: function( data ) {
        data.forEach(function (x, idx) {
          $('#members').append( handleMember(x) );
        } );
      }
    } );
  }

  function handleMember(data) {
    var name = data.username,
        mail = data.mail,
        year = data.year,
        post = data.position,
        last = data.lastlogin,
        memberhtml
          = '<li class="member-item">'
          + '<div class="member">'
          + '<div class="member_name">' + name + '</div>'
          + '<div class="member_mail">' + mail + '</div>'
          + '<div class="member_year">' + year + '</div>'
          + '<div class="member_post">' + post + '</div>'
          + '<div class="member_last">' + last + '</div>'
          + '</div></li>';
    return memberhtml;
  }

  function addMember() {
    var name = $('#newmembername').val(),
        year = $('#newmemberyear').val(),
        mail = $('#newmembermail').val(),
        post = $('#newmemberposition').val();
    jQuery.ajax( {
      url: "/rest/member/add",
      type: "POST",
      dataType: 'json',
      data: {
        username: name,
        email: mail,
        position: post,
        year: year
      },
      success: function( data ) {
        $('#members').prepend( handleMember(data) );
        $('#newmembername').val( 'Nickname' );
        $('#newmembermail').val( 'Email' );
        $('#newmemberyear').val( '' );
      }
    } );
  }
} );
