class BiniHead extends HTMLElement{
    private window:BiniWindow;

    constructor(){
        super();
    }
    connectedCallback(){
        let title = this.getAttribute("name")

        this.innerHTML = `
        <span class="windows-title">${title}</span>
        <div class="windows-control">
            <div class="windows-minimum" name="minimum">─</div>
            <div class="windows-size" name="size" data-full="false">□</div>
            <div class="windows-exit" name="close">Ｘ</div>
        </div>
        `
        
        this.window = document.getElementById(title);
        this.querySelector(".windows-control").addEventListener("click", (event)=>this.control_click(event), false);
    }
    control_click(event:Event){
        if(event.target.getAttribute("name")){
            switch (event.target.getAttribute("name")) {
                case "size":
                    if(event.target.getAttribute("data-full") === "false"){
                        this.fullscreen();
                        event.target.setAttribute("data-full", "true")
                    }
                    else{
                        this.reducescreen();
                        event.target.setAttribute("data-full", "false")
                    }
                    break;
                case "close":
                    this.exit();
                default:
                    break;
            }
        }
    }

    exit(){
        this.window.remove();
    }
    fullscreen(){
        this.window.style.width = "100%";
        this.window.style.height = "calc(100% - 3rem)";
        this.window.style.left = "0";
        this.window.style.top = "0";
    }
    reducescreen(){
        this.window.style.width = "35rem";
        this.window.style.height = "22rem";
    }
    
}

class BiniWindow extends HTMLElement{
    static position:Array<number>;
    static z_index:number;

    constructor(){
        super();
    }
    connectedCallback() {
        // browser calls this method when the element is added to the document
        // (can be called many times if an element is repeatedly added/removed)

        this.setAttribute("draggable", "true");
        this.setAttribute("ondragstart", "dragstart(event)");
        this.setAttribute("onmousedown", "uproot(event)");
        this.style.left = `${BiniWindow.position[0]}px`
        this.style.top = `${BiniWindow.position[1]}px`
        this.style.zIndex = `${BiniWindow.z_index}`

        BiniWindow.position[0] += 50;
        BiniWindow.position[1] += 50;
        BiniWindow.z_index += 1;

        let id = this.getAttribute("id")
        this.innerHTML = `
            <bini-windowhead name="${id}"></bini-windowHead>
        `

        this.onclick = (event)=>{
            this.style.zIndex = `${BiniWindow.z_index++}`;
        }
    }

    disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
    }

    static get observedAttributes() {
        return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name:string, oldValue:any, newValue:any) {
    // called when one of attributes listed above is modified
    }

}