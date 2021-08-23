var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
// Sayfa yuklendiginde localStorage verilerini getir...
document.addEventListener("DOMContentLoaded", getData);
// Form Submit Event
form.addEventListener('submit', addItem);
// Event silme
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup',filterItems);
// Item ekleme
function addItem(e){
    e.preventDefault();
    // Input degeri alma
    var newItem = document.getElementById('item').value;
    // Yeni li oluşturma
    var li = document.createElement('li');
    // Class ekle
    li.className = "list-group-item";
    // Texti li'ye ekleme
    li.appendChild(document.createTextNode(newItem))
    // Silme butonu oluşturma
    var deleteBtn = document.createElement("button");
    // Class ekle
    deleteBtn.className = "btn btn-primary btn-sm float-right delete";
    // Text node ekle
    deleteBtn.appendChild(document.createTextNode("X"));
    // Butonu li'ye ekle
    li.appendChild(deleteBtn);
    // li'yi ul'ye ekle
    itemList.appendChild(li);   
    saveLocalData(newItem);
    document.getElementById('item').value = "";
}
// Veri silme
function removeItem(e) {
  if(e.target.classList.contains("delete")){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        removeData(li)
        li.remove();
      }
  }
}
// Filtreleme
function filterItems(e){
    // Once kucuk harfe cevrilir.
    var text = e.target.value.toLowerCase();
    // li'leri al
    var items = itemList.getElementsByTagName("li");
    // Diziye döndüdürüz
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    })
}
// STORAGE
// KAYIT ISLEMI
function saveLocalData(data){
    let datum;
    if(localStorage.getItem("datum")===null){
        datum = [];
    }
    else {
        datum = JSON.parse(localStorage.getItem("datum"));
    }
    datum.push(data);
    localStorage.setItem("datum",JSON.stringify(datum));
}
function getData(){
    let datum;
    if(localStorage.getItem("datum") === null) {
        datum = [];
    }
    else {
        datum = JSON.parse(localStorage.getItem("datum"))
    }
    // localStorage getirme
    localStorage.setItem('datum', JSON.stringify(datum));   
    // DÖNGÜ
    console.log(datum);
    datum.forEach(function(data){
        var newItem = data;
        // li item oluşturduk
        var li = document.createElement('li');
        // Class ekle
        li.className = "list-group-item";
        // Texti li'ye ekleme
        li.appendChild(document.createTextNode(newItem))
        // Silme butonu oluşturma
        var deleteBtn = document.createElement("button");
        // Class ekle
        deleteBtn.className = "btn btn-primary btn-sm float-right delete";
        // Text node ekle
        deleteBtn.appendChild(document.createTextNode("X"));
        // Butonu li'ye ekle
        li.appendChild(deleteBtn);
        // li'yi ul'ye ekle
        itemList.appendChild(li);   
    })
}
// SILME
function removeData(data){
    let datum;
    if(localStorage.getItem("datum") === null){
        datum = [];
    }
    else {
        datum = JSON.parse(localStorage.getItem("datum"));
    }
    localStorage.setItem("datum",JSON.stringify(datum));
    const listIndex = data.childNodes[0].textContent;
    datum.splice(datum.indexOf(listIndex),1);
    localStorage.setItem("datum",JSON.stringify(datum));
}



