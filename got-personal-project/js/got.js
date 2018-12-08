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
  //console.log(document.querySelectorAll('.div--portrait img'));
  setOnclick(userDatas);
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
      <img src="${userDatas[i].portrait}" alt="${userDatas[i].name}" onclick="">
    <p class="portrait--name">
    ${userDatas[i].name}
    </p>
      </div>`;
    }

    i++;
  }
}

function searchPerson(array, nameSearch) {
  var found;
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === nameSearch) {
      found = i;
      i = array.length;
    }
  }
  return found;
}

function descriptionPerson(array, index) {
  document.querySelector('#description').innerHTML =
`
<div class="div div--description"> 
<img src="${array[index].picture}" alt="descript--${array[index].name}">
<p class="descript--name">
${array[index].name}
</p>
</div>`;
}


function setOnclick(array) {
  var portraitImg = document.querySelectorAll('.div--portrait img');
  var img;
  for (var i = 0; i < portraitImg.length; i++) {
    img = portraitImg[i];
    console.log(img);
    img.onclick=descriptionPerson(array, searchPerson(array, img.alt));
    //img.setAttribute('onclick', descriptionPerson(array, searchPerson(array, img.alt)));
    console.log(img);
  }
}
