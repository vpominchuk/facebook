var lastScroll   = -1;
var loadTryCount = 70;
var nowTryCount  = 0;
var result       = "\n";

var INTERVAL = window.setInterval(function() {
  if (nowTryCount >= loadTryCount)
  {
      window.clearInterval(INTERVAL);
      var items = document.querySelectorAll('#repost_view_dialog .fbUserContent');
      for (var i=0; i < items.length; ++i)
      {
        var account = items[i].querySelector('a.profileLink');
        result += account['href'] + ' — ' + account.textContent + '\n';
      }

      console.log(result);
  }

  if (window.scrollY == lastScroll)
       nowTryCount += 1;
  else
       nowTryCount = 0

  lastScroll = window.scrollY;
  window.scrollBy(0, 1000);
}, 700);