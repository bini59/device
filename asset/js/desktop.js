---
---

let position = [60, 40]
let z_index = 5;

window.onload = ()=>{
    $("#github")[0].addEventListener("click", ()=>{
        let name = $("#github")[0].attributes.name.value;
        location.assign(`https://github.com/${name}`);
    })
}


// show clicked window 
const uproot = (event)=>{

    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[1] == "windows"){
            event.path[i].style.zIndex = z_index;
            z_index += 1;
        }
    }
}



// windows header
// close the window
const exit = (event)=>{
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[1] == "windows"){
            event.path[i].remove()
        }
    } 
}
// fullscreen
const full_screen = (event)=>{
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[1] == "windows"){
            event.path[i].style.width = "100%"
            event.path[i].style.height = `${window.innerHeight-48}px`
            event.path[i].style.left = "0"
            event.path[i].style.top = "0"
        }
    }
}


// drag 
const dragstart = (event)=>{
    posX = event.pageX;
    posY = event.pageY;
    distX = event.srcElement.offsetLeft - posX;
    distY = event.srcElement.offsetTop - posY;
    dragged = event.target;
}

const dragover = (event)=>{
    event.stopPropagation();
    event.preventDefault();
}

const drop = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    posX = event.pageX;
    posY = event.pageY;    

    let left = `${posX + distX}px`;
    let top = `${posY + distY}px`;
    dragged.style.left = `${left}`;
    dragged.style.top = `${top}`;
}

// open the window(category folder, search folder)
const float_folder = (event)=>{
    let id;
    
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "folder"){
            id = event.path[i].id;
        }
    } 
    let folder = `
    <div class="file-explorer windows" style="left:${position[0]}px;top:${position[1]}px;z-index:${z_index}" draggable="true" ondragstart="dragstart(event)" onmousedown="uproot(event)">
        <section class="windows-head">
            <span class="windows-title">${id}</span>
            <div class="windows-control">
                <div class="windows-minimum">─</div>
                <div class="windows-size" onclick="full_screen(event)">□</div>
                <div class="windows-exit" onclick="exit(event)">Ｘ</div>
            </div>
        </section>
        <section class="windows-container">
            <section class="windows-sidebar">
                <div class="windows-sidelist">
                    <span>Category</span>
                    <span>Search</span>
                </div>
            </section>
            <section class="windows-contents">
                <div class="icons">
                {% for category in site.category %}
                    <div class="folder icon" id="{{category[0]}}" onclick="sub_category(event)">
                        <img src="/asset/img/icons/category.png">
                        <div>{{category[0]}}</div>
                    </div>
                {% endfor %}
                </div>
            </section>
        </section>
    </div>
    `
    position[0] += 10;position[1] += 10;z_index+=1;
    $(".container")[0].innerHTML += folder;
}

const sub_category = (event)=>{
    let id;
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "folder"){
            id = event.path[i].id;
        }
    } 

    let folders = `<div class="icons">`

    let category_str = '{% for category in site.category %}{% for item in category %}{{item}},{% endfor %} {% endfor %}';
    let category = category_str.split(" ");
    for(var i = 0; i < category.length; i++){
        category[i] = category[i].split(",");
        if (category[i][0] == id){
            for(var j = 1; j < category[i].length-1; j++){
                folders += `
                <div class="folder icon" id="${category[i][j]}" onclick="load_posts(event)">
                    <img src="/asset/img/icons/category.png">
                    <div>${category[i][j]}</div>
                </div>
                `
            }
        }
    }
    folders += '</div>'

    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "windows-contents"){
            event.path[i].innerHTML = folders;
        }
    } 
}

const load_posts = (event)=>{
    let id;
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "folder"){
            id = event.path[i].id;
        }
    } 
    let icons = "<div class='icons'>"
    {% for category in site.category %}
        {% for item in category %}
            if(id == "{{item}}"){
                {% for post in site.posts %}
                    {% for category in post.categories %}
                        if("{{category}}" == id){
                            icons += `
                            <div class="document icon" id="{{post.title}}">
                                <img src="/asset/img/icons/post.png">
                                <div>{{post.title}}</div>
                            </div>
                            `
                        }
                    {% endfor %}
                {% endfor %}
            }
        {% endfor %} 
    {% endfor %}

    icons += '</div>'

    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "windows-contents"){
            event.path[i].innerHTML = icons;
        }
    } 
}


// toggle category list
const toggle_sub = (event)=>{
    let target = event.srcElement.dataset.target;
    if($(`.${target}`)[0].ariaExpanded === "false"){
        let height = $(`.${target}`)[0].children[0].children.length * 20;
        // $(`.${target}`)[0].style.display = "block"
        $(`.${target}`)[0].style.height = `${height}px`;
        // $(`.${target}`)[0].ariaExpanded = "true"
    }
    if($(`.${target}`)[0].ariaExpanded === "true"){
        let height = $(`.${target}`)[0].children[0].children.length * 20;
        // $(`.${target}`)[0].style.display = ""
        $(`.${target}`)[0].style.height = `0px`;
        $(`.${target}`)[0].ariaExpanded = "false"
    }
}