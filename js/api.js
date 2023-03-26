const loadApi = async (limit) => {
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    processWithData(data.data.tools, limit);

}

// load single data through click arrow button for explore more
const loadSingleData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySingleData(data.data);
}

const processWithData = (data, limit) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = "";

    if (limit) {
        data = data.slice(0, limit)
        const cut = document.getElementById('see-more');
        cut.classList.remove('hidden');
    }

    else{
      const cut = document.getElementById('see-more');
      cut.classList.add('hidden');
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
       <h2 class="text-3xl font-bold mb-6">${element.name}</h2>
       <i class="fa-regular fa-calendar-minus"></i>
       <span class="pl-3">${element.published_in}</span>
     </div>
     <div class="justify-end card-actions">
       <label for="my-modal-3" class="btn bg-slate-100 text-orange-500 border-none" onclick = "loadSingleData('${element.id}')"><i class="fa-solid fa-arrow-right"></i></label>
     </div>

   </div>

 </div>  `;
cardContainer.appendChild(div);
    });

}

// modal card dynamic data

const displaySingleData = data =>{

if(!data){
  console.log("No data found");
  return;

}

const modalContainer = document.getElementById('modal-card-container');
console.log(modalContainer);
modalContainer.textContent = "";

const divLeft = document.createElement('div');
divLeft.classList.add('card');
divLeft.classList.add('card-bordered');

const divRight = document.createElement('div');
divRight.classList.add('card');
divRight.classList.add('card-bordered');

// filter all data
 
//1--> image check
let imageData;
if(data.image_link[0]){
  imageData = data.image_link[0]
}

else if(data.image_link[1]){
  imageData = data.image_link[1]
}

else if(data.image_link[2]){
  imageData = data.image_link[2]
}

else{
  imageData = data.image_link[3]
}


console.log(data);

divLeft.innerHTML = `

<div class="card-body">

<h2 class="card-title text-2xl font-bold">
  ${data.description}
</h2>

<div class="flex gap-6">

<div class="small-vanilla-card rounded-lg mt-8">
<p class="pl-6 pt-5"><span class=" text-lg text-green-600 font-bold">${data.pricing[0].price}</span>
<span class="py-3 text-lg text-green-600 font-bold">${data.pricing[0].plan}</span> 
</p>
</div>

<div class="small-vanilla-card rounded-lg mt-8">
<p class="pl-6 pt-5"><span class=" text-lg text-orange-500 font-bold">${data.pricing[1].price}</span>
<span class="py-3 text-lg text-orange-500 font-bold">${data.pricing[1].plan}</span> 
</p>
</div>

<div class="small-vanilla-card rounded-lg mt-8">
<p class="pl-6 pt-4"><span class=" text-lg text-red-700 font-bold">${data.pricing[2].price}</span>
<span class="py-3 text-lg text-red-700 font-bold">${data.pricing[2].plan}</span> 
</p>
</div>
</div>

<div class="mt-5 flex justify-between">

<div>
<h2 class="font-bold text-xl"> Features </h2>
<ul class="list-disc list-inside">
<li class="mt-2"> ${data.features['1'].feature_name}  </li>
<li class="mt-2"> ${data.features['2'].feature_name}  </li>
<li class="mt-2"> ${data.features['3'].feature_name}  </li>
</ul>
</div>

<div>
<h2 class="font-bold text-xl"> Integration </h2>
<ul class="list-disc list-inside">
<li class="mt-2"> ${data.integrations[0]}  </li>
<li class="mt-2"> ${data.integrations[1]}  </li>
<li class="mt-2"> ${data.integrations[2]}  </li>
</ul>
</div>

</div>

</div>

`;

modalContainer.appendChild(divLeft);

divRight.innerHTML = `
<figure class="w-4/5 mt-2 mx-auto">
<img src="${imageData}">
<div class="badge badge-secondary absolute top-3 custom-right bg-red-700 text-white">${data.accuracy.score*100} % accuracy</div>
</figure> 
<div class="card-body">
<h2 class="card-title font-bold mt-4">${data.input_output_examples[0].input
}
</h2> 
<p class="mt-4 text-lg">${data.input_output_examples[0].output}</p> 

</div>

`;

modalContainer.appendChild(divRight);


}

// initiate program
loadApi(6);


const loadFullData = () => {
    loadApi();
}

