const EventEmitter = require('events');
const {Divinity} = require('../app/divinity');

class City {
  constructor(user, name, nameDivinity, timeFactor) {
    this.name_ = name || 'UNKCITY';
    this.user_ = user || 'Bob l\'éponge';
    this.corn_ = 0;
    this.gold_ = 100;
    this.wood_ = 0;
    this.divinity_ = new Divinity(nameDivinity, timeFactor);
    this.unitDamage = 1;
    this.listUnits_ = [];
    this.listWonders_ = [];
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.90) {
        this.worldEvents.emit('bornUnit', {
          unit: 1
        });
      }
    }, this.timeFactor);
    this.gaiaInterval2_ = setInterval(() => {
      this.worldEvents.emit('growCorn', {
        corn: 1
      });
    }, this.timeFactor);
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get gold() {
    return this.gold_;
  }

  get corn() {
    return this.corn_;
  }

  get wood() {
    return this.wood_;
  }

  get divinity() {
    return this.divinity_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  buyCorn(nbCorn) {
    this.corn_ = (this.gold_ >= nbCorn && typeof nbCorn === 'number' &&
      nbCorn >= 0) ? this.corn_ + nbCorn : this.corn_;
    this.gold_ = (this.gold_ >= nbCorn && typeof nbCorn === 'number' &&
      nbCorn >= 0) ? this.gold_ - nbCorn : this.gold_;
  }

  buyWood(nbWood) {
    this.wood_ = (this.gold_ >= (nbWood * 2) && typeof nbWood === 'number' &&
      nbWood >= 0) ? this.wood_ + nbWood : this.wood_;
    this.gold_ = (this.gold_ >= (nbWood * 2) && typeof nbWood === 'number' &&
      nbWood >= 0) ? this.gold_ - (nbWood * 2) : this.gold_;
  }

  showStatus() {
    console.log('Player : ' + this.user_ + ' | City : ' + this.name_ + ' |' +
      ' Divinity : ' + this.divinity_.name);
    console.log('Gold : ' + this.gold_ + ' | Corn : ' + this.corn_ + ' |' +
      ' Wood : ' + this.wood_);
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
    clearInterval(this.gaiaInterval2_);
  }
}

module.exports = {City};
