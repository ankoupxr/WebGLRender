import {Float4} from "../math/Float4";


function Bounding(type){
    this.type = type;
    this._expanse = BoundingVolume.EXPANSE_EMPTY;
    this._minimumX = 0.0;
    this._minimumY = 0.0;
    this._minimumZ = 0.0;
    this._maximumX = 0.0;
    this._maximumY = 0.0;
    this._maximumZ = 0.0;
    this._halfExtentX = 0.0;
    this._halfExtentY = 0.0;
    this._halfExtentZ = 0.0;
    this._center = new Float4();
}

Bounding.EXPANSE_EMPTY = 0;
Bounding.EXPANSE_INFINITE = 1;
Bounding.EXPANSE_FINITE = 2;
Bounding.EXPANSE_INHERIT = 3;

Bounding.prototype =
{
    get expanse() { return this._expanse; },

    growToIncludeMesh: function(mesh) { throw new Error("Abstract method!"); },
    growToIncludeBound: function(bounds) { throw new Error("Abstract method!"); },
    growToIncludeMinMax: function(min, max) { throw new Error("Abstract method!"); },

    clear: function(expanseState)
    {
        this._minimumX = this._minimumY = this._minimumZ = 0;
        this._maximumX = this._maximumY = this._maximumZ = 0;
        this._center.set(0, 0, 0);
        this._halfExtentX = this._halfExtentY = this._halfExtentZ = 0;
        this._expanse = expanseState === undefined? BoundingVolume.EXPANSE_EMPTY : expanseState;
    },


    get minimum() { return new Float4(this._minimumX, this._minimumY, this._minimumZ, 1.0); },


    get maximum() { return new Float4(this._maximumX, this._maximumY, this._maximumZ, 1.0); },


    get center() { return this._center; },


    get halfExtent() { return new Float4(this._halfExtentX, this._halfExtentY, this._halfExtentZ, 0.0); },


    getRadius: function() { throw new Error("Abstract method!"); },


    transformFrom: function(sourceBound, matrix) { throw new Error("Abstract method!"); },


    intersectsConvexSolid: function(cullPlanes, numPlanes) { throw new Error("Abstract method!"); },


    intersectsBound: function(bound) { throw new Error("Abstract method!"); },

    classifyAgainstPlane: function(plane) { throw new Error("Abstract method!"); },


    intersectsRay: function(ray) { throw new Error("Abstract method!"); },

    toString: function()
    {
        return "Bounding: [ " +
            this._minimumX + ", " +
            this._minimumY + ", " +
            this._minimumZ + " ] - [ " +
            this._maximumX + ", " +
            this._maximumY + ", " +
            this._maximumZ + " ], expanse: " +
            this._expanse;
    },

    clone: function()
    {
        throw new Error("Abstract method called!");
    }
};

export { Bounding };