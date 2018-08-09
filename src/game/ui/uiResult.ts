class uiResult extends BaseView {
	public playerScore:eui.Label;
	public enemyScore:eui.Label;
	public playerLayout:eui.Group;
	public enemyLayout:eui.Group;
	public win:eui.Image;
	public lose:eui.Image;


	public back:eui.Group;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	
	public onEnter(context:any):void
	{
		let friendIds = context.friendIds;
		let enemyIds = context.enemyIds;
		let friendScore = context.friendScore;
		let enemyScore = context.enemyScore;

		this.playerScore.text = friendScore + "";
		this.enemyScore.text = enemyScore + "";

		if(friendScore > enemyScore)
		{
			this.win.visible = true;
			this.lose.visible = false;
			var sound:egret.Sound = RES.getRes("vitory_mp3");
  			sound.play(0,1);
		}else{
			this.lose.visible = true;
			this.win.visible = false;
			var sound:egret.Sound = RES.getRes("lose_mp3");
  			sound.play(0,1);
		}

		for(let i=0;i<this.playerLayout.numChildren;i++)
		{
			this.playerLayout.getChildAt(i).visible = false;
		}
		for(let i=0;i<friendIds.length;i++)
		{
			this.playerLayout.getChildAt(i).visible = true;
			(<playerIcon>this.playerLayout.getChildAt(i)).setData("");
		}
		for(let i=0;i<this.enemyLayout.numChildren;i++)
		{
			this.enemyLayout.getChildAt(i).visible =false;
		}
		for(let i=0;i<enemyIds.length;i++)
		{
			this.enemyLayout.getChildAt(i).visible = true;
			(<playerIcon>this.enemyLayout.getChildAt(i)).setData("");
		}
	}

	private init()
	{
		this.back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackClick,this);
	}

	private onAddToStage()
	{
		  //离开房间
        mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_LEAVEROOM_NTFY, this.leaveRoomNotify,this);
		mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_LEAVEROOM_RSP,this.leaveRoomResponse,this);
	}

	private onBackClick()
	{
		mvs.MsEngine.getInstance.leaveRoom("");
		ContextManager.Instance.backSpecifiedUI(UIType.lobbyBoard);
	}

	private leaveRoomResponse()
	{
	 	if(this.parent)	ContextManager.Instance.backSpecifiedUI(UIType.lobbyBoard);
	}

	private leaveRoomNotify()
	{

	}
}