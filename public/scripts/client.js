/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  
  // const fs = require('fs');
  // const tweets_db  = JSON.parse(fs.readFileSync('../../server/data-files/initial-tweets.json'));

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

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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

  $( ".tweet-textf" ).submit(( event ) => {    
    event.preventDefault();
    const $text = $('#tweet-text').val();
    if ($text.length > 0 && $text.length <= 140){ 
      
      const safeHTML = `<p>${escape($text)}</p>`;

      $.ajax({ url: "/tweets", data: {'text': safeHTML} , type: 'POST'})
          .then(() => {
            loadTweets()
          })
      $('#tweet-text').val("");
      $('#tweet-text').focus();
      
    } else {
      alert('Blank submissions or more than 140 characters are not allowed!')
    }
  });  

  $( "#tweet-text" ).keydown((e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      const $text = $('#tweet-text').val()
      if ($text.length > 0 && $text.length <= 140){
        $( ".tweet-textf" ).submit();
      } else {
        alert('Blank submissions or more than 140 characters are not allowed!')
      }
    }
  });

  $(document).on('click keydown',() => {loadTweets();})
    
  loadTweets();
  
})