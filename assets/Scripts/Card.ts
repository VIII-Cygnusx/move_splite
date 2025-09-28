import { _decorator, Component , Label,Vec3,Node,Collider, Contact2DType,RigidBody2D,BoxCollider2D, UITransform,Vec2, RigidBody } from 'cc';
const { ccclass,property } = _decorator;


@ccclass('Card')
export class Card extends Component {

    @property
    ({
        type:Label,
        tooltip: 'card rank'
    })
    public card_rank:Label

    @property
    ({
        type:Label,
        tooltip: 'Card Mark'
    })
    public card_mark:Label

    public carddata: { rank: number; mark: string } = {rank: 0,mark: ''};

    public recored:number=0;


    /**
     * @brief 设置卡牌参数
     * @param Rank 点数（int）
     * @param Mark 花色（char）
     * @example setcard_data(2,E)
     */
    setcard_data(Rank:number, Mark:string )
    {
        //set rank Label
        this.card_rank.string = Rank.toString();

        //set Mark Label
        this.card_mark.string = Mark;

        //Recored the data
        this.carddata.rank = Rank;
        this.carddata.mark = Mark;
    }




    onLoad() 
    {
        //监听碰撞事件    
        const collider = this.node.getComponent(BoxCollider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onContactBegin, this);

        //拖拽效果
        this.node.on
        (
            Node.EventType.TOUCH_MOVE,
            (event) => 
            {
                const touchLoc = new Vec3();
                event.getUILocation(touchLoc);
                this.node.setWorldPosition(touchLoc);
            }
        );
    }


    onContactBegin(selfCollider: BoxCollider2D,otherCollider: BoxCollider2D) 
    {
        console.log('发生碰撞');

        const otherCardComp = otherCollider.node.getComponent(Card);
        const selfCardComp = selfCollider.node.getComponent(Card);

        // 确保双方都是 Card，并且满足相邻规则
        if (selfCardComp && otherCardComp && this.isAdjacent(otherCardComp)) {
            console.log('是相邻卡牌，准备销毁');


            // 延迟一帧销毁，避免物理系统迭代中修改节点导致报错
            this.scheduleOnce
            (
                () =>
                {
                    if (!selfCardComp.node.isValid) return;
                    if (!otherCardComp.node.isValid) return;
                    selfCardComp.node.destroy();
                    otherCardComp.node.destroy();
                }, 
                0
            );
        }
    }

    /**
     * @breif 检测相撞的牌花色
     * @param otherCard 被撞的牌
     * @returns 相同返回1
     */
    isAdjacent(otherCard: Card): boolean {
        const thisKey = `${this.carddata.mark}${this.carddata.rank}`;
        const otherKey = `${otherCard.carddata.mark}${otherCard.carddata.rank}`;
        return thisKey === otherKey;
    }



}

