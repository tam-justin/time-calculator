const input = document.querySelector("#time-input")
const addTimeButton = document.querySelector("#time-submit");

let times = [];

function validateInput(inp){
    if(inp.length != 8){
        return false;
    }
    let timeArr = inp.split(":");
    for(let i = 0; i < timeArr.length; i++){
        if(i == 0){
            
        }
    }
}

addTimeButton.addEventListener("click", () => {
    const temp = input.value;
    if(validateInput(temp)){
        times.push(temp);
    }
})