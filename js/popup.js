function loadData() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena || items.qiita) {
      document.getElementById("form-position").innerHTML = "<h1>Login</h1>" + "<p>Hatena ID:" + items.hatena + "</p>" + "<p>QiitaID:" + items.qiita + "</p>";
    } else {
    }
  });
}

function saveChanges() {
  var hatenaID = document.loginForm.elements["hatena"].value;
  var qiitaID  = document.loginForm.elements["qiita"].value;

  if(hatenaID != "" || qiitaID != "") {
    chrome.storage.sync.set({hatena: hatenaID, qiita: qiitaID}, function() {
      console.log('%s%s', hatenaID, qiitaID);
    });
  }
}

loadData();
var el = document.getElementById("submit");
el.addEventListener("click", saveChanges, false);

