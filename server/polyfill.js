import buffer from "buffer";

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = function() {};
  buffer.SlowBuffer.prototype = {};
}
