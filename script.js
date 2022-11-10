//variaveis
//funções
async function start(){
    await fetchPokemon();
}
//Pegar Info do Json
async function fetchPokemon(){
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => response.json());
    
    allPokemons = res.results;
  

    let i = 0
   let  pokemonHTML = '';
   let pokemonNumber
    while ( i < allPokemons.length){
        pokemonNumber = 1 + i
        pokemonName = allPokemons[i].name;
        pokemonURL = allPokemons[i].url;
        pokemonHTML = pokemonHTML +'<div id="pokemon'+ pokemonNumber+'"> <div class="pokemonCard" onclick="detailPokemon('+ pokemonNumber+')" ><p>' + pokemonName + '</p><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+pokemonNumber+'.png" alt="foto do pokemon"></img> </div> </div>';
       

        let cards = document.getElementById('cards');
        cards.innerHTML = pokemonHTML;

        i++

    }

}
async function detailPokemon(x){
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/'+x+'/').then(response => response.json());
    pokemonDetail = res;
    heightPokemon = (pokemonDetail.height)/10;
    weightPokemon = (pokemonDetail.weight)/10;
    typesPokemon = pokemonDetail.types;
    typePokemon = '';
    back = x ;
   
    // pegando o tipo do pokemon
    let i = 0;

    while (i < typesPokemon.length){
       if (i == 1){
        typePokemon = typePokemon +" and "+ typesPokemon[i].type.name;
       }
       else{
        typePokemon = typePokemon + typesPokemon[i].type.name;
        
        }
        i++;
    }


    pokemonHTML = '<div class="pokemonDetail"  onclick="voltarPokemon('+x+')"><p><span class="bold">Altura: </span>'+ heightPokemon +'M</p> <p><span class="bold"> Peso: </span>'+weightPokemon+' Kg</p><p><span class="bold">Tipo: </span>'+typePokemon+'</p></div>' ;

    let cards = document.getElementById('pokemon'+ x);
    cards.innerHTML = pokemonHTML;
  
}
    async function voltarPokemon(x){

    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then(response => response.json());
    
    allPokemons = res.results;
    pokemonNumber = x;
    pokemonName = allPokemons[x].name;
    pokemonURL = allPokemons[x].url;
    pokemonHTML = '<div class="pokemonCard" id="pokemon'+ x +'" onclick="detailPokemon('+ x +')"> <p>' + pokemonName + '</p><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+x+'.png" alt="foto do pokemon"></img> </div>';
   

    let cards = document.getElementById('pokemon' + x);
    cards.innerHTML = pokemonHTML;
}


// Renderizar as funçoes
start();

