var tbodyElement = document.getElementById('tbody');
var buttonAdicionarElement = document.getElementById('adicionar');
var buttonPesquisarElement = document.getElementById('pesquisar');
var inputElement = document.getElementById('texto');
var lista = JSON.parse(localStorage.getItem('list_itens')) || [];
buttonAdicionarElement.onclick = addItem;
buttonAdicionarElement.onclick = addItem;

function renderItens() {
  tbodyElement.innerHTML = '';

  for (item of lista) {
    var trElement = document.createElement('tr');
    var tdElement1 = document.createElement('td');
    var tdtext = document.createTextNode(item);
    var tdElement2 = document.createElement('td');
    var excluirElement = document.createElement('button');
    var buttonText = document.createTextNode('Excluir');
    excluirElement.setAttribute('class', 'btn btn-danger');
    var pos = lista.indexOf(item);
    excluirElement.setAttribute('onclick', 'deleteItem(' + pos + ')');
    tdElement1.appendChild(tdtext);
    excluirElement.appendChild(buttonText);
    tdElement2.appendChild(excluirElement);
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    tbodyElement.appendChild(trElement);
    saveToStorage();
  }
}

renderItens();

function addItem() {
  var itemText = inputElement.value;
  lista.push(itemText);
  inputElement.value = "";
  renderItens();
  saveToStorage();
}

function deleteItem(pos) {
  inputElement.value = "";
  lista.splice(pos, 1);
  renderItens();
  saveToStorage();
}

buttonPesquisarElement.onclick = pesquisarItem;

function pesquisarItem() {
  tbodyElement.innerHTML = 'Item não encontrado!';

  for (item of lista) {
    if (item == inputElement.value) {
      tbodyElement.innerHTML = '';
      var trElement = document.createElement('tr');
      var tdElement1 = document.createElement('td');
      var tdtext = document.createTextNode(item);
      var tdElement2 = document.createElement('td');
      var excluirElement = document.createElement('button');
      var buttonText = document.createTextNode('Excluir');
      excluirElement.setAttribute('class', 'btn btn-danger');
      var pos = lista.indexOf(item);
      excluirElement.setAttribute('onclick', 'deleteItem(' + pos + ')');
      tdElement1.appendChild(tdtext);
      excluirElement.appendChild(buttonText);
      tdElement2.appendChild(excluirElement);
      trElement.appendChild(tdElement1);
      trElement.appendChild(tdElement2);
      tbodyElement.appendChild(trElement);
    } else {}
  }
}

function saveToStorage() {
  localStorage.setItem('list_itens', JSON.stringify(lista));
}
