import {DirectLight} from "./DirectLight";
import {BoundingSphere} from "../scene/BoundingSphere";
import {Float4} from "../math/Float4";
import {Component} from "../entity/Component";
import {DirectionalLight} from "./DirectionalLight";


function PointLight()
{
	DirectLight.call(this);

    this._radius = 100.0;
    this.intensity = 3.1415;
    this.shadowQualityBias = 2;
    this._shadowTiles = null;
    this._bounds = new BoundingSphere();
}

PointLight.prototype = Object.create(DirectLight.prototype,
    {
        numAtlasPlanes: {
            get: function() { return 6; }
        },

        castShadows: {
            get: function()
            {
                return this._castShadows;
            },

            set: function(value)
            {
                this._castShadows = value;

                if (value) {
                    this._shadowTiles = [];
                    for (var i = 0; i < 6; ++i)
                        this._shadowTiles[i] = new Float4();
                }
                else {
                    this._shadowTiles = null;
                }
            }
        },

        radius: {
            get: function() {
                return this._radius;
            },

            set: function(value) {
                this._radius = value;
                this.invalidateBounds();
            }
        }
    }
);

/**
 * @ignore
 * @private
 */
PointLight.prototype._updateBounds = function()
{
	this._bounds.setExplicit(Float4.ORIGIN_POINT, this._radius);
};

/**
 * @ignore
 */
PointLight.prototype.toString = function()
{
	return "[PointLight(name=" + this.name + ")]";
};

/**
 * @ignore
 */
PointLight.prototype.copyFrom = function(src)
{
	DirectLight.prototype.copyFrom.call(this, src);
	this.radius = src.radius;
};

/**
 * @inheritDoc
 */
PointLight.prototype.clone = function()
{
	var clone = new PointLight();
	clone.copyFrom(this);
	return clone;
};

Component.register("light", PointLight);

export { PointLight };