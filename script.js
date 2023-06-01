const addBtn = document.getElementById('add-to')
const search = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
let moviesarr = []

let string = ""

searchBtn.addEventListener("click",function(){
    moviesarr = []
    document.getElementById("main").innerHTML = ""
    getmovieTitles()

})
document.addEventListener("keyup",function(e){
    if(e.key === "Enter"){
        moviesarr = []
        getmovieTitles()
        console.log("clicked")
    }
})
async function getmovieTitles(){
    
        try{
            const res = await fetch(`https://omdbapi.com/?s=${search.value}&i=tt3896198&apikey=c25962ab&`)
            const data = await res.json()
            searchByTitle(data.Search)
        }catch(err){
            console.log(err)
        }
    }



 function searchByTitle(arr){
    arr.map(async movie=>{
        const fullres = await fetch(`http://www.omdbapi.com/?apikey=fb9fa955&t=${movie.Title}`)
        const fulldata = await fullres.json()
        moviesarr.push(fulldata)
        MoviesHtml()
        
    })
}


function MoviesHtml(){
  string = moviesarr.map(movie => {
        const {Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID} = movie
        return  `
        <div class="each" id=${imdbID}>
                <img src=${Poster} alt="" class="poster">
                <div class="movie-info">
                    <p class="movie-name">${Title} <span class="rating"><img src="star.png">${imdbRating}</span></p>
                    <p class="info">
                        ${Runtime} min <span class="genre">${Genre}</span>
                        <button id="add-to">
                            <img src="Add-Icon.png" alt="" width="13">
                            <span class="watchlist text">watchlist</span>
                        </button></p>
                    <p class="movie-des">
                        ${Plot}
                    </p>
                </div>
            </div>
        `
    }).join("");
    document.getElementById("main").innerHTML = string
   
}