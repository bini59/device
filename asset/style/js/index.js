const update_date = ()=>{
    let now = new Date();
    let time_list = now.toTimeString().split(':');
    let now_time = `${time_list[0]} : ${time_list[1]}`
    let date_list = now.toDateString().split(" ");
    let now_date = `${date_list[0]}, ${date_list[1]} ${date_list[2]}`;

    $(".main-clock-time")[0].innerText = now_time;
    $(".main-clock-date")[0].innerText = now_date;
}


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
    setInterval(update_date, 1000);
}
