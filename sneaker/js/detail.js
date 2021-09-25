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
const successDetail = function successDetail(data) {
    let classE = document.querySelector('.slide-show');
    let str = ''
        str += `
      <div class="anhchitiet">
                <img src="${data.img}" alt="">
            </div>
            <div class="thongtinchitiet">
                <h4>${data.name}</h4>
                <div class="giasp">
                    <span style="color: red;font-weight: bold;font-size:20pt;">${data.price_sale}đ</span>
                    <span style="text-decoration: line-through;color: #999;font-size:18pt;font-weight: bold">${data.price}đ</span>
                </div>
                <p class="mt-3">${data.short}</p>
                <div class="themgiohang">
                    <button style="background-color: #01c4c4;"  onClick="addCart(${data.id})" ><a style="color:white;padding: 15px 10px;line-height: 40px;" href="#" ><i style="margin-right: 2px;" class="fa fa-shopping-cart"></i>THÊM GIỎ HÀNG</a></button>
                    <button style="background-color: red;"><a style="color:white;padding: 15px 10px;line-height: 40px;" href=""><i style="margin-right: 2px;" class="fa fa-check"></i>MUA NGAY</a></button>

                </div>
            </div>
            <div class="motasp">
                <div class="motasps"><p style="padding: 0px 10px;color: #eee;font-size:13pt;font-weight: bold;">MÔ TẢ</p></div>
                <div class="chitietmota">
                    <p style="padding:15px;border: 1px solid #eee;">
                    ${data.description}
                    </p>
                </div>
            </div>`;
    classE.innerHTML = str;
    console.log(data);
    
}

const detail = async function detail() {
    var paramsString = window.location.href;
    var index = paramsString.lastIndexOf('d=')+2;
    var id = paramsString.slice(index);
    console.log(id);
    let svUrl = url + 'products/'+id;
    let options = {
        method: 'GET'
    };
    await fetchAPI(svUrl, options, successDetail, processErr)
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


// const showCart = () =>{
//     let storage = localStorage.getItem('cart')
//     cart = JSON.parse(storage)
//      let cartBody = document.getElementById('cart-body')
//     cartBody.innerHTML = ''
//     cart.forEach(item => {
//         cartBody.innerHTML += `
//         <tr>
//                                   <td>
//                                       <div class="product-img">
//                                           <div class="img-prdct">
//                                               <img src="${item.product.img}" alt="">
//                                           </div>
//                                       </div>
//                                   </td>
//                                   <td>
//                                       <p>${item.product.name}</p>
//                                   </td>
//                                   <td>
//                                       <div class="button-container">
//                                           <button class="cart-qty-plus" type="button" value="+">+</button>
//                                           <input type="text" name="qty" min="0" class="qty form-control" value="${item.quantity}">
//                                           <button class="cart-qty-minus" type="button" value="-">-</button>
//                                       </div>
//                                   </td>
//                                   <td>
//                                       <input type="text" value="${item.product.price}" class="price form control" disabled>
//                                   </td>
//                                   <td>$
//                                       <span id="amount" class="amount">${item.product.img*item.quantity}</span>
//                                   </td>
//                                   <td >
//                                     <button class="remove">Remove</button>
//                                 </td>
//                               </tr>
//         `
        
//     })
//  }

//  showCart()

// const removeItem = id => {
//     let storage = localStorage.getItem('cart')
//     if (storage) {
//         cart = JSON.parse(storage)
//     }
//     cart = cart.filter(item => item.product.id != id)
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


// const submitCart = async () => {
//     let ten = document.getElementById('ten').value
//     let diachi = document.getElementById('diachi').value
//     const data = { ten, diachi }
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



    detail();
    getCat();




