let growthChart;
let pieChart;

let finalValue = 0;
let finalWithFees = 0;
let totalContribution = 0;

function runSim() {

let age = Number(document.getElementById("age").value);
let balance = Number(document.getElementById("balance").value);

let salary = Number(document.getElementById("salary").value) || 0;
let business = Number(document.getElementById("business").value) || 0;

let strategy = Number(document.getElementById("strategy").value);
let incomeRatio = 1 - strategy;

let growthReturn = 0.07;
let incomeReturn = 0.035;
let fee = 0.01;

let years = 90 - age;

let salaryContribution = salary * 0.07;
let businessContribution = business * 0.035;
let yearlyContribution = salaryContribution + businessContribution;

totalContribution = yearlyContribution * years;

let value = balance;
let valueFee = balance;

let labels = [];
let nominal = [];
let withFees = [];

for (let i = 0; i <= years; i++) {

```
let r = (strategy * growthReturn) + (incomeRatio * incomeReturn);

value = value * (1 + r) + yearlyContribution;
valueFee = valueFee * (1 + r - fee) + yearlyContribution;

labels.push(age + i);
nominal.push(Math.round(value));
withFees.push(Math.round(valueFee));
```

}

finalValue = Math.round(value);
finalWithFees = Math.round(valueFee);

document.getElementById("result").innerText =
"Final Value: $" + finalValue + " | With Fees: $" + finalWithFees;

if (growthChart) growthChart.destroy();
if (pieChart) pieChart.destroy();

growthChart = new Chart(document.getElementById("growthChart"), {
type: 'line',
data: {
labels: labels,
datasets: [
{ label: 'No Fees', data: nominal },
{ label: 'With Fees', data: withFees }
]
}
});

pieChart = new Chart(document.getElementById("pieChart"), {
type: 'pie',
data: {
labels: ['Growth', 'Income'],
datasets: [{
data: [strategy * 100, incomeRatio * 100]
}]
}
});
}

// PDF REPORT GENERATOR
function downloadReport() {

const { jsPDF } = window.jspdf;
let doc = new jsPDF();

let age = document.getElementById("age").value;
let salary = document.getElementById("salary").value || 0;
let business = document.getElementById("business").value || 0;

doc.setFontSize(16);
doc.text("KiwiSaver Growth Report", 20, 20);

doc.setFontSize(12);
doc.text("Age: " + age, 20, 40);
doc.text("Salary: $" + salary, 20, 50);
doc.text("Business Income: $" + business, 20, 60);

doc.text("Total Contributions: $" + Math.round(totalContribution), 20, 80);

doc.text("Projected Value (No Fees): $" + finalValue, 20, 100);
doc.text("Projected Value (With Fees): $" + finalWithFees, 20, 110);

let feeLoss = finalValue - finalWithFees;

doc.text("Loss due to Fees: $" + feeLoss, 20, 130);

doc.setFontSize(10);
doc.text(
"This is a general estimate based on assumed returns (7% growth, 3.5% income). Not financial advice.",
20,
160,
{ maxWidth: 170 }
);

doc.save("KiwiSaver_Report.pdf");
}
