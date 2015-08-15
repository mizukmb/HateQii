document.body.onload = function() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena != null || items.qiita != null) {
      var ele = document.createElement("div");
      ele.setAttribute("id", "hateqii");
      ele.innerHTML = "<p>Hatena ID:" + items.hatena + "</p>" + "<p>QiitaID:" + items.qiita + "</p>";

      var target = document.getElementById("ires");
      target.parentNode.insertBefore(ele, target);
      var qiitaJSONData = JSON.parse(ajax("//qiita.com/api/v2/users/" + items.qiita + "/stocks"));
      var googleSearchWords = document.getElementById("lst-ib").value.replace(/　/g, " ").split(" ");
      console.log(googleSearchWords);
      var qiitaStockTitles = [];
      for(var i=0; i<qiitaJSONData.length; i++) {
        qiitaStockTitles.push(qiitaJSONData[i].title);
      }
    } else {
    }
  });
}

function ajax(url) {
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function searchQiitaStocks(words, titles) {
  var matchTitles = [];
  for(var i=0; i<words.length; i++) {
    var re = new RegExp(words[i], "i");
    for(var j=0; j<titles.length; j++) {
      if(titles[j].match(re)) {
        console.log(titles[j]);
        console.log(words[i]);
        matchTitles.push(titles[j]);
      }
    }
  }
  return matchTitles.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
}
