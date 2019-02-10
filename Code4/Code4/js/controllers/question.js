window.addEventListener("load",init);

const fn = initCount();
const loadCount = ()=>document.querySelector("#id").innerText=fn();

function init(){
    loadCount();
    var div = document.querySelector("#sortDiv");
    div.className = "hide";
    displayCount();
    bindEvents();
}
const deleteRecords=()=>
    printRecords(questionOperations.deleteRecords());
   

function printRecords(questions){
    document.querySelector("#questions").innerHTML = "";
    questions.forEach(question=>print(question));
    displayCount();
}
function showHide(){
    var div = document.querySelector("#sortDiv");
    div.classList.toggle("hide");
}
function doSort(){
   var sortBy = this.value; 
   printRecords(questionOperations.sort(sortBy,'A'));
}
function bindEvents(){
    document.querySelector("#sortby").addEventListener("change",doSort);
    document.querySelector("#sort").addEventListener("click",showHide);
    document.querySelector("#add").addEventListener("click",addQuestion);
    document.querySelector("#delete").addEventListener("click",deleteRecords);
}

function toggleMark(){
    var questionId = this.getAttribute("qid");
    console.log("Mark Toggle Call ",this.getAttribute("qid"));
    console.log("This is ",this);
    var tr = this.parentNode.parentNode;
    //tr.className = 'alert-danger';
    tr.classList.toggle("alert-danger");
    questionOperations.mark(questionId);
    displayCount();

}

function edit(){
    console.log("Edit Call")
}

function createIcon(className,fn,id){
    var i = document.createElement("i");
    i.addEventListener("click",fn);
    i.className = className;
    i.setAttribute("qid",id);
    return i;
    // <i qid=1 onClick="toggleMark()"" class="fas fa-trash-alt"></i> // this
    // <i class="fas fa-edit"></i>

}
function displayCount(){
document.querySelector("#total").innerText = questionOperations.questions.length;
document.querySelector("#mark").innerText = questionOperations.markCount();
document.querySelector("#unmark").innerText = questionOperations.unMarkCount();
}


function print(question){
    var index = 0;
    var tbody = document.querySelector("#questions");
    var tr = tbody.insertRow();
    for(let key in question){
        if(key=='markForDelete'){
            continue;
        }
        tr.insertCell(index).innerText = question[key];
        index++;
    }
   var td =  tr.insertCell(index);
   td.appendChild(createIcon('fas fa-trash-alt mr-2',toggleMark,question.id));
   td.appendChild(createIcon('fas fa-edit',edit,question.id));
}

function addQuestion(){
    var questionObject = new Question();
    for(let key in questionObject){
        if(key=='markForDelete'){
            continue;
        }
        if(key=='id'){
            questionObject[key] =  document.querySelector("#"+key).innerText ; 
            continue;
        }
       questionObject[key] =  document.querySelector("#"+key).value ;
       console.log("After Add ",questionObject);
      
    }
    loadCount();
    questionOperations.add(questionObject);
    print(questionObject);
    displayCount();
   // var id = document.querySelector("#id").value;
    //var name = document.querySelector("#name").value;
}
function unHook(){
    document.querySelector("#add").removeEventListener("click");
}