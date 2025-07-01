const input = document.querySelector("#time-input")
const addTimeButton = document.querySelector("#time-submit");
const timeDisplay = document.querySelector(".time-hours");
const daysDisplay = document.querySelector(".time-days");
const timeList = document.querySelector(".list");

let times = [];

function displayTime(){    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    for(let i = 0; i < times.length; i++){
        const timeArr = times[i].time.split(":");
        for(let j = 0; j < timeArr.length; j++){
            const time = parseInt(timeArr[j]);
            if(j == 0){
                hours += time;
            }else if(j == 1){
                minutes += time;
            }else if(j == 2){
                seconds += time;
            }
        }
    }

    //Convert Seconds
    if(seconds > 59){
        minutes += (Math.floor(seconds / 60));
        seconds = seconds % 60;
    }
    
    //Convert Minutes
    if(minutes > 59){
        hours += (Math.floor(minutes / 60));
        minutes = minutes % 60;
    }

    timeDisplay.innerHTML = `${hours}:${(minutes < 10 ? `0${minutes}` : `${minutes}`)}:${(seconds < 10 ? `0${seconds}` : `${seconds}`)}`
    
    if(hours > 23){
        daysDisplay.innerHTML = `${Math.floor(hours / 24)} Days`
    }
}

function validateInput(inp){
    if(inp.length != 8){
        input.style.border = "2px solid red";
        return false;
    }

    let timeArr = inp.split(":");
    
    for(let i = 0; i < timeArr.length; i++){
        const num = parseInt(timeArr[i]);
        if(i == 1){
            if(num < 0 || num > 60){
                input.style.border = "2px solid red";
                return false;
            }
        }else if(i == 2){
            if(num < 0 ||  num > 60){
                input.style.border = "2px solid red";
                return false;
            }
        }
    }
    input.style.border = "2px solid black";
    return true;
}

function Entry(time){
    this.time = time;
    this.id = crypto.randomUUID();
}

function updateList(){
    timeList.innerHTML = "";
    for(let i = 0; i < times.length; i++){
        let tmp = times[i];

        const entry = document.createElement("div");
        entry.classList.add("entry");

        const time = document.createElement("div");
        time.classList.add("time");
        time.innerHTML = tmp.time;

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.type = "button";
        removeButton.innerHTML = "&times;";
        
        entry.appendChild(time);
        entry.appendChild(removeButton);
        entry.id = tmp.id;

        timeList.appendChild(entry);

        entry.addEventListener("click", removeTime)
    }
}

addTimeButton.addEventListener("click", () => {
    const temp = input.value;
    if(validateInput(temp)){
        let tmp = new Entry(temp);
        times.push(tmp);
        updateList();
        displayTime();
    }
    input.value = "";
})

function removeTime(event){
    if(event.target.classList == "remove-button"){
        const entry = event.currentTarget;
        times = times.filter(otherEntry => otherEntry.id !== entry.id);
        entry.remove();
        displayTime();
    }
}