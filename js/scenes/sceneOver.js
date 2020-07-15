class SceneOver extends Phaser.Scene{
    constructor(){
        super('SceneOver');
    }
    preload(){
        this.load.image("title", "assets/title.png");
        this.load.image("button1", "assets/ui/ui/buttons/2/1.png");
       // alert('hello');
    }
    create(){
        this.alignGrid = new AlignGrid({rows:11, cols:11, scene:this});
        this.alignGrid.showNumbers();

        this.backImage = this.add.image(game.config.width/2, game.config.height/2, "titleBack")

        //let title = this.add.image(0,0,'title');
        //Align.scaleToGameW(title, .8);
        //this.alignGrid.placeAtIndex(39, title)

        let btnStart = new FlatButton({scene: this, key: 'button1', text:'Play Again', event:'start_game', x:0, y:0})
        btnStart.x = game.config.width / 2;
        btnStart.y = game.config.height - 150;

        emitter.on("start_game", this.startGame, this)
        //alert("hello");

        

    }
    update(){

    }

    startGame(){
        emitter.emit(G.MUSIC_CHANGED)
        this.scene.start('SceneMain');
    }
}