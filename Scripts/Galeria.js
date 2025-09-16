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

/* //Scrollbar
let Submenu = document.getElementById('Submenus');
let Submenu1 = document.getElementById('Submenus1');

Submenu.addEventListener('click', Scrollbar);
Submenu1.addEventListener('click', Scrollbars);

        function Scroll()
        {
            window.scroll(
         {
                 top:0,
                 behavior: "smooth"
                }
            )

        }


        function Scrollbar()
        {
            window.scroll(
                {
                    top:2680,
                    behavior: "smooth"
                }
            )

        }

        function Scrollbars()
        {
            window.scroll
            (
                {
                    top:6000,
                    behavior:"smooth"
                }

            )
        } */
