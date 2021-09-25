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

const successdm = function outClass(data) {
    let classE = document.querySelector('#sptheodm');
    var paramsString = window.location.href;
    var index = paramsString.lastIndexOf('d=')+2;
    var id = paramsString.slice(index);
    let str = ''
    for (let i in data) {
       if(data[i].idCata==id){
        str += `<div class="box">
        <img src="${data[i].img}" alt="">
        <div class="name">
          <a href="detail.html?id=${data[i].id}">${data[i].name}</a>
        </div>

        <div class="price">
          <span style="color: red;font-weight: bold;font-size:15px;">${data[i].price_sale}đ</span>
          <span style="text-decoration: line-through;color: #999;font-weight: bold">${data[i].price}đ</span>
        </div>
        <div class="mua">
        <button type="button" oclick="submitCart" style="color:#fff">Mua Ngay</button>
        </div>
      </div>`;
      console.log(data[i].idCata);
       }
    }
    classE.innerHTML = str;
    console.log(data);
}


const getspdm = async function getspdm() {
    let svUrl = url + 'products';
    let options = {
        method: 'GET'
    };
    await fetchAPI(svUrl, options, successdm, processErr)
}

    getspdm();
 getCat();
