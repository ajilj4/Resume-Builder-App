
let resume_user= {};
let temp={};

function getdata(user,user_data){
    if(user_data){
        if(resume_user[user_data]){
            resume_user[user_data]={...resume_user[user_data]}
        }
        else{
            resume_user[user_data]={}
        }
        resume_user[user_data][user.name]=user.value
    }
    else{
        resume_user[user.name]=user.value
    }
    display()
}

function addmultidata(name,id,tbl_id,ary_obj){
    if(ary_obj){
        console.log("ok")
        if(!resume_user[ary_obj]){
            resume_user[ary_obj]=[]
        }
        resume_user[ary_obj].push(temp)
        console.log(resume_user)
        let keys=Object.keys(temp)
        for(i=0;i<keys.length;i++){
            document.getElementById(keys[i]).value=""
        }
        temp={}
        display()
       
        document.getElementById("list_heade").innerHTML=`<tr>
        <th scope="col">level</th>
        <th scope="col">intitute</th>
        <th scope="col">precentage</th>
        <th scope="col">year</th>
        <th scope="col">delete</th>
      </tr>`

        if(ary_obj==="educational_details"){
        htmldata=""
        for(i=0;i<resume_user[ary_obj].length;i++){
            console.log(resume_user[ary_obj][i])
            htmldata=htmldata+`<table class="table table-striped"><tr id="${ary_obj[i]}">
            <td>${resume_user[ary_obj][i].level}</td>
            <td>${resume_user[ary_obj][i].institute}</td>
            <td>${resume_user[ary_obj][i].precentage}</td>
            <td>${resume_user[ary_obj][i].year}</td>
            <td><button type="button" onclick="delet('${[i]}','${ary_obj}')">x</button></td>
            </tr></table>`}
            console.log(htmldata)
            document.getElementById(tbl_id).innerHTML=htmldata}

            document.getElementById("list_headw").innerHTML=` <tr>
            <th scope="col">Work</th>
            <th scope="col">Role</th>
            <th scope="col">year</th>
            
            <th scope="col">delete</th>
          </tr>`
        if (ary_obj==="work_exp"){
            htmldata=""
        for(i=0;i<resume_user[ary_obj].length;i++){
            console.log(resume_user[ary_obj][i])
            htmldata=htmldata+`<table class="table table-striped"><tr id="${ary_obj[i]}">
            <td>${resume_user[ary_obj][i].Company}</td>
            <td>${resume_user[ary_obj][i].role}</td>
            <td>${resume_user[ary_obj][i].year}</td>
            
            <td><button type="button" onclick="delet('${[i]}','${ary_obj}')">x</button></td>
            </tr></table>`}
            console.log(htmldata)
            document.getElementById(tbl_id).innerHTML=htmldata
            const inputs=document.querySelectorAll("#Company,#role,#year")
            inputs.forEach(input =>{
                input.value=""
            })
        }
        
        
    }
    else{
        if(!resume_user[name]){
            resume_user[name]=[]
        }
        resume_user[name].push(document.getElementById(id).value)
        document.getElementById(id).value=""
        display()
        htmldata=""
        for(i=0;i<resume_user[name].length;i++){
            htmldata=htmldata+`<div id="${name[i]}"><button type="button" onclick="delet('${[i]}','${name}')" class="btn btn-primary">
            remove</button><li style="display:inline-block;padding:10px">${resume_user[name][i]}</li></div>`
        }
        console.log(htmldata)
        document.getElementById(tbl_id).innerHTML=htmldata}
}

function delet(i,name){
    
    // console.log(name)
    resume_user[name].splice(i,1)
    opt=document.getElementById(`${name[i]}`)
    opt.remove()
    display()
}

function getmultdata(item){
    temp[item.name]=item.value
}

function display(){
    document.getElementById("display").innerHTML=JSON.stringify(resume_user,undefined,2)
}

function save(){
    $.ajax({
        type:"POST",
        url:"http://agaram.academy/api/action.php",
        data:{
            request : "create_resume",
            user : "ajil",
            resume:resume_user
        },
        sucess:function(res){
            console.log("ok")
        },
        error:function(err){
            console.log(err)
        }
    })
    alert("Successfully Saved")
    window.location="list.html"
    // show_list()
}

function showlist(){
    window.location="list.html"
}

function show_list(){
    
    $.ajax({
            type:"GET",
            url:"http://agaram.academy/api/action.php",
            data:{
              request : "get_user_resume",
              user : "ajil",
            },
            success: function(res){
                let user_data=JSON.parse(res)
                console.log(user_data.data)
                
                // let jso=user_data.data[0].data
                // let jon=JSON.parse(jso)
                // console.log(jon.user_name)
                let listing="";
                let showtemp="";

                for (i=0;i<user_data.data.length;i++){
                    // var jso=JSON.parse(user_data.data[i].data)
                    // a=user_data.data[i].data
                    // console.log(a)
                // let jon=JSON.parse(jso)
                // console.log(jon.user_name)
                    console.log(user_data.data[i].id)
                    listing=listing+`<tr>
                    <td id="">${user_data.data[i].id}</td>
                    <td id="">${user_data.data[i].user}</td>
                    <td><button type="button" onclick="delett(${user_data.data[i].id})">remove</button></td>
                    <td><a href="choosetemp.html?id=${user_data.data[i].id}"><button type="button">Download</button></td>
                    </tr>`

                }
                document.getElementById("list_table").innerHTML=listing
                // document.getElementById("showtemp").innerHTML=showtemp
                // console.log(showtemp)
                
            },
            error: function(err){
                
            }
})}
                    // <td><a href="showresume.html?id=${user_data.data[i].id}">redirect</a></td>
function choosetemp(id){
    $.ajax({
        type:"GET",
        url:"http://agaram.academy/api/action.php",
        data:{
          request : "get_user_resume",
          user : "ajil",
        },
        success: function(res){
            let user_data=JSON.parse(res)
            let user=user_data.data;
            let freetemp="";
            let pretemp="";
            for (let i=0;i<user.length;i++){
                if(user[i].id===id){
                    console.log(i)
                    freetemp=freetemp +`
                    <a href="temp1.html?id=${user[i].id}"><img src="img/temp1.png" alt="img"></a>
                    <a href="temp2.html?id=${user[i].id}"><img src="img/temp2.png" alt="img"></a>
                    <a href="temp4.html?id=${user[i].id}"><img src="img/temp4.png" alt="img"></a>`
                    pretemp=pretemp+`
                    <a href="temp3.html?id=${user[i].id}"><img src="img/temp3.png" alt="img"></a>
                     <a href="temp5.html?id=${user[i].id}"><img src="img/temp5.png" alt="img"></a>
                     <a href="temp6.html?id=${user[i].id}"><img src="img/temp6.png" alt="img"></a>`
                }
            }
            $("#listfreetemp").html(freetemp);
            $("#listpretemp").html(pretemp);
        },
        error: function(err){
            console(err)
        }
    })
    
      console.log(idd)
}
// function showtemplate(i,data){
//     console.log(i)
    
//     $.ajax({
//         type:"GET",
//         url:"http://agaram.academy/api/action.php",
//         data:{
//           request : "get_user_resume",
//           user : "ajil",
//         },
//         success: function(res){
//             let user_data=JSON.parse(res)
//             let showtemp=""
//     showtemp=showtemp+`
//                 <li><a href="temp4.html?id=${user_data.data[i].id}">
//                 <img src="img/temp4.png" alt="template4" width="320px">
//             </a></li>
//                 <li><a href="temp3.html?id=${user_data.data[i].id}" >
//                 <img src="img/temp3.png" alt="template3" width="300px">
//             </a></li>
//                 <li><a href="temp2.html?id=${user_data.data[i].id}">
//                 <img src="img/temp2.png" alt="template2" width="300px">
//             </a></li>
//                 <li><a href="temp1.html?id=${user_data.data[i].id}"  >
//                 <img src="img/temp1.png" alt="template1" width="300px">
//               </a></li>
//                 <li> <a href="temp5.html?id=${user_data.data[i].id}" >
//                 <img src="img/temp5.png" alt="template5" width="300px">
//             </a></li>
//                 <li><a href="temp6.html?id=${user_data.data[i].id}" >
//                 <img src="img/temp6.png" alt="template6" width="300px">
//             </a></li>`
//             document.getElementById("choosetemp").innerHTML=showtemp
//             // let user_data=JSON.parse(res)
//             // document.getElementById("firsttemp").innerHTML= `<a href="temp4.html?id=${user_data.data[i].id}">`
            
//         },
//         error: function(err){
//             alert("error")
//         }})
    
// }

function delett(i){
    alert(i)
    $.ajax({
        type:"get",
        url:"http://agaram.academy/api/action.php",
        data:{
            request : "delete_user_resume",
            user : "ajil",
            id:i
            },
        success: function(res){
            console.log(res)
            show_list()
        } ,
        error: function(err){
            alert(err)
        }   
    })
}

// function getid(i){
    
// }

function getid(){

      const queryString = window.location.search;
      const getparam=new URLSearchParams(queryString);
      let idd=getparam.get('id')
    //   console.log(id)
      $.ajax({
        type:"get",
        url:"http://agaram.academy/api/action.php",
        data:{
            request : "get_resume_by_id",
            user : "ajil",
            id:idd
         },
        success:function (res){
            console.log(res)
            let userdisplay=JSON.parse(res);
            let conv=userdisplay.data.data;
            console.log(conv)
            let convet=JSON.parse(conv);
            console.log(convet)
            $("#ages").html(`${convet.Personal_Details.age}`);
            $("#tname").html(`${convet.user_name}`);
            $("#name").html(`${convet.user_name}`);
            $("#job").html(`${convet.user_job}`);
            $("#phone_no").html(`${convet.phone_no}`);
            $("#user_email").html(`${convet.user_email}`);
            $("#user_web").html(`${convet.user_web}`);
            $("#address").html(`${convet.address}`);
            $("#detail").html(`${convet.objective}`);
            $("#age").hide();
            $("#father_name").html(`${convet.Personal_Details.father_name}`);
            $("#fphone_no").html(`${convet.Personal_Details.father_phoneno}`);
            $("#mname").html(`${convet.Personal_Details.mother_name}`);
            $("#mphone_no").html(`${convet.Personal_Details.mother_phone}`);
            $("#gender").html(`${convet.Personal_Details.gender}`);
            // $("#dob").html(`${convet.Personal_Details.}`);
            // $("#").html(`${convet.Personal_Details.}`);
            // $("#").html(`${convet.Personal_Details.}`);
            // $("#").html(`${convet.Personal_Details.}`);
            // $("#").html(`${convet.Personal_Details.}`);
            // $("#").html(`${convet.Personal_Details.}`);
            $("#skill1").html(`${convet.skills[0]}`)
            $("#skill2").html(`${convet.skills[1]}`)
            $("#skill3").html(`${convet.skills[2]}`)
            $("#skill4").html(`${convet.skills[3]}`)
            $("#skill5").html(`${convet.skills[4]}`)
            $("#skill6").html(`${convet.skills[5]}`)
            $("#skill7").html(`${convet.skills[6]}`)
            // let list_skill="";
            // for (i=0;i<convet.skills.length;i++){
            //     list_skill=list_skill+`<li>${convet.skills[i]}</li>`
            // }
            // $("#list_skill").html(`${list_skill}`)

            let list_lang="";
            for (i=0;i<convet.Languages.length;i++){
                list_lang=list_lang+`<li>${convet.Languages[i]}</li>`
            }
            $("#list_lang").html(`${list_lang}`)
            // let list_edu=""
            // for(i=0;i<convet.educational_details.length;i++){
        if(convet.educational_details.length===2){
                $("#level1").html(`${convet.educational_details[0].level}`)
                $("#institute1").html(`${convet.educational_details[0].institute}`)
                $("#percentage1").html(`${convet.educational_details[0].precentage}`)
                $("#year1").html(`${convet.educational_details[0].year}`)

                $("#level2").html(`${convet.educational_details[1].level}`)
                $("#institute2").html(`${convet.educational_details[1].institute}`)
                $("#percentage2").html(`${convet.educational_details[1].precentage}`)
                $("#year2").html(`${convet.educational_details[1].year}`)
        }
        else if(convet.educational_details.length===3){
            $("#level1").html(`${convet.educational_details[0].level}`)
                $("#institute1").html(`${convet.educational_details[0].institute}`)
                $("#percentage1").html(`${convet.educational_details[0].precentage}`)
                $("#year1").html(`${convet.educational_details[0].year}`)

                $("#level2").html(`${convet.educational_details[1].level}`)
                $("#institute2").html(`${convet.educational_details[1].institute}`)
                $("#percentage2").html(`${convet.educational_details[1].precentage}`)
                $("#year2").html(`${convet.educational_details[1].year}`)

                 $("#level3").html(`${convet.educational_details[2].level}`)
                $("#institute3").html(`${convet.educational_details[2].institute}`)
                $("#percentage3").html(`${convet.educational_details[2].precentage}`)
                $("#year3").html(`${convet.educational_details[2].year}`)
        }
        else if(convet.educational_details.length===4){
            $("#level1").html(`${convet.educational_details[0].level}`)
                $("#institute1").html(`${convet.educational_details[0].institute}`)
                $("#percentage1").html(`${convet.educational_details[0].precentage}`)
                $("#year1").html(`${convet.educational_details[0].year}`)

                $("#level2").html(`${convet.educational_details[1].level}`)
                $("#institute2").html(`${convet.educational_details[1].institute}`)
                $("#percentage2").html(`${convet.educational_details[1].precentage}`)
                $("#year2").html(`${convet.educational_details[1].year}`)

                 $("#level3").html(`${convet.educational_details[2].level}`)
                $("#institute3").html(`${convet.educational_details[2].institute}`)
                $("#percentage3").html(`${convet.educational_details[2].precentage}`)
                $("#year3").html(`${convet.educational_details[2].year}`)

                $("#level4").html(`${convet.educational_details[3].level}`)
                $("#institute4").html(`${convet.educational_details[3].institute}`)
                $("#percentage4").html(`${convet.educational_details[3].precentage}`)
                $("#year4").html(`${convet.educational_details[3].year}`)
        }else{
            $("#level1").html(`${convet.educational_details[0].level}`)
                $("#institute1").html(`${convet.educational_details[0].institute}`)
                $("#percentage1").html(`${convet.educational_details[0].precentage}`)
                $("#year1").html(`${convet.educational_details[0].year}`)

        }
               

               
                // list_edu=list_edu+`<tr>
                // <td>${convet.educational_details[i].level}</td>
                // <td>${convet.educational_details[i].institute}</td>
                // <td>${convet.educational_details[i].percentage}</td>
                // <td>${convet.educational_details[i].year}</td></tr>`
            
            // $("#list_edu").html(`${list_edu}`)
        if(convet.work_exp.length===2){
            $("#company1").html(`${convet.work_exp[0].Company}`)
            console.log(`${convet.work_exp[0].year}`)
            $("#role1").html(`${convet.work_exp[0].role}`)
            $("#wyear1").html(`${convet.work_exp[0].year}`)

            $("#company2").html(`${convet.work_exp[1].Company}`)
            $("#role2").html(`${convet.work_exp[1].role}`)
            $("#wyear2").html(`${convet.work_exp[1].year}`)

        }
        else if(convet.work_exp.length===3){
            $("#company1").html(`${convet.work_exp[0].Company}`)
            console.log(`${convet.work_exp[0].year}`)
            $("#role1").html(`${convet.work_exp[0].role}`)
            $("#wyear1").html(`${convet.work_exp[0].year}`)

            $("#company2").html(`${convet.work_exp[1].Company}`)
            $("#role2").html(`${convet.work_exp[1].role}`)
            $("#wyear2").html(`${convet.work_exp[1].year}`)

            $("#company3").html(`${convet.work_exp[2].Company}`)
            $("#role3").html(`${convet.work_exp[2].role}`)
            $("#wyear3").html(`${convet.work_exp[2].year}`)
        }
        else{
            $("#company1").html(`${convet.work_exp[0].Company}`)
            console.log(`${convet.work_exp[0].year}`)
            $("#role1").html(`${convet.work_exp[0].role}`)
            $("#year1").html(`${convet.work_exp[0].year}`)
        }
            // let list_work=""
            // for(i=0;i<convet.work_exp.length;i++){
            //     list_work=list_work+`<tr>
            //     <td>${convet.work_exp[i].company}</td>
            //     <td>${convet.work_exp[i].role}</td>
            //     <td>${convet.work_exp[i].year}</td>
            //     </tr>`
            // }
            // $("#list_work").html(`${list_work}`)

        },
        error:function(err){
            console.log(err)
        }
})
      }

    //   success:function(a){
    //     console.log("getresume",a)let parsed_data=JSON.parse(a)
    //     console.log("parsed",parsed_data)
    //     console.log("parsed_data",parsed_data.data)
    //     let parsed_data_data=parsed_data.data.data
    //     console.log("parsed_data_data",parsed_data_data)
    //     let p=JSON.parse(parsed_data_data)
    //     console.log("name:",p.name)

// $.ajax({
//     type:"GET",
//     url:"http://agaram.academy/api/action.php",
//     data:{
//       request : "get_user_resume",
//       user : "ajil",
//     },
//     success: function(res){
//         let user_data=JSON.parse(res)
//         console.log(user_data)
//     },
//     error: function(err){

//     }
// })

function prnt(){
    $("#hidebtn").hide()
    window.print()

}
// let backpag=()=> window.history.back()
let home=()=>window.location="index.html"