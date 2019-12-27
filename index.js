var tbodyElement = document.getElementById('tbody');
var buttonElement = document.getElementById('adicionar');
var inputElement = document.getElementById('texto');

var lista = JSON.parse(localStorage.getItem('list_itens')) || [];

buttonElement.onclick = addItem;

function renderItens() {
    tbodyElement.innerHTML = '';
    for(item of lista){
        var trElement = document.createElement('tr');
        var tdElement1 = document.createElement('td');
        var tdtext = document.createTextNode(item);

        var tdElement2 = document.createElement('td');
        var excluirElement = document.createElement('button');
        var buttonText = document.createTextNode('Excluir');
        excluirElement.setAttribute('class', 'btn btn-danger')

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
    lista.splice(pos, 1);
    renderItens();
}

function saveToStorage() {
    localStorage.setItem('list_itens', JSON.stringify(lista));
}