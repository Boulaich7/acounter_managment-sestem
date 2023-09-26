let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let gategory = document.getElementById('lala');
let submit = document.getElementById('submit');

let mode = 'create';

let mpt;

function getTotal(){

if(price.value != ''){
let result = (+price.value + +taxes.value + +ads.value)
 - +discount.value;
total.innerHTML = result;
total.style.background = 'green'

}else{
	total.innerHTML = '';
	total.style.background = 'gold'

}
}
//creact product

let dataPro;
if(localStorage.product != null)
{
dataPro = JSON.parse(localStorage.product)	
}else{
dataPro = []

}

submit.onclick = function(){
	let newPro = {
		title:title.value.toLowerCase(),
		price:price.value,
		taxes:taxes.value,
		ads:ads.value,
    discount:discount.value,
		total:total.innerHTML,
		count:count.value,
		gategory:gategory.value.toLowerCase(),
	}
	if(mode === 'create'){
		
	if(newPro.count > 1){
		for(let i = 0; i < newPro.count;i++){
			dataPro.push(newPro);
		}
	}else{
		dataPro.push(newPro);
	}
	
}else{
	dataPro[ mpt ] = newPro;
	mode = 'create';
	submit.innerHTML = 'create';
	count.style.display = 'block';
}

	//save data
localStorage.setItem('product',  JSON.stringify(dataPro))



//function to clear data when you click at creat
claerData()
//read when you click at creat save aformation at table
showData()



}


//claer iput when reload 
function claerData(){
title.value = '';
price.value = '';
taxes.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value = '';
gategory.value = '';
}

//read when you click at creat save aformation at table
function showData(){
	getTotal()
let table = '';
for(let i = 0; i < dataPro.length;i++){
	table +=
	 `
	<tr>
	<td>${i}</td>
	<td>${dataPro[i].title}</td>
	<td>${dataPro[i].price}</td>
	<td>${dataPro[i].taxes}</td>
	<td>${dataPro[i].ads}</td>
	<td>${dataPro[i].discount}</td>
	<td>${dataPro[i].total}</td>
	<td>${dataPro[i].gategory}</td>
	<td><button onclick='updetdata(${i})' id="update">update</button></td>
	<td><button onclick="deletData( ${i} )" id="delete">delete</button></td>
	</tr>
	
	 `;
}
document.getElementById('tbody').innerHTML = table;
let btnDelet = document.getElementById('deletAll');
if(dataPro.length > 0){
	btnDelet.innerHTML = `
	<button onclick='deletAll()'>Delet All(  ${dataPro.length})</button>
	`
}else{
	btnDelet.innerHTML = '';
}
}

showData()


//delet
function deletData(i){
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData()
}
function deletAll() {
	localStorage.clear();
	dataPro.splice(0)
	showData()
}



//count




//update

function updetdata(i){
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
getTotal()
count.style.display = 'none';
gategory.value = dataPro[i].gategory;
submit.innerHTML = 'update';
mode = 'update';
mpt = i;
scroll({top:0,
behavior:"smooth"})
}



//search
let searchMood = 'title';
function getSearchMood(id){
let search = document.getElementById('search');

	if(id == 'searchtitle')
	{
		searchMood = 'title';
		search.ariaPlaceholder = 'search By title';
	}else{
		searchMood = 'gategory';
		search.ariaPlaceholder = 'search By gategory';

	}
	search.focus()
	search.value = '';
	showData();
}


function searchData(value){
	let table = '';
if(searchMood == 'title'){

for(let i = 0; i < dataPro.length;i++){
	if(dataPro[i].title.includes(value.toLowerCase())){

		table +=
		`
	 <tr>
	 <td>${i}</td>
	 <td>${dataPro[i].title}</td>
	 <td>${dataPro[i].price}</td>
	 <td>${dataPro[i].taxes}</td>
	 <td>${dataPro[i].ads}</td>
	 <td>${dataPro[i].discount}</td>
	 <td>${dataPro[i].total}</td>
	 <td>${dataPro[i].gategory}</td>
	 <td><button onclick='updetdata(${i})' id="update">update</button></td>
	 <td><button onclick="deletData( ${i} )" id="delete">delete</button></td>
	 </tr>
	 
		`;


	}
}

}
else{
	for(let i = 0; i < dataPro.length;i++){
		if(dataPro[i].gategory.includes(value.toLowerCase())){
	
			table +=
			`
		 <tr>
		 <td>${i}</td>
		 <td>${dataPro[i].title}</td>
		 <td>${dataPro[i].price}</td>
		 <td>${dataPro[i].taxes}</td>
		 <td>${dataPro[i].ads}</td>
		 <td>${dataPro[i].discount}</td>
		 <td>${dataPro[i].total}</td>
		 <td>${dataPro[i].gategory}</td>
		 <td><button onclick='updetdata(${i})' id="update">update</button></td>
		 <td><button onclick="deletData( ${i} )" id="delete">delete</button></td>
		 </tr>
		 
			`;
	
	
		}
	}
	

}
document.getElementById('tbody').innerHTML = table;
}