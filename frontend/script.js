const API =
"https://hospital-management-60f9.onrender.com/patients";

loadPatients();

function showSection(sectionId){

    const sections =
    document.querySelectorAll(".section");

    sections.forEach(section=>{
        section.style.display="none";
    });

    document.getElementById(
        sectionId
    ).style.display="block";
}

function addPatient(){

    const patient={

        patientId:
        document.getElementById("patientId").value,

        name:
        document.getElementById("name").value,

        patientType:
        document.getElementById("patientType").value,

        status:
        document.getElementById("status").value
    };

    fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(patient)

    })

    .then(r=>r.json())

    .then(data=>{

        alert("Patient Added");

        loadPatients();

    });
}

function loadPatients(){

    fetch(API)

    .then(r=>r.json())

    .then(data=>{

        let table="";

        data.forEach(patient=>{

            table += `
            <tr>
            <td>${patient.patientId}</td>
            <td>${patient.name}</td>
            <td>${patient.patientType}</td>
            <td>${patient.status}</td>

            <td>
                <button onclick="deletePatient(${patient.patientId})">
                Delete
                </button>
            </td>
            </tr>
            `;
        });

        document.getElementById(
            "patientTable"
        ).innerHTML = table;
    });
}

function deletePatient(id){

    if(confirm("Delete patient?")){

        fetch(API+"/"+id,{
            method:"DELETE"
        })

        .then(()=>{
            loadPatients();
        });
    }
}

function calculateBill(){

    let type =
    document.getElementById("billType").value;

    let days =
    parseInt(
        document.getElementById("days").value
    );

    let medicine =
    parseInt(
        document.getElementById("medicineCost").value
    );

    let roomCharge = 0;

    if(type==="Normal"){
        roomCharge=150;
    }
    else if(type==="Emergency"){
        roomCharge=300;
    }

    let total =
    (days * roomCharge)
    + medicine;

    document.getElementById(
        "billResult"
    ).innerHTML =
    "Total Bill: ₹" + total;
}

function buyMedicine(){

    let medicine =
    document.getElementById("medicine").value;

    let cost =
    document.getElementById("medCost").value;

    document.getElementById(
        "pharmacyResult"
    ).innerHTML =
    medicine + " bought for ₹" + cost;
}

function generateReport(){

    let test =
    document.getElementById("testName").value;

    document.getElementById(
        "radiologyResult"
    ).innerHTML =
    "Report generated for: " + test;
}

function addMedicineRow(){

    const container =
    document.getElementById("medicineContainer");

    const row =
    document.createElement("div");

    row.className="medicineRow";

    row.innerHTML = `
        <input type="text" placeholder="Medicine Name" class="medName">
        <input type="number" placeholder="Quantity" class="medQty">
        <input type="number" placeholder="Price" class="medPrice">
    `;

    container.appendChild(row);
}
function calculateMedicineTotal(){

    let names =
    document.querySelectorAll(".medName");

    let qtys =
    document.querySelectorAll(".medQty");

    let prices =
    document.querySelectorAll(".medPrice");

    let total = 0;

    let summary = "";

    for(let i=0; i<names.length; i++){

        let name = names[i].value;
        let qty = parseInt(qtys[i].value);
        let price = parseInt(prices[i].value);

        let cost = qty * price;

        total += cost;

        summary += `${name} = ₹${cost}<br>`;
    }

    document.getElementById("pharmacyResult").innerHTML =
    summary + "<br><b>Total: ₹" + total + "</b>";
}