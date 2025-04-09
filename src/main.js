let randomizeArray = document.getElementById("randomize-array-btn")
let sortBtn = document.getElementById("sort-btn")
let barsContainer = document.getElementById("bars-container")
let minRange = 1;
let maxRange = 100;
let numOfBars = 100;
let heightFactor = 4;
let unsortedArray = new Array(numOfBars);

// let randomizeArrayInsertion = document.getElementById("randomize-array-btn-insertion")
let sortBtnInsertion = document.getElementById("sort-btn-insertion")
let barsContainerInsertion = document.getElementById("bars-container-insertion")


let sortBtnSelection = document.getElementById("sort-btn-selection")
let barsContainerSelection = document.getElementById("bars-container-selection")



function fillArray(unsoredArr, min, max){
    for(let i = 0; i < unsoredArr.length; i++){
        unsoredArr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fillArray(unsortedArray, minRange, maxRange);
    renderBars(unsortedArray);
});

function renderBars(array){
    for(let i=0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.classList.add("bubble")
        bar.style.height = array[i] * heightFactor + "px";
        barsContainer.appendChild(bar)

        let barSort = document.createElement("div");
        barSort.classList.add("bar");
        barSort.classList.add("insertion")
        barSort.style.height = array[i] * heightFactor + "px";
        barsContainerInsertion.appendChild(barSort)

        let selectionSort = document.createElement("div");
        selectionSort.classList.add("bar");
        selectionSort.classList.add("selection")
        selectionSort.style.height = array[i] * heightFactor + "px";
        barsContainerSelection.appendChild(selectionSort)
    }
}

randomizeArray.addEventListener("click", () =>{
    fillArray(unsortedArray, minRange, maxRange);
    barsContainer.innerHTML = " ";
    barsContainerInsertion.innerHTML = " ";
    barsContainerSelection.innerHTML = " ";
    renderBars(unsortedArray);
})

function sleep(ms){
    return new Promise( resolve => setTimeout(resolve, ms));
}

async function bubleSort(array){

    let bars = document.getElementsByClassName("bubble");

    for(let i = 0; i <= array.length; i++){
        for(let j = 0; j < array.length - i - 1 ; j++){
            if(array[j] > array[j + 1]){

                for( let k = 0; k < bars.length ; k++){
                    if(k !== j && k !== j + 1){
                        bars[k].style.backgroundColor = "aqua";
                    }
                }

                let temp = array[j];
                array[j] = array[j+1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "lightgreen";
                // bars[j].innerText = array[j];
                
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                // bars[j + 1].innerText = array[j + 1];
                await sleep(20);
            }
        }
        await sleep(20);
    }
    return array
}

async function InsertionSort(array){
    let bars = document.getElementsByClassName("insertion");

    for(let i = 1; i < array.length; i++){
        let temp = array[i];
        for(let j = i; j > 0 && temp < array[j-1]; j-- ){

            for( let k = 0; k < bars.length ; k++){
                if(k !== j && k !== j + 1){
                    bars[k].style.backgroundColor = "rgb(223, 121, 235)";
                }
            }

            array[j] = array[j-1];
            array[j-1] = temp;


            bars[j - 1].style.height = array[j - 1] * heightFactor + "px";
            bars[j - 1].style.backgroundColor = "lightcoral";

            bars[j].style.height = array[j] * heightFactor + "px";
            bars[j].style.backgroundColor = "lightcoral";

            await sleep(20);
        }
        await sleep(20);
    }
    return array
}

async function selectionSort(array){
    let bars = document.getElementsByClassName("selection");

    for(let i = 0; i < array.length -1; i++){
        let minIndex = i;
        for(let j = i + 1; j < array.length; j++){
            if(array[j] < array[minIndex]){
                minIndex = j;              
                sleep(40)
                
            }
       }
        const temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;


        bars[minIndex].style.height = array[minIndex] * heightFactor + "px";
        bars[minIndex].style.backgroundColor = "lightcoral"; 

        sleep(40)
    }

    return array
}


sortBtn.addEventListener("click", async() =>{
    let unsort = [...unsortedArray];
    let sorted_array_bubble = bubleSort(unsort);
    sorted_array_bubble.then(d => {
        console.log(d);
        console.log("unsortedArray!: ",unsort);
        console.log("unsortedArray: ",unsortedArray);
    })
})

sortBtnInsertion.addEventListener("click", async() =>{
    let unsort = [...unsortedArray];
    let sorted_array_Insertion = InsertionSort(unsort);
    sorted_array_Insertion.then(d => {
        console.log("unsortedArray!: ",unsort);
        console.log("unsortedArray: ",unsortedArray)
    })
})

sortBtnSelection.addEventListener("click", async() =>{
    let unsort = [...unsortedArray];
    let sorted_array_Insertion = selectionSort(unsort);
    sorted_array_Insertion.then(d => {
        console.log(d);
    })
})