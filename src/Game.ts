/**Game 主场景*/
class Game extends eui.Component {

	public bg1: eui.Image;
	public bg2: eui.Image;
	public bottleGroup: eui.Group;
	public boxGroup: eui.Group;
	public score: eui.Label
	/**运行速度,每帧速度 */
	private speed: number = 0
	private timeOnEnterFrame: number = 0
	/**手指触摸的瓶子 */
	private touchBottle: Bottles
	/**用来显示移动过程的瓶子 */
	private showBottle: Bottles
	public gameOverGroup: eui.Group;
	public mainmenuButton: eui.Button;
	public restartButton: eui.Button;
	public endScore: eui.Label;
	/**游戏是否结束了 */
	private isOver: boolean = false


	public constructor() {
		super()
		this.skinName = 'GameScene'
		this.speed = 5
		// 监听帧事件,滚动背景图片
		this.addEventListener(egret.Event.ENTER_FRAME, this.rollBg, this)
		// 监听帧事件,创建瓶子,并向下移动
		this.bottleGroup.addEventListener(egret.Event.ENTER_FRAME, this.creatBottle, this)
		this.timeOnEnterFrame = egret.getTimer()
		// 添加触摸事件,
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this)
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
		// 创建一个用来显示移动过程的瓶子, 先隐藏
		this.showBottle = new Bottles(1)
		this.showBottle.anchorOffsetX = 25 / 2
		this.showBottle.anchorOffsetY = 90 / 2
		this.showBottle.scaleX = 2
		this.showBottle.scaleY = 2
		this.showBottle.visible = false
		this.addChild(this.showBottle)
		this.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this)
		this.mainmenuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toMainMenu, this)
	}
	/** 背景滚动 */
	private rollBg() {
		if (this.isOver) {
			return
		}
		this.bg1.y += this.speed
		if (this.bg1.y >= this.height) {
			this.bg1.y = - this.bg1.height + (this.height - this.bg1.height)
		}
		this.bg2.y += this.speed
		if (this.bg2.y >= this.height) {
			this.bg2.y = - this.bg2.height + (this.height - this.bg2.height)
		}
	}

	private timeCount: number = 0
	/**创建瓶子 */
	private creatBottle() {
		if (this.isOver) {
			return
		}
		var now = egret.getTimer()
		var pass = (now - this.timeOnEnterFrame) / 1000
		this.timeOnEnterFrame = egret.getTimer()
		this.timeCount += pass
		// 把每一帧消耗的时间累加到this.timeCount,如果超过1s,就创建一个瓶子,并归零,重新开始计算
		if (this.timeCount >= 1) {
			this.timeCount = 0
			var type = Math.floor(Math.random() * 6 + 1)
			var bottle: Bottles = new Bottles(type)
			bottle.x = Math.random() * this.bottleGroup.width
			this.bottleGroup.addChild(bottle)
		}
		for (var i = this.bottleGroup.numChildren - 1; i >= 0; i--) {
			var item: Bottles = <Bottles>this.bottleGroup.getChildAt(i)
			item.y += this.speed
			if (item.y >= this.height) {
				this.bottleGroup.removeChild(item)
				this.gameOver()
			}
		}
	}
	/**触摸开始 */
	private touchBegin(e: egret.TouchEvent) {
		for (var i = this.bottleGroup.numChildren - 1; i >= 0; i--) {
			var item: Bottles = <Bottles>this.bottleGroup.getChildAt(i)
			if (item.hitTestPoint(e.stageX, e.stageY)) {
				item.isSelect = true
				// 赋值给手指触摸的瓶子
				this.touchBottle = item
				this.showBottle.type = this.touchBottle.type
				this.showBottle.visible = true
			}
		}
	}
	/**触摸移动过程中 */
	private touchMove(e: egret.TouchEvent) {
		if (this.touchBottle) {
			this.showBottle.x = e.stageX
			this.showBottle.y = e.stageY
		}
	}
	/**触摸结束 */
	private touchEnd(e: egret.TouchEvent) {
		// 如果手指触摸的瓶子存在, 说明手指触摸到了某个瓶子
		if (this.touchBottle != null) {
			this.touchBottle.isSelect = false
		}
		this.showBottle.visible = false
		for (let i = 0; i < this.boxGroup.numChildren; i++) {
			let item = <Box>this.boxGroup.getChildAt(i)
			if (item.hitTestPoint(e.stageX, e.stageY)) {
				if (item.type == this.touchBottle.type) {
					this.bottleGroup.removeChild(this.touchBottle)
					// 满了额外加5分
					if (item.addBottle()) {
						this.scoreNum += 5
					}
					this.scoreNum++
					break
				}
			}
		}

	}
	/**游戏结束 */
	private gameOver() {
		this.gameOverGroup.visible = true
		this.isOver = true
	}
	/**重新开始 */
	private restart() {
		this.scoreNum = 0
		this.bottleGroup.removeChildren()
		this.isOver = false
		this.gameOverGroup.visible = false
		for (let i = 0; i < this.boxGroup.numChildren; i++) {
			let item = <Box>this.boxGroup.getChildAt(i)
			item.num = 0
		}
	}

	/**返回主菜单 */
	private toMainMenu() {
		this.parent.removeChild(this)
	}

	/**得分 */
	private _scoreNum: number = 0
	public get scoreNum(): number {
		return this._scoreNum;
	}
	public set scoreNum(v: number) {
		this._scoreNum = v;
		this.score.text = this.endScore.text = v.toString()
	}

}