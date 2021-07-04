---
---

let popup_toggle = true;
update_date()

setInterval(update_date, 60000);

$(".profile")[0].addEventListener("click", ()=>{
    location.assign("https://github.com/{{ site.github_username }}");
})
$(".logout")[0].addEventListener("click", ()=>{
    $(".signout-screen")[0].style="display:flex;";
    
    setTimeout(()=>location.assign("/"), 2000);
})

$(".container")[0].addEventListener("click", ()=>{
    $(".popup-menu")[0].style="transform:translateY(0rem);"
    popup_toggle = true;
})

$(".menu-icon")[0].addEventListener("click", ()=>{
    if(popup_toggle)
    $(".popup-menu")[0].style="transform:translateY(-20rem);" 
    else
    $(".popup-menu")[0].style="transform:translateY(0rem);"
    popup_toggle = !popup_toggle;
})