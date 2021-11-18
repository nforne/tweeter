$(document).ready(() => {
  // --- our code goes here ---
  let alertCount = 0;
  const $textarea = $("#tweet-text");
  const $counter = $(".counter");  
  
  $textarea.on('focus keydown click input', (e) => {
      
    const count = 140;
    const event = $textarea.val();      
    if (count - event.length >= 0) {
      alertCount = 0;
      $counter.attr('style', 'color: black');
      $counter.text(`${count - event.length}`);
    } else {
      if (alertCount !== 1) {
        alertCount = 1;
        alert('Please, limit your tweet to 140 characters. Thank you!');
      } else if (count - event.length < 0 && e.originalEvent.data) {
        $counter.attr('style', 'color: red;');     
        $counter.text(`${count - event.length}`);
      }
    }
            
  })
})
  

