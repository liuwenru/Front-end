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
        this[PROPERTY_SYMBOL].urls=config.urls;
        this[PROPERTY_SYMBOL].style=config.style;
        this[PROPERTY_SYMBOL].position=0;
        this.created();
    }
    log(){
        //console.log("width:", this.width);
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
        this.root.classList.add(this[PROPERTY_SYMBOL].style);
        for (let d of this[PROPERTY_SYMBOL].urls) {
            let e = document.createElement("img");
            e.src = d;
            this.root.appendChild(e);
        }
    }
    mounted() {
        let children = Array.prototype.slice.call(this.root.children);
        let nextFrame = ()=> {
            let nextPosition = this[PROPERTY_SYMBOL].position + 1;
            nextPosition = nextPosition % children.length;
            let current = children[this[PROPERTY_SYMBOL].position],
            next = children[nextPosition];
            // 将next放到正确的位置上
            next.style.transition = "ease 0s";
            next.style.transform = `translate(${100 - 100 * nextPosition}%)`;
            setTimeout(() => {
                // 把current挪出视口
                current.style.transition = "";
                current.style.transform = `translate(${-100 - 100 * this[PROPERTY_SYMBOL].position}%)`;
                console.log(this[PROPERTY_SYMBOL].position);
                // 把next挪进视口
                next.style.transition = "";
                next.style.transform = `translate(${-100 * nextPosition}%)`;
                this[PROPERTY_SYMBOL].position = nextPosition;
            }, 16);
            setTimeout(nextFrame, 3000);
        };
        nextFrame();
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