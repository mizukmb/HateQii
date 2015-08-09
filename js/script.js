document.body.onload = function() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena != null || items.qiita != null) {
      var ele = document.createElement("div");
      ele.setAttribute("id", "hateqii");
      ele.innerHTML = "<p>Hatena ID:" + items.hatena + "</p>" + "<p>QiitaID:" + items.qiita + "</p>";
      document.body.appendChild(ele);
    } else {
    }
  });
}
