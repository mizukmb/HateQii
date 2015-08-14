document.body.onload = function() {
  chrome.storage.sync.get(["hatena", "qiita"], function(items) {
    if(items.hatena != null || items.qiita != null) {
      var ele = document.createElement("div");
      ele.setAttribute("id", "hateqii");
      ele.innerHTML = "<p>Hatena ID:" + items.hatena + "</p>" + "<p>QiitaID:" + items.qiita + "</p>";

      var target = document.getElementById("ires");
      target.parentNode.insertBefore(ele, target);
      console.log(getQiitaData("mizukmb"));
      getQiitaData("mizukmb");
    } else {
    }
  });
}

function getQiitaData(username) {
  // https://qiita.com/api/v2/docs#get-apiv2usersuser_idstocks
  var apiURL = "//qiita.com/api/v2/users/" + username + "/stocks?page=1&per_page=1";
  xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
      var data = JSON.parse(this.responseText);
      console.log(data[0].title);
      console.log(data[0].url);
    }
  }
  xmlHttp.open("GET", apiURL, true);

  xmlHttp.send(null);
}

