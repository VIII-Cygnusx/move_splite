import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hall')
export class Hall extends Component {

    @property({
        type:Button,
        tooltip: 'enter the game'
    })
    public Enter:Button;

    start() 
    {
        
    }

    update(deltaTime: number) 
    {
        
    }

    
    onLoad()
    {
        //设置按钮按下事件
        this.Enter.node.on
        (
            Button.EventType.CLICK,
            ()=>
            {
                director.loadScene('move_me',()=>
                {
                        console.log('hellow');
                })
            }
        );
    }
}


