(function(){
const plusBtn = document.querySelector(".plus");
const inputDiv = document.querySelector(".to-do-inputs");
const cancel =  document.querySelector("#cancel");
const taskCount = document.querySelector("#taskCount");
const noTasksDiv = document.querySelector(".no-tasks");

let toDoList = [
    // {
    //     id:"454vy52g6537",
    //     task:"complete to do",
    //     date:"2021-12-7",
    //     tag:"home",
    //     star:false,
    //     done:false,
    // }
]

function main(){
    if(toDoList.length===0){
        taskCount.innerHTML= '<b>0</b>';
        noTasksDiv.style.display = "block";

    }
    else{
        let totalTasks = toDoList.length;
        taskCount.innerHTML= `<b> ${totalTasks} </b>`
        noTasksDiv.style.display = "none";
    }

}
main();





// To create tasks
function create(e){

}

// To print tasks
function print(e){

}


// To update tasks
function Update(e){

}

// To delete tasks 
function destroy(e){

}


document.addEventListener("click",function(e){
    console.log(e.target.classList[0]);
    if(e.target.classList[0]==="plus"){
        let x= 0;
        let interval = setInterval((e) => {
            inputDiv.style.bottom = (-100+x) +'%'
            if(x==100){
                clearInterval(interval);
            }
            x++;
        }, 5);
    }
    else if(e.target.id==="cancel"){
        let x= 0;
        let interval = setInterval((e) => {
            inputDiv.style.bottom = (0-x) +'%'
            if(x==100){
                clearInterval(interval);
            }
            x++;
        }, 5);
    }
})




})();