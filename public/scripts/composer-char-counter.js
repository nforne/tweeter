$(document).ready(() => {
  let alertCount = 0;
  const $textarea = $("#tweet-text");
  const $counter = $(".counter");  
  
  $textarea.on('focus keydown click input', (e) => {
      
    const count = 140;
    const $text = $textarea.val();      
    if (count - $text.length >= 0) {
      alertCount = 0;
      $counter.attr('style', 'color: black');
      $counter.text(`${count - $text.length}`);
    } else {
      if (alertCount !== 1) {
        alertCount = 1;
        $('#err-msg').html('Blank submissions or more than 140 characters are not allowed. Thank you!');
        $('#err-msg').slideDown('fast', $('#err-msg').html("").delay(5000));
      } else if (count - $text.length < 0 ) {
        $counter.attr('style', 'color: red;');     
        $counter.text(`${count - $text.length}`);
      }
    }
            
  })
})
  

