var tbodyElement = document.getElementById('tbody');
var buttonAdicionarElement = document.getElementById('adicionar');
var buttonPesquisarElement = document.getElementById('pesquisar');
var inputElement = document.getElementById('texto');
var inputQuantidadeElement = document.getElementById('quantidade');
var lista = JSON.parse(localStorage.getItem('list_itens')) || [];
var item = {};
buttonAdicionarElement.onclick = addItem;
buttonAdicionarElement.onclick = addItem;

function renderItens() {
  tbodyElement.innerHTML = '';
  lista.find(item => {
    var trElement = document.createElement('tr');
    var tdElement1 = document.createElement('td');
    var tdtext = document.createTextNode(item.nome);
    var tdElement2 = document.createElement('td');
    var tdtext2 = document.createTextNode(item.quantidade);
    var tdElement3 = document.createElement('td');
    var excluirElement = document.createElement('button');
    var buttonText = document.createTextNode('Excluir');
    excluirElement.setAttribute('class', 'btn btn-danger');
    var pos = lista.indexOf(item);
    excluirElement.setAttribute('onclick', 'deleteItem(' + pos + ')');
    tdElement1.appendChild(tdtext);
    tdElement2.appendChild(tdtext2);
    excluirElement.appendChild(buttonText);
    tdElement3.appendChild(excluirElement);
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    tbodyElement.appendChild(trElement);
    saveToStorage();
  });
}

renderItens();

function addItem() {
  tbodyElement.innerHTML = '';

  if (lista.length === 0) {
    if (inputElement.value !== '' && inputQuantidadeElement.value !== '') {
      item = {
        nome: inputElement.value,
        quantidade: inputQuantidadeElement.value
      };
      lista.push(item);
      renderItens();
      saveToStorage();
    } else {
      tbodyElement.innerHTML = 'Item ou quantidade inválida';
    }
  } else if (inputElement.value !== '' && inputQuantidadeElement.value !== '') {
    if (lista.find(item => item.nome === inputElement.value)) {
      tbodyElement.innerHTML = 'Item já cadastrado!';
    } else {
      item = {
        nome: inputElement.value,
        quantidade: inputQuantidadeElement.value
      };
      lista.push(item);
      renderItens();
      saveToStorage();
    }
  } else {
    tbodyElement.innerHTML = 'Item ou quantidade inválida';
  }

  inputElement.value = '';
  inputQuantidadeElement.value = '';
}

function deleteItem(pos) {
  inputElement.value = '';
  inputQuantidadeElement.value = '';
  lista.splice(pos, 1);
  renderItens();
  saveToStorage();
}

buttonPesquisarElement.onclick = pesquisarItem;

function pesquisarItem() {
  tbodyElement.innerHTML = 'Item não encontrado!';
  var procura = lista.find(item => item.nome === inputElement.value);

  if (procura !== undefined) {
    tbodyElement.innerHTML = '';
    var trElement = document.createElement('tr');
    var tdElement1 = document.createElement('td');
    var tdtext = document.createTextNode(procura.nome);
    var tdElement2 = document.createElement('td');
    var tdtext2 = document.createTextNode(procura.quantidade);
    var tdElement3 = document.createElement('td');
    var excluirElement = document.createElement('button');
    var buttonText = document.createTextNode('Excluir');
    excluirElement.setAttribute('class', 'btn btn-danger');
    var pos = lista.indexOf(procura);
    excluirElement.setAttribute('onclick', 'deleteItem(' + pos + ')');
    tdElement1.appendChild(tdtext);
    tdElement2.appendChild(tdtext2);
    excluirElement.appendChild(buttonText);
    tdElement3.appendChild(excluirElement);
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    tbodyElement.appendChild(trElement);
  }
}

function saveToStorage() {
  localStorage.setItem('list_itens', JSON.stringify(lista));
}
