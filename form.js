const form = document.querySelector("form");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const website = document.getElementById("website");
const image = document.getElementById("image");
const gender = document.getElementById("female") 
const tBody = document.querySelector("tbody");
const skills = document.querySelectorAll("input[type = 'checkbox']");

let newUserdata = JSON.parse(localStorage.getItem("userData"));

function getUserData(newUserdata){
    if(newUserdata){
        for(let i=0;i<newUserdata.length; i++){
            let skillArray = newUserdata[i].skills.join(",");
            tBody.innerHTML +=  `<tr style = "background-color: ${newUserdata[i].id % 2 === 1 ? 'white' : '#E0E4CC'}">
                <td>
                     <div style = "font-weight: bold;"> ${newUserdata[i].userName} </div> 
                     <div> ${newUserdata[i].gender} </div>
                     <div> ${newUserdata[i].email} </div>
                     <div>  <a target="_blank" href="${newUserdata[i].website}">${newUserdata[i].website}</a> </div>
                     <div> ${skillArray} </div>
                </td>
                <td class="image-td">
                    <img class="image-in-table" width = "100" src="${newUserdata[i].image}" alt="user"/>
                </td>
            </tr>`
        }
    }
}

getUserData(newUserdata);

form.onsubmit = function(e){

    let skillarray = [];
    for(let i=0; i< skills.length; i++){
        if(skills[i].checked )
            skillarray[i] = skills[i].value; 
    }

    const selectedGender = gender.checked ? "Female" : "Male"

    const userData = JSON.parse(localStorage.getItem("userData"));

    let data = []

    if(userData){
        data = [ ...JSON.parse(localStorage.getItem("userData")),
            {
                id : userData[userData.length - 1].id + 1,
                userName : userName.value,
                email : email.value,
                website : website.value,
                image : image.value,
                gender : selectedGender,
                skills : skillarray
            }
        ]
    }else{
        data =  [{
            id : 1,
            userName : userName.value,
            email : email.value,
            website : website.value,
            image : image.value,
            gender : selectedGender,
            skills : skillarray
        }]
    }
    localStorage.setItem("userData", JSON.stringify(data));

    let newUserdata = JSON.parse(localStorage.getItem("userData"));
    tBody.innerHTML =  ""

    getUserData(newUserdata);
}