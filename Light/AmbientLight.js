import { Light } from "./Light.js";
import { Bounding } from "../Scene/Bounding";
import { AABBBounding } from "../Scene/AABBBounding";

function AmbientLight()
{
    Light.call(this);
    this._bounds = new AABBBounding();
}

AmbientLight.prototype = Object.create(Light.prototype);

AmbientLight.prototype._updateBounds = function()
{
    this._bounds.clear(Bounding.EXPANSE_INFINITE);
};

AmbientLight.prototype.clone = function()
{
    var clone = new AmbientLight();
    clone.copyFrom(this);
    return clone;
};

Comment.register("ambientLight",AmbientLight);

export {AmbientLight};