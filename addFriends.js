// Run at this location: https://www.facebook.com/?sk=ff

var addFriendsCount = 100;
var addPause        = 3 * 1000;

function waitForScroll() {
    return new Promise(function(resolve, reject) {
        var it = 0;
        var interval = window.setInterval(function() {
            console.log('Wait...');
            if (it++ > 15)
            {
                window.clearInterval(interval);
                resolve();
            }
            window.scrollBy(0, 2000);
        }, 800, resolve);
    });
}

waitForScroll().then(function() {
    var added = 0;
    var addFriends = document.querySelectorAll('#fbSearchResultsBox button.FriendRequestAdd');
        addFriends = Array.prototype.slice.call(addFriends).reverse();

    var clickInterval = window.setInterval(function() {
        if (!addFriends.length || added++ == addFriendsCount)
        {
            window.clearInterval(clickInterval);
            return;
        }

        var button = addFriends.pop();
        button.scrollIntoView(false);
        button.click();
        console.log('Send request #' + added);

        try{document.querySelector('div[role="dialog"] a.layerCancel').click()}catch(e){};
    }, addPause);
});