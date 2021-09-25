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
        
        str += `<tr>
 
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td><button onclick="deteleClass(${data[i].id})">Xóa</button></td>
        <td><button onclick="editLop(${data[i].id})">Sửa</button></td>
      </tr>
    `
    // onclick="editLop(${data[i].id})"
    console.log(data[i].name);
    }

    classE.innerHTML = str;

    let form = document.querySelector('#idCat');
    let strForm = '';
    for (let e in data) {        
        strForm += `<option value="${data[e].id}">${data[e].name}</option>`
    }
    form.innerHTML = strForm;
    console.log(data);
}
async function deteleClass(idClass) {
    let classUrl = url + 'catalogs/' + idClass;
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    await fetchAPI(classUrl, options)
    getLop();
}

const successStudents = function outClass(data) {
    let classE = document.querySelector('#result');
    let str = ''
    for (let i in data) {
        str += `<tr>
 
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].description}</td>
        <td>${data[i].price.toLocaleString("vi")+" VNĐ"}</td>

        <td><img style="width:70px;height:70px" src="${data[i].img}" alt=""></td>
        <td><button onclick="deteleSv(${data[i].id})">Xóa</button></td>
        <td><button onclick="edit(${data[i].id})">Sửa</button></td>
      </tr>`
    }
    classE.innerHTML = str;
    console.log(data);
}
const outC = function outC(data) {
    let classE = document.querySelector('#cart');
    let str = ''
    for (let i in data) {
        
        str += `
        <tr>
        <td>
            <p>${data[i].id}</p>
        </td>
        <td>
            <p>${data[i].ten}</p>
        </td>
        <td>
            <p>${data[i].diachi}</p>
        </td>
       
        <td>
            <p>${data[i].sdt}</p>
        </td>
        
    `
    // onclick="editLop(${data[i].id})"
    console.log(data[i].name);
    }

    classE.innerHTML = str;

    let form = document.querySelector('#idCat');
    let strForm = '';
    for (let e in data) {        
        strForm += `<option value="${data[e].id}">${data[e].name}</option>`
    }
    form.innerHTML = strForm;
    console.log(data);
}
const getLop = async function getLop() {
    let classUrl = url + 'catalogs';
    let options = {
        method: 'GET'
    };
    await fetchAPI(classUrl, options, outClass, processErr)
}
const getC = async function getC() {
    let classUrl = url + 'orders';
    let options = {
        method: 'GET'
    };
    await fetchAPI(classUrl, options, outC, processErr)
}
const getSv = async function getSv() {
    let svUrl = url + 'products';
    let options = {
        method: 'GET'
    };
    await fetchAPI(svUrl, options, successStudents, processErr)
}

async function deteleSv(idSv) {
    let svUrl = url + 'products/' + idSv;
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    await fetchAPI(svUrl, options)
    getSv();
}
const postClass = async function postClass(){

    let classUrl = url + 'catalogs';
    let data = {
        name: document.querySelector('#className').value
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    await fetchAPI(classUrl, options);
}

const postStudent = async function postClass(){
    
    let svUrl = url + 'products';
    let data = {
        name: document.querySelector('#name').value,
        price: document.querySelector('#price').value,
        price_sale: document.querySelector('#price_sale').value,
        description: document.querySelector('#description').value,
        img: document.querySelector('#img').value,
        idCata: document.querySelector('#id').value,
        sphot:document.querySelector('#sphot').value
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    await fetchAPI(svUrl, options);
}
const processSinhvienByid = function processSinhvienByid(data){
    document.querySelector('#name').value = data.name
    document.querySelector('#price').value = data.price
    document.querySelector('#price_sale').value = data.price_sale
    document.querySelector('#description').value = data.description
    document.querySelector('#img').value = data.img
    document.querySelector('#id').value = data.idCata
    document.querySelector('#sphot').value = data.sphot
}

const  getSinhvienByid = async function  getSinhvienByid(id){
    const sinhvienUrl = url + 'products/'+id
    const options = {
        method: 'GET'
    }
     await fetchAPI(sinhvienUrl,options,processSinhvienByid,processErr);
   
}
const edit =  async function edit(id){
    const sv = await getSinhvienByid(id);
}

const editsv = async function editsv(id){
    const data = {
        name: document.querySelector('#name').value,
        price: document.querySelector('#price').value,
        price_sale: document.querySelector('#price_sale').value,
        description: document.querySelector('#description').value,
        img: document.querySelector('#img').value,
        idCata: document.querySelector('#id').value,
        sphot:document.querySelector('#sphot').value
        
    }
    const sinhvienUrl = url + 'products/'+id
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetchAPI(sinhvienUrl,options);
    getSinhvien();
}

const submitForm=function submitForm(){
    const id = document.getElementById("id").value;
    if(id==0){
        postStudent()
    } else{
        editsv(id);
    }
}

const submitFormClass=function submitFormClass(){
    const id = document.getElementById("idClass").value;
    if(id==0){
        postClass()
    } else{
        editClass(id);
    }
}

const editLop =  async function editLop(id){
     await getClassByid(id);
}

const processClassByid = function processClassByid(data){
    document.getElementById('idClass').value = data.id
    document.getElementById('className').value = data.name
    
}

const  getClassByid = async function  getClassByid(id){
    const ClassUrl = url + 'catalogs/'+id
    const options = {
        method: 'GET'
    }
     await fetchAPI(ClassUrl,options,processClassByid,processErr);
   
}

const editClass = async function editClass(id){
    const data = {
        name: document.getElementById('className').value,
        id: document.getElementById('idClass').value
    }
    const ClassUrl = url + 'catalogs/'+id
    const options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetchAPI(ClassUrl,options);
    getSinhvien();
}
getLop();
getSv();
getC();
