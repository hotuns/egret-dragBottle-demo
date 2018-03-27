enum bottleType{
	None, bottle1, bottle2, bottle3, bottle4, bottle5, bottle6
}
/** 瓶子类 */
class Bottles extends eui.Image {
	public constructor(type: bottleType) {
		super()
		this.type = type
	}

	/**瓶子的种类 */
	private _type : number;
	public get type() : number {
		return this._type;
	}
	public set type(v : number) {
		this._type = v;
		this.source = RES.getRes(`${bottleType[v]}_png`)
	}
	
	/**是否被选中 */
	private _isSelect : boolean;
	public get isSelect() : boolean {
		return this._isSelect;
	}
	public set isSelect(v : boolean) {
		this._isSelect = v;
		if(v) {
			this.alpha = 0.5
		} else {
			this.alpha = 1
		}
	}

}