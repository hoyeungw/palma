import { Hatsu } from 'hatsu';
import { PalettSelector } from 'palett-table';
import { Callable } from 'kalorie';
import { Ob } from 'veho';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

const colorTube = Hatsu.hex;
const toTab = ind => ' '.repeat(ind << 1);
const render = (message, {
  title,
  indent,
  keywords
}) => {
  var _ref, _indent;

  return _ref = `${(_indent = indent, toTab(_indent))}[${title}] ${message}`, console.log(_ref);
};

/**
 * @type {class|function}
 */

class Pal extends Callable {
  /** @type {string} */

  /** @type {number} */

  /** @type {Object<string,string>} */
  constructor(title, {
    indent = 0,
    keywords
  } = {}) {
    super(tx => render(tx, this));

    _defineProperty(this, "title", '');

    _defineProperty(this, "indent", 0);

    _defineProperty(this, "keywords", {});

    if (title) this.title = title;
    if (indent) this.indent = indent;
    if (keywords) this.keywords = keywords; // if (keywords?.tmr) {
    //   keywords.tmr += 1
    // }
  }
  /**
   *
   * @param title
   * @param indent
   * @param keywords
   * @returns {Pal|function}
   */


  static build(title, {
    indent = 0,
    keywords
  } = {}) {
    return new Pal(title, {
      indent,
      keywords
    });
  }

  get asc() {
    this.indent++;
    return this;
  }

  get desc() {
    this.indent--;
    return this;
  }

}

var _roster = new WeakMap();

var _colorPool = new WeakMap();

var _keywords = new WeakMap();

class Says {
  /** @type {Object<string,Pal|function>} */

  /** @type {Set<string>} */

  /** @type {Object<string,string>} */
  constructor(roster, keywords) {
    _roster.set(this, {
      writable: true,
      value: {}
    });

    _colorPool.set(this, {
      writable: true,
      value: new Set()
    });

    _keywords.set(this, {
      writable: true,
      value: {}
    });

    if (roster) _classPrivateFieldSet(this, _roster, roster);
    if (keywords) _classPrivateFieldSet(this, _keywords, keywords);
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get(target, p, receiver) {
        var _p;

        if (p in target) return typeof (p = target[p]) === 'function' ? p.bind(target) : p;
        if (p in _classPrivateFieldGet(target, _roster)) return _classPrivateFieldGet(target, _roster)[p];
        let hex,
            n = 0;

        do {
          ({
            hex
          } = PalettSelector.random());
        } while (++n <= PalettSelector.pool && _classPrivateFieldGet(target, _colorPool).has(hex));

        _classPrivateFieldGet(target, _colorPool).add(hex);

        return _classPrivateFieldGet(target, _roster)[p] = Pal.build((_p = p, Hatsu.hex(hex)(_p)), {
          keywords: _classPrivateFieldGet(target, _keywords)
        });
      }

    });
  }

  aboard(name, hex) {
    var _name;

    _classPrivateFieldGet(this, _colorPool).add(hex);

    return _classPrivateFieldGet(this, _roster)[name] = Pal.build((_name = name, Hatsu.hex(hex)(_name)), {
      keywords: _classPrivateFieldGet(this, _keywords)
    });
  }

  get roster() {
    return Ob.mapValues(_classPrivateFieldGet(this, _roster), pal => pal.title);
  }

  get colorPool() {
    return _classPrivateFieldGet(this, _colorPool);
  }
  /**
   *
   * @param roster
   * @param keywords
   * @returns {Says|Object<string,function>}
   */


  static build({
    roster,
    keywords
  }) {
    return new Says(roster, keywords);
  }

}

const says = new Says();

export { Says, says };
