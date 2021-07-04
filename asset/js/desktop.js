---
---

let position = [60, 40]
let z_index = 5;
let search_num = 0

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
                    <div class="folder sidebar-menu" onclick="float_folder(event)" id="category">Category</div>
                    <div class="folder sidebar-menu" onclick="load_search(event)" id="saerch">Search</div>
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
    position[0] += 30;position[1] += 30;z_index+=1;
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

    {% for category in site.category %}
        if(id == "{{category[0]}}"){
            {% for item in category %}
                if ("{{item}}" != "{{category[0]}}"){
                    folders += `
                    <div class="folder icon" id="{{item}}" onclick="load_posts(event)">
                        <img src="/asset/img/icons/category.png">
                        <div>{{item}}</div>
                    </div>
                    `
                }
            {% endfor %}
        }
    {% endfor %}
    folders += '</div>'

    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "windows-contents"){
            event.path[i].innerHTML = folders;
    }
    } 
}

const float_folder_sub = (event)=>{
    let id;
    
    for(var i = 0; i < event.path.length; i ++){
        if(event.path[i].classList && event.path[i].classList[0] == "folder"){
            id = event.path[i].id;
        }
    } 
    let categories = `
        <div class="icons">

    `
    {% for category in site.category %}
        if(id == "{{category[0]}}"){
            {% for item in category %}
                if ("{{item}}" != "{{category[0]}}"){

                    categories += `
                    <div class="folder icon" id="{{item}}" onclick="load_posts(event)">
                        <img src="/asset/img/icons/category.png">
                        <div>{{item}}</div>
                    </div>
                    `
                }
            {% endfor %}
        }
    {% endfor %}

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
                    <div class="folder sidebar-menu" onclick="float_folder(event)" id="category">Category</div>
                    <div class="folder sidebar-menu" onclick="load_search(event)" id="saerch">Search</div>
                </div>
            </section>
            <section class="windows-contents">
                ${categories}
                </div>
            </section>
        </section>
    </div>
    `
    position[0] += 30;position[1] += 30;z_index+=1;
    $(".container")[0].innerHTML += folder;
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



// search folder
const load_search = (event)=>{
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
                    <div class="folder sidebar-menu" onclick="float_folder(event)" id="category">Category</div>
                    <div class="folder sidebar-menu" onclick="load_search(event)" id="saerch">Search</div>
                </div>
            </section>
            <section class="windows-contents">
                <input class="input_search" id='search${search_num}' type='text'>
                <div class="icons folder-icons">
                
                </div>
            </section>
        </section>
    </div>
    `

    position[0] += 30;position[1] += 30;z_index+=1;
    $(".container")[0].innerHTML += folder;
    
    set_search(search_num);
    search_num += 1;
    
    
}