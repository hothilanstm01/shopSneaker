function temp(arr) {
    let temp_arr = [...arr];
    let obj = {};
    temp_arr.forEach((item) => {
        obj[item.order_id] =
            obj[item.order_id] + item.quantity || item.quantity;
    });
    return obj;
}
const baseUrl = 'http://localhost:3000/';

let names = [];

let quantity = [];

async function chart() {
    try {
        await fetch(baseUrl + 'order_details')
            .then(response => response.json())
            .then(response => {
                let a = temp(response);
                for (let obj in a) {
                    names.push(obj);
                    quantity.push(a[obj]);
                }
            });

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: names,
                datasets: [{
                    label: 'Số sản phẩm mua',
                    data: quantity,
                    borderColor: 'white',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

chart()