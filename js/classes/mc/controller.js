//The Controller listens for events and responds approprietly
class Controller
{
    constructor()
    {
        //Listen to events from emitter
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints);
        emitter.on(G.TOGGLE_SOUND, this.toggleSound)
        emitter.on(G.TOGGLE_MUSIC, this.toggleMusic);
        //emitter.on(G.PLAY_SOUND, this.playSound)
    }
    toggleSound(val){
        model._soundOn = val;
    }
    toggleMusic(val){
        model._musicOn = val;
    }
    setScore(score)
    {
        model._score = score;
    }
    upPoints(points)
    {
        //I don't see the practicality in the following, Why not 'model.score += points'
            //We would rather trigger that 'setter' instead
        let score = model.score;
        score += points;
        model.score = score;
    }
    playSound(key){
        // if(model._soundOn){
        //     let sound = this.scene.sound.add(key);
        //     sound.play();
        // }
    }
}