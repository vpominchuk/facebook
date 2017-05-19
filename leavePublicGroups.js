// https://www.facebook.com/groups/?category=groups

var formSelector = 'form[action*="leave.php"]';
var leavePause   = 4 * 1000;

var leftGroupsCount = 0;
var leaveGroupTitle = "";

function waitFor(selector) {
    return new Promise(function(resolve, reject) {
        var interval = window.setInterval(function() {
            var container = document.querySelector(selector);
            if (container.length) {
                resolve(container);
                window.clearInterval(interval);
            }
        }, 500, resolve);
    });
}

var clickInterval = window.setInterval(function() {
    var decline = document.querySelector('a[ajaxify*="leave.php"]');

    if (!decline) {
        console.log('Finish!');
        window.clearInterval(clickInterval);
        return;
    }

    try {
        groupTitle = decline.parentNode.parentNode.parentNode.querySelector('a[href*="group_browse_new"]').textContent;
    } catch(e) {groupTitle = '';}

    decline.click();
    waitFor(formSelector).then(function() {
        document.querySelector(formSelector + ' .uiInputLabelLabel').click();
        document.querySelector(formSelector + ' button.layerConfirm').click();

        leftGroupsCount += 1;
        console.log('#' + leftGroupsCount + ' ' + groupTitle + ' — unsubscribed');

        decline.parentNode.removeChild(decline);
    });

}, leavePause);
