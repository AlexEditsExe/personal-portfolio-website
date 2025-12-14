const nav = document.getElementsByTagName("nav")[0];
const navBlur = document.querySelector(".navBlur");
const navBtn = document.querySelector(".showNavBtn");
const cancelNav = document.querySelector(".cancelNav");
const projects = document.querySelector(".projectsContainer");
const projectsList = [
    {
        imgUrl: "/images/project_thumbnails/OnlineCarRentalSystem.webp",
        title: "Online Car Rental System",
        frontEnd: "HTML5, CSS3",
        backEnd: "Javascript, PHP",
        status: "Complete"
    },
    {
        imgUrl: "/images/project_thumbnails/InventoryManagementSystem.webp",
        title: "Inventory Management System",
        frontEnd: "Java",
        backEnd: "Java, MySQL",
        status: "Complete"
    },
    {
        imgUrl: "/images/project_thumbnails/OnlineKaraoke.webp",
        title: "Online Karaoke",
        frontEnd: "HTML5, CSS3",
        backEnd: "Javascript, PHP",
        status: "Complete"
    },
    {
        imgUrl: "/images/project_thumbnails/DiscordBOT.webp",
        title: "Discord Bot",
        frontEnd: "N/A",
        backEnd: "Javascript",
        status: "Ongoing"
    }
]

// Togglr dropdown navigation for small screens
function toggleNav(){
    nav.classList.toggle("active");
    navBlur.classList.toggle("active");
    navBtn.classList.toggle("active");
    cancelNav.classList.toggle("active");

    navBtn.style.filter = "blur(2px)";
    if(navBtn.classList.contains("active")){
        navBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    }else{
        navBtn.innerHTML = "<i class='fa-solid fa-bars'></i>";
    }
    setTimeout(() => navBtn.style.filter = "", 100);
}

// Provides scroll functionality for bigger screens
function scrollProjects(direction){
    const scrollWidth = projects.scrollWidth;
    let scrollValue = projects.scrollLeft;
    
    if(direction == "right"){
        scrollValue = projects.scrollLeft > scrollWidth ? scrollWidth : scrollValue + 500 ;
    }else{
        scrollValue = projects.scrollLeft < 0 ? 0  : scrollValue - 500;
    }

    projects.scrollTo({
        top: 0,
        left: scrollValue,
        behavior: "smooth",
    });
}

function verifyForm(event){
    const name = document.getElementById("name");
    const message = document.getElementById("message");
    const errorMessage = document.getElementById("errorMessage");
    let  errors = 0;
    
    // Will not submit form when error occurs
    if(name.value.trim() == "" || !(/^[a-zA-Z]+$/.test(name.value.trim()))){
        event.preventDefault();
        name.style.border = "1px solid red";
        errorMessage.innerText = "INVALID INPUT (NAME CANNOT CONTAIN NUMBERS AND SPECIAL CHARACTERS)";
        errorMessage.style.display = "block";
        errors++;
        resetMessage();
    }
    
    // Will not submit form when error occurs
    if(message.value.trim() == ""){
        event.preventDefault();
        message.style.border = "1px solid red";
        errorMessage.style.display = "block";
        errors++;
        resetMessage();
    }

    // If no errors occured display loader for submit button
    if(errors == 0){
        document.querySelector(".pppp").style.display = "none";
        document.querySelector(".loader").style.display = "block";
    }

    // Reset error messages
    function resetMessage(){
        setTimeout(() => {
            name.style.border = "none";
            message.style.border = "none";
            errorMessage.style.display = "none";
            errorMessage.innerText = "PLEASE FILL ALL FIELDS";
        }, 2500);
    }
}

// Display Projects
projectsList.forEach((project, index) => {
    const projectEl = document.createElement("span");
    projectEl.innerHTML = `
        <div>
            <img src="${project.imgUrl}" alt="Project${index}">
            <h3>${project.title}</h3>
            <article>
                <p>FrontEnd: ${project.frontEnd}</p>
                <p>BackEnd: ${project.backEnd}</p>
                <p>Status: ${project.status}</p>
            </article>
        </div>
    `;

    projects.appendChild(projectEl);
});


const homeBtn = document.querySelector(".homeBtn");
const aboutBtn = document.querySelector(".aboutBtn");
const projectsBtn = document.querySelector(".projectsBtn");
const main = document.getElementsByTagName("main")[0];
main.addEventListener('scrollend', () => { // Detects Scrolling
    const scrollHeight = main.scrollHeight;
    const homePos = Math.abs(document.getElementById("home").getBoundingClientRect().top);

    if(homePos - (scrollHeight / 4) < -100){ // Determine Current Visible Page
        resetIndicator("home");
    }else if((homePos - (scrollHeight / 4)) < (scrollHeight / 4) && ((scrollHeight / 4) - 100) > (homePos - (scrollHeight / 4))){
        resetIndicator("about");
    }else if((homePos - (scrollHeight / 4)) < ((scrollHeight / 4) * 2) && ((scrollHeight / 4) - 100) > (homePos - ((scrollHeight / 4) * 2))){
        resetIndicator("projects");
    }else if((homePos - (scrollHeight / 4)) < ((scrollHeight / 4) * 3) && ((scrollHeight / 4) - 100) > (homePos - ((scrollHeight / 4) * 3))){
        resetIndicator("contact");
    }
});

// Navigation Indicators | Will use color #FFF for the navigation buttons when the page is right
homeBtn.style.color = "#FFF";
function resetIndicator(nav){
    homeBtn.style.color = "";
    aboutBtn.style.color = "";
    projectsBtn.style.color = "";

    if(nav == "home"){
        homeBtn.style.color = "#FFF";
    }else if(nav == "about"){
        aboutBtn.style.color = "#FFF";
    }else if(nav == "projects"){
        projectsBtn.style.color = "#FFF";
    }
}