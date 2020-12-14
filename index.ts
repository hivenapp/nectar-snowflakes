export class Snowflake {
  seq: number;
  nodeId: number;
  epoch: number;
  constructor(opts) {
    opts = opts || {nodeId: 1023};
    this.seq = 0;
    this.nodeId = opts.nodeId;
    this.epoch = 1562544000000;
  }

  gen = (timestamp = Date.now()): string => {
    if (this.seq >= 4095) this.seq = 0;
    const binary = `${(timestamp - this.epoch).toString(2).padStart(42, '0')}${(this.nodeId >>> 0).toString(2)}${(this.seq++).toString(2).padStart(12, '0')}`;
    return this.binaryToID(binary);
  }

  private binaryToID(num) {
    let dec = '';

    while (num.length > 50) {
      const high = parseInt(num.slice(0, -32), 2);
      const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

      dec = (low % 10).toString() + dec;
      num = Math.floor(high / 10).toString(2) + Math.floor(low / 10).toString(2).padStart(32, '0');
    }

    num = parseInt(num, 2);
    while (num > 0) {
      dec = (num % 10).toString() + dec;
      num = Math.floor(num / 10);
    }

    return dec;
  }
}
