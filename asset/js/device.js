const update_date = ()=>{
    let now = new Date();
    let time_list = now.toTimeString().split(':');
    let now_time = `${time_list[0]} : ${time_list[1]}`
    let date_list = now.toDateString().split(" ");
    let now_date = `${date_list[0]}, ${date_list[1]} ${date_list[2]}`;

    $(".main-clock-time")[0].innerText = now_time;
    $(".main-clock-date")[0].innerText = now_date;
}
