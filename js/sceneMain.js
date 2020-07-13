
class SceneMain extends Phaser.Scene {
    constructor(){
        super(SceneMain);
        //this.scene.add(this)
    }
    preload(){
        this.load.image("road", "assets/road.jpg")
        this.load.spritesheet("cars", "assets/cars.png", {frameWidth: 60, frameHeight:126})
        this.load.image("line", "assets/line.png");
        //Obstacles:
        this.load.image("pcar1", "assets/pcar1.png");
        this.load.image("pcar2", "assets/pcar2.png");
        this.load.image("cone", "assets/cone.png");
        this.load.image("barrier", "assets/barrier.png");
    }
    create(){
        //Using 'This' to define and access road makes it a "state variable", which is essentially global without having to define it as such 
        this.road = new Road({scene:this})
        this.road.x = game.config.width / 2;

        this.road.makeLines();

        //The following comes from our Toolbox to implement the scoreBox:
        emitter = new Phaser.Events.EventEmitter();      
        controller = new Controller();

        this.sb = new ScoreBox({scene: this});
        this.sb.x = game.config.width -50;
        this.sb.y = 50;
        //this.sb.setOrigin(0,0)

        this.alignGrid = new AlignGrid({scene:this,rows:5, cols:5})
        this.alignGrid.showNumbers();

        this.alignGrid.placeAtIndex(9, this.sb);

        
    }
    update(){
        this.road.moveLines();
        this.road.moveObstacle();
    }
}