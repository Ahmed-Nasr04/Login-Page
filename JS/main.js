var loginPage = document.querySelector("#LoginPage") ; 
var registerPage = document.querySelector("#registerPage") ; 

var register = document.querySelector("#register") ;
var login = document.querySelector("#Login"); 

var userLogin = document.querySelector("#userNameLogin"); 
var passwordLogin = document.querySelector("#passwordLogin"); 

var loginbtn = document.querySelector("#loginbtn") ; 

var userNameRegister = document.querySelector("#userNameRegister") ;
var userEmailRegister = document.querySelector("#userEmailRegister") ;
var passwordRegister = document.querySelector("#passwordRegister") ;

var signUpbtn = document.querySelector("#signUp") ; 

var mainPage = document.querySelector("main") ; 

var logOut = document.querySelector("#logOut") ; 

var allUsers = [] ; 

if(localStorage.getItem("user")){
    allUsers = JSON.parse(localStorage.getItem("user"))
}

function checkLogin(){

    for ( var i =0 ; i < allUsers.length ; i++ ){

        if ( allUsers[i].email == userLogin.value && allUsers[i].password == passwordLogin.value){
            return displayHomePage(i); 
        }
    }

    return document.querySelector("#alert").classList.replace( "d-none","d-auto");
}

function signUp(){
    var user = {
        name : userNameRegister.value , 
        email : userEmailRegister.value , 
        password : passwordRegister.value, 
    }
    
    if(isEmailExist() == false ){
     document.querySelector("#alertRegister").classList.replace("d-none" , "d-auto") ; 
     document.querySelector("#alertRegister").innerHTML = `The Email or Password already exists` ; 
     restartRegister(); 
    }
    else if( !passwordRegister.value.length <= 8 && !emailCheck(userEmailRegister.value) ){
        document.querySelector("#alertRegister").classList.replace("d-none" , "d-auto") ; 
        document.querySelector("#alertRegister").innerHTML = `Check Email or Password`
    }
    else{
        allUsers.push(user) ; 
        localStorage.setItem("user" , JSON.stringify(allUsers)) ; 
        restartRegister() ;
        displayLoginPage() ;
    }
    
}

function emailCheck(email){
    var regualr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ; 

    return regualr.test(email) ; 
}

function isEmailExist() {
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email == userEmailRegister.value || allUsers[i].name == userEmailRegister.value) {
            return false
        }
    }
}

function restartRegister(){
    userNameRegister.value = null
    userEmailRegister.value = null
    passwordRegister.value = null

}

function displayHomePage(i){
    document.querySelector("section").classList.replace("d-auto" , "d-none") ; 
    mainPage.classList.replace("d-none" , "d-auto") ; 
    document.querySelector("#homePage").innerHTML = ` <div class="special"> Wellcom ${allUsers[i].name}</div>`
    console.log(true);
}



// Events 

logOut.addEventListener("click" , function(){
    document.querySelector("section").classList.replace( "d-none","d-auto" ) ; 
    mainPage.classList.replace( "d-auto","d-none" ) ; 
    document.querySelector("#alert").classList.replace( "d-auto","d-none") ; 
    userLogin.value = null ; 
    passwordLogin.value = null ; 

})
register.addEventListener("click" , function(){
    displayRegisterPage() ; 
    userLogin.value = null ; 
    passwordLogin.value = null ; 
}) ; 

function displayRegisterPage(){
    loginPage.classList.replace("d-auto" , "d-none") ; 
    registerPage.classList.replace("d-none" , "d-auto") ; 
    document.querySelector("#alert").classList.replace( "d-auto" ,"d-none") ;
}
login.addEventListener("click" , function(){
    displayLoginPage()

}) ; 

function displayLoginPage(){
    registerPage.classList.add("d-auto" , "d-none") ; 
    loginPage.classList.replace("d-none" , "d-auto") ; 
    document.querySelector("#alertRegister").classList.replace( "d-auto" , "d-none") ; 
}
loginbtn.addEventListener('click' , function(){checkLogin()}) ; 

signUpbtn.addEventListener("click" , function(){signUp()})
