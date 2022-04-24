import { Entity } from "./Light"

function DirectLight()
{
    this._Light_updateScaledIrradiance = Light.prototype._updateScaledIrradiance;
    Light.call(this);
    this.intensity = 3.1415;
	this.depthBias = .0;
    this._castShadows = false;
    this.shadowQualityBias = 0;
}

DirectLight.prototype = Object.create(Light.prototype);

DirectLight.prototype._updateScaledIrradiance = function ()
{
    this._Light_updateScaledIrradiance();

    var scale = 1 / Math.PI;

    this._scaledIrradiance.r *= scale;
    this._scaledIrradiance.g *= scale;
    this._scaledIrradiance.b *= scale;
};



DirectLight.prototype.copyFrom = function(src)
{
	Light.prototype.copyFrom.call(this, src);
	this.shadowQualityBias = src.shadowQualityBias;
	this.castShadows = src.castShadows;
	this.depthBias = src.depthBias;
};

export { DirectLight };