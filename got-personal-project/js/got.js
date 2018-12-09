var obj;
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
  function sample() {
    searchButtonEventListener(userDatas);
  }
  sample();
  obj = userDatas;
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
      <img src="${userDatas[i].portrait}" alt="${userDatas[i].name}" onclick="setOn(${i})">
    <p class="portrait--name">
    ${userDatas[i].name.toUpperCase()}
    </p>
      </div>`;
    }
    i++;
  }
}

function findHouse(array, index) {
  if (array[index].house) {
    return `<img src="assets/houses/${array[index].house}.png" id="description--image" alt="${array[index].house}" >`;
  }
  return '';
}

function descriptionPerson(array, index) {
  document.querySelector('#description').innerHTML =
`<img src="${array[index].picture}" id="description--picture" alt="description--${array[index].name}">
<p id="description--name">
${array[index].name}
${findHouse(array, index)}
</p>
<p id="description--descript">
${array[index].bio}
</p>`;
}

function search(arr) {
  document.querySelector('#description').innerHTML = '';
  var searchText = document.querySelector('#input--field').value.toLowerCase();
  for (var key in arr) {
    if (arr[key].name.toLowerCase() === searchText) {
      descriptionPerson(arr, key);
      return;
    }
  }
  document.querySelector('#input--field').value = 'Character not found';
}

function searchButtonEventListener(arr) {
  var element = document.querySelector('#button--search');
  element.addEventListener('click', function () { search(arr); });
}

function setOn(n) {
  descriptionPerson(obj, n);
}
