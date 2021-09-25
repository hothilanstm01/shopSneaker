const url = 'http://localhost:3000/';

const fetchAPI = async function fetchAPI(url, options, cb, err) {
    await fetch(url, options)
        .then(res => res.json())
        .then(cb)
        .catch(err)
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
    const res = await fetchAPI(productsUrl, option)
    return res
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
const successPro = function outClass(data) {
    let classE = document.querySelector('#result');
    let str = ''
    for (let i in data) {
      const product = data[i];
        str += `<div class="box">
        <img src="${product.img}" alt="">
        <div class="name">
          <a href="detail.html?id=${product.id}">${product.name}</a>
        </div>

        <div class="price">
          <span style="color: red;font-weight: bold;font-size:17px;">${product.price_sale.toLocaleString("vi")+" VNĐ"}</span>
          <span style="text-decoration: line-through;color: #999;font-weight: bold;font-size:14px;">${product.price.toLocaleString("vi")+" VNĐ"}</span>
        </div>
        <div class="mua">
        <button type="button" onClick="addCart(${product.id})" style="color:#fff">Mua Ngay</button>
        </div>
      </div>`;
    }
    classE.innerHTML = str;
    console.log(data);
}


const fetchAPICart = async (url, option) => {
    const res = await fetch(url, option)
    return res.json()
}
 
const getProductByIdCart = async (id) => {
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
    let product = await getProductByIdCart(id)
    console.log(product)
    let item = cart.find(sp => sp.product.id == id)
    if (item) {
        item.quantity += 1
    } else {
        cart.push({product, quantity: 1})
    }   
    localStorage.setItem('cart', JSON.stringify(cart))
}



//  let cart = []
// const addCart = async (id) => {
//     let storage = localStorage.getItem('cart')
//     if (storage) {
//         cart = JSON.parse(storage)
//     }
//     let product = await getProductById(id)
//     let item = cart.find(sp => sp.product.id == id)
//     if (item) {
//         item.quantity += 1
//     } else {
//         cart.push({product, quantity: 1})
//     }   
//     localStorage.setItem('cart', JSON.stringify(cart))
//     // show cart ra view
//     let cartBody = document.getElementById('cart-body')
//     cartBody.innerHTML = ''
//     cart.forEach(item => {
//         cartBody.innerHTML += `
//             <tr>
//                 <td>${item.product.name}</td>
//                 <td>${item.quantity}</td>
//                 <td>${item.product.price}</td>
//                 <td>
//                     <button onclick="removeItem(${item.product.id})">Xóa</button>
//                 </td>
//             </tr>
//         `
//     })
// }

// const removeItem = id => {
//     let storage = localStorage.getItem('cart')
//     if (storage) {
//         cart = JSON.parse(storage)
//     }
//     cart = cart.filter(item => item.product.id != id)
//     localStorage.setItem('cart', JSON.stringify(cart))
//     // show cart ra view
//     // let cartBody = document.getElementById('cart-body')
//     // cartBody.innerHTML = ''
//     // cart.forEach(item => {
//     //     cartBody.innerHTML += `
//     //     <tr>
//     //     <td>
//     //         <div class="product-img">
//     //             <div class="img-prdct">
//     //                 <img src="${item.product.img}" alt="">
//     //             </div>
//     //         </div>
//     //     </td>
//     //     <td>
//     //         <p>${item.product.name}</p>
//     //     </td>
//     //     <td>${item.quantity}</td>
//     //     <td>${item.product.price}</td>
//     //     <td >
//     //     <button onclick="removeItem(${item.product.id})">Remove</button>

//     //   </td>
//     // </tr>
//     //     `
//     // })
// }
// const showCart = () =>{
//     let storage = localStorage.getItem('cart')
//     cart = JSON.parse(storage)
//     console.log(cart[0].product);
//      let cartBody = document.getElementById('cart-body')
//     cartBody.innerHTML = ''
//     cart.forEach(item => {
//         cartBody.innerHTML += `
//         <tr>
//         <td>
//             <div class="product-img">
//                 <div class="img-prdct">
//                     <img src="${item.product.img}" alt="">
//                 </div>
//             </div>
//         </td>
//         <td>
//             <p>${item.product.name}</p>
//         </td>
//         <td>${item.quantity}</td>
//         <td>${item.product.price}</td>
//         <td >
//         <button onclick="removeItem(${item.product.id})">Remove</button>

//       </td>
//     </tr>
//         `
        
//     })
//  }
//  showCart()
// const submitCart = async () => {
//     let name = document.getElementById('recipient-name').value
//     let sdt = document.getElementById('recipient-sdt').value
//     let dch = document.getElementById('recipient-dchi').value
//     const data = { name, sdt,dch }
//     const productsUrl = url + 'orders'
//     const option = {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }
//     const res = await fetchAPI(productsUrl, option)
//     submitOrderDetail(res.id)
// }

// const submitOrderDetail = async (idOrder) => {
//     let storage = localStorage.getItem('cart')
//     if (storage) {
//         cart = JSON.parse(storage)
//     }
//     let orderDetails = []
//     for (let index = 0; index < cart.length; index++) {
//         const item = cart[index]
//         let orderDetail = {
//             order_id: idOrder,
//             product_id: item.product.id,
//             quantity: item.quantity,
//             unit_price: item.product.price
//         }
//         orderDetails.push(orderDetail)
//     }
//     let promies = orderDetails.map((item, index) => {
//         return postOrderDetail(item)
//     })
//     await Promise.all(promies)
//     localStorage.removeItem('cart')
//     cart = []

// }

// const postOrderDetail = async (data) => {
//     const productsUrl = url + 'order_details'
//     const option = {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }
//     await fetchAPI(productsUrl, option)
// }



const getCat = async function getCat() {
    let classUrl = url + 'catalogs';
    let options = {
        method: 'GET'
    };
    await fetchAPI(classUrl, options, outClass, processErr)
}
const getPro = async function getPro() {
    let svUrl = url + 'products';
    let options = {
        method: 'GET'
    };
    await fetchAPI(svUrl, options, successPro, processErr)
} 
// //------------------------------cart--------------------------------

getCat();
getPro();


