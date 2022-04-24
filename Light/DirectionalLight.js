import { Light } from "./Light.js";
import { Bounding } from "../Scene/Bounding";
import { AABBBounding } from "../Scene/AABBBounding";


function DirectionalLight()
{
	DirectLight.call(this);

    this._direction = new Float4();
    this._cascadeSplitRatios = [];
    this._cascadeSplitDistances = [];
    this._initCascadeSplitProperties();

	this._bounds = new BoundingAABB();
}

DirectionalLight.prototype = Object.create(DirectLight.prototype,
    {
        numAtlasPlanes: {
            get: function() { return META.OPTIONS.numShadowCascades; }
        },

        castShadows: {
            get: function()
            {
                return this._castShadows;
            },

            set: function(value)
            {
                if (this._castShadows === value) return;

                this._castShadows = value;
                if (value) {
                    this._shadowMatrices = value? [ new Matrix4x4(), new Matrix4x4(), new Matrix4x4(), new Matrix4x4() ] : null;
                }
                else {
                    this._shadowMatrices = null;
                }
            }
        },

        direction: {
            get: function()
            {
                var dir = this._direction;
                if (this.entity)
                    this.entity.worldMatrix.getColumn(1, dir);
                return dir;
            }
        },

        cascadeSplitDistances: {
            get: function ()
            {
                return this._cascadeSplitDistances;
            }
        }
    }
);

/**
 * The ratios that define every cascade's split distance in relation to the near and far plane. 1 is at the far plane,
 * 0 is at the near plane.
 * @param r1
 * @param r2
 * @param r3
 * @param r4
 */
DirectionalLight.prototype.setCascadeRatios = function(r1, r2, r3, r4)
{
	if (r1 !== undefined) this._cascadeSplitRatios[0] = r1;
	if (r2 !== undefined) this._cascadeSplitRatios[1] = r2;
	if (r3 !== undefined) this._cascadeSplitRatios[2] = r3;
    if (r4 !== undefined) this._cascadeSplitRatios[3] = r4;
};

/**
 * @private
 * @ignore
 */
DirectionalLight.prototype._initCascadeSplitProperties = function()
{
    var ratio = 1.0;

    for (var i = META.OPTIONS.numShadowCascades - 1; i >= 0; --i)
    {
        this._cascadeSplitRatios[i] = ratio;
        this._cascadeSplitDistances[i] = 0;
        ratio *= .5;
    }
};

/**
 * @private
 * @ignore
 */
DirectionalLight.prototype.getShadowMatrix = function(cascade)
{
    return this._shadowMatrices[cascade];
};

/**
 * @ignore
 */
DirectionalLight.prototype._updateBounds = function()
{
	this._bounds.clear(BoundingVolume.EXPANSE_INFINITE);
};

/**
 * @ignore
 */
DirectionalLight.prototype.toString = function()
{
	return "[DirectionalLight(name=" + this.name + ")]";
};

/**
 * @inheritDoc
 */
DirectionalLight.prototype.clone = function()
{
	var clone = new DirectionalLight();
	clone.copyFrom(this);
	return clone;
};

Component.register("light", DirectionalLight);

export { DirectionalLight };