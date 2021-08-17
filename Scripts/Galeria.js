let BarraMenu = document.querySelector('.barrita');
let MenuPrincipal = document.querySelector('.MenuPrincipal')
BarraMenu.onclick = function(){
    BarraMenu.classList.toggle('activo');
    MenuPrincipal.classList.toggle('activo');
}

let list = document.querySelectorAll('.list');
for(let i = 0; i<list.length; i++){
    list[i].onclick = function(){
        let j = 0;
        while(j < list.length){
            list[j++].className = 'list';
        }
        list[i].className = 'listaactiva';
    }
}