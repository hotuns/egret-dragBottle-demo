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
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        /**箱子里瓶子的数量 */
        _this._num = 0;
        return _this;
    }
    Object.defineProperty(Box.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (v) {
            this._type = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box.prototype, "num", {
        get: function () {
            return this._num;
        },
        set: function (v) {
            this._num = v;
            var img = this.getChildAt(0);
            img.source = RES.getRes("bottle" + this.type + "_" + v + "_png");
        },
        enumerable: true,
        configurable: true
    });
    /**添加瓶子 */
    // 这里返回布尔值,确认是否满了,后面计算得分的时候用得到
    Box.prototype.addBottle = function () {
        this.num++;
        if (this._num >= 6) {
            this.packing();
            return true;
        }
        return false;
    };
    /**满了6个就打包 */
    Box.prototype.packing = function () {
        this.num = 0;
    };
    return Box;
}(eui.Component));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map