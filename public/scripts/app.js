/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

//gets tweets that are preloaded
function loadTweets() {
  $.get("/tweets", function (data) {
    renderTweets(sortTweets(data));
  })
}


// // function loadLatest() {
// //   $.get("/tweets", function () {

// //   })
// }
// // function loadTweet() {
// //   $.get($("/tweets" #tweedle").val(), function (nowTweet) {
// //     renderTweet(nowTweet);
// //   });
// // }

//tweet submit form
$('#tweetForm').submit(function (event) {
  event.preventDefault();
  let data = $(this).serialize();
  if (($("#tweedle").val().length == 0) || ($("#tweedle").val() == "")) {
    alert("Oops. Try writing something before submitting");
  } else if ($("#tweedle").val().length > 140) {
    alert ("No-can-do! 140 or less or it's not a tweedle!");
  } else {
    $.ajax({
      method: "POST",
      url: "/tweets",
      data
    })
    loadTweets();
  }
    // .done(function(msg) {
    // });
});


function createTweetElement(tweetData) {

  return `<article class="restTweet">
    <header>
      <img class="avatar" src ="${tweetData.user.avatars.large}"/>
      <h2>${tweetData.user.name}</h2>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <section class="tweetText">${tweetData.content.text}</section>
    <footer>
      <span class="days">${tweetData.created_at}</span>
    </footer>
  </article>`;
}

let mostRecentTweet = 0;

function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    if (tweetData.created_at > mostRecentTweet) {
      let $tweet = createTweetElement(tweetData);
      $('#restTweets').prepend($tweet);
      mostRecentTweet = tweetData.created_at;
    }
  });
}

loadTweets();



function sortTweets(arrTweets) {
  arrTweets.sort(function (a, b) {
    return a.created_at - b.created_at;
  })
  return arrTweets;
}




});