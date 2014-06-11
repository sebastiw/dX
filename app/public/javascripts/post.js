$(document).ready(function() {
  var newestPost,
      oldestPost,
      newPosts = [];

  $('#postbutton').click(function() {
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
    $('#posts').empty();
    jQuery.ajax( {
      url: "/rest/posts",
      type: "GET",
      dataType: 'json',
      data: {
        nof: 5,
        fe:  fromDate !== undefined ? fromDate : new Date()
      },
      success: function(data) {
        newestPost = data[0];
        oldestPost = data[data.length-1];
        newPosts = data;
        appendPosts();
      }
    } );
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
        $('#post_textarea').val("Post something new...");
        loadPosts();
      }
    } );
  }

  function appendPosts() {
    newPosts.foreach(function (x, idx) {
      $('#posts').append( postFromData(x) );
    } );
    $('#posts li:last').addClass('last_post');
    newPosts = [];
  }

  function postFromData(postData) {
    var sourceUser = USER.getUser(postData.poster),
        message = postData.message,
        post
          = '<li class="m-feed-item">'
          + '<div class="post" id="' + postData._id + '">'
    // Header
          + '<div class="post_header">'
          + '<div class="header_left">'
          + '<p class="source_name"><a class="user_link">' + sourceUser + '</a></p>'
          + '</div>'
          + '<div class="header_right">'
          + '<p class="timestamp">' + new Date(postData.updatedAt).toLocaleString() + '</p>'
          + '</div></div></div>'
          + '<hr width="75%" size="1px" noshade="">'
    // Content
          + '<div class="post_content">'
          + '<p class="text_content">' + postData.message + '</p>'
          + '</div>'
    // Footer
          + '<div class="post_footer">'
          + '</div></div></li>';
    return post;
  }
} );
