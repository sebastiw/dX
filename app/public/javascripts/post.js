var loadingATM = false,
    feedActive = false,
    oldestPost,
    numberOfPosts = 5;

$(document).ready(function() {
  var newPosts = [],
      newestPost;

  $('#postbutton').click(function() {
    postNewPost();
  } );
  $('#morePostsButton').click(function() {
    if(typeof oldestPost != 'undefined') {
      loadPostsFromDate(oldestPost.eventOn);
    }
  } );

  //LOAD POSTS
  loadPosts();
  function loadPosts() {
    $('#posts').empty();
    jQuery.ajax( {
      url: "/rest/posts",
      type: "GET",
      dataType: 'json',
      data: {
        nof: numberOfPosts
      },
      success: function(data) {
        newestPost = data[0];
        // if( data.length < numberOfPosts ) {
        //   setFeedLoadingActive(false);
        // }
        handleNewPosts(data);
      }
    } );
  }

  function loadPostsFromDate(fromDate) {
    $('#posts').empty();
    jQuery.ajax( {
      url: "/rest/posts",
      type: "GET",
      dataType: 'json',
      data: {
        nof: numberOfPosts,
        fe:  fromDate
      },
      success: function(data) {
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
      $('#posts').append( postFromData(newPosts[i]) );
    }
    $('#posts li:last').addClass('last_post');
    newPosts = [];
    setLastPost();
    loadingATM = false;
  }

  function postFromData(postData) {
    var sourceUser = postData.poster, // USER.getUser(postData.poster),
        message = postData.message,
        post
          = '<li class="m-feed-item">'
          + '<div class="post" id="' + postData._id + '">'
    // Header
          + '<div class="post_header">'
          + '<div class="header_left"></div>'
          + '<div class="header_right"></div>'
          + '</div>'
    // Content
          + '<div class="post_content">'
          + '<p class="text_content">' + message + '</p>'
          + '</div>'
    // Footer
          + '<div class="post_footer">'
          + '<div class="footer_left">'
          + '<p class="source_name"><a class="user_link">' + sourceUser + '</a></p>'
          + '</div>'
          + '<div class="footer_right">'
          + '<p class="timestamp">' + new Date(postData.eventOn).toLocaleString() + '</p>'
          + '</div>'
          + '<hr width="75%" size="1px" noshade="">'
          + '</div></div></li>';
    return post;
  }
  function setLastPost() {
    $('.last_post').waypoint( {
      offset: 'bottom-in-view',
      container: '#post',
      handler: function (direction) {
        if( !loadingATM ) {
          loadPostsFromDate(oldestPost.eventOn);
        }
      }
    } );
  }
} );

function setFeedLoadingActive(modifier) {
  feedActive = modifier;
}
