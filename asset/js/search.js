---
---



const set_search = (num)=>{
    var input = document.getElementById(`search${num}`);
    console.log(input)
    input.addEventListener("keyup", (event)=>{
        var result = ``
        {% for post in site.posts %}
            if(searching(event.target.value, '{{post.title}}')){
                result += `
                    <div class="document icon" id="{{post.title}}">
                        <img src="/asset/img/icons/post.png">
                        <div>{{post.title}}</div>
                    </div>
                `
            }
        {% endfor %}

        document.getElementsByClassName("folder-icons")[0].innerHTML = result;
    }, false);
}





function searching(input, word){
    var word = removeEmpty(word);
    var input = removeEmpty(input);

    for (var i = 0; i < word.length; i++){
        if(i + input.length > word.length){break;}
        if(word.slice(i, i+input.length) == input){
            return true;
        }
    }

    return false

}

function removeEmpty(word){
    var word = word.split(' ');
    var result = '';
    for(var i in word){
        result += word[i];
    }

    return result;
}