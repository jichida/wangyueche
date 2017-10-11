let util = require('../platform/util');

describe('网络电话运营商', () => {
  describe('测试网络电话', () => {
    it('测试电话', (done) => {
      console.log(`13861123555:${util.getmobilenettype('13861123555')}`);
      console.log(`15161123555:${util.getmobilenettype('15161123555')}`);
      console.log(`15961123555:${util.getmobilenettype('15961123555')}`);
      console.log(`13961123555:${util.getmobilenettype('13961123555')}`);
      console.log(`18161123555:${util.getmobilenettype('18161123555')}`);
      console.log(`15461123555:${util.getmobilenettype('15461123555')}`);
      console.log(`14461123555:${util.getmobilenettype('14461123555')}`);
      console.log(`12861123555:${util.getmobilenettype('12861123555')}`);
      console.log(`18261123555:${util.getmobilenettype('18261123555')}`);
      done();
      });
    });
});
