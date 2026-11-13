var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// dist/server/index.js
var Ma = Object.defineProperty;
var Ha = /* @__PURE__ */ __name((n18, e) => {
  for (var t in e) Ma(n18, t, { get: e[t], enumerable: true });
}, "Ha");
var dr = "6.17.0";
function ja(n18, e, t) {
  let r = e.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++) switch (e) {
    case "any":
      return;
    case "bigint":
    case "boolean":
    case "number":
    case "string":
      if (typeof n18 === e) return;
  }
  let a = new Error(`invalid value for type ${e}`);
  throw a.code = "INVALID_ARGUMENT", a.argument = `value.${t}`, a.value = n18, a;
}
__name(ja, "ja");
function T(n18, e, t) {
  for (let r in e) {
    let a = e[r], i = t ? t[r] : null;
    i && ja(a, i, r), Object.defineProperty(n18, r, { enumerable: true, value: a, writable: false });
  }
}
__name(T, "T");
function pt(n18, e) {
  if (n18 == null) return "null";
  if (e == null && (e = /* @__PURE__ */ new Set()), typeof n18 == "object") {
    if (e.has(n18)) return "[Circular]";
    e.add(n18);
  }
  if (Array.isArray(n18)) return "[ " + n18.map((t) => pt(t, e)).join(", ") + " ]";
  if (n18 instanceof Uint8Array) {
    let t = "0123456789abcdef", r = "0x";
    for (let a = 0; a < n18.length; a++) r += t[n18[a] >> 4], r += t[n18[a] & 15];
    return r;
  }
  if (typeof n18 == "object" && typeof n18.toJSON == "function") return pt(n18.toJSON(), e);
  switch (typeof n18) {
    case "boolean":
    case "number":
    case "symbol":
      return n18.toString();
    case "bigint":
      return BigInt(n18).toString();
    case "string":
      return JSON.stringify(n18);
    case "object": {
      let t = Object.keys(n18);
      return t.sort(), "{ " + t.map((r) => `${pt(r, e)}: ${pt(n18[r], e)}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
__name(pt, "pt");
function Vt(n18, e) {
  return n18 && n18.code === e;
}
__name(Vt, "Vt");
function Gt(n18, e, t) {
  let r = n18;
  {
    let i = [];
    if (t) {
      if ("message" in t || "code" in t || "name" in t) throw new Error(`value will overwrite populated values: ${pt(t)}`);
      for (let o in t) {
        if (o === "shortMessage") continue;
        let s = t[o];
        i.push(o + "=" + pt(s));
      }
    }
    i.push(`code=${e}`), i.push(`version=${dr}`), i.length && (n18 += " (" + i.join(", ") + ")");
  }
  let a;
  switch (e) {
    case "INVALID_ARGUMENT":
      a = new TypeError(n18);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      a = new RangeError(n18);
      break;
    default:
      a = new Error(n18);
  }
  return T(a, { code: e }), t && Object.assign(a, t), a.shortMessage == null && T(a, { shortMessage: r }), a;
}
__name(Gt, "Gt");
function O(n18, e, t, r) {
  if (!n18) throw Gt(e, t, r);
}
__name(O, "O");
function p(n18, e, t, r) {
  O(n18, e, "INVALID_ARGUMENT", { argument: t, value: r });
}
__name(p, "p");
function xt(n18, e, t) {
  t == null && (t = ""), t && (t = ": " + t), O(n18 >= e, "missing argument" + t, "MISSING_ARGUMENT", { count: n18, expectedCount: e }), O(n18 <= e, "too many arguments" + t, "UNEXPECTED_ARGUMENT", { count: n18, expectedCount: e });
}
__name(xt, "xt");
var Va = ["NFD", "NFC", "NFKD", "NFKC"].reduce((n18, e) => {
  try {
    if ("test".normalize(e) !== "test") throw new Error("bad");
    if (e === "NFD" && "\xE9".normalize("NFD") !== "e\u0301") throw new Error("broken");
    n18.push(e);
  } catch {
  }
  return n18;
}, []);
function kn(n18) {
  O(Va.indexOf(n18) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", { operation: "String.prototype.normalize", info: { form: n18 } });
}
__name(kn, "kn");
function Le(n18, e, t) {
  if (t == null && (t = ""), n18 !== e) {
    let r = t, a = "new";
    t && (r += ".", a += " " + t), O(false, `private constructor; use ${r}from* methods`, "UNSUPPORTED_OPERATION", { operation: a });
  }
}
__name(Le, "Le");
function hr(n18, e, t) {
  if (n18 instanceof Uint8Array) return t ? new Uint8Array(n18) : n18;
  if (typeof n18 == "string" && n18.length % 2 === 0 && n18.match(/^0x[0-9a-f]*$/i)) {
    let r = new Uint8Array((n18.length - 2) / 2), a = 2;
    for (let i = 0; i < r.length; i++) r[i] = parseInt(n18.substring(a, a + 2), 16), a += 2;
    return r;
  }
  p(false, "invalid BytesLike value", e || "value", n18);
}
__name(hr, "hr");
function _(n18, e) {
  return hr(n18, e, false);
}
__name(_, "_");
function V(n18, e) {
  return hr(n18, e, true);
}
__name(V, "V");
function Ce(n18, e) {
  return !(typeof n18 != "string" || !n18.match(/^0x[0-9A-Fa-f]*$/) || typeof e == "number" && n18.length !== 2 + 2 * e || e === true && n18.length % 2 !== 0);
}
__name(Ce, "Ce");
var pr = "0123456789abcdef";
function k(n18) {
  let e = _(n18), t = "0x";
  for (let r = 0; r < e.length; r++) {
    let a = e[r];
    t += pr[(a & 240) >> 4] + pr[a & 15];
  }
  return t;
}
__name(k, "k");
function Y(n18) {
  return "0x" + n18.map((e) => k(e).substring(2)).join("");
}
__name(Y, "Y");
function Fe(n18) {
  return Ce(n18, true) ? (n18.length - 2) / 2 : _(n18).length;
}
__name(Fe, "Fe");
function Re(n18, e, t) {
  let r = _(n18);
  return t != null && t > r.length && O(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", { buffer: r, length: r.length, offset: t }), k(r.slice(e ?? 0, t ?? r.length));
}
__name(Re, "Re");
function mr(n18, e, t) {
  let r = _(n18);
  O(e >= r.length, "padding exceeds data length", "BUFFER_OVERRUN", { buffer: new Uint8Array(r), length: e, offset: e + 1 });
  let a = new Uint8Array(e);
  return a.fill(0), t ? a.set(r, e - r.length) : a.set(r, 0), k(a);
}
__name(mr, "mr");
function At(n18, e) {
  return mr(n18, e, true);
}
__name(At, "At");
function Sn(n18, e) {
  return mr(n18, e, false);
}
__name(Sn, "Sn");
var Et = BigInt(0);
var pe = BigInt(1);
var ht = 9007199254740991;
function Dn(n18, e) {
  let t = Bt(n18, "value"), r = BigInt(J(e, "width"));
  if (O(t >> r === Et, "overflow", "NUMERIC_FAULT", { operation: "fromTwos", fault: "overflow", value: n18 }), t >> r - pe) {
    let a = (pe << r) - pe;
    return -((~t & a) + pe);
  }
  return t;
}
__name(Dn, "Dn");
function Nn(n18, e) {
  let t = ee(n18, "value"), r = BigInt(J(e, "width")), a = pe << r - pe;
  if (t < Et) {
    t = -t, O(t <= a, "too low", "NUMERIC_FAULT", { operation: "toTwos", fault: "overflow", value: n18 });
    let i = (pe << r) - pe;
    return (~t & i) + pe;
  } else O(t < a, "too high", "NUMERIC_FAULT", { operation: "toTwos", fault: "overflow", value: n18 });
  return t;
}
__name(Nn, "Nn");
function mt(n18, e) {
  let t = Bt(n18, "value"), r = BigInt(J(e, "bits"));
  return t & (pe << r) - pe;
}
__name(mt, "mt");
function ee(n18, e) {
  switch (typeof n18) {
    case "bigint":
      return n18;
    case "number":
      return p(Number.isInteger(n18), "underflow", e || "value", n18), p(n18 >= -ht && n18 <= ht, "overflow", e || "value", n18), BigInt(n18);
    case "string":
      try {
        if (n18 === "") throw new Error("empty string");
        return n18[0] === "-" && n18[1] !== "-" ? -BigInt(n18.substring(1)) : BigInt(n18);
      } catch (t) {
        p(false, `invalid BigNumberish string: ${t.message}`, e || "value", n18);
      }
  }
  p(false, "invalid BigNumberish value", e || "value", n18);
}
__name(ee, "ee");
function Bt(n18, e) {
  let t = ee(n18, e);
  return O(t >= Et, "unsigned value cannot be negative", "NUMERIC_FAULT", { fault: "overflow", operation: "getUint", value: n18 }), t;
}
__name(Bt, "Bt");
var gr = "0123456789abcdef";
function Qt(n18) {
  if (n18 instanceof Uint8Array) {
    let e = "0x0";
    for (let t of n18) e += gr[t >> 4], e += gr[t & 15];
    return BigInt(e);
  }
  return ee(n18);
}
__name(Qt, "Qt");
function J(n18, e) {
  switch (typeof n18) {
    case "bigint":
      return p(n18 >= -ht && n18 <= ht, "overflow", e || "value", n18), Number(n18);
    case "number":
      return p(Number.isInteger(n18), "underflow", e || "value", n18), p(n18 >= -ht && n18 <= ht, "overflow", e || "value", n18), n18;
    case "string":
      try {
        if (n18 === "") throw new Error("empty string");
        return J(BigInt(n18), e);
      } catch (t) {
        p(false, `invalid numeric string: ${t.message}`, e || "value", n18);
      }
  }
  p(false, "invalid numeric value", e || "value", n18);
}
__name(J, "J");
function Tn(n18) {
  return J(Qt(n18));
}
__name(Tn, "Tn");
function Ue(n18, e) {
  let t = Bt(n18, "value"), r = t.toString(16);
  if (e == null) r.length % 2 && (r = "0" + r);
  else {
    let a = J(e, "width");
    if (a === 0 && t === Et) return "0x";
    for (O(a * 2 >= r.length, `value exceeds width (${a} bytes)`, "NUMERIC_FAULT", { operation: "toBeHex", fault: "overflow", value: n18 }); r.length < a * 2; ) r = "0" + r;
  }
  return "0x" + r;
}
__name(Ue, "Ue");
function kt(n18, e) {
  let t = Bt(n18, "value");
  if (t === Et) {
    let i = e != null ? J(e, "width") : 0;
    return new Uint8Array(i);
  }
  let r = t.toString(16);
  if (r.length % 2 && (r = "0" + r), e != null) {
    let i = J(e, "width");
    for (; r.length < i * 2; ) r = "00" + r;
    O(i * 2 === r.length, `value exceeds width (${i} bytes)`, "NUMERIC_FAULT", { operation: "toBeArray", fault: "overflow", value: n18 });
  }
  let a = new Uint8Array(r.length / 2);
  for (let i = 0; i < a.length; i++) {
    let o = i * 2;
    a[i] = parseInt(r.substring(o, o + 2), 16);
  }
  return a;
}
__name(kt, "kt");
function Ga(n18, e, t, r, a) {
  p(false, `invalid codepoint at offset ${e}; ${n18}`, "bytes", t);
}
__name(Ga, "Ga");
function yr(n18, e, t, r, a) {
  if (n18 === "BAD_PREFIX" || n18 === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = e + 1; o < t.length && t[o] >> 6 === 2; o++) i++;
    return i;
  }
  return n18 === "OVERRUN" ? t.length - e - 1 : 0;
}
__name(yr, "yr");
function Qa(n18, e, t, r, a) {
  return n18 === "OVERLONG" ? (p(typeof a == "number", "invalid bad code point for replacement", "badCodepoint", a), r.push(a), 0) : (r.push(65533), yr(n18, e, t, r, a));
}
__name(Qa, "Qa");
var br = Object.freeze({ error: Ga, ignore: yr, replace: Qa });
function qa(n18, e) {
  e == null && (e = br.error);
  let t = _(n18, "bytes"), r = [], a = 0;
  for (; a < t.length; ) {
    let i = t[a++];
    if (i >> 7 === 0) {
      r.push(i);
      continue;
    }
    let o = null, s = null;
    if ((i & 224) === 192) o = 1, s = 127;
    else if ((i & 240) === 224) o = 2, s = 2047;
    else if ((i & 248) === 240) o = 3, s = 65535;
    else {
      (i & 192) === 128 ? a += e("UNEXPECTED_CONTINUE", a - 1, t, r) : a += e("BAD_PREFIX", a - 1, t, r);
      continue;
    }
    if (a - 1 + o >= t.length) {
      a += e("OVERRUN", a - 1, t, r);
      continue;
    }
    let l = i & (1 << 8 - o - 1) - 1;
    for (let u = 0; u < o; u++) {
      let c = t[a];
      if ((c & 192) != 128) {
        a += e("MISSING_CONTINUE", a, t, r), l = null;
        break;
      }
      l = l << 6 | c & 63, a++;
    }
    if (l !== null) {
      if (l > 1114111) {
        a += e("OUT_OF_RANGE", a - 1 - o, t, r, l);
        continue;
      }
      if (l >= 55296 && l <= 57343) {
        a += e("UTF16_SURROGATE", a - 1 - o, t, r, l);
        continue;
      }
      if (l <= s) {
        a += e("OVERLONG", a - 1 - o, t, r, l);
        continue;
      }
      r.push(l);
    }
  }
  return r;
}
__name(qa, "qa");
function ve(n18, e) {
  p(typeof n18 == "string", "invalid string value", "str", n18), e != null && (kn(e), n18 = n18.normalize(e));
  let t = [];
  for (let r = 0; r < n18.length; r++) {
    let a = n18.charCodeAt(r);
    if (a < 128) t.push(a);
    else if (a < 2048) t.push(a >> 6 | 192), t.push(a & 63 | 128);
    else if ((a & 64512) == 55296) {
      r++;
      let i = n18.charCodeAt(r);
      p(r < n18.length && (i & 64512) === 56320, "invalid surrogate pair", "str", n18);
      let o = 65536 + ((a & 1023) << 10) + (i & 1023);
      t.push(o >> 18 | 240), t.push(o >> 12 & 63 | 128), t.push(o >> 6 & 63 | 128), t.push(o & 63 | 128);
    } else t.push(a >> 12 | 224), t.push(a >> 6 & 63 | 128), t.push(a & 63 | 128);
  }
  return new Uint8Array(t);
}
__name(ve, "ve");
function Ka(n18) {
  return n18.map((e) => e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10 & 1023) + 55296, (e & 1023) + 56320))).join("");
}
__name(Ka, "Ka");
function Pn(n18, e) {
  return Ka(qa(n18, e));
}
__name(Pn, "Pn");
var W = 32;
var In = new Uint8Array(W);
var Ja = ["then"];
var qt = {};
var vr = /* @__PURE__ */ new WeakMap();
function Ye(n18) {
  return vr.get(n18);
}
__name(Ye, "Ye");
function Cr(n18, e) {
  vr.set(n18, e);
}
__name(Cr, "Cr");
function St(n18, e) {
  let t = new Error(`deferred error during ABI decoding triggered accessing ${n18}`);
  throw t.error = e, t;
}
__name(St, "St");
function On(n18, e, t) {
  return n18.indexOf(null) >= 0 ? e.map((r, a) => r instanceof we ? On(Ye(r), r, t) : r) : n18.reduce((r, a, i) => {
    let o = e.getValue(a);
    return a in r || (t && o instanceof we && (o = On(Ye(o), o, t)), r[a] = o), r;
  }, {});
}
__name(On, "On");
var we = class n extends Array {
  static {
    __name(this, "n");
  }
  #e;
  constructor(...e) {
    let t = e[0], r = e[1], a = (e[2] || []).slice(), i = true;
    t !== qt && (r = e, a = [], i = false), super(r.length), r.forEach((l, u) => {
      this[u] = l;
    });
    let o = a.reduce((l, u) => (typeof u == "string" && l.set(u, (l.get(u) || 0) + 1), l), /* @__PURE__ */ new Map());
    if (Cr(this, Object.freeze(r.map((l, u) => {
      let c = a[u];
      return c != null && o.get(c) === 1 ? c : null;
    }))), this.#e = [], this.#e == null && this.#e, !i) return;
    Object.freeze(this);
    let s = new Proxy(this, { get: /* @__PURE__ */ __name((l, u, c) => {
      if (typeof u == "string") {
        if (u.match(/^[0-9]+$/)) {
          let h = J(u, "%index");
          if (h < 0 || h >= this.length) throw new RangeError("out of result range");
          let m = l[h];
          return m instanceof Error && St(`index ${h}`, m), m;
        }
        if (Ja.indexOf(u) >= 0) return Reflect.get(l, u, c);
        let f = l[u];
        if (f instanceof Function) return function(...h) {
          return f.apply(this === c ? l : this, h);
        };
        if (!(u in l)) return l.getValue.apply(this === c ? l : this, [u]);
      }
      return Reflect.get(l, u, c);
    }, "get") });
    return Cr(s, Ye(this)), s;
  }
  toArray(e) {
    let t = [];
    return this.forEach((r, a) => {
      r instanceof Error && St(`index ${a}`, r), e && r instanceof n && (r = r.toArray(e)), t.push(r);
    }), t;
  }
  toObject(e) {
    let t = Ye(this);
    return t.reduce((r, a, i) => (O(a != null, `value at index ${i} unnamed`, "UNSUPPORTED_OPERATION", { operation: "toObject()" }), On(t, this, e)), {});
  }
  slice(e, t) {
    e == null && (e = 0), e < 0 && (e += this.length, e < 0 && (e = 0)), t == null && (t = this.length), t < 0 && (t += this.length, t < 0 && (t = 0)), t > this.length && (t = this.length);
    let r = Ye(this), a = [], i = [];
    for (let o = e; o < t; o++) a.push(this[o]), i.push(r[o]);
    return new n(qt, a, i);
  }
  filter(e, t) {
    let r = Ye(this), a = [], i = [];
    for (let o = 0; o < this.length; o++) {
      let s = this[o];
      s instanceof Error && St(`index ${o}`, s), e.call(t, s, o, this) && (a.push(s), i.push(r[o]));
    }
    return new n(qt, a, i);
  }
  map(e, t) {
    let r = [];
    for (let a = 0; a < this.length; a++) {
      let i = this[a];
      i instanceof Error && St(`index ${a}`, i), r.push(e.call(t, i, a, this));
    }
    return r;
  }
  getValue(e) {
    let t = Ye(this).indexOf(e);
    if (t === -1) return;
    let r = this[t];
    return r instanceof Error && St(`property ${JSON.stringify(e)}`, r.error), r;
  }
  static fromItems(e, t) {
    return new n(qt, e, t);
  }
};
function wr(n18) {
  let e = kt(n18);
  return O(e.length <= W, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: e, length: W, offset: e.length }), e.length !== W && (e = V(Y([In.slice(e.length % W), e]))), e;
}
__name(wr, "wr");
var G = class {
  static {
    __name(this, "G");
  }
  name;
  type;
  localName;
  dynamic;
  constructor(e, t, r, a) {
    T(this, { name: e, type: t, localName: r, dynamic: a }, { name: "string", type: "string", localName: "string", dynamic: "boolean" });
  }
  _throwError(e, t) {
    p(false, e, this.localName, t);
  }
};
var Xe = class {
  static {
    __name(this, "Xe");
  }
  #e;
  #t;
  constructor() {
    this.#e = [], this.#t = 0;
  }
  get data() {
    return Y(this.#e);
  }
  get length() {
    return this.#t;
  }
  #r(e) {
    return this.#e.push(e), this.#t += e.length, e.length;
  }
  appendWriter(e) {
    return this.#r(V(e.data));
  }
  writeBytes(e) {
    let t = V(e), r = t.length % W;
    return r && (t = V(Y([t, In.slice(r)]))), this.#r(t);
  }
  writeValue(e) {
    return this.#r(wr(e));
  }
  writeUpdatableValue() {
    let e = this.#e.length;
    return this.#e.push(In), this.#t += W, (t) => {
      this.#e[e] = wr(t);
    };
  }
};
var Kt = class n2 {
  static {
    __name(this, "n");
  }
  allowLoose;
  #e;
  #t;
  #r;
  #n;
  #a;
  constructor(e, t, r) {
    T(this, { allowLoose: !!t }), this.#e = V(e), this.#r = 0, this.#n = null, this.#a = r ?? 1024, this.#t = 0;
  }
  get data() {
    return k(this.#e);
  }
  get dataLength() {
    return this.#e.length;
  }
  get consumed() {
    return this.#t;
  }
  get bytes() {
    return new Uint8Array(this.#e);
  }
  #i(e) {
    if (this.#n) return this.#n.#i(e);
    this.#r += e, O(this.#a < 1 || this.#r <= this.#a * this.dataLength, `compressed ABI data exceeds inflation ratio of ${this.#a} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", { buffer: V(this.#e), offset: this.#t, length: e, info: { bytesRead: this.#r, dataLength: this.dataLength } });
  }
  #o(e, t, r) {
    let a = Math.ceil(t / W) * W;
    return this.#t + a > this.#e.length && (this.allowLoose && r && this.#t + t <= this.#e.length ? a = t : O(false, "data out-of-bounds", "BUFFER_OVERRUN", { buffer: V(this.#e), length: this.#e.length, offset: this.#t + a })), this.#e.slice(this.#t, this.#t + a);
  }
  subReader(e) {
    let t = new n2(this.#e.slice(this.#t + e), this.allowLoose, this.#a);
    return t.#n = this, t;
  }
  readBytes(e, t) {
    let r = this.#o(0, e, !!t);
    return this.#i(e), this.#t += r.length, r.slice(0, e);
  }
  readValue() {
    return Qt(this.readBytes(W));
  }
  readIndex() {
    return Tn(this.readBytes(W));
  }
};
function Dt(n18) {
  if (!Number.isSafeInteger(n18) || n18 < 0) throw new Error(`Wrong positive integer: ${n18}`);
}
__name(Dt, "Dt");
function Nt(n18, ...e) {
  if (!(n18 instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (e.length > 0 && !e.includes(n18.length)) throw new Error(`Expected Uint8Array of length ${e}, not of length=${n18.length}`);
}
__name(Nt, "Nt");
function xr(n18) {
  if (typeof n18 != "function" || typeof n18.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Dt(n18.outputLen), Dt(n18.blockLen);
}
__name(xr, "xr");
function xe(n18, e = true) {
  if (n18.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && n18.finished) throw new Error("Hash#digest() has already been called");
}
__name(xe, "xe");
function Jt(n18, e) {
  Nt(n18);
  let t = e.outputLen;
  if (n18.length < t) throw new Error(`digestInto() expects output buffer of length at least ${t}`);
}
__name(Jt, "Jt");
var Wt = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
var Ar = /* @__PURE__ */ __name((n18) => n18 instanceof Uint8Array, "Ar");
var Er = /* @__PURE__ */ __name((n18) => new Uint32Array(n18.buffer, n18.byteOffset, Math.floor(n18.byteLength / 4)), "Er");
var $t = /* @__PURE__ */ __name((n18) => new DataView(n18.buffer, n18.byteOffset, n18.byteLength), "$t");
var he = /* @__PURE__ */ __name((n18, e) => n18 << 32 - e | n18 >>> e, "he");
var Wa = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Wa) throw new Error("Non little-endian hardware is not supported");
function $a(n18) {
  if (typeof n18 != "string") throw new Error(`utf8ToBytes expected string, got ${typeof n18}`);
  return new Uint8Array(new TextEncoder().encode(n18));
}
__name($a, "$a");
function _e(n18) {
  if (typeof n18 == "string" && (n18 = $a(n18)), !Ar(n18)) throw new Error(`expected Uint8Array, got ${typeof n18}`);
  return n18;
}
__name(_e, "_e");
function Br(...n18) {
  let e = new Uint8Array(n18.reduce((r, a) => r + a.length, 0)), t = 0;
  return n18.forEach((r) => {
    if (!Ar(r)) throw new Error("Uint8Array expected");
    e.set(r, t), t += r.length;
  }), e;
}
__name(Br, "Br");
var ze = class {
  static {
    __name(this, "ze");
  }
  clone() {
    return this._cloneInto();
  }
};
var qo = {}.toString;
function Yt(n18) {
  let e = /* @__PURE__ */ __name((r) => n18().update(_e(r)).digest(), "e"), t = n18();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => n18(), e;
}
__name(Yt, "Yt");
function kr(n18) {
  let e = /* @__PURE__ */ __name((r, a) => n18(a).update(_e(r)).digest(), "e"), t = n18({});
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = (r) => n18(r), e;
}
__name(kr, "kr");
function Sr(n18 = 32) {
  if (Wt && typeof Wt.getRandomValues == "function") return Wt.getRandomValues(new Uint8Array(n18));
  throw new Error("crypto.getRandomValues must be defined");
}
__name(Sr, "Sr");
var Xt = class extends ze {
  static {
    __name(this, "Xt");
  }
  constructor(e, t) {
    super(), this.finished = false, this.destroyed = false, xr(e);
    let r = _e(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    let a = this.blockLen, i = new Uint8Array(a);
    i.set(r.length > a ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++) i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++) i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(e) {
    return xe(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    xe(this), Nt(e, this.outputLen), this.finished = true, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    let e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    let { oHash: t, iHash: r, finished: a, destroyed: i, blockLen: o, outputLen: s } = this;
    return e = e, e.finished = a, e.destroyed = i, e.blockLen = o, e.outputLen = s, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var Ln = /* @__PURE__ */ __name((n18, e, t) => new Xt(n18, e).update(t).digest(), "Ln");
Ln.create = (n18, e) => new Xt(n18, e);
function Ya(n18, e, t, r) {
  if (typeof n18.setBigUint64 == "function") return n18.setBigUint64(e, t, r);
  let a = BigInt(32), i = BigInt(4294967295), o = Number(t >> a & i), s = Number(t & i), l = r ? 4 : 0, u = r ? 0 : 4;
  n18.setUint32(e + l, o, r), n18.setUint32(e + u, s, r);
}
__name(Ya, "Ya");
var Zt = class extends ze {
  static {
    __name(this, "Zt");
  }
  constructor(e, t, r, a) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = a, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(e), this.view = $t(this.buffer);
  }
  update(e) {
    xe(this);
    let { view: t, buffer: r, blockLen: a } = this;
    e = _e(e);
    let i = e.length;
    for (let o = 0; o < i; ) {
      let s = Math.min(a - this.pos, i - o);
      if (s === a) {
        let l = $t(e);
        for (; a <= i - o; o += a) this.process(l, o);
        continue;
      }
      r.set(e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === a && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    xe(this), Jt(e, this), this.finished = true;
    let { buffer: t, view: r, blockLen: a, isLE: i } = this, { pos: o } = this;
    t[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > a - o && (this.process(r, 0), o = 0);
    for (let f = o; f < a; f++) t[f] = 0;
    Ya(r, a - 8, BigInt(this.length * 8), i), this.process(r, 0);
    let s = $t(e), l = this.outputLen;
    if (l % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    let u = l / 4, c = this.get();
    if (u > c.length) throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < u; f++) s.setUint32(4 * f, c[f], i);
  }
  digest() {
    let { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    let r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    let { blockLen: t, buffer: r, length: a, finished: i, destroyed: o, pos: s } = this;
    return e.length = a, e.pos = s, e.finished = i, e.destroyed = o, a % t && e.buffer.set(r), e;
  }
};
var Xa = /* @__PURE__ */ __name((n18, e, t) => n18 & e ^ ~n18 & t, "Xa");
var Za = /* @__PURE__ */ __name((n18, e, t) => n18 & e ^ n18 & t ^ e & t, "Za");
var ei = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var Me = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var He = new Uint32Array(64);
var Fn = class extends Zt {
  static {
    __name(this, "Fn");
  }
  constructor() {
    super(64, 32, 8, false), this.A = Me[0] | 0, this.B = Me[1] | 0, this.C = Me[2] | 0, this.D = Me[3] | 0, this.E = Me[4] | 0, this.F = Me[5] | 0, this.G = Me[6] | 0, this.H = Me[7] | 0;
  }
  get() {
    let { A: e, B: t, C: r, D: a, E: i, F: o, G: s, H: l } = this;
    return [e, t, r, a, i, o, s, l];
  }
  set(e, t, r, a, i, o, s, l) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = a | 0, this.E = i | 0, this.F = o | 0, this.G = s | 0, this.H = l | 0;
  }
  process(e, t) {
    for (let f = 0; f < 16; f++, t += 4) He[f] = e.getUint32(t, false);
    for (let f = 16; f < 64; f++) {
      let h = He[f - 15], m = He[f - 2], C = he(h, 7) ^ he(h, 18) ^ h >>> 3, d = he(m, 17) ^ he(m, 19) ^ m >>> 10;
      He[f] = d + He[f - 7] + C + He[f - 16] | 0;
    }
    let { A: r, B: a, C: i, D: o, E: s, F: l, G: u, H: c } = this;
    for (let f = 0; f < 64; f++) {
      let h = he(s, 6) ^ he(s, 11) ^ he(s, 25), m = c + h + Xa(s, l, u) + ei[f] + He[f] | 0, d = (he(r, 2) ^ he(r, 13) ^ he(r, 22)) + Za(r, a, i) | 0;
      c = u, u = l, l = s, s = o + m | 0, o = i, i = a, a = r, r = m + d | 0;
    }
    r = r + this.A | 0, a = a + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, l = l + this.F | 0, u = u + this.G | 0, c = c + this.H | 0, this.set(r, a, i, o, s, l, u, c);
  }
  roundClean() {
    He.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var Dr = Yt(() => new Fn());
var en = BigInt(4294967295);
var Nr = BigInt(32);
function ti(n18, e = false) {
  return e ? { h: Number(n18 & en), l: Number(n18 >> Nr & en) } : { h: Number(n18 >> Nr & en) | 0, l: Number(n18 & en) | 0 };
}
__name(ti, "ti");
function Tr(n18, e = false) {
  let t = new Uint32Array(n18.length), r = new Uint32Array(n18.length);
  for (let a = 0; a < n18.length; a++) {
    let { h: i, l: o } = ti(n18[a], e);
    [t[a], r[a]] = [i, o];
  }
  return [t, r];
}
__name(Tr, "Tr");
var Pr = /* @__PURE__ */ __name((n18, e, t) => n18 << t | e >>> 32 - t, "Pr");
var Ir = /* @__PURE__ */ __name((n18, e, t) => e << t | n18 >>> 32 - t, "Ir");
var Or = /* @__PURE__ */ __name((n18, e, t) => e << t - 32 | n18 >>> 64 - t, "Or");
var Lr = /* @__PURE__ */ __name((n18, e, t) => n18 << t - 32 | e >>> 64 - t, "Lr");
var [Ur, zr, _r] = [[], [], []];
var ni = BigInt(0);
var Tt = BigInt(1);
var ri = BigInt(2);
var ai = BigInt(7);
var ii = BigInt(256);
var oi = BigInt(113);
for (let n18 = 0, e = Tt, t = 1, r = 0; n18 < 24; n18++) {
  [t, r] = [r, (2 * t + 3 * r) % 5], Ur.push(2 * (5 * r + t)), zr.push((n18 + 1) * (n18 + 2) / 2 % 64);
  let a = ni;
  for (let i = 0; i < 7; i++) e = (e << Tt ^ (e >> ai) * oi) % ii, e & ri && (a ^= Tt << (Tt << BigInt(i)) - Tt);
  _r.push(a);
}
var [si, li] = Tr(_r, true);
var Fr = /* @__PURE__ */ __name((n18, e, t) => t > 32 ? Or(n18, e, t) : Pr(n18, e, t), "Fr");
var Rr = /* @__PURE__ */ __name((n18, e, t) => t > 32 ? Lr(n18, e, t) : Ir(n18, e, t), "Rr");
function ui(n18, e = 24) {
  let t = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++) t[o] = n18[o] ^ n18[o + 10] ^ n18[o + 20] ^ n18[o + 30] ^ n18[o + 40];
    for (let o = 0; o < 10; o += 2) {
      let s = (o + 8) % 10, l = (o + 2) % 10, u = t[l], c = t[l + 1], f = Fr(u, c, 1) ^ t[s], h = Rr(u, c, 1) ^ t[s + 1];
      for (let m = 0; m < 50; m += 10) n18[o + m] ^= f, n18[o + m + 1] ^= h;
    }
    let a = n18[2], i = n18[3];
    for (let o = 0; o < 24; o++) {
      let s = zr[o], l = Fr(a, i, s), u = Rr(a, i, s), c = Ur[o];
      a = n18[c], i = n18[c + 1], n18[c] = l, n18[c + 1] = u;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let s = 0; s < 10; s++) t[s] = n18[o + s];
      for (let s = 0; s < 10; s++) n18[o + s] ^= ~t[(s + 2) % 10] & t[(s + 4) % 10];
    }
    n18[0] ^= si[r], n18[1] ^= li[r];
  }
  t.fill(0);
}
__name(ui, "ui");
var tn = class n3 extends ze {
  static {
    __name(this, "n");
  }
  constructor(e, t, r, a = false, i = 24) {
    if (super(), this.blockLen = e, this.suffix = t, this.outputLen = r, this.enableXOF = a, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Dt(r), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Er(this.state);
  }
  keccak() {
    ui(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    xe(this);
    let { blockLen: t, state: r } = this;
    e = _e(e);
    let a = e.length;
    for (let i = 0; i < a; ) {
      let o = Math.min(t - this.pos, a - i);
      for (let s = 0; s < o; s++) r[this.pos++] ^= e[i++];
      this.pos === t && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = true;
    let { state: e, suffix: t, pos: r, blockLen: a } = this;
    e[r] ^= t, (t & 128) !== 0 && r === a - 1 && this.keccak(), e[a - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    xe(this, false), Nt(e), this.finish();
    let t = this.state, { blockLen: r } = this;
    for (let a = 0, i = e.length; a < i; ) {
      this.posOut >= r && this.keccak();
      let o = Math.min(r - this.posOut, i - a);
      e.set(t.subarray(this.posOut, this.posOut + o), a), this.posOut += o, a += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return Dt(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Jt(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(e) {
    let { blockLen: t, suffix: r, outputLen: a, rounds: i, enableXOF: o } = this;
    return e || (e = new n3(t, r, a, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = a, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
var je = /* @__PURE__ */ __name((n18, e, t) => Yt(() => new tn(e, n18, t)), "je");
var ss = je(6, 144, 224 / 8);
var ls = je(6, 136, 256 / 8);
var us = je(6, 104, 384 / 8);
var cs = je(6, 72, 512 / 8);
var fs = je(1, 144, 224 / 8);
var Mr = je(1, 136, 256 / 8);
var ds = je(1, 104, 384 / 8);
var ps = je(1, 72, 512 / 8);
var Hr = /* @__PURE__ */ __name((n18, e, t) => kr((r = {}) => new tn(e, n18, r.dkLen === void 0 ? t : r.dkLen, true)), "Hr");
var hs = Hr(31, 168, 128 / 8);
var ms = Hr(31, 136, 256 / 8);
var jr = false;
var Vr = /* @__PURE__ */ __name(function(n18) {
  return Mr(n18);
}, "Vr");
var Gr = Vr;
function X(n18) {
  let e = _(n18, "data");
  return k(Gr(e));
}
__name(X, "X");
X._ = Vr;
X.lock = function() {
  jr = true;
};
X.register = function(n18) {
  if (jr) throw new TypeError("keccak256 is locked");
  Gr = n18;
};
Object.freeze(X);
var _n = {};
Ha(_n, { bitGet: /* @__PURE__ */ __name(() => gi, "bitGet"), bitLen: /* @__PURE__ */ __name(() => mi, "bitLen"), bitMask: /* @__PURE__ */ __name(() => Pt, "bitMask"), bitSet: /* @__PURE__ */ __name(() => yi, "bitSet"), bytesToHex: /* @__PURE__ */ __name(() => Ze, "bytesToHex"), bytesToNumberBE: /* @__PURE__ */ __name(() => Ae, "bytesToNumberBE"), bytesToNumberLE: /* @__PURE__ */ __name(() => an, "bytesToNumberLE"), concatBytes: /* @__PURE__ */ __name(() => gt, "concatBytes"), createHmacDrbg: /* @__PURE__ */ __name(() => zn, "createHmacDrbg"), ensureBytes: /* @__PURE__ */ __name(() => le, "ensureBytes"), equalBytes: /* @__PURE__ */ __name(() => pi, "equalBytes"), hexToBytes: /* @__PURE__ */ __name(() => et, "hexToBytes"), hexToNumber: /* @__PURE__ */ __name(() => Un, "hexToNumber"), numberToBytesBE: /* @__PURE__ */ __name(() => Ve, "numberToBytesBE"), numberToBytesLE: /* @__PURE__ */ __name(() => on, "numberToBytesLE"), numberToHexUnpadded: /* @__PURE__ */ __name(() => Kr, "numberToHexUnpadded"), numberToVarBytesBE: /* @__PURE__ */ __name(() => di, "numberToVarBytesBE"), utf8ToBytes: /* @__PURE__ */ __name(() => hi, "utf8ToBytes"), validateObject: /* @__PURE__ */ __name(() => Ge, "validateObject") });
var qr = BigInt(0);
var nn = BigInt(1);
var ci = BigInt(2);
var rn = /* @__PURE__ */ __name((n18) => n18 instanceof Uint8Array, "rn");
var fi = Array.from({ length: 256 }, (n18, e) => e.toString(16).padStart(2, "0"));
function Ze(n18) {
  if (!rn(n18)) throw new Error("Uint8Array expected");
  let e = "";
  for (let t = 0; t < n18.length; t++) e += fi[n18[t]];
  return e;
}
__name(Ze, "Ze");
function Kr(n18) {
  let e = n18.toString(16);
  return e.length & 1 ? `0${e}` : e;
}
__name(Kr, "Kr");
function Un(n18) {
  if (typeof n18 != "string") throw new Error("hex string expected, got " + typeof n18);
  return BigInt(n18 === "" ? "0" : `0x${n18}`);
}
__name(Un, "Un");
function et(n18) {
  if (typeof n18 != "string") throw new Error("hex string expected, got " + typeof n18);
  let e = n18.length;
  if (e % 2) throw new Error("padded hex string expected, got unpadded hex of length " + e);
  let t = new Uint8Array(e / 2);
  for (let r = 0; r < t.length; r++) {
    let a = r * 2, i = n18.slice(a, a + 2), o = Number.parseInt(i, 16);
    if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
    t[r] = o;
  }
  return t;
}
__name(et, "et");
function Ae(n18) {
  return Un(Ze(n18));
}
__name(Ae, "Ae");
function an(n18) {
  if (!rn(n18)) throw new Error("Uint8Array expected");
  return Un(Ze(Uint8Array.from(n18).reverse()));
}
__name(an, "an");
function Ve(n18, e) {
  return et(n18.toString(16).padStart(e * 2, "0"));
}
__name(Ve, "Ve");
function on(n18, e) {
  return Ve(n18, e).reverse();
}
__name(on, "on");
function di(n18) {
  return et(Kr(n18));
}
__name(di, "di");
function le(n18, e, t) {
  let r;
  if (typeof e == "string") try {
    r = et(e);
  } catch (i) {
    throw new Error(`${n18} must be valid hex string, got "${e}". Cause: ${i}`);
  }
  else if (rn(e)) r = Uint8Array.from(e);
  else throw new Error(`${n18} must be hex string or Uint8Array`);
  let a = r.length;
  if (typeof t == "number" && a !== t) throw new Error(`${n18} expected ${t} bytes, got ${a}`);
  return r;
}
__name(le, "le");
function gt(...n18) {
  let e = new Uint8Array(n18.reduce((r, a) => r + a.length, 0)), t = 0;
  return n18.forEach((r) => {
    if (!rn(r)) throw new Error("Uint8Array expected");
    e.set(r, t), t += r.length;
  }), e;
}
__name(gt, "gt");
function pi(n18, e) {
  if (n18.length !== e.length) return false;
  for (let t = 0; t < n18.length; t++) if (n18[t] !== e[t]) return false;
  return true;
}
__name(pi, "pi");
function hi(n18) {
  if (typeof n18 != "string") throw new Error(`utf8ToBytes expected string, got ${typeof n18}`);
  return new Uint8Array(new TextEncoder().encode(n18));
}
__name(hi, "hi");
function mi(n18) {
  let e;
  for (e = 0; n18 > qr; n18 >>= nn, e += 1) ;
  return e;
}
__name(mi, "mi");
function gi(n18, e) {
  return n18 >> BigInt(e) & nn;
}
__name(gi, "gi");
var yi = /* @__PURE__ */ __name((n18, e, t) => n18 | (t ? nn : qr) << BigInt(e), "yi");
var Pt = /* @__PURE__ */ __name((n18) => (ci << BigInt(n18 - 1)) - nn, "Pt");
var Rn = /* @__PURE__ */ __name((n18) => new Uint8Array(n18), "Rn");
var Qr = /* @__PURE__ */ __name((n18) => Uint8Array.from(n18), "Qr");
function zn(n18, e, t) {
  if (typeof n18 != "number" || n18 < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof t != "function") throw new Error("hmacFn must be a function");
  let r = Rn(n18), a = Rn(n18), i = 0, o = /* @__PURE__ */ __name(() => {
    r.fill(1), a.fill(0), i = 0;
  }, "o"), s = /* @__PURE__ */ __name((...f) => t(a, r, ...f), "s"), l = /* @__PURE__ */ __name((f = Rn()) => {
    a = s(Qr([0]), f), r = s(), f.length !== 0 && (a = s(Qr([1]), f), r = s());
  }, "l"), u = /* @__PURE__ */ __name(() => {
    if (i++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let f = 0, h = [];
    for (; f < e; ) {
      r = s();
      let m = r.slice();
      h.push(m), f += r.length;
    }
    return gt(...h);
  }, "u");
  return (f, h) => {
    o(), l(f);
    let m;
    for (; !(m = h(u())); ) l();
    return o(), m;
  };
}
__name(zn, "zn");
var bi = { bigint: /* @__PURE__ */ __name((n18) => typeof n18 == "bigint", "bigint"), function: /* @__PURE__ */ __name((n18) => typeof n18 == "function", "function"), boolean: /* @__PURE__ */ __name((n18) => typeof n18 == "boolean", "boolean"), string: /* @__PURE__ */ __name((n18) => typeof n18 == "string", "string"), stringOrUint8Array: /* @__PURE__ */ __name((n18) => typeof n18 == "string" || n18 instanceof Uint8Array, "stringOrUint8Array"), isSafeInteger: /* @__PURE__ */ __name((n18) => Number.isSafeInteger(n18), "isSafeInteger"), array: /* @__PURE__ */ __name((n18) => Array.isArray(n18), "array"), field: /* @__PURE__ */ __name((n18, e) => e.Fp.isValid(n18), "field"), hash: /* @__PURE__ */ __name((n18) => typeof n18 == "function" && Number.isSafeInteger(n18.outputLen), "hash") };
function Ge(n18, e, t = {}) {
  let r = /* @__PURE__ */ __name((a, i, o) => {
    let s = bi[i];
    if (typeof s != "function") throw new Error(`Invalid validator "${i}", expected function`);
    let l = n18[a];
    if (!(o && l === void 0) && !s(l, n18)) throw new Error(`Invalid param ${String(a)}=${l} (${typeof l}), expected ${i}`);
  }, "r");
  for (let [a, i] of Object.entries(e)) r(a, i, false);
  for (let [a, i] of Object.entries(t)) r(a, i, true);
  return n18;
}
__name(Ge, "Ge");
var q = BigInt(0);
var j = BigInt(1);
var tt = BigInt(2);
var Ci = BigInt(3);
var Mn = BigInt(4);
var Jr = BigInt(5);
var Wr = BigInt(8);
var wi = BigInt(9);
var vi = BigInt(16);
function Z(n18, e) {
  let t = n18 % e;
  return t >= q ? t : e + t;
}
__name(Z, "Z");
function xi(n18, e, t) {
  if (t <= q || e < q) throw new Error("Expected power/modulo > 0");
  if (t === j) return q;
  let r = j;
  for (; e > q; ) e & j && (r = r * n18 % t), n18 = n18 * n18 % t, e >>= j;
  return r;
}
__name(xi, "xi");
function ue(n18, e, t) {
  let r = n18;
  for (; e-- > q; ) r *= r, r %= t;
  return r;
}
__name(ue, "ue");
function sn(n18, e) {
  if (n18 === q || e <= q) throw new Error(`invert: expected positive integers, got n=${n18} mod=${e}`);
  let t = Z(n18, e), r = e, a = q, i = j, o = j, s = q;
  for (; t !== q; ) {
    let u = r / t, c = r % t, f = a - o * u, h = i - s * u;
    r = t, t = c, a = o, i = s, o = f, s = h;
  }
  if (r !== j) throw new Error("invert: does not exist");
  return Z(a, e);
}
__name(sn, "sn");
function Ai(n18) {
  let e = (n18 - j) / tt, t, r, a;
  for (t = n18 - j, r = 0; t % tt === q; t /= tt, r++) ;
  for (a = tt; a < n18 && xi(a, e, n18) !== n18 - j; a++) ;
  if (r === 1) {
    let o = (n18 + j) / Mn;
    return function(l, u) {
      let c = l.pow(u, o);
      if (!l.eql(l.sqr(c), u)) throw new Error("Cannot find square root");
      return c;
    };
  }
  let i = (t + j) / tt;
  return function(s, l) {
    if (s.pow(l, e) === s.neg(s.ONE)) throw new Error("Cannot find square root");
    let u = r, c = s.pow(s.mul(s.ONE, a), t), f = s.pow(l, i), h = s.pow(l, t);
    for (; !s.eql(h, s.ONE); ) {
      if (s.eql(h, s.ZERO)) return s.ZERO;
      let m = 1;
      for (let d = s.sqr(h); m < u && !s.eql(d, s.ONE); m++) d = s.sqr(d);
      let C = s.pow(c, j << BigInt(u - m - 1));
      c = s.sqr(C), f = s.mul(f, C), h = s.mul(h, c), u = m;
    }
    return f;
  };
}
__name(Ai, "Ai");
function Ei(n18) {
  if (n18 % Mn === Ci) {
    let e = (n18 + j) / Mn;
    return function(r, a) {
      let i = r.pow(a, e);
      if (!r.eql(r.sqr(i), a)) throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n18 % Wr === Jr) {
    let e = (n18 - Jr) / Wr;
    return function(r, a) {
      let i = r.mul(a, tt), o = r.pow(i, e), s = r.mul(a, o), l = r.mul(r.mul(s, tt), o), u = r.mul(s, r.sub(l, r.ONE));
      if (!r.eql(r.sqr(u), a)) throw new Error("Cannot find square root");
      return u;
    };
  }
  return n18 % vi, Ai(n18);
}
__name(Ei, "Ei");
var Bi = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function Hn(n18) {
  let e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, t = Bi.reduce((r, a) => (r[a] = "function", r), e);
  return Ge(n18, t);
}
__name(Hn, "Hn");
function ki(n18, e, t) {
  if (t < q) throw new Error("Expected power > 0");
  if (t === q) return n18.ONE;
  if (t === j) return e;
  let r = n18.ONE, a = e;
  for (; t > q; ) t & j && (r = n18.mul(r, a)), a = n18.sqr(a), t >>= j;
  return r;
}
__name(ki, "ki");
function Si(n18, e) {
  let t = new Array(e.length), r = e.reduce((i, o, s) => n18.is0(o) ? i : (t[s] = i, n18.mul(i, o)), n18.ONE), a = n18.inv(r);
  return e.reduceRight((i, o, s) => n18.is0(o) ? i : (t[s] = n18.mul(i, t[s]), n18.mul(i, o)), a), t;
}
__name(Si, "Si");
function jn(n18, e) {
  let t = e !== void 0 ? e : n18.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
__name(jn, "jn");
function $r(n18, e, t = false, r = {}) {
  if (n18 <= q) throw new Error(`Expected Field ORDER > 0, got ${n18}`);
  let { nBitLength: a, nByteLength: i } = jn(n18, e);
  if (i > 2048) throw new Error("Field lengths over 2048 bytes are not supported");
  let o = Ei(n18), s = Object.freeze({ ORDER: n18, BITS: a, BYTES: i, MASK: Pt(a), ZERO: q, ONE: j, create: /* @__PURE__ */ __name((l) => Z(l, n18), "create"), isValid: /* @__PURE__ */ __name((l) => {
    if (typeof l != "bigint") throw new Error(`Invalid field element: expected bigint, got ${typeof l}`);
    return q <= l && l < n18;
  }, "isValid"), is0: /* @__PURE__ */ __name((l) => l === q, "is0"), isOdd: /* @__PURE__ */ __name((l) => (l & j) === j, "isOdd"), neg: /* @__PURE__ */ __name((l) => Z(-l, n18), "neg"), eql: /* @__PURE__ */ __name((l, u) => l === u, "eql"), sqr: /* @__PURE__ */ __name((l) => Z(l * l, n18), "sqr"), add: /* @__PURE__ */ __name((l, u) => Z(l + u, n18), "add"), sub: /* @__PURE__ */ __name((l, u) => Z(l - u, n18), "sub"), mul: /* @__PURE__ */ __name((l, u) => Z(l * u, n18), "mul"), pow: /* @__PURE__ */ __name((l, u) => ki(s, l, u), "pow"), div: /* @__PURE__ */ __name((l, u) => Z(l * sn(u, n18), n18), "div"), sqrN: /* @__PURE__ */ __name((l) => l * l, "sqrN"), addN: /* @__PURE__ */ __name((l, u) => l + u, "addN"), subN: /* @__PURE__ */ __name((l, u) => l - u, "subN"), mulN: /* @__PURE__ */ __name((l, u) => l * u, "mulN"), inv: /* @__PURE__ */ __name((l) => sn(l, n18), "inv"), sqrt: r.sqrt || ((l) => o(s, l)), invertBatch: /* @__PURE__ */ __name((l) => Si(s, l), "invertBatch"), cmov: /* @__PURE__ */ __name((l, u, c) => c ? u : l, "cmov"), toBytes: /* @__PURE__ */ __name((l) => t ? on(l, i) : Ve(l, i), "toBytes"), fromBytes: /* @__PURE__ */ __name((l) => {
    if (l.length !== i) throw new Error(`Fp.fromBytes: expected ${i}, got ${l.length}`);
    return t ? an(l) : Ae(l);
  }, "fromBytes") });
  return Object.freeze(s);
}
__name($r, "$r");
function Yr(n18) {
  if (typeof n18 != "bigint") throw new Error("field order must be bigint");
  let e = n18.toString(2).length;
  return Math.ceil(e / 8);
}
__name(Yr, "Yr");
function Vn(n18) {
  let e = Yr(n18);
  return e + Math.ceil(e / 2);
}
__name(Vn, "Vn");
function Xr(n18, e, t = false) {
  let r = n18.length, a = Yr(e), i = Vn(e);
  if (r < 16 || r < i || r > 1024) throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  let o = t ? Ae(n18) : an(n18), s = Z(o, e - j) + j;
  return t ? on(s, a) : Ve(s, a);
}
__name(Xr, "Xr");
var Ni = BigInt(0);
var Gn = BigInt(1);
function Zr(n18, e) {
  let t = /* @__PURE__ */ __name((a, i) => {
    let o = i.negate();
    return a ? o : i;
  }, "t"), r = /* @__PURE__ */ __name((a) => {
    let i = Math.ceil(e / a) + 1, o = 2 ** (a - 1);
    return { windows: i, windowSize: o };
  }, "r");
  return { constTimeNegate: t, unsafeLadder(a, i) {
    let o = n18.ZERO, s = a;
    for (; i > Ni; ) i & Gn && (o = o.add(s)), s = s.double(), i >>= Gn;
    return o;
  }, precomputeWindow(a, i) {
    let { windows: o, windowSize: s } = r(i), l = [], u = a, c = u;
    for (let f = 0; f < o; f++) {
      c = u, l.push(c);
      for (let h = 1; h < s; h++) c = c.add(u), l.push(c);
      u = c.double();
    }
    return l;
  }, wNAF(a, i, o) {
    let { windows: s, windowSize: l } = r(a), u = n18.ZERO, c = n18.BASE, f = BigInt(2 ** a - 1), h = 2 ** a, m = BigInt(a);
    for (let C = 0; C < s; C++) {
      let d = C * l, y = Number(o & f);
      o >>= m, y > l && (y -= h, o += Gn);
      let w = d, A = d + Math.abs(y) - 1, B = C % 2 !== 0, L = y < 0;
      y === 0 ? c = c.add(t(B, i[w])) : u = u.add(t(L, i[A]));
    }
    return { p: u, f: c };
  }, wNAFCached(a, i, o, s) {
    let l = a._WINDOW_SIZE || 1, u = i.get(a);
    return u || (u = this.precomputeWindow(a, l), l !== 1 && i.set(a, s(u))), this.wNAF(l, u, o);
  } };
}
__name(Zr, "Zr");
function Qn(n18) {
  return Hn(n18.Fp), Ge(n18, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...jn(n18.n, n18.nBitLength), ...n18, p: n18.Fp.ORDER });
}
__name(Qn, "Qn");
function Ti(n18) {
  let e = Qn(n18);
  Ge(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  let { endo: t, Fp: r, a } = e;
  if (t) {
    if (!r.eql(a, r.ZERO)) throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function") throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
__name(Ti, "Ti");
var { bytesToNumberBE: Pi, hexToBytes: Ii } = _n;
var nt = { Err: class extends Error {
  static {
    __name(this, "Err");
  }
  constructor(e = "") {
    super(e);
  }
}, _parseInt(n18) {
  let { Err: e } = nt;
  if (n18.length < 2 || n18[0] !== 2) throw new e("Invalid signature integer tag");
  let t = n18[1], r = n18.subarray(2, t + 2);
  if (!t || r.length !== t) throw new e("Invalid signature integer: wrong length");
  if (r[0] & 128) throw new e("Invalid signature integer: negative");
  if (r[0] === 0 && !(r[1] & 128)) throw new e("Invalid signature integer: unnecessary leading zero");
  return { d: Pi(r), l: n18.subarray(t + 2) };
}, toSig(n18) {
  let { Err: e } = nt, t = typeof n18 == "string" ? Ii(n18) : n18;
  if (!(t instanceof Uint8Array)) throw new Error("ui8a expected");
  let r = t.length;
  if (r < 2 || t[0] != 48) throw new e("Invalid signature tag");
  if (t[1] !== r - 2) throw new e("Invalid signature: incorrect length");
  let { d: a, l: i } = nt._parseInt(t.subarray(2)), { d: o, l: s } = nt._parseInt(i);
  if (s.length) throw new e("Invalid signature: left bytes after parsing");
  return { r: a, s: o };
}, hexFromSig(n18) {
  let e = /* @__PURE__ */ __name((u) => Number.parseInt(u[0], 16) & 8 ? "00" + u : u, "e"), t = /* @__PURE__ */ __name((u) => {
    let c = u.toString(16);
    return c.length & 1 ? `0${c}` : c;
  }, "t"), r = e(t(n18.s)), a = e(t(n18.r)), i = r.length / 2, o = a.length / 2, s = t(i), l = t(o);
  return `30${t(o + i + 4)}02${l}${a}02${s}${r}`;
} };
var Ee = BigInt(0);
var de = BigInt(1);
var Ss = BigInt(2);
var ea = BigInt(3);
var Ds = BigInt(4);
function Oi(n18) {
  let e = Ti(n18), { Fp: t } = e, r = e.toBytes || ((C, d, y) => {
    let w = d.toAffine();
    return gt(Uint8Array.from([4]), t.toBytes(w.x), t.toBytes(w.y));
  }), a = e.fromBytes || ((C) => {
    let d = C.subarray(1), y = t.fromBytes(d.subarray(0, t.BYTES)), w = t.fromBytes(d.subarray(t.BYTES, 2 * t.BYTES));
    return { x: y, y: w };
  });
  function i(C) {
    let { a: d, b: y } = e, w = t.sqr(C), A = t.mul(w, C);
    return t.add(t.add(A, t.mul(C, d)), y);
  }
  __name(i, "i");
  if (!t.eql(t.sqr(e.Gy), i(e.Gx))) throw new Error("bad generator point: equation left != right");
  function o(C) {
    return typeof C == "bigint" && Ee < C && C < e.n;
  }
  __name(o, "o");
  function s(C) {
    if (!o(C)) throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  __name(s, "s");
  function l(C) {
    let { allowedPrivateKeyLengths: d, nByteLength: y, wrapPrivateKey: w, n: A } = e;
    if (d && typeof C != "bigint") {
      if (C instanceof Uint8Array && (C = Ze(C)), typeof C != "string" || !d.includes(C.length)) throw new Error("Invalid key");
      C = C.padStart(y * 2, "0");
    }
    let B;
    try {
      B = typeof C == "bigint" ? C : Ae(le("private key", C, y));
    } catch {
      throw new Error(`private key must be ${y} bytes, hex or bigint, not ${typeof C}`);
    }
    return w && (B = Z(B, A)), s(B), B;
  }
  __name(l, "l");
  let u = /* @__PURE__ */ new Map();
  function c(C) {
    if (!(C instanceof f)) throw new Error("ProjectivePoint expected");
  }
  __name(c, "c");
  class f {
    static {
      __name(this, "f");
    }
    constructor(d, y, w) {
      if (this.px = d, this.py = y, this.pz = w, d == null || !t.isValid(d)) throw new Error("x required");
      if (y == null || !t.isValid(y)) throw new Error("y required");
      if (w == null || !t.isValid(w)) throw new Error("z required");
    }
    static fromAffine(d) {
      let { x: y, y: w } = d || {};
      if (!d || !t.isValid(y) || !t.isValid(w)) throw new Error("invalid affine point");
      if (d instanceof f) throw new Error("projective point not allowed");
      let A = /* @__PURE__ */ __name((B) => t.eql(B, t.ZERO), "A");
      return A(y) && A(w) ? f.ZERO : new f(y, w, t.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(d) {
      let y = t.invertBatch(d.map((w) => w.pz));
      return d.map((w, A) => w.toAffine(y[A])).map(f.fromAffine);
    }
    static fromHex(d) {
      let y = f.fromAffine(a(le("pointHex", d)));
      return y.assertValidity(), y;
    }
    static fromPrivateKey(d) {
      return f.BASE.multiply(l(d));
    }
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, u.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (e.allowInfinityPoint && !t.is0(this.py)) return;
        throw new Error("bad point: ZERO");
      }
      let { x: d, y } = this.toAffine();
      if (!t.isValid(d) || !t.isValid(y)) throw new Error("bad point: x or y not FE");
      let w = t.sqr(y), A = i(d);
      if (!t.eql(w, A)) throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      let { y: d } = this.toAffine();
      if (t.isOdd) return !t.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    equals(d) {
      c(d);
      let { px: y, py: w, pz: A } = this, { px: B, py: L, pz: N } = d, x = t.eql(t.mul(y, N), t.mul(B, A)), E = t.eql(t.mul(w, N), t.mul(L, A));
      return x && E;
    }
    negate() {
      return new f(this.px, t.neg(this.py), this.pz);
    }
    double() {
      let { a: d, b: y } = e, w = t.mul(y, ea), { px: A, py: B, pz: L } = this, N = t.ZERO, x = t.ZERO, E = t.ZERO, D = t.mul(A, A), fe = t.mul(B, B), z = t.mul(L, L), F = t.mul(A, B);
      return F = t.add(F, F), E = t.mul(A, L), E = t.add(E, E), N = t.mul(d, E), x = t.mul(w, z), x = t.add(N, x), N = t.sub(fe, x), x = t.add(fe, x), x = t.mul(N, x), N = t.mul(F, N), E = t.mul(w, E), z = t.mul(d, z), F = t.sub(D, z), F = t.mul(d, F), F = t.add(F, E), E = t.add(D, D), D = t.add(E, D), D = t.add(D, z), D = t.mul(D, F), x = t.add(x, D), z = t.mul(B, L), z = t.add(z, z), D = t.mul(z, F), N = t.sub(N, D), E = t.mul(z, fe), E = t.add(E, E), E = t.add(E, E), new f(N, x, E);
    }
    add(d) {
      c(d);
      let { px: y, py: w, pz: A } = this, { px: B, py: L, pz: N } = d, x = t.ZERO, E = t.ZERO, D = t.ZERO, fe = e.a, z = t.mul(e.b, ea), F = t.mul(y, B), ae = t.mul(w, L), ie = t.mul(A, N), Te = t.add(y, w), g = t.add(B, L);
      Te = t.mul(Te, g), g = t.add(F, ae), Te = t.sub(Te, g), g = t.add(y, A);
      let v = t.add(B, N);
      return g = t.mul(g, v), v = t.add(F, ie), g = t.sub(g, v), v = t.add(w, A), x = t.add(L, N), v = t.mul(v, x), x = t.add(ae, ie), v = t.sub(v, x), D = t.mul(fe, g), x = t.mul(z, ie), D = t.add(x, D), x = t.sub(ae, D), D = t.add(ae, D), E = t.mul(x, D), ae = t.add(F, F), ae = t.add(ae, F), ie = t.mul(fe, ie), g = t.mul(z, g), ae = t.add(ae, ie), ie = t.sub(F, ie), ie = t.mul(fe, ie), g = t.add(g, ie), F = t.mul(ae, g), E = t.add(E, F), F = t.mul(v, g), x = t.mul(Te, x), x = t.sub(x, F), F = t.mul(Te, ae), D = t.mul(v, D), D = t.add(D, F), new f(x, E, D);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(f.ZERO);
    }
    wNAF(d) {
      return m.wNAFCached(this, u, d, (y) => {
        let w = t.invertBatch(y.map((A) => A.pz));
        return y.map((A, B) => A.toAffine(w[B])).map(f.fromAffine);
      });
    }
    multiplyUnsafe(d) {
      let y = f.ZERO;
      if (d === Ee) return y;
      if (s(d), d === de) return this;
      let { endo: w } = e;
      if (!w) return m.unsafeLadder(this, d);
      let { k1neg: A, k1: B, k2neg: L, k2: N } = w.splitScalar(d), x = y, E = y, D = this;
      for (; B > Ee || N > Ee; ) B & de && (x = x.add(D)), N & de && (E = E.add(D)), D = D.double(), B >>= de, N >>= de;
      return A && (x = x.negate()), L && (E = E.negate()), E = new f(t.mul(E.px, w.beta), E.py, E.pz), x.add(E);
    }
    multiply(d) {
      s(d);
      let y = d, w, A, { endo: B } = e;
      if (B) {
        let { k1neg: L, k1: N, k2neg: x, k2: E } = B.splitScalar(y), { p: D, f: fe } = this.wNAF(N), { p: z, f: F } = this.wNAF(E);
        D = m.constTimeNegate(L, D), z = m.constTimeNegate(x, z), z = new f(t.mul(z.px, B.beta), z.py, z.pz), w = D.add(z), A = fe.add(F);
      } else {
        let { p: L, f: N } = this.wNAF(y);
        w = L, A = N;
      }
      return f.normalizeZ([w, A])[0];
    }
    multiplyAndAddUnsafe(d, y, w) {
      let A = f.BASE, B = /* @__PURE__ */ __name((N, x) => x === Ee || x === de || !N.equals(A) ? N.multiplyUnsafe(x) : N.multiply(x), "B"), L = B(this, y).add(B(d, w));
      return L.is0() ? void 0 : L;
    }
    toAffine(d) {
      let { px: y, py: w, pz: A } = this, B = this.is0();
      d == null && (d = B ? t.ONE : t.inv(A));
      let L = t.mul(y, d), N = t.mul(w, d), x = t.mul(A, d);
      if (B) return { x: t.ZERO, y: t.ZERO };
      if (!t.eql(x, t.ONE)) throw new Error("invZ was invalid");
      return { x: L, y: N };
    }
    isTorsionFree() {
      let { h: d, isTorsionFree: y } = e;
      if (d === de) return true;
      if (y) return y(f, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      let { h: d, clearCofactor: y } = e;
      return d === de ? this : y ? y(f, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(d = true) {
      return this.assertValidity(), r(f, this, d);
    }
    toHex(d = true) {
      return Ze(this.toRawBytes(d));
    }
  }
  f.BASE = new f(e.Gx, e.Gy, t.ONE), f.ZERO = new f(t.ZERO, t.ONE, t.ZERO);
  let h = e.nBitLength, m = Zr(f, e.endo ? Math.ceil(h / 2) : h);
  return { CURVE: e, ProjectivePoint: f, normPrivateKeyToScalar: l, weierstrassEquation: i, isWithinCurveOrder: o };
}
__name(Oi, "Oi");
function Li(n18) {
  let e = Qn(n18);
  return Ge(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: true, ...e });
}
__name(Li, "Li");
function ta(n18) {
  let e = Li(n18), { Fp: t, n: r } = e, a = t.BYTES + 1, i = 2 * t.BYTES + 1;
  function o(g) {
    return Ee < g && g < t.ORDER;
  }
  __name(o, "o");
  function s(g) {
    return Z(g, r);
  }
  __name(s, "s");
  function l(g) {
    return sn(g, r);
  }
  __name(l, "l");
  let { ProjectivePoint: u, normPrivateKeyToScalar: c, weierstrassEquation: f, isWithinCurveOrder: h } = Oi({ ...e, toBytes(g, v, S) {
    let U = v.toAffine(), R = t.toBytes(U.x), K = gt;
    return S ? K(Uint8Array.from([v.hasEvenY() ? 2 : 3]), R) : K(Uint8Array.from([4]), R, t.toBytes(U.y));
  }, fromBytes(g) {
    let v = g.length, S = g[0], U = g.subarray(1);
    if (v === a && (S === 2 || S === 3)) {
      let R = Ae(U);
      if (!o(R)) throw new Error("Point is not on curve");
      let K = f(R), oe = t.sqrt(K), se = (oe & de) === de;
      return (S & 1) === 1 !== se && (oe = t.neg(oe)), { x: R, y: oe };
    } else if (v === i && S === 4) {
      let R = t.fromBytes(U.subarray(0, t.BYTES)), K = t.fromBytes(U.subarray(t.BYTES, 2 * t.BYTES));
      return { x: R, y: K };
    } else throw new Error(`Point of length ${v} was invalid. Expected ${a} compressed bytes or ${i} uncompressed bytes`);
  } }), m = /* @__PURE__ */ __name((g) => Ze(Ve(g, e.nByteLength)), "m");
  function C(g) {
    let v = r >> de;
    return g > v;
  }
  __name(C, "C");
  function d(g) {
    return C(g) ? s(-g) : g;
  }
  __name(d, "d");
  let y = /* @__PURE__ */ __name((g, v, S) => Ae(g.slice(v, S)), "y");
  class w {
    static {
      __name(this, "w");
    }
    constructor(v, S, U) {
      this.r = v, this.s = S, this.recovery = U, this.assertValidity();
    }
    static fromCompact(v) {
      let S = e.nByteLength;
      return v = le("compactSignature", v, S * 2), new w(y(v, 0, S), y(v, S, 2 * S));
    }
    static fromDER(v) {
      let { r: S, s: U } = nt.toSig(le("DER", v));
      return new w(S, U);
    }
    assertValidity() {
      if (!h(this.r)) throw new Error("r must be 0 < r < CURVE.n");
      if (!h(this.s)) throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(v) {
      return new w(this.r, this.s, v);
    }
    recoverPublicKey(v) {
      let { r: S, s: U, recovery: R } = this, K = E(le("msgHash", v));
      if (R == null || ![0, 1, 2, 3].includes(R)) throw new Error("recovery id invalid");
      let oe = R === 2 || R === 3 ? S + e.n : S;
      if (oe >= t.ORDER) throw new Error("recovery id 2 or 3 invalid");
      let se = (R & 1) === 0 ? "02" : "03", Pe = u.fromHex(se + m(oe)), Ie = l(oe), ct = s(-K * Ie), vt = s(U * Ie), Oe = u.BASE.multiplyAndAddUnsafe(Pe, ct, vt);
      if (!Oe) throw new Error("point at infinify");
      return Oe.assertValidity(), Oe;
    }
    hasHighS() {
      return C(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, s(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return et(this.toDERHex());
    }
    toDERHex() {
      return nt.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return et(this.toCompactHex());
    }
    toCompactHex() {
      return m(this.r) + m(this.s);
    }
  }
  let A = { isValidPrivateKey(g) {
    try {
      return c(g), true;
    } catch {
      return false;
    }
  }, normPrivateKeyToScalar: c, randomPrivateKey: /* @__PURE__ */ __name(() => {
    let g = Vn(e.n);
    return Xr(e.randomBytes(g), e.n);
  }, "randomPrivateKey"), precompute(g = 8, v = u.BASE) {
    return v._setWindowSize(g), v.multiply(BigInt(3)), v;
  } };
  function B(g, v = true) {
    return u.fromPrivateKey(g).toRawBytes(v);
  }
  __name(B, "B");
  function L(g) {
    let v = g instanceof Uint8Array, S = typeof g == "string", U = (v || S) && g.length;
    return v ? U === a || U === i : S ? U === 2 * a || U === 2 * i : g instanceof u;
  }
  __name(L, "L");
  function N(g, v, S = true) {
    if (L(g)) throw new Error("first arg must be private key");
    if (!L(v)) throw new Error("second arg must be public key");
    return u.fromHex(v).multiply(c(g)).toRawBytes(S);
  }
  __name(N, "N");
  let x = e.bits2int || function(g) {
    let v = Ae(g), S = g.length * 8 - e.nBitLength;
    return S > 0 ? v >> BigInt(S) : v;
  }, E = e.bits2int_modN || function(g) {
    return s(x(g));
  }, D = Pt(e.nBitLength);
  function fe(g) {
    if (typeof g != "bigint") throw new Error("bigint expected");
    if (!(Ee <= g && g < D)) throw new Error(`bigint expected < 2^${e.nBitLength}`);
    return Ve(g, e.nByteLength);
  }
  __name(fe, "fe");
  function z(g, v, S = F) {
    if (["recovered", "canonical"].some(($e) => $e in S)) throw new Error("sign() legacy options not supported");
    let { hash: U, randomBytes: R } = e, { lowS: K, prehash: oe, extraEntropy: se } = S;
    K == null && (K = true), g = le("msgHash", g), oe && (g = le("prehashed msgHash", U(g)));
    let Pe = E(g), Ie = c(v), ct = [fe(Ie), fe(Pe)];
    if (se != null) {
      let $e = se === true ? R(t.BYTES) : se;
      ct.push(le("extraEntropy", $e));
    }
    let vt = gt(...ct), Oe = Pe;
    function Bn($e) {
      let ft = x($e);
      if (!h(ft)) return;
      let ur = l(ft), be = u.BASE.multiply(ft).toAffine(), dt = s(be.x);
      if (dt === Ee) return;
      let jt = s(ur * s(Oe + dt * Ie));
      if (jt === Ee) return;
      let cr = (be.x === dt ? 0 : 2) | Number(be.y & de), fr = jt;
      return K && C(jt) && (fr = d(jt), cr ^= 1), new w(dt, fr, cr);
    }
    __name(Bn, "Bn");
    return { seed: vt, k2sig: Bn };
  }
  __name(z, "z");
  let F = { lowS: e.lowS, prehash: false }, ae = { lowS: e.lowS, prehash: false };
  function ie(g, v, S = F) {
    let { seed: U, k2sig: R } = z(g, v, S), K = e;
    return zn(K.hash.outputLen, K.nByteLength, K.hmac)(U, R);
  }
  __name(ie, "ie");
  u.BASE._setWindowSize(8);
  function Te(g, v, S, U = ae) {
    let R = g;
    if (v = le("msgHash", v), S = le("publicKey", S), "strict" in U) throw new Error("options.strict was renamed to lowS");
    let { lowS: K, prehash: oe } = U, se, Pe;
    try {
      if (typeof R == "string" || R instanceof Uint8Array) try {
        se = w.fromDER(R);
      } catch (be) {
        if (!(be instanceof nt.Err)) throw be;
        se = w.fromCompact(R);
      }
      else if (typeof R == "object" && typeof R.r == "bigint" && typeof R.s == "bigint") {
        let { r: be, s: dt } = R;
        se = new w(be, dt);
      } else throw new Error("PARSE");
      Pe = u.fromHex(S);
    } catch (be) {
      if (be.message === "PARSE") throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return false;
    }
    if (K && se.hasHighS()) return false;
    oe && (v = e.hash(v));
    let { r: Ie, s: ct } = se, vt = E(v), Oe = l(ct), Bn = s(vt * Oe), $e = s(Ie * Oe), ft = u.BASE.multiplyAndAddUnsafe(Pe, Bn, $e)?.toAffine();
    return ft ? s(ft.x) === Ie : false;
  }
  __name(Te, "Te");
  return { CURVE: e, getPublicKey: B, getSharedSecret: N, sign: ie, verify: Te, ProjectivePoint: u, Signature: w, utils: A };
}
__name(ta, "ta");
function Fi(n18) {
  return { hash: n18, hmac: /* @__PURE__ */ __name((e, ...t) => Ln(n18, e, Br(...t)), "hmac"), randomBytes: Sr };
}
__name(Fi, "Fi");
function na(n18, e) {
  let t = /* @__PURE__ */ __name((r) => ta({ ...n18, ...Fi(r) }), "t");
  return Object.freeze({ ...t(e), create: t });
}
__name(na, "na");
var ia = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var ra = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var Ri = BigInt(1);
var qn = BigInt(2);
var aa = /* @__PURE__ */ __name((n18, e) => (n18 + e / qn) / e, "aa");
function Ui(n18) {
  let e = ia, t = BigInt(3), r = BigInt(6), a = BigInt(11), i = BigInt(22), o = BigInt(23), s = BigInt(44), l = BigInt(88), u = n18 * n18 * n18 % e, c = u * u * n18 % e, f = ue(c, t, e) * c % e, h = ue(f, t, e) * c % e, m = ue(h, qn, e) * u % e, C = ue(m, a, e) * m % e, d = ue(C, i, e) * C % e, y = ue(d, s, e) * d % e, w = ue(y, l, e) * y % e, A = ue(w, s, e) * d % e, B = ue(A, t, e) * c % e, L = ue(B, o, e) * C % e, N = ue(L, r, e) * u % e, x = ue(N, qn, e);
  if (!Kn.eql(Kn.sqr(x), n18)) throw new Error("Cannot find square root");
  return x;
}
__name(Ui, "Ui");
var Kn = $r(ia, void 0, void 0, { sqrt: Ui });
var Be = na({ a: BigInt(0), b: BigInt(7), Fp: Kn, n: ra, Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"), Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"), h: BigInt(1), lowS: true, endo: { beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"), splitScalar: /* @__PURE__ */ __name((n18) => {
  let e = ra, t = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Ri * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), a = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = t, o = BigInt("0x100000000000000000000000000000000"), s = aa(i * n18, e), l = aa(-r * n18, e), u = Z(n18 - s * t - l * a, e), c = Z(-s * r - l * i, e), f = u > o, h = c > o;
  if (f && (u = e - u), h && (c = e - c), u > o || c > o) throw new Error("splitScalar: Endomorphism failed, k=" + n18);
  return { k1neg: f, k1: u, k2neg: h, k2: c };
}, "splitScalar") } }, Dr);
var Us = BigInt(0);
var zs = Be.ProjectivePoint;
var ln = "0x0000000000000000000000000000000000000000000000000000000000000000";
var Jn = `Ethereum Signed Message:
`;
var oa = BigInt(0);
var sa = BigInt(1);
var $n = BigInt(2);
var la = BigInt(27);
var ua = BigInt(28);
var un = BigInt(35);
var ca = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var zi = ca / $n;
var _i = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
var rt = {};
function Wn(n18) {
  return At(kt(n18), 32);
}
__name(Wn, "Wn");
var It = class n4 {
  static {
    __name(this, "n");
  }
  #e;
  #t;
  #r;
  #n;
  get r() {
    return this.#e;
  }
  set r(e) {
    p(Fe(e) === 32, "invalid r", "value", e), this.#e = k(e);
  }
  get s() {
    return p(parseInt(this.#t.substring(0, 3)) < 8, "non-canonical s; use ._s", "s", this.#t), this.#t;
  }
  set s(e) {
    p(Fe(e) === 32, "invalid s", "value", e), this.#t = k(e);
  }
  get _s() {
    return this.#t;
  }
  isValid() {
    return BigInt(this.#t) <= zi;
  }
  get v() {
    return this.#r;
  }
  set v(e) {
    let t = J(e, "value");
    p(t === 27 || t === 28, "invalid v", "v", e), this.#r = t;
  }
  get networkV() {
    return this.#n;
  }
  get legacyChainId() {
    let e = this.networkV;
    return e == null ? null : n4.getChainId(e);
  }
  get yParity() {
    return this.v === 27 ? 0 : 1;
  }
  get yParityAndS() {
    let e = _(this.s);
    return this.yParity && (e[0] |= 128), k(e);
  }
  get compactSerialized() {
    return Y([this.r, this.yParityAndS]);
  }
  get serialized() {
    return Y([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  constructor(e, t, r, a) {
    Le(e, rt, "Signature"), this.#e = t, this.#t = r, this.#r = a, this.#n = null;
  }
  getCanonical() {
    if (this.isValid()) return this;
    let e = ca - BigInt(this._s), t = 55 - this.v, r = new n4(rt, this.r, Wn(e), t);
    return this.networkV && (r.#n = this.networkV), r;
  }
  clone() {
    let e = new n4(rt, this.r, this._s, this.v);
    return this.networkV && (e.#n = this.networkV), e;
  }
  toJSON() {
    let e = this.networkV;
    return { _type: "signature", networkV: e != null ? e.toString() : null, r: this.r, s: this._s, v: this.v };
  }
  [_i]() {
    return this.toString();
  }
  toString() {
    return this.isValid() ? `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }` : `Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`;
  }
  static getChainId(e) {
    let t = ee(e, "v");
    return t == la || t == ua ? oa : (p(t >= un, "invalid EIP-155 v", "v", e), (t - un) / $n);
  }
  static getChainIdV(e, t) {
    return ee(e) * $n + BigInt(35 + t - 27);
  }
  static getNormalizedV(e) {
    let t = ee(e);
    return t === oa || t === la ? 27 : t === sa || t === ua ? 28 : (p(t >= un, "invalid v", "v", e), t & sa ? 27 : 28);
  }
  static from(e) {
    function t(u, c) {
      p(u, c, "signature", e);
    }
    __name(t, "t");
    if (e == null) return new n4(rt, ln, ln, 27);
    if (typeof e == "string") {
      let u = _(e, "signature");
      if (u.length === 64) {
        let c = k(u.slice(0, 32)), f = u.slice(32, 64), h = f[0] & 128 ? 28 : 27;
        return f[0] &= 127, new n4(rt, c, k(f), h);
      }
      if (u.length === 65) {
        let c = k(u.slice(0, 32)), f = k(u.slice(32, 64)), h = n4.getNormalizedV(u[64]);
        return new n4(rt, c, f, h);
      }
      t(false, "invalid raw signature length");
    }
    if (e instanceof n4) return e.clone();
    let r = e.r;
    t(r != null, "missing r");
    let a = Wn(r), i = (function(u, c) {
      if (u != null) return Wn(u);
      if (c != null) {
        t(Ce(c, 32), "invalid yParityAndS");
        let f = _(c);
        return f[0] &= 127, k(f);
      }
      t(false, "missing s");
    })(e.s, e.yParityAndS), { networkV: o, v: s } = (function(u, c, f) {
      if (u != null) {
        let h = ee(u);
        return { networkV: h >= un ? h : void 0, v: n4.getNormalizedV(h) };
      }
      if (c != null) return t(Ce(c, 32), "invalid yParityAndS"), { v: _(c)[0] & 128 ? 28 : 27 };
      if (f != null) {
        switch (J(f, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        t(false, "invalid yParity");
      }
      t(false, "missing v");
    })(e.v, e.yParityAndS, e.yParity), l = new n4(rt, a, i, s);
    return o && (l.#n = o), t(e.yParity == null || J(e.yParity, "sig.yParity") === l.yParity, "yParity mismatch"), t(e.yParityAndS == null || e.yParityAndS === l.yParityAndS, "yParityAndS mismatch"), l;
  }
};
var yt = class n5 {
  static {
    __name(this, "n");
  }
  #e;
  constructor(e) {
    p(Fe(e) === 32, "invalid private key", "privateKey", "[REDACTED]"), this.#e = k(e);
  }
  get privateKey() {
    return this.#e;
  }
  get publicKey() {
    return n5.computePublicKey(this.#e);
  }
  get compressedPublicKey() {
    return n5.computePublicKey(this.#e, true);
  }
  sign(e) {
    p(Fe(e) === 32, "invalid digest length", "digest", e);
    let t = Be.sign(V(e), V(this.#e), { lowS: true });
    return It.from({ r: Ue(t.r, 32), s: Ue(t.s, 32), v: t.recovery ? 28 : 27 });
  }
  computeSharedSecret(e) {
    let t = n5.computePublicKey(e);
    return k(Be.getSharedSecret(V(this.#e), _(t), false));
  }
  static computePublicKey(e, t) {
    let r = _(e, "key");
    if (r.length === 32) {
      let i = Be.getPublicKey(r, !!t);
      return k(i);
    }
    if (r.length === 64) {
      let i = new Uint8Array(65);
      i[0] = 4, i.set(r, 1), r = i;
    }
    let a = Be.ProjectivePoint.fromHex(r);
    return k(a.toRawBytes(t));
  }
  static recoverPublicKey(e, t) {
    p(Fe(e) === 32, "invalid digest length", "digest", e);
    let r = It.from(t), a = Be.Signature.fromCompact(V(Y([r.r, r.s])));
    a = a.addRecoveryBit(r.yParity);
    let i = a.recoverPublicKey(V(e));
    return p(i != null, "invalid signature for digest", "signature", t), "0x" + i.toHex(false);
  }
  static addPoints(e, t, r) {
    let a = Be.ProjectivePoint.fromHex(n5.computePublicKey(e).substring(2)), i = Be.ProjectivePoint.fromHex(n5.computePublicKey(t).substring(2));
    return "0x" + a.add(i).toHex(!!r);
  }
};
var Mi = BigInt(0);
var Hi = BigInt(36);
function fa(n18) {
  n18 = n18.toLowerCase();
  let e = n18.substring(2).split(""), t = new Uint8Array(40);
  for (let a = 0; a < 40; a++) t[a] = e[a].charCodeAt(0);
  let r = _(X(t));
  for (let a = 0; a < 40; a += 2) r[a >> 1] >> 4 >= 8 && (e[a] = e[a].toUpperCase()), (r[a >> 1] & 15) >= 8 && (e[a + 1] = e[a + 1].toUpperCase());
  return "0x" + e.join("");
}
__name(fa, "fa");
var Yn = {};
for (let n18 = 0; n18 < 10; n18++) Yn[String(n18)] = String(n18);
for (let n18 = 0; n18 < 26; n18++) Yn[String.fromCharCode(65 + n18)] = String(10 + n18);
var da = 15;
function ji(n18) {
  n18 = n18.toUpperCase(), n18 = n18.substring(4) + n18.substring(0, 2) + "00";
  let e = n18.split("").map((r) => Yn[r]).join("");
  for (; e.length >= da; ) {
    let r = e.substring(0, da);
    e = parseInt(r, 10) % 97 + e.substring(r.length);
  }
  let t = String(98 - parseInt(e, 10) % 97);
  for (; t.length < 2; ) t = "0" + t;
  return t;
}
__name(ji, "ji");
var Vi = (function() {
  let n18 = {};
  for (let e = 0; e < 36; e++) {
    let t = "0123456789abcdefghijklmnopqrstuvwxyz"[e];
    n18[t] = BigInt(e);
  }
  return n18;
})();
function Gi(n18) {
  n18 = n18.toLowerCase();
  let e = Mi;
  for (let t = 0; t < n18.length; t++) e = e * Hi + Vi[n18[t]];
  return e;
}
__name(Gi, "Gi");
function $(n18) {
  if (p(typeof n18 == "string", "invalid address", "address", n18), n18.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    n18.startsWith("0x") || (n18 = "0x" + n18);
    let e = fa(n18);
    return p(!n18.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === n18, "bad address checksum", "address", n18), e;
  }
  if (n18.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    p(n18.substring(2, 4) === ji(n18), "bad icap checksum", "address", n18);
    let e = Gi(n18.substring(4)).toString(16);
    for (; e.length < 40; ) e = "0" + e;
    return fa("0x" + e);
  }
  p(false, "invalid address", "address", n18);
}
__name($, "$");
function at(n18) {
  try {
    return $(n18), true;
  } catch {
  }
  return false;
}
__name(at, "at");
var me = {};
function b(n18, e) {
  let t = false;
  return e < 0 && (t = true, e *= -1), new M(me, `${t ? "" : "u"}int${e}`, n18, { signed: t, width: e });
}
__name(b, "b");
function I(n18, e) {
  return new M(me, `bytes${e || ""}`, n18, { size: e });
}
__name(I, "I");
var pa = /* @__PURE__ */ Symbol.for("_ethers_typed");
var M = class n6 {
  static {
    __name(this, "n");
  }
  type;
  value;
  #e;
  _typedSymbol;
  constructor(e, t, r, a) {
    a == null && (a = null), Le(me, e, "Typed"), T(this, { _typedSymbol: pa, type: t, value: r }), this.#e = a, this.format();
  }
  format() {
    if (this.type === "array") throw new Error("");
    if (this.type === "dynamicArray") throw new Error("");
    return this.type === "tuple" ? `tuple(${this.value.map((e) => e.format()).join(",")})` : this.type;
  }
  defaultValue() {
    return 0;
  }
  minValue() {
    return 0;
  }
  maxValue() {
    return 0;
  }
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  isData() {
    return this.type.startsWith("bytes");
  }
  isString() {
    return this.type === "string";
  }
  get tupleName() {
    if (this.type !== "tuple") throw TypeError("not a tuple");
    return this.#e;
  }
  get arrayLength() {
    if (this.type !== "array") throw TypeError("not an array");
    return this.#e === true ? -1 : this.#e === false ? this.value.length : null;
  }
  static from(e, t) {
    return new n6(me, e, t);
  }
  static uint8(e) {
    return b(e, 8);
  }
  static uint16(e) {
    return b(e, 16);
  }
  static uint24(e) {
    return b(e, 24);
  }
  static uint32(e) {
    return b(e, 32);
  }
  static uint40(e) {
    return b(e, 40);
  }
  static uint48(e) {
    return b(e, 48);
  }
  static uint56(e) {
    return b(e, 56);
  }
  static uint64(e) {
    return b(e, 64);
  }
  static uint72(e) {
    return b(e, 72);
  }
  static uint80(e) {
    return b(e, 80);
  }
  static uint88(e) {
    return b(e, 88);
  }
  static uint96(e) {
    return b(e, 96);
  }
  static uint104(e) {
    return b(e, 104);
  }
  static uint112(e) {
    return b(e, 112);
  }
  static uint120(e) {
    return b(e, 120);
  }
  static uint128(e) {
    return b(e, 128);
  }
  static uint136(e) {
    return b(e, 136);
  }
  static uint144(e) {
    return b(e, 144);
  }
  static uint152(e) {
    return b(e, 152);
  }
  static uint160(e) {
    return b(e, 160);
  }
  static uint168(e) {
    return b(e, 168);
  }
  static uint176(e) {
    return b(e, 176);
  }
  static uint184(e) {
    return b(e, 184);
  }
  static uint192(e) {
    return b(e, 192);
  }
  static uint200(e) {
    return b(e, 200);
  }
  static uint208(e) {
    return b(e, 208);
  }
  static uint216(e) {
    return b(e, 216);
  }
  static uint224(e) {
    return b(e, 224);
  }
  static uint232(e) {
    return b(e, 232);
  }
  static uint240(e) {
    return b(e, 240);
  }
  static uint248(e) {
    return b(e, 248);
  }
  static uint256(e) {
    return b(e, 256);
  }
  static uint(e) {
    return b(e, 256);
  }
  static int8(e) {
    return b(e, -8);
  }
  static int16(e) {
    return b(e, -16);
  }
  static int24(e) {
    return b(e, -24);
  }
  static int32(e) {
    return b(e, -32);
  }
  static int40(e) {
    return b(e, -40);
  }
  static int48(e) {
    return b(e, -48);
  }
  static int56(e) {
    return b(e, -56);
  }
  static int64(e) {
    return b(e, -64);
  }
  static int72(e) {
    return b(e, -72);
  }
  static int80(e) {
    return b(e, -80);
  }
  static int88(e) {
    return b(e, -88);
  }
  static int96(e) {
    return b(e, -96);
  }
  static int104(e) {
    return b(e, -104);
  }
  static int112(e) {
    return b(e, -112);
  }
  static int120(e) {
    return b(e, -120);
  }
  static int128(e) {
    return b(e, -128);
  }
  static int136(e) {
    return b(e, -136);
  }
  static int144(e) {
    return b(e, -144);
  }
  static int152(e) {
    return b(e, -152);
  }
  static int160(e) {
    return b(e, -160);
  }
  static int168(e) {
    return b(e, -168);
  }
  static int176(e) {
    return b(e, -176);
  }
  static int184(e) {
    return b(e, -184);
  }
  static int192(e) {
    return b(e, -192);
  }
  static int200(e) {
    return b(e, -200);
  }
  static int208(e) {
    return b(e, -208);
  }
  static int216(e) {
    return b(e, -216);
  }
  static int224(e) {
    return b(e, -224);
  }
  static int232(e) {
    return b(e, -232);
  }
  static int240(e) {
    return b(e, -240);
  }
  static int248(e) {
    return b(e, -248);
  }
  static int256(e) {
    return b(e, -256);
  }
  static int(e) {
    return b(e, -256);
  }
  static bytes1(e) {
    return I(e, 1);
  }
  static bytes2(e) {
    return I(e, 2);
  }
  static bytes3(e) {
    return I(e, 3);
  }
  static bytes4(e) {
    return I(e, 4);
  }
  static bytes5(e) {
    return I(e, 5);
  }
  static bytes6(e) {
    return I(e, 6);
  }
  static bytes7(e) {
    return I(e, 7);
  }
  static bytes8(e) {
    return I(e, 8);
  }
  static bytes9(e) {
    return I(e, 9);
  }
  static bytes10(e) {
    return I(e, 10);
  }
  static bytes11(e) {
    return I(e, 11);
  }
  static bytes12(e) {
    return I(e, 12);
  }
  static bytes13(e) {
    return I(e, 13);
  }
  static bytes14(e) {
    return I(e, 14);
  }
  static bytes15(e) {
    return I(e, 15);
  }
  static bytes16(e) {
    return I(e, 16);
  }
  static bytes17(e) {
    return I(e, 17);
  }
  static bytes18(e) {
    return I(e, 18);
  }
  static bytes19(e) {
    return I(e, 19);
  }
  static bytes20(e) {
    return I(e, 20);
  }
  static bytes21(e) {
    return I(e, 21);
  }
  static bytes22(e) {
    return I(e, 22);
  }
  static bytes23(e) {
    return I(e, 23);
  }
  static bytes24(e) {
    return I(e, 24);
  }
  static bytes25(e) {
    return I(e, 25);
  }
  static bytes26(e) {
    return I(e, 26);
  }
  static bytes27(e) {
    return I(e, 27);
  }
  static bytes28(e) {
    return I(e, 28);
  }
  static bytes29(e) {
    return I(e, 29);
  }
  static bytes30(e) {
    return I(e, 30);
  }
  static bytes31(e) {
    return I(e, 31);
  }
  static bytes32(e) {
    return I(e, 32);
  }
  static address(e) {
    return new n6(me, "address", e);
  }
  static bool(e) {
    return new n6(me, "bool", !!e);
  }
  static bytes(e) {
    return new n6(me, "bytes", e);
  }
  static string(e) {
    return new n6(me, "string", e);
  }
  static array(e, t) {
    throw new Error("not implemented yet");
  }
  static tuple(e, t) {
    throw new Error("not implemented yet");
  }
  static overrides(e) {
    return new n6(me, "overrides", Object.assign({}, e));
  }
  static isTyped(e) {
    return e && typeof e == "object" && "_typedSymbol" in e && e._typedSymbol === pa;
  }
  static dereference(e, t) {
    if (n6.isTyped(e)) {
      if (e.type !== t) throw new Error(`invalid type: expecetd ${t}, got ${e.type}`);
      return e.value;
    }
    return e;
  }
};
var cn = class extends G {
  static {
    __name(this, "cn");
  }
  constructor(e) {
    super("address", "address", e, false);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(e, t) {
    let r = M.dereference(t, "string");
    try {
      r = $(r);
    } catch (a) {
      return this._throwError(a.message, t);
    }
    return e.writeValue(r);
  }
  decode(e) {
    return $(Ue(e.readValue(), 20));
  }
};
var fn = class extends G {
  static {
    __name(this, "fn");
  }
  coder;
  constructor(e) {
    super(e.name, e.type, "_", e.dynamic), this.coder = e;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(e, t) {
    return this.coder.encode(e, t);
  }
  decode(e) {
    return this.coder.decode(e);
  }
};
function Xn(n18, e, t) {
  let r = [];
  if (Array.isArray(t)) r = t;
  else if (t && typeof t == "object") {
    let l = {};
    r = e.map((u) => {
      let c = u.localName;
      return O(c, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: t }), O(!l[c], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: t }), l[c] = true, t[c];
    });
  } else p(false, "invalid tuple value", "tuple", t);
  p(e.length === r.length, "types/value length mismatch", "tuple", t);
  let a = new Xe(), i = new Xe(), o = [];
  e.forEach((l, u) => {
    let c = r[u];
    if (l.dynamic) {
      let f = i.length;
      l.encode(i, c);
      let h = a.writeUpdatableValue();
      o.push((m) => {
        h(m + f);
      });
    } else l.encode(a, c);
  }), o.forEach((l) => {
    l(a.length);
  });
  let s = n18.appendWriter(a);
  return s += n18.appendWriter(i), s;
}
__name(Xn, "Xn");
function Zn(n18, e) {
  let t = [], r = [], a = n18.subReader(0);
  return e.forEach((i) => {
    let o = null;
    if (i.dynamic) {
      let s = n18.readIndex(), l = a.subReader(s);
      try {
        o = i.decode(l);
      } catch (u) {
        if (Vt(u, "BUFFER_OVERRUN")) throw u;
        o = u, o.baseType = i.name, o.name = i.localName, o.type = i.type;
      }
    } else try {
      o = i.decode(n18);
    } catch (s) {
      if (Vt(s, "BUFFER_OVERRUN")) throw s;
      o = s, o.baseType = i.name, o.name = i.localName, o.type = i.type;
    }
    if (o == null) throw new Error("investigate");
    t.push(o), r.push(i.localName || null);
  }), we.fromItems(t, r);
}
__name(Zn, "Zn");
var dn = class extends G {
  static {
    __name(this, "dn");
  }
  coder;
  length;
  constructor(e, t, r) {
    let a = e.type + "[" + (t >= 0 ? t : "") + "]", i = t === -1 || e.dynamic;
    super("array", a, r, i), T(this, { coder: e, length: t });
  }
  defaultValue() {
    let e = this.coder.defaultValue(), t = [];
    for (let r = 0; r < this.length; r++) t.push(e);
    return t;
  }
  encode(e, t) {
    let r = M.dereference(t, "array");
    Array.isArray(r) || this._throwError("expected array value", r);
    let a = this.length;
    a === -1 && (a = r.length, e.writeValue(r.length)), xt(r.length, a, "coder array" + (this.localName ? " " + this.localName : ""));
    let i = [];
    for (let o = 0; o < r.length; o++) i.push(this.coder);
    return Xn(e, i, r);
  }
  decode(e) {
    let t = this.length;
    t === -1 && (t = e.readIndex(), O(t * W <= e.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: e.bytes, offset: t * W, length: e.dataLength }));
    let r = [];
    for (let a = 0; a < t; a++) r.push(new fn(this.coder));
    return Zn(e, r);
  }
};
var pn = class extends G {
  static {
    __name(this, "pn");
  }
  constructor(e) {
    super("bool", "bool", e, false);
  }
  defaultValue() {
    return false;
  }
  encode(e, t) {
    let r = M.dereference(t, "bool");
    return e.writeValue(r ? 1 : 0);
  }
  decode(e) {
    return !!e.readValue();
  }
};
var Ot = class extends G {
  static {
    __name(this, "Ot");
  }
  constructor(e, t) {
    super(e, e, t, true);
  }
  defaultValue() {
    return "0x";
  }
  encode(e, t) {
    t = V(t);
    let r = e.writeValue(t.length);
    return r += e.writeBytes(t), r;
  }
  decode(e) {
    return e.readBytes(e.readIndex(), true);
  }
};
var hn = class extends Ot {
  static {
    __name(this, "hn");
  }
  constructor(e) {
    super("bytes", e);
  }
  decode(e) {
    return k(super.decode(e));
  }
};
var mn = class extends G {
  static {
    __name(this, "mn");
  }
  size;
  constructor(e, t) {
    let r = "bytes" + String(e);
    super(r, r, t, false), T(this, { size: e }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(e, t) {
    let r = V(M.dereference(t, this.type));
    return r.length !== this.size && this._throwError("incorrect data length", t), e.writeBytes(r);
  }
  decode(e) {
    return k(e.readBytes(this.size));
  }
};
var Ji = new Uint8Array([]);
var gn = class extends G {
  static {
    __name(this, "gn");
  }
  constructor(e) {
    super("null", "", e, false);
  }
  defaultValue() {
    return null;
  }
  encode(e, t) {
    return t != null && this._throwError("not null", t), e.writeBytes(Ji);
  }
  decode(e) {
    return e.readBytes(0), null;
  }
};
var Wi = BigInt(0);
var $i = BigInt(1);
var Yi = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var yn = class extends G {
  static {
    __name(this, "yn");
  }
  size;
  signed;
  constructor(e, t, r) {
    let a = (t ? "int" : "uint") + e * 8;
    super(a, a, r, false), T(this, { size: e, signed: t }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(e, t) {
    let r = ee(M.dereference(t, this.type)), a = mt(Yi, W * 8);
    if (this.signed) {
      let i = mt(a, this.size * 8 - 1);
      (r > i || r < -(i + $i)) && this._throwError("value out-of-bounds", t), r = Nn(r, 8 * W);
    } else (r < Wi || r > mt(a, this.size * 8)) && this._throwError("value out-of-bounds", t);
    return e.writeValue(r);
  }
  decode(e) {
    let t = mt(e.readValue(), this.size * 8);
    return this.signed && (t = Dn(t, this.size * 8)), t;
  }
};
var bn = class extends Ot {
  static {
    __name(this, "bn");
  }
  constructor(e) {
    super("string", e);
  }
  defaultValue() {
    return "";
  }
  encode(e, t) {
    return super.encode(e, ve(M.dereference(t, "string")));
  }
  decode(e) {
    return Pn(super.decode(e));
  }
};
var it = class extends G {
  static {
    __name(this, "it");
  }
  coders;
  constructor(e, t) {
    let r = false, a = [];
    e.forEach((o) => {
      o.dynamic && (r = true), a.push(o.type);
    });
    let i = "tuple(" + a.join(",") + ")";
    super("tuple", i, t, r), T(this, { coders: Object.freeze(e.slice()) });
  }
  defaultValue() {
    let e = [];
    this.coders.forEach((r) => {
      e.push(r.defaultValue());
    });
    let t = this.coders.reduce((r, a) => {
      let i = a.localName;
      return i && (r[i] || (r[i] = 0), r[i]++), r;
    }, {});
    return this.coders.forEach((r, a) => {
      let i = r.localName;
      !i || t[i] !== 1 || (i === "length" && (i = "_length"), e[i] == null && (e[i] = e[a]));
    }), Object.freeze(e);
  }
  encode(e, t) {
    let r = M.dereference(t, "tuple");
    return Xn(e, this.coders, r);
  }
  decode(e) {
    return Zn(e, this.coders);
  }
};
function ha(n18) {
  let e;
  return typeof n18 == "string" ? e = yt.computePublicKey(n18, false) : e = n18.publicKey, $(X("0x" + e.substring(4)).substring(26));
}
__name(ha, "ha");
function er(n18, e) {
  return ha(yt.recoverPublicKey(n18, e));
}
__name(er, "er");
function ke(n18) {
  return X(ve(n18));
}
__name(ke, "ke");
function tr(n18) {
  return typeof n18 == "string" && (n18 = ve(n18)), X(Y([ve(Jn), ve(String(n18.length)), n18]));
}
__name(tr, "tr");
function Cn(n18, e) {
  let t = tr(n18);
  return er(t, e);
}
__name(Cn, "Cn");
function te(n18) {
  let e = /* @__PURE__ */ new Set();
  return n18.forEach((t) => e.add(t)), Object.freeze(e);
}
__name(te, "te");
var Xi = "external public payable override";
var Zi = te(Xi.split(" "));
var Ea = "constant external internal payable private public pure view override";
var eo = te(Ea.split(" "));
var Ba = "constructor error event fallback function receive struct";
var ka = te(Ba.split(" "));
var Sa = "calldata memory storage payable indexed";
var to = te(Sa.split(" "));
var no = "tuple returns";
var ro = [Ba, Sa, no, Ea].join(" ");
var ao = te(ro.split(" "));
var io = { "(": "OPEN_PAREN", ")": "CLOSE_PAREN", "[": "OPEN_BRACKET", "]": "CLOSE_BRACKET", ",": "COMMA", "@": "AT" };
var oo = new RegExp("^(\\s*)");
var so = new RegExp("^([0-9]+)");
var lo = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)");
var Da = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$");
var Na = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var ge = class n7 {
  static {
    __name(this, "n");
  }
  #e;
  #t;
  get offset() {
    return this.#e;
  }
  get length() {
    return this.#t.length - this.#e;
  }
  constructor(e) {
    this.#e = 0, this.#t = e.slice();
  }
  clone() {
    return new n7(this.#t);
  }
  reset() {
    this.#e = 0;
  }
  #r(e = 0, t = 0) {
    return new n7(this.#t.slice(e, t).map((r) => Object.freeze(Object.assign({}, r, { match: r.match - e, linkBack: r.linkBack - e, linkNext: r.linkNext - e }))));
  }
  popKeyword(e) {
    let t = this.peek();
    if (t.type !== "KEYWORD" || !e.has(t.text)) throw new Error(`expected keyword ${t.text}`);
    return this.pop().text;
  }
  popType(e) {
    if (this.peek().type !== e) {
      let t = this.peek();
      throw new Error(`expected ${e}; got ${t.type} ${JSON.stringify(t.text)}`);
    }
    return this.pop().text;
  }
  popParen() {
    let e = this.peek();
    if (e.type !== "OPEN_PAREN") throw new Error("bad start");
    let t = this.#r(this.#e + 1, e.match + 1);
    return this.#e = e.match + 1, t;
  }
  popParams() {
    let e = this.peek();
    if (e.type !== "OPEN_PAREN") throw new Error("bad start");
    let t = [];
    for (; this.#e < e.match - 1; ) {
      let r = this.peek().linkNext;
      t.push(this.#r(this.#e + 1, r)), this.#e = r;
    }
    return this.#e = e.match + 1, t;
  }
  peek() {
    if (this.#e >= this.#t.length) throw new Error("out-of-bounds");
    return this.#t[this.#e];
  }
  peekKeyword(e) {
    let t = this.peekType("KEYWORD");
    return t != null && e.has(t) ? t : null;
  }
  peekType(e) {
    if (this.length === 0) return null;
    let t = this.peek();
    return t.type === e ? t.text : null;
  }
  pop() {
    let e = this.peek();
    return this.#e++, e;
  }
  toString() {
    let e = [];
    for (let t = this.#e; t < this.#t.length; t++) {
      let r = this.#t[t];
      e.push(`${r.type}:${r.text}`);
    }
    return `<TokenString ${e.join(" ")}>`;
  }
};
function We(n18) {
  let e = [], t = /* @__PURE__ */ __name((o) => {
    let s = i < n18.length ? JSON.stringify(n18[i]) : "$EOI";
    throw new Error(`invalid token ${s} at ${i}: ${o}`);
  }, "t"), r = [], a = [], i = 0;
  for (; i < n18.length; ) {
    let o = n18.substring(i), s = o.match(oo);
    s && (i += s[1].length, o = n18.substring(i));
    let l = { depth: r.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    e.push(l);
    let u = io[o[0]] || "";
    if (u) {
      if (l.type = u, l.text = o[0], i++, u === "OPEN_PAREN") r.push(e.length - 1), a.push(e.length - 1);
      else if (u == "CLOSE_PAREN") r.length === 0 && t("no matching open bracket"), l.match = r.pop(), e[l.match].match = e.length - 1, l.depth--, l.linkBack = a.pop(), e[l.linkBack].linkNext = e.length - 1;
      else if (u === "COMMA") l.linkBack = a.pop(), e[l.linkBack].linkNext = e.length - 1, a.push(e.length - 1);
      else if (u === "OPEN_BRACKET") l.type = "BRACKET";
      else if (u === "CLOSE_BRACKET") {
        let c = e.pop().text;
        if (e.length > 0 && e[e.length - 1].type === "NUMBER") {
          let f = e.pop().text;
          c = f + c, e[e.length - 1].value = J(f);
        }
        if (e.length === 0 || e[e.length - 1].type !== "BRACKET") throw new Error("missing opening bracket");
        e[e.length - 1].text += c;
      }
      continue;
    }
    if (s = o.match(lo), s) {
      if (l.text = s[1], i += l.text.length, ao.has(l.text)) {
        l.type = "KEYWORD";
        continue;
      }
      if (l.text.match(Na)) {
        l.type = "TYPE";
        continue;
      }
      l.type = "ID";
      continue;
    }
    if (s = o.match(so), s) {
      l.text = s[1], l.type = "NUMBER", i += l.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(o[0])} at position ${i}`);
  }
  return new ge(e.map((o) => Object.freeze(o)));
}
__name(We, "We");
function ma(n18, e) {
  let t = [];
  for (let r in e.keys()) n18.has(r) && t.push(r);
  if (t.length > 1) throw new Error(`conflicting types: ${t.join(", ")}`);
}
__name(ma, "ma");
function wn(n18, e) {
  if (e.peekKeyword(ka)) {
    let t = e.pop().text;
    if (t !== n18) throw new Error(`expected ${n18}, got ${t}`);
  }
  return e.popType("ID");
}
__name(wn, "wn");
function De(n18, e) {
  let t = /* @__PURE__ */ new Set();
  for (; ; ) {
    let r = n18.peekType("KEYWORD");
    if (r == null || e && !e.has(r)) break;
    if (n18.pop(), t.has(r)) throw new Error(`duplicate keywords: ${JSON.stringify(r)}`);
    t.add(r);
  }
  return Object.freeze(t);
}
__name(De, "De");
function Ta(n18) {
  let e = De(n18, eo);
  return ma(e, te("constant payable nonpayable".split(" "))), ma(e, te("pure view payable nonpayable".split(" "))), e.has("view") ? "view" : e.has("pure") ? "pure" : e.has("payable") ? "payable" : e.has("nonpayable") ? "nonpayable" : e.has("constant") ? "view" : "nonpayable";
}
__name(Ta, "Ta");
function Se(n18, e) {
  return n18.popParams().map((t) => Q.from(t, e));
}
__name(Se, "Se");
function Pa(n18) {
  if (n18.peekType("AT")) {
    if (n18.pop(), n18.peekType("NUMBER")) return ee(n18.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
__name(Pa, "Pa");
function ot(n18) {
  if (n18.length) throw new Error(`unexpected tokens at offset ${n18.offset}: ${n18.toString()}`);
}
__name(ot, "ot");
var uo = new RegExp(/^(.*)\[([0-9]*)\]$/);
function ga(n18) {
  let e = n18.match(Na);
  if (p(e, "invalid type", "type", n18), n18 === "uint") return "uint256";
  if (n18 === "int") return "int256";
  if (e[2]) {
    let t = parseInt(e[2]);
    p(t !== 0 && t <= 32, "invalid bytes length", "type", n18);
  } else if (e[3]) {
    let t = parseInt(e[3]);
    p(t !== 0 && t <= 256 && t % 8 === 0, "invalid numeric width", "type", n18);
  }
  return n18;
}
__name(ga, "ga");
var H = {};
var re = /* @__PURE__ */ Symbol.for("_ethers_internal");
var ya = "_ParamTypeInternal";
var ba = "_ErrorInternal";
var Ca = "_EventInternal";
var wa = "_ConstructorInternal";
var va = "_FallbackInternal";
var xa = "_FunctionInternal";
var Aa = "_StructInternal";
var Q = class n8 {
  static {
    __name(this, "n");
  }
  name;
  type;
  baseType;
  indexed;
  components;
  arrayLength;
  arrayChildren;
  constructor(e, t, r, a, i, o, s, l) {
    if (Le(e, H, "ParamType"), Object.defineProperty(this, re, { value: ya }), o && (o = Object.freeze(o.slice())), a === "array") {
      if (s == null || l == null) throw new Error("");
    } else if (s != null || l != null) throw new Error("");
    if (a === "tuple") {
      if (o == null) throw new Error("");
    } else if (o != null) throw new Error("");
    T(this, { name: t, type: r, baseType: a, indexed: i, components: o, arrayLength: s, arrayChildren: l });
  }
  format(e) {
    if (e == null && (e = "sighash"), e === "json") {
      let r = this.name || "";
      if (this.isArray()) {
        let i = JSON.parse(this.arrayChildren.format("json"));
        return i.name = r, i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(i);
      }
      let a = { type: this.baseType === "tuple" ? "tuple" : this.type, name: r };
      return typeof this.indexed == "boolean" && (a.indexed = this.indexed), this.isTuple() && (a.components = this.components.map((i) => JSON.parse(i.format(e)))), JSON.stringify(a);
    }
    let t = "";
    return this.isArray() ? (t += this.arrayChildren.format(e), t += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? t += "(" + this.components.map((r) => r.format(e)).join(e === "full" ? ", " : ",") + ")" : t += this.type, e !== "sighash" && (this.indexed === true && (t += " indexed"), e === "full" && this.name && (t += " " + this.name)), t;
  }
  isArray() {
    return this.baseType === "array";
  }
  isTuple() {
    return this.baseType === "tuple";
  }
  isIndexable() {
    return this.indexed != null;
  }
  walk(e, t) {
    if (this.isArray()) {
      if (!Array.isArray(e)) throw new Error("invalid array value");
      if (this.arrayLength !== -1 && e.length !== this.arrayLength) throw new Error("array is wrong length");
      let r = this;
      return e.map((a) => r.arrayChildren.walk(a, t));
    }
    if (this.isTuple()) {
      if (!Array.isArray(e)) throw new Error("invalid tuple value");
      if (e.length !== this.components.length) throw new Error("array is wrong length");
      let r = this;
      return e.map((a, i) => r.components[i].walk(a, t));
    }
    return t(this.type, e);
  }
  #e(e, t, r, a) {
    if (this.isArray()) {
      if (!Array.isArray(t)) throw new Error("invalid array value");
      if (this.arrayLength !== -1 && t.length !== this.arrayLength) throw new Error("array is wrong length");
      let o = this.arrayChildren, s = t.slice();
      s.forEach((l, u) => {
        o.#e(e, l, r, (c) => {
          s[u] = c;
        });
      }), a(s);
      return;
    }
    if (this.isTuple()) {
      let o = this.components, s;
      if (Array.isArray(t)) s = t.slice();
      else {
        if (t == null || typeof t != "object") throw new Error("invalid tuple value");
        s = o.map((l) => {
          if (!l.name) throw new Error("cannot use object value with unnamed components");
          if (!(l.name in t)) throw new Error(`missing value for component ${l.name}`);
          return t[l.name];
        });
      }
      if (s.length !== this.components.length) throw new Error("array is wrong length");
      s.forEach((l, u) => {
        o[u].#e(e, l, r, (c) => {
          s[u] = c;
        });
      }), a(s);
      return;
    }
    let i = r(this.type, t);
    i.then ? e.push((async function() {
      a(await i);
    })()) : a(i);
  }
  async walkAsync(e, t) {
    let r = [], a = [e];
    return this.#e(r, e, t, (i) => {
      a[0] = i;
    }), r.length && await Promise.all(r), a[0];
  }
  static from(e, t) {
    if (n8.isParamType(e)) return e;
    if (typeof e == "string") try {
      return n8.from(We(e), t);
    } catch {
      p(false, "invalid param type", "obj", e);
    }
    else if (e instanceof ge) {
      let s = "", l = "", u = null;
      De(e, te(["tuple"])).has("tuple") || e.peekType("OPEN_PAREN") ? (l = "tuple", u = e.popParams().map((d) => n8.from(d)), s = `tuple(${u.map((d) => d.format()).join(",")})`) : (s = ga(e.popType("TYPE")), l = s);
      let c = null, f = null;
      for (; e.length && e.peekType("BRACKET"); ) {
        let d = e.pop();
        c = new n8(H, "", s, l, null, u, f, c), f = d.value, s += d.text, l = "array", u = null;
      }
      let h = null;
      if (De(e, to).has("indexed")) {
        if (!t) throw new Error("");
        h = true;
      }
      let C = e.peekType("ID") ? e.pop().text : "";
      if (e.length) throw new Error("leftover tokens");
      return new n8(H, C, s, l, h, u, f, c);
    }
    let r = e.name;
    p(!r || typeof r == "string" && r.match(Da), "invalid name", "obj.name", r);
    let a = e.indexed;
    a != null && (p(t, "parameter cannot be indexed", "obj.indexed", e.indexed), a = !!a);
    let i = e.type, o = i.match(uo);
    if (o) {
      let s = parseInt(o[2] || "-1"), l = n8.from({ type: o[1], components: e.components });
      return new n8(H, r || "", i, "array", a, null, s, l);
    }
    if (i === "tuple" || i.startsWith("tuple(") || i.startsWith("(")) {
      let s = e.components != null ? e.components.map((u) => n8.from(u)) : null;
      return new n8(H, r || "", i, "tuple", a, s, null, null);
    }
    return i = ga(e.type), new n8(H, r || "", i, i, a, null, null, null);
  }
  static isParamType(e) {
    return e && e[re] === ya;
  }
};
var Je = class n9 {
  static {
    __name(this, "n");
  }
  type;
  inputs;
  constructor(e, t, r) {
    Le(e, H, "Fragment"), r = Object.freeze(r.slice()), T(this, { type: t, inputs: r });
  }
  static from(e) {
    if (typeof e == "string") {
      try {
        n9.from(JSON.parse(e));
      } catch {
      }
      return n9.from(We(e));
    }
    if (e instanceof ge) switch (e.peekKeyword(ka)) {
      case "constructor":
        return qe.from(e);
      case "error":
        return ce.from(e);
      case "event":
        return Qe.from(e);
      case "fallback":
      case "receive":
        return Ft.from(e);
      case "function":
        return Ke.from(e);
      case "struct":
        return bt.from(e);
    }
    else if (typeof e == "object") {
      switch (e.type) {
        case "constructor":
          return qe.from(e);
        case "error":
          return ce.from(e);
        case "event":
          return Qe.from(e);
        case "fallback":
        case "receive":
          return Ft.from(e);
        case "function":
          return Ke.from(e);
        case "struct":
          return bt.from(e);
      }
      O(false, `unsupported type: ${e.type}`, "UNSUPPORTED_OPERATION", { operation: "Fragment.from" });
    }
    p(false, "unsupported frgament object", "obj", e);
  }
  static isConstructor(e) {
    return qe.isFragment(e);
  }
  static isError(e) {
    return ce.isFragment(e);
  }
  static isEvent(e) {
    return Qe.isFragment(e);
  }
  static isFunction(e) {
    return Ke.isFragment(e);
  }
  static isStruct(e) {
    return bt.isFragment(e);
  }
};
var st = class extends Je {
  static {
    __name(this, "st");
  }
  name;
  constructor(e, t, r, a) {
    super(e, t, a), p(typeof r == "string" && r.match(Da), "invalid identifier", "name", r), a = Object.freeze(a.slice()), T(this, { name: r });
  }
};
function Lt(n18, e) {
  return "(" + e.map((t) => t.format(n18)).join(n18 === "full" ? ", " : ",") + ")";
}
__name(Lt, "Lt");
var ce = class n10 extends st {
  static {
    __name(this, "n");
  }
  constructor(e, t, r) {
    super(e, "error", t, r), Object.defineProperty(this, re, { value: ba });
  }
  get selector() {
    return ke(this.format("sighash")).substring(0, 10);
  }
  format(e) {
    if (e == null && (e = "sighash"), e === "json") return JSON.stringify({ type: "error", name: this.name, inputs: this.inputs.map((r) => JSON.parse(r.format(e))) });
    let t = [];
    return e !== "sighash" && t.push("error"), t.push(this.name + Lt(e, this.inputs)), t.join(" ");
  }
  static from(e) {
    if (n10.isFragment(e)) return e;
    if (typeof e == "string") return n10.from(We(e));
    if (e instanceof ge) {
      let t = wn("error", e), r = Se(e);
      return ot(e), new n10(H, t, r);
    }
    return new n10(H, e.name, e.inputs ? e.inputs.map(Q.from) : []);
  }
  static isFragment(e) {
    return e && e[re] === ba;
  }
};
var Qe = class n11 extends st {
  static {
    __name(this, "n");
  }
  anonymous;
  constructor(e, t, r, a) {
    super(e, "event", t, r), Object.defineProperty(this, re, { value: Ca }), T(this, { anonymous: a });
  }
  get topicHash() {
    return ke(this.format("sighash"));
  }
  format(e) {
    if (e == null && (e = "sighash"), e === "json") return JSON.stringify({ type: "event", anonymous: this.anonymous, name: this.name, inputs: this.inputs.map((r) => JSON.parse(r.format(e))) });
    let t = [];
    return e !== "sighash" && t.push("event"), t.push(this.name + Lt(e, this.inputs)), e !== "sighash" && this.anonymous && t.push("anonymous"), t.join(" ");
  }
  static getTopicHash(e, t) {
    return t = (t || []).map((a) => Q.from(a)), new n11(H, e, t, false).topicHash;
  }
  static from(e) {
    if (n11.isFragment(e)) return e;
    if (typeof e == "string") try {
      return n11.from(We(e));
    } catch {
      p(false, "invalid event fragment", "obj", e);
    }
    else if (e instanceof ge) {
      let t = wn("event", e), r = Se(e, true), a = !!De(e, te(["anonymous"])).has("anonymous");
      return ot(e), new n11(H, t, r, a);
    }
    return new n11(H, e.name, e.inputs ? e.inputs.map((t) => Q.from(t, true)) : [], !!e.anonymous);
  }
  static isFragment(e) {
    return e && e[re] === Ca;
  }
};
var qe = class n12 extends Je {
  static {
    __name(this, "n");
  }
  payable;
  gas;
  constructor(e, t, r, a, i) {
    super(e, t, r), Object.defineProperty(this, re, { value: wa }), T(this, { payable: a, gas: i });
  }
  format(e) {
    if (O(e != null && e !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), e === "json") return JSON.stringify({ type: "constructor", stateMutability: this.payable ? "payable" : "undefined", payable: this.payable, gas: this.gas != null ? this.gas : void 0, inputs: this.inputs.map((r) => JSON.parse(r.format(e))) });
    let t = [`constructor${Lt(e, this.inputs)}`];
    return this.payable && t.push("payable"), this.gas != null && t.push(`@${this.gas.toString()}`), t.join(" ");
  }
  static from(e) {
    if (n12.isFragment(e)) return e;
    if (typeof e == "string") try {
      return n12.from(We(e));
    } catch {
      p(false, "invalid constuctor fragment", "obj", e);
    }
    else if (e instanceof ge) {
      De(e, te(["constructor"]));
      let t = Se(e), r = !!De(e, Zi).has("payable"), a = Pa(e);
      return ot(e), new n12(H, "constructor", t, r, a);
    }
    return new n12(H, "constructor", e.inputs ? e.inputs.map(Q.from) : [], !!e.payable, e.gas != null ? e.gas : null);
  }
  static isFragment(e) {
    return e && e[re] === wa;
  }
};
var Ft = class n13 extends Je {
  static {
    __name(this, "n");
  }
  payable;
  constructor(e, t, r) {
    super(e, "fallback", t), Object.defineProperty(this, re, { value: va }), T(this, { payable: r });
  }
  format(e) {
    let t = this.inputs.length === 0 ? "receive" : "fallback";
    if (e === "json") {
      let r = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: t, stateMutability: r });
    }
    return `${t}()${this.payable ? " payable" : ""}`;
  }
  static from(e) {
    if (n13.isFragment(e)) return e;
    if (typeof e == "string") try {
      return n13.from(We(e));
    } catch {
      p(false, "invalid fallback fragment", "obj", e);
    }
    else if (e instanceof ge) {
      let t = e.toString(), r = e.peekKeyword(te(["fallback", "receive"]));
      if (p(r, "type must be fallback or receive", "obj", t), e.popKeyword(te(["fallback", "receive"])) === "receive") {
        let s = Se(e);
        return p(s.length === 0, "receive cannot have arguments", "obj.inputs", s), De(e, te(["payable"])), ot(e), new n13(H, [], true);
      }
      let i = Se(e);
      i.length ? p(i.length === 1 && i[0].type === "bytes", "invalid fallback inputs", "obj.inputs", i.map((s) => s.format("minimal")).join(", ")) : i = [Q.from("bytes")];
      let o = Ta(e);
      if (p(o === "nonpayable" || o === "payable", "fallback cannot be constants", "obj.stateMutability", o), De(e, te(["returns"])).has("returns")) {
        let s = Se(e);
        p(s.length === 1 && s[0].type === "bytes", "invalid fallback outputs", "obj.outputs", s.map((l) => l.format("minimal")).join(", "));
      }
      return ot(e), new n13(H, i, o === "payable");
    }
    if (e.type === "receive") return new n13(H, [], true);
    if (e.type === "fallback") {
      let t = [Q.from("bytes")], r = e.stateMutability === "payable";
      return new n13(H, t, r);
    }
    p(false, "invalid fallback description", "obj", e);
  }
  static isFragment(e) {
    return e && e[re] === va;
  }
};
var Ke = class n14 extends st {
  static {
    __name(this, "n");
  }
  constant;
  outputs;
  stateMutability;
  payable;
  gas;
  constructor(e, t, r, a, i, o) {
    super(e, "function", t, a), Object.defineProperty(this, re, { value: xa }), i = Object.freeze(i.slice()), T(this, { constant: r === "view" || r === "pure", gas: o, outputs: i, payable: r === "payable", stateMutability: r });
  }
  get selector() {
    return ke(this.format("sighash")).substring(0, 10);
  }
  format(e) {
    if (e == null && (e = "sighash"), e === "json") return JSON.stringify({ type: "function", name: this.name, constant: this.constant, stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0, payable: this.payable, gas: this.gas != null ? this.gas : void 0, inputs: this.inputs.map((r) => JSON.parse(r.format(e))), outputs: this.outputs.map((r) => JSON.parse(r.format(e))) });
    let t = [];
    return e !== "sighash" && t.push("function"), t.push(this.name + Lt(e, this.inputs)), e !== "sighash" && (this.stateMutability !== "nonpayable" && t.push(this.stateMutability), this.outputs && this.outputs.length && (t.push("returns"), t.push(Lt(e, this.outputs))), this.gas != null && t.push(`@${this.gas.toString()}`)), t.join(" ");
  }
  static getSelector(e, t) {
    return t = (t || []).map((a) => Q.from(a)), new n14(H, e, "view", t, [], null).selector;
  }
  static from(e) {
    if (n14.isFragment(e)) return e;
    if (typeof e == "string") try {
      return n14.from(We(e));
    } catch {
      p(false, "invalid function fragment", "obj", e);
    }
    else if (e instanceof ge) {
      let r = wn("function", e), a = Se(e), i = Ta(e), o = [];
      De(e, te(["returns"])).has("returns") && (o = Se(e));
      let s = Pa(e);
      return ot(e), new n14(H, r, i, a, o, s);
    }
    let t = e.stateMutability;
    return t == null && (t = "payable", typeof e.constant == "boolean" ? (t = "view", e.constant || (t = "payable", typeof e.payable == "boolean" && !e.payable && (t = "nonpayable"))) : typeof e.payable == "boolean" && !e.payable && (t = "nonpayable")), new n14(H, e.name, t, e.inputs ? e.inputs.map(Q.from) : [], e.outputs ? e.outputs.map(Q.from) : [], e.gas != null ? e.gas : null);
  }
  static isFragment(e) {
    return e && e[re] === xa;
  }
};
var bt = class n15 extends st {
  static {
    __name(this, "n");
  }
  constructor(e, t, r) {
    super(e, "struct", t, r), Object.defineProperty(this, re, { value: Aa });
  }
  format() {
    throw new Error("@TODO");
  }
  static from(e) {
    if (typeof e == "string") try {
      return n15.from(We(e));
    } catch {
      p(false, "invalid struct fragment", "obj", e);
    }
    else if (e instanceof ge) {
      let t = wn("struct", e), r = Se(e);
      return ot(e), new n15(H, t, r);
    }
    return new n15(H, e.name, e.inputs ? e.inputs.map(Q.from) : []);
  }
  static isFragment(e) {
    return e && e[re] === Aa;
  }
};
var ye = /* @__PURE__ */ new Map();
ye.set(0, "GENERIC_PANIC");
ye.set(1, "ASSERT_FALSE");
ye.set(17, "OVERFLOW");
ye.set(18, "DIVIDE_BY_ZERO");
ye.set(33, "ENUM_RANGE_ERROR");
ye.set(34, "BAD_STORAGE_DATA");
ye.set(49, "STACK_UNDERFLOW");
ye.set(50, "ARRAY_RANGE_ERROR");
ye.set(65, "OUT_OF_MEMORY");
ye.set(81, "UNINITIALIZED_FUNCTION_CALL");
var co = new RegExp(/^bytes([0-9]*)$/);
var fo = new RegExp(/^(u?int)([0-9]*)$/);
var nr = null;
var Ia = 1024;
function po(n18, e, t, r) {
  let a = "missing revert data", i = null, o = null, s = null;
  if (t) {
    a = "execution reverted";
    let u = _(t);
    if (t = k(t), u.length === 0) a += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (u.length % 32 !== 4) a += " (could not decode reason; invalid data length)";
    else if (k(u.slice(0, 4)) === "0x08c379a0") try {
      i = r.decode(["string"], u.slice(4))[0], s = { signature: "Error(string)", name: "Error", args: [i] }, a += `: ${JSON.stringify(i)}`;
    } catch {
      a += " (could not decode reason; invalid string data)";
    }
    else if (k(u.slice(0, 4)) === "0x4e487b71") try {
      let c = Number(r.decode(["uint256"], u.slice(4))[0]);
      s = { signature: "Panic(uint256)", name: "Panic", args: [c] }, i = `Panic due to ${ye.get(c) || "UNKNOWN"}(${c})`, a += `: ${i}`;
    } catch {
      a += " (could not decode panic code)";
    }
    else a += " (unknown custom error)";
  }
  let l = { to: e.to ? $(e.to) : null, data: e.data || "0x" };
  return e.from && (l.from = $(e.from)), Gt(a, "CALL_EXCEPTION", { action: n18, data: t, reason: i, transaction: l, invocation: o, revert: s });
}
__name(po, "po");
var Ct = class n16 {
  static {
    __name(this, "n");
  }
  #e(e) {
    if (e.isArray()) return new dn(this.#e(e.arrayChildren), e.arrayLength, e.name);
    if (e.isTuple()) return new it(e.components.map((r) => this.#e(r)), e.name);
    switch (e.baseType) {
      case "address":
        return new cn(e.name);
      case "bool":
        return new pn(e.name);
      case "string":
        return new bn(e.name);
      case "bytes":
        return new hn(e.name);
      case "":
        return new gn(e.name);
    }
    let t = e.type.match(fo);
    if (t) {
      let r = parseInt(t[2] || "256");
      return p(r !== 0 && r <= 256 && r % 8 === 0, "invalid " + t[1] + " bit length", "param", e), new yn(r / 8, t[1] === "int", e.name);
    }
    if (t = e.type.match(co), t) {
      let r = parseInt(t[1]);
      return p(r !== 0 && r <= 32, "invalid bytes length", "param", e), new mn(r, e.name);
    }
    p(false, "invalid type", "type", e.type);
  }
  getDefaultValue(e) {
    let t = e.map((a) => this.#e(Q.from(a)));
    return new it(t, "_").defaultValue();
  }
  encode(e, t) {
    xt(t.length, e.length, "types/values length mismatch");
    let r = e.map((o) => this.#e(Q.from(o))), a = new it(r, "_"), i = new Xe();
    return a.encode(i, t), i.data;
  }
  decode(e, t, r) {
    let a = e.map((o) => this.#e(Q.from(o)));
    return new it(a, "_").decode(new Kt(t, r, Ia));
  }
  static _setDefaultMaxInflation(e) {
    p(typeof e == "number" && Number.isInteger(e), "invalid defaultMaxInflation factor", "value", e), Ia = e;
  }
  static defaultAbiCoder() {
    return nr == null && (nr = new n16()), nr;
  }
  static getBuiltinCallException(e, t, r) {
    return po(e, t, r, n16.defaultAbiCoder());
  }
};
var Rt = class {
  static {
    __name(this, "Rt");
  }
  fragment;
  name;
  signature;
  topic;
  args;
  constructor(e, t, r) {
    let a = e.name, i = e.format();
    T(this, { fragment: e, name: a, signature: i, topic: t, args: r });
  }
};
var Ut = class {
  static {
    __name(this, "Ut");
  }
  fragment;
  name;
  args;
  signature;
  selector;
  value;
  constructor(e, t, r, a) {
    let i = e.name, o = e.format();
    T(this, { fragment: e, name: i, args: r, signature: o, selector: t, value: a });
  }
};
var zt = class {
  static {
    __name(this, "zt");
  }
  fragment;
  name;
  args;
  signature;
  selector;
  constructor(e, t, r) {
    let a = e.name, i = e.format();
    T(this, { fragment: e, name: a, args: r, signature: i, selector: t });
  }
};
var wt = class {
  static {
    __name(this, "wt");
  }
  hash;
  _isIndexed;
  static isIndexed(e) {
    return !!(e && e._isIndexed);
  }
  constructor(e) {
    T(this, { hash: e, _isIndexed: true });
  }
};
var Oa = { 0: "generic panic", 1: "assert(false)", 17: "arithmetic overflow", 18: "division or modulo by zero", 33: "enum overflow", 34: "invalid encoded storage byte array accessed", 49: "out-of-bounds array access; popping on an empty array", 50: "out-of-bounds access of an array or bytesN", 65: "out of memory", 81: "uninitialized function" };
var La = { "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: /* @__PURE__ */ __name((n18) => `reverted with reason string ${JSON.stringify(n18)}`, "reason") }, "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"], reason: /* @__PURE__ */ __name((n18) => {
  let e = "unknown panic code";
  return n18 >= 0 && n18 <= 255 && Oa[n18.toString()] && (e = Oa[n18.toString()]), `reverted with panic code 0x${n18.toString(16)} (${e})`;
}, "reason") } };
var lt = class n17 {
  static {
    __name(this, "n");
  }
  fragments;
  deploy;
  fallback;
  receive;
  #e;
  #t;
  #r;
  #n;
  constructor(e) {
    let t = [];
    typeof e == "string" ? t = JSON.parse(e) : t = e, this.#r = /* @__PURE__ */ new Map(), this.#e = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map();
    let r = [];
    for (let o of t) try {
      r.push(Je.from(o));
    } catch (s) {
      console.log(`[Warning] Invalid Fragment ${JSON.stringify(o)}:`, s.message);
    }
    T(this, { fragments: Object.freeze(r) });
    let a = null, i = false;
    this.#n = this.getAbiCoder(), this.fragments.forEach((o, s) => {
      let l;
      switch (o.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          T(this, { deploy: o });
          return;
        case "fallback":
          o.inputs.length === 0 ? i = true : (p(!a || o.payable !== a.payable, "conflicting fallback fragments", `fragments[${s}]`, o), a = o, i = a.payable);
          return;
        case "function":
          l = this.#r;
          break;
        case "event":
          l = this.#t;
          break;
        case "error":
          l = this.#e;
          break;
        default:
          return;
      }
      let u = o.format();
      l.has(u) || l.set(u, o);
    }), this.deploy || T(this, { deploy: qe.from("constructor()") }), T(this, { fallback: a, receive: i });
  }
  format(e) {
    let t = e ? "minimal" : "full";
    return this.fragments.map((a) => a.format(t));
  }
  formatJson() {
    let e = this.fragments.map((t) => t.format("json"));
    return JSON.stringify(e.map((t) => JSON.parse(t)));
  }
  getAbiCoder() {
    return Ct.defaultAbiCoder();
  }
  #a(e, t, r) {
    if (Ce(e)) {
      let i = e.toLowerCase();
      for (let o of this.#r.values()) if (i === o.selector) return o;
      return null;
    }
    if (e.indexOf("(") === -1) {
      let i = [];
      for (let [o, s] of this.#r) o.split("(")[0] === e && i.push(s);
      if (t) {
        let o = t.length > 0 ? t[t.length - 1] : null, s = t.length, l = true;
        M.isTyped(o) && o.type === "overrides" && (l = false, s--);
        for (let u = i.length - 1; u >= 0; u--) {
          let c = i[u].inputs.length;
          c !== s && (!l || c !== s - 1) && i.splice(u, 1);
        }
        for (let u = i.length - 1; u >= 0; u--) {
          let c = i[u].inputs;
          for (let f = 0; f < t.length; f++) if (M.isTyped(t[f])) {
            if (f >= c.length) {
              if (t[f].type === "overrides") continue;
              i.splice(u, 1);
              break;
            }
            if (t[f].type !== c[f].baseType) {
              i.splice(u, 1);
              break;
            }
          }
        }
      }
      if (i.length === 1 && t && t.length !== i[0].inputs.length) {
        let o = t[t.length - 1];
        (o == null || Array.isArray(o) || typeof o != "object") && i.splice(0, 1);
      }
      if (i.length === 0) return null;
      if (i.length > 1 && r) {
        let o = i.map((s) => JSON.stringify(s.format())).join(", ");
        p(false, `ambiguous function description (i.e. matches ${o})`, "key", e);
      }
      return i[0];
    }
    let a = this.#r.get(Ke.from(e).format());
    return a || null;
  }
  getFunctionName(e) {
    let t = this.#a(e, null, false);
    return p(t, "no matching function", "key", e), t.name;
  }
  hasFunction(e) {
    return !!this.#a(e, null, false);
  }
  getFunction(e, t) {
    return this.#a(e, t || null, true);
  }
  forEachFunction(e) {
    let t = Array.from(this.#r.keys());
    t.sort((r, a) => r.localeCompare(a));
    for (let r = 0; r < t.length; r++) {
      let a = t[r];
      e(this.#r.get(a), r);
    }
  }
  #i(e, t, r) {
    if (Ce(e)) {
      let i = e.toLowerCase();
      for (let o of this.#t.values()) if (i === o.topicHash) return o;
      return null;
    }
    if (e.indexOf("(") === -1) {
      let i = [];
      for (let [o, s] of this.#t) o.split("(")[0] === e && i.push(s);
      if (t) {
        for (let o = i.length - 1; o >= 0; o--) i[o].inputs.length < t.length && i.splice(o, 1);
        for (let o = i.length - 1; o >= 0; o--) {
          let s = i[o].inputs;
          for (let l = 0; l < t.length; l++) if (M.isTyped(t[l]) && t[l].type !== s[l].baseType) {
            i.splice(o, 1);
            break;
          }
        }
      }
      if (i.length === 0) return null;
      if (i.length > 1 && r) {
        let o = i.map((s) => JSON.stringify(s.format())).join(", ");
        p(false, `ambiguous event description (i.e. matches ${o})`, "key", e);
      }
      return i[0];
    }
    let a = this.#t.get(Qe.from(e).format());
    return a || null;
  }
  getEventName(e) {
    let t = this.#i(e, null, false);
    return p(t, "no matching event", "key", e), t.name;
  }
  hasEvent(e) {
    return !!this.#i(e, null, false);
  }
  getEvent(e, t) {
    return this.#i(e, t || null, true);
  }
  forEachEvent(e) {
    let t = Array.from(this.#t.keys());
    t.sort((r, a) => r.localeCompare(a));
    for (let r = 0; r < t.length; r++) {
      let a = t[r];
      e(this.#t.get(a), r);
    }
  }
  getError(e, t) {
    if (Ce(e)) {
      let a = e.toLowerCase();
      if (La[a]) return ce.from(La[a].signature);
      for (let i of this.#e.values()) if (a === i.selector) return i;
      return null;
    }
    if (e.indexOf("(") === -1) {
      let a = [];
      for (let [i, o] of this.#e) i.split("(")[0] === e && a.push(o);
      if (a.length === 0) return e === "Error" ? ce.from("error Error(string)") : e === "Panic" ? ce.from("error Panic(uint256)") : null;
      if (a.length > 1) {
        let i = a.map((o) => JSON.stringify(o.format())).join(", ");
        p(false, `ambiguous error description (i.e. ${i})`, "name", e);
      }
      return a[0];
    }
    if (e = ce.from(e).format(), e === "Error(string)") return ce.from("error Error(string)");
    if (e === "Panic(uint256)") return ce.from("error Panic(uint256)");
    let r = this.#e.get(e);
    return r || null;
  }
  forEachError(e) {
    let t = Array.from(this.#e.keys());
    t.sort((r, a) => r.localeCompare(a));
    for (let r = 0; r < t.length; r++) {
      let a = t[r];
      e(this.#e.get(a), r);
    }
  }
  _decodeParams(e, t) {
    return this.#n.decode(e, t);
  }
  _encodeParams(e, t) {
    return this.#n.encode(e, t);
  }
  encodeDeploy(e) {
    return this._encodeParams(this.deploy.inputs, e || []);
  }
  decodeErrorResult(e, t) {
    if (typeof e == "string") {
      let r = this.getError(e);
      p(r, "unknown error", "fragment", e), e = r;
    }
    return p(Re(t, 0, 4) === e.selector, `data signature does not match error ${e.name}.`, "data", t), this._decodeParams(e.inputs, Re(t, 4));
  }
  encodeErrorResult(e, t) {
    if (typeof e == "string") {
      let r = this.getError(e);
      p(r, "unknown error", "fragment", e), e = r;
    }
    return Y([e.selector, this._encodeParams(e.inputs, t || [])]);
  }
  decodeFunctionData(e, t) {
    if (typeof e == "string") {
      let r = this.getFunction(e);
      p(r, "unknown function", "fragment", e), e = r;
    }
    return p(Re(t, 0, 4) === e.selector, `data signature does not match function ${e.name}.`, "data", t), this._decodeParams(e.inputs, Re(t, 4));
  }
  encodeFunctionData(e, t) {
    if (typeof e == "string") {
      let r = this.getFunction(e);
      p(r, "unknown function", "fragment", e), e = r;
    }
    return Y([e.selector, this._encodeParams(e.inputs, t || [])]);
  }
  decodeFunctionResult(e, t) {
    if (typeof e == "string") {
      let i = this.getFunction(e);
      p(i, "unknown function", "fragment", e), e = i;
    }
    let r = "invalid length for result data", a = V(t);
    if (a.length % 32 === 0) try {
      return this.#n.decode(e.outputs, a);
    } catch {
      r = "could not decode result data";
    }
    O(false, r, "BAD_DATA", { value: k(a), info: { method: e.name, signature: e.format() } });
  }
  makeError(e, t) {
    let r = _(e, "data"), a = Ct.getBuiltinCallException("call", t, r);
    if (a.message.startsWith("execution reverted (unknown custom error)")) {
      let s = k(r.slice(0, 4)), l = this.getError(s);
      if (l) try {
        let u = this.#n.decode(l.inputs, r.slice(4));
        a.revert = { name: l.name, signature: l.format(), args: u }, a.reason = a.revert.signature, a.message = `execution reverted: ${a.reason}`;
      } catch {
        a.message = "execution reverted (coult not decode custom error)";
      }
    }
    let o = this.parseTransaction(t);
    return o && (a.invocation = { method: o.name, signature: o.signature, args: o.args }), a;
  }
  encodeFunctionResult(e, t) {
    if (typeof e == "string") {
      let r = this.getFunction(e);
      p(r, "unknown function", "fragment", e), e = r;
    }
    return k(this.#n.encode(e.outputs, t || []));
  }
  encodeFilterTopics(e, t) {
    if (typeof e == "string") {
      let i = this.getEvent(e);
      p(i, "unknown event", "eventFragment", e), e = i;
    }
    O(t.length <= e.inputs.length, `too many arguments for ${e.format()}`, "UNEXPECTED_ARGUMENT", { count: t.length, expectedCount: e.inputs.length });
    let r = [];
    e.anonymous || r.push(e.topicHash);
    let a = /* @__PURE__ */ __name((i, o) => i.type === "string" ? ke(o) : i.type === "bytes" ? X(k(o)) : (i.type === "bool" && typeof o == "boolean" ? o = o ? "0x01" : "0x00" : i.type.match(/^u?int/) ? o = Ue(o) : i.type.match(/^bytes/) ? o = Sn(o, 32) : i.type === "address" && this.#n.encode(["address"], [o]), At(k(o), 32)), "a");
    for (t.forEach((i, o) => {
      let s = e.inputs[o];
      if (!s.indexed) {
        p(i == null, "cannot filter non-indexed parameters; must be null", "contract." + s.name, i);
        return;
      }
      i == null ? r.push(null) : s.baseType === "array" || s.baseType === "tuple" ? p(false, "filtering with tuples or arrays not supported", "contract." + s.name, i) : Array.isArray(i) ? r.push(i.map((l) => a(s, l))) : r.push(a(s, i));
    }); r.length && r[r.length - 1] === null; ) r.pop();
    return r;
  }
  encodeEventLog(e, t) {
    if (typeof e == "string") {
      let o = this.getEvent(e);
      p(o, "unknown event", "eventFragment", e), e = o;
    }
    let r = [], a = [], i = [];
    return e.anonymous || r.push(e.topicHash), p(t.length === e.inputs.length, "event arguments/values mismatch", "values", t), e.inputs.forEach((o, s) => {
      let l = t[s];
      if (o.indexed) if (o.type === "string") r.push(ke(l));
      else if (o.type === "bytes") r.push(X(l));
      else {
        if (o.baseType === "tuple" || o.baseType === "array") throw new Error("not implemented");
        r.push(this.#n.encode([o.type], [l]));
      }
      else a.push(o), i.push(l);
    }), { data: this.#n.encode(a, i), topics: r };
  }
  decodeEventLog(e, t, r) {
    if (typeof e == "string") {
      let m = this.getEvent(e);
      p(m, "unknown event", "eventFragment", e), e = m;
    }
    if (r != null && !e.anonymous) {
      let m = e.topicHash;
      p(Ce(r[0], 32) && r[0].toLowerCase() === m, "fragment/topic mismatch", "topics[0]", r[0]), r = r.slice(1);
    }
    let a = [], i = [], o = [];
    e.inputs.forEach((m, C) => {
      m.indexed ? m.type === "string" || m.type === "bytes" || m.baseType === "tuple" || m.baseType === "array" ? (a.push(Q.from({ type: "bytes32", name: m.name })), o.push(true)) : (a.push(m), o.push(false)) : (i.push(m), o.push(false));
    });
    let s = r != null ? this.#n.decode(a, Y(r)) : null, l = this.#n.decode(i, t, true), u = [], c = [], f = 0, h = 0;
    return e.inputs.forEach((m, C) => {
      let d = null;
      if (m.indexed) if (s == null) d = new wt(null);
      else if (o[C]) d = new wt(s[h++]);
      else try {
        d = s[h++];
      } catch (y) {
        d = y;
      }
      else try {
        d = l[f++];
      } catch (y) {
        d = y;
      }
      u.push(d), c.push(m.name || null);
    }), we.fromItems(u, c);
  }
  parseTransaction(e) {
    let t = _(e.data, "tx.data"), r = ee(e.value != null ? e.value : 0, "tx.value"), a = this.getFunction(k(t.slice(0, 4)));
    if (!a) return null;
    let i = this.#n.decode(a.inputs, t.slice(4));
    return new Ut(a, a.selector, i, r);
  }
  parseCallResult(e) {
    throw new Error("@TODO");
  }
  parseLog(e) {
    let t = this.getEvent(e.topics[0]);
    return !t || t.anonymous ? null : new Rt(t, t.topicHash, this.decodeEventLog(t, e.data, e.topics));
  }
  parseError(e) {
    let t = k(e), r = this.getError(Re(t, 0, 4));
    if (!r) return null;
    let a = this.#n.decode(r.inputs, Re(t, 4));
    return new zt(r, r.selector, a);
  }
  static from(e) {
    return e instanceof n17 ? e : typeof e == "string" ? new n17(JSON.parse(e)) : typeof e.formatJson == "function" ? new n17(e.formatJson()) : typeof e.format == "function" ? new n17(e.format("json")) : new n17(e);
  }
};
var vn = "https://public-01.testnet.bifrostnetwork.com/rpc";
var rr = "https://public-02.testnet.bifrostnetwork.com/rpc";
var Ra = ["function advertiser() view returns(address)", "function rightsHolder() view returns(address)", "function platform() view returns(address)", "function cad() view returns(address)", "function status() view returns(uint8)", "function videoHash() view returns(bytes32)", "function executionDeadline() view returns(uint256)", "function usageEnd() view returns(uint256)", "function RIGHTS_FEE() view returns(uint256)", "function PLATFORM_FEE() view returns(uint256)", "function TOTAL_FEE() view returns(uint256)", "function EXECUTION_WINDOW() view returns(uint256)", "function USAGE_PERIOD() view returns(uint256)", "function escrowBalance() view returns(uint256)", "function registerAd(bytes32)", "function deposit()", "function approveUse()", "function rejectUse()", "function activateAd(bytes32)", "function refund()", "function isPublishable(bytes32) view returns(bool)", "event AdRegistered(bytes32 indexed videoHash,uint256 executionDeadline)", "event EscrowFunded(address indexed advertiser,uint256 amount)", "event UseApproved(address indexed rightsHolder)", "event UseRejected(address indexed rightsHolder)", "event AdActivated(bytes32 indexed videoHash,uint256 usageEnd)", "event EscrowRefunded(address indexed advertiser,uint256 amount)"];
var Ua = ["function approve(address,uint256) returns(bool)", "function allowance(address,address) view returns(uint256)", "function balanceOf(address) view returns(uint256)", "function decimals() view returns(uint8)", "function symbol() view returns(string)"];
var Ne = /* @__PURE__ */ __name((n18, e) => !!n18 && !!e && n18.toLowerCase() === e.toLowerCase(), "Ne");
var ar = { "/ConsentAdStarter.sol": { body: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts@5.4.0/token/ERC20/utils/SafeERC20.sol";

/// @notice Classroom demo token. No monetary value.
contract CADToken is ERC20 {
    constructor() ERC20("Consent Ad Demo Token", "CAD") {
        _mint(msg.sender, 10_000);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}

/// @notice One advertisement per escrow. Configure terms at deployment.
/// Terms are immutable after deployment: an approval cannot be reused for new terms.
contract ConsentAdEscrow {
    using SafeERC20 for IERC20;

    IERC20 public immutable cad;
    address public immutable advertiser;
    address public immutable rightsHolder;
    address public immutable platform;

    // Set for each advertisement in the constructor.
    // Getter names are preserved for compatibility with the existing website.
    uint256 public immutable RIGHTS_FEE;
    uint256 public immutable PLATFORM_FEE;
    uint256 public immutable TOTAL_FEE;
    uint256 public immutable EXECUTION_WINDOW;
    uint256 public immutable USAGE_PERIOD;

    enum Status {
        NotRegistered, // 0
        Registered,    // 1
        Funded,        // 2
        Approved,      // 3
        Active,        // 4
        Rejected,      // 5
        Refunded       // 6
    }

    Status public status;
    bytes32 public videoHash;
    uint256 public executionDeadline;
    uint256 public usageEnd;

    event TermsConfigured(
        uint256 rightsFee,
        uint256 platformFee,
        uint256 executionWindowSeconds,
        uint256 usagePeriodSeconds
    );
    event AdRegistered(bytes32 indexed videoHash, uint256 executionDeadline);
    event EscrowFunded(address indexed advertiser, uint256 amount);
    event UseApproved(address indexed rightsHolder);
    event UseRejected(address indexed rightsHolder);
    event AdActivated(bytes32 indexed videoHash, uint256 usageEnd);
    event EscrowRefunded(address indexed advertiser, uint256 amount);

    modifier onlyAdvertiser() {
        require(msg.sender == advertiser, "Only advertiser");
        _;
    }

    modifier onlyRightsHolder() {
        require(msg.sender == rightsHolder, "Only rights holder");
        _;
    }

    modifier onlyPlatform() {
        require(msg.sender == platform, "Only platform");
        _;
    }

    /// @param rightsFee Integer CAD paid to the rights holder.
    /// @param platformFee Integer CAD paid to the platform.
    /// @param executionWindowSeconds Time allowed after registerAd, in seconds.
    /// @param usagePeriodSeconds Time allowed after activateAd, in seconds.
    constructor(
        address tokenAddress,
        address rightsHolderAddress,
        address platformAddress,
        uint256 rightsFee,
        uint256 platformFee,
        uint256 executionWindowSeconds,
        uint256 usagePeriodSeconds
    ) {
        require(tokenAddress.code.length > 0, "Invalid token contract");
        require(rightsHolderAddress != address(0), "Invalid rights holder");
        require(platformAddress != address(0), "Invalid platform");
        require(rightsHolderAddress != platformAddress, "Different roles required");
        require(rightsHolderAddress != msg.sender, "Advertiser cannot approve");
        require(platformAddress != msg.sender, "Advertiser cannot activate");
        require(rightsFee + platformFee > 0, "Total fee must be positive");
        require(executionWindowSeconds > 0, "Invalid execution window");
        require(usagePeriodSeconds > 0, "Invalid usage period");
        require(
            executionWindowSeconds <= type(uint64).max &&
            usagePeriodSeconds <= type(uint64).max,
            "Duration too large"
        );

        cad = IERC20(tokenAddress);
        advertiser = msg.sender;
        rightsHolder = rightsHolderAddress;
        platform = platformAddress;
        RIGHTS_FEE = rightsFee;
        PLATFORM_FEE = platformFee;
        TOTAL_FEE = rightsFee + platformFee;
        EXECUTION_WINDOW = executionWindowSeconds;
        USAGE_PERIOD = usagePeriodSeconds;

        emit TermsConfigured(rightsFee, platformFee, executionWindowSeconds, usagePeriodSeconds);
    }

    function registerAd(bytes32 finalVideoHash) external onlyAdvertiser {
        require(status == Status.NotRegistered, "Already registered");
        require(finalVideoHash != bytes32(0), "Empty video hash");
        videoHash = finalVideoHash;
        executionDeadline = block.timestamp + EXECUTION_WINDOW;
        status = Status.Registered;
        emit AdRegistered(finalVideoHash, executionDeadline);
    }

    function deposit() external onlyAdvertiser {
        require(status == Status.Registered, "Register first");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        status = Status.Funded;
        cad.safeTransferFrom(advertiser, address(this), TOTAL_FEE);
        emit EscrowFunded(advertiser, TOTAL_FEE);
    }

    function approveUse() external onlyRightsHolder {
        require(status == Status.Funded, "Deposit first");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        status = Status.Approved;
        emit UseApproved(msg.sender);
    }

    function rejectUse() external onlyRightsHolder {
        require(status == Status.Funded || status == Status.Approved, "Cannot reject now");
        status = Status.Rejected;
        emit UseRejected(msg.sender);
    }

    function activateAd(bytes32 actualVideoHash) external onlyPlatform {
        require(status == Status.Approved, "Not approved");
        require(block.timestamp <= executionDeadline, "Deadline passed");
        require(actualVideoHash == videoHash, "Video hash mismatch");
        status = Status.Active;
        usageEnd = block.timestamp + USAGE_PERIOD;
        if (RIGHTS_FEE > 0) cad.safeTransfer(rightsHolder, RIGHTS_FEE);
        if (PLATFORM_FEE > 0) cad.safeTransfer(platform, PLATFORM_FEE);
        emit AdActivated(videoHash, usageEnd);
    }

    function refund() external onlyAdvertiser {
        require(
            status == Status.Funded || status == Status.Approved || status == Status.Rejected,
            "No refundable escrow"
        );
        require(status == Status.Rejected || block.timestamp > executionDeadline, "Still pending");
        status = Status.Refunded;
        cad.safeTransfer(advertiser, TOTAL_FEE);
        emit EscrowRefunded(advertiser, TOTAL_FEE);
    }

    function isPublishable(bytes32 actualVideoHash) external view returns (bool) {
        return status == Status.Active && block.timestamp <= usageEnd && actualVideoHash == videoHash;
    }

    function escrowBalance() external view returns (uint256) {
        return cad.balanceOf(address(this));
    }
}
`, type: "text/plain; charset=utf-8" }, "/contracts.json": { body: '{"CADToken":{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"bytecode":"0x608060405234801561001057600080fd5b506040518060400160405280601581526020017f436f6e73656e742041642044656d6f20546f6b656e00000000000000000000008152506040518060400160405280600381526020016210d05160ea1b815250816003908161007291906102a1565b50600461007f82826102a1565b5050506100943361271061009960201b60201c565b610386565b6001600160a01b0382166100c85760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b6100d4600083836100d8565b5050565b6001600160a01b0383166101035780600260008282546100f8919061035f565b909155506101759050565b6001600160a01b038316600090815260208190526040902054818110156101565760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016100bf565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610191576002805482900390556101b0565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516101f591815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061022c57607f821691505b60208210810361024c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561029c57806000526020600020601f840160051c810160208510156102795750805b601f840160051c820191505b818110156102995760008155600101610285565b50505b505050565b81516001600160401b038111156102ba576102ba610202565b6102ce816102c88454610218565b84610252565b6020601f82116001811461030257600083156102ea5750848201515b600019600385901b1c1916600184901b178455610299565b600084815260208120601f198516915b828110156103325787850151825560209485019460019092019101610312565b50848210156103505786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b8082018082111561038057634e487b7160e01b600052601160045260246000fd5b92915050565b610722806103956000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce567146100fe57806370a082311461010d57806395d89b4114610136578063a9059cbb1461013e578063dd62ed3e1461015157600080fd5b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100d957806323b872dd146100eb575b600080fd5b6100a061018a565b6040516100ad919061056b565b60405180910390f35b6100c96100c43660046105d5565b61021c565b60405190151581526020016100ad565b6002545b6040519081526020016100ad565b6100c96100f93660046105ff565b610236565b604051600081526020016100ad565b6100dd61011b36600461063c565b6001600160a01b031660009081526020819052604090205490565b6100a061025a565b6100c961014c3660046105d5565b610269565b6100dd61015f36600461065e565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b60606003805461019990610691565b80601f01602080910402602001604051908101604052809291908181526020018280546101c590610691565b80156102125780601f106101e757610100808354040283529160200191610212565b820191906000526020600020905b8154815290600101906020018083116101f557829003601f168201915b5050505050905090565b60003361022a818585610277565b60019150505b92915050565b600033610244858285610289565b61024f85858561030d565b506001949350505050565b60606004805461019990610691565b60003361022a81858561030d565b610284838383600161036c565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981101561030757818110156102f857604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b6103078484848403600061036c565b50505050565b6001600160a01b03831661033757604051634b637e8f60e11b8152600060048201526024016102ef565b6001600160a01b0382166103615760405163ec442f0560e01b8152600060048201526024016102ef565b610284838383610441565b6001600160a01b0384166103965760405163e602df0560e01b8152600060048201526024016102ef565b6001600160a01b0383166103c057604051634a1406b160e11b8152600060048201526024016102ef565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561030757826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161043391815260200190565b60405180910390a350505050565b6001600160a01b03831661046c57806002600082825461046191906106cb565b909155506104de9050565b6001600160a01b038316600090815260208190526040902054818110156104bf5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016102ef565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166104fa57600280548290039055610519565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161055e91815260200190565b60405180910390a3505050565b602081526000825180602084015260005b81811015610599576020818601810151604086840101520161057c565b506000604082850101526040601f19601f83011684010191505092915050565b80356001600160a01b03811681146105d057600080fd5b919050565b600080604083850312156105e857600080fd5b6105f1836105b9565b946020939093013593505050565b60008060006060848603121561061457600080fd5b61061d846105b9565b925061062b602085016105b9565b929592945050506040919091013590565b60006020828403121561064e57600080fd5b610657826105b9565b9392505050565b6000806040838503121561067157600080fd5b61067a836105b9565b9150610688602084016105b9565b90509250929050565b600181811c908216806106a557607f821691505b6020821081036106c557634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561023057634e487b7160e01b600052601160045260246000fdfea26469706673582212200e19ffa2751e0289f3474411fd06e3110e39dff7cadeae0e858e1b7c8bef36bf64736f6c634300081e0033"},"ConsentAdEscrow":{"abi":[{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"rightsHolderAddress","type":"address"},{"internalType":"address","name":"platformAddress","type":"address"},{"internalType":"uint256","name":"rightsFee","type":"uint256"},{"internalType":"uint256","name":"platformFee","type":"uint256"},{"internalType":"uint256","name":"executionWindowSeconds","type":"uint256"},{"internalType":"uint256","name":"usagePeriodSeconds","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"SafeERC20FailedOperation","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"videoHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"usageEnd","type":"uint256"}],"name":"AdActivated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"videoHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"executionDeadline","type":"uint256"}],"name":"AdRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"advertiser","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EscrowFunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"advertiser","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EscrowRefunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rightsFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"platformFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"executionWindowSeconds","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usagePeriodSeconds","type":"uint256"}],"name":"TermsConfigured","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rightsHolder","type":"address"}],"name":"UseApproved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rightsHolder","type":"address"}],"name":"UseRejected","type":"event"},{"inputs":[],"name":"EXECUTION_WINDOW","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PLATFORM_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"RIGHTS_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOTAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USAGE_PERIOD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"actualVideoHash","type":"bytes32"}],"name":"activateAd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"advertiser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approveUse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cad","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"escrowBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"executionDeadline","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"actualVideoHash","type":"bytes32"}],"name":"isPublishable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"platform","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"finalVideoHash","type":"bytes32"}],"name":"registerAd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rejectUse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rightsHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"status","outputs":[{"internalType":"enum ConsentAdEscrow.Status","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usageEnd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"videoHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}],"bytecode":"0x6101a060405234801561001157600080fd5b506040516116e53803806116e58339810160408190526100309161044a565b6000876001600160a01b03163b1161008f5760405162461bcd60e51b815260206004820152601660248201527f496e76616c696420746f6b656e20636f6e74726163740000000000000000000060448201526064015b60405180910390fd5b6001600160a01b0386166100e55760405162461bcd60e51b815260206004820152601560248201527f496e76616c69642072696768747320686f6c64657200000000000000000000006044820152606401610086565b6001600160a01b03851661012e5760405162461bcd60e51b815260206004820152601060248201526f496e76616c696420706c6174666f726d60801b6044820152606401610086565b846001600160a01b0316866001600160a01b03160361018f5760405162461bcd60e51b815260206004820152601860248201527f446966666572656e7420726f6c657320726571756972656400000000000000006044820152606401610086565b336001600160a01b038716036101e75760405162461bcd60e51b815260206004820152601960248201527f416476657274697365722063616e6e6f7420617070726f7665000000000000006044820152606401610086565b336001600160a01b0386160361023f5760405162461bcd60e51b815260206004820152601a60248201527f416476657274697365722063616e6e6f742061637469766174650000000000006044820152606401610086565b600061024b84866104b6565b116102985760405162461bcd60e51b815260206004820152601a60248201527f546f74616c20666565206d75737420626520706f7369746976650000000000006044820152606401610086565b600082116102e85760405162461bcd60e51b815260206004820152601860248201527f496e76616c696420657865637574696f6e2077696e646f7700000000000000006044820152606401610086565b600081116103385760405162461bcd60e51b815260206004820152601460248201527f496e76616c696420757361676520706572696f640000000000000000000000006044820152606401610086565b6001600160401b03821180159061035657506001600160401b038111155b6103975760405162461bcd60e51b81526020600482015260126024820152714475726174696f6e20746f6f206c6172676560701b6044820152606401610086565b6001600160a01b038088166080523360a05286811660c052851660e0526101008490526101208390526103ca83856104b6565b610140526101608290526101808190526040805185815260208101859052908101839052606081018290527f153b947e17cc34c2fda1d28ed9d7334e63bf327400cf222d1ffa77fa895b28dc9060800160405180910390a1505050505050506104dd565b80516001600160a01b038116811461044557600080fd5b919050565b600080600080600080600060e0888a03121561046557600080fd5b61046e8861042e565b965061047c6020890161042e565b955061048a6040890161042e565b606089015160808a015160a08b015160c0909b0151999c989b5091999098919790965090945092505050565b808201808211156104d757634e487b7160e01b600052601160045260246000fd5b92915050565b60805160a05160c05160e05161010051610120516101405161016051610180516110db61060a600039600081816102f2015261084201526000818161020c015261057e01526000818161027d01528181610b7a01528181610beb01528181610d7f0152610df00152600081816101e501528181610906015261097a0152600081816102a40152818161086c01526108e00152600081816102330152818161071501526109590152600081816102cb01528181610379015281816105f901526108bf0152600081816101410152818161049d015281816109df01528181610b5901528181610ba001528181610c6b01528181610d5d0152610da501526000818161034c0152818161089d0152818161093701528181610b2f01528181610d330152610e3601526110db6000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c8063550dda62116100b857806381e20e6e1161007c57806381e20e6e146102c6578063b6cbec26146102ed578063c7eb4a6814610314578063d0e30db014610337578063e11e1b0c1461033f578063e427eeda1461034757600080fd5b8063550dda6214610255578063585cd2891461025d578063590e1ae31461027057806363db7eae14610278578063813515951461029f57600080fd5b806326e9e840116100ff57806326e9e840146101c457806333ee5f35146101d757806334fbc9a1146101e05780633e65164a146102075780634bde38c81461022e57600080fd5b806302e9a93b1461013c57806309e4254f14610180578063200d2ed2146101975780632054ff6f146101b157806323835e8f146101bb575b600080fd5b6101637f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b61018960035481565b604051908152602001610177565b6000546101a49060ff1681565b6040516101779190610fd8565b6101b961036e565b005b61018960015481565b6101b96101d2366004611000565b610492565b61018960025481565b6101897f000000000000000000000000000000000000000000000000000000000000000081565b6101897f000000000000000000000000000000000000000000000000000000000000000081565b6101637f000000000000000000000000000000000000000000000000000000000000000081565b6101b96105ee565b6101b961026b366004611000565b61070a565b6101b96109d4565b6101897f000000000000000000000000000000000000000000000000000000000000000081565b6101897f000000000000000000000000000000000000000000000000000000000000000081565b6101637f000000000000000000000000000000000000000000000000000000000000000081565b6101897f000000000000000000000000000000000000000000000000000000000000000081565b610327610322366004611000565b610c23565b6040519015158152602001610177565b6101b9610c60565b610189610e1e565b6101637f000000000000000000000000000000000000000000000000000000000000000081565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103e05760405162461bcd60e51b815260206004820152601260248201527127b7363c903934b3b43a39903437b63232b960711b60448201526064015b60405180910390fd5b600260005460ff1660068111156103f9576103f9610fc2565b148061041b5750600360005460ff16600681111561041957610419610fc2565b145b61045b5760405162461bcd60e51b815260206004820152601160248201527043616e6e6f742072656a656374206e6f7760781b60448201526064016103d7565b6000805460ff1916600517815560405133917fbc271ad7f0813294807638a188ab47ca5676133a24c788a7781055583329a75991a2565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146104da5760405162461bcd60e51b81526004016103d790611019565b6000805460ff1660068111156104f2576104f2610fc2565b146105345760405162461bcd60e51b8152602060048201526012602482015271105b1c9958591e481c9959da5cdd195c995960721b60448201526064016103d7565b806105745760405162461bcd60e51b815260206004820152601060248201526f08adae0e8f240ecd2c8cade40d0c2e6d60831b60448201526064016103d7565b60018190556105a37f000000000000000000000000000000000000000000000000000000000000000042611042565b60028190556000805460ff1916600117905560405190815281907f1b66e1a68674886e1d6165260b9be8a1c055b49a21c7666f416c2534a4b760dc906020015b60405180910390a250565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461065b5760405162461bcd60e51b815260206004820152601260248201527127b7363c903934b3b43a39903437b63232b960711b60448201526064016103d7565b600260005460ff16600681111561067457610674610fc2565b146106b15760405162461bcd60e51b815260206004820152600d60248201526c11195c1bdcda5d08199a5c9cdd609a1b60448201526064016103d7565b6002544211156106d35760405162461bcd60e51b81526004016103d790611063565b6000805460ff1916600317815560405133917f29717ff5550ef778a4cf435c5dcb77300f3d4b1dedbcdef1b2aaa067f35e50d691a2565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107725760405162461bcd60e51b815260206004820152600d60248201526c4f6e6c7920706c6174666f726d60981b60448201526064016103d7565b600360005460ff16600681111561078b5761078b610fc2565b146107c75760405162461bcd60e51b815260206004820152600c60248201526b139bdd08185c1c1c9bdd995960a21b60448201526064016103d7565b6002544211156107e95760405162461bcd60e51b81526004016103d790611063565b60015481146108305760405162461bcd60e51b81526020600482015260136024820152720acd2c8cade40d0c2e6d040dad2e6dac2e8c6d606b1b60448201526064016103d7565b6000805460ff191660041790556108677f000000000000000000000000000000000000000000000000000000000000000042611042565b6003557f000000000000000000000000000000000000000000000000000000000000000015610904576109046001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000167f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000610eae565b7f00000000000000000000000000000000000000000000000000000000000000001561099e5761099e6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000167f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000610eae565b6001547f94155db184c3f63bc954853c43f3fbca02ad2df7e60d28e20302f3bfe2861d696003546040516105e391815260200190565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610a1c5760405162461bcd60e51b81526004016103d790611019565b600260005460ff166006811115610a3557610a35610fc2565b1480610a575750600360005460ff166006811115610a5557610a55610fc2565b145b80610a785750600560005460ff166006811115610a7657610a76610fc2565b145b610abb5760405162461bcd60e51b81526020600482015260146024820152734e6f20726566756e6461626c6520657363726f7760601b60448201526064016103d7565b600560005460ff166006811115610ad457610ad4610fc2565b1480610ae1575060025442115b610b1d5760405162461bcd60e51b815260206004820152600d60248201526c5374696c6c2070656e64696e6760981b60448201526064016103d7565b6000805460ff19166006179055610b9e7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03167f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000610eae565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03167f894ce7cc354d2a39de53f8dab6b0ad8c5ac65641e68aa2154fdb88bcc387e3dd7f0000000000000000000000000000000000000000000000000000000000000000604051610c1991815260200190565b60405180910390a2565b6000600460005460ff166006811115610c3e57610c3e610fc2565b148015610c4d57506003544211155b8015610c5a575060015482145b92915050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ca85760405162461bcd60e51b81526004016103d790611019565b600160005460ff166006811115610cc157610cc1610fc2565b14610cff5760405162461bcd60e51b815260206004820152600e60248201526d149959da5cdd195c88199a5c9cdd60921b60448201526064016103d7565b600254421115610d215760405162461bcd60e51b81526004016103d790611063565b6000805460ff19166002179055610da37f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03167f0000000000000000000000000000000000000000000000000000000000000000307f0000000000000000000000000000000000000000000000000000000000000000610f12565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03167f511c3b325f63024e6754176648b89f4bab878b1712366d9bf3729c501dcbad797f0000000000000000000000000000000000000000000000000000000000000000604051610c1991815260200190565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610e85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea9919061108c565b905090565b6040516001600160a01b03838116602483015260448201839052610f0d91859182169063a9059cbb906064015b604051602081830303815290604052915060e01b6020820180516001600160e01b038381831617835250505050610f51565b505050565b6040516001600160a01b038481166024830152838116604483015260648201839052610f4b9186918216906323b872dd90608401610edb565b50505050565b600080602060008451602086016000885af180610f74576040513d6000823e3d81fd5b50506000513d91508115610f8c578060011415610f99565b6001600160a01b0384163b155b15610f4b57604051635274afe760e01b81526001600160a01b03851660048201526024016103d7565b634e487b7160e01b600052602160045260246000fd5b6020810160078310610ffa57634e487b7160e01b600052602160045260246000fd5b91905290565b60006020828403121561101257600080fd5b5035919050565b6020808252600f908201526e27b7363c9030b23b32b93a34b9b2b960891b604082015260600190565b80820180821115610c5a57634e487b7160e01b600052601160045260246000fd5b6020808252600f908201526e111958591b1a5b99481c185cdcd959608a1b604082015260600190565b60006020828403121561109e57600080fd5b505191905056fea2646970667358221220022c550d905c0fe91039a0302132a1cb19fd3a7006566b0ce62582b9d4a5a27364736f6c634300081e0033"}}', type: "application/json" }, "/index.html": { body: `<!doctype html><html lang="ko"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><meta name="theme-color" content="#123c32"/><title>ConsentAd \xB7 \uB3D9\uC758\uB85C \uC2DC\uC791\uD558\uB294 \uAD11\uACE0</title><meta name="description" content="\uAD11\uACE0 \uB4F1\uB85D\uBD80\uD130 \uAD8C\uB9AC\uC790 \uC2B9\uC778, \uD50C\uB7AB\uD3FC \uC9D1\uD589\uACFC \uC815\uC0B0\uAE4C\uC9C0. Bifrost\uC5D0\uC11C \uD655\uC778\uD558\uB294 \uD22C\uBA85\uD55C \uAD11\uACE0 \uC9C4\uD589 \uD604\uD669."/><link rel="stylesheet" href="/main.css"/></head><body><div id="root"></div><script type="module" src="/main.js"><\/script></body></html>
`, type: "text/html; charset=utf-8" }, "/main.css": { body: `:root{font-family:DM Sans,Noto Sans KR,-apple-system,BlinkMacSystemFont,sans-serif;color:#302830;background:var(--surface);font-synthesis:none;--green:var(--accent);--muted:#766d72;--line:var(--line);--lime:#f4ecc2}*{box-sizing:border-box}body{margin:0}button,input,select,textarea{font:inherit}button,a,input,label{-webkit-tap-highlight-color:transparent}button{cursor:pointer}button{color:inherit}button:disabled{cursor:not-allowed;opacity:.42}a{color:inherit;text-decoration:none}button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid #91b65b;outline-offset:3px}button{border:0;background:none}input,textarea,select{min-width:0}button svg{flex-shrink:0}.network-strip{height:33px;background:var(--deep);color:#e4e9dd;font-size:10px;letter-spacing:.55px;display:flex;align-items:center;padding:0 5.2%;gap:8px}.dot,.live-dot{display:inline-block;width:6px;height:6px;background:#b9d779;border-radius:50%;flex-shrink:0}.strip-divider{opacity:.3;margin:0 4px}.strip-right{margin-left:auto;font-size:9px;letter-spacing:1.8px;opacity:.65}header{height:91px;border-bottom:1px solid var(--line);display:flex;align-items:center;padding:0 5.2%;gap:48px;background:var(--surface)}.brand{font-size:27px;letter-spacing:-1.8px;font-weight:800;display:flex;align-items:center;color:var(--deep)}.brand>span:not(.brand-mark){font-weight:500}.brand-mark{height:35px;width:35px;display:grid;place-items:center;background:var(--deep);color:#f4ecc2;border-radius:11px;margin-right:8px;transform:rotate(-7deg)}.brand small{font-size:12px;color:#7b8a70;margin-left:4px;letter-spacing:0}nav{display:flex;align-self:stretch;gap:26px}nav>button{font-size:13px;font-weight:600;position:relative;padding:0 3px;color:#899087}nav>.nav-active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--accent)}.nav-count{font-size:9px;padding:2px 5px;background:var(--tint);margin-left:6px;border-radius:4px}.header-actions{margin-left:auto;display:flex;align-items:center;gap:14px}.icon-button{width:35px;height:35px;display:inline-grid;place-items:center;border-radius:8px}.icon-button:hover{background:#edf0e7}.wallet-button{border:1px solid #c7d0bf;border-radius:7px;padding:11px 16px;display:flex;gap:8px;align-items:center;font-size:12px;font-weight:700}.wallet-dot{width:6px;height:6px;background:#67a268;border-radius:50%}main{max-width:1280px;margin:auto;padding:0 40px}.hero{display:grid;grid-template-columns:1.2fr 1fr;min-height:405px;align-items:center;position:relative;padding:42px 0 36px}.eyebrow{font-size:10px;font-weight:700;letter-spacing:1.6px;color:var(--accent);display:flex;align-items:center;gap:8px}.eyebrow>span{height:5px;width:5px;border-radius:50%;background:var(--accent)}h1{font-size:46px;line-height:1.36;letter-spacing:-2px;margin:20px 0 17px;font-weight:700}h1+p{font-size:13px;line-height:1.9;color:#7a827b;max-width:390px;word-break:keep-all}.hero-actions{display:flex;gap:25px;align-items:center;margin-top:25px}.primary,.secondary,.white-button{display:inline-flex;gap:9px;justify-content:center;align-items:center;padding:12px 18px;border-radius:7px;font-size:12px;font-weight:600;min-height:43px}.primary{background:var(--green);color:#fff}.secondary{background:#fff;border:1px solid #dce1d5}.secondary:hover:not(:disabled){background:#f1f4e9}.text-button{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:500;padding:10px 0}.hero-art{height:330px;position:relative;display:flex;align-items:center;justify-content:center;isolation:isolate}.orbit{position:absolute;width:285px;height:285px;border:1px solid #e6e9da;border-radius:50%;z-index:-1}.orbit-two{width:370px;height:370px}.art-card{position:absolute;width:218px;height:264px;border-radius:13px;box-shadow:0 14px 35px #21463312}.art-back{background:#e7eacd;transform:rotate(-15deg) translate(-32px,-3px);border:1px solid #d8dfba;padding:22px}.art-line{height:8px;border-radius:10px;background:#d2dab3;width:110px;margin-bottom:10px}.art-line.short{width:60px}.art-front{background:linear-gradient(135deg,#f2f6d9,#e3ecb5);border:1px solid #dce5b2;transform:rotate(9deg) translate(16px,5px);padding:18px}.art-card-top{display:flex;align-items:center;justify-content:space-between;font-size:7px;font-weight:700;letter-spacing:1px}.art-card-top svg{color:#5c7941}.art-card-bottom{display:flex;align-items:center;justify-content:space-between;font-size:20px;letter-spacing:-1px;font-weight:600;position:absolute;bottom:20px;left:18px;right:18px}.sculpture{width:135px;height:153px;margin:9px auto;position:relative;filter:drop-shadow(6px 10px 8px #4360301c)}.sculpture>div{position:absolute;border-radius:50%;height:106px;width:80px;transform:rotate(-32deg);background:linear-gradient(110deg,#cee193,#91ae5b 72%,#75984e);box-shadow:inset 5px 0 6px #ffffff50}.sculpture>div:first-child{top:32px;left:4px}.sculpture>div:nth-child(2){top:10px;left:45px;background:linear-gradient(110deg,#c4db87,#769748 75%);transform:rotate(35deg)}.sculpture>div:nth-child(3){top:69px;left:58px;height:69px;width:55px;background:linear-gradient(110deg,#e1ecb5,#95b460)}.floating-label{position:absolute;display:flex;align-items:center;gap:9px;background:#fff;padding:13px 15px;border-radius:8px;box-shadow:0 5px 25px #1a3c3210;font-size:10px;z-index:3;border:1px solid #ecede6}.fl-top{top:24px;left:12px;transform:rotate(-5deg)}.fl-top svg{color:#78904b}.fl-top i{width:6px;height:6px;background:#b3ca76;border-radius:50%;margin-left:15px}.fl-bottom{bottom:16px;right:0;transform:rotate(-3deg)}.circle-check{background:#f0f3e5;color:#648144;display:grid;place-items:center;width:22px;height:22px;border-radius:50%}.art-star{position:absolute;right:36px;top:34px;font-size:52px;color:#718657;transform:rotate(12deg)}.overview{display:grid;grid-template-columns:1fr 1.1fr 1fr 1.6fr;border:1px solid #e5e7db;border-radius:11px;background:var(--tint);padding:23px 8px;gap:0}.overview>div{display:flex;gap:14px;align-items:center;justify-content:center;border-right:1px solid #e1e5d7}.overview>div:last-child{border:0}.overview-icon{color:#798772;background:var(--tint);display:grid;place-items:center;width:41px;height:41px;border-radius:12px}.overview p{margin:0 0 4px;color:#889080;font-size:11px}.overview strong{font-size:25px;line-height:1.1;font-weight:600;letter-spacing:-.7px}.overview strong small{font-size:11px;color:#7c8875;margin-left:7px;font-weight:400}.overview-message{color:#839568}.overview-message p{font-size:11px;line-height:1.7;margin:0}.overview-message b{color:#4a6247;font-weight:500}.campaigns{padding-top:58px;scroll-margin-top:30px}.section-heading{display:flex;justify-content:space-between;align-items:center}.section-heading h2{font-size:27px;letter-spacing:-1px;margin:9px 0 10px}.section-heading h2>span{margin-left:10px;font-size:16px;color:#91a17d;font-weight:500;vertical-align:middle}.section-heading p{font-size:12px;color:#91958d;margin:0}.section-heading .eyebrow{font-size:9px;color:#9a9f90}.section-actions{display:flex;gap:13px;align-items:center}.section-actions .secondary{font-size:11px;min-height:36px;padding:9px 13px}.filter-bar{display:flex;justify-content:space-between;gap:16px;border-bottom:1px solid var(--line);padding:27px 0 19px;align-items:center}.filters{display:flex;gap:5px;flex-wrap:wrap}.filters button{font-size:11px;color:#898e82;padding:9px 13px;white-space:nowrap}.filters button.selected{border-radius:6px;background:var(--tint);color:var(--accent);font-weight:700}.filters button:hover{background:#f0f2e9;border-radius:6px}.search{display:flex;align-items:center;gap:8px;color:#98a08f;border:1px solid #e1e5d9;background:#fff;padding:10px 12px;border-radius:6px;min-width:210px}.search input{background:none;border:0;outline:none;font-size:10px;width:150px;color:#344d3c}.search input::placeholder{color:#a9afa0}.result-line{display:flex;justify-content:space-between;font-size:10px;color:#8d9588;padding:19px 0}.result-line>b,.result-line b{color:#57704e;margin-left:3px}.result-line>div{display:flex;align-items:center;gap:6px;font-size:9px}.result-line .live-dot{width:4px;height:4px;background:#90ab69}.sort{margin-left:17px}.ad-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:25px 22px}.ad-card{padding:0;text-align:left;border:1px solid #e3e6dc;border-radius:12px;background:#fff;overflow:hidden;transition:transform .22s,box-shadow .22s;display:block;min-width:0}.ad-card:hover{transform:translateY(-5px);box-shadow:0 13px 30px #2543310d}.ad-visual{height:218px;position:relative;overflow:hidden;background:#e4e9c9}.ad-visual>img{width:100%;height:100%;object-fit:cover}.lime{background:#e8edcd}.peach{background:#f1e4d5}.blue{background:#dce6e9}.pink{background:#ede1e3}.sand{background:#e8e4da}.purple{background:#e5e1ef}.concept-art{position:absolute;inset:0;overflow:hidden}.softened{filter:blur(4px)}.shape-one{height:135px;width:85px;border-radius:40px;background:linear-gradient(125deg,#bdca9c,#7f9660);position:absolute;top:44px;left:calc(50% - 58px);transform:rotate(-22deg);box-shadow:10px 13px 14px #51663622}.shape-two{height:125px;width:85px;border-radius:40px;background:linear-gradient(125deg,#e2e9c6,#8d9d69);position:absolute;top:45px;left:calc(50% - 8px);transform:rotate(24deg);box-shadow:10px 13px 14px #51663622}.shape-three{width:160px;height:32px;background:#40592917;border-radius:50%;position:absolute;top:173px;left:calc(50% - 80px);filter:blur(9px)}.concept-art>span{position:absolute;top:102px;text-align:center;width:100%;font-size:17px;font-weight:700;letter-spacing:3px;color:#ffffffb0}.peach .shape-one{background:linear-gradient(125deg,#f7d9b3,#d19b6d);border-radius:15px;transform:rotate(-15deg);width:72px;height:131px}.peach .shape-two{background:linear-gradient(125deg,#f8ebcc,#cea67b);border-radius:50%;width:92px;height:92px;top:83px}.blue .shape-one{background:linear-gradient(125deg,#9eb7c0,#5b7886);width:143px;height:92px;top:88px;border-radius:55% 55% 26% 26%;transform:rotate(-8deg)}.blue .shape-two{background:linear-gradient(125deg,#e0e7e9,#92a9b3);width:110px;height:49px;top:68px;transform:rotate(-8deg);border-radius:55% 55% 26% 26%}.pink .shape-one{background:linear-gradient(125deg,#e7c8c1,#b77e89);width:68px;height:125px;border-radius:13px}.pink .shape-two{background:linear-gradient(125deg,#f4e6df,#bfa3ac);width:68px;height:115px;border-radius:13px}.sand .shape-one{background:linear-gradient(125deg,#dfd8b6,#a99d78)}.purple .shape-one{background:linear-gradient(125deg,#cfc4e3,#9a89b4)}.purple .shape-two{background:linear-gradient(125deg,#e9e2ef,#b3a2c9)}.visual-top{position:absolute;left:14px;right:14px;top:14px;display:flex;align-items:center;justify-content:space-between}.badge{font-size:10px;font-weight:600;padding:6px 9px;border-radius:5px;background:#fffef3;color:#747b5b;display:inline-flex;align-items:center;gap:5px}.s2{background:#f8f2e5;color:#92773b}.s3{background:#ebf0dd;color:#5b7243}.s4{background:#e8f0e8;color:#36664c}.s5{background:#f7eae6;color:#a16e61}.s6{background:#efeeeb;color:#8a867d}.visual-bottom{position:absolute;bottom:13px;left:14px;display:flex;gap:5px;align-items:center;font-size:9px;color:#5c6756;background:#ffffff90;padding:5px 7px;border-radius:4px;backdrop-filter:blur(10px)}.demo-chip{font-size:9px;background:#fff9;padding:4px 6px;border-radius:3px;color:#6b745f}.approved-stamp{position:absolute;top:78px;left:0;right:0;display:flex;align-items:center;flex-direction:column;gap:7px;font-size:11px;font-weight:600;color:#46603c}.card-body{padding:20px 20px 0}.card-category{display:flex;justify-content:space-between;font-size:9px;color:#7b8c69;font-weight:500}.card-category>span{font-size:9px;font-weight:400;color:#b3b6ad}.card-body h3{font-size:17px;font-weight:600;letter-spacing:-.6px;margin:9px 0 20px;line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.card-facts{display:grid;grid-template-columns:1fr 1fr;margin-bottom:17px}.card-facts>div{display:flex;flex-direction:column;gap:6px}.card-facts>div+div{border-left:1px solid #eef0e7;padding-left:20px}.card-facts span{font-size:9px;color:#9a9f94}.card-facts strong{font-size:15px;font-weight:600;letter-spacing:-.3px}.card-facts strong small{font-size:10px;font-weight:500;color:#7c8974;margin-left:2px}.card-facts>div:nth-child(2) strong{font-size:11px;padding-top:4px}.progress-track{height:4px;border-radius:4px;background:#eef0e7;overflow:hidden}.progress-track>div{height:100%;background:var(--accent);border-radius:4px}.progress-track>div.closed{background:#c3c0b5}.progress-labels{display:flex;justify-content:space-between;font-size:8px;color:#adb2a5;margin:9px 0 18px}.progress-labels>span{display:flex;align-items:center;gap:2px}.progress-labels .complete{color:#7e8d68}.card-footer{border-top:1px solid #eef0e7;display:flex;align-items:center;justify-content:space-between;padding:12px 0;font-size:9px;color:#9a9f92}.card-footer>span{display:flex;align-items:center;gap:6px}.card-footer>span:last-child{color:#687c58}.mini-avatar{width:20px;height:20px;display:grid;place-items:center;background:#edf0e5;border-radius:50%;color:#81906c;font-size:8px}.trust-note{margin:44px 0 65px;border-top:1px solid var(--line);padding-top:24px;display:flex;justify-content:space-between;align-items:center;gap:20px}.trust-note>div{display:flex;gap:13px;align-items:center;color:#899778}.trust-note strong{font-size:11px;color:#596c4a;font-weight:500}.trust-note p{font-size:10px;color:#959e8b;line-height:1.7;margin:5px 0 0}.trust-note>button{display:flex;gap:9px;align-items:center;font-size:10px;white-space:nowrap}footer{border-top:1px solid var(--line);display:flex;align-items:center;padding:29px 5.2%;gap:27px;background:var(--tint)}footer .brand{font-size:22px}footer p{font-size:10px;color:#9ba18f}footer>span{margin-left:auto;font-size:9px;color:#9ca28f}footer>button{font-size:10px;color:#6c795d}.empty{border:1px dashed #d8dfcc;border-radius:12px;background:var(--surface);min-height:260px;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:35px;text-align:center}.empty-icon{height:58px;width:58px;background:var(--tint);display:grid;place-items:center;color:#8b9d69;border-radius:16px}.empty h3{font-size:19px;letter-spacing:-.5px;margin:17px 0 8px}.empty p{font-size:12px;color:#8f9884;line-height:1.7}.empty>div:last-child{display:flex;gap:10px;margin-top:14px}.alert{border:1px solid #e2e6d8;background:#f4f6e9;border-radius:8px;padding:14px 16px;font-size:12px;line-height:1.8;display:flex;align-items:center;gap:10px;margin-top:20px;flex-wrap:wrap}.alert button{margin-left:auto;font-size:11px;text-decoration:underline}.warning{background:#fff6e7;border-color:#f0e1c5;color:#8a682f}.demo-alert{background:#edf3e5;border-color:#d9e4cb;color:#66804d}.demo-alert button{display:flex;align-items:center;gap:7px}.scope-tabs{display:flex;align-items:center;gap:5px;margin-top:25px;border:1px solid var(--line);padding:5px;border-radius:8px;width:fit-content}.scope-tabs button{padding:8px 12px;font-size:11px;color:#88937b}.scope-tabs .chosen{background:var(--tint);border-radius:5px;color:var(--accent)}.scope-tabs>span{font-size:10px;color:#959e8c;margin:0 10px}.overlay{position:fixed;inset:0;z-index:30;background:#142a24a6;backdrop-filter:blur(6px);display:flex;align-items:flex-start;justify-content:center;padding:5vh 22px;overflow-y:auto}.modal{width:540px;max-width:100%;background:var(--surface);border:1px solid #e3e7d9;border-radius:18px;padding:27px;box-shadow:0 30px 100px #06251b30}.modal.wide{width:900px}.modal-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:17px}.modal-head h2{font-size:22px;letter-spacing:-.7px;margin:0}.modal-intro{font-size:12px;color:#7c8871;line-height:1.9;margin:0 0 22px;word-break:keep-all}.field{display:flex;flex-direction:column;gap:8px;font-size:11px;font-weight:600;margin:17px 0}.field input,.field select,.field textarea{border:1px solid #dce2d2;border-radius:6px;background:#fff;padding:12px;font-size:12px;color:#304a36;width:100%;font-weight:400}.field input::placeholder,.field textarea::placeholder{color:#adb6a4;font-size:11px}.field textarea{min-height:92px;resize:vertical}.network-field{background:#edf2e2;padding:12px;display:flex;gap:9px;align-items:center;border-radius:6px;font-weight:400}.network-field b{margin-left:auto}.full{width:100%;margin-top:10px}.fine{font-size:10px;color:#8c9781;line-height:1.85;word-break:keep-all}.divider-label{display:flex;align-items:center;gap:10px;font-size:10px;color:#9aa28e;margin:23px 0 8px}.divider-label:after,.divider-label:before{content:"";height:1px;background:#e3e7d8;flex:1}.form-columns{display:grid;grid-template-columns:1fr 1fr;gap:28px}.upload-zone{min-height:190px;border:1px dashed #c9d5b8;background:#f2f6e7;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;border-radius:10px;color:#809367;padding:20px;cursor:pointer;margin-top:17px}.upload-zone strong{font-size:13px;text-align:center;word-break:break-word}.upload-zone span{font-size:10px}.upload-zone input,.file-compare input{display:none}.thumb-preview{width:100%;height:130px;object-fit:cover;border-radius:8px;margin-top:12px}.hash-box{padding:12px;background:#f0f3e7;border-radius:6px;font-size:10px;color:#879575;line-height:1.7;margin-top:12px}.hash-box span{display:block;font-weight:700;margin-bottom:6px}.hash-box code{word-break:break-all;font-size:10px}.terms{display:flex;flex-direction:column;gap:8px;border:1px solid var(--line);padding:16px;border-radius:8px;margin-top:20px;font-size:10px;color:#859276}.terms b{color:var(--accent);font-size:12px;margin-bottom:4px}.modal-actions{display:flex;justify-content:flex-end;gap:10px;padding-top:22px;margin-top:14px;border-top:1px solid var(--line)}.form-step{font-size:12px;color:#788d54;padding-top:15px}.detail-top{display:flex;align-items:center;gap:10px;font-size:11px;color:#8b967e;margin-bottom:19px}.detail-role{margin-left:auto;font-size:10px}.detail-columns{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:25px}.video-frame{height:260px;position:relative;background:#e5ead3;border-radius:10px;overflow:hidden}.video-frame img,.video-frame video{height:100%;width:100%;object-fit:contain}.video-frame img{object-fit:cover}.detail-art{height:100%;position:relative;overflow:hidden;display:grid;place-items:center}.detail-art .shape-one,.detail-art .shape-two{filter:blur(7px);opacity:.5}.detail-art svg{position:relative;color:#71845a}.video-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#15342723;padding:25px;color:#314d33}.video-overlay>span{font-size:15px;font-weight:600}.video-overlay>p{font-size:10px;line-height:1.8;margin:12px 0 16px}.white-button{background:#ffffffe3;min-height:37px;font-size:11px;padding:9px 14px;color:#375b39}.verified{display:flex;align-items:center;gap:6px;font-size:10px;color:#678748;background:#f0f5e4;padding:10px;border-radius:6px;margin-top:10px}.detail-description{font-size:12px;color:#8a947e;line-height:1.85;margin:20px 0;white-space:pre-wrap;word-break:break-word}.subheading{font-size:13px;margin:24px 0 18px}.timeline>div{display:flex;gap:13px;align-items:flex-start;position:relative;min-height:65px}.timeline>div:not(:last-child):before{content:"";width:1px;height:46px;background:#e1e6d7;position:absolute;top:26px;left:13px}.timeline>div>span{height:27px;width:27px;border:1px solid #e1e6d7;border-radius:50%;display:grid;place-items:center;font-size:10px;color:#a7b199;background:#f5f7ef;z-index:1}.timeline .done>span{background:#eaf1d8;color:#6c8947;border-color:#d6e0c2}.timeline strong{font-size:11px;font-weight:500;display:block;margin:3px 0 5px;color:#9aa48e}.timeline .done strong{color:#4f6940}.timeline small{font-size:10px;color:#a5ad9a}.detail-summary{border:1px solid #e0e6d4;border-radius:10px;padding:19px;background:var(--tint)}.detail-summary h3{font-size:13px;margin:0 0 19px}.detail-summary>div{display:flex;justify-content:space-between;gap:12px;align-items:center;font-size:10px;margin-top:13px;color:#879574}.detail-summary strong{font-size:22px;color:#345b35;font-weight:600}.detail-summary b{font-size:11px;font-weight:500;color:#566e43}.detail-summary hr{border:0;border-top:1px solid #e0e5d4;margin:18px 0}.role-addresses{margin:16px 0;border:1px solid var(--line);border-radius:9px;padding:10px 15px}.role-addresses>div{display:flex;align-items:center;gap:8px;font-size:10px}.role-addresses>div>span{color:#8b987c;margin-right:auto}.role-addresses code{color:#738464}.role-addresses .icon-button{height:28px;width:25px}.role-addresses svg{width:12px}.action-panel{border-top:1px solid var(--line);padding-top:20px;margin-top:23px}.action-panel .eyebrow{font-size:8px}.action-panel h3{font-size:15px;margin:9px 0}.action-panel>p{font-size:11px;color:#8b977e;line-height:1.8}.danger-outline{border:1px solid #e6d8cd;color:#a2826c;background:#fcf8f3;font-size:11px;border-radius:6px;padding:11px}.file-compare{display:flex;align-items:center;justify-content:center;gap:8px;font-size:11px;padding:12px;border:1px dashed #ccd8ba;border-radius:7px;color:#7a905f;margin-top:12px;cursor:pointer}.public-notice{display:flex;flex-direction:column;align-items:flex-start;background:#f0f4e6;padding:20px;border-radius:8px;color:#91a175;margin-top:20px;gap:10px}.public-notice strong{font-size:12px;color:#667d50}.public-notice p{font-size:10px;line-height:1.8;margin:0}.technical{border-top:1px solid var(--line);padding-top:20px;margin-top:24px;font-size:10px;color:#8b977c}.technical summary{cursor:pointer;font-size:11px;color:#627b49}.technical code{display:block;word-break:break-all;font-size:10px;margin-top:6px;color:#587144}.technical p{line-height:1.7}.check-good{color:#5c863e!important;font-size:10px!important}.check-bad{color:#ad6657!important;font-size:10px!important}.event-list{font-size:10px;background:#f0f3e8;border-radius:7px;padding:12px;line-height:1.8}.event-list>div{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:8px 0}.event-list strong{font-size:9px}.event-list span{color:#97a187}.event-list small{font-size:9px;color:#a2aa94}.guide-list>div{display:flex;gap:16px;margin:24px 0}.guide-list>div>span{font-size:16px;color:#91a76c}.guide-list h3{font-size:14px;margin:0 0 9px}.guide-list p{font-size:11px;color:#8b977b;line-height:1.8;margin:0}.busy{position:fixed;bottom:24px;left:50%;transform:translate(-50%);z-index:60;background:#193e32;color:#fff;padding:15px 20px;border-radius:10px;box-shadow:0 8px 30px #18382a25;display:flex;align-items:center;gap:10px;font-size:12px;max-width:90vw;flex-wrap:wrap}.busy small{width:100%;text-align:center;font-size:9px;color:#b9c9ad}.toast{position:fixed;top:20px;left:50%;transform:translate(-50%);z-index:70;display:flex;align-items:center;gap:10px;max-width:90vw;width:max-content;background:#fff;border:1px solid #dfe6d5;box-shadow:0 10px 30px #1d40291a;border-radius:10px;padding:15px 17px;font-size:12px;color:#577945}.toast.error{border-color:#ebd2c5;color:#a3654a}.toast button{display:grid;place-items:center}.spin{animation:spin 1.3s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.tx-tray{position:fixed;bottom:15px;right:15px;z-index:20;border:1px solid #dce4d2;background:#fff;border-radius:8px;font-size:10px;padding:12px;max-width:330px;box-shadow:0 6px 24px #214a3015}.tx-tray summary{cursor:pointer}.tx-tray summary span{margin-left:8px;color:#97a07c}.tx-tray>div{display:flex;gap:10px;padding-top:10px;align-items:center}.tx-tray code{color:#90a17c}.tx-tray button{padding:0}@media(min-width:1500px){header,.network-strip{padding-left:calc((100vw - 1200px)/2);padding-right:calc((100vw - 1200px)/2)}}@media(max-width:1100px){header{gap:22px;padding:0 4%}nav{gap:15px}main{padding:0 30px}.hero{grid-template-columns:1.1fr 1fr}h1{font-size:39px}.hero-art{transform:scale(.88)}.filters button{padding:8px 9px;font-size:10px}.filter-bar{align-items:flex-start;flex-direction:column}.search{align-self:flex-end}.card-body{padding:17px 16px 0}.card-body h3{font-size:15px}.ad-grid{gap:20px 16px}.card-facts>div+div{padding-left:12px}.ad-visual{height:195px}}@media(max-width:760px){.network-strip{font-size:8px;padding:0 20px}.strip-right{display:none}header{height:auto;min-height:80px;flex-wrap:wrap;gap:0;padding:18px 20px 0}.brand{font-size:25px}.brand-mark{height:31px;width:31px}.header-actions{gap:6px}.wallet-button{padding:9px 11px;font-size:10px}.header-actions .icon-button{width:29px}nav{order:3;width:100%;justify-content:space-between;height:49px;margin-top:10px;gap:10px}nav>button{font-size:12px}.nav-count{font-size:8px}main{padding:0 20px}.hero{grid-template-columns:1fr;min-height:auto;padding:35px 0 25px}.hero-copy{position:relative;z-index:2}.hero .eyebrow{font-size:8px}h1{font-size:35px;letter-spacing:-1.6px;margin:16px 0 13px}h1+p{font-size:12px;max-width:310px}.hero-actions{margin-top:20px;gap:20px}.hero-art{position:absolute;right:-40px;top:22px;width:220px;opacity:.13;transform:scale(.7);pointer-events:none;transform-origin:right top}.hero-art .floating-label{display:none}.overview{grid-template-columns:repeat(3,1fr);padding:19px 0}.overview>div:nth-child(3){border:0}.overview-message{display:none!important}.overview>div{gap:8px}.overview-icon{width:30px;height:30px;background:none}.overview-icon svg{width:18px}.overview p{font-size:8px}.overview strong{font-size:22px}.overview strong small{font-size:9px;margin-left:4px}.campaigns{padding-top:36px}.section-heading{align-items:flex-start;gap:8px}.section-heading h2{font-size:23px}.section-heading p{font-size:10px;max-width:220px;line-height:1.7}.section-actions{gap:3px;padding-top:20px}.section-actions .secondary{font-size:9px;padding:8px}.section-actions .secondary svg{display:none}.section-actions>.icon-button{width:27px}.filter-bar{padding:19px 0 13px;gap:15px}.filters{gap:2px}.filters button{font-size:10px;padding:8px 10px}.search{width:100%;align-self:auto}.search input{width:100%;font-size:11px}.result-line{font-size:9px}.result-line>div{font-size:8px}.sort{margin-left:7px}.ad-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:17px 12px}.ad-visual{height:166px}.card-body{padding:13px 12px 0}.card-body h3{font-size:13px;margin-bottom:14px;white-space:normal;height:38px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}.card-category{font-size:8px}.card-category>span{font-size:7px}.card-facts{grid-template-columns:1fr;gap:10px}.card-facts>div{gap:4px}.card-facts>div+div{border:0;padding:0}.card-facts strong{font-size:15px}.card-facts span{font-size:8px}.card-facts>div:nth-child(2) strong{font-size:10px;padding:0}.card-footer{font-size:8px}.card-footer>span:last-child{font-size:0;gap:0}.mini-avatar{width:16px;height:16px;font-size:7px}.progress-labels{font-size:7px;gap:0}.progress-labels svg{display:none}.badge{font-size:8px;padding:5px 7px}.visual-top{left:10px;right:10px;top:10px}.visual-bottom{font-size:7px;left:9px;padding:4px 5px;bottom:9px}.visual-bottom svg{width:10px}.concept-art{transform:scale(.85);transform-origin:center center;inset:-12px}.approved-stamp{top:66px;font-size:10px}.approved-stamp svg{width:23px}.trust-note{align-items:flex-start;flex-direction:column;margin:30px 0 40px;padding-top:20px;gap:13px}.trust-note p{font-size:9px}.trust-note strong{font-size:10px}.trust-note>button{font-size:9px;margin-left:34px}footer{padding:23px 20px;gap:10px;flex-wrap:wrap}footer p{font-size:9px}footer>span{margin-left:0;width:100%;font-size:8px}footer>button{margin-left:auto;font-size:9px}.overlay{padding:20px 12px}.modal{padding:20px 17px;border-radius:12px}.modal-head h2{font-size:18px}.form-columns,.detail-columns{grid-template-columns:1fr;gap:10px}.detail-role{font-size:8px}.detail-top{gap:6px;flex-wrap:wrap}.detail-summary{margin-top:14px}.video-frame{height:230px}.scope-tabs{flex-wrap:wrap;width:100%}.scope-tabs button{font-size:10px}.scope-tabs>span{font-size:9px;width:100%;margin:7px}.empty{padding:26px 15px;min-height:280px}.empty h3{font-size:16px}.empty p{font-size:10px}.empty>div:last-child{gap:6px}.empty .primary,.empty .secondary{font-size:10px;padding:10px}.toast{font-size:11px;padding:13px}.busy{bottom:18px;font-size:11px}.tx-tray{bottom:10px;right:10px;font-size:9px}.alert{font-size:10px;padding:12px}.hero-actions .primary{font-size:11px}.hero-actions .text-button{font-size:10px}}@media(max-width:370px){.ad-grid{grid-template-columns:1fr}.ad-visual{height:215px}.card-facts{grid-template-columns:1fr 1fr}.card-facts>div+div{border-left:1px solid var(--line);padding-left:15px}.card-body h3{height:auto}.card-footer>span:last-child{font-size:9px}.hero h1{font-size:30px}}.terms-inputs{border:0;padding:0;margin:0;min-width:0}.terms-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.terms .field{color:#6c7e5b;font-weight:500;margin:12px 0;font-size:10px}.terms .field input,.terms .field select{font-size:12px;padding:10px;background:#fff}.duration-input{display:grid;grid-template-columns:1fr 85px;gap:8px}.terms-preview{display:flex;flex-direction:column;gap:8px;padding-top:12px;margin-top:5px;border-top:1px solid #e1e5d6}.terms-preview strong{font-size:15px;color:var(--accent)}.terms-preview span{font-size:10px;color:#81926e}.terms p{margin:5px 0}.terms .secondary{font-size:10px;padding:9px;min-height:35px}:root{background:#faf7ef;color:#302830;--surface:#faf7ef;--tint:#f4ecc2;--accent:#752b40;--deep:#500e16;--line:#e2d9ce}.app-shell{--surface:#faf7ef;--tint:#f4ecc2;--accent:#752b40;--deep:#500e16;--line:#e2d9ce;--green:var(--accent);min-height:100vh;background:var(--surface);color:#302830;transition:background-color .65s ease,color .65s ease}.app-shell[data-page=advertiser]{--surface:#f1f5fa;--tint:#d6e3ef;--accent:#385b7d;--deep:#233e59;--line:#cddbe6}.app-shell[data-page=rightsHolder]{--surface:#faf1f4;--tint:#efd7e1;--accent:#9e3059;--deep:#641c37;--line:#e8ced9}.app-shell[data-page=platform]{--surface:#f5f0e9;--tint:#ded0c1;--accent:#765548;--deep:#500e16;--line:#ded2c7}.app-shell header,.network-strip,footer,.primary,.secondary,.overview,.overview-icon,.empty,.badge,.brand-mark,.filters button,.scope-tabs button,.nav-count,.progress-track>div,.wallet-button{transition:background-color .65s ease,color .65s ease,border-color .65s ease,box-shadow .25s ease}header{background:var(--surface);border-color:var(--line)}nav>.nav-active{color:var(--accent)}nav>.nav-active:after{background:var(--accent);transition:background-color .65s ease}.brand{color:var(--deep)}.brand small,.eyebrow{color:var(--accent)}.wallet-button{border-color:var(--line);background:#ffffff70;color:var(--deep)}.dot,.live-dot{background:#a7c1d9}.network-strip{color:#fff7ed}.primary:hover:not(:disabled){background:var(--deep)}.secondary:hover:not(:disabled),.icon-button:hover,.filters button:hover{background:var(--tint)}.hero{display:block}.hero-content{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;width:100%;animation:page-arrive .48s ease both}.hero h1{color:var(--deep)}h1+p{color:#746d72}.hero-art.cube-art{position:relative;width:100%;height:330px;opacity:1;transform:none;top:auto;right:auto;display:flex;flex-direction:column;justify-content:center;pointer-events:none}.cube-art svg{width:100%;height:100%;overflow:visible}.cube-links{stroke:var(--accent);stroke-width:1;opacity:.32}.cube-node path{stroke:var(--accent);stroke-width:1.1;stroke-linejoin:round;transition:fill .65s ease,stroke .65s ease}.cube-top{fill:#f4ecc2}.cube-left{fill:#a7c1d9;fill-opacity:.68}.cube-right{fill:#d8cabb;fill-opacity:.85}.cube-tone-1 .cube-top{fill:#a7c1d9}.cube-tone-1 .cube-right{fill:var(--accent);fill-opacity:.24}.cube-tone-2 .cube-top{fill:#d8cabb}.cube-tone-2 .cube-left{fill:#9e3059;fill-opacity:.3}.network-caption{display:flex;align-items:center;justify-content:center;gap:8px;letter-spacing:2.4px;font-size:8px;color:var(--accent);margin-top:-14px}.network-caption span{height:5px;width:5px;background:var(--accent);border-radius:50%}.overview{border-color:var(--line);background:color-mix(in srgb,var(--tint) 52%,white)}.overview>div{border-color:var(--line)}.overview-icon,.overview strong,.overview-message b{color:var(--deep)}.overview p,.overview-message{color:#746d72}.section-heading h2>span,.section-heading .eyebrow,.result-line b{color:var(--accent)}.section-heading p,.card-category,.card-footer>span:last-child,.trust-note strong{color:#746d72}.filters button.selected,.scope-tabs .chosen{background:var(--tint);color:var(--accent)}.empty{border-color:var(--line)}.empty-icon{color:var(--accent)}.scope-tabs{background:#ffffff60}.ad-card{border-color:var(--line)}.trust-note{color:#746d72}.trust-note>div{color:var(--accent)}footer{background:color-mix(in srgb,var(--tint) 40%,white)}.app-shell:not([data-page=public]) .hero{min-height:0;padding:24px 0 18px}.app-shell:not([data-page=public]) .hero-content{grid-template-columns:1fr 190px}.app-shell:not([data-page=public]) h1{font-size:25px;letter-spacing:-.9px;line-height:1.35;margin:9px 0 7px}.app-shell:not([data-page=public]) h1 br{display:none}.app-shell:not([data-page=public]) h1+p{font-size:12px;max-width:none;margin:0;line-height:1.6}.app-shell:not([data-page=public]) .hero .eyebrow{font-size:8px;letter-spacing:1.6px}.app-shell:not([data-page=public]) .hero-actions{margin-top:14px;gap:18px}.app-shell:not([data-page=public]) .hero-actions .primary{min-height:35px;padding:8px 12px;font-size:11px}.app-shell:not([data-page=public]) .hero-actions .text-button{font-size:11px}.app-shell:not([data-page=public]) .cube-art{height:140px}.app-shell:not([data-page=public]) .network-caption{display:none}.app-shell:not([data-page=public]) .overview{padding:13px 8px}.app-shell:not([data-page=public]) .overview strong{font-size:20px}.app-shell:not([data-page=public]) .overview-icon{width:32px;height:32px}.app-shell:not([data-page=public]) .overview p{font-size:10px}.app-shell:not([data-page=public]) .campaigns{padding-top:27px}.app-shell:not([data-page=public]) .section-heading h2{font-size:21px;margin:6px 0 0}.app-shell:not([data-page=public]) .scope-tabs{margin-top:16px}@keyframes page-arrive{0%{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}@media(max-width:760px){.hero-content{grid-template-columns:1fr}.hero-art.cube-art{position:relative;height:210px;width:100%;margin:14px auto 0;max-width:370px;opacity:1;transform:none;right:auto;top:auto}.hero-copy{min-width:0}.network-caption{font-size:7px}.hero{overflow:hidden}.app-shell:not([data-page=public]) .hero{padding:20px 0 16px}.app-shell:not([data-page=public]) .hero-content{grid-template-columns:1fr}.app-shell:not([data-page=public]) .cube-art{display:none}.app-shell:not([data-page=public]) h1{font-size:20px;margin:8px 0 6px;letter-spacing:-.6px}.app-shell:not([data-page=public]) h1+p{font-size:11px}.app-shell:not([data-page=public]) .overview{padding:12px 0}.app-shell:not([data-page=public]) .overview p{font-size:8px}.app-shell:not([data-page=public]) .overview strong{font-size:18px}.app-shell:not([data-page=public]) .overview-icon{width:22px;height:22px}.app-shell:not([data-page=public]) .campaigns{padding-top:24px}.app-shell:not([data-page=public]) .section-heading h2{font-size:19px}.app-shell:not([data-page=public]) .section-actions{padding-top:8px}main{overflow-wrap:break-word}.app-shell{overflow-x:clip}}@media(prefers-reduced-motion:reduce){.app-shell *,.app-shell{animation:none!important;transition:none!important;scroll-behavior:auto!important}}.app-shell .hero-content{position:relative;isolation:isolate;display:block}.app-shell .hero-copy{position:relative;z-index:2}.app-shell .hero-art.cube-art{position:absolute;left:-95px;right:auto;top:50%;width:460px;max-width:none;height:340px;margin:0;transform:translateY(-50%);opacity:.12;filter:blur(1.2px);z-index:0;pointer-events:none}.app-shell .cube-art .network-caption{display:none}.app-shell:not([data-page=public]) .hero-art.cube-art{display:flex;left:-55px;width:280px;height:190px;opacity:.1}@media(max-width:760px){.app-shell .hero-art.cube-art{left:-90px;top:44%;width:350px;height:270px;opacity:.11;transform:translateY(-50%)}.app-shell:not([data-page=public]) .hero-art.cube-art{display:flex;left:-60px;top:50%;width:250px;height:185px;opacity:.09}}.app-shell .hero{overflow:visible}.app-shell .hero-art.cube-art{left:calc((min(100vw,1280px) - 100vw)/2 - 68px);opacity:.3;filter:blur(.45px)}.app-shell:not([data-page=public]) .hero-art.cube-art{left:calc((min(100vw,1280px) - 100vw)/2 - 57px);opacity:.25}@media(max-width:1100px){.app-shell .hero-art.cube-art{left:-58px}.app-shell:not([data-page=public]) .hero-art.cube-art{left:-47px}}@media(max-width:760px){.app-shell .hero-art.cube-art{left:-42px;opacity:.3}.app-shell:not([data-page=public]) .hero-art.cube-art{left:-35px;opacity:.25}}.app-shell .hero-art.cube-art{left:auto;right:-20px;top:46%;width:460px;height:340px;opacity:.3;filter:blur(.35px)}.app-shell:not([data-page=public]) .hero-art.cube-art{left:auto;right:-10px;width:240px;height:180px;opacity:.25}@media(max-width:1100px){.app-shell .hero-art.cube-art{left:auto;right:-20px}.app-shell:not([data-page=public]) .hero-art.cube-art{left:auto;right:-10px}}@media(max-width:760px){.app-shell .hero-art.cube-art{left:auto;right:-52px;top:44%;width:245px;height:245px;opacity:.3}.app-shell:not([data-page=public]) .hero-art.cube-art{left:auto;right:-35px;top:50%;width:180px;height:160px;opacity:.23}}.youtube-setup{margin-top:30px;border:1px solid var(--line);background:#ffffff70;border-radius:10px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px}.youtube-setup strong{font-size:13px}.youtube-setup p{font-size:11px;line-height:1.7;color:#766d72;margin:8px 0 0}.youtube-pending{font-size:10px;background:var(--tint);color:var(--accent);padding:4px 7px;border-radius:4px;margin-left:9px}.youtube-setup .secondary{white-space:nowrap}@media(max-width:760px){.youtube-setup{align-items:flex-start;flex-direction:column}.youtube-setup p{font-size:10px}}
`, type: "text/css" }, "/main.js": { body: 'var xA=Object.create;var Cd=Object.defineProperty;var yA=Object.getOwnPropertyDescriptor;var bA=Object.getOwnPropertyNames;var wA=Object.getPrototypeOf,LA=Object.prototype.hasOwnProperty;var Dn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),vA=(t,e)=>{for(var a in e)Cd(t,a,{get:e[a],enumerable:!0})},AA=(t,e,a,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of bA(e))!LA.call(t,r)&&r!==a&&Cd(t,r,{get:()=>e[r],enumerable:!(n=yA(e,r))||n.enumerable});return t};var pu=(t,e,a)=>(a=t!=null?xA(wA(t)):{},AA(e||!t||!t.__esModule?Cd(a,"default",{value:t,enumerable:!0}):a,t));var l0=Dn(Q=>{"use strict";var Bd=Symbol.for("react.transitional.element"),SA=Symbol.for("react.portal"),IA=Symbol.for("react.fragment"),EA=Symbol.for("react.strict_mode"),TA=Symbol.for("react.profiler"),BA=Symbol.for("react.consumer"),OA=Symbol.for("react.context"),NA=Symbol.for("react.forward_ref"),kA=Symbol.for("react.suspense"),DA=Symbol.for("react.memo"),Wg=Symbol.for("react.lazy"),UA=Symbol.for("react.activity"),MA=Symbol.for("react.view_transition"),jg=Symbol.iterator;function PA(t){return t===null||typeof t!="object"?null:(t=jg&&t[jg]||t["@@iterator"],typeof t=="function"?t:null)}var $g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},e0=Object.assign,t0={};function Xo(t,e,a){this.props=t,this.context=e,this.refs=t0,this.updater=a||$g}Xo.prototype.isReactComponent={};Xo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Xo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function a0(){}a0.prototype=Xo.prototype;function Od(t,e,a){this.props=t,this.context=e,this.refs=t0,this.updater=a||$g}var Nd=Od.prototype=new a0;Nd.constructor=Od;e0(Nd,Xo.prototype);Nd.isPureReactComponent=!0;var Yg=Array.isArray;function Td(){}var ve={H:null,A:null,T:null,S:null},n0=Object.prototype.hasOwnProperty;function kd(t,e,a){var n=a.ref;return{$$typeof:Bd,type:t,key:e,ref:n!==void 0?n:null,props:a}}function zA(t,e){return kd(t.type,e,t.props)}function Dd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Bd}function RA(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(a){return e[a]})}var Jg=/\\/+/g;function Ed(t,e){return typeof t=="object"&&t!==null&&t.key!=null?RA(""+t.key):e.toString(36)}function HA(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Td,Td):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Ko(t,e,a,n,r){var o=typeof t;(o==="undefined"||o==="boolean")&&(t=null);var l=!1;if(t===null)l=!0;else switch(o){case"bigint":case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case Bd:case SA:l=!0;break;case Wg:return l=t._init,Ko(l(t._payload),e,a,n,r)}}if(l)return r=r(t),l=n===""?"."+Ed(t,0):n,Yg(r)?(a="",l!=null&&(a=l.replace(Jg,"$&/")+"/"),Ko(r,e,a,"",function(u){return u})):r!=null&&(Dd(r)&&(r=zA(r,a+(r.key==null||t&&t.key===r.key?"":(""+r.key).replace(Jg,"$&/")+"/")+l)),e.push(r)),1;l=0;var s=n===""?".":n+":";if(Yg(t))for(var i=0;i<t.length;i++)n=t[i],o=s+Ed(n,i),l+=Ko(n,e,a,o,r);else if(i=PA(t),typeof i=="function")for(t=i.call(t),i=0;!(n=t.next()).done;)n=n.value,o=s+Ed(n,i++),l+=Ko(n,e,a,o,r);else if(o==="object"){if(typeof t.then=="function")return Ko(HA(t),e,a,n,r);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return l}function hu(t,e,a){if(t==null)return t;var n=[],r=0;return Ko(t,n,"","",function(o){return e.call(a,o,r++)}),n}function FA(t){if(t._status===-1){var e=t._result,a=e();a.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n,a.status===void 0&&(a.status="fulfilled",a.value=n))},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n,a.status===void 0&&(a.status="rejected",a.reason=n))}),t._status===-1&&(t._status=0,t._result=a)}if(t._status===1)return t._result.default;throw t._result}var Zg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function r0(t){var e=ve.T,a={};a.types=e!==null?e.types:null,ve.T=a;try{var n=t(),r=ve.S;r!==null&&r(a,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(Td,Zg)}catch(o){Zg(o)}finally{e!==null&&a.types!==null&&(e.types=a.types),ve.T=e}}function o0(t){var e=ve.T;if(e!==null){var a=e.types;a===null?e.types=[t]:a.indexOf(t)===-1&&a.push(t)}else r0(o0.bind(null,t))}var qA={map:hu,forEach:function(t,e,a){hu(t,function(){e.apply(this,arguments)},a)},count:function(t){var e=0;return hu(t,function(){e++}),e},toArray:function(t){return hu(t,function(e){return e})||[]},only:function(t){if(!Dd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Q.Activity=UA;Q.Children=qA;Q.Component=Xo;Q.Fragment=IA;Q.Profiler=TA;Q.PureComponent=Od;Q.StrictMode=EA;Q.Suspense=kA;Q.ViewTransition=MA;Q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ve;Q.__COMPILER_RUNTIME={__proto__:null,c:function(t){return ve.H.useMemoCache(t)}};Q.addTransitionType=o0;Q.cache=function(t){return function(){return t.apply(null,arguments)}};Q.cacheSignal=function(){return null};Q.cloneElement=function(t,e,a){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var n=e0({},t.props),r=t.key;if(e!=null)for(o in e.key!==void 0&&(r=""+e.key),e)!n0.call(e,o)||o==="key"||o==="__self"||o==="__source"||o==="ref"&&e.ref===void 0||(n[o]=e[o]);var o=arguments.length-2;if(o===1)n.children=a;else if(1<o){for(var l=Array(o),s=0;s<o;s++)l[s]=arguments[s+2];n.children=l}return kd(t.type,r,n)};Q.createContext=function(t){return t={$$typeof:OA,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:BA,_context:t},t};Q.createElement=function(t,e,a){var n,r={},o=null;if(e!=null)for(n in e.key!==void 0&&(o=""+e.key),e)n0.call(e,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(r[n]=e[n]);var l=arguments.length-2;if(l===1)r.children=a;else if(1<l){for(var s=Array(l),i=0;i<l;i++)s[i]=arguments[i+2];r.children=s}if(t&&t.defaultProps)for(n in l=t.defaultProps,l)r[n]===void 0&&(r[n]=l[n]);return kd(t,o,r)};Q.createRef=function(){return{current:null}};Q.forwardRef=function(t){return{$$typeof:NA,render:t}};Q.isValidElement=Dd;Q.lazy=function(t){return{$$typeof:Wg,_payload:{_status:-1,_result:t},_init:FA}};Q.memo=function(t,e){return{$$typeof:DA,type:t,compare:e===void 0?null:e}};Q.startTransition=r0;Q.unstable_useCacheRefresh=function(){return ve.H.useCacheRefresh()};Q.use=function(t){return ve.H.use(t)};Q.useActionState=function(t,e,a){return ve.H.useActionState(t,e,a)};Q.useCallback=function(t,e){return ve.H.useCallback(t,e)};Q.useContext=function(t){return ve.H.useContext(t)};Q.useDebugValue=function(){};Q.useDeferredValue=function(t,e){return ve.H.useDeferredValue(t,e)};Q.useEffect=function(t,e){return ve.H.useEffect(t,e)};Q.useEffectEvent=function(t){return ve.H.useEffectEvent(t)};Q.useId=function(){return ve.H.useId()};Q.useImperativeHandle=function(t,e,a){return ve.H.useImperativeHandle(t,e,a)};Q.useInsertionEffect=function(t,e){return ve.H.useInsertionEffect(t,e)};Q.useLayoutEffect=function(t,e){return ve.H.useLayoutEffect(t,e)};Q.useMemo=function(t,e){return ve.H.useMemo(t,e)};Q.useOptimistic=function(t,e){return ve.H.useOptimistic(t,e)};Q.useReducer=function(t,e,a){return ve.H.useReducer(t,e,a)};Q.useRef=function(t){return ve.H.useRef(t)};Q.useState=function(t){return ve.H.useState(t)};Q.useSyncExternalStore=function(t,e,a){return ve.H.useSyncExternalStore(t,e,a)};Q.useTransition=function(){return ve.H.useTransition()};Q.version="19.3.1"});var jo=Dn((VB,s0)=>{"use strict";s0.exports=l0()});var x0=Dn(ke=>{"use strict";function zd(t,e){var a=t.length;t.push(e);e:for(;0<a;){var n=a-1>>>1,r=t[n];if(0<mu(r,e))t[n]=e,t[a]=r,a=n;else break e}}function Fa(t){return t.length===0?null:t[0]}function xu(t){if(t.length===0)return null;var e=t[0],a=t.pop();if(a!==e){t[0]=a;e:for(var n=0,r=t.length,o=r>>>1;n<o;){var l=2*(n+1)-1,s=t[l],i=l+1,u=t[i];if(0>mu(s,a))i<r&&0>mu(u,s)?(t[n]=u,t[i]=a,n=i):(t[n]=s,t[l]=a,n=l);else if(i<r&&0>mu(u,a))t[n]=u,t[i]=a,n=i;else break e}}return e}function mu(t,e){var a=t.sortIndex-e.sortIndex;return a!==0?a:t.id-e.id}ke.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(i0=performance,ke.unstable_now=function(){return i0.now()}):(Ud=Date,u0=Ud.now(),ke.unstable_now=function(){return Ud.now()-u0});var i0,Ud,u0,on=[],Mn=[],GA=1,fa=null,xt=3,Rd=!1,As=!1,Cs=!1,Hd=!1,d0=typeof setTimeout=="function"?setTimeout:null,p0=typeof clearTimeout=="function"?clearTimeout:null,f0=typeof setImmediate<"u"?setImmediate:null;function gu(t){for(var e=Fa(Mn);e!==null;){if(e.callback===null)xu(Mn);else if(e.startTime<=t)xu(Mn),e.sortIndex=e.expirationTime,zd(on,e);else break;e=Fa(Mn)}}function Fd(t){if(Cs=!1,gu(t),!As)if(Fa(on)!==null)As=!0,Jo||(Jo=!0,Yo());else{var e=Fa(Mn);e!==null&&qd(Fd,e.startTime-t)}}var Jo=!1,Ss=-1,h0=5,m0=-1;function g0(){return Hd?!0:!(ke.unstable_now()-m0<h0)}function Md(){if(Hd=!1,Jo){var t=ke.unstable_now();m0=t;var e=!0;try{e:{As=!1,Cs&&(Cs=!1,p0(Ss),Ss=-1),Rd=!0;var a=xt;try{t:{for(gu(t),fa=Fa(on);fa!==null&&!(fa.expirationTime>t&&g0());){var n=fa.callback;if(typeof n=="function"){fa.callback=null,xt=fa.priorityLevel;var r=n(fa.expirationTime<=t);if(t=ke.unstable_now(),typeof r=="function"){fa.callback=r,gu(t),e=!0;break t}fa===Fa(on)&&xu(on),gu(t)}else xu(on);fa=Fa(on)}if(fa!==null)e=!0;else{var o=Fa(Mn);o!==null&&qd(Fd,o.startTime-t),e=!1}}break e}finally{fa=null,xt=a,Rd=!1}e=void 0}}finally{e?Yo():Jo=!1}}}var Yo;typeof f0=="function"?Yo=function(){f0(Md)}:typeof MessageChannel<"u"?(Pd=new MessageChannel,c0=Pd.port2,Pd.port1.onmessage=Md,Yo=function(){c0.postMessage(null)}):Yo=function(){d0(Md,0)};var Pd,c0;function qd(t,e){Ss=d0(function(){t(ke.unstable_now())},e)}ke.unstable_IdlePriority=5;ke.unstable_ImmediatePriority=1;ke.unstable_LowPriority=4;ke.unstable_NormalPriority=3;ke.unstable_Profiling=null;ke.unstable_UserBlockingPriority=2;ke.unstable_cancelCallback=function(t){t.callback=null};ke.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):h0=0<t?Math.floor(1e3/t):5};ke.unstable_getCurrentPriorityLevel=function(){return xt};ke.unstable_next=function(t){switch(xt){case 1:case 2:case 3:var e=3;break;default:e=xt}var a=xt;xt=e;try{return t()}finally{xt=a}};ke.unstable_requestPaint=function(){Hd=!0};ke.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var a=xt;xt=t;try{return e()}finally{xt=a}};ke.unstable_scheduleCallback=function(t,e,a){var n=ke.unstable_now();switch(typeof a=="object"&&a!==null?(a=a.delay,a=typeof a=="number"&&0<a?n+a:n):a=n,t){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=a+r,t={id:GA++,callback:e,priorityLevel:t,startTime:a,expirationTime:r,sortIndex:-1},a>n?(t.sortIndex=a,zd(Mn,t),Fa(on)===null&&t===Fa(Mn)&&(Cs?(p0(Ss),Ss=-1):Cs=!0,qd(Fd,a-n))):(t.sortIndex=r,zd(on,t),As||Rd||(As=!0,Jo||(Jo=!0,Yo()))),t};ke.unstable_shouldYield=g0;ke.unstable_wrapCallback=function(t){var e=xt;return function(){var a=xt;xt=e;try{return t.apply(this,arguments)}finally{xt=a}}}});var b0=Dn((KB,y0)=>{"use strict";y0.exports=x0()});var v0=Dn(yt=>{"use strict";var _A=jo();function L0(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Pn(){}var vt={d:{f:Pn,r:function(){throw Error(L0(522))},D:Pn,C:Pn,L:Pn,m:Pn,X:Pn,S:Pn,M:Pn},p:0,findDOMNode:null},VA=Symbol.for("react.portal"),QA=Symbol.for("react.recoverable"),w0=Symbol.for("react.optimistic_key");function KA(t,e,a){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:VA,key:n==null?null:n===w0?w0:""+n,children:t,containerInfo:e,implementation:a}}var Is=_A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function yu(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}yt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=vt;yt.browser=function(t){return{$$typeof:QA,_reason:t}};yt.createPortal=function(t,e){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(L0(299));return KA(t,e,null,a)};yt.flushSync=function(t){var e=Is.T,a=vt.p;try{if(Is.T=null,vt.p=2,t)return t()}finally{Is.T=e,vt.p=a,vt.d.f()}};yt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,vt.d.C(t,e))};yt.prefetchDNS=function(t){typeof t=="string"&&vt.d.D(t)};yt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var a=e.as,n=yu(a,e.crossOrigin),r=typeof e.integrity=="string"?e.integrity:void 0,o=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;a==="style"?vt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:n,integrity:r,fetchPriority:o}):a==="script"&&vt.d.X(t,{crossOrigin:n,integrity:r,fetchPriority:o,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};yt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var a=yu(e.as,e.crossOrigin);vt.d.M(t,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}}else e==null&&vt.d.M(t)};yt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var a=e.as,n=yu(a,e.crossOrigin);vt.d.L(t,a,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};yt.preloadModule=function(t,e){if(typeof t=="string")if(e){var a=yu(e.as,e.crossOrigin);vt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0})}else vt.d.m(t)};yt.requestFormReset=function(t){vt.d.r(t)};yt.unstable_batchedUpdates=function(t,e){return t(e)};yt.useFormState=function(t,e,a){return Is.H.useFormState(t,e,a)};yt.useFormStatus=function(){return Is.H.useHostTransitionStatus()};yt.version="19.3.1"});var S0=Dn((jB,C0)=>{"use strict";function A0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(A0)}catch(t){console.error(t)}}A0(),C0.exports=v0()});var cw=Dn(ec=>{"use strict";var $e=b0(),fy=jo(),XA=S0();function B(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function cy(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function pi(t){for(var e=t,a=e;a&&!a.alternate;)e=a,(e.flags&4098)!==0&&(t=e.return),a=e.return;for(;e.return;)e=e.return;return e.tag===3?t:null}function dy(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function py(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function I0(t){if(pi(t)!==t)throw Error(B(188))}function jA(t){var e=t.alternate;if(!e){if(e=pi(t),e===null)throw Error(B(188));return e!==t?null:t}for(var a=t,n=e;;){var r=a.return;if(r===null)break;var o=r.alternate;if(o===null){if(n=r.return,n!==null){a=n;continue}break}if(r.child===o.child){for(o=r.child;o;){if(o===a)return I0(r),t;if(o===n)return I0(r),e;o=o.sibling}throw Error(B(188))}if(a.return!==n.return)a=r,n=o;else{for(var l=!1,s=r.child;s;){if(s===a){l=!0,a=r,n=o;break}if(s===n){l=!0,n=r,a=o;break}s=s.sibling}if(!l){for(s=o.child;s;){if(s===a){l=!0,a=o,n=r;break}if(s===n){l=!0,n=o,a=r;break}s=s.sibling}if(!l)throw Error(B(189))}}if(a.alternate!==n)throw Error(B(190))}if(a.tag!==3)throw Error(B(188));return a.stateNode.current===a?t:e}function hy(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=hy(t),e!==null)return e;t=t.sibling}return null}function zt(t,e,a,n,r,o){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,n,r,o)||(t.tag!==22||t.memoizedState===null)&&(e||t.tag!==5&&t.tag!==27)&&zt(t.child,e,a,n,r,o))return!0;t=t.sibling}return!1}function oo(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function E0(t){var e=!1;for(t=t.return;t!==null&&(t.tag===4&&(e=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return e}function my(t){var e=[null,null],a=oo(t);return a===null||gy(e,t,a.child,{foundSelf:!1}),e}function gy(t,e,a,n){for(;a!==null;){if(a===e)n.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(n.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&gy(t,e,a.child,n))return!0;a=a.sibling}return!1}function We(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(B(559))}}var nl=null,bp=null;function YA(t,e,a){return t===a?!0:t===e?(nl=t,!0):!1}function JA(t,e,a){return t===a?(bp=t,!1):t===e?(bp!==null&&(nl=t),!0):!1}function T0(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function wp(t,e,a){for(var n=0,r=t;r;r=a(r))n++;r=0;for(var o=e;o;o=a(o))r++;for(;0<n-r;)t=a(t),n--;for(;0<r-n;)e=a(e),r--;for(;n--;){if(t===e||e!==null&&t===e.alternate)return t;t=a(t),e=a(e)}return null}var Le=Object.assign,ZA=Symbol.for("react.element"),bu=Symbol.for("react.transitional.element"),Ds=Symbol.for("react.portal"),rl=Symbol.for("react.fragment"),xy=Symbol.for("react.strict_mode"),Lp=Symbol.for("react.profiler"),yy=Symbol.for("react.consumer"),Ka=Symbol.for("react.context"),Oh=Symbol.for("react.forward_ref"),vp=Symbol.for("react.suspense"),Ap=Symbol.for("react.suspense_list"),Nh=Symbol.for("react.memo"),Fn=Symbol.for("react.lazy");Symbol.for("react.scope");var Cp=Symbol.for("react.activity"),WA=Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var $A=Symbol.for("react.memo_cache_sentinel"),Sp=Symbol.for("react.view_transition"),eC=Symbol.for("react.recoverable"),B0=Symbol.iterator;function Es(t){return t===null||typeof t!="object"?null:(t=B0&&t[B0]||t["@@iterator"],typeof t=="function"?t:null)}var tC=Symbol.for("react.client.reference");function Ip(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===tC?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case rl:return"Fragment";case Lp:return"Profiler";case xy:return"StrictMode";case vp:return"Suspense";case Ap:return"SuspenseList";case Cp:return"Activity";case Sp:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case Ds:return"Portal";case Ka:return t.displayName||"Context";case yy:return(t._context.displayName||"Context")+".Consumer";case Oh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nh:return e=t.displayName||null,e!==null?e:Ip(t.type)||"Memo";case Fn:e=t._payload,t=t._init;try{return Ip(t(e))}catch{}}return null}var Us=Array.isArray,_=fy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,de=XA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Kr={pending:!1,data:null,method:null,action:null},Ep=[],ol=-1;function $a(t){return{current:t}}function dt(t){0>ol||(t.current=Ep[ol],Ep[ol]=null,ol--)}function Se(t,e){ol++,Ep[ol]=t.current,t.current=e}var Ja=$a(null),Zs=$a(null),Yn=$a(null),of=$a(null);function lf(t,e){switch(Se(Yn,e),Se(Zs,t),Se(Ja,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?_x(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=_x(e),t=F1(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}dt(Ja),Se(Ja,t)}function Sl(){dt(Ja),dt(Zs),dt(Yn)}function Tp(t){var e=t.memoizedState;e!==null&&(Ml._currentValue=e.memoizedState,Se(of,t)),e=Ja.current;var a=F1(e,t.type);e!==a&&(Se(Zs,t),Se(Ja,a))}function sf(t){Zs.current===t&&(dt(Ja),dt(Zs)),of.current===t&&(dt(of),Ml._currentValue=Kr)}var Gd,O0;function Rn(t){if(Gd===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\\n( *(at )?)/);Gd=e&&e[1]||"",O0=-1<a.stack.indexOf(`\n    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`\n`+Gd+t+O0}var _d=!1;function Vd(t,e){if(!t||_d)return"";_d=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(e){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(w){var p=w}Reflect.construct(t,[],d)}else{try{d.call()}catch(w){p=w}d=!1;try{var h=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new t}finally{d&&(h!==void 0?Object.defineProperty(t.prototype,"props",h):delete t.prototype.props)}}}else{try{throw Error()}catch(w){p=w}(d=t())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(w){if(w&&p&&typeof w.stack=="string")return[w.stack,p.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=n.DetermineComponentFrameRoot(),l=o[0],s=o[1];if(l&&s){var i=l.split(`\n`),u=s.split(`\n`);for(r=n=0;n<i.length&&!i[n].includes("DetermineComponentFrameRoot");)n++;for(;r<u.length&&!u[r].includes("DetermineComponentFrameRoot");)r++;if(n===i.length||r===u.length)for(n=i.length-1,r=u.length-1;1<=n&&0<=r&&i[n]!==u[r];)r--;for(;1<=n&&0<=r;n--,r--)if(i[n]!==u[r]){if(n!==1||r!==1)do if(n--,r--,0>r||i[n]!==u[r]){var f=`\n`+i[n].replace(" at new "," at ");return t.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",t.displayName)),f}while(1<=n&&0<=r);break}}}finally{_d=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Rn(a):""}function aC(t,e){switch(t.tag){case 26:case 27:case 5:return Rn(t.type);case 16:return Rn("Lazy");case 13:return t.child!==e&&e!==null?Rn("Suspense Fallback"):Rn("Suspense");case 19:return Rn("SuspenseList");case 0:case 15:return Vd(t.type,!1);case 11:return Vd(t.type.render,!1);case 1:return Vd(t.type,!0);case 31:return Rn("Activity");case 30:return Rn("ViewTransition");default:return""}}function N0(t){try{var e="",a=null;do e+=aC(t,a),a=t,t=t.return;while(t);return e}catch(n){return`\nError generating stack: `+n.message+`\n`+n.stack}}var Bp=Object.prototype.hasOwnProperty,kh=$e.unstable_scheduleCallback,Qd=$e.unstable_cancelCallback,nC=$e.unstable_shouldYield,rC=$e.unstable_requestPaint,Jt=$e.unstable_now,oC=$e.unstable_getCurrentPriorityLevel,by=$e.unstable_ImmediatePriority,wy=$e.unstable_UserBlockingPriority,uf=$e.unstable_NormalPriority,lC=$e.unstable_LowPriority,Ly=$e.unstable_IdlePriority,sC=$e.log,iC=$e.unstable_setDisableYieldValue,hi=null,Zt=null;function _n(t){if(typeof sC=="function"&&iC(t),Zt&&typeof Zt.setStrictMode=="function")try{Zt.setStrictMode(hi,t)}catch{}}var Wt=Math.clz32?Math.clz32:cC,uC=Math.log,fC=Math.LN2;function cC(t){return t>>>=0,t===0?32:31-(uC(t)/fC|0)|0}var wu=256,Lu=262144,vu=4194304;function qr(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Mf(t,e,a){var n=t.pendingLanes;if(n===0)return 0;var r=0,o=t.suspendedLanes,l=t.pingedLanes;t=t.warmLanes;var s=n&134217727;return s!==0?(n=s&~o,n!==0?r=qr(n):(l&=s,l!==0?r=qr(l):a||(a=s&~t,a!==0&&(r=qr(a))))):(s=n&~o,s!==0?r=qr(s):l!==0?r=qr(l):a||(a=n&~t,a!==0&&(r=qr(a)))),r===0?0:e!==0&&e!==r&&(e&o)===0&&(o=r&-r,a=e&-e,o>=a||o===32&&(a&4194048)!==0)?e:r}function mi(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function vy(t,e){(e&8)!==0&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var n=31-Wt(a),r=1<<n;e|=t[n],a&=~r}return e}function dC(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ay(){var t=vu;return vu<<=1,(vu&62914560)===0&&(vu=4194304),t}function Kd(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function gi(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function pC(t,e,a,n,r,o){var l=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var s=t.entanglements,i=t.expirationTimes,u=t.hiddenUpdates;for(a=l&~a;0<a;){var f=31-Wt(a),d=1<<f;s[f]=0,i[f]=-1;var p=u[f];if(p!==null)for(u[f]=null,f=0;f<p.length;f++){var h=p[f];h!==null&&(h.lane&=-536870913)}a&=~d}n!==0&&Cy(t,n,0),o!==0&&r===0&&t.tag!==0&&(t.suspendedLanes|=o&~(l&~e))}function Cy(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var n=31-Wt(e);t.entangledLanes|=e,t.entanglements[n]=t.entanglements[n]|1073741824|a&261930}function Sy(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var n=31-Wt(a),r=1<<n;r&e|t[n]&e&&(t[n]|=e),a&=~r}}function Iy(t,e){var a=e&-e;return a=(a&42)!==0?1:Dh(a),(a&(t.suspendedLanes|e))!==0?0:a}function Dh(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Uh(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ey(){var t=de.p;return t!==0?t:(t=window.event,t===void 0?32:iw(t.type))}function k0(t,e){var a=de.p;try{return de.p=t,e()}finally{de.p=a}}var bn=Math.random().toString(36).slice(2),ft="__reactFiber$"+bn,Rt="__reactProps$"+bn,Rl="__reactContainer$"+bn,D0="__reactEvents$"+bn,hC="__reactListeners$"+bn,mC="__reactHandles$"+bn,U0="__reactResources$"+bn,xi="__reactMarker$"+bn,ff="__reactLoad$"+bn;function Pf(t){delete t[ft],delete t[Rt],delete t[hC],delete t[mC]}function Vr(t){var e;if(e=t[ft])return e;for(var a=t.parentNode;a;){if(e=a[Rl]||a[ft]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=Zx(t);t!==null;){if(a=t[ft])return a;t=Zx(t)}return e}t=a,a=t.parentNode}return null}function Hl(t){if(t=t[ft]||t[Rl]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Ms(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(B(33))}function ml(t){var e=t[U0];return e||(e=t[U0]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function ot(t){t[xi]=!0}function Ty(t){t[ff]=void 0}var By=new Set,Oy={};function lo(t,e){Il(t,e),Il(t+"Capture",e)}function Il(t,e){for(Oy[t]=e,t=0;t<e.length;t++)By.add(e[t])}var gC=RegExp("^[:A-Z_a-z\\\\u00C0-\\\\u00D6\\\\u00D8-\\\\u00F6\\\\u00F8-\\\\u02FF\\\\u0370-\\\\u037D\\\\u037F-\\\\u1FFF\\\\u200C-\\\\u200D\\\\u2070-\\\\u218F\\\\u2C00-\\\\u2FEF\\\\u3001-\\\\uD7FF\\\\uF900-\\\\uFDCF\\\\uFDF0-\\\\uFFFD][:A-Z_a-z\\\\u00C0-\\\\u00D6\\\\u00D8-\\\\u00F6\\\\u00F8-\\\\u02FF\\\\u0370-\\\\u037D\\\\u037F-\\\\u1FFF\\\\u200C-\\\\u200D\\\\u2070-\\\\u218F\\\\u2C00-\\\\u2FEF\\\\u3001-\\\\uD7FF\\\\uF900-\\\\uFDCF\\\\uFDF0-\\\\uFFFD\\\\-.0-9\\\\u00B7\\\\u0300-\\\\u036F\\\\u203F-\\\\u2040]*$"),M0={},P0={};function xC(t){return Bp.call(P0,t)?!0:Bp.call(M0,t)?!1:gC.test(t)?P0[t]=!0:(M0[t]=!0,!1)}var ie=!1;function z0(){var t=ie;return ie=!1,t}function Fu(t,e,a){if(xC(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var n=e.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,a)}}function Au(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,a)}}function ln(t,e,a,n){if(n===null)t.removeAttribute(a);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,n)}}function Kt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ny(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function yC(t,e,a){var n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,o=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(l){a=""+l,o.call(this,l)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Op(t){if(!t._valueTracker){var e=Ny(t)?"checked":"value";t._valueTracker=yC(t,e,""+t[e])}}function ky(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),n="";return t&&(n=Ny(t)?t.checked?"true":"false":t.value),t=n,t!==a?(e.setValue(t),!0):!1}var bC=/[\\n"\\\\]/g;function ma(t){return t.replace(bC,function(e){return"\\\\"+e.charCodeAt(0).toString(16)+" "})}function Np(t,e,a,n,r,o,l,s){t.name="",l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.type=l:t.removeAttribute("type"),e!=null?l==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Kt(e)):t.value!==""+Kt(e)&&(t.value=""+Kt(e)):l!=="submit"&&l!=="reset"||t.removeAttribute("value"),e!=null?l==="number"&&t.value==e?Xd(t,Kt(t.value)):Xd(t,Kt(e)):a!=null?Xd(t,Kt(a)):n!=null&&t.removeAttribute("value"),r==null&&o!=null&&(t.defaultChecked=!!o),r!=null&&(t.checked=r&&typeof r!="function"&&typeof r!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.name=""+Kt(s):t.removeAttribute("name")}function Dy(t,e,a,n,r,o,l,s){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(t.type=o),e!=null||a!=null){if(!(o!=="submit"&&o!=="reset"||e!=null)){Op(t);return}a=a!=null?""+Kt(a):"",e=e!=null?""+Kt(e):a,s||e===t.value||(t.value=e),t.defaultValue=e}n=n??r,n=typeof n!="function"&&typeof n!="symbol"&&!!n,t.checked=s?t.checked:!!n,t.defaultChecked=!!n,l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(t.name=l),Op(t)}function Xd(t,e){t.defaultValue!==""+e&&(t.defaultValue=""+e)}function gl(t,e,a,n){if(t=t.options,e){e={};for(var r=0;r<a.length;r++)e["$"+a[r]]=!0;for(a=0;a<t.length;a++)r=e.hasOwnProperty("$"+t[a].value),t[a].selected!==r&&(t[a].selected=r),r&&n&&(t[a].defaultSelected=!0)}else{for(a=""+Kt(a),e=null,r=0;r<t.length;r++){if(t[r].value===a){t[r].selected=!0,n&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Uy(t,e,a){if(e!=null&&(e=""+Kt(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+Kt(a):""}function My(t,e,a,n){if(e==null){if(n!=null){if(a!=null)throw Error(B(92));if(Us(n)){if(1<n.length)throw Error(B(93));n=n[0]}a=n}a==null&&(a=""),e=a}a=Kt(e),t.defaultValue=a,n=t.textContent,n===a&&n!==""&&n!==null&&(t.value=n),Op(t)}function El(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var wC=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function R0(t,e,a){var n=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?n?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":n?t.setProperty(e,a):typeof a!="number"||a===0||wC.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function Py(t,e,a){if(e!=null&&typeof e!="object")throw Error(B(62));if(t=t.style,a!=null){for(var n in a)!a.hasOwnProperty(n)||e!=null&&e.hasOwnProperty(n)||(n.indexOf("--")===0?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="",ie=!0);for(var r in e)n=e[r],e.hasOwnProperty(r)&&a[r]!==n&&(R0(t,r,n),ie=!0)}else for(var o in e)e.hasOwnProperty(o)&&R0(t,o,e[o])}function Mh(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var LC=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),vC=/^[\\u0000-\\u001F ]*j[\\r\\n\\t]*a[\\r\\n\\t]*v[\\r\\n\\t]*a[\\r\\n\\t]*s[\\r\\n\\t]*c[\\r\\n\\t]*r[\\r\\n\\t]*i[\\r\\n\\t]*p[\\r\\n\\t]*t[\\r\\n\\t]*:/i;function qu(t){return vC.test(""+t)?"javascript:throw new Error(\'React has blocked a javascript: URL as a security precaution.\')":t}function Xa(){}var kp=null;function Ph(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ll=null,xl=null;function H0(t){var e=Hl(t);if(e&&(t=e.stateNode)){var a=t[Rt]||null;e:switch(t=e.stateNode,e.type){case"input":if(Np(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll(\'input[name="\'+ma(""+e)+\'"][type="radio"]\'),e=0;e<a.length;e++){var n=a[e];if(n!==t&&n.form===t.form){var r=n[Rt]||null;if(!r)throw Error(B(90));Np(n,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(e=0;e<a.length;e++)n=a[e],n.form===t.form&&ky(n)}break e;case"textarea":Uy(t,a.value,a.defaultValue);break e;case"select":e=a.value,e!=null&&gl(t,!!a.multiple,e,!1)}}}var jd=!1;function zy(t,e,a){if(jd)return t(e,a);jd=!0;try{var n=t(e);return n}finally{if(jd=!1,(ll!==null||xl!==null)&&(Jf(),ll&&(e=ll,t=xl,xl=ll=null,H0(e),t)))for(e=0;e<t.length;e++)H0(t[e])}}function Ws(t,e){var a=t.stateNode;if(a===null)return null;var n=a[Rt]||null;if(n===null)return null;a=n[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(t=t.type,n=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!n;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(B(231,e,typeof a));return a}var pn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Dp=!1;if(pn)try{Zo={},Object.defineProperty(Zo,"passive",{get:function(){Dp=!0}}),window.addEventListener("test",Zo,Zo),window.removeEventListener("test",Zo,Zo)}catch{Dp=!1}var Zo,Vn=null,zh=null,Gu=null;function Ry(){if(Gu)return Gu;var t,e=zh,a=e.length,n,r="value"in Vn?Vn.value:Vn.textContent,o=r.length;for(t=0;t<a&&e[t]===r[t];t++);var l=a-t;for(n=1;n<=l&&e[a-n]===r[o-n];n++);return Gu=r.slice(t,1<n?1-n:void 0)}function _u(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Cu(){return!0}function F0(){return!1}function It(t){function e(a,n,r,o,l){this._reactName=a,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var s in t)t.hasOwnProperty(s)&&(a=t[s],this[s]=a?a(o):o[s]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Cu:F0,this.isPropagationStopped=F0,this}return Le(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Cu)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Cu)},persist:function(){},isPersistent:Cu}),e}var fr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zf=It(fr),yi=Le({},fr,{view:0,detail:0}),AC=It(yi),Yd,Jd,Ts,Rf=Le({},yi,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ts&&(Ts&&t.type==="mousemove"?(Yd=t.screenX-Ts.screenX,Jd=t.screenY-Ts.screenY):Jd=Yd=0,Ts=t),Yd)},movementY:function(t){return"movementY"in t?t.movementY:Jd}}),q0=It(Rf),CC=Le({},Rf,{dataTransfer:0}),SC=It(CC),IC=Le({},yi,{relatedTarget:0}),Zd=It(IC),EC=Le({},fr,{animationName:0,elapsedTime:0,pseudoElement:0}),TC=It(EC),BC=Le({},fr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),OC=It(BC),NC=Le({},fr,{data:0}),G0=It(NC),kC={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},DC={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},UC={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function MC(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=UC[t])?!!e[t]:!1}function Rh(){return MC}var PC=Le({},yi,{key:function(t){if(t.key){var e=kC[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=_u(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?DC[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rh,charCode:function(t){return t.type==="keypress"?_u(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?_u(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),zC=It(PC),RC=Le({},Rf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_0=It(RC),HC=Le({},fr,{submitter:0}),FC=It(HC),qC=Le({},yi,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rh}),GC=It(qC),_C=Le({},fr,{propertyName:0,elapsedTime:0,pseudoElement:0}),VC=It(_C),QC=Le({},Rf,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),KC=It(QC),XC=Le({},fr,{newState:0,oldState:0,source:0}),jC=It(XC),YC=[9,13,27,32],Hh=pn&&"CompositionEvent"in window,Rs=null;pn&&"documentMode"in document&&(Rs=document.documentMode);var JC=pn&&"TextEvent"in window&&!Rs,Hy=pn&&(!Hh||Rs&&8<Rs&&11>=Rs),V0=" ",Q0=!1;function Fy(t,e){switch(t){case"keyup":return YC.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function qy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var sl=!1;function ZC(t,e){switch(t){case"compositionend":return qy(e);case"keypress":return e.which!==32?null:(Q0=!0,V0);case"textInput":return t=e.data,t===V0&&Q0?null:t;default:return null}}function WC(t,e){if(sl)return t==="compositionend"||!Hh&&Fy(t,e)?(t=Ry(),Gu=zh=Vn=null,sl=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Hy&&e.locale!=="ko"?null:e.data;default:return null}}var $C={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function K0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!$C[t.type]:e==="textarea"}function Gy(t,e,a,n){ll?xl?xl.push(n):xl=[n]:ll=n,e=kf(e,"onChange"),0<e.length&&(a=new zf("onChange","change",null,a,n),t.push({event:a,listeners:e}))}var Hs=null,$s=null;function e2(t){z1(t,0)}function Hf(t){var e=Ms(t);if(ky(e))return t}function X0(t,e){if(t==="change")return e}var _y=!1;pn&&(pn?(Iu="oninput"in document,Iu||(Wd=document.createElement("div"),Wd.setAttribute("oninput","return;"),Iu=typeof Wd.oninput=="function"),Su=Iu):Su=!1,_y=Su&&(!document.documentMode||9<document.documentMode));var Su,Iu,Wd;function j0(){Hs&&(Hs.detachEvent("onpropertychange",Vy),$s=Hs=null)}function Vy(t){if(t.propertyName==="value"&&Hf($s)){var e=[];Gy(e,$s,t,Ph(t)),zy(e2,e)}}function t2(t,e,a){t==="focusin"?(j0(),Hs=e,$s=a,Hs.attachEvent("onpropertychange",Vy)):t==="focusout"&&j0()}function a2(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Hf($s)}function n2(t,e){if(t==="click")return Hf(e)}function r2(t,e){if(t==="input"||t==="change")return Hf(e)}function o2(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ea=typeof Object.is=="function"?Object.is:o2;function ei(t,e){if(ea(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),n=Object.keys(e);if(a.length!==n.length)return!1;for(n=0;n<a.length;n++){var r=a[n];if(!Bp.call(e,r)||!ea(t[r],e[r]))return!1}return!0}function Up(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Y0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function J0(t,e){var a=Y0(t);t=0;for(var n;a;){if(a.nodeType===3){if(n=t+a.textContent.length,t<=e&&n>=e)return{node:a,offset:e-t};t=n}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Y0(a)}}function Qy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Qy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Ky(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Up(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=Up(t.document)}return e}function Fh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var l2=pn&&"documentMode"in document&&11>=document.documentMode,il=null,Mp=null,Fs=null,Pp=!1;function Z0(t,e,a){var n=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Pp||il==null||il!==Up(n)||(n=il,"selectionStart"in n&&Fh(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Fs&&ei(Fs,n)||(Fs=n,n=kf(Mp,"onSelect"),0<n.length&&(e=new zf("onSelect","select",null,e,a),t.push({event:e,listeners:n}),e.target=il)))}function Hr(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var ul={animationend:Hr("Animation","AnimationEnd"),animationiteration:Hr("Animation","AnimationIteration"),animationstart:Hr("Animation","AnimationStart"),transitionrun:Hr("Transition","TransitionRun"),transitionstart:Hr("Transition","TransitionStart"),transitioncancel:Hr("Transition","TransitionCancel"),transitionend:Hr("Transition","TransitionEnd")},$d={},Xy={};pn&&(Xy=document.createElement("div").style,"AnimationEvent"in window||(delete ul.animationend.animation,delete ul.animationiteration.animation,delete ul.animationstart.animation),"TransitionEvent"in window||delete ul.transitionend.transition);function so(t){if($d[t])return $d[t];if(!ul[t])return t;var e=ul[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in Xy)return $d[t]=e[a];return t}var jy=so("animationend"),Yy=so("animationiteration"),Jy=so("animationstart"),s2=so("transitionrun"),i2=so("transitionstart"),u2=so("transitioncancel"),Zy=so("transitionend"),Wy=new Map,zp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zp.push("scrollEnd");function ka(t,e){Wy.set(t,e),lo(e,[t])}var f2=0;function hn(t,e){if(t.name!=null&&t.name!=="auto")return t.name;if(e.autoName!==null)return e.autoName;t=Na.identifierPrefix;var a=f2++;return t="_"+t+"t_"+a.toString(32)+"_",e.autoName=t}function W0(t){if(t==null||typeof t=="string")return t;var e=null,a=Cl;if(a!==null)for(var n=0;n<a.length;n++){var r=t[a[n]];if(r!=null){if(r==="none")return"none";e=e==null?r:e+(" "+r)}}return e??t.default}function wn(t,e){return t=W0(t),e=W0(e),e==null?t==="auto"?null:t:e==="auto"?null:e}var cf=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},da=[],fl=0,qh=0;function Ff(){for(var t=fl,e=qh=fl=0;e<t;){var a=da[e];da[e++]=null;var n=da[e];da[e++]=null;var r=da[e];da[e++]=null;var o=da[e];if(da[e++]=null,n!==null&&r!==null){var l=n.pending;l===null?r.next=r:(r.next=l.next,l.next=r),n.pending=r}o!==0&&$y(a,r,o)}}function qf(t,e,a,n){da[fl++]=t,da[fl++]=e,da[fl++]=a,da[fl++]=n,qh|=n,t.lanes|=n,t=t.alternate,t!==null&&(t.lanes|=n)}function Gh(t,e,a,n){return qf(t,e,a,n),df(t)}function io(t,e){return qf(t,null,null,e),df(t)}function $y(t,e,a){t.lanes|=a;var n=t.alternate;n!==null&&(n.lanes|=a);for(var r=!1,o=t.return;o!==null;)o.childLanes|=a,n=o.alternate,n!==null&&(n.childLanes|=a),o.tag===22&&(t=o.stateNode,t===null||t._visibility&1||(r=!0)),t=o,o=o.return;return t.tag===3?(o=t.stateNode,r&&e!==null&&(r=31-Wt(a),t=o.hiddenUpdates,n=t[r],n===null?t[r]=[e]:n.push(e),e.lane=a|536870912),o):null}function df(t){if(50<Js)throw Js=0,$u=null,Error(B(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var cl={};function c2(t,e,a,n){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mt(t,e,a,n){return new c2(t,e,a,n)}function _h(t){return t=t.prototype,!(!t||!t.isReactComponent)}function cn(t,e){var a=t.alternate;return a===null?(a=Mt(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function eb(t,e){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Vu(t,e,a,n,r,o){var l=0;if(n=t,typeof n=="function")_h(n)&&(l=1);else if(typeof n=="string")l=zS(t,a,Ja.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(n){case Cp:return t=Mt(31,a,e,r),t.elementType=Cp,t.lanes=o,t;case rl:return Xr(a.children,r,o,e);case xy:l=8,r|=24;break;case Lp:return t=Mt(12,a,e,r|2),t.elementType=Lp,t.lanes=o,t;case vp:return t=Mt(13,a,e,r),t.elementType=vp,t.lanes=o,t;case Ap:return t=Mt(19,a,e,r),t.elementType=Ap,t.lanes=o,t;case WA:case Sp:return t=r|32,t=Mt(30,a,e,t),t.elementType=Sp,t.lanes=o,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case Ka:l=10;break e;case yy:l=9;break e;case Oh:l=11;break e;case Nh:l=14;break e;case Fn:l=16,n=null;break e}l=29,a=Error(B(130,t===null?"null":typeof t,"")),n=null}return e=Mt(l,a,e,r),e.elementType=t,e.type=n,e.lanes=o,e}function Xr(t,e,a,n){return t=Mt(7,t,n,e),t.lanes=a,t}function ep(t,e,a){return t=Mt(6,t,null,e),t.lanes=a,t}function tb(t){var e=Mt(18,null,null,0);return e.stateNode=t,e}function tp(t,e,a){return e=Mt(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var $0=new WeakMap;function ga(t,e){if(typeof t=="object"&&t!==null){var a=$0.get(t);return a!==void 0?a:(e={value:t,source:e,stack:N0(e)},$0.set(t,e),e)}return{value:t,source:e,stack:N0(e)}}var dl=[],pl=0,pf=null,ti=0,pa=[],ha=0,or=null,ja=1,Ya="";function un(t,e){dl[pl++]=ti,dl[pl++]=pf,pf=t,ti=e}function ab(t,e,a){pa[ha++]=ja,pa[ha++]=Ya,pa[ha++]=or,or=t;var n=ja;t=Ya;var r=32-Wt(n)-1;n&=~(1<<r),a+=1;var o=32-Wt(e)+r;if(30<o){var l=r-r%5;o=(n&(1<<l)-1).toString(32),n>>=l,r-=l,ja=1<<32-Wt(e)+r|a<<r|n,Ya=o+t}else ja=1<<o|a<<r|n,Ya=t}function Gf(t){t.return!==null&&(un(t,1),ab(t,1,0))}function Vh(t){for(;t===pf;)pf=dl[--pl],dl[pl]=null,ti=dl[--pl],dl[pl]=null;for(;t===or;)or=pa[--ha],pa[ha]=null,Ya=pa[--ha],pa[ha]=null,ja=pa[--ha],pa[ha]=null}function nb(t,e){pa[ha++]=ja,pa[ha++]=Ya,pa[ha++]=or,ja=e.id,Ya=e.overflow,or=t}var lt=null,Ce=null,J=!1,Jn=null,xa=!1,Rp=Error(B(519));function lr(t){var e=Error(B(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ai(ga(e,t)),Rp}function ex(t){var e=t.stateNode,a=t.type,n=t.memoizedProps;switch(e[ft]=t,e[Rt]=n,a){case"dialog":W("cancel",e),W("close",e);break;case"iframe":case"object":case"embed":W("load",e);break;case"video":case"audio":for(a=0;a<li.length;a++)W(li[a],e);break;case"source":W("error",e);break;case"img":case"image":case"link":W("error",e),W("load",e);break;case"details":W("toggle",e);break;case"input":W("invalid",e),Dy(e,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0);break;case"select":W("invalid",e);break;case"textarea":W("invalid",e),My(e,n.value,n.defaultValue,n.children)}a=n.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||n.suppressHydrationWarning===!0||H1(e.textContent,a)?(n.popover!=null&&(W("beforetoggle",e),W("toggle",e)),n.onScroll!=null&&W("scroll",e),n.onScrollEnd!=null&&W("scrollend",e),n.onClick!=null&&(e.onclick=Xa),e=!0):e=!1,e||lr(t,!0)}function hf(t){for(lt=t.return;lt;)switch(lt.tag){case 5:case 31:case 13:xa=!1;return;case 27:case 3:xa=!0;return;default:lt=lt.return}}function Wo(t){if(t!==lt)return!1;if(!J)return hf(t),J=!0,!1;var e=t.tag,a;if((a=e!==3&&e!==27)&&((a=e===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||vh(t.type,t.memoizedProps)),a=!a),a&&Ce&&lr(t),hf(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(B(317));Ce=Jx(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(B(317));Ce=Jx(t)}else e===27?(e=Ce,cr(t.type)?(t=Ih,Ih=null,Ce=t):Ce=e):Ce=lt?ya(t.stateNode.nextSibling):null;return!0}function Zr(){Ce=lt=null,J=!1}function ap(){var t=Jn;return t!==null&&(Dt===null?Dt=t:Dt.push.apply(Dt,t),Jn=null),t}function ai(t){Jn===null?Jn=[t]:Jn.push(t)}var Hp=$a(null),uo=null,fn=null;function Qn(t,e,a){Se(Hp,e._currentValue),e._currentValue=a}function dn(t){t._currentValue=Hp.current,dt(Hp)}function Qu(t,e,a){for(;t!==null;){var n=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,n!==null&&(n.childLanes|=e)):n!==null&&(n.childLanes&e)!==e&&(n.childLanes|=e),t===a)break;t=t.return}}function Fp(t,e,a,n){var r=t.child;for(r!==null&&(r.return=t);r!==null;){var o=r.dependencies;if(o!==null){var l=r.child;o=o.firstContext;e:for(;o!==null;){var s=o;o=r;for(var i=0;i<e.length;i++)if(s.context===e[i]){o.lanes|=a,s=o.alternate,s!==null&&(s.lanes|=a),Qu(o.return,a,t),n||(l=null);break e}o=s.next}}else if(r.tag===18){if(l=r.return,l===null)throw Error(B(341));l.lanes|=a,o=l.alternate,o!==null&&(o.lanes|=a),Qu(l,a,t),l=null}else r.tag===13&&r.memoizedState!==null&&r.memoizedState.dehydrated===null?(r.lanes|=a,l=r.alternate,l!==null&&(l.lanes|=a),Qu(r.return,a,t),l=r.child,l=l!==null?l.sibling:null):l=r.child;if(l!==null)l.return=r;else for(l=r;l!==null;){if(l===t){l=null;break}if(r=l.sibling,r!==null){r.return=l.return,l=r;break}l=l.return}r=l}}function Wr(t,e,a,n){t=null;for(var r=e,o=!1;r!==null;){if(!o){if((r.flags&524288)!==0)o=!0;else if((r.flags&262144)!==0)break}if(r.tag===10){var l=r.alternate;if(l===null)throw Error(B(387));if(l=l.memoizedProps,l!==null){var s=r.type;ea(r.pendingProps.value,l.value)||(t!==null?t.push(s):t=[s])}}else if(r===of.current){if(l=r.alternate,l===null)throw Error(B(387));l.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(t!==null?t.push(Ml):t=[Ml])}r=r.return}return t!==null&&Fp(e,t,a,n),e.flags|=262144,t!==null}function mf(t){for(t=t.firstContext;t!==null;){if(!ea(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function $r(t){uo=t,fn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ct(t){return rb(uo,t)}function Eu(t,e){return uo===null&&$r(t),rb(t,e)}function rb(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},fn===null){if(t===null)throw Error(B(308));fn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else fn=fn.next=e;return a}var d2=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,n){t.push(n)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},p2=$e.unstable_scheduleCallback,h2=$e.unstable_NormalPriority,Xe={$$typeof:Ka,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Qh(){return{controller:new d2,data:new Map,refCount:0}}function bi(t){t.refCount--,t.refCount===0&&p2(h2,function(){t.controller.abort()})}function tx(t,e){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<e.length;t++){var n=e[t];a.indexOf(n)===-1&&a.push(n)}}}var Ps=null;function m2(t){var e=t.transitionTypes;return t.transitionTypes=null,e}var qs=null,qp=0,eo=0,yl=null;function g2(t,e){if(qs===null){var a=qs=[];qp=0,eo=bm(),yl={status:"pending",value:void 0,then:function(n){a.push(n)}}}return qp++,e.then(ax,ax),e}function ax(){if(--qp===0&&(Ps=null,qs!==null)){yl!==null&&(yl.status="fulfilled");var t=qs;qs=null,eo=0,yl=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function x2(t,e){var a=[],n={status:"pending",value:null,reason:null,then:function(r){a.push(r)}};return t.then(function(){n.status="fulfilled",n.value=e;for(var r=0;r<a.length;r++)(0,a[r])(e)},function(r){for(n.status="rejected",n.reason=r,r=0;r<a.length;r++)(0,a[r])(void 0)}),n}var nx=_.S;_.S=function(t,e){if(v1=Jt(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&g2(t,e),Ps!==null)for(var a=kl;a!==null;)tx(a,Ps),a=a.next;if(a=t.types,a!==null){for(var n=kl;n!==null;)tx(n,a),n=n.next;if(eo!==0){n=Ps,n===null&&(n=Ps=[]);for(var r=0;r<a.length;r++){var o=a[r];n.indexOf(o)===-1&&n.push(o)}}}nx!==null&&nx(t,e)};var jr=$a(null);function Kh(){var t=jr.current;return t!==null?t:we.pooledCache}function Ku(t,e){e===null?Se(jr,jr.current):Se(jr,e.pool)}function ob(){var t=Kh();return t===null?null:{parent:Xe._currentValue,pool:t}}var Fl=Error(B(460)),Xh=Error(B(474)),_f=Error(B(542)),gf={then:function(){}};function rx(t){return t=t.status,t==="fulfilled"||t==="rejected"}function lb(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(Xa,Xa),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,lx(t),t===void 0&&!("reason"in e)?Error(B(600)):t;default:if(typeof e.status=="string")e.then(Xa,Xa);else{if(t=we,t!==null&&100<t.shellSuspendCounter)throw Error(B(482));t=e,t.status="pending",t.then(function(n){if(e.status==="pending"){var r=e;r.status="fulfilled",r.value=n}},function(n){if(e.status==="pending"){var r=e;r.status="rejected",r.reason=n}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,lx(t),t}throw Yr=e,Fl}}function Gr(t){try{var e=t._init;return e(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Yr=a,Fl):a}}var Yr=null;function ox(){if(Yr===null)throw Error(B(459));var t=Yr;return Yr=null,t}function lx(t){if(t===Fl||t===_f)throw Error(B(483))}var bl=null,ni=0;function Tu(t){var e=ni;return ni+=1,bl===null&&(bl=[]),lb(bl,t,e)}function zn(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function Bu(t,e){throw e.$$typeof===ZA?Error(B(525)):(t=Object.prototype.toString.call(e),Error(B(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function sb(t){function e(m,g){if(t){var x=m.deletions;x===null?(m.deletions=[g],m.flags|=16):x.push(g)}}function a(m,g){if(!t)return null;for(;g!==null;)e(m,g),g=g.sibling;return null}function n(m){for(var g=new Map;m!==null;)m.key===null?g.set(m.index,m):g.set(m.key,m),m=m.sibling;return g}function r(m,g){return m=cn(m,g),m.index=0,m.sibling=null,m}function o(m,g,x){return m.index=x,t?(x=m.alternate,x!==null?(x=x.index,x<g?(m.flags|=2,g):x):(m.flags|=134217730,g)):(m.flags|=1048576,g)}function l(m){return t&&m.alternate===null&&(m.flags|=134217730),m}function s(m,g,x,L){return g===null||g.tag!==6?(g=ep(x,m.mode,L),g.return=m,g):(g=r(g,x),g.return=m,g)}function i(m,g,x,L){var A=x.type;return A===rl?(m=f(m,g,x.props.children,L,x.key),zn(m,x),m):g!==null&&(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Fn&&Gr(A)===g.type)?(g=r(g,x.props),zn(g,x),g.return=m,g):(g=Vu(x.type,x.key,x.props,null,m.mode,L),zn(g,x),g.return=m,g)}function u(m,g,x,L){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=tp(x,m.mode,L),g.return=m,g):(g=r(g,x.children||[]),g.return=m,g)}function f(m,g,x,L,A){return g===null||g.tag!==7?(g=Xr(x,m.mode,L,A),g.return=m,g):(g=r(g,x),g.return=m,g)}function d(m,g,x){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=ep(""+g,m.mode,x),g.return=m,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case bu:return x=Vu(g.type,g.key,g.props,null,m.mode,x),zn(x,g),x.return=m,x;case Ds:return g=tp(g,m.mode,x),g.return=m,g;case Fn:return g=Gr(g),d(m,g,x)}if(Us(g)||Es(g))return g=Xr(g,m.mode,x,null),g.return=m,g;if(typeof g.then=="function")return d(m,Tu(g),x);if(g.$$typeof===Ka)return d(m,Eu(m,g),x);Bu(m,g)}return null}function p(m,g,x,L){var A=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return A!==null?null:s(m,g,""+x,L);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case bu:return x.key===A?i(m,g,x,L):null;case Ds:return x.key===A?u(m,g,x,L):null;case Fn:return x=Gr(x),p(m,g,x,L)}if(Us(x)||Es(x))return A!==null?null:f(m,g,x,L,null);if(typeof x.then=="function")return p(m,g,Tu(x),L);if(x.$$typeof===Ka)return p(m,g,Eu(m,x),L);Bu(m,x)}return null}function h(m,g,x,L,A){if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return m=m.get(x)||null,s(g,m,""+L,A);if(typeof L=="object"&&L!==null){switch(L.$$typeof){case bu:return m=m.get(L.key===null?x:L.key)||null,i(g,m,L,A);case Ds:return m=m.get(L.key===null?x:L.key)||null,u(g,m,L,A);case Fn:return L=Gr(L),h(m,g,x,L,A)}if(Us(L)||Es(L))return m=m.get(x)||null,f(g,m,L,A,null);if(typeof L.then=="function")return h(m,g,x,Tu(L),A);if(L.$$typeof===Ka)return h(m,g,x,Eu(g,L),A);Bu(g,L)}return null}function w(m,g,x,L){for(var A=null,T=null,E=g,I=g=0,P=null;E!==null&&I<x.length;I++){E.index>I?(P=E,E=null):P=E.sibling;var k=p(m,E,x[I],L);if(k===null){E===null&&(E=P);break}t&&E&&k.alternate===null&&e(m,E),g=o(k,g,I),T===null?A=k:T.sibling=k,T=k,E=P}if(I===x.length)return a(m,E),J&&un(m,I),A;if(E===null){for(;I<x.length;I++)E=d(m,x[I],L),E!==null&&(g=o(E,g,I),T===null?A=E:T.sibling=E,T=E);return J&&un(m,I),A}for(E=n(E);I<x.length;I++)P=h(E,m,I,x[I],L),P!==null&&(t&&(k=P.alternate,k!==null&&E.delete(k.key===null?I:k.key)),g=o(P,g,I),T===null?A=P:T.sibling=P,T=P);return t&&E.forEach(function(H){return e(m,H)}),J&&un(m,I),A}function y(m,g,x,L){if(x==null)throw Error(B(151));for(var A=null,T=null,E=g,I=g=0,P=null,k=x.next();E!==null&&!k.done;I++,k=x.next()){E.index>I?(P=E,E=null):P=E.sibling;var H=p(m,E,k.value,L);if(H===null){E===null&&(E=P);break}t&&E&&H.alternate===null&&e(m,E),g=o(H,g,I),T===null?A=H:T.sibling=H,T=H,E=P}if(k.done)return a(m,E),J&&un(m,I),A;if(E===null){for(;!k.done;I++,k=x.next())k=d(m,k.value,L),k!==null&&(g=o(k,g,I),T===null?A=k:T.sibling=k,T=k);return J&&un(m,I),A}for(E=n(E);!k.done;I++,k=x.next())k=h(E,m,I,k.value,L),k!==null&&(t&&(P=k.alternate,P!==null&&E.delete(P.key===null?I:P.key)),g=o(k,g,I),T===null?A=k:T.sibling=k,T=k);return t&&E.forEach(function(F){return e(m,F)}),J&&un(m,I),A}function v(m,g,x,L){if(typeof x=="object"&&x!==null&&x.type===rl&&x.key===null&&x.props.ref===void 0&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case bu:e:{for(var A=x.key;g!==null;){if(g.key===A){if(A=x.type,A===rl){if(g.tag===7){a(m,g.sibling),L=r(g,x.props.children),zn(L,x),L.return=m,m=L;break e}}else if(g.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Fn&&Gr(A)===g.type){a(m,g.sibling),L=r(g,x.props),zn(L,x),L.return=m,m=L;break e}a(m,g);break}else e(m,g);g=g.sibling}x.type===rl?(L=Xr(x.props.children,m.mode,L,x.key),zn(L,x),L.return=m,m=L):(L=Vu(x.type,x.key,x.props,null,m.mode,L),zn(L,x),L.return=m,m=L)}return l(m);case Ds:e:{for(A=x.key;g!==null;){if(g.key===A)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){a(m,g.sibling),L=r(g,x.children||[]),L.return=m,m=L;break e}else{a(m,g);break}else e(m,g);g=g.sibling}L=tp(x,m.mode,L),L.return=m,m=L}return l(m);case Fn:return x=Gr(x),v(m,g,x,L)}if(Us(x))return w(m,g,x,L);if(Es(x)){if(A=Es(x),typeof A!="function")throw Error(B(150));return x=A.call(x),y(m,g,x,L)}if(typeof x.then=="function")return v(m,g,Tu(x),L);if(x.$$typeof===Ka)return v(m,g,Eu(m,x),L);Bu(m,x)}return typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint"?(x=""+x,g!==null&&g.tag===6?(a(m,g.sibling),L=r(g,x),L.return=m,m=L):(a(m,g),L=ep(x,m.mode,L),L.return=m,m=L),l(m)):a(m,g)}return function(m,g,x,L){try{ni=0;var A=v(m,g,x,L);return bl=null,A}catch(E){if(E===Fl||E===_f)throw E;var T=Mt(29,E,null,m.mode);return T.lanes=L,T.return=m,T}finally{}}}var to=sb(!0),ib=sb(!1),qn=!1;function jh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Gp(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Zn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Wn(t,e,a){var n=t.updateQueue;if(n===null)return null;if(n=n.shared,(ce&2)!==0){var r=n.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),n.pending=e,e=df(t),$y(t,null,a),e}return qf(t,n,e,a),df(t)}function Gs(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194048)!==0)){var n=e.lanes;n&=t.pendingLanes,a|=n,e.lanes=a,Sy(t,a)}}function np(t,e){var a=t.updateQueue,n=t.alternate;if(n!==null&&(n=n.updateQueue,a===n)){var r=null,o=null;if(a=a.firstBaseUpdate,a!==null){do{var l={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};o===null?r=o=l:o=o.next=l,a=a.next}while(a!==null);o===null?r=o=e:o=o.next=e}else r=o=e;a={baseState:n.baseState,firstBaseUpdate:r,lastBaseUpdate:o,shared:n.shared,callbacks:n.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var _p=!1;function _s(){if(_p){var t=yl;if(t!==null)throw t}}function Vs(t,e,a,n){_p=!1;var r=t.updateQueue;qn=!1;var o=r.firstBaseUpdate,l=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var i=s,u=i.next;i.next=null,l===null?o=u:l.next=u,l=i;var f=t.alternate;f!==null&&(f=f.updateQueue,s=f.lastBaseUpdate,s!==l&&(s===null?f.firstBaseUpdate=u:s.next=u,f.lastBaseUpdate=i))}if(o!==null){var d=r.baseState;l=0,f=u=i=null,s=o;do{var p=s.lane&-536870913,h=p!==s.lane;if(h?(ae&p)===p:(n&p)===p){p!==0&&p===eo&&(_p=!0),f!==null&&(f=f.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var w=t,y=s;p=e;var v=a;switch(y.tag){case 1:if(w=y.payload,typeof w=="function"){d=w.call(v,d,p);break e}d=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=y.payload,p=typeof w=="function"?w.call(v,d,p):w,p==null)break e;d=Le({},d,p);break e;case 2:qn=!0}}p=s.callback,p!==null&&(t.flags|=64,h&&(t.flags|=8192),h=r.callbacks,h===null?r.callbacks=[p]:h.push(p))}else h={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},f===null?(u=f=h,i=d):f=f.next=h,l|=p;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;h=s,s=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);f===null&&(i=d),r.baseState=i,r.firstBaseUpdate=u,r.lastBaseUpdate=f,o===null&&(r.shared.lanes=0),ur|=l,t.lanes=l,t.memoizedState=d}}function ub(t,e){if(typeof t!="function")throw Error(B(191,t));t.call(e)}function fb(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ub(a[t],e)}var sr=$a(null),xf=$a(0);function sx(t,e){t=yn,Se(xf,t),Se(sr,e),yn=t|e.baseLanes}function Vp(){Se(xf,yn),Se(sr,sr.current)}function Yh(){yn=xf.current,dt(sr),dt(xf)}var mt=$a(null),bt=null;function $n(t){var e=t.alternate;Se(pt,pt.current&1),Se(mt,t),bt===null&&(e===null||sr.current!==null||e.memoizedState!==null)&&(bt=t)}function Qp(t){Se(pt,pt.current),Se(mt,t),bt===null&&(bt=t)}function cb(t){t.tag===22?(Se(pt,pt.current),Se(mt,t),bt===null&&(bt=t)):er()}function er(){Se(pt,pt.current),Se(mt,mt.current)}function Xt(t){dt(mt),bt===t&&(bt=null),dt(pt)}var pt=$a(0);function ri(t,e){Se(mt,mt.current),Se(pt,e)}function Jh(t){dt(pt),dt(mt),bt===t&&(bt=null)}function yf(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Sh(a)||Am(a)))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!=="independent"){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var mn=0,X=null,ye=null,Ke=null,bf=!1,wl=!1,ao=!1,wf=0,oi=0,Ll=null,y2=0;function ze(){throw Error(B(321))}function Zh(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!ea(t[a],e[a]))return!1;return!0}function Wh(t,e,a,n,r,o){return mn=o,X=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_.H=t===null||t.memoizedState===null?Gb:_b,ao=!1,o=a(n,r),ao=!1,wl&&(o=pb(e,a,n,r)),db(t),o}function db(t){_.H=Lf;var e=ye!==null&&ye.next!==null;if(mn=0,Ke=ye=X=null,bf=!1,oi=0,Ll=null,e)throw Error(B(300));t===null||je||(t=t.dependencies,t!==null&&mf(t)&&(je=!0))}function pb(t,e,a,n){X=t;var r=0;do{if(wl&&(Ll=null),oi=0,wl=!1,25<=r)throw Error(B(301));if(r+=1,Ke=ye=null,t.updateQueue!=null){var o=t.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}_.H=I2,o=e(a,n)}while(wl);return o}function b2(){var t=_.H,e=t.useState()[0];return e=typeof e.then=="function"?wi(e):e,t=t.useState()[0],(ye!==null?ye.memoizedState:null)!==t&&(X.flags|=1024),e}function $h(){var t=wf!==0;return wf=0,t}function em(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function tm(t){if(bf){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}bf=!1}mn=0,Ke=ye=X=null,wl=!1,oi=wf=0,Ll=null}function St(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ke===null?X.memoizedState=Ke=t:Ke=Ke.next=t,Ke}function qe(){if(ye===null){var t=X.alternate;t=t!==null?t.memoizedState:null}else t=ye.next;var e=Ke===null?X.memoizedState:Ke.next;if(e!==null)Ke=e,ye=t;else{if(t===null)throw X.alternate===null?Error(B(467)):Error(B(310));ye=t,t={memoizedState:ye.memoizedState,baseState:ye.baseState,baseQueue:ye.baseQueue,queue:ye.queue,next:null},Ke===null?X.memoizedState=Ke=t:Ke=Ke.next=t}return Ke}function Vf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function wi(t){var e=oi;return oi+=1,Ll===null&&(Ll=[]),t=lb(Ll,t,e),e=X,(Ke===null?e.memoizedState:Ke.next)===null&&(e=e.alternate,_.H=e===null||e.memoizedState===null?Gb:_b),t}function Qf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return wi(t);if(t.$$typeof===eC)return;if(t.$$typeof===Ka)return ct(t)}throw Error(B(438,String(t)))}function am(t){var e=null,a=X.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var n=X.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(e={data:n.data.map(function(r){return r.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=Vf(),X.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),n=0;n<t;n++)a[n]=$A;return e.index++,a}function gn(t,e){return typeof e=="function"?e(t):e}function Xu(t){var e=qe();return nm(e,ye,t)}function nm(t,e,a){var n=t.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=a;var r=t.baseQueue,o=n.pending;if(o!==null){if(r!==null){var l=r.next;r.next=o.next,o.next=l}e.baseQueue=r=o,n.pending=null}if(o=t.baseState,r===null)t.memoizedState=o;else{e=r.next;var s=l=null,i=null,u=e,f=!1;do{var d=u.lane&-536870913;if(d!==u.lane?(ae&d)===d:(mn&d)===d){var p=u.revertLane;if(p===0)i!==null&&(i=i.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),d===eo&&(f=!0);else if((mn&p)===p){u=u.next,p===eo&&(f=!0);continue}else d={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},i===null?(s=i=d,l=o):i=i.next=d,X.lanes|=p,ur|=p;d=u.action,ao&&a(o,d),o=u.hasEagerState?u.eagerState:a(o,d)}else p={lane:d,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},i===null?(s=i=p,l=o):i=i.next=p,X.lanes|=d,ur|=d;u=u.next}while(u!==null&&u!==e);if(i===null?l=o:i.next=s,!ea(o,t.memoizedState)&&(je=!0,f&&(a=yl,a!==null)))throw a;t.memoizedState=o,t.baseState=l,t.baseQueue=i,n.lastRenderedState=o}return r===null&&(n.lanes=0),[t.memoizedState,n.dispatch]}function rp(t){var e=qe(),a=e.queue;if(a===null)throw Error(B(311));a.lastRenderedReducer=t;var n=a.dispatch,r=a.pending,o=e.memoizedState;if(r!==null){a.pending=null;var l=r=r.next;do o=t(o,l.action),l=l.next;while(l!==r);ea(o,e.memoizedState)||(je=!0),e.memoizedState=o,e.baseQueue===null&&(e.baseState=o),a.lastRenderedState=o}return[o,n]}function hb(t,e,a){var n=X,r=qe(),o=J;if(o){if(a===void 0)throw Error(B(407));a=a()}else a=e();var l=!ea((ye||r).memoizedState,a);if(l&&(r.memoizedState=a,je=!0),r=r.queue,rm(xb.bind(null,n,r,t),[t]),t=r.getSnapshot!==e||l||Ke!==null&&(Ke.memoizedState.tag&1)!==0,Tl(t?9:8,{destroy:void 0},gb.bind(null,n,r,a,e),null),t){if(n.flags|=2048,we===null)throw Error(B(349));o||(mn&127)!==0||mb(n,e,a)}return a}function mb(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=X.updateQueue,e===null?(e=Vf(),X.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function gb(t,e,a,n){e.value=a,e.getSnapshot=n,yb(e)&&bb(t)}function xb(t,e,a){return a(function(){yb(e)&&bb(t)})}function yb(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!ea(t,a)}catch{return!0}}function bb(t){var e=io(t,2);e!==null&&Pt(e,t,2)}function Kp(t){var e=St();if(typeof t=="function"){var a=t;if(t=a(),ao){_n(!0);try{a()}finally{_n(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:t},e}function wb(t,e,a,n){return t.baseState=a,nm(t,ye,typeof n=="function"?n:gn)}function w2(t,e,a,n,r){if(Xf(t))throw Error(B(485));if(t=e.action,t!==null){var o={payload:r,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(l){o.listeners.push(l)}};_.T!==null?a(!0):o.isTransition=!1,n(o),a=e.pending,a===null?(o.next=e.pending=o,Lb(e,o)):(o.next=a.next,e.pending=a.next=o)}}function Lb(t,e){var a=e.action,n=e.payload,r=t.state;if(e.isTransition){var o=_.T,l={};l.types=o!==null?o.types:null,_.T=l;try{var s=a(r,n),i=_.S;i!==null&&i(l,s),ix(t,e,s)}catch(u){Xp(t,e,u)}finally{o!==null&&l.types!==null&&(o.types=l.types),_.T=o}}else try{o=a(r,n),ix(t,e,o)}catch(u){Xp(t,e,u)}}function ix(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(n){ux(t,e,n)},function(n){return Xp(t,e,n)}):ux(t,e,a)}function ux(t,e,a){e.status="fulfilled",e.value=a,vb(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,Lb(t,a)))}function Xp(t,e,a){var n=t.pending;if(t.pending=null,n!==null){n=n.next;do e.status="rejected",e.reason=a,vb(e),e=e.next;while(e!==n)}t.action=null}function vb(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ab(t,e){return e}function fx(t,e){if(J){var a=we.formState;if(a!==null){e:{var n=X;if(J){if(Ce){t:{for(var r=Ce,o=xa;r.nodeType!==8;){if(!o){r=null;break t}if(r=ya(r.nextSibling),r===null){r=null;break t}}o=r.data,r=o==="F!"||o==="F"?r:null}if(r){Ce=ya(r.nextSibling),n=r.data==="F!";break e}}lr(n)}n=!1}n&&(e=a[0])}}return a=St(),a.memoizedState=a.baseState=e,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ab,lastRenderedState:e},a.queue=n,a=Hb.bind(null,X,n),n.dispatch=a,n=Kp(!1),o=im.bind(null,X,!1,n.queue),n=St(),r={state:e,dispatch:null,action:t,pending:null},n.queue=r,a=w2.bind(null,X,r,o,a),r.dispatch=a,n.memoizedState=t,[e,a,!1]}function cx(t){var e=qe();return Cb(e,ye,t)}function Cb(t,e,a){if(e=nm(t,e,Ab)[0],t=Xu(gn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var n=wi(e)}catch(l){throw l===Fl?_f:l}else n=e;e=qe();var r=e.queue,o=r.dispatch;return a!==e.memoizedState&&(X.flags|=2048,Tl(9,{destroy:void 0},L2.bind(null,r,a),null)),[n,o,t]}function L2(t,e){t.action=e}function dx(t){var e=qe(),a=ye;if(a!==null)return Cb(e,a,t);qe(),e=e.memoizedState,a=qe();var n=a.queue.dispatch;return a.memoizedState=t,[e,n,!1]}function Tl(t,e,a,n){return t={tag:t,create:a,deps:n,inst:e,next:null},e=X.updateQueue,e===null&&(e=Vf(),X.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(n=a.next,a.next=t,t.next=n,e.lastEffect=t),t}function Sb(){return qe().memoizedState}function ju(t,e,a,n){var r=St();X.flags|=t,r.memoizedState=Tl(1|e,{destroy:void 0},a,n===void 0?null:n)}function Kf(t,e,a,n){var r=qe();n=n===void 0?null:n;var o=r.memoizedState.inst;ye!==null&&n!==null&&Zh(n,ye.memoizedState.deps)?r.memoizedState=Tl(e,o,a,n):(X.flags|=t,r.memoizedState=Tl(1|e,o,a,n))}function px(t,e){ju(8390656,8,t,e)}function rm(t,e){Kf(2048,8,t,e)}function v2(t){X.flags|=4;var e=X.updateQueue;if(e===null)e=Vf(),X.updateQueue=e,e.events=[t];else{var a=e.events;a===null?e.events=[t]:a.push(t)}}function Ib(t){var e=qe().memoizedState;return v2({ref:e,nextImpl:t}),function(){if((ce&2)!==0)throw Error(B(440));return e.impl.apply(void 0,arguments)}}function Eb(t,e){return Kf(4,2,t,e)}function Tb(t,e){return Kf(4,4,t,e)}function Bb(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ob(t,e,a){a=a!=null?a.concat([t]):null,Kf(4,4,Bb.bind(null,e,t),a)}function om(){}function Nb(t,e){var a=qe();e=e===void 0?null:e;var n=a.memoizedState;return e!==null&&Zh(e,n[1])?n[0]:(a.memoizedState=[t,e],t)}function kb(t,e){var a=qe();e=e===void 0?null:e;var n=a.memoizedState;if(e!==null&&Zh(e,n[1]))return n[0];if(n=t(),ao){_n(!0);try{t()}finally{_n(!1)}}return a.memoizedState=[n,e],n}function lm(t,e,a){return a===void 0||(mn&1073741824)!==0&&(ae&261930)===0?t.memoizedState=e:(t.memoizedState=a,t=C1(),X.lanes|=t,ur|=t,a)}function Db(t,e,a,n){return ea(a,e)?a:sr.current!==null?(t=lm(t,a,n),ea(t,e)||(je=!0),t):(mn&106)===0||(mn&1073741824)!==0&&(ae&261930)===0?(je=!0,t.memoizedState=a):(t=C1(),X.lanes|=t,ur|=t,e)}function Ub(t,e,a,n,r){var o=de.p;de.p=o!==0&&8>o?o:8;var l=_.T,s={};s.types=l!==null?l.types:null,_.T=s,im(t,!1,e,a);try{var i=r(),u=_.S;if(u!==null&&u(s,i),i!==null&&typeof i=="object"&&typeof i.then=="function"){var f=x2(i,n);Qs(t,e,f,$t(t))}else Qs(t,e,n,$t(t))}catch(d){Qs(t,e,{then:function(){},status:"rejected",reason:d},$t())}finally{de.p=o,l!==null&&s.types!==null&&(l.types=s.types),_.T=l}}function A2(){}function jp(t,e,a,n){if(t.tag!==5)throw Error(B(476));var r=Mb(t).queue;Ub(t,r,e,Kr,a===null?A2:function(){return Pb(t),a(n)})}function Mb(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Kr,baseState:Kr,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:Kr},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Pb(t){var e=Mb(t);e.next===null&&(e=t.alternate.memoizedState),Qs(t,e.next.queue,{},$t())}function sm(){return ct(Ml)}function zb(){return qe().memoizedState}function Rb(){return qe().memoizedState}function C2(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=$t();t=Zn(a);var n=Wn(e,t,a);n!==null&&(Pt(n,e,a),Gs(n,e,a)),e={cache:Qh()},t.payload=e;return}e=e.return}}function S2(t,e,a){var n=$t();a={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Xf(t)?Fb(e,a):(a=Gh(t,e,a,n),a!==null&&(Pt(a,t,n),qb(a,e,n)))}function Hb(t,e,a){var n=$t();Qs(t,e,a,n)}function Qs(t,e,a,n){var r={lane:n,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Xf(t))Fb(e,r);else{var o=t.alternate;if(t.lanes===0&&(o===null||o.lanes===0)&&(o=e.lastRenderedReducer,o!==null))try{var l=e.lastRenderedState,s=o(l,a);if(r.hasEagerState=!0,r.eagerState=s,ea(s,l))return qf(t,e,r,0),we===null&&Ff(),!1}catch{}finally{}if(a=Gh(t,e,r,n),a!==null)return Pt(a,t,n),qb(a,e,n),!0}return!1}function im(t,e,a,n){if(n={lane:2,revertLane:bm(),gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Xf(t)){if(e)throw Error(B(479))}else e=Gh(t,a,n,2),e!==null&&Pt(e,t,2)}function Xf(t){var e=t.alternate;return t===X||e!==null&&e===X}function Fb(t,e){wl=bf=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function qb(t,e,a){if((a&4194048)!==0){var n=e.lanes;n&=t.pendingLanes,a|=n,e.lanes=a,Sy(t,a)}}var Lf={readContext:ct,use:Qf,useCallback:ze,useContext:ze,useEffect:ze,useImperativeHandle:ze,useLayoutEffect:ze,useInsertionEffect:ze,useMemo:ze,useReducer:ze,useRef:ze,useState:ze,useDebugValue:ze,useDeferredValue:ze,useTransition:ze,useSyncExternalStore:ze,useId:ze,useHostTransitionStatus:ze,useFormState:ze,useActionState:ze,useOptimistic:ze,useMemoCache:ze,useCacheRefresh:ze,useEffectEvent:ze},Gb={readContext:ct,use:Qf,useCallback:function(t,e){return St().memoizedState=[t,e===void 0?null:e],t},useContext:ct,useEffect:px,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,ju(4194308,4,Bb.bind(null,e,t),a)},useLayoutEffect:function(t,e){return ju(4194308,4,t,e)},useInsertionEffect:function(t,e){ju(4,2,t,e)},useMemo:function(t,e){var a=St();e=e===void 0?null:e;var n=t();if(ao){_n(!0);try{t()}finally{_n(!1)}}return a.memoizedState=[n,e],n},useReducer:function(t,e,a){var n=St();if(a!==void 0){var r=a(e);if(ao){_n(!0);try{a(e)}finally{_n(!1)}}}else r=e;return n.memoizedState=n.baseState=r,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},n.queue=t,t=t.dispatch=S2.bind(null,X,t),[n.memoizedState,t]},useRef:function(t){var e=St();return t={current:t},e.memoizedState=t},useState:function(t){t=Kp(t);var e=t.queue,a=Hb.bind(null,X,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:om,useDeferredValue:function(t,e){var a=St();return lm(a,t,e)},useTransition:function(){var t=Kp(!1);return t=Ub.bind(null,X,t.queue,!0,!1),St().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var n=X,r=St();if(J){if(a===void 0)throw Error(B(407));a=a()}else{if(a=e(),we===null)throw Error(B(349));(ae&127)!==0||mb(n,e,a)}r.memoizedState=a;var o={value:a,getSnapshot:e};return r.queue=o,px(xb.bind(null,n,o,t),[t]),n.flags|=2048,Tl(9,{destroy:void 0},gb.bind(null,n,o,a,e),null),a},useId:function(){var t=St(),e=we.identifierPrefix;if(J){var a=Ya,n=ja;a=(n&~(1<<32-Wt(n)-1)).toString(32)+a,e="_"+e+"R_"+a,a=wf++,0<a&&(e+="H"+a.toString(32)),e+="_"}else a=y2++,e="_"+e+"r_"+a.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:sm,useFormState:fx,useActionState:fx,useOptimistic:function(t){var e=St();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=im.bind(null,X,!0,a),a.dispatch=e,[t,e]},useMemoCache:am,useCacheRefresh:function(){return St().memoizedState=C2.bind(null,X)},useEffectEvent:function(t){var e=St(),a={impl:t};return e.memoizedState=a,function(){if((ce&2)!==0)throw Error(B(440));return a.impl.apply(void 0,arguments)}}},_b={readContext:ct,use:Qf,useCallback:Nb,useContext:ct,useEffect:rm,useImperativeHandle:Ob,useInsertionEffect:Eb,useLayoutEffect:Tb,useMemo:kb,useReducer:Xu,useRef:Sb,useState:function(){return Xu(gn)},useDebugValue:om,useDeferredValue:function(t,e){var a=qe();return Db(a,ye.memoizedState,t,e)},useTransition:function(){var t=Xu(gn)[0],e=qe().memoizedState;return[typeof t=="boolean"?t:wi(t),e]},useSyncExternalStore:hb,useId:zb,useHostTransitionStatus:sm,useFormState:cx,useActionState:cx,useOptimistic:function(t,e){var a=qe();return wb(a,ye,t,e)},useMemoCache:am,useCacheRefresh:Rb,useEffectEvent:Ib},I2={readContext:ct,use:Qf,useCallback:Nb,useContext:ct,useEffect:rm,useImperativeHandle:Ob,useInsertionEffect:Eb,useLayoutEffect:Tb,useMemo:kb,useReducer:rp,useRef:Sb,useState:function(){return rp(gn)},useDebugValue:om,useDeferredValue:function(t,e){var a=qe();return ye===null?lm(a,t,e):Db(a,ye.memoizedState,t,e)},useTransition:function(){var t=rp(gn)[0],e=qe().memoizedState;return[typeof t=="boolean"?t:wi(t),e]},useSyncExternalStore:hb,useId:zb,useHostTransitionStatus:sm,useFormState:dx,useActionState:dx,useOptimistic:function(t,e){var a=qe();return ye!==null?wb(a,ye,t,e):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:am,useCacheRefresh:Rb,useEffectEvent:Ib};function op(t,e,a,n){e=t.memoizedState,a=a(n,e),a=a==null?e:Le({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Yp={enqueueSetState:function(t,e,a){t=t._reactInternals;var n=$t(),r=Zn(n);r.payload=e,a!=null&&(r.callback=a),e=Wn(t,r,n),e!==null&&(Pt(e,t,n),Gs(e,t,n))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var n=$t(),r=Zn(n);r.tag=1,r.payload=e,a!=null&&(r.callback=a),e=Wn(t,r,n),e!==null&&(Pt(e,t,n),Gs(e,t,n))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=$t(),n=Zn(a);n.tag=2,e!=null&&(n.callback=e),e=Wn(t,n,a),e!==null&&(Pt(e,t,a),Gs(e,t,a))}};function hx(t,e,a,n,r,o,l){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(n,o,l):e.prototype&&e.prototype.isPureReactComponent?!ei(a,n)||!ei(r,o):!0}function mx(t,e,a,n){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,n),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,n),e.state!==t&&Yp.enqueueReplaceState(e,e.state,null)}function no(t,e){var a=e;if("ref"in e){a={};for(var n in e)n!=="ref"&&(a[n]=e[n])}if(t=t.defaultProps){a===e&&(a=Le({},a));for(var r in t)a[r]===void 0&&(a[r]=t[r])}return a}function Vb(t){cf(t)}function Qb(t){console.error(t)}function Kb(t){cf(t)}function vf(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(n){setTimeout(function(){throw n})}}function gx(t,e,a){try{var n=t.onCaughtError;n(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function Jp(t,e,a){return a=Zn(a),a.tag=3,a.payload={element:null},a.callback=function(){vf(t,e)},a}function Xb(t){return t=Zn(t),t.tag=3,t}function jb(t,e,a,n){var r=a.type.getDerivedStateFromError;if(typeof r=="function"){var o=n.value;t.payload=function(){return r(o)},t.callback=function(){gx(e,a,n)}}var l=a.stateNode;l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){gx(e,a,n),typeof r!="function"&&(tr===null?tr=new Set([this]):tr.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})})}function E2(t,e,a,n,r){if(a.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(e=a.alternate,e!==null&&Wr(e,a,r,!0),a=mt.current,a!==null){switch(a.tag){case 31:case 13:case 19:return bt===null?Of():a.alternate===null&&Re===0&&(Re=3),a.flags&=-257,a.flags|=65536,a.lanes=r,n===gf?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([n]):e.add(n),dp(t,n,r)),!1;case 22:return a.flags|=65536,n===gf?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([n])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([n]):a.add(n)),dp(t,n,r)),!1}throw Error(B(435,a.tag))}return dp(t,n,r),Of(),!1}if(J)return e=mt.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=r,n!==Rp&&(t=Error(B(422),{cause:n}),ai(ga(t,a)))):(n!==Rp&&(e=Error(B(423),{cause:n}),ai(ga(e,a))),t=t.current.alternate,t.flags|=65536,r&=-r,t.lanes|=r,n=ga(n,a),r=Jp(t.stateNode,n,r),np(t,r),Re!==4&&(Re=2)),!1;var o=Error(B(520),{cause:n});if(o=ga(o,a),Ys===null?Ys=[o]:Ys.push(o),Re!==4&&(Re=2),e===null)return!0;n=ga(n,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=r&-r,a.lanes|=t,t=Jp(a.stateNode,n,t),np(a,t),!1;case 1:if(e=a.type,o=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(tr===null||!tr.has(o))))return a.flags|=65536,r&=-r,a.lanes|=r,r=Xb(r),jb(r,t,a,n),np(a,r),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var um=Error(B(461)),je=!1;function Ze(t,e,a,n){e.child=t===null?ib(e,null,a,n):to(e,t.child,a,n)}function xx(t,e,a,n,r){a=a.render;var o=e.ref;if("ref"in n){var l={};for(var s in n)s!=="ref"&&(l[s]=n[s])}else l=n;return $r(e),n=Wh(t,e,a,l,o,r),s=$h(),t!==null&&!je?(em(t,e,r),xn(t,e,r)):(J&&s&&Gf(e),e.flags|=1,Ze(t,e,n,r),e.child)}function yx(t,e,a,n,r){if(t===null){var o=a.type;return typeof o=="function"&&!_h(o)&&o.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=o,Yb(t,e,o,n,r)):(t=Vu(a.type,null,n,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(o=t.child,!cm(t,r)){var l=o.memoizedProps;if(a=a.compare,a=a!==null?a:ei,a(l,n)&&t.ref===e.ref)return xn(t,e,r)}return e.flags|=1,t=cn(o,n),t.ref=e.ref,t.return=e,e.child=t}function Yb(t,e,a,n,r){if(t!==null){var o=t.memoizedProps;if(ei(o,n)&&t.ref===e.ref)if(je=!1,e.pendingProps=n=o,cm(t,r))(t.flags&131072)!==0&&(je=!0);else return e.lanes=t.lanes,xn(t,e,r)}return Zp(t,e,a,n,r)}function Jb(t,e,a,n){var r=n.children,o=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.mode==="hidden"){if((e.flags&128)!==0){if(o=o!==null?o.baseLanes|a:a,t!==null){for(n=e.child=t.child,r=0;n!==null;)r=r|n.lanes|n.childLanes,n=n.sibling;n=r&~o}else n=0,e.child=null;return bx(t,e,o,a,n)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ku(e,o!==null?o.cachePool:null),o!==null?sx(e,o):Vp(),cb(e);else return n=e.lanes=536870912,bx(t,e,o!==null?o.baseLanes|a:a,a,n)}else o!==null?(Ku(e,o.cachePool),sx(e,o),er(),e.memoizedState=null):(t!==null&&Ku(e,null),Vp(),er());return Ze(t,e,r,a),e.child}function Ks(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function bx(t,e,a,n,r){var o=Kh();return o=o===null?null:{parent:Xe._currentValue,pool:o},e.memoizedState={baseLanes:a,cachePool:o},t!==null&&Ku(e,null),Vp(),cb(e),t!==null&&Wr(t,e,n,!0),e.childLanes=r,null}function Yu(t,e){return e=jf({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function wx(t,e,a){return to(e,t.child,null,a),t=Yu(e,e.pendingProps),t.flags|=2,Xt(e),e.memoizedState=null,t}function T2(t,e,a){var n=e.pendingProps,r=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(J){if(n.mode==="hidden")return t=Yu(e,n),e.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Ks(null,t);if(Qp(e),(t=Ce)?(t=J1(t,xa),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:or!==null?{id:ja,overflow:Ya}:null,retryLane:536870912,hydrationErrors:null},a=tb(t),a.return=e,e.child=a,lt=e,Ce=null)):t=null,t===null)throw lr(e);return e.lanes=536870912,null}return Yu(e,n)}var o=t.memoizedState;if(o!==null){var l=o.dehydrated;if(Qp(e),r)if(e.flags&256)e.flags&=-257,e=wx(t,e,a);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(B(558));else if(je||Wr(t,e,a,!1),r=(a&t.childLanes)!==0,je||r){if(sr.current===null){if(n=we,n!==null&&(l=Iy(n,a),l!==0&&l!==o.retryLane))throw o.retryLane=l,io(t,l),Pt(n,t,l),um;Of()}e=wx(t,e,a)}else t=o.treeContext,Ce=ya(l.nextSibling),lt=e,J=!0,Jn=null,xa=!1,t!==null&&nb(e,t),e=Yu(e,n),e.flags|=134221824;return e}return t=cn(t.child,{mode:n.mode,children:n.children}),t.ref=e.ref,e.child=t,t.return=e,t}function el(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(B(284));(t===null||t.ref!==a)&&(e.flags|=4194816)}}function Zp(t,e,a,n,r){return $r(e),a=Wh(t,e,a,n,void 0,r),n=$h(),t!==null&&!je?(em(t,e,r),xn(t,e,r)):(J&&n&&Gf(e),e.flags|=1,Ze(t,e,a,r),e.child)}function Lx(t,e,a,n,r,o){return $r(e),e.updateQueue=null,a=pb(e,n,a,r),db(t),n=$h(),t!==null&&!je?(em(t,e,o),xn(t,e,o)):(J&&n&&Gf(e),e.flags|=1,Ze(t,e,a,o),e.child)}function vx(t,e,a,n,r){if($r(e),e.stateNode===null){var o=cl,l=a.contextType;typeof l=="object"&&l!==null&&(o=ct(l)),o=new a(n,o),e.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=Yp,e.stateNode=o,o._reactInternals=e,o=e.stateNode,o.props=n,o.state=e.memoizedState,o.refs={},jh(e),l=a.contextType,o.context=typeof l=="object"&&l!==null?ct(l):cl,o.state=e.memoizedState,l=a.getDerivedStateFromProps,typeof l=="function"&&(op(e,a,l,n),o.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(l=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),l!==o.state&&Yp.enqueueReplaceState(o,o.state,null),Vs(e,n,o,r),_s(),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308),n=!0}else if(t===null){o=e.stateNode;var s=e.memoizedProps,i=no(a,s);o.props=i;var u=o.context,f=a.contextType;l=cl,typeof f=="object"&&f!==null&&(l=ct(f));var d=a.getDerivedStateFromProps;f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function",s=e.pendingProps!==s,f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s||u!==l)&&mx(e,o,n,l),qn=!1;var p=e.memoizedState;o.state=p,Vs(e,n,o,r),_s(),u=e.memoizedState,s||p!==u||qn?(typeof d=="function"&&(op(e,a,d,n),u=e.memoizedState),(i=qn||hx(e,a,i,n,p,u,l))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=n,e.memoizedState=u),o.props=n,o.state=u,o.context=l,n=i):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),n=!1)}else{o=e.stateNode,Gp(t,e),l=e.memoizedProps,f=no(a,l),o.props=f,d=e.pendingProps,p=o.context,u=a.contextType,i=cl,typeof u=="object"&&u!==null&&(i=ct(u)),s=a.getDerivedStateFromProps,(u=typeof s=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==d||p!==i)&&mx(e,o,n,i),qn=!1,p=e.memoizedState,o.state=p,Vs(e,n,o,r),_s();var h=e.memoizedState;l!==d||p!==h||qn||t!==null&&t.dependencies!==null&&mf(t.dependencies)?(typeof s=="function"&&(op(e,a,s,n),h=e.memoizedState),(f=qn||hx(e,a,f,n,p,h,i)||t!==null&&t.dependencies!==null&&mf(t.dependencies))?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(n,h,i),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(n,h,i)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),e.memoizedProps=n,e.memoizedState=h),o.props=n,o.state=h,o.context=i,n=f):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&p===t.memoizedState||(e.flags|=1024),n=!1)}return o=n,el(t,e),n=(e.flags&128)!==0,o||n?(o=e.stateNode,a=n&&typeof a.getDerivedStateFromError!="function"?null:o.render(),e.flags|=1,t!==null&&n?(e.child=to(e,t.child,null,r),e.child=to(e,null,a,r)):Ze(t,e,a,r),e.memoizedState=o.state,t=e.child):t=xn(t,e,r),t}function Ax(t,e,a,n){return Zr(),e.flags|=256,Ze(t,e,a,n),e.child}var Wp={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function $p(t){return{baseLanes:t,cachePool:ob()}}function eh(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=Yt),t}function Zb(t,e,a){var n=e.pendingProps,r=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(pt.current&2)!==0),l&&(r=!0,e.flags&=-129),l=(e.flags&32)!==0,e.flags&=-33,t===null){if(J){if(r?$n(e):er(),(t=Ce)?(t=J1(t,xa),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:or!==null?{id:ja,overflow:Ya}:null,retryLane:536870912,hydrationErrors:null},a=tb(t),a.return=e,e.child=a,lt=e,Ce=null)):t=null,t===null)throw lr(e);return Am(t)?e.lanes=32:e.lanes=536870912,null}return o=n.children,n=n.fallback,r?(er(),r=e.mode,o=jf({mode:"hidden",children:o},r),n=Xr(n,r,a,null),o.return=e,n.return=e,o.sibling=n,e.child=o,n=e.child,n.memoizedState=$p(a),n.childLanes=eh(t,l,a),e.memoizedState=Wp,Ks(null,n)):($n(e),fm(e,o))}var s=t.memoizedState;if(s!==null){var i=s.dehydrated;if(i!==null)return B2(t,e,o,l,n,i,s,a)}return r?(er(),r=n.fallback,o=e.mode,s=t.child,i=s.sibling,n=cn(s,{mode:"hidden",children:n.children}),n.subtreeFlags=s.subtreeFlags&1206910976,i!==null?r=cn(i,r):(r=Xr(r,o,a,null),r.flags|=2),r.return=e,n.return=e,n.sibling=r,e.child=n,Ks(null,n),n=e.child,r=t.child.memoizedState,r===null?r=$p(a):(o=r.cachePool,o!==null?(s=Xe._currentValue,o=o.parent!==s?{parent:s,pool:s}:o):o=ob(),r={baseLanes:r.baseLanes|a,cachePool:o}),n.memoizedState=r,n.childLanes=eh(t,l,a),e.memoizedState=Wp,Ks(t.child,n)):($n(e),a=t.child,t=a.sibling,a=cn(a,{mode:"visible",children:n.children}),a.return=e,a.sibling=null,t!==null&&(l=e.deletions,l===null?(e.deletions=[t],e.flags|=16):l.push(t)),e.child=a,e.memoizedState=null,a)}function fm(t,e){return e=jf({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function jf(t,e){return t=Mt(22,t,null,e),t.lanes=0,t}function Ou(t,e,a){return to(e,t.child,null,a),t=fm(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function B2(t,e,a,n,r,o,l,s){if(a)return e.flags&256?($n(e),e.flags&=-257,Ou(t,e,s)):e.memoizedState!==null?(er(),e.child=t.child,e.flags|=128,null):(er(),o=r.fallback,l=e.mode,r=jf({mode:"visible",children:r.children},l),o=Xr(o,l,s,null),o.flags|=2,r.return=e,o.return=e,r.sibling=o,e.child=r,to(e,t.child,null,s),r=e.child,r.memoizedState=$p(s),r.childLanes=eh(t,n,s),e.memoizedState=Wp,Ks(null,r));if($n(e),Am(o)){if(n=o.nextSibling&&o.nextSibling.dataset,n)var i=n.dgst;return n=i,n!==""&&(r=Error(B(419)),r.stack="",r.digest=n,ai({value:r,source:null,stack:null})),Ou(t,e,s)}if(je||Wr(t,e,s,!1),n=(s&t.childLanes)!==0,je||n){if(sr.current!==null)return Ou(t,e,s);if(n=we,n!==null&&(r=Iy(n,s),r!==0&&r!==l.retryLane))throw l.retryLane=r,io(t,r),Pt(n,t,r),um;return Sh(o)||Of(),Ou(t,e,s)}return Sh(o)?(e.flags|=192,e.child=t.child,null):(t=l.treeContext,Ce=ya(o.nextSibling),lt=e,J=!0,Jn=null,xa=!1,t!==null&&nb(e,t),e=fm(e,r.children),e.flags|=134221824,e)}function Cx(t,e,a){t.lanes|=e;var n=t.alternate;n!==null&&(n.lanes|=e),Qu(t.return,e,a)}function Sx(t){for(var e=null;t!==null;){var a=t.alternate;a!==null&&yf(a)===null&&(e=t),t=t.sibling}return e}function Nu(t,e,a,n,r,o){var l=t.memoizedState;l===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:n,tail:a,tailMode:r,treeForkCount:o}:(l.isBackwards=e,l.rendering=null,l.renderingStartTime=0,l.last=n,l.tail=a,l.tailMode=r,l.treeForkCount=o)}function lp(t){var e=t.child;for(t.child=null;e!==null;){var a=e.sibling;e.sibling=t.child,t.child=e,e=a}}function th(t,e,a){var n=e.pendingProps,r=n.revealOrder,o=n.tail;n=n.children;var l=pt.current;if(e.flags&128)return ri(e,l),null;var s=(l&2)!==0;if(s?(l=l&1|2,e.flags|=128):l&=1,ri(e,l),r==="backwards"&&t!==null?(lp(t),Ze(t,e,n,a),lp(t)):Ze(t,e,n,a),n=J?ti:0,!s&&t!==null&&(t.flags&128)!==0)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Cx(t,a,e);else if(t.tag===19)Cx(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(r){case"backwards":a=Sx(e.child),a===null?(r=e.child,e.child=null):(r=a.sibling,a.sibling=null,lp(e)),Nu(e,!0,r,null,o,n);break;case"unstable_legacy-backwards":for(a=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&yf(t)===null){e.child=r;break}t=r.sibling,r.sibling=a,a=r,r=t}Nu(e,!0,a,null,o,n);break;case"together":Nu(e,!1,null,null,void 0,n);break;case"independent":e.memoizedState=null;break;default:a=Sx(e.child),a===null?(r=e.child,e.child=null):(r=a.sibling,a.sibling=null),Nu(e,!1,r,a,o,n)}return e.child}function Ix(t,e,a){var n=e.pendingProps;return Qn(e,e.type,n.value),Ze(t,e,n.children,a),e.child}function xn(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),ur|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(Wr(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(B(153));if(e.child!==null){for(t=e.child,a=cn(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=cn(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function cm(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&mf(t)))}function O2(t,e,a){switch(e.tag){case 3:lf(e,e.stateNode.containerInfo),Qn(e,Xe,t.memoizedState.cache),Zr();break;case 27:case 5:Tp(e);break;case 4:lf(e,e.stateNode.containerInfo);break;case 10:Qn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Qp(e),null;break;case 13:var n=e.memoizedState;if(n!==null){if(n.dehydrated!==null)return $n(e),e.flags|=128,null;n=Wr(t,e,a,!1);var r=e.child.childLanes;return n||(a&r)!==0?Zb(t,e,a):($n(e),t=xn(t,e,a),t!==null?t.sibling:null)}$n(e);break;case 19:if(e.flags&128)return th(t,e,a);if(r=(t.flags&128)!==0,n=(a&e.childLanes)!==0,n||(Wr(t,e,a,!1),n=(a&e.childLanes)!==0),r){if(n)return th(t,e,a);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ri(e,pt.current),n)break;return null;case 22:return e.lanes=0,Jb(t,e,a,e.pendingProps);case 24:Qn(e,Xe,t.memoizedState.cache)}return xn(t,e,a)}function Wb(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)je=!0;else{if(!cm(t,a)&&(e.flags&128)===0)return je=!1,O2(t,e,a);je=(t.flags&131072)!==0}else je=!1,J&&(e.flags&1048576)!==0&&ab(e,ti,e.index);switch(e.lanes=0,e.tag){case 16:e:{var n=e.pendingProps;if(t=Gr(e.elementType),e.type=t,typeof t=="function")_h(t)?(n=no(t,n),e.tag=1,e=vx(null,e,t,n,a)):(e.tag=0,e=Zp(null,e,t,n,a));else{if(t!=null){var r=t.$$typeof;if(r===Oh){e.tag=11,e=xx(null,e,t,n,a);break e}else if(r===Nh){e.tag=14,e=yx(null,e,t,n,a);break e}else if(r===Ka){e.tag=10,e.type=t,e=Ix(null,e,a);break e}}throw e=Ip(t)||t,Error(B(306,e,""))}}return e;case 0:return Zp(t,e,e.type,e.pendingProps,a);case 1:return n=e.type,r=no(n,e.pendingProps),vx(t,e,n,r,a);case 3:e:{if(lf(e,e.stateNode.containerInfo),t===null)throw Error(B(387));n=e.pendingProps;var o=e.memoizedState;r=o.element,Gp(t,e),Vs(e,n,null,a);var l=e.memoizedState;if(n=l.cache,Qn(e,Xe,n),n!==o.cache&&Fp(e,[Xe],a,!0),_s(),n=l.element,o.isDehydrated)if(o={element:n,isDehydrated:!1,cache:l.cache},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){e=Ax(t,e,n,a);break e}else if(n!==r){r=ga(Error(B(424)),e),ai(r),e=Ax(t,e,n,a);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Ce=ya(t.firstChild),lt=e,J=!0,Jn=null,xa=!0,a=ib(e,null,n,a),e.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Zr(),n===r){e=xn(t,e,a);break e}Ze(t,e,n,a)}e=e.child}return e;case 26:return el(t,e),t===null?(a=$x(e.type,null,e.pendingProps,null))?e.memoizedState=a:J||(e.stateNode=q1(e.type,e.pendingProps,Yn.current,e)):e.memoizedState=$x(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Tp(e),t===null&&J&&(n=e.stateNode=Z1(e.type,e.pendingProps,Yn.current),lt=e,xa=!0,r=Ce,cr(e.type)?(Ih=r,Ce=ya(n.firstChild)):Ce=r),Ze(t,e,e.pendingProps.children,a),el(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&J&&((r=n=Ce)&&(n=vS(n,e.type,e.pendingProps,xa),n!==null?(e.stateNode=n,lt=e,Ce=ya(n.firstChild),xa=!1,r=!0):r=!1),r||lr(e)),Tp(e),r=e.type,o=e.pendingProps,l=t!==null?t.memoizedProps:null,n=o.children,vh(r,o)?n=null:l!==null&&vh(r,l)&&(e.flags|=32),e.memoizedState!==null&&(r=Wh(t,e,b2,null,null,a),Ml._currentValue=r),el(t,e),Ze(t,e,n,a),e.child;case 6:return t===null&&J&&((t=a=Ce)&&(a=AS(a,e.pendingProps,xa),a!==null?(e.stateNode=a,lt=e,Ce=null,t=!0):t=!1),t||lr(e)),null;case 13:return Zb(t,e,a);case 4:return lf(e,e.stateNode.containerInfo),n=e.pendingProps,t===null?e.child=to(e,null,n,a):Ze(t,e,n,a),e.child;case 11:return xx(t,e,e.type,e.pendingProps,a);case 7:return n=e.pendingProps,el(t,e),Ze(t,e,n,a),e.child;case 8:return Ze(t,e,e.pendingProps.children,a),e.child;case 12:return Ze(t,e,e.pendingProps.children,a),e.child;case 10:return Ix(t,e,a);case 9:return r=e.type._context,n=e.pendingProps.children,$r(e),r=ct(r),n=n(r),e.flags|=1,Ze(t,e,n,a),e.child;case 14:return yx(t,e,e.type,e.pendingProps,a);case 15:return Yb(t,e,e.type,e.pendingProps,a);case 19:return th(t,e,a);case 31:return T2(t,e,a);case 22:return Jb(t,e,a,e.pendingProps);case 24:return $r(e),n=ct(Xe),t===null?(r=Kh(),r===null&&(r=we,o=Qh(),r.pooledCache=o,o.refCount++,o!==null&&(r.pooledCacheLanes|=a),r=o),e.memoizedState={parent:n,cache:r},jh(e),Qn(e,Xe,r)):((t.lanes&a)!==0&&(Gp(t,e),Vs(e,null,null,a),_s()),r=t.memoizedState,o=e.memoizedState,r.parent!==n?(r={parent:n,cache:n},e.memoizedState=r,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=r),Qn(e,Xe,n)):(n=o.cache,Qn(e,Xe,n),n!==r.cache&&Fp(e,[Xe],a,!0))),Ze(t,e,e.pendingProps.children,a),e.child;case 30:return e.stateNode===null&&(e.stateNode={autoName:null,paired:null,clones:null,ref:null}),n=e.pendingProps,n.name!=null&&n.name!=="auto"?e.flags|=t===null?18882560:18874368:J&&Gf(e),t!==null&&t.memoizedProps.name!==n.name?e.flags|=4194816:el(t,e),Ze(t,e,n.children,a),e.child;case 29:throw e.pendingProps}throw Error(B(156,e.tag))}function sn(t){t.flags|=4}function sp(t,e,a,n,r){var o;if((o=(t.mode&32)!==0)&&(o=a===null?ay(e,n):ay(e,n)&&(n.src!==a.src||n.srcSet!==a.srcSet)),o){if(t.flags|=16777216,(r&335544128)===r)if(t.stateNode.complete)t.flags|=8192;else if(E1())t.flags|=8192;else throw Yr=gf,Xh}else t.flags&=-16777217}function Ex(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!tw(e))if(E1())t.flags|=8192;else throw Yr=gf,Xh}function ku(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?Ay():536870912,t.lanes|=e,Bl|=e)}function Bs(t,e){if(!J)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,n=null;a!==null;)a.alternate!==null&&(n=a),a=a.sibling;n===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:n.sibling=null;break;default:for(e=t.tail,a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null}}function Ae(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,n=0;if(e)for(var r=t.child;r!==null;)a|=r.lanes|r.childLanes,n|=r.subtreeFlags&1206910976,n|=r.flags&1206910976,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)a|=r.lanes|r.childLanes,n|=r.subtreeFlags,n|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=n,t.childLanes=a,e}function N2(t,e,a){var n=e.pendingProps;switch(Vh(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ae(e),null;case 1:return Ae(e),null;case 3:return a=e.stateNode,n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),dn(Xe),Sl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Wo(e)?sn(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,ap())),Ae(e),null;case 26:var r=e.type,o=e.memoizedState;return t===null?(sn(e),o!==null?(Ae(e),Ex(e,o)):(Ae(e),sp(e,r,null,n,a))):o?o!==t.memoizedState?(sn(e),Ae(e),Ex(e,o)):(Ae(e),e.flags&=-16777217):(t=t.memoizedProps,t!==n&&sn(e),Ae(e),sp(e,r,t,n,a)),null;case 27:if(sf(e),a=Yn.current,r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==n&&sn(e);else{if(!n){if(e.stateNode===null)throw Error(B(166));return Ae(e),e.subtreeFlags&=-33554433,null}t=Ja.current,Wo(e)?ex(e,t):(t=Z1(r,n,a),e.stateNode=t,sn(e))}return Ae(e),e.subtreeFlags&=-33554433,null;case 5:if(sf(e),r=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==n&&sn(e);else{if(!n){if(e.stateNode===null)throw Error(B(166));return Ae(e),e.subtreeFlags&=-33554433,null}if(o=Ja.current,Wo(e))ex(e,o);else{var l=ii(Yn.current);switch(o){case 1:o=l.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:o=l.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":o=l.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":o=l.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":o=l.createElement("div"),o.innerHTML="<script><\\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof n.is=="string"?l.createElement("select",{is:n.is}):l.createElement("select"),n.multiple?o.multiple=!0:n.size&&(o.size=n.size);break;default:o=typeof n.is=="string"?l.createElement(r,{is:n.is}):l.createElement(r)}}o[ft]=e,o[Rt]=n;e:for(l=e.child;l!==null;){if(l.tag===5||l.tag===6)o.appendChild(l.stateNode);else if(l.tag!==4&&l.tag!==27&&l.child!==null){l.child.return=l,l=l.child;continue}if(l===e)break e;for(;l.sibling===null;){if(l.return===null||l.return===e)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}e.stateNode=o;e:switch(ht(o,r,n),r){case"button":case"input":case"select":case"textarea":n=!!n.autoFocus;break e;case"img":n=!0;break e;default:n=!1}n&&sn(e)}}return Ae(e),e.subtreeFlags&=-33554433,sp(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,a),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==n&&sn(e);else{if(typeof n!="string"&&e.stateNode===null)throw Error(B(166));if(t=Yn.current,Wo(e)){if(t=e.stateNode,a=e.memoizedProps,n=null,r=lt,r!==null)switch(r.tag){case 27:case 5:n=r.memoizedProps}t[ft]=e,t=!!(t.nodeValue===a||n!==null&&n.suppressHydrationWarning===!0||H1(t.nodeValue,a)),t||lr(e,!0)}else t=ii(t).createTextNode(n),t[ft]=e,e.stateNode=t}return Ae(e),null;case 31:if(a=e.memoizedState,t===null||t.memoizedState!==null){if(n=Wo(e),a!==null){if(t===null){if(!n)throw Error(B(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(B(557));t[ft]=e}else Zr(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ae(e),t=!1}else a=ap(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return e.flags&256?(Xt(e),e):(Xt(e),null);if((e.flags&128)!==0)throw Error(B(558))}return Ae(e),null;case 13:if(n=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(r=Wo(e),n!==null&&n.dehydrated!==null){if(t===null){if(!r)throw Error(B(318));if(r=e.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(B(317));r[ft]=e}else Zr(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Ae(e),r=!1}else r=ap(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=r),r=!0;if(!r)return e.flags&256?(Xt(e),e):(Xt(e),null)}return Xt(e),(e.flags&128)!==0?(e.lanes=a,e):(a=n!==null,t=t!==null&&t.memoizedState!==null,a&&(n=e.child,r=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(r=n.alternate.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==r&&(n.flags|=2048)),a!==t&&a&&(e.child.flags|=8192),ku(e,e.updateQueue),Ae(e),null);case 4:return Sl(),t===null&&wm(e.stateNode.containerInfo),e.flags|=67108864,Ae(e),null;case 10:return dn(e.type),Ae(e),null;case 19:if(Jh(e),n=e.memoizedState,n===null)return Ae(e),null;if(r=(e.flags&128)!==0,o=n.rendering,o===null)if(r)Bs(n,!1);else{if(Re!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(o=yf(t),o!==null){for(e.flags|=128,Bs(n,!1),t=o.updateQueue,e.updateQueue=t,ku(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)eb(a,t),a=a.sibling;return ri(e,pt.current&1|2),J&&un(e,n.treeForkCount),e.child}t=t.sibling}n.tail!==null&&Jt()>Tf&&(e.flags|=128,r=!0,Bs(n,!1),e.lanes=4194304)}else{if(!r)if(t=yf(o),t!==null){if(e.flags|=128,r=!0,t=t.updateQueue,e.updateQueue=t,ku(e,t),Bs(n,!0),n.tail===null&&n.tailMode!=="collapsed"&&n.tailMode!=="visible"&&!o.alternate&&!J)return Ae(e),null}else 2*Jt()-n.renderingStartTime>Tf&&a!==536870912&&(e.flags|=128,r=!0,Bs(n,!1),e.lanes=4194304);n.isBackwards?(o.sibling=e.child,e.child=o):(t=n.last,t!==null?t.sibling=o:e.child=o,n.last=o)}if(n.tail!==null){t=n.tail;e:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break e}a=a.sibling}a=!0}return n.rendering=t,n.tail=t.sibling,n.renderingStartTime=Jt(),t.sibling=null,o=pt.current,o=r?o&1|2:o&1,n.tailMode==="visible"||n.tailMode==="collapsed"||!a||J?ri(e,o):(a=o,Se(mt,e),Se(pt,a),bt===null&&(bt=e)),J&&un(e,n.treeForkCount),t}return Ae(e),null;case 22:case 23:return Xt(e),Yh(),n=e.memoizedState!==null,t!==null?t.memoizedState!==null!==n&&(e.flags|=8192):n&&(e.flags|=8192),n?(a&536870912)!==0&&(e.flags&128)===0&&(Ae(e),e.subtreeFlags&6&&(e.flags|=8192)):Ae(e),a=e.updateQueue,a!==null&&ku(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),n=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),n!==a&&(e.flags|=2048),t!==null&&dt(jr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),dn(Xe),Ae(e),null;case 25:return null;case 30:return e.flags|=33554432,Ae(e),null}throw Error(B(156,e.tag))}function k2(t,e){switch(Vh(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return dn(Xe),Sl(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return sf(e),null;case 31:if(e.memoizedState!==null){if(Xt(e),e.alternate===null)throw Error(B(340));Zr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(Xt(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(B(340));Zr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Jh(e),t=e.flags,t&65536?(e.flags=t&-65537|128,t=e.memoizedState,t!==null&&(t.rendering=null,t.tail=null),e.flags|=4,e):null;case 4:return Sl(),null;case 10:return dn(e.type),null;case 22:case 23:return Xt(e),Yh(),t!==null&&dt(jr),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return dn(Xe),null;case 25:return null;default:return null}}function $b(t,e){switch(Vh(e),e.tag){case 3:dn(Xe),Sl();break;case 26:case 27:case 5:sf(e);break;case 4:Sl();break;case 31:e.memoizedState!==null&&Xt(e);break;case 13:Xt(e);break;case 19:Jh(e);break;case 10:dn(e.type);break;case 22:case 23:Xt(e),Yh(),t!==null&&dt(jr);break;case 24:dn(Xe)}}function Li(t,e){try{var a=e.updateQueue,n=a!==null?a.lastEffect:null;if(n!==null){var r=n.next;a=r;do{if((a.tag&t)===t){n=void 0;var o=a.create,l=a.inst;n=o(),l.destroy=n}a=a.next}while(a!==r)}}catch(s){ge(e,e.return,s)}}function ir(t,e,a){try{var n=e.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var o=r.next;n=o;do{if((n.tag&t)===t){var l=n.inst,s=l.destroy;if(s!==void 0){l.destroy=void 0,r=e;var i=a,u=s;try{u()}catch(f){ge(r,i,f)}}}n=n.next}while(n!==o)}}catch(f){ge(e,e.return,f)}}function e1(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{fb(e,a)}catch(n){ge(t,t.return,n)}}}function t1(t,e,a){a.props=no(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(n){ge(t,e,n)}}function Va(t,e){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var n=t.stateNode;break;case 30:var r=t.stateNode,o=hn(t.memoizedProps,r);(r.ref===null||r.ref.name!==o)&&(r.ref=Q1(o)),n=r.ref;break;case 7:if(t.stateNode===null){var l=new ta(t);zt(t.child,!1,wS,l,void 0,void 0),t.stateNode=l}n=t.stateNode;break;default:n=t.stateNode}typeof a=="function"?t.refCleanup=a(n):a.current=n}}catch(s){ge(t,e,s)}}function ut(t,e){var a=t.ref,n=t.refCleanup;if(a!==null)if(typeof n=="function")try{n()}catch(r){ge(t,e,r)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(r){ge(t,e,r)}else a.current=null}function Af(t,e){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&e!==null)for(var a=0;a<e.length;a++)Y1(t.stateNode,e[a])}function Tx(t){for(var e=t.return;e!==null&&(pm(e)&&Y1(t.stateNode,e.stateNode),!dm(e));)e=e.return}function Xs(t){for(var e=t.return;e!==null&&(pm(e)&&LS(t.stateNode,e.stateNode),!dm(e));)e=e.return}function dm(t){return t.tag===5||t.tag===3||t.tag===27}function pm(t){return t&&t.tag===7&&t.stateNode!==null}function ah(t){var e=t.type,a=t.memoizedProps,n=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break e;case"img":a.src?n.src=a.src:a.srcSet&&(n.srcset=a.srcSet)}}catch(r){ge(t,t.return,r)}}function ip(t,e,a){try{var n=t.stateNode;aS(n,t.type,a,e),n[Rt]=e}catch(r){ge(t,t.return,r)}}function a1(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&cr(t.type)||t.tag===4}function up(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||a1(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&cr(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function nh(t,e,a,n){var r=t.tag;if(r===5||r===6)r=t.stateNode,e?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(r,e):(e=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,e.appendChild(r),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=Xa)),Af(t,n),ie=!0;else if(r!==4&&(r===27&&(Af(t,n),n=null,cr(t.type)&&(a=t.stateNode,e=null)),t=t.child,t!==null))for(nh(t,e,a,n),t=t.sibling;t!==null;)nh(t,e,a,n),t=t.sibling}function Cf(t,e,a,n){var r=t.tag;if(r===5||r===6)r=t.stateNode,e?a.insertBefore(r,e):a.appendChild(r),Af(t,n),ie=!0;else if(r!==4&&(r===27&&(Af(t,n),n=null,cr(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(Cf(t,e,a,n),t=t.sibling;t!==null;)Cf(t,e,a,n),t=t.sibling}function n1(t){var e=t.stateNode,a=t.memoizedProps;try{for(var n=t.type,r=e.attributes;r.length;)e.removeAttributeNode(r[0]);ht(e,n,a),e[ft]=t,e[Rt]=a}catch(o){ge(t,t.return,o)}}var Sf=!1,jt=null;function Bx(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Sf=!0)}var Qa=null;function Ox(){var t=Qa;return Qa=null,t}var Ut=0;function ql(t,e,a,n,r){return Ut=0,r1(t.child,e,a,n,r)}function r1(t,e,a,n,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(n!==null){var s=Ah(l);n.push(s),s.view&&(o=!0)}else o||Ah(l).view&&(o=!0);Sf=!0,G1(l,Ut===0?e:e+"_"+Ut,a),Ut++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r||r1(t.child,e,a,n,r)&&(o=!0));t=t.sibling}return o}function Wa(t,e){for(;t!==null;)t.tag===5?_1(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&e||Wa(t.child,e)),t=t.sibling}function Ju(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Ju(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var e=t.memoizedProps;if(e.name==null||e.name==="auto")throw Error(B(544));var a=e.name;e=wn(e.default,e.share),e!=="none"&&(ql(t,a,e,null,!1)||Wa(t.child,!1))}t=t.sibling}}function rh(t,e){if(t.tag===30){var a=t.stateNode,n=t.memoizedProps,r=hn(n,a),o=wn(n.default,a.paired?n.share:n.enter);o!=="none"?ql(t,r,o,null,!1)?(Ju(t),a.paired||e||Ol(t,n.onEnter)):Wa(t.child,!1):Ju(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)rh(t,e),t=t.sibling;else Ju(t)}function oh(t){if(jt!==null&&jt.size!==0){var e=jt;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,n=a.name;if(n!=null&&n!=="auto"){var r=e.get(n);if(r!==void 0){var o=wn(a.default,a.share);if(o!=="none"&&(ql(t,n,o,null,!1)?(o=t.stateNode,r.paired=o,o.paired=r,Ol(t,a.onShare)):Wa(t.child,!1)),e.delete(n),e.size===0)break}}}oh(t)}t=t.sibling}}}function lh(t){if(t.tag===30){var e=t.memoizedProps,a=hn(e,t.stateNode),n=jt!==null?jt.get(a):void 0,r=wn(e.default,n!==void 0?e.share:e.exit);r!=="none"&&(ql(t,a,r,null,!1)?n!==void 0?(r=t.stateNode,n.paired=r,r.paired=n,jt.delete(a),Ol(t,e.onShare)):Ol(t,e.onExit):Wa(t.child,!1)),jt!==null&&oh(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)lh(t),t=t.sibling;else jt!==null&&oh(t)}function o1(t){for(t=t.child;t!==null;){if(t.tag===30){var e=t.memoizedProps,a=hn(e,t.stateNode);e=wn(e.default,e.update),t.flags&=-5,e!=="none"&&ql(t,a,e,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&o1(t);t=t.sibling}}function sh(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var e=t.stateNode;e.paired!==null&&(e.paired=null,Wa(t.child,!1))}sh(t)}t=t.sibling}}function Zu(t){if(t.tag===30)t.stateNode.paired=null,Wa(t.child,!1),sh(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Zu(t),t=t.sibling;else sh(t)}function l1(t){for(t=t.child;t!==null;)t.tag===30?Wa(t.child,!1):(t.subtreeFlags&33554432)!==0&&l1(t),t=t.sibling}function hm(t,e,a,n,r,o,l){for(var s=!1;e!==null;){if(e.tag===5){var i=e.stateNode;if(o!==null&&Ut<o.length){var u=o[Ut],f=Ah(i);(u.view||f.view)&&(s=!0);var d;if(d=(t.flags&4)===0)if(f.clip)d=!0;else{d=u.rect;var p=f.rect;d=d.y!==p.y||d.x!==p.x||d.height!==p.height||d.width!==p.width}d&&(t.flags|=4),f.abs?f=!u.abs:(u=u.rect,f=f.rect,f=u.height!==f.height||u.width!==f.width),f&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&G1(i,Ut===0?a:a+"_"+Ut,r),s&&(t.flags&4)!==0||(Qa===null&&(Qa=[]),Qa.push(i,Ut===0?n:n+"_"+Ut,e.memoizedProps)),Ut++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&l?t.flags|=e.flags&32:hm(t,e.child,a,n,r,o,l)&&(s=!0));e=e.sibling}return s}function s1(t,e){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,n=t.stateNode,r=hn(a,n),o=wn(a.default,a.update);if(e){n=n.clones;var l=n===null?null:n.map(iS)}else l=t.memoizedState,t.memoizedState=null;n=t;var s=t.child;Ut=0,r=hm(n,s,r,r,o,l,!1),(t.flags&4)!==0&&r&&(e||Ol(t,a.onUpdate))}else(t.subtreeFlags&33554432)!==0&&s1(t,e);t=t.sibling}}var nt=!1,pe=!1,qa=!1,fp=!1,Nx=typeof WeakSet=="function"?WeakSet:Set,rt=null,Ga=!1,zs=!1,If=!1,ih=!1;function D2(t,e,a){if(t=t.containerInfo,wh=Pl,t=Ky(t),Fh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var s=0,i=-1,u=-1,f=0,d=0,p=t,h=null;t:for(;;){for(var w;p!==n||o!==0&&p.nodeType!==3||(i=s+o),p!==l||r!==0&&p.nodeType!==3||(u=s+r),p.nodeType===3&&(s+=p.nodeValue.length),(w=p.firstChild)!==null;)h=p,p=w;for(;;){if(p===t)break t;if(h===n&&++f===o&&(i=s),h===l&&++d===r&&(u=s),(w=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=w}n=i===-1||u===-1?null:{start:i,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Lh={focusedElem:t,selectionRange:n},Pl=!1,a=(a&335544064)===a,rt=e,e=a?9270:1024;rt!==null;){if(t=rt,a&&(n=t.deletions,n!==null))for(o=0;o<n.length;o++)a&&lh(n[o]);if(t.alternate===null&&(t.flags&2)!==0)a&&Bx(t),Du(a);else{if(t.tag===22){if(n=t.alternate,t.memoizedState!==null){n!==null&&n.memoizedState===null&&a&&lh(n),Du(a);continue}else if(n!==null&&n.memoizedState!==null){a&&Bx(t),Du(a);continue}}n=t.child,(t.subtreeFlags&e)!==0&&n!==null?(n.return=t,rt=n):(a&&o1(t),Du(a))}}jt=null}function Du(t){for(;rt!==null;){var e=rt,a=t,n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 15:break;case 1:if((r&1024)!==0&&n!==null){a=void 0,r=n.memoizedProps,n=n.memoizedState;var o=e.stateNode;try{var l=no(e.type,r);a=o.getSnapshotBeforeUpdate(l,n),o.__reactInternalSnapshotBeforeUpdate=a}catch(s){ge(e,e.return,s)}}break;case 3:if((r&1024)!==0){if(n=e.stateNode.containerInfo,a=n.nodeType,a===9)Ch(n);else if(a===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Ch(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&n!==null&&(a=hn(n.memoizedProps,n.stateNode),r=e.memoizedProps,r=wn(r.default,r.update),r!=="none"&&ql(n,a,r,n.memoizedState=[],!0));break;default:if((r&1024)!==0)throw Error(B(163))}if(n=e.sibling,n!==null){n.return=e.return,rt=n;break}rt=e.return}}function i1(t,e,a){var n=a.flags;switch(a.tag){case 0:case 11:case 15:_a(t,a),n&4&&Li(5,a);break;case 1:if(_a(t,a),n&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(l){ge(a,a.return,l)}else{var r=no(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(r,e,t.__reactInternalSnapshotBeforeUpdate)}catch(l){ge(a,a.return,l)}}n&64&&e1(a),n&512&&Va(a,a.return);break;case 3:if(_a(t,a),n&64&&(t=a.updateQueue,t!==null)){if(e=null,a.child!==null)switch(a.child.tag){case 27:case 5:e=a.child.stateNode;break;case 1:e=a.child.stateNode}try{fb(t,e)}catch(l){ge(a,a.return,l)}}break;case 27:e===null&&n&4&&n1(a);case 26:case 5:_a(t,a),e===null&&n&4&&ah(a),n&512&&Va(a,a.return);break;case 12:_a(t,a);break;case 31:_a(t,a),n&4&&d1(t,a);break;case 13:_a(t,a),n&4&&p1(t,a),n&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Q2.bind(null,a),CS(t,a))));break;case 22:if(n=a.memoizedState!==null||nt,!n){var o=e!==null&&e.memoizedState!==null||pe;e=nt,r=pe,nt=n,(pe=o)&&!r?(n=2,(a.subtreeFlags&8772)!==0&&(n|=1),Ta(t,a,n)):_a(t,a),nt=e,pe=r}break;case 30:_a(t,a),n&512&&Va(a,a.return);break;case 7:n&512&&Va(a,a.return);default:_a(t,a)}}function uh(t,e){for(t=t.child;t!==null;)u1(t,e),t=t.sibling}function u1(t,e){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(e){var n=a.style;typeof n.setProperty=="function"?n.setProperty("display","none","important"):n.display="none"}else{var r=t.stateNode,o=t.memoizedProps.style,l=o!=null&&o.hasOwnProperty("display")?o.display:null;r.style.display=l==null||typeof l=="boolean"?"":(""+l).trim()}}catch(i){ge(t,t.return,i)}fh(t,e);break;case 6:try{t.stateNode.nodeValue=e?"":t.memoizedProps,ie=!0}catch(i){ge(t,t.return,i)}break;case 18:try{var s=t.stateNode;e?Xx(s,!0):Xx(t.stateNode,!1)}catch(i){ge(t,t.return,i)}break;case 22:case 23:t.memoizedState===null&&uh(t,e);break;default:uh(t,e)}}function fh(t,e){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){e:{var a=t,n=e;switch(a.tag){case 4:u1(a,n);break e;case 22:a.memoizedState===null&&fh(a,n);break e;default:fh(a,n)}}t=t.sibling}}function f1(t){var e=t.alternate;e!==null&&(t.alternate=null,f1(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Pf(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var De=null,kt=!1;function Ea(t,e,a){for(a=a.child;a!==null;)c1(t,e,a),a=a.sibling}function c1(t,e,a){if(Zt&&typeof Zt.onCommitFiberUnmount=="function")try{Zt.onCommitFiberUnmount(hi,a)}catch{}switch(a.tag){case 26:pe||ut(a,e),Ea(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!pe&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:pe||ut(a,e),Xs(a);var n=De,r=kt;cr(a.type)&&(De=a.stateNode,kt=!1),Ea(t,e,a),W1(a.stateNode,a.type,a.memoizedProps),De=n,kt=r;break;case 5:pe||ut(a,e),Xs(a);case 6:if(a.tag===6&&Xs(a),n=De,r=kt,De=null,Ea(t,e,a),De=n,kt=r,De!==null)if(kt)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(a.stateNode),ie=!0}catch(o){ge(a,e,o)}else try{De.removeChild(a.stateNode),ie=!0}catch(o){ge(a,e,o)}break;case 18:De!==null&&(kt?(t=De,Kx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),zl(t)):Kx(De,a.stateNode));break;case 4:n=De,r=kt,De=a.stateNode.containerInfo,kt=!0,Ea(t,e,a),De=n,kt=r;break;case 0:case 11:case 14:case 15:ir(2,a,e),pe||ir(4,a,e),Ea(t,e,a);break;case 1:pe||(ut(a,e),n=a.stateNode,typeof n.componentWillUnmount=="function"&&t1(a,e,n)),Ea(t,e,a);break;case 21:Ea(t,e,a);break;case 22:pe=(n=pe)||a.memoizedState!==null,Ea(t,e,a),pe=n;break;case 30:ut(a,e),Ea(t,e,a);break;case 7:pe||ut(a,e),Ea(t,e,a);break;default:Ea(t,e,a)}}function d1(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{zl(t)}catch(a){ge(e,e.return,a)}}}function p1(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{zl(t)}catch(a){ge(e,e.return,a)}}function U2(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Nx),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Nx),e;default:throw Error(B(435,t.tag))}}function Uu(t,e){var a=U2(t);e.forEach(function(n){if(!a.has(n)){a.add(n);var r=K2.bind(null,t,n);n.then(r,r)}})}function At(t,e,a){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r],l=t,s=e,i=s;e:for(;i!==null;){switch(i.tag){case 27:if(cr(i.type)){De=i.stateNode,kt=!1;break e}break;case 5:De=i.stateNode,kt=!1;break e;case 3:case 4:De=i.stateNode.containerInfo,kt=!0;break e}i=i.return}if(De===null)throw Error(B(160));c1(l,s,o),De=null,kt=!1,l=o.alternate,l!==null&&(l.return=null),o.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)h1(e,t,a),e=e.sibling}var Ba=null;function h1(t,e,a){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(r&4&&(n=t.updateQueue,n=n!==null?n.events:null,n!==null))for(var o=0;o<n.length;o++){var l=n[o];l.ref.impl=l.nextImpl}At(e,t,a),Ct(t),r&4&&(ir(3,t,t.return),Li(3,t),ir(5,t,t.return));break;case 1:At(e,t,a),Ct(t),r&512&&(pe||n===null||ut(n,n.return)),r&64&&nt&&(t=t.updateQueue,t!==null&&(e=t.callbacks,e!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?e:a.concat(e))));break;case 26:if(o=Ba,At(e,t,a),Ct(t),r&512&&(pe||n===null||ut(n,n.return)),r&4)if(r=n!==null?n.memoizedState:null,a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null)if(nt)t.stateNode=q1(t.type,t.memoizedProps,e.containerInfo,t);else{e:{e=t.type,a=t.memoizedProps,r=o.ownerDocument||o;t:switch(e){case"title":n=r.getElementsByTagName("title")[0],(!n||n[xi]||n[ft]||n.namespaceURI==="http://www.w3.org/2000/svg"||n.hasAttribute("itemprop"))&&(n=r.createElement(e),r.head.insertBefore(n,r.querySelector("head > title"))),ht(n,e,a),n[ft]=t,ot(n),e=n;break e;case"link":if(o=ty("link","href",r).get(e+(a.href||""))){for(l=0;l<o.length;l++)if(n=o[l],n.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&n.getAttribute("rel")===(a.rel==null?null:a.rel)&&n.getAttribute("title")===(a.title==null?null:a.title)&&n.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){o.splice(l,1);break t}}n=r.createElement(e),ht(n,e,a),r.head.appendChild(n);break;case"meta":if(o=ty("meta","content",r).get(e+(a.content||""))){for(l=0;l<o.length;l++)if(n=o[l],n.getAttribute("content")===(a.content==null?null:""+a.content)&&n.getAttribute("name")===(a.name==null?null:a.name)&&n.getAttribute("property")===(a.property==null?null:a.property)&&n.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&n.getAttribute("charset")===(a.charSet==null?null:a.charSet)){o.splice(l,1);break t}}n=r.createElement(e),ht(n,e,a),r.head.appendChild(n);break;default:throw Error(B(468,e))}n[ft]=t,ot(n),e=n}t.stateNode=e}else nt||Eh(o,t.type,t.stateNode);else t.stateNode=ey(o,a,t.memoizedProps);else r!==a?(r===null?(e=n.stateNode,e===null||pe||e.parentNode.removeChild(e)):r.count--,a===null?nt||Eh(o,t.type,t.stateNode):ey(o,a,t.memoizedProps)):a===null&&t.stateNode!==null&&ip(t,t.memoizedProps,n.memoizedProps);break;case 27:At(e,t,a),Ct(t),r&512&&(pe||n===null||ut(n,n.return)),n!==null&&r&4&&ip(t,t.memoizedProps,n.memoizedProps);break;case 5:if(o=qa,qa=!1,At(e,t,a),qa=o,Ct(t),r&512&&(pe||n===null||ut(n,n.return)),t.flags&32){e=t.stateNode;try{El(e,""),ie=!0}catch(f){ge(t,t.return,f)}}r&4&&t.stateNode!=null&&(e=t.memoizedProps,ip(t,e,n!==null?n.memoizedProps:e)),r&1024&&(fp=!0);break;case 6:if(At(e,t,a),Ct(t),r&4){if(t.stateNode===null)throw Error(B(162));e=t.memoizedProps,a=t.stateNode;try{a.nodeValue=e,ie=!0}catch(f){ge(t,t.return,f)}}break;case 3:if(ie=!1,tf=null,o=Ba,Ba=ui(e.containerInfo),At(e,t,a),Ba=o,Ct(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{zl(e.containerInfo)}catch(f){ge(t,t.return,f)}fp&&(fp=!1,m1(t)),ie=!1;break;case 4:r=qa,qa=nt,n=z0(),o=Ba,Ba=ui(t.stateNode.containerInfo),At(e,t,a),Ct(t),Ba=o,ie&&zs&&(If=!0),ie=n,qa=r;break;case 12:At(e,t,a),Ct(t);break;case 31:At(e,t,a),Ct(t),r&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,Uu(t,e)));break;case 13:At(e,t,a),Ct(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Yf=Jt()),r&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,Uu(t,e)));break;case 22:o=t.memoizedState!==null,l=n!==null&&n.memoizedState!==null;var s=nt,i=pe,u=qa;nt=s||o,qa=u||o,pe=i||l,At(e,t,a),pe=i,qa=u,nt=s,Ct(t),r&8192&&(e=t.stateNode,e._visibility=o?e._visibility&-2:e._visibility|1,!o||n===null||l||nt||pe||(e=l||pe,a=nt,n=pe,nt=o||nt,pe=e,Hn(t,2),nt=a,pe=n),!o&&qa||uh(t,o)),r&4&&(e=t.updateQueue,e!==null&&(a=e.retryQueue,a!==null&&(e.retryQueue=null,Uu(t,a))));break;case 19:At(e,t,a),Ct(t),r&4&&(e=t.updateQueue,e!==null&&(t.updateQueue=null,Uu(t,e)));break;case 30:r&512&&(pe||n===null||ut(n,n.return)),r=z0(),o=zs,l=(a&335544064)===a,s=t.memoizedProps,zs=l&&wn(s.default,s.update)!=="none",At(e,t,a),Ct(t),l&&n!==null&&ie&&(t.flags|=4),zs=o,ie=r;break;case 21:break;case 7:r&512&&(pe||n===null||ut(n,n.return)),n&&n.stateNode!==null&&(n.stateNode._fragmentFiber=t);default:At(e,t,a),Ct(t)}}function Ct(t){var e=t.flags;if(e&2){try{for(var a,n=t.return;n!==null;){if(a1(n)){a=n;break}n=n.return}n=null;for(var r=t.return;r!==null;){if(pm(r)){var o=r.stateNode;n===null?n=[o]:n.push(o)}if(dm(r))break;r=r.return}var l=n;if(a==null)throw Error(B(160));switch(a.tag){case 27:var s=a.stateNode,i=up(t);Cf(t,i,s,l);break;case 5:var u=a.stateNode;a.flags&32&&(El(u,""),a.flags&=-33);var f=up(t);Cf(t,f,u,l);break;case 3:case 4:var d=a.stateNode.containerInfo,p=up(t);nh(t,p,d,l);break;default:throw Error(B(161))}}catch(h){ge(t,t.return,h)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function m1(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;m1(e),e.tag===5&&e.flags&1024&&(e=e.stateNode,Pl=!0,e.reset(),Pl=!1),t=t.sibling}}function $o(t,e){if(e.subtreeFlags&9270)for(e=e.child;e!==null;)g1(e,t),e=e.sibling;else s1(e,!1)}function g1(t,e){var a=t.alternate;if(a===null)rh(t,!1);else switch(t.tag){case 3:if(ih=Ga=!1,Ox(),$o(e,t),!Ga&&!If){if(t=Qa,t!==null)for(var n=0;n<t.length;n+=3){a=t[n];var r=t[n+1];_1(a,t[n+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+r+")"})}t=e.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),ih=!0}Qa=null;break;case 5:$o(e,t);break;case 4:n=Ga,Ga=!1,$o(e,t),Ga&&(If=!0),Ga=n;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?rh(t,!1):$o(e,t));break;case 30:n=Ga,r=Ox(),Ga=!1,$o(e,t),Ga&&(t.flags|=4);var o=t.memoizedProps,l=t.stateNode;e=hn(o,l),l=hn(a.memoizedProps,l);var s=wn(o.default,o.update);s==="none"?e=!1:(o=a.memoizedState,a.memoizedState=null,a=t.child,Ut=0,e=hm(t,a,e,l,s,o,!0),Ut!==(o===null?0:o.length)&&(t.flags|=32)),(t.flags&4)!==0&&e?(Ol(t,t.memoizedProps.onUpdate),Qa=r):r!==null&&(r.push.apply(r,Qa),Qa=r),Ga=(t.flags&32)!==0?!0:n;break;default:$o(e,t)}}function _a(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)i1(t,e.alternate,e),e=e.sibling}function Hn(t,e){for(t=t.child;t!==null;){var a=t,n=e;switch(a.tag){case 0:case 11:case 14:case 15:ir(4,a,a.return),Hn(a,n);break;case 1:ut(a,a.return);var r=a.stateNode;typeof r.componentWillUnmount=="function"&&t1(a,a.return,r),Hn(a,n);break;case 27:(n&2)!==0&&W1(a.stateNode,a.type,a.memoizedProps);case 5:ut(a,a.return),a.tag!==5&&a.tag!==27||Xs(a),Hn(a,n);break;case 6:Xs(a);break;case 26:ut(a,a.return),r=a.stateNode,a.memoizedState!==null||r===null||pe||r.parentNode.removeChild(r),Hn(a,n);break;case 22:a.memoizedState===null&&Hn(a,n);break;case 30:ut(a,a.return),Hn(a,n);break;case 7:ut(a,a.return);default:Hn(a,n)}t=t.sibling}}function Ta(t,e,a){for(a=(e.subtreeFlags&8772)!==0?a:a&-2,e=e.child;e!==null;){var n=e.alternate,r=t,o=e,l=o.flags,s=(a&1)!==0;switch(o.tag){case 0:case 11:case 15:Ta(r,o,a),Li(4,o);break;case 1:if(Ta(r,o,a),n=o,r=n.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(f){ge(n,n.return,f)}if(n=o,r=n.updateQueue,r!==null){var i=n.stateNode;try{var u=r.shared.hiddenCallbacks;if(u!==null)for(r.shared.hiddenCallbacks=null,r=0;r<u.length;r++)ub(u[r],i)}catch(f){ge(n,n.return,f)}}s&&l&64&&e1(o),Va(o,o.return);break;case 27:(a&2)!==0&&n1(o);case 5:o.tag!==5&&o.tag!==27||Tx(o),Ta(r,o,a),s&&n===null&&l&4&&ah(o),Va(o,o.return);break;case 6:Tx(o);break;case 26:i=o.stateNode,o.memoizedState!==null||i===null||nt||Eh(ui(i.ownerDocument),o.type,i),Ta(r,o,a),s&&n===null&&l&4&&ah(o),Va(o,o.return);break;case 12:Ta(r,o,a);break;case 31:Ta(r,o,a),s&&l&4&&d1(r,o);break;case 13:Ta(r,o,a),s&&l&4&&p1(r,o);break;case 22:o.memoizedState===null&&Ta(r,o,a),Va(o,o.return);break;case 30:Ta(r,o,a),Va(o,o.return);break;case 7:Va(o,o.return);default:Ta(r,o,a)}e=e.sibling}}function mm(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&bi(a))}function gm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&bi(t))}function ca(t,e,a,n){var r=(a&335544064)===a;if(e.subtreeFlags&(r?10262:10256))for(e=e.child;e!==null;)x1(t,e,a,n),e=e.sibling;else r&&l1(e)}function x1(t,e,a,n){var r=(a&335544064)===a;r&&e.alternate===null&&e.return!==null&&e.return.alternate!==null&&Zu(e);var o=e.flags;switch(e.tag){case 0:case 11:case 15:ca(t,e,a,n),o&2048&&Li(9,e);break;case 1:ca(t,e,a,n);break;case 3:ca(t,e,a,n),r&&ih&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),o&2048&&(o=null,e.alternate!==null&&(o=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==o&&(e.refCount++,o!=null&&bi(o)));break;case 12:if(o&2048){ca(t,e,a,n),o=e.stateNode;try{var l=e.memoizedProps,s=l.id,i=l.onPostCommit;typeof i=="function"&&i(s,e.alternate===null?"mount":"update",o.passiveEffectDuration,-0)}catch(u){ge(e,e.return,u)}}else ca(t,e,a,n);break;case 31:ca(t,e,a,n);break;case 13:ca(t,e,a,n);break;case 23:break;case 22:l=e.stateNode,s=e.alternate,e.memoizedState!==null?(r&&s!==null&&s.memoizedState===null&&Zu(s),l._visibility&2?ca(t,e,a,n):js(t,e)):(r&&s!==null&&s.memoizedState!==null&&Zu(e),l._visibility&2?ca(t,e,a,n):(l._visibility|=2,tl(t,e,a,n,(e.subtreeFlags&10256)!==0||!1))),o&2048&&mm(s,e);break;case 24:ca(t,e,a,n),o&2048&&gm(e.alternate,e);break;case 30:r&&(o=e.alternate,o!==null&&(Wa(o.child,!0),Wa(e.child,!0))),ca(t,e,a,n);break;default:ca(t,e,a,n)}}function tl(t,e,a,n,r){for(r=r&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var o=t,l=e,s=a,i=n,u=l.flags;switch(l.tag){case 0:case 11:case 15:tl(o,l,s,i,r),Li(8,l);break;case 23:break;case 22:var f=l.stateNode;l.memoizedState!==null?f._visibility&2?tl(o,l,s,i,r):js(o,l):(f._visibility|=2,tl(o,l,s,i,r)),r&&u&2048&&mm(l.alternate,l);break;case 24:tl(o,l,s,i,r),r&&u&2048&&gm(l.alternate,l);break;default:tl(o,l,s,i,r)}e=e.sibling}}function js(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,n=e,r=n.flags;switch(n.tag){case 22:js(a,n),r&2048&&mm(n.alternate,n);break;case 24:js(a,n),r&2048&&gm(n.alternate,n);break;default:js(a,n)}e=e.sibling}}var _r=8192;function Fr(t,e,a){if(t.subtreeFlags&_r)for(t=t.child;t!==null;)y1(t,e,a),t=t.sibling}function y1(t,e,a){switch(t.tag){case 26:Fr(t,e,a),t.flags&_r&&(t.memoizedState!==null?RS(a,Ba,t.memoizedState,t.memoizedProps):(t=t.stateNode,(e&335544128)===e&&ny(a,t)));break;case 5:Fr(t,e,a),t.flags&_r&&(t=t.stateNode,(e&335544128)===e&&ny(a,t));break;case 3:case 4:var n=Ba;Ba=ui(t.stateNode.containerInfo),Fr(t,e,a),Ba=n;break;case 22:t.memoizedState===null&&(n=t.alternate,n!==null&&n.memoizedState!==null?(n=_r,_r=16777216,Fr(t,e,a),_r=n):Fr(t,e,a));break;case 30:if((t.flags&_r)!==0&&(n=t.memoizedProps.name,n!=null&&n!=="auto")){var r=t.stateNode;r.paired=null,jt===null&&(jt=new Map),jt.set(n,r)}Fr(t,e,a);break;default:Fr(t,e,a)}}function b1(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Os(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var n=e[a];rt=n,L1(n,t)}b1(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)w1(t),t=t.sibling}function w1(t){switch(t.tag){case 0:case 11:case 15:Os(t),t.flags&2048&&ir(9,t,t.return);break;case 3:Os(t);break;case 12:Os(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Wu(t)):Os(t);break;default:Os(t)}}function Wu(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var n=e[a];rt=n,L1(n,t)}b1(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:ir(8,e,e.return),Wu(e);break;case 22:a=e.stateNode,a._visibility&2&&(a._visibility&=-3,Wu(e));break;default:Wu(e)}t=t.sibling}}function L1(t,e){for(;rt!==null;){var a=rt;switch(a.tag){case 0:case 11:case 15:ir(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var n=a.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:bi(a.memoizedState.cache)}if(n=a.child,n!==null)n.return=a,rt=n;else e:for(a=t;rt!==null;){n=rt;var r=n.sibling,o=n.return;if(f1(n),n===a){rt=null;break e}if(r!==null){r.return=o,rt=r;break e}rt=o}}}var M2={getCacheForType:function(t){var e=ct(Xe),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a},cacheSignal:function(){return ct(Xe).controller.signal}},P2=typeof WeakMap=="function"?WeakMap:Map,ce=0,we=null,$=null,ae=0,he=0,Qt=null,Kn=!1,Gl=!1,xm=!1,yn=0,Re=0,ur=0,Jr=0,Ef=0,Yt=0,Bl=0,Ys=null,Dt=null,ch=!1,Yf=0,v1=0,Tf=1/0,Bf=null,tr=null,Me=0,Na=null,ro=null,Za=0,dh=0,ph=null,A1=null,vl=null,Al=null,Cl=null,Js=0,$u=null;function $t(){return(ce&2)!==0&&ae!==0?ae&-ae:_.T!==null?bm():Ey()}function C1(){if(Yt===0)if((ae&536870912)===0||J){var t=Lu;Lu<<=1,(Lu&3932160)===0&&(Lu=262144),Yt=t}else Yt=536870912;return t=mt.current,t!==null&&(t.flags|=32),Yt}function Ol(t,e){if(e!=null){var a=t.stateNode,n=a.ref;n===null&&(n=a.ref=Q1(hn(t.memoizedProps,a))),Al===null&&(Al=[]),Al.push(e.bind(null,n))}}function Pt(t,e,a){(t===we&&(he===2||he===9)||t.cancelPendingCommit!==null)&&(Nl(t,0),Xn(t,ae,Yt,!1)),gi(t,a),((ce&2)===0||t!==we)&&(t===we&&((ce&2)===0&&(Jr|=a),Re===4&&Xn(t,ae,Yt,!1)),en(t))}function S1(t,e,a){if((ce&6)!==0)throw Error(B(327));var n=!a&&(e&127)===0&&(e&t.expiredLanes)===0||mi(t,e),r=n?H2(t,e):cp(t,e,!0),o=n;do{if(r===0){Gl&&!n&&Xn(t,e,0,!1);break}else{if(a=t.current.alternate,o&&!z2(a)){r=cp(t,e,!1),o=!1;continue}if(r===2){if(o=e,t.errorRecoveryDisabledLanes&o)var l=0;else l=t.pendingLanes&-536870913,l=l!==0?l:l&536870912?536870912:0;if(l!==0){e=l;e:{var s=t;r=Ys;var i=s.current.memoizedState.isDehydrated;if(i&&(Nl(s,l).flags|=256),l=cp(s,l,!1),l!==2&&l!==6){if(xm&&!i){s.errorRecoveryDisabledLanes|=o,Jr|=o,r=4;break e}o=Dt,Dt=r,o!==null&&(Dt===null?Dt=o:Dt.push.apply(Dt,o))}r=l}if(o=!1,r!==2)continue}}if(r===1){Nl(t,0),Xn(t,e,0,!0);break}e:{switch(n=t,o=r,o){case 0:case 1:throw Error(B(345));case 4:if((e&4194048)!==e&&(e&62914560)!==e)break;case 6:Xn(n,e,Yt,!Kn);break e;case 2:Dt=null;break;case 3:case 5:break;default:throw Error(B(329))}if((e&62914560)===e&&(r=Yf+300-Jt(),10<r)){if(Xn(n,e,Yt,!Kn),Mf(n,0,!0)!==0)break e;Za=e,n.timeoutHandle=Lm(kx.bind(null,n,a,Dt,Bf,ch,e,Yt,Jr,Bl,Kn,o,"Throttled",-0,0),r);break e}kx(n,a,Dt,Bf,ch,e,Yt,Jr,Bl,Kn,o,null,-0,0)}}break}while(!0);en(t)}function kx(t,e,a,n,r,o,l,s,i,u,f,d,p,h){t.timeoutHandle=-1;var w=e.subtreeFlags,y=(o&335544064)===o;if(d=null,(y||w&8192||(w&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Xa},jt=null,y1(e,o,d),y&&(w=d,y=t.containerInfo,y=(y.nodeType===9?y:y.ownerDocument).__reactViewTransition,y!=null&&(w.count++,w.waitingForViewTransition=!0,w=fi.bind(w),y.finished.then(w,w))),w=(o&62914560)===o?Yf-Jt():(o&4194048)===o?v1-Jt():0,w=HS(d,w),w!==null)){Za=o,t.cancelPendingCommit=w(Ux.bind(null,t,e,o,a,n,r,l,s,i,u,f,d,null,p,h)),Xn(t,o,l,!u);return}Ux(t,e,o,a,n,r,l,s,i,u,f,d)}function z2(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var n=0;n<a.length;n++){var r=a[n],o=r.getSnapshot;r=r.value;try{if(!ea(o(),r))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Xn(t,e,a,n){e=vy(t,e),e&=~Ef,e&=~Jr,t.suspendedLanes|=e,t.pingedLanes&=~e,n&&(t.warmLanes|=e),n=t.expirationTimes;for(var r=e;0<r;){var o=31-Wt(r),l=1<<o;n[o]=-1,r&=~l}a!==0&&Cy(t,a,e)}function Jf(){return(ce&6)===0?(vi(0,!1),!1):!0}function ym(){if($!==null){if(he===0)var t=$.return;else t=$,fn=uo=null,tm(t),bl=null,ni=0,t=$;for(;t!==null;)$b(t.alternate,t),t=t.return;$=null}}function Nl(t,e){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,oS(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Za=0,ym(),we=t,$=a=cn(t.current,null),ae=e,he=0,Qt=null,Kn=!1,Gl=mi(t,e),xm=!1,Bl=Yt=Ef=Jr=ur=Re=0,Dt=Ys=null,ch=!1,yn=vy(t,e),Ff(),a}function I1(t,e){X=null,_.H=Lf,e===Fl||e===_f?(e=ox(),he=3):e===Xh?(e=ox(),he=4):he=e===um?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Qt=e,$===null&&(Re=1,vf(t,ga(e,t.current)))}function E1(){var t=mt.current;return t===null?!0:(ae&4194048)===ae?bt===null:(ae&62914560)===ae||(ae&536870912)!==0?t===bt:!1}function T1(){var t=_.H;return _.H=Lf,t===null?Lf:t}function B1(){var t=_.A;return _.A=M2,t}function Of(){Re=4,Kn||(ae&4194048)!==ae&&mt.current!==null||(Gl=!0),(ur&134217727)===0&&(Jr&134217727)===0||we===null||Xn(we,ae,Yt,!1)}function cp(t,e,a){var n=ce;ce|=2;var r=T1(),o=B1();(we!==t||ae!==e)&&(Bf=null,Nl(t,e)),e=!1;var l=Re;e:do try{if(he!==0&&$!==null){var s=$,i=Qt;switch(he){case 8:ym(),l=6;break e;case 3:case 2:case 9:case 6:mt.current===null&&(e=!0);var u=he;if(he=0,Qt=null,hl(t,s,i,u),a&&Gl){l=0;break e}break;default:u=he,he=0,Qt=null,hl(t,s,i,u)}}R2(),l=Re;break}catch(f){I1(t,f)}while(!0);return e&&t.shellSuspendCounter++,fn=uo=null,ce=n,_.H=r,_.A=o,$===null&&(we=null,ae=0,Ff()),l}function R2(){for(;$!==null;)O1($)}function H2(t,e){var a=ce;ce|=2;var n=T1(),r=B1();we!==t||ae!==e?(Bf=null,Tf=Jt()+500,Nl(t,e)):Gl=mi(t,e);e:do try{if(he!==0&&$!==null){e=$;var o=Qt;t:switch(he){case 1:he=0,Qt=null,hl(t,e,o,1);break;case 2:case 9:if(rx(o)){he=0,Qt=null,Dx(e);break}e=function(){he!==2&&he!==9||we!==t||(he=7),en(t)},o.then(e,e);break e;case 3:he=7;break e;case 4:he=5;break e;case 7:rx(o)?(he=0,Qt=null,Dx(e)):(he=0,Qt=null,hl(t,e,o,7));break;case 5:var l=null;switch($.tag){case 26:l=$.memoizedState;case 5:case 27:var s=$;if(l?tw(l):s.stateNode.complete){he=0,Qt=null;var i=s.sibling;if(i!==null)$=i;else{var u=s.return;u!==null?($=u,Zf(u)):$=null}break t}}he=0,Qt=null,hl(t,e,o,5);break;case 6:he=0,Qt=null,hl(t,e,o,6);break;case 8:ym(),Re=6;break e;default:throw Error(B(462))}}F2();break}catch(f){I1(t,f)}while(!0);return fn=uo=null,_.H=n,_.A=r,ce=a,$!==null?0:(we=null,ae=0,Ff(),Re)}function F2(){for(;$!==null&&!nC();)O1($)}function O1(t){var e=Wb(t.alternate,t,yn);t.memoizedProps=t.pendingProps,e===null?Zf(t):$=e}function Dx(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=Lx(a,e,e.pendingProps,e.type,void 0,ae);break;case 11:e=Lx(a,e,e.pendingProps,e.type.render,e.ref,ae);break;case 5:tm(e);var n=e;n===lt&&(J?(hf(n),n.tag===5&&n.stateNode!=null&&(Ce=n.stateNode)):(hf(n),J=!0));default:$b(a,e),e=$=eb(e,yn),e=Wb(a,e,yn)}t.memoizedProps=t.pendingProps,e===null?Zf(t):$=e}function hl(t,e,a,n){fn=uo=null,tm(e),bl=null,ni=0;var r=e.return;try{if(E2(t,r,e,a,ae)){Re=1,vf(t,ga(a,t.current)),$=null;return}}catch(o){if(r!==null)throw $=r,o;Re=1,vf(t,ga(a,t.current)),$=null;return}e.flags&32768?(J||n===1?t=!0:Gl||(ae&536870912)!==0?t=!1:(Kn=t=!0,(n===2||n===9||n===3||n===6)&&(n=mt.current,n!==null&&n.tag===13&&(n.flags|=16384))),N1(e,t)):Zf(e)}function Zf(t){var e=t;do{if((e.flags&32768)!==0){N1(e,Kn);return}t=e.return;var a=N2(e.alternate,e,yn);if(a!==null){$=a;return}if(e=e.sibling,e!==null){$=e;return}$=e=t}while(e!==null);Re===0&&(Re=5)}function N1(t,e){do{var a=k2(t.alternate,t);if(a!==null){a.flags&=32767,$=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){$=t;return}$=t=a}while(t!==null);Re=6,$=null}function Ux(t,e,a,n,r,o,l,s,i,u,f,d){t.cancelPendingCommit=null;do Wf();while(Me!==0);if((ce&6)!==0)throw Error(B(327));if(e!==null){if(e===t.current)throw Error(B(177));t===we&&($=we=null,ae=0),ro=e,Na=t,Za=a,ph=r,A1=n,q2(t,e,a,l,s,i,d)}}function q2(t,e,a,n,r,o,l){var s=e.lanes|e.childLanes;if(dh=s,s|=qh,pC(t,a,s,n,r,o),Al=null,(a&335544064)===a?(Cl=m2(t),n=10262):(Cl=null,n=10256),(e.subtreeFlags&n)!==0||(e.flags&n)!==0?(t.callbackNode=null,t.callbackPriority=0,X2(uf,function(){return xh(),null})):(t.callbackNode=null,t.callbackPriority=0),Sf=!1,n=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||n){n=_.T,_.T=null,r=de.p,de.p=2,o=ce,ce|=4;try{D2(t,e,a)}finally{ce=o,de.p=r,_.T=n}}Me=1,Sf?vl=cS(l,t.containerInfo,Cl,hh,mh,_2,gh,xh,G2,null,null):(hh(),mh(),gh())}function G2(t){if(Me!==0){var e=Na.onRecoverableError;e(t,{componentStack:null})}}function _2(){Me===3&&(Me=0,g1(ro,Na),Me=4)}function hh(){if(Me===1){Me=0;var t=Na,e=ro,a=Za,n=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||n){n=_.T,_.T=null;var r=de.p;de.p=2;var o=ce;ce|=4;try{zs=If=!1,h1(e,t,a),a=Lh;var l=Ky(t.containerInfo),s=a.focusedElem,i=a.selectionRange;if(l!==s&&s&&s.ownerDocument&&Qy(s.ownerDocument.documentElement,s)){if(i!==null&&Fh(s)){var u=i.start,f=i.end;if(f===void 0&&(f=u),"selectionStart"in s)s.selectionStart=u,s.selectionEnd=Math.min(f,s.value.length);else{var d=s.ownerDocument||document,p=d&&d.defaultView||window;if(p.getSelection){var h=p.getSelection(),w=s.textContent.length,y=Math.min(i.start,w),v=i.end===void 0?y:Math.min(i.end,w);!h.extend&&y>v&&(l=v,v=y,y=l);var m=J0(s,y),g=J0(s,v);if(m&&g&&(h.rangeCount!==1||h.anchorNode!==m.node||h.anchorOffset!==m.offset||h.focusNode!==g.node||h.focusOffset!==g.offset)){var x=d.createRange();x.setStart(m.node,m.offset),h.removeAllRanges(),y>v?(h.addRange(x),h.extend(g.node,g.offset)):(x.setEnd(g.node,g.offset),h.addRange(x))}}}}for(d=[],h=s;h=h.parentNode;)h.nodeType===1&&d.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<d.length;s++){var L=d[s];L.element.scrollLeft=L.left,L.element.scrollTop=L.top}}Pl=!!wh,Lh=wh=null}finally{ce=o,de.p=r,_.T=n}}t.current=e,Me=2}}function mh(){if(Me===2){Me=0;var t=Na,e=ro,a=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||a){a=_.T,_.T=null;var n=de.p;de.p=2;var r=ce;ce|=4;try{i1(t,e.alternate,e)}finally{ce=r,de.p=n,_.T=a}}Me=3}}function gh(){if(Me===4||Me===3){Me=0;var t=vl;vl=null,rC();var e=Na,a=ro,n=Za,r=A1,o=(n&335544064)===n?10262:10256;if((a.subtreeFlags&o)!==0||(a.flags&o)!==0?Me=5:(Me=0,ro=Na=null,k1(e,e.pendingLanes)),o=e.pendingLanes,o===0&&(tr=null),Uh(n),a=a.stateNode,Zt&&typeof Zt.onCommitFiberRoot=="function")try{Zt.onCommitFiberRoot(hi,a,void 0,(a.current.flags&128)===128)}catch{}if(r!==null){a=_.T,o=de.p,de.p=2,_.T=null;try{for(var l=e.onRecoverableError,s=0;s<r.length;s++){var i=r[s];l(i.value,{componentStack:i.stack})}}finally{_.T=a,de.p=o}}if(r=Al,l=Cl,Cl=null,r!==null&&(Al=null,l===null&&(l=[]),t!==null))for(i=0;i<r.length;i++)a=(0,r[i])(l),a!==void 0&&t.finished.finally(a);(Za&3)!==0&&Wf(),en(e),o=e.pendingLanes,(n&261930)!==0&&(o&42)!==0?e===$u?Js++:(Js=0,$u=e):(Js=0,$u=null),vi(0,!1)}}function k1(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,bi(e)))}function Wf(){return vl!==null&&(vl.skipTransition(),vl=null),hh(),mh(),gh(),xh()}function xh(){if(Me!==5)return!1;var t=Na,e=dh;dh=0;var a=Uh(Za),n=_.T,r=de.p;try{de.p=32>a?32:a,_.T=null,a=ph,ph=null;var o=Na,l=Za;if(Me=0,ro=Na=null,Za=0,(ce&6)!==0)throw Error(B(331));var s=ce;if(ce|=4,w1(o.current),x1(o,o.current,l,a),ce=s,vi(0,!1),Zt&&typeof Zt.onPostCommitFiberRoot=="function")try{Zt.onPostCommitFiberRoot(hi,o)}catch{}return!0}finally{de.p=r,_.T=n,k1(t,e)}}function Mx(t,e,a){e=ga(a,e),e=Jp(t.stateNode,e,2),t=Wn(t,e,2),t!==null&&(gi(t,2),en(t))}function ge(t,e,a){if(t.tag===3)Mx(t,t,a);else for(;e!==null;){if(e.tag===3){Mx(e,t,a);break}else if(e.tag===1){var n=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(tr===null||!tr.has(n))){t=ga(a,t),a=Xb(2),n=Wn(e,a,2),n!==null&&(jb(a,n,e,t),gi(n,2),en(n));break}}e=e.return}}function dp(t,e,a){var n=t.pingCache;if(n===null){n=t.pingCache=new P2;var r=new Set;n.set(e,r)}else r=n.get(e),r===void 0&&(r=new Set,n.set(e,r));r.has(a)||(xm=!0,r.add(a),t=V2.bind(null,t,e,a),e.then(t,t))}function V2(t,e,a){var n=t.pingCache;n!==null&&n.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,we===t&&(ae&a)===a&&((Re===4||Re===3&&(ae&62914560)===ae&&300>Jt()-Yf)&&(ce&2)===0?Nl(t,0):Ef|=a,Bl===ae&&(Bl=0)),en(t)}function D1(t,e){e===0&&(e=Ay()),t=io(t,e),t!==null&&(gi(t,e),en(t))}function Q2(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),D1(t,a)}function K2(t,e){var a=0;switch(t.tag){case 31:case 13:var n=t.stateNode,r=t.memoizedState;r!==null&&(a=r.retryLane);break;case 19:n=t.stateNode;break;case 22:n=t.stateNode._retryCache;break;default:throw Error(B(314))}n!==null&&n.delete(e),D1(t,a)}function X2(t,e){return kh(t,e)}var kl=null,al=null,yh=!1,Nf=!1,pp=!1,jn=0;function en(t){t!==al&&t.next===null&&(al===null?kl=al=t:al=al.next=t),Nf=!0,yh||(yh=!0,Y2())}function vi(t,e){if(!pp&&Nf){pp=!0;do for(var a=!1,n=kl;n!==null;){if(!e)if(t!==0){var r=n.pendingLanes;if(r===0)var o=0;else{var l=n.suspendedLanes,s=n.pingedLanes;o=(1<<31-Wt(42|t)+1)-1,o&=r&~(l&~s),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(a=!0,Px(n,o))}else o=ae,o=Mf(n,n===we?o:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(o&3)===0||mi(n,o)||(a=!0,Px(n,o));n=n.next}while(a);pp=!1}}function j2(){U1()}function U1(){Nf=yh=!1;var t=0;jn!==0&&rS()&&(t=jn);for(var e=Jt(),a=null,n=kl;n!==null;){var r=n.next,o=M1(n,e);o===0?(n.next=null,a===null?kl=r:a.next=r,r===null&&(al=a)):(a=n,(t!==0||(o&3)!==0)&&(Nf=!0)),n=r}Me!==0&&Me!==5||vi(t,!1),jn!==0&&(jn=0)}function M1(t,e){for(var a=t.suspendedLanes,n=t.pingedLanes,r=t.expirationTimes,o=t.pendingLanes&-62914561;0<o;){var l=31-Wt(o),s=1<<l,i=r[l];i===-1?((s&a)===0||(s&n)!==0)&&(r[l]=dC(s,e)):i<=e&&(t.expiredLanes|=s),o&=~s}if(e=we,a=ae,a=Mf(t,t===e?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),n=t.callbackNode,a===0||t===e&&(he===2||he===9)||t.cancelPendingCommit!==null)return n!==null&&n!==null&&Qd(n),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||mi(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(n!==null&&Qd(n),Uh(a)){case 2:case 8:a=wy;break;case 32:a=uf;break;case 268435456:a=Ly;break;default:a=uf}return n=P1.bind(null,t),a=kh(a,n),t.callbackPriority=e,t.callbackNode=a,e}return n!==null&&n!==null&&Qd(n),t.callbackPriority=2,t.callbackNode=null,2}function P1(t,e){if(Me!==0&&Me!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Wf()&&t.callbackNode!==a)return null;var n=ae;return n=Mf(t,t===we?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),n===0?null:(S1(t,n,e),M1(t,Jt()),t.callbackNode!=null&&t.callbackNode===a?P1.bind(null,t):null)}function Px(t,e){if(Wf())return null;S1(t,e,!0)}function Y2(){lS(function(){(ce&6)!==0?kh(by,j2):U1()})}function bm(){if(jn===0){var t=eo;t===0&&(t=wu,wu<<=1,(wu&261888)===0&&(wu=256)),jn=t}return jn}function zx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:qu(t)}function J2(t,e,a,n,r){if(e==="submit"&&a&&a.stateNode===r){var o=zx((r[Rt]||null).action),l=n.submitter;l&&(e=(e=l[Rt]||null)?zx(e.formAction):l.getAttribute("formAction"),e!==null&&(o=e,l=null));var s=new zf("action","action",null,n,r);t.push({event:s,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(jn!==0){var i=new FormData(r,l);jp(a,{pending:!0,data:i,method:r.method,action:o},null,i)}}else typeof o=="function"&&(s.preventDefault(),i=new FormData(r,l),jp(a,{pending:!0,data:i,method:r.method,action:o},o,i))},currentTarget:r}]})}}for(Mu=0;Mu<zp.length;Mu++)Pu=zp[Mu],Rx=Pu.toLowerCase(),Hx=Pu[0].toUpperCase()+Pu.slice(1),ka(Rx,"on"+Hx);var Pu,Rx,Hx,Mu;ka(jy,"onAnimationEnd");ka(Yy,"onAnimationIteration");ka(Jy,"onAnimationStart");ka("dblclick","onDoubleClick");ka("focusin","onFocus");ka("focusout","onBlur");ka(s2,"onTransitionRun");ka(i2,"onTransitionStart");ka(u2,"onTransitionCancel");ka(Zy,"onTransitionEnd");Il("onMouseEnter",["mouseout","mouseover"]);Il("onMouseLeave",["mouseout","mouseover"]);Il("onPointerEnter",["pointerout","pointerover"]);Il("onPointerLeave",["pointerout","pointerover"]);lo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));lo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));lo("onBeforeInput",["compositionend","keypress","textInput","paste"]);lo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));lo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));lo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var li="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Z2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(li));function z1(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var n=t[a],r=n.event;n=n.listeners;e:{var o=void 0;if(e)for(var l=n.length-1;0<=l;l--){var s=n[l],i=s.instance,u=s.currentTarget;if(s=s.listener,i!==o&&r.isPropagationStopped())break e;o=s,r.currentTarget=u;try{o(r)}catch(f){cf(f)}r.currentTarget=null,o=i}else for(l=0;l<n.length;l++){if(s=n[l],i=s.instance,u=s.currentTarget,s=s.listener,i!==o&&r.isPropagationStopped())break e;o=s,r.currentTarget=u;try{o(r)}catch(f){cf(f)}r.currentTarget=null,o=i}}}}function W(t,e){var a=e[D0];a===void 0&&(a=e[D0]=new Set);var n=t+"__bubble";a.has(n)||(R1(e,t,2,!1),a.add(n))}function hp(t,e,a){var n=0;e&&(n|=4),R1(a,t,n,e)}var zu="_reactListening"+Math.random().toString(36).slice(2);function wm(t){if(!t[zu]){t[zu]=!0,By.forEach(function(a){a!=="selectionchange"&&(Z2.has(a)||hp(a,!1,t),hp(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[zu]||(e[zu]=!0,hp("selectionchange",!1,e))}}function R1(t,e,a,n){switch(iw(e)){case 2:var r=_S;break;case 8:r=VS;break;default:r=Em}a=r.bind(null,e,a,t),r=void 0,!Dp||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),n?r!==void 0?t.addEventListener(e,a,{capture:!0,passive:r}):t.addEventListener(e,a,!0):r!==void 0?t.addEventListener(e,a,{passive:r}):t.addEventListener(e,a,!1)}function mp(t,e,a,n,r){var o=n;if((e&1)===0&&(e&2)===0&&n!==null)e:for(;;){if(n===null)return;var l=n.tag;if(l===3||l===4){var s=n.stateNode.containerInfo;if(s===r)break;if(l===4)for(l=n.return;l!==null;){var i=l.tag;if((i===3||i===4)&&l.stateNode.containerInfo===r)return;l=l.return}for(;s!==null;){if(l=Vr(s),l===null)return;if(i=l.tag,i===5||i===6||i===26||i===27){n=o=l;continue e}s=s.parentNode}}n=n.return}zy(function(){var u=o,f=Ph(a),d=[];e:{var p=Wy.get(t);if(p!==void 0){var h=zf,w=t;switch(t){case"keypress":if(_u(a)===0)break e;case"keydown":case"keyup":h=zC;break;case"focusin":w="focus",h=Zd;break;case"focusout":w="blur",h=Zd;break;case"beforeblur":case"afterblur":h=Zd;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=q0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=SC;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=GC;break;case jy:case Yy:case Jy:h=TC;break;case Zy:h=VC;break;case"scroll":case"scrollend":h=AC;break;case"wheel":h=KC;break;case"copy":case"cut":case"paste":h=OC;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=_0;break;case"submit":h=FC;break;case"toggle":case"beforetoggle":h=jC}var y=(e&4)!==0,v=!y&&(t==="scroll"||t==="scrollend"),m=y?p!==null?p+"Capture":null:p;y=[];for(var g=u,x;g!==null;){var L=g;if(x=L.stateNode,L=L.tag,L!==5&&L!==26&&L!==27||x===null||m===null||(L=Ws(g,m),L!=null&&y.push(si(g,L,x))),v)break;g=g.return}0<y.length&&(p=new h(p,w,null,a,f),d.push({event:p,listeners:y}))}}if((e&7)===0){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&a!==kp&&(w=a.relatedTarget||a.fromElement)&&(Vr(w)||w[Rl]))break e;(p||h)&&(w=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,p?(h=a.relatedTarget||a.toElement,p=u,h=h?Vr(h):null,h!==null&&(v=pi(h),y=h.tag,h!==v||y!==5&&y!==27&&y!==6)&&(h=null)):(p=null,h=u),p!==h&&(y=q0,L="onMouseLeave",m="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(y=_0,L="onPointerLeave",m="onPointerEnter",g="pointer"),v=p==null?w:Ms(p),x=h==null?w:Ms(h),w=new y(L,g+"leave",p,a,f),w.target=v,w.relatedTarget=x,L=null,Vr(f)===u&&(y=new y(m,g+"enter",h,a,f),y.target=x,y.relatedTarget=v,L=y),v=L,y=p&&h?wp(p,h,W2):null,p!==null&&Fx(d,w,p,y,!1),h!==null&&v!==null&&Fx(d,v,h,y,!0)))}e:{if(p=u?Ms(u):window,h=p.nodeName&&p.nodeName.toLowerCase(),h==="select"||h==="input"&&p.type==="file")var A=X0;else if(K0(p))if(_y)A=r2;else{A=a2;var T=t2}else h=p.nodeName,!h||h.toLowerCase()!=="input"||p.type!=="checkbox"&&p.type!=="radio"?u&&Mh(u.elementType)&&(A=X0):A=n2;if(A&&(A=A(t,u))){Gy(d,A,a,f);break e}T&&T(t,p,u)}switch(T=u?Ms(u):window,t){case"focusin":(K0(T)||T.contentEditable==="true")&&(il=T,Mp=u,Fs=null);break;case"focusout":Fs=Mp=il=null;break;case"mousedown":Pp=!0;break;case"contextmenu":case"mouseup":case"dragend":Pp=!1,Z0(d,a,f);break;case"selectionchange":if(l2)break;case"keydown":case"keyup":Z0(d,a,f)}var E;if(Hh)e:{switch(t){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else sl?Fy(t,a)&&(I="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(I="onCompositionStart");I&&(Hy&&a.locale!=="ko"&&(sl||I!=="onCompositionStart"?I==="onCompositionEnd"&&sl&&(E=Ry()):(Vn=f,zh="value"in Vn?Vn.value:Vn.textContent,sl=!0)),T=kf(u,I),0<T.length&&(I=new G0(I,t,null,a,f),d.push({event:I,listeners:T}),E?I.data=E:(E=qy(a),E!==null&&(I.data=E)))),(E=JC?ZC(t,a):WC(t,a))&&(I=kf(u,"onBeforeInput"),0<I.length&&(T=new G0("onBeforeInput","beforeinput",null,a,f),d.push({event:T,listeners:I}),T.data=E)),J2(d,t,u,a,f)}z1(d,e)})}function si(t,e,a){return{instance:t,listener:e,currentTarget:a}}function kf(t,e){for(var a=e+"Capture",n=[];t!==null;){var r=t,o=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||o===null||(r=Ws(t,a),r!=null&&n.unshift(si(t,r,o)),r=Ws(t,e),r!=null&&n.push(si(t,r,o))),t.tag===3)return n;t=t.return}return[]}function W2(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Fx(t,e,a,n,r){for(var o=e._reactName,l=[];a!==null&&a!==n;){var s=a,i=s.alternate,u=s.stateNode;if(s=s.tag,i!==null&&i===n)break;s!==5&&s!==26&&s!==27||u===null||(i=u,r?(u=Ws(a,o),u!=null&&l.unshift(si(a,u,i))):r||(u=Ws(a,o),u!=null&&l.push(si(a,u,i)))),a=a.return}l.length!==0&&t.push({event:e,listeners:l})}var $2=/\\r\\n?/g,eS=/\\u0000|\\uFFFD/g;function qx(t){return(typeof t=="string"?t:""+t).replace($2,`\n`).replace(eS,"")}function H1(t,e){return e=qx(e),qx(t)===e}function me(t,e,a,n,r,o){switch(a){case"children":if(typeof n=="string")e==="body"||e==="textarea"&&n===""||El(t,n);else if(typeof n=="number"||typeof n=="bigint")e!=="body"&&El(t,""+n);else return;break;case"className":Au(t,"class",n);break;case"tabIndex":Au(t,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":Au(t,a,n);break;case"style":Py(t,n,o);return;case"data":if(e!=="object"){Au(t,"data",n);break}case"src":case"href":if(n===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){t.removeAttribute(a);break}n=qu(n),t.setAttribute(a,n);break;case"action":case"formAction":if(typeof n=="function"){t.setAttribute(a,"javascript:throw new Error(\'A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\\\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().\')");break}else typeof o=="function"&&(a==="formAction"?(e!=="input"&&me(t,e,"name",r.name,r,null),me(t,e,"formEncType",r.formEncType,r,null),me(t,e,"formMethod",r.formMethod,r,null),me(t,e,"formTarget",r.formTarget,r,null)):(me(t,e,"encType",r.encType,r,null),me(t,e,"method",r.method,r,null),me(t,e,"target",r.target,r,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){t.removeAttribute(a);break}n=qu(n),t.setAttribute(a,n);break;case"onClick":n!=null&&(t.onclick=Xa);return;case"onScroll":n!=null&&W("scroll",t);return;case"onScrollEnd":n!=null&&W("scrollend",t);return;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(B(61));if(a=n.__html,a!=null){if(r.children!=null)throw Error(B(60));o?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":t.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){t.removeAttribute("xlink:href");break}a=qu(n),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(a,n):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":n===!0?t.setAttribute(a,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(a,n):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?t.setAttribute(a,n):t.removeAttribute(a);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?t.removeAttribute(a):t.setAttribute(a,n);break;case"popover":W("beforetoggle",t),W("toggle",t),Fu(t,"popover",n);break;case"xlinkActuate":ln(t,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":ln(t,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":ln(t,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":ln(t,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":ln(t,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":ln(t,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":ln(t,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":ln(t,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":ln(t,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":Fu(t,"is",n);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=LC.get(a)||a,Fu(t,a,n);else return}ie=!0}function bh(t,e,a,n,r,o){switch(a){case"style":Py(t,n,o);return;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(B(61));if(a=n.__html,a!=null){if(r.children!=null)throw Error(B(60));o?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof n=="string")El(t,n);else if(typeof n=="number"||typeof n=="bigint")El(t,""+n);else return;break;case"onScroll":n!=null&&W("scroll",t);return;case"onScrollEnd":n!=null&&W("scrollend",t);return;case"onClick":n!=null&&(t.onclick=Xa);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Oy.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(r=a.endsWith("Capture"),o=a.slice(2,r?a.length-7:void 0),e=t[Rt]||null,e=e!=null?e[a]:null,typeof e=="function"&&t.removeEventListener(o,e,r),typeof n=="function")){typeof e!="function"&&e!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(o,n,r);break e}ie=!0,a in t?t[a]=n:n===!0?t.setAttribute(a,""):Fu(t,a,n)}return}ie=!0}function ht(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":W("error",t),W("load",t);var n=!1,r=!1,o;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];if(l!=null)switch(o){case"src":n=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(B(137,e));default:me(t,e,o,l,a,null)}}r&&me(t,e,"srcSet",a.srcSet,a,null),n&&me(t,e,"src",a.src,a,null);return;case"input":W("invalid",t);var s=o=l=r=null,i=null,u=null;for(n in a)if(a.hasOwnProperty(n)){var f=a[n];if(f!=null)switch(n){case"name":r=f;break;case"type":l=f;break;case"checked":i=f;break;case"defaultChecked":u=f;break;case"value":o=f;break;case"defaultValue":s=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(B(137,e));break;default:me(t,e,n,f,a,null)}}Dy(t,o,s,i,u,l,r,!1);return;case"select":W("invalid",t),n=l=o=null;for(r in a)if(a.hasOwnProperty(r)&&(s=a[r],s!=null))switch(r){case"value":o=s;break;case"defaultValue":l=s;break;case"multiple":n=s;default:me(t,e,r,s,a,null)}e=o,a=l,t.multiple=!!n,e!=null?gl(t,!!n,e,!1):a!=null&&gl(t,!!n,a,!0);return;case"textarea":W("invalid",t),o=r=n=null;for(l in a)if(a.hasOwnProperty(l)&&(s=a[l],s!=null))switch(l){case"value":n=s;break;case"defaultValue":r=s;break;case"children":o=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(B(91));break;default:me(t,e,l,s,a,null)}My(t,n,r,o);return;case"option":for(i in a)if(a.hasOwnProperty(i)&&(n=a[i],n!=null))switch(i){case"selected":t.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:me(t,e,i,n,a,null)}return;case"dialog":W("beforetoggle",t),W("toggle",t),W("cancel",t),W("close",t);break;case"iframe":case"object":W("load",t);break;case"video":case"audio":for(n=0;n<li.length;n++)W(li[n],t);break;case"image":W("error",t),W("load",t);break;case"details":W("toggle",t);break;case"embed":case"source":case"link":W("error",t),W("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(u in a)if(a.hasOwnProperty(u)&&(n=a[u],n!=null))switch(u){case"children":case"dangerouslySetInnerHTML":throw Error(B(137,e));default:me(t,e,u,n,a,null)}return;default:if(Mh(e)){for(f in a)a.hasOwnProperty(f)&&(n=a[f],n!==void 0&&bh(t,e,f,n,a,void 0));return}}for(s in a)a.hasOwnProperty(s)&&(n=a[s],n!=null&&me(t,e,s,n,a,null))}var tS={};function aS(t,e,a,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,o=null,l=null,s=null,i=null,u=null,f=null;for(h in a){var d=a[h];if(a.hasOwnProperty(h)&&d!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":i=d;default:n.hasOwnProperty(h)||me(t,e,h,null,n,d)}}for(var p in n){var h=n[p];if(d=a[p],n.hasOwnProperty(p)&&(h!=null||d!=null))switch(p){case"type":h!==d&&(ie=!0),o=h;break;case"name":h!==d&&(ie=!0),r=h;break;case"checked":h!==d&&(ie=!0),u=h;break;case"defaultChecked":h!==d&&(ie=!0),f=h;break;case"value":h!==d&&(ie=!0),l=h;break;case"defaultValue":h!==d&&(ie=!0),s=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(B(137,e));break;default:h!==d&&me(t,e,p,h,n,d)}}Np(t,l,s,i,u,f,o,r);return;case"select":h=l=s=p=null;for(o in a)if(i=a[o],a.hasOwnProperty(o)&&i!=null)switch(o){case"value":break;case"multiple":h=i;default:n.hasOwnProperty(o)||me(t,e,o,null,n,i)}for(r in n)if(o=n[r],i=a[r],n.hasOwnProperty(r)&&(o!=null||i!=null))switch(r){case"value":o!==i&&(ie=!0),p=o;break;case"defaultValue":o!==i&&(ie=!0),s=o;break;case"multiple":o!==i&&(ie=!0),l=o;default:o!==i&&me(t,e,r,o,n,i)}e=s,a=l,n=h,p!=null?gl(t,!!a,p,!1):!!n!=!!a&&(e!=null?gl(t,!!a,e,!0):gl(t,!!a,a?[]:"",!1));return;case"textarea":h=p=null;for(s in a)if(r=a[s],a.hasOwnProperty(s)&&r!=null&&!n.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:me(t,e,s,null,n,r)}for(l in n)if(r=n[l],o=a[l],n.hasOwnProperty(l)&&(r!=null||o!=null))switch(l){case"value":r!==o&&(ie=!0),p=r;break;case"defaultValue":r!==o&&(ie=!0),h=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(B(91));break;default:r!==o&&me(t,e,l,r,n,o)}Uy(t,p,h);return;case"option":for(var w in a)if(p=a[w],a.hasOwnProperty(w)&&p!=null&&!n.hasOwnProperty(w))switch(w){case"selected":t.selected=!1;break;default:me(t,e,w,null,n,p)}for(i in n)if(p=n[i],h=a[i],n.hasOwnProperty(i)&&p!==h&&(p!=null||h!=null))switch(i){case"selected":p!==h&&(ie=!0),t.selected=p&&typeof p!="function"&&typeof p!="symbol";break;default:me(t,e,i,p,n,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in a)p=a[y],a.hasOwnProperty(y)&&p!=null&&!n.hasOwnProperty(y)&&me(t,e,y,null,n,p);for(u in n)if(p=n[u],h=a[u],n.hasOwnProperty(u)&&p!==h&&(p!=null||h!=null))switch(u){case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(B(137,e));break;default:me(t,e,u,p,n,h)}return;default:if(Mh(e)){for(var v in a)p=a[v],a.hasOwnProperty(v)&&p!==void 0&&!n.hasOwnProperty(v)&&bh(t,e,v,void 0,n,p);for(f in n)p=n[f],h=a[f],!n.hasOwnProperty(f)||p===h||p===void 0&&h===void 0||bh(t,e,f,p,n,h);return}}for(var m in a)p=a[m],a.hasOwnProperty(m)&&p!=null&&!n.hasOwnProperty(m)&&me(t,e,m,null,n,p);for(d in n)p=n[d],h=a[d],!n.hasOwnProperty(d)||p===h||p==null&&h==null||me(t,e,d,p,n,h)}function Gx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function nS(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,a=performance.getEntriesByType("resource"),n=0;n<a.length;n++){var r=a[n],o=r.transferSize,l=r.initiatorType,s=r.duration;if(o&&s&&Gx(l)){for(l=0,s=r.responseEnd,n+=1;n<a.length;n++){var i=a[n],u=i.startTime;if(u>s)break;var f=i.transferSize,d=i.initiatorType;f&&Gx(d)&&(i=i.responseEnd,l+=f*(i<s?1:(s-u)/(i-u)))}if(--n,e+=8*(o+l)/(r.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var wh=null,Lh=null;function ii(t){return t.nodeType===9?t:t.ownerDocument}function _x(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function F1(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function q1(t,e,a,n){return a=ii(a).createElement(t),a[ft]=n,a[Rt]=e,ht(a,t,e),ot(a),a}function vh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var gp=null;function rS(){var t=window.event;return t&&t.type==="popstate"?t===gp?!1:(gp=t,!0):(gp=null,!1)}var Lm=typeof setTimeout=="function"?setTimeout:void 0,oS=typeof clearTimeout=="function"?clearTimeout:void 0,Vx=typeof Promise=="function"?Promise:void 0,Qx=typeof requestAnimationFrame=="function"?requestAnimationFrame:Lm,lS=typeof queueMicrotask=="function"?queueMicrotask:typeof Vx<"u"?function(t){return Vx.resolve(null).then(t).catch(sS)}:Lm;function sS(t){setTimeout(function(){throw t})}function cr(t){return t==="head"}function Kx(t,e){var a=e,n=0;do{var r=a.nextSibling;if(t.removeChild(a),r&&r.nodeType===8)if(a=r.data,a==="/$"||a==="/&"){if(n===0){t.removeChild(r),zl(e);return}n--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")n++;else if(a==="html")yp(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,yp(a);for(var o=a.firstChild;o;){var l=o.nextSibling,s=o.nodeName;o[xi]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&o.rel.toLowerCase()==="stylesheet"||a.removeChild(o),o=l}}else a==="body"&&yp(t.ownerDocument.body);a=r}while(a);zl(e)}function Xx(t,e){var a=t;t=0;do{var n=a.nextSibling;if(a.nodeType===1?e?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(e?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),n&&n.nodeType===8)if(a=n.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=n}while(a)}function G1(t,e,a){if(e=CSS.escape(e)!==e?"r-"+btoa(e).replace(/=/g,""):e,t.style.viewTransitionName=e,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(e=t.getClientRects(),e.length===1)var n=1;else for(var r=n=0;r<e.length;r++){var o=e[r];0<o.width&&0<o.height&&n++}n===1&&(t=t.style,t.display=e.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function _1(t,e){t=t.style,e=e.style;var a=e!=null?e.hasOwnProperty("viewTransitionName")?e.viewTransitionName:e.hasOwnProperty("view-transition-name")?e["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=e!=null?e.hasOwnProperty("viewTransitionClass")?e.viewTransitionClass:e.hasOwnProperty("view-transition-class")?e["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(e==null?t.display=t.margin="":(a=e.display,t.display=a==null||typeof a=="boolean"?"":a,a=e.margin,a!=null?t.margin=a:(a=e.hasOwnProperty("marginTop")?e.marginTop:e["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,e=e.hasOwnProperty("marginBottom")?e.marginBottom:e["margin-bottom"],t.marginBottom=e==null||typeof e=="boolean"?"":e)))}function V1(t,e,a){return a=a.ownerDocument.defaultView,{rect:t,abs:e.position==="absolute"||e.position==="fixed",clip:e.clipPath!=="none"||e.overflow!=="visible"||e.filter!=="none"||e.mask!=="none"||e.mask!=="none"||e.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function Ah(t){var e=t.getBoundingClientRect(),a=getComputedStyle(t);return V1(e,a,t)}function iS(t){var e=t.getBoundingClientRect();e=new DOMRect(e.x+2e4,e.y+2e4,e.width,e.height);var a=getComputedStyle(t);return V1(e,a,t)}function uS(t){return t.documentElement.clientHeight}function fS(t){this.addEventListener("load",t),this.addEventListener("error",t)}function cS(t,e,a,n,r,o,l,s,i){var u=e.nodeType===9?e:e.ownerDocument;try{var f=u.startViewTransition({update:function(){var p=u.defaultView,h=p.navigation&&p.navigation.transition,w=u.fonts.status;n();var y=[];if(w==="loaded"&&(uS(u),u.fonts.status==="loading"&&y.push(u.fonts.ready)),w=y.length,t!==null)for(var v=t.suspenseyImages,m=0,g=0;g<v.length;g++){var x=v[g];if(!x.complete){var L=x.getBoundingClientRect();if(0<L.bottom&&0<L.right&&L.top<p.innerHeight&&L.left<p.innerWidth){if(m+=aw(x),m>af){y.length=w;break}x=new Promise(fS.bind(x)),y.push(x)}}}if(0<y.length)return p=Promise.race([Promise.all(y),new Promise(function(A){return setTimeout(A,500)})]).then(r,r),(h?Promise.allSettled([h.finished,p]):p).then(o,o);if(r(),h)return h.finished.then(o,o);o()},types:a});u.__reactViewTransition=f;var d=[];return f.ready.then(function(){for(var p=u.documentElement.getAnimations({subtree:!0}),h=0;h<p.length;h++){var w=p[h],y=w.effect,v=y.pseudoElement;if(v!=null&&v.startsWith("::view-transition")){d.push(w),w=y.getKeyframes();for(var m=v=void 0,g=!0,x=0;x<w.length;x++){var L=w[x],A=L.width;if(v===void 0)v=A;else if(v!==A){g=!1;break}if(A=L.height,m===void 0)m=A;else if(m!==A){g=!1;break}delete L.width,delete L.height,L.transform==="none"&&delete L.transform}g&&v!==void 0&&m!==void 0&&(y.setKeyframes(w),g=getComputedStyle(y.target,y.pseudoElement),g.width!==v||g.height!==m)&&(g=w[0],g.width=v,g.height=m,g=w[w.length-1],g.width=v,g.height=m,y.setKeyframes(w))}}l()},function(p){u.__reactViewTransition===f&&(u.__reactViewTransition=null);try{if(typeof p=="object"&&p!==null)switch(p.name){case"InvalidStateError":(p.message==="View transition was skipped because document visibility state is hidden."||p.message==="Skipping view transition because document visibility state has become hidden."||p.message==="Skipping view transition because viewport size changed."||p.message==="Transition was aborted because of invalid state")&&(p=null)}p!==null&&i(p)}finally{n(),r(),l()}}),f.finished.finally(function(){for(var p=0;p<d.length;p++)d[p].cancel();u.__reactViewTransition===f&&(u.__reactViewTransition=null),s()}),f}catch{return n(),r(),l(),null}}function Qr(t,e){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+e+")"}Qr.prototype.animate=function(t,e){return e=typeof e=="number"?{duration:e}:Le({},e),e.pseudoElement=this._selector,this._scope.animate(t,e)};Qr.prototype.getAnimations=function(){for(var t=this._scope,e=this._selector,a=t.getAnimations({subtree:!0}),n=[],r=0;r<a.length;r++){var o=a[r].effect;o!==null&&o.target===t&&o.pseudoElement===e&&n.push(a[r])}return n};Qr.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Q1(t){return{name:t,group:new Qr("group",t),imagePair:new Qr("image-pair",t),old:new Qr("old",t),new:new Qr("new",t)}}function ta(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ta.prototype.addEventListener=function(t,e,a){var n=null,r=null;if(!(a!=null&&typeof a!="boolean"&&(n=a.signal||null,n!==null&&n.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var o=this._eventListeners;if(K1(o,t,e,a)===-1){var l=this,s=e;a!=null&&typeof a!="boolean"&&a.once===!0&&(s=function(i){l.removeEventListener(t,e,a),typeof e=="function"?e.call(this,i):e.handleEvent(i)}),n!==null&&(r=l.removeEventListener.bind(l,t,e,a),n.addEventListener("abort",r,{once:!0}),r=n.removeEventListener.bind(n,"abort",r)),n=Dl(a),o.push({type:t,listener:e,optionsOrUseCapture:a,attachedListener:s,cleanup:r}),zt(this._fragmentFiber.child,!1,dS,t,s,n)}this._eventListeners=o}};function dS(t,e,a,n){return We(t).addEventListener(e,a,n),!1}ta.prototype.removeEventListener=function(t,e,a){var n=this._eventListeners;if(n!==null&&(e=K1(n,t,e,a),e!==-1)){var r=n[e];a=r.attachedListener;var o=r.cleanup;r=Dl(r.optionsOrUseCapture),zt(this._fragmentFiber.child,!1,pS,t,a,r),n.splice(e,1),o!==null&&o()}};function pS(t,e,a,n){return We(t).removeEventListener(e,a,n),!1}function Dl(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function jx(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function K1(t,e,a,n){if(t.length===0)return-1;n=jx(n);for(var r=0;r<t.length;r++){var o=t[r];if(o.type===e&&o.listener===a&&jx(o.optionsOrUseCapture)===n)return r}return-1}ta.prototype.dispatchEvent=function(t){var e=oo(this._fragmentFiber);if(e===null)return!0;e=We(e);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var n=e.nodeType===9?e.createComment(""):document.createTextNode("");if(a)for(var r=0;r<a.length;r++){var o=a[r];n.addEventListener(o.type,o.attachedListener,Dl(o.optionsOrUseCapture))}if(e.appendChild(n),t=n.dispatchEvent(t),a)for(r=0;r<a.length;r++)o=a[r],n.removeEventListener(o.type,o.attachedListener,Dl(o.optionsOrUseCapture));return e.removeChild(n),t}return e.dispatchEvent(t)};ta.prototype.focus=function(t){zt(this._fragmentFiber.child,!0,X1,t,void 0,void 0)};function X1(t,e){return t.tag===6?!1:(t=We(t),SS(t,e))}ta.prototype.focusLast=function(t){var e=[];zt(this._fragmentFiber.child,!0,vm,e,void 0,void 0);for(var a=e.length-1;0<=a&&!X1(e[a],t);a--);};function vm(t,e){return e.push(t),!1}ta.prototype.blur=function(){var t=oo(this._fragmentFiber);t!==null&&(t=We(t),t=ii(t).activeElement,t!==null&&zt(this._fragmentFiber.child,!1,hS,t,void 0,void 0))};function hS(t,e){return t.tag===6?!1:(t=We(t),t===e||t.contains(e)?(e.blur(),!0):!1)}ta.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),zt(this._fragmentFiber.child,!1,mS,t,void 0,void 0)};function mS(t,e){return t.tag===6||(t=We(t),e.observe(t)),!1}ta.prototype.unobserveUsing=function(t){var e=this._observers;if(e!==null&&e.has(t)){e.delete(t),zt(this._fragmentFiber.child,!1,gS,t,void 0,void 0);for(var a=e=0;a<Oa.length;a++){var n=Oa[a];n.fragmentInstance===this&&n.observer===t?t.unobserve(n.instance):Oa[e++]=n}Oa.length=e}};function gS(t,e){return t.tag===6||(t=We(t),e.unobserve(t)),!1}var Oa=[],xp=!1;function xS(t,e,a){Oa.push({fragmentInstance:t,observer:e,instance:a}),xp||(xp=!0,IS(function(){xp=!1;var n=Oa;Oa=[];for(var r=0;r<n.length;r++){var o=n[r];o.observer.unobserve(o.instance)}}))}ta.prototype.getClientRects=function(){var t=[];return zt(this._fragmentFiber.child,!1,yS,t,void 0,void 0),t};function yS(t,e){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),e.push.apply(e,a.getClientRects())}else t=We(t),e.push.apply(e,t.getClientRects());return!1}ta.prototype.getRootNode=function(t){var e=oo(this._fragmentFiber);return e===null?this:We(e).getRootNode(t)};ta.prototype.compareDocumentPosition=function(t){var e=oo(this._fragmentFiber);if(e===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];zt(this._fragmentFiber.child,!1,vm,a,void 0,void 0);var n=We(e);if(a.length===0){if(a=n,E0(this._fragmentFiber)){e:{for(e=this._fragmentFiber.return;e!==null;){if(e.tag===4){e=e.stateNode.containerInfo;break e}if(e.tag===3||e.tag===5||e.tag===27)break;e=e.return}e=null}e!=null&&(a=e)}e=this._fragmentFiber;var r=n=a.compareDocumentPosition(t);return a===t?r=Node.DOCUMENT_POSITION_CONTAINS:n&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=my(e)[1],a===null?r=Node.DOCUMENT_POSITION_PRECEDING:(t=We(a).compareDocumentPosition(t),r=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),r|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}e=We(a[0]),r=We(a[a.length-1]);var o=E0(this._fragmentFiber)?e.parentElement:n;if(o==null)return Node.DOCUMENT_POSITION_DISCONNECTED;n=o.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY,o=o.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_CONTAINED_BY;var l=e.compareDocumentPosition(t),s=r.compareDocumentPosition(t),i=l&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=n&&o&&l&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,e=n&&e===t||o&&r===t||i||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!n&&e===t||!o&&r===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:l,e&Node.DOCUMENT_POSITION_DISCONNECTED||e&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||bS(e,this._fragmentFiber,a[0],a[a.length-1],t)?e:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function bS(t,e,a,n,r){var o=Vr(r);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!o)e:{for(;o!==null;){if(o.tag===7&&(o===e||o.alternate===e)){a=!0;break e}o=o.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(o===null)return o=r.ownerDocument,r===o||r===o.documentElement||r===o.body;e:{for(o=e,e=oo(e);o!==null;){if(!(o.tag!==5&&o.tag!==3&&o.tag!==27||o!==e&&o.alternate!==e)){o=!0;break e}o=o.return}o=!1}return o}return t&Node.DOCUMENT_POSITION_PRECEDING?((e=!!o)&&!(e=o===a)&&(e=wp(a,o,T0),e===null?e=!1:(zt(e,!0,YA,o,a),o=nl,nl=null,e=o!==null)),e):t&Node.DOCUMENT_POSITION_FOLLOWING?((e=!!o)&&!(e=o===n)&&(e=wp(n,o,T0),e===null?e=!1:(zt(e,!0,JA,o,n),o=nl,bp=nl=null,e=o!==null)),e):!1}function Yx(t,e){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,e?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ta.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(B(566));var e=[];zt(this._fragmentFiber.child,!1,vm,e,void 0,void 0);var a=t!==!1;if(e.length===0){var n=my(this._fragmentFiber);if(n=a?n[1]||n[0]||oo(this._fragmentFiber):n[0]||n[1],n===null)return;if(n.tag===6){t=We(n),Yx(t,a);return}if(n=We(n),n.nodeType!==9){if(n.nodeType===11){a="host"in n?n.host:null,a!==null&&a.scrollIntoView(t);return}n.scrollIntoView(t)}}for(n=a?e.length-1:0;n!==(a?-1:e.length);){var r=e[n];r.tag===6?(r=We(r),Yx(r,a)):We(r).scrollIntoView(t),n+=a?-1:1}};function wS(t,e){return t=We(t),j1(t,e),!1}function j1(t,e){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(e)}function Y1(t,e){var a=e._eventListeners;if(a!==null)for(var n=0;n<a.length;n++){var r=a[n];t.addEventListener(r.type,r.attachedListener,Dl(r.optionsOrUseCapture))}t.nodeType!==3&&(a=e._observers,a!==null&&a.forEach(function(o){for(var l=0,s=0;s<Oa.length;s++){var i=Oa[s];(i.fragmentInstance!==e||i.observer!==o||i.instance!==t)&&(Oa[l++]=i)}Oa.length=l,o.observe(t)}),j1(t,e))}function LS(t,e){var a=e._eventListeners;if(a!==null)for(var n=0;n<a.length;n++){var r=a[n];t.removeEventListener(r.type,r.attachedListener,Dl(r.optionsOrUseCapture))}t.nodeType!==3&&(a=e._observers,a!==null&&a.forEach(function(o){typeof o.rootMargin=="string"?xS(e,o,t):o.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(e))}function Ch(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Ch(a),Pf(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function vS(t,e,a,n){for(;t.nodeType===1;){var r=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!n&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(n){if(!t[xi])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(o=t.getAttribute("rel"),o==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(o!==r.rel||t.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||t.getAttribute("title")!==(r.title==null?null:r.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(o=t.getAttribute("src"),(o!==(r.src==null?null:r.src)||t.getAttribute("type")!==(r.type==null?null:r.type)||t.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&o&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var o=r.name==null?null:""+r.name;if(r.type==="hidden"&&t.getAttribute("name")===o)return t}else return t;if(t=ya(t.nextSibling),t===null)break}return null}function AS(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ya(t.nextSibling),t===null))return null;return t}function J1(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=ya(t.nextSibling),t===null))return null;return t}function Sh(t){return t.data==="$?"||t.data==="$~"}function Am(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function CS(t,e){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||a.readyState!=="loading")e();else{var n=function(){e(),a.removeEventListener("DOMContentLoaded",n)};a.addEventListener("DOMContentLoaded",n),t._reactRetry=n}}function ya(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Ih=null;function Jx(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(e===0)return ya(t.nextSibling);e--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||e++}t=t.nextSibling}return null}function Zx(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(e===0)return t;e--}else a!=="/$"&&a!=="/&"||e++}t=t.previousSibling}return null}function SS(t,e){function a(){n=!0}if(t.ownerDocument.activeElement===t)return!0;var n=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,e)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return n}function IS(t){Qx(function(){Qx(function(e){return t(e)})})}function Z1(t,e,a){switch(e=ii(a),t){case"html":if(t=e.documentElement,!t)throw Error(B(452));return t;case"head":if(t=e.head,!t)throw Error(B(453));return t;case"body":if(t=e.body,!t)throw Error(B(454));return t;default:throw Error(B(451))}}function W1(t,e,a){for(var n in a){var r=a[n];a.hasOwnProperty(n)&&r!=null&&me(t,e,n,null,tS,r)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Xa&&(t.onclick=null),Pf(t)}function yp(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Pf(t)}var ba=new Map,Wx=new Set;function ui(t){if(typeof t.getRootNode=="function"){var e=t.getRootNode();if(e.nodeType===9||e.nodeType===11)return e}return t.nodeType===9?t:t.ownerDocument}var Ln=de.d;de.d={f:ES,r:TS,D:BS,C:OS,L:NS,m:kS,X:US,S:DS,M:MS};function ES(){var t=Ln.f(),e=Jf();return t||e}function TS(t){var e=Hl(t);e!==null&&e.tag===5&&e.type==="form"?Pb(e):Ln.r(t)}var _l=typeof document>"u"?null:document;function $1(t,e,a){var n=_l;if(n&&typeof e=="string"&&e){var r=ma(e);r=\'link[rel="\'+t+\'"][href="\'+r+\'"]\',typeof a=="string"&&(r+=\'[crossorigin="\'+a+\'"]\'),Wx.has(r)||(Wx.add(r),t={rel:t,crossOrigin:a,href:e},n.querySelector(r)===null&&(e=n.createElement("link"),ht(e,"link",t),ot(e),n.head.appendChild(e)))}}function BS(t){Ln.D(t),$1("dns-prefetch",t,null)}function OS(t,e){Ln.C(t,e),$1("preconnect",t,e)}function NS(t,e,a){Ln.L(t,e,a);var n=_l;if(n&&t&&e){var r=\'link[rel="preload"][as="\'+ma(e)+\'"]\';e==="image"&&a&&a.imageSrcSet?(r+=\'[imagesrcset="\'+ma(a.imageSrcSet)+\'"]\',typeof a.imageSizes=="string"&&(r+=\'[imagesizes="\'+ma(a.imageSizes)+\'"]\')):r+=\'[href="\'+ma(t)+\'"]\';var o=r;switch(e){case"style":o=Ul(t);break;case"script":o=Vl(t)}if(!(ba.has(o)||(t=Le({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),ba.set(o,t),n.querySelector(r)!==null||e==="style"&&n.querySelector(Ai(o))||e==="script"&&n.querySelector(Ci(o))))){var l=n.createElement("link");ht(l,"link",t),e==="style"&&(l[ff]=!0,l.onload=l.onerror=function(){Ty(l)}),ot(l),n.head.appendChild(l)}}}function kS(t,e){Ln.m(t,e);var a=_l;if(a&&t){var n=e&&typeof e.as=="string"?e.as:"script",r=\'link[rel="modulepreload"][as="\'+ma(n)+\'"][href="\'+ma(t)+\'"]\',o=r;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=Vl(t)}if(!ba.has(o)&&(t=Le({rel:"modulepreload",href:t},e),ba.set(o,t),a.querySelector(r)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Ci(o)))return}n=a.createElement("link"),ht(n,"link",t),ot(n),a.head.appendChild(n)}}}function DS(t,e,a){Ln.S(t,e,a);var n=_l;if(n&&t){var r=ml(n).hoistableStyles,o=Ul(t);e=e||"default";var l=r.get(o);if(!l){var s={loading:0,preload:null};if(l=n.querySelector(Ai(o)))s.loading=5;else{t=Le({rel:"stylesheet",href:t,"data-precedence":e},a),(a=ba.get(o))&&Cm(t,a);var i=l=n.createElement("link");ot(i),ht(i,"link",t),i._p=new Promise(function(u,f){i.onload=u,i.onerror=f}),i.addEventListener("load",function(){s.loading|=1}),i.addEventListener("error",function(){s.loading|=2}),s.loading|=4,ef(l,e,n)}l={type:"stylesheet",instance:l,count:1,state:s},r.set(o,l)}}}function US(t,e){Ln.X(t,e);var a=_l;if(a&&t){var n=ml(a).hoistableScripts,r=Vl(t),o=n.get(r);o||(o=a.querySelector(Ci(r)),o||(t=Le({src:t,async:!0},e),(e=ba.get(r))&&Sm(t,e),o=a.createElement("script"),ot(o),ht(o,"link",t),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(r,o))}}function MS(t,e){Ln.M(t,e);var a=_l;if(a&&t){var n=ml(a).hoistableScripts,r=Vl(t),o=n.get(r);o||(o=a.querySelector(Ci(r)),o||(t=Le({src:t,async:!0,type:"module"},e),(e=ba.get(r))&&Sm(t,e),o=a.createElement("script"),ot(o),ht(o,"link",t),a.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},n.set(r,o))}}function $x(t,e,a,n){var r=(r=Yn.current)?ui(r):null;if(!r)throw Error(B(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Ul(a.href),e=ml(r).hoistableStyles,n=e.get(a),n||(n={type:"style",instance:null,count:0,state:null},e.set(a,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Ul(a.href);var o=ml(r).hoistableStyles,l=o.get(t);if(l||(r=r.ownerDocument||r,l={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},o.set(t,l),(o=r.querySelector(Ai(t)))?o._p||(l.instance=o,l.state.loading=5):(o=ba.get(t),o||(o={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ba.set(t,o)),PS(r,t,o,l.state))),e&&n===null)throw Error(B(528,""));return l}if(e&&n!==null)throw Error(B(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(a=Vl(a),e=ml(r).hoistableScripts,n=e.get(a),n||(n={type:"script",instance:null,count:0,state:null},e.set(a,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(B(444,t))}}function Ul(t){return\'href="\'+ma(t)+\'"\'}function Ai(t){return\'link[rel="stylesheet"][\'+t+"]"}function ew(t){return Le({},t,{"data-precedence":t.precedence,precedence:null})}function PS(t,e,a,n){if(e=t.querySelector(\'link[rel="preload"][as="style"][\'+e+"]")){if(e[ff]!==!0){n.loading=1;return}}else e=t.createElement("link"),e[ff]=!0,e.onload=e.onerror=Ty.bind(null,e),ht(e,"link",a),ot(e),t.head.appendChild(e);n.preload=e,e.addEventListener("load",function(){return n.loading|=1}),e.addEventListener("error",function(){return n.loading|=2})}function Vl(t){return\'[src="\'+ma(t)+\'"]\'}function Ci(t){return"script[async]"+t}function ey(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var n=t.querySelector(\'style[data-href~="\'+ma(a.href)+\'"]\');if(n)return e.instance=n,ot(n),n;var r=Le({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return n=(t.ownerDocument||t).createElement("style"),ot(n),ht(n,"style",r),ef(n,a.precedence,t),e.instance=n;case"stylesheet":r=Ul(a.href);var o=t.querySelector(Ai(r));if(o)return e.state.loading|=4,e.instance=o,ot(o),o;n=ew(a),(r=ba.get(r))&&Cm(n,r),o=(t.ownerDocument||t).createElement("link"),ot(o);var l=o;return l._p=new Promise(function(s,i){l.onload=s,l.onerror=i}),ht(o,"link",n),e.state.loading|=4,ef(o,a.precedence,t),e.instance=o;case"script":return o=Vl(a.src),(r=t.querySelector(Ci(o)))?(e.instance=r,ot(r),r):(n=a,(r=ba.get(o))&&(n=Le({},a),Sm(n,r)),t=t.ownerDocument||t,r=t.createElement("script"),ot(r),ht(r,"link",n),t.head.appendChild(r),e.instance=r);case"void":return null;default:throw Error(B(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(n=e.instance,e.state.loading|=4,ef(n,a.precedence,t));return e.instance}function ef(t,e,a){for(var n=a.querySelectorAll(\'link[rel="stylesheet"][data-precedence],style[data-precedence]\'),r=n.length?n[n.length-1]:null,o=r,l=0;l<n.length;l++){var s=n[l];if(s.dataset.precedence===e)o=s;else if(o!==r)break}o?o.parentNode.insertBefore(t,o.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function Cm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Sm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var tf=null;function ty(t,e,a){if(tf===null){var n=new Map,r=tf=new Map;r.set(a,n)}else r=tf,n=r.get(a),n||(n=new Map,r.set(a,n));if(n.has(t))return n;for(n.set(t,null),a=a.getElementsByTagName(t),r=0;r<a.length;r++){var o=a[r];if(!(o[xi]||o[ft]||t==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!=="http://www.w3.org/2000/svg"){var l=o.getAttribute(e)||"";l=t+l;var s=n.get(l);s?s.push(o):n.set(l,[o])}}return n}function Eh(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function zS(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function ay(t,e){return t==="img"&&e.src!=null&&e.src!==""&&e.onLoad==null&&e.loading!=="lazy"}function tw(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function aw(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function ny(t,e){typeof e.decode=="function"&&(t.imgCount++,e.complete||(t.imgBytes+=aw(e),t.suspenseyImages.push(e)),t=FS.bind(t),e.decode().then(t,t))}function RS(t,e,a,n){if(a.type==="stylesheet"&&(typeof n.media!="string"||matchMedia(n.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var r=Ul(n.href),o=e.querySelector(Ai(r));if(o){e=o._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=fi.bind(t),e.then(t,t)),a.state.loading|=4,a.instance=o,ot(o);return}o=e.ownerDocument||e,n=ew(n),(r=ba.get(r))&&Cm(n,r),o=o.createElement("link"),ot(o);var l=o;l._p=new Promise(function(s,i){l.onload=s,l.onerror=i}),ht(o,"link",n),a.instance=o}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,e),(e=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=fi.bind(t),e.addEventListener("load",a),e.addEventListener("error",a))}}var af=0;function HS(t,e){return t.stylesheets&&t.count===0&&nf(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var n=setTimeout(function(){if(t.stylesheets&&nf(t,t.stylesheets),t.unsuspend){var o=t.unsuspend;t.unsuspend=null,o()}},6e4+e);0<t.imgBytes&&af===0&&(af=62500*nS());var r=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&nf(t,t.stylesheets),t.unsuspend)){var o=t.unsuspend;t.unsuspend=null,o()}},(t.imgBytes>af?50:800)+e);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(n),clearTimeout(r)}}:null}function nw(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)nf(t,t.stylesheets);else if(t.unsuspend){var e=t.unsuspend;t.unsuspend=null,e()}}}function fi(){this.count--,nw(this)}function FS(){this.imgCount--,nw(this)}var Df=null;function nf(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Df=new Map,e.forEach(qS,t),Df=null,fi.call(t))}function qS(t,e){if(!(e.state.loading&4)){var a=Df.get(t);if(a)var n=a.get(null);else{a=new Map,Df.set(t,a);for(var r=t.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<r.length;o++){var l=r[o];(l.nodeName==="LINK"||l.getAttribute("media")!=="not all")&&(a.set(l.dataset.precedence,l),n=l)}n&&a.set(null,n)}r=e.instance,l=r.getAttribute("data-precedence"),o=a.get(l)||n,o===n&&a.set(null,r),a.set(l,r),this.count++,n=fi.bind(this),r.addEventListener("load",n),r.addEventListener("error",n),o?o.parentNode.insertBefore(r,o.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(r,t.firstChild)),e.state.loading|=4}}var Ml={$$typeof:Ka,Provider:null,Consumer:null,_currentValue:Kr,_currentValue2:Kr,_threadCount:0};function GS(t,e,a,n,r,o,l,s,i){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kd(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kd(0),this.hiddenUpdates=Kd(null),this.identifierPrefix=n,this.onUncaughtError=r,this.onCaughtError=o,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=i,this.transitionTypes=null,this.incompleteTransitions=new Map}function rw(t,e,a,n,r,o,l,s,i,u,f,d){return t=new GS(t,e,a,l,i,u,f,d,s),e=1,o===!0&&(e|=24),o=Mt(3,null,null,e),t.current=o,o.stateNode=t,e=Qh(),e.refCount++,t.pooledCache=e,e.refCount++,o.memoizedState={element:n,isDehydrated:a,cache:e},jh(o),t}function ow(t){return t?(t=cl,t):cl}function lw(t,e,a,n,r,o){r=ow(r),n.context===null?n.context=r:n.pendingContext=r,n=Zn(e),n.payload={element:a},o=o===void 0?null:o,o!==null&&(n.callback=o),a=Wn(t,n,e),a!==null&&(Pt(a,t,e),Gs(a,t,e))}function ry(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function Im(t,e){ry(t,e),(t=t.alternate)&&ry(t,e)}function sw(t){if(t.tag===13||t.tag===31){var e=io(t,67108864);e!==null&&Pt(e,t,67108864),Im(t,67108864)}}function oy(t){if(t.tag===13||t.tag===31){var e=$t();e=Dh(e);var a=io(t,e);a!==null&&Pt(a,t,e),Im(t,e)}}var Pl=!0;function _S(t,e,a,n){var r=_.T;_.T=null;var o=de.p;try{de.p=2,Em(t,e,a,n)}finally{de.p=o,_.T=r}}function VS(t,e,a,n){var r=_.T;_.T=null;var o=de.p;try{de.p=8,Em(t,e,a,n)}finally{de.p=o,_.T=r}}function Em(t,e,a,n){if(Pl){var r=Th(n);if(r===null)mp(t,e,n,Uf,a),ly(t,n);else if(KS(r,t,e,a,n))n.stopPropagation();else if(ly(t,n),e&4&&-1<QS.indexOf(t)){for(;r!==null;){var o=Hl(r);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var l=qr(o.pendingLanes);if(l!==0){var s=o;for(s.pendingLanes|=2,s.entangledLanes|=2;l;){var i=1<<31-Wt(l);s.entanglements[1]|=i,l&=~i}en(o),(ce&6)===0&&(Tf=Jt()+500,vi(0,!1))}}break;case 31:case 13:s=io(o,2),s!==null&&Pt(s,o,2),Jf(),Im(o,2)}if(o=Th(n),o===null&&mp(t,e,n,Uf,a),o===r)break;r=o}r!==null&&n.stopPropagation()}else mp(t,e,n,null,a)}}function Th(t){return t=Ph(t),Tm(t)}var Uf=null;function Tm(t){if(Uf=null,t=Vr(t),t!==null){var e=pi(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=dy(e),t!==null)return t;t=null}else if(a===31){if(t=py(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Uf=t,null}function iw(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(oC()){case by:return 2;case wy:return 8;case uf:case lC:return 32;case Ly:return 268435456;default:return 32}default:return 32}}var Bh=!1,ar=null,nr=null,rr=null,ci=new Map,di=new Map,Gn=[],QS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ly(t,e){switch(t){case"focusin":case"focusout":ar=null;break;case"dragenter":case"dragleave":nr=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":ci.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":di.delete(e.pointerId)}}function Ns(t,e,a,n,r,o){return t===null||t.nativeEvent!==o?(t={blockedOn:e,domEventName:a,eventSystemFlags:n,nativeEvent:o,targetContainers:[r]},e!==null&&(e=Hl(e),e!==null&&sw(e)),t):(t.eventSystemFlags|=n,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function KS(t,e,a,n,r){switch(e){case"focusin":return ar=Ns(ar,t,e,a,n,r),!0;case"dragenter":return nr=Ns(nr,t,e,a,n,r),!0;case"mouseover":return rr=Ns(rr,t,e,a,n,r),!0;case"pointerover":var o=r.pointerId;return ci.set(o,Ns(ci.get(o)||null,t,e,a,n,r)),!0;case"gotpointercapture":return o=r.pointerId,di.set(o,Ns(di.get(o)||null,t,e,a,n,r)),!0}return!1}function uw(t){var e=Vr(t.target);if(e!==null){var a=pi(e);if(a!==null){if(e=a.tag,e===13){if(e=dy(a),e!==null){t.blockedOn=e,k0(t.priority,function(){oy(a)});return}}else if(e===31){if(e=py(a),e!==null){t.blockedOn=e,k0(t.priority,function(){oy(a)});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function rf(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=Th(t.nativeEvent);if(a===null){a=t.nativeEvent;var n=new a.constructor(a.type,a);kp=n,a.target.dispatchEvent(n),kp=null}else return e=Hl(a),e!==null&&sw(e),t.blockedOn=a,!1;e.shift()}return!0}function sy(t,e,a){rf(t)&&a.delete(e)}function XS(){Bh=!1,ar!==null&&rf(ar)&&(ar=null),nr!==null&&rf(nr)&&(nr=null),rr!==null&&rf(rr)&&(rr=null),ci.forEach(sy),di.forEach(sy)}function Ru(t,e){t.blockedOn===e&&(t.blockedOn=null,Bh||(Bh=!0,$e.unstable_scheduleCallback($e.unstable_NormalPriority,XS)))}var Hu=null;function iy(t){Hu!==t&&(Hu=t,$e.unstable_scheduleCallback($e.unstable_NormalPriority,function(){Hu===t&&(Hu=null);for(var e=0;e<t.length;e+=3){var a=t[e],n=t[e+1],r=t[e+2];if(typeof n!="function"){if(Tm(n||a)===null)continue;break}var o=Hl(a);o!==null&&(t.splice(e,3),e-=3,jp(o,{pending:!0,data:r,method:a.method,action:n},n,r))}}))}function zl(t){function e(i){return Ru(i,t)}ar!==null&&Ru(ar,t),nr!==null&&Ru(nr,t),rr!==null&&Ru(rr,t),ci.forEach(e),di.forEach(e);for(var a=0;a<Gn.length;a++){var n=Gn[a];n.blockedOn===t&&(n.blockedOn=null)}for(;0<Gn.length&&(a=Gn[0],a.blockedOn===null);)uw(a),a.blockedOn===null&&Gn.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(n=0;n<a.length;n+=3){var r=a[n],o=a[n+1],l=r[Rt]||null;if(typeof o=="function")l||iy(a);else if(l){var s=null;if(o&&o.hasAttribute("formAction")){if(r=o,l=o[Rt]||null)s=l.formAction;else if(Tm(r)!==null)continue}else s=l.action;typeof s=="function"?a[n+1]=s:(a.splice(n,3),n-=3),iy(a)}}}function fw(){function t(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(l){return r=l})},focusReset:"manual",scroll:"manual"})}function e(){r!==null&&(r(),r=null),n||setTimeout(a,20)}function a(){if(!n&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var n=!1,r=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(a,100),function(){n=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),r!==null&&(r(),r=null)}}}function Bm(t){this._internalRoot=t}$f.prototype.render=Bm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(B(409));var a=e.current,n=$t();lw(a,n,t,e,null,null)};$f.prototype.unmount=Bm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;lw(t.current,2,null,t,null,null),Jf(),e[Rl]=null}};function $f(t){this._internalRoot=t}$f.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ey();t={blockedOn:null,target:t,priority:e};for(var a=0;a<Gn.length&&e!==0&&e<Gn[a].priority;a++);Gn.splice(a,0,t),a===0&&uw(t)}};var uy=fy.version;if(uy!=="19.3.1")throw Error(B(527,uy,"19.3.1"));de.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(B(188)):(t=Object.keys(t).join(","),Error(B(268,t)));return t=jA(e),t=t!==null?hy(t):null,t=t===null?null:t.stateNode,t};var jS={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:_,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(ks=__REACT_DEVTOOLS_GLOBAL_HOOK__,!ks.isDisabled&&ks.supportsFiber))try{hi=ks.inject(jS),Zt=ks}catch{}var ks;ec.createRoot=function(t,e){if(!cy(t))throw Error(B(299));var a=!1,n="",r=Vb,o=Qb,l=Kb;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onUncaughtError!==void 0&&(r=e.onUncaughtError),e.onCaughtError!==void 0&&(o=e.onCaughtError),e.onRecoverableError!==void 0&&(l=e.onRecoverableError)),e=rw(t,1,!1,null,null,a,n,null,r,o,l,fw),t[Rl]=e.current,wm(t),new Bm(e)};ec.hydrateRoot=function(t,e,a){if(!cy(t))throw Error(B(299));var n=!1,r="",o=Vb,l=Qb,s=Kb,i=null;return a!=null&&(a.unstable_strictMode===!0&&(n=!0),a.identifierPrefix!==void 0&&(r=a.identifierPrefix),a.onUncaughtError!==void 0&&(o=a.onUncaughtError),a.onCaughtError!==void 0&&(l=a.onCaughtError),a.onRecoverableError!==void 0&&(s=a.onRecoverableError),a.formState!==void 0&&(i=a.formState)),e=rw(t,1,!0,e,a??null,n,r,i,o,l,s,fw),e.context=ow(null),a=e.current,n=$t(),n=Dh(n),r=Zn(n),r.callback=null,Wn(a,r,n),a=n,e.current.lanes=a,gi(e,a),en(e),t[Rl]=e.current,wm(t),new $f(e)};ec.version="19.3.1"});var hw=Dn((JB,pw)=>{"use strict";function dw(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dw)}catch(t){console.error(t)}}dw(),pw.exports=cw()});var Kg={days:86400n,hours:3600n,minutes:60n,seconds:1n},Xg=(1n<<256n)-1n,CA=(1n<<64n)-1n;function Sd(t,e){if(!/^(0|[1-9]\\d*)$/.test(String(t)))throw new Error(e+"\\uC740 0 \\uC774\\uC0C1\\uC758 \\uC815\\uC218\\uB85C \\uC785\\uB825\\uD574\\uC8FC\\uC138\\uC694.");let a=BigInt(t);if(a>Xg)throw new Error(e+"\\uC774 \\uB108\\uBB34 \\uD07D\\uB2C8\\uB2E4.");return a}function Id(t){let e=Sd(t.rightsFee,"\\uAD8C\\uB9AC\\uC790 \\uC9C0\\uAE09\\uC561"),a=Sd(t.platformFee,"\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAE09\\uC561"),n=e+a;if(n===0n)throw new Error("\\uCD1D \\uC608\\uCE58\\uAE08\\uC740 0\\uBCF4\\uB2E4 \\uCEE4\\uC57C \\uD569\\uB2C8\\uB2E4.");if(n>Xg)throw new Error("\\uCD1D \\uC9C0\\uAE09\\uC561\\uC774 \\uB108\\uBB34 \\uD07D\\uB2C8\\uB2E4.");function r(o,l,s){if(!Kg[l])throw new Error("\\uAE30\\uAC04 \\uB2E8\\uC704\\uB97C \\uD655\\uC778\\uD574\\uC8FC\\uC138\\uC694.");let i=Sd(o,s)*Kg[l];if(i===0n||i>CA)throw new Error(s+"\\uC740 1\\uCD08 \\uC774\\uC0C1\\uC774\\uBA70 \\uC9C0\\uC6D0 \\uBC94\\uC704 \\uC548\\uC774\\uC5B4\\uC57C \\uD569\\uB2C8\\uB2E4.");return i}return{rightsFee:e,platformFee:a,total:n,executionSeconds:r(t.executionValue,t.executionUnit,"\\uC9D1\\uD589 \\uAE30\\uD55C"),usageSeconds:r(t.usageValue,t.usageUnit,"\\uC0AC\\uC6A9 \\uAE30\\uAC04")}}function ua(t){if(t==null||t==="")return"\\u2014";try{return BigInt(t).toLocaleString("ko-KR")}catch{return"\\u2014"}}function Un(t){if(t==null)return"\\uC870\\uD68C \\uD544\\uC694";try{let e=BigInt(t);for(let[a,n]of[["\\uC77C",86400n],["\\uC2DC\\uAC04",3600n],["\\uBD84",60n]])if(e>0n&&e%n===0n)return(e/n).toLocaleString("ko-KR")+a;return e.toLocaleString("ko-KR")+"\\uCD08"}catch{return"\\uC870\\uD68C \\uD544\\uC694"}}var c=pu(jo(),1),hA=pu(hw(),1);var mw="6.17.0";function YS(t,e,a){let n=e.split("|").map(o=>o.trim());for(let o=0;o<n.length;o++)switch(e){case"any":return;case"bigint":case"boolean":case"number":case"string":if(typeof t===e)return}let r=new Error(`invalid value for type ${e}`);throw r.code="INVALID_ARGUMENT",r.argument=`value.${a}`,r.value=t,r}async function Ge(t){let e=Object.keys(t);return(await Promise.all(e.map(n=>Promise.resolve(t[n])))).reduce((n,r,o)=>(n[e[o]]=r,n),{})}function M(t,e,a){for(let n in e){let r=e[n],o=a?a[n]:null;o&&YS(r,o,n),Object.defineProperty(t,n,{enumerable:!0,value:r,writable:!1})}}function Ql(t,e){if(t==null)return"null";if(e==null&&(e=new Set),typeof t=="object"){if(e.has(t))return"[Circular]";e.add(t)}if(Array.isArray(t))return"[ "+t.map(a=>Ql(a,e)).join(", ")+" ]";if(t instanceof Uint8Array){let a="0123456789abcdef",n="0x";for(let r=0;r<t.length;r++)n+=a[t[r]>>4],n+=a[t[r]&15];return n}if(typeof t=="object"&&typeof t.toJSON=="function")return Ql(t.toJSON(),e);switch(typeof t){case"boolean":case"number":case"symbol":return t.toString();case"bigint":return BigInt(t).toString();case"string":return JSON.stringify(t);case"object":{let a=Object.keys(t);return a.sort(),"{ "+a.map(n=>`${Ql(n,e)}: ${Ql(t[n],e)}`).join(", ")+" }"}}return"[ COULD NOT SERIALIZE ]"}function Be(t,e){return t&&t.code===e}function Kl(t){return Be(t,"CALL_EXCEPTION")}function ue(t,e,a){let n=t;{let o=[];if(a){if("message"in a||"code"in a||"name"in a)throw new Error(`value will overwrite populated values: ${Ql(a)}`);for(let l in a){if(l==="shortMessage")continue;let s=a[l];o.push(l+"="+Ql(s))}}o.push(`code=${e}`),o.push(`version=${mw}`),o.length&&(t+=" ("+o.join(", ")+")")}let r;switch(e){case"INVALID_ARGUMENT":r=new TypeError(t);break;case"NUMERIC_FAULT":case"BUFFER_OVERRUN":r=new RangeError(t);break;default:r=new Error(t)}return M(r,{code:e}),a&&Object.assign(r,a),r.shortMessage==null&&M(r,{shortMessage:n}),r}function C(t,e,a,n){if(!t)throw ue(e,a,n)}function b(t,e,a,n){C(t,e,"INVALID_ARGUMENT",{argument:a,value:n})}function Si(t,e,a){a==null&&(a=""),a&&(a=": "+a),C(t>=e,"missing argument"+a,"MISSING_ARGUMENT",{count:t,expectedCount:e}),C(t<=e,"too many arguments"+a,"UNEXPECTED_ARGUMENT",{count:t,expectedCount:e})}var JS=["NFD","NFC","NFKD","NFKC"].reduce((t,e)=>{try{if("test".normalize(e)!=="test")throw new Error("bad");if(e==="NFD"&&"\\xE9".normalize("NFD")!=="e\\u0301")throw new Error("broken");t.push(e)}catch{}return t},[]);function Om(t){C(JS.indexOf(t)>=0,"platform missing String.prototype.normalize","UNSUPPORTED_OPERATION",{operation:"String.prototype.normalize",info:{form:t}})}function dr(t,e,a){if(a==null&&(a=""),t!==e){let n=a,r="new";a&&(n+=".",r+=" "+a),C(!1,`private constructor; use ${n}from* methods`,"UNSUPPORTED_OPERATION",{operation:r})}}function xw(t,e,a){if(t instanceof Uint8Array)return a?new Uint8Array(t):t;if(typeof t=="string"&&t.length%2===0&&t.match(/^0x[0-9a-f]*$/i)){let n=new Uint8Array((t.length-2)/2),r=2;for(let o=0;o<n.length;o++)n[o]=parseInt(t.substring(r,r+2),16),r+=2;return n}b(!1,"invalid BytesLike value",e||"value",t)}function R(t,e){return xw(t,e,!1)}function _e(t,e){return xw(t,e,!0)}function Z(t,e){return!(typeof t!="string"||!t.match(/^0x[0-9A-Fa-f]*$/)||typeof e=="number"&&t.length!==2+2*e||e===!0&&t.length%2!==0)}function fo(t){return Z(t,!0)||t instanceof Uint8Array}var gw="0123456789abcdef";function N(t){let e=R(t),a="0x";for(let n=0;n<e.length;n++){let r=e[n];a+=gw[(r&240)>>4]+gw[r&15]}return a}function ne(t){return"0x"+t.map(e=>N(e).substring(2)).join("")}function tn(t){return Z(t,!0)?(t.length-2)/2:R(t).length}function Ie(t,e,a){let n=R(t);return a!=null&&a>n.length&&C(!1,"cannot slice beyond data bounds","BUFFER_OVERRUN",{buffer:n,length:n.length,offset:a}),N(n.slice(e??0,a??n.length))}function yw(t,e,a){let n=R(t);C(e>=n.length,"padding exceeds data length","BUFFER_OVERRUN",{buffer:new Uint8Array(n),length:e,offset:e+1});let r=new Uint8Array(e);return r.fill(0),a?r.set(n,e-n.length):r.set(n,0),N(r)}function Et(t,e){return yw(t,e,!0)}function Nm(t,e){return yw(t,e,!1)}var Ii=BigInt(0),Da=BigInt(1),Xl=9007199254740991;function km(t,e){let a=Ti(t,"value"),n=BigInt(q(e,"width"));if(C(a>>n===Ii,"overflow","NUMERIC_FAULT",{operation:"fromTwos",fault:"overflow",value:t}),a>>n-Da){let r=(Da<<n)-Da;return-((~a&r)+Da)}return a}function Ei(t,e){let a=D(t,"value"),n=BigInt(q(e,"width")),r=Da<<n-Da;if(a<Ii){a=-a,C(a<=r,"too low","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:t});let o=(Da<<n)-Da;return(~a&o)+Da}else C(a<r,"too high","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:t});return a}function pr(t,e){let a=Ti(t,"value"),n=BigInt(q(e,"bits"));return a&(Da<<n)-Da}function D(t,e){switch(typeof t){case"bigint":return t;case"number":return b(Number.isInteger(t),"underflow",e||"value",t),b(t>=-Xl&&t<=Xl,"overflow",e||"value",t),BigInt(t);case"string":try{if(t==="")throw new Error("empty string");return t[0]==="-"&&t[1]!=="-"?-BigInt(t.substring(1)):BigInt(t)}catch(a){b(!1,`invalid BigNumberish string: ${a.message}`,e||"value",t)}}b(!1,"invalid BigNumberish value",e||"value",t)}function Ti(t,e){let a=D(t,e);return C(a>=Ii,"unsigned value cannot be negative","NUMERIC_FAULT",{fault:"overflow",operation:"getUint",value:t}),a}var bw="0123456789abcdef";function jl(t){if(t instanceof Uint8Array){let e="0x0";for(let a of t)e+=bw[a>>4],e+=bw[a&15];return BigInt(e)}return D(t)}function q(t,e){switch(typeof t){case"bigint":return b(t>=-Xl&&t<=Xl,"overflow",e||"value",t),Number(t);case"number":return b(Number.isInteger(t),"underflow",e||"value",t),b(t>=-Xl&&t<=Xl,"overflow",e||"value",t),t;case"string":try{if(t==="")throw new Error("empty string");return q(BigInt(t),e)}catch(a){b(!1,`invalid numeric string: ${a.message}`,e||"value",t)}}b(!1,"invalid numeric value",e||"value",t)}function Dm(t){return q(jl(t))}function Ht(t,e){let a=Ti(t,"value"),n=a.toString(16);if(e==null)n.length%2&&(n="0"+n);else{let r=q(e,"width");if(r===0&&a===Ii)return"0x";for(C(r*2>=n.length,`value exceeds width (${r} bytes)`,"NUMERIC_FAULT",{operation:"toBeHex",fault:"overflow",value:t});n.length<r*2;)n="0"+n}return"0x"+n}function Oe(t,e){let a=Ti(t,"value");if(a===Ii){let o=e!=null?q(e,"width"):0;return new Uint8Array(o)}let n=a.toString(16);if(n.length%2&&(n="0"+n),e!=null){let o=q(e,"width");for(;n.length<o*2;)n="00"+n;C(o*2===n.length,`value exceeds width (${o} bytes)`,"NUMERIC_FAULT",{operation:"toBeArray",fault:"overflow",value:t})}let r=new Uint8Array(n.length/2);for(let o=0;o<r.length;o++){let l=o*2;r[o]=parseInt(n.substring(l,l+2),16)}return r}function Tt(t){let e=N(fo(t)?t:Oe(t)).substring(2);for(;e.startsWith("0");)e=e.substring(1);return e===""&&(e="0"),"0x"+e}var ww="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";var u3=BigInt(0),Lw=BigInt(58);function Um(t){let e=R(t),a=jl(e),n="";for(;a;)n=ww[Number(a%Lw)]+n,a/=Lw;for(let r=0;r<e.length&&!e[r];r++)n=ww[0]+n;return n}function vw(t){t=atob(t);let e=new Uint8Array(t.length);for(let a=0;a<t.length;a++)e[a]=t.charCodeAt(a);return R(e)}function Aw(t){let e=R(t),a="";for(let n=0;n<e.length;n++)a+=String.fromCharCode(e[n]);return btoa(a)}var co=class{filter;emitter;#e;constructor(e,a,n){this.#e=a,M(this,{emitter:e,filter:n})}async removeListener(){this.#e!=null&&await this.emitter.off(this.filter,this.#e)}};function ZS(t,e,a,n,r){b(!1,`invalid codepoint at offset ${e}; ${t}`,"bytes",a)}function Cw(t,e,a,n,r){if(t==="BAD_PREFIX"||t==="UNEXPECTED_CONTINUE"){let o=0;for(let l=e+1;l<a.length&&a[l]>>6===2;l++)o++;return o}return t==="OVERRUN"?a.length-e-1:0}function WS(t,e,a,n,r){return t==="OVERLONG"?(b(typeof r=="number","invalid bad code point for replacement","badCodepoint",r),n.push(r),0):(n.push(65533),Cw(t,e,a,n,r))}var Sw=Object.freeze({error:ZS,ignore:Cw,replace:WS});function $S(t,e){e==null&&(e=Sw.error);let a=R(t,"bytes"),n=[],r=0;for(;r<a.length;){let o=a[r++];if(o>>7===0){n.push(o);continue}let l=null,s=null;if((o&224)===192)l=1,s=127;else if((o&240)===224)l=2,s=2047;else if((o&248)===240)l=3,s=65535;else{(o&192)===128?r+=e("UNEXPECTED_CONTINUE",r-1,a,n):r+=e("BAD_PREFIX",r-1,a,n);continue}if(r-1+l>=a.length){r+=e("OVERRUN",r-1,a,n);continue}let i=o&(1<<8-l-1)-1;for(let u=0;u<l;u++){let f=a[r];if((f&192)!=128){r+=e("MISSING_CONTINUE",r,a,n),i=null;break}i=i<<6|f&63,r++}if(i!==null){if(i>1114111){r+=e("OUT_OF_RANGE",r-1-l,a,n,i);continue}if(i>=55296&&i<=57343){r+=e("UTF16_SURROGATE",r-1-l,a,n,i);continue}if(i<=s){r+=e("OVERLONG",r-1-l,a,n,i);continue}n.push(i)}}return n}function Bt(t,e){b(typeof t=="string","invalid string value","str",t),e!=null&&(Om(e),t=t.normalize(e));let a=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<128)a.push(r);else if(r<2048)a.push(r>>6|192),a.push(r&63|128);else if((r&64512)==55296){n++;let o=t.charCodeAt(n);b(n<t.length&&(o&64512)===56320,"invalid surrogate pair","str",t);let l=65536+((r&1023)<<10)+(o&1023);a.push(l>>18|240),a.push(l>>12&63|128),a.push(l>>6&63|128),a.push(l&63|128)}else a.push(r>>12|224),a.push(r>>6&63|128),a.push(r&63|128)}return new Uint8Array(a)}function eI(t){return t.map(e=>e<=65535?String.fromCharCode(e):(e-=65536,String.fromCharCode((e>>10&1023)+55296,(e&1023)+56320))).join("")}function hr(t,e){return eI($S(t,e))}function tc(t){async function e(a,n){C(n==null||!n.cancelled,"request cancelled before sending","CANCELLED");let r=a.url.split(":")[0].toLowerCase();C(r==="http"||r==="https",`unsupported protocol ${r}`,"UNSUPPORTED_OPERATION",{info:{protocol:r},operation:"request"}),C(r==="https"||!a.credentials||a.allowInsecureAuthentication,"insecure authorized connections unsupported","UNSUPPORTED_OPERATION",{operation:"request"});let o=null,l=new AbortController,s=setTimeout(()=>{o=ue("request timeout","TIMEOUT"),l.abort()},a.timeout);n&&n.addListener(()=>{o=ue("request cancelled","CANCELLED"),l.abort()});let i=Object.assign({},t,{method:a.method,headers:new Headers(Array.from(a)),body:a.body||void 0,signal:l.signal}),u;try{u=await fetch(a.url,i)}catch(h){throw clearTimeout(s),o||h}clearTimeout(s);let f={};u.headers.forEach((h,w)=>{f[w.toLowerCase()]=h});let d=await u.arrayBuffer(),p=d==null?null:new Uint8Array(d);return{statusCode:u.status,statusMessage:u.statusText,headers:f,body:p}}return e}var b3=tc({});var tI=12,aI=250,Iw=tc(),nI=new RegExp("^data:([^;:]*)?(;base64)?,(.*)$","i"),rI=new RegExp("^ipfs://(ipfs/)?(.*)$","i"),Mm=!1;async function Tw(t,e){try{let a=t.match(nI);if(!a)throw new Error("invalid data");return new vn(200,"OK",{"content-type":a[1]||"text/plain"},a[2]?vw(a[3]):oI(a[3]))}catch{return new vn(599,"BAD REQUEST (invalid data: URI)",{},null,new wa(t))}}function Bw(t){async function e(a,n){try{let r=a.match(rI);if(!r)throw new Error("invalid link");return new wa(`${t}${r[2]}`)}catch{return new vn(599,"BAD REQUEST (invalid IPFS URI)",{},null,new wa(a))}}return e}var ac={data:Tw,ipfs:Bw("https://gateway.ipfs.io/ipfs/")},Ow=new WeakMap,rc=class{#e;#t;constructor(e){this.#e=[],this.#t=!1,Ow.set(e,()=>{if(!this.#t){this.#t=!0;for(let a of this.#e)setTimeout(()=>{a()},0);this.#e=[]}})}addListener(e){C(!this.#t,"singal already cancelled","UNSUPPORTED_OPERATION",{operation:"fetchCancelSignal.addCancelListener"}),this.#e.push(e)}get cancelled(){return this.#t}checkSignal(){C(!this.cancelled,"cancelled","CANCELLED",{})}};function nc(t){if(t==null)throw new Error("missing signal; should not happen");return t.checkSignal(),t}var wa=class t{#e;#t;#a;#n;#r;#l;#o;#s;#p;#u;#m;#h;#d;#f;#c;get url(){return this.#l}set url(e){this.#l=String(e)}get body(){return this.#o==null?null:new Uint8Array(this.#o)}set body(e){if(e==null)this.#o=void 0,this.#s=void 0;else if(typeof e=="string")this.#o=Bt(e),this.#s="text/plain";else if(e instanceof Uint8Array)this.#o=e,this.#s="application/octet-stream";else if(typeof e=="object")this.#o=Bt(JSON.stringify(e)),this.#s="application/json";else throw new Error("invalid body")}hasBody(){return this.#o!=null}get method(){return this.#n?this.#n:this.hasBody()?"POST":"GET"}set method(e){e==null&&(e=""),this.#n=String(e).toUpperCase()}get headers(){let e=Object.assign({},this.#a);return this.#p&&(e.authorization=`Basic ${Aw(Bt(this.#p))}`),this.allowGzip&&(e["accept-encoding"]="gzip"),e["content-type"]==null&&this.#s&&(e["content-type"]=this.#s),this.body&&(e["content-length"]=String(this.body.length)),e}getHeader(e){return this.headers[e.toLowerCase()]}setHeader(e,a){this.#a[String(e).toLowerCase()]=String(a)}clearHeaders(){this.#a={}}[Symbol.iterator](){let e=this.headers,a=Object.keys(e),n=0;return{next:()=>{if(n<a.length){let r=a[n++];return{value:[r,e[r]],done:!1}}return{value:void 0,done:!0}}}}get credentials(){return this.#p||null}setCredentials(e,a){b(!e.match(/:/),"invalid basic authentication username","username","[REDACTED]"),this.#p=`${e}:${a}`}get allowGzip(){return this.#t}set allowGzip(e){this.#t=!!e}get allowInsecureAuthentication(){return!!this.#e}set allowInsecureAuthentication(e){this.#e=!!e}get timeout(){return this.#r}set timeout(e){b(e>=0,"timeout must be non-zero","timeout",e),this.#r=e}get preflightFunc(){return this.#u||null}set preflightFunc(e){this.#u=e}get processFunc(){return this.#m||null}set processFunc(e){this.#m=e}get retryFunc(){return this.#h||null}set retryFunc(e){this.#h=e}get getUrlFunc(){return this.#c||Iw}set getUrlFunc(e){this.#c=e}constructor(e){this.#l=String(e),this.#e=!1,this.#t=!0,this.#a={},this.#n="",this.#r=3e5,this.#f={slotInterval:aI,maxAttempts:tI},this.#c=null}toString(){return`<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#o?N(this.#o):"null"}>`}setThrottleParams(e){e.slotInterval!=null&&(this.#f.slotInterval=e.slotInterval),e.maxAttempts!=null&&(this.#f.maxAttempts=e.maxAttempts)}async#i(e,a,n,r,o){if(e>=this.#f.maxAttempts)return o.makeServerError("exceeded maximum retry limit");C(Ew()<=a,"timeout","TIMEOUT",{operation:"request.send",reason:"timeout",request:r}),n>0&&await lI(n);let l=this.clone(),s=(l.url.split(":")[0]||"").toLowerCase();if(s in ac){let f=await ac[s](l.url,nc(r.#d));if(f instanceof vn){let d=f;if(this.processFunc){nc(r.#d);try{d=await this.processFunc(l,d)}catch(p){(p.throttle==null||typeof p.stall!="number")&&d.makeServerError("error in post-processing function",p).assertOk()}}return d}l=f}this.preflightFunc&&(l=await this.preflightFunc(l));let i=await this.getUrlFunc(l,nc(r.#d)),u=new vn(i.statusCode,i.statusMessage,i.headers,i.body,r);if([301,302,307,308].indexOf(u.statusCode)>=0){try{let f=u.headers.location||"";return l.redirect(f).#i(e+1,a,0,r,u)}catch{}return u}else if(u.statusCode===429&&(this.retryFunc==null||await this.retryFunc(l,u,e))){let f=u.headers["retry-after"],d=this.#f.slotInterval*Math.trunc(Math.random()*Math.pow(2,e));return typeof f=="string"&&f.match(/^[1-9][0-9]*$/)&&(d=parseInt(f)),l.clone().#i(e+1,a,d,r,u)}if(this.processFunc){nc(r.#d);try{u=await this.processFunc(l,u)}catch(f){(f.throttle==null||typeof f.stall!="number")&&u.makeServerError("error in post-processing function",f).assertOk();let d=this.#f.slotInterval*Math.trunc(Math.random()*Math.pow(2,e));return f.stall>=0&&(d=f.stall),l.clone().#i(e+1,a,d,r,u)}}return u}send(){return C(this.#d==null,"request already sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.send"}),this.#d=new rc(this),this.#i(0,Ew()+this.timeout,0,this,new vn(0,"",{},null,this))}cancel(){C(this.#d!=null,"request has not been sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.cancel"});let e=Ow.get(this);if(!e)throw new Error("missing signal; should not happen");e()}redirect(e){let a=this.url.split(":")[0].toLowerCase(),n=e.split(":")[0].toLowerCase();C((a!=="https"||n!=="http")&&e.match(/^https?:/),"unsupported redirect","UNSUPPORTED_OPERATION",{operation:`redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(e)})`});let r=new t(e);return r.method=this.method,r.allowGzip=this.allowGzip,r.timeout=this.timeout,r.#a=Object.assign({},this.#a),this.#o&&(r.#o=new Uint8Array(this.#o)),r.#s=this.#s,r}clone(){let e=new t(this.url);return e.#n=this.#n,this.#o&&(e.#o=this.#o),e.#s=this.#s,e.#a=Object.assign({},this.#a),e.#p=this.#p,this.allowGzip&&(e.allowGzip=!0),e.timeout=this.timeout,this.allowInsecureAuthentication&&(e.allowInsecureAuthentication=!0),e.#u=this.#u,e.#m=this.#m,e.#h=this.#h,e.#f=Object.assign({},this.#f),e.#c=this.#c,e}static lockConfig(){Mm=!0}static getGateway(e){return ac[e.toLowerCase()]||null}static registerGateway(e,a){if(e=e.toLowerCase(),e==="http"||e==="https")throw new Error(`cannot intercept ${e}; use registerGetUrl`);if(Mm)throw new Error("gateways locked");ac[e]=a}static registerGetUrl(e){if(Mm)throw new Error("gateways locked");Iw=e}static createGetUrlFunc(e){return tc(e)}static createDataGateway(){return Tw}static createIpfsGatewayFunc(e){return Bw(e)}},vn=class t{#e;#t;#a;#n;#r;#l;toString(){return`<FetchResponse status=${this.statusCode} body=${this.#n?N(this.#n):"null"}>`}get statusCode(){return this.#e}get statusMessage(){return this.#t}get headers(){return Object.assign({},this.#a)}get body(){return this.#n==null?null:new Uint8Array(this.#n)}get bodyText(){try{return this.#n==null?"":hr(this.#n)}catch{C(!1,"response body is not valid UTF-8 data","UNSUPPORTED_OPERATION",{operation:"bodyText",info:{response:this}})}}get bodyJson(){try{return JSON.parse(this.bodyText)}catch{C(!1,"response body is not valid JSON","UNSUPPORTED_OPERATION",{operation:"bodyJson",info:{response:this}})}}[Symbol.iterator](){let e=this.headers,a=Object.keys(e),n=0;return{next:()=>{if(n<a.length){let r=a[n++];return{value:[r,e[r]],done:!1}}return{value:void 0,done:!0}}}}constructor(e,a,n,r,o){this.#e=e,this.#t=a,this.#a=Object.keys(n).reduce((l,s)=>(l[s.toLowerCase()]=String(n[s]),l),{}),this.#n=r==null?null:new Uint8Array(r),this.#r=o||null,this.#l={message:""}}makeServerError(e,a){let n;e?n=`CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${e})`:(e=`${this.statusCode} ${this.statusMessage}`,n=`CLIENT ESCALATED SERVER ERROR (${e})`);let r=new t(599,n,this.headers,this.body,this.#r||void 0);return r.#l={message:e,error:a},r}throwThrottleError(e,a){a==null?a=-1:b(Number.isInteger(a)&&a>=0,"invalid stall timeout","stall",a);let n=new Error(e||"throttling requests");throw M(n,{stall:a,throttle:!0}),n}getHeader(e){return this.headers[e.toLowerCase()]}hasBody(){return this.#n!=null}get request(){return this.#r}ok(){return this.#l.message===""&&this.statusCode>=200&&this.statusCode<300}assertOk(){if(this.ok())return;let{message:e,error:a}=this.#l;e===""&&(e=`server response ${this.statusCode} ${this.statusMessage}`);let n=null;this.request&&(n=this.request.url);let r=null;try{this.#n&&(r=hr(this.#n))}catch{}C(!1,e,"SERVER_ERROR",{request:this.request||"unknown request",response:this,error:a,info:{requestUrl:n,responseBody:r,responseStatus:`${this.statusCode} ${this.statusMessage}`}})}};function Ew(){return new Date().getTime()}function oI(t){return Bt(t.replace(/%([0-9a-f][0-9a-f])/gi,(e,a)=>String.fromCharCode(parseInt(a,16))))}function lI(t){return new Promise(e=>setTimeout(e,t))}function sI(t){let e=t.toString(16);for(;e.length<2;)e="0"+e;return"0x"+e}function Nw(t,e,a){let n=0;for(let r=0;r<a;r++)n=n*256+t[e+r];return n}function kw(t,e,a,n){let r=[];for(;a<e+1+n;){let o=Dw(t,a);r.push(o.result),a+=o.consumed,C(a<=e+1+n,"child data too short","BUFFER_OVERRUN",{buffer:t,length:n,offset:e})}return{consumed:1+n,result:r}}function Dw(t,e){C(t.length!==0,"data too short","BUFFER_OVERRUN",{buffer:t,length:0,offset:1});let a=n=>{C(n<=t.length,"data short segment too short","BUFFER_OVERRUN",{buffer:t,length:t.length,offset:n})};if(t[e]>=248){let n=t[e]-247;a(e+1+n);let r=Nw(t,e+1,n);return a(e+1+n+r),kw(t,e,e+1+n,n+r)}else if(t[e]>=192){let n=t[e]-192;return a(e+1+n),kw(t,e,e+1,n)}else if(t[e]>=184){let n=t[e]-183;a(e+1+n);let r=Nw(t,e+1,n);a(e+1+n+r);let o=N(t.slice(e+1+n,e+1+n+r));return{consumed:1+n+r,result:o}}else if(t[e]>=128){let n=t[e]-128;a(e+1+n);let r=N(t.slice(e+1,e+1+n));return{consumed:1+n,result:r}}return{consumed:1,result:sI(t[e])}}function po(t){let e=R(t,"data"),a=Dw(e,0);return b(a.consumed===e.length,"unexpected junk after rlp payload","data",t),a.result}function Uw(t){let e=[];for(;t;)e.unshift(t&255),t>>=8;return e}function Pw(t){if(Array.isArray(t)){let n=[];if(t.forEach(function(o){n=n.concat(Pw(o))}),n.length<=55)return n.unshift(192+n.length),n;let r=Uw(n.length);return r.unshift(247+r.length),r.concat(n)}let e=Array.prototype.slice.call(R(t,"object"));if(e.length===1&&e[0]<=127)return e;if(e.length<=55)return e.unshift(128+e.length),e;let a=Uw(e.length);return a.unshift(183+a.length),a.concat(e)}var Mw="0123456789abcdef";function La(t){let e="0x";for(let a of Pw(t))e+=Mw[a>>4],e+=Mw[a&15];return e}var gt=32,Pm=new Uint8Array(gt),iI=["then"],oc={},Hw=new WeakMap;function ho(t){return Hw.get(t)}function zw(t,e){Hw.set(t,e)}function Bi(t,e){let a=new Error(`deferred error during ABI decoding triggered accessing ${t}`);throw a.error=e,a}function zm(t,e,a){return t.indexOf(null)>=0?e.map((n,r)=>n instanceof An?zm(ho(n),n,a):n):t.reduce((n,r,o)=>{let l=e.getValue(r);return r in n||(a&&l instanceof An&&(l=zm(ho(l),l,a)),n[r]=l),n},{})}var An=class t extends Array{#e;constructor(...e){let a=e[0],n=e[1],r=(e[2]||[]).slice(),o=!0;a!==oc&&(n=e,r=[],o=!1),super(n.length),n.forEach((i,u)=>{this[u]=i});let l=r.reduce((i,u)=>(typeof u=="string"&&i.set(u,(i.get(u)||0)+1),i),new Map);if(zw(this,Object.freeze(n.map((i,u)=>{let f=r[u];return f!=null&&l.get(f)===1?f:null}))),this.#e=[],this.#e==null&&this.#e,!o)return;Object.freeze(this);let s=new Proxy(this,{get:(i,u,f)=>{if(typeof u=="string"){if(u.match(/^[0-9]+$/)){let p=q(u,"%index");if(p<0||p>=this.length)throw new RangeError("out of result range");let h=i[p];return h instanceof Error&&Bi(`index ${p}`,h),h}if(iI.indexOf(u)>=0)return Reflect.get(i,u,f);let d=i[u];if(d instanceof Function)return function(...p){return d.apply(this===f?i:this,p)};if(!(u in i))return i.getValue.apply(this===f?i:this,[u])}return Reflect.get(i,u,f)}});return zw(s,ho(this)),s}toArray(e){let a=[];return this.forEach((n,r)=>{n instanceof Error&&Bi(`index ${r}`,n),e&&n instanceof t&&(n=n.toArray(e)),a.push(n)}),a}toObject(e){let a=ho(this);return a.reduce((n,r,o)=>(C(r!=null,`value at index ${o} unnamed`,"UNSUPPORTED_OPERATION",{operation:"toObject()"}),zm(a,this,e)),{})}slice(e,a){e==null&&(e=0),e<0&&(e+=this.length,e<0&&(e=0)),a==null&&(a=this.length),a<0&&(a+=this.length,a<0&&(a=0)),a>this.length&&(a=this.length);let n=ho(this),r=[],o=[];for(let l=e;l<a;l++)r.push(this[l]),o.push(n[l]);return new t(oc,r,o)}filter(e,a){let n=ho(this),r=[],o=[];for(let l=0;l<this.length;l++){let s=this[l];s instanceof Error&&Bi(`index ${l}`,s),e.call(a,s,l,this)&&(r.push(s),o.push(n[l]))}return new t(oc,r,o)}map(e,a){let n=[];for(let r=0;r<this.length;r++){let o=this[r];o instanceof Error&&Bi(`index ${r}`,o),n.push(e.call(a,o,r,this))}return n}getValue(e){let a=ho(this).indexOf(e);if(a===-1)return;let n=this[a];return n instanceof Error&&Bi(`property ${JSON.stringify(e)}`,n.error),n}static fromItems(e,a){return new t(oc,e,a)}};function Rw(t){let e=Oe(t);return C(e.length<=gt,"value out-of-bounds","BUFFER_OVERRUN",{buffer:e,length:gt,offset:e.length}),e.length!==gt&&(e=_e(ne([Pm.slice(e.length%gt),e]))),e}var Ye=class{name;type;localName;dynamic;constructor(e,a,n,r){M(this,{name:e,type:a,localName:n,dynamic:r},{name:"string",type:"string",localName:"string",dynamic:"boolean"})}_throwError(e,a){b(!1,e,this.localName,a)}},mo=class{#e;#t;constructor(){this.#e=[],this.#t=0}get data(){return ne(this.#e)}get length(){return this.#t}#a(e){return this.#e.push(e),this.#t+=e.length,e.length}appendWriter(e){return this.#a(_e(e.data))}writeBytes(e){let a=_e(e),n=a.length%gt;return n&&(a=_e(ne([a,Pm.slice(n)]))),this.#a(a)}writeValue(e){return this.#a(Rw(e))}writeUpdatableValue(){let e=this.#e.length;return this.#e.push(Pm),this.#t+=gt,a=>{this.#e[e]=Rw(a)}}},lc=class t{allowLoose;#e;#t;#a;#n;#r;constructor(e,a,n){M(this,{allowLoose:!!a}),this.#e=_e(e),this.#a=0,this.#n=null,this.#r=n??1024,this.#t=0}get data(){return N(this.#e)}get dataLength(){return this.#e.length}get consumed(){return this.#t}get bytes(){return new Uint8Array(this.#e)}#l(e){if(this.#n)return this.#n.#l(e);this.#a+=e,C(this.#r<1||this.#a<=this.#r*this.dataLength,`compressed ABI data exceeds inflation ratio of ${this.#r} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`,"BUFFER_OVERRUN",{buffer:_e(this.#e),offset:this.#t,length:e,info:{bytesRead:this.#a,dataLength:this.dataLength}})}#o(e,a,n){let r=Math.ceil(a/gt)*gt;return this.#t+r>this.#e.length&&(this.allowLoose&&n&&this.#t+a<=this.#e.length?r=a:C(!1,"data out-of-bounds","BUFFER_OVERRUN",{buffer:_e(this.#e),length:this.#e.length,offset:this.#t+r})),this.#e.slice(this.#t,this.#t+r)}subReader(e){let a=new t(this.#e.slice(this.#t+e),this.allowLoose,this.#r);return a.#n=this,a}readBytes(e,a){let n=this.#o(0,e,!!a);return this.#l(e),this.#t+=n.length,n.slice(0,e)}readValue(){return jl(this.readBytes(gt))}readIndex(){return Dm(this.readBytes(gt))}};function Oi(t){if(!Number.isSafeInteger(t)||t<0)throw new Error(`Wrong positive integer: ${t}`)}function Ni(t,...e){if(!(t instanceof Uint8Array))throw new Error("Expected Uint8Array");if(e.length>0&&!e.includes(t.length))throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`)}function Fw(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Oi(t.outputLen),Oi(t.blockLen)}function Cn(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function sc(t,e){Ni(t);let a=e.outputLen;if(t.length<a)throw new Error(`digestInto() expects output buffer of length at least ${a}`)}var ic=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;var qw=t=>t instanceof Uint8Array;var Gw=t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4)),uc=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),Ua=(t,e)=>t<<32-e|t>>>e,uI=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!uI)throw new Error("Non little-endian hardware is not supported");function fI(t){if(typeof t!="string")throw new Error(`utf8ToBytes expected string, got ${typeof t}`);return new Uint8Array(new TextEncoder().encode(t))}function gr(t){if(typeof t=="string"&&(t=fI(t)),!qw(t))throw new Error(`expected Uint8Array, got ${typeof t}`);return t}function _w(...t){let e=new Uint8Array(t.reduce((n,r)=>n+r.length,0)),a=0;return t.forEach(n=>{if(!qw(n))throw new Error("Uint8Array expected");e.set(n,a),a+=n.length}),e}var mr=class{clone(){return this._cloneInto()}},$3={}.toString;function Yl(t){let e=n=>t().update(gr(n)).digest(),a=t();return e.outputLen=a.outputLen,e.blockLen=a.blockLen,e.create=()=>t(),e}function Vw(t){let e=(n,r)=>t(r).update(gr(n)).digest(),a=t({});return e.outputLen=a.outputLen,e.blockLen=a.blockLen,e.create=n=>t(n),e}function Qw(t=32){if(ic&&typeof ic.getRandomValues=="function")return ic.getRandomValues(new Uint8Array(t));throw new Error("crypto.getRandomValues must be defined")}var fc=class extends mr{constructor(e,a){super(),this.finished=!1,this.destroyed=!1,Fw(e);let n=gr(a);if(this.iHash=e.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let r=this.blockLen,o=new Uint8Array(r);o.set(n.length>r?e.create().update(n).digest():n);for(let l=0;l<o.length;l++)o[l]^=54;this.iHash.update(o),this.oHash=e.create();for(let l=0;l<o.length;l++)o[l]^=106;this.oHash.update(o),o.fill(0)}update(e){return Cn(this),this.iHash.update(e),this}digestInto(e){Cn(this),Ni(e,this.outputLen),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){let e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||(e=Object.create(Object.getPrototypeOf(this),{}));let{oHash:a,iHash:n,finished:r,destroyed:o,blockLen:l,outputLen:s}=this;return e=e,e.finished=r,e.destroyed=o,e.blockLen=l,e.outputLen=s,e.oHash=a._cloneInto(e.oHash),e.iHash=n._cloneInto(e.iHash),e}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}},Rm=(t,e,a)=>new fc(t,e).update(a).digest();Rm.create=(t,e)=>new fc(t,e);function cI(t,e,a,n){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,a,n);let r=BigInt(32),o=BigInt(4294967295),l=Number(a>>r&o),s=Number(a&o),i=n?4:0,u=n?0:4;t.setUint32(e+i,l,n),t.setUint32(e+u,s,n)}var Jl=class extends mr{constructor(e,a,n,r){super(),this.blockLen=e,this.outputLen=a,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=uc(this.buffer)}update(e){Cn(this);let{view:a,buffer:n,blockLen:r}=this;e=gr(e);let o=e.length;for(let l=0;l<o;){let s=Math.min(r-this.pos,o-l);if(s===r){let i=uc(e);for(;r<=o-l;l+=r)this.process(i,l);continue}n.set(e.subarray(l,l+s),this.pos),this.pos+=s,l+=s,this.pos===r&&(this.process(a,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){Cn(this),sc(e,this),this.finished=!0;let{buffer:a,view:n,blockLen:r,isLE:o}=this,{pos:l}=this;a[l++]=128,this.buffer.subarray(l).fill(0),this.padOffset>r-l&&(this.process(n,0),l=0);for(let d=l;d<r;d++)a[d]=0;cI(n,r-8,BigInt(this.length*8),o),this.process(n,0);let s=uc(e),i=this.outputLen;if(i%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let u=i/4,f=this.get();if(u>f.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<u;d++)s.setUint32(4*d,f[d],o)}digest(){let{buffer:e,outputLen:a}=this;this.digestInto(e);let n=e.slice(0,a);return this.destroy(),n}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:a,buffer:n,length:r,finished:o,destroyed:l,pos:s}=this;return e.length=r,e.pos=s,e.finished=o,e.destroyed=l,r%a&&e.buffer.set(n),e}};var dI=(t,e,a)=>t&e^~t&a,pI=(t,e,a)=>t&e^t&a^e&a,hI=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),xr=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),yr=new Uint32Array(64),Hm=class extends Jl{constructor(){super(64,32,8,!1),this.A=xr[0]|0,this.B=xr[1]|0,this.C=xr[2]|0,this.D=xr[3]|0,this.E=xr[4]|0,this.F=xr[5]|0,this.G=xr[6]|0,this.H=xr[7]|0}get(){let{A:e,B:a,C:n,D:r,E:o,F:l,G:s,H:i}=this;return[e,a,n,r,o,l,s,i]}set(e,a,n,r,o,l,s,i){this.A=e|0,this.B=a|0,this.C=n|0,this.D=r|0,this.E=o|0,this.F=l|0,this.G=s|0,this.H=i|0}process(e,a){for(let d=0;d<16;d++,a+=4)yr[d]=e.getUint32(a,!1);for(let d=16;d<64;d++){let p=yr[d-15],h=yr[d-2],w=Ua(p,7)^Ua(p,18)^p>>>3,y=Ua(h,17)^Ua(h,19)^h>>>10;yr[d]=y+yr[d-7]+w+yr[d-16]|0}let{A:n,B:r,C:o,D:l,E:s,F:i,G:u,H:f}=this;for(let d=0;d<64;d++){let p=Ua(s,6)^Ua(s,11)^Ua(s,25),h=f+p+dI(s,i,u)+hI[d]+yr[d]|0,y=(Ua(n,2)^Ua(n,13)^Ua(n,22))+pI(n,r,o)|0;f=u,u=i,i=s,s=l+h|0,l=o,o=r,r=n,n=h+y|0}n=n+this.A|0,r=r+this.B|0,o=o+this.C|0,l=l+this.D|0,s=s+this.E|0,i=i+this.F|0,u=u+this.G|0,f=f+this.H|0,this.set(n,r,o,l,s,i,u,f)}roundClean(){yr.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}};var cc=Yl(()=>new Hm);var dc=BigInt(4294967295),Fm=BigInt(32);function Kw(t,e=!1){return e?{h:Number(t&dc),l:Number(t>>Fm&dc)}:{h:Number(t>>Fm&dc)|0,l:Number(t&dc)|0}}function qm(t,e=!1){let a=new Uint32Array(t.length),n=new Uint32Array(t.length);for(let r=0;r<t.length;r++){let{h:o,l}=Kw(t[r],e);[a[r],n[r]]=[o,l]}return[a,n]}var mI=(t,e)=>BigInt(t>>>0)<<Fm|BigInt(e>>>0),gI=(t,e,a)=>t>>>a,xI=(t,e,a)=>t<<32-a|e>>>a,yI=(t,e,a)=>t>>>a|e<<32-a,bI=(t,e,a)=>t<<32-a|e>>>a,wI=(t,e,a)=>t<<64-a|e>>>a-32,LI=(t,e,a)=>t>>>a-32|e<<64-a,vI=(t,e)=>e,AI=(t,e)=>t,Gm=(t,e,a)=>t<<a|e>>>32-a,_m=(t,e,a)=>e<<a|t>>>32-a,Vm=(t,e,a)=>e<<a-32|t>>>64-a,Qm=(t,e,a)=>t<<a-32|e>>>64-a;function CI(t,e,a,n){let r=(e>>>0)+(n>>>0);return{h:t+a+(r/2**32|0)|0,l:r|0}}var SI=(t,e,a)=>(t>>>0)+(e>>>0)+(a>>>0),II=(t,e,a,n)=>e+a+n+(t/2**32|0)|0,EI=(t,e,a,n)=>(t>>>0)+(e>>>0)+(a>>>0)+(n>>>0),TI=(t,e,a,n,r)=>e+a+n+r+(t/2**32|0)|0,BI=(t,e,a,n,r)=>(t>>>0)+(e>>>0)+(a>>>0)+(n>>>0)+(r>>>0),OI=(t,e,a,n,r,o)=>e+a+n+r+o+(t/2**32|0)|0;var NI={fromBig:Kw,split:qm,toBig:mI,shrSH:gI,shrSL:xI,rotrSH:yI,rotrSL:bI,rotrBH:wI,rotrBL:LI,rotr32H:vI,rotr32L:AI,rotlSH:Gm,rotlSL:_m,rotlBH:Vm,rotlBL:Qm,add:CI,add3L:SI,add3H:II,add4L:EI,add4H:TI,add5H:OI,add5L:BI},j=NI;var[kI,DI]=j.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),br=new Uint32Array(80),wr=new Uint32Array(80),Km=class extends Jl{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){let{Ah:e,Al:a,Bh:n,Bl:r,Ch:o,Cl:l,Dh:s,Dl:i,Eh:u,El:f,Fh:d,Fl:p,Gh:h,Gl:w,Hh:y,Hl:v}=this;return[e,a,n,r,o,l,s,i,u,f,d,p,h,w,y,v]}set(e,a,n,r,o,l,s,i,u,f,d,p,h,w,y,v){this.Ah=e|0,this.Al=a|0,this.Bh=n|0,this.Bl=r|0,this.Ch=o|0,this.Cl=l|0,this.Dh=s|0,this.Dl=i|0,this.Eh=u|0,this.El=f|0,this.Fh=d|0,this.Fl=p|0,this.Gh=h|0,this.Gl=w|0,this.Hh=y|0,this.Hl=v|0}process(e,a){for(let x=0;x<16;x++,a+=4)br[x]=e.getUint32(a),wr[x]=e.getUint32(a+=4);for(let x=16;x<80;x++){let L=br[x-15]|0,A=wr[x-15]|0,T=j.rotrSH(L,A,1)^j.rotrSH(L,A,8)^j.shrSH(L,A,7),E=j.rotrSL(L,A,1)^j.rotrSL(L,A,8)^j.shrSL(L,A,7),I=br[x-2]|0,P=wr[x-2]|0,k=j.rotrSH(I,P,19)^j.rotrBH(I,P,61)^j.shrSH(I,P,6),H=j.rotrSL(I,P,19)^j.rotrBL(I,P,61)^j.shrSL(I,P,6),F=j.add4L(E,H,wr[x-7],wr[x-16]),ee=j.add4H(F,T,k,br[x-7],br[x-16]);br[x]=ee|0,wr[x]=F|0}let{Ah:n,Al:r,Bh:o,Bl:l,Ch:s,Cl:i,Dh:u,Dl:f,Eh:d,El:p,Fh:h,Fl:w,Gh:y,Gl:v,Hh:m,Hl:g}=this;for(let x=0;x<80;x++){let L=j.rotrSH(d,p,14)^j.rotrSH(d,p,18)^j.rotrBH(d,p,41),A=j.rotrSL(d,p,14)^j.rotrSL(d,p,18)^j.rotrBL(d,p,41),T=d&h^~d&y,E=p&w^~p&v,I=j.add5L(g,A,E,DI[x],wr[x]),P=j.add5H(I,m,L,T,kI[x],br[x]),k=I|0,H=j.rotrSH(n,r,28)^j.rotrBH(n,r,34)^j.rotrBH(n,r,39),F=j.rotrSL(n,r,28)^j.rotrBL(n,r,34)^j.rotrBL(n,r,39),ee=n&o^n&s^o&s,Fe=r&l^r&i^l&i;m=y|0,g=v|0,y=h|0,v=w|0,h=d|0,w=p|0,{h:d,l:p}=j.add(u|0,f|0,P|0,k|0),u=s|0,f=i|0,s=o|0,i=l|0,o=n|0,l=r|0;let S=j.add3L(k,F,Fe);n=j.add3H(S,P,H,ee),r=S|0}({h:n,l:r}=j.add(this.Ah|0,this.Al|0,n|0,r|0)),{h:o,l}=j.add(this.Bh|0,this.Bl|0,o|0,l|0),{h:s,l:i}=j.add(this.Ch|0,this.Cl|0,s|0,i|0),{h:u,l:f}=j.add(this.Dh|0,this.Dl|0,u|0,f|0),{h:d,l:p}=j.add(this.Eh|0,this.El|0,d|0,p|0),{h,l:w}=j.add(this.Fh|0,this.Fl|0,h|0,w|0),{h:y,l:v}=j.add(this.Gh|0,this.Gl|0,y|0,v|0),{h:m,l:g}=j.add(this.Hh|0,this.Hl|0,m|0,g|0),this.set(n,r,o,l,s,i,u,f,d,p,h,w,y,v,m,g)}roundClean(){br.fill(0),wr.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var Xw=Yl(()=>new Km);function UI(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}var jw=UI(),yO=jw.crypto||jw.msCrypto;function Xm(t){switch(t){case"sha256":return cc.create();case"sha512":return Xw.create()}b(!1,"invalid hashing algorithm name","algorithm",t)}var[Zw,Ww,$w]=[[],[],[]],MI=BigInt(0),ki=BigInt(1),PI=BigInt(2),zI=BigInt(7),RI=BigInt(256),HI=BigInt(113);for(let t=0,e=ki,a=1,n=0;t<24;t++){[a,n]=[n,(2*a+3*n)%5],Zw.push(2*(5*n+a)),Ww.push((t+1)*(t+2)/2%64);let r=MI;for(let o=0;o<7;o++)e=(e<<ki^(e>>zI)*HI)%RI,e&PI&&(r^=ki<<(ki<<BigInt(o))-ki);$w.push(r)}var[FI,qI]=qm($w,!0),Yw=(t,e,a)=>a>32?Vm(t,e,a):Gm(t,e,a),Jw=(t,e,a)=>a>32?Qm(t,e,a):_m(t,e,a);function GI(t,e=24){let a=new Uint32Array(10);for(let n=24-e;n<24;n++){for(let l=0;l<10;l++)a[l]=t[l]^t[l+10]^t[l+20]^t[l+30]^t[l+40];for(let l=0;l<10;l+=2){let s=(l+8)%10,i=(l+2)%10,u=a[i],f=a[i+1],d=Yw(u,f,1)^a[s],p=Jw(u,f,1)^a[s+1];for(let h=0;h<50;h+=10)t[l+h]^=d,t[l+h+1]^=p}let r=t[2],o=t[3];for(let l=0;l<24;l++){let s=Ww[l],i=Yw(r,o,s),u=Jw(r,o,s),f=Zw[l];r=t[f],o=t[f+1],t[f]=i,t[f+1]=u}for(let l=0;l<50;l+=10){for(let s=0;s<10;s++)a[s]=t[l+s];for(let s=0;s<10;s++)t[l+s]^=~a[(s+2)%10]&a[(s+4)%10]}t[0]^=FI[n],t[1]^=qI[n]}a.fill(0)}var pc=class t extends mr{constructor(e,a,n,r=!1,o=24){if(super(),this.blockLen=e,this.suffix=a,this.outputLen=n,this.enableXOF=r,this.rounds=o,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,Oi(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=Gw(this.state)}keccak(){GI(this.state32,this.rounds),this.posOut=0,this.pos=0}update(e){Cn(this);let{blockLen:a,state:n}=this;e=gr(e);let r=e.length;for(let o=0;o<r;){let l=Math.min(a-this.pos,r-o);for(let s=0;s<l;s++)n[this.pos++]^=e[o++];this.pos===a&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;let{state:e,suffix:a,pos:n,blockLen:r}=this;e[n]^=a,(a&128)!==0&&n===r-1&&this.keccak(),e[r-1]^=128,this.keccak()}writeInto(e){Cn(this,!1),Ni(e),this.finish();let a=this.state,{blockLen:n}=this;for(let r=0,o=e.length;r<o;){this.posOut>=n&&this.keccak();let l=Math.min(n-this.posOut,o-r);e.set(a.subarray(this.posOut,this.posOut+l),r),this.posOut+=l,r+=l}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return Oi(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(sc(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){let{blockLen:a,suffix:n,outputLen:r,rounds:o,enableXOF:l}=this;return e||(e=new t(a,n,r,l,o)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=o,e.suffix=n,e.outputLen=r,e.enableXOF=l,e.destroyed=this.destroyed,e}},Lr=(t,e,a)=>Yl(()=>new pc(e,t,a)),AO=Lr(6,144,224/8),CO=Lr(6,136,256/8),SO=Lr(6,104,384/8),IO=Lr(6,72,512/8),EO=Lr(1,144,224/8),eL=Lr(1,136,256/8),TO=Lr(1,104,384/8),BO=Lr(1,72,512/8),tL=(t,e,a)=>Vw((n={})=>new pc(e,t,n.dkLen===void 0?a:n.dkLen,!0)),OO=tL(31,168,128/8),NO=tL(31,136,256/8);var aL=!1,nL=function(t){return eL(t)},rL=nL;function xe(t){let e=R(t,"data");return N(rL(e))}xe._=nL;xe.lock=function(){aL=!0};xe.register=function(t){if(aL)throw new TypeError("keccak256 is locked");rL=t};Object.freeze(xe);var oL=function(t){return Xm("sha256").update(t).digest()},lL=function(t){return Xm("sha512").update(t).digest()},sL=oL,iL=lL,uL=!1,fL=!1;function vr(t){let e=R(t,"data");return N(sL(e))}vr._=oL;vr.lock=function(){uL=!0};vr.register=function(t){if(uL)throw new Error("sha256 is locked");sL=t};Object.freeze(vr);function hc(t){let e=R(t,"data");return N(iL(e))}hc._=lL;hc.lock=function(){fL=!0};hc.register=function(t){if(fL)throw new Error("sha512 is locked");iL=t};Object.freeze(vr);var Zm={};vA(Zm,{bitGet:()=>YI,bitLen:()=>jI,bitMask:()=>Di,bitSet:()=>JI,bytesToHex:()=>go,bytesToNumberBE:()=>Sn,bytesToNumberLE:()=>xc,concatBytes:()=>Zl,createHmacDrbg:()=>Jm,ensureBytes:()=>aa,equalBytes:()=>KI,hexToBytes:()=>xo,hexToNumber:()=>Ym,numberToBytesBE:()=>Ar,numberToBytesLE:()=>yc,numberToHexUnpadded:()=>pL,numberToVarBytesBE:()=>QI,utf8ToBytes:()=>XI,validateObject:()=>Cr});var dL=BigInt(0),mc=BigInt(1),_I=BigInt(2),gc=t=>t instanceof Uint8Array,VI=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function go(t){if(!gc(t))throw new Error("Uint8Array expected");let e="";for(let a=0;a<t.length;a++)e+=VI[t[a]];return e}function pL(t){let e=t.toString(16);return e.length&1?`0${e}`:e}function Ym(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);return BigInt(t===""?"0":`0x${t}`)}function xo(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);let e=t.length;if(e%2)throw new Error("padded hex string expected, got unpadded hex of length "+e);let a=new Uint8Array(e/2);for(let n=0;n<a.length;n++){let r=n*2,o=t.slice(r,r+2),l=Number.parseInt(o,16);if(Number.isNaN(l)||l<0)throw new Error("Invalid byte sequence");a[n]=l}return a}function Sn(t){return Ym(go(t))}function xc(t){if(!gc(t))throw new Error("Uint8Array expected");return Ym(go(Uint8Array.from(t).reverse()))}function Ar(t,e){return xo(t.toString(16).padStart(e*2,"0"))}function yc(t,e){return Ar(t,e).reverse()}function QI(t){return xo(pL(t))}function aa(t,e,a){let n;if(typeof e=="string")try{n=xo(e)}catch(o){throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${o}`)}else if(gc(e))n=Uint8Array.from(e);else throw new Error(`${t} must be hex string or Uint8Array`);let r=n.length;if(typeof a=="number"&&r!==a)throw new Error(`${t} expected ${a} bytes, got ${r}`);return n}function Zl(...t){let e=new Uint8Array(t.reduce((n,r)=>n+r.length,0)),a=0;return t.forEach(n=>{if(!gc(n))throw new Error("Uint8Array expected");e.set(n,a),a+=n.length}),e}function KI(t,e){if(t.length!==e.length)return!1;for(let a=0;a<t.length;a++)if(t[a]!==e[a])return!1;return!0}function XI(t){if(typeof t!="string")throw new Error(`utf8ToBytes expected string, got ${typeof t}`);return new Uint8Array(new TextEncoder().encode(t))}function jI(t){let e;for(e=0;t>dL;t>>=mc,e+=1);return e}function YI(t,e){return t>>BigInt(e)&mc}var JI=(t,e,a)=>t|(a?mc:dL)<<BigInt(e),Di=t=>(_I<<BigInt(t-1))-mc,jm=t=>new Uint8Array(t),cL=t=>Uint8Array.from(t);function Jm(t,e,a){if(typeof t!="number"||t<2)throw new Error("hashLen must be a number");if(typeof e!="number"||e<2)throw new Error("qByteLen must be a number");if(typeof a!="function")throw new Error("hmacFn must be a function");let n=jm(t),r=jm(t),o=0,l=()=>{n.fill(1),r.fill(0),o=0},s=(...d)=>a(r,n,...d),i=(d=jm())=>{r=s(cL([0]),d),n=s(),d.length!==0&&(r=s(cL([1]),d),n=s())},u=()=>{if(o++>=1e3)throw new Error("drbg: tried 1000 values");let d=0,p=[];for(;d<e;){n=s();let h=n.slice();p.push(h),d+=n.length}return Zl(...p)};return(d,p)=>{l(),i(d);let h;for(;!(h=p(u()));)i();return l(),h}}var ZI={bigint:t=>typeof t=="bigint",function:t=>typeof t=="function",boolean:t=>typeof t=="boolean",string:t=>typeof t=="string",stringOrUint8Array:t=>typeof t=="string"||t instanceof Uint8Array,isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>typeof t=="function"&&Number.isSafeInteger(t.outputLen)};function Cr(t,e,a={}){let n=(r,o,l)=>{let s=ZI[o];if(typeof s!="function")throw new Error(`Invalid validator "${o}", expected function`);let i=t[r];if(!(l&&i===void 0)&&!s(i,t))throw new Error(`Invalid param ${String(r)}=${i} (${typeof i}), expected ${o}`)};for(let[r,o]of Object.entries(e))n(r,o,!1);for(let[r,o]of Object.entries(a))n(r,o,!0);return t}var et=BigInt(0),He=BigInt(1),yo=BigInt(2),WI=BigInt(3),Wm=BigInt(4),hL=BigInt(5),mL=BigInt(8),$I=BigInt(9),eE=BigInt(16);function wt(t,e){let a=t%e;return a>=et?a:e+a}function tE(t,e,a){if(a<=et||e<et)throw new Error("Expected power/modulo > 0");if(a===He)return et;let n=He;for(;e>et;)e&He&&(n=n*t%a),t=t*t%a,e>>=He;return n}function na(t,e,a){let n=t;for(;e-- >et;)n*=n,n%=a;return n}function bc(t,e){if(t===et||e<=et)throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);let a=wt(t,e),n=e,r=et,o=He,l=He,s=et;for(;a!==et;){let u=n/a,f=n%a,d=r-l*u,p=o-s*u;n=a,a=f,r=l,o=s,l=d,s=p}if(n!==He)throw new Error("invert: does not exist");return wt(r,e)}function aE(t){let e=(t-He)/yo,a,n,r;for(a=t-He,n=0;a%yo===et;a/=yo,n++);for(r=yo;r<t&&tE(r,e,t)!==t-He;r++);if(n===1){let l=(t+He)/Wm;return function(i,u){let f=i.pow(u,l);if(!i.eql(i.sqr(f),u))throw new Error("Cannot find square root");return f}}let o=(a+He)/yo;return function(s,i){if(s.pow(i,e)===s.neg(s.ONE))throw new Error("Cannot find square root");let u=n,f=s.pow(s.mul(s.ONE,r),a),d=s.pow(i,o),p=s.pow(i,a);for(;!s.eql(p,s.ONE);){if(s.eql(p,s.ZERO))return s.ZERO;let h=1;for(let y=s.sqr(p);h<u&&!s.eql(y,s.ONE);h++)y=s.sqr(y);let w=s.pow(f,He<<BigInt(u-h-1));f=s.sqr(w),d=s.mul(d,w),p=s.mul(p,f),u=h}return d}}function nE(t){if(t%Wm===WI){let e=(t+He)/Wm;return function(n,r){let o=n.pow(r,e);if(!n.eql(n.sqr(o),r))throw new Error("Cannot find square root");return o}}if(t%mL===hL){let e=(t-hL)/mL;return function(n,r){let o=n.mul(r,yo),l=n.pow(o,e),s=n.mul(r,l),i=n.mul(n.mul(s,yo),l),u=n.mul(s,n.sub(i,n.ONE));if(!n.eql(n.sqr(u),r))throw new Error("Cannot find square root");return u}}return t%eE,aE(t)}var rE=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function $m(t){let e={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},a=rE.reduce((n,r)=>(n[r]="function",n),e);return Cr(t,a)}function oE(t,e,a){if(a<et)throw new Error("Expected power > 0");if(a===et)return t.ONE;if(a===He)return e;let n=t.ONE,r=e;for(;a>et;)a&He&&(n=t.mul(n,r)),r=t.sqr(r),a>>=He;return n}function lE(t,e){let a=new Array(e.length),n=e.reduce((o,l,s)=>t.is0(l)?o:(a[s]=o,t.mul(o,l)),t.ONE),r=t.inv(n);return e.reduceRight((o,l,s)=>t.is0(l)?o:(a[s]=t.mul(o,a[s]),t.mul(o,l)),r),a}function eg(t,e){let a=e!==void 0?e:t.toString(2).length,n=Math.ceil(a/8);return{nBitLength:a,nByteLength:n}}function gL(t,e,a=!1,n={}){if(t<=et)throw new Error(`Expected Field ORDER > 0, got ${t}`);let{nBitLength:r,nByteLength:o}=eg(t,e);if(o>2048)throw new Error("Field lengths over 2048 bytes are not supported");let l=nE(t),s=Object.freeze({ORDER:t,BITS:r,BYTES:o,MASK:Di(r),ZERO:et,ONE:He,create:i=>wt(i,t),isValid:i=>{if(typeof i!="bigint")throw new Error(`Invalid field element: expected bigint, got ${typeof i}`);return et<=i&&i<t},is0:i=>i===et,isOdd:i=>(i&He)===He,neg:i=>wt(-i,t),eql:(i,u)=>i===u,sqr:i=>wt(i*i,t),add:(i,u)=>wt(i+u,t),sub:(i,u)=>wt(i-u,t),mul:(i,u)=>wt(i*u,t),pow:(i,u)=>oE(s,i,u),div:(i,u)=>wt(i*bc(u,t),t),sqrN:i=>i*i,addN:(i,u)=>i+u,subN:(i,u)=>i-u,mulN:(i,u)=>i*u,inv:i=>bc(i,t),sqrt:n.sqrt||(i=>l(s,i)),invertBatch:i=>lE(s,i),cmov:(i,u,f)=>f?u:i,toBytes:i=>a?yc(i,o):Ar(i,o),fromBytes:i=>{if(i.length!==o)throw new Error(`Fp.fromBytes: expected ${o}, got ${i.length}`);return a?xc(i):Sn(i)}});return Object.freeze(s)}function xL(t){if(typeof t!="bigint")throw new Error("field order must be bigint");let e=t.toString(2).length;return Math.ceil(e/8)}function tg(t){let e=xL(t);return e+Math.ceil(e/2)}function yL(t,e,a=!1){let n=t.length,r=xL(e),o=tg(e);if(n<16||n<o||n>1024)throw new Error(`expected ${o}-1024 bytes of input, got ${n}`);let l=a?Sn(t):xc(t),s=wt(l,e-He)+He;return a?yc(s,r):Ar(s,r)}var iE=BigInt(0),ag=BigInt(1);function bL(t,e){let a=(r,o)=>{let l=o.negate();return r?l:o},n=r=>{let o=Math.ceil(e/r)+1,l=2**(r-1);return{windows:o,windowSize:l}};return{constTimeNegate:a,unsafeLadder(r,o){let l=t.ZERO,s=r;for(;o>iE;)o&ag&&(l=l.add(s)),s=s.double(),o>>=ag;return l},precomputeWindow(r,o){let{windows:l,windowSize:s}=n(o),i=[],u=r,f=u;for(let d=0;d<l;d++){f=u,i.push(f);for(let p=1;p<s;p++)f=f.add(u),i.push(f);u=f.double()}return i},wNAF(r,o,l){let{windows:s,windowSize:i}=n(r),u=t.ZERO,f=t.BASE,d=BigInt(2**r-1),p=2**r,h=BigInt(r);for(let w=0;w<s;w++){let y=w*i,v=Number(l&d);l>>=h,v>i&&(v-=p,l+=ag);let m=y,g=y+Math.abs(v)-1,x=w%2!==0,L=v<0;v===0?f=f.add(a(x,o[m])):u=u.add(a(L,o[g]))}return{p:u,f}},wNAFCached(r,o,l,s){let i=r._WINDOW_SIZE||1,u=o.get(r);return u||(u=this.precomputeWindow(r,i),i!==1&&o.set(r,s(u))),this.wNAF(i,u,l)}}}function ng(t){return $m(t.Fp),Cr(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...eg(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}function uE(t){let e=ng(t);Cr(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});let{endo:a,Fp:n,a:r}=e;if(a){if(!n.eql(r,n.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if(typeof a!="object"||typeof a.beta!="bigint"||typeof a.splitScalar!="function")throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...e})}var{bytesToNumberBE:fE,hexToBytes:cE}=Zm,bo={Err:class extends Error{constructor(e=""){super(e)}},_parseInt(t){let{Err:e}=bo;if(t.length<2||t[0]!==2)throw new e("Invalid signature integer tag");let a=t[1],n=t.subarray(2,a+2);if(!a||n.length!==a)throw new e("Invalid signature integer: wrong length");if(n[0]&128)throw new e("Invalid signature integer: negative");if(n[0]===0&&!(n[1]&128))throw new e("Invalid signature integer: unnecessary leading zero");return{d:fE(n),l:t.subarray(a+2)}},toSig(t){let{Err:e}=bo,a=typeof t=="string"?cE(t):t;if(!(a instanceof Uint8Array))throw new Error("ui8a expected");let n=a.length;if(n<2||a[0]!=48)throw new e("Invalid signature tag");if(a[1]!==n-2)throw new e("Invalid signature: incorrect length");let{d:r,l:o}=bo._parseInt(a.subarray(2)),{d:l,l:s}=bo._parseInt(o);if(s.length)throw new e("Invalid signature: left bytes after parsing");return{r,s:l}},hexFromSig(t){let e=u=>Number.parseInt(u[0],16)&8?"00"+u:u,a=u=>{let f=u.toString(16);return f.length&1?`0${f}`:f},n=e(a(t.s)),r=e(a(t.r)),o=n.length/2,l=r.length/2,s=a(o),i=a(l);return`30${a(l+o+4)}02${i}${r}02${s}${n}`}},In=BigInt(0),va=BigInt(1),KO=BigInt(2),wL=BigInt(3),XO=BigInt(4);function dE(t){let e=uE(t),{Fp:a}=e,n=e.toBytes||((w,y,v)=>{let m=y.toAffine();return Zl(Uint8Array.from([4]),a.toBytes(m.x),a.toBytes(m.y))}),r=e.fromBytes||(w=>{let y=w.subarray(1),v=a.fromBytes(y.subarray(0,a.BYTES)),m=a.fromBytes(y.subarray(a.BYTES,2*a.BYTES));return{x:v,y:m}});function o(w){let{a:y,b:v}=e,m=a.sqr(w),g=a.mul(m,w);return a.add(a.add(g,a.mul(w,y)),v)}if(!a.eql(a.sqr(e.Gy),o(e.Gx)))throw new Error("bad generator point: equation left != right");function l(w){return typeof w=="bigint"&&In<w&&w<e.n}function s(w){if(!l(w))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function i(w){let{allowedPrivateKeyLengths:y,nByteLength:v,wrapPrivateKey:m,n:g}=e;if(y&&typeof w!="bigint"){if(w instanceof Uint8Array&&(w=go(w)),typeof w!="string"||!y.includes(w.length))throw new Error("Invalid key");w=w.padStart(v*2,"0")}let x;try{x=typeof w=="bigint"?w:Sn(aa("private key",w,v))}catch{throw new Error(`private key must be ${v} bytes, hex or bigint, not ${typeof w}`)}return m&&(x=wt(x,g)),s(x),x}let u=new Map;function f(w){if(!(w instanceof d))throw new Error("ProjectivePoint expected")}class d{constructor(y,v,m){if(this.px=y,this.py=v,this.pz=m,y==null||!a.isValid(y))throw new Error("x required");if(v==null||!a.isValid(v))throw new Error("y required");if(m==null||!a.isValid(m))throw new Error("z required")}static fromAffine(y){let{x:v,y:m}=y||{};if(!y||!a.isValid(v)||!a.isValid(m))throw new Error("invalid affine point");if(y instanceof d)throw new Error("projective point not allowed");let g=x=>a.eql(x,a.ZERO);return g(v)&&g(m)?d.ZERO:new d(v,m,a.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(y){let v=a.invertBatch(y.map(m=>m.pz));return y.map((m,g)=>m.toAffine(v[g])).map(d.fromAffine)}static fromHex(y){let v=d.fromAffine(r(aa("pointHex",y)));return v.assertValidity(),v}static fromPrivateKey(y){return d.BASE.multiply(i(y))}_setWindowSize(y){this._WINDOW_SIZE=y,u.delete(this)}assertValidity(){if(this.is0()){if(e.allowInfinityPoint&&!a.is0(this.py))return;throw new Error("bad point: ZERO")}let{x:y,y:v}=this.toAffine();if(!a.isValid(y)||!a.isValid(v))throw new Error("bad point: x or y not FE");let m=a.sqr(v),g=o(y);if(!a.eql(m,g))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){let{y}=this.toAffine();if(a.isOdd)return!a.isOdd(y);throw new Error("Field doesn\'t support isOdd")}equals(y){f(y);let{px:v,py:m,pz:g}=this,{px:x,py:L,pz:A}=y,T=a.eql(a.mul(v,A),a.mul(x,g)),E=a.eql(a.mul(m,A),a.mul(L,g));return T&&E}negate(){return new d(this.px,a.neg(this.py),this.pz)}double(){let{a:y,b:v}=e,m=a.mul(v,wL),{px:g,py:x,pz:L}=this,A=a.ZERO,T=a.ZERO,E=a.ZERO,I=a.mul(g,g),P=a.mul(x,x),k=a.mul(L,L),H=a.mul(g,x);return H=a.add(H,H),E=a.mul(g,L),E=a.add(E,E),A=a.mul(y,E),T=a.mul(m,k),T=a.add(A,T),A=a.sub(P,T),T=a.add(P,T),T=a.mul(A,T),A=a.mul(H,A),E=a.mul(m,E),k=a.mul(y,k),H=a.sub(I,k),H=a.mul(y,H),H=a.add(H,E),E=a.add(I,I),I=a.add(E,I),I=a.add(I,k),I=a.mul(I,H),T=a.add(T,I),k=a.mul(x,L),k=a.add(k,k),I=a.mul(k,H),A=a.sub(A,I),E=a.mul(k,P),E=a.add(E,E),E=a.add(E,E),new d(A,T,E)}add(y){f(y);let{px:v,py:m,pz:g}=this,{px:x,py:L,pz:A}=y,T=a.ZERO,E=a.ZERO,I=a.ZERO,P=e.a,k=a.mul(e.b,wL),H=a.mul(v,x),F=a.mul(m,L),ee=a.mul(g,A),Fe=a.add(v,m),S=a.add(x,L);Fe=a.mul(Fe,S),S=a.add(H,F),Fe=a.sub(Fe,S),S=a.add(v,g);let U=a.add(x,A);return S=a.mul(S,U),U=a.add(H,ee),S=a.sub(S,U),U=a.add(m,g),T=a.add(L,A),U=a.mul(U,T),T=a.add(F,ee),U=a.sub(U,T),I=a.mul(P,S),T=a.mul(k,ee),I=a.add(T,I),T=a.sub(F,I),I=a.add(F,I),E=a.mul(T,I),F=a.add(H,H),F=a.add(F,H),ee=a.mul(P,ee),S=a.mul(k,S),F=a.add(F,ee),ee=a.sub(H,ee),ee=a.mul(P,ee),S=a.add(S,ee),H=a.mul(F,S),E=a.add(E,H),H=a.mul(U,S),T=a.mul(Fe,T),T=a.sub(T,H),H=a.mul(Fe,F),I=a.mul(U,I),I=a.add(I,H),new d(T,E,I)}subtract(y){return this.add(y.negate())}is0(){return this.equals(d.ZERO)}wNAF(y){return h.wNAFCached(this,u,y,v=>{let m=a.invertBatch(v.map(g=>g.pz));return v.map((g,x)=>g.toAffine(m[x])).map(d.fromAffine)})}multiplyUnsafe(y){let v=d.ZERO;if(y===In)return v;if(s(y),y===va)return this;let{endo:m}=e;if(!m)return h.unsafeLadder(this,y);let{k1neg:g,k1:x,k2neg:L,k2:A}=m.splitScalar(y),T=v,E=v,I=this;for(;x>In||A>In;)x&va&&(T=T.add(I)),A&va&&(E=E.add(I)),I=I.double(),x>>=va,A>>=va;return g&&(T=T.negate()),L&&(E=E.negate()),E=new d(a.mul(E.px,m.beta),E.py,E.pz),T.add(E)}multiply(y){s(y);let v=y,m,g,{endo:x}=e;if(x){let{k1neg:L,k1:A,k2neg:T,k2:E}=x.splitScalar(v),{p:I,f:P}=this.wNAF(A),{p:k,f:H}=this.wNAF(E);I=h.constTimeNegate(L,I),k=h.constTimeNegate(T,k),k=new d(a.mul(k.px,x.beta),k.py,k.pz),m=I.add(k),g=P.add(H)}else{let{p:L,f:A}=this.wNAF(v);m=L,g=A}return d.normalizeZ([m,g])[0]}multiplyAndAddUnsafe(y,v,m){let g=d.BASE,x=(A,T)=>T===In||T===va||!A.equals(g)?A.multiplyUnsafe(T):A.multiply(T),L=x(this,v).add(x(y,m));return L.is0()?void 0:L}toAffine(y){let{px:v,py:m,pz:g}=this,x=this.is0();y==null&&(y=x?a.ONE:a.inv(g));let L=a.mul(v,y),A=a.mul(m,y),T=a.mul(g,y);if(x)return{x:a.ZERO,y:a.ZERO};if(!a.eql(T,a.ONE))throw new Error("invZ was invalid");return{x:L,y:A}}isTorsionFree(){let{h:y,isTorsionFree:v}=e;if(y===va)return!0;if(v)return v(d,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){let{h:y,clearCofactor:v}=e;return y===va?this:v?v(d,this):this.multiplyUnsafe(e.h)}toRawBytes(y=!0){return this.assertValidity(),n(d,this,y)}toHex(y=!0){return go(this.toRawBytes(y))}}d.BASE=new d(e.Gx,e.Gy,a.ONE),d.ZERO=new d(a.ZERO,a.ONE,a.ZERO);let p=e.nBitLength,h=bL(d,e.endo?Math.ceil(p/2):p);return{CURVE:e,ProjectivePoint:d,normPrivateKeyToScalar:i,weierstrassEquation:o,isWithinCurveOrder:l}}function pE(t){let e=ng(t);return Cr(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}function LL(t){let e=pE(t),{Fp:a,n}=e,r=a.BYTES+1,o=2*a.BYTES+1;function l(S){return In<S&&S<a.ORDER}function s(S){return wt(S,n)}function i(S){return bc(S,n)}let{ProjectivePoint:u,normPrivateKeyToScalar:f,weierstrassEquation:d,isWithinCurveOrder:p}=dE({...e,toBytes(S,U,G){let Y=U.toAffine(),oe=a.toBytes(Y.x),Te=Zl;return G?Te(Uint8Array.from([U.hasEvenY()?2:3]),oe):Te(Uint8Array.from([4]),oe,a.toBytes(Y.y))},fromBytes(S){let U=S.length,G=S[0],Y=S.subarray(1);if(U===r&&(G===2||G===3)){let oe=Sn(Y);if(!l(oe))throw new Error("Point is not on curve");let Te=d(oe),Ne=a.sqrt(Te),Ue=(Ne&va)===va;return(G&1)===1!==Ue&&(Ne=a.neg(Ne)),{x:oe,y:Ne}}else if(U===o&&G===4){let oe=a.fromBytes(Y.subarray(0,a.BYTES)),Te=a.fromBytes(Y.subarray(a.BYTES,2*a.BYTES));return{x:oe,y:Te}}else throw new Error(`Point of length ${U} was invalid. Expected ${r} compressed bytes or ${o} uncompressed bytes`)}}),h=S=>go(Ar(S,e.nByteLength));function w(S){let U=n>>va;return S>U}function y(S){return w(S)?s(-S):S}let v=(S,U,G)=>Sn(S.slice(U,G));class m{constructor(U,G,Y){this.r=U,this.s=G,this.recovery=Y,this.assertValidity()}static fromCompact(U){let G=e.nByteLength;return U=aa("compactSignature",U,G*2),new m(v(U,0,G),v(U,G,2*G))}static fromDER(U){let{r:G,s:Y}=bo.toSig(aa("DER",U));return new m(G,Y)}assertValidity(){if(!p(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!p(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(U){return new m(this.r,this.s,U)}recoverPublicKey(U){let{r:G,s:Y,recovery:oe}=this,Te=E(aa("msgHash",U));if(oe==null||![0,1,2,3].includes(oe))throw new Error("recovery id invalid");let Ne=oe===2||oe===3?G+e.n:G;if(Ne>=a.ORDER)throw new Error("recovery id 2 or 3 invalid");let Ue=(oe&1)===0?"02":"03",Gt=u.fromHex(Ue+h(Ne)),_t=i(Ne),Nt=s(-Te*_t),Sa=s(Y*_t),Vt=u.BASE.multiplyAndAddUnsafe(Gt,Nt,Sa);if(!Vt)throw new Error("point at infinify");return Vt.assertValidity(),Vt}hasHighS(){return w(this.s)}normalizeS(){return this.hasHighS()?new m(this.r,s(-this.s),this.recovery):this}toDERRawBytes(){return xo(this.toDERHex())}toDERHex(){return bo.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return xo(this.toCompactHex())}toCompactHex(){return h(this.r)+h(this.s)}}let g={isValidPrivateKey(S){try{return f(S),!0}catch{return!1}},normPrivateKeyToScalar:f,randomPrivateKey:()=>{let S=tg(e.n);return yL(e.randomBytes(S),e.n)},precompute(S=8,U=u.BASE){return U._setWindowSize(S),U.multiply(BigInt(3)),U}};function x(S,U=!0){return u.fromPrivateKey(S).toRawBytes(U)}function L(S){let U=S instanceof Uint8Array,G=typeof S=="string",Y=(U||G)&&S.length;return U?Y===r||Y===o:G?Y===2*r||Y===2*o:S instanceof u}function A(S,U,G=!0){if(L(S))throw new Error("first arg must be private key");if(!L(U))throw new Error("second arg must be public key");return u.fromHex(U).multiply(f(S)).toRawBytes(G)}let T=e.bits2int||function(S){let U=Sn(S),G=S.length*8-e.nBitLength;return G>0?U>>BigInt(G):U},E=e.bits2int_modN||function(S){return s(T(S))},I=Di(e.nBitLength);function P(S){if(typeof S!="bigint")throw new Error("bigint expected");if(!(In<=S&&S<I))throw new Error(`bigint expected < 2^${e.nBitLength}`);return Ar(S,e.nByteLength)}function k(S,U,G=H){if(["recovered","canonical"].some(Lt=>Lt in G))throw new Error("sign() legacy options not supported");let{hash:Y,randomBytes:oe}=e,{lowS:Te,prehash:Ne,extraEntropy:Ue}=G;Te==null&&(Te=!0),S=aa("msgHash",S),Ne&&(S=aa("prehashed msgHash",Y(S)));let Gt=E(S),_t=f(U),Nt=[P(_t),P(Gt)];if(Ue!=null){let Lt=Ue===!0?oe(a.BYTES):Ue;Nt.push(aa("extraEntropy",Lt))}let Sa=Zl(...Nt),Vt=Gt;function vs(Lt){let nn=T(Lt);if(!p(nn))return;let Qo=i(nn),ia=u.BASE.multiply(nn).toAffine(),kn=s(ia.x);if(kn===In)return;let O=s(Qo*s(Vt+kn*_t));if(O===In)return;let te=(ia.x===kn?0:2)|Number(ia.y&va),se=O;return Te&&w(O)&&(se=y(O),te^=1),new m(kn,se,te)}return{seed:Sa,k2sig:vs}}let H={lowS:e.lowS,prehash:!1},F={lowS:e.lowS,prehash:!1};function ee(S,U,G=H){let{seed:Y,k2sig:oe}=k(S,U,G),Te=e;return Jm(Te.hash.outputLen,Te.nByteLength,Te.hmac)(Y,oe)}u.BASE._setWindowSize(8);function Fe(S,U,G,Y=F){let oe=S;if(U=aa("msgHash",U),G=aa("publicKey",G),"strict"in Y)throw new Error("options.strict was renamed to lowS");let{lowS:Te,prehash:Ne}=Y,Ue,Gt;try{if(typeof oe=="string"||oe instanceof Uint8Array)try{Ue=m.fromDER(oe)}catch(ia){if(!(ia instanceof bo.Err))throw ia;Ue=m.fromCompact(oe)}else if(typeof oe=="object"&&typeof oe.r=="bigint"&&typeof oe.s=="bigint"){let{r:ia,s:kn}=oe;Ue=new m(ia,kn)}else throw new Error("PARSE");Gt=u.fromHex(G)}catch(ia){if(ia.message==="PARSE")throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(Te&&Ue.hasHighS())return!1;Ne&&(U=e.hash(U));let{r:_t,s:Nt}=Ue,Sa=E(U),Vt=i(Nt),vs=s(Sa*Vt),Lt=s(_t*Vt),nn=u.BASE.multiplyAndAddUnsafe(Gt,vs,Lt)?.toAffine();return nn?s(nn.x)===_t:!1}return{CURVE:e,getPublicKey:x,getSharedSecret:A,sign:ee,verify:Fe,ProjectivePoint:u,Signature:m,utils:g}}function hE(t){return{hash:t,hmac:(e,...a)=>Rm(t,e,_w(...a)),randomBytes:Qw}}function vL(t,e){let a=n=>LL({...t,...hE(n)});return Object.freeze({...a(e),create:a})}var SL=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),AL=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),mE=BigInt(1),rg=BigInt(2),CL=(t,e)=>(t+e/rg)/e;function gE(t){let e=SL,a=BigInt(3),n=BigInt(6),r=BigInt(11),o=BigInt(22),l=BigInt(23),s=BigInt(44),i=BigInt(88),u=t*t*t%e,f=u*u*t%e,d=na(f,a,e)*f%e,p=na(d,a,e)*f%e,h=na(p,rg,e)*u%e,w=na(h,r,e)*h%e,y=na(w,o,e)*w%e,v=na(y,s,e)*y%e,m=na(v,i,e)*v%e,g=na(m,s,e)*y%e,x=na(g,a,e)*f%e,L=na(x,l,e)*w%e,A=na(L,n,e)*u%e,T=na(A,rg,e);if(!og.eql(og.sqr(T),t))throw new Error("Cannot find square root");return T}var og=gL(SL,void 0,void 0,{sqrt:gE}),En=vL({a:BigInt(0),b:BigInt(7),Fp:og,n:AL,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{let e=AL,a=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),n=-mE*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),r=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=a,l=BigInt("0x100000000000000000000000000000000"),s=CL(o*t,e),i=CL(-n*t,e),u=wt(t-s*a-i*r,e),f=wt(-s*n-i*o,e),d=u>l,p=f>l;if(d&&(u=e-u),p&&(f=e-f),u>l||f>l)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:d,k1:u,k2neg:p,k2:f}}}},cc),aN=BigInt(0);var nN=En.ProjectivePoint;var wo="0x0000000000000000000000000000000000000000";var wc="0x0000000000000000000000000000000000000000000000000000000000000000";var IL=BigInt(0),EL=BigInt(1),sg=BigInt(2),TL=BigInt(27),BL=BigInt(28),Lc=BigInt(35),OL=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),xE=OL/sg,yE=Symbol.for("nodejs.util.inspect.custom"),Lo={};function lg(t){return Et(Oe(t),32)}var tt=class t{#e;#t;#a;#n;get r(){return this.#e}set r(e){b(tn(e)===32,"invalid r","value",e),this.#e=N(e)}get s(){return b(parseInt(this.#t.substring(0,3))<8,"non-canonical s; use ._s","s",this.#t),this.#t}set s(e){b(tn(e)===32,"invalid s","value",e),this.#t=N(e)}get _s(){return this.#t}isValid(){return BigInt(this.#t)<=xE}get v(){return this.#a}set v(e){let a=q(e,"value");b(a===27||a===28,"invalid v","v",e),this.#a=a}get networkV(){return this.#n}get legacyChainId(){let e=this.networkV;return e==null?null:t.getChainId(e)}get yParity(){return this.v===27?0:1}get yParityAndS(){let e=R(this.s);return this.yParity&&(e[0]|=128),N(e)}get compactSerialized(){return ne([this.r,this.yParityAndS])}get serialized(){return ne([this.r,this.s,this.yParity?"0x1c":"0x1b"])}constructor(e,a,n,r){dr(e,Lo,"Signature"),this.#e=a,this.#t=n,this.#a=r,this.#n=null}getCanonical(){if(this.isValid())return this;let e=OL-BigInt(this._s),a=55-this.v,n=new t(Lo,this.r,lg(e),a);return this.networkV&&(n.#n=this.networkV),n}clone(){let e=new t(Lo,this.r,this._s,this.v);return this.networkV&&(e.#n=this.networkV),e}toJSON(){let e=this.networkV;return{_type:"signature",networkV:e!=null?e.toString():null,r:this.r,s:this._s,v:this.v}}[yE](){return this.toString()}toString(){return this.isValid()?`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }`:`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`}static getChainId(e){let a=D(e,"v");return a==TL||a==BL?IL:(b(a>=Lc,"invalid EIP-155 v","v",e),(a-Lc)/sg)}static getChainIdV(e,a){return D(e)*sg+BigInt(35+a-27)}static getNormalizedV(e){let a=D(e);return a===IL||a===TL?27:a===EL||a===BL?28:(b(a>=Lc,"invalid v","v",e),a&EL?27:28)}static from(e){function a(u,f){b(u,f,"signature",e)}if(e==null)return new t(Lo,wc,wc,27);if(typeof e=="string"){let u=R(e,"signature");if(u.length===64){let f=N(u.slice(0,32)),d=u.slice(32,64),p=d[0]&128?28:27;return d[0]&=127,new t(Lo,f,N(d),p)}if(u.length===65){let f=N(u.slice(0,32)),d=N(u.slice(32,64)),p=t.getNormalizedV(u[64]);return new t(Lo,f,d,p)}a(!1,"invalid raw signature length")}if(e instanceof t)return e.clone();let n=e.r;a(n!=null,"missing r");let r=lg(n),o=(function(u,f){if(u!=null)return lg(u);if(f!=null){a(Z(f,32),"invalid yParityAndS");let d=R(f);return d[0]&=127,N(d)}a(!1,"missing s")})(e.s,e.yParityAndS),{networkV:l,v:s}=(function(u,f,d){if(u!=null){let p=D(u);return{networkV:p>=Lc?p:void 0,v:t.getNormalizedV(p)}}if(f!=null)return a(Z(f,32),"invalid yParityAndS"),{v:R(f)[0]&128?28:27};if(d!=null){switch(q(d,"sig.yParity")){case 0:return{v:27};case 1:return{v:28}}a(!1,"invalid yParity")}a(!1,"missing v")})(e.v,e.yParityAndS,e.yParity),i=new t(Lo,r,o,s);return l&&(i.#n=l),a(e.yParity==null||q(e.yParity,"sig.yParity")===i.yParity,"yParity mismatch"),a(e.yParityAndS==null||e.yParityAndS===i.yParityAndS,"yParityAndS mismatch"),i}};var Sr=class t{#e;constructor(e){b(tn(e)===32,"invalid private key","privateKey","[REDACTED]"),this.#e=N(e)}get privateKey(){return this.#e}get publicKey(){return t.computePublicKey(this.#e)}get compressedPublicKey(){return t.computePublicKey(this.#e,!0)}sign(e){b(tn(e)===32,"invalid digest length","digest",e);let a=En.sign(_e(e),_e(this.#e),{lowS:!0});return tt.from({r:Ht(a.r,32),s:Ht(a.s,32),v:a.recovery?28:27})}computeSharedSecret(e){let a=t.computePublicKey(e);return N(En.getSharedSecret(_e(this.#e),R(a),!1))}static computePublicKey(e,a){let n=R(e,"key");if(n.length===32){let o=En.getPublicKey(n,!!a);return N(o)}if(n.length===64){let o=new Uint8Array(65);o[0]=4,o.set(n,1),n=o}let r=En.ProjectivePoint.fromHex(n);return N(r.toRawBytes(a))}static recoverPublicKey(e,a){b(tn(e)===32,"invalid digest length","digest",e);let n=tt.from(a),r=En.Signature.fromCompact(_e(ne([n.r,n.s])));r=r.addRecoveryBit(n.yParity);let o=r.recoverPublicKey(_e(e));return b(o!=null,"invalid signature for digest","signature",a),"0x"+o.toHex(!1)}static addPoints(e,a,n){let r=En.ProjectivePoint.fromHex(t.computePublicKey(e).substring(2)),o=En.ProjectivePoint.fromHex(t.computePublicKey(a).substring(2));return"0x"+r.add(o).toHex(!!n)}};var bE=BigInt(0),wE=BigInt(36);function NL(t){t=t.toLowerCase();let e=t.substring(2).split(""),a=new Uint8Array(40);for(let r=0;r<40;r++)a[r]=e[r].charCodeAt(0);let n=R(xe(a));for(let r=0;r<40;r+=2)n[r>>1]>>4>=8&&(e[r]=e[r].toUpperCase()),(n[r>>1]&15)>=8&&(e[r+1]=e[r+1].toUpperCase());return"0x"+e.join("")}var ig={};for(let t=0;t<10;t++)ig[String(t)]=String(t);for(let t=0;t<26;t++)ig[String.fromCharCode(65+t)]=String(10+t);var kL=15;function LE(t){t=t.toUpperCase(),t=t.substring(4)+t.substring(0,2)+"00";let e=t.split("").map(n=>ig[n]).join("");for(;e.length>=kL;){let n=e.substring(0,kL);e=parseInt(n,10)%97+e.substring(n.length)}let a=String(98-parseInt(e,10)%97);for(;a.length<2;)a="0"+a;return a}var vE=(function(){let t={};for(let e=0;e<36;e++){let a="0123456789abcdefghijklmnopqrstuvwxyz"[e];t[a]=BigInt(e)}return t})();function AE(t){t=t.toLowerCase();let e=bE;for(let a=0;a<t.length;a++)e=e*wE+vE[t[a]];return e}function V(t){if(b(typeof t=="string","invalid address","address",t),t.match(/^(0x)?[0-9a-fA-F]{40}$/)){t.startsWith("0x")||(t="0x"+t);let e=NL(t);return b(!t.match(/([A-F].*[a-f])|([a-f].*[A-F])/)||e===t,"bad address checksum","address",t),e}if(t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){b(t.substring(2,4)===LE(t),"bad icap checksum","address",t);let e=AE(t.substring(4)).toString(16);for(;e.length<40;)e="0"+e;return NL("0x"+e)}b(!1,"invalid address","address",t)}function Wl(t){let e=V(t.from),n=D(t.nonce,"tx.nonce").toString(16);return n==="0"?n="0x":n.length%2?n="0x0"+n:n="0x"+n,V(Ie(xe(La([e,n])),12))}function Ui(t){return t&&typeof t.getAddress=="function"}function Mi(t){try{return V(t),!0}catch{}return!1}async function ug(t,e){let a=await e;return(a==null||a==="0x0000000000000000000000000000000000000000")&&(C(typeof t!="string","unconfigured name","UNCONFIGURED_NAME",{value:t}),b(!1,"invalid AddressLike value; did not resolve to a value address","target",t)),V(a)}function Ve(t,e){if(typeof t=="string")return t.match(/^0x[0-9a-f]{40}$/i)?V(t):(C(e!=null,"ENS resolution requires a provider","UNSUPPORTED_OPERATION",{operation:"resolveName"}),ug(t,e.resolveName(t)));if(Ui(t))return ug(t,t.getAddress());if(t&&typeof t.then=="function")return ug(t,t);b(!1,"unsupported addressable value","target",t)}var Ma={};function z(t,e){let a=!1;return e<0&&(a=!0,e*=-1),new Ee(Ma,`${a?"":"u"}int${e}`,t,{signed:a,width:e})}function fe(t,e){return new Ee(Ma,`bytes${e||""}`,t,{size:e})}var DL=Symbol.for("_ethers_typed"),Ee=class t{type;value;#e;_typedSymbol;constructor(e,a,n,r){r==null&&(r=null),dr(Ma,e,"Typed"),M(this,{_typedSymbol:DL,type:a,value:n}),this.#e=r,this.format()}format(){if(this.type==="array")throw new Error("");if(this.type==="dynamicArray")throw new Error("");return this.type==="tuple"?`tuple(${this.value.map(e=>e.format()).join(",")})`:this.type}defaultValue(){return 0}minValue(){return 0}maxValue(){return 0}isBigInt(){return!!this.type.match(/^u?int[0-9]+$/)}isData(){return this.type.startsWith("bytes")}isString(){return this.type==="string"}get tupleName(){if(this.type!=="tuple")throw TypeError("not a tuple");return this.#e}get arrayLength(){if(this.type!=="array")throw TypeError("not an array");return this.#e===!0?-1:this.#e===!1?this.value.length:null}static from(e,a){return new t(Ma,e,a)}static uint8(e){return z(e,8)}static uint16(e){return z(e,16)}static uint24(e){return z(e,24)}static uint32(e){return z(e,32)}static uint40(e){return z(e,40)}static uint48(e){return z(e,48)}static uint56(e){return z(e,56)}static uint64(e){return z(e,64)}static uint72(e){return z(e,72)}static uint80(e){return z(e,80)}static uint88(e){return z(e,88)}static uint96(e){return z(e,96)}static uint104(e){return z(e,104)}static uint112(e){return z(e,112)}static uint120(e){return z(e,120)}static uint128(e){return z(e,128)}static uint136(e){return z(e,136)}static uint144(e){return z(e,144)}static uint152(e){return z(e,152)}static uint160(e){return z(e,160)}static uint168(e){return z(e,168)}static uint176(e){return z(e,176)}static uint184(e){return z(e,184)}static uint192(e){return z(e,192)}static uint200(e){return z(e,200)}static uint208(e){return z(e,208)}static uint216(e){return z(e,216)}static uint224(e){return z(e,224)}static uint232(e){return z(e,232)}static uint240(e){return z(e,240)}static uint248(e){return z(e,248)}static uint256(e){return z(e,256)}static uint(e){return z(e,256)}static int8(e){return z(e,-8)}static int16(e){return z(e,-16)}static int24(e){return z(e,-24)}static int32(e){return z(e,-32)}static int40(e){return z(e,-40)}static int48(e){return z(e,-48)}static int56(e){return z(e,-56)}static int64(e){return z(e,-64)}static int72(e){return z(e,-72)}static int80(e){return z(e,-80)}static int88(e){return z(e,-88)}static int96(e){return z(e,-96)}static int104(e){return z(e,-104)}static int112(e){return z(e,-112)}static int120(e){return z(e,-120)}static int128(e){return z(e,-128)}static int136(e){return z(e,-136)}static int144(e){return z(e,-144)}static int152(e){return z(e,-152)}static int160(e){return z(e,-160)}static int168(e){return z(e,-168)}static int176(e){return z(e,-176)}static int184(e){return z(e,-184)}static int192(e){return z(e,-192)}static int200(e){return z(e,-200)}static int208(e){return z(e,-208)}static int216(e){return z(e,-216)}static int224(e){return z(e,-224)}static int232(e){return z(e,-232)}static int240(e){return z(e,-240)}static int248(e){return z(e,-248)}static int256(e){return z(e,-256)}static int(e){return z(e,-256)}static bytes1(e){return fe(e,1)}static bytes2(e){return fe(e,2)}static bytes3(e){return fe(e,3)}static bytes4(e){return fe(e,4)}static bytes5(e){return fe(e,5)}static bytes6(e){return fe(e,6)}static bytes7(e){return fe(e,7)}static bytes8(e){return fe(e,8)}static bytes9(e){return fe(e,9)}static bytes10(e){return fe(e,10)}static bytes11(e){return fe(e,11)}static bytes12(e){return fe(e,12)}static bytes13(e){return fe(e,13)}static bytes14(e){return fe(e,14)}static bytes15(e){return fe(e,15)}static bytes16(e){return fe(e,16)}static bytes17(e){return fe(e,17)}static bytes18(e){return fe(e,18)}static bytes19(e){return fe(e,19)}static bytes20(e){return fe(e,20)}static bytes21(e){return fe(e,21)}static bytes22(e){return fe(e,22)}static bytes23(e){return fe(e,23)}static bytes24(e){return fe(e,24)}static bytes25(e){return fe(e,25)}static bytes26(e){return fe(e,26)}static bytes27(e){return fe(e,27)}static bytes28(e){return fe(e,28)}static bytes29(e){return fe(e,29)}static bytes30(e){return fe(e,30)}static bytes31(e){return fe(e,31)}static bytes32(e){return fe(e,32)}static address(e){return new t(Ma,"address",e)}static bool(e){return new t(Ma,"bool",!!e)}static bytes(e){return new t(Ma,"bytes",e)}static string(e){return new t(Ma,"string",e)}static array(e,a){throw new Error("not implemented yet")}static tuple(e,a){throw new Error("not implemented yet")}static overrides(e){return new t(Ma,"overrides",Object.assign({},e))}static isTyped(e){return e&&typeof e=="object"&&"_typedSymbol"in e&&e._typedSymbol===DL}static dereference(e,a){if(t.isTyped(e)){if(e.type!==a)throw new Error(`invalid type: expecetd ${a}, got ${e.type}`);return e.value}return e}};var vc=class extends Ye{constructor(e){super("address","address",e,!1)}defaultValue(){return"0x0000000000000000000000000000000000000000"}encode(e,a){let n=Ee.dereference(a,"string");try{n=V(n)}catch(r){return this._throwError(r.message,a)}return e.writeValue(n)}decode(e){return V(Ht(e.readValue(),20))}};var Ac=class extends Ye{coder;constructor(e){super(e.name,e.type,"_",e.dynamic),this.coder=e}defaultValue(){return this.coder.defaultValue()}encode(e,a){return this.coder.encode(e,a)}decode(e){return this.coder.decode(e)}};function fg(t,e,a){let n=[];if(Array.isArray(a))n=a;else if(a&&typeof a=="object"){let i={};n=e.map(u=>{let f=u.localName;return C(f,"cannot encode object for signature with missing names","INVALID_ARGUMENT",{argument:"values",info:{coder:u},value:a}),C(!i[f],"cannot encode object for signature with duplicate names","INVALID_ARGUMENT",{argument:"values",info:{coder:u},value:a}),i[f]=!0,a[f]})}else b(!1,"invalid tuple value","tuple",a);b(e.length===n.length,"types/value length mismatch","tuple",a);let r=new mo,o=new mo,l=[];e.forEach((i,u)=>{let f=n[u];if(i.dynamic){let d=o.length;i.encode(o,f);let p=r.writeUpdatableValue();l.push(h=>{p(h+d)})}else i.encode(r,f)}),l.forEach(i=>{i(r.length)});let s=t.appendWriter(r);return s+=t.appendWriter(o),s}function cg(t,e){let a=[],n=[],r=t.subReader(0);return e.forEach(o=>{let l=null;if(o.dynamic){let s=t.readIndex(),i=r.subReader(s);try{l=o.decode(i)}catch(u){if(Be(u,"BUFFER_OVERRUN"))throw u;l=u,l.baseType=o.name,l.name=o.localName,l.type=o.type}}else try{l=o.decode(t)}catch(s){if(Be(s,"BUFFER_OVERRUN"))throw s;l=s,l.baseType=o.name,l.name=o.localName,l.type=o.type}if(l==null)throw new Error("investigate");a.push(l),n.push(o.localName||null)}),An.fromItems(a,n)}var Cc=class extends Ye{coder;length;constructor(e,a,n){let r=e.type+"["+(a>=0?a:"")+"]",o=a===-1||e.dynamic;super("array",r,n,o),M(this,{coder:e,length:a})}defaultValue(){let e=this.coder.defaultValue(),a=[];for(let n=0;n<this.length;n++)a.push(e);return a}encode(e,a){let n=Ee.dereference(a,"array");Array.isArray(n)||this._throwError("expected array value",n);let r=this.length;r===-1&&(r=n.length,e.writeValue(n.length)),Si(n.length,r,"coder array"+(this.localName?" "+this.localName:""));let o=[];for(let l=0;l<n.length;l++)o.push(this.coder);return fg(e,o,n)}decode(e){let a=this.length;a===-1&&(a=e.readIndex(),C(a*gt<=e.dataLength,"insufficient data length","BUFFER_OVERRUN",{buffer:e.bytes,offset:a*gt,length:e.dataLength}));let n=[];for(let r=0;r<a;r++)n.push(new Ac(this.coder));return cg(e,n)}};var Sc=class extends Ye{constructor(e){super("bool","bool",e,!1)}defaultValue(){return!1}encode(e,a){let n=Ee.dereference(a,"bool");return e.writeValue(n?1:0)}decode(e){return!!e.readValue()}};var Pi=class extends Ye{constructor(e,a){super(e,e,a,!0)}defaultValue(){return"0x"}encode(e,a){a=_e(a);let n=e.writeValue(a.length);return n+=e.writeBytes(a),n}decode(e){return e.readBytes(e.readIndex(),!0)}},Ic=class extends Pi{constructor(e){super("bytes",e)}decode(e){return N(super.decode(e))}};var Ec=class extends Ye{size;constructor(e,a){let n="bytes"+String(e);super(n,n,a,!1),M(this,{size:e},{size:"number"})}defaultValue(){return"0x0000000000000000000000000000000000000000000000000000000000000000".substring(0,2+this.size*2)}encode(e,a){let n=_e(Ee.dereference(a,this.type));return n.length!==this.size&&this._throwError("incorrect data length",a),e.writeBytes(n)}decode(e){return N(e.readBytes(this.size))}};var IE=new Uint8Array([]),Tc=class extends Ye{constructor(e){super("null","",e,!1)}defaultValue(){return null}encode(e,a){return a!=null&&this._throwError("not null",a),e.writeBytes(IE)}decode(e){return e.readBytes(0),null}};var EE=BigInt(0),TE=BigInt(1),BE=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),Bc=class extends Ye{size;signed;constructor(e,a,n){let r=(a?"int":"uint")+e*8;super(r,r,n,!1),M(this,{size:e,signed:a},{size:"number",signed:"boolean"})}defaultValue(){return 0}encode(e,a){let n=D(Ee.dereference(a,this.type)),r=pr(BE,gt*8);if(this.signed){let o=pr(r,this.size*8-1);(n>o||n<-(o+TE))&&this._throwError("value out-of-bounds",a),n=Ei(n,8*gt)}else(n<EE||n>pr(r,this.size*8))&&this._throwError("value out-of-bounds",a);return e.writeValue(n)}decode(e){let a=pr(e.readValue(),this.size*8);return this.signed&&(a=km(a,this.size*8)),a}};var Oc=class extends Pi{constructor(e){super("string",e)}defaultValue(){return""}encode(e,a){return super.encode(e,Bt(Ee.dereference(a,"string")))}decode(e){return hr(super.decode(e))}};var vo=class extends Ye{coders;constructor(e,a){let n=!1,r=[];e.forEach(l=>{l.dynamic&&(n=!0),r.push(l.type)});let o="tuple("+r.join(",")+")";super("tuple",o,a,n),M(this,{coders:Object.freeze(e.slice())})}defaultValue(){let e=[];this.coders.forEach(n=>{e.push(n.defaultValue())});let a=this.coders.reduce((n,r)=>{let o=r.localName;return o&&(n[o]||(n[o]=0),n[o]++),n},{});return this.coders.forEach((n,r)=>{let o=n.localName;!o||a[o]!==1||(o==="length"&&(o="_length"),e[o]==null&&(e[o]=e[r]))}),Object.freeze(e)}encode(e,a){let n=Ee.dereference(a,"tuple");return fg(e,this.coders,n)}decode(e){return cg(e,this.coders)}};function dg(t,e){return{address:V(t),storageKeys:e.map((a,n)=>(b(Z(a,32),"invalid slot",`storageKeys[${n}]`,a),a.toLowerCase()))}}function ra(t){if(Array.isArray(t))return t.map((a,n)=>Array.isArray(a)?(b(a.length===2,"invalid slot set",`value[${n}]`,a),dg(a[0],a[1])):(b(a!=null&&typeof a=="object","invalid address-slot set","value",t),dg(a.address,a.storageKeys)));b(t!=null&&typeof t=="object","invalid access list","value",t);let e=Object.keys(t).map(a=>{let n=t[a].reduce((r,o)=>(r[o]=!0,r),{});return dg(a,Object.keys(n).sort())});return e.sort((a,n)=>a.address.localeCompare(n.address)),e}function zi(t){return{address:V(t.address),nonce:D(t.nonce!=null?t.nonce:0),chainId:D(t.chainId!=null?t.chainId:0),signature:tt.from(t.signature)}}function OE(t){let e;return typeof t=="string"?e=Sr.computePublicKey(t,!1):e=t.publicKey,V(xe("0x"+e.substring(4)).substring(26))}function UL(t,e){return OE(Sr.recoverPublicKey(t,e))}var st=BigInt(0),NE=BigInt(2),kE=BigInt(27),DE=BigInt(28),UE=BigInt(35),ME=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),PE=Symbol.for("nodejs.util.inspect.custom"),pg=4096*32,Nc=128;function zE(t){return{blobToKzgCommitment:n=>{if("computeBlobProof"in t){if("blobToKzgCommitment"in t&&typeof t.blobToKzgCommitment=="function")return R(t.blobToKzgCommitment(N(n)))}else if("blobToKzgCommitment"in t&&typeof t.blobToKzgCommitment=="function")return R(t.blobToKzgCommitment(n));if("blobToKZGCommitment"in t&&typeof t.blobToKZGCommitment=="function")return R(t.blobToKZGCommitment(N(n)));b(!1,"unsupported KZG library","kzg",t)},computeBlobKzgProof:(n,r)=>{if("computeBlobProof"in t&&typeof t.computeBlobProof=="function")return R(t.computeBlobProof(N(n),N(r)));if("computeBlobKzgProof"in t&&typeof t.computeBlobKzgProof=="function")return t.computeBlobKzgProof(n,r);if("computeBlobKZGProof"in t&&typeof t.computeBlobKZGProof=="function")return R(t.computeBlobKZGProof(N(n),N(r)));b(!1,"unsupported KZG library","kzg",t)}}}function ML(t,e){let a=t.toString(16);for(;a.length<2;)a="0"+a;return a+=vr(e).substring(4),"0x"+a}function $l(t){return t==="0x"?null:V(t)}function kc(t,e){try{return ra(t)}catch(a){b(!1,a.message,e,t)}}function RE(t,e){try{if(!Array.isArray(t))throw new Error("authorizationList: invalid array");let a=[];for(let n=0;n<t.length;n++){let r=t[n];if(!Array.isArray(r))throw new Error(`authorization[${n}]: invalid array`);if(r.length!==6)throw new Error(`authorization[${n}]: wrong length`);if(!r[1])throw new Error(`authorization[${n}]: null address`);a.push({address:$l(r[1]),nonce:be(r[2],"nonce"),chainId:be(r[0],"chainId"),signature:tt.from({yParity:Co(r[3],"yParity"),r:Et(r[4],32),s:Et(r[5],32)})})}return a}catch(a){b(!1,a.message,e,t)}}function Co(t,e){return t==="0x"?0:q(t,e)}function be(t,e){if(t==="0x")return st;let a=D(t,e);return b(a<=ME,"value exceeds uint size",e,a),a}function le(t,e){let a=D(t,"value"),n=Oe(a);return b(n.length<=32,"value too large",`tx.${e}`,a),n}function Dc(t){return ra(t).map(e=>[e.address,e.storageKeys])}function HE(t){return t.map(e=>[le(e.chainId,"chainId"),e.address,le(e.nonce,"nonce"),le(e.signature.yParity,"yParity"),Oe(e.signature.r),Oe(e.signature._s)])}function FE(t,e){b(Array.isArray(t),`invalid ${e}`,"value",t);for(let a=0;a<t.length;a++)b(Z(t[a],32),"invalid ${ param } hash",`value[${a}]`,t[a]);return t}function qE(t){let e=po(t);b(Array.isArray(e)&&(e.length===9||e.length===6),"invalid field count for legacy transaction","data",t);let a={type:0,nonce:Co(e[0],"nonce"),gasPrice:be(e[1],"gasPrice"),gasLimit:be(e[2],"gasLimit"),to:$l(e[3]),value:be(e[4],"value"),data:N(e[5]),chainId:st};if(e.length===6)return a;let n=be(e[6],"v"),r=be(e[7],"r"),o=be(e[8],"s");if(r===st&&o===st)a.chainId=n;else{let l=(n-UE)/NE;l<st&&(l=st),a.chainId=l,b(l!==st||n===kE||n===DE,"non-canonical legacy v","v",e[6]),a.signature=tt.from({r:Et(e[7],32),s:Et(e[8],32),v:n})}return a}function GE(t,e){let a=[le(t.nonce,"nonce"),le(t.gasPrice||0,"gasPrice"),le(t.gasLimit,"gasLimit"),t.to||"0x",le(t.value,"value"),t.data],n=st;if(t.chainId!=st)n=D(t.chainId,"tx.chainId"),b(!e||e.networkV==null||e.legacyChainId===n,"tx.chainId/sig.v mismatch","sig",e);else if(t.signature){let o=t.signature.legacyChainId;o!=null&&(n=o)}if(!e)return n!==st&&(a.push(Oe(n)),a.push("0x"),a.push("0x")),La(a);let r=BigInt(27+e.yParity);return n!==st?r=tt.getChainIdV(n,e.v):BigInt(e.v)!==r&&b(!1,"tx.chainId/sig.v mismatch","sig",e),a.push(Oe(r)),a.push(Oe(e.r)),a.push(Oe(e._s)),La(a)}function Uc(t,e){let a;try{if(a=Co(e[0],"yParity"),a!==0&&a!==1)throw new Error("bad yParity")}catch{b(!1,"invalid yParity","yParity",e[0])}let n=Et(e[1],32),r=Et(e[2],32),o=tt.from({r:n,s:r,yParity:a});t.signature=o}function _E(t){let e=po(R(t).slice(1));b(Array.isArray(e)&&(e.length===9||e.length===12),"invalid field count for transaction type: 2","data",N(t));let a={type:2,chainId:be(e[0],"chainId"),nonce:Co(e[1],"nonce"),maxPriorityFeePerGas:be(e[2],"maxPriorityFeePerGas"),maxFeePerGas:be(e[3],"maxFeePerGas"),gasPrice:null,gasLimit:be(e[4],"gasLimit"),to:$l(e[5]),value:be(e[6],"value"),data:N(e[7]),accessList:kc(e[8],"accessList")};return e.length===9||Uc(a,e.slice(9)),a}function VE(t,e){let a=[le(t.chainId,"chainId"),le(t.nonce,"nonce"),le(t.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),le(t.maxFeePerGas||0,"maxFeePerGas"),le(t.gasLimit,"gasLimit"),t.to||"0x",le(t.value,"value"),t.data,Dc(t.accessList||[])];return e&&(a.push(le(e.yParity,"yParity")),a.push(Oe(e.r)),a.push(Oe(e.s))),ne(["0x02",La(a)])}function QE(t){let e=po(R(t).slice(1));b(Array.isArray(e)&&(e.length===8||e.length===11),"invalid field count for transaction type: 1","data",N(t));let a={type:1,chainId:be(e[0],"chainId"),nonce:Co(e[1],"nonce"),gasPrice:be(e[2],"gasPrice"),gasLimit:be(e[3],"gasLimit"),to:$l(e[4]),value:be(e[5],"value"),data:N(e[6]),accessList:kc(e[7],"accessList")};return e.length===8||Uc(a,e.slice(8)),a}function KE(t,e){let a=[le(t.chainId,"chainId"),le(t.nonce,"nonce"),le(t.gasPrice||0,"gasPrice"),le(t.gasLimit,"gasLimit"),t.to||"0x",le(t.value,"value"),t.data,Dc(t.accessList||[])];return e&&(a.push(le(e.yParity,"recoveryParam")),a.push(Oe(e.r)),a.push(Oe(e.s))),ne(["0x01",La(a)])}function XE(t){let e=po(R(t).slice(1)),a="3",n=null,r=null;if(e.length===4&&Array.isArray(e[0])){a="3 (network format)";let l=e[1],s=e[2],i=e[3];b(Array.isArray(l),"invalid network format: blobs not an array","fields[1]",l),b(Array.isArray(s),"invalid network format: commitments not an array","fields[2]",s),b(Array.isArray(i),"invalid network format: proofs not an array","fields[3]",i),b(l.length===s.length,"invalid network format: blobs/commitments length mismatch","fields",e),b(l.length===i.length,"invalid network format: blobs/proofs length mismatch","fields",e),r=[];for(let u=0;u<e[1].length;u++)r.push({data:l[u],commitment:s[u],proof:i[u]});e=e[0]}else if(e.length===5&&Array.isArray(e[0])){a="3 (EIP-7594 network format)",n=q(e[1]);let l=e[2],s=e[3],i=e[4];b(n===1,`unsupported EIP-7594 network format version: ${n}`,"fields[1]",n),b(Array.isArray(l),"invalid EIP-7594 network format: blobs not an array","fields[2]",l),b(Array.isArray(s),"invalid EIP-7594 network format: commitments not an array","fields[3]",s),b(Array.isArray(i),"invalid EIP-7594 network format: proofs not an array","fields[4]",i),b(l.length===s.length,"invalid network format: blobs/commitments length mismatch","fields",e),b(l.length*Nc===i.length,"invalid network format: blobs/proofs length mismatch","fields",e),r=[];for(let u=0;u<l.length;u++){let f=[];for(let d=0;d<Nc;d++)f.push(i[u*Nc+d]);r.push({data:l[u],commitment:s[u],proof:ne(f)})}e=e[0]}b(Array.isArray(e)&&(e.length===11||e.length===14),`invalid field count for transaction type: ${a}`,"data",N(t));let o={type:3,chainId:be(e[0],"chainId"),nonce:Co(e[1],"nonce"),maxPriorityFeePerGas:be(e[2],"maxPriorityFeePerGas"),maxFeePerGas:be(e[3],"maxFeePerGas"),gasPrice:null,gasLimit:be(e[4],"gasLimit"),to:$l(e[5]),value:be(e[6],"value"),data:N(e[7]),accessList:kc(e[8],"accessList"),maxFeePerBlobGas:be(e[9],"maxFeePerBlobGas"),blobVersionedHashes:e[10],blobWrapperVersion:n};r&&(o.blobs=r),b(o.to!=null,`invalid address for transaction type: ${a}`,"data",t),b(Array.isArray(o.blobVersionedHashes),"invalid blobVersionedHashes: must be an array","data",t);for(let l=0;l<o.blobVersionedHashes.length;l++)b(Z(o.blobVersionedHashes[l],32),`invalid blobVersionedHash at index ${l}: must be length 32`,"data",t);return e.length===11||Uc(o,e.slice(11)),o}function jE(t,e,a){let n=[le(t.chainId,"chainId"),le(t.nonce,"nonce"),le(t.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),le(t.maxFeePerGas||0,"maxFeePerGas"),le(t.gasLimit,"gasLimit"),t.to||wo,le(t.value,"value"),t.data,Dc(t.accessList||[]),le(t.maxFeePerBlobGas||0,"maxFeePerBlobGas"),FE(t.blobVersionedHashes||[],"blobVersionedHashes")];if(e&&(n.push(le(e.yParity,"yParity")),n.push(Oe(e.r)),n.push(Oe(e.s)),a)){if(t.blobWrapperVersion!=null){let r=Oe(t.blobWrapperVersion),o=[];for(let{proof:l}of a){let s=R(l),i=s.length/Nc;for(let u=0;u<s.length;u+=i)o.push(s.subarray(u,u+i))}return ne(["0x03",La([n,r,a.map(l=>l.data),a.map(l=>l.commitment),o])])}return ne(["0x03",La([n,a.map(r=>r.data),a.map(r=>r.commitment),a.map(r=>r.proof)])])}return ne(["0x03",La(n)])}function YE(t){let e=po(R(t).slice(1));b(Array.isArray(e)&&(e.length===10||e.length===13),"invalid field count for transaction type: 4","data",N(t));let a={type:4,chainId:be(e[0],"chainId"),nonce:Co(e[1],"nonce"),maxPriorityFeePerGas:be(e[2],"maxPriorityFeePerGas"),maxFeePerGas:be(e[3],"maxFeePerGas"),gasPrice:null,gasLimit:be(e[4],"gasLimit"),to:$l(e[5]),value:be(e[6],"value"),data:N(e[7]),accessList:kc(e[8],"accessList"),authorizationList:RE(e[9],"authorizationList")};return e.length===10||Uc(a,e.slice(10)),a}function JE(t,e){let a=[le(t.chainId,"chainId"),le(t.nonce,"nonce"),le(t.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),le(t.maxFeePerGas||0,"maxFeePerGas"),le(t.gasLimit,"gasLimit"),t.to||"0x",le(t.value,"value"),t.data,Dc(t.accessList||[]),HE(t.authorizationList||[])];return e&&(a.push(le(e.yParity,"yParity")),a.push(Oe(e.r)),a.push(Oe(e.s))),ne(["0x04",La(a)])}var Ao=class t{#e;#t;#a;#n;#r;#l;#o;#s;#p;#u;#m;#h;#d;#f;#c;#i;#x;#y;get type(){return this.#e}set type(e){switch(e){case null:this.#e=null;break;case 0:case"legacy":this.#e=0;break;case 1:case"berlin":case"eip-2930":this.#e=1;break;case 2:case"london":case"eip-1559":this.#e=2;break;case 3:case"cancun":case"eip-4844":this.#e=3;break;case 4:case"pectra":case"eip-7702":this.#e=4;break;default:b(!1,"unsupported transaction type","type",e)}}get typeName(){switch(this.type){case 0:return"legacy";case 1:return"eip-2930";case 2:return"eip-1559";case 3:return"eip-4844";case 4:return"eip-7702"}return null}get to(){let e=this.#t;return e==null&&this.type===3?wo:e}set to(e){this.#t=e==null?null:V(e)}get nonce(){return this.#n}set nonce(e){this.#n=q(e,"value")}get gasLimit(){return this.#r}set gasLimit(e){this.#r=D(e)}get gasPrice(){let e=this.#l;return e==null&&(this.type===0||this.type===1)?st:e}set gasPrice(e){this.#l=e==null?null:D(e,"gasPrice")}get maxPriorityFeePerGas(){let e=this.#o;return e??(this.type===2||this.type===3?st:null)}set maxPriorityFeePerGas(e){this.#o=e==null?null:D(e,"maxPriorityFeePerGas")}get maxFeePerGas(){let e=this.#s;return e??(this.type===2||this.type===3?st:null)}set maxFeePerGas(e){this.#s=e==null?null:D(e,"maxFeePerGas")}get data(){return this.#a}set data(e){this.#a=N(e)}get value(){return this.#p}set value(e){this.#p=D(e,"value")}get chainId(){return this.#u}set chainId(e){this.#u=D(e)}get signature(){return this.#m||null}set signature(e){this.#m=e==null?null:tt.from(e)}isValid(){let e=this.signature;if(e&&!e.isValid())return!1;let a=this.authorizationList;if(a){for(let n of a)if(!n.signature.isValid())return!1}return!0}get accessList(){let e=this.#h||null;return e??(this.type===1||this.type===2||this.type===3?[]:null)}set accessList(e){this.#h=e==null?null:ra(e)}get authorizationList(){let e=this.#x||null;return e==null&&this.type===4?[]:e}set authorizationList(e){this.#x=e==null?null:e.map(a=>zi(a))}get maxFeePerBlobGas(){let e=this.#d;return e==null&&this.type===3?st:e}set maxFeePerBlobGas(e){this.#d=e==null?null:D(e,"maxFeePerBlobGas")}get blobVersionedHashes(){let e=this.#f;return e==null&&this.type===3?[]:e}set blobVersionedHashes(e){if(e!=null){b(Array.isArray(e),"blobVersionedHashes must be an Array","value",e),e=e.slice();for(let a=0;a<e.length;a++)b(Z(e[a],32),"invalid blobVersionedHash",`value[${a}]`,e[a])}this.#f=e}get blobs(){return this.#i==null?null:this.#i.map(e=>Object.assign({},e))}set blobs(e){if(e==null){this.#i=null;return}let a=[],n=[];for(let r=0;r<e.length;r++){let o=e[r];if(fo(o)){C(this.#c,"adding a raw blob requires a KZG library","UNSUPPORTED_OPERATION",{operation:"set blobs()"});let l=R(o);if(b(l.length<=pg,"blob is too large",`blobs[${r}]`,o),l.length!==pg){let u=new Uint8Array(pg);u.set(l),l=u}let s=this.#c.blobToKzgCommitment(l),i=N(this.#c.computeBlobKzgProof(l,s));a.push({data:N(l),commitment:N(s),proof:i}),n.push(ML(1,s))}else{let l=N(o.data),s=N(o.commitment),i=N(o.proof);a.push({data:l,commitment:s,proof:i}),n.push(ML(1,s))}}this.#i=a,this.#f=n}get kzg(){return this.#c}set kzg(e){e==null?this.#c=null:this.#c=zE(e)}get blobWrapperVersion(){return this.#y}set blobWrapperVersion(e){this.#y=e}constructor(){this.#e=null,this.#t=null,this.#n=0,this.#r=st,this.#l=null,this.#o=null,this.#s=null,this.#a="0x",this.#p=st,this.#u=st,this.#m=null,this.#h=null,this.#d=null,this.#f=null,this.#c=null,this.#i=null,this.#x=null,this.#y=null}get hash(){return this.signature==null?null:xe(this.#g(!0,!1))}get unsignedHash(){return xe(this.unsignedSerialized)}get from(){return this.signature==null?null:UL(this.unsignedHash,this.signature.getCanonical())}get fromPublicKey(){return this.signature==null?null:Sr.recoverPublicKey(this.unsignedHash,this.signature.getCanonical())}isSigned(){return this.signature!=null}#g(e,a){C(!e||this.signature!=null,"cannot serialize unsigned transaction; maybe you meant .unsignedSerialized","UNSUPPORTED_OPERATION",{operation:".serialized"});let n=e?this.signature:null;switch(this.inferType()){case 0:return GE(this,n);case 1:return KE(this,n);case 2:return VE(this,n);case 3:return jE(this,n,a?this.blobs:null);case 4:return JE(this,n)}C(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:".serialized"})}get serialized(){return this.#g(!0,!0)}get unsignedSerialized(){return this.#g(!1,!1)}inferType(){let e=this.inferTypes();return e.indexOf(2)>=0?2:e.pop()}inferTypes(){let e=this.gasPrice!=null,a=this.maxFeePerGas!=null||this.maxPriorityFeePerGas!=null,n=this.accessList!=null,r=this.#d!=null||this.#f;this.maxFeePerGas!=null&&this.maxPriorityFeePerGas!=null&&C(this.maxFeePerGas>=this.maxPriorityFeePerGas,"priorityFee cannot be more than maxFee","BAD_DATA",{value:this}),C(!a||this.type!==0&&this.type!==1,"transaction type cannot have maxFeePerGas or maxPriorityFeePerGas","BAD_DATA",{value:this}),C(this.type!==0||!n,"legacy transaction cannot have accessList","BAD_DATA",{value:this});let o=[];return this.type!=null?o.push(this.type):this.authorizationList&&this.authorizationList.length?o.push(4):a?o.push(2):e?(o.push(1),n||o.push(0)):n?(o.push(1),o.push(2)):(r&&this.to||(o.push(0),o.push(1),o.push(2)),o.push(3)),o.sort(),o}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}clone(){return t.from(this)}toJSON(){let e=a=>a==null?null:a.toString();return{type:this.type,to:this.to,data:this.data,nonce:this.nonce,gasLimit:e(this.gasLimit),gasPrice:e(this.gasPrice),maxPriorityFeePerGas:e(this.maxPriorityFeePerGas),maxFeePerGas:e(this.maxFeePerGas),value:e(this.value),chainId:e(this.chainId),sig:this.signature?this.signature.toJSON():null,accessList:this.accessList}}[PE](){return this.toString()}toString(){let e=[],a=r=>{let o=this[r];typeof o=="string"&&(o=JSON.stringify(o)),e.push(`${r}: ${o}`)};this.type&&a("type"),a("to"),a("data"),a("nonce"),a("gasLimit"),a("value"),this.chainId!=null&&a("chainId"),this.signature&&(a("from"),e.push(`signature: ${this.signature.toString()}`));let n=this.authorizationList;if(n){let r=[];for(let o of n){let l=[];l.push(`address: ${JSON.stringify(o.address)}`),o.nonce!=null&&l.push(`nonce: ${o.nonce}`),o.chainId!=null&&l.push(`chainId: ${o.chainId}`),o.signature&&l.push(`signature: ${o.signature.toString()}`),r.push(`Authorization { ${l.join(", ")} }`)}e.push(`authorizations: [ ${r.join(", ")} ]`)}return`Transaction { ${e.join(", ")} }`}static from(e){if(e==null)return new t;if(typeof e=="string"){let n=R(e);if(n[0]>=127)return t.from(qE(n));switch(n[0]){case 1:return t.from(QE(n));case 2:return t.from(_E(n));case 3:return t.from(XE(n));case 4:return t.from(YE(n))}C(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:"from"})}let a=new t;return e.type!=null&&(a.type=e.type),e.to!=null&&(a.to=e.to),e.nonce!=null&&(a.nonce=e.nonce),e.gasLimit!=null&&(a.gasLimit=e.gasLimit),e.gasPrice!=null&&(a.gasPrice=e.gasPrice),e.maxPriorityFeePerGas!=null&&(a.maxPriorityFeePerGas=e.maxPriorityFeePerGas),e.maxFeePerGas!=null&&(a.maxFeePerGas=e.maxFeePerGas),e.maxFeePerBlobGas!=null&&(a.maxFeePerBlobGas=e.maxFeePerBlobGas),e.data!=null&&(a.data=e.data),e.value!=null&&(a.value=e.value),e.chainId!=null&&(a.chainId=e.chainId),e.signature!=null&&(a.signature=tt.from(e.signature)),e.accessList!=null&&(a.accessList=e.accessList),e.authorizationList!=null&&(a.authorizationList=e.authorizationList),e.blobVersionedHashes!=null&&(a.blobVersionedHashes=e.blobVersionedHashes),e.kzg!=null&&(a.kzg=e.kzg),e.blobWrapperVersion!=null&&(a.blobWrapperVersion=e.blobWrapperVersion),e.blobs!=null&&(a.blobs=e.blobs),e.hash!=null&&(b(a.isSigned(),"unsigned transaction cannot define \'.hash\'","tx",e),b(a.hash===e.hash,"hash mismatch","tx",e)),e.from!=null&&(b(a.isSigned(),"unsigned transaction cannot define \'.from\'","tx",e),b(a.from.toLowerCase()===(e.from||"").toLowerCase(),"from mismatch","tx",e)),a}};function Pa(t){return xe(Bt(t))}var ZE="AEkVMQnvDV0B0wKWAQYBQgDpATQAoQDcAIUApwBsAOMAcACTAEUAigBRAHkAPgA/ACwANwAoAGIAHgAvACsAJQAXAC8AHAAhACIALwAVACsAEQAiAAsAGwARABgAFwA7ACoAKwAsADQAFgAtABIAHAAhAA4AHQAdABUAFgAZAA0ADgAXABAAGQAUABIEtAYQASIUOjfDBdMAsQCuPwFnAKUBA10jAK5/Ly8vLwE/pwUJ6/0HPwbkMQVXBVgAPSs5APa2EQbIwQuUCkEDyJ4zAsUKLwKOoQKG2D+Ob4kCxcsCg/IBH98JAPKtAUECLY0KP48A4wDiChUAF9S5yAwLPZ0EG3cA/QI5GL0P6wkGKekFBIFnDRsHLQCrAGmR76WcfwBbBpMjBukAGwA7DJMAWxVbqft7uycM2yDPCLspA7EUOwD3LWujAKF9GAAXBCXXFgEdALkZzQT6CSBMNwmXCYgeG1ZZTOODQgATAAwAFQAOa1QAIQAOAEfuFdg98zlYypXmLgoQHV9NWD3sABMADAAVAA5rIFxAlwDD6wAbADkMxQAbFVup+3EB224cHQVbBeIC0J8CxLAKTBykZRRzGm1M9QC7DWcC4QALLTSJF8mRAoF7ARMbAL0NZwLhAAstAUhQJZFMCgMt+wUyCddpF60B10MASSsSdwIxFiEC6ye5N2sAOeEB9SUAxw7LtQEbY4EAsQUABQCK00kFG8MfBxcAqCfRAaErLQObAGcBChk+7Td0BBgXAKoBxwIhANMrEnM681CwBZA6dyc1SAX6JwVZBVivuAVpO11CEjpYQZd7k2ZfofgLEwPFByXxdyMEo0sCU1MCdRurJwGPo6U1WwNFFwSDYQkA0QarPy8jBykCOV0AawFhH3EAgx0ZAJUBSbcAJ2kXAa/FAzctIUNTAW9ZBmUCZQDxSRcDKQEFAElBAKsAXQBzACu1Bgfz7xmNfwAJIQApALMbRwHRAdsHCzGXeIHoAAoAEQA0AD0AODN3edPAEF8QXAFNCUxsOhULAqwPpgvlERUM0SrL09gANKkH6wNTB+sDUwNTB+sH6wNTB+sDUwNTA1MDUxwK8BrTwBBfD0gEbQWOBYsE1giDJkkRgQcoCNJUDXQeHEcDRQD8IyVJHDuTMwslQkwMTQMH/DZCbKd9OANHMatU9ZCiA8syTzlsAR5xEqAAKg9zHDW1Tn56R3GgCktPrrV/SWJOZwK+Oqg/+AohCZNvu3dOBj0QFyehEPMMLwGxATcN6UvUBO0GNwTFH3kZFQ/JlZgIoS3ZDOkm3y6dgFYj8Sp/BelL8DzZC0lRZA9VC2EJ3zpfgUoDHQEJIocK2Q01CGkQ7wrFZw3hEUEHNQPRSZYAoQb9Cw0dMRWxJgxiqAsFOXMG9xryC4smqxMlevgFzxodBkkBJRr7AMsu44WsWi1cGE9bBf8LISPDFKRQHA0hQLN4RBoXBxElpQKNQ2xKg1EyHo8h8jw5DWIuD1F4B/E8ARlLC308mkanRQoRzj6JPUQiRUwoBDF7LCsnhwnLD4EMtXxuAVUJHQmtDG0TLRETN8EINQcVKZcgJxEIHUaRYJYE85sD7xPNAwcFOwk9Bw8DsRwpEyoVJQUJgSDTAu820S6vAotWfAETBccPIR/bEExH3A7lCJcCYQN/JecAKRUdABMilwg/XwBbj9RTAS7HCMNqaCNwA2MU410RbweNDlMHoxwvFbsc3XDEXgeGBCifqwlXAXEJlQFbBN8IBTVXjJwgPWdPi1QYlyBdQTtd+AItDGEVm0S5h3QChw9nEhcBMQFvBzUM/QJzEekRZxCRCOeGADWxM/Q6IQRLIX8gDQojA0tsygsjJvUM9GUBnxJeAwg0OXfqZ6dgsiAX+QcVMsFBXCHtC45PyQyYGr0YPlQqGeAHuwPvGu8n5kFTBfsDnw86STPqBLkLZQiHCTsARQ6fEwfTGGYKbYzMAS2HAbOVA1ONfwJriwYzBwcAYweDBXXhABkCowifAAEAywNTADUCqQeZABUAgT0BOQMjKwEd4QKLA48ILccBkSsB7yUEF78MEQDzM25GAsOtAoBmZp4F2VQCigJFMQFJIQQBSkNNA6tt3QDXAEcGD9tDARGnRscW3z8B22snAMMA9wABMQcBPQHJAe9pALMBWwstCZ6vsQFJ5SUAfwARZwHTAoUA2QAxAHvtAU8ASQVV9QXPAktFAQ0tFCdTXQG3AxsBLwEJAHUGx4mhxQMbBGkHzwIQFxXdAu8qB7EDItsTyULBAr3aUQAyEgo0CrUKtB9f81wvAi1uPUwACh+kPsM/SgVNO087VDtPO1Q7TztUO087VDtPO1QDk7veu94KaF9BYecMog3QRMQ6RRPXYE1gLhPELbMUvRXKJVIZORq4JwEl4FUFDwAtz2YsCCg0cRe4ADspZIM9Y4IeLApHHONTjVT0LRcArUueM6sNqBsRRDwFQ3XpYiYWCgoeAmR9AmI+V0mrVzccAqHzAmiUAmYFAp+AOBcHAmY3AmYiBGoEewN/DwN+jjkCOXMTOX46Hx8CbBkCMjI4BgJtwwJtquuGL2NBJwFjANoA3QBGAQeUDIkA+ge+AAmxAncrAnaeOwJ5Rz8CeLYZWNdFqkbTAnw7AnrEAn0FAnzsBVUFHEf8SHlfIAAnEUlUSlcRE0rIAtD9AtDISyMDiEsDh+JEwZEuAvKdXP8DA6pLykwpIctNSE2rAos7AorUvRcDGT9jAbMCjjMCjlg8k30CjtUCjlh0UbBTMQZS0FSBApP3ApMIAOUAGFUaVatVzAIsFymRgjLdeGJFNzUCl5sC765YHaQAVSEClosClniYAKVZqFoFfUkANwKWsQKWSlxAXM0CmccCmWBcxl0DFQKclzm+OpkCnBICn5cCnrSGABkLLSYLAp3tAp6OALE5YTBh6wKezwKgagGlAp6bGwKeSqFjxGQjIScCJ6sCJnoCoPcCoEgCotkCocACpisCpcoCp/sAeQKn7mh4aK3/RWoYas0CrN8CrKoCrWMCrP4CVxkCVdgCsd3TAx9KbJMCsrkJArLkE2zcbV9tRFsDJckCtlg3O26MAylBArhaArlDEQK5JnNwMnDdAr0VArvWcJIDMg0CvoRx/gMzbQK+FnMec0sCw8cCwwBzfnRHMUF03AM8owM8lgM9uwLFeALGQwLGDIUCyGVNAshAAslLAskqAmSZAt3OeHVdeKp5IUvMAxifZv4CYfAZ75Ugewdejl63DQLPZwLPaCtHT87vD5sAwqkCz28BJeYDTg5+RwEC3CMC24YC0ksDUlgDU1sA/QNViICFO8cS6VxBghiCz4LKg4kC2sMC2dqEDIRFpzgDhqEAKwNkCoZtVfUAUQLfYQLetG9zAuIr7RAB8ywjAfSXAfLOgwLr7wLpbHUC6vUC6uAA9UMBtQLuhQLrmJamlv8C7jsDhdyYdXDccZ0C8v8AZQOOEpmPAvcPA5FqA5KDAveUAvnVAvhimhiap7czmxoDnX8C/vYBFwA1nxifrwMFiQOmZgOm1QDNwQMGZqGEogEFAwxFAQsBGwdpBl21YwEAtwRnuw2HHq8JABNxNQAfAy8SSQOFewFfIx0AjOsAHQDmnwObjQizBhufwQCnBRG76R09PhZ4BWg3PkArQiFCtF9xEV+8AJbFBTIAkEwZm7k7JmAyEbrPDi8YxhiJyfYFVwVYBVcFWAVjBVgFVwVYBVcFWAVXBVgFVwVYRhUI14VnAgICCmRe6SsEyQOxBi+7uwC7BKe7AOdAKRayBUY+aT5wQj9Ctl91N1/oAFgRM6sAjP7Ma8v8pudGej0mIwQrFic2NX5t32rB8RnCLGkBa9duMBcFXwVqycHJuAjPSVsAAAAKfF59i74AMz+BAAMW0QblrSMFAIzDCwMBDQDlZR09JB9KQrFCvEE4I18nYDYnOCMJwT0KRD9DPng+gT5wPnECiUK8SUI7X8tOT2pNCixrVC9qC24fX+AzOhsJZ5sKYiMrPB0mQqtCvCvMAcv8X8kOHy4JCAkifp3fajotShfJq8msCWXBy8wKYEFfD+UQoxEAk40dRUIlG6ltOc44CjM/Qz5wQj8cBwodTEdsWywtWuG8Egp97R0rQj8cXQhKCQ4zVENCNwQ7Q5wsCoEbLUI/G/UIUyIjGDAxAAWPYfBeCnFkyWALYC0jbkNgGTkCGx5gswYCaxBlTmBNEQFk52AVYJVgfWCzYEtgkWgWFwa1DtxVqbxaC0MWqwG7K83BAh8VABwDHgF5AmwvMJVSgAGKCrhHGgDkI3SOCsoNpk3qAZsCh5xPBUBfAPf3BwA0FlcMC6UMJB+6r0eAgQw0ABUTnyuCCHoC0gtLZREbANhOBnUECh5aADEAtritAJQnCxZvqyQ4nxkBWwGGCfwD2e0PBqoGSga5AB3LValaCbthE4kLLT8OuwG7ASICR1ooKCggHh8hLBImBiEMjQBUAm5XkEmVAW4fD3FHAdN1D85RIBmpsE3qBxEFTF8A9/cHAHoGJGwKKwulODAtx69WDQsAX7wLAGNAlQh6AOpN7yIbvwAxALa4rQCUJy07Ds4CkBh7ULtYyHRyjsOlmw/ZFUkb7AEpEFwSBh/lAccJOhCTBQ8rDDYLABEAs+AiAQIApADhAJiCCrJrOS8AFABbG8YubHYqDcEQAjskHNPhHB4LG30CewTBCqrxbAAnLQ6mLs6hHAe7CQAQOg+7GkcczaF3HgE9Kl8cLs4RGQB9q9ocAuugCAHCAULz5B9lAb4Jtwz6CDwKPgAFwAs9AksNuwi8DTwKvAk8DrsFmAEbawouzqEqD4sa4QHDAREWOwCgCzsLuxC7BBiqe9wAO2sMPAACpgm8BRvQ9QUBvgH6bsoGewG7D00RErwBAQDqAQAAdBVbBhbLFPxvF7sYOxjbL7ZtvgNIqLsAB7sALrsC6w5WAAq7BAAeuwJVICp/FTwVuwG+J+QAsloBvSjgo7vIAAFbAAG7AAJbAALjAAg7AA67AgAbu6VbDr/EAPQAaPuoOwMBu5UnSwDn3Rm7CBp7CKEFCv9wAN+7p7sau6OLeXIG+6mbgwASuwYbCwG8AACGAG27BgALu6c7ARo7ugihnMoBuwvtB8CpOwDhewG/AADlABW7AAb7AAm7AGmLABq7GLuOaRX7AA5rAC5LHgAGuwAXuwghAA1KAcIAt68mAcAAALQADpsAHBsBv/7hCqEABcYLFRXbAAebAEK7AQIAabsAC3sAHbsACLsJoQAFygBunxnVAJEIIQAFygABOwAH2wAdmwghAAaaAAl7ABsrAG0bAOa7gAAIWwAUuwkhAAbKAOOLAAk7C6EOxPtfAAc7AG6cQEgARwADOwAJrQM3AAcbABl7Abv/Aab7AAobAAo7AAn7p+sGuwAJGwADCwAQOwAIPAAUOwARawAPiwAN6wANuwAZCwYWGwAVOwBumxm7ALobLgATOwMAaSsKAOFLAAI7AARSABd7BRsABtAAGLsAC/sAX7sAa/sA5IsBuwAXdgG8AAFyC6EABUoAbXYAB/sA5XsAHGseAXsoUgA5RQD+Bw0McgAoKnABpAUIXgG8XiMMCQdvS2xfKokfPBRiLTYDoQq0AdgAFgLRA24BdnJHUhQhA08CFT4BLAYDc0a8e1J6QAApADEB+wBTCtsAe5AsASsAduUNETJGAUoAVwUAAVABB4rMAHg7BCClAFoA1hUAlWg3H4sAzWuxAM/UFgjCdXMbGFYdCdEBiJCrIlNTTUgSPMKJ+QB/HDdAKSvgEZdPAHIBKSwwKUIZDwMwVQT3xe4AS2XcAGoCcQI/EXo6x3guNdUGBQAQGx0KCAwqBB8dKU5TTgi5ugAKEs0AJgABGgCGAIkAjjUA7gC0AOAAnTwAuwCrAKYAoQDyAJ8A0wCcAOsBDAEHAMAAeQBaAMsAzQEHANcA6wCIAKIBNQDjANgA1QMBByoz1NTU1LbA3M3QzkMyFwFNAVcvRwFVAWQBYwFWAUdLQ0VoDQFOFQcIAzI2DAcAIg0kJiksODo6PT09Pj8OQB5RUVFRU1NSUylUVVdWVhxdYWFgYmEjZmhwb3JycnJycnR0dHR0dHR0dHR0dnZ3dnVbAEDsAEUAlgB0AC4AYvIAigBTAFMAMwJz6QCH//LyAGAAj+wAmwBLAF4AYPn5qgCBAIEAZQBSAK0AHgCyAH8CPAI/APgA4wD6APoA5AD7AOUA5QDkAOIAKQJ3AU0BPAE6AVABOgE6AToBNQE0ATQBNAEYAVQPACsIAABNFwoWAxUWDgCKAJIAogBLAGQYAi0AcABpAJEDEgMkKgMeQT5HKQCLAksAwwJTAqAAugKSApICkgKSApICkgKHApICkgKSApICkgKSApECkQKUApwCkwKSApICkAKQApACkAKOApECcQHQApMCmwKSApICkRZ5CwD6BQOnAl0CNhcBUBA1At4RCisTAUo3E02RAXekPAFlWQD/Az1HAQAAkykeGI9qAClgAGkALgCJA5TMi/CuhFoFuisOwhEBndV0KgsEIzFsATNabAGyAN5+gH9+gH6BgoJ+g4aEfoWIhoCHgoiCiX6Kfot+jIqNfo5+j4KQfpF+kn6TfpSDlYiWgpd+2gLabOEC2GwAgmwkbKAAg2xsBEkERgRIBEsESQRPBEwERwRNBE8ETgRKBEwETwCWZmwAowOIbAC0ZgEFbADJUWxsAM9sAgxsAPZabAD2ARkA9gD0APQA9QD0A31ebNSEI2XAAPYA9AD0APUA9BxsbACJWmwA9gCJARkA9gCJAL4A6AAIAPYAiQN9XmzUhCNlwBxsAPdabAEZAPYA9gD0APQA9QD0APcA9AD0APUA9AN9XmzUhCNlwBxsbACJWmwBGQD2AIkA9gCJAu0A9gCJAL4CNwD3AIkDfV5s1IQjZcAcbAJDATZsAkoBOWwCS8FsbAJXbGwDnwLtA58DnwOgA6ADoAOg1IQjZcAGA31ebBxsbACJWmwBGQOfAIkDnwCJAu0DnwCJAL4CNwOfAInUhCNlwAYDfV5sHGwEPmwAiQQ/AIkGjTFtIDFs1m4DKGwDrAJsbABVWv4VMgJsbACJAmwAVAEAul5sAmxebGwAiV5sAmxebD3YAEls1gJsbEbCxxP/x5BApA0KYFA89AsjTx97EHmJQPyocItC2JnNFRCEnFU6SFTDoI0PxeRNRoNRWkpzVnWW8pTagkNmgf+jGupqZ3eu50LAFnc+OzfJwdub1AdpOy76VnijWNR/CMEevikQkFyQuLuPajxWi9chqOoMJ7qpCN4sx3LJG4Myu8kD68wC6+iAwt+pU1JEeY13rpCVkXSZfinVKn4xZpxsI3Lp8bJLrJ9ujkrIalMRBAcv/GSKEtowzcEn5XmJw2BagB8V2UWJoJHZ14SXhM7p0XeGFOuw6mlvyq99WYp5XxrO6ru9nn4RHcOkJ7hx5UqWtman7yVMLzYXQefQRUdIY70RYQE8+aAzCNSGQkXiHfnHYRMi+xczKDdZLk3AV1gzxkkSHLjBwuq8shIJ+/RAbqjqQbugFhe0rqklu432EERkM5k9y1DXzds46oLqKAx6OhPT2WiqEfhaITn7OF9Y694AmKmUvbpWp0xJqDaf3jeNJXnK6NpnGcFOmbclbARC+5+5U52ufw5b0Hh+2LrrNimvZe4eYmApRsZnJE310SqB+1xB6rSJfnV1f2D0awB18Oc0sXAFqIlgHgWiaZGdvP5CJUSsCTCQUC335+iSkwPlLJJ5lwjTSn9Lw22NbK1Tu8w+bUpHtDRDPho7Gun8aw2Jzu9i+N0Ot/kPMbLAb/rUQ82kfpk85qLDkfxLl39QPDngo72GYh/Xigbpcm1pA23D2ywt3D8GgMOao040wDqkHxOEx0OhC+ZmHiIdjK7yRbfJD2ouZbAedhD3p7s8WDmCJfNforgDYPGAXSI08fTjPZ5B37lc5VXGzc1vJmibDwBNVzXuaUzg7N5H4BxqjhJ+kz9HLUJys7bpBDYAPvbut13AwJCWd059tS8YTYgC8HwrkewBfa1LSSpmMr9uR2EekTiAMH+Mx4AGzgbquccwBDlLmRhgXL/YiLPCEb6d2k5qJ6o800qddABkpqt7NG+sc2uvHZwZs57W1AHTFM1KkMShasADAh2FvzbzJOzVDMS3ZlT2BSFKdnkZFB6JyqJbhm6XANis9TrtzJdlPVp+rl8v3nIke6Jou7m2TKu53Vounupgkz2LzrQPhhatLIG7rfF/gUKWp15X3LKt+ZvuCDSqPUigF9yJntimC1HJR7Yj/dUrLAXWrT+1tnwPJJLGKAlQ5VeNDWRKCTt2vz3rJuo4+gIt75/Mkfl/gSZblZ9r/SEeeosZXneli/xNh1WVCvkRt2RnyyjtMkMqhzXh1PVOCbILqv0r7rGYm0CHIyKdhHL90cl9E1I6eEtQTCt6RXj8M0HHrHCHLVRpNM6WIbT5BCMGVnL0o5895qSRbCJz+5I8PGMhAN/Xrj4BgIdlKqlHtBHqTJwmK169toZ2IWxNzrAbIG7zh85Q/LG2A4yBcaBel52zdunokB0lv3A7kXnTI7M6ZnfZ7nwuj5lkGhqSpW+w5CI/FmRlplBEbnZy1ZxS3DL8rf1YWhO5XivWZBSRh1gFsjjyj3qRG1cm/6ors7WsEif6WRxns1MKDZa6KrbfMQ/swIb+2nb0tqxHeii6FcgVeAjE/Xwac1owx04dJKG8R5YQgHNnEfHf0qb8WOnU0eQSjazq+IK7cSuCqYzPEUB/x+QgGZqM3dBoYvNvZVOHDkbgdilWdagqO5bkybXfLpyMPuGq8mvAAEZGbR6RwXGlW9ErOWTfnjfx6dXFJqBj0OBSGFz4lWQasNOmVJeN4SFWSLfOGB/7ehV5YuoNNROHZEG9ElVuMnqbDMMuDleOt/cN/gsWxGw128mwU8/HxkOKqdTZnI7dHka67WCTf/FmBrxpNCaKJ1GxBTCSS7MNfhNj8S4Gtotg6Z3AM9cAeVROnppUMaiV5jjudLnNqoVrKO1/FijLlAc74kxydxKX1RQuMqHR63eecYr5o6MJ+B78VsLlCrpelWh6GOrCOBIoQmIcdpJL1pwE2zzZqBkecGTdK8KMOB6r1eNRURyrz6M899TZaoS/vNOxHf+5gORU+OyYIcIW6diP25GHF6u8TNjuL/GJzCnLLXd01KrsjRa51v4+O/VIAWXESJxfxWjv628J+cWUQpoD+Yytzs3jSMRJ23/XT+vUdtUMLDQq1vnIoeg/GjWh88MT6k9dRqDaQ+vodilFgvjuNw5pJpId9mfwyYeLCGb3BmHXdfQfhfPRQaupe/f8TG4Bk3eDKlYBaEK3kZYNN2Sdxz47m/vYBxvIOKtnqplB1pebzuXmAr/MuzQCknKe653dzaWQQ7MUhWYWvzIZwLe1v0rXxImLaz+AkAu+sYikhouNF3EW6w4crZ6MuUiDbIAx8XhAfegcvW6x9BPb3/sCxGWu9YyatqExB+TSm69qIkI9IwhjrcnzME+jWBx4mNQm5WwLzUjSyY4FZ0aMF5YFlXUD4hL4XfOeYv5rDe2s2D/Cn+28fZ9UCnOQvXFMnQqfc0G+ZqOWWD9l/liqUPaNQzZjxCHpUAD8Rcc90MniQ02ugHWsUupFUvhC9usY7zNPt5F2jO7qgzhafsQSd50jgLrC6Qx6bpHbXR3WNAu1BzGmwbz+ebGmwTjdy006Y6zipP7n/OJlvSmbq+SY+nefAVKK6EBMPbce5n3IdRI8+vbxCpN53rw3TvgNds1SuMiuLGxt89L71mxPDeanGhyHvOjmO56tnVpoHalQnL6TqNuqKsHjHCIKB4pCgj4WyYPvRvYvqi5EMr7lN3MotPR/KH7JUD1lZbU0QzfbrEBJnuQiVAyAC9vwXWp2TRU1/0aapyAH2cbglEHVAdl+1rb1u147uV0td1eNoQZsqHrIMIYVPXtLk2TIU3cJE08PjoYNDpfF/IcJnYQHl6nsplczX3Rgah4NbJJHl//5scUufqsSd//kbIS406ZWoMP//+jhGUswX/5nVNz/jAj9KmXPtAmMiK+khhbn1w/mELzZMT/WxcW//y/jsHaOM/61oAW/CjYhJtY622/TtMYuP7bilBvbiT3vB9n8IcFPnwM78H0KfhYDRdY5PhWJ4jWRQzB+HT5NVZV56LG82hcQms+jOTT/c9Y9sx5rPi1/wB7f/+c5UfUCKk3iwwCuywUc2MGnAwsXf1E5hoI55x1Q/Qby+sWH8NRjavZ8VaDsdi1NUVhH86BJHX1yaFt1w1OYeL5LVmdN+5Q+KuTvXEPDzUCg6xp0HhsUhTWSe7MZMM/6rsTUb0/nbUE3YQlGGt48kT1/6cnf6yHnvHtQx9EosOXN077yyEq/jE3YTiG/5SEJmXFeocJJ1EAd6vKeK6VEdJLOZ1km/EwOnZWCQpzCLKPHxrfh4yJhGq//2dos2E/3+MOcdW5EsgIdmTQUQetzRy5fQHhDBl37XbWzsqO/cASEDjyst1/8NEROqVAxWnddQV+umJ8IrKVgKvGaTc0GsQ4s8h0Osql5QKwlddPDjJhKInyWqYUKmmlIts+FIcXZ6yM6cljbsjUG2ksSOkuIw4sYHffRNgBOLApvD6XrR6Rt0rV2Uf8IpnIUVnb9Twt91QjAaD/dStSWDxg7aYY+VXIgnuowYdOkjywa2hlgrnI6PjaU3e3UjQ5Yk5mdIJGyHnv3/P+1EkMav1yFyF+FeJE/RXnWBw+Nh0aOo6TGlKX7d+dkP9+brvr79SdtXJtcD/aXBGiMNfG6/NQniQHYQlK78FEHDqOh+bDI0o+2Ub0h53EL/vlzjrBczVEZz2bOtvIL+DIzDkk9nCWt7tlqsq3l9JMtJk3r5HG2iJ9b/X11TG6wwMAjHLQ2oasaMEsydh88QPvI+hmqIHhvalpKoKOueJR0eZ9J8G2alNOIOy98jwvbc87Ewk9d+5G/tUijTmlbjFlDKXV05HalKxaRTrucc73On7yzAPS6f2v4ogiaWyWeV73dv/MsQT5HjRrsYV9dLAcI3T+zC2qEVINyNpEhoKV+xVSuWtT4AhBfpnZ7unIM+HX3msI0HiI+P+z2PFgkjGi5PqEbG/wNIWeRUjPtDEgbbubN+I4JaDLrW9borRBDob7ZFx+JdKeFVUKVeWqb/c88Ol7DhM0suLtuEd8tkDSMTD3DFx8UphPINHMHi51hAPttXL4Ektt/lKEUG/R4qZKohHjVpAcPIMiHyWr6xR8/EWnNJvBFET76yCdk5er7ADB/1bgoImhpSiZ/omZjPKPCEeZsOwvPmXL+1vlJNeGO3TzySmGA1X6e58gLrazDM71jywM1XL8zKHN6G3kB31Y8vLtP982N975SZXk2JwDvmv7AY/aDsFFk1v+nE7/hbvuOWhBH4kuemeYozPk2K22Vx/YGiDTLU7YilpOt29u3RZMBh4UJjlTP5ItxTzWv6ebL9b+GSU1Vsm2S8LMfVfJczaBSqE8J1A4YUjpsALL7++bwCPXFhaufdpDFtBlHb9makeYbqdg9ltvK/HwF/rNE6KrtWUkEcxmTB7Iyu5TiVaIgW/YxzQhpArliIMkOoK5L7ShVtF+DYqV01mk7fwop04hQRwg4KFmr5z9nYf05VVqkSe7gfnx5bxxlQ0qEV0jiwzf064qG11iEqjHcUgDWWsDs/LEGlzX31T5KVL+7D4EoKim7HBagiqRo5JI3WfDBgpKIruWz9j/J6Hp5Q/EJbMWB8NeSMuFarNw3AEYPBJtYQO/4oD/ZgPTSQ06di0EeumX5EbrdThO+fvYEVSxLtZ3AJkee0Xn0sDwNtiiZhJjJRDuG1YRKB1vOulfd9JjHeyu+UHTmrtra/pm+8Rixh4WKiLaLOCxIbZNoWRZSyyUGLPjAaAo+SQBpfO2uruWrzFxLlpvrXJNMCWtlJDKGAnlWK5xpU2tcxXbeD+sbdfwYXt/qTwDk6UqXR/aUt099DhSNl4Nk8mXwpw+b0nvjKOG6Mg1PRXjrMUMANvNgEArv8nMJs3vj1aHi8MHz/UfJWWzkcrSpZTNBhduXlGR7i+ip/THDp5R9KRNcDKECgtwgXg4EFN5HHfikP/XvsoCkHTg+NbsD8Gl6eknk4Arwn/BWGJ0hgW0/gUKrzuGZhub7igRP3abetpIm+24xEOlWl3YKpm2qTBFvX8ddDRvm1LcwnCJuEfZx12qPY9TrntMIQsv316zvpyWnyStX8VU4j6tQk+CWlLBUCJR6MdH9Cp7g2qdn2WM9qFbREmejH09dlWEPm8hPF0L7RxwRRdiCs0DP8ewk6ApoELkKU9hckSdbnXm8UHJmaNXjxv/q0fTTpu8rnl9lN0vQCpDRbCtcz12rGRFEA7Cfg7FhZn5QFkNmv1ZURKEsiZce1nS9K7HrwpC7yJV4Xt3eAVbLJfoXHrtwG60Z8gwaSnmxoL3s2ZlRqggZN/MHo1oUS4L+GwObFI596Ld4Mvi8l+cQmF1gJpkpnDio7TuO35npaMHiWzFqPSX3qNgkIPGuX0qGYnPIVsM901Yu8oZnOZOY1TbtIdFUNKNq2dP8SJ4F/VCEzIjF0/Rh+7UrZj80tC6rognVH3mqa8eCs/lcQU1Pjj98kBmAKDbZUTwosv02UunRR3n0X6c+f73mtwB7/WbQ16gO431EtwZbNG1SM4TZPBnsQSESlsfG2JLQXx5xWf4bmQ/xcVCPISAX5897JxHKLD/Xkgu57+ABR2+MMtEbX64+MNlBHpKC7sjlWVEShf5qA+dGc59LFVlZrX/Enq9z/v+wnZ1HErmxmjJjxOA+hAjVUWgtq6ygAi/8ewJDjUMFw3zhQFtbyTLDPFd21Ji5S5QPZo9nMSxdg1+DGFSN0wlWt7XeYPbHqLfliV0J1kOhQNp0VbUPy0MS2Ms66OxtSWvaULaWHnfAA+sieVVgtjDwN3nKonWapkSKRN8BKKJQpCfqo8RQI5udhfu5s5+7vwsppmAJDgz2GNA7d43VdbV2l/SrvEu4RYslmNJmfSOVbssxAhSYy6WxpIQdDB0FVBpZ6IM8yr81QN+XLZ3n/wed/R+s6LslkxKbzzst/GkRbe6rFmtvJCwr1T44ETM+IMgOnjUO0eG6a1n2w7lwM1oFBvzMUWRkNFOvKcx3oSb5XdenZ5dXsute6nkRypBiSdAtA2fxAd8UdLOZW/MB7fZoEuFheQXijdaF8kuaRZoSeWdKOkKsGYEGaXfaDKTu0WMTcLniQs7KRCz9iK3SP+Y2xIjkfVGqFLSQ6vh+A1u6FdfwXsv1VPMfi2cxmdM+/xTgMXEyo2ZGcQ2YmPsghnYdv2+z48JpGZA4tUK1p1q2VdVxyfypXEXcrxKKtmt8UdW7sHWmKMqDuBBM3J/JUQx8eUYN4pJ5oRqvdiPHU1o/WPjiKvnlCqOdyxlxF54L9PrtLD1NejZ9aZDivVr6ZfMFK1/psVygoPIAnphcJWWb9+5IKMKmgRQULsTPZi6Bw4wP32zVEoKcHpP73CkFAqS98nSaGoWDjDJiaACJn4p5o1jq9R4Q4VcibhXF//LHP0bdf63kRVZdRbbhGe7sDQcyWS5tpkfeYHnff25WK+4FpzLlAcbaKmHdIBqOw3fImx1uqQIADH0TyHzFlqTG6nMoY81svP0T6BIyELMS8tMe+E1p6TFP6sVpZa6VNaTumufD5aj9goRa9SAmdJT4HhI2r0egj8UrgFb8L59wGLnYlzkLAiUd3m/WWIIEU61kPoEjd3gIVy/fiBcgqQqHnoXpL0SqLGdGGgn7DQeVMSYWHfjno1FngIKP9cjYaTlcRP6bZunjHP13/lbVm4awti894pTf/ZNNqr4OR+tDVie/m+rC8QpVnRbsCMPukOH87B2jM4AG6pHuXl1x9SiKdhYJVOhfo/+SCaGjUW2CoogL1FFhFGN9o+acoVLl0SXs/3vrSccmZeAF3NewFuOg/P12QYKQF+SH+KYcNnsAhIAELPBUgre/KRUJEA+KPD0MHRjv+3J/j2Z23MuJmkfy7leWcMsti8wXLSHgXFJTaksx1Woi6oljwxFVIJG12SBSZLNJDbXMYPekmiXT4FclKI35BFgqnYpKfcsr+f8HUXQoHJ9UYZ4J5YMiHHyAxg6eidhodgqJ2Htf/xYEx+G0zXchuzlt8hcAl+AT8NCQ4orFc4DerabF1enA7NTLnvtZh3FUwqIOvY7Q4DYmoDHwXTSw5UNNh6r7j0B/ezMYJMDcw4+6gCTZX4YQ+7Xs8de72vsR3cmfpxIX64/6KR1p3VX4F6vfHEzxzarh8aDH4G1DFoBBM6npXFpK+Rh+WrcFclAeAxi0PoaR9CpOxxGLSdvxKVSw8oOOanG/soKImRopN38AdcUhhM2GT/PgQeSQrG12njuJJD5Z7vWfAZmFybYLdSA91kB4aoBhoj1Z//KNIVVujqaLLRwCkbyn4vh0739C9V9iSjybeOIeSOvNs7LW1a7EUtNoKAnOGML4U8KBXpfrw73WjAszJG4Qscq+Xr3kZWR4Omm0xT6qE9y6FNSpstV4onMZSqCEJ+3VX9qjvdx5QVrM0WXxmPZxejdfnihcFAjzv5PjlTl6ickDbHe6+Lch52pjOPqk+m3RZ+bh2JSMGtFBuODbMchrpRVlt16NTQ05Ps0IDtWlUmWfP2vX8M4YDynIuOZ4Ck91+591B98Gw9fw+yQogTR8CSg0zaJu+rlBo/mr3A+1NziF+kdubz+whc857AZt6DwIBIF5+5yiaaf3ByQp1Fm3sOkZDAzwsYSQTM/Kv6idkugF63FDobDdUY3huruU+sCaBuRR+HmOowvmZoBjZHNh77SXFtmY/oOUE7ifN7nBHAo83S/xvcS6H4Ci2u/9Id62Wv6Ui+zMNLAzhfkTkVcW2BwrnYvpur0ZDlzs+ZLsmGTWvd1892t78gx1YjEJusGcxphjLkV0UfAKlekfSBVWHE2ahk4AbbRmHyL7GYdtKfdlINwrcdJuf3Cee1nfUojDQn/YmItESOFhtLzrkEv4k2XpMU9oaJQ3VUC+1INh6BE68pkHameGJm4Gvdb24Q0fXWxd9Tp3A9mzFSe4qXDGGDIV4AAGV1jIDfveknH1TwWpUT6HiQxKP3AAHJNkJeRlj/mXBmS4S1j8FK6YmpK7jyyAiRbsMCCLoJcx01fvgpMvKQRxu9IOwymconQjD56g7ksOrcOeoTbius4JnGesAS1DtgdaophYsw1wGIsMS3P7K6doE3K5czznqPQLSRRF/Ylzb5NtSKsL33SgskFNCF4khn5LWaDxI23ZRi2hzqN8uW8UzZEBYy68+VtGLSymQrXGUlr2nO2BbBIT5Vh1RmGAyDXaW0FPrpx3wv2UYdFk9tSl+906bMxCuXQaKDQP/U19UEcVGK4gmksL8lAorxQSAOwpeYX9xrZsh6yoGaL/X5O3tgQC8OM+/GvxnW9XvAtu/JxAigydfSmZfqZfg1XOcHNOpLlN8j64OZ36l5qawDBJ62YaTvxeNmm5gowCdBosgcpHOgNgwA+sknN8XmsR2IYChcafl9bGNMZ/nB5guWuvEziv6QI2bP2DtyKWG/qUjZMaxy+wASkkVGtuwGtywkTYG6MYrZBo18vYcww48G/+f+eITA/qMwbLlJC0S3+/ai2pPvkOhRRVmGTuSupaxhIk0xoXLtixCxSAn4Z3OnUS3wBqVscLI4P3GP7i/6gxYsswsVmkvDXFLhO/OKcur8flegCSKiqmVpIRvCzgbjEA0mXPn+RExXY/2OE1f/BYuWpRQY8gCDpMOYBx9Gn4tL3hihSIR1ixh2PIIT7cr2gUJbfs76EKYG52Jk0UZF/PQkBxGuFCEWXnG6ue/hTIqjTRq1sotVrKrwIGHDrITyuanUzbIYdgdEeV88K1VD82TYB2B61Ft+tB1KqHPmT9+hWoaV+iF3SuvtJqvnoLaA8wxrD56AUMULEgzO9SvBcBAfqz/dzMYzwMt/YLszDbmGe1bcHHfFMcvGql9bf/tp+Hrj4q18aNnftGjmXTfws39emn7/5IBxog9MrmftAA5Oq4awenm8HimWO72dwVlHcHmutVMdrMHw+p2vzpzT+B0iIZ+IEpplwWhClcXlxhxAsF3CHRnnaUEqq3ByQ+cqhe5SvR4SFxh/LZoQwtj8QZQGT1BzY2EMpYnUcZWQEPlwFZw+7UryK9qV8KgruYsvyMoK16KI2sN4SOblrVwhyiL8+IBZ8cpUhsJQSU7TFHAi+L2F0sn0y+FtDODlnuif2Mba8QddPZYYxjTsIgkMe3M6+7kXxUfZvbCUlyq71J1eNczGk6Vqw6rSx2K3vM+DjLxDRGzWepTO2qTT/W8S7u0QXcyFUahcB4vq8xCYTpy8iswtnyz7Kx6lgTEQJ9RqkgEIN6DOUqB0uRdeYuDa7AP7Zy9z+ZlTsmVR5vtV71m3dmdtNeWghbr5PnPJtjXAzcvZjxyV96VEx/B1TA0IEQSI50ywGuIbmAYdQg/l/rxhQLX+6uOLyFsaUt6mtjpAJkLfehnB6MlOHnNOrWLvCBqVBS07jcM+4RzLEed3f3/0Xwp92U+nataNHyEgnnuYR6PXEjRLETz0xrt3UglfK7Bn4aNlXG7cZco4lMziLv5+Mh2JCww3mz69Z9ZMRR/xv5EKJ38IFxKd9dw5CgPIXja/gzAshMbF14/qBIgNkdUQeP8YE7SrICGtiTnAKTyA9cXa3OauDHxZOdTP7yuYBzD1UcHstIO16FxF1bRUAlSkszI83YufTchU8OPnnozDl9bS0y6CnnjGwgj9M61cXcZsljjhLeT/Vq+30ScN2PcT/dOoxUDqDS38+OpCCzLDdnwHQc3ECQVIkaxmdPaZTSdfp2jjGzSdNLM5yPQsgJDl+ZnhclDQi8ltUnkqWJ323IvTZPN8rn0+EshL1cx9PiaLTzUsryn9Zp2Nt/detUAh4N/2I3dlMQqjHFxSihv0uykzflq5clMy2ZBaxoEb0/QMp03IQQus3vnZd/NOmSsmgqXqKFP3ozyDgY7RQS+npabe/hNG+5sa5FtvL8v0uYuag2NewYkcol3TOTadpuncCnDgOGpmLnTQ1PEPUN2cNsrW8LYfIv+hzfb7vod+ipXHzmbgj5Fzc6RcT/5PD7VQ8nTJBNj1urkVUx9uJvTWmqY08OC80rGDLaWXv243VB16gjt4Xtwp5H2UDR0LiKW24Ed/sOO8jl1yEU/XAb3h7ScKnCFy/V3sICrkY1D0K9fSokHIL0s5/7DLShLAPXRbV7fbv4qj6OwHC9d5PlEOX3LRpQ3P7hcSAKlIKPDM83ypz56U5+rJeo0cyUtC7wltL8wqEiNSgZsDWzACc7RFoZqhlD0+sihIBQlkQTXmvUyIOZhkQX2zqME5VRC7ms1sa3CY+odMn3mMBiTvCMKnnCxg5ZPLq4GUDB4jF8Br2K4x4sxfWjGXQatJ25I1JyrIv2Z4bP1jKw5C+B2/s0v4dGUOsaS6IPIQV3ETQ+F2fSl2BPBXHzyYN8VmwWIrKeMX9pyGWuAOVXwkxJsRBaBVzLhZDP8ONGncknL5DpTxHN32GgFWMwsc0GmL0oRDmRT8u2lvjAKUIi0MmXhIHSlFeh3Qh5pP6ap4YUd6b569ZIaHgya2AyD12cPxY0In/PBjzDctTaKJCU+xc6m9RkNLDEE8guvxtJP8sl8N9bLqw0F/qejaBlcHYqw31zYpsutQp07hsP1vhGdl4hJ1wA7OCsAHnKj9879uSHILEmuZ6vI1lT4tvnWCVKZhhYrWHW9oPKPKpbOC6FTjf/OtUvwmiXr2ykvyLzHGQeyS7BenZpL3N/CaF5T7Gkml7JXN5cj0PKaDpZVImD61FuMgFHPqSHvt4Ej4KBdAfdcoO3AjQPLwwtKsgGM+ty4lNZMBEItJSRLunG5ckrM/BeoXWoPZVvEoIzLgFQYPupMwZCXis4W2SCJ2zsefZqCj+aTfSq1FYdUj2UeJALvVTf7vuuikOE1Hit3UIAGUi/sqgMum9vw218y1FlY/9XnOji9nqhGAcMYICc7BiqLZj5N+cKEuSAuiyWbMg81ZD1lHovy/we2eaCcCv4MzEW3O0mVA/t2xdA0cxTVbXmFhn+tARDpvDz5ftLr15OAAmvo2QiAky+feVO4bGibv2nlBmBzqx0lEDfEm4UnEs11pbnwZlJ/0Y73/wBPYfTNZiJKR73TzdCW1BffiJq9bLjQmaKnU0+gN8sfe25IKSUCooQwxePDrFn3a/zUgWxvPoTYVXfobY/GV2qqTkeVDV9D8657fhY0/wiaJ5NfLxhXbE/naxs34N0hd6vxNfdm1TCnozm/NKSCThchoYgMF7Z2tzXFovRfsNVkf86JjrM60r7UIuV3bsmfrMOqzjXjN6HPBG25zCJ3QLueySbj9oFvX/HxWBqh31PBPxduCVAxMqC9HK+YL3oBZqBruoh6LKvdMqoz0PYXUBrwbiioyE8Tj5ImjJmiOOWLbAZvIZ/l9rIPljx3T5glJ2ewlfuIT5GlodQsAf/IEtmYkML5SRQGxxwW+rlZkD8belJNu09Itwx9xDULTnemVDeojdbgcd2gKGM9aO00Jivtbs7ZyOSE8IPh98GfvatD8Ud5uHcZfAfMiPSlIxd4UqeSDzuNfbKDuFepkyC/s3j9fawmhY1b9NqDi0ZS5eP35l7rL2eK5QlWLlyCmxx8AFaFiTuD2pMUxZV5mBSJuJduOaq2ZrWpu28DE8jl/hisBz7bGWH6qLF0ayWNq1Sejtcs8KQrQqJk5P9QHDYHOIolgNsMDmEaWcTelghbfFCDqWrq6YLwDWy+m68ec5nShgq2fduUBpQUuKKKgnttaUX9PRfMmxqJyU7e0RLr1bev+ge1KK0bZyhHKKDE8gQX9Vf7rNHWOxBtZcxwwGusyMpH77qWZxXsQmbgIGhtiO+gSSRCyu/ek+OFsz1HMiQH0IHV7PjJi3dszYfFp8ue9h4+AfKte4MTiehPvxNcm/T1t9vsFZx8rHN5ie77r2jzZOq/Em4Q+H9sNcZakf9HnzCc1fJixppxP8FQABmVnqa6GbJhwaka7WH7Wdoz1WxOjSNV8N9sgW5S3Ppgkut+TTCkjA+AodUOk1KIR+8G8S3WrSZG4nyqfJ6FEjXl6a/LEoRMHZUqfPRWvwqrtXYy9IUsmUGzkqi76ib4NANCe5DnyOxnFRZ9d8FdBVBjra3iNuZhJuWW5Omi/hBigqDsg0mu2AhfJDXdwyMIJ33HHHPfS2JtjegRejX11m41TbNL+Qp7mR0g9CPKTj9PIjuSycGN/YPozXI4zarXuAeLv5CHKtKcJKRbd6R2oLNiEt0T8+QIVJH7zt9ncKMgd49vV2P1AyScZ9Qzbu3m3LBnuu6dw7aE0b6r4kzVkI/GUS88mA53L/rLtntkFlZXGtIoqNP2mD3eVv08AVVPT3wJn81zpbJV9SuqZ6Pd1ge0Zz2RFHeCdV5CLPftH9V5o9+VzFu4R0QeumqDwUhXn3IyYotdJnxr1l3BqWnQVAeDBEOtPyJQx1q5+mODiClXtYeBLTWtsJ42AMBcf/IFIhpfhYO08hsg0Ik+DpQFNOKReK3o3cudkxWX0soPtI5eSFOA6yNylS+IQjrQtYQ/5s4UcixJfokumBUjpH9ofSjUTwPCapGFndfqqG5IHeMMvfg+88SXm7bNyjk6pGKzL+WxDAdqKtQ72WWVbOk3I+ueGuammmB2pvFZvqIcU/lvW3n9+r2lycnQLE4OX9R1jIgW4cDjJ3v8dAa66mVcfC7ptCr5io6mCaA9qI9T9FFWqo1ZAaMxgxAu8aXqmaOYryMND2sTUfoHvxcYK7hEiJhCLYFDx3PBhE97c2a0ub1/ePJcyJOqr7UaTAPTJ+xvZtjb/40sloY1ltRnTkWILmIP2b7S3AdXCR+YiArMUHwdncpjpyDGfzqGOUoAuaamWzAMacQtb34/M32FEgR5lUEf8fRzFrZUhzQj0fR7/6gdzdnVVvcSneLmtqJ930VCCDORY8CVdQWdo/S3PNkX3pQsPVKWIYGAMrFZoq8bQ/OJBDSXP7KSBdL3QN0Zqd393p6VFc7DnlnFiN00SY5Nux7yadeIM0Upl2rVsu8/VAI",PL=new Map([[8217,"apostrophe"],[8260,"fraction slash"],[12539,"middle dot"]]),zL=4;function WE(t){let e=0;function a(){return t[e++]<<8|t[e++]}let n=a(),r=1,o=[0,1];for(let A=1;A<n;A++)o.push(r+=a());let l=a(),s=e;e+=l;let i=0,u=0;function f(){return i==0&&(u=u<<8|t[e++],i=8),u>>--i&1}let d=31,p=2**d,h=p>>>1,w=h>>1,y=p-1,v=0;for(let A=0;A<d;A++)v=v<<1|f();let m=[],g=0,x=p;for(;;){let A=Math.floor(((v-g+1)*r-1)/x),T=0,E=n;for(;E-T>1;){let k=T+E>>>1;A<o[k]?E=k:T=k}if(T==0)break;m.push(T);let I=g+Math.floor(x*o[T]/r),P=g+Math.floor(x*o[T+1]/r)-1;for(;((I^P)&h)==0;)v=v<<1&y|f(),I=I<<1&y,P=P<<1&y|1;for(;I&~P&w;)v=v&h|v<<1&y>>>1|f(),I=I<<1^h,P=(P^h)<<1|h|1;g=I,x=1+P-I}let L=n-4;return m.map(A=>{switch(A-L){case 3:return L+65792+(t[s++]<<16|t[s++]<<8|t[s++]);case 2:return L+256+(t[s++]<<8|t[s++]);case 1:return L+t[s++];default:return A-1}})}function $E(t){let e=0;return()=>t[e++]}function qL(t){return $E(WE(eT(t)))}function eT(t){let e=[];[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((r,o)=>e[r.charCodeAt(0)]=o);let a=t.length,n=new Uint8Array(6*a>>3);for(let r=0,o=0,l=0,s=0;r<a;r++)s=s<<6|e[t.charCodeAt(r)],l+=6,l>=8&&(n[o++]=s>>(l-=8));return n}function tT(t){return t&1?~t>>1:t>>1}function aT(t,e){let a=Array(t);for(let n=0,r=0;n<t;n++)a[n]=r+=tT(e());return a}function Fi(t,e=0){let a=[];for(;;){let n=t(),r=t();if(!r)break;e+=n;for(let o=0;o<r;o++)a.push(e+o);e+=r+1}return a}function GL(t){return qi(()=>{let e=Fi(t);if(e.length)return e})}function _L(t){let e=[];for(;;){let a=t();if(a==0)break;e.push(nT(a,t))}for(;;){let a=t()-1;if(a<0)break;e.push(rT(a,t))}return e.flat()}function qi(t){let e=[];for(;;){let a=t(e.length);if(!a)break;e.push(a)}return e}function VL(t,e,a){let n=Array(t).fill().map(()=>[]);for(let r=0;r<e;r++)aT(t,a).forEach((o,l)=>n[l].push(o));return n}function nT(t,e){let a=1+e(),n=e(),r=qi(e);return VL(r.length,1+t,e).flatMap((l,s)=>{let[i,...u]=l;return Array(r[s]).fill().map((f,d)=>{let p=d*n;return[i+d*a,u.map(h=>h+p)]})})}function rT(t,e){let a=1+e();return VL(a,1+t,e).map(r=>[r[0],r.slice(1)])}function oT(t){let e=[],a=Fi(t);return r(n([]),[]),e;function n(o){let l=t(),s=qi(()=>{let i=Fi(t).map(u=>a[u]);if(i.length)return n(i)});return{S:l,B:s,Q:o}}function r({S:o,B:l},s,i){if(!(o&4&&i===s[s.length-1])){o&2&&(i=s[s.length-1]),o&1&&e.push(s);for(let u of l)for(let f of u.Q)r(u,[...s,f],i)}}}function lT(t){return t.toString(16).toUpperCase().padStart(2,"0")}function QL(t){return`{${lT(t)}}`}function sT(t){let e=[];for(let a=0,n=t.length;a<n;){let r=t.codePointAt(a);a+=r<65536?1:2,e.push(r)}return e}function as(t){let a=t.length;if(a<4096)return String.fromCodePoint(...t);let n=[];for(let r=0;r<a;)n.push(String.fromCodePoint(...t.slice(r,r+=4096)));return n.join("")}function iT(t,e){let a=t.length,n=a-e.length;for(let r=0;n==0&&r<a;r++)n=t[r]-e[r];return n}var uT="AEUDWAHSCGYATwDVADIAdgAiADQAFAAtABQAIQAPACcADQASAAsAGQAJABIACQARAAUACwAFAAwABQAQAAMABwAEAAoABQAJAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACwANAA0AAwAKAAkABAAdAAYAZwDTAecDNACxCmIB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgPi89uj00MsvBXxEPAGPCDwBnQKoEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJEMAJpIBpob5AERSMAKNoAXqaQLRBMCzEiC+AZ4EWRJJFbEu7QDQLARtEbgECxDwAb/RyAk1AV4nD2cEQQKTAzsAGpobPgAahAGPCrysdy0OAKwAfFIcBAQFUmoA/PtZADkBIadVj2UMUgx5Il4ANQC9vLIBDAHUGVsQ8wCzfQIbGVcCHBZHAZ8CBAgXOhG7AqMZ4M7+1M0UAPDNAWsC+mcJDe8AAQA99zkEXLICyQozAo6lAobcP5JvjQLFzwKD9gU/OD8FEQCtEQL6bW+nAKUEvzjDHsuRyUvOFHcacUz5AqIFRSE2kzsBEQCuaQL5DQTlcgO6twSpTiUgCwIFCAUXBHQEqQV6swAVxUlmTmsCwjqsP/wKJQmXb793UgZBEBsnpRD3DDMBtQE7De1L2ATxBjsEyR99GRkPzZWcCKUt3QztJuMuoYBaI/UqgwXtS/Q83QtNUWgPWQtlCeM6Y4FOAyEBDSKLCt0NOQhtEPMKyWsN5RFFBzkD1UmaAKUHAQsRHTUVtSYQYqwLCTl3Bvsa9guPJq8TKXr8BdMaIQZNASka/wDPLueFsFoxXBxPXwYDCyUjxxSoUCANJUC3eEgaGwcVJakCkUNwSodRNh6TIfY8PQ1mLhNRfAf1PAUZTwuBPJ5Gq0UOEdI+jT1IIklMLAQ1fywvJ4sJzw+FDLl8cgFZCSEJsQxxEzERFzfFCDkHGS2XJCcVCCFGlWCaBPefA/MT0QMLBT8JQQcTA7UcLRMuFSkFDYEk1wLzNtUuswKPVoABFwXLDyUf3xBQR+AO6QibAmUDgyXrAC0VIQAXIpsIQ2MAX4/YUwUuywjHamwjdANnFOdhEXMHkQ5XB6ccMxW/HOFwyF4Lhggoo68JWwF1CZkBXwTjCAk1W4ygIEFnU4tYGJsgYUE/XfwCMQxlFZ9EvYd4AosPaxIbATUBcwc5DQECdxHtEWsQlQjrhgQ1tTP4OiUETyGDIBEKJwNPbM4LJyb5DPhpAaMSYgMMND137merYLYkF/0HGTLFQWAh8QuST80MnBrBGEJULhnkB78D8xrzJ+pBVwX/A6MDEzpNM+4EvQtpCIsJPwBJDqMXB9cYagpxjNABMYsBt5kDV5GDAm+PBjcHCwBnC4cFeeUAHQKnCKMABQDPA1cAOQKtB50AGQCFQQE9AycvASHlAo8DkwgxywGVLwHzKQQbwwwVAPc3bkoCw7ECgGpmogXdWAKOAkk1AU0lBAVOR1EDr3HhANsASwYT30cBFatKyxrjQwHfbysAxwD7AAU1BwVBAc0B820AtwFfCzEJorO1AU3pKQCDABVrAdcCiQDdADUAf/EBUwBNBVn5BdMCT0kBETEYK1dhAbsDHwEzAQ0AeQbLjaXJBx8EbQfTAhAbFeEC7y4HtQEDIt8TzULFAr3eVaFgAmSBAmJCW02vWzcgAqH3AmiYAmYJAp+EOBsLAmY7AmYmBG4EfwN/EwN+kjkGOXcXOYI6IyMCbB0CMjY4CgJtxwJtru+KM2dFKwFnAN4A4QBKBQeYDI0A/gvCAA21AncvAnaiPwJ5S0MCeLodXNtFrkbXAnw/AnrIAn0JAnzwBVkFIEgASH1jJAKBbQKAAAKABQJ/rklYSlsVF0rMAtEBAtDMSycDiE8Dh+ZExZEyAvKhXQMDA65LzkwtJQPPTUxNrwKLPwKK2MEbBx1DZwW3Ao43Ao5cQJeBAo7ZAo5ceFG0UzUKUtRUhQKT+wKTDADpABxVHlWvVdAGLBsplYYy4XhmRTs5ApefAu+yWCGoAFklApaPApZ8nACpWaxaCYFNADsClrUClk5cRFzRApnLAplkXMpdBxkCnJs5wjqdApwWAp+bAp64igAdDzEqDwKd8QKekgC1PWE0Ye8CntMCoG4BqQKenx8Cnk6lY8hkJyUrAievAiZ+AqD7AqBMAqLdAqHEAqYvAqXOAqf/AH0Cp/JofGixAANJahxq0QKs4wKsrgKtZwKtAgJXHQJV3AKx4dcDH05slwKyvQ0CsugXbOBtY21IXwMlzQK2XDs/bpADKUUCuF4CuUcVArkqd3A2cOECvRkCu9pwlgMyEQK+iHICAzNxAr4acyJzTwLDywLDBHOCdEs1RXTgAzynAzyaAz2/AsV8AsZHAsYQiQLIaVECyEQCyU8CyS4CZJ0C3dJ4eWF4rnklS9ADGKNnAgJh9BnzlSR7C16SXrsRAs9rAs9sL0tT0vMTnwDGrQLPcwEp6gNOEn5LBQLcJwLbigLSTwNSXANTXwEBA1WMgIk/AMsW7WBFghyC04LOg40C2scC2d6EEIRJpzwDhqUALwNkDoZxWfkAVQLfZQLeuHN3AuIv7RQB8zAnAfSbAfLShwLr8wLpcHkC6vkC6uQA+UcBuQLuiQLrnJaqlwMC7j8DheCYeXDgcaEC8wMAaQOOFpmTAvcTA5FuA5KHAveYAvnZAvhmmhyaq7s3mx4DnYMC/voBGwA5nxyfswMFjQOmagOm2QDRxQMGaqGIogUJAwxJAtQAPwMA4UEXUwER8wNrB5dnBQCTLSu3r73bAYmZFH8RBDkB+ykFIQ6dCZ8Akv0TtRQrxQL3LScApQC3BbmOkRc/xqdtQS4UJo0uAUMBgPwBtSYAdQMOBG0ALAIWDKEAAAoCPQJqA90DfgSRASBFBSF8CgAFAEQAEwA2EgJ3AQAF1QNr7wrFAgD3Cp8nv7G35QGRIUFCAekUfxE0wIkABAAbAFoCRQKEiwAGOlM6lI1tALg6jzrQAI04wTrcAKUA6ADLATqBOjs5/Dn5O3aJOls7nok6bzkYAVYBMwFsBS81XTWeNa01ZjV1NbY1xTWCNZE10jXhNZ41rTXuNf01sjXBNgI2ETXGNdU2FjYnNd417TYuNj02LjUtITY6Nj02PDbJNwgEkDxXNjg23TcgNw82yiA3iTcwCgSwPGc2JDcZN2w6jTchQtRDB0LgQwscDw8JmyhtKFFVBgDpfwDpsAD+mxQ91wLpNSMArQC9BbeOkRdLxptzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgELgEaJZkC7aMAoQCjBcGOmxdNxrsBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUHqSvAj5Gqwr7YrMUACT9AN3rpF27H7fsd/twPt4l+UW1yQYKBt2Cgy7qJpGiLcdE2P1cQSImUbqJ6ICH27H4knQMIRMrFkHu3sx6tC35Y+eLIh4e4CMKJ4DfyV+8mfta499RCAJ0xfeZR8PsoYOApva9pjGn4PhvyZS7/h5JLuhaucfjuU+Z584wwqNO4hWYmaBCcjgQPale1bjoHzMUbut/zTgxHxBnAyrdKpF4IRMASLBtD/jviyLeCgj8twWjAd3HchN/uqaeRYeHJgl7JEY9/cTrvtfybx/r3Y/NtxJ9dp+MTVmiS9bwBH73s8Di56/Ma+mTPMHq4T1yEG1fWcqr0u+hrGnJEvU1JJAm/maQSrKrazIyvSkDFkj8UUlfBq8baniTGPng6YZRL661rDNw4w/1g2figG0IhXnL7wosd/sVNo5dYSmMBTP5c7rYLjRdCwg8quwljOMPf63D8ICAL0r71XRiyFHdgwHbwfgnPOf4Lzjf2v+j+IiDHG2isp5yUnzSDyDRb4i/Vs0qHSHq8PiEQ/JnBP7PxnjN0j6gT4AVAeRx/1o9VnEUlUwvFrzJqHk9jxAw4sYxCnrxaeBdCFFKbnE7z+x54F5W7ZZsU6kx8Qocul6FoAHHy01FGL/nne61mn4+uYXfQ1Uccn+HMLKE+cZzT8BB1E3FRskOgJrRsq25rauLm8+uamXpkS/bTy6y1wDbCrW4eD532kTWrtNUmVVZOIn/C+/JR9KVR5iG9TY8iaT67ubm/whL1xbKZoqtY+a6fNxMJrg211bGYJDUkYMNWA0BMB++9zOm6Eik4roqs9CCEFW0lyAK0PbvlzvoxrZuY/OEhNW/l/63U15Od/RSvmDvXpGLiVmeGi5PDSH2bYz5o2g6wFDQ2FbZgYgTF8rPlvA1ifjZD3NLtFdXdpSIJvgKR7GpjJWG7GZGawPomIH8B5tUmtHH9LpM+/KQKunEPa1GiQkCXv4Cnm9DLORo2joicHdPDZ64obQrPZ5bgqckkj0G6/NEiPYBY4bCkL7W8G5YzsUb6GakFjykSPkT7JGeLeB6uJOGMm+x7N381BCDfbJFx0dtLgV9Q477BfL1fvitX5anV/oYfxeYl+eF5x5bB8+Ep/L2nsmd56aKF4aAD4GbJWsdKyBW22xEmAD3XdbtsMyAFoR5mOla0gEd9U/YVB7zvHGpHbQonay9Sv0bQ8iZ8piaXVrKc5AG1AmqqgaEvzHSP2Wux7aZTWh6quVDVU01JtMIVRdCFwlSbbqqhoFlyzsotQzRexFvZ/MqUSFu3OhRIuNBbufvBpdVgb8XdGJ48/lJPCZ7dsOujTTbKPSEvGXkOnG2Xdi8/nM3EMRqITd5QeU7iOjKqC7URJY6TnLsHij22xAHKnVRD5MDtBYnoGFqZGMDmXCW6Oj+BAWw14hESY/xLF6bLku06AHkiXTHPCFZ0f9YSqqo27eAhhS67OrA2Het4M9JM3jm/yRX6bYxnfmzYl5qQdHxN08FsNuWDrWd4vMUY2QD3hr8vS73SCTkFoXZR3xNzOQt8d/6HfjBmXqvrE6EGkLzK6YK2U2/ksU/iUH+LvVIsJI+ri2AL/klo+ShdDyfs5A83i2prkMs51IKR7ZcqjZJi5X3+bd8GlyWvtddxKEoEqSgEO7A8jIgf2nH0h8FjM7oB6yte3X5mpL0i/E4Rx0CotKnILJj/vJqo4VkPQ93jRtRVfaitQPqldl5xRYPq8387Z0DcnZvOeION0Ht1+P27kFLGQIcLBX4FG3sffccNHh5cPfzp9INoRtqVtdViJfg8RjnXiIz/MNqEN6zvzX3hMzyWC7oSoXIT14ubc0abPX8Rp9GVa5NI/8iv+6ela1oTncbdimRKnrbRffDR/X4nH+bgqAuHWl7hOaeXPWVzIeRl7ga+JzD4Sx3mlj/q6Ra/E2HhDf21eEzTLNGfCZsY+/yxZzQzIAuijG65ii4O/waAJCrEJaWd/DRAKMQ5678Dw5AT7RCKzdadIwd8LsD+DgPBASmWsUlf8R0k1w/2k4lO2Wpb4zMI6EJVJs0xk/wn8/fRUPqrDKhbjHR41SqgFMx5RGMPuduFwlu5lK89tW11sTqiX/5EfGs5nO+y9FKvgXKPOEmgE05EKNL6Sjb3xS40H3BVPhm0ESOZgAjZoymc8be0inDVo4JdJVf+NKd3tN/CaB7GShhH27qf95NoFZVX/6ZkR2lX+CgWrQ2INgkh+bbMz68+uJ3Clsh8HSMPEQtAt+BBE6fXDab7KIlsKxU1lIXW/KWVstpdPanJ0pdXpQinDyUQjtY7ZVcfiecRxRDMAUhHFU2cEaciQ+htiPMPx1kdvtWG9T44w3r037ljHBFJdYR0r55qvMRixtAEFJAqA4T1ES87FAx7UozXasytg8MftZYt0rjYgLe6EJ5aWvy2qscBSBQ7yehoJIA3wIIZ9ukfkyBb6qnue5ko8W50rpV4kXqWjI5nbGRXrNW0tBZHXlY48nSgcUXBHWT4GcgLZJoLlKJnV96kCYpq9eWHh7xJzkCAyrQuQ5AJ0qq/uZ3toJglNterev+Qm0KXxPg/+YbFRJdfhbp1wOnVOEYdVHTya6CtO0afhEaBhx3oHwCb5Kq6RwHDzFMl2vfjL8GwzcCoTj7wZe+UFnYDV2yKpPU9dba29gYBdNqJg/KXozO+CJTlKmlKhnqTf5doeS35DZFV+cYJQVjd+oVY/Gtc/6XPzUxb1gMqf6cEjNNoRC8AObrp+fx0cVtGu4ffC2TgXRC8zPl8moUHCB5HZ25d87mlsiiK0aNwBtcEQjRNBT/QrXbw/8aVXdKMHn9EqYEKEyxSGTpYQOaes1G1Qq8pDgqkZtlO2HRyCXpmeM7TSrRPkAh004BfisVpF6zP44n2Jvxz/gOVocNCyy9V6lkod28QM4pbaMvVJigD/w3BrsjSJrXlqc4ulBYOCceiBN4b/gHajYyupbhEt63a619Ay4wsL6a6w6B+A7TnoyE7BliWHJfzVxxIKM/W3M/J8Bx99Op863Q8eNuIMGRx++VbYfjm+VGYBA3Ap/KEu/wxBNBpJJncwHPG45V8Gh98ZIrGCc20MwijGowZbcS7d1nEgcOW5cddZpHL2XPAIRbColiheZzXTvBxZOY3iMSDSKDrICyJ/iQs1vdplVdH/JrLJsQ2jtTnfCrITIghq3KFX3qAgLWAIp8IffNSdTYptnbGfc8s+qcr3zyzyHp1aJg+jxTF4kD1ry5Wauv5V3xnOGwTFecNzXSLHBW20/pCQjk4uorD0plIhMSTc79+/r4RKPClRYTBYex1Ob5crtfvRQBBv6re/6FhtCqtduag67glqRA77/3ulblh9YRtMdDxkCyJDeNnAuCLPQFmdRRWJtH20Z8DstfJf+5oj5SSB64d0iF5/Ya4KfTWxfivj9Ap2/zbYaTo/1gO3tM6RYsCZharMBFr7Fm61mLSrQnEI4OF1gbVS4k/JE9UotOrnLJZuswoWodCSV8zbybkJSVIP7n8UaE9xCR39rJZmf27HOAPVOGc9pdkQUcRrI0qyVF9Z3j1RHDbxIfwbWzmPVjwIdPJvtmBYwEQIUsIW1S939hcVikK00ozPRI02cqhzVUNzpOxVdrwRPvlh1aIOf0xFEqD3YkGnCnFah/cFN3J2gB7N+bZSGawwkKFu1tpQMrp1W+27YNkyT0TpcFpTqgOqqLabrgcCUPxh97mREOGy4xItzQ9xSl6rq+8BZsHcrQFReS+QeMxJ3P6CnL9EP/eOLDjumLhvrcQrpPiknsofbzBv9gTP0lU+TIVwE6E7CcKfT36q+ZiEOHJ9ayf0dyUJLezAb2M8aNHwd0+OJmsVgTzRWA",Gi=44032,Pc=4352,zc=4449,Rc=4519,KL=19,XL=21,ns=28,Hc=XL*ns,fT=KL*Hc,cT=Gi+fT,dT=Pc+KL,pT=zc+XL,hT=Rc+ns;function Ri(t){return t>>24&255}function jL(t){return t&16777215}var mg,RL,gg,Mc;function mT(){let t=qL(uT);mg=new Map(GL(t).flatMap((e,a)=>e.map(n=>[n,a+1<<24]))),RL=new Set(Fi(t)),gg=new Map,Mc=new Map;for(let[e,a]of _L(t)){if(!RL.has(e)&&a.length==2){let[n,r]=a,o=Mc.get(n);o||(o=new Map,Mc.set(n,o)),o.set(r,e)}gg.set(e,a.reverse())}}function YL(t){return t>=Gi&&t<cT}function gT(t,e){if(t>=Pc&&t<dT&&e>=zc&&e<pT)return Gi+(t-Pc)*Hc+(e-zc)*ns;if(YL(t)&&e>Rc&&e<hT&&(t-Gi)%ns==0)return t+(e-Rc);{let a=Mc.get(t);return a&&(a=a.get(e),a)?a:-1}}function JL(t){mg||mT();let e=[],a=[],n=!1;function r(o){let l=mg.get(o);l&&(n=!0,o|=l),e.push(o)}for(let o of t)for(;;){if(o<128)e.push(o);else if(YL(o)){let l=o-Gi,s=l/Hc|0,i=l%Hc/ns|0,u=l%ns;r(Pc+s),r(zc+i),u>0&&r(Rc+u)}else{let l=gg.get(o);l?a.push(...l):r(o)}if(!a.length)break;o=a.pop()}if(n&&e.length>1){let o=Ri(e[0]);for(let l=1;l<e.length;l++){let s=Ri(e[l]);if(s==0||o<=s){o=s;continue}let i=l-1;for(;;){let u=e[i+1];if(e[i+1]=e[i],e[i]=u,!i||(o=Ri(e[--i]),o<=s))break}o=Ri(e[l])}}return e}function xT(t){let e=[],a=[],n=-1,r=0;for(let o of t){let l=Ri(o),s=jL(o);if(n==-1)l==0?n=s:e.push(s);else if(r>0&&r>=l)l==0?(e.push(n,...a),a.length=0,n=s):a.push(s),r=l;else{let i=gT(n,s);i>=0?n=i:r==0&&l==0?(e.push(n),n=s):(a.push(s),r=l)}}return n>=0&&e.push(n,...a),e}function ZL(t){return JL(t).map(jL)}function yT(t){return xT(JL(t))}var HL=45;var WL=".",$L=65039,ev=1,Fc=t=>Array.from(t);function _i(t,e){return t.P.has(e)||t.Q.has(e)}var xg=class extends Array{get is_emoji(){return!0}},yg,tv,Io,qc,av,bT,ts,hg,es,So,FL,bg;function wg(){if(yg)return;let t=qL(ZE),e=()=>Fi(t),a=()=>new Set(e()),n=(f,d)=>d.forEach(p=>f.add(p));yg=new Map(_L(t)),tv=a(),Io=e(),qc=new Set(e().map(f=>Io[f])),Io=new Set(Io),av=a(),bT=a();let r=GL(t),o=t(),l=()=>{let f=new Set;return e().forEach(d=>n(f,r[d])),n(f,e()),f};ts=qi(f=>{let d=qi(t).map(p=>p+96);if(d.length){let p=f>=o;d[0]-=32,d=as(d),p&&(d=`Restricted[${d}]`);let h=l(),w=l(),y=!t();return{N:d,P:h,Q:w,M:y,R:p}}}),hg=a(),es=new Map;let s=e().concat(Fc(hg)).sort((f,d)=>f-d);s.forEach((f,d)=>{let p=t(),h=s[d]=p?s[d-p]:{V:[],M:new Map};h.V.push(f),hg.has(f)||es.set(f,h)});for(let{V:f,M:d}of new Set(es.values())){let p=[];for(let w of f){let y=ts.filter(m=>_i(m,w)),v=p.find(({G:m})=>y.some(g=>m.has(g)));v||(v={G:new Set,V:[]},p.push(v)),v.V.push(w),n(v.G,y)}let h=p.flatMap(w=>Fc(w.G));for(let{G:w,V:y}of p){let v=new Set(h.filter(m=>!w.has(m)));for(let m of y)d.set(m,v)}}So=new Set;let i=new Set,u=f=>So.has(f)?i.add(f):So.add(f);for(let f of ts){for(let d of f.P)u(d);for(let d of f.Q)u(d)}for(let f of So)!es.has(f)&&!i.has(f)&&es.set(f,ev);n(So,ZL(So)),FL=oT(t).map(f=>xg.from(f)).sort(iT),bg=new Map;for(let f of FL){let d=[bg];for(let p of f){let h=d.map(w=>{let y=w.get(p);return y||(y=new Map,w.set(p,y)),y});p===$L?d.push(...h):d=h}for(let p of d)p.V=f}}function Lg(t){return(nv(t)?"":`${vg(Gc([t]))} `)+QL(t)}function vg(t){return`"${t}"\\u200E`}function wT(t){if(t.length>=4&&t[2]==HL&&t[3]==HL)throw new Error(`invalid label extension: "${as(t.slice(0,4))}"`)}function LT(t){for(let a=t.lastIndexOf(95);a>0;)if(t[--a]!==95)throw new Error("underscore allowed only at start")}function vT(t){let e=t[0],a=PL.get(e);if(a)throw Hi(`leading ${a}`);let n=t.length,r=-1;for(let o=1;o<n;o++){e=t[o];let l=PL.get(e);if(l){if(r==o)throw Hi(`${a} + ${l}`);r=o+1,a=l}}if(r==n)throw Hi(`trailing ${a}`)}function Gc(t,e=1/0,a=QL){let n=[];AT(t[0])&&n.push("\\u25CC"),t.length>e&&(e>>=1,t=[...t.slice(0,e),8230,...t.slice(-e)]);let r=0,o=t.length;for(let l=0;l<o;l++){let s=t[l];nv(s)&&(n.push(as(t.slice(r,l))),n.push(a(s)),r=l+1)}return n.push(as(t.slice(r,o))),n.join("")}function AT(t,e){return wg(),e?qc.has(t):Io.has(t)}function nv(t){return wg(),av.has(t)}function rv(t){return ET(CT(t,yT,OT))}function CT(t,e,a){if(!t)return[];wg();let n=0;return t.split(WL).map(r=>{let o=sT(r),l={input:o,offset:n};n+=o.length+1;try{let s=l.tokens=BT(o,e,a),i=s.length,u;if(!i)throw new Error("empty label");let f=l.output=s.flat();if(LT(f),!(l.emoji=i>1||s[0].is_emoji)&&f.every(p=>p<128))wT(f),u="ASCII";else{let p=s.flatMap(h=>h.is_emoji?[]:h);if(!p.length)u="Emoji";else{if(Io.has(f[0]))throw Hi("leading combining mark");for(let y=1;y<i;y++){let v=s[y];if(!v.is_emoji&&Io.has(v[0]))throw Hi(`emoji + combining mark: "${as(s[y-1])} + ${Gc([v[0]])}"`)}vT(f);let h=Fc(new Set(p)),[w]=IT(h);TT(w,p),ST(w,h),u=w.N}}l.type=u}catch(s){l.error=s}return l})}function ST(t,e){let a,n=[];for(let r of e){let o=es.get(r);if(o===ev)return;if(o){let l=o.M.get(r);if(a=a?a.filter(s=>l.has(s)):Fc(l),!a.length)return}else n.push(r)}if(a){for(let r of a)if(n.every(o=>_i(r,o)))throw new Error(`whole-script confusable: ${t.N}/${r.N}`)}}function IT(t){let e=ts;for(let a of t){let n=e.filter(r=>_i(r,a));if(!n.length)throw ts.some(r=>_i(r,a))?lv(e[0],a):ov(a);if(e=n,n.length==1)break}return e}function ET(t){return t.map(({input:e,error:a,output:n})=>{if(a){let r=a.message;throw new Error(t.length==1?r:`Invalid label ${vg(Gc(e,63))}: ${r}`)}return as(n)}).join(WL)}function ov(t){return new Error(`disallowed character: ${Lg(t)}`)}function lv(t,e){let a=Lg(e),n=ts.find(r=>r.P.has(e));return n&&(a=`${n.N} ${a}`),new Error(`illegal mixture: ${t.N} + ${a}`)}function Hi(t){return new Error(`illegal placement: ${t}`)}function TT(t,e){for(let a of e)if(!_i(t,a))throw lv(t,a);if(t.M){let a=ZL(e);for(let n=1,r=a.length;n<r;n++)if(qc.has(a[n])){let o=n+1;for(let l;o<r&&qc.has(l=a[o]);o++)for(let s=n;s<o;s++)if(a[s]==l)throw new Error(`duplicate non-spacing marks: ${Lg(l)}`);if(o-n>zL)throw new Error(`excessive non-spacing marks: ${vg(Gc(a.slice(n-1,o)))} (${o-n}/${zL})`);n=o}}}function BT(t,e,a){let n=[],r=[];for(t=t.slice().reverse();t.length;){let o=NT(t);if(o)r.length&&(n.push(e(r)),r=[]),n.push(a(o));else{let l=t.pop();if(So.has(l))r.push(l);else{let s=yg.get(l);if(s)r.push(...s);else if(!tv.has(l))throw ov(l)}}}return r.length&&n.push(e(r)),n}function OT(t){return t.filter(e=>e!=$L)}function NT(t,e){let a=bg,n,r=t.length;for(;r&&(a=a.get(t[--r]),!!a);){let{V:o}=a;o&&(n=o,e&&e.push(...t.slice(r).reverse()),t.length=r)}return n}var iv=new Uint8Array(32);iv.fill(0);function sv(t){return b(t.length!==0,"invalid ENS name; empty component","comp",t),t}function Ag(t){let e=Bt(_c(t)),a=[];if(t.length===0)return a;let n=0;for(let r=0;r<e.length;r++)e[r]===46&&(a.push(sv(e.slice(n,r))),n=r+1);return b(n<e.length,"invalid ENS name; empty component","name",t),a.push(sv(e.slice(n))),a}function _c(t){try{if(t.length===0)throw new Error("empty label");return rv(t)}catch(e){b(!1,`invalid ENS name (${e.message})`,"name",t)}}function Vc(t){try{return Ag(t).length!==0}catch{}return!1}function Qc(t){b(typeof t=="string","invalid ENS name; not a string","name",t),b(t.length,"invalid ENS name (empty label)","name",t);let e=iv,a=Ag(t);for(;a.length;)e=xe(ne([e,xe(a.pop())]));return N(e)}function Kc(t,e){let a=e??63;return b(a<=255,"DNS encoded label cannot exceed 255","length",a),N(ne(Ag(t).map(n=>{b(n.length<=a,`label ${JSON.stringify(t)} exceeds ${a} bytes`,"name",t);let r=new Uint8Array(n.length+1);return r.set(n,1),r[0]=r.length-1,r})))+"00"}var dv=new Uint8Array(32);dv.fill(0);var kT=BigInt(-1),pv=BigInt(0),hv=BigInt(1),DT=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");function UT(t){let e=R(t),a=e.length%32;return a?ne([e,dv.slice(a)]):N(e)}var MT=Ht(hv,32),PT=Ht(pv,32),uv={name:"string",version:"string",chainId:"uint256",verifyingContract:"address",salt:"bytes32"},Cg=["name","version","chainId","verifyingContract","salt"];function fv(t){return function(e){return b(typeof e=="string",`invalid domain value for ${JSON.stringify(t)}`,`domain.${t}`,e),e}}var zT={name:fv("name"),version:fv("version"),chainId:function(t){let e=D(t,"domain.chainId");return b(e>=0,"invalid chain ID","domain.chainId",t),Number.isSafeInteger(e)?Number(e):Tt(e)},verifyingContract:function(t){try{return V(t).toLowerCase()}catch{}b(!1,\'invalid domain value "verifyingContract"\',"domain.verifyingContract",t)},salt:function(t){let e=R(t,"domain.salt");return b(e.length===32,\'invalid domain value "salt"\',"domain.salt",t),N(e)}};function Sg(t){{let e=t.match(/^(u?)int(\\d+)$/);if(e){let a=e[1]==="",n=parseInt(e[2]);b(n%8===0&&n!==0&&n<=256&&e[2]===String(n),"invalid numeric width","type",t);let r=pr(DT,a?n-1:n),o=a?(r+hv)*kT:pv;return function(l){let s=D(l,"value");return b(s>=o&&s<=r,`value out-of-bounds for ${t}`,"value",s),Ht(a?Ei(s,256):s,32)}}}{let e=t.match(/^bytes(\\d+)$/);if(e){let a=parseInt(e[1]);return b(a!==0&&a<=32&&e[1]===String(a),"invalid bytes width","type",t),function(n){let r=R(n);return b(r.length===a,`invalid length for ${t}`,"value",n),UT(n)}}}switch(t){case"address":return function(e){return Et(V(e),32)};case"bool":return function(e){return e?MT:PT};case"bytes":return function(e){return xe(e)};case"string":return function(e){return Pa(e)}}return null}function cv(t,e){return`${t}(${e.map(({name:a,type:n})=>n+" "+a).join(",")})`}function Xc(t){let e=t.match(/^([^\\x5b]*)((\\x5b\\d*\\x5d)*)(\\x5b(\\d*)\\x5d)$/);return e?{base:e[1],index:e[2]+e[4],array:{base:e[1],prefix:e[1]+e[2],count:e[5]?parseInt(e[5]):-1}}:{base:t}}var rs=class t{primaryType;#e;get types(){return JSON.parse(this.#e)}#t;#a;constructor(e){this.#t=new Map,this.#a=new Map;let a=new Map,n=new Map,r=new Map,o={};Object.keys(e).forEach(i=>{o[i]=e[i].map(({name:u,type:f})=>{let{base:d,index:p}=Xc(f);return d==="int"&&!e.int&&(d="int256"),d==="uint"&&!e.uint&&(d="uint256"),{name:u,type:d+(p||"")}}),a.set(i,new Set),n.set(i,[]),r.set(i,new Set)}),this.#e=JSON.stringify(o);for(let i in o){let u=new Set;for(let f of o[i]){b(!u.has(f.name),`duplicate variable name ${JSON.stringify(f.name)} in ${JSON.stringify(i)}`,"types",e),u.add(f.name);let d=Xc(f.type).base;b(d!==i,`circular type reference to ${JSON.stringify(d)}`,"types",e),!Sg(d)&&(b(n.has(d),`unknown type ${JSON.stringify(d)}`,"types",e),n.get(d).push(i),a.get(i).add(d))}}let l=Array.from(n.keys()).filter(i=>n.get(i).length===0);b(l.length!==0,"missing primary type","types",e),b(l.length===1,`ambiguous primary types or unused types: ${l.map(i=>JSON.stringify(i)).join(", ")}`,"types",e),M(this,{primaryType:l[0]});function s(i,u){b(!u.has(i),`circular type reference to ${JSON.stringify(i)}`,"types",e),u.add(i);for(let f of a.get(i))if(n.has(f)){s(f,u);for(let d of u)r.get(d).add(f)}u.delete(i)}s(this.primaryType,new Set);for(let[i,u]of r){let f=Array.from(u);f.sort(),this.#t.set(i,cv(i,o[i])+f.map(d=>cv(d,o[d])).join(""))}}getEncoder(e){let a=this.#a.get(e);return a||(a=this.#n(e),this.#a.set(e,a)),a}#n(e){{let r=Sg(e);if(r)return r}let a=Xc(e).array;if(a){let r=a.prefix,o=this.getEncoder(r);return l=>{b(a.count===-1||a.count===l.length,`array length mismatch; expected length ${a.count}`,"value",l);let s=l.map(o);return this.#t.has(r)&&(s=s.map(xe)),xe(ne(s))}}let n=this.types[e];if(n){let r=Pa(this.#t.get(e));return o=>{let l=n.map(({name:s,type:i})=>{let u=this.getEncoder(i)(o[s]);return this.#t.has(i)?xe(u):u});return l.unshift(r),ne(l)}}b(!1,`unknown type: ${e}`,"type",e)}encodeType(e){let a=this.#t.get(e);return b(a,`unknown type: ${JSON.stringify(e)}`,"name",e),a}encodeData(e,a){return this.getEncoder(e)(a)}hashStruct(e,a){return xe(this.encodeData(e,a))}encode(e){return this.encodeData(this.primaryType,e)}hash(e){return this.hashStruct(this.primaryType,e)}_visit(e,a,n){if(Sg(e))return n(e,a);let r=Xc(e).array;if(r)return b(r.count===-1||r.count===a.length,`array length mismatch; expected length ${r.count}`,"value",a),a.map(l=>this._visit(r.prefix,l,n));let o=this.types[e];if(o)return o.reduce((l,{name:s,type:i})=>(l[s]=this._visit(i,a[s],n),l),{});b(!1,`unknown type: ${e}`,"type",e)}visit(e,a){return this._visit(this.primaryType,e,a)}static from(e){return new t(e)}static getPrimaryType(e){return t.from(e).primaryType}static hashStruct(e,a,n){return t.from(a).hashStruct(e,n)}static hashDomain(e){let a=[];for(let n in e){if(e[n]==null)continue;let r=uv[n];b(r,`invalid typed-data domain key: ${JSON.stringify(n)}`,"domain",e),a.push({name:n,type:r})}return a.sort((n,r)=>Cg.indexOf(n.name)-Cg.indexOf(r.name)),t.hashStruct("EIP712Domain",{EIP712Domain:a},e)}static encode(e,a,n){return ne(["0x1901",t.hashDomain(e),t.from(a).hash(n)])}static hash(e,a,n){return xe(t.encode(e,a,n))}static async resolveNames(e,a,n,r){e=Object.assign({},e);for(let s in e)e[s]==null&&delete e[s];let o={};e.verifyingContract&&!Z(e.verifyingContract,20)&&(o[e.verifyingContract]="0x");let l=t.from(a);l.visit(n,(s,i)=>(s==="address"&&!Z(i,20)&&(o[i]="0x"),i));for(let s in o)o[s]=await r(s);return e.verifyingContract&&o[e.verifyingContract]&&(e.verifyingContract=o[e.verifyingContract]),n=l.visit(n,(s,i)=>s==="address"&&o[i]?o[i]:i),{domain:e,value:n}}static getPayload(e,a,n){t.hashDomain(e);let r={},o=[];Cg.forEach(i=>{let u=e[i];u!=null&&(r[i]=zT[i](u),o.push({name:i,type:uv[i]}))});let l=t.from(a);a=l.types;let s=Object.assign({},a);return b(s.EIP712Domain==null,"types must not contain EIP712Domain type","types.EIP712Domain",a),s.EIP712Domain=o,l.encode(n),{types:s,domain:r,primaryType:l.primaryType,message:l.visit(n,(i,u)=>{if(i.match(/^bytes(\\d*)/))return N(R(u));if(i.match(/^u?int/))return D(u).toString();switch(i){case"address":return u.toLowerCase();case"bool":return!!u;case"string":return b(typeof u=="string","invalid string","value",u),u}b(!1,"unsupported type","type",i)})}}};function Ot(t){let e=new Set;return t.forEach(a=>e.add(a)),Object.freeze(e)}var RT="external public payable override",HT=Ot(RT.split(" ")),Cv="constant external internal payable private public pure view override",FT=Ot(Cv.split(" ")),Sv="constructor error event fallback function receive struct",Iv=Ot(Sv.split(" ")),Ev="calldata memory storage payable indexed",qT=Ot(Ev.split(" ")),GT="tuple returns",_T=[Sv,Ev,GT,Cv].join(" "),VT=Ot(_T.split(" ")),QT={"(":"OPEN_PAREN",")":"CLOSE_PAREN","[":"OPEN_BRACKET","]":"CLOSE_BRACKET",",":"COMMA","@":"AT"},KT=new RegExp("^(\\\\s*)"),XT=new RegExp("^([0-9]+)"),jT=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"),Tv=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"),Bv=new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$"),za=class t{#e;#t;get offset(){return this.#e}get length(){return this.#t.length-this.#e}constructor(e){this.#e=0,this.#t=e.slice()}clone(){return new t(this.#t)}reset(){this.#e=0}#a(e=0,a=0){return new t(this.#t.slice(e,a).map(n=>Object.freeze(Object.assign({},n,{match:n.match-e,linkBack:n.linkBack-e,linkNext:n.linkNext-e}))))}popKeyword(e){let a=this.peek();if(a.type!=="KEYWORD"||!e.has(a.text))throw new Error(`expected keyword ${a.text}`);return this.pop().text}popType(e){if(this.peek().type!==e){let a=this.peek();throw new Error(`expected ${e}; got ${a.type} ${JSON.stringify(a.text)}`)}return this.pop().text}popParen(){let e=this.peek();if(e.type!=="OPEN_PAREN")throw new Error("bad start");let a=this.#a(this.#e+1,e.match+1);return this.#e=e.match+1,a}popParams(){let e=this.peek();if(e.type!=="OPEN_PAREN")throw new Error("bad start");let a=[];for(;this.#e<e.match-1;){let n=this.peek().linkNext;a.push(this.#a(this.#e+1,n)),this.#e=n}return this.#e=e.match+1,a}peek(){if(this.#e>=this.#t.length)throw new Error("out-of-bounds");return this.#t[this.#e]}peekKeyword(e){let a=this.peekType("KEYWORD");return a!=null&&e.has(a)?a:null}peekType(e){if(this.length===0)return null;let a=this.peek();return a.type===e?a.text:null}pop(){let e=this.peek();return this.#e++,e}toString(){let e=[];for(let a=this.#e;a<this.#t.length;a++){let n=this.#t[a];e.push(`${n.type}:${n.text}`)}return`<TokenString ${e.join(" ")}>`}};function Ir(t){let e=[],a=l=>{let s=o<t.length?JSON.stringify(t[o]):"$EOI";throw new Error(`invalid token ${s} at ${o}: ${l}`)},n=[],r=[],o=0;for(;o<t.length;){let l=t.substring(o),s=l.match(KT);s&&(o+=s[1].length,l=t.substring(o));let i={depth:n.length,linkBack:-1,linkNext:-1,match:-1,type:"",text:"",offset:o,value:-1};e.push(i);let u=QT[l[0]]||"";if(u){if(i.type=u,i.text=l[0],o++,u==="OPEN_PAREN")n.push(e.length-1),r.push(e.length-1);else if(u=="CLOSE_PAREN")n.length===0&&a("no matching open bracket"),i.match=n.pop(),e[i.match].match=e.length-1,i.depth--,i.linkBack=r.pop(),e[i.linkBack].linkNext=e.length-1;else if(u==="COMMA")i.linkBack=r.pop(),e[i.linkBack].linkNext=e.length-1,r.push(e.length-1);else if(u==="OPEN_BRACKET")i.type="BRACKET";else if(u==="CLOSE_BRACKET"){let f=e.pop().text;if(e.length>0&&e[e.length-1].type==="NUMBER"){let d=e.pop().text;f=d+f,e[e.length-1].value=q(d)}if(e.length===0||e[e.length-1].type!=="BRACKET")throw new Error("missing opening bracket");e[e.length-1].text+=f}continue}if(s=l.match(jT),s){if(i.text=s[1],o+=i.text.length,VT.has(i.text)){i.type="KEYWORD";continue}if(i.text.match(Bv)){i.type="TYPE";continue}i.type="ID";continue}if(s=l.match(XT),s){i.text=s[1],i.type="NUMBER",o+=i.text.length;continue}throw new Error(`unexpected token ${JSON.stringify(l[0])} at position ${o}`)}return new za(e.map(l=>Object.freeze(l)))}function mv(t,e){let a=[];for(let n in e.keys())t.has(n)&&a.push(n);if(a.length>1)throw new Error(`conflicting types: ${a.join(", ")}`)}function Yc(t,e){if(e.peekKeyword(Iv)){let a=e.pop().text;if(a!==t)throw new Error(`expected ${t}, got ${a}`)}return e.popType("ID")}function Bn(t,e){let a=new Set;for(;;){let n=t.peekType("KEYWORD");if(n==null||e&&!e.has(n))break;if(t.pop(),a.has(n))throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);a.add(n)}return Object.freeze(a)}function Ov(t){let e=Bn(t,FT);return mv(e,Ot("constant payable nonpayable".split(" "))),mv(e,Ot("pure view payable nonpayable".split(" "))),e.has("view")?"view":e.has("pure")?"pure":e.has("payable")?"payable":e.has("nonpayable")?"nonpayable":e.has("constant")?"view":"nonpayable"}function Tn(t,e){return t.popParams().map(a=>at.from(a,e))}function Nv(t){if(t.peekType("AT")){if(t.pop(),t.peekType("NUMBER"))return D(t.pop().text);throw new Error("invalid gas")}return null}function Oo(t){if(t.length)throw new Error(`unexpected tokens at offset ${t.offset}: ${t.toString()}`)}var YT=new RegExp(/^(.*)\\[([0-9]*)\\]$/);function gv(t){let e=t.match(Bv);if(b(e,"invalid type","type",t),t==="uint")return"uint256";if(t==="int")return"int256";if(e[2]){let a=parseInt(e[2]);b(a!==0&&a<=32,"invalid bytes length","type",t)}else if(e[3]){let a=parseInt(e[3]);b(a!==0&&a<=256&&a%8===0,"invalid numeric width","type",t)}return t}var Pe={},Ft=Symbol.for("_ethers_internal"),xv="_ParamTypeInternal",yv="_ErrorInternal",bv="_EventInternal",wv="_ConstructorInternal",Lv="_FallbackInternal",vv="_FunctionInternal",Av="_StructInternal",at=class t{name;type;baseType;indexed;components;arrayLength;arrayChildren;constructor(e,a,n,r,o,l,s,i){if(dr(e,Pe,"ParamType"),Object.defineProperty(this,Ft,{value:xv}),l&&(l=Object.freeze(l.slice())),r==="array"){if(s==null||i==null)throw new Error("")}else if(s!=null||i!=null)throw new Error("");if(r==="tuple"){if(l==null)throw new Error("")}else if(l!=null)throw new Error("");M(this,{name:a,type:n,baseType:r,indexed:o,components:l,arrayLength:s,arrayChildren:i})}format(e){if(e==null&&(e="sighash"),e==="json"){let n=this.name||"";if(this.isArray()){let o=JSON.parse(this.arrayChildren.format("json"));return o.name=n,o.type+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`,JSON.stringify(o)}let r={type:this.baseType==="tuple"?"tuple":this.type,name:n};return typeof this.indexed=="boolean"&&(r.indexed=this.indexed),this.isTuple()&&(r.components=this.components.map(o=>JSON.parse(o.format(e)))),JSON.stringify(r)}let a="";return this.isArray()?(a+=this.arrayChildren.format(e),a+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`):this.isTuple()?a+="("+this.components.map(n=>n.format(e)).join(e==="full"?", ":",")+")":a+=this.type,e!=="sighash"&&(this.indexed===!0&&(a+=" indexed"),e==="full"&&this.name&&(a+=" "+this.name)),a}isArray(){return this.baseType==="array"}isTuple(){return this.baseType==="tuple"}isIndexable(){return this.indexed!=null}walk(e,a){if(this.isArray()){if(!Array.isArray(e))throw new Error("invalid array value");if(this.arrayLength!==-1&&e.length!==this.arrayLength)throw new Error("array is wrong length");let n=this;return e.map(r=>n.arrayChildren.walk(r,a))}if(this.isTuple()){if(!Array.isArray(e))throw new Error("invalid tuple value");if(e.length!==this.components.length)throw new Error("array is wrong length");let n=this;return e.map((r,o)=>n.components[o].walk(r,a))}return a(this.type,e)}#e(e,a,n,r){if(this.isArray()){if(!Array.isArray(a))throw new Error("invalid array value");if(this.arrayLength!==-1&&a.length!==this.arrayLength)throw new Error("array is wrong length");let l=this.arrayChildren,s=a.slice();s.forEach((i,u)=>{l.#e(e,i,n,f=>{s[u]=f})}),r(s);return}if(this.isTuple()){let l=this.components,s;if(Array.isArray(a))s=a.slice();else{if(a==null||typeof a!="object")throw new Error("invalid tuple value");s=l.map(i=>{if(!i.name)throw new Error("cannot use object value with unnamed components");if(!(i.name in a))throw new Error(`missing value for component ${i.name}`);return a[i.name]})}if(s.length!==this.components.length)throw new Error("array is wrong length");s.forEach((i,u)=>{l[u].#e(e,i,n,f=>{s[u]=f})}),r(s);return}let o=n(this.type,a);o.then?e.push((async function(){r(await o)})()):r(o)}async walkAsync(e,a){let n=[],r=[e];return this.#e(n,e,a,o=>{r[0]=o}),n.length&&await Promise.all(n),r[0]}static from(e,a){if(t.isParamType(e))return e;if(typeof e=="string")try{return t.from(Ir(e),a)}catch{b(!1,"invalid param type","obj",e)}else if(e instanceof za){let s="",i="",u=null;Bn(e,Ot(["tuple"])).has("tuple")||e.peekType("OPEN_PAREN")?(i="tuple",u=e.popParams().map(y=>t.from(y)),s=`tuple(${u.map(y=>y.format()).join(",")})`):(s=gv(e.popType("TYPE")),i=s);let f=null,d=null;for(;e.length&&e.peekType("BRACKET");){let y=e.pop();f=new t(Pe,"",s,i,null,u,d,f),d=y.value,s+=y.text,i="array",u=null}let p=null;if(Bn(e,qT).has("indexed")){if(!a)throw new Error("");p=!0}let w=e.peekType("ID")?e.pop().text:"";if(e.length)throw new Error("leftover tokens");return new t(Pe,w,s,i,p,u,d,f)}let n=e.name;b(!n||typeof n=="string"&&n.match(Tv),"invalid name","obj.name",n);let r=e.indexed;r!=null&&(b(a,"parameter cannot be indexed","obj.indexed",e.indexed),r=!!r);let o=e.type,l=o.match(YT);if(l){let s=parseInt(l[2]||"-1"),i=t.from({type:l[1],components:e.components});return new t(Pe,n||"",o,"array",r,null,s,i)}if(o==="tuple"||o.startsWith("tuple(")||o.startsWith("(")){let s=e.components!=null?e.components.map(u=>t.from(u)):null;return new t(Pe,n||"",o,"tuple",r,s,null,null)}return o=gv(e.type),new t(Pe,n||"",o,o,r,null,null,null)}static isParamType(e){return e&&e[Ft]===xv}},No=class t{type;inputs;constructor(e,a,n){dr(e,Pe,"Fragment"),n=Object.freeze(n.slice()),M(this,{type:a,inputs:n})}static from(e){if(typeof e=="string"){try{t.from(JSON.parse(e))}catch{}return t.from(Ir(e))}if(e instanceof za)switch(e.peekKeyword(Iv)){case"constructor":return To.from(e);case"error":return Aa.from(e);case"event":return Eo.from(e);case"fallback":case"receive":return jc.from(e);case"function":return Bo.from(e);case"struct":return Vi.from(e)}else if(typeof e=="object"){switch(e.type){case"constructor":return To.from(e);case"error":return Aa.from(e);case"event":return Eo.from(e);case"fallback":case"receive":return jc.from(e);case"function":return Bo.from(e);case"struct":return Vi.from(e)}C(!1,`unsupported type: ${e.type}`,"UNSUPPORTED_OPERATION",{operation:"Fragment.from"})}b(!1,"unsupported frgament object","obj",e)}static isConstructor(e){return To.isFragment(e)}static isError(e){return Aa.isFragment(e)}static isEvent(e){return Eo.isFragment(e)}static isFunction(e){return Bo.isFragment(e)}static isStruct(e){return Vi.isFragment(e)}},os=class extends No{name;constructor(e,a,n,r){super(e,a,r),b(typeof n=="string"&&n.match(Tv),"invalid identifier","name",n),r=Object.freeze(r.slice()),M(this,{name:n})}};function Qi(t,e){return"("+e.map(a=>a.format(t)).join(t==="full"?", ":",")+")"}var Aa=class t extends os{constructor(e,a,n){super(e,"error",a,n),Object.defineProperty(this,Ft,{value:yv})}get selector(){return Pa(this.format("sighash")).substring(0,10)}format(e){if(e==null&&(e="sighash"),e==="json")return JSON.stringify({type:"error",name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(e)))});let a=[];return e!=="sighash"&&a.push("error"),a.push(this.name+Qi(e,this.inputs)),a.join(" ")}static from(e){if(t.isFragment(e))return e;if(typeof e=="string")return t.from(Ir(e));if(e instanceof za){let a=Yc("error",e),n=Tn(e);return Oo(e),new t(Pe,a,n)}return new t(Pe,e.name,e.inputs?e.inputs.map(at.from):[])}static isFragment(e){return e&&e[Ft]===yv}},Eo=class t extends os{anonymous;constructor(e,a,n,r){super(e,"event",a,n),Object.defineProperty(this,Ft,{value:bv}),M(this,{anonymous:r})}get topicHash(){return Pa(this.format("sighash"))}format(e){if(e==null&&(e="sighash"),e==="json")return JSON.stringify({type:"event",anonymous:this.anonymous,name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(e)))});let a=[];return e!=="sighash"&&a.push("event"),a.push(this.name+Qi(e,this.inputs)),e!=="sighash"&&this.anonymous&&a.push("anonymous"),a.join(" ")}static getTopicHash(e,a){return a=(a||[]).map(r=>at.from(r)),new t(Pe,e,a,!1).topicHash}static from(e){if(t.isFragment(e))return e;if(typeof e=="string")try{return t.from(Ir(e))}catch{b(!1,"invalid event fragment","obj",e)}else if(e instanceof za){let a=Yc("event",e),n=Tn(e,!0),r=!!Bn(e,Ot(["anonymous"])).has("anonymous");return Oo(e),new t(Pe,a,n,r)}return new t(Pe,e.name,e.inputs?e.inputs.map(a=>at.from(a,!0)):[],!!e.anonymous)}static isFragment(e){return e&&e[Ft]===bv}},To=class t extends No{payable;gas;constructor(e,a,n,r,o){super(e,a,n),Object.defineProperty(this,Ft,{value:wv}),M(this,{payable:r,gas:o})}format(e){if(C(e!=null&&e!=="sighash","cannot format a constructor for sighash","UNSUPPORTED_OPERATION",{operation:"format(sighash)"}),e==="json")return JSON.stringify({type:"constructor",stateMutability:this.payable?"payable":"undefined",payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(e)))});let a=[`constructor${Qi(e,this.inputs)}`];return this.payable&&a.push("payable"),this.gas!=null&&a.push(`@${this.gas.toString()}`),a.join(" ")}static from(e){if(t.isFragment(e))return e;if(typeof e=="string")try{return t.from(Ir(e))}catch{b(!1,"invalid constuctor fragment","obj",e)}else if(e instanceof za){Bn(e,Ot(["constructor"]));let a=Tn(e),n=!!Bn(e,HT).has("payable"),r=Nv(e);return Oo(e),new t(Pe,"constructor",a,n,r)}return new t(Pe,"constructor",e.inputs?e.inputs.map(at.from):[],!!e.payable,e.gas!=null?e.gas:null)}static isFragment(e){return e&&e[Ft]===wv}},jc=class t extends No{payable;constructor(e,a,n){super(e,"fallback",a),Object.defineProperty(this,Ft,{value:Lv}),M(this,{payable:n})}format(e){let a=this.inputs.length===0?"receive":"fallback";if(e==="json"){let n=this.payable?"payable":"nonpayable";return JSON.stringify({type:a,stateMutability:n})}return`${a}()${this.payable?" payable":""}`}static from(e){if(t.isFragment(e))return e;if(typeof e=="string")try{return t.from(Ir(e))}catch{b(!1,"invalid fallback fragment","obj",e)}else if(e instanceof za){let a=e.toString(),n=e.peekKeyword(Ot(["fallback","receive"]));if(b(n,"type must be fallback or receive","obj",a),e.popKeyword(Ot(["fallback","receive"]))==="receive"){let s=Tn(e);return b(s.length===0,"receive cannot have arguments","obj.inputs",s),Bn(e,Ot(["payable"])),Oo(e),new t(Pe,[],!0)}let o=Tn(e);o.length?b(o.length===1&&o[0].type==="bytes","invalid fallback inputs","obj.inputs",o.map(s=>s.format("minimal")).join(", ")):o=[at.from("bytes")];let l=Ov(e);if(b(l==="nonpayable"||l==="payable","fallback cannot be constants","obj.stateMutability",l),Bn(e,Ot(["returns"])).has("returns")){let s=Tn(e);b(s.length===1&&s[0].type==="bytes","invalid fallback outputs","obj.outputs",s.map(i=>i.format("minimal")).join(", "))}return Oo(e),new t(Pe,o,l==="payable")}if(e.type==="receive")return new t(Pe,[],!0);if(e.type==="fallback"){let a=[at.from("bytes")],n=e.stateMutability==="payable";return new t(Pe,a,n)}b(!1,"invalid fallback description","obj",e)}static isFragment(e){return e&&e[Ft]===Lv}},Bo=class t extends os{constant;outputs;stateMutability;payable;gas;constructor(e,a,n,r,o,l){super(e,"function",a,r),Object.defineProperty(this,Ft,{value:vv}),o=Object.freeze(o.slice()),M(this,{constant:n==="view"||n==="pure",gas:l,outputs:o,payable:n==="payable",stateMutability:n})}get selector(){return Pa(this.format("sighash")).substring(0,10)}format(e){if(e==null&&(e="sighash"),e==="json")return JSON.stringify({type:"function",name:this.name,constant:this.constant,stateMutability:this.stateMutability!=="nonpayable"?this.stateMutability:void 0,payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(e))),outputs:this.outputs.map(n=>JSON.parse(n.format(e)))});let a=[];return e!=="sighash"&&a.push("function"),a.push(this.name+Qi(e,this.inputs)),e!=="sighash"&&(this.stateMutability!=="nonpayable"&&a.push(this.stateMutability),this.outputs&&this.outputs.length&&(a.push("returns"),a.push(Qi(e,this.outputs))),this.gas!=null&&a.push(`@${this.gas.toString()}`)),a.join(" ")}static getSelector(e,a){return a=(a||[]).map(r=>at.from(r)),new t(Pe,e,"view",a,[],null).selector}static from(e){if(t.isFragment(e))return e;if(typeof e=="string")try{return t.from(Ir(e))}catch{b(!1,"invalid function fragment","obj",e)}else if(e instanceof za){let n=Yc("function",e),r=Tn(e),o=Ov(e),l=[];Bn(e,Ot(["returns"])).has("returns")&&(l=Tn(e));let s=Nv(e);return Oo(e),new t(Pe,n,o,r,l,s)}let a=e.stateMutability;return a==null&&(a="payable",typeof e.constant=="boolean"?(a="view",e.constant||(a="payable",typeof e.payable=="boolean"&&!e.payable&&(a="nonpayable"))):typeof e.payable=="boolean"&&!e.payable&&(a="nonpayable")),new t(Pe,e.name,a,e.inputs?e.inputs.map(at.from):[],e.outputs?e.outputs.map(at.from):[],e.gas!=null?e.gas:null)}static isFragment(e){return e&&e[Ft]===vv}},Vi=class t extends os{constructor(e,a,n){super(e,"struct",a,n),Object.defineProperty(this,Ft,{value:Av})}format(){throw new Error("@TODO")}static from(e){if(typeof e=="string")try{return t.from(Ir(e))}catch{b(!1,"invalid struct fragment","obj",e)}else if(e instanceof za){let a=Yc("struct",e),n=Tn(e);return Oo(e),new t(Pe,a,n)}return new t(Pe,e.name,e.inputs?e.inputs.map(at.from):[])}static isFragment(e){return e&&e[Ft]===Av}};var Ra=new Map;Ra.set(0,"GENERIC_PANIC");Ra.set(1,"ASSERT_FALSE");Ra.set(17,"OVERFLOW");Ra.set(18,"DIVIDE_BY_ZERO");Ra.set(33,"ENUM_RANGE_ERROR");Ra.set(34,"BAD_STORAGE_DATA");Ra.set(49,"STACK_UNDERFLOW");Ra.set(50,"ARRAY_RANGE_ERROR");Ra.set(65,"OUT_OF_MEMORY");Ra.set(81,"UNINITIALIZED_FUNCTION_CALL");var JT=new RegExp(/^bytes([0-9]*)$/),ZT=new RegExp(/^(u?int)([0-9]*)$/),Ig=null,kv=1024;function WT(t,e,a,n){let r="missing revert data",o=null,l=null,s=null;if(a){r="execution reverted";let u=R(a);if(a=N(a),u.length===0)r+=" (no data present; likely require(false) occurred",o="require(false)";else if(u.length%32!==4)r+=" (could not decode reason; invalid data length)";else if(N(u.slice(0,4))==="0x08c379a0")try{o=n.decode(["string"],u.slice(4))[0],s={signature:"Error(string)",name:"Error",args:[o]},r+=`: ${JSON.stringify(o)}`}catch{r+=" (could not decode reason; invalid string data)"}else if(N(u.slice(0,4))==="0x4e487b71")try{let f=Number(n.decode(["uint256"],u.slice(4))[0]);s={signature:"Panic(uint256)",name:"Panic",args:[f]},o=`Panic due to ${Ra.get(f)||"UNKNOWN"}(${f})`,r+=`: ${o}`}catch{r+=" (could not decode panic code)"}else r+=" (unknown custom error)"}let i={to:e.to?V(e.to):null,data:e.data||"0x"};return e.from&&(i.from=V(e.from)),ue(r,"CALL_EXCEPTION",{action:t,data:a,reason:o,transaction:i,invocation:l,revert:s})}var Er=class t{#e(e){if(e.isArray())return new Cc(this.#e(e.arrayChildren),e.arrayLength,e.name);if(e.isTuple())return new vo(e.components.map(n=>this.#e(n)),e.name);switch(e.baseType){case"address":return new vc(e.name);case"bool":return new Sc(e.name);case"string":return new Oc(e.name);case"bytes":return new Ic(e.name);case"":return new Tc(e.name)}let a=e.type.match(ZT);if(a){let n=parseInt(a[2]||"256");return b(n!==0&&n<=256&&n%8===0,"invalid "+a[1]+" bit length","param",e),new Bc(n/8,a[1]==="int",e.name)}if(a=e.type.match(JT),a){let n=parseInt(a[1]);return b(n!==0&&n<=32,"invalid bytes length","param",e),new Ec(n,e.name)}b(!1,"invalid type","type",e.type)}getDefaultValue(e){let a=e.map(r=>this.#e(at.from(r)));return new vo(a,"_").defaultValue()}encode(e,a){Si(a.length,e.length,"types/values length mismatch");let n=e.map(l=>this.#e(at.from(l))),r=new vo(n,"_"),o=new mo;return r.encode(o,a),o.data}decode(e,a,n){let r=e.map(l=>this.#e(at.from(l)));return new vo(r,"_").decode(new lc(a,n,kv))}static _setDefaultMaxInflation(e){b(typeof e=="number"&&Number.isInteger(e),"invalid defaultMaxInflation factor","value",e),kv=e}static defaultAbiCoder(){return Ig==null&&(Ig=new t),Ig}static getBuiltinCallException(e,a,n){return WT(e,a,n,t.defaultAbiCoder())}};var Jc=class{fragment;name;signature;topic;args;constructor(e,a,n){let r=e.name,o=e.format();M(this,{fragment:e,name:r,signature:o,topic:a,args:n})}},Zc=class{fragment;name;args;signature;selector;value;constructor(e,a,n,r){let o=e.name,l=e.format();M(this,{fragment:e,name:o,args:n,signature:l,selector:a,value:r})}},Wc=class{fragment;name;args;signature;selector;constructor(e,a,n){let r=e.name,o=e.format();M(this,{fragment:e,name:r,args:n,signature:o,selector:a})}},Ki=class{hash;_isIndexed;static isIndexed(e){return!!(e&&e._isIndexed)}constructor(e){M(this,{hash:e,_isIndexed:!0})}},Dv={0:"generic panic",1:"assert(false)",17:"arithmetic overflow",18:"division or modulo by zero",33:"enum overflow",34:"invalid encoded storage byte array accessed",49:"out-of-bounds array access; popping on an empty array",50:"out-of-bounds access of an array or bytesN",65:"out of memory",81:"uninitialized function"},Uv={"0x08c379a0":{signature:"Error(string)",name:"Error",inputs:["string"],reason:t=>`reverted with reason string ${JSON.stringify(t)}`},"0x4e487b71":{signature:"Panic(uint256)",name:"Panic",inputs:["uint256"],reason:t=>{let e="unknown panic code";return t>=0&&t<=255&&Dv[t.toString()]&&(e=Dv[t.toString()]),`reverted with panic code 0x${t.toString(16)} (${e})`}}},ko=class t{fragments;deploy;fallback;receive;#e;#t;#a;#n;constructor(e){let a=[];typeof e=="string"?a=JSON.parse(e):a=e,this.#a=new Map,this.#e=new Map,this.#t=new Map;let n=[];for(let l of a)try{n.push(No.from(l))}catch(s){console.log(`[Warning] Invalid Fragment ${JSON.stringify(l)}:`,s.message)}M(this,{fragments:Object.freeze(n)});let r=null,o=!1;this.#n=this.getAbiCoder(),this.fragments.forEach((l,s)=>{let i;switch(l.type){case"constructor":if(this.deploy){console.log("duplicate definition - constructor");return}M(this,{deploy:l});return;case"fallback":l.inputs.length===0?o=!0:(b(!r||l.payable!==r.payable,"conflicting fallback fragments",`fragments[${s}]`,l),r=l,o=r.payable);return;case"function":i=this.#a;break;case"event":i=this.#t;break;case"error":i=this.#e;break;default:return}let u=l.format();i.has(u)||i.set(u,l)}),this.deploy||M(this,{deploy:To.from("constructor()")}),M(this,{fallback:r,receive:o})}format(e){let a=e?"minimal":"full";return this.fragments.map(r=>r.format(a))}formatJson(){let e=this.fragments.map(a=>a.format("json"));return JSON.stringify(e.map(a=>JSON.parse(a)))}getAbiCoder(){return Er.defaultAbiCoder()}#r(e,a,n){if(Z(e)){let o=e.toLowerCase();for(let l of this.#a.values())if(o===l.selector)return l;return null}if(e.indexOf("(")===-1){let o=[];for(let[l,s]of this.#a)l.split("(")[0]===e&&o.push(s);if(a){let l=a.length>0?a[a.length-1]:null,s=a.length,i=!0;Ee.isTyped(l)&&l.type==="overrides"&&(i=!1,s--);for(let u=o.length-1;u>=0;u--){let f=o[u].inputs.length;f!==s&&(!i||f!==s-1)&&o.splice(u,1)}for(let u=o.length-1;u>=0;u--){let f=o[u].inputs;for(let d=0;d<a.length;d++)if(Ee.isTyped(a[d])){if(d>=f.length){if(a[d].type==="overrides")continue;o.splice(u,1);break}if(a[d].type!==f[d].baseType){o.splice(u,1);break}}}}if(o.length===1&&a&&a.length!==o[0].inputs.length){let l=a[a.length-1];(l==null||Array.isArray(l)||typeof l!="object")&&o.splice(0,1)}if(o.length===0)return null;if(o.length>1&&n){let l=o.map(s=>JSON.stringify(s.format())).join(", ");b(!1,`ambiguous function description (i.e. matches ${l})`,"key",e)}return o[0]}let r=this.#a.get(Bo.from(e).format());return r||null}getFunctionName(e){let a=this.#r(e,null,!1);return b(a,"no matching function","key",e),a.name}hasFunction(e){return!!this.#r(e,null,!1)}getFunction(e,a){return this.#r(e,a||null,!0)}forEachFunction(e){let a=Array.from(this.#a.keys());a.sort((n,r)=>n.localeCompare(r));for(let n=0;n<a.length;n++){let r=a[n];e(this.#a.get(r),n)}}#l(e,a,n){if(Z(e)){let o=e.toLowerCase();for(let l of this.#t.values())if(o===l.topicHash)return l;return null}if(e.indexOf("(")===-1){let o=[];for(let[l,s]of this.#t)l.split("(")[0]===e&&o.push(s);if(a){for(let l=o.length-1;l>=0;l--)o[l].inputs.length<a.length&&o.splice(l,1);for(let l=o.length-1;l>=0;l--){let s=o[l].inputs;for(let i=0;i<a.length;i++)if(Ee.isTyped(a[i])&&a[i].type!==s[i].baseType){o.splice(l,1);break}}}if(o.length===0)return null;if(o.length>1&&n){let l=o.map(s=>JSON.stringify(s.format())).join(", ");b(!1,`ambiguous event description (i.e. matches ${l})`,"key",e)}return o[0]}let r=this.#t.get(Eo.from(e).format());return r||null}getEventName(e){let a=this.#l(e,null,!1);return b(a,"no matching event","key",e),a.name}hasEvent(e){return!!this.#l(e,null,!1)}getEvent(e,a){return this.#l(e,a||null,!0)}forEachEvent(e){let a=Array.from(this.#t.keys());a.sort((n,r)=>n.localeCompare(r));for(let n=0;n<a.length;n++){let r=a[n];e(this.#t.get(r),n)}}getError(e,a){if(Z(e)){let r=e.toLowerCase();if(Uv[r])return Aa.from(Uv[r].signature);for(let o of this.#e.values())if(r===o.selector)return o;return null}if(e.indexOf("(")===-1){let r=[];for(let[o,l]of this.#e)o.split("(")[0]===e&&r.push(l);if(r.length===0)return e==="Error"?Aa.from("error Error(string)"):e==="Panic"?Aa.from("error Panic(uint256)"):null;if(r.length>1){let o=r.map(l=>JSON.stringify(l.format())).join(", ");b(!1,`ambiguous error description (i.e. ${o})`,"name",e)}return r[0]}if(e=Aa.from(e).format(),e==="Error(string)")return Aa.from("error Error(string)");if(e==="Panic(uint256)")return Aa.from("error Panic(uint256)");let n=this.#e.get(e);return n||null}forEachError(e){let a=Array.from(this.#e.keys());a.sort((n,r)=>n.localeCompare(r));for(let n=0;n<a.length;n++){let r=a[n];e(this.#e.get(r),n)}}_decodeParams(e,a){return this.#n.decode(e,a)}_encodeParams(e,a){return this.#n.encode(e,a)}encodeDeploy(e){return this._encodeParams(this.deploy.inputs,e||[])}decodeErrorResult(e,a){if(typeof e=="string"){let n=this.getError(e);b(n,"unknown error","fragment",e),e=n}return b(Ie(a,0,4)===e.selector,`data signature does not match error ${e.name}.`,"data",a),this._decodeParams(e.inputs,Ie(a,4))}encodeErrorResult(e,a){if(typeof e=="string"){let n=this.getError(e);b(n,"unknown error","fragment",e),e=n}return ne([e.selector,this._encodeParams(e.inputs,a||[])])}decodeFunctionData(e,a){if(typeof e=="string"){let n=this.getFunction(e);b(n,"unknown function","fragment",e),e=n}return b(Ie(a,0,4)===e.selector,`data signature does not match function ${e.name}.`,"data",a),this._decodeParams(e.inputs,Ie(a,4))}encodeFunctionData(e,a){if(typeof e=="string"){let n=this.getFunction(e);b(n,"unknown function","fragment",e),e=n}return ne([e.selector,this._encodeParams(e.inputs,a||[])])}decodeFunctionResult(e,a){if(typeof e=="string"){let o=this.getFunction(e);b(o,"unknown function","fragment",e),e=o}let n="invalid length for result data",r=_e(a);if(r.length%32===0)try{return this.#n.decode(e.outputs,r)}catch{n="could not decode result data"}C(!1,n,"BAD_DATA",{value:N(r),info:{method:e.name,signature:e.format()}})}makeError(e,a){let n=R(e,"data"),r=Er.getBuiltinCallException("call",a,n);if(r.message.startsWith("execution reverted (unknown custom error)")){let s=N(n.slice(0,4)),i=this.getError(s);if(i)try{let u=this.#n.decode(i.inputs,n.slice(4));r.revert={name:i.name,signature:i.format(),args:u},r.reason=r.revert.signature,r.message=`execution reverted: ${r.reason}`}catch{r.message="execution reverted (coult not decode custom error)"}}let l=this.parseTransaction(a);return l&&(r.invocation={method:l.name,signature:l.signature,args:l.args}),r}encodeFunctionResult(e,a){if(typeof e=="string"){let n=this.getFunction(e);b(n,"unknown function","fragment",e),e=n}return N(this.#n.encode(e.outputs,a||[]))}encodeFilterTopics(e,a){if(typeof e=="string"){let o=this.getEvent(e);b(o,"unknown event","eventFragment",e),e=o}C(a.length<=e.inputs.length,`too many arguments for ${e.format()}`,"UNEXPECTED_ARGUMENT",{count:a.length,expectedCount:e.inputs.length});let n=[];e.anonymous||n.push(e.topicHash);let r=(o,l)=>o.type==="string"?Pa(l):o.type==="bytes"?xe(N(l)):(o.type==="bool"&&typeof l=="boolean"?l=l?"0x01":"0x00":o.type.match(/^u?int/)?l=Ht(l):o.type.match(/^bytes/)?l=Nm(l,32):o.type==="address"&&this.#n.encode(["address"],[l]),Et(N(l),32));for(a.forEach((o,l)=>{let s=e.inputs[l];if(!s.indexed){b(o==null,"cannot filter non-indexed parameters; must be null","contract."+s.name,o);return}o==null?n.push(null):s.baseType==="array"||s.baseType==="tuple"?b(!1,"filtering with tuples or arrays not supported","contract."+s.name,o):Array.isArray(o)?n.push(o.map(i=>r(s,i))):n.push(r(s,o))});n.length&&n[n.length-1]===null;)n.pop();return n}encodeEventLog(e,a){if(typeof e=="string"){let l=this.getEvent(e);b(l,"unknown event","eventFragment",e),e=l}let n=[],r=[],o=[];return e.anonymous||n.push(e.topicHash),b(a.length===e.inputs.length,"event arguments/values mismatch","values",a),e.inputs.forEach((l,s)=>{let i=a[s];if(l.indexed)if(l.type==="string")n.push(Pa(i));else if(l.type==="bytes")n.push(xe(i));else{if(l.baseType==="tuple"||l.baseType==="array")throw new Error("not implemented");n.push(this.#n.encode([l.type],[i]))}else r.push(l),o.push(i)}),{data:this.#n.encode(r,o),topics:n}}decodeEventLog(e,a,n){if(typeof e=="string"){let h=this.getEvent(e);b(h,"unknown event","eventFragment",e),e=h}if(n!=null&&!e.anonymous){let h=e.topicHash;b(Z(n[0],32)&&n[0].toLowerCase()===h,"fragment/topic mismatch","topics[0]",n[0]),n=n.slice(1)}let r=[],o=[],l=[];e.inputs.forEach((h,w)=>{h.indexed?h.type==="string"||h.type==="bytes"||h.baseType==="tuple"||h.baseType==="array"?(r.push(at.from({type:"bytes32",name:h.name})),l.push(!0)):(r.push(h),l.push(!1)):(o.push(h),l.push(!1))});let s=n!=null?this.#n.decode(r,ne(n)):null,i=this.#n.decode(o,a,!0),u=[],f=[],d=0,p=0;return e.inputs.forEach((h,w)=>{let y=null;if(h.indexed)if(s==null)y=new Ki(null);else if(l[w])y=new Ki(s[p++]);else try{y=s[p++]}catch(v){y=v}else try{y=i[d++]}catch(v){y=v}u.push(y),f.push(h.name||null)}),An.fromItems(u,f)}parseTransaction(e){let a=R(e.data,"tx.data"),n=D(e.value!=null?e.value:0,"tx.value"),r=this.getFunction(N(a.slice(0,4)));if(!r)return null;let o=this.#n.decode(r.inputs,a.slice(4));return new Zc(r,r.selector,o,n)}parseCallResult(e){throw new Error("@TODO")}parseLog(e){let a=this.getEvent(e.topics[0]);return!a||a.anonymous?null:new Jc(a,a.topicHash,this.decodeEventLog(a,e.data,e.topics))}parseError(e){let a=N(e),n=this.getError(Ie(a,0,4));if(!n)return null;let r=this.#n.decode(n.inputs,Ie(a,4));return new Wc(n,n.selector,r)}static from(e){return e instanceof t?e:typeof e=="string"?new t(JSON.parse(e)):typeof e.formatJson=="function"?new t(e.formatJson()):typeof e.format=="function"?new t(e.format("json")):new t(e)}};var Mv=BigInt(0);function ls(t){return t??null}function Qe(t){return t==null?null:t.toString()}var ss=class{gasPrice;maxFeePerGas;maxPriorityFeePerGas;constructor(e,a,n){M(this,{gasPrice:ls(e),maxFeePerGas:ls(a),maxPriorityFeePerGas:ls(n)})}toJSON(){let{gasPrice:e,maxFeePerGas:a,maxPriorityFeePerGas:n}=this;return{_type:"FeeData",gasPrice:Qe(e),maxFeePerGas:Qe(a),maxPriorityFeePerGas:Qe(n)}}};function Br(t){let e={};t.to&&(e.to=t.to),t.from&&(e.from=t.from),t.data&&(e.data=N(t.data));let a="chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);for(let r of a)!(r in t)||t[r]==null||(e[r]=D(t[r],`request.${r}`));let n="type,nonce".split(/,/);for(let r of n)!(r in t)||t[r]==null||(e[r]=q(t[r],`request.${r}`));return t.accessList&&(e.accessList=ra(t.accessList)),t.authorizationList&&(e.authorizationList=t.authorizationList.slice()),"blockTag"in t&&(e.blockTag=t.blockTag),"enableCcipRead"in t&&(e.enableCcipRead=!!t.enableCcipRead),"customData"in t&&(e.customData=t.customData),"blobVersionedHashes"in t&&t.blobVersionedHashes&&(e.blobVersionedHashes=t.blobVersionedHashes.slice()),"kzg"in t&&(e.kzg=t.kzg),"blobWrapperVersion"in t&&(e.blobWrapperVersion=t.blobWrapperVersion),"blobs"in t&&t.blobs&&(e.blobs=t.blobs.map(r=>fo(r)?N(r):Object.assign({},r))),e}var Xi=class{provider;number;hash;timestamp;parentHash;parentBeaconBlockRoot;nonce;difficulty;gasLimit;gasUsed;stateRoot;receiptsRoot;transactionsRoot;blobGasUsed;excessBlobGas;miner;prevRandao;extraData;baseFeePerGas;#e;constructor(e,a){this.#e=e.transactions.map(n=>typeof n!="string"?new Tr(n,a):n),M(this,{provider:a,hash:ls(e.hash),number:e.number,timestamp:e.timestamp,parentHash:e.parentHash,parentBeaconBlockRoot:e.parentBeaconBlockRoot,nonce:e.nonce,difficulty:e.difficulty,gasLimit:e.gasLimit,gasUsed:e.gasUsed,blobGasUsed:e.blobGasUsed,excessBlobGas:e.excessBlobGas,miner:e.miner,prevRandao:ls(e.prevRandao),extraData:e.extraData,baseFeePerGas:ls(e.baseFeePerGas),stateRoot:e.stateRoot,receiptsRoot:e.receiptsRoot,transactionsRoot:e.transactionsRoot})}get transactions(){return this.#e.map(e=>typeof e=="string"?e:e.hash)}get prefetchedTransactions(){let e=this.#e.slice();return e.length===0?[]:(C(typeof e[0]=="object","transactions were not prefetched with block request","UNSUPPORTED_OPERATION",{operation:"transactionResponses()"}),e)}toJSON(){let{baseFeePerGas:e,difficulty:a,extraData:n,gasLimit:r,gasUsed:o,hash:l,miner:s,prevRandao:i,nonce:u,number:f,parentHash:d,parentBeaconBlockRoot:p,stateRoot:h,receiptsRoot:w,transactionsRoot:y,timestamp:v,transactions:m}=this;return{_type:"Block",baseFeePerGas:Qe(e),difficulty:Qe(a),extraData:n,gasLimit:Qe(r),gasUsed:Qe(o),blobGasUsed:Qe(this.blobGasUsed),excessBlobGas:Qe(this.excessBlobGas),hash:l,miner:s,prevRandao:i,nonce:u,number:f,parentHash:d,timestamp:v,parentBeaconBlockRoot:p,stateRoot:h,receiptsRoot:w,transactionsRoot:y,transactions:m}}[Symbol.iterator](){let e=0,a=this.transactions;return{next:()=>e<this.length?{value:a[e++],done:!1}:{value:void 0,done:!0}}}get length(){return this.#e.length}get date(){return this.timestamp==null?null:new Date(this.timestamp*1e3)}async getTransaction(e){let a;if(typeof e=="number")a=this.#e[e];else{let n=e.toLowerCase();for(let r of this.#e)if(typeof r=="string"){if(r!==n)continue;a=r;break}else{if(r.hash!==n)continue;a=r;break}}if(a==null)throw new Error("no such tx");return typeof a=="string"?await this.provider.getTransaction(a):a}getPrefetchedTransaction(e){let a=this.prefetchedTransactions;if(typeof e=="number")return a[e];e=e.toLowerCase();for(let n of a)if(n.hash===e)return n;b(!1,"no matching transaction","indexOrHash",e)}isMined(){return!!this.hash}isLondon(){return!!this.baseFeePerGas}orphanedEvent(){if(!this.isMined())throw new Error("");return eB(this)}},Ha=class{provider;transactionHash;blockHash;blockNumber;removed;address;data;topics;index;transactionIndex;constructor(e,a){this.provider=a;let n=Object.freeze(e.topics.slice());M(this,{transactionHash:e.transactionHash,blockHash:e.blockHash,blockNumber:e.blockNumber,removed:e.removed,address:e.address,data:e.data,topics:n,index:e.index,transactionIndex:e.transactionIndex})}toJSON(){let{address:e,blockHash:a,blockNumber:n,data:r,index:o,removed:l,topics:s,transactionHash:i,transactionIndex:u}=this;return{_type:"log",address:e,blockHash:a,blockNumber:n,data:r,index:o,removed:l,topics:s,transactionHash:i,transactionIndex:u}}async getBlock(){let e=await this.provider.getBlock(this.blockHash);return C(!!e,"failed to find transaction","UNKNOWN_ERROR",{}),e}async getTransaction(){let e=await this.provider.getTransaction(this.transactionHash);return C(!!e,"failed to find transaction","UNKNOWN_ERROR",{}),e}async getTransactionReceipt(){let e=await this.provider.getTransactionReceipt(this.transactionHash);return C(!!e,"failed to find transaction receipt","UNKNOWN_ERROR",{}),e}removedEvent(){return tB(this)}},Do=class{provider;to;from;contractAddress;hash;index;blockHash;blockNumber;logsBloom;gasUsed;blobGasUsed;cumulativeGasUsed;gasPrice;blobGasPrice;type;status;root;#e;constructor(e,a){this.#e=Object.freeze(e.logs.map(r=>new Ha(r,a)));let n=Mv;e.effectiveGasPrice!=null?n=e.effectiveGasPrice:e.gasPrice!=null&&(n=e.gasPrice),M(this,{provider:a,to:e.to,from:e.from,contractAddress:e.contractAddress,hash:e.hash,index:e.index,blockHash:e.blockHash,blockNumber:e.blockNumber,logsBloom:e.logsBloom,gasUsed:e.gasUsed,cumulativeGasUsed:e.cumulativeGasUsed,blobGasUsed:e.blobGasUsed,gasPrice:n,blobGasPrice:e.blobGasPrice,type:e.type,status:e.status,root:e.root})}get logs(){return this.#e}toJSON(){let{to:e,from:a,contractAddress:n,hash:r,index:o,blockHash:l,blockNumber:s,logsBloom:i,logs:u,status:f,root:d}=this;return{_type:"TransactionReceipt",blockHash:l,blockNumber:s,contractAddress:n,cumulativeGasUsed:Qe(this.cumulativeGasUsed),from:a,gasPrice:Qe(this.gasPrice),blobGasUsed:Qe(this.blobGasUsed),blobGasPrice:Qe(this.blobGasPrice),gasUsed:Qe(this.gasUsed),hash:r,index:o,logs:u,logsBloom:i,root:d,status:f,to:e}}get length(){return this.logs.length}[Symbol.iterator](){let e=0;return{next:()=>e<this.length?{value:this.logs[e++],done:!1}:{value:void 0,done:!0}}}get fee(){return this.gasUsed*this.gasPrice}async getBlock(){let e=await this.provider.getBlock(this.blockHash);if(e==null)throw new Error("TODO");return e}async getTransaction(){let e=await this.provider.getTransaction(this.hash);if(e==null)throw new Error("TODO");return e}async getResult(){return await this.provider.getTransactionResult(this.hash)}async confirmations(){return await this.provider.getBlockNumber()-this.blockNumber+1}removedEvent(){return zv(this)}reorderedEvent(e){return C(!e||e.isMined(),"unmined \'other\' transction cannot be orphaned","UNSUPPORTED_OPERATION",{operation:"reorderedEvent(other)"}),Pv(this,e)}},Tr=class t{provider;blockNumber;blockHash;index;hash;type;to;from;nonce;gasLimit;gasPrice;maxPriorityFeePerGas;maxFeePerGas;maxFeePerBlobGas;data;value;chainId;signature;accessList;blobVersionedHashes;authorizationList;#e;constructor(e,a){this.provider=a,this.blockNumber=e.blockNumber!=null?e.blockNumber:null,this.blockHash=e.blockHash!=null?e.blockHash:null,this.hash=e.hash,this.index=e.index,this.type=e.type,this.from=e.from,this.to=e.to||null,this.gasLimit=e.gasLimit,this.nonce=e.nonce,this.data=e.data,this.value=e.value,this.gasPrice=e.gasPrice,this.maxPriorityFeePerGas=e.maxPriorityFeePerGas!=null?e.maxPriorityFeePerGas:null,this.maxFeePerGas=e.maxFeePerGas!=null?e.maxFeePerGas:null,this.maxFeePerBlobGas=e.maxFeePerBlobGas!=null?e.maxFeePerBlobGas:null,this.chainId=e.chainId,this.signature=e.signature,this.accessList=e.accessList!=null?e.accessList:null,this.blobVersionedHashes=e.blobVersionedHashes!=null?e.blobVersionedHashes:null,this.authorizationList=e.authorizationList!=null?e.authorizationList:null,this.#e=-1}toJSON(){let{blockNumber:e,blockHash:a,index:n,hash:r,type:o,to:l,from:s,nonce:i,data:u,signature:f,accessList:d,blobVersionedHashes:p}=this;return{_type:"TransactionResponse",accessList:d,blockNumber:e,blockHash:a,blobVersionedHashes:p,chainId:Qe(this.chainId),data:u,from:s,gasLimit:Qe(this.gasLimit),gasPrice:Qe(this.gasPrice),hash:r,maxFeePerGas:Qe(this.maxFeePerGas),maxPriorityFeePerGas:Qe(this.maxPriorityFeePerGas),maxFeePerBlobGas:Qe(this.maxFeePerBlobGas),nonce:i,signature:f,to:l,index:n,type:o,value:Qe(this.value)}}async getBlock(){let e=this.blockNumber;if(e==null){let n=await this.getTransaction();n&&(e=n.blockNumber)}if(e==null)return null;let a=this.provider.getBlock(e);if(a==null)throw new Error("TODO");return a}async getTransaction(){return this.provider.getTransaction(this.hash)}async confirmations(){if(this.blockNumber==null){let{tx:a,blockNumber:n}=await Ge({tx:this.getTransaction(),blockNumber:this.provider.getBlockNumber()});return a==null||a.blockNumber==null?0:n-a.blockNumber+1}return await this.provider.getBlockNumber()-this.blockNumber+1}async wait(e,a){let n=e??1,r=a??0,o=this.#e,l=-1,s=o===-1,i=async()=>{if(s)return null;let{blockNumber:p,nonce:h}=await Ge({blockNumber:this.provider.getBlockNumber(),nonce:this.provider.getTransactionCount(this.from)});if(h<this.nonce){o=p;return}if(s)return null;let w=await this.getTransaction();if(!(w&&w.blockNumber!=null))for(l===-1&&(l=o-3,l<this.#e&&(l=this.#e));l<=p;){if(s)return null;let y=await this.provider.getBlock(l,!0);if(y==null)return;for(let v of y)if(v===this.hash)return;for(let v=0;v<y.length;v++){let m=await y.getTransaction(v);if(m.from===this.from&&m.nonce===this.nonce){if(s)return null;let g=await this.provider.getTransactionReceipt(m.hash);if(g==null||p-g.blockNumber+1<n)return;let x="replaced";m.data===this.data&&m.to===this.to&&m.value===this.value?x="repriced":m.data==="0x"&&m.from===m.to&&m.value===Mv&&(x="cancelled"),C(!1,"transaction was replaced","TRANSACTION_REPLACED",{cancelled:x==="replaced"||x==="cancelled",reason:x,replacement:m.replaceableTransaction(o),hash:m.hash,receipt:g})}}l++}},u=p=>{if(p==null||p.status!==0)return p;C(!1,"transaction execution reverted","CALL_EXCEPTION",{action:"sendTransaction",data:null,reason:null,invocation:null,revert:null,transaction:{to:p.to,from:p.from,data:""},receipt:p})},f=await this.provider.getTransactionReceipt(this.hash);if(n===0)return u(f);if(f){if(n===1||await f.confirmations()>=n)return u(f)}else if(await i(),n===0)return null;return await new Promise((p,h)=>{let w=[],y=()=>{w.forEach(m=>m())};if(w.push(()=>{s=!0}),r>0){let m=setTimeout(()=>{y(),h(ue("wait for transaction timeout","TIMEOUT"))},r);w.push(()=>{clearTimeout(m)})}let v=async m=>{if(await m.confirmations()>=n){y();try{p(u(m))}catch(g){h(g)}}};if(w.push(()=>{this.provider.off(this.hash,v)}),this.provider.on(this.hash,v),o>=0){let m=async()=>{try{await i()}catch(g){if(Be(g,"TRANSACTION_REPLACED")){y(),h(g);return}}s||this.provider.once("block",m)};w.push(()=>{this.provider.off("block",m)}),this.provider.once("block",m)}})}isMined(){return this.blockHash!=null}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}removedEvent(){return C(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),zv(this)}reorderedEvent(e){return C(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),C(!e||e.isMined(),"unmined \'other\' transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),Pv(this,e)}replaceableTransaction(e){b(Number.isInteger(e)&&e>=0,"invalid startBlock","startBlock",e);let a=new t(this,this.provider);return a.#e=e,a}};function eB(t){return{orphan:"drop-block",hash:t.hash,number:t.number}}function Pv(t,e){return{orphan:"reorder-transaction",tx:t,other:e}}function zv(t){return{orphan:"drop-transaction",tx:t}}function tB(t){return{orphan:"drop-log",log:{transactionHash:t.transactionHash,blockHash:t.blockHash,blockNumber:t.blockNumber,address:t.address,data:t.data,topics:Object.freeze(t.topics.slice()),index:t.index}}}var Uo=class extends Ha{interface;fragment;args;constructor(e,a,n){super(e,e.provider);let r=a.decodeEventLog(n,e.data,e.topics);M(this,{args:r,fragment:n,interface:a})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}},is=class extends Ha{error;constructor(e,a){super(e,e.provider),M(this,{error:a})}},$c=class extends Do{#e;constructor(e,a,n){super(n,a),this.#e=e}get logs(){return super.logs.map(e=>{let a=e.topics.length?this.#e.getEvent(e.topics[0]):null;if(a)try{return new Uo(e,this.#e,a)}catch(n){return new is(e,n)}return e})}},Mo=class extends Tr{#e;constructor(e,a,n){super(n,a),this.#e=e}async wait(e,a){let n=await super.wait(e,a);return n==null?null:new $c(this.#e,this.provider,n)}},us=class extends co{log;constructor(e,a,n,r){super(e,a,n),M(this,{log:r})}async getBlock(){return await this.log.getBlock()}async getTransaction(){return await this.log.getTransaction()}async getTransactionReceipt(){return await this.log.getTransactionReceipt()}},ji=class extends us{constructor(e,a,n,r,o){super(e,a,n,new Uo(o,e.interface,r));let l=e.interface.decodeEventLog(r,this.log.data,this.log.topics);M(this,{args:l,fragment:r})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}};var Rv=BigInt(0);function Fv(t){return t&&typeof t.call=="function"}function qv(t){return t&&typeof t.estimateGas=="function"}function ad(t){return t&&typeof t.resolveName=="function"}function Gv(t){return t&&typeof t.sendTransaction=="function"}function _v(t){if(t!=null){if(ad(t))return t;if(t.provider)return t.provider}}var Eg=class{#e;fragment;constructor(e,a,n){if(M(this,{fragment:a}),a.inputs.length<n.length)throw new Error("too many arguments");let r=zo(e.runner,"resolveName"),o=ad(r)?r:null;this.#e=(async function(){let l=await Promise.all(a.inputs.map((s,i)=>n[i]==null?null:s.walkAsync(n[i],(f,d)=>f==="address"?Array.isArray(d)?Promise.all(d.map(p=>Ve(p,o))):Ve(d,o):d)));return e.interface.encodeFilterTopics(a,l)})()}getTopicFilter(){return this.#e}};function zo(t,e){return t==null?null:typeof t[e]=="function"?t:t.provider&&typeof t.provider[e]=="function"?t.provider:null}function Po(t){return t==null?null:t.provider||null}async function nd(t,e){let a=Ee.dereference(t,"overrides");b(typeof a=="object","invalid overrides parameter","overrides",t);let n=Br(a);return b(n.to==null||(e||[]).indexOf("to")>=0,"cannot override to","overrides.to",n.to),b(n.data==null||(e||[]).indexOf("data")>=0,"cannot override data","overrides.data",n.data),n.from&&(n.from=n.from),n}async function Og(t,e,a){let n=zo(t,"resolveName"),r=ad(n)?n:null;return await Promise.all(e.map((o,l)=>o.walkAsync(a[l],(s,i)=>(i=Ee.dereference(i,s),s==="address"?Ve(i,r):i))))}function aB(t){let e=async function(l){let s=await nd(l,["data"]);s.to=await t.getAddress(),s.from&&(s.from=await Ve(s.from,_v(t.runner)));let i=t.interface,u=D(s.value||Rv,"overrides.value")===Rv,f=(s.data||"0x")==="0x";i.fallback&&!i.fallback.payable&&i.receive&&!f&&!u&&b(!1,"cannot send data to receive or send value to non-payable fallback","overrides",l),b(i.fallback||f,"cannot send data to receive-only contract","overrides.data",s.data);let d=i.receive||i.fallback&&i.fallback.payable;return b(d||u,"cannot send value to non-payable fallback","overrides.value",s.value),b(i.fallback||f,"cannot send data to receive-only contract","overrides.data",s.data),s},a=async function(l){let s=zo(t.runner,"call");C(Fv(s),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});let i=await e(l);try{return await s.call(i)}catch(u){throw Kl(u)&&u.data?t.interface.makeError(u.data,i):u}},n=async function(l){let s=t.runner;C(Gv(s),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});let i=await s.sendTransaction(await e(l)),u=Po(t.runner);return new Mo(t.interface,u,i)},r=async function(l){let s=zo(t.runner,"estimateGas");return C(qv(s),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await s.estimateGas(await e(l))},o=async l=>await n(l);return M(o,{_contract:t,estimateGas:r,populateTransaction:e,send:n,staticCall:a}),o}function nB(t,e){let a=function(...u){let f=t.interface.getFunction(e,u);return C(f,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:e,args:u}}),f},n=async function(...u){let f=a(...u),d={};if(f.inputs.length+1===u.length&&(d=await nd(u.pop()),d.from&&(d.from=await Ve(d.from,_v(t.runner)))),f.inputs.length!==u.length)throw new Error("internal error: fragment inputs doesn\'t match arguments; should not happen");let p=await Og(t.runner,f.inputs,u);return Object.assign({},d,await Ge({to:t.getAddress(),data:t.interface.encodeFunctionData(f,p)}))},r=async function(...u){let f=await s(...u);return f.length===1?f[0]:f},o=async function(...u){let f=t.runner;C(Gv(f),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});let d=await f.sendTransaction(await n(...u)),p=Po(t.runner);return new Mo(t.interface,p,d)},l=async function(...u){let f=zo(t.runner,"estimateGas");return C(qv(f),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await f.estimateGas(await n(...u))},s=async function(...u){let f=zo(t.runner,"call");C(Fv(f),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});let d=await n(...u),p="0x";try{p=await f.call(d)}catch(w){throw Kl(w)&&w.data?t.interface.makeError(w.data,d):w}let h=a(...u);return t.interface.decodeFunctionResult(h,p)},i=async(...u)=>a(...u).constant?await r(...u):await o(...u);return M(i,{name:t.interface.getFunctionName(e),_contract:t,_key:e,getFragment:a,estimateGas:l,populateTransaction:n,send:o,staticCall:r,staticCallResult:s}),Object.defineProperty(i,"fragment",{configurable:!1,enumerable:!0,get:()=>{let u=t.interface.getFunction(e);return C(u,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:e}}),u}}),i}function rB(t,e){let a=function(...r){let o=t.interface.getEvent(e,r);return C(o,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:e,args:r}}),o},n=function(...r){return new Eg(t,a(...r),r)};return M(n,{name:t.interface.getEventName(e),_contract:t,_key:e,getFragment:a}),Object.defineProperty(n,"fragment",{configurable:!1,enumerable:!0,get:()=>{let r=t.interface.getEvent(e);return C(r,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:e}}),r}}),n}var td=Symbol.for("_ethersInternal_contract"),Vv=new WeakMap;function oB(t,e){Vv.set(t[td],e)}function oa(t){return Vv.get(t[td])}function lB(t){return t&&typeof t=="object"&&"getTopicFilter"in t&&typeof t.getTopicFilter=="function"&&t.fragment}async function Ng(t,e){let a,n=null;if(Array.isArray(e)){let o=function(l){if(Z(l,32))return l;let s=t.interface.getEvent(l);return b(s,"unknown fragment","name",l),s.topicHash};a=e.map(l=>l==null?null:Array.isArray(l)?l.map(o):o(l))}else e==="*"?a=[null]:typeof e=="string"?Z(e,32)?a=[e]:(n=t.interface.getEvent(e),b(n,"unknown fragment","event",e),a=[n.topicHash]):lB(e)?a=await e.getTopicFilter():"fragment"in e?(n=e.fragment,a=[n.topicHash]):b(!1,"unknown event name","event",e);a=a.map(o=>{if(o==null)return null;if(Array.isArray(o)){let l=Array.from(new Set(o.map(s=>s.toLowerCase())).values());return l.length===1?l[0]:(l.sort(),l)}return o.toLowerCase()});let r=a.map(o=>o==null?"null":Array.isArray(o)?o.join("|"):o).join("&");return{fragment:n,tag:r,topics:a}}async function Yi(t,e){let{subs:a}=oa(t);return a.get((await Ng(t,e)).tag)||null}async function Hv(t,e,a){let n=Po(t.runner);C(n,"contract runner does not support subscribing","UNSUPPORTED_OPERATION",{operation:e});let{fragment:r,tag:o,topics:l}=await Ng(t,a),{addr:s,subs:i}=oa(t),u=i.get(o);if(!u){let d={address:s||t,topics:l},p=v=>{let m=r;if(m==null)try{m=t.interface.getEvent(v.topics[0])}catch{}if(m){let g=m,x=r?t.interface.decodeEventLog(r,v.data,v.topics):[];Bg(t,a,x,L=>new ji(t,L,a,g,v))}else Bg(t,a,[],g=>new us(t,g,a,v))},h=[];u={tag:o,listeners:[],start:()=>{h.length||h.push(n.on(d,p))},stop:async()=>{if(h.length==0)return;let v=h;h=[],await Promise.all(v),n.off(d,p)}},i.set(o,u)}return u}var Tg=Promise.resolve();async function sB(t,e,a,n){await Tg;let r=await Yi(t,e);if(!r)return!1;let o=r.listeners.length;return r.listeners=r.listeners.filter(({listener:l,once:s})=>{let i=Array.from(a);n&&i.push(n(s?null:l));try{l.call(t,...i)}catch{}return!s}),r.listeners.length===0&&(r.stop(),oa(t).subs.delete(r.tag)),o>0}async function Bg(t,e,a,n){try{await Tg}catch{}let r=sB(t,e,a,n);return Tg=r,await r}var ed=["then"],Or=class t{target;interface;runner;filters;[td];fallback;constructor(e,a,n,r){b(typeof e=="string"||Ui(e),"invalid value for Contract target","target",e),n==null&&(n=null);let o=ko.from(a);M(this,{target:e,runner:n,interface:o}),Object.defineProperty(this,td,{value:{}});let l,s=null,i=null;if(r){let d=Po(n);i=new Mo(this.interface,d,r)}let u=new Map;if(typeof e=="string")if(Z(e))s=e,l=Promise.resolve(e);else{let d=zo(n,"resolveName");if(!ad(d))throw ue("contract runner does not support name resolution","UNSUPPORTED_OPERATION",{operation:"resolveName"});l=d.resolveName(e).then(p=>{if(p==null)throw ue("an ENS name used for a contract target must be correctly configured","UNCONFIGURED_NAME",{value:e});return oa(this).addr=p,p})}else l=e.getAddress().then(d=>{if(d==null)throw new Error("TODO");return oa(this).addr=d,d});oB(this,{addrPromise:l,addr:s,deployTx:i,subs:u});let f=new Proxy({},{get:(d,p,h)=>{if(typeof p=="symbol"||ed.indexOf(p)>=0)return Reflect.get(d,p,h);try{return this.getEvent(p)}catch(w){if(!Be(w,"INVALID_ARGUMENT")||w.argument!=="key")throw w}},has:(d,p)=>ed.indexOf(p)>=0?Reflect.has(d,p):Reflect.has(d,p)||this.interface.hasEvent(String(p))});return M(this,{filters:f}),M(this,{fallback:o.receive||o.fallback?aB(this):null}),new Proxy(this,{get:(d,p,h)=>{if(typeof p=="symbol"||p in d||ed.indexOf(p)>=0)return Reflect.get(d,p,h);try{return d.getFunction(p)}catch(w){if(!Be(w,"INVALID_ARGUMENT")||w.argument!=="key")throw w}},has:(d,p)=>typeof p=="symbol"||p in d||ed.indexOf(p)>=0?Reflect.has(d,p):d.interface.hasFunction(p)})}connect(e){return new t(this.target,this.interface,e)}attach(e){return new t(e,this.interface,this.runner)}async getAddress(){return await oa(this).addrPromise}async getDeployedCode(){let e=Po(this.runner);C(e,"runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"getDeployedCode"});let a=await e.getCode(await this.getAddress());return a==="0x"?null:a}async waitForDeployment(){let e=this.deploymentTransaction();if(e)return await e.wait(),this;if(await this.getDeployedCode()!=null)return this;let n=Po(this.runner);return C(n!=null,"contract runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"waitForDeployment"}),new Promise((r,o)=>{let l=async()=>{try{if(await this.getDeployedCode()!=null)return r(this);n.once("block",l)}catch(s){o(s)}};l()})}deploymentTransaction(){return oa(this).deployTx}getFunction(e){return typeof e!="string"&&(e=e.format()),nB(this,e)}getEvent(e){return typeof e!="string"&&(e=e.format()),rB(this,e)}async queryTransaction(e){throw new Error("@TODO")}async queryFilter(e,a,n){a==null&&(a=0),n==null&&(n="latest");let{addr:r,addrPromise:o}=oa(this),l=r||await o,{fragment:s,topics:i}=await Ng(this,e),u={address:l,topics:i,fromBlock:a,toBlock:n},f=Po(this.runner);return C(f,"contract runner does not have a provider","UNSUPPORTED_OPERATION",{operation:"queryFilter"}),(await f.getLogs(u)).map(d=>{let p=s;if(p==null)try{p=this.interface.getEvent(d.topics[0])}catch{}if(p)try{return new Uo(d,this.interface,p)}catch(h){return new is(d,h)}return new Ha(d,f)})}async on(e,a){let n=await Hv(this,"on",e);return n.listeners.push({listener:a,once:!1}),n.start(),this}async once(e,a){let n=await Hv(this,"once",e);return n.listeners.push({listener:a,once:!0}),n.start(),this}async emit(e,...a){return await Bg(this,e,a,null)}async listenerCount(e){if(e){let r=await Yi(this,e);return r?r.listeners.length:0}let{subs:a}=oa(this),n=0;for(let{listeners:r}of a.values())n+=r.length;return n}async listeners(e){if(e){let r=await Yi(this,e);return r?r.listeners.map(({listener:o})=>o):[]}let{subs:a}=oa(this),n=[];for(let{listeners:r}of a.values())n=n.concat(r.map(({listener:o})=>o));return n}async off(e,a){let n=await Yi(this,e);if(!n)return this;if(a){let r=n.listeners.map(({listener:o})=>o).indexOf(a);r>=0&&n.listeners.splice(r,1)}return(a==null||n.listeners.length===0)&&(n.stop(),oa(this).subs.delete(n.tag)),this}async removeAllListeners(e){if(e){let a=await Yi(this,e);if(!a)return this;a.stop(),oa(this).subs.delete(a.tag)}else{let{subs:a}=oa(this);for(let{tag:n,stop:r}of a.values())r(),a.delete(n)}return this}async addListener(e,a){return await this.on(e,a)}async removeListener(e,a){return await this.off(e,a)}static buildClass(e){class a extends t{constructor(r,o=null){super(r,e,o)}}return a}static from(e,a,n){return n==null&&(n=null),new this(e,a,n)}};function iB(){return Or}var qt=class extends iB(){};var Ro=class t{interface;bytecode;runner;constructor(e,a,n){let r=ko.from(e);a instanceof Uint8Array?a=N(R(a)):(typeof a=="object"&&(a=a.object),a.startsWith("0x")||(a="0x"+a),a=N(R(a))),M(this,{bytecode:a,interface:r,runner:n||null})}attach(e){return new Or(e,this.interface,this.runner)}async getDeployTransaction(...e){let a={},n=this.interface.deploy;if(n.inputs.length+1===e.length&&(a=await nd(e.pop())),n.inputs.length!==e.length)throw new Error("incorrect number of arguments to constructor");let r=await Og(this.runner,n.inputs,e),o=ne([this.bytecode,this.interface.encodeDeploy(r)]);return Object.assign({},a,{data:o})}async deploy(...e){let a=await this.getDeployTransaction(...e);C(this.runner&&typeof this.runner.sendTransaction=="function","factory runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});let n=await this.runner.sendTransaction(a),r=Wl(n);return new Or(r,this.interface,this.runner,n)}connect(e){return new t(this.interface,this.bytecode,e)}static fromSolidity(e,a){b(e!=null,"bad compiler output","output",e),typeof e=="string"&&(e=JSON.parse(e));let n=e.abi,r="";return e.bytecode?r=e.bytecode:e.evm&&e.evm.bytecode&&(r=e.evm.bytecode),new this(n,r,a)}};var Ji=BigInt(60);function kg(t){return t.match(/^ipfs:\\/\\/ipfs\\//i)?t=t.substring(12):t.match(/^ipfs:\\/\\//i)?t=t.substring(7):b(!1,"unsupported IPFS format","link",t),`https://gateway.ipfs.io/ipfs/${t}`}var rd=class{name;constructor(e){M(this,{name:e})}connect(e){return this}supportsCoinType(e){return!1}async encodeAddress(e,a){throw new Error("unsupported coin")}async decodeAddress(e,a){throw new Error("unsupported coin")}};var jv=new RegExp("^(ipfs)://(.*)$","i"),Qv=[new RegExp("^(https)://(.*)$","i"),new RegExp("^(data):(.*)$","i"),jv,new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$","i")];function Kv(t){return t===Ji||t>=2147483648&&t<=4294967295}var Ho=class t{provider;address;name;#e;#t;constructor(e,a,n,r){M(this,{provider:e,address:a,name:n}),this.#e=r!=null?Promise.resolve(r):null,this.#t=new qt(a,["function supportsInterface(bytes4) view returns (bool)","function resolve(bytes, bytes) view returns (bytes)","function addr(bytes32) view returns (address)","function addr(bytes32, uint) view returns (bytes)","function text(bytes32, string) view returns (string)","function contenthash(bytes32) view returns (bytes)","function name(bytes32) view returns (string)"],e)}async supportsWildcard(){return this.#e==null&&(this.#e=(async()=>{try{return await this.#t.supportsInterface("0x9061b923")}catch(e){if(Be(e,"CALL_EXCEPTION"))return!1;throw this.#e=null,e}})()),await this.#e}async#a(e,a){a=(a||[]).slice();let n=this.#t.interface;a.unshift(Qc(this.name));let r=null;await this.supportsWildcard()&&(r=n.getFunction(e),C(r,"missing fragment","UNKNOWN_ERROR",{info:{funcName:e}}),a=[Kc(this.name,255),n.encodeFunctionData(r,a)],e="resolve(bytes,bytes)"),a.push({enableCcipRead:!0});try{let o=await this.#t[e](...a);return r?n.decodeFunctionResult(r,o)[0]:o}catch(o){if(!Be(o,"CALL_EXCEPTION"))throw o}return null}async getAddress(e){let a=e==null?Ji:D(e);if(a===Ji)try{let o=await this.#a("addr(bytes32)");return o==null||o===wo?null:o}catch(o){if(Be(o,"CALL_EXCEPTION"))return null;throw o}if(Kv(a)){let o=await this.#a("addr(bytes32,uint)",[a]);return Z(o,20)?V(o):null}if(a>=0&&a<2147483648){let o=a+BigInt(2147483648),l=await this.#a("addr(bytes32,uint)",[o]);if(Z(l,20))return V(l)}let n=null;for(let o of this.provider.plugins)if(o instanceof rd&&a<=2147483648&&o.supportsCoinType(Number(a))){n=o;break}if(n==null)return null;let r=await this.#a("addr(bytes32,uint)",[a]);if(r==null||r==="0x")return null;if(a<2147483648){let o=await n.decodeAddress(Number(a),r);if(o!=null)return o}C(!1,"invalid coin data","UNSUPPORTED_OPERATION",{operation:`getAddress(${a})`,info:{coinType:a,data:r}})}async getText(e){let a=await this.#a("text(bytes32,string)",[e]);return a==null||a==="0x"?null:a}async getContentHash(){let e=await this.#a("contenthash(bytes32)");if(e==null||e==="0x")return null;let a=e.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);if(a){let r=a[1]==="e3010170"?"ipfs":"ipns",o=parseInt(a[4],16);if(a[5].length===o*2)return`${r}://${Um("0x"+a[2])}`}let n=e.match(/^0xe40101fa011b20([0-9a-f]*)$/);if(n&&n[1].length===64)return`bzz://${n[1]}`;C(!1,"invalid or unsupported content hash data","UNSUPPORTED_OPERATION",{operation:"getContentHash()",info:{data:e}})}async getName(){return await this.#a("name(bytes32)")}async getAvatar(){return(await this._getAvatar()).url}async _getAvatar(){let e=[{type:"name",value:this.name}];try{let a=await this.getText("avatar");if(a==null)return e.push({type:"!avatar",value:""}),{url:null,linkage:e};e.push({type:"avatar",value:a});for(let n=0;n<Qv.length;n++){let r=a.match(Qv[n]);if(r==null)continue;let o=r[1].toLowerCase();switch(o){case"https":case"data":return e.push({type:"url",value:a}),{linkage:e,url:a};case"ipfs":{let l=kg(a);return e.push({type:"ipfs",value:a}),e.push({type:"url",value:l}),{linkage:e,url:l}}case"erc721":case"erc1155":{let l=o==="erc721"?"tokenURI(uint256)":"uri(uint256)";e.push({type:o,value:a});let s=await this.getAddress();if(s==null)return e.push({type:"!owner",value:""}),{url:null,linkage:e};let i=(r[2]||"").split("/");if(i.length!==2)return e.push({type:`!${o}caip`,value:r[2]||""}),{url:null,linkage:e};let u=i[1],f=new qt(i[0],["function tokenURI(uint) view returns (string)","function ownerOf(uint) view returns (address)","function uri(uint) view returns (string)","function balanceOf(address, uint256) view returns (uint)"],this.provider);if(o==="erc721"){let y=await f.ownerOf(u);if(s!==y)return e.push({type:"!owner",value:y}),{url:null,linkage:e};e.push({type:"owner",value:y})}else if(o==="erc1155"){let y=await f.balanceOf(s,u);if(!y)return e.push({type:"!balance",value:"0"}),{url:null,linkage:e};e.push({type:"balance",value:y.toString()})}let d=await f[l](u);if(d==null||d==="0x")return e.push({type:"!metadata-url",value:""}),{url:null,linkage:e};e.push({type:"metadata-url-base",value:d}),o==="erc1155"&&(d=d.replace("{id}",Ht(u,32).substring(2)),e.push({type:"metadata-url-expanded",value:d})),d.match(/^ipfs:/i)&&(d=kg(d)),e.push({type:"metadata-url",value:d});let p={},h=await new wa(d).send();h.assertOk();try{p=h.bodyJson}catch{try{e.push({type:"!metadata",value:h.bodyText})}catch{let m=h.body;return m&&e.push({type:"!metadata",value:N(m)}),{url:null,linkage:e}}return{url:null,linkage:e}}if(!p)return e.push({type:"!metadata",value:""}),{url:null,linkage:e};e.push({type:"metadata",value:JSON.stringify(p)});let w=p.image;if(typeof w!="string")return e.push({type:"!imageUrl",value:""}),{url:null,linkage:e};if(!w.match(/^(https:\\/\\/|data:)/i)){if(w.match(jv)==null)return e.push({type:"!imageUrl-ipfs",value:w}),{url:null,linkage:e};e.push({type:"imageUrl-ipfs",value:w}),w=kg(w)}return e.push({type:"url",value:w}),{linkage:e,url:w}}}}}catch{}return{linkage:e,url:null}}static async getEnsAddress(e){let a=await e.getNetwork(),n=a.getPlugin("org.ethers.plugins.network.Ens");return C(n,"network does not support ENS","UNSUPPORTED_OPERATION",{operation:"getEnsAddress",info:{network:a}}),n.address}static async getUniversalResolverAddress(e){let n=(await e.getNetwork()).getPlugin("org.ethers.plugins.network.Ens");return n&&n.universalResolver?n.universalResolver:null}static async#n(e,a){let n=await t.getEnsAddress(e);try{let o=await new qt(n,["function resolver(bytes32) view returns (address)"],e).resolver(Qc(a),{enableCcipRead:!0});return o===wo?null:o}catch(r){throw r}return null}static async lookupAddress(e,a,n){let r=n==null?Ji:D(n);Kv(r)&&(a=V(a));let o=await Xv(e);if(o)try{let s=(await o.reverse(a,r,{enableCcipRead:!0})).primary;return Vc(s)?s:null}catch(l){if(Be(l,"CALL_EXCEPTION")&&l.reason==="ResolverNotFound(bytes)")return null;throw l}C(r===Ji,"lookupAddress coinType requires ENS Universal Resolver","UNSUPPORTED_OPERATION",{operation:"lookupAddress"});try{let l=await t.fromName(e,`${a.toLowerCase().substring(2)}.addr.reverse`);if(!l)return null;let s=await l.getName();return s==null||!Vc(s)||await e.resolveName(s)!==a?null:s}catch(l){if(Be(l,"BAD_DATA")&&l.value==="0x"||Be(l,"CALL_EXCEPTION"))return null;throw l}}static async fromName(e,a){let n=await Xv(e);if(n){let o;try{o=Kc(_c(a),255)}catch{return null}let l=await n.requireResolver(o);return new t(e,l.resolver,a,l.extended)}let r=a;for(;;){if(r===""||r==="."||a!=="eth"&&r==="eth")return null;let o=await t.#n(e,r);if(o!=null){let l=new t(e,o,a);return r!==a&&!await l.supportsWildcard()?null:l}r=r.split(".").slice(1).join(".")}}};async function Xv(t){let e=await Ho.getUniversalResolverAddress(t);return e?new qt(e,["function requireResolver(bytes) view returns ((bytes name, uint256 offset, bytes32 node, address resolver, bool extended))","function findResolver(bytes) view returns (address resolver, bytes32 node, uint offset)","function resolve(bytes name, bytes data) view returns (bytes result, address resolver)","function reverse(bytes name, uint coinType) view returns (string primary, address resolver, address reverseResolver)","error ResolverNotFound(bytes name)","error ResolverNotContract(bytes name, address resolver)","error ReverseAddressMismatch(string primary, bytes primaryAddress)","error HttpError(uint16 statusCode, string statusMessage)"],t):null}var Yv=BigInt(0);function re(t,e){return(function(a){return a==null?e:t(a)})}function Zi(t,e){return(a=>{if(e&&a==null)return null;if(!Array.isArray(a))throw new Error("not an array");return a.map(n=>t(n))})}function Wi(t,e){return(a=>{let n={};for(let r in t){let o=r;if(e&&r in e&&!(o in a)){for(let l of e[r])if(l in a){o=l;break}}try{let l=t[r](a[o]);l!==void 0&&(n[r]=l)}catch(l){let s=l instanceof Error?l.message:"not-an-error";C(!1,`invalid value for value.${r} (${s})`,"BAD_DATA",{value:a})}}return n})}function uB(t){switch(t){case!0:case"true":return!0;case!1:case"false":return!1}b(!1,`invalid boolean; ${JSON.stringify(t)}`,"value",t)}function fs(t){return b(Z(t,!0),"invalid data","value",t),t}function it(t){return b(Z(t,32),"invalid hash","value",t),t}var fB=Wi({address:V,blockHash:it,blockNumber:q,data:fs,index:q,removed:re(uB,!1),topics:Zi(it),transactionHash:it,transactionIndex:q},{index:["logIndex"]});function Jv(t){return fB(t)}var cB=Wi({hash:re(it),parentHash:it,parentBeaconBlockRoot:re(it,null),number:q,timestamp:q,nonce:re(fs),difficulty:D,gasLimit:D,gasUsed:D,stateRoot:re(it,null),receiptsRoot:re(it,null),transactionsRoot:re(it,null),blobGasUsed:re(D,null),excessBlobGas:re(D,null),miner:re(V),prevRandao:re(it,null),extraData:fs,baseFeePerGas:re(D)},{prevRandao:["mixHash"]});function Zv(t){let e=cB(t);return e.transactions=t.transactions.map(a=>typeof a=="string"?a:Dg(a)),e}var dB=Wi({transactionIndex:q,blockNumber:q,transactionHash:it,address:V,topics:Zi(it),data:fs,index:q,blockHash:it},{index:["logIndex"]});function pB(t){return dB(t)}var hB=Wi({to:re(V,null),from:re(V,null),contractAddress:re(V,null),index:q,root:re(N),gasUsed:D,blobGasUsed:re(D,null),logsBloom:re(fs),blockHash:it,hash:it,logs:Zi(pB),blockNumber:q,cumulativeGasUsed:D,effectiveGasPrice:re(D),blobGasPrice:re(D,null),status:re(q),type:re(q,0)},{effectiveGasPrice:["gasPrice"],hash:["transactionHash"],index:["transactionIndex"]});function Wv(t){return hB(t)}function Dg(t){t.to&&D(t.to)===Yv&&(t.to="0x0000000000000000000000000000000000000000");let e=Wi({hash:it,index:re(q,void 0),type:a=>a==="0x"||a==null?0:q(a),accessList:re(ra,null),blobVersionedHashes:re(Zi(it,!0),null),authorizationList:re(Zi(a=>{let n;if(a.signature)n=a.signature;else{let r=a.yParity;r==="0x1b"?r=0:r==="0x1c"&&(r=1),n=Object.assign({},a,{yParity:r})}return{address:V(a.address),chainId:D(a.chainId),nonce:D(a.nonce),signature:tt.from(n)}},!1),null),blockHash:re(it,null),blockNumber:re(q,null),transactionIndex:re(q,null),from:V,gasPrice:re(D),maxPriorityFeePerGas:re(D),maxFeePerGas:re(D),maxFeePerBlobGas:re(D,null),gasLimit:D,to:re(V,null),value:D,nonce:q,data:fs,creates:re(V,null),chainId:re(D,null)},{data:["input"],gasLimit:["gas"],index:["transactionIndex"]})(t);if(e.to==null&&e.creates==null&&(e.creates=Wl(e)),(t.type===1||t.type===2)&&t.accessList==null&&(e.accessList=[]),t.signature?e.signature=tt.from(t.signature):e.signature=tt.from(t),e.chainId==null){let a=e.signature.legacyChainId;a!=null&&(e.chainId=a)}return e.blockHash&&D(e.blockHash)===Yv&&(e.blockHash=null),e}var mB="0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",gB=Symbol.for("nodejs.util.inspect.custom"),cs=class t{name;constructor(e){M(this,{name:e})}[gB](){return this.toString()}toString(){return`${this.name} { }`}clone(){return new t(this.name)}},ds=class t extends cs{effectiveBlock;txBase;txCreate;txDataZero;txDataNonzero;txAccessListStorageKey;txAccessListAddress;constructor(e,a){e==null&&(e=0),super(`org.ethers.network.plugins.GasCost#${e||0}`);let n={effectiveBlock:e};function r(o,l){let s=(a||{})[o];s==null&&(s=l),b(typeof s=="number",`invalud value for ${o}`,"costs",a),n[o]=s}r("txBase",21e3),r("txCreate",32e3),r("txDataZero",4),r("txDataNonzero",16),r("txAccessListStorageKey",1900),r("txAccessListAddress",2400),M(this,n)}toString(){return`${this.name} { txBase: ${this.txBase}, txCreate: ${this.txCreate}, txDataZero: ${this.txDataZero}, txAccessListStorageKey: ${this.txAccessListStorageKey}, txAccessListAddress: ${this.txAccessListAddress} }`}clone(){return new t(this.effectiveBlock,this)}},ps=class t extends cs{address;targetNetwork;universalResolver;constructor(e,a,n){super("org.ethers.plugins.network.Ens"),M(this,{address:e||mB,targetNetwork:a??1,universalResolver:n})}toString(){return`${this.name} { address: ${this.address}, targetNetwork: ${this.targetNetwork}, universalResolver: ${this.universalResolver} }`}clone(){return new t(this.address,this.targetNetwork,this.universalResolver)}};var $i=class extends cs{#e;#t;get url(){return this.#e}get processFunc(){return this.#t}constructor(e,a){super("org.ethers.plugins.network.FetchUrlFeeDataPlugin"),this.#e=e,this.#t=a}toString(){return`${this.name} { url: ${this.url} }`}clone(){return this}};var xB=Symbol.for("nodejs.util.inspect.custom"),Ug=new Map,la=class t{#e;#t;#a;constructor(e,a){this.#e=e,this.#t=D(a),this.#a=new Map}[xB](){return this.toString()}toString(){let e=[];for(let a of this.#a.values())e.push(a.toString());return`Network { name: ${this.name}, chainId: ${this.chainId}, plugins: [ ${e.join(", ")} ] }`}toJSON(){return{name:this.name,chainId:String(this.chainId)}}get name(){return this.#e}set name(e){this.#e=e}get chainId(){return this.#t}set chainId(e){this.#t=D(e,"chainId")}matches(e){if(e==null)return!1;if(typeof e=="string"){try{return this.chainId===D(e)}catch{}return this.name===e}if(typeof e=="number"||typeof e=="bigint"){try{return this.chainId===D(e)}catch{}return!1}if(typeof e=="object"){if(e.chainId!=null){try{return this.chainId===D(e.chainId)}catch{}return!1}return e.name!=null?this.name===e.name:!1}return!1}get plugins(){return Array.from(this.#a.values())}attachPlugin(e){if(this.#a.get(e.name))throw new Error(`cannot replace existing plugin: ${e.name} `);return this.#a.set(e.name,e.clone()),this}getPlugin(e){return this.#a.get(e)||null}getPlugins(e){return this.plugins.filter(a=>a.name.split("#")[0]===e)}clone(){let e=new t(this.name,this.chainId);return this.plugins.forEach(a=>{e.attachPlugin(a.clone())}),e}computeIntrinsicGas(e){let a=this.getPlugin("org.ethers.plugins.network.GasCost")||new ds,n=a.txBase;if(e.to==null&&(n+=a.txCreate),e.data)for(let r=2;r<e.data.length;r+=2)e.data.substring(r,r+2)==="00"?n+=a.txDataZero:n+=a.txDataNonzero;if(e.accessList){let r=ra(e.accessList);for(let o in r)n+=a.txAccessListAddress+a.txAccessListStorageKey*r[o].storageKeys.length}return n}static from(e){if(yB(),e==null)return t.from("mainnet");if(typeof e=="number"&&(e=BigInt(e)),typeof e=="string"||typeof e=="bigint"){let a=Ug.get(e);if(a)return a();if(typeof e=="bigint")return new t("unknown",e);b(!1,"unknown network","network",e)}if(typeof e.clone=="function")return e.clone();if(typeof e=="object"){b(typeof e.name=="string"&&typeof e.chainId=="number","invalid network object name or chainId","network",e);let a=new t(e.name,e.chainId),n=e;return(n.ensAddress||n.ensNetwork!=null||n.ensUniversalResolver)&&a.attachPlugin(new ps(n.ensAddress,n.ensNetwork,n.ensUniversalResolver)),a}b(!1,"invalid network","network",e)}static register(e,a){typeof e=="number"&&(e=BigInt(e));let n=Ug.get(e);n&&b(!1,`conflicting network for ${JSON.stringify(n.name)}`,"nameOrChainId",e),Ug.set(e,a)}};function $v(t,e){let a=String(t);if(!a.match(/^[0-9.]+$/))throw new Error(`invalid gwei value: ${t}`);let n=a.split(".");if(n.length===1&&n.push(""),n.length!==2)throw new Error(`invalid gwei value: ${t}`);for(;n[1].length<e;)n[1]+="0";if(n[1].length>9){let r=BigInt(n[1].substring(0,9));n[1].substring(9).match(/^0+$/)||r++,n[1]=r.toString()}return BigInt(n[0]+n[1])}function eA(t){return new $i(t,async(e,a,n)=>{n.setHeader("User-Agent","ethers");let r;try{let[o,l]=await Promise.all([n.send(),e()]);r=o;let s=r.bodyJson.standard;return{gasPrice:l.gasPrice,maxFeePerGas:$v(s.maxFee,9),maxPriorityFeePerGas:$v(s.maxPriorityFee,9)}}catch(o){C(!1,`error encountered with polygon gas station (${JSON.stringify(n.url)})`,"SERVER_ERROR",{request:n,response:r,error:o})}})}var tA=!1;function yB(){if(tA)return;tA=!0;function t(a,n,r){let o=function(){let l=new la(a,n);return r.ensNetwork!=null&&l.attachPlugin(new ps(null,r.ensNetwork,r.ensUniversalResolver)),l.attachPlugin(new ds),(r.plugins||[]).forEach(s=>{l.attachPlugin(s)}),l};la.register(a,o),la.register(n,o),r.altNames&&r.altNames.forEach(l=>{la.register(l,o)})}let e="0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe";t("mainnet",1,{ensUniversalResolver:e,ensNetwork:1,altNames:["homestead"]}),t("ropsten",3,{ensNetwork:3}),t("rinkeby",4,{ensNetwork:4}),t("goerli",5,{ensNetwork:5}),t("kovan",42,{ensNetwork:42}),t("sepolia",11155111,{ensUniversalResolver:e,ensNetwork:11155111}),t("holesky",17e3,{ensNetwork:17e3}),t("classic",61,{}),t("classicKotti",6,{}),t("arbitrum",42161,{ensNetwork:1}),t("arbitrum-goerli",421613,{}),t("arbitrum-sepolia",421614,{}),t("base",8453,{ensNetwork:1}),t("base-goerli",84531,{}),t("base-sepolia",84532,{}),t("bnb",56,{ensNetwork:1}),t("bnbt",97,{}),t("filecoin",314,{}),t("filecoin-calibration",314159,{}),t("linea",59144,{ensNetwork:1}),t("linea-goerli",59140,{}),t("linea-sepolia",59141,{}),t("matic",137,{ensNetwork:1,plugins:[eA("https://gasstation.polygon.technology/v2")]}),t("matic-amoy",80002,{}),t("matic-mumbai",80001,{altNames:["maticMumbai","maticmum"],plugins:[eA("https://gasstation-testnet.polygon.technology/v2")]}),t("optimism",10,{ensNetwork:1,plugins:[]}),t("optimism-goerli",420,{}),t("optimism-sepolia",11155420,{}),t("xdai",100,{ensNetwork:1})}function Mg(t){return JSON.parse(JSON.stringify(t))}var od=class{#e;#t;#a;#n;constructor(e){this.#e=e,this.#t=null,this.#a=4e3,this.#n=-2}get pollingInterval(){return this.#a}set pollingInterval(e){this.#a=e}async#r(){try{let e=await this.#e.getBlockNumber();if(this.#n===-2){this.#n=e;return}if(e!==this.#n){for(let a=this.#n+1;a<=e;a++){if(this.#t==null)return;await this.#e.emit("block",a)}this.#n=e}}catch{}this.#t!=null&&(this.#t=this.#e._setTimeout(this.#r.bind(this),this.#a))}start(){this.#t||(this.#t=this.#e._setTimeout(this.#r.bind(this),this.#a),this.#r())}stop(){this.#t&&(this.#e._clearTimeout(this.#t),this.#t=null)}pause(e){this.stop(),e&&(this.#n=-2)}resume(){this.start()}},eu=class{#e;#t;#a;constructor(e){this.#e=e,this.#a=!1,this.#t=a=>{this._poll(a,this.#e)}}async _poll(e,a){throw new Error("sub-classes must override this")}start(){this.#a||(this.#a=!0,this.#t(-2),this.#e.on("block",this.#t))}stop(){this.#a&&(this.#a=!1,this.#e.off("block",this.#t))}pause(e){this.stop()}resume(){this.start()}},ld=class extends eu{#e;#t;constructor(e,a){super(e),this.#e=a,this.#t=-2}pause(e){e&&(this.#t=-2),super.pause(e)}async _poll(e,a){let n=await a.getBlock(this.#e);n!=null&&(this.#t===-2?this.#t=n.number:n.number>this.#t&&(a.emit(this.#e,n.number),this.#t=n.number))}},sd=class extends eu{#e;constructor(e,a){super(e),this.#e=Mg(a)}async _poll(e,a){throw new Error("@TODO")}},id=class extends eu{#e;constructor(e,a){super(e),this.#e=a}async _poll(e,a){let n=await a.getTransactionReceipt(this.#e);n&&a.emit(this.#e,n)}},Nr=class{#e;#t;#a;#n;#r;constructor(e,a){this.#e=e,this.#t=Mg(a),this.#a=this.#l.bind(this),this.#n=!1,this.#r=-2}async#l(e){if(this.#r===-2)return;let a=Mg(this.#t);a.fromBlock=this.#r+1,a.toBlock=e;let n=await this.#e.getLogs(a);if(n.length===0){this.#r<e-60&&(this.#r=e-60);return}for(let r of n)this.#e.emit(this.#t,r),this.#r=r.blockNumber}start(){this.#n||(this.#n=!0,this.#r===-2&&this.#e.getBlockNumber().then(e=>{this.#r=e}),this.#e.on("block",this.#a))}stop(){this.#n&&(this.#n=!1,this.#e.off("block",this.#a))}pause(e){this.stop(),e&&(this.#r=-2)}resume(){this.start()}};var bB=BigInt(2),wB=10;function Pg(t){return new Promise(e=>{setTimeout(e,t)})}function ud(t){return t&&typeof t.then=="function"}function cd(t,e){return t+":"+JSON.stringify(e,(a,n)=>{if(n==null)return"null";if(typeof n=="bigint")return`bigint:${n.toString()}`;if(typeof n=="string")return n.toLowerCase();if(typeof n=="object"&&!Array.isArray(n)){let r=Object.keys(n);return r.sort(),r.reduce((o,l)=>(o[l]=n[l],o),{})}return n})}var hs=class{name;constructor(e){M(this,{name:e})}start(){}stop(){}pause(e){}resume(){}};function LB(t){return JSON.parse(JSON.stringify(t))}function Rg(t){return t=Array.from(new Set(t).values()),t.sort(),t}async function zg(t,e){if(t==null)throw new Error("invalid event");if(Array.isArray(t)&&(t={topics:t}),typeof t=="string")switch(t){case"block":case"debug":case"error":case"finalized":case"network":case"pending":case"safe":return{type:t,tag:t}}if(Z(t,32)){let a=t.toLowerCase();return{type:"transaction",tag:cd("tx",{hash:a}),hash:a}}if(t.orphan){let a=t;return{type:"orphan",tag:cd("orphan",a),filter:LB(a)}}if(t.address||t.topics){let a=t,n={topics:(a.topics||[]).map(r=>r==null?null:Array.isArray(r)?Rg(r.map(o=>o.toLowerCase())):r.toLowerCase())};if(a.address){let r=[],o=[],l=s=>{Z(s)?r.push(s):o.push((async()=>{r.push(await Ve(s,e))})())};Array.isArray(a.address)?a.address.forEach(l):l(a.address),o.length&&await Promise.all(o),n.address=Rg(r.map(s=>s.toLowerCase()))}return{filter:n,tag:cd("event",n),type:"event"}}b(!1,"unknown ProviderEvent","event",t)}function fd(){return new Date().getTime()}var vB={cacheTimeout:250,pollingInterval:4e3},tu=class{#e;#t;#a;#n;#r;#l;#o;#s;#p;#u;#m;#h;#d;#f;constructor(e,a){if(this.#f=Object.assign({},vB,a||{}),e==="any")this.#l=!0,this.#r=null;else if(e){let n=la.from(e);this.#l=!1,this.#r=Promise.resolve(n),setTimeout(()=>{this.emit("network",n,null)},0)}else this.#l=!1,this.#r=null;this.#s=-1,this.#o=new Map,this.#e=new Map,this.#t=new Map,this.#a=null,this.#n=!1,this.#p=1,this.#u=new Map,this.#m=!1,this.#h=0,this.#d=[]}get _requestRate(){let e=this.#h;return e==0?null:e}set _requestRate(e){(e==null||e<0)&&(e=0),this.#h=q(e)}get pollingInterval(){return this.#f.pollingInterval}get provider(){return this}get plugins(){return Array.from(this.#t.values())}attachPlugin(e){if(this.#t.get(e.name))throw new Error(`cannot replace existing plugin: ${e.name} `);return this.#t.set(e.name,e.connect(this)),this}getPlugin(e){return this.#t.get(e)||null}get disableCcipRead(){return this.#m}set disableCcipRead(e){this.#m=!!e}#c(){let e=this.#h;if(e===0)return 0;let a=this.#d,n=fd();a.push(n);let r=n-1e3;for(;a.length&&a[0]<r;)a.shift();return a.length<e?0:a[0]+1e3-n}async#i(e){let a=this.#f.cacheTimeout;if(a<0){let o=this.#c();return o&&await Pg(o),await this._perform(e)}let n=cd(e.method,e),r=this.#o.get(n);if(!r){let o=this.#c();o&&await Pg(o),r=this._perform(e),this.#o.set(n,r),setTimeout(()=>{this.#o.get(n)===r&&this.#o.delete(n)},a)}return await r}async ccipReadFetch(e,a,n){if(this.disableCcipRead||n.length===0||e.to==null)return null;let r=e.to.toLowerCase(),o=a.toLowerCase(),l=[];for(let s=0;s<n.length;s++){let i=n[s],u=i.replace("{sender}",r).replace("{data}",o),f=new wa(u);i.indexOf("{data}")===-1&&(f.body={data:o,sender:r}),this.emit("debug",{action:"sendCcipReadFetchRequest",request:f,index:s,urls:n});let d="unknown error",p;try{p=await f.send()}catch(h){l.push(h.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:f,result:{error:h}});continue}try{let h=p.bodyJson;if(h.data)return this.emit("debug",{action:"receiveCcipReadFetchResult",request:f,result:h}),h.data;h.message&&(d=h.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:f,result:h})}catch{}C(p.statusCode<400||p.statusCode>=500,`response not found during CCIP fetch: ${d}`,"OFFCHAIN_FAULT",{reason:"404_MISSING_RESOURCE",transaction:e,info:{url:i,errorMessage:d}}),l.push(d)}C(!1,`error encountered during CCIP fetch: ${l.map(s=>JSON.stringify(s)).join(", ")}`,"OFFCHAIN_FAULT",{reason:"500_SERVER_ERROR",transaction:e,info:{urls:n,errorMessages:l}})}_wrapBlock(e,a){return new Xi(Zv(e),this)}_wrapLog(e,a){return new Ha(Jv(e),this)}_wrapTransactionReceipt(e,a){return new Do(Wv(e),this)}_wrapTransactionResponse(e,a){return new Tr(Dg(e),this)}_detectNetwork(){C(!1,"sub-classes must implement this","UNSUPPORTED_OPERATION",{operation:"_detectNetwork"})}async _perform(e){C(!1,`unsupported method: ${e.method}`,"UNSUPPORTED_OPERATION",{operation:e.method,info:e})}async getBlockNumber(){let e=q(await this.#i({method:"getBlockNumber"}),"%response");return this.#s>=0&&(this.#s=e),e}_getAddress(e){return Ve(e,this)}_getBlockTag(e){if(e==null)return"latest";switch(e){case"earliest":return"0x0";case"finalized":case"latest":case"pending":case"safe":return e}if(Z(e))return Z(e,32)?e:Tt(e);if(typeof e=="bigint"&&(e=q(e,"blockTag")),typeof e=="number")return e>=0?Tt(e):this.#s>=0?Tt(this.#s+e):this.getBlockNumber().then(a=>Tt(a+e));b(!1,"invalid blockTag","blockTag",e)}_getFilter(e){let a=(e.topics||[]).map(i=>i==null?null:Array.isArray(i)?Rg(i.map(u=>u.toLowerCase())):i.toLowerCase()),n="blockHash"in e?e.blockHash:void 0,r=(i,u,f)=>{let d;switch(i.length){case 0:break;case 1:d=i[0];break;default:i.sort(),d=i}if(n&&(u!=null||f!=null))throw new Error("invalid filter");let p={};return d&&(p.address=d),a.length&&(p.topics=a),u&&(p.fromBlock=u),f&&(p.toBlock=f),n&&(p.blockHash=n),p},o=[];if(e.address)if(Array.isArray(e.address))for(let i of e.address)o.push(this._getAddress(i));else o.push(this._getAddress(e.address));let l;"fromBlock"in e&&(l=this._getBlockTag(e.fromBlock));let s;return"toBlock"in e&&(s=this._getBlockTag(e.toBlock)),o.filter(i=>typeof i!="string").length||l!=null&&typeof l!="string"||s!=null&&typeof s!="string"?Promise.all([Promise.all(o),l,s]).then(i=>r(i[0],i[1],i[2])):r(o,l,s)}_getTransactionRequest(e){let a=Br(e),n=[];if(["to","from"].forEach(r=>{if(a[r]==null)return;let o=Ve(a[r],this);ud(o)?n.push((async function(){a[r]=await o})()):a[r]=o}),a.blockTag!=null){let r=this._getBlockTag(a.blockTag);ud(r)?n.push((async function(){a.blockTag=await r})()):a.blockTag=r}return n.length?(async function(){return await Promise.all(n),a})():a}async getNetwork(){if(this.#r==null){let r=(async()=>{try{let o=await this._detectNetwork();return this.emit("network",o,null),o}catch(o){throw this.#r===r&&(this.#r=null),o}})();return this.#r=r,(await r).clone()}let e=this.#r,[a,n]=await Promise.all([e,this._detectNetwork()]);return a.chainId!==n.chainId&&(this.#l?(this.emit("network",n,a),this.#r===e&&(this.#r=Promise.resolve(n))):C(!1,`network changed: ${a.chainId} => ${n.chainId} `,"NETWORK_ERROR",{event:"changed"})),a.clone()}async getFeeData(){let e=await this.getNetwork(),a=async()=>{let{_block:r,gasPrice:o,priorityFee:l}=await Ge({_block:this.#L("latest",!1),gasPrice:(async()=>{try{let f=await this.#i({method:"getGasPrice"});return D(f,"%response")}catch{}return null})(),priorityFee:(async()=>{try{let f=await this.#i({method:"getPriorityFee"});return D(f,"%response")}catch{}return null})()}),s=null,i=null,u=this._wrapBlock(r,e);return u&&u.baseFeePerGas&&(i=l??BigInt("1000000000"),s=u.baseFeePerGas*bB+i),new ss(o,s,i)},n=e.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");if(n){let r=new wa(n.url),o=await n.processFunc(a,this,r);return new ss(o.gasPrice,o.maxFeePerGas,o.maxPriorityFeePerGas)}return await a()}async estimateGas(e){let a=this._getTransactionRequest(e);return ud(a)&&(a=await a),D(await this.#i({method:"estimateGas",transaction:a}),"%response")}async#x(e,a,n){C(n<wB,"CCIP read exceeded maximum redirections","OFFCHAIN_FAULT",{reason:"TOO_MANY_REDIRECTS",transaction:Object.assign({},e,{blockTag:a,enableCcipRead:!0})});let r=Br(e);try{let o=this.#c();return o&&await Pg(o),N(await this._perform({method:"call",transaction:r,blockTag:a}))}catch(o){if(!this.disableCcipRead&&Kl(o)&&o.data&&n>=0&&a==="latest"&&r.to!=null&&Ie(o.data,0,4)==="0x556f1830"){let l=o.data,s=await Ve(r.to,this),i;try{i=EB(Ie(o.data,4))}catch(d){C(!1,d.message,"OFFCHAIN_FAULT",{reason:"BAD_DATA",transaction:r,info:{data:l}})}C(i.sender.toLowerCase()===s.toLowerCase(),"CCIP Read sender mismatch","CALL_EXCEPTION",{action:"call",data:l,reason:"OffchainLookup",transaction:r,invocation:null,revert:{signature:"OffchainLookup(address,string[],bytes,bytes4,bytes)",name:"OffchainLookup",args:i.errorArgs}});let u=await this.ccipReadFetch(r,i.calldata,i.urls);C(u!=null,"CCIP Read failed to fetch data","OFFCHAIN_FAULT",{reason:"FETCH_FAILED",transaction:r,info:{data:o.data,errorArgs:i.errorArgs}});let f={to:s,data:ne([i.selector,IB([u,i.extraData])])};this.emit("debug",{action:"sendCcipReadCall",transaction:f});try{let d=await this.#x(f,a,n+1);return this.emit("debug",{action:"receiveCcipReadCallResult",transaction:Object.assign({},f),result:d}),d}catch(d){throw this.emit("debug",{action:"receiveCcipReadCallError",transaction:Object.assign({},f),error:d}),d}}throw o}}async#y(e){let{value:a}=await Ge({network:this.getNetwork(),value:e});return a}async call(e){let{tx:a,blockTag:n}=await Ge({tx:this._getTransactionRequest(e),blockTag:this._getBlockTag(e.blockTag)});return await this.#y(this.#x(a,n,e.enableCcipRead?0:-1))}async#g(e,a,n){let r=this._getAddress(a),o=this._getBlockTag(n);return(typeof r!="string"||typeof o!="string")&&([r,o]=await Promise.all([r,o])),await this.#y(this.#i(Object.assign(e,{address:r,blockTag:o})))}async getBalance(e,a){return D(await this.#g({method:"getBalance"},e,a),"%response")}async getTransactionCount(e,a){return q(await this.#g({method:"getTransactionCount"},e,a),"%response")}async getCode(e,a){return N(await this.#g({method:"getCode"},e,a))}async getStorage(e,a,n){let r=D(a,"position");return N(await this.#g({method:"getStorage",position:r},e,n))}async broadcastTransaction(e){let{blockNumber:a,hash:n,network:r}=await Ge({blockNumber:this.getBlockNumber(),hash:this._perform({method:"broadcastTransaction",signedTransaction:e}),network:this.getNetwork()}),o=Ao.from(e);if(o.hash!==n)throw new Error("@TODO: the returned hash did not match");return this._wrapTransactionResponse(o,r).replaceableTransaction(a)}async#L(e,a){if(Z(e,32))return await this.#i({method:"getBlock",blockHash:e,includeTransactions:a});let n=this._getBlockTag(e);return typeof n!="string"&&(n=await n),await this.#i({method:"getBlock",blockTag:n,includeTransactions:a})}async getBlock(e,a){let{network:n,params:r}=await Ge({network:this.getNetwork(),params:this.#L(e,!!a)});return r==null?null:this._wrapBlock(r,n)}async getTransaction(e){let{network:a,params:n}=await Ge({network:this.getNetwork(),params:this.#i({method:"getTransaction",hash:e})});return n==null?null:this._wrapTransactionResponse(n,a)}async getTransactionReceipt(e){let{network:a,params:n}=await Ge({network:this.getNetwork(),params:this.#i({method:"getTransactionReceipt",hash:e})});if(n==null)return null;if(n.gasPrice==null&&n.effectiveGasPrice==null){let r=await this.#i({method:"getTransaction",hash:e});if(r==null)throw new Error("report this; could not find tx or effectiveGasPrice");n.effectiveGasPrice=r.gasPrice}return this._wrapTransactionReceipt(n,a)}async getTransactionResult(e){let{result:a}=await Ge({network:this.getNetwork(),result:this.#i({method:"getTransactionResult",hash:e})});return a==null?null:N(a)}async getLogs(e){let a=this._getFilter(e);ud(a)&&(a=await a);let{network:n,params:r}=await Ge({network:this.getNetwork(),params:this.#i({method:"getLogs",filter:a})});return r.map(o=>this._wrapLog(o,n))}_getProvider(e){C(!1,"provider cannot connect to target network","UNSUPPORTED_OPERATION",{operation:"_getProvider()"})}async getResolver(e){return await Ho.fromName(this,e)}async getAvatar(e){let a=await this.getResolver(e);return a?await a.getAvatar():null}async resolveName(e,a){let n=await this.getResolver(e);return n?await n.getAddress(a):null}async lookupAddress(e,a){return await Ho.lookupAddress(this,e,a)}async waitForTransaction(e,a,n){let r=a??1;return r===0?this.getTransactionReceipt(e):new Promise(async(o,l)=>{let s=null,i=(async u=>{try{let f=await this.getTransactionReceipt(e);if(f!=null&&u-f.blockNumber+1>=r){o(f),s&&(clearTimeout(s),s=null);return}}catch(f){console.log("EEE",f)}this.once("block",i)});n!=null&&(s=setTimeout(()=>{s!=null&&(s=null,this.off("block",i),l(ue("timeout","TIMEOUT",{reason:"timeout"})))},n)),i(await this.getBlockNumber())})}async waitForBlock(e){C(!1,"not implemented yet","NOT_IMPLEMENTED",{operation:"waitForBlock"})}_clearTimeout(e){let a=this.#u.get(e);a&&(a.timer&&clearTimeout(a.timer),this.#u.delete(e))}_setTimeout(e,a){a==null&&(a=0);let n=this.#p++,r=()=>{this.#u.delete(n),e()};if(this.paused)this.#u.set(n,{timer:null,func:r,time:a});else{let o=setTimeout(r,a);this.#u.set(n,{timer:o,func:r,time:fd()})}return n}_forEachSubscriber(e){for(let a of this.#e.values())e(a.subscriber)}_getSubscriber(e){switch(e.type){case"debug":case"error":case"network":return new hs(e.type);case"block":{let a=new od(this);return a.pollingInterval=this.pollingInterval,a}case"safe":case"finalized":return new ld(this,e.type);case"event":return new Nr(this,e.filter);case"transaction":return new id(this,e.hash);case"orphan":return new sd(this,e.filter)}throw new Error(`unsupported event: ${e.type}`)}_recoverSubscriber(e,a){for(let n of this.#e.values())if(n.subscriber===e){n.started&&n.subscriber.stop(),n.subscriber=a,n.started&&a.start(),this.#a!=null&&a.pause(this.#a);break}}async#b(e,a){let n=await zg(e,this);return n.type==="event"&&a&&a.length>0&&a[0].removed===!0&&(n=await zg({orphan:"drop-log",log:a[0]},this)),this.#e.get(n.tag)||null}async#w(e){let a=await zg(e,this),n=a.tag,r=this.#e.get(n);return r||(r={subscriber:this._getSubscriber(a),tag:n,addressableMap:new WeakMap,nameMap:new Map,started:!1,listeners:[]},this.#e.set(n,r)),r}async on(e,a){let n=await this.#w(e);return n.listeners.push({listener:a,once:!1}),n.started||(n.subscriber.start(),n.started=!0,this.#a!=null&&n.subscriber.pause(this.#a)),this}async once(e,a){let n=await this.#w(e);return n.listeners.push({listener:a,once:!0}),n.started||(n.subscriber.start(),n.started=!0,this.#a!=null&&n.subscriber.pause(this.#a)),this}async emit(e,...a){let n=await this.#b(e,a);if(!n||n.listeners.length===0)return!1;let r=n.listeners.length;return n.listeners=n.listeners.filter(({listener:o,once:l})=>{let s=new co(this,l?null:o,e);try{o.call(this,...a,s)}catch{}return!l}),n.listeners.length===0&&(n.started&&n.subscriber.stop(),this.#e.delete(n.tag)),r>0}async listenerCount(e){if(e){let n=await this.#b(e);return n?n.listeners.length:0}let a=0;for(let{listeners:n}of this.#e.values())a+=n.length;return a}async listeners(e){if(e){let n=await this.#b(e);return n?n.listeners.map(({listener:r})=>r):[]}let a=[];for(let{listeners:n}of this.#e.values())a=a.concat(n.map(({listener:r})=>r));return a}async off(e,a){let n=await this.#b(e);if(!n)return this;if(a){let r=n.listeners.map(({listener:o})=>o).indexOf(a);r>=0&&n.listeners.splice(r,1)}return(!a||n.listeners.length===0)&&(n.started&&n.subscriber.stop(),this.#e.delete(n.tag)),this}async removeAllListeners(e){if(e){let{tag:a,started:n,subscriber:r}=await this.#w(e);n&&r.stop(),this.#e.delete(a)}else for(let[a,{started:n,subscriber:r}]of this.#e)n&&r.stop(),this.#e.delete(a);return this}async addListener(e,a){return await this.on(e,a)}async removeListener(e,a){return this.off(e,a)}get destroyed(){return this.#n}destroy(){this.removeAllListeners();for(let e of this.#u.keys())this._clearTimeout(e);this.#n=!0}get paused(){return this.#a!=null}set paused(e){!!e!==this.paused&&(this.paused?this.resume():this.pause(!1))}pause(e){if(this.#s=-1,this.#a!=null){if(this.#a==!!e)return;C(!1,"cannot change pause type; resume first","UNSUPPORTED_OPERATION",{operation:"pause"})}this._forEachSubscriber(a=>a.pause(e)),this.#a=!!e;for(let a of this.#u.values())a.timer&&clearTimeout(a.timer),a.time=fd()-a.time}resume(){if(this.#a!=null){this._forEachSubscriber(e=>e.resume()),this.#a=null;for(let e of this.#u.values()){let a=e.time;a<0&&(a=0),e.time=fd(),setTimeout(e.func,a)}}}};function AB(t,e){try{let a=Hg(t,e);if(a)return hr(a)}catch{}return null}function Hg(t,e){if(t==="0x")return null;try{let a=q(Ie(t,e,e+32)),n=q(Ie(t,a,a+32));return Ie(t,a+32,a+32+n)}catch{}return null}function aA(t){let e=Oe(t);if(e.length>32)throw new Error("internal; should not happen");let a=new Uint8Array(32);return a.set(e,32-e.length),a}function CB(t){if(t.length%32===0)return t;let e=new Uint8Array(Math.ceil(t.length/32)*32);return e.set(t),e}var SB=new Uint8Array([]);function IB(t){let e=[],a=0;for(let n=0;n<t.length;n++)e.push(SB),a+=32;for(let n=0;n<t.length;n++){let r=R(t[n]);e[n]=aA(a),e.push(aA(r.length)),e.push(CB(r)),a+=32+Math.ceil(r.length/32)*32}return ne(e)}var nA="0x0000000000000000000000000000000000000000000000000000000000000000";function EB(t){let e={sender:"",urls:[],calldata:"",selector:"",extraData:"",errorArgs:[]};C(tn(t)>=160,"insufficient OffchainLookup data","OFFCHAIN_FAULT",{reason:"insufficient OffchainLookup data"});let a=Ie(t,0,32);C(Ie(a,0,12)===Ie(nA,0,12),"corrupt OffchainLookup sender","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup sender"}),e.sender=Ie(a,12);try{let n=[],r=q(Ie(t,32,64)),o=q(Ie(t,r,r+32)),l=Ie(t,r+32);for(let s=0;s<o;s++){let i=AB(l,s*32);if(i==null)throw new Error("abort");n.push(i)}e.urls=n}catch{C(!1,"corrupt OffchainLookup urls","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup urls"})}try{let n=Hg(t,64);if(n==null)throw new Error("abort");e.calldata=n}catch{C(!1,"corrupt OffchainLookup calldata","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup calldata"})}C(Ie(t,100,128)===Ie(nA,0,28),"corrupt OffchainLookup callbaackSelector","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup callbaackSelector"}),e.selector=Ie(t,96,100);try{let n=Hg(t,128);if(n==null)throw new Error("abort");e.extraData=n}catch{C(!1,"corrupt OffchainLookup extraData","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup extraData"})}return e.errorArgs="sender,urls,calldata,selector,extraData".split(/,/).map(n=>e[n]),e}function Fo(t,e){if(t.provider)return t.provider;C(!1,"missing provider","UNSUPPORTED_OPERATION",{operation:e})}async function rA(t,e){let a=Br(e);if(a.to!=null&&(a.to=Ve(a.to,t)),a.from!=null){let n=a.from;a.from=Promise.all([t.getAddress(),Ve(n,t)]).then(([r,o])=>(b(r.toLowerCase()===o.toLowerCase(),"transaction from mismatch","tx.from",o),r))}else a.from=t.getAddress();return await Ge(a)}var au=class{provider;constructor(e){M(this,{provider:e||null})}async getNonce(e){return Fo(this,"getTransactionCount").getTransactionCount(await this.getAddress(),e)}async populateCall(e){return await rA(this,e)}async populateTransaction(e){let a=Fo(this,"populateTransaction"),n=await rA(this,e);n.nonce==null&&(n.nonce=await this.getNonce("pending")),n.gasLimit==null&&(n.gasLimit=await this.estimateGas(n));let r=await this.provider.getNetwork();if(n.chainId!=null){let l=D(n.chainId);b(l===r.chainId,"transaction chainId mismatch","tx.chainId",e.chainId)}else n.chainId=r.chainId;let o=n.maxFeePerGas!=null||n.maxPriorityFeePerGas!=null;if(n.gasPrice!=null&&(n.type===2||o)?b(!1,"eip-1559 transaction do not support gasPrice","tx",e):(n.type===0||n.type===1)&&o&&b(!1,"pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas","tx",e),(n.type===2||n.type==null)&&n.maxFeePerGas!=null&&n.maxPriorityFeePerGas!=null)n.type=2;else if(n.type===0||n.type===1){let l=await a.getFeeData();C(l.gasPrice!=null,"network does not support gasPrice","UNSUPPORTED_OPERATION",{operation:"getGasPrice"}),n.gasPrice==null&&(n.gasPrice=l.gasPrice)}else{let l=await a.getFeeData();if(n.type==null)if(l.maxFeePerGas!=null&&l.maxPriorityFeePerGas!=null)if(n.authorizationList&&n.authorizationList.length?n.type=4:n.type=2,n.gasPrice!=null){let s=n.gasPrice;delete n.gasPrice,n.maxFeePerGas=s,n.maxPriorityFeePerGas=s}else n.maxFeePerGas==null&&(n.maxFeePerGas=l.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=l.maxPriorityFeePerGas);else l.gasPrice!=null?(C(!o,"network does not support EIP-1559","UNSUPPORTED_OPERATION",{operation:"populateTransaction"}),n.gasPrice==null&&(n.gasPrice=l.gasPrice),n.type=0):C(!1,"failed to get consistent fee data","UNSUPPORTED_OPERATION",{operation:"signer.getFeeData"});else(n.type===2||n.type===3||n.type===4)&&(n.maxFeePerGas==null&&(n.maxFeePerGas=l.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=l.maxPriorityFeePerGas))}return await Ge(n)}async populateAuthorization(e){let a=Object.assign({},e);return a.chainId==null&&(a.chainId=(await Fo(this,"getNetwork").getNetwork()).chainId),a.nonce==null&&(a.nonce=await this.getNonce()),a}async estimateGas(e){return Fo(this,"estimateGas").estimateGas(await this.populateCall(e))}async call(e){return Fo(this,"call").call(await this.populateCall(e))}async resolveName(e){return await Fo(this,"resolveName").resolveName(e)}async sendTransaction(e){let a=Fo(this,"sendTransaction"),n=await this.populateTransaction(e);delete n.from;let r=Ao.from(n);return await a.broadcastTransaction(await this.signTransaction(r))}authorize(e){C(!1,"authorization not implemented for this signer","UNSUPPORTED_OPERATION",{operation:"authorize"})}};function TB(t){return JSON.parse(JSON.stringify(t))}var dd=class{#e;#t;#a;#n;#r;#l;constructor(e){this.#e=e,this.#t=null,this.#a=this.#o.bind(this),this.#n=!1,this.#r=null,this.#l=!1}_subscribe(e){throw new Error("subclasses must override this")}_emitResults(e,a){throw new Error("subclasses must override this")}_recover(e){throw new Error("subclasses must override this")}async#o(e){try{this.#t==null&&(this.#t=this._subscribe(this.#e));let a=null;try{a=await this.#t}catch(o){if(!Be(o,"UNSUPPORTED_OPERATION")||o.operation!=="eth_newFilter")throw o}if(a==null){this.#t=null,this.#e._recoverSubscriber(this,this._recover(this.#e));return}let n=await this.#e.getNetwork();if(this.#r||(this.#r=n),this.#r.chainId!==n.chainId)throw new Error("chaid changed");if(this.#l)return;let r=await this.#e.send("eth_getFilterChanges",[a]);await this._emitResults(this.#e,r)}catch(a){console.log("@TODO",a)}this.#e.once("block",this.#a)}#s(){let e=this.#t;e&&(this.#t=null,e.then(a=>{this.#e.destroyed||this.#e.send("eth_uninstallFilter",[a])}))}start(){this.#n||(this.#n=!0,this.#o(-2))}stop(){this.#n&&(this.#n=!1,this.#l=!0,this.#s(),this.#e.off("block",this.#a))}pause(e){e&&this.#s(),this.#e.off("block",this.#a)}resume(){this.start()}},pd=class extends dd{#e;constructor(e,a){super(e),this.#e=TB(a)}_recover(e){return new Nr(e,this.#e)}async _subscribe(e){return await e.send("eth_newFilter",[this.#e])}async _emitResults(e,a){for(let n of a)e.emit(this.#e,e._wrapLog(n,e._network))}},hd=class extends dd{async _subscribe(e){return await e.send("eth_newPendingTransactionFilter",[])}async _emitResults(e,a){for(let n of a)e.emit("pending",n)}};var BB="bigint,boolean,function,number,string,symbol".split(/,/g);function md(t){if(t==null||BB.indexOf(typeof t)>=0||typeof t.getAddress=="function")return t;if(Array.isArray(t))return t.map(md);if(typeof t=="object")return Object.keys(t).reduce((e,a)=>(e[a]=t[a],e),{});throw new Error(`should not happen: ${t} (${typeof t})`)}function OB(t){return new Promise(e=>{setTimeout(e,t)})}function ms(t){return t&&t.toLowerCase()}function oA(t){return t&&typeof t.pollingInterval=="number"}var lA={polling:!1,staticNetwork:null,batchStallTime:10,batchMaxSize:1<<20,batchMaxCount:100,cacheTimeout:250,pollingInterval:4e3},gs=class extends au{address;constructor(e,a){super(e),a=V(a),M(this,{address:a})}connect(e){C(!1,"cannot reconnect JsonRpcSigner","UNSUPPORTED_OPERATION",{operation:"signer.connect"})}async getAddress(){return this.address}async populateTransaction(e){return await this.populateCall(e)}async sendUncheckedTransaction(e){let a=md(e),n=[];if(a.from){let o=a.from;n.push((async()=>{let l=await Ve(o,this.provider);b(l!=null&&l.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",e),a.from=l})())}else a.from=this.address;if(a.gasLimit==null&&n.push((async()=>{a.gasLimit=await this.provider.estimateGas({...a,from:this.address})})()),a.to!=null){let o=a.to;n.push((async()=>{a.to=await Ve(o,this.provider)})())}n.length&&await Promise.all(n);let r=this.provider.getRpcTransaction(a);return this.provider.send("eth_sendTransaction",[r])}async sendTransaction(e){let a=await this.provider.getBlockNumber(),n=await this.sendUncheckedTransaction(e);return await new Promise((r,o)=>{let l=[1e3,100],s=0,i=async()=>{try{let u=await this.provider.getTransaction(n);if(u!=null){r(u.replaceableTransaction(a));return}}catch(u){if(Be(u,"CANCELLED")||Be(u,"BAD_DATA")||Be(u,"NETWORK_ERROR")||Be(u,"UNSUPPORTED_OPERATION")){u.info==null&&(u.info={}),u.info.sendTransactionHash=n,o(u);return}if(Be(u,"INVALID_ARGUMENT")&&(s++,u.info==null&&(u.info={}),u.info.sendTransactionHash=n,s>10)){o(u);return}this.provider.emit("error",ue("failed to fetch transation after sending (will try again)","UNKNOWN_ERROR",{error:u}))}this.provider._setTimeout(()=>{i()},l.pop()||4e3)};i()})}async signTransaction(e){let a=md(e);if(a.from){let r=await Ve(a.from,this.provider);b(r!=null&&r.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",e),a.from=r}else a.from=this.address;let n=this.provider.getRpcTransaction(a);return await this.provider.send("eth_signTransaction",[n])}async signMessage(e){let a=typeof e=="string"?Bt(e):e;return await this.provider.send("personal_sign",[N(a),this.address.toLowerCase()])}async signTypedData(e,a,n){let r=md(n),o=await rs.resolveNames(e,a,r,async l=>{let s=await Ve(l);return b(s!=null,"TypedData does not support null address","value",l),s});return await this.provider.send("eth_signTypedData_v4",[this.address.toLowerCase(),JSON.stringify(rs.getPayload(o.domain,a,o.value))])}async unlock(e){return this.provider.send("personal_unlockAccount",[this.address.toLowerCase(),e,null])}async _legacySignMessage(e){let a=typeof e=="string"?Bt(e):e;return await this.provider.send("eth_sign",[this.address.toLowerCase(),N(a)])}},gd=class extends tu{#e;#t;#a;#n;#r;#l;#o;#s(){if(this.#n)return;let e=this._getOption("batchMaxCount")===1?0:this._getOption("batchStallTime");this.#n=setTimeout(()=>{this.#n=null;let a=this.#a;for(this.#a=[];a.length;){let n=[a.shift()];for(;a.length&&n.length!==this.#e.batchMaxCount;)if(n.push(a.shift()),JSON.stringify(n.map(o=>o.payload)).length>this.#e.batchMaxSize){a.unshift(n.pop());break}(async()=>{let r=n.length===1?n[0].payload:n.map(o=>o.payload);this.emit("debug",{action:"sendRpcPayload",payload:r});try{let o=await this._send(r);this.emit("debug",{action:"receiveRpcResult",result:o});for(let{resolve:l,reject:s,payload:i}of n){if(this.destroyed){s(ue("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:i.method}));continue}let u=o.filter(f=>f.id===i.id)[0];if(u==null){let f=ue("missing response for request","BAD_DATA",{value:o,info:{payload:i}});this.emit("error",f),s(f);continue}if("error"in u){s(this.getRpcError(i,u));continue}l(u.result)}}catch(o){this.emit("debug",{action:"receiveRpcError",error:o});for(let{reject:l}of n)l(o)}})()}},e)}constructor(e,a){super(e,a),this.#t=1,this.#e=Object.assign({},lA,a||{}),this.#a=[],this.#n=null,this.#l=null,this.#o=null;{let r=null,o=new Promise(l=>{r=l});this.#r={promise:o,resolve:r}}let n=this._getOption("staticNetwork");typeof n=="boolean"?(b(!n||e!=="any","staticNetwork cannot be used on special network \'any\'","options",a),n&&e!=null&&(this.#l=la.from(e))):n&&(b(e==null||n.matches(e),"staticNetwork MUST match network object","options",a),this.#l=n)}_getOption(e){return this.#e[e]}get _network(){return C(this.#l,"network is not available yet","NETWORK_ERROR"),this.#l}async _perform(e){if(e.method==="call"||e.method==="estimateGas"){let n=e.transaction;if(n&&n.type!=null&&D(n.type)&&n.maxFeePerGas==null&&n.maxPriorityFeePerGas==null){let r=await this.getFeeData();r.maxFeePerGas==null&&r.maxPriorityFeePerGas==null&&(e=Object.assign({},e,{transaction:Object.assign({},n,{type:void 0})}))}}let a=this.getRpcRequest(e);return a!=null?await this.send(a.method,a.args):super._perform(e)}async _detectNetwork(){let e=this._getOption("staticNetwork");if(e)if(e===!0){if(this.#l)return this.#l}else return e;return this.#o?await this.#o:this.ready?(this.#o=(async()=>{try{let a=la.from(D(await this.send("eth_chainId",[])));return this.#o=null,a}catch(a){throw this.#o=null,a}})(),await this.#o):(this.#o=(async()=>{let a={id:this.#t++,method:"eth_chainId",params:[],jsonrpc:"2.0"};this.emit("debug",{action:"sendRpcPayload",payload:a});let n;try{n=(await this._send(a))[0],this.#o=null}catch(r){throw this.#o=null,this.emit("debug",{action:"receiveRpcError",error:r}),r}if(this.emit("debug",{action:"receiveRpcResult",result:n}),"result"in n)return la.from(D(n.result));throw this.getRpcError(a,n)})(),await this.#o)}_start(){this.#r==null||this.#r.resolve==null||(this.#r.resolve(),this.#r=null,(async()=>{for(;this.#l==null&&!this.destroyed;)try{this.#l=await this._detectNetwork()}catch(e){if(this.destroyed)break;console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"),this.emit("error",ue("failed to bootstrap network detection","NETWORK_ERROR",{event:"initial-network-discovery",info:{error:e}})),await OB(1e3)}this.#s()})())}async _waitUntilReady(){if(this.#r!=null)return await this.#r.promise}_getSubscriber(e){return e.type==="pending"?new hd(this):e.type==="event"?this._getOption("polling")?new Nr(this,e.filter):new pd(this,e.filter):e.type==="orphan"&&e.filter.orphan==="drop-log"?new hs("orphan"):super._getSubscriber(e)}get ready(){return this.#r==null}getRpcTransaction(e){let a={};return["chainId","gasLimit","gasPrice","type","maxFeePerGas","maxPriorityFeePerGas","nonce","value"].forEach(n=>{if(e[n]==null)return;let r=n;n==="gasLimit"&&(r="gas"),a[r]=Tt(D(e[n],`tx.${n}`))}),["from","to","data"].forEach(n=>{e[n]!=null&&(a[n]=N(e[n]))}),e.accessList&&(a.accessList=ra(e.accessList)),e.blobVersionedHashes&&(a.blobVersionedHashes=e.blobVersionedHashes.map(n=>n.toLowerCase())),e.authorizationList&&(a.authorizationList=e.authorizationList.map(n=>{let r=zi(n);return{address:r.address,nonce:Tt(r.nonce),chainId:Tt(r.chainId),yParity:Tt(r.signature.yParity),r:Tt(r.signature.r),s:Tt(r.signature.s)}})),a}getRpcRequest(e){switch(e.method){case"chainId":return{method:"eth_chainId",args:[]};case"getBlockNumber":return{method:"eth_blockNumber",args:[]};case"getGasPrice":return{method:"eth_gasPrice",args:[]};case"getPriorityFee":return{method:"eth_maxPriorityFeePerGas",args:[]};case"getBalance":return{method:"eth_getBalance",args:[ms(e.address),e.blockTag]};case"getTransactionCount":return{method:"eth_getTransactionCount",args:[ms(e.address),e.blockTag]};case"getCode":return{method:"eth_getCode",args:[ms(e.address),e.blockTag]};case"getStorage":return{method:"eth_getStorageAt",args:[ms(e.address),"0x"+e.position.toString(16),e.blockTag]};case"broadcastTransaction":return{method:"eth_sendRawTransaction",args:[e.signedTransaction]};case"getBlock":if("blockTag"in e)return{method:"eth_getBlockByNumber",args:[e.blockTag,!!e.includeTransactions]};if("blockHash"in e)return{method:"eth_getBlockByHash",args:[e.blockHash,!!e.includeTransactions]};break;case"getTransaction":return{method:"eth_getTransactionByHash",args:[e.hash]};case"getTransactionReceipt":return{method:"eth_getTransactionReceipt",args:[e.hash]};case"call":return{method:"eth_call",args:[this.getRpcTransaction(e.transaction),e.blockTag]};case"estimateGas":return{method:"eth_estimateGas",args:[this.getRpcTransaction(e.transaction)]};case"getLogs":return e.filter&&e.filter.address!=null&&(Array.isArray(e.filter.address)?e.filter.address=e.filter.address.map(ms):e.filter.address=ms(e.filter.address)),{method:"eth_getLogs",args:[e.filter]}}return null}getRpcError(e,a){let{method:n}=e,{error:r}=a;if(n==="eth_estimateGas"&&r.message){let s=r.message;if(!s.match(/revert/i)&&s.match(/insufficient funds/i))return ue("insufficient funds","INSUFFICIENT_FUNDS",{transaction:e.params[0],info:{payload:e,error:r}});if(s.match(/nonce/i)&&s.match(/too low/i))return ue("nonce has already been used","NONCE_EXPIRED",{transaction:e.params[0],info:{payload:e,error:r}})}if(n==="eth_call"||n==="eth_estimateGas"){let s=Fg(r),i=Er.getBuiltinCallException(n==="eth_call"?"call":"estimateGas",e.params[0],s?s.data:null);return i.info={error:r,payload:e},i}let o=JSON.stringify(NB(r));if(typeof r.message=="string"&&r.message.match(/user denied|ethers-user-denied/i))return ue("user rejected action","ACTION_REJECTED",{action:{eth_sign:"signMessage",personal_sign:"signMessage",eth_signTypedData_v4:"signTypedData",eth_signTransaction:"signTransaction",eth_sendTransaction:"sendTransaction",eth_requestAccounts:"requestAccess",wallet_requestAccounts:"requestAccess"}[n]||"unknown",reason:"rejected",info:{payload:e,error:r}});if(n==="eth_sendRawTransaction"||n==="eth_sendTransaction"){let s=e.params[0];if(o.match(/insufficient funds|base fee exceeds gas limit/i))return ue("insufficient funds for intrinsic transaction cost","INSUFFICIENT_FUNDS",{transaction:s,info:{error:r}});if(o.match(/nonce/i)&&o.match(/too low/i))return ue("nonce has already been used","NONCE_EXPIRED",{transaction:s,info:{error:r}});if(o.match(/replacement transaction/i)&&o.match(/underpriced/i))return ue("replacement fee too low","REPLACEMENT_UNDERPRICED",{transaction:s,info:{error:r}});if(o.match(/only replay-protected/i))return ue("legacy pre-eip-155 transactions not supported","UNSUPPORTED_OPERATION",{operation:n,info:{transaction:s,info:{error:r}}})}let l=!!o.match(/the method .* does not exist/i);return l||r&&r.details&&r.details.startsWith("Unauthorized method:")&&(l=!0),l?ue("unsupported operation","UNSUPPORTED_OPERATION",{operation:e.method,info:{error:r,payload:e}}):ue("could not coalesce error","UNKNOWN_ERROR",{error:r,payload:e})}send(e,a){if(this.destroyed)return Promise.reject(ue("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:e}));let n=this.#t++,r=new Promise((o,l)=>{this.#a.push({resolve:o,reject:l,payload:{method:e,params:a,id:n,jsonrpc:"2.0"}})});return this.#s(),r}async getSigner(e){e==null&&(e=0);let a=this.send("eth_accounts",[]);if(typeof e=="number"){let r=await a;if(e>=r.length)throw new Error("no such account");return new gs(this,r[e])}let{accounts:n}=await Ge({network:this.getNetwork(),accounts:a});e=V(e);for(let r of n)if(V(r)===e)return new gs(this,e);throw new Error("invalid account")}async listAccounts(){return(await this.send("eth_accounts",[])).map(a=>new gs(this,a))}destroy(){this.#n&&(clearTimeout(this.#n),this.#n=null);for(let{payload:e,reject:a}of this.#a)a(ue("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:e.method}));this.#a=[],super.destroy()}},xd=class extends gd{#e;constructor(e,a){super(e,a);let n=this._getOption("pollingInterval");n==null&&(n=lA.pollingInterval),this.#e=n}_getSubscriber(e){let a=super._getSubscriber(e);return oA(a)&&(a.pollingInterval=this.#e),a}get pollingInterval(){return this.#e}set pollingInterval(e){if(!Number.isInteger(e)||e<0)throw new Error("invalid interval");this.#e=e,this._forEachSubscriber(a=>{oA(a)&&(a.pollingInterval=this.#e)})}};function Fg(t){if(t==null)return null;if(typeof t.message=="string"&&t.message.match(/revert/i)&&Z(t.data))return{message:t.message,data:t.data};if(typeof t=="object"){for(let e in t){let a=Fg(t[e]);if(a)return a}return null}if(typeof t=="string")try{return Fg(JSON.parse(t))}catch{}return null}function qg(t,e){if(t!=null){if(typeof t.message=="string"&&e.push(t.message),typeof t=="object")for(let a in t)qg(t[a],e);if(typeof t=="string")try{return qg(JSON.parse(t),e)}catch{}}}function NB(t){let e=[];return qg(t,e),e}var xs=class t extends xd{#e;#t;constructor(e,a,n){let r=Object.assign({},n??{},{batchMaxCount:1});b(e&&e.request,"invalid EIP-1193 provider","ethereum",e),super(a,r),this.#t=null,n&&n.providerInfo&&(this.#t=n.providerInfo),this.#e=async(o,l)=>{let s={method:o,params:l};this.emit("debug",{action:"sendEip1193Request",payload:s});try{let i=await e.request(s);return this.emit("debug",{action:"receiveEip1193Result",result:i}),i}catch(i){let u=new Error(i.message);throw u.code=i.code,u.data=i.data,u.payload=s,this.emit("debug",{action:"receiveEip1193Error",error:u}),u}}}get providerInfo(){return this.#t}async send(e,a){return await this._start(),await super.send(e,a)}async _send(e){b(!Array.isArray(e),"EIP-1193 does not support batch request","payload",e);try{let a=await this.#e(e.method,e.params||[]);return[{id:e.id,result:a}]}catch(a){return[{id:e.id,error:{code:a.code,data:a.data,message:a.message}}]}}getRpcError(e,a){switch(a=JSON.parse(JSON.stringify(a)),a.error.code||-1){case 4001:a.error.message=`ethers-user-denied: ${a.error.message}`;break;case 4200:a.error.message=`ethers-unsupported: ${a.error.message}`;break}return super.getRpcError(e,a)}async hasSigner(e){e==null&&(e=0);let a=await this.send("eth_accounts",[]);return typeof e=="number"?a.length>e:(e=e.toLowerCase(),a.filter(n=>n.toLowerCase()===e).length!==0)}async getSigner(e){if(e==null&&(e=0),!await this.hasSigner(e))try{await this.#e("eth_requestAccounts",[])}catch(a){let n=a.payload;throw this.getRpcError(n,{id:n.id,error:a})}return await super.getSigner(e)}static async discover(e){if(e==null&&(e={}),e.provider)return new t(e.provider);let a=e.window?e.window:typeof window<"u"?window:null;if(a==null)return null;let n=e.anyProvider;if(n&&a.ethereum)return new t(a.ethereum);if(!("addEventListener"in a&&"dispatchEvent"in a&&"removeEventListener"in a))return null;let r=e.timeout?e.timeout:300;return r===0?null:await new Promise((o,l)=>{let s=[],i=d=>{s.push(d.detail),n&&u()},u=()=>{if(clearTimeout(f),s.length)if(e&&e.filter){let d=e.filter(s.map(p=>Object.assign({},p.info)));if(d==null)o(null);else if(d instanceof t)o(d);else{let p=null;if(d.uuid&&(p=s.filter(w=>d.uuid===w.info.uuid)[0]),p){let{provider:h,info:w}=p;o(new t(h,void 0,{providerInfo:w}))}else l(ue("filter returned unknown info","UNSUPPORTED_OPERATION",{value:d}))}}else{let{provider:d,info:p}=s[0];o(new t(d,void 0,{providerInfo:p}))}else o(null);a.removeEventListener("eip6963:announceProvider",i)},f=setTimeout(()=>{u()},r);a.addEventListener("eip6963:announceProvider",i),a.dispatchEvent(new Event("eip6963:requestProvider"))})}};var bd=pu(jo());var sA=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),yd=(...t)=>t.filter((e,a,n)=>!!e&&e.trim()!==""&&n.indexOf(e)===a).join(" ").trim();var nu=pu(jo());var iA={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var uA=(0,nu.forwardRef)(({color:t="currentColor",size:e=24,strokeWidth:a=2,absoluteStrokeWidth:n,className:r="",children:o,iconNode:l,...s},i)=>(0,nu.createElement)("svg",{ref:i,...iA,width:e,height:e,stroke:t,strokeWidth:n?Number(a)*24/Number(e):a,className:yd("lucide",r),...s},[...l.map(([u,f])=>(0,nu.createElement)(u,f)),...Array.isArray(o)?o:[o]]));var K=(t,e)=>{let a=(0,bd.forwardRef)(({className:n,...r},o)=>(0,bd.createElement)(uA,{ref:o,iconNode:e,className:yd(`lucide-${sA(t)}`,n),...r}));return a.displayName=`${t}`,a};var kr=K("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);var On=K("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);var Dr=K("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);var an=K("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);var Ur=K("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);var ru=K("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);var qo=K("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var ys=K("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var ou=K("FileVideo",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m10 11 5 3-5 3v-6Z",key:"7ntvm4"}]]);var Nn=K("Layers",[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]]);var lu=K("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);var su=K("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);var Go=K("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);var _o=K("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);var iu=K("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var Mr=K("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);var uu=K("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);var fu=K("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var Vo=K("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);var bs=K("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);var ws=K("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);var Ls=K("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var fA="https://public-01.testnet.bifrostnetwork.com/rpc",cA="https://public-02.testnet.bifrostnetwork.com/rpc",dA=["function advertiser() view returns(address)","function rightsHolder() view returns(address)","function platform() view returns(address)","function cad() view returns(address)","function status() view returns(uint8)","function videoHash() view returns(bytes32)","function executionDeadline() view returns(uint256)","function usageEnd() view returns(uint256)","function RIGHTS_FEE() view returns(uint256)","function PLATFORM_FEE() view returns(uint256)","function TOTAL_FEE() view returns(uint256)","function EXECUTION_WINDOW() view returns(uint256)","function USAGE_PERIOD() view returns(uint256)","function escrowBalance() view returns(uint256)","function registerAd(bytes32)","function deposit()","function approveUse()","function rejectUse()","function activateAd(bytes32)","function refund()","function isPublishable(bytes32) view returns(bool)","event AdRegistered(bytes32 indexed videoHash,uint256 executionDeadline)","event EscrowFunded(address indexed advertiser,uint256 amount)","event UseApproved(address indexed rightsHolder)","event UseRejected(address indexed rightsHolder)","event AdActivated(bytes32 indexed videoHash,uint256 usageEnd)","event EscrowRefunded(address indexed advertiser,uint256 amount)"],wd=["function approve(address,uint256) returns(bool)","function allowance(address,address) view returns(uint256)","function balanceOf(address) view returns(uint256)","function decimals() view returns(uint8)","function symbol() view returns(string)"],kB=["\\uB4F1\\uB85D \\uC804","\\uC608\\uCE58 \\uB300\\uAE30","\\uC2B9\\uC778 \\uB300\\uAE30","\\uC9D1\\uD589 \\uB300\\uAE30","\\uAC8C\\uC2DC \\uC911","\\uC0AC\\uC6A9 \\uAC70\\uC808","\\uD658\\uBD88 \\uC644\\uB8CC"],sa=(t,e)=>!!t&&!!e&&t.toLowerCase()===e.toLowerCase();function Gg(t,e){return["advertiser","rightsHolder","platform"].find(a=>sa(t[a],e))||"public"}function cu(t,e=Date.now()/1e3){return t.status===4&&e>Number(t.usageEnd)?"\\uAE30\\uAC04 \\uC885\\uB8CC":[1,2,3].includes(t.status)&&e>Number(t.executionDeadline)?"\\uC9D1\\uD589 \\uAE30\\uD55C \\uC885\\uB8CC":kB[t.status]||"\\uC870\\uD68C \\uBD88\\uAC00"}function Pr(t,e,a,n=Date.now()/1e3){let r=n>Number(t.executionDeadline);return{approve:e==="advertiser"&&t.status===1&&!r,deposit:e==="advertiser"&&t.status===1&&!r,approveUse:e==="rightsHolder"&&t.status===2&&!r,rejectUse:e==="rightsHolder"&&[2,3].includes(t.status),activateAd:e==="platform"&&t.status===3&&!r,refund:e==="advertiser"&&[2,3,5].includes(t.status)&&(t.status===5||r)}[a]||!1}var du=t=>t?t.slice(0,6)+"\\u2026"+t.slice(-4):"\\uC5F0\\uACB0 \\uC804",Vg=t=>Number(t)?new Date(Number(t)*1e3).toLocaleString("ko-KR",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"\\u2014",zr={public:{name:"\\uC804\\uCCB4 \\uAD11\\uACE0",en:"AD DISCOVER",title:c.default.createElement(c.default.Fragment,null,"\\uB3D9\\uC758\\uAC00 \\uBAA8\\uC774\\uBA74,",c.default.createElement("br",null),"\\uAD11\\uACE0\\uAC00 \\uC2DC\\uC791\\uB429\\uB2C8\\uB2E4."),desc:"\\uC601\\uC0C1 \\uB4F1\\uB85D\\uBD80\\uD130 \\uC2B9\\uC778, \\uC9D1\\uD589\\uACFC \\uC815\\uC0B0\\uAE4C\\uC9C0. \\uAD11\\uACE0\\uC758 \\uBAA8\\uB4E0 \\uACFC\\uC815\\uC744 \\uD22C\\uBA85\\uD558\\uAC8C \\uD655\\uC778\\uD558\\uC138\\uC694."},advertiser:{name:"\\uAD11\\uACE0\\uC8FC",en:"ADVERTISER",title:c.default.createElement(c.default.Fragment,null,"\\uC544\\uC774\\uB514\\uC5B4\\uB97C \\uB4F1\\uB85D\\uD558\\uACE0,",c.default.createElement("br",null),"\\uC2E0\\uB8B0\\uB97C \\uC313\\uC544\\uBCF4\\uC138\\uC694."),desc:"\\uB0B4\\uAC00 \\uB4F1\\uB85D\\uD55C \\uAD11\\uACE0\\uB97C \\uBAA8\\uC544\\uBCF4\\uACE0, \\uAD11\\uACE0\\uBE44 \\uC608\\uCE58\\uC640 \\uD658\\uBD88\\uC744 \\uAD00\\uB9AC\\uD558\\uC138\\uC694."},rightsHolder:{name:"\\uAD8C\\uB9AC\\uC790",en:"RIGHTS HOLDER",title:c.default.createElement(c.default.Fragment,null,"\\uB0B4 \\uBAA9\\uC18C\\uB9AC\\uC640 \\uC5BC\\uAD74,",c.default.createElement("br",null),"\\uB0B4 \\uB3D9\\uC758\\uB85C \\uC2DC\\uC791\\uD569\\uB2C8\\uB2E4."),desc:"\\uB0B4 \\uAD8C\\uB9AC\\uAC00 \\uD3EC\\uD568\\uB41C \\uC601\\uC0C1\\uC744 \\uD655\\uC778\\uD558\\uACE0, \\uAD11\\uACE0 \\uC0AC\\uC6A9\\uC744 \\uC2B9\\uC778\\uD558\\uAC70\\uB098 \\uAC70\\uC808\\uD558\\uC138\\uC694."},platform:{name:"\\uD50C\\uB7AB\\uD3FC",en:"PLATFORM",title:c.default.createElement(c.default.Fragment,null,"\\uD655\\uC778\\uB41C \\uB3D9\\uC758\\uB85C,",c.default.createElement("br",null),"\\uCC45\\uC784 \\uC788\\uAC8C \\uC9D1\\uD589\\uD558\\uC138\\uC694."),desc:"\\uAD8C\\uB9AC\\uC790 \\uC2B9\\uC778\\uACFC \\uC601\\uC0C1 \\uD574\\uC2DC\\uB97C \\uD655\\uC778\\uD558\\uACE0, \\uAD11\\uACE0 \\uAC8C\\uC2DC\\uC640 \\uC815\\uC0B0\\uC744 \\uC9C4\\uD589\\uD558\\uC138\\uC694."}},DB=[["\\uC628\\uC804\\uD788 \\uB098\\uB2E4\\uC6B4, \\uC624\\uB298\\uC758 \\uBAA9\\uC18C\\uB9AC","\\uB77C\\uC774\\uD504\\uC2A4\\uD0C0\\uC77C",3,"lime","VOICE / ORIGINAL"],["\\uC0C8\\uB85C\\uC6B4 \\uD558\\uB8E8\\uB97C \\uC5EC\\uB294 \\uD55C \\uC794","\\uC74C\\uB8CC\\xB7\\uC2DD\\uD488",2,"peach","A GOOD START"],["\\uB3C4\\uC2DC\\uB97C \\uB2EC\\uB9AC\\uB294 \\uC0C8\\uB85C\\uC6B4 \\uBC29\\uC2DD","\\uBAA8\\uBE4C\\uB9AC\\uD2F0",4,"blue","MOVE FORWARD"],["\\uD53C\\uBD80\\uC5D0 \\uB2FF\\uB294 \\uC791\\uC740 \\uBCC0\\uD654","\\uBDF0\\uD2F0",1,"pink","LESS, BUT BETTER"],["\\uC6B0\\uB9AC\\uC758 \\uB0B4\\uC77C\\uC744 \\uC704\\uD55C \\uC120\\uD0DD","\\uBE0C\\uB79C\\uB4DC",5,"sand","FOR TOMORROW"],["\\uB4E3\\uACE0 \\uC2F6\\uC740 \\uC21C\\uAC04\\uC744 \\uB2F4\\uB2E4","\\uD14C\\uD06C",6,"purple","SOUND OF YOU"]].map((t,e)=>({address:"0x"+String(e+1).padStart(40,"0"),title:t[0],category:t[1],status:t[2],theme:t[3],art:t[4],advertiser:"0x49fCca18488eB17276E76D8FFFbE84D6d3ca9cC9",rightsHolder:"0x258df63a63c39682481f0A5d74c8B3fAf7Edf6Bf",platform:"0x292B2005f82De524121b147000642780e423A479",RIGHTS_FEE:"200",PLATFORM_FEE:"800",TOTAL_FEE:"1000",EXECUTION_WINDOW:"604800",USAGE_PERIOD:"2592000",escrowBalance:[2,3].includes(t[2])?"1000":"0",executionDeadline:Math.floor(Date.now()/1e3)+86400*(e+1),usageEnd:Math.floor(Date.now()/1e3)+86400*30,videoHash:"0x"+"1".repeat(64),playable:t[2]===4,hasVideo:!1,demo:!0,blockNumber:123456+e}));async function Ca(t,e={}){let a=await fetch("/api"+t,{...e,headers:e.body instanceof FormData?e.headers:{"Content-Type":"application/json",...e.headers}}),n=await a.json();if(!a.ok)throw new Error(n.error||"\\uC694\\uCCAD \\uC2E4\\uD328");return n}function Qg(t){let e=t.reason||t.shortMessage||t.message||String(t),a={"Deposit first":"\\uBA3C\\uC800 \\uAD11\\uACE0\\uBE44\\uB97C \\uC608\\uCE58\\uD574\\uC8FC\\uC138\\uC694.","Not approved":"\\uAD8C\\uB9AC\\uC790 \\uC2B9\\uC778 \\uD6C4 \\uC9D1\\uD589\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4.","Only rights holder":"\\uC9C0\\uC815\\uB41C \\uAD8C\\uB9AC\\uC790 \\uC9C0\\uAC11\\uC73C\\uB85C \\uC5F0\\uACB0\\uD574\\uC8FC\\uC138\\uC694.","Only advertiser":"\\uC9C0\\uC815\\uB41C \\uAD11\\uACE0\\uC8FC \\uC9C0\\uAC11\\uC73C\\uB85C \\uC5F0\\uACB0\\uD574\\uC8FC\\uC138\\uC694.","Only platform":"\\uC9C0\\uC815\\uB41C \\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAC11\\uC73C\\uB85C \\uC5F0\\uACB0\\uD574\\uC8FC\\uC138\\uC694.","Deadline passed":"\\uC9D1\\uD589 \\uAE30\\uD55C\\uC774 \\uC9C0\\uB0AC\\uC2B5\\uB2C8\\uB2E4. \\uC608\\uCE58\\uAE08 \\uD658\\uBD88\\uC744 \\uD655\\uC778\\uD558\\uC138\\uC694.","Video hash mismatch":"\\uC601\\uC0C1 \\uD574\\uC2DC\\uAC00 \\uB2E4\\uB985\\uB2C8\\uB2E4. \\uB4F1\\uB85D\\uD55C \\uC6D0\\uBCF8 \\uD30C\\uC77C\\uC744 \\uC120\\uD0DD\\uD558\\uC138\\uC694.",ERC20InsufficientAllowance:"CAD \\uC9C0\\uCD9C \\uD5C8\\uC6A9 \\uD55C\\uB3C4\\uAC00 \\uBD80\\uC871\\uD569\\uB2C8\\uB2E4. \\uC9C0\\uCD9C \\uD5C8\\uC6A9 \\uD6C4 \\uC608\\uCE58\\uD558\\uC138\\uC694.",ERC20InsufficientBalance:"CAD \\uC794\\uC561\\uC774 \\uBD80\\uC871\\uD569\\uB2C8\\uB2E4.","user rejected":"MetaMask \\uC694\\uCCAD\\uC744 \\uCDE8\\uC18C\\uD588\\uC2B5\\uB2C8\\uB2E4.","insufficient funds":"\\uC218\\uC218\\uB8CC\\uC6A9 \\uD14C\\uC2A4\\uD2B8 BFC\\uAC00 \\uBD80\\uC871\\uD569\\uB2C8\\uB2E4."};for(let[n,r]of Object.entries(a))if(e.includes(n))return r;return e.slice(0,250)}async function Ld(t){let e=await crypto.subtle.digest("SHA-256",await t.arrayBuffer());return"0x"+Array.from(new Uint8Array(e),a=>a.toString(16).padStart(2,"0")).join("")}async function mA(t){return new Promise((e,a)=>{let n=document.createElement("video"),r=URL.createObjectURL(t);n.muted=!0,n.preload="auto",n.src=r;let o=!1,l=setTimeout(()=>s(new Error("\\uC601\\uC0C1 \\uBBF8\\uB9AC\\uBCF4\\uAE30\\uB97C \\uC77D\\uC9C0 \\uBABB\\uD588\\uC2B5\\uB2C8\\uB2E4. \\uB2E4\\uB978 MP4 \\uD30C\\uC77C\\uC744 \\uC0AC\\uC6A9\\uD558\\uC138\\uC694.")),15e3);function s(i,u){o||(o=!0,clearTimeout(l),URL.revokeObjectURL(r),n.removeAttribute("src"),n.load(),i?a(i):e(u))}n.onloadedmetadata=()=>{n.currentTime=Math.min(1,(n.duration||2)/2)},n.onseeked=()=>{try{let i=document.createElement("canvas");i.width=640,i.height=360;let u=i.getContext("2d");u.fillStyle="#254b42",u.fillRect(0,0,640,360),u.filter="blur(24px)",u.drawImage(n,-24,-24,688,408),u.filter="none",u.fillStyle="rgba(14,39,33,.18)",u.fillRect(0,0,640,360),i.toBlob(f=>s(f?null:new Error("\\uC378\\uB124\\uC77C \\uC0DD\\uC131 \\uC2E4\\uD328"),f),"image/jpeg",.75)}catch(i){s(i)}},n.onerror=()=>s(new Error("\\uBE0C\\uB77C\\uC6B0\\uC800\\uAC00 \\uC77D\\uC744 \\uC218 \\uC788\\uB294 MP4 \\uD30C\\uC77C\\uC744 \\uC0AC\\uC6A9\\uD558\\uC138\\uC694."))})}function vd({icon:t,label:e,...a}){return c.default.createElement("button",{className:"icon-button","aria-label":e,title:e,...a},c.default.createElement(t,{size:18}))}function Ad({title:t,children:e,onClose:a,wide:n=!1}){return(0,c.useEffect)(()=>{let r=l=>{l.key==="Escape"&&a()};document.addEventListener("keydown",r);let o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.removeEventListener("keydown",r),document.body.style.overflow=o}},[]),c.default.createElement("div",{className:"overlay",onClick:a},c.default.createElement("section",{role:"dialog","aria-modal":"true","aria-label":t,className:"modal "+(n?"wide":""),onClick:r=>r.stopPropagation()},c.default.createElement("div",{className:"modal-head"},c.default.createElement("h2",null,t),c.default.createElement(vd,{icon:Ls,label:"\\uB2EB\\uAE30",onClick:a})),e))}function UB(){let[t,e]=(0,c.useState)(location.hash.slice(1)||"public"),[a,n]=(0,c.useState)(""),[r,o]=(0,c.useState)(""),[l,s]=(0,c.useState)(null),[i,u]=(0,c.useState)([]),[f,d]=(0,c.useState)(!1),[p,h]=(0,c.useState)(!0),[w,y]=(0,c.useState)(""),[v,m]=(0,c.useState)(""),[g,x]=(0,c.useState)("\\uC804\\uCCB4"),[L,A]=(0,c.useState)(null),[T,E]=(0,c.useState)(""),[I,P]=(0,c.useState)(""),[k,H]=(0,c.useState)(null),[F,ee]=(0,c.useState)("mine"),[Fe,S]=(0,c.useState)(localStorage.getItem("consent-cad")||""),[U,G]=(0,c.useState)([]),Y=zr[t]||zr.public;(0,c.useEffect)(()=>{let O=()=>e(zr[location.hash.slice(1)]?location.hash.slice(1):"public");return window.addEventListener("hashchange",O),()=>window.removeEventListener("hashchange",O)},[]);function oe(O){e(O),location.hash=O,ee("mine"),x("\\uC804\\uCCB4"),m(""),E("")}function Te(O="create"){oe("advertiser"),E(O)}async function Ne(){h(!0),y("");try{let O=[],te;do{let se=await Ca("/ads"+(te?"?cursor="+encodeURIComponent(te):""));O.push(...se.ads),te=se.cursor}while(te);if(u(O),L&&!L.demo){let se=O.find(Je=>sa(Je.address,L.address));se&&A(se)}}catch(O){y(Qg(O))}finally{h(!1)}}(0,c.useEffect)(()=>{if(Ne(),Ca("/session").then(O=>o(O.address||"")).catch(()=>{}),window.ethereum){window.ethereum.request({method:"eth_accounts"}).then(se=>n(se[0]||"")),window.ethereum.request({method:"eth_chainId"}).then(se=>s(Number(se)));let O=se=>{n(se[0]||""),o(""),Ca("/auth/logout",{method:"POST"}).catch(()=>{}),H({type:"info",text:"\\uC9C0\\uAC11\\uC774 \\uBC14\\uB00C\\uC5C8\\uC2B5\\uB2C8\\uB2E4. \\uC6D0\\uBCF8 \\uAC80\\uD1A0 \\uC804 \\uB2E4\\uC2DC \\uBCF8\\uC778 \\uD655\\uC778\\uC744 \\uD574\\uC8FC\\uC138\\uC694."})},te=se=>{s(Number(se)),o(""),Ca("/auth/logout",{method:"POST"}).catch(()=>{})};return window.ethereum.on("accountsChanged",O),window.ethereum.on("chainChanged",te),()=>{window.ethereum.removeListener("accountsChanged",O),window.ethereum.removeListener("chainChanged",te)}}},[]),(0,c.useEffect)(()=>{let O=setInterval(()=>{f||Ne()},3e4);return()=>clearInterval(O)},[f,L?.address]),(0,c.useEffect)(()=>{if(!k)return;let O=setTimeout(()=>H(null),9e3);return()=>clearTimeout(O)},[k]);async function Ue(){if(!window.ethereum)throw new Error("MetaMask\\uAC00 \\uC124\\uCE58\\uB41C Chrome\\uC5D0\\uC11C \\uC0AC\\uC774\\uD2B8\\uB97C \\uC5F4\\uC5B4\\uC8FC\\uC138\\uC694.");if(Number(await window.ethereum.request({method:"eth_chainId"}))!==49088)throw new Error("Bifrost Testnet(49088)\\uC73C\\uB85C \\uB124\\uD2B8\\uC6CC\\uD06C\\uB97C \\uC804\\uD658\\uD574\\uC8FC\\uC138\\uC694.");let te=new xs(window.ethereum),se=await te.getSigner(),Je=await se.getAddress();return n(Je),{p:te,signer:se,address:Je}}async function Gt(){if(!window.ethereum)throw new Error("MetaMask\\uB97C \\uBA3C\\uC800 \\uC124\\uCE58\\uD574\\uC8FC\\uC138\\uC694.");try{await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:"0xbfc0"}]})}catch(O){if(O.code===4902)await window.ethereum.request({method:"wallet_addEthereumChain",params:[{chainId:"0xbfc0",chainName:"Bifrost Testnet",rpcUrls:[fA,cA],nativeCurrency:{name:"BFC",symbol:"BFC",decimals:18}}]});else throw O}s(49088)}async function _t(){await window.ethereum?.request({method:"eth_requestAccounts"}),await Gt();let{signer:O,address:te}=await Ue();P("\\uC9C0\\uAC11 \\uC11C\\uBA85 \\uD655\\uC778 \\uC911");let se=await Ca("/auth/nonce",{method:"POST",body:JSON.stringify({address:te})}),Je=await O.signMessage(se.message),Ia=await Ca("/auth/verify",{method:"POST",body:JSON.stringify({nonce:se.nonce,signature:Je})});o(Ia.address),H({type:"success",text:"\\uC9C0\\uAC11 \\uBCF8\\uC778 \\uD655\\uC778 \\uC644\\uB8CC. \\uB0B4 \\uAD11\\uACE0\\uC640 \\uAC80\\uD1A0\\uC6A9 \\uC601\\uC0C1\\uC5D0 \\uC811\\uADFC\\uD560 \\uC218 \\uC788\\uC5B4\\uC694."})}async function Nt(O,te){if(!I){P(O);try{await te()}catch(se){H({type:"error",text:Qg(se)})}finally{P("")}}}async function Sa(){let{address:O}=await Ue();return sa(r,O)||await _t(),O}async function Vt(O,te){let se=O.hash;G(Ia=>[{hash:se,label:te,state:"pending"},...Ia].slice(0,20)),P(te+" \\xB7 \\uAC70\\uB798 \\uD655\\uC815 \\uB300\\uAE30");let Je;try{if(Je=await O.wait(),!Je||Je.status!==1)throw new Error("\\uAC70\\uB798\\uAC00 \\uC2E4\\uD328\\uD588\\uC2B5\\uB2C8\\uB2E4.")}catch(Ia){throw G(Rr=>Rr.map(rn=>rn.hash===se?{...rn,state:"failed"}:rn)),Ia}return G(Ia=>Ia.map(Rr=>Rr.hash===se?{...Rr,state:"success"}:Rr)),H({type:"success",text:te+" \\uC644\\uB8CC \\xB7 \\uBE14\\uB85D "+Je.blockNumber}),Je}async function vs(O,te,se){await Sa();let{signer:Je,address:Ia}=await Ue();if(!Pr(O,Gg(O,Ia),te))throw new Error("\\uD604\\uC7AC \\uC0C1\\uD0DC \\uB610\\uB294 \\uC5F0\\uACB0\\uD55C \\uC9C0\\uAC11\\uC5D0\\uC11C \\uC2E4\\uD589\\uD560 \\uC218 \\uC5C6\\uC2B5\\uB2C8\\uB2E4.");let Rr=new qt(O.address,dA,Je);if(te==="approve"){let rn=new qt(O.cad,wd,Je),gA=await rn.decimals();if(Number(gA)!==0)throw new Error("\\uC18C\\uC218\\uC810 0\\uC790\\uB9AC CADToken\\uC744 \\uC5F0\\uACB0\\uD574\\uC8FC\\uC138\\uC694.");await Vt(await rn.approve(O.address,BigInt(O.TOTAL_FEE)),"CAD \\uC9C0\\uCD9C \\uD5C8\\uC6A9")}else{if(te==="deposit"){let rn=new qt(O.cad,wd,Je);if(await rn.balanceOf(Ia)<BigInt(O.TOTAL_FEE))throw new Error("CAD \\uC794\\uC561\\uC774 \\uBD80\\uC871\\uD569\\uB2C8\\uB2E4.");if(await rn.allowance(Ia,O.address)<BigInt(O.TOTAL_FEE))throw new Error("\\uBA3C\\uC800 CAD \\uC9C0\\uCD9C \\uD5C8\\uC6A9\\uC744 \\uC2E4\\uD589\\uD574\\uC8FC\\uC138\\uC694.")}if(te==="activateAd"&&!sa(se,O.videoHash))throw new Error("Video hash mismatch");await Vt(await Rr[te](...te==="activateAd"?[se]:[]),{deposit:"\\uAD11\\uACE0\\uBE44 \\uC608\\uCE58",approveUse:"\\uAD11\\uACE0 \\uC0AC\\uC6A9 \\uC2B9\\uC778",rejectUse:"\\uAD11\\uACE0 \\uC0AC\\uC6A9 \\uAC70\\uC808",activateAd:"\\uAD11\\uACE0 \\uC9D1\\uD589 \\xB7 \\uC815\\uC0B0",refund:"\\uC608\\uCE58\\uAE08 \\uD658\\uBD88"}[te])}await Ne()}let Lt=f?DB:i,nn=t==="public"||F==="all"?Lt:Lt.filter(O=>sa(O[t],a)),Qo=nn.filter(O=>(g==="\\uC804\\uCCB4"||cu(O)===g)&&(O.title+" "+O.category+" "+O.address).toLowerCase().includes(v.toLowerCase())),ia=Lt.filter(O=>O.status===4&&cu(O)==="\\uAC8C\\uC2DC \\uC911").length,kn=Lt.filter(O=>[1,2,3].includes(O.status)).length;return c.default.createElement("div",{className:"app-shell","data-page":t},c.default.createElement("div",{className:"network-strip"},c.default.createElement("span",{className:"dot"}),"BIFROST TESTNET ",c.default.createElement("span",{className:"strip-divider"},"/")," \\uB3D9\\uC758\\uC640 \\uC815\\uC0B0\\uC744 \\uC5F0\\uACB0\\uD558\\uB294 \\uAD11\\uACE0 \\uD50C\\uB7AB\\uD3FC ",c.default.createElement("span",{className:"strip-right"},f?"\\uC608\\uC2DC \\uB370\\uC774\\uD130":"ON-CHAIN AD WORKSPACE")),c.default.createElement("header",null,c.default.createElement("a",{className:"brand",href:"#public",onClick:()=>oe("public")},c.default.createElement("span",{className:"brand-mark"},c.default.createElement(Nn,{size:23})),"consent",c.default.createElement("span",null,"ad"),c.default.createElement("small",null,"\\u03B2")),c.default.createElement("nav",null,Object.entries(zr).map(([O,te])=>c.default.createElement("button",{key:O,className:t===O?"nav-active":"",onClick:()=>oe(O)},te.name,O==="public"&&c.default.createElement("span",{className:"nav-count"},Lt.length)))),c.default.createElement("div",{className:"header-actions"},c.default.createElement(vd,{icon:fu,label:"\\uACC4\\uC57D \\uC5F0\\uACB0 \\uC124\\uC815",onClick:()=>E("settings")}),c.default.createElement("button",{className:"wallet-button",onClick:()=>Nt("\\uC9C0\\uAC11 \\uC5F0\\uACB0 \\uC911",_t)},c.default.createElement(ws,{size:17}),a?du(a):"\\uC9C0\\uAC11 \\uC5F0\\uACB0",sa(a,r)&&c.default.createElement("span",{className:"wallet-dot"})))),c.default.createElement("main",null,c.default.createElement("section",{className:"hero"},c.default.createElement("div",{className:"hero-content",key:t},c.default.createElement("div",{className:"hero-copy"},c.default.createElement("div",{className:"eyebrow"},c.default.createElement("span",null)," CONSENT FIRST, ALWAYS."),c.default.createElement("h1",null,Y.title),c.default.createElement("p",null,Y.desc),c.default.createElement("div",{className:"hero-actions"},(t==="public"||t==="advertiser")&&c.default.createElement("button",{className:"primary",onClick:()=>Te()},c.default.createElement(iu,{size:18}),"\\uC0C8 \\uAD11\\uACE0 \\uB4F1\\uB85D"),c.default.createElement("button",{className:"text-button",onClick:()=>document.getElementById("campaigns").scrollIntoView({behavior:"smooth"})},"\\uC9C4\\uD589 \\uC911\\uC778 \\uAD11\\uACE0 \\uBCF4\\uAE30 ",c.default.createElement(PB,null)))),c.default.createElement(MB,null))),t==="public"&&c.default.createElement("section",{className:"overview"},c.default.createElement("div",null,c.default.createElement("span",{className:"overview-icon"},c.default.createElement(lu,{size:21})),c.default.createElement("div",null,c.default.createElement("p",null,"\\uB4F1\\uB85D\\uB41C \\uAD11\\uACE0"),c.default.createElement("strong",null,String(Lt.length).padStart(2,"0"),c.default.createElement("small",null,"\\uAC74")))),c.default.createElement("div",null,c.default.createElement("span",{className:"overview-icon"},c.default.createElement(ru,{size:21})),c.default.createElement("div",null,c.default.createElement("p",null,"\\uC2B9\\uC778\\xB7\\uC9D1\\uD589 \\uC9C4\\uD589 \\uC911"),c.default.createElement("strong",null,String(kn).padStart(2,"0"),c.default.createElement("small",null,"\\uAC74")))),c.default.createElement("div",null,c.default.createElement("span",{className:"overview-icon"},c.default.createElement(_o,{size:21})),c.default.createElement("div",null,c.default.createElement("p",null,"\\uD604\\uC7AC \\uAC8C\\uC2DC \\uC911"),c.default.createElement("strong",null,String(ia).padStart(2,"0"),c.default.createElement("small",null,"\\uAC74")))),c.default.createElement("div",{className:"overview-message"},c.default.createElement(Vo,{size:24}),c.default.createElement("p",null,"\\uBAA8\\uB4E0 \\uC9C4\\uD589 \\uC0C1\\uD0DC\\uB294 \\uACF5\\uAC1C\\uD558\\uACE0,",c.default.createElement("br",null),c.default.createElement("b",null,"\\uAC8C\\uC2DC \\uC804 \\uC6D0\\uBCF8 \\uC601\\uC0C1\\uC740 \\uBCF4\\uD638\\uD569\\uB2C8\\uB2E4.")))),a&&l!==49088&&c.default.createElement("div",{className:"alert warning"},c.default.createElement(an,{size:18}),"\\uB2E4\\uB978 \\uB124\\uD2B8\\uC6CC\\uD06C\\uC5D0 \\uC5F0\\uACB0\\uB418\\uC5B4 \\uC788\\uC5B4\\uC694.",c.default.createElement("button",{onClick:()=>Nt("\\uB124\\uD2B8\\uC6CC\\uD06C \\uC804\\uD658",Gt)},"Bifrost \\uD14C\\uC2A4\\uD2B8\\uB137\\uC73C\\uB85C \\uC804\\uD658")),f&&c.default.createElement("div",{className:"alert demo-alert"},c.default.createElement(ys,{size:18}),c.default.createElement("span",null,"\\uC608\\uC2DC \\uD654\\uBA74\\uC785\\uB2C8\\uB2E4. \\uC2E4\\uC81C \\uACC4\\uC57D\\xB7\\uC794\\uC561\\xB7\\uC601\\uC0C1\\uACFC \\uAD00\\uACC4\\uC5C6\\uC73C\\uBA70 \\uAC70\\uB798\\uD560 \\uC218 \\uC5C6\\uC2B5\\uB2C8\\uB2E4."),c.default.createElement("button",{onClick:()=>{d(!1),A(null)}},"\\uC2E4\\uC81C \\uAD11\\uACE0 \\uBCF4\\uAE30 ",c.default.createElement(kr,{size:15}))),c.default.createElement("section",{id:"campaigns",className:"campaigns"},c.default.createElement("div",{className:"section-heading"},c.default.createElement("div",null,c.default.createElement("div",{className:"eyebrow"},Y.en),c.default.createElement("h2",null,t==="public"?"\\uAD11\\uACE0 \\uB458\\uB7EC\\uBCF4\\uAE30":Y.name+" \\uC6CC\\uD06C\\uC2A4\\uD398\\uC774\\uC2A4",c.default.createElement("span",null,nn.length)),t==="public"&&c.default.createElement("p",null,"\\uD55C \\uC7A5\\uC758 \\uBBF8\\uB9AC\\uBCF4\\uAE30 \\uB108\\uBA38, \\uAD11\\uACE0\\uC758 \\uC9C4\\uD589 \\uACFC\\uC815\\uC744 \\uD655\\uC778\\uD558\\uC138\\uC694.")),c.default.createElement("div",{className:"section-actions"},(t==="public"||t==="advertiser")&&c.default.createElement("button",{className:"secondary",onClick:()=>Te("import")},c.default.createElement(su,{size:16}),"\\uAE30\\uC874 \\uACC4\\uC57D \\uC5F0\\uACB0"),c.default.createElement(vd,{icon:Mr,label:"\\uC0C1\\uD0DC \\uC0C8\\uB85C\\uACE0\\uCE68",disabled:p,onClick:Ne}))),t!=="public"&&c.default.createElement("div",{className:"scope-tabs"},c.default.createElement("button",{className:F==="mine"?"chosen":"",onClick:()=>ee("mine")},"\\uB0B4\\uAC00 ",t==="advertiser"?"\\uB4F1\\uB85D\\uD55C":t==="rightsHolder"?"\\uAD8C\\uB9AC\\uC790\\uC778":"\\uC9D1\\uD589\\uD558\\uB294"," \\uAD11\\uACE0"),c.default.createElement("button",{className:F==="all"?"chosen":"",onClick:()=>ee("all")},"\\uC804\\uCCB4 \\uAD11\\uACE0 \\uBCF4\\uAE30"),!a&&c.default.createElement("span",null,"\\uC9C0\\uAC11\\uC744 \\uC5F0\\uACB0\\uD558\\uBA74 \\uB0B4 \\uAD11\\uACE0\\uB97C \\uD655\\uC778\\uD560 \\uC218 \\uC788\\uC5B4\\uC694.")),c.default.createElement("div",{className:"filter-bar"},c.default.createElement("div",{className:"filters"},["\\uC804\\uCCB4","\\uC608\\uCE58 \\uB300\\uAE30","\\uC2B9\\uC778 \\uB300\\uAE30","\\uC9D1\\uD589 \\uB300\\uAE30","\\uAC8C\\uC2DC \\uC911","\\uC0AC\\uC6A9 \\uAC70\\uC808","\\uD658\\uBD88 \\uC644\\uB8CC","\\uAE30\\uAC04 \\uC885\\uB8CC","\\uC9D1\\uD589 \\uAE30\\uD55C \\uC885\\uB8CC"].map(O=>c.default.createElement("button",{key:O,className:g===O?"selected":"",onClick:()=>x(O)},O))),c.default.createElement("label",{className:"search"},c.default.createElement(uu,{size:17}),c.default.createElement("input",{"aria-label":"\\uAD11\\uACE0 \\uAC80\\uC0C9",value:v,onChange:O=>m(O.target.value),placeholder:"\\uAD11\\uACE0\\uBA85, \\uCE74\\uD14C\\uACE0\\uB9AC \\uAC80\\uC0C9"}))),w&&c.default.createElement("div",{className:"alert warning"},c.default.createElement(an,{size:18}),c.default.createElement("span",null,w),c.default.createElement("button",{onClick:Ne},"\\uB2E4\\uC2DC \\uC2DC\\uB3C4")),c.default.createElement("div",{className:"result-line"},c.default.createElement("span",null,g==="\\uC804\\uCCB4"?"\\uBAA8\\uB4E0 \\uAD11\\uACE0":g," ",c.default.createElement("b",null,Qo.length)),c.default.createElement("div",null,c.default.createElement("span",{className:"live-dot"}),f?"\\uC608\\uC2DC \\uB370\\uC774\\uD130":"30\\uCD08\\uB9C8\\uB2E4 \\uC0C1\\uD0DC \\uC5C5\\uB370\\uC774\\uD2B8",c.default.createElement("span",{className:"sort"},"\\uCD5C\\uC2E0 \\uB4F1\\uB85D\\uC21C \\u2193"))),p&&!Lt.length?c.default.createElement("div",{className:"empty"},c.default.createElement(Mr,{className:"spin"}),c.default.createElement("h3",null,"\\uAD11\\uACE0 \\uC0C1\\uD0DC\\uB97C \\uBD88\\uB7EC\\uC624\\uACE0 \\uC788\\uC5B4\\uC694"),c.default.createElement("p",null,"Bifrost \\uACC4\\uC57D \\uC0C1\\uD0DC\\uB97C \\uD655\\uC778\\uD569\\uB2C8\\uB2E4.")):Qo.length?c.default.createElement("div",{className:"ad-grid"},Qo.map((O,te)=>c.default.createElement(zB,{key:O.address,ad:O,index:te,onClick:()=>A(O)}))):c.default.createElement("div",{className:"empty"},c.default.createElement("span",{className:"empty-icon"},c.default.createElement(Nn,{size:30})),c.default.createElement("h3",null,v||g!=="\\uC804\\uCCB4"?"\\uC870\\uAC74\\uC5D0 \\uB9DE\\uB294 \\uAD11\\uACE0\\uAC00 \\uC5C6\\uC5B4\\uC694":t!=="public"&&!a?"\\uC9C0\\uAC11\\uC744 \\uC5F0\\uACB0\\uD574 \\uB0B4 \\uAD11\\uACE0\\uB97C \\uD655\\uC778\\uD558\\uC138\\uC694":"\\uCCAB \\uBC88\\uC9F8 \\uAD11\\uACE0\\uB97C \\uAE30\\uB2E4\\uB9AC\\uACE0 \\uC788\\uC5B4\\uC694"),c.default.createElement("p",null,v?"\\uB2E4\\uB978 \\uAC80\\uC0C9\\uC5B4\\uB97C \\uC785\\uB825\\uD558\\uAC70\\uB098 \\uD544\\uD130\\uB97C \\uBC14\\uAFD4\\uBCF4\\uC138\\uC694.":t==="rightsHolder"?"\\uB0B4\\uAC00 \\uAD8C\\uB9AC\\uC790\\uB85C \\uC9C0\\uC815\\uB41C \\uAD11\\uACE0\\uC758 \\uC601\\uC0C1\\uC744 \\uAC80\\uD1A0\\uD558\\uACE0 \\uC0AC\\uC6A9 \\uC5EC\\uBD80\\uB97C \\uACB0\\uC815\\uD558\\uC138\\uC694.":t==="platform"?"\\uB0B4\\uAC00 \\uD50C\\uB7AB\\uD3FC\\uC73C\\uB85C \\uC9C0\\uC815\\uB41C \\uAD11\\uACE0\\uC758 \\uC2B9\\uC778 \\uC0C1\\uD0DC\\uB97C \\uD655\\uC778\\uD558\\uACE0 \\uC9D1\\uD589\\uD558\\uC138\\uC694.":"Remix\\uC5D0\\uC11C \\uBC30\\uD3EC\\uD55C \\uACC4\\uC57D\\uC744 \\uC5F0\\uACB0\\uD558\\uAC70\\uB098, \\uC5EC\\uAE30\\uC11C \\uC0C8 \\uAD11\\uACE0\\uB97C \\uB9CC\\uB4E4\\uC5B4\\uBCF4\\uC138\\uC694."),c.default.createElement("div",null,t==="public"||t==="advertiser"?c.default.createElement("button",{className:"primary",onClick:()=>Te("import")},"\\uAE30\\uC874 \\uACC4\\uC57D \\uC5F0\\uACB0 ",c.default.createElement(kr,{size:16})):a?null:c.default.createElement("button",{className:"primary",onClick:()=>Nt("\\uC9C0\\uAC11 \\uC5F0\\uACB0 \\uC911",_t)},"\\uC9C0\\uAC11 \\uC5F0\\uACB0 ",c.default.createElement(ws,{size:16})),c.default.createElement("button",{className:"secondary",onClick:()=>d(!0)},"\\uC608\\uC2DC \\uD654\\uBA74 \\uB458\\uB7EC\\uBCF4\\uAE30")))),c.default.createElement("section",{className:"trust-note"},c.default.createElement("div",null,c.default.createElement(Go,{size:21}),c.default.createElement("div",null,c.default.createElement("strong",null,"\\uACF5\\uAC1C\\uB418\\uB294 \\uAC74 \\uACFC\\uC815, \\uBCF4\\uD638\\uD558\\uB294 \\uAC74 \\uC6D0\\uBCF8."),c.default.createElement("p",null,"\\uAC8C\\uC2DC \\uC804\\uC5D0\\uB294 \\uBE14\\uB7EC \\uBBF8\\uB9AC\\uBCF4\\uAE30\\uB9CC \\uACF5\\uAC1C\\uB429\\uB2C8\\uB2E4. \\uC9C0\\uC815\\uB41C \\uCC38\\uC5EC\\uC790\\uB294 \\uC9C0\\uAC11 \\uC11C\\uBA85 \\uD6C4 \\uC6D0\\uBCF8\\uC744 \\uAC80\\uD1A0\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4."))),c.default.createElement("button",{onClick:()=>E("guide")},"\\uC774\\uC6A9 \\uD750\\uB984 \\uC54C\\uC544\\uBCF4\\uAE30 ",c.default.createElement(On,{size:18})))),c.default.createElement("footer",null,c.default.createElement("a",{className:"brand",href:"#public",onClick:()=>oe("public")},"consent",c.default.createElement("span",null,"ad")),c.default.createElement("p",null,"\\uB3D9\\uC758\\uB85C \\uC2DC\\uC791\\uD558\\uACE0, \\uC2E0\\uB8B0\\uB85C \\uC774\\uC5B4\\uC9C0\\uB294 \\uAD11\\uACE0."),c.default.createElement("span",null,"Bifrost Testnet \\xB7 \\uC2E4\\uC2B5\\uC6A9 CAD \\uD1A0\\uD070"),c.default.createElement("button",{onClick:()=>E("settings")},"\\uC5F0\\uACB0 \\uC124\\uC815")),T==="settings"&&c.default.createElement(Ad,{title:"\\uACC4\\uC57D \\uC5F0\\uACB0 \\uC124\\uC815",onClose:()=>E("")},c.default.createElement("p",{className:"modal-intro"},"Remix\\uC5D0\\uC11C \\uBC30\\uD3EC\\uD55C CADToken\\uC744 \\uC5F0\\uACB0\\uD558\\uC138\\uC694. \\uAD11\\uACE0 \\uACC4\\uC57D\\uC740 \\u2018\\uAE30\\uC874 \\uACC4\\uC57D \\uC5F0\\uACB0\\u2019\\uC5D0\\uC11C \\uAC01\\uAC01 \\uB4F1\\uB85D\\uD560 \\uC218 \\uC788\\uC5B4\\uC694."),c.default.createElement("label",{className:"field"},"\\uB124\\uD2B8\\uC6CC\\uD06C",c.default.createElement("div",{className:"network-field"},c.default.createElement("span",{className:"dot"})," Bifrost Testnet ",c.default.createElement("b",null,"49088"))),c.default.createElement("label",{className:"field"},"CADToken \\uACC4\\uC57D \\uC8FC\\uC18C",c.default.createElement("input",{value:Fe,onChange:O=>S(O.target.value),placeholder:"0x\\u2026 (\\uC9C0\\uAC11 \\uC8FC\\uC18C\\uAC00 \\uC544\\uB2CC \\uD1A0\\uD070 \\uACC4\\uC57D \\uC8FC\\uC18C)"})),c.default.createElement("button",{className:"primary full",disabled:!!I,onClick:()=>Nt("\\uD1A0\\uD070 \\uD655\\uC778 \\uC911",async()=>{await Sa();let O=await Ca("/token",{method:"POST",body:JSON.stringify({address:Fe})});localStorage.setItem("consent-cad",O.address),S(O.address),H({type:"success",text:"CADToken \\uC5F0\\uACB0 \\uC644\\uB8CC"}),E("")})},"\\uC8FC\\uC18C \\uD655\\uC778 \\uD6C4 \\uC800\\uC7A5 ",c.default.createElement(Dr,{size:17})),c.default.createElement("div",{className:"divider-label"},"\\uC544\\uC9C1 \\uD1A0\\uD070\\uC744 \\uBC30\\uD3EC\\uD558\\uC9C0 \\uC54A\\uC558\\uB2E4\\uBA74"),c.default.createElement("button",{className:"secondary full",disabled:!!I,onClick:()=>Nt("CADToken \\uBC30\\uD3EC",async()=>{await Sa();let{signer:O}=await Ue(),te=await(await fetch("/contracts.json")).json(),se=await new Ro(te.CADToken.abi,te.CADToken.bytecode,O).deploy();await Vt(se.deploymentTransaction(),"CADToken \\uBC30\\uD3EC");let Je=await se.getAddress();S(Je),localStorage.setItem("consent-cad",Je),H({type:"success",text:"CADToken \\uBC30\\uD3EC \\uC644\\uB8CC. \\uD604\\uC7AC \\uC9C0\\uAC11\\uC5D0 10,000 CAD\\uAC00 \\uBC1C\\uD589\\uB410\\uC5B4\\uC694."})})},"\\uC0C8 CADToken \\uBC30\\uD3EC"),c.default.createElement("p",{className:"fine"},"\\uC120\\uD0DD\\uD55C \\uD1A0\\uD070 \\uC8FC\\uC18C\\uB294 \\uC774 \\uBE0C\\uB77C\\uC6B0\\uC800\\uC5D0 \\uC800\\uC7A5\\uB429\\uB2C8\\uB2E4. \\uC0C8 \\uAD11\\uACE0\\uB9C8\\uB2E4 \\uC9C0\\uAE09\\uC561\\uACFC \\uAE30\\uAC04\\uC744 \\uC124\\uC815\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4. \\uBC30\\uD3EC \\uD6C4\\uC5D0\\uB294 \\uD574\\uB2F9 \\uC870\\uAC74\\uC774 \\uACE0\\uC815\\uB418\\uBA70, \\uBCC0\\uACBD\\uD558\\uB824\\uBA74 \\uC0C8 \\uAD11\\uACE0 \\uACC4\\uC57D\\uC744 \\uB4F1\\uB85D\\uD569\\uB2C8\\uB2E4.")),t==="advertiser"&&(T==="create"||T==="import")&&c.default.createElement(RB,{importing:T==="import",onClose:()=>E(""),token:Fe,wallet:a,busy:I,run:Nt,ensureSession:Sa,provider:Ue,track:Vt,onDone:async O=>{E(""),d(!1),await Ne(),A(O)}}),T==="guide"&&c.default.createElement(Ad,{title:"\\uAD11\\uACE0 \\uD55C \\uAC74\\uC758 \\uC9C4\\uD589 \\uACFC\\uC815",onClose:()=>E("")},c.default.createElement("div",{className:"guide-list"},[["01","\\uAD11\\uACE0\\uC8FC\\uAC00 \\uC601\\uC0C1\\uACFC \\uACC4\\uC57D\\uC744 \\uB4F1\\uB85D","\\uCD5C\\uC885 MP4\\uC758 SHA-256 \\uD574\\uC2DC\\uB97C \\uAE30\\uB85D\\uD569\\uB2C8\\uB2E4. \\uC0C8 \\uAD11\\uACE0\\uB294 \\uC0C8 \\uACC4\\uC57D\\uC73C\\uB85C \\uAD6C\\uBD84\\uD569\\uB2C8\\uB2E4."],["02","\\uACC4\\uC57D\\uC5D0 \\uC815\\uD55C \\uAD11\\uACE0\\uBE44 \\uC608\\uCE58","\\uC9C0\\uCD9C \\uD5C8\\uC6A9\\uACFC \\uC608\\uCE58\\uB97C \\uCC28\\uB840\\uB85C \\uC2E4\\uD589\\uD569\\uB2C8\\uB2E4. \\uC218\\uC218\\uB8CC\\uB294 \\uD14C\\uC2A4\\uD2B8 BFC\\uB85C \\uB0C5\\uB2C8\\uB2E4."],["03","\\uAD8C\\uB9AC\\uC790\\uAC00 \\uC6D0\\uBCF8 \\uAC80\\uD1A0 \\uD6C4 \\uC2B9\\uC778","\\uC9C0\\uC815\\uB41C \\uC9C0\\uAC11\\uB9CC \\uC2B9\\uC778\\uD558\\uAC70\\uB098 \\uAC70\\uC808\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4."],["04","\\uD50C\\uB7AB\\uD3FC\\uC774 \\uAC19\\uC740 \\uD30C\\uC77C\\uB85C \\uC9D1\\uD589","\\uC2E4\\uC81C \\uD30C\\uC77C\\uC758 \\uD574\\uC2DC\\uB97C \\uACC4\\uC0B0\\uD574 \\uB300\\uC870\\uD558\\uACE0 \\uC9D1\\uD589\\uD569\\uB2C8\\uB2E4. \\uD574\\uB2F9 \\uAD11\\uACE0 \\uACC4\\uC57D\\uC5D0 \\uC815\\uD55C \\uAD8C\\uB9AC\\uC790\\xB7\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAE09\\uC561\\uC744 \\uC804\\uC1A1\\uD569\\uB2C8\\uB2E4."],["05","\\uC0AC\\uC6A9 \\uAE30\\uAC04 \\uB3D9\\uC548 \\uACF5\\uAC1C \\uC7AC\\uC0DD","isPublishable\\uC774 true\\uC77C \\uB54C\\uB9CC \\uACF5\\uAC1C \\uC7AC\\uC0DD\\uD569\\uB2C8\\uB2E4. \\uAE30\\uAC04 \\uC885\\uB8CC \\uD6C4 \\uC2E0\\uADDC \\uC7AC\\uC0DD\\uC744 \\uCC28\\uB2E8\\uD569\\uB2C8\\uB2E4."]].map(O=>c.default.createElement("div",{key:O[0]},c.default.createElement("span",null,O[0]),c.default.createElement("section",null,c.default.createElement("h3",null,O[1]),c.default.createElement("p",null,O[2]))))),c.default.createElement("p",{className:"fine"},"\\uC9C0\\uAC11 \\uC9C0\\uC815\\uC740 \\uC2E4\\uC81C \\uAD8C\\uB9AC\\uC790 \\uC2E0\\uC6D0\\uC744 \\uC99D\\uBA85\\uD558\\uC9C0 \\uC54A\\uC2B5\\uB2C8\\uB2E4. \\uACC4\\uC57D\\xB7\\uAC70\\uB798 \\uC815\\uBCF4\\uB294 \\uACF5\\uAC1C \\uCCB4\\uC778\\uC5D0\\uC11C \\uC870\\uD68C\\uD560 \\uC218 \\uC788\\uC73C\\uBA70, \\uC774 \\uC0AC\\uC774\\uD2B8\\uC758 \\uC6D0\\uBCF8 \\uD30C\\uC77C\\uC740 \\uC11C\\uBC84\\uC5D0\\uC11C \\uC811\\uADFC\\uC744 \\uD1B5\\uC81C\\uD569\\uB2C8\\uB2E4.")),L&&c.default.createElement(HB,{ad:L,wallet:a,session:r,demo:L.demo,onClose:()=>A(null),busy:I,run:Nt,connect:_t,transact:vs,refresh:Ne,ensureSession:Sa,setNotice:H}),I&&c.default.createElement("div",{className:"busy",role:"status"},c.default.createElement(Mr,{className:"spin",size:17}),I,c.default.createElement("small",null,"MetaMask \\uC694\\uCCAD\\uC774 \\uC788\\uC73C\\uBA74 \\uD655\\uC778\\uD574\\uC8FC\\uC138\\uC694.")),k&&c.default.createElement("div",{role:"status",className:"toast "+k.type},k.type==="error"?c.default.createElement(an,{size:20}):c.default.createElement(Ur,{size:20}),c.default.createElement("span",null,k.text),c.default.createElement("button",{"aria-label":"\\uC54C\\uB9BC \\uB2EB\\uAE30",onClick:()=>H(null)},c.default.createElement(Ls,{size:16}))),U.length>0&&c.default.createElement("details",{className:"tx-tray"},c.default.createElement("summary",null,"\\uAC70\\uB798 \\uAE30\\uB85D ",c.default.createElement("span",null,U.length)),U.map(O=>c.default.createElement("div",{key:O.hash},c.default.createElement("span",null,O.state==="success"?"\\u2713":O.state==="failed"?"\\u2715":"\\u2026"," ",O.label),c.default.createElement("code",{title:O.hash},du(O.hash)),c.default.createElement("button",{"aria-label":"\\uAC70\\uB798 \\uD574\\uC2DC \\uBCF5\\uC0AC",onClick:()=>navigator.clipboard.writeText(O.hash)},c.default.createElement(qo,{size:12}))))))}function MB(){let t=[[48,104],[120,66],[199,42],[280,77],[367,51],[432,107],[80,183],[175,145],[270,180],[365,153],[440,210],[146,252],[237,259],[337,249],[290,321]].map(([a,n])=>[a,n,22]);return c.default.createElement("div",{className:"hero-art cube-art","aria-hidden":"true"},c.default.createElement("svg",{viewBox:"0 0 490 370",fill:"none"},c.default.createElement("defs",null,c.default.createElement("radialGradient",{id:"cube-halo"},c.default.createElement("stop",{stopColor:"var(--tint)"}),c.default.createElement("stop",{offset:"1",stopColor:"var(--surface)",stopOpacity:"0"}))),c.default.createElement("ellipse",{cx:"245",cy:"192",rx:"244",ry:"177",fill:"url(#cube-halo)"}),c.default.createElement("g",{className:"cube-links"},[[0,1],[0,6],[1,2],[1,7],[2,3],[3,4],[3,7],[3,8],[4,5],[5,9],[6,7],[6,11],[7,8],[7,11],[8,9],[8,12],[9,10],[9,13],[11,12],[12,13],[12,14],[13,14]].map(([a,n],r)=>c.default.createElement("path",{key:r,d:"M"+t[a][0]+","+t[a][1]+" L"+t[n][0]+","+t[n][1]}))),t.map(([a,n,r],o)=>c.default.createElement("g",{key:o,className:"cube-node cube-tone-"+o%3,style:{animationDelay:o%5*-.7+"s"},transform:"translate("+a+" "+n+")"},c.default.createElement("path",{className:"cube-top",d:`M0 ${-r} L${r*.8660254} ${-r/2} L0 0 L${-r*.8660254} ${-r/2} Z`}),c.default.createElement("path",{className:"cube-left",d:`M${-r*.8660254} ${-r/2} L0 0 V${r} L${-r*.8660254} ${r/2} Z`}),c.default.createElement("path",{className:"cube-right",d:`M0 0 L${r*.8660254} ${-r/2} V${r/2} L0 ${r} Z`})))),c.default.createElement("div",{className:"network-caption"},c.default.createElement("span",null)," CONNECTED BY CONSENT"))}function PB(){return c.default.createElement(kr,{size:17,style:{transform:"rotate(90deg)"}})}function zB({ad:t,index:e,onClick:a}){let n=t.unavailable?"\\uC870\\uD68C \\uBD88\\uAC00":cu(t),r=t.status>=4&&t.status<=4?4:Math.min(t.status||0,3);return c.default.createElement("button",{className:"ad-card",onClick:a},c.default.createElement("div",{className:"ad-visual "+(t.theme||["lime","peach","blue","pink"][e%4])},t.thumbnail?c.default.createElement("img",{src:t.thumbnail,alt:"\\uBE14\\uB7EC \\uCC98\\uB9AC\\uB41C \\uAD11\\uACE0 \\uBBF8\\uB9AC\\uBCF4\\uAE30"}):c.default.createElement("div",{className:"concept-art "+(t.status!==4?"softened":"")},c.default.createElement("div",{className:"shape-one"}),c.default.createElement("div",{className:"shape-two"}),c.default.createElement("div",{className:"shape-three"}),c.default.createElement("span",null,t.art||"CONSENT / ORIGINAL")),c.default.createElement("div",{className:"visual-top"},c.default.createElement("span",{className:"badge s"+t.status},t.status===4&&n==="\\uAC8C\\uC2DC \\uC911"&&c.default.createElement("span",{className:"live-dot"}),n),t.demo&&c.default.createElement("span",{className:"demo-chip"},"\\uC608\\uC2DC")),c.default.createElement("div",{className:"visual-bottom"},n==="\\uAC8C\\uC2DC \\uC911"?c.default.createElement(c.default.Fragment,null,c.default.createElement(_o,{size:14})," \\uAC8C\\uC2DC \\uC911\\uC778 \\uAD11\\uACE0"):c.default.createElement(c.default.Fragment,null,c.default.createElement(Go,{size:13})," \\uAC8C\\uC2DC \\uC804 \\uC6D0\\uBCF8 \\uBE44\\uACF5\\uAC1C")),t.status===3&&c.default.createElement("div",{className:"approved-stamp"},c.default.createElement(Vo,{size:26}),c.default.createElement("span",null,"\\uC0AC\\uC6A9 \\uC2B9\\uC778 \\uC644\\uB8CC"))),c.default.createElement("div",{className:"card-body"},c.default.createElement("div",{className:"card-category"},t.category,c.default.createElement("span",null,"#",String(e+1).padStart(3,"0"))),c.default.createElement("h3",null,t.title),c.default.createElement("div",{className:"card-facts"},c.default.createElement("div",null,c.default.createElement("span",null,"\\uCD1D \\uAD11\\uACE0\\uBE44"),c.default.createElement("strong",null,ua(t.TOTAL_FEE)," ",c.default.createElement("small",null,"CAD"))),c.default.createElement("div",null,c.default.createElement("span",null,t.status===4?"\\uC0AC\\uC6A9 \\uC885\\uB8CC":"\\uC9D1\\uD589 \\uB9C8\\uAC10"),c.default.createElement("strong",null,Vg(t.status===4?t.usageEnd:t.executionDeadline)))),c.default.createElement("div",{className:"progress-track"},c.default.createElement("div",{className:t.status>=5?"closed":"",style:{width:(t.status>=5?100:r*25)+"%"}})),c.default.createElement("div",{className:"progress-labels"},["\\uB4F1\\uB85D","\\uC608\\uCE58","\\uC2B9\\uC778","\\uC9D1\\uD589\\xB7\\uC815\\uC0B0"].map((o,l)=>c.default.createElement("span",{key:o,className:r>l?"complete":""},r>l&&c.default.createElement(Dr,{size:10})," ",o))),c.default.createElement("div",{className:"card-footer"},c.default.createElement("span",null,c.default.createElement("span",{className:"mini-avatar"},"A"),du(t.advertiser)),c.default.createElement("span",null,"\\uC9C4\\uD589 \\uD655\\uC778 ",c.default.createElement(On,{size:17})))))}function RB({importing:t,onClose:e,token:a,wallet:n,busy:r,run:o,ensureSession:l,provider:s,track:i,onDone:u}){let[f,d]=(0,c.useState)({title:"",category:"\\uBE0C\\uB79C\\uB4DC",description:"",address:"",rightsHolder:"",platform:"",token:a,rightsFee:"200",platformFee:"800",executionValue:"7",executionUnit:"days",usageValue:"30",usageUnit:"days"}),[p,h]=(0,c.useState)(null),[w,y]=(0,c.useState)(""),[v,m]=(0,c.useState)(null),[g,x]=(0,c.useState)(!1),[L,A]=(0,c.useState)(""),[T,E]=(0,c.useState)(""),[I,P]=(0,c.useState)(null),k=(S,U)=>{d(G=>({...G,[S]:U})),S==="address"&&P(null)},H=null,F="";try{H=Id(f)}catch(S){F=S.message}async function ee(S){if(S){x(!0),A("\\uC601\\uC0C1 \\uD574\\uC2DC\\uC640 \\uBE14\\uB7EC \\uBBF8\\uB9AC\\uBCF4\\uAE30 \\uC0DD\\uC131 \\uC911");try{if(S.size>50*1024*1024)throw new Error("\\uCD5C\\uB300 50MB \\uD30C\\uC77C\\uB9CC \\uC5C5\\uB85C\\uB4DC\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4.");let[U,G]=await Promise.all([Ld(S),mA(S)]);h(S),y(U),m(G),A("\\uD30C\\uC77C \\uAC80\\uC99D \\uC900\\uBE44 \\uC644\\uB8CC")}catch(U){A(Qg(U)),h(null)}finally{x(!1)}}}async function Fe(S){S.preventDefault(),o(t?"\\uAE30\\uC874 \\uACC4\\uC57D \\uC5F0\\uACB0":"\\uAD11\\uACE0 \\uB4F1\\uB85D",async()=>{await l();let U=f.address;if(!t){let Y=Id(f);if(!p||!w||!v)throw new Error("\\uCD5C\\uC885 MP4 \\uC601\\uC0C1\\uC744 \\uBA3C\\uC800 \\uC120\\uD0DD\\uD558\\uC138\\uC694.");if(![f.token,f.rightsHolder,f.platform].every(Mi))throw new Error("\\uD1A0\\uD070\\xB7\\uAD8C\\uB9AC\\uC790\\xB7\\uD50C\\uB7AB\\uD3FC \\uC8FC\\uC18C\\uB97C \\uD655\\uC778\\uD574\\uC8FC\\uC138\\uC694.");if(new Set([n,f.rightsHolder,f.platform].map(Gt=>Gt.toLowerCase())).size!==3)throw new Error("\\uC138 \\uC5ED\\uD560\\uC740 \\uC11C\\uB85C \\uB2E4\\uB978 \\uC9C0\\uAC11\\uC744 \\uC0AC\\uC6A9\\uD574\\uC57C \\uD569\\uB2C8\\uB2E4.");let{signer:oe}=await s(),Te=new qt(f.token,wd,oe);if(Number(await Te.decimals())!==0||await Te.symbol()!=="CAD")throw new Error("\\uC18C\\uC218\\uC810 0\\uC790\\uB9AC CADToken\\uC744 \\uC120\\uD0DD\\uD574\\uC8FC\\uC138\\uC694.");let Ne=await(await fetch("/contracts.json")).json();A("1/3 \\xB7 \\uAD11\\uACE0 \\uACC4\\uC57D \\uBC30\\uD3EC");let Ue=await new Ro(Ne.ConsentAdEscrow.abi,Ne.ConsentAdEscrow.bytecode,oe).deploy(f.token,f.rightsHolder,f.platform,Y.rightsFee,Y.platformFee,Y.executionSeconds,Y.usageSeconds);await i(Ue.deploymentTransaction(),"\\uAD11\\uACE0 \\uACC4\\uC57D \\uBC30\\uD3EC"),U=await Ue.getAddress(),E(U),A("2/3 \\xB7 \\uC601\\uC0C1 \\uD574\\uC2DC \\uB4F1\\uB85D"),await i(await Ue.registerAd(w),"\\uC601\\uC0C1 \\uD574\\uC2DC \\uB4F1\\uB85D")}A("\\uAD11\\uACE0 \\uBAA9\\uB85D\\uC5D0 \\uC5F0\\uACB0 \\uC911");let G=await Ca("/ads",{method:"POST",body:JSON.stringify({...f,address:U})});if(p&&v){A("3/3 \\xB7 \\uC6D0\\uBCF8\\uACFC \\uBCF4\\uD638\\uB41C \\uBBF8\\uB9AC\\uBCF4\\uAE30 \\uC5C5\\uB85C\\uB4DC");let Y=new FormData;Y.append("video",p),Y.append("thumbnail",v,"blur.jpg"),G=await Ca("/ads/"+U+"/media",{method:"POST",body:Y})}await u(G)})}return c.default.createElement(Ad,{title:t?"Remix \\uAD11\\uACE0 \\uACC4\\uC57D \\uC5F0\\uACB0":"\\uC0C8 \\uAD11\\uACE0 \\uB4F1\\uB85D",onClose:e,wide:!0},c.default.createElement("form",{onSubmit:Fe},c.default.createElement("p",{className:"modal-intro"},t?"\\uC774\\uBBF8 Bifrost \\uD14C\\uC2A4\\uD2B8\\uB137\\uC5D0 \\uBC30\\uD3EC\\uD55C \\uAD11\\uACE0 \\uACC4\\uC57D\\uC744 \\uAC00\\uC838\\uC635\\uB2C8\\uB2E4. \\uC5F0\\uACB0\\uD55C \\uC9C0\\uAC11\\uC774 \\uD574\\uB2F9 \\uACC4\\uC57D\\uC758 \\uAD11\\uACE0\\uC8FC\\uC5EC\\uC57C \\uD569\\uB2C8\\uB2E4.":"\\uAD11\\uACE0 \\uD55C \\uAC74\\uB9C8\\uB2E4 \\uACC4\\uC57D\\uC744 \\uBC30\\uD3EC\\uD558\\uACE0, \\uCD5C\\uC885 \\uC601\\uC0C1\\uC758 \\uD574\\uC2DC\\uB97C \\uAE30\\uB85D\\uD569\\uB2C8\\uB2E4. \\uAC01 \\uB2E8\\uACC4\\uC5D0\\uC11C MetaMask \\uD655\\uC778\\uC774 \\uD544\\uC694\\uD569\\uB2C8\\uB2E4."),c.default.createElement("div",{className:"form-columns"},c.default.createElement("section",null,c.default.createElement("label",{className:"field"},"\\uAD11\\uACE0 \\uC81C\\uBAA9",c.default.createElement("input",{required:!0,maxLength:100,value:f.title,onChange:S=>k("title",S.target.value),placeholder:"\\uC608: \\uC0C8\\uB85C\\uC6B4 \\uD558\\uB8E8\\uB97C \\uC5EC\\uB294 \\uD55C \\uC794"})),c.default.createElement("label",{className:"field"},"\\uCE74\\uD14C\\uACE0\\uB9AC",c.default.createElement("select",{value:f.category,onChange:S=>k("category",S.target.value)},["\\uBE0C\\uB79C\\uB4DC","\\uC74C\\uB8CC\\xB7\\uC2DD\\uD488","\\uB77C\\uC774\\uD504\\uC2A4\\uD0C0\\uC77C","\\uBDF0\\uD2F0","\\uD14C\\uD06C","\\uBAA8\\uBE4C\\uB9AC\\uD2F0","\\uAE30\\uD0C0"].map(S=>c.default.createElement("option",{key:S},S)))),c.default.createElement("label",{className:"field"},"\\uAD11\\uACE0 \\uC18C\\uAC1C",c.default.createElement("textarea",{maxLength:2e3,value:f.description,onChange:S=>k("description",S.target.value),placeholder:"\\uC0AC\\uC6A9 \\uBAA9\\uC801\\uACFC \\uAC80\\uD1A0\\uD560 \\uB0B4\\uC6A9\\uC744 \\uC801\\uC5B4\\uC8FC\\uC138\\uC694."})),t?c.default.createElement("label",{className:"field"},"ConsentAdEscrow \\uACC4\\uC57D \\uC8FC\\uC18C",c.default.createElement("input",{required:!0,value:f.address,onChange:S=>k("address",S.target.value),placeholder:"0x\\u2026 (\\uAD11\\uACE0 \\uACC4\\uC57D \\uC8FC\\uC18C)"})):c.default.createElement(c.default.Fragment,null,c.default.createElement("label",{className:"field"},"CADToken \\uACC4\\uC57D \\uC8FC\\uC18C",c.default.createElement("input",{required:!0,value:f.token,onChange:S=>k("token",S.target.value),placeholder:"\\uC124\\uC815\\uC5D0\\uC11C \\uC5F0\\uACB0\\uD55C \\uD1A0\\uD070 \\uC8FC\\uC18C"})),c.default.createElement("label",{className:"field"},"\\uAD8C\\uB9AC\\uC790 \\uC9C0\\uAC11 \\uC8FC\\uC18C",c.default.createElement("input",{required:!0,value:f.rightsHolder,onChange:S=>k("rightsHolder",S.target.value),placeholder:"0x\\u2026"})),c.default.createElement("label",{className:"field"},"\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAC11 \\uC8FC\\uC18C",c.default.createElement("input",{required:!0,value:f.platform,onChange:S=>k("platform",S.target.value),placeholder:"0x\\u2026"})))),c.default.createElement("section",null,c.default.createElement("label",{className:"upload-zone"},c.default.createElement(ou,{size:34}),c.default.createElement("strong",null,p?p.name:"\\uCD5C\\uC885 \\uAD11\\uACE0 \\uC601\\uC0C1 \\uC120\\uD0DD"),c.default.createElement("span",null,"MP4 \\xB7 \\uCD5C\\uB300 50MB"),c.default.createElement("input",{type:"file",accept:"video/mp4,.mp4",onChange:S=>ee(S.target.files[0])})),v&&c.default.createElement("img",{className:"thumb-preview",src:URL.createObjectURL(v),alt:"\\uACF5\\uAC1C\\uC6A9 \\uBE14\\uB7EC \\uC378\\uB124\\uC77C"}),c.default.createElement("p",{className:"fine"},t?"\\uAE30\\uC874\\uC5D0 \\uB4F1\\uB85D\\uD55C \\uD574\\uC2DC\\uC640 \\uAC19\\uC740 \\uD30C\\uC77C\\uB9CC \\uC5C5\\uB85C\\uB4DC\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4. \\uAC00\\uC0C1 \\uD574\\uC2DC\\uB85C \\uC2E4\\uC2B5\\uD55C \\uACC4\\uC57D\\uC740 \\uC2E4\\uC81C \\uC601\\uC0C1\\uACFC \\uC5F0\\uACB0\\uB418\\uC9C0 \\uC54A\\uC73C\\uBBC0\\uB85C \\uC0C8 \\uAD11\\uACE0\\uB97C \\uB4F1\\uB85D\\uD558\\uC138\\uC694.":"\\uACF5\\uAC1C \\uD654\\uBA74\\uC5D0\\uB294 \\uC774\\uBBF8 \\uBE14\\uB7EC \\uCC98\\uB9AC\\uD55C \\uC378\\uB124\\uC77C\\uB9CC \\uC804\\uC1A1\\uB429\\uB2C8\\uB2E4. \\uC6D0\\uBCF8 \\uC601\\uC0C1\\uC740 \\uCC38\\uC5EC\\uC790 \\uAC80\\uD1A0\\uC6A9\\uC73C\\uB85C \\uBCF4\\uD638\\uD569\\uB2C8\\uB2E4."),w&&c.default.createElement("div",{className:"hash-box"},c.default.createElement("span",null,"SHA-256"),c.default.createElement("code",null,w)),c.default.createElement("div",{className:"terms"},c.default.createElement("b",null,"\\uACC4\\uC57D \\uC815\\uC0B0 \\uC870\\uAC74"),t?c.default.createElement(c.default.Fragment,null,c.default.createElement("p",{className:"fine"},"\\uC774\\uBBF8 \\uBC30\\uD3EC\\uD55C \\uACC4\\uC57D\\uC758 \\uC870\\uAC74\\uC744 \\uCCB4\\uC778\\uC5D0\\uC11C \\uBD88\\uB7EC\\uC635\\uB2C8\\uB2E4. \\uAE30\\uC874 \\uACC4\\uC57D \\uC870\\uAC74\\uC740 \\uC774 \\uD654\\uBA74\\uC5D0\\uC11C \\uC218\\uC815\\uD560 \\uC218 \\uC5C6\\uC2B5\\uB2C8\\uB2E4."),c.default.createElement("button",{type:"button",className:"secondary",disabled:!!r||!Mi(f.address),onClick:()=>o("\\uACC4\\uC57D \\uC870\\uAC74 \\uC870\\uD68C",async()=>{await l(),P(await Ca("/inspect",{method:"POST",body:JSON.stringify({address:f.address})}))})},"\\uACC4\\uC57D \\uC870\\uAC74 \\uBD88\\uB7EC\\uC624\\uAE30"),I&&c.default.createElement(c.default.Fragment,null,c.default.createElement("span",null,"\\uAD8C\\uB9AC\\uC790 ",ua(I.RIGHTS_FEE)," CAD / \\uD50C\\uB7AB\\uD3FC ",ua(I.PLATFORM_FEE)," CAD"),c.default.createElement("span",null,"\\uCD1D \\uC608\\uCE58 ",ua(I.TOTAL_FEE)," CAD"),c.default.createElement("span",null,"\\uB4F1\\uB85D \\uD6C4 ",Un(I.EXECUTION_WINDOW)," \\uC774\\uB0B4 \\uC9D1\\uD589"),c.default.createElement("span",null,"\\uC9D1\\uD589 \\uD6C4 ",Un(I.USAGE_PERIOD)," \\uC0AC\\uC6A9"))):c.default.createElement(c.default.Fragment,null,c.default.createElement("fieldset",{className:"terms-inputs",disabled:!!r||!!T},c.default.createElement("div",{className:"terms-grid"},c.default.createElement("label",{className:"field"},"\\uAD8C\\uB9AC\\uC790 \\uC9C0\\uAE09\\uC561 (CAD)",c.default.createElement("input",{type:"number",min:"0",step:"1",required:!0,value:f.rightsFee,onChange:S=>k("rightsFee",S.target.value)})),c.default.createElement("label",{className:"field"},"\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAE09\\uC561 (CAD)",c.default.createElement("input",{type:"number",min:"0",step:"1",required:!0,value:f.platformFee,onChange:S=>k("platformFee",S.target.value)}))),c.default.createElement(pA,{label:"\\uB4F1\\uB85D \\uD6C4 \\uC9D1\\uD589 \\uAE30\\uD55C",value:f.executionValue,unit:f.executionUnit,onValue:S=>k("executionValue",S),onUnit:S=>k("executionUnit",S)}),c.default.createElement(pA,{label:"\\uC9D1\\uD589 \\uD6C4 \\uC0AC\\uC6A9 \\uAE30\\uAC04",value:f.usageValue,unit:f.usageUnit,onValue:S=>k("usageValue",S),onUnit:S=>k("usageUnit",S)})),F?c.default.createElement("p",{className:"check-bad"},F):c.default.createElement("div",{className:"terms-preview"},c.default.createElement("strong",null,"\\uCD1D \\uC608\\uCE58\\uAE08 ",ua(H.total)," CAD"),c.default.createElement("span",null,"\\uB4F1\\uB85D \\uD6C4 ",Un(H.executionSeconds)," \\uC774\\uB0B4 \\uC9D1\\uD589"),c.default.createElement("span",null,"\\uC9D1\\uD589 \\uD6C4 ",Un(H.usageSeconds)," \\uC0AC\\uC6A9")),c.default.createElement("p",{className:"fine"},"\\uAE30\\uAC04 \\uB2E8\\uC704\\uB294 \\uBC30\\uD3EC \\uC2DC \\uCD08\\uB85C \\uBCC0\\uD658\\uD569\\uB2C8\\uB2E4. \\uBC30\\uD3EC\\uD55C \\uC870\\uAC74\\uACFC \\uC601\\uC0C1\\uC5D0 \\uB300\\uD574 \\uAD8C\\uB9AC\\uC790\\uAC00 \\uC2B9\\uC778\\uD569\\uB2C8\\uB2E4."),c.default.createElement("a",{className:"text-button",href:"/ConsentAdStarter.sol",download:"ConsentAdStarter.sol"},"\\uC218\\uC815\\uB41C Solidity \\uCF54\\uB4DC \\uB0B4\\uB824\\uBC1B\\uAE30 ",c.default.createElement(On,{size:14})))))),T&&c.default.createElement("div",{className:"alert warning"},"\\uBC30\\uD3EC\\uB41C \\uACC4\\uC57D: ",c.default.createElement("code",null,T),c.default.createElement("p",null,"\\uB2E4\\uC74C \\uB2E8\\uACC4\\uAC00 \\uC2E4\\uD328\\uD558\\uBA74 \\uC774 \\uC8FC\\uC18C\\uB97C \\uBCF5\\uC0AC\\uD574 \\uAE30\\uC874 \\uACC4\\uC57D \\uC5F0\\uACB0\\uB85C \\uC774\\uC5B4\\uAC00\\uC138\\uC694. \\uC911\\uBCF5 \\uBC30\\uD3EC\\uD558\\uC9C0 \\uC54A\\uC544\\uB3C4 \\uB429\\uB2C8\\uB2E4.")),L&&c.default.createElement("p",{className:"form-step",role:"status"},L),c.default.createElement("div",{className:"modal-actions"},c.default.createElement("button",{type:"button",className:"secondary",onClick:e},"\\uB2EB\\uAE30"),c.default.createElement("button",{className:"primary",disabled:!!r||g||!!T||!t&&(!p||!!F),type:"submit"},t?"\\uACC4\\uC57D \\uD655\\uC778 \\uD6C4 \\uC5F0\\uACB0":"\\uACC4\\uC57D \\uBC30\\uD3EC \\xB7 \\uC601\\uC0C1 \\uB4F1\\uB85D",c.default.createElement(kr,{size:17})))))}function HB({ad:t,wallet:e,session:a,onClose:n,busy:r,run:o,connect:l,transact:s,refresh:i,ensureSession:u,setNotice:f}){let[d,p]=(0,c.useState)(""),[h,w]=(0,c.useState)(!1),[y,v]=(0,c.useState)(null),[m,g]=(0,c.useState)(""),[x,L]=(0,c.useState)(""),A=Gg(t,e),T=A!=="public",E=sa(e,a),I=(0,c.useRef)(null),P=(0,c.useRef)("");(0,c.useEffect)(()=>(p(""),w(!1),()=>{P.current&&URL.revokeObjectURL(P.current)}),[t.address,e,a]),(0,c.useEffect)(()=>{t.status===4&&!t.playable&&d&&!T&&(I.current?.pause(),p(""),w(!1));let F=setInterval(()=>{!T&&Number(t.usageEnd)*1e3<Date.now()&&(I.current?.pause(),p(""),w(!1))},1e3);return()=>clearInterval(F)},[t.status,t.playable,t.usageEnd,T,d]);async function k(){if(t.demo)throw new Error("\\uC608\\uC2DC \\uAD11\\uACE0\\uC5D0\\uB294 \\uC2E4\\uC81C \\uC601\\uC0C1\\uC774 \\uC5C6\\uC2B5\\uB2C8\\uB2E4.");T&&await u();let F=await fetch("/api/ads/"+t.address+"/media");if(!F.ok){let S=await F.json();throw new Error(S.error)}let ee=await F.blob(),Fe=await Ld(ee);if(!sa(Fe,t.videoHash))throw new Error("\\uC601\\uC0C1 \\uD574\\uC2DC \\uAC80\\uC99D \\uC2E4\\uD328");P.current&&URL.revokeObjectURL(P.current),P.current=URL.createObjectURL(ee),p(P.current),g(Fe),w(!0)}async function H(F){if(!F)return;let ee=await Ld(F);if(g(ee),L(sa(ee,t.videoHash)?"\\uC77C\\uCE58: \\uC2B9\\uC778\\uBC1B\\uC740 \\uC601\\uC0C1\\uACFC \\uB3D9\\uC77C\\uD569\\uB2C8\\uB2E4.":"\\uBD88\\uC77C\\uCE58: \\uC9D1\\uD589\\uD560 \\uC218 \\uC5C6\\uC2B5\\uB2C8\\uB2E4."),!sa(ee,t.videoHash))throw new Error("Video hash mismatch")}return c.default.createElement(Ad,{title:t.title,onClose:n,wide:!0},c.default.createElement("div",{className:"detail-top"},c.default.createElement("span",{className:"badge s"+t.status},t.unavailable?"\\uC870\\uD68C \\uBD88\\uAC00":cu(t)),c.default.createElement("span",null,t.category),t.demo&&c.default.createElement("span",{className:"demo-chip"},"\\uC608\\uC2DC \\xB7 \\uAC70\\uB798 \\uBD88\\uAC00"),c.default.createElement("span",{className:"detail-role"},"\\uD604\\uC7AC \\uC9C0\\uAC11: ",T?zr[A].name:"\\uC678\\uBD80 \\uC5F4\\uB78C\\uC790")),c.default.createElement("div",{className:"detail-columns"},c.default.createElement("section",null,c.default.createElement("div",{className:"video-frame"},d?c.default.createElement("video",{ref:I,controls:!0,src:d,onEnded:()=>{}}):t.thumbnail?c.default.createElement("img",{src:t.thumbnail,alt:"\\uBE14\\uB7EC \\uCC98\\uB9AC\\uB41C \\uBBF8\\uB9AC\\uBCF4\\uAE30"}):c.default.createElement("div",{className:"detail-art "+(t.theme||"lime")},c.default.createElement("div",{className:"shape-one"}),c.default.createElement("div",{className:"shape-two"}),c.default.createElement(Go,{size:32})),!d&&c.default.createElement("div",{className:"video-overlay"},c.default.createElement("span",null,t.playable?"\\uAC8C\\uC2DC\\uB41C \\uAD11\\uACE0":T?"\\uCC38\\uC5EC\\uC790 \\uAC80\\uD1A0\\uC6A9 \\uC6D0\\uBCF8":"\\uAC8C\\uC2DC \\uC804 \\uC6D0\\uBCF8 \\uBE44\\uACF5\\uAC1C"),c.default.createElement("p",null,t.playable?"\\uD604\\uC7AC \\uC0AC\\uC6A9 \\uAE30\\uAC04 \\uB0B4 \\uAD11\\uACE0\\uB97C \\uD655\\uC778\\uD560 \\uC218 \\uC788\\uC5B4\\uC694.":T?"\\uC9C0\\uAC11 \\uC11C\\uBA85\\uACFC \\uC601\\uC0C1 \\uD574\\uC2DC \\uD655\\uC778 \\uD6C4 \\uC5F4\\uB78C\\uD560 \\uC218 \\uC788\\uC5B4\\uC694.":"\\uD604\\uC7AC\\uB294 \\uBE14\\uB7EC \\uCC98\\uB9AC\\uB41C \\uD55C \\uC7A5\\uBA74\\uB9CC \\uBCFC \\uC218 \\uC788\\uC5B4\\uC694."),(T||t.playable)&&c.default.createElement("button",{className:"white-button",disabled:!!r||t.demo||!t.hasVideo,onClick:()=>o("\\uC601\\uC0C1 \\uAC80\\uC99D \\uC911",k)},c.default.createElement(_o,{size:16}),T?"\\uC6D0\\uBCF8 \\uAC80\\uD1A0\\uD558\\uAE30":"\\uAD11\\uACE0 \\uC7AC\\uC0DD"))),h&&c.default.createElement("div",{className:"verified"},c.default.createElement(Vo,{size:17}),"\\uC6D0\\uBCF8 \\uD30C\\uC77C SHA-256 \\uC77C\\uCE58 \\uD655\\uC778 \\uC644\\uB8CC"),c.default.createElement("p",{className:"detail-description"},t.description||"\\uAD11\\uACE0\\uC8FC\\uAC00 \\uB4F1\\uB85D\\uD55C \\uCD5C\\uC885 \\uC601\\uC0C1\\uC758 \\uD574\\uC2DC\\uC640 \\uACC4\\uC57D \\uC0C1\\uD0DC\\uB97C \\uAE30\\uC900\\uC73C\\uB85C \\uAD11\\uACE0\\uB97C \\uAD00\\uB9AC\\uD569\\uB2C8\\uB2E4."),c.default.createElement("h3",{className:"subheading"},"\\uAD11\\uACE0 \\uC9C4\\uD589 \\uACFC\\uC815"),c.default.createElement("div",{className:"timeline"},[["\\uB4F1\\uB85D",1,"\\uCD5C\\uC885 \\uC601\\uC0C1 \\uD574\\uC2DC \\uAE30\\uB85D"],["\\uC608\\uCE58",2,ua(t.TOTAL_FEE)+" CAD \\uBCF4\\uAD00"],["\\uC2B9\\uC778",3,"\\uAD8C\\uB9AC\\uC790\\uC758 \\uC0AC\\uC6A9 \\uB3D9\\uC758"],["\\uC9D1\\uD589\\xB7\\uC815\\uC0B0",4,"\\uAD8C\\uB9AC\\uC790\\xB7\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAE09"]].map(([F,ee,Fe])=>c.default.createElement("div",{className:t.status>=ee&&t.status<5?"done":"",key:F},c.default.createElement("span",null,t.status>=ee&&t.status<5?c.default.createElement(Dr,{size:15}):ee),c.default.createElement("section",null,c.default.createElement("strong",null,F),c.default.createElement("small",null,Fe))))),t.status>=5&&c.default.createElement("div",{className:"alert"},t.status===5?"\\uAD8C\\uB9AC\\uC790\\uAC00 \\uC0AC\\uC6A9\\uC744 \\uAC70\\uC808\\uD588\\uC2B5\\uB2C8\\uB2E4. \\uAD11\\uACE0\\uC8FC\\uAC00 \\uD658\\uBD88\\uC744 \\uC694\\uCCAD\\uD560 \\uC218 \\uC788\\uC2B5\\uB2C8\\uB2E4.":"\\uAD11\\uACE0\\uC8FC\\uC5D0\\uAC8C \\uC608\\uCE58\\uAE08\\uC774 \\uBC18\\uD658\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4."),c.default.createElement("button",{className:"text-button",onClick:()=>o("\\uAC70\\uB798 \\uAE30\\uB85D \\uC870\\uD68C",async()=>{if(t.demo){v({events:[],limited:!1});return}v(await Ca("/ads/"+t.address+"/events"))})},"\\uC628\\uCCB4\\uC778 \\uAC70\\uB798 \\uAE30\\uB85D \\uC870\\uD68C ",c.default.createElement(On,{size:16})),y&&c.default.createElement("div",{className:"event-list"},y.events.length?y.events.map((F,ee)=>c.default.createElement("div",{key:F.hash+ee},c.default.createElement("strong",null,F.name),c.default.createElement("span",null,"\\uBE14\\uB85D ",F.block),c.default.createElement("code",null,du(F.hash)),c.default.createElement("button",{onClick:()=>navigator.clipboard.writeText(F.hash),"aria-label":"\\uAC70\\uB798 \\uD574\\uC2DC \\uBCF5\\uC0AC"},c.default.createElement(qo,{size:13})))):c.default.createElement("p",null,"\\uC870\\uD68C \\uBC94\\uC704\\uC5D0 \\uC774\\uBCA4\\uD2B8\\uAC00 \\uC5C6\\uC2B5\\uB2C8\\uB2E4."),y.limited&&c.default.createElement("small",null,"\\uB178\\uB4DC \\uC81C\\uD55C\\uC744 \\uACE0\\uB824\\uD574 \\uCD5C\\uADFC 200,000\\uBE14\\uB85D\\uC744 \\uC870\\uD68C\\uD569\\uB2C8\\uB2E4. \\uC0C1\\uD0DC\\uC640 \\uC794\\uC561\\uC740 \\uD604\\uC7AC \\uCCB4\\uC778 \\uAE30\\uC900\\uC785\\uB2C8\\uB2E4."))),c.default.createElement("section",null,c.default.createElement("div",{className:"detail-summary"},c.default.createElement("h3",null,"\\uACC4\\uC57D\\uACFC \\uC815\\uC0B0"),c.default.createElement("div",null,c.default.createElement("span",null,"\\uCD1D \\uAD11\\uACE0\\uBE44"),c.default.createElement("strong",null,ua(t.TOTAL_FEE)," CAD")),c.default.createElement("div",null,c.default.createElement("span",null,"\\uAD8C\\uB9AC\\uC790 \\uC9C0\\uAE09\\uC561"),c.default.createElement("b",null,ua(t.RIGHTS_FEE)," CAD")),c.default.createElement("div",null,c.default.createElement("span",null,"\\uD50C\\uB7AB\\uD3FC \\uC9C0\\uAE09\\uC561"),c.default.createElement("b",null,ua(t.PLATFORM_FEE)," CAD")),c.default.createElement("div",null,c.default.createElement("span",null,"\\uD604\\uC7AC \\uC608\\uCE58 \\uC794\\uC561"),c.default.createElement("b",null,ua(t.escrowBalance)," CAD")),c.default.createElement("hr",null),c.default.createElement("div",null,c.default.createElement("span",null,"\\uB4F1\\uB85D \\uD6C4 \\uC9D1\\uD589 \\uAE30\\uD55C"),c.default.createElement("b",null,Un(t.EXECUTION_WINDOW))),c.default.createElement("div",null,c.default.createElement("span",null,"\\uC9D1\\uD589 \\uD6C4 \\uC0AC\\uC6A9 \\uAE30\\uAC04"),c.default.createElement("b",null,Un(t.USAGE_PERIOD))),c.default.createElement("div",null,c.default.createElement("span",null,"\\uC9D1\\uD589 \\uB9C8\\uAC10"),c.default.createElement("b",null,Vg(t.executionDeadline))),c.default.createElement("div",null,c.default.createElement("span",null,"\\uC0AC\\uC6A9 \\uC885\\uB8CC"),c.default.createElement("b",null,Vg(t.usageEnd)))),c.default.createElement("div",{className:"role-addresses"},["advertiser","rightsHolder","platform"].map(F=>c.default.createElement("div",{key:F},c.default.createElement("span",null,zr[F].name),c.default.createElement("code",{title:t[F]},du(t[F])),c.default.createElement(vd,{icon:qo,label:zr[F].name+" \\uC8FC\\uC18C \\uBCF5\\uC0AC",onClick:()=>navigator.clipboard.writeText(t[F])})))),T?c.default.createElement("div",{className:"action-panel"},c.default.createElement("div",{className:"eyebrow"},zr[A].en),c.default.createElement("h3",null,A==="advertiser"?"\\uAD11\\uACE0\\uBE44 \\uAD00\\uB9AC":A==="rightsHolder"?"\\uAC80\\uD1A0 \\uD6C4 \\uACB0\\uC815\\uD574\\uC8FC\\uC138\\uC694":"\\uCD5C\\uC885 \\uC601\\uC0C1 \\uD655\\uC778 \\uD6C4 \\uC9D1\\uD589"),!E&&c.default.createElement("button",{className:"secondary full",disabled:!!r||t.demo,onClick:()=>o("\\uC9C0\\uAC11 \\uBCF8\\uC778 \\uD655\\uC778",l)},"\\uC9C0\\uAC11 \\uC11C\\uBA85\\uC73C\\uB85C \\uBCF8\\uC778 \\uD655\\uC778"),A==="advertiser"&&c.default.createElement(c.default.Fragment,null,c.default.createElement("p",null,"\\uC9C0\\uCD9C \\uD5C8\\uC6A9 \\uD6C4 \\uC608\\uCE58\\uD558\\uBA74 \\uAD8C\\uB9AC\\uC790\\uAC00 \\uAC80\\uD1A0\\uD560 \\uC218 \\uC788\\uC5B4\\uC694."),c.default.createElement("button",{className:"secondary full",disabled:!!r||t.demo||!Pr(t,A,"approve"),onClick:()=>o("CAD \\uC9C0\\uCD9C \\uD5C8\\uC6A9",()=>s(t,"approve"))},"1. CAD \\uC9C0\\uCD9C \\uD5C8\\uC6A9"),c.default.createElement("button",{className:"primary full",disabled:!!r||t.demo||!Pr(t,A,"deposit")||!t.hasVideo,onClick:()=>o("\\uAD11\\uACE0\\uBE44 \\uC608\\uCE58",()=>s(t,"deposit"))},"2. ",ua(t.TOTAL_FEE)," CAD \\uC608\\uCE58"),!t.hasVideo&&c.default.createElement(FB,{ad:t,busy:r,run:o,ensureSession:u,refresh:i}),c.default.createElement("button",{className:"danger-outline full",disabled:!!r||t.demo||!Pr(t,A,"refund"),onClick:()=>{confirm("\\uC608\\uCE58\\uAE08\\uC744 \\uAD11\\uACE0\\uC8FC \\uC9C0\\uAC11\\uC73C\\uB85C \\uD658\\uBD88\\uD560\\uAE4C\\uC694?")&&o("\\uC608\\uCE58\\uAE08 \\uD658\\uBD88",()=>s(t,"refund"))}},"\\uC608\\uCE58\\uAE08 \\uD658\\uBD88 \\uC694\\uCCAD")),A==="rightsHolder"&&c.default.createElement(c.default.Fragment,null,c.default.createElement("p",null,"\\uC6D0\\uBCF8\\uC744 \\uC5F4\\uC5B4 \\uD574\\uC2DC \\uC77C\\uCE58\\uB97C \\uD655\\uC778\\uD55C \\uB4A4 \\uC0AC\\uC6A9 \\uC5EC\\uBD80\\uB97C \\uACB0\\uC815\\uD558\\uC138\\uC694."),c.default.createElement("button",{className:"primary full",disabled:!!r||t.demo||!h||!Pr(t,A,"approveUse"),onClick:()=>{confirm("\\uD655\\uC778\\uD55C \\uC601\\uC0C1\\uC758 \\uAD11\\uACE0 \\uC0AC\\uC6A9\\uC744 \\uC2B9\\uC778\\uD560\\uAE4C\\uC694?")&&o("\\uAD11\\uACE0 \\uC0AC\\uC6A9 \\uC2B9\\uC778",()=>s(t,"approveUse"))}},c.default.createElement(Dr,{size:17}),"\\uAD11\\uACE0 \\uC0AC\\uC6A9 \\uC2B9\\uC778"),c.default.createElement("button",{className:"danger-outline full",disabled:!!r||t.demo||!Pr(t,A,"rejectUse"),onClick:()=>{confirm("\\uC774 \\uAD11\\uACE0\\uC758 \\uC0AC\\uC6A9\\uC744 \\uAC70\\uC808\\uD560\\uAE4C\\uC694?")&&o("\\uAD11\\uACE0 \\uC0AC\\uC6A9 \\uAC70\\uC808",()=>s(t,"rejectUse"))}},"\\uAC70\\uC808 / \\uC9D1\\uD589 \\uC804 \\uC2B9\\uC778 \\uCCA0\\uD68C")),A==="platform"&&c.default.createElement(c.default.Fragment,null,c.default.createElement("p",null,"\\uAC80\\uD1A0\\uC6A9 \\uC6D0\\uBCF8\\uC744 \\uD655\\uC778\\uD558\\uAC70\\uB098, \\uC2E4\\uC81C \\uAC8C\\uC2DC\\uD560 \\uD30C\\uC77C\\uC744 \\uC120\\uD0DD\\uD574 \\uD574\\uC2DC\\uB97C \\uB300\\uC870\\uD558\\uC138\\uC694."),c.default.createElement("label",{className:"file-compare"},c.default.createElement(bs,{size:17}),"\\uAC8C\\uC2DC\\uD560 MP4 \\uD30C\\uC77C \\uB300\\uC870",c.default.createElement("input",{type:"file",accept:"video/mp4,.mp4",disabled:!!r||t.demo,onChange:F=>o("\\uD30C\\uC77C \\uD574\\uC2DC \\uBE44\\uAD50",()=>H(F.target.files[0]))})),x&&c.default.createElement("p",{className:x.startsWith("\\uC77C\\uCE58")?"check-good":"check-bad"},x),c.default.createElement("button",{className:"primary full",disabled:!!r||t.demo||!t.hasVideo||!sa(m,t.videoHash)||!Pr(t,A,"activateAd"),onClick:()=>{confirm("\\uAD11\\uACE0\\uB97C \\uC9D1\\uD589\\uD558\\uACE0 \\uAD8C\\uB9AC\\uC790\\xB7\\uD50C\\uB7AB\\uD3FC\\uC5D0 \\uC815\\uC0B0\\uD560\\uAE4C\\uC694?")&&o("\\uAD11\\uACE0 \\uC9D1\\uD589 \\xB7 \\uC815\\uC0B0",()=>s(t,"activateAd",m))}},"\\uC9D1\\uD589 \\xB7 \\uC790\\uB3D9 \\uC815\\uC0B0 ",c.default.createElement(On,{size:17})),c.default.createElement("p",{className:"fine"},"\\uC9D1\\uD589 \\uC2DC \\uACC4\\uC57D\\uC5D0 \\uC815\\uD55C \\uC0AC\\uC6A9 \\uAE30\\uAC04 ",Un(t.USAGE_PERIOD),"\\uC774 \\uC2DC\\uC791\\uB429\\uB2C8\\uB2E4. \\uC774 \\uC0AC\\uC774\\uD2B8\\uC758 \\uACF5\\uAC1C \\uAD11\\uACE0 \\uD654\\uBA74\\uC5D0\\uC11C \\uC7AC\\uC0DD\\uD560 \\uC218 \\uC788\\uC5B4\\uC694."))):c.default.createElement("div",{className:"public-notice"},c.default.createElement(ys,{size:21}),c.default.createElement("strong",null,"\\uC9C4\\uD589 \\uC0C1\\uD0DC\\uB97C \\uD568\\uAED8 \\uD655\\uC778\\uD558\\uC138\\uC694"),c.default.createElement("p",null,"\\uAC70\\uB798 \\uC2E4\\uD589\\uC740 \\uACC4\\uC57D\\uC5D0 \\uC9C0\\uC815\\uB41C \\uCC38\\uC5EC\\uC790\\uB9CC \\uD560 \\uC218 \\uC788\\uC5B4\\uC694. \\uC6D0\\uBCF8\\uC740 \\uAC8C\\uC2DC \\uD6C4 \\uC0AC\\uC6A9 \\uAE30\\uAC04 \\uB3D9\\uC548 \\uACF5\\uAC1C\\uB429\\uB2C8\\uB2E4.")))),c.default.createElement("details",{className:"technical"},c.default.createElement("summary",null,"\\uACC4\\uC57D \\uC8FC\\uC18C\\uC640 \\uC601\\uC0C1 \\uD574\\uC2DC"),c.default.createElement("p",null,"\\uB124\\uD2B8\\uC6CC\\uD06C: Bifrost Testnet / 49088"),c.default.createElement("p",null,"\\uAD11\\uACE0 \\uACC4\\uC57D ",c.default.createElement("code",null,t.address)),c.default.createElement("p",null,"CADToken ",c.default.createElement("code",null,t.cad||"\\uC608\\uC2DC")),c.default.createElement("p",null,"\\uB4F1\\uB85D\\uB41C \\uC601\\uC0C1 SHA-256 ",c.default.createElement("code",null,t.videoHash)),c.default.createElement("p",null,"\\uCD5C\\uADFC \\uC870\\uD68C \\uBE14\\uB85D ",t.blockNumber||"\\u2014"),c.default.createElement("button",{className:"text-button",onClick:i},c.default.createElement(Mr,{size:14}),"\\uC0C1\\uD0DC \\uC0C8\\uB85C\\uACE0\\uCE68")))}function FB({ad:t,busy:e,run:a,ensureSession:n,refresh:r}){return c.default.createElement("label",{className:"file-compare"},c.default.createElement(bs,{size:16}),"\\uB4F1\\uB85D\\uB41C \\uD574\\uC2DC\\uC758 \\uC6D0\\uBCF8 \\uC5C5\\uB85C\\uB4DC",c.default.createElement("input",{type:"file",accept:"video/mp4,.mp4",disabled:!!e||t.demo||![1,2,3,4].includes(t.status),onChange:o=>{let l=o.target.files[0];l&&a("\\uC6D0\\uBCF8 \\uC5C5\\uB85C\\uB4DC",async()=>{if(await n(),l.size>50*1024*1024)throw new Error("50MB \\uC774\\uD558 \\uD30C\\uC77C\\uC744 \\uC120\\uD0DD\\uD558\\uC138\\uC694.");if(!sa(await Ld(l),t.videoHash))throw new Error("Video hash mismatch");let s=await mA(l),i=new FormData;i.append("video",l),i.append("thumbnail",s,"blur.jpg"),await Ca("/ads/"+t.address+"/media",{method:"POST",body:i}),await r()})}}))}function pA({label:t,value:e,unit:a,onValue:n,onUnit:r}){return c.default.createElement("label",{className:"field"},t,c.default.createElement("div",{className:"duration-input"},c.default.createElement("input",{"aria-label":t+" \\uAC12",type:"number",min:"1",step:"1",required:!0,value:e,onChange:o=>n(o.target.value)}),c.default.createElement("select",{"aria-label":t+" \\uB2E8\\uC704",value:a,onChange:o=>r(o.target.value)},c.default.createElement("option",{value:"days"},"\\uC77C"),c.default.createElement("option",{value:"hours"},"\\uC2DC\\uAC04"),c.default.createElement("option",{value:"minutes"},"\\uBD84"),c.default.createElement("option",{value:"seconds"},"\\uCD08"))))}(0,hA.createRoot)(document.getElementById("root")).render(c.default.createElement(UB,null));\n/*! Bundled license information:\n\nreact/cjs/react.production.js:\n  (**\n   * @license React\n   * react.production.js\n   *\n   * Copyright (c) Meta Platforms, Inc. and affiliates.\n   *\n   * This source code is licensed under the MIT license found in the\n   * LICENSE file in the root directory of this source tree.\n   *)\n\nscheduler/cjs/scheduler.production.js:\n  (**\n   * @license React\n   * scheduler.production.js\n   *\n   * Copyright (c) Meta Platforms, Inc. and affiliates.\n   *\n   * This source code is licensed under the MIT license found in the\n   * LICENSE file in the root directory of this source tree.\n   *)\n\nreact-dom/cjs/react-dom.production.js:\n  (**\n   * @license React\n   * react-dom.production.js\n   *\n   * Copyright (c) Meta Platforms, Inc. and affiliates.\n   *\n   * This source code is licensed under the MIT license found in the\n   * LICENSE file in the root directory of this source tree.\n   *)\n\nreact-dom/cjs/react-dom-client.production.js:\n  (**\n   * @license React\n   * react-dom-client.production.js\n   *\n   * Copyright (c) Meta Platforms, Inc. and affiliates.\n   *\n   * This source code is licensed under the MIT license found in the\n   * LICENSE file in the root directory of this source tree.\n   *)\n\n@noble/hashes/esm/utils.js:\n  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)\n\n@noble/curves/esm/abstract/utils.js:\n@noble/curves/esm/abstract/modular.js:\n@noble/curves/esm/abstract/curve.js:\n@noble/curves/esm/abstract/weierstrass.js:\n@noble/curves/esm/_shortw_utils.js:\n@noble/curves/esm/secp256k1.js:\n  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)\n\nlucide-react/dist/esm/shared/src/utils.js:\nlucide-react/dist/esm/defaultAttributes.js:\nlucide-react/dist/esm/Icon.js:\nlucide-react/dist/esm/createLucideIcon.js:\nlucide-react/dist/esm/icons/arrow-right.js:\nlucide-react/dist/esm/icons/arrow-up-right.js:\nlucide-react/dist/esm/icons/check.js:\nlucide-react/dist/esm/icons/circle-alert.js:\nlucide-react/dist/esm/icons/circle-check.js:\nlucide-react/dist/esm/icons/clock.js:\nlucide-react/dist/esm/icons/copy.js:\nlucide-react/dist/esm/icons/eye.js:\nlucide-react/dist/esm/icons/file-video.js:\nlucide-react/dist/esm/icons/layers.js:\nlucide-react/dist/esm/icons/layout-grid.js:\nlucide-react/dist/esm/icons/link.js:\nlucide-react/dist/esm/icons/lock.js:\nlucide-react/dist/esm/icons/play.js:\nlucide-react/dist/esm/icons/plus.js:\nlucide-react/dist/esm/icons/refresh-cw.js:\nlucide-react/dist/esm/icons/search.js:\nlucide-react/dist/esm/icons/settings.js:\nlucide-react/dist/esm/icons/shield-check.js:\nlucide-react/dist/esm/icons/upload.js:\nlucide-react/dist/esm/icons/wallet.js:\nlucide-react/dist/esm/icons/x.js:\nlucide-react/dist/esm/lucide-react.js:\n  (**\n   * @license lucide-react v0.468.0 - ISC\n   *\n   * This source code is licensed under the ISC license.\n   * See the LICENSE file in the root directory of this source tree.\n   *)\n*/\n', type: "text/javascript" } };
var ut = new lt(Ra);
var ir = new lt(Ua);
var ne = /* @__PURE__ */ __name((n18, e = 200, t = {}) => new Response(JSON.stringify(n18), { status: e, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...t } }), "ne");
function P(n18, e = 400) {
  throw Object.assign(new Error(n18), { status: e });
}
__name(P, "P");
var _a = /* @__PURE__ */ __name((n18) => "0x" + Array.from(new Uint8Array(n18), (e) => e.toString(16).padStart(2, "0")).join(""), "_a");
async function za(n18) {
  return _a(await crypto.subtle.digest("SHA-256", n18));
}
__name(za, "za");
async function Ht(n18, e) {
  let t = await n18.get(e);
  return t ? t.json() : null;
}
__name(Ht, "Ht");
async function _t(n18, e, t, r = {}) {
  return n18.put(e, JSON.stringify(t), { httpMetadata: { contentType: "application/json" }, ...r });
}
__name(_t, "_t");
async function lr(n18, e) {
  let t;
  for (let r of [vn, rr]) try {
    let i = await (await fetch(r, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: n18, params: e }), signal: AbortSignal.timeout(12e3) })).json();
    if (i.error) throw new Error(i.error.message);
    if (i.result === void 0) throw new Error("RPC empty");
    return i.result;
  } catch (a) {
    t = a;
  }
  P("Bifrost \uB178\uB4DC\uC5D0 \uC5F0\uACB0\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uC0C8\uB85C\uACE0\uCE68\uD558\uC138\uC694.", 503);
}
__name(lr, "lr");
async function En(n18, e, t = [], r = ut, a = "latest") {
  let i = r.encodeFunctionData(e, t), o = await lr("eth_call", [{ to: n18, data: i }, a]);
  return r.decodeFunctionResult(e, o)[0];
}
__name(En, "En");
async function xn(n18) {
  at(n18) || P("\uC62C\uBC14\uB978 \uACC4\uC57D \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uC138\uC694.");
  let e = await lr("eth_blockNumber", []), t = ["advertiser", "rightsHolder", "platform", "cad", "status", "videoHash", "executionDeadline", "usageEnd", "RIGHTS_FEE", "PLATFORM_FEE", "TOTAL_FEE", "escrowBalance", "EXECUTION_WINDOW", "USAGE_PERIOD"], r;
  try {
    let i = t.map((s, l) => ({ jsonrpc: "2.0", id: l, method: "eth_call", params: [{ to: n18, data: ut.encodeFunctionData(s, []) }, e] })), o;
    for (let s of [vn, rr]) try {
      let u = await (await fetch(s, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(i), signal: AbortSignal.timeout(15e3) })).json();
      if (!Array.isArray(u) || u.length !== t.length || u.some((c) => c.error)) throw new Error("batch response invalid");
      o = u;
      break;
    } catch {
    }
    o || P("\uACC4\uC57D \uC0C1\uD0DC\uB97C \uC870\uD68C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB124\uD2B8\uC6CC\uD06C\uC640 \uACC4\uC57D \uC8FC\uC18C\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.", 503), r = t.map((s, l) => ut.decodeFunctionResult(s, o.find((u) => u.id === l).result)[0]);
  } catch (i) {
    if (i.status === 503) throw i;
    P("\uC774 \uC8FC\uC18C\uC5D0\uC11C ConsentAdEscrow\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. Bifrost \uD14C\uC2A4\uD2B8\uB137\uC758 \uACC4\uC57D \uC8FC\uC18C\uB97C \uD655\uC778\uD558\uC138\uC694.");
  }
  let a = Object.fromEntries(t.map((i, o) => [i, typeof r[o] == "bigint" ? r[o].toString() : r[o]]));
  return a.status = Number(a.status), a.address = $(n18), a.blockNumber = Number(BigInt(e)), a.chainId = 49088, a.playable = !!await En(n18, "isPublishable", [a.videoHash], ut, e), a;
}
__name(xn, "xn");
function Mt(n18, e) {
  return { ...n18, ...e, hasVideo: !!n18.mediaHash, thumbnail: n18.hasThumbnail ? "/api/ads/" + n18.address + "/thumbnail" : null };
}
__name(Mt, "Mt");
async function sr(n18, e) {
  let t = (n18.headers.get("cookie") || "").match(/(?:^|;\s*)consent_session=([^;]+)/)?.[1];
  if (!t || !/^[a-f0-9]{64}$/.test(t)) return null;
  let r = await Ht(e.BUCKET, "sessions/" + t);
  return r && r.expires > Date.now() && r.origin === new URL(n18.url).origin ? r.address : null;
}
__name(sr, "sr");
async function An(n18, e) {
  let t = await sr(n18, e);
  return t || P("\uC9C0\uAC11 \uC5F0\uACB0 \uD6C4 \uC11C\uBA85\uC73C\uB85C \uBCF8\uC778 \uD655\uC778\uC744 \uD574\uC8FC\uC138\uC694.", 401), t;
}
__name(An, "An");
async function ho(n18, e) {
  at(e) || P("\uC798\uBABB\uB41C \uC8FC\uC18C");
  let t = await Ht(n18.BUCKET, "ads/" + e.toLowerCase() + ".json");
  return t || P("\uB4F1\uB85D\uB41C \uAD11\uACE0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", 404), t;
}
__name(ho, "ho");
async function mo(n18, e) {
  let t = new URL(n18.url), r = t.pathname, a = n18.method;
  if (a !== "GET" && n18.headers.get("origin") !== t.origin && P("\uD5C8\uC6A9\uB418\uC9C0 \uC54A\uC740 \uC694\uCCAD\uC785\uB2C8\uB2E4.", 403), r === "/api/config") return ne({ chainId: 49088, rpc: vn, token: await Ht(e.BUCKET, "config/token"), maxVideoMB: 50 });
  if (r === "/api/session") return ne({ address: await sr(n18, e) });
  if (r === "/api/auth/nonce" && a === "POST") {
    let { address: o } = await n18.json();
    at(o) || P("\uC798\uBABB\uB41C \uC9C0\uAC11 \uC8FC\uC18C");
    let s = crypto.randomUUID(), l = `ConsentAd wallet verification
Origin: ${t.origin}
Chain ID: ${49088}
Address: ${$(o)}
Nonce: ${s}
Issued at: ${(/* @__PURE__ */ new Date()).toISOString()}
Purpose: Access your advertisement review and management. No transaction or spending permission.`;
    return await _t(e.BUCKET, "nonces/" + s, { message: l, address: $(o), origin: t.origin, expires: Date.now() + 3e5, used: false }), ne({ nonce: s, message: l });
  }
  if (r === "/api/auth/verify" && a === "POST") {
    let { nonce: o, signature: s } = await n18.json();
    /^[a-f0-9-]{36}$/.test(o || "") || P("\uC798\uBABB\uB41C \uC778\uC99D \uC694\uCCAD");
    let l = await e.BUCKET.get("nonces/" + o);
    l || P("\uC11C\uBA85\uC774 \uB9CC\uB8CC\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC5F0\uACB0\uD574\uC8FC\uC138\uC694.", 401);
    let u = await l.json();
    (u.used || u.expires < Date.now() || u.origin !== t.origin) && P("\uC11C\uBA85\uC774 \uB9CC\uB8CC\uB410\uC2B5\uB2C8\uB2E4.", 401);
    let c;
    try {
      c = Cn(u.message, s);
    } catch {
      P("\uC11C\uBA85\uC744 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.", 401);
    }
    Ne(c, u.address) || P("\uC9C0\uAC11 \uC11C\uBA85\uC774 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.", 401), await _t(e.BUCKET, "nonces/" + o, { ...u, used: true }, { onlyIf: { etagMatches: l.etag } }) || P("\uC774\uBBF8 \uC0AC\uC6A9\uD55C \uC778\uC99D\uC785\uB2C8\uB2E4.", 401);
    let h = _a(crypto.getRandomValues(new Uint8Array(32))).slice(2);
    return await _t(e.BUCKET, "sessions/" + h, { address: u.address, origin: t.origin, expires: Date.now() + 36e5 }), ne({ address: u.address }, 200, { "Set-Cookie": `consent_session=${h}; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600${t.protocol === "https:" ? "; Secure" : ""}` });
  }
  if (r === "/api/auth/logout" && a === "POST") {
    let o = (n18.headers.get("cookie") || "").match(/consent_session=([^;]+)/)?.[1];
    return o && /^[a-f0-9]{64}$/.test(o) && await e.BUCKET.delete("sessions/" + o), ne({ ok: true }, 200, { "Set-Cookie": "consent_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });
  }
  if (r === "/api/token" && a === "POST") {
    let o = await An(n18, e), { address: s } = await n18.json();
    at(s) || P("\uD1A0\uD070 \uC8FC\uC18C\uB97C \uD655\uC778\uD558\uC138\uC694.");
    let l = Number(await En(s, "decimals", [], ir)), u = await En(s, "symbol", [], ir), c = await En(s, "balanceOf", [o], ir);
    return (l !== 0 || u !== "CAD" || c === 0n) && P("CADToken \uC8FC\uC18C\uC640 \uAD11\uACE0\uC8FC \uD1A0\uD070 \uC794\uC561\uC744 \uD655\uC778\uD558\uC138\uC694. \uC18C\uC218\uC810 0\uC790\uB9AC CAD\uB97C \uC9C0\uC6D0\uD569\uB2C8\uB2E4."), ne({ address: $(s), symbol: u, decimals: l });
  }
  if (r === "/api/ads" && a === "GET") {
    let o = t.searchParams.get("cursor") || void 0, s = await e.BUCKET.list({ prefix: "ads/", limit: 8, cursor: o }), l = await Promise.all(s.objects.map((c) => Ht(e.BUCKET, c.key))), u = [];
    for (let c = 0; c < l.length; c += 4) u.push(...await Promise.all(l.slice(c, c + 4).map(async (f) => {
      try {
        return Mt(f, await xn(f.address));
      } catch (h) {
        return { ...f, unavailable: true, error: h.message, thumbnail: f.hasThumbnail ? "/api/ads/" + f.address + "/thumbnail" : null };
      }
    })));
    return ne({ ads: u.sort((c, f) => f.createdAt - c.createdAt), cursor: s.truncated ? s.cursor : null });
  }
  if (r === "/api/inspect" && a === "POST") {
    await An(n18, e);
    let { address: o } = await n18.json();
    return ne(await xn(o));
  }
  if (r === "/api/ads" && a === "POST") {
    let o = await An(n18, e), { address: s, title: l, category: u, description: c } = await n18.json();
    (!l?.trim() || l.length > 100 || c?.length > 2e3) && P("\uAD11\uACE0 \uC81C\uBAA9(100\uC790 \uC774\uB0B4)\uACFC \uC124\uBA85\uC744 \uD655\uC778\uD558\uC138\uC694.");
    let f = await xn(s);
    Ne(o, f.advertiser) || P("\uC774 \uAD11\uACE0 \uACC4\uC57D\uC758 \uAD11\uACE0\uC8FC\uB9CC \uBAA9\uB85D\uC5D0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", 403);
    let h = await Ht(e.BUCKET, "ads/" + s.toLowerCase() + ".json");
    if (h) return ne(Mt(h, f));
    let m = { address: f.address, title: l.trim(), category: String(u || "\uBE0C\uB79C\uB4DC").slice(0, 30), description: String(c || "").slice(0, 2e3), createdAt: Date.now(), mediaHash: null, hasThumbnail: false };
    return await _t(e.BUCKET, "ads/" + s.toLowerCase() + ".json", m), ne(Mt(m, f), 201);
  }
  let i = r.match(/^\/api\/ads\/(0x[a-fA-F0-9]{40})(?:\/(media|thumbnail|events))?$/);
  if (i) {
    let o = i[1], s = i[2], l = await ho(e, o);
    if (s === "thumbnail" && a === "GET") {
      let c = await e.BUCKET.get("thumb/" + o.toLowerCase());
      return c ? new Response(c.body, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=60", "X-Content-Type-Options": "nosniff" } }) : new Response(null, { status: 404 });
    }
    let u = await xn(o);
    if (!s && a === "GET") return ne(Mt(l, u));
    if (s === "events" && a === "GET") {
      let c = ut.fragments.filter((C) => C.type === "event").map((C) => ut.getEvent(C.name).topicHash), f = u.blockNumber, h = Math.max(0, f - 2e5), m = await lr("eth_getLogs", [{ address: o, fromBlock: "0x" + h.toString(16), toBlock: "latest", topics: [c] }]);
      return ne({ fromBlock: h, limited: h > 0, events: m.map((C) => ({ name: ut.parseLog(C).name, hash: C.transactionHash, block: Number(BigInt(C.blockNumber)) })) });
    }
    if (s === "media" && a === "POST") {
      let c = await An(n18, e);
      Ne(c, u.advertiser) || P("\uAD11\uACE0\uC8FC\uB9CC \uC601\uC0C1\uC744 \uC5C5\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", 403), [1, 2, 3, 4].includes(u.status) || P("\uC601\uC0C1 \uD574\uC2DC \uB4F1\uB85D \uD6C4 \uC6D0\uBCF8\uC744 \uC5C5\uB85C\uB4DC\uD558\uC138\uC694."), Number(n18.headers.get("content-length") || 0) > 53 * 1024 * 1024 && P("\uCD5C\uB300 50MB \uC601\uC0C1\uB9CC \uAC00\uB2A5\uD569\uB2C8\uB2E4.", 413);
      let f = await n18.formData(), h = f.get("video"), m = f.get("thumbnail");
      (!h || h.size > 50 * 1024 * 1024 || h.size === 0) && P("50MB \uC774\uD558 \uC601\uC0C1\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      let C = await h.arrayBuffer(), d = new Uint8Array(C);
      String.fromCharCode(...d.slice(4, 8)) !== "ftyp" && P("MP4 \uC601\uC0C1 \uD30C\uC77C\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.");
      let y = await za(C);
      Ne(y, u.videoHash) || P("Video hash mismatch: \uB4F1\uB85D\uD55C \uD574\uC2DC\uC640 \uD30C\uC77C\uC774 \uB2E4\uB985\uB2C8\uB2E4. \uC6D0\uBCF8\uC740 \uBCC0\uACBD\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4."), l.mediaHash && !Ne(l.mediaHash, y) && P("\uAE30\uC874 \uC6D0\uBCF8\uC744 \uAD50\uCCB4\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."), (!m || m.type !== "image/jpeg" || m.size > 512e3) && P("\uBE14\uB7EC \uCC98\uB9AC\uD55C \uBBF8\uB9AC\uBCF4\uAE30 \uC774\uBBF8\uC9C0\uB97C \uC0DD\uC131\uD574\uC8FC\uC138\uC694.");
      let w = await m.arrayBuffer();
      (new Uint8Array(w)[0] !== 255 || new Uint8Array(w)[1] !== 216) && P("\uC798\uBABB\uB41C \uC378\uB124\uC77C"), await e.BUCKET.put("media/" + o.toLowerCase(), C, { httpMetadata: { contentType: "video/mp4" } }), await e.BUCKET.put("thumb/" + o.toLowerCase(), w, { httpMetadata: { contentType: "image/jpeg" } });
      let A = { ...l, mediaHash: y, hasThumbnail: true };
      return await _t(e.BUCKET, "ads/" + o.toLowerCase() + ".json", A), ne(Mt(A, u));
    }
    if (s === "media" && a === "GET") {
      (!l.mediaHash || !Ne(l.mediaHash, u.videoHash)) && P("\uAC80\uC99D\uB41C \uC601\uC0C1\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.", 404);
      let c = await sr(n18, e), f = [u.advertiser, u.rightsHolder, u.platform].some((C) => Ne(C, c));
      !f && !u.playable && P("\uAC8C\uC2DC \uC804 \uC6D0\uBCF8 \uC601\uC0C1\uC740 \uCC38\uC5EC\uC790\uB9CC \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4.", 403), !f && u.status !== 4 && P("\uC544\uC9C1 \uAC8C\uC2DC\uD558\uC9C0 \uC54A\uC740 \uC601\uC0C1\uC785\uB2C8\uB2E4.", 403);
      let h = await e.BUCKET.get("media/" + o.toLowerCase());
      h || P("\uC601\uC0C1\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", 404);
      let m = await h.arrayBuffer();
      return Ne(await za(m), u.videoHash) || P("\uC601\uC0C1 \uBB34\uACB0\uC131 \uAC80\uC99D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.", 409), new Response(m, { headers: { "Content-Type": "video/mp4", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Content-Length": String(m.byteLength) } });
    }
  }
  P("\uC694\uCCAD\uD55C \uAE30\uB2A5\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.", 404);
}
__name(mo, "mo");
var cc = { async fetch(n18, e) {
  try {
    let t = new URL(n18.url).pathname;
    if (t.startsWith("/api/")) return e.BUCKET ? await mo(n18, e) : ne({ error: "\uD30C\uC77C \uC800\uC7A5\uC18C\uAC00 \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." }, 503);
    let r = ar[t] || (t.includes(".") ? null : ar["/index.html"]);
    return r ? new Response(r.body, { headers: { "Content-Type": r.type, "X-Content-Type-Options": "nosniff", "Referrer-Policy": "same-origin", "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' https://public-01.testnet.bifrostnetwork.com https://public-02.testnet.bifrostnetwork.com; frame-ancestors 'self' https://chatgpt.com" } }) : new Response("Not found", { status: 404 });
  } catch (t) {
    return ne({ error: t.status ? t.message : "\uC694\uCCAD \uCC98\uB9AC \uC911 \uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." }, t.status || 500);
  }
} };

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-1LGQIw/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = cc;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-1LGQIw/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default,
  lr as rpc,
  xn as snapshot
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=index.js.map
