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
var bottleType;
(function (bottleType) {
    bottleType[bottleType["None"] = 0] = "None";
    bottleType[bottleType["bottle1"] = 1] = "bottle1";
    bottleType[bottleType["bottle2"] = 2] = "bottle2";
    bottleType[bottleType["bottle3"] = 3] = "bottle3";
    bottleType[bottleType["bottle4"] = 4] = "bottle4";
    bottleType[bottleType["bottle5"] = 5] = "bottle5";
    bottleType[bottleType["bottle6"] = 6] = "bottle6";
})(bottleType || (bottleType = {}));
/** 瓶子类 */
var Bottles = (function (_super) {
    __extends(Bottles, _super);
    function Bottles(type) {
        var _this = _super.call(this) || this;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Bottles.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (v) {
            this._type = v;
            this.source = RES.getRes(bottleType[v] + "_png");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bottles.prototype, "isSelect", {
        get: function () {
            return this._isSelect;
        },
        set: function (v) {
            this._isSelect = v;
            if (v) {
                this.alpha = 0.5;
            }
            else {
                this.alpha = 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    return Bottles;
}(eui.Image));
__reflect(Bottles.prototype, "Bottles");
//# sourceMappingURL=Bottles.js.map