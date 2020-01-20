
document.addEventListener("DOMContentLoaded", () => {  
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';  
  const container = document.querySelector(".results-container")

  const searchFormInputTag= document.querySelector(".search")
  

  
  searchFormInputTag.addEventListener("input", (e) => {  
    let searchTerm = (event.target.value).toLowerCase()
    console.log(searchTerm)
    fetch(endpoint)
    .then( r => r.json())
    .then(data=> {
      const filteredItems = data.filter(cityObj => {
        let cityName = (cityObj.city).toLowerCase()
        let stateName=(cityObj.state).toLowerCase()
        return cityName.includes(searchTerm) || stateName.includes(searchTerm)
      })   
      container.innerHTML=""  
      return filteredItems.forEach(cityObj => createCityEntry(cityObj))
    })    
  })
  

  const createCityEntry = (cityObj)=> {  
    const olTag = document.createElement("ol");
    olTag.className= "cities-information"
    olTag.innerText= `${cityObj.city}, ${cityObj.state}`
    const spanPopTag =document.createElement("span");
    spanPopTag.className= "population"
    let pop =cityObj.population;
    pop = Number(pop)
    spanPopTag.innerText = pop.toLocaleString();
    olTag.append(spanPopTag);
    container.append(olTag);
 }
 
})

