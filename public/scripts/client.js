/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//--------------------------------------------------------------------------------------------------
$(document).ready(() => {

  const createTweetElement = (data) => {
    
    const tweet = ` <hr>
                    <div id="tweetSkin">
             
                      <article class="tweets">
                        <div class="avatr"> 
                          <img src="/images/profile-hex.png" class="img"> <!--//////////to edit later: \${data.user.avatars} replaces /images/profile-hex.png///////////-->
                          <div id='emailAndName'>
                            <div>${data.user.name}</div>
                            <div>${data.user.handle}</div>            
                          </div>           
                        </div>
                        <!-- <p id=tweettext ></p> -->
                        
                          <textbox id=tweettext> 
                          ${data.content.text}
                          </textbox>
                       
                        <hr id="line">
                        <footer class="analysis">
                          <output class="t-age" type="submit">${timeago.format(data.created_at)}</output> 
                          <div class="stats">
                            <button class="stat" type="submit"><i class="fas fa-flag"></i></button>
                            <button class="stat" type="submit"><i class="fas fa-retweet"></i></button>
                            <button class="stat" type="submit"><i class="fas fa-heart"></i></button>        
                          </div>
                        </footer>
                      </article>
            
                  </div>
                  `; 

    return tweet;
  };

//--------------------------------------------------------------------------------------------------
  const emptnsCheck = (text) => {
    let outPut = false;    
    for (let i of text.split('')) {
      if (i !== ' ') {
        outPut = true;
        break;
      }
    }
    return outPut;
  };

//--------------------------------------------------------------------------------------------------
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

//--------------------------------------------------------------------------------------------------
  const renderTweets = (dataArray) => {
    for (let i of dataArray.reverse()) {
      const $tweet = createTweetElement(i);
      $('#tweetSpace').append($tweet);
    }
  }

  const loadTweets = () => {
    $.ajax( {url: "/tweets", method: 'GET' })
      .then((res) => {
        $('#tweetSpace').html('');
        setTimeout(renderTweets(res), 1000);
      }); 
    }

//--------------------------------------------------------------------------------------------------
  $( ".tweet-textf" ).submit(( event ) => {    
    event.preventDefault();
    const $text = $('#tweet-text').val();
    if ($text.length > 0 && $text.length <= 140 && emptnsCheck($text)){ 
      
      const safeHTML = `<p>${escape($text)}</p>`;

      $.ajax({ url: "/tweets", data: {'text': safeHTML} , type: 'POST'})
          .then(() => {
            loadTweets()
          })
      $('#tweet-text').val("");
      $('#tweet-text').focus();
      
    } else {
      $('#err-msg').html('Blank submissions or more than 140 characters are not allowed. Thank you!');
      $('#err-msg').slideDown(fast, $('#err-msg').html("").delay(5000));
    }
  }); 

//--------------------------------------------------------------------------------------------------
  $( "#tweet-text" ).keydown((e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      const $text = $('#tweet-text').val()
      if ($text.length > 0 && $text.length <= 140 && emptnsCheck($text)){
        $( ".tweet-textf" ).submit();
      } else {
        $('#err-msg').html('Blank submissions or more than 140 characters are not allowed. Thank you!');
        $('#err-msg').slideDown(fast, $('#err-msg').html("").delay(5000));
      }
    }
  });

//--------------------------------------------------------------------------------------------------
  $(document).on('click keydown scroll',() => {loadTweets(); $('#err-msg').html("").delay(5000);})
    
  loadTweets();
  
//--------------------------------------------------------------------------------------------------

  
  $(document).on('scroll', () => {
    $("#scrollup").attr('style', 'color: red;');
  });
  
  $(document).on('click keydown', () => {
    $("#scrollup").attr('style', 'color: transparent;');
  });

  //--------------------------------------------------------------------------------------------------
    
  let view = false;
  $("#t-field, #scrollup").on('click', () => {
   
    if (view) {
      view = false
      $("#flicker").slideUp(1000);
    } else {
      view = true      
      $("#flicker").slideDown(10);
      $('#tweet-text').focus();
    }
  });
  
  $("#tweet-text").on('blur', () => {    
    $("#flicker").slideUp(1000).delay(7000);
    view = false;
  });

})

