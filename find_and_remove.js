var accountTag = 'own_remove_account_tag';
var css = " \
    .own_popup { \
        width: 50%; min-width: 676px; height: 80%; padding: 15px; \
        background: white; border: 1px solid #eee; border-radius: 15px; \
        z-index: 999999; position: fixed; margin: auto; \
        top: 50px; left: 0; right: 0; \
        -webkit-box-shadow: 0px 3px 38px 0px rgba(50, 50, 50, 0.32); \
        -moz-box-shadow:    0px 3px 38px 0px rgba(50, 50, 50, 0.32); \
        box-shadow:         0px 3px 38px 0px rgba(50, 50, 50, 0.32); \
    } \
    .own_success { \
        position: absolute; padding: 20px; top: 10%; width: 50%; left: 0; right: 0; \
        background: rgba(177, 253, 185, 0.7); border-radius: 5px; \
        font-size: 2em; text-align: center; z-index: 999; \
        margin-left: auto; margin-right: auto; display: none;\
    } \
    .own_friends_list { \
        overflow: hidden; overflow-y: scroll; \
        width: 100%; height: 95%; margin-top: 10px; \
        font-size: 1.3em; border-top: 1px solid rgba(204, 204, 204, 0.7); \
    } \
    #own_do_delete { font-weight: bold; text-transform: uppercase; font-size: 1.1em; cursor: pointer; float: right; \
        border-radius: 5px; background: rgba(255, 0, 0, 0.44); padding-left: 5px; padding-right: 5px; color: white; \
    } \
    .own_inactive { opacity: 0.5; pointer-events: none; } \
    #own_header { font-size: 1.3em; } \
    .own_account_container { white-space: nowrap; overflow: hidden; margin: 2px; padding: 2px; width: 32%; float: left; cursor: pointer; border-radius: 5px; } \
    .own_friends_list img { border-radius: 50%; vertical-align: middle; margin-right: 15px; width: 40px; height: 40px;} \
    ."+ accountTag +" { background: rgba(255, 0, 0, 0.07); } \
";

var userId   = document.cookie.match(/c_user=(\d+)/)[1];
var TYPEHEAD = "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70" +
               "\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x66\x69\x6C" +
               "\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x70\x72\x65\x74\x74\x79\x3D\x30\x26\x6C\x61\x7A\x79\x3D\x30\x26\x76\x69\x65\x77\x65" +
               "\x72\x3D" +userId+ "\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37\x26\x73\x74\x61\x6C\x65\x5F\x6F\x6B\x3D\x30\x26\x6F\x70\x74\x69\x6F\x6E\x73" +
               "\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D";

var REMOVE   = "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x72\x6F" +
               "\x66\x69\x6C\x65\x2F\x72\x65\x6D\x6F\x76\x65\x66\x72\x69\x65\x6E\x64\x63\x6F\x6E\x66\x69\x72\x6D\x2E\x70\x68\x70\x3F\x64\x70\x72\x3D\x32";

var ADD      = "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64" +
               "\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70\x3F\x64\x70\x72\x3D\x32";

function get(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function post(path, params, method)
{
    var http   = new XMLHttpRequest();
    var params = serialize(params);

    http.open("POST", path, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
}

function injectCss(css)
{
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}

serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function createPopup()
{
    var div = document.createElement("div");
    div.innerHTML = '<span id="own_header">Список друзей с наименьшей активностью</span>'
                  + ' | Выделено <b id="own_selected_count">0</b>'
                  + '<div id="own_do_delete" onClick="doDelete()">Удалить выделенных друзей</div>'
                  + '<div class="own_friends_list"></div>'
                  + '<div class="own_success">Выделенные друзья удалены!</div>';

    div.className = 'own_popup';
    document.body.appendChild(div);
}

function toggleClass(elem)
{
    if (elem.classList.contains(accountTag))
        elem.classList.remove(accountTag);
    else 
        elem.classList.add(accountTag);

    var selectedCount = document.querySelector('#own_selected_count');
    selectedCount.innerHTML = document.querySelectorAll("." + accountTag).length;
}

function getDtsg()
{
    var token = document.documentElement.innerHTML.match(/fb_dtsg" value="(.*?)"/g)[0];
    token = token.replace('fb_dtsg" value="', '');
    token = token.substring(0, token.length - 1);
    return token;
}

function removeFriend(uid)
{
    console.log("Remove friend with id: " + uid);
    var removeParams = {
        "uid"   : uid,
        "unref" : "bd_profile_button",
        "floc"  : "profile_button",
        "__user": userId,
        "nctr[_mod]" : "pagelet_timeline_profile_actions",
        "__dyn" : "",
        "fb_dtsg" : getDtsg(),
    };
    post(REMOVE, removeParams);
}

function doDelete()
{
    console.log("Start deleting selected friends...");

    document.querySelector('#own_do_delete').classList.add('own_inactive');
    document.querySelector('.own_friends_list').classList.add('own_inactive');

    var tagged = Array.prototype.slice.call(document.querySelectorAll('.' + accountTag));
    var handle = window.setInterval(function() {
        if (!tagged.length)
        {
            window.clearTimeout(handle);
            document.querySelector('.own_success').style.display = "block";
            return;
        }

        var account = tagged.pop();
        removeFriend(account.getAttribute('data-uid'));
    }, 2500);
}

var data = get(TYPEHEAD).replace("for (;;);", "");
var json = JSON.parse(data);

var friends = json.payload.entries.reverse().slice(0, 100);

var html = "";
for (var i=0; i < friends.length; ++i)
{
    var data = friends[i];
    html += '<div class="own_account_container" data-uid="'+data['uid']+'" onClick="toggleClass(this)">'
         +  '<img src="http://graph.facebook.com/' + data['uid'] + '/picture?type=square">' 
         +  '<a target="_blank" href="/' + data['uid'] + '">' + data['names'][0] + '</a></div>';
}

injectCss(css);
createPopup();

document.querySelector('.own_friends_list').innerHTML = html;
console.log("Choose friends to remove...");