let designData = [];
let selectedSets = [];
let currentSet = 0;

fetch("design.json")
.then(res => res.json())
.then(data => {
designData = data;
});

function startExperiment(){

selectedSets = shuffle(designData).slice(0,3);
currentSet = 0;

showSet();

}

function shuffle(array){
return array.sort(() => Math.random()-0.5);
}

function showSet(){

let set = selectedSets[currentSet];
let container = document.getElementById("cards");

container.innerHTML = "<h3>Choice Set "+(currentSet+1)+"</h3>";

["non_ac","electric","volvo"].forEach(type => {

let d = set[type];

let names={
non_ac:"Non AC Bus",
electric:"Electric Bus",
volvo:"AC Volvo Bus"
};

let card=document.createElement("div");
card.className="card";

card.innerHTML=`
<h4>${names[type]}</h4>
Fare: ₹${d.fare}<br>
Time: ${d.time} hr<br>
Reliability: ${d.rel}%<br><br>
<button onclick="selectOption('${type}')">Select</button>
`;

container.appendChild(card);

});

}

function selectOption(choice){

currentSet++;

if(currentSet < selectedSets.length){
showSet();
}
else{
document.getElementById("cards").innerHTML="<h3>Thank you for completing the survey</h3>";
}

}
