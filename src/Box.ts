class Box extends eui.Component {
	public constructor() {
		super()
	}

	/**箱子的类型 */
	private _type : number
	public get type() : number {
		return this._type;
	}
	public set type(v : number) {
		this._type = v;
	}

	
	/**箱子里瓶子的数量 */
	private _num : number = 0
	public get num() : number {
		return this._num;
	}
	public set num(v : number) {
		this._num = v;
		let img:eui.Image = <eui.Image>this.getChildAt(0)
		img.source = RES.getRes(`bottle${this.type}_${v}_png`)
	}
	
	/**添加瓶子 */
	// 这里返回布尔值,确认是否满了,后面计算得分的时候用得到
	public addBottle():boolean {
		this.num ++
		if(this._num >= 6) {
			this.packing()
			return true
		}
		return false
	}
	/**满了6个就打包 */
	private packing() {
		this.num = 0
	}
}