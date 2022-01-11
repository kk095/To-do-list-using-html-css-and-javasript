(function () {
    const inputDiv = document.querySelector(".to-do-inputs");
    const taskCount = document.querySelector("#taskCount");
    const noTasksDiv = document.querySelector(".no-tasks");
    const taskList = document.querySelector(".task-list");
    const listHeader = document.querySelector(".list-header");
    const trueStar = document.querySelector(".true-star");
    const falseStar = document.querySelector(".false-star");
    const TopToDos = document.querySelector(".top-todos");
    const toDos = document.querySelector(".todos");

    let toDoList = []

    // it is a driver function
    function main() {
        taskCount.innerHTML = `<b> ${toDoList.length} </b>`
        if (toDoList.length === 0) {
            noTasksDiv.style.display = "block";
            listHeader.style.display = "none";
            taskList.style.display = "none";
        }
        else {
            noTasksDiv.style.display = "none";
            listHeader.style.display = "block";
            taskList.style.display = "block";
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

            print();

        }

    }
    main();

   
    document.addEventListener("click", function (e) {

        if (e.target.classList[0] === "plus") {
            plusFn();
        }
        else if (e.target.id === "cancel") {
            cancelBtn();
        }
        else if (e.target.id === "submit-form") {
            create(e);
        }
        else if (e.target.type === "checkbox") {
            Update(e);
        }
        else if (e.target.classList[0] === "delete-btn") {
            destroy();
        }
        else if (e.target.classList[0] === "star") {
            starBtn(e);
        }
    })

    // this function will show the input form to add todo task
    function plusFn() {
        let x = 0;
        let interval = setInterval(() => {
            inputDiv.style.bottom = (-100 + x) + '%'
            if (x == 100) {
                listHeader.style.display = "none";
                clearInterval(interval);
            }
            x++;
        }, 5);
    }

    // this function will hide the input form
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

    // It will generate unique id of 12 characters 
    function uniqueIdGenerator() {
        const chars = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()?<>';
        let key = '';
        for (var i = 12; i > 0; i--) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }
        return key;
    }


    // This function read your inputs and make new todo task
    function create() {
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
            cancelBtn();
        }
    }


    // To update tasks that task is done or not
    function Update(e) {
        if (e.target.checked) {
            let checkedtask = toDoList.filter(task => task.id === e.target.id);
            checkedtask[0].done = true;
        }
        else {
            let checkedtask = toDoList.filter(task => task.id === e.target.id);
            checkedtask[0].done = false;
        }
        print();
    }

    // this function will delete all completed tasks
    function destroy() {
        for (let i = toDoList.length - 1; i >= 0; i--) {
            if (toDoList[i].done) {
                toDoList.splice(i, 1);
            }
        }
        main()
    }

    // this function will convert task into top task and vise versa
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


     // This function will print all the tasks
     function print() {
        trueStar.innerHTML = "";
        falseStar.innerHTML = "";
        toDoList.forEach((task) => {
            if (task.star === true) {
                let li = `
            <li>
            <div class="card">
                <div class="my-info">
                ${task.done ?
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
                <i class=" star fas fa-star" id="${task.id}"></i>
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
                   
                        ${task.done ?
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
                   <i class="star far fa-star" id="${task.id}"></i>
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
        let totalStar = toDoList.filter(list => list.star === true);
        if (totalStar.length >= 3) {
            let stars = document.querySelectorAll(".star-far");
            stars.forEach((s) => {
                s.style.display = "none";
            })
        }
    }
    
    




})();