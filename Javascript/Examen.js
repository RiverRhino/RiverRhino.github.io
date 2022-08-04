//Botones
let boton = document.getElementById('Validar');
let boton1 = document.getElementById('Validar1');
let boton2 = document.getElementById('Validar2');
let boton3 = document.getElementById('Validar3');
let boton4 = document.getElementById('Validar4');
let boton5 = document.getElementById('Validar5');
let boton6 = document.getElementById('Validar6');
let boton7 = document.getElementById('Validar7');
let boton8 = document.getElementById('Validar8');
let boton9 = document.getElementById('Validar9');
let boton10 = document.getElementById('Validar10');
let boton11 = document.getElementById('Validar11');
let boton12 = document.getElementById('Validar12');
let boton13 = document.getElementById('Validar13');
let boton14 = document.getElementById('Validar14');

//Imagenes de 4nya
let imagen = document.getElementById('Incorrecto');
let imagen1 = document.getElementById('Incorrecto1');
let imagen2 = document.getElementById('Incorrecto2');
let imagen3 = document.getElementById('Incorrecto3');
let imagen4 = document.getElementById('Incorrecto4');
let imagen5 = document.getElementById('Incorrecto5');
let imagen6 = document.getElementById('Incorrecto6');
let imagen7 = document.getElementById('Incorrecto7');
let imagen8 = document.getElementById('Incorrecto8');
let imagen9 = document.getElementById('Incorrecto9');
let imagen10 = document.getElementById('Incorrecto10');
let imagen11 = document.getElementById('Incorrecto11');
let imagen12 = document.getElementById('Incorrecto12');
let imagen13 = document.getElementById('Incorrecto13');
let imagen14 = document.getElementById('Incorrecto14');
let imagenc = document.getElementById('Correcto');

function validar()
{
    let rdb1 = document.getElementById('S');
    let rdb2 = document.getElementById('F');
    let rdb3 = document.getElementById('C');

    if(rdb1.checked == true)
    {
        imagen.src= "imagenes/Examen/AnyaFeliz.png"
        imagen.style.display = 'block';
        boton.style.display = 'none'
    }
    else if(rdb2.checked == true)
    {
        imagen.src = "imagenes/Examen/Anyatriste.png"
        imagen.style.display = 'block';
        boton.style.display = 'none'
    }
    else if(rdb3.checked == true)
    {
        imagen.src = "imagenes/Examen/Anyatriste.png"
        imagen.style.display = 'block';
        boton.style.display = 'none'
    }
}

function validar1()
{
    let rdb4 = document.getElementById('A');
    let rdb5 = document.getElementById('G');
    let rdb6 = document.getElementById('H');
    
    if(rdb4.checked == true)
    {
        imagen1.src = "imagenes/Examen/Anyatriste.png"
        imagen1.style.display = 'block';
        boton1.style.display = 'none'
    }
    else if(rdb5.checked == true)
    {
        imagen1.src= "imagenes/Examen/AnyaFeliz.png"
        imagen1.style.display = 'block';
        boton1.style.display = 'none'
    }
    else if(rdb6.checked == true)
    {
        imagen1.src = "imagenes/Examen/Anyatriste.png"
        imagen1.style.display = 'block';
        boton1.style.display = 'none'
    }

}

function validar2()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar3()
{
    let rdb10 = document.getElementById('5');
    let rdb11 = document.getElementById('6');
    let rdb12 = document.getElementById('3');
    
    if(rdb10.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb12.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb11.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar4()
{
    let rdb13 = document.getElementById('10');
    let rdb14 = document.getElementById('11');
    let rdb15 = document.getElementById('12');
    
    if(rdb13.checked == true)
    {
        imagen3.src = "imagenes/Examen/Anyatriste.png"
        imagen3.style.display = 'block';
        boton3.style.display = 'none'
    }
    else if(rdb14.checked == true)
    {
        imagen3.src= "imagenes/Examen/AnyaFeliz.png"
        imagen3.style.display = 'block';
        boton3.style.display = 'none'
    }
    else if(rdb15.checked == true)
    {
        imagen3.src = "imagenes/Examen/Anyatriste.png"
        imagen3.style.display = 'block';
        boton3.style.display = 'none'
    }

}


function validar5()
{
    let rdb16 = document.getElementById('13');
    let rdb17 = document.getElementById('14');
    let rdb18 = document.getElementById('15');
    
    if(rdb16.checked == true)
    {
        imagen4.src = "imagenes/Examen/Anyatriste.png"
        imagen4.style.display = 'block';
        boton4.style.display = 'none'
    }
    else if(rdb17.checked == true)
    {
        imagen4.src= "imagenes/Examen/AnyaFeliz.png"
        imagen4.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb18.checked == true)
    {
        imagen4.src = "imagenes/Examen/Anyatriste.png"
        imagen4.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar6()
{
    let rdb19 = document.getElementById('16');
    let rdb20 = document.getElementById('17');
    let rdb21 = document.getElementById('18');
    
    if(rdb19.checked == true)
    {
        imagen5.src = "imagenes/Examen/Anyatriste.png"
        imagen5.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb20.checked == true)
    {
        imagen5.src= "imagenes/Examen/AnyaFeliz.png"
        imagen5.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb21.checked == true)
    {
        imagen5.src = "imagenes/Examen/Anyatriste.png"
        imagen5.style.display = 'block';
        boton5.style.display = 'none'
    }

}


function validar7()
{
    let rdb22 = document.getElementById('19');
    let rdb23 = document.getElementById('20');
    let rdb24= document.getElementById('21');
    
    if(rdb22.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb23.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb24.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar8()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar9()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar10()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar11()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}


function validar12()
{
    let rdb7 = document.getElementById('R');
    let rdb8 = document.getElementById('X');
    let rdb9 = document.getElementById('Z');
    
    if(rdb7.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb8.checked == true)
    {
        imagen2.src= "imagenes/Examen/AnyaFeliz.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }
    else if(rdb9.checked == true)
    {
        imagen2.src = "imagenes/Examen/Anyatriste.png"
        imagen2.style.display = 'block';
        boton2.style.display = 'none'
    }

}
























boton.addEventListener("click", validar);

boton1.addEventListener("click", validar1);

boton2.addEventListener("click", validar2);

boton3.addEventListener("click", validar3);

boton4.addEventListener("click", validar4);

boton5.addEventListener("click", validar5);

boton6.addEventListener("click", validar6);

boton7.addEventListener("click", validar7);

boton8.addEventListener("click", validar8);

boton9.addEventListener("click", validar9);

boton10.addEventListener("click", validar10);

boton11.addEventListener("click", validar11);

boton12.addEventListener("click", validar12);

boton13.addEventListener("click", validar13);

boton14.addEventListener("click", validar14);










