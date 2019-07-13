"use strict";
exports.__esModule = true;
var Snowflake = /** @class */ (function () {
    function Snowflake(opts) {
        var _this = this;
        this.gen = function (timestamp) {
            if (timestamp === void 0) { timestamp = Date.now(); }
            if (_this.seq >= 4095)
                _this.seq = 0;
            var binary = "" + (timestamp - _this.epoch).toString(2).padStart(42, '0') + (_this.nodeId >>> 0).toString(2) + (_this.seq++).toString(2).padStart(12, '0');
            return _this.binaryToID(binary);
        };
        opts = opts || { nodeId: 1023 };
        this.seq = 0;
        this.nodeId = opts.nodeId;
        this.epoch = 1562544000000;
    }
    Snowflake.prototype.binaryToID = function (num) {
        var dec = '';
        while (num.length > 50) {
            var high = parseInt(num.slice(0, -32), 2);
            var low = parseInt((high % 10).toString(2) + num.slice(-32), 2);
            dec = (low % 10).toString() + dec;
            num = Math.floor(high / 10).toString(2) + Math.floor(low / 10).toString(2).padStart(32, '0');
        }
        num = parseInt(num, 2);
        while (num > 0) {
            dec = (num % 10).toString() + dec;
            num = Math.floor(num / 10);
        }
        return dec;
    };
    return Snowflake;
}());
exports.Snowflake = Snowflake;
