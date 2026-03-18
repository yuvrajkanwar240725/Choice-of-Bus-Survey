let designData = [];
let selectedSets = [];
let currentSet = 0;

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

let income = document.getElementById("income").value;
let freq = document.getElementById("frequency").value;
let age = document.getElementById("age").value;


let filteredDesign = designData;


/* Dynamic Logic */

if(income === "low"){
filteredDesign = designData.filter(set =>
set.non_ac.fare <= 500
);
}

if(income === "high"){
filteredDesign = designData.filter(set =>
set.volvo.fare >= 1100
);
}

if(freq === "frequent"){
filteredDesign = designData.filter(set =>
set.volvo.time <= 7
);
}

if(age === "old"){
filteredDesign = designData.filter(set =>
set.volvo.rel >= 90
);
}


/* Randomize choice sets */

selectedSets = shuffle(filteredDesign).slice(0,3);

currentSet = 0;

showSet();

}


function shuffle(array){
return array.sort(()=>Math.random()-0.5);
}


function showSet(){

let set = selectedSets[currentSet];

let container = document.getElementById("cards");

container.innerHTML = "<h3>Choice Set "+(currentSet+1)+"</h3>";

["non_ac","electric","volvo"].forEach(type=>{

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
Travel Time: ${d.time} hr<br>
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
