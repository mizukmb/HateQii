document.body.onload = function() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena != null || items.qiita != null) {
      var qiitaJSONData = JSON.parse(ajax("//qiita.com/api/v2/users/" + items.qiita + "/stocks?par_page=100"));

      var googleSearchWords = document.getElementById("lst-ib").value.replace(/　/g, " ").split(" ");
      var qiitaStockTitles = [];
      for(var i=0; i<qiitaJSONData.length; i++) {
        qiitaStockTitles.push(qiitaJSONData[i].title);
      }

      var titles = searchQiitaStocks(googleSearchWords, qiitaStockTitles);

      var ele = document.createElement("div");
      ele.setAttribute("id", "hateqii");
      ele.innerHTML = "";
      for(var i=0; i<titles.length; i++) {
        for(var j=0; j<qiitaJSONData.length; j++) {
          if(titles[i] == qiitaJSONData[j].title) {
            ele.innerHTML = ele.innerHTML + "<p><a href=\"" + qiitaJSONData[j].url + "\">" + titles[i] + "</p>";
          }
        }
      }
      var target = document.getElementById("ires");
      target.parentNode.insertBefore(ele, target);
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
        matchTitles.push(titles[j]);
      }
    }
    if(i>0) {
      matchTitles = matchTitles.filter(function(x,i,self) {
        return self.indexOf(x) === i && i !== self.lastIndexOf(x);
      });
    }
  }

  return matchTitles;
}
