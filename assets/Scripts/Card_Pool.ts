import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;
import { Card } from './Card';

@ccclass('Card_Pool')
export class Card_Pool extends Component {

    @property
    ({
        type: Prefab,
        tooltip: 'Card prefab'
    })
    public Cards: Prefab | null = null;


    spawnArea: { width: number, height: number } = { width: 1000, height: 1000 };   //卡片生成区域


    start() 
    {

    }

    update(deltaTime: number) 
    {

    }

    /**
     * @brief 在世界中生成一堆卡牌
     */
    generateCards()
    {
        if (!this.Cards) 
        {
            console.error('Card prefab is not assigned!');
            return;
        }

        // 定义扑克牌数据（示例：8 点数 × 4 花色）
        const ranks = [1, 2, 3, 4, 4, 3, 2, 1];
        const suits = ['A', 'B', 'B','A'];

        let index = 0;
        for (const suit of suits) 
        {
            for (const rank of ranks) 
            {
                // 1. 实例化卡牌 Prefab
                const cardNode = instantiate(this.Cards);

                // 2. 获取 Card 组件并初始化数据
                const cardComp = cardNode.getComponent(Card);
                if (cardComp) 
                {
                    cardComp.setcard_data(rank, suit);
                }

                // 3. 设置随机世界位置
                const randomX = Math.random() * this.spawnArea.width - this.spawnArea.width / 2;
                const randomY = Math.random() * this.spawnArea.height - this.spawnArea.height / 2;
                cardNode.setWorldPosition(new Vec3(randomX, randomY, 0));

                // 4. 添加到当前节点（Card_Pool）下，便于管理
                this.node.addChild(cardNode);

                index++;
            }
        }

        console.log(`Generated ${index} cards at world position (0,0,0).`);
    }
}