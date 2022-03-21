let title =document.getElementById('title')
let price =document.getElementById('price')
let taxes =document.getElementById('taxes')
let ads =document.getElementById('ads')
let discount =document.getElementById('discount')
let total =document.getElementById('total')
let count =document.getElementById('count')
let category =document.getElementById('category')
let submit =document.getElementById('submit')
let mood = 'Create'
let tmp

//total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background='#040'
    } else{
        total.innerHTML= ''
        total.style.background='#a00d02'

    }
    
}
//creat product
let dataProduct
if(localStorage.product != null){
    dataProduct=JSON.parse(localStorage.product)
}
else {
    dataProduct=[]
}
submit.onclick= function(){
  let   newProduct ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()

        
    }
    // Count products & incorrect data
    if(title.value != '' && price.value !='') {
        if ( mood === 'Create'){ 
            if (newProduct.count>1){
            for(i=0; i<newProduct.count;i++){
                dataProduct.push(newProduct)
            }
        } else {
            dataProduct.push(newProduct)
            } 
        
        } else {
            dataProduct[tmp] = newProduct
            mood = 'Create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        

    }
    

    //save localstorage

    localStorage.setItem('product',   JSON.stringify(dataProduct))
    clearData()

    readData()

    

    
}

//clear input
function clearData (){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value =''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    

}
//read data
function readData(){
    let table =''
    getTotal()
   
          for(let i =0; i<dataProduct.length; i++) {
              table +=`
              <tr>
            <td>${i+1}</td>
          <td>${dataProduct[i].title}</td>
          <td> ${dataProduct[i].price}</td>
            <td> ${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button  onclick= "updateData(${i})" id="update"> Update</button></td>
         <td><button  onclick= "deleteData(${i})" id="delete">Delete</button></td>
                               
         </tr>
              `
          }                 
                                
          document.getElementById('tbody').innerHTML=table
          let btnDeleteAll= document.getElementById('deleteAll')
          if(dataProduct.length>0){
            btnDeleteAll.innerHTML=`
            <button onclick="deleteAll()">deleteAll</button>
            `
          } else{
              btnDeleteAll.innerHTML=''
          }

}
readData()


//delete one product
function deleteData(i){
    dataProduct.splice(i,1)
    localStorage.product= JSON.stringify(dataProduct)
    readData()
}
// delet all 
function deleteAll(){
    localStorage.clear()
    dataProduct.splice(0)
    readData()
}


//update product
function updateData(i){
title.value = dataProduct[i].title
price.value = dataProduct[i].price
taxes.value = dataProduct[i].taxes
ads.value = dataProduct[i].ads
discount.value = dataProduct[i].discount
getTotal()
count.style.display = 'none'
category.value = dataProduct[i].category
submit.innerHTML = 'Update'
mood = 'Update'
tmp = i
scroll({
    top:0,
    behavior:"smooth"
})
}

//search
let searchMood = 'title'
function getSearchMood(id){
    let search = document.getElementById('search')
  if(id == "searchTitle"){
    searchMood = 'title'
    search.placeholder = 'Search By Title'
  } else {
      searchMood = 'category'
      search.placeholder = 'Search By Category'

  }
  search.focus()
  search.value = ''
  readData()

} 
 
function searchData(value)
{ let table = ''
  if (searchMood == 'title')
  {
      
   for(let i =0; i < dataProduct.length; i++)
   {
      if(dataProduct[i].title.includes(value.toLowerCase())){
        table +=`
        <tr>
      <td>${i}</td>
    <td>${dataProduct[i].title}</td>
    <td> ${dataProduct[i].price}</td>
      <td> ${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
   <td>${dataProduct[i].discount}</td>
   <td>${dataProduct[i].total}</td>
   <td>${dataProduct[i].category}</td>
   <td><button  onclick= "updateData(${i})" id="update"> Update</button></td>
   <td><button  onclick= "deleteData(${i})" id="delete">Delete</button></td>
                         
   </tr>
        `
      }
   }





  } else {
    for(let i =0; i < dataProduct.length; i++)
   {
      if(dataProduct[i].category.includes(value.toLowerCase())){
        table +=`
        <tr>
      <td>${i}</td>
    <td>${dataProduct[i].title}</td>
    <td> ${dataProduct[i].price}</td>
      <td> ${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
   <td>${dataProduct[i].discount}</td>
   <td>${dataProduct[i].total}</td>
   <td>${dataProduct[i].category}</td>
   <td><button  onclick= "updateData(${i})" id="update"> Update</button></td>
   <td><button  onclick= "deleteData(${i})" id="delete">Delete</button></td>
                         
   </tr>
        `
      }
   }
  }
  document.getElementById('tbody').innerHTML=table

}
  
    

