import { GL } from './core/core.js'

function IndexBuffer()
{
    this._buffer = GL.gl.createBuffer();
}

IndexBuffer.prototype = {
    uploadData: function(data, usageHint)
    {
        if (usageHint === undefined)
            usageHint = BufferUsage.STATIC_DRAW;

        this.bind();
        GL.gl.bufferData(GL.gl.ELEMENT_ARRAY_BUFFER, data, usageHint);
    },
    bind: function()
    {
        GL.gl.bindBuffer(GL.gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    }
};

export { IndexBuffer };