
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
        this.road.x = game.config.width * .25;

        this.road2 = new Road({scene:this})
        this.road2.x = game.config.width * .75;

        model.gameOver = false;
        model.speed = 1;
        model._score = 0;

        this.road.makeLines();
        this.road2.makeLines();

        this.road2.car.setFrame(1);

        // this.road.moveLines();
        // this.road2.moveLines();

        //The following comes from our Toolbox to implement the scoreBox:
        emitter = new Phaser.Events.EventEmitter();      
        controller = new Controller();

        //TODO: Get sound playing, create an instance of MediaManager:
        this.mediaManager = new MediaManager({scene: this})
        //this.mediaManager.setBackgroundMusic('backgroundMusic')
        //this.stopMusic();
        //this.mediaManager.stop();
        //emitter.on(G.MUSIC_STOP, this.stopMusic);

        this.sb = new ScoreBox({scene: this});
        this.sb.x = game.config.width / 2;
        this.sb.y = game.config.height / 2;
        //this.sb.setOrigin(0,0)

        //this.alignGrid = new AlignGrid({scene:this,rows:5, cols:5})
        //this.alignGrid.showNumbers();

        //this.alignGrid.placeAtIndex(9, this.sb);

        let soundButtons = new SoundButtons({scene:this})
        //let mediaManage = new MediaManager({scene:this})
        
        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this)
    }
    scoreUpdated(){
        if(model._score / 5 == Math.floor(model._score/5)){
            model.speed += .25;
            if(model.speed > 1.5)
                model.speed =1.5
        }
    }
    update(){
        this.road.moveLines();
        this.road.moveObstacle();
        this.road2.moveLines();
        this.road2.moveObstacle();
    }
    stopMusic(){
        this.mediaManager.stop();
    }
}