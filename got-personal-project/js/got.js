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
  var callNumber = -1;
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  portraitOrderByName(userDatas);
  portraitsDisplay(userDatas);
  // console.log(document.querySelectorAll('.div--portrait img'));
  // setOnclick(userDatas);
  // setOnArray(userDatas);
  // descriptionPerson(userDatas, 0);

  //searchByUser(userDatas);
// events();
//var btn = document.querySelector('#button--search');
//btn.addEventListener('click', searchByUser(userDatas));
//var arr = ['first', 'second', 'last'];
// hozzáadom az event listenert
//searchButtonEventListener(userDatas);
  // if (callNumber !== -1) {alert(callNumber); descriptionPerson(userDatas, callNumber);}
  sample(userDatas);
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
  var alive = [];
  document.querySelector('#portraits').innerHTML = '';
  var i = 0;
  while (i < userDatas.length) {
    if (userDatas.hasOwnProperty(i) && !userDatas[i].dead) {
      alive.push(userDatas.name);
      document.querySelector('#portraits').innerHTML +=
      `
      <div class="div div--portrait"> 
      <img src="${userDatas[i].portrait}" alt="${userDatas[i].name}" onclick="setOn()">
    <p class="portrait--name">
    ${userDatas[i].name}
    </p>
      </div>`;
    }

    i++;
  }
  return alive;
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
    img.onclick = descriptionPerson(array, searchPerson(array, img.alt));
    // img.setAttribute('onclick', descriptionPerson(array, searchPerson(array, img.alt)));
    console.log(img);
  }
}
function setOnArray(array) {
// setOnn(n,array);

}


function setOnn(n, array) {
  document.querySelector('#description').innerHTML = n;
  `
  <div class="div div--description"> 
  <img src="${array[n].picture}" alt="descript--${array[n].name}">
  <p class="descript--name">
  ${array[n].name}
  </p>
  </div>`;


  // descriptionPerson(userData, 0);
  // console.log(n);
  // console.log(document.querySelectorAll('.div--portrait img').style);
  // var tomb=document.querySelectorAll('.div--portrait');
  // var img
  // console.log(tomb);
  // document.querySelectorAll('.div--portrait img')[n].style.width;
}

function setOn() {
  // alert(n);
  alert(this);
  // callNumber = n;

  //return n;
}

// function megjelenik(tomb,index);
function searchByUser(userDatas) {
  var thing = document.querySelector('#input--field').value;
  var i = 0;
  found = -1;
  while (i < userDatas.length) {
    if (userDatas.hasOwnProperty(i) && userDatas.name.toLowerCase() === thing.toLowerCase()) {
      found = i;
      i = userDatas.length;
    }
    i++;
  }
  if (found !== -1) {
    descriptionPerson(userDatas, found);
  } else {
    document.querySelector('#description').innerHTML = 'nincs ilyen név';
  }
}

function events() {
  
}




function most (){
  alert('ez magától');
}



function search(arr){
  var searchText = document.querySelector('#input--field').value.toLowerCase();
  for(var key in arr){
      if(arr[key].toLowerCase() === searchText) {
          alert(`I found it! Index: ${key}, Data: ${arr[key]}`);
          return;
      }
  }
  alert('Element not found!');
}

function searchButtonEventListener(arr){
  var element = document.querySelector('button--search');
  // Az addEventListener 2. paramétere egy callback function
  // Ennek alapba nem tudunk paramétert adni, hiszen ha ezt írjuk: functionAmitÁtadunk(param)
  // akkor ezzel meg is hívjuk a függvényt
  // Ezért a callback nem csinál mást, mint hogy meghívja a kiszervezett search függvényt,
  // aminek már át tudjuk adni a tömböt, hiszen eléri a felső scope-ban lévő változókat
  element.addEventListener('click', function() { search(arr) });
}

function sample(arr){
  // Itt egy tömb, ebbe szeretnék keresni
  //var arr = ['first', 'second', 'last'];
  // hozzáadom az event listenert
  searchButtonEventListener(arr);
}

//sample();