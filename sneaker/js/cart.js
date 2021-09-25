    const urlCart = 'http://localhost:3000/'
    let selectedId = 0 


 const fetchAPICart = async (url, option) => {
    const res = await fetch(url, option)
    return res.json()
}
 
const getProductById = async (id) => {
    const productsUrl = urlCart + 'products/' + id
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

const getCat = async function getCat() {
    let productsUrl = urlCart + 'catalogs';
    let option = {
        method: 'GET'
    };
    const res = await fetchAPICart(productsUrl, option,outClass)
    return res
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
getCat();
  
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

const showCart = () =>{
    let storage = localStorage.getItem('cart')
    cart = JSON.parse(storage)
     let cartBody = document.getElementById('cart-body')
    cartBody.innerHTML = ''
    cart.forEach(item => {
        cartBody.innerHTML += `
        <tr>
                                  <td>
                                      <div class="product-img">
                                          <div class="img-prdct">
                                              <img src="${item.product.img}" alt="">
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                      <p>${item.product.name}</p>
                                  </td>
                                  <td>
                                      <div class="button-container">
                                          <button class="cart-qty-plus" type="button" value="+" onClick="tang(${item.product.id})">+</button>
                                          <input type="text" name="qty" min="0" class="qty form-control" value="${item.quantity}">
                                          <button class="cart-qty-minus" type="button" value="-"onClick="giam(${item.product.id})">-</button>
                                      </div>
                                  </td>
                                  <td>
                                      <input type="text" value="${item.product.price.toLocaleString("vi")+" VNĐ"}" class="price form control" disabled>
                                  </td>
                                  <td>
                                      <span id="amount" class="amount">${item.product.price*item.quantity}VNĐ</span>
                                  </td>
                                  <td >
                                    <button class="remove" onclick="removeItem(${item.product.id})">Remove</button>
                                </td>
                              </tr>
        `
        
    })
 }

 showCart()


 const tang = async function tang(id){
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    let product = await getProductById(id)
    console.log(product)
    let item = cart.find(sp => sp.product.id == id)
    if (item) {
        item.quantity += 1
        localStorage.setItem('cart', JSON.stringify(cart))
        location.reload();
    }  
 }

 const giam = async function tang(id){
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    let product = await getProductById(id)
    console.log(product)
    let item = cart.find(sp => sp.product.id == id)
    if (item) {
        item.quantity =item.quantity - 1
        localStorage.setItem('cart', JSON.stringify(cart))
        location.reload();
    }  
 }

const removeItem = id => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    cart = cart.filter(item => item.product.id != id)
    localStorage.setItem('cart', JSON.stringify(cart))
    location.reload();
}


const submitCart = async () => {
    let ten = document.getElementById('recipient-name').value
    let sdt = document.getElementById('recipient-sdt').value
    let diachi = document.getElementById('recipient-diachi').value
    var pat = /^0\d{9}$/g;
    var chec = pat.test(sdt)
    if(chec == false){
        document.getElementById('er').innerHTML = 'Số Điện Thoại Sai'
        alert('Vui lòng nhập lại số')
    }
    else{
        document.getElementById('er').innerHTML = 'Oke'
        const data = {ten,sdt, diachi}
        const productsUrl = urlCart + 'orders'
        const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPICart(productsUrl, option)
    submitOrderDetail(res.id)
    }
    
    
}

const submitOrderDetail = async (idOrder) => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    let orderDetails = []
    for (let index = 0; index < cart.length; index++) {
        const item = cart[index]
        let orderDetail = {
            order_id: idOrder,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.price
        }
        orderDetails.push(orderDetail)
    }
    let promies = orderDetails.map((item, index) => {
        return postOrderDetail(item)
    })
    await Promise.all(promies)
    localStorage.removeItem('cart')
    cart = []

}

const postOrderDetail = async (data) => {
    const productsUrl = urlCart + 'order_details'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetchAPICart(productsUrl, option)
}

