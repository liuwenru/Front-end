const PROPERTY_SYMBOL=Symbol("property");
const ATTRIBUTE_SYMBOL=Symbol("attribute");
const EVENT_SYMBOL=Symbol("event");
const STATE_SYMBOL=Symbol("state");
class Carousel{
    constructor(config){
        this[PROPERTY_SYMBOL]=Object.create(null);
        this[ATTRIBUTE_SYMBOL]=Object.create(null);
        this[EVENT_SYMBOL]=Object.create(null);
        this[STATE_SYMBOL]=Object.create(null);
        this.created();
    }
    log(){
        console.log("width:", this.width);
        console.log("..................");
    }
    get width(){
        return this[PROPERTY_SYMBOL].width
    }
    set width(value){
        return this[PROPERTY_SYMBOL].width=value;
    }
    getAttribute(name){
        if(name=="width"){
            this.width=value;
        }
    }
    addEvent(type,listener){
        if(!this[EVENT_SYMBOL][type]){
            this[EVENT_SYMBOL][type]=new Set;
        }
        this[EVENT_SYMBOL][type].add(listener);
    }
    setAttribute(name,value){
        if(name=="width"){
            this.width=value;
        }
        return this[ATTRIBUTE_SYMBOL][name]=value;
    }
    triggerEvent(type){
        for(let event of this[EVENT_SYMBOL][type]){
            event.call(this);
        }
    }
    created(){
        this.root=document.createElement("div");
        this.root.style.width="300px";
        this.root.style.height="300px";
        this[STATE_SYMBOL].h=0;
        this.root.style.background=`hsl(${this[STATE_SYMBOL].h}, 100%, 50%)`;
    }
    mounted() {
        this.root.addEventListener("click",()=>{
            this[STATE_SYMBOL].h+=60;
            this.root.style.backgroundColor=`hsl(${this[STATE_SYMBOL].h}, 60%, 70%)`;
        })
    }
    unmounted(){

    }
    appendTo(element){
        element.appendChild(this.root);
        this.mounted();
    }
    update(){

    }
}