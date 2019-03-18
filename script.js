// your code here

// generateNewTweet을 호출할 때마다 새로운 트윗을 생성합니다.
// console.log(generateNewTweet());


var date = new Date();

var inputUsername = document.getElementsByClassName('input-username')[0]; 
var textareaMessage = document.getElementsByClassName('textarea-message')[0];
var wroteCommentsPlace = document.getElementById('wrote-comments-place');

var checkNewTweetBtn = document.getElementById('check-new-tweet-button');
var clearFilterBtn = document.getElementById('clear-filter-button');



// DATA comments
(function wroteCommentsList() {

    for(var i = DATA.length-1; i >= 0; i--) {
    
        var addLiwrote = document.createElement("li");
        var addDivWroteUser = document.createElement("div");
        var addAWroteUser = document.createElement("a");
        var addSpanWroteTime = document.createElement("span");
        var addDivWroteComments = document.createElement("div");

        var wroteUserNode = document.createTextNode(DATA[i].user);
        var wroteTimeNode = document.createTextNode(DATA[i].created_at);
        var wroteCommentsNode = document.createTextNode(DATA[i].message);

        wroteCommentsPlace.appendChild(addLiwrote);
        addLiwrote.appendChild(addDivWroteUser);
        addDivWroteUser.appendChild(addAWroteUser);
        addAWroteUser.appendChild(wroteUserNode);
        addDivWroteUser.appendChild(addSpanWroteTime);
        addSpanWroteTime.appendChild(wroteTimeNode);
        addLiwrote.appendChild(addDivWroteComments);
        addDivWroteComments.appendChild(wroteCommentsNode);
        
        addLiwrote.className = 'comments-li';
        addAWroteUser.className = 'username';
        addSpanWroteTime.className = 'commentTime';
        addDivWroteComments.className = 'comments';
    }
   
})();




// tweet !
function createTweet() {
    var usernameValue = inputUsername.value; // 입력한 username 값
    var textValue = textareaMessage.value; // 입력한 text 값
    
    if(inputUsername.value === '' || textareaMessage.value === '') {
        alert('이름 또는 메세지를 입력해주세요');
        return;
    }


    var addSpanTime = document.createElement("span");
    var addLi = document.createElement("li"); // <li> 생성
    var addDivUsername = document.createElement("div"); // username이 들어갈 <div> 생성
    var addAUsername = document.createElement("a");
    var addDivComments = document.createElement("div"); // comments가 들어갈 <div> 생성

    var username = document.createTextNode(usernameValue); // usernameValue를 노드로
    var comments = document.createTextNode(textValue); // textValue를 노드로
    var commentTime = document.createTextNode(new Date().format());

    addSpanTime.className = 'commentTime';
    addLi.className = 'comments-li'; // 생성한 li에 class 적용
    addDivUsername.className = 'username'; // username이 들어갈 <div>의 class이름
    addDivComments.className = 'comments' // comments가 들어갈 <div>의 class이름


    wroteCommentsPlace.appendChild(addLi); // 코멘트 div에 <li> 자식 추가
    addLi.appendChild(addDivUsername); // <li> 밑에 <div class="username"> 
    addDivUsername.appendChild(addAUsername);
    addAUsername.appendChild(username); 
    addDivUsername.appendChild(addSpanTime);
    addSpanTime.appendChild(commentTime);
    addLi.appendChild(addDivComments); // <li> 밑에 <div class = "comments">
    addDivComments.appendChild(comments); // <li> <div class = "comments"> 밑에 comments node 추가

    wroteCommentsPlace.insertBefore(addLi, wroteCommentsPlace.childNodes[0]); // 새로운 코멘트 추가
    
    var addNewCommentsObj = {}
    addNewCommentsObj.user = usernameValue;
    addNewCommentsObj.message = textValue;
    addNewCommentsObj.created_at = new Date().format();

    DATA.push(addNewCommentsObj);

    inputUsername.value = '';
    textareaMessage.value = '';
    console.log(DATA);
    filtering();
    
}



// check-new-tweet-button 누르면 뉴 트윗 생성
function checkNewTweet() {
    var wroteCommentsPlace = document.getElementById('wrote-comments-place');
    DATA.push(generateNewTweet());

    var addSpanTime = document.createElement("span");
    var addLi = document.createElement("li"); // <li> 생성
    var addDivUsername = document.createElement("div"); // username이 들어갈 <div> 생성
    var addAUsername = document.createElement("a");
    var addDivComments = document.createElement("div"); // comments가 들어갈 <div> 생성
    var commentTime = document.createTextNode(new Date().format());

    var usernameValue = DATA[DATA.length-1].user; // username 값
    var textValue = DATA[DATA.length-1].message; // 입력한 text 값
    var username = document.createTextNode(usernameValue); // usernameValue를 노드로
    var comments = document.createTextNode(textValue); // textValue를 노드로
    

    addSpanTime.className = 'commentTime';
    addLi.className = 'comments-li'; // 생성한 li에 class 적용
    addDivUsername.className = 'username'; // username이 들어갈 <div>의 class이름
    addDivComments.className = 'comments' // comments가 들어갈 <div>의 class이름

    wroteCommentsPlace.appendChild(addLi); // 코멘트 div에 <li> 자식 추가
    addLi.appendChild(addDivUsername); // <li> 밑에 <div class="username"> 
    addDivUsername.appendChild(addAUsername);
    addAUsername.appendChild(username); 
    addDivUsername.appendChild(addSpanTime);
    addSpanTime.appendChild(commentTime);
    addLi.appendChild(addDivComments); // <li> 밑에 <div class = "comments">
    addDivComments.appendChild(comments); // <li> <div class = "comments"> 밑에 comments node 추가    

    wroteCommentsPlace.insertBefore(addLi, wroteCommentsPlace.childNodes[0]);
    filtering();
}



function filtering() {
    //{ user: 'ingikim', message: 'Welcome to Code States #codestates', created_at: '2019-01-03 12:30:20' }

    var aTagUsername = document.getElementsByTagName("a");
    console.log(aTagUsername);
    for(var i = 0; i < aTagUsername.length; i++) {
        aTagUsername[i].onclick = function(event) { 
            checkNewTweetBtn.style.display = 'none';
            clearFilterBtn.style.display = 'block';

            for(var j = 0; j < aTagUsername.length; j++) {
                if(event.target.text !== aTagUsername[j].text) {
                    aTagUsername[j].closest('li').style.display = 'none';
                }
            }
        }
    }
}
filtering();


function goBack() {
    var aTagUsername = document.getElementsByTagName("a");

    for(var i = 0; i < aTagUsername.length; i++) {
        if(event.target.text !== aTagUsername[i].text) {
            aTagUsername[i].closest('li').style.display = 'block';
        }
    }

    clearFilterBtn.style.display = 'none';
    checkNewTweetBtn.style.display = 'block';
}


/* 
<div id="wrote-comments-place">
    <li class="comments-li">
        <div class="username">
            <a>username</a> <span>time</span>
        </div>
        <div class="comments">
            comments
        </div>
    </li>
</div>
*/