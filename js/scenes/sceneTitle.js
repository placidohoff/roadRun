class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle')
    }
    preload(){
        
    }
    create(){
        //alert("hello")
        //console.log("Hello")
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();


        this.backImage = this.add.image(game.config.width/2, game.config.height/2, "titleBack")
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        //this.alignGrid.showNumbers();

        let title = this.add.image(game.config.width/2,0,'title');
        Align.scaleToGameW(title, .8);
        this.alignGrid.placeAtIndex(39, title)

        let center = game.config.width/2;
        let bottom = game.config.height - 200;
        let btnStart = new FlatButton({scene: this, key: 'button1', text:'start', event:'start_game', x:0, y:0})
        btnStart.x = game.config.width / 2;
        btnStart.y = game.config.height - 150;
        //this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on("start_game", this.startGame, this)
    
        
    }
    update(){

    }

    startGame(){
        
        this.scene.start('SceneMain');
    }
}