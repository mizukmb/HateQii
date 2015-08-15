function loadData() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena || items.qiita) {
      document.getElementById("form-position").style.display = "none";
      document.getElementById("logined").style.display = "";
      document.getElementById("hatenaID").innerHTML = "HatenaID: " + items.hatena;
      document.getElementById("qiitaID").innerHTML = "QiitaID: " + items.qiita;
    } else {
      document.getElementById("form-position").style.display = "";
      document.getElementById("logined").style.display = "none";
    }
  });
}

function saveChanges() {
  var hatenaID = document.loginForm.elements["hatena"].value;
  var qiitaID  = document.loginForm.elements["qiita"].value;

  if(hatenaID != "" || qiitaID != "") {
    chrome.storage.sync.set({hatena: hatenaID, qiita: qiitaID}, function() {
      document.getElementById("form-position").style.display = "none";
      document.getElementById("logined").style.display = "";
    });
  }
}

function logout() {
  chrome.storage.sync.clear(function() {
  });
  document.getElementById("form-position").style.display = "";
  document.getElementById("logined").style.display = "none";
}
loadData();
document.getElementById("login").addEventListener("click", saveChanges, false);
document.getElementById("logout").addEventListener("click", logout, false);
