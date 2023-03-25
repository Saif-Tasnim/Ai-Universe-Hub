const loadApi = async() =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    processWithData(data.data.tools);

}

const processWithData = data =>{
const cardContainer = document.getElementById('card-container')

}

// initiate program
loadApi();