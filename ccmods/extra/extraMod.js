Game.registerMod("extra",{
    init:function(){
      addEventListener('click',(event)=>{Game.Popup('Gained 1 extra!',event.clientX,event.clientY-20)});
    },
    save: function(){
        let str = "";
        return str;
    },
    load: function(str){
        this.text=str;
    }
})
