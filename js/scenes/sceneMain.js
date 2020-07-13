
class SceneMain extends Phaser.Scene {
    constructor(){
        super('SceneMain');
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

        //Buttons:
        this.load.image("musicOff", "assets/buttons/toggles/icons/music_off.png");
        this.load.image("musicOn", "assets/buttons/toggles/icons/music_on.png");
        this.load.image("sfxOff", "assets/buttons/toggles/icons/sfx_off.png");
        this.load.image("sfxOn", "assets/buttons/toggles/icons/sfx_on.png");
        
        this.load.image("toggleBack", "assets/buttons/toggles/toggles/1.png");
        this.load.image("toggle2", "assets/buttons/toggles/toggles/2.png");
        this.load.image("toggle3", "assets/buttons/toggles/toggles/3.png");
        this.load.image("toggle4", "assets/buttons/toggles/toggles/4.png");
        this.load.image("toggle5", "assets/buttons/toggles/toggles/5.png");
        this.load.image("toggle6", "assets/buttons/toggles/toggles/6.png");

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

        let soundButtons = new SoundButtons({scene:this})
    }
    update(){
        this.road.moveLines();
        this.road.moveObstacle();
    }
}