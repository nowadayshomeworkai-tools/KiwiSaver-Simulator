let chart;

function runSim() {

let age = Number(document.getElementById("age").value);
let balance = Number(document.getElementById("balance").value);
let salary = Number(document.getElementById("salary").value) || 0;
let business = Number(document.getElementById("business").value) || 0;
let strategy = Number(document.getElementById("strategy").value);

let incomeRatio = 1 - strategy;

let growthReturn = 0.07;
let incomeReturn = 0.035;

let contribution = (salary * 0.07) + (business * 0.035);

let value = balance;

let labels = [];
let data = [];

for (let i = age; i <= 90; i++) {

```
let r = (strategy * growthReturn) + (incomeRatio * incomeReturn);

value = value * (1 + r) + contribution;

labels.push(i);
data.push(Math.round(value));
```

}

document.getElementById("result").innerText =
"Final Value: $" + Math.round(value);

if (chart) {
chart.destroy();
}

chart = new Chart(document.getElementById("chart"), {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'Growth',
data: data
}]
}
});
}
