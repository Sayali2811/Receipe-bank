const application_id='10ba3781'
const application_key='1f91e9877623dc2defd86d250bb9fe93'
//select inputs
const input=document.querySelector('#search input')
const button=document.querySelector('#search button')
const container=document.querySelector('div.receipe_container')
//create function
const getRecipe=async(query)=>{
    const endpoint=`https://api.edamam.com/search?q=${query}&app_id=${application_id}&app_key=${application_key}`

    const res=await fetch(endpoint)
    const data=await res.json()
    const{hits}=data
    return hits
}
//card
const receipecard=(image,name,cookTime,recipeUrl,yield,calories,healthLabels)=>{
    return `<div class="container">
    <img src=${image}  alt="Pancake"/>
    <div class="container__text">
     <h1>${name}</h1>
     <h3>Healthlables</h3>
     <p>${healthLabels}
     </p>
     <div class="container__text__timing">
      <div class="container__text__timing_time">
       <h2>Hands-on Time</h2>
       <p>${cookTime}</p>
      </div>
      <div class="container__text__timing_time">
       <h2>yield time</h2>
       <p>${yield}</p>
      </div>
      <div class="container__text__timing_time">
       <h2>Calories</h2>
       <p>${calories}</p>
      </div>
    
     </div>
     <button class="btn"><a href=${recipeUrl}>View Recipe</a></button>
    </div>
   </div>`

}
input.addEventListener('keydown',e=>{
    const key=e.key
    if(key==='Enter')
    {
        handlesearch();
    }
})
//handlesearch function
const handlesearch=async()=>{
    //clear the previous images if any
    container.innerHTML=null
    const query=input.value
    const hits=await getRecipe(query)
    hits.forEach(hit => {
       const{recipe}=hit
       const ele=document.createElement('div')
       const markup=receipecard(recipe.image,query,recipe.totalTime,recipe.url,recipe.yield,recipe.calories,recipe.healthLabels)
    
       ele.innerHTML=markup
       console.log(markup)
       container.appendChild(ele)
    });
}

