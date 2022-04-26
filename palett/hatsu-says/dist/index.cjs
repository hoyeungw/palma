'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hatsu = require('hatsu');
var palettTable = require('palett-table');
var kalorie = require('kalorie');
var veho = require('veho');

hatsu.Hatsu.hex;
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

class Pal extends kalorie.Callable {
  /** @type {string} */
  title = '';
  /** @type {number} */

  indent = 0;
  /** @type {Object<string,string>} */

  keywords = {};

  constructor(title, {
    indent = 0,
    keywords
  } = {}) {
    super(tx => render(tx, this));
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

class Says {
  /** @type {Object<string,Pal|function>} */
  #roster = {};
  /** @type {Set<string>} */

  #colorPool = new Set();
  /** @type {Object<string,string>} */

  #keywords = {};

  constructor(roster, keywords) {
    if (roster) this.#roster = roster;
    if (keywords) this.#keywords = keywords;
    return new Proxy(this, {
      /** @returns {Pal|function} */
      get(target, p, receiver) {
        var _p;

        if (p in target) return typeof (p = target[p]) === 'function' ? p.bind(target) : p;
        if (p in target.#roster) return target.#roster[p];
        let hex,
            n = 0;

        do {
          ({
            hex
          } = palettTable.PalettSelector.random());
        } while (++n <= palettTable.PalettSelector.pool && target.#colorPool.has(hex));

        target.#colorPool.add(hex);
        return target.#roster[p] = Pal.build((_p = p, hatsu.Hatsu.hex(hex)(_p)), {
          keywords: target.#keywords
        });
      }

    });
  }

  aboard(name, hex) {
    var _name;

    this.#colorPool.add(hex);
    return this.#roster[name] = Pal.build((_name = name, hatsu.Hatsu.hex(hex)(_name)), {
      keywords: this.#keywords
    });
  }

  get roster() {
    return veho.Ob.mapValues(this.#roster, pal => pal.title);
  }

  get colorPool() {
    return this.#colorPool;
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

exports.Says = Says;
exports.says = says;
