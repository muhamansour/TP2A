let data = require('./data');
console.log(data);
console.log("tipo de dato : "+typeof data);

let arrayLi = data.split('\n');
let contSegundos =0;
let regex = /(\D+)/g;
let array;
for(let i of arrayLi){
  if(i.includes('Flexbox Video')){
    arTiempo = i.replace(regex,' ');
    arTiempo = arTiempo.trim();
    array = arTiempo.split(' ');

    switch(array.length){
      case 3:
        contSegundos += (parseInt(((array[0]*60)*60)) + parseInt(array[1]*60)) + parseInt(array[2]);
        break;
      case 2:
        contSegundos += (parseInt((array[0]*60)) + parseInt(array[1]));
        break;
      default:
        contSegundos += parseInt(array[0]) ;
    }
  } 
}
console.log("el total en segundos del tipo de video requerido es :"+contSegundos);
