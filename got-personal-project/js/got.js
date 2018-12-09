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

  // searchByUser(userDatas);
  // events();
  // var btn = document.querySelector('#button--search');
  // btn.addEventListener('click', searchByUser(userDatas));
  // var arr = ['first', 'second', 'last'];
  // hozzáadom az event listenert
  // searchButtonEventListener(userDatas);
  // if (callNumber !== -1) {alert(callNumber); descriptionPerson(userDatas, callNumber);}
  


  function sample() {
    // Itt egy tömb, ebbe szeretnék keresni
    // var arr = ['first', 'second', 'last'];
    // hozzáadom az event listenert
    searchButtonEventListener(userDatas);
  }

  sample();



  // sample(userDatas);
  obj = userDatas;


  return obj;
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
      <img src="${userDatas[i].portrait}" alt="${userDatas[i].name}" onclick="setOn(${i})">
    <p class="portrait--name">
    ${userDatas[i].name.toUpperCase()}
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
  `<img src="${array[n].picture}" alt="descript--${array[n].name}">
  <p class="descript--name">
  ${array[n].name}
  </p>`;


  // descriptionPerson(userData, 0);
  // console.log(n);
  // console.log(document.querySelectorAll('.div--portrait img').style);
  // var tomb=document.querySelectorAll('.div--portrait');
  // var img
  // console.log(tomb);
  // document.querySelectorAll('.div--portrait img')[n].style.width;
}

//function setOn(n) {
 // alert(n);
  // alert(this);
  // callNumber = n;

  // return n;
//}

// function megjelenik(tomb,index);
function searchByUser(userDatas) {
  var thing = document.querySelector('#input--field').value;
  var i = 0;
  var found = -1;
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


function most() {
  alert('ez magától');
}


function search(arr) {
  var searchText = document.querySelector('#input--field').value.toLowerCase();
  for (var key in arr) {
    if (arr[key].name.toLowerCase() === searchText) {
      descriptionPerson(arr, key);
      // alert(`I found it! Index: ${key}, Data: ${arr[key]}`);
      return;
    }
  }
  document.querySelector('#input--field').value = 'Character not found';
  return searchText;
  // alert('Element not found!');
}

function searchButtonEventListener(arr) {
  var element = document.querySelector('#button--search');
  // Az addEventListener 2. paramétere egy callback function
  // Ennek alapba nem tudunk paramétert adni, hiszen ha ezt írjuk: functionAmitÁtadunk(param)
  // akkor ezzel meg is hívjuk a függvényt
  // Ezért a callback nem csinál mást, mint hogy meghívja a kiszervezett search függvényt,
  // aminek már át tudjuk adni a tömböt, hiszen eléri a felső scope-ban lévő változókat
  element.addEventListener('click', function () { search(arr); });
}


// var obj=successGetGameOfThronesCharacterDatas(xhttp);
// console.log(obj[obj.length - 1]);
//segéd2

// Ez egy példa arra, hogyan tudok egy loop segítségével eventListenert 
    // hozzáadni több elemhez
    // Ebben a példávan a nodokhoz kapcsolódó függvényeket használtam

    // Csak egy function a container element lekérésére
    function getContainerElement(){
      var container = document.querySelector('.div--portrait');
      return container;
  }

 // Ez a függvény megjeleníti annak a p tagnek a tartalmát alerten, amire kattintottunk. 
  function showElementContent(index) {
      var container = getContainerElement();
      var div = container.children;
      alert(div[index].innerHTML);
  }

  // Ez a függvény végzi el az eventListener hozzáadását a paraméterként megadott elemhez
  // Megkapja az indexet is, ami jelen esetben reprezentálja, hogy a container hányadik gyermeke
  // EZ persze nem minden esetben lesz jó, attól függ vannak e egyéb gyermekelemek, de
  // akartam egy node-os, childrenes példát is mutatni
  // Persze meg lehet oldani event.taget-el is, meg IIFE-vel, meg let-el meg egyéb módokon is
  function addCustomListenerForDiv(element, index) {
      element.addEventListener('click', function() { showElementContent(index) });
  }

 function generateElements() {
     var container = getContainerElement();
     for(var i = 0; i < 10; i += 1) {
          var paragraph = document.createElement('p');
          paragraph.textContent = `Lorem Ipsum ${i}`;
          // Ítt az i értéke, bármelyik p tagre kattintok is, mindig 10 lesz, 
          // ami, ha ezt indexként akarom felhasználni undefined-ot ad vissza az adott elemre
          // Azért lesz az i mindig 10, mert amikor az addEventListenernek megadott callback meghívódik
          // akkor a loop már végzett, és ilyenkor ugye már 10 az i értéke, és ezt kapja meg a
          // callbacken belül függvény minden esetben, nem pedig az aktuális loop-on belüli értéket
          // Igen, ez utánajárós, de ha egyszer megértitek akkor utána már tiszta sor.
          // Tehát ez nem fog működni: 
          // paragraph.addEventListener('click', function() { showElementContent(elementIndex) });
          
          // Ellenben így már rögtön működik, azért mert az addCustomListenerForParagraph
          // függvény rögtön lefut, és az éppen aktuális i értékét kapja meg
          addCustomListenerForDiv(div, i);
          container.appendChild(div);
     }
 }

 //generateElements();

 function setOn(n) {

  //alert(n);
  descriptionPerson(obj, n);

  //console.log(obj[n]);
  // alert(this);
  // callNumber = n;

  // return n;
}
