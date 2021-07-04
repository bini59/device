window.onload = ()=>{

    // up to wait screen;
    $(".index-title")[0].addEventListener("click", (e)=>{
        $(".index-title")[0].style = "transform: translateY(-100vh);"
        $(".index-main")[0].style = "transform: translateY(-100vh);"
        
    }, false)

    $(".login-btn")[0].addEventListener("click", (e)=>{
        e.target.style = "display: none;"
        e.target.nextElementSibling.style = "display: flex;"

        setTimeout(()=>{
            location.assign("/desktop")
        }, 2000)
    }, false)

    $(".logout")[0].addEventListener("click", (e)=>{
        $(".index-title")[0].style = "transform: translateY(0vh);"
        $(".index-main")[0].style = "transform: translateY(0vh);"
    }, false)

    update_date();
    setInterval(update_date, 60000);
}
