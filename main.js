let form=document.getElementById("form");

function formValidation(){
let Name=document.getElementById("name").value;
let Email=document.getElementById("email").value;
let Age=document.getElementById("age").value;
let Degree=document.getElementById("degree").value;
let gpa=document.getElementById("gpa").value;
    if(Name==""){
        alert("name is required");
        return false;
    }
    if(Email==""){
        alert("Email is required");
        return false;
    }
    else if(!Email.includes("@")){
        alert(" Invalid email address");
        return false;
    }
    if(Age==""){
        alert("Age is required");
        return false;
    }
    else if(Age<1){
        alert("Age must not be Zero or less than Zero");
        return false;
    }
    if(Degree==""){
        alert("Degree is required");
        return false;
    }
    if(gpa==""){
        alert("gpa is required");
        return false;
    }

}
function showData(){
    var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[]
    }else{
        studentList=JSON.parse(localStorage.getItem("studentList"))
    }
    var html="";
    studentList.forEach(function(element,index){
        html+="<tr>";
        html+="<td>"+element.Name+"</td>";
        html+="<td>"+element.Email+"</td>";
        html+="<td>"+element.gpa+"</td>";
        html+="<td>"+element.Age+"</td>";
        html+="<td>"+element.Degree+"</td>";
        html+='<td><button onclick="deleteData('+index+')"class="btn1">Delete</button><button onclick="updateData('+index+')"class="btn1">Edit</button></td>';
        html+="</tr>"
    })
    document.querySelector("#crudTable tbody").innerHTML=html;
}
//load all data
document.onload=showData();
function AddData(){
let Name=document.getElementById("name").value;
let Email=document.getElementById("email").value;
let Age=document.getElementById("age").value;
let Degree=document.getElementById("degree").value;
let gpa=document.getElementById("gpa").value;
var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[]
    }else{
        studentList=JSON.parse(localStorage.getItem("studentList"))
    }
    studentList.push({
        Name:Name,
        Age:Age,
        gpa:gpa,
        Degree:Degree,
        Email:Email,
    })
    localStorage.setItem("studentList",JSON.stringify(studentList));
    showData();
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("age").value="";
    document.getElementById("degree").value="";
    document.getElementById("gpa").value="";

}
function deleteData(index){
    var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[]
    }else{
        studentList=JSON.parse(localStorage.getItem("studentList"))
    }
    studentList.splice(index,1);
    localStorage.setItem("studentList",JSON.stringify(studentList));
    showData();
}
function updateData(index){
    document.getElementById("submit").style.display="none";
    document.getElementById("update").style.display="block";
    var studentList;
    if(localStorage.getItem("studentList")==null){
        studentList=[]
    }else{
        studentList=JSON.parse(localStorage.getItem("studentList"))
    }
    document.getElementById("name").value=studentList[index].Name;
    
    document.getElementById("email").value=studentList[index].Email;
    document.getElementById("age").value=studentList[index].Age;
    document.getElementById("degree").value=studentList[index].Degree;
    document.getElementById("gpa").value=studentList[index].gpa;
    
    document.querySelector("#update").onclick=function(){
        if(formValidation()==true){
         studentList[index].Name=document.getElementById("name").value
         studentList[index].Email=document.getElementById("email").value
         studentList[index].Age=document.getElementById("age").value
         studentList[index].Degree=document.getElementById("degree").value
         studentList[index].gpa=document.getElementById("gpa").value

         localStorage.setItem("studentList",JSON.stringify(studentList));
         showData();
         document.getElementById("name").value="";
          document.getElementById("email").value="";
          document.getElementById("age").value="";
          document.getElementById("degree").value="";
          document.getElementById("gpa").value="";
          document.getElementById("submit").style.display="block";
          document.getElementById("update").style.display="none";
        }
    }
}

function searchFun(){
    let filter=document.getElementById("search").value.toUppercase();

    let myTable=document.getElementById("crudTable");
    let tr=myTable.getElementsByTagName("tr");
    for(let i=0;i<tr.length;i++){
        let td=tr[i].getElementsByTagName("td")[0];
        if(td){
            let textvalue=td.textContent;
            if(textvalue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display="";
            }else{
                tr[i].style.display="none";
            }
        }
    }
}