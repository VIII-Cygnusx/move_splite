import { _decorator, Component, Node,EventTouch, Vec3, Vec2, UITransform,Rect, Prefab, Pool } from 'cc';
const { ccclass, property } = _decorator;

import { Card } from './Card'
import { Card_Pool } from './Card_Pool';
import { DragZone } from './DragZone';
import { DragZone_Pool } from './DragZone_Pool';

@ccclass('GameCtrl')
export class GameCtrl extends Component {

@property
({
    type:Card_Pool,
    tooltip: 'd'
})
public card_pool:Card_Pool

start()
{
    this.card_pool.generateCards(); //生成牌组
}


}


