function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  portraitOrderByName(userDatas);
  portraitsDisplay(userDatas);
}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function sortByName(one, another) {
  if (one.name > another.name) {
    return 1;
  } else if (one.name < another.name) {
    return -1;
  }
  return 0;
}

function portraitOrderByName(userDatas) {
  userDatas.sort(sortByName);
}


function portraitsDisplay(userDatas) {
  document.querySelector('#portraits').innerHTML = '';
  var i = 0;
  while (i < userDatas.length) {
    if (userDatas.hasOwnProperty(i) && !userDatas[i].dead) {
      document.querySelector('#portraits').innerHTML +=
      `
      <div class="div div--portrait"> 
      <img src="${userDatas[i].portrait}" alt="${userDatas[i].name}">
    <p class="portrait--name">
    ${userDatas[i].name}
    </p>
      </div>`;
    }

    i++;
  }
}
