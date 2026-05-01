function runSim() {

let age = Number(document.getElementById("age").value);
let balance = Number(document.getElementById("balance").value);

let salary = Number(document.getElementById("salary").value) || 0;
let business = Number(document.getElementById("business").value) || 0;

let growthRatio = Number(document.getElementById("strategy").value);
let incomeRatio = 1 - growthRatio;

let growthReturn = 0.07;
let incomeReturn = 0.035;

let retireAge = 90;
let years = retireAge - age;

// UPDATED CONTRIBUTIONS
let salaryContribution = salary * 0.07;      // 3.5% employee + 3.5% employer
let businessContribution = business * 0.035; // no employer

let yearlyContribution = salaryContribution + businessContribution;

let values = [];
let labels = [];

let value = balance;

for (let i = 0; i <= years; i++) {

```
let r = (growthRatio * growthReturn) + (incomeRatio * incomeReturn);

value = value * (1 + r) + yearlyContribution;

values.push(Math.round(value));
labels.push(age + i);
```

}

document.getElementById("result").innerText =
"Projected KiwiSaver Value at age 90: $" + Math.round(value);

if (window.growthChart) window.growthChart.destroy();
if (window.pieChart) window.pieChart.destroy();

window.growthChart = new Chart(document.getElementById("growthChart"), {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'Portfolio Growth',
data: values
}]
}
});

window.pieChart = new Chart(document.getElementById("pieChart"), {
type: 'pie',
data: {
labels: ['Growth Assets', 'Income Assets'],
datasets: [{
data: [growthRatio * 100, incomeRatio * 100]
}]
}
});

}
