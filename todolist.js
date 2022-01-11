(function () {
    const inputDiv = document.querySelector(".to-do-inputs");
    const cancel = document.querySelector("#cancel");
    const taskCount = document.querySelector("#taskCount");
    const noTasksDiv = document.querySelector(".no-tasks");
    const taskList = document.querySelector(".task-list");
    const listHeader = document.querySelector(".list-header");
    const trueStar = document.querySelector(".true-star");
    const falseStar = document.querySelector(".false-star");
    const TopToDos = document.querySelector(".top-todos");
    const toDos = document.querySelector(".todos");

    let toDoList = [
        {
            id: "454vy52g6531",
            task: "complete to do",
            date: "2021-12-7",
            tag: "home",
            star: false,
            done: false,
        },
        {
            id: "454vy52g6532",
            task: "complete to do",
            date: "2021-12-7",
            tag: "home",
            star: false,
            done: false,
        },
        {
            id: "454vy52g6533",
            task: "complete to do",
            date: "2021-12-7",
            tag: "home",
            star: false,
            done: false,
        },

    ]

    function main() {
        if (toDoList.length === 0) {
            taskCount.innerHTML = '<b>0</b>';
            noTasksDiv.style.display = "block";
            listHeader.style.display = "none";
            taskList.style.display = "none";

        }
        else {
            let totalTasks = toDoList.length;
            const topTasks = toDoList.filter(list => list.star === true);
            const normalTasks = toDoList.filter(list => list.star != true);
            if (topTasks.length === 0) {
                TopToDos.style.display = "none";
            }
            else {
                TopToDos.style.display = "block";
            }
            if (normalTasks.length === 0) {
                toDos.style.display = "none";
            }
            else {
                toDos.style.display = "block";
            }

            taskCount.innerHTML = `<b> ${totalTasks} </b>`
            noTasksDiv.style.display = "none";
            listHeader.style.display = "block";
            taskList.style.display = "block";
            print();
            let totalStar = toDoList.filter(list => list.star === true);
            if (totalStar.length >= 3) {
                let stars = document.querySelectorAll(".star-far");
                stars.forEach((s) => {
                    console.log(s);
                    s.style.display = "none";
                })
            }
        }
        const checkboxInput = document.querySelectorAll("input");
        for (let i = 0; i < checkboxInput.length - 2; i++) {
        checkboxInput[i].addEventListener("change", function (e) {
            console.log(e.target.id);
            if (this.checked) {
                let checkedtask = toDoList.filter(task => task.id === this.id);
                checkedtask[0].done = true;
            }
            else {
                let checkedtask = toDoList.filter(task => task.id === this.id);
                checkedtask[0].done = false;                   
            }
            main();
        })
    }
        console.log(toDoList);

    }
    main();


    function uniqueIdGenerator() {
        const chars = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()?<>';
        let key = '';
        for (var i = 12; i > 0; i--) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }
        return key;
    }




    // To create tasks
    function create(e) {
        const task = document.querySelector("#task").value;
        const category = document.querySelector("#categories").value;
        const date = document.querySelector("#date").value;
        if (task == "" || category == "none") {
            const errorOutput = document.querySelector(".error-output");
            errorOutput.innerHTML = "Task and Category fields can not be empty!";
            setTimeout(() => {
                errorOutput.innerHTML = "";
            }, 5000);
        }
        else {
            let obj = {}
            const id = uniqueIdGenerator();
            obj.id = id;
            obj.task = task;
            if (date == "") {
                obj.date = "No Date";
            }
            else {
                obj.date = date;
            }
            obj.tag = category;
            obj.star = false;
            obj.done = false;
            toDoList.push(obj);
            main();
            console.log(toDoList);
            cancelBtn();
        }
    }




    // To print tasks
    function print(e) {
        trueStar.innerHTML = "";
        falseStar.innerHTML = "";
        toDoList.forEach((task) => {
            if (task.star === true) {
                let li = `
            <li>
            <div class="card">
                <div class="my-info">
                ${task.done?
                    ` <div class="checkbox">
                    <input type="checkbox" name="${task.id}" id="${task.id}" checked >
                    </div>
                    <div class="task-info">
                    <label class="checkbox-checked" for="${task.id}">
                    ${task.task}</label>
                    <br>
                    <span class="task-date"><i class="fas fa-calendar-alt"></i>
                    ${task.date}
                    </span>
                    </div>` :
                    `<div class="checkbox">
                    <input type="checkbox" name="${task.id}" id="${task.id}" >
                    </div>
                    <div class="task-info">
                    <label class="checkbox" for="${task.id}">
                    ${task.task}</label>
                    <br>
                    <span class="task-date"><i class="fas fa-calendar-alt"></i>
                    ${task.date}
                    </span>
                    </div>`
                
                }
                </div>
                <i class=" star fas fa-star" id=${task.id}></i>
                <div class="tasks-category">
                    <div class="tags ${task.tag}">
                        ${task.tag}
                    </div>
                </div>
            </div>
        </li>`
                trueStar.innerHTML += li
            }
            if (task.star === false) {
                let li = `
            <li>
            <div class="card">
                <div class="my-info">
                   
                        ${task.done?
                            ` <div class="checkbox">
                                <input type="checkbox" name="${task.id}" id="${task.id}" checked >
                            </div>
                            <div class="task-info">
                                <label class="checkbox-checked" for="${task.id}">
                                ${task.task}</label>
                                <br>
                                <span class="task-date">
                                    <i class="fas fa-calendar-alt"></i>
                                    ${task.date}
                                </span>
                            </div>` :
                            `<div class="checkbox">
                            <input type="checkbox" name="${task.id}" id="${task.id}" >
                            </div>
                            <div class="task-info">
                            <label class="checkbox" for="${task.id}">
                            ${task.task}</label>
                            <br>
                            <span class="task-date"><i class="fas fa-calendar-alt"></i>
                            ${task.date}
                            </span>
                            </div>`
                        
                        }
                        
                </div>
                <div class="star-far">
                   <i class="star far fa-star" id=${task.id}></i>
                </div>
                <div class="tasks-category">
                    <div class="tags ${task.tag}">
                        ${task.tag}
                    </div>
                </div>
            </div>
        </li>`
                falseStar.innerHTML += li
            }

        })
    }

    const checkboxInput = document.querySelectorAll("input");
    for (let i = 0; i < checkboxInput.length - 2; i++) {
        checkboxInput[i].addEventListener("change", function (e) {
            console.log(e.target.id);
            if (this.checked) {
                let checkedtask = toDoList.filter(task => task.id === this.id);
                checkedtask[0].done = true;
            }
            else {
                let checkedtask = toDoList.filter(task => task.id === this.id);
                checkedtask[0].done = false;                   
            }
            main();
        })
    }

    // To update tasks
    function Update(e) {

    }

    // To delete tasks 
    function destroy(e) {

    }


    function cancelBtn() {
        let x = 0;
        document.querySelector("#task").value = "";
        document.querySelector("#categories").value = "none";
        document.querySelector("#date").value = "";
        listHeader.style.display = "block";
        let interval = setInterval((e) => {
            inputDiv.style.bottom = (0 - x) + '%'
            if (x == 100) {
                clearInterval(interval);
            }
            x++;
        }, 5);
    }


    function starBtn(e) {
        const taskId = e.target.id;
        let starTask = toDoList.filter(list => list.id === taskId);
        if (starTask[0].star === true) {
            starTask[0].star = false;
        }
        else {
            starTask[0].star = true;
        }
        main();
    };

    function deleteFn(){
        for(let i=toDoList.length-1;i>=0;i--){
            if(toDoList[i].done){
                 toDoList.splice(i,1);
            }
        }
        main()
    }


    document.addEventListener("click", function (e) {
        if (e.target.classList[0] === "plus") {
            let x = 0;
            let interval = setInterval((e) => {
                inputDiv.style.bottom = (-100 + x) + '%'
                if (x == 100) {
                    listHeader.style.display = "none";
                    clearInterval(interval);
                }
                x++;
            }, 5);
        }
        else if (e.target.id === "cancel") {
            cancelBtn();
        }
        else if (e.target.id === "submit-form") {
            create(e);
        }
        else if (e.target.classList[0] === "star") {
            starBtn(e);
        }
        else if (e.target.classList[0] === "delete-btn") {
            deleteFn();
        }
    })




})();