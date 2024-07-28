let inputBar = document.querySelector("input");
let addBtn = document.querySelector("button");
let cont = document.querySelector(".cont");

let taskArray =[];
let olderTask = localStorage.getItem("task")

addBtn.addEventListener("click", function (){
let value = inputBar.value;
inputBar.value = "";
if (olderTask){
    let parsedArray = JSON.parse(olderTask);
    taskArray = [...parsedArray];
    ticketAddertoUI(taskArray);
}

if (value.length == 0) return;


let taskObj = {
    id: Date.now(),
    task: value
}
taskArray.push(taskObj);

ticketAddertoUI(taskArray);
localStorage.setItem("task", JSON.stringify(taskArray))

});

function ticketAddertoUI(arr){

    cont.innerHTML = "";

    arr.forEach(function(taskObj){

        let id = taskObj.id;
    let taskEle = document.createElement("div");
    taskEle.classList.add("task");
    taskEle.innerHTML = `<p>${taskObj.task}</p>
                    <div class="dlt">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg>
                </div>`;
    
    
                let dltIcon = taskEle.querySelector(".dlt");
                dltIcon.addEventListener("click", function(){
                    cont.removeChild(taskEle);
                     
                    let filteredTaskArray = taskArray.filter(function(taskObj){
                        return taskObj.id != id;
                    })
                    taskArray= filteredTaskArray;
                    localStorage.setItem("task", JSON.stringify(taskArray))

                });
                cont.appendChild(taskEle);

    })

    
}


