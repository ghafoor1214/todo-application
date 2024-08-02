window.addEventListener("load", () => {
    console.log(localStorage.getItem("user"));
    userData()
    if (!localStorage.getItem("user")) {
      window.location.replace("../pages/login.html");
    }
  });


  import { db, doc, getDoc , updateDoc } from "./firebase.js"
  
let prName = document.getElementById("name");
let prModel = document.getElementById("emailId");
let prColor = document.getElementById("genderUser");

let paraName = document.getElementById("paraName")
let paraModel = document.getElementById("paraEmail")
let paraColor = document.getElementById("paraGender")

const uid = localStorage.getItem("user")

console.log(uid)


const userData = async ()=>{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data()
    
    if (docSnap.exists()) {

        paraName.innerHTML = `Name : ${data.fullName}`
        paraModel.innerHTML = `Email : ${data.email}`
        paraColor.innerHTML = `Gender : ${data.gender}`
      console.log("Document data:", docSnap.data());
    } else {
    
      console.log("No such document!");
    }
}






async function update(){

    let parName = prName.value;
    let parModel = prModel.value;
    let parColor = prColor.value;

    if(parName == ""){
        alert("fill the fields!!")     
        return
    }else if(parModel == ""){
        alert("please fill the empty fields!!")
        return
    }else if(parColor == ""){
        alert("please fill the empty fields!!")
        return
    }

    const washingtonRef = doc(db, "users", uid);

await updateDoc(washingtonRef, {
  
    fullName: parName,
    email: parModel,
    gender: parColor
});

        
  
   prName.value = ""
   prModel.value = ""
   prColor.value = ""


   userData()

}

window.update = update;