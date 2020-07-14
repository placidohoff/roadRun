
class SceneMain extends Phaser.Scene {
    constructor(){
        super('SceneMain');
        //this.scene.add(this)
    }
    preload(){
        
    }
    create(){
        //Using 'This' to define and access road makes it a "state variable", which is essentially global without having to define it as such 
        this.road = new Road({scene:this})
        this.road.x = game.config.width / 2;

        model.gameOver = false;

        this.road.makeLines();

        //The following comes from our Toolbox to implement the scoreBox:
        emitter = new Phaser.Events.EventEmitter();      
        controller = new Controller();

        //TODO: Get sound playing, create an instance of MediaManager:
        this.mediaManager = new MediaManager({scene: this})
        this.mediaManager.setBackgroundMusic('backgroundMusic')
        //emitter.on(G.MUSIC_STOP, this.stopMusic);

        this.sb = new ScoreBox({scene: this});
        this.sb.x = game.config.width -50;
        this.sb.y = 50;
        //this.sb.setOrigin(0,0)

        this.alignGrid = new AlignGrid({scene:this,rows:5, cols:5})
        this.alignGrid.showNumbers();

        this.alignGrid.placeAtIndex(9, this.sb);

        let soundButtons = new SoundButtons({scene:this})
        //let mediaManage = new MediaManager({scene:this})
    }
    update(){
        this.road.moveLines();
        this.road.moveObstacle();
    }
    stopMusic(){
        this.mediaManager.stop();
    }
}