const url = 'http://localhost:3000/';

const fetchAPI = async function fetchAPI(url, options, cb, err) {
    await fetch(url, options)
        .then(res => res.json())
        .then(cb)
        .catch(err)
}

const outPost =  function outPost(data){
    console.log(data);
}

const processErr = function processErr(err) {
    console.log(err);
}
const outClass = function outClass(data) {
    let classE = document.querySelector('#target');
    let str = ''
    for (let i in data) {
        str += `<li>
        <a href="sptheodm.html?id=${data[i].id}">
          ${data[i].name}             
        </a>               
      </li>`
    }
    classE.innerHTML = str;
    console.log(data);
}
const getCat = async function getCat() {
    let classUrl = url + 'catalogs';
    let options = {
        method: 'GET'
    };
    await fetchAPI(classUrl, options, outClass, processErr)
}

const successhot = function outClass(data) {
    let classE = document.querySelector('#Hot');
    let str = ''
    for (let i in data) {
       if(data[i].hot==1){
        str += `<div class="box">
        <img src="${data[i].img}" alt="">
        <div class="name">
          <a href="detail.html?id=${data[i].id}">${data[i].name}</a>
        </div>

        <div class="price">
          <span style="color: red;font-weight: bold;font-size:15px;">${data[i].price_sale.toLocaleString("vi")+" VNĐ"}</span>
          <span style="text-decoration: line-through;color: #999;font-weight: bold">${data[i].price.toLocaleString("vi")+" VNĐ"}</span>
        </div>
        <div class="mua">
          <button type="button"  onClick="addCart(${data[i].id})"style="color:#fff">Mua Ngay</button>
        </div>
      </div>`;
      console.log(data[i].hot);
       }
    }
    classE.innerHTML = str;
    console.log(data);
}

const fetchAPICart = async (url, option) => {
  const res = await fetch(url, option)
  return res.json()
}

const getProductById = async (id) => {
  const productsUrl = url + 'products/' + id
  const option = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json'
      },
      // body: JSON.stringify(data)
  }
  const res = await fetchAPICart(productsUrl, option)
  return res
}


let cart = []

const addCart = async (id) => {
  confirm("Đã thêm vào giỏ hàng");
  let storage = localStorage.getItem('cart')
  if (storage) {
      cart = JSON.parse(storage)
  }
  let product = await getProductById(id)
  console.log(product)
  let item = cart.find(sp => sp.product.id == id)
  if (item) {
      item.quantity += 1
  } else {
      cart.push({product, quantity: 1})
  }   
  localStorage.setItem('cart', JSON.stringify(cart))
}



const getHot = async function gethot() {
    let svUrl = url + 'products';
    let options = {
        method: 'GET'
    };
    await fetchAPI(svUrl, options, successhot, processErr)
}

 getHot();
 getCat();
