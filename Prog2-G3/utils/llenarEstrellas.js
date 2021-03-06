function llenarEstrellas (pos) {
    console.log(pos);
    let result = -1;
    let estrellas = [];
    let vuelta;
    vuelta = document.getElementById('estrellas-rating-vuelta').value;
    for(let i = 0; i <= 4; i++){
        estrellas[i] = document.getElementById('estrella-'+i) //aca nos guardamos las estrellas del html
        console.log(estrellas[i].innerHTML);
    }
    
    for(let i = 0; i <= 4; i++) {
        console.log(i);
        //console.log('entre al for')
        if (i < pos) { //si la vuelta (i) es menor a la posicion(input) llenar la estrella
            console.log('entre al primer if, lleno la estrella ' + i);
            estrellas[i] = '<i class="fas fa-star fa-3x"></i>'
        }
        if(i == pos) { // si la vuelta es la misma que la posicion (input)
            console.log('entre al segundo if');
            if (estrellas[i].innerHTML == '<i class="fas fa-star-half-alt fa-3x"></i>') {//si la estrella es la mitad, poner estrella completa
                console.log('la estrella ' + i + ' esta a la mitad, intento llenarla');
                console.log(estrellas[i]);
                estrellas[i] = '<i class="fas fa-star fa-3x"></i>'
                console.log(estrellas[i]);
                result = pos + 1;
            }
            if (estrellas[i].innerHTML == '<i class="fas fa-star fa-3x"></i>') { //si es estrella completa, poner estrella a la mitad
                console.log('la estrella ' + i + ' esta a llena, intento ponerla a la mitad');
                console.log(estrellas[i]);
                estrellas[i] = '<i class="fas fa-star-half-alt fa-3x"></i>'
                console.log(estrellas[i]);
                result = pos + 1 - 0.5;
            }
            if (estrellas[i].innerHTML == '<i class="far fa-star fa-3x"></i>') { //si es estrella vacia, poner estrella a la mitad
                console.log('la estrella ' + i + ' esta vacia, intento ponerla hasta la mitad');
                console.log(estrellas[i]);
                estrellas[i] = '<i class="fas fa-star-half-alt fa-3x"></i>'
                console.log(estrellas[i]);
                result = pos + 1 - 0.5;
            }
        }
        if(i == pos && vuelta == -1) {
            console.log('es la primer vuelta, llegaste al fix por hardcodeo');
            estrellas[i] = '<i class="fas fa-star-half-alt fa-3x"></i>';
            result = pos + 1 - 0.5;
            document.getElementById('estrellas-rating-vuelta').value = 0;
        }

        if(i > pos) {//si la vuelta (i) es mayor a la posicion (input), poner estrella vacia
            console.log('entre al tercer if, vacio la estrella ' + i);
            estrellas[i] = '<i class="far fa-star fa-3x"></i>'
        }
    }

    
    console.log('termino el for');
    console.log(document.getElementById('estrellas-rating-input'));
    //console.log('el resultado del rating es: ' + result);
    console.log(result);
    for(let i = 0; i < 5; i++){
        console.log(estrellas[i]);
    }
    document.getElementById('estrellas-rating-input').value = result;
    for(let i = 0; i < 5; i++){
        document.getElementById('estrella-'+i).innerHTML = estrellas[i];
    }
}


module.exports = llenarEstrellas;