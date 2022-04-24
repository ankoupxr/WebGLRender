

function FrameTicker()
{
    this._IsRunning = false;
    this._Dt = 0;
    this._CurrentTime = 0;
    this._tickFunc = this._tick.bind(this);
    this._animationFrame = undefined;
}

FrameTicker.prototype = {
    start: function() {
        if (this._isRunning) return;
        this._currentTime = 0;
        this._isRunning = true;

        this._requestAnimationFrame();
    },
    stop: function() {
        this._isRunning = false;

        if (META.VR_DISPLAY)
            META.VR_DISPLAY.cancelAnimationFrame(this._animationFrame);
        else
            cancelAnimationFrame(this._animationFrame);
    },
    get dt() { return this._dt; },
    get time() { return this._currentTime; },

     _tick: function(time) {
        if (!this._isRunning) return;

        this._requestAnimationFrame();


        if (this._currentTime === 0)
            this._dt = 16;
        else
            this._dt = time - this._currentTime;

        this._currentTime = time;


        if (this._dt < 0) this._dt = 0;
        this.onTick.dispatch(this._dt);
    },


    _requestAnimationFrame: function()
    {
        if (capabilities.VR_CAN_PRESENT)
            this._animationFrame = META.VR_DISPLAY.requestAnimationFrame(this._tickFunc);
        else
            this._animationFrame = requestAnimationFrame(this._tickFunc);
    }
};

export { FrameTicker };