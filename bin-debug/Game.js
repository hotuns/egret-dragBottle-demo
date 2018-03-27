var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**Game 主场景*/
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        /**运行速度,每帧速度 */
        _this.speed = 0;
        _this.timeOnEnterFrame = 0;
        /**游戏是否结束了 */
        _this.isOver = false;
        _this.timeCount = 0;
        /**得分 */
        _this._scoreNum = 0;
        _this.skinName = 'GameScene';
        _this.speed = 5;
        // 监听帧事件,滚动背景图片
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.rollBg, _this);
        // 监听帧事件,创建瓶子,并向下移动
        _this.bottleGroup.addEventListener(egret.Event.ENTER_FRAME, _this.creatBottle, _this);
        _this.timeOnEnterFrame = egret.getTimer();
        // 添加触摸事件,
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touchMove, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
        // 创建一个用来显示移动过程的瓶子, 先隐藏
        _this.showBottle = new Bottles(1);
        _this.showBottle.anchorOffsetX = 25 / 2;
        _this.showBottle.anchorOffsetY = 90 / 2;
        _this.showBottle.scaleX = 2;
        _this.showBottle.scaleY = 2;
        _this.showBottle.visible = false;
        _this.addChild(_this.showBottle);
        _this.restartButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.restart, _this);
        _this.mainmenuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.toMainMenu, _this);
        return _this;
    }
    /** 背景滚动 */
    Game.prototype.rollBg = function () {
        if (this.isOver) {
            return;
        }
        this.bg1.y += this.speed;
        if (this.bg1.y >= this.height) {
            this.bg1.y = -this.bg1.height + (this.height - this.bg1.height);
        }
        this.bg2.y += this.speed;
        if (this.bg2.y >= this.height) {
            this.bg2.y = -this.bg2.height + (this.height - this.bg2.height);
        }
    };
    /**创建瓶子 */
    Game.prototype.creatBottle = function () {
        if (this.isOver) {
            return;
        }
        var now = egret.getTimer();
        var pass = (now - this.timeOnEnterFrame) / 1000;
        this.timeOnEnterFrame = egret.getTimer();
        this.timeCount += pass;
        // 把每一帧消耗的时间累加到this.timeCount,如果超过1s,就创建一个瓶子,并归零,重新开始计算
        if (this.timeCount >= 1) {
            this.timeCount = 0;
            var type = Math.floor(Math.random() * 6 + 1);
            var bottle = new Bottles(type);
            bottle.x = Math.random() * this.bottleGroup.width;
            this.bottleGroup.addChild(bottle);
        }
        for (var i = this.bottleGroup.numChildren - 1; i >= 0; i--) {
            var item = this.bottleGroup.getChildAt(i);
            item.y += this.speed;
            if (item.y >= this.height) {
                this.bottleGroup.removeChild(item);
                this.gameOver();
            }
        }
    };
    /**触摸开始 */
    Game.prototype.touchBegin = function (e) {
        for (var i = this.bottleGroup.numChildren - 1; i >= 0; i--) {
            var item = this.bottleGroup.getChildAt(i);
            if (item.hitTestPoint(e.stageX, e.stageY)) {
                item.isSelect = true;
                // 赋值给手指触摸的瓶子
                this.touchBottle = item;
                this.showBottle.type = this.touchBottle.type;
                this.showBottle.visible = true;
            }
        }
    };
    /**触摸移动过程中 */
    Game.prototype.touchMove = function (e) {
        if (this.touchBottle) {
            this.showBottle.x = e.stageX;
            this.showBottle.y = e.stageY;
        }
    };
    /**触摸结束 */
    Game.prototype.touchEnd = function (e) {
        // 如果手指触摸的瓶子存在, 说明手指触摸到了某个瓶子
        if (this.touchBottle != null) {
            this.touchBottle.isSelect = false;
        }
        this.showBottle.visible = false;
        for (var i = 0; i < this.boxGroup.numChildren; i++) {
            var item = this.boxGroup.getChildAt(i);
            if (item.hitTestPoint(e.stageX, e.stageY)) {
                if (item.type == this.touchBottle.type) {
                    this.bottleGroup.removeChild(this.touchBottle);
                    // 满了额外加5分
                    if (item.addBottle()) {
                        this.scoreNum += 5;
                    }
                    this.scoreNum++;
                    break;
                }
            }
        }
    };
    /**游戏结束 */
    Game.prototype.gameOver = function () {
        this.gameOverGroup.visible = true;
        this.isOver = true;
    };
    /**重新开始 */
    Game.prototype.restart = function () {
        this.scoreNum = 0;
        this.bottleGroup.removeChildren();
        this.isOver = false;
        this.gameOverGroup.visible = false;
        for (var i = 0; i < this.boxGroup.numChildren; i++) {
            var item = this.boxGroup.getChildAt(i);
            item.num = 0;
        }
    };
    /**返回主菜单 */
    Game.prototype.toMainMenu = function () {
        this.parent.removeChild(this);
    };
    Object.defineProperty(Game.prototype, "scoreNum", {
        get: function () {
            return this._scoreNum;
        },
        set: function (v) {
            this._scoreNum = v;
            this.score.text = this.endScore.text = v.toString();
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map