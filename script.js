const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzx7xJIDuvDyqDIOorJwhibFqA9lf_ej_I0lO_umCUhAeYojFvazNKjvvrr9qcZU_-KHQ/exec";

let designData = [];
let selectedSets = [];
let currentSet = 0;
let socioData = {};

fetch("design.json")
.then(res => res.json())
.then(data => {
designData = data;
});

function showSection(id){

document.getElementById("intro").style.display="none";
document.getElementById("socio").style.display="none";
document.getElementById("choice").style.display="none";

document.getElementById(id).style.display="block";

}

function startExperiment(){

showSection("choice");

socioData.age=document.getElementById("age").value;
socioData.income=document.getElementById("income").value;
socioData.frequency=document.getElementById("frequency").value;

let filteredDesign = designData;

if(socioData.income==="low"){
filteredDesign = designData.filter(set => set.non_ac.fare <= 500);
}

if(socioData.income==="high"){
filteredDesign = designData.filter(set => set.volvo.fare >= 1100);
}

if(socioData.frequency==="frequent"){
filteredDesign = designData.filter(set => set.volvo.time <= 7);
}

selectedSets = shuffle(filteredDesign).slice(0,3);

currentSet = 0;

showSet();

}

function shuffle(array){
return array.sort(() => Math.random() - 0.5);
}

function showSet(){

let set = selectedSets[currentSet];

let container = document.getElementById("cards");

container.innerHTML = "<h3>Choice Set " + (currentSet+1) + "</h3>";

["non_ac","electric","volvo"].forEach(type => {

let d = set[type];

let names = {
non_ac: "Non-AC Bus",
electric: "Electric Bus",
volvo: "AC Volvo Bus"
};

let card = document.createElement("div");

card.className = "card";

card.innerHTML = `
<h4>${names[type]}</h4>
Fare: ₹${d.fare}<br>
Travel Time: ${d.time} hr<br>
Reliability: ${d.rel}%<br><br>
<button onclick="selectOption('${type}')">Select</button>
`;

container.appendChild(card);

});

}

function selectOption(choice){

let payload = {
age: socioData.age,
income: socioData.income,
frequency: socioData.frequency,
set: currentSet+1,
choice: choice
};

fetch(SCRIPT_URL,{
method:"POST",
body:JSON.stringify(payload)
});

currentSet++;

if(currentSet < selectedSets.length){
showSet();
}else{
document.getElementById("cards").innerHTML="<h3>Thank you for completing the survey!</h3>";
}

}
