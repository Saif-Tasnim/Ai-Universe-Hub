const loadApi = async(limit) =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    processWithData(data.data.tools,limit);

}

const processWithData = (data,limit) =>{
const cardContainer = document.getElementById('card-container');
if(limit){
    data = data.slice(0,limit)
}
data.forEach(element => {
    console.log(element);
   const div = document.createElement('div');
   div.classList.add('card');
   div.classList.add('card-bordered');

   div.innerHTML = `
   <figure class="mt-6 rounded-2xl ml-4 mr-4">
   <img src="${element.image}">
 </figure>
 <div class="card-body">
   <h2 class="card-title text-2xl mb-4 font-extrabold">Features
   </h2>
   <ol class="list-decimal list-inside add-li">
     <li class="pb-1"> ${element.features[0]} </li>
     <li class="pb-1"> ${element.features[1]} </li>
     <li class="pb-1"> ${element.features[2]} </li>
    </ol>
   <hr class="mt-6 bg-slate-300">
   
   <div class="mt-6 flex justify-between items-center">
       <div class="">
       <h2 class="text-3xl font-bold mb-6">ChatGPT</h2>
       <i class="fa-regular fa-calendar-minus"></i>
       <span>11/01/2022</span>
     </div>
     <div class="justify-end card-actions">
       <button class="btn bg-white text-orange-500"><i class="fa-solid fa-arrow-right"></i></button>
     </div>

   </div>

 </div>
   
   `;
cardContainer.appendChild(div);
});

}

// initiate program
loadApi(6);