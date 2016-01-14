var loadingATM = false,
    feedActive = false,
    newPosts = [],
    newestPost,
    oldestPost,
    numberOfPosts = 5;

$(document).ready(function() {
    $("#writePost-modal").dialog( {
        autoOpen: false,
        modal: true,
        show: "blind",
        hide: "blind"
    });

    $('#showWritePost').click(function () {
        $( "#writePost-modal" ).dialog( "open" );
    } );
    $('#post_button').click(function() {
        postNewPost();
    } );
    $('#morePostsButton').click(function() {
        if(typeof oldestPost != 'undefined') {
            loadPosts(oldestPost.eventOn);
        }
    } );


  //LOAD POSTS
  loadPosts();
  function loadPosts(fromDate) {
    jQuery.ajax( {
      url: "/rest/posts",
      type: "GET",
      dataType: 'json',
      data: {
        nof: numberOfPosts,
        fe: fromDate
      },
      success: function(data) {
        if( !newestPost ) {
          newestPost = data[0];
        }
        if( data.length < numberOfPosts ) {
          setFeedLoadingActive(false);
        }
        handleNewPosts(data);
      }
    } );
  }

  function handleNewPosts(data) {
    data.forEach(function (x, idx) {
      newPosts.push(x);
    } );
    oldestPost = newPosts[newPosts.length-1];
    appendPosts();
  }

  function postNewPost() {
    jQuery.ajax( {
      url: "/rest/post/newpost",
      type: "POST",
      contentType: "application/x-www-form-urlencoded",
      dataType: "json",
      data: {
        message: $('#post_textarea').val()
      },
      success: function() {
        // Delay here is needed!?
        $('#post_textarea').val("Post something new...");
        loadPosts();
      }
    } );
  }

  function appendPosts() {
    for(var i = 0; i < newPosts.length; i++) {
      /* postFromData in jade */
      $('#posts').append( postFromData(newPosts[i]) );
    }
    $('.last_post').removeClass('last_post');
    $('#posts li:last').addClass('last_post');
    newPosts = [];
    setLastPost();
    loadingATM = false;
  }

  function setLastPost() {
    $('.last_post').waypoint( {
      offset: 'bottom-in-view',
      container: '#post',
      handler: function (direction) {
        if( !loadingATM && feedActive ) {
          loadPosts(oldestPost.eventOn);
        }
      }
    } );
  }
} );

function setFeedLoadingActive(modifier) {
  feedActive = modifier;
}
