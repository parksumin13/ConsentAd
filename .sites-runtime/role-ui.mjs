// src/terms.js
var UNITS = { days: 86400n, hours: 3600n, minutes: 60n, seconds: 1n };
var MAX_UINT = (1n << 256n) - 1n;
var MAX_DURATION = (1n << 64n) - 1n;
function integer(value, label) {
  if (!/^(0|[1-9]\d*)$/.test(String(value))) throw new Error(label + "\uC740 0 \uC774\uC0C1\uC758 \uC815\uC218\uB85C \uC785\uB825\uD574\uC8FC\uC138\uC694.");
  const n = BigInt(value);
  if (n > MAX_UINT) throw new Error(label + "\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4.");
  return n;
}
function validateTerms(form) {
  const rightsFee = integer(form.rightsFee, "\uAD8C\uB9AC\uC790 \uC9C0\uAE09\uC561"), platformFee = integer(form.platformFee, "\uD50C\uB7AB\uD3FC \uC9C0\uAE09\uC561");
  const total = rightsFee + platformFee;
  if (total === 0n) throw new Error("\uCD1D \uC608\uCE58\uAE08\uC740 0\uBCF4\uB2E4 \uCEE4\uC57C \uD569\uB2C8\uB2E4.");
  if (total > MAX_UINT) throw new Error("\uCD1D \uC9C0\uAE09\uC561\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4.");
  function duration(value, unit, label) {
    if (!UNITS[unit]) throw new Error("\uAE30\uAC04 \uB2E8\uC704\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.");
    const n = integer(value, label) * UNITS[unit];
    if (n === 0n || n > MAX_DURATION) throw new Error(label + "\uC740 1\uCD08 \uC774\uC0C1\uC774\uBA70 \uC9C0\uC6D0 \uBC94\uC704 \uC548\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
    return n;
  }
  return { rightsFee, platformFee, total, executionSeconds: duration(form.executionValue, form.executionUnit, "\uC9D1\uD589 \uAE30\uD55C"), usageSeconds: duration(form.usageValue, form.usageUnit, "\uC0AC\uC6A9 \uAE30\uAC04") };
}
function formatCAD(v) {
  if (v == null || v === "") return "\u2014";
  try {
    return BigInt(v).toLocaleString("ko-KR");
  } catch {
    return "\u2014";
  }
}
function formatDuration(value) {
  if (value == null) return "\uC870\uD68C \uD544\uC694";
  try {
    const n = BigInt(value);
    for (const [unit, seconds] of [["\uC77C", 86400n], ["\uC2DC\uAC04", 3600n], ["\uBD84", 60n]]) if (n > 0n && n % seconds === 0n) return (n / seconds).toLocaleString("ko-KR") + unit;
    return n.toLocaleString("ko-KR") + "\uCD08";
  } catch {
    return "\uC870\uD68C \uD544\uC694";
  }
}

// <stdin>
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserProvider, Contract, ContractFactory, formatUnits, isAddress } from "ethers";
import { ArrowUpRight, ArrowRight, Plus, Search, SlidersHorizontal, Wallet, ShieldCheck, Check, Lock, Play, ChevronRight, X, RefreshCw, ExternalLink, Copy, FileVideo, Upload, Eye, Settings, CheckCircle2, AlertCircle, Layers, LogOut, Link, Clock, LayoutGrid, Menu } from "lucide-react";

// src/chain.js
var CHAIN_ID = 49088;
var RPC = "https://public-01.testnet.bifrostnetwork.com/rpc";
var RPC_FALLBACK = "https://public-02.testnet.bifrostnetwork.com/rpc";
var ABI = [
  "function advertiser() view returns(address)",
  "function rightsHolder() view returns(address)",
  "function platform() view returns(address)",
  "function cad() view returns(address)",
  "function status() view returns(uint8)",
  "function videoHash() view returns(bytes32)",
  "function executionDeadline() view returns(uint256)",
  "function usageEnd() view returns(uint256)",
  "function RIGHTS_FEE() view returns(uint256)",
  "function PLATFORM_FEE() view returns(uint256)",
  "function TOTAL_FEE() view returns(uint256)",
  "function EXECUTION_WINDOW() view returns(uint256)",
  "function USAGE_PERIOD() view returns(uint256)",
  "function escrowBalance() view returns(uint256)",
  "function registerAd(bytes32)",
  "function deposit()",
  "function approveUse()",
  "function rejectUse()",
  "function activateAd(bytes32)",
  "function refund()",
  "function isPublishable(bytes32) view returns(bool)",
  "event AdRegistered(bytes32 indexed videoHash,uint256 executionDeadline)",
  "event EscrowFunded(address indexed advertiser,uint256 amount)",
  "event UseApproved(address indexed rightsHolder)",
  "event UseRejected(address indexed rightsHolder)",
  "event AdActivated(bytes32 indexed videoHash,uint256 usageEnd)",
  "event EscrowRefunded(address indexed advertiser,uint256 amount)"
];
var TOKEN_ABI = ["function approve(address,uint256) returns(bool)", "function allowance(address,address) view returns(uint256)", "function balanceOf(address) view returns(uint256)", "function decimals() view returns(uint8)", "function symbol() view returns(string)"];
var STATUS = ["\uB4F1\uB85D \uC804", "\uC608\uCE58 \uB300\uAE30", "\uC2B9\uC778 \uB300\uAE30", "\uC9D1\uD589 \uB300\uAE30", "\uAC8C\uC2DC \uC911", "\uC0AC\uC6A9 \uAC70\uC808", "\uD658\uBD88 \uC644\uB8CC"];
var same = (a, b) => !!a && !!b && a.toLowerCase() === b.toLowerCase();
function roleOf(ad, wallet) {
  return ["advertiser", "rightsHolder", "platform"].find((r) => same(ad[r], wallet)) || "public";
}
function effective(ad, now = Date.now() / 1e3) {
  if (ad.status === 4 && now > Number(ad.usageEnd)) return "\uAE30\uAC04 \uC885\uB8CC";
  if ([1, 2, 3].includes(ad.status) && now > Number(ad.executionDeadline)) return "\uC9D1\uD589 \uAE30\uD55C \uC885\uB8CC";
  return STATUS[ad.status] || "\uC870\uD68C \uBD88\uAC00";
}
function can(ad, role, action, now = Date.now() / 1e3) {
  const expired = now > Number(ad.executionDeadline);
  return { approve: role === "advertiser" && ad.status === 1 && !expired, deposit: role === "advertiser" && ad.status === 1 && !expired, approveUse: role === "rightsHolder" && ad.status === 2 && !expired, rejectUse: role === "rightsHolder" && [2, 3].includes(ad.status), activateAd: role === "platform" && ad.status === 3 && !expired, refund: role === "advertiser" && [2, 3, 5].includes(ad.status) && (ad.status === 5 || expired) }[action] || false;
}

// <stdin>
var short = (a) => a ? a.slice(0, 6) + "\u2026" + a.slice(-4) : "\uC5F0\uACB0 \uC804";
var date = (t) => Number(t) ? new Date(Number(t) * 1e3).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "\u2014";
var roles = { public: { name: "\uC804\uCCB4 \uAD11\uACE0", en: "AD DISCOVER", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "\uB3D9\uC758\uAC00 \uBAA8\uC774\uBA74,", /* @__PURE__ */ React.createElement("br", null), "\uAD11\uACE0\uAC00 \uC2DC\uC791\uB429\uB2C8\uB2E4."), desc: "\uC601\uC0C1 \uB4F1\uB85D\uBD80\uD130 \uC2B9\uC778, \uC9D1\uD589\uACFC \uC815\uC0B0\uAE4C\uC9C0. \uAD11\uACE0\uC758 \uBAA8\uB4E0 \uACFC\uC815\uC744 \uD22C\uBA85\uD558\uAC8C \uD655\uC778\uD558\uC138\uC694." }, advertiser: { name: "\uAD11\uACE0\uC8FC", en: "ADVERTISER", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "\uC544\uC774\uB514\uC5B4\uB97C \uB4F1\uB85D\uD558\uACE0,", /* @__PURE__ */ React.createElement("br", null), "\uC2E0\uB8B0\uB97C \uC313\uC544\uBCF4\uC138\uC694."), desc: "\uB0B4\uAC00 \uB4F1\uB85D\uD55C \uAD11\uACE0\uB97C \uBAA8\uC544\uBCF4\uACE0, \uAD11\uACE0\uBE44 \uC608\uCE58\uC640 \uD658\uBD88\uC744 \uAD00\uB9AC\uD558\uC138\uC694." }, rightsHolder: { name: "\uAD8C\uB9AC\uC790", en: "RIGHTS HOLDER", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "\uB0B4 \uBAA9\uC18C\uB9AC\uC640 \uC5BC\uAD74,", /* @__PURE__ */ React.createElement("br", null), "\uB0B4 \uB3D9\uC758\uB85C \uC2DC\uC791\uD569\uB2C8\uB2E4."), desc: "\uB0B4 \uAD8C\uB9AC\uAC00 \uD3EC\uD568\uB41C \uC601\uC0C1\uC744 \uD655\uC778\uD558\uACE0, \uAD11\uACE0 \uC0AC\uC6A9\uC744 \uC2B9\uC778\uD558\uAC70\uB098 \uAC70\uC808\uD558\uC138\uC694." }, platform: { name: "\uD50C\uB7AB\uD3FC", en: "PLATFORM", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "\uD655\uC778\uB41C \uB3D9\uC758\uB85C,", /* @__PURE__ */ React.createElement("br", null), "\uCC45\uC784 \uC788\uAC8C \uC9D1\uD589\uD558\uC138\uC694."), desc: "\uAD8C\uB9AC\uC790 \uC2B9\uC778\uACFC \uC601\uC0C1 \uD574\uC2DC\uB97C \uD655\uC778\uD558\uACE0, \uAD11\uACE0 \uAC8C\uC2DC\uC640 \uC815\uC0B0\uC744 \uC9C4\uD589\uD558\uC138\uC694." } };
var demoData = [["\uC628\uC804\uD788 \uB098\uB2E4\uC6B4, \uC624\uB298\uC758 \uBAA9\uC18C\uB9AC", "\uB77C\uC774\uD504\uC2A4\uD0C0\uC77C", 3, "lime", "VOICE / ORIGINAL"], ["\uC0C8\uB85C\uC6B4 \uD558\uB8E8\uB97C \uC5EC\uB294 \uD55C \uC794", "\uC74C\uB8CC\xB7\uC2DD\uD488", 2, "peach", "A GOOD START"], ["\uB3C4\uC2DC\uB97C \uB2EC\uB9AC\uB294 \uC0C8\uB85C\uC6B4 \uBC29\uC2DD", "\uBAA8\uBE4C\uB9AC\uD2F0", 4, "blue", "MOVE FORWARD"], ["\uD53C\uBD80\uC5D0 \uB2FF\uB294 \uC791\uC740 \uBCC0\uD654", "\uBDF0\uD2F0", 1, "pink", "LESS, BUT BETTER"], ["\uC6B0\uB9AC\uC758 \uB0B4\uC77C\uC744 \uC704\uD55C \uC120\uD0DD", "\uBE0C\uB79C\uB4DC", 5, "sand", "FOR TOMORROW"], ["\uB4E3\uACE0 \uC2F6\uC740 \uC21C\uAC04\uC744 \uB2F4\uB2E4", "\uD14C\uD06C", 6, "purple", "SOUND OF YOU"]].map((x, i) => ({ address: "0x" + String(i + 1).padStart(40, "0"), title: x[0], category: x[1], status: x[2], theme: x[3], art: x[4], advertiser: "0x49fCca18488eB17276E76D8FFFbE84D6d3ca9cC9", rightsHolder: "0x258df63a63c39682481f0A5d74c8B3fAf7Edf6Bf", platform: "0x292B2005f82De524121b147000642780e423A479", RIGHTS_FEE: "200", PLATFORM_FEE: "800", TOTAL_FEE: "1000", EXECUTION_WINDOW: "604800", USAGE_PERIOD: "2592000", escrowBalance: [2, 3].includes(x[2]) ? "1000" : "0", executionDeadline: Math.floor(Date.now() / 1e3) + 86400 * (i + 1), usageEnd: Math.floor(Date.now() / 1e3) + 86400 * 30, videoHash: "0x" + "1".repeat(64), playable: x[2] === 4, hasVideo: false, demo: true, blockNumber: 123456 + i }));
async function api(path, opt = {}) {
  const r = await fetch("/api" + path, { ...opt, headers: opt.body instanceof FormData ? opt.headers : { "Content-Type": "application/json", ...opt.headers } });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error || "\uC694\uCCAD \uC2E4\uD328");
  return d;
}
function errorText(e) {
  let s = e.reason || e.shortMessage || e.message || String(e);
  const map = { "Deposit first": "\uBA3C\uC800 \uAD11\uACE0\uBE44\uB97C \uC608\uCE58\uD574\uC8FC\uC138\uC694.", "Not approved": "\uAD8C\uB9AC\uC790 \uC2B9\uC778 \uD6C4 \uC9D1\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", "Only rights holder": "\uC9C0\uC815\uB41C \uAD8C\uB9AC\uC790 \uC9C0\uAC11\uC73C\uB85C \uC5F0\uACB0\uD574\uC8FC\uC138\uC694.", "Only advertiser": "\uC9C0\uC815\uB41C \uAD11\uACE0\uC8FC \uC9C0\uAC11\uC73C\uB85C \uC5F0\uACB0\uD574\uC8FC\uC138\uC694.", "Only platform": "\uC9C0\uC815\uB41C \uD50C\uB7AB\uD3FC \uC9C0\uAC11\uC73C\uB85C \uC5F0\uACB0\uD574\uC8FC\uC138\uC694.", "Deadline passed": "\uC9D1\uD589 \uAE30\uD55C\uC774 \uC9C0\uB0AC\uC2B5\uB2C8\uB2E4. \uC608\uCE58\uAE08 \uD658\uBD88\uC744 \uD655\uC778\uD558\uC138\uC694.", "Video hash mismatch": "\uC601\uC0C1 \uD574\uC2DC\uAC00 \uB2E4\uB985\uB2C8\uB2E4. \uB4F1\uB85D\uD55C \uC6D0\uBCF8 \uD30C\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694.", "ERC20InsufficientAllowance": "CAD \uC9C0\uCD9C \uD5C8\uC6A9 \uD55C\uB3C4\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4. \uC9C0\uCD9C \uD5C8\uC6A9 \uD6C4 \uC608\uCE58\uD558\uC138\uC694.", "ERC20InsufficientBalance": "CAD \uC794\uC561\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.", "user rejected": "MetaMask \uC694\uCCAD\uC744 \uCDE8\uC18C\uD588\uC2B5\uB2C8\uB2E4.", "insufficient funds": "\uC218\uC218\uB8CC\uC6A9 \uD14C\uC2A4\uD2B8 BFC\uAC00 \uBD80\uC871\uD569\uB2C8\uB2E4." };
  for (const [k, v] of Object.entries(map)) if (s.includes(k)) return v;
  return s.slice(0, 250);
}
async function fileHash(file) {
  const b = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return "0x" + Array.from(new Uint8Array(b), (x) => x.toString(16).padStart(2, "0")).join("");
}
async function thumbnail(file) {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    const u = URL.createObjectURL(file);
    v.muted = true;
    v.preload = "auto";
    v.src = u;
    let done = false;
    const timer = setTimeout(() => finish(new Error("\uC601\uC0C1 \uBBF8\uB9AC\uBCF4\uAE30\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 MP4 \uD30C\uC77C\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.")), 15e3);
    function finish(e, b) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      URL.revokeObjectURL(u);
      v.removeAttribute("src");
      v.load();
      e ? reject(e) : resolve(b);
    }
    v.onloadedmetadata = () => {
      v.currentTime = Math.min(1, (v.duration || 2) / 2);
    };
    v.onseeked = () => {
      try {
        const c = document.createElement("canvas");
        c.width = 640;
        c.height = 360;
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#254b42";
        ctx.fillRect(0, 0, 640, 360);
        ctx.filter = "blur(24px)";
        ctx.drawImage(v, -24, -24, 688, 408);
        ctx.filter = "none";
        ctx.fillStyle = "rgba(14,39,33,.18)";
        ctx.fillRect(0, 0, 640, 360);
        c.toBlob((b) => finish(b ? null : new Error("\uC378\uB124\uC77C \uC0DD\uC131 \uC2E4\uD328"), b), "image/jpeg", 0.75);
      } catch (e) {
        finish(e);
      }
    };
    v.onerror = () => finish(new Error("\uBE0C\uB77C\uC6B0\uC800\uAC00 \uC77D\uC744 \uC218 \uC788\uB294 MP4 \uD30C\uC77C\uC744 \uC0AC\uC6A9\uD558\uC138\uC694."));
  });
}
function IconButton({ icon: Icon, label, ...props }) {
  return /* @__PURE__ */ React.createElement("button", { className: "icon-button", "aria-label": label, title: label, ...props }, /* @__PURE__ */ React.createElement(Icon, { size: 18 }));
}
function Modal({ title, children, onClose, wide = false }) {
  useEffect(() => {
    const f = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", f);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", f);
      document.body.style.overflow = prev;
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("section", { role: "dialog", "aria-modal": "true", "aria-label": title, className: "modal " + (wide ? "wide" : ""), onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "modal-head" }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement(IconButton, { icon: X, label: "\uB2EB\uAE30", onClick: onClose })), children));
}
function App() {
  const [page, setPage] = useState(location.hash.slice(1) || "public"), [wallet, setWallet] = useState(""), [session, setSession] = useState(""), [chain, setChain] = useState(null), [ads, setAds] = useState([]), [demo, setDemo] = useState(false), [loading, setLoading] = useState(true), [failure, setFailure] = useState(""), [query, setQuery] = useState(""), [filter, setFilter] = useState("\uC804\uCCB4"), [selected, setSelected] = useState(null), [modal, setModal] = useState(""), [busy, setBusy] = useState(""), [notice, setNotice] = useState(null), [scope, setScope] = useState("mine"), [token, setToken] = useState(localStorage.getItem("consent-cad") || ""), [txs, setTxs] = useState([]);
  const pageInfo = roles[page] || roles.public;
  useEffect(() => {
    const onHash = () => setPage(roles[location.hash.slice(1)] ? location.hash.slice(1) : "public");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  function nav(p) {
    setPage(p);
    location.hash = p;
    setScope("mine");
    setFilter("\uC804\uCCB4");
    setQuery("");
    setModal("");
  }
  function openRegistration(kind = "create") {
    nav("advertiser");
    setModal(kind);
  }
  async function refresh() {
    setLoading(true);
    setFailure("");
    try {
      let all = [], cursor;
      do {
        const d = await api("/ads" + (cursor ? "?cursor=" + encodeURIComponent(cursor) : ""));
        all.push(...d.ads);
        cursor = d.cursor;
      } while (cursor);
      setAds(all);
      if (selected && !selected.demo) {
        const d = all.find((x) => same(x.address, selected.address));
        if (d) setSelected(d);
      }
    } catch (e) {
      setFailure(errorText(e));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
    api("/session").then((d) => setSession(d.address || "")).catch(() => {
    });
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((a) => setWallet(a[0] || ""));
      window.ethereum.request({ method: "eth_chainId" }).then((c) => setChain(Number(c)));
      const accounts = (a) => {
        setWallet(a[0] || "");
        setSession("");
        api("/auth/logout", { method: "POST" }).catch(() => {
        });
        setNotice({ type: "info", text: "\uC9C0\uAC11\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uC6D0\uBCF8 \uAC80\uD1A0 \uC804 \uB2E4\uC2DC \uBCF8\uC778 \uD655\uC778\uC744 \uD574\uC8FC\uC138\uC694." });
      };
      const chains = (c) => {
        setChain(Number(c));
        setSession("");
        api("/auth/logout", { method: "POST" }).catch(() => {
        });
      };
      window.ethereum.on("accountsChanged", accounts);
      window.ethereum.on("chainChanged", chains);
      return () => {
        window.ethereum.removeListener("accountsChanged", accounts);
        window.ethereum.removeListener("chainChanged", chains);
      };
    }
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      if (!demo) refresh();
    }, 3e4);
    return () => clearInterval(t);
  }, [demo, selected?.address]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 9e3);
    return () => clearTimeout(t);
  }, [notice]);
  async function provider() {
    if (!window.ethereum) throw new Error("MetaMask\uAC00 \uC124\uCE58\uB41C Chrome\uC5D0\uC11C \uC0AC\uC774\uD2B8\uB97C \uC5F4\uC5B4\uC8FC\uC138\uC694.");
    const c = Number(await window.ethereum.request({ method: "eth_chainId" }));
    if (c !== CHAIN_ID) throw new Error("Bifrost Testnet(49088)\uC73C\uB85C \uB124\uD2B8\uC6CC\uD06C\uB97C \uC804\uD658\uD574\uC8FC\uC138\uC694.");
    const p = new BrowserProvider(window.ethereum);
    const signer = await p.getSigner();
    const a = await signer.getAddress();
    setWallet(a);
    return { p, signer, address: a };
  }
  async function switchChain() {
    if (!window.ethereum) throw new Error("MetaMask\uB97C \uBA3C\uC800 \uC124\uCE58\uD574\uC8FC\uC138\uC694.");
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0xbfc0" }] });
    } catch (e) {
      if (e.code === 4902) await window.ethereum.request({ method: "wallet_addEthereumChain", params: [{ chainId: "0xbfc0", chainName: "Bifrost Testnet", rpcUrls: [RPC, RPC_FALLBACK], nativeCurrency: { name: "BFC", symbol: "BFC", decimals: 18 } }] });
      else throw e;
    }
    setChain(CHAIN_ID);
  }
  async function connect() {
    await window.ethereum?.request({ method: "eth_requestAccounts" });
    await switchChain();
    const { signer, address } = await provider();
    setBusy("\uC9C0\uAC11 \uC11C\uBA85 \uD655\uC778 \uC911");
    const n = await api("/auth/nonce", { method: "POST", body: JSON.stringify({ address }) });
    const signature = await signer.signMessage(n.message);
    const s = await api("/auth/verify", { method: "POST", body: JSON.stringify({ nonce: n.nonce, signature }) });
    setSession(s.address);
    setNotice({ type: "success", text: "\uC9C0\uAC11 \uBCF8\uC778 \uD655\uC778 \uC644\uB8CC. \uB0B4 \uAD11\uACE0\uC640 \uAC80\uD1A0\uC6A9 \uC601\uC0C1\uC5D0 \uC811\uADFC\uD560 \uC218 \uC788\uC5B4\uC694." });
  }
  async function run(label, fn) {
    if (busy) return;
    setBusy(label);
    try {
      await fn();
    } catch (e) {
      setNotice({ type: "error", text: errorText(e) });
    } finally {
      setBusy("");
    }
  }
  async function ensureSession() {
    const { address } = await provider();
    if (!same(session, address)) {
      await connect();
    }
    return address;
  }
  async function track(tx, label) {
    const hash = tx.hash;
    setTxs((t) => [{ hash, label, state: "pending" }, ...t].slice(0, 20));
    setBusy(label + " \xB7 \uAC70\uB798 \uD655\uC815 \uB300\uAE30");
    let receipt;
    try {
      receipt = await tx.wait();
      if (!receipt || receipt.status !== 1) throw new Error("\uAC70\uB798\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    } catch (e) {
      setTxs((t) => t.map((v) => v.hash === hash ? { ...v, state: "failed" } : v));
      throw e;
    }
    setTxs((t) => t.map((v) => v.hash === hash ? { ...v, state: "success" } : v));
    setNotice({ type: "success", text: label + " \uC644\uB8CC \xB7 \uBE14\uB85D " + receipt.blockNumber });
    return receipt;
  }
  async function transact(ad, action, actual) {
    await ensureSession();
    const { signer, address } = await provider();
    if (!can(ad, roleOf(ad, address), action)) throw new Error("\uD604\uC7AC \uC0C1\uD0DC \uB610\uB294 \uC5F0\uACB0\uD55C \uC9C0\uAC11\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    const c = new Contract(ad.address, ABI, signer);
    if (action === "approve") {
      const t = new Contract(ad.cad, TOKEN_ABI, signer);
      const dec = await t.decimals();
      if (Number(dec) !== 0) throw new Error("\uC18C\uC218\uC810 0\uC790\uB9AC CADToken\uC744 \uC5F0\uACB0\uD574\uC8FC\uC138\uC694.");
      await track(await t.approve(ad.address, BigInt(ad.TOTAL_FEE)), "CAD \uC9C0\uCD9C \uD5C8\uC6A9");
    } else {
      if (action === "deposit") {
        const t = new Contract(ad.cad, TOKEN_ABI, signer);
        if (await t.balanceOf(address) < BigInt(ad.TOTAL_FEE)) throw new Error("CAD \uC794\uC561\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4.");
        if (await t.allowance(address, ad.address) < BigInt(ad.TOTAL_FEE)) throw new Error("\uBA3C\uC800 CAD \uC9C0\uCD9C \uD5C8\uC6A9\uC744 \uC2E4\uD589\uD574\uC8FC\uC138\uC694.");
      }
      if (action === "activateAd" && !same(actual, ad.videoHash)) throw new Error("Video hash mismatch");
      await track(await c[action](...action === "activateAd" ? [actual] : []), { deposit: "\uAD11\uACE0\uBE44 \uC608\uCE58", approveUse: "\uAD11\uACE0 \uC0AC\uC6A9 \uC2B9\uC778", rejectUse: "\uAD11\uACE0 \uC0AC\uC6A9 \uAC70\uC808", activateAd: "\uAD11\uACE0 \uC9D1\uD589 \xB7 \uC815\uC0B0", refund: "\uC608\uCE58\uAE08 \uD658\uBD88" }[action]);
    }
    await refresh();
  }
  const list = demo ? demoData : ads;
  const roleList = page === "public" || scope === "all" ? list : list.filter((ad) => same(ad[page], wallet));
  const shown = roleList.filter((ad) => (filter === "\uC804\uCCB4" || effective(ad) === filter) && (ad.title + " " + ad.category + " " + ad.address).toLowerCase().includes(query.toLowerCase()));
  const active = list.filter((x) => x.status === 4 && effective(x) === "\uAC8C\uC2DC \uC911").length;
  const pending = list.filter((x) => [1, 2, 3].includes(x.status)).length;
  return /* @__PURE__ */ React.createElement("div", { className: "app-shell", "data-page": page }, /* @__PURE__ */ React.createElement("div", { className: "network-strip" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), "BIFROST TESTNET ", /* @__PURE__ */ React.createElement("span", { className: "strip-divider" }, "/"), " \uB3D9\uC758\uC640 \uC815\uC0B0\uC744 \uC5F0\uACB0\uD558\uB294 \uAD11\uACE0 \uD50C\uB7AB\uD3FC ", /* @__PURE__ */ React.createElement("span", { className: "strip-right" }, demo ? "\uC608\uC2DC \uB370\uC774\uD130" : "ON-CHAIN AD WORKSPACE")), /* @__PURE__ */ React.createElement("header", null, /* @__PURE__ */ React.createElement("a", { className: "brand", href: "#public", onClick: () => nav("public") }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark" }, /* @__PURE__ */ React.createElement(Layers, { size: 23 })), "consent", /* @__PURE__ */ React.createElement("span", null, "ad"), /* @__PURE__ */ React.createElement("small", null, "\u03B2")), /* @__PURE__ */ React.createElement("nav", null, Object.entries(roles).map(([k, r]) => /* @__PURE__ */ React.createElement("button", { key: k, className: page === k ? "nav-active" : "", onClick: () => nav(k) }, r.name, k === "public" && /* @__PURE__ */ React.createElement("span", { className: "nav-count" }, list.length)))), /* @__PURE__ */ React.createElement("div", { className: "header-actions" }, /* @__PURE__ */ React.createElement(IconButton, { icon: Settings, label: "\uACC4\uC57D \uC5F0\uACB0 \uC124\uC815", onClick: () => setModal("settings") }), /* @__PURE__ */ React.createElement("button", { className: "wallet-button", onClick: () => run("\uC9C0\uAC11 \uC5F0\uACB0 \uC911", connect) }, /* @__PURE__ */ React.createElement(Wallet, { size: 17 }), wallet ? short(wallet) : "\uC9C0\uAC11 \uC5F0\uACB0", same(wallet, session) && /* @__PURE__ */ React.createElement("span", { className: "wallet-dot" })))), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("div", { className: "hero-content", key: page }, /* @__PURE__ */ React.createElement("div", { className: "hero-copy" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, /* @__PURE__ */ React.createElement("span", null), " CONSENT FIRST, ALWAYS."), /* @__PURE__ */ React.createElement("h1", null, pageInfo.title), /* @__PURE__ */ React.createElement("p", null, pageInfo.desc), /* @__PURE__ */ React.createElement("div", { className: "hero-actions" }, (page === "public" || page === "advertiser") && /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: () => openRegistration() }, /* @__PURE__ */ React.createElement(Plus, { size: 18 }), "\uC0C8 \uAD11\uACE0 \uB4F1\uB85D"), /* @__PURE__ */ React.createElement("button", { className: "text-button", onClick: () => document.getElementById("campaigns").scrollIntoView({ behavior: "smooth" }) }, "\uC9C4\uD589 \uC911\uC778 \uAD11\uACE0 \uBCF4\uAE30 ", /* @__PURE__ */ React.createElement(ArrowDown, null)))), /* @__PURE__ */ React.createElement(CubeNetwork, null))), page === "public" && /* @__PURE__ */ React.createElement("section", { className: "overview" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "overview-icon" }, /* @__PURE__ */ React.createElement(LayoutGrid, { size: 21 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "\uB4F1\uB85D\uB41C \uAD11\uACE0"), /* @__PURE__ */ React.createElement("strong", null, String(list.length).padStart(2, "0"), /* @__PURE__ */ React.createElement("small", null, "\uAC74")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "overview-icon" }, /* @__PURE__ */ React.createElement(Clock, { size: 21 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "\uC2B9\uC778\xB7\uC9D1\uD589 \uC9C4\uD589 \uC911"), /* @__PURE__ */ React.createElement("strong", null, String(pending).padStart(2, "0"), /* @__PURE__ */ React.createElement("small", null, "\uAC74")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "overview-icon" }, /* @__PURE__ */ React.createElement(Play, { size: 21 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "\uD604\uC7AC \uAC8C\uC2DC \uC911"), /* @__PURE__ */ React.createElement("strong", null, String(active).padStart(2, "0"), /* @__PURE__ */ React.createElement("small", null, "\uAC74")))), /* @__PURE__ */ React.createElement("div", { className: "overview-message" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 24 }), /* @__PURE__ */ React.createElement("p", null, "\uBAA8\uB4E0 \uC9C4\uD589 \uC0C1\uD0DC\uB294 \uACF5\uAC1C\uD558\uACE0,", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("b", null, "\uAC8C\uC2DC \uC804 \uC6D0\uBCF8 \uC601\uC0C1\uC740 \uBCF4\uD638\uD569\uB2C8\uB2E4.")))), wallet && chain !== CHAIN_ID && /* @__PURE__ */ React.createElement("div", { className: "alert warning" }, /* @__PURE__ */ React.createElement(AlertCircle, { size: 18 }), "\uB2E4\uB978 \uB124\uD2B8\uC6CC\uD06C\uC5D0 \uC5F0\uACB0\uB418\uC5B4 \uC788\uC5B4\uC694.", /* @__PURE__ */ React.createElement("button", { onClick: () => run("\uB124\uD2B8\uC6CC\uD06C \uC804\uD658", switchChain) }, "Bifrost \uD14C\uC2A4\uD2B8\uB137\uC73C\uB85C \uC804\uD658")), demo && /* @__PURE__ */ React.createElement("div", { className: "alert demo-alert" }, /* @__PURE__ */ React.createElement(Eye, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, "\uC608\uC2DC \uD654\uBA74\uC785\uB2C8\uB2E4. \uC2E4\uC81C \uACC4\uC57D\xB7\uC794\uC561\xB7\uC601\uC0C1\uACFC \uAD00\uACC4\uC5C6\uC73C\uBA70 \uAC70\uB798\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setDemo(false);
    setSelected(null);
  } }, "\uC2E4\uC81C \uAD11\uACE0 \uBCF4\uAE30 ", /* @__PURE__ */ React.createElement(ArrowRight, { size: 15 }))), /* @__PURE__ */ React.createElement("section", { id: "campaigns", className: "campaigns" }, /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, pageInfo.en), /* @__PURE__ */ React.createElement("h2", null, page === "public" ? "\uAD11\uACE0 \uB458\uB7EC\uBCF4\uAE30" : pageInfo.name + " \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4", /* @__PURE__ */ React.createElement("span", null, roleList.length)), page === "public" && /* @__PURE__ */ React.createElement("p", null, "\uD55C \uC7A5\uC758 \uBBF8\uB9AC\uBCF4\uAE30 \uB108\uBA38, \uAD11\uACE0\uC758 \uC9C4\uD589 \uACFC\uC815\uC744 \uD655\uC778\uD558\uC138\uC694.")), /* @__PURE__ */ React.createElement("div", { className: "section-actions" }, (page === "public" || page === "advertiser") && /* @__PURE__ */ React.createElement("button", { className: "secondary", onClick: () => openRegistration("import") }, /* @__PURE__ */ React.createElement(Link, { size: 16 }), "\uAE30\uC874 \uACC4\uC57D \uC5F0\uACB0"), /* @__PURE__ */ React.createElement(IconButton, { icon: RefreshCw, label: "\uC0C1\uD0DC \uC0C8\uB85C\uACE0\uCE68", disabled: loading, onClick: refresh }))), page !== "public" && /* @__PURE__ */ React.createElement("div", { className: "scope-tabs" }, /* @__PURE__ */ React.createElement("button", { className: scope === "mine" ? "chosen" : "", onClick: () => setScope("mine") }, "\uB0B4\uAC00 ", page === "advertiser" ? "\uB4F1\uB85D\uD55C" : page === "rightsHolder" ? "\uAD8C\uB9AC\uC790\uC778" : "\uC9D1\uD589\uD558\uB294", " \uAD11\uACE0"), /* @__PURE__ */ React.createElement("button", { className: scope === "all" ? "chosen" : "", onClick: () => setScope("all") }, "\uC804\uCCB4 \uAD11\uACE0 \uBCF4\uAE30"), !wallet && /* @__PURE__ */ React.createElement("span", null, "\uC9C0\uAC11\uC744 \uC5F0\uACB0\uD558\uBA74 \uB0B4 \uAD11\uACE0\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694.")), /* @__PURE__ */ React.createElement("div", { className: "filter-bar" }, /* @__PURE__ */ React.createElement("div", { className: "filters" }, ["\uC804\uCCB4", "\uC608\uCE58 \uB300\uAE30", "\uC2B9\uC778 \uB300\uAE30", "\uC9D1\uD589 \uB300\uAE30", "\uAC8C\uC2DC \uC911", "\uC0AC\uC6A9 \uAC70\uC808", "\uD658\uBD88 \uC644\uB8CC", "\uAE30\uAC04 \uC885\uB8CC", "\uC9D1\uD589 \uAE30\uD55C \uC885\uB8CC"].map((f) => /* @__PURE__ */ React.createElement("button", { key: f, className: filter === f ? "selected" : "", onClick: () => setFilter(f) }, f))), /* @__PURE__ */ React.createElement("label", { className: "search" }, /* @__PURE__ */ React.createElement(Search, { size: 17 }), /* @__PURE__ */ React.createElement("input", { "aria-label": "\uAD11\uACE0 \uAC80\uC0C9", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "\uAD11\uACE0\uBA85, \uCE74\uD14C\uACE0\uB9AC \uAC80\uC0C9" }))), failure && /* @__PURE__ */ React.createElement("div", { className: "alert warning" }, /* @__PURE__ */ React.createElement(AlertCircle, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, failure), /* @__PURE__ */ React.createElement("button", { onClick: refresh }, "\uB2E4\uC2DC \uC2DC\uB3C4")), /* @__PURE__ */ React.createElement("div", { className: "result-line" }, /* @__PURE__ */ React.createElement("span", null, filter === "\uC804\uCCB4" ? "\uBAA8\uB4E0 \uAD11\uACE0" : filter, " ", /* @__PURE__ */ React.createElement("b", null, shown.length)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "live-dot" }), demo ? "\uC608\uC2DC \uB370\uC774\uD130" : "30\uCD08\uB9C8\uB2E4 \uC0C1\uD0DC \uC5C5\uB370\uC774\uD2B8", /* @__PURE__ */ React.createElement("span", { className: "sort" }, "\uCD5C\uC2E0 \uB4F1\uB85D\uC21C \u2193"))), loading && !list.length ? /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "spin" }), /* @__PURE__ */ React.createElement("h3", null, "\uAD11\uACE0 \uC0C1\uD0DC\uB97C \uBD88\uB7EC\uC624\uACE0 \uC788\uC5B4\uC694"), /* @__PURE__ */ React.createElement("p", null, "Bifrost \uACC4\uC57D \uC0C1\uD0DC\uB97C \uD655\uC778\uD569\uB2C8\uB2E4.")) : shown.length ? /* @__PURE__ */ React.createElement("div", { className: "ad-grid" }, shown.map((ad, i) => /* @__PURE__ */ React.createElement(AdCard, { key: ad.address, ad, index: i, onClick: () => setSelected(ad) }))) : /* @__PURE__ */ React.createElement("div", { className: "empty" }, /* @__PURE__ */ React.createElement("span", { className: "empty-icon" }, /* @__PURE__ */ React.createElement(Layers, { size: 30 })), /* @__PURE__ */ React.createElement("h3", null, query || filter !== "\uC804\uCCB4" ? "\uC870\uAC74\uC5D0 \uB9DE\uB294 \uAD11\uACE0\uAC00 \uC5C6\uC5B4\uC694" : page !== "public" && !wallet ? "\uC9C0\uAC11\uC744 \uC5F0\uACB0\uD574 \uB0B4 \uAD11\uACE0\uB97C \uD655\uC778\uD558\uC138\uC694" : "\uCCAB \uBC88\uC9F8 \uAD11\uACE0\uB97C \uAE30\uB2E4\uB9AC\uACE0 \uC788\uC5B4\uC694"), /* @__PURE__ */ React.createElement("p", null, query ? "\uB2E4\uB978 \uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uAC70\uB098 \uD544\uD130\uB97C \uBC14\uAFD4\uBCF4\uC138\uC694." : page === "rightsHolder" ? "\uB0B4\uAC00 \uAD8C\uB9AC\uC790\uB85C \uC9C0\uC815\uB41C \uAD11\uACE0\uC758 \uC601\uC0C1\uC744 \uAC80\uD1A0\uD558\uACE0 \uC0AC\uC6A9 \uC5EC\uBD80\uB97C \uACB0\uC815\uD558\uC138\uC694." : page === "platform" ? "\uB0B4\uAC00 \uD50C\uB7AB\uD3FC\uC73C\uB85C \uC9C0\uC815\uB41C \uAD11\uACE0\uC758 \uC2B9\uC778 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uACE0 \uC9D1\uD589\uD558\uC138\uC694." : "Remix\uC5D0\uC11C \uBC30\uD3EC\uD55C \uACC4\uC57D\uC744 \uC5F0\uACB0\uD558\uAC70\uB098, \uC5EC\uAE30\uC11C \uC0C8 \uAD11\uACE0\uB97C \uB9CC\uB4E4\uC5B4\uBCF4\uC138\uC694."), /* @__PURE__ */ React.createElement("div", null, page === "public" || page === "advertiser" ? /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: () => openRegistration("import") }, "\uAE30\uC874 \uACC4\uC57D \uC5F0\uACB0 ", /* @__PURE__ */ React.createElement(ArrowRight, { size: 16 })) : !wallet ? /* @__PURE__ */ React.createElement("button", { className: "primary", onClick: () => run("\uC9C0\uAC11 \uC5F0\uACB0 \uC911", connect) }, "\uC9C0\uAC11 \uC5F0\uACB0 ", /* @__PURE__ */ React.createElement(Wallet, { size: 16 })) : null, /* @__PURE__ */ React.createElement("button", { className: "secondary", onClick: () => setDemo(true) }, "\uC608\uC2DC \uD654\uBA74 \uB458\uB7EC\uBCF4\uAE30")))), page === "platform" && /* @__PURE__ */ React.createElement("section", { className: "youtube-setup" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "YouTube \uC790\uB3D9 \uAC8C\uC2DC"), /* @__PURE__ */ React.createElement("span", { className: "youtube-pending" }, "\uBBF8\uC5F0\uACB0"), /* @__PURE__ */ React.createElement("p", null, "\uD604\uC7AC\uB294 \uC774 \uC0AC\uC774\uD2B8 \uC548\uC5D0\uC11C \uAD11\uACE0\uB97C \uAC8C\uC2DC\uD569\uB2C8\uB2E4. YouTube \uC790\uB3D9 \uC5C5\uB85C\uB4DC\uB294 \uCC44\uB110 \uC778\uC99D\uACFC \uC5F0\uB3D9 \uC124\uC815\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.")), /* @__PURE__ */ React.createElement("button", { className: "secondary", onClick: () => setModal("youtube-guide") }, "\uC5F0\uB3D9 \uC900\uBE44 \uC548\uB0B4 ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 15 }))), /* @__PURE__ */ React.createElement("section", { className: "trust-note" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Lock, { size: 21 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "\uACF5\uAC1C\uB418\uB294 \uAC74 \uACFC\uC815, \uBCF4\uD638\uD558\uB294 \uAC74 \uC6D0\uBCF8."), /* @__PURE__ */ React.createElement("p", null, "\uAC8C\uC2DC \uC804\uC5D0\uB294 \uBE14\uB7EC \uBBF8\uB9AC\uBCF4\uAE30\uB9CC \uACF5\uAC1C\uB429\uB2C8\uB2E4. \uC9C0\uC815\uB41C \uCC38\uC5EC\uC790\uB294 \uC9C0\uAC11 \uC11C\uBA85 \uD6C4 \uC6D0\uBCF8\uC744 \uAC80\uD1A0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."))), /* @__PURE__ */ React.createElement("button", { onClick: () => setModal("guide") }, "\uC774\uC6A9 \uD750\uB984 \uC54C\uC544\uBCF4\uAE30 ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 18 })))), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("a", { className: "brand", href: "#public", onClick: () => nav("public") }, "consent", /* @__PURE__ */ React.createElement("span", null, "ad")), /* @__PURE__ */ React.createElement("p", null, "\uB3D9\uC758\uB85C \uC2DC\uC791\uD558\uACE0, \uC2E0\uB8B0\uB85C \uC774\uC5B4\uC9C0\uB294 \uAD11\uACE0."), /* @__PURE__ */ React.createElement("span", null, "Bifrost Testnet \xB7 \uC2E4\uC2B5\uC6A9 CAD \uD1A0\uD070"), /* @__PURE__ */ React.createElement("button", { onClick: () => setModal("settings") }, "\uC5F0\uACB0 \uC124\uC815")), modal === "settings" && /* @__PURE__ */ React.createElement(Modal, { title: "\uACC4\uC57D \uC5F0\uACB0 \uC124\uC815", onClose: () => setModal("") }, /* @__PURE__ */ React.createElement("p", { className: "modal-intro" }, "Remix\uC5D0\uC11C \uBC30\uD3EC\uD55C CADToken\uC744 \uC5F0\uACB0\uD558\uC138\uC694. \uAD11\uACE0 \uACC4\uC57D\uC740 \u2018\uAE30\uC874 \uACC4\uC57D \uC5F0\uACB0\u2019\uC5D0\uC11C \uAC01\uAC01 \uB4F1\uB85D\uD560 \uC218 \uC788\uC5B4\uC694."), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uB124\uD2B8\uC6CC\uD06C", /* @__PURE__ */ React.createElement("div", { className: "network-field" }, /* @__PURE__ */ React.createElement("span", { className: "dot" }), " Bifrost Testnet ", /* @__PURE__ */ React.createElement("b", null, "49088"))), /* @__PURE__ */ React.createElement("label", { className: "field" }, "CADToken \uACC4\uC57D \uC8FC\uC18C", /* @__PURE__ */ React.createElement("input", { value: token, onChange: (e) => setToken(e.target.value), placeholder: "0x\u2026 (\uC9C0\uAC11 \uC8FC\uC18C\uAC00 \uC544\uB2CC \uD1A0\uD070 \uACC4\uC57D \uC8FC\uC18C)" })), /* @__PURE__ */ React.createElement("button", { className: "primary full", disabled: !!busy, onClick: () => run("\uD1A0\uD070 \uD655\uC778 \uC911", async () => {
    await ensureSession();
    const d = await api("/token", { method: "POST", body: JSON.stringify({ address: token }) });
    localStorage.setItem("consent-cad", d.address);
    setToken(d.address);
    setNotice({ type: "success", text: "CADToken \uC5F0\uACB0 \uC644\uB8CC" });
    setModal("");
  }) }, "\uC8FC\uC18C \uD655\uC778 \uD6C4 \uC800\uC7A5 ", /* @__PURE__ */ React.createElement(Check, { size: 17 })), /* @__PURE__ */ React.createElement("div", { className: "divider-label" }, "\uC544\uC9C1 \uD1A0\uD070\uC744 \uBC30\uD3EC\uD558\uC9C0 \uC54A\uC558\uB2E4\uBA74"), /* @__PURE__ */ React.createElement("button", { className: "secondary full", disabled: !!busy, onClick: () => run("CADToken \uBC30\uD3EC", async () => {
    await ensureSession();
    const { signer } = await provider();
    const artifacts = await (await fetch("/contracts.json")).json();
    const c = await new ContractFactory(artifacts.CADToken.abi, artifacts.CADToken.bytecode, signer).deploy();
    await track(c.deploymentTransaction(), "CADToken \uBC30\uD3EC");
    const a = await c.getAddress();
    setToken(a);
    localStorage.setItem("consent-cad", a);
    setNotice({ type: "success", text: "CADToken \uBC30\uD3EC \uC644\uB8CC. \uD604\uC7AC \uC9C0\uAC11\uC5D0 10,000 CAD\uAC00 \uBC1C\uD589\uB410\uC5B4\uC694." });
  }) }, "\uC0C8 CADToken \uBC30\uD3EC"), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "\uC120\uD0DD\uD55C \uD1A0\uD070 \uC8FC\uC18C\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4. \uC0C8 \uAD11\uACE0\uB9C8\uB2E4 \uC9C0\uAE09\uC561\uACFC \uAE30\uAC04\uC744 \uC124\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBC30\uD3EC \uD6C4\uC5D0\uB294 \uD574\uB2F9 \uC870\uAC74\uC774 \uACE0\uC815\uB418\uBA70, \uBCC0\uACBD\uD558\uB824\uBA74 \uC0C8 \uAD11\uACE0 \uACC4\uC57D\uC744 \uB4F1\uB85D\uD569\uB2C8\uB2E4.")), page === "advertiser" && (modal === "create" || modal === "import") && /* @__PURE__ */ React.createElement(CreateModal, { importing: modal === "import", onClose: () => setModal(""), token, wallet, busy, run, ensureSession, provider, track, onDone: async (ad) => {
    setModal("");
    setDemo(false);
    await refresh();
    setSelected(ad);
  } }), modal === "youtube-guide" && /* @__PURE__ */ React.createElement(Modal, { title: "YouTube \uC5F0\uB3D9 \uC900\uBE44", onClose: () => setModal("") }, /* @__PURE__ */ React.createElement("p", { className: "modal-intro" }, "\uD604\uC7AC YouTube \uACC4\uC815\uC740 \uC5F0\uACB0\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC73C\uBA70, \uC9D1\uD589 \uBC84\uD2BC\uC744 \uB20C\uB7EC\uB3C4 YouTube\uC5D0 \uC5C5\uB85C\uB4DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { className: "guide-list" }, [["01", "Google Cloud \uC124\uC815", "YouTube Data API v3\uB97C \uD65C\uC131\uD654\uD558\uACE0 \uC6F9 \uC560\uD50C\uB9AC\uCF00\uC774\uC158\uC6A9 OAuth \uD074\uB77C\uC774\uC5B8\uD2B8\uB97C \uC900\uBE44\uD569\uB2C8\uB2E4."], ["02", "\uD50C\uB7AB\uD3FC \uCC44\uB110 \uC778\uC99D", "\uD50C\uB7AB\uD3FC \uC9C0\uAC11\uC758 \uC18C\uC720\uC790\uAC00 \uAC8C\uC2DC\uD560 YouTube \uCC44\uB110\uC744 \uC120\uD0DD\uD558\uACE0 \uC5C5\uB85C\uB4DC \uAD8C\uD55C\uC744 \uD5C8\uC6A9\uD574\uC57C \uD569\uB2C8\uB2E4. \uC9C0\uAC11 \uC11C\uBA85\uB9CC\uC73C\uB85C Google \uAD8C\uD55C\uC774 \uC0DD\uAE30\uC9C0\uB294 \uC54A\uC2B5\uB2C8\uB2E4."], ["03", "\uC790\uB3D9 \uAC8C\uC2DC \uAE30\uB2A5 \uC5F0\uACB0", "\uC2B9\uC778\xB7\uD574\uC2DC \uC77C\uCE58\xB7\uC9D1\uD589 \uAC70\uB798 \uD655\uC815\uC744 \uC11C\uBC84\uC5D0\uC11C \uD655\uC778\uD55C \uB4A4 \uC5C5\uB85C\uB4DC\uD558\uB3C4\uB85D \uC5F0\uACB0\uD574\uC57C \uD569\uB2C8\uB2E4. \uD604\uC7AC \uB2E8\uACC4\uC5D0\uC11C\uB294 \uC790\uB3D9 \uC5C5\uB85C\uB4DC \uCF54\uB4DC\uAC00 \uD65C\uC131\uD654\uB418\uC5B4 \uC788\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."], ["04", "\uC2E4\uD328\uC640 \uC0AC\uC6A9 \uC885\uB8CC \uCC98\uB9AC", "\uC815\uC0B0\uACFC YouTube \uC5C5\uB85C\uB4DC\uB294 \uBCC4\uAC1C\uC785\uB2C8\uB2E4. \uC911\uBCF5 \uC5C5\uB85C\uB4DC \uBC29\uC9C0, \uC5C5\uB85C\uB4DC \uC2E4\uD328 \uC7AC\uC2DC\uB3C4, \uC0AC\uC6A9 \uAE30\uAC04 \uC885\uB8CC \uC2DC \uC678\uBD80 \uC601\uC0C1 \uBE44\uACF5\uAC1C \uCC98\uB9AC\uAE4C\uC9C0 \uAD6C\uD604\uD574\uC57C \uD569\uB2C8\uB2E4."]].map((x) => /* @__PURE__ */ React.createElement("div", { key: x[0] }, /* @__PURE__ */ React.createElement("span", null, x[0]), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h3", null, x[1]), /* @__PURE__ */ React.createElement("p", null, x[2]))))), /* @__PURE__ */ React.createElement("a", { className: "text-button", href: "https://developers.google.com/youtube/v3/guides/authentication", target: "_blank", rel: "noopener noreferrer" }, "Google \uACF5\uC2DD \uC5F0\uB3D9 \uC548\uB0B4 ", /* @__PURE__ */ React.createElement(ExternalLink, { size: 15 })), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "Google \uBE44\uBC00\uBC88\uD638, \uD074\uB77C\uC774\uC5B8\uD2B8 \uBCF4\uC548 \uBE44\uBC00\uBC88\uD638, \uC9C0\uAC11 \uAC1C\uC778\uD0A4\uB97C \uC774 \uC0AC\uC774\uD2B8\uB098 \uB300\uD654\uCC3D\uC5D0 \uC785\uB825\uD558\uC9C0 \uB9C8\uC138\uC694.")), modal === "guide" && /* @__PURE__ */ React.createElement(Modal, { title: "\uAD11\uACE0 \uD55C \uAC74\uC758 \uC9C4\uD589 \uACFC\uC815", onClose: () => setModal("") }, /* @__PURE__ */ React.createElement("div", { className: "guide-list" }, [["01", "\uAD11\uACE0\uC8FC\uAC00 \uC601\uC0C1\uACFC \uACC4\uC57D\uC744 \uB4F1\uB85D", "\uCD5C\uC885 MP4\uC758 SHA-256 \uD574\uC2DC\uB97C \uAE30\uB85D\uD569\uB2C8\uB2E4. \uC0C8 \uAD11\uACE0\uB294 \uC0C8 \uACC4\uC57D\uC73C\uB85C \uAD6C\uBD84\uD569\uB2C8\uB2E4."], ["02", "\uACC4\uC57D\uC5D0 \uC815\uD55C \uAD11\uACE0\uBE44 \uC608\uCE58", "\uC9C0\uCD9C \uD5C8\uC6A9\uACFC \uC608\uCE58\uB97C \uCC28\uB840\uB85C \uC2E4\uD589\uD569\uB2C8\uB2E4. \uC218\uC218\uB8CC\uB294 \uD14C\uC2A4\uD2B8 BFC\uB85C \uB0C5\uB2C8\uB2E4."], ["03", "\uAD8C\uB9AC\uC790\uAC00 \uC6D0\uBCF8 \uAC80\uD1A0 \uD6C4 \uC2B9\uC778", "\uC9C0\uC815\uB41C \uC9C0\uAC11\uB9CC \uC2B9\uC778\uD558\uAC70\uB098 \uAC70\uC808\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4."], ["04", "\uD50C\uB7AB\uD3FC\uC774 \uAC19\uC740 \uD30C\uC77C\uB85C \uC9D1\uD589", "\uC2E4\uC81C \uD30C\uC77C\uC758 \uD574\uC2DC\uB97C \uACC4\uC0B0\uD574 \uB300\uC870\uD558\uACE0 \uC9D1\uD589\uD569\uB2C8\uB2E4. \uD574\uB2F9 \uAD11\uACE0 \uACC4\uC57D\uC5D0 \uC815\uD55C \uAD8C\uB9AC\uC790\xB7\uD50C\uB7AB\uD3FC \uC9C0\uAE09\uC561\uC744 \uC804\uC1A1\uD569\uB2C8\uB2E4."], ["05", "\uC0AC\uC6A9 \uAE30\uAC04 \uB3D9\uC548 \uACF5\uAC1C \uC7AC\uC0DD", "isPublishable\uC774 true\uC77C \uB54C\uB9CC \uACF5\uAC1C \uC7AC\uC0DD\uD569\uB2C8\uB2E4. \uAE30\uAC04 \uC885\uB8CC \uD6C4 \uC2E0\uADDC \uC7AC\uC0DD\uC744 \uCC28\uB2E8\uD569\uB2C8\uB2E4."]].map((x) => /* @__PURE__ */ React.createElement("div", { key: x[0] }, /* @__PURE__ */ React.createElement("span", null, x[0]), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h3", null, x[1]), /* @__PURE__ */ React.createElement("p", null, x[2]))))), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "\uC9C0\uAC11 \uC9C0\uC815\uC740 \uC2E4\uC81C \uAD8C\uB9AC\uC790 \uC2E0\uC6D0\uC744 \uC99D\uBA85\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uACC4\uC57D\xB7\uAC70\uB798 \uC815\uBCF4\uB294 \uACF5\uAC1C \uCCB4\uC778\uC5D0\uC11C \uC870\uD68C\uD560 \uC218 \uC788\uC73C\uBA70, \uC774 \uC0AC\uC774\uD2B8\uC758 \uC6D0\uBCF8 \uD30C\uC77C\uC740 \uC11C\uBC84\uC5D0\uC11C \uC811\uADFC\uC744 \uD1B5\uC81C\uD569\uB2C8\uB2E4.")), selected && /* @__PURE__ */ React.createElement(Detail, { ad: selected, wallet, session, demo: selected.demo, onClose: () => setSelected(null), busy, run, connect, transact, refresh, ensureSession, setNotice }), busy && /* @__PURE__ */ React.createElement("div", { className: "busy", role: "status" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "spin", size: 17 }), busy, /* @__PURE__ */ React.createElement("small", null, "MetaMask \uC694\uCCAD\uC774 \uC788\uC73C\uBA74 \uD655\uC778\uD574\uC8FC\uC138\uC694.")), notice && /* @__PURE__ */ React.createElement("div", { role: "status", className: "toast " + notice.type }, notice.type === "error" ? /* @__PURE__ */ React.createElement(AlertCircle, { size: 20 }) : /* @__PURE__ */ React.createElement(CheckCircle2, { size: 20 }), /* @__PURE__ */ React.createElement("span", null, notice.text), /* @__PURE__ */ React.createElement("button", { "aria-label": "\uC54C\uB9BC \uB2EB\uAE30", onClick: () => setNotice(null) }, /* @__PURE__ */ React.createElement(X, { size: 16 }))), txs.length > 0 && /* @__PURE__ */ React.createElement("details", { className: "tx-tray" }, /* @__PURE__ */ React.createElement("summary", null, "\uAC70\uB798 \uAE30\uB85D ", /* @__PURE__ */ React.createElement("span", null, txs.length)), txs.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.hash }, /* @__PURE__ */ React.createElement("span", null, t.state === "success" ? "\u2713" : t.state === "failed" ? "\u2715" : "\u2026", " ", t.label), /* @__PURE__ */ React.createElement("code", { title: t.hash }, short(t.hash)), /* @__PURE__ */ React.createElement("button", { "aria-label": "\uAC70\uB798 \uD574\uC2DC \uBCF5\uC0AC", onClick: () => navigator.clipboard.writeText(t.hash) }, /* @__PURE__ */ React.createElement(Copy, { size: 12 }))))));
}
function CubeNetwork() {
  const nodes = [[48, 104], [120, 66], [199, 42], [280, 77], [367, 51], [432, 107], [80, 183], [175, 145], [270, 180], [365, 153], [440, 210], [146, 252], [237, 259], [337, 249], [290, 321]].map(([x, y]) => [x, y, 22]);
  const edges = [[0, 1], [0, 6], [1, 2], [1, 7], [2, 3], [3, 4], [3, 7], [3, 8], [4, 5], [5, 9], [6, 7], [6, 11], [7, 8], [7, 11], [8, 9], [8, 12], [9, 10], [9, 13], [11, 12], [12, 13], [12, 14], [13, 14]];
  return /* @__PURE__ */ React.createElement("div", { className: "hero-art cube-art", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 490 370", fill: "none" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("radialGradient", { id: "cube-halo" }, /* @__PURE__ */ React.createElement("stop", { stopColor: "var(--tint)" }), /* @__PURE__ */ React.createElement("stop", { offset: "1", stopColor: "var(--surface)", stopOpacity: "0" }))), /* @__PURE__ */ React.createElement("ellipse", { cx: "245", cy: "192", rx: "244", ry: "177", fill: "url(#cube-halo)" }), /* @__PURE__ */ React.createElement("g", { className: "cube-links" }, edges.map(([a, b], i) => /* @__PURE__ */ React.createElement("path", { key: i, d: "M" + nodes[a][0] + "," + nodes[a][1] + " L" + nodes[b][0] + "," + nodes[b][1] }))), nodes.map(([x, y, r], i) => /* @__PURE__ */ React.createElement("g", { key: i, className: "cube-node cube-tone-" + i % 3, style: { animationDelay: i % 5 * -0.7 + "s" }, transform: "translate(" + x + " " + y + ")" }, /* @__PURE__ */ React.createElement("path", { className: "cube-top", d: `M0 ${-r} L${r * 0.8660254} ${-r / 2} L0 0 L${-r * 0.8660254} ${-r / 2} Z` }), /* @__PURE__ */ React.createElement("path", { className: "cube-left", d: `M${-r * 0.8660254} ${-r / 2} L0 0 V${r} L${-r * 0.8660254} ${r / 2} Z` }), /* @__PURE__ */ React.createElement("path", { className: "cube-right", d: `M0 0 L${r * 0.8660254} ${-r / 2} V${r / 2} L0 ${r} Z` })))), /* @__PURE__ */ React.createElement("div", { className: "network-caption" }, /* @__PURE__ */ React.createElement("span", null), " CONNECTED BY CONSENT"));
}
function ArrowDown() {
  return /* @__PURE__ */ React.createElement(ArrowRight, { size: 17, style: { transform: "rotate(90deg)" } });
}
function AdCard({ ad, index, onClick }) {
  const status = ad.unavailable ? "\uC870\uD68C \uBD88\uAC00" : effective(ad), step = ad.status >= 4 && ad.status <= 4 ? 4 : Math.min(ad.status || 0, 3);
  return /* @__PURE__ */ React.createElement("button", { className: "ad-card", onClick }, /* @__PURE__ */ React.createElement("div", { className: "ad-visual " + (ad.theme || ["lime", "peach", "blue", "pink"][index % 4]) }, ad.thumbnail ? /* @__PURE__ */ React.createElement("img", { src: ad.thumbnail, alt: "\uBE14\uB7EC \uCC98\uB9AC\uB41C \uAD11\uACE0 \uBBF8\uB9AC\uBCF4\uAE30" }) : /* @__PURE__ */ React.createElement("div", { className: "concept-art " + (ad.status !== 4 ? "softened" : "") }, /* @__PURE__ */ React.createElement("div", { className: "shape-one" }), /* @__PURE__ */ React.createElement("div", { className: "shape-two" }), /* @__PURE__ */ React.createElement("div", { className: "shape-three" }), /* @__PURE__ */ React.createElement("span", null, ad.art || "CONSENT / ORIGINAL")), /* @__PURE__ */ React.createElement("div", { className: "visual-top" }, /* @__PURE__ */ React.createElement("span", { className: "badge s" + ad.status }, ad.status === 4 && status === "\uAC8C\uC2DC \uC911" && /* @__PURE__ */ React.createElement("span", { className: "live-dot" }), status), ad.demo && /* @__PURE__ */ React.createElement("span", { className: "demo-chip" }, "\uC608\uC2DC")), /* @__PURE__ */ React.createElement("div", { className: "visual-bottom" }, status === "\uAC8C\uC2DC \uC911" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Play, { size: 14 }), " \uAC8C\uC2DC \uC911\uC778 \uAD11\uACE0") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Lock, { size: 13 }), " \uAC8C\uC2DC \uC804 \uC6D0\uBCF8 \uBE44\uACF5\uAC1C")), ad.status === 3 && /* @__PURE__ */ React.createElement("div", { className: "approved-stamp" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 26 }), /* @__PURE__ */ React.createElement("span", null, "\uC0AC\uC6A9 \uC2B9\uC778 \uC644\uB8CC"))), /* @__PURE__ */ React.createElement("div", { className: "card-body" }, /* @__PURE__ */ React.createElement("div", { className: "card-category" }, ad.category, /* @__PURE__ */ React.createElement("span", null, "#", String(index + 1).padStart(3, "0"))), /* @__PURE__ */ React.createElement("h3", null, ad.title), /* @__PURE__ */ React.createElement("div", { className: "card-facts" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uCD1D \uAD11\uACE0\uBE44"), /* @__PURE__ */ React.createElement("strong", null, formatCAD(ad.TOTAL_FEE), " ", /* @__PURE__ */ React.createElement("small", null, "CAD"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, ad.status === 4 ? "\uC0AC\uC6A9 \uC885\uB8CC" : "\uC9D1\uD589 \uB9C8\uAC10"), /* @__PURE__ */ React.createElement("strong", null, date(ad.status === 4 ? ad.usageEnd : ad.executionDeadline)))), /* @__PURE__ */ React.createElement("div", { className: "progress-track" }, /* @__PURE__ */ React.createElement("div", { className: ad.status >= 5 ? "closed" : "", style: { width: (ad.status >= 5 ? 100 : step * 25) + "%" } })), /* @__PURE__ */ React.createElement("div", { className: "progress-labels" }, ["\uB4F1\uB85D", "\uC608\uCE58", "\uC2B9\uC778", "\uC9D1\uD589\xB7\uC815\uC0B0"].map((t, i) => /* @__PURE__ */ React.createElement("span", { key: t, className: step > i ? "complete" : "" }, step > i && /* @__PURE__ */ React.createElement(Check, { size: 10 }), " ", t))), /* @__PURE__ */ React.createElement("div", { className: "card-footer" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { className: "mini-avatar" }, "A"), short(ad.advertiser)), /* @__PURE__ */ React.createElement("span", null, "\uC9C4\uD589 \uD655\uC778 ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 17 })))));
}
function CreateModal({ importing, onClose, token, wallet, busy, run, ensureSession, provider, track, onDone }) {
  const [form, setForm] = useState({ title: "", category: "\uBE0C\uB79C\uB4DC", description: "", address: "", rightsHolder: "", platform: "", token, rightsFee: "200", platformFee: "800", executionValue: "7", executionUnit: "days", usageValue: "30", usageUnit: "days" }), [file, setFile] = useState(null), [hash, setHash] = useState(""), [thumb, setThumb] = useState(null), [localBusy, setLocalBusy] = useState(false), [step, setStep] = useState(""), [recovery, setRecovery] = useState(""), [importedTerms, setImportedTerms] = useState(null);
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k === "address") setImportedTerms(null);
  };
  let currentTerms = null, termsError = "";
  try {
    currentTerms = validateTerms(form);
  } catch (e) {
    termsError = e.message;
  }
  async function choose(f) {
    if (!f) return;
    setLocalBusy(true);
    setStep("\uC601\uC0C1 \uD574\uC2DC\uC640 \uBE14\uB7EC \uBBF8\uB9AC\uBCF4\uAE30 \uC0DD\uC131 \uC911");
    try {
      if (f.size > 50 * 1024 * 1024) throw new Error("\uCD5C\uB300 50MB \uD30C\uC77C\uB9CC \uC5C5\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
      const [h, t] = await Promise.all([fileHash(f), thumbnail(f)]);
      setFile(f);
      setHash(h);
      setThumb(t);
      setStep("\uD30C\uC77C \uAC80\uC99D \uC900\uBE44 \uC644\uB8CC");
    } catch (e) {
      setStep(errorText(e));
      setFile(null);
    } finally {
      setLocalBusy(false);
    }
  }
  async function submit(e) {
    e.preventDefault();
    run(importing ? "\uAE30\uC874 \uACC4\uC57D \uC5F0\uACB0" : "\uAD11\uACE0 \uB4F1\uB85D", async () => {
      await ensureSession();
      let address = form.address;
      if (!importing) {
        const terms = validateTerms(form);
        if (!file || !hash || !thumb) throw new Error("\uCD5C\uC885 MP4 \uC601\uC0C1\uC744 \uBA3C\uC800 \uC120\uD0DD\uD558\uC138\uC694.");
        if (![form.token, form.rightsHolder, form.platform].every(isAddress)) throw new Error("\uD1A0\uD070\xB7\uAD8C\uB9AC\uC790\xB7\uD50C\uB7AB\uD3FC \uC8FC\uC18C\uB97C \uD655\uC778\uD574\uC8FC\uC138\uC694.");
        if (new Set([wallet, form.rightsHolder, form.platform].map((x) => x.toLowerCase())).size !== 3) throw new Error("\uC138 \uC5ED\uD560\uC740 \uC11C\uB85C \uB2E4\uB978 \uC9C0\uAC11\uC744 \uC0AC\uC6A9\uD574\uC57C \uD569\uB2C8\uB2E4.");
        const { signer } = await provider();
        const selectedToken = new Contract(form.token, TOKEN_ABI, signer);
        if (Number(await selectedToken.decimals()) !== 0 || await selectedToken.symbol() !== "CAD") throw new Error("\uC18C\uC218\uC810 0\uC790\uB9AC CADToken\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.");
        const artifacts = await (await fetch("/contracts.json")).json();
        setStep("1/3 \xB7 \uAD11\uACE0 \uACC4\uC57D \uBC30\uD3EC");
        const c = await new ContractFactory(artifacts.ConsentAdEscrow.abi, artifacts.ConsentAdEscrow.bytecode, signer).deploy(form.token, form.rightsHolder, form.platform, terms.rightsFee, terms.platformFee, terms.executionSeconds, terms.usageSeconds);
        await track(c.deploymentTransaction(), "\uAD11\uACE0 \uACC4\uC57D \uBC30\uD3EC");
        address = await c.getAddress();
        setRecovery(address);
        setStep("2/3 \xB7 \uC601\uC0C1 \uD574\uC2DC \uB4F1\uB85D");
        await track(await c.registerAd(hash), "\uC601\uC0C1 \uD574\uC2DC \uB4F1\uB85D");
      }
      setStep("\uAD11\uACE0 \uBAA9\uB85D\uC5D0 \uC5F0\uACB0 \uC911");
      let ad = await api("/ads", { method: "POST", body: JSON.stringify({ ...form, address }) });
      if (file && thumb) {
        setStep("3/3 \xB7 \uC6D0\uBCF8\uACFC \uBCF4\uD638\uB41C \uBBF8\uB9AC\uBCF4\uAE30 \uC5C5\uB85C\uB4DC");
        const data = new FormData();
        data.append("video", file);
        data.append("thumbnail", thumb, "blur.jpg");
        ad = await api("/ads/" + address + "/media", { method: "POST", body: data });
      }
      await onDone(ad);
    });
  }
  return /* @__PURE__ */ React.createElement(Modal, { title: importing ? "Remix \uAD11\uACE0 \uACC4\uC57D \uC5F0\uACB0" : "\uC0C8 \uAD11\uACE0 \uB4F1\uB85D", onClose, wide: true }, /* @__PURE__ */ React.createElement("form", { onSubmit: submit }, /* @__PURE__ */ React.createElement("p", { className: "modal-intro" }, importing ? "\uC774\uBBF8 Bifrost \uD14C\uC2A4\uD2B8\uB137\uC5D0 \uBC30\uD3EC\uD55C \uAD11\uACE0 \uACC4\uC57D\uC744 \uAC00\uC838\uC635\uB2C8\uB2E4. \uC5F0\uACB0\uD55C \uC9C0\uAC11\uC774 \uD574\uB2F9 \uACC4\uC57D\uC758 \uAD11\uACE0\uC8FC\uC5EC\uC57C \uD569\uB2C8\uB2E4." : "\uAD11\uACE0 \uD55C \uAC74\uB9C8\uB2E4 \uACC4\uC57D\uC744 \uBC30\uD3EC\uD558\uACE0, \uCD5C\uC885 \uC601\uC0C1\uC758 \uD574\uC2DC\uB97C \uAE30\uB85D\uD569\uB2C8\uB2E4. \uAC01 \uB2E8\uACC4\uC5D0\uC11C MetaMask \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("div", { className: "form-columns" }, /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uAD11\uACE0 \uC81C\uBAA9", /* @__PURE__ */ React.createElement("input", { required: true, maxLength: 100, value: form.title, onChange: (e) => set("title", e.target.value), placeholder: "\uC608: \uC0C8\uB85C\uC6B4 \uD558\uB8E8\uB97C \uC5EC\uB294 \uD55C \uC794" })), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uCE74\uD14C\uACE0\uB9AC", /* @__PURE__ */ React.createElement("select", { value: form.category, onChange: (e) => set("category", e.target.value) }, ["\uBE0C\uB79C\uB4DC", "\uC74C\uB8CC\xB7\uC2DD\uD488", "\uB77C\uC774\uD504\uC2A4\uD0C0\uC77C", "\uBDF0\uD2F0", "\uD14C\uD06C", "\uBAA8\uBE4C\uB9AC\uD2F0", "\uAE30\uD0C0"].map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c)))), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uAD11\uACE0 \uC18C\uAC1C", /* @__PURE__ */ React.createElement("textarea", { maxLength: 2e3, value: form.description, onChange: (e) => set("description", e.target.value), placeholder: "\uC0AC\uC6A9 \uBAA9\uC801\uACFC \uAC80\uD1A0\uD560 \uB0B4\uC6A9\uC744 \uC801\uC5B4\uC8FC\uC138\uC694." })), importing ? /* @__PURE__ */ React.createElement("label", { className: "field" }, "ConsentAdEscrow \uACC4\uC57D \uC8FC\uC18C", /* @__PURE__ */ React.createElement("input", { required: true, value: form.address, onChange: (e) => set("address", e.target.value), placeholder: "0x\u2026 (\uAD11\uACE0 \uACC4\uC57D \uC8FC\uC18C)" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", { className: "field" }, "CADToken \uACC4\uC57D \uC8FC\uC18C", /* @__PURE__ */ React.createElement("input", { required: true, value: form.token, onChange: (e) => set("token", e.target.value), placeholder: "\uC124\uC815\uC5D0\uC11C \uC5F0\uACB0\uD55C \uD1A0\uD070 \uC8FC\uC18C" })), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uAD8C\uB9AC\uC790 \uC9C0\uAC11 \uC8FC\uC18C", /* @__PURE__ */ React.createElement("input", { required: true, value: form.rightsHolder, onChange: (e) => set("rightsHolder", e.target.value), placeholder: "0x\u2026" })), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uD50C\uB7AB\uD3FC \uC9C0\uAC11 \uC8FC\uC18C", /* @__PURE__ */ React.createElement("input", { required: true, value: form.platform, onChange: (e) => set("platform", e.target.value), placeholder: "0x\u2026" })))), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("label", { className: "upload-zone" }, /* @__PURE__ */ React.createElement(FileVideo, { size: 34 }), /* @__PURE__ */ React.createElement("strong", null, file ? file.name : "\uCD5C\uC885 \uAD11\uACE0 \uC601\uC0C1 \uC120\uD0DD"), /* @__PURE__ */ React.createElement("span", null, "MP4 \xB7 \uCD5C\uB300 50MB"), /* @__PURE__ */ React.createElement("input", { type: "file", accept: "video/mp4,.mp4", onChange: (e) => choose(e.target.files[0]) })), thumb && /* @__PURE__ */ React.createElement("img", { className: "thumb-preview", src: URL.createObjectURL(thumb), alt: "\uACF5\uAC1C\uC6A9 \uBE14\uB7EC \uC378\uB124\uC77C" }), /* @__PURE__ */ React.createElement("p", { className: "fine" }, importing ? "\uAE30\uC874\uC5D0 \uB4F1\uB85D\uD55C \uD574\uC2DC\uC640 \uAC19\uC740 \uD30C\uC77C\uB9CC \uC5C5\uB85C\uB4DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uAC00\uC0C1 \uD574\uC2DC\uB85C \uC2E4\uC2B5\uD55C \uACC4\uC57D\uC740 \uC2E4\uC81C \uC601\uC0C1\uACFC \uC5F0\uACB0\uB418\uC9C0 \uC54A\uC73C\uBBC0\uB85C \uC0C8 \uAD11\uACE0\uB97C \uB4F1\uB85D\uD558\uC138\uC694." : "\uACF5\uAC1C \uD654\uBA74\uC5D0\uB294 \uC774\uBBF8 \uBE14\uB7EC \uCC98\uB9AC\uD55C \uC378\uB124\uC77C\uB9CC \uC804\uC1A1\uB429\uB2C8\uB2E4. \uC6D0\uBCF8 \uC601\uC0C1\uC740 \uCC38\uC5EC\uC790 \uAC80\uD1A0\uC6A9\uC73C\uB85C \uBCF4\uD638\uD569\uB2C8\uB2E4."), hash && /* @__PURE__ */ React.createElement("div", { className: "hash-box" }, /* @__PURE__ */ React.createElement("span", null, "SHA-256"), /* @__PURE__ */ React.createElement("code", null, hash)), /* @__PURE__ */ React.createElement("div", { className: "terms" }, /* @__PURE__ */ React.createElement("b", null, "\uACC4\uC57D \uC815\uC0B0 \uC870\uAC74"), importing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { className: "fine" }, "\uC774\uBBF8 \uBC30\uD3EC\uD55C \uACC4\uC57D\uC758 \uC870\uAC74\uC744 \uCCB4\uC778\uC5D0\uC11C \uBD88\uB7EC\uC635\uB2C8\uB2E4. \uAE30\uC874 \uACC4\uC57D \uC870\uAC74\uC740 \uC774 \uD654\uBA74\uC5D0\uC11C \uC218\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("button", { type: "button", className: "secondary", disabled: !!busy || !isAddress(form.address), onClick: () => run("\uACC4\uC57D \uC870\uAC74 \uC870\uD68C", async () => {
    await ensureSession();
    setImportedTerms(await api("/inspect", { method: "POST", body: JSON.stringify({ address: form.address }) }));
  }) }, "\uACC4\uC57D \uC870\uAC74 \uBD88\uB7EC\uC624\uAE30"), importedTerms && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "\uAD8C\uB9AC\uC790 ", formatCAD(importedTerms.RIGHTS_FEE), " CAD / \uD50C\uB7AB\uD3FC ", formatCAD(importedTerms.PLATFORM_FEE), " CAD"), /* @__PURE__ */ React.createElement("span", null, "\uCD1D \uC608\uCE58 ", formatCAD(importedTerms.TOTAL_FEE), " CAD"), /* @__PURE__ */ React.createElement("span", null, "\uB4F1\uB85D \uD6C4 ", formatDuration(importedTerms.EXECUTION_WINDOW), " \uC774\uB0B4 \uC9D1\uD589"), /* @__PURE__ */ React.createElement("span", null, "\uC9D1\uD589 \uD6C4 ", formatDuration(importedTerms.USAGE_PERIOD), " \uC0AC\uC6A9"))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("fieldset", { className: "terms-inputs", disabled: !!busy || !!recovery }, /* @__PURE__ */ React.createElement("div", { className: "terms-grid" }, /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uAD8C\uB9AC\uC790 \uC9C0\uAE09\uC561 (CAD)", /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "1", required: true, value: form.rightsFee, onChange: (e) => set("rightsFee", e.target.value) })), /* @__PURE__ */ React.createElement("label", { className: "field" }, "\uD50C\uB7AB\uD3FC \uC9C0\uAE09\uC561 (CAD)", /* @__PURE__ */ React.createElement("input", { type: "number", min: "0", step: "1", required: true, value: form.platformFee, onChange: (e) => set("platformFee", e.target.value) }))), /* @__PURE__ */ React.createElement(DurationInput, { label: "\uB4F1\uB85D \uD6C4 \uC9D1\uD589 \uAE30\uD55C", value: form.executionValue, unit: form.executionUnit, onValue: (v) => set("executionValue", v), onUnit: (v) => set("executionUnit", v) }), /* @__PURE__ */ React.createElement(DurationInput, { label: "\uC9D1\uD589 \uD6C4 \uC0AC\uC6A9 \uAE30\uAC04", value: form.usageValue, unit: form.usageUnit, onValue: (v) => set("usageValue", v), onUnit: (v) => set("usageUnit", v) })), termsError ? /* @__PURE__ */ React.createElement("p", { className: "check-bad" }, termsError) : /* @__PURE__ */ React.createElement("div", { className: "terms-preview" }, /* @__PURE__ */ React.createElement("strong", null, "\uCD1D \uC608\uCE58\uAE08 ", formatCAD(currentTerms.total), " CAD"), /* @__PURE__ */ React.createElement("span", null, "\uB4F1\uB85D \uD6C4 ", formatDuration(currentTerms.executionSeconds), " \uC774\uB0B4 \uC9D1\uD589"), /* @__PURE__ */ React.createElement("span", null, "\uC9D1\uD589 \uD6C4 ", formatDuration(currentTerms.usageSeconds), " \uC0AC\uC6A9")), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "\uAE30\uAC04 \uB2E8\uC704\uB294 \uBC30\uD3EC \uC2DC \uCD08\uB85C \uBCC0\uD658\uD569\uB2C8\uB2E4. \uBC30\uD3EC\uD55C \uC870\uAC74\uACFC \uC601\uC0C1\uC5D0 \uB300\uD574 \uAD8C\uB9AC\uC790\uAC00 \uC2B9\uC778\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("a", { className: "text-button", href: "/ConsentAdStarter.sol", download: "ConsentAdStarter.sol" }, "\uC218\uC815\uB41C Solidity \uCF54\uB4DC \uB0B4\uB824\uBC1B\uAE30 ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 14 })))))), recovery && /* @__PURE__ */ React.createElement("div", { className: "alert warning" }, "\uBC30\uD3EC\uB41C \uACC4\uC57D: ", /* @__PURE__ */ React.createElement("code", null, recovery), /* @__PURE__ */ React.createElement("p", null, "\uB2E4\uC74C \uB2E8\uACC4\uAC00 \uC2E4\uD328\uD558\uBA74 \uC774 \uC8FC\uC18C\uB97C \uBCF5\uC0AC\uD574 \uAE30\uC874 \uACC4\uC57D \uC5F0\uACB0\uB85C \uC774\uC5B4\uAC00\uC138\uC694. \uC911\uBCF5 \uBC30\uD3EC\uD558\uC9C0 \uC54A\uC544\uB3C4 \uB429\uB2C8\uB2E4.")), step && /* @__PURE__ */ React.createElement("p", { className: "form-step", role: "status" }, step), /* @__PURE__ */ React.createElement("div", { className: "modal-actions" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "secondary", onClick: onClose }, "\uB2EB\uAE30"), /* @__PURE__ */ React.createElement("button", { className: "primary", disabled: !!busy || localBusy || !!recovery || !importing && (!file || !!termsError), type: "submit" }, importing ? "\uACC4\uC57D \uD655\uC778 \uD6C4 \uC5F0\uACB0" : "\uACC4\uC57D \uBC30\uD3EC \xB7 \uC601\uC0C1 \uB4F1\uB85D", /* @__PURE__ */ React.createElement(ArrowRight, { size: 17 })))));
}
function Detail({ ad, wallet, session, onClose, busy, run, connect, transact, refresh, ensureSession, setNotice }) {
  const [video, setVideo] = useState(""), [verified, setVerified] = useState(false), [events, setEvents] = useState(null), [actual, setActual] = useState(""), [checkResult, setCheckResult] = useState("");
  const role = roleOf(ad, wallet), participant = role !== "public", authenticated = same(wallet, session);
  const videoRef = useRef(null);
  const urlRef = useRef("");
  useEffect(() => {
    setVideo("");
    setVerified(false);
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, [ad.address, wallet, session]);
  useEffect(() => {
    if (ad.status === 4 && !ad.playable && video && !participant) {
      videoRef.current?.pause();
      setVideo("");
      setVerified(false);
    }
    const t = setInterval(() => {
      if (!participant && Number(ad.usageEnd) * 1e3 < Date.now()) {
        videoRef.current?.pause();
        setVideo("");
        setVerified(false);
      }
    }, 1e3);
    return () => clearInterval(t);
  }, [ad.status, ad.playable, ad.usageEnd, participant, video]);
  async function loadVideo() {
    if (ad.demo) throw new Error("\uC608\uC2DC \uAD11\uACE0\uC5D0\uB294 \uC2E4\uC81C \uC601\uC0C1\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
    if (participant) await ensureSession();
    const r = await fetch("/api/ads/" + ad.address + "/media");
    if (!r.ok) {
      const d = await r.json();
      throw new Error(d.error);
    }
    const b = await r.blob(), h = await fileHash(b);
    if (!same(h, ad.videoHash)) throw new Error("\uC601\uC0C1 \uD574\uC2DC \uAC80\uC99D \uC2E4\uD328");
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(b);
    setVideo(urlRef.current);
    setActual(h);
    setVerified(true);
  }
  async function inspectFile(f) {
    if (!f) return;
    const h = await fileHash(f);
    setActual(h);
    setCheckResult(same(h, ad.videoHash) ? "\uC77C\uCE58: \uC2B9\uC778\uBC1B\uC740 \uC601\uC0C1\uACFC \uB3D9\uC77C\uD569\uB2C8\uB2E4." : "\uBD88\uC77C\uCE58: \uC9D1\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    if (!same(h, ad.videoHash)) throw new Error("Video hash mismatch");
  }
  return /* @__PURE__ */ React.createElement(Modal, { title: ad.title, onClose, wide: true }, /* @__PURE__ */ React.createElement("div", { className: "detail-top" }, /* @__PURE__ */ React.createElement("span", { className: "badge s" + ad.status }, ad.unavailable ? "\uC870\uD68C \uBD88\uAC00" : effective(ad)), /* @__PURE__ */ React.createElement("span", null, ad.category), ad.demo && /* @__PURE__ */ React.createElement("span", { className: "demo-chip" }, "\uC608\uC2DC \xB7 \uAC70\uB798 \uBD88\uAC00"), /* @__PURE__ */ React.createElement("span", { className: "detail-role" }, "\uD604\uC7AC \uC9C0\uAC11: ", participant ? roles[role].name : "\uC678\uBD80 \uC5F4\uB78C\uC790")), /* @__PURE__ */ React.createElement("div", { className: "detail-columns" }, /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("div", { className: "video-frame" }, video ? /* @__PURE__ */ React.createElement("video", { ref: videoRef, controls: true, src: video, onEnded: () => {
  } }) : ad.thumbnail ? /* @__PURE__ */ React.createElement("img", { src: ad.thumbnail, alt: "\uBE14\uB7EC \uCC98\uB9AC\uB41C \uBBF8\uB9AC\uBCF4\uAE30" }) : /* @__PURE__ */ React.createElement("div", { className: "detail-art " + (ad.theme || "lime") }, /* @__PURE__ */ React.createElement("div", { className: "shape-one" }), /* @__PURE__ */ React.createElement("div", { className: "shape-two" }), /* @__PURE__ */ React.createElement(Lock, { size: 32 })), !video && /* @__PURE__ */ React.createElement("div", { className: "video-overlay" }, /* @__PURE__ */ React.createElement("span", null, ad.playable ? "\uAC8C\uC2DC\uB41C \uAD11\uACE0" : participant ? "\uCC38\uC5EC\uC790 \uAC80\uD1A0\uC6A9 \uC6D0\uBCF8" : "\uAC8C\uC2DC \uC804 \uC6D0\uBCF8 \uBE44\uACF5\uAC1C"), /* @__PURE__ */ React.createElement("p", null, ad.playable ? "\uD604\uC7AC \uC0AC\uC6A9 \uAE30\uAC04 \uB0B4 \uAD11\uACE0\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC5B4\uC694." : participant ? "\uC9C0\uAC11 \uC11C\uBA85\uACFC \uC601\uC0C1 \uD574\uC2DC \uD655\uC778 \uD6C4 \uC5F4\uB78C\uD560 \uC218 \uC788\uC5B4\uC694." : "\uD604\uC7AC\uB294 \uBE14\uB7EC \uCC98\uB9AC\uB41C \uD55C \uC7A5\uBA74\uB9CC \uBCFC \uC218 \uC788\uC5B4\uC694."), (participant || ad.playable) && /* @__PURE__ */ React.createElement("button", { className: "white-button", disabled: !!busy || ad.demo || !ad.hasVideo, onClick: () => run("\uC601\uC0C1 \uAC80\uC99D \uC911", loadVideo) }, /* @__PURE__ */ React.createElement(Play, { size: 16 }), participant ? "\uC6D0\uBCF8 \uAC80\uD1A0\uD558\uAE30" : "\uAD11\uACE0 \uC7AC\uC0DD"))), verified && /* @__PURE__ */ React.createElement("div", { className: "verified" }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 17 }), "\uC6D0\uBCF8 \uD30C\uC77C SHA-256 \uC77C\uCE58 \uD655\uC778 \uC644\uB8CC"), /* @__PURE__ */ React.createElement("p", { className: "detail-description" }, ad.description || "\uAD11\uACE0\uC8FC\uAC00 \uB4F1\uB85D\uD55C \uCD5C\uC885 \uC601\uC0C1\uC758 \uD574\uC2DC\uC640 \uACC4\uC57D \uC0C1\uD0DC\uB97C \uAE30\uC900\uC73C\uB85C \uAD11\uACE0\uB97C \uAD00\uB9AC\uD569\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("h3", { className: "subheading" }, "\uAD11\uACE0 \uC9C4\uD589 \uACFC\uC815"), /* @__PURE__ */ React.createElement("div", { className: "timeline" }, [["\uB4F1\uB85D", 1, "\uCD5C\uC885 \uC601\uC0C1 \uD574\uC2DC \uAE30\uB85D"], ["\uC608\uCE58", 2, formatCAD(ad.TOTAL_FEE) + " CAD \uBCF4\uAD00"], ["\uC2B9\uC778", 3, "\uAD8C\uB9AC\uC790\uC758 \uC0AC\uC6A9 \uB3D9\uC758"], ["\uC9D1\uD589\xB7\uC815\uC0B0", 4, "\uAD8C\uB9AC\uC790\xB7\uD50C\uB7AB\uD3FC \uC9C0\uAE09"]].map(([name, n, desc]) => /* @__PURE__ */ React.createElement("div", { className: ad.status >= n && ad.status < 5 ? "done" : "", key: name }, /* @__PURE__ */ React.createElement("span", null, ad.status >= n && ad.status < 5 ? /* @__PURE__ */ React.createElement(Check, { size: 15 }) : n), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("strong", null, name), /* @__PURE__ */ React.createElement("small", null, desc))))), ad.status >= 5 && /* @__PURE__ */ React.createElement("div", { className: "alert" }, ad.status === 5 ? "\uAD8C\uB9AC\uC790\uAC00 \uC0AC\uC6A9\uC744 \uAC70\uC808\uD588\uC2B5\uB2C8\uB2E4. \uAD11\uACE0\uC8FC\uAC00 \uD658\uBD88\uC744 \uC694\uCCAD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." : "\uAD11\uACE0\uC8FC\uC5D0\uAC8C \uC608\uCE58\uAE08\uC774 \uBC18\uD658\uB418\uC5C8\uC2B5\uB2C8\uB2E4."), /* @__PURE__ */ React.createElement("button", { className: "text-button", onClick: () => run("\uAC70\uB798 \uAE30\uB85D \uC870\uD68C", async () => {
    if (ad.demo) {
      setEvents({ events: [], limited: false });
      return;
    }
    setEvents(await api("/ads/" + ad.address + "/events"));
  }) }, "\uC628\uCCB4\uC778 \uAC70\uB798 \uAE30\uB85D \uC870\uD68C ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 16 })), events && /* @__PURE__ */ React.createElement("div", { className: "event-list" }, events.events.length ? events.events.map((e, i) => /* @__PURE__ */ React.createElement("div", { key: e.hash + i }, /* @__PURE__ */ React.createElement("strong", null, e.name), /* @__PURE__ */ React.createElement("span", null, "\uBE14\uB85D ", e.block), /* @__PURE__ */ React.createElement("code", null, short(e.hash)), /* @__PURE__ */ React.createElement("button", { onClick: () => navigator.clipboard.writeText(e.hash), "aria-label": "\uAC70\uB798 \uD574\uC2DC \uBCF5\uC0AC" }, /* @__PURE__ */ React.createElement(Copy, { size: 13 })))) : /* @__PURE__ */ React.createElement("p", null, "\uC870\uD68C \uBC94\uC704\uC5D0 \uC774\uBCA4\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."), events.limited && /* @__PURE__ */ React.createElement("small", null, "\uB178\uB4DC \uC81C\uD55C\uC744 \uACE0\uB824\uD574 \uCD5C\uADFC 200,000\uBE14\uB85D\uC744 \uC870\uD68C\uD569\uB2C8\uB2E4. \uC0C1\uD0DC\uC640 \uC794\uC561\uC740 \uD604\uC7AC \uCCB4\uC778 \uAE30\uC900\uC785\uB2C8\uB2E4."))), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("div", { className: "detail-summary" }, /* @__PURE__ */ React.createElement("h3", null, "\uACC4\uC57D\uACFC \uC815\uC0B0"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uCD1D \uAD11\uACE0\uBE44"), /* @__PURE__ */ React.createElement("strong", null, formatCAD(ad.TOTAL_FEE), " CAD")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uAD8C\uB9AC\uC790 \uC9C0\uAE09\uC561"), /* @__PURE__ */ React.createElement("b", null, formatCAD(ad.RIGHTS_FEE), " CAD")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uD50C\uB7AB\uD3FC \uC9C0\uAE09\uC561"), /* @__PURE__ */ React.createElement("b", null, formatCAD(ad.PLATFORM_FEE), " CAD")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uD604\uC7AC \uC608\uCE58 \uC794\uC561"), /* @__PURE__ */ React.createElement("b", null, formatCAD(ad.escrowBalance), " CAD")), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uB4F1\uB85D \uD6C4 \uC9D1\uD589 \uAE30\uD55C"), /* @__PURE__ */ React.createElement("b", null, formatDuration(ad.EXECUTION_WINDOW))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uC9D1\uD589 \uD6C4 \uC0AC\uC6A9 \uAE30\uAC04"), /* @__PURE__ */ React.createElement("b", null, formatDuration(ad.USAGE_PERIOD))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uC9D1\uD589 \uB9C8\uAC10"), /* @__PURE__ */ React.createElement("b", null, date(ad.executionDeadline))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\uC0AC\uC6A9 \uC885\uB8CC"), /* @__PURE__ */ React.createElement("b", null, date(ad.usageEnd)))), /* @__PURE__ */ React.createElement("div", { className: "role-addresses" }, ["advertiser", "rightsHolder", "platform"].map((r) => /* @__PURE__ */ React.createElement("div", { key: r }, /* @__PURE__ */ React.createElement("span", null, roles[r].name), /* @__PURE__ */ React.createElement("code", { title: ad[r] }, short(ad[r])), /* @__PURE__ */ React.createElement(IconButton, { icon: Copy, label: roles[r].name + " \uC8FC\uC18C \uBCF5\uC0AC", onClick: () => navigator.clipboard.writeText(ad[r]) })))), participant ? /* @__PURE__ */ React.createElement("div", { className: "action-panel" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, roles[role].en), /* @__PURE__ */ React.createElement("h3", null, role === "advertiser" ? "\uAD11\uACE0\uBE44 \uAD00\uB9AC" : role === "rightsHolder" ? "\uAC80\uD1A0 \uD6C4 \uACB0\uC815\uD574\uC8FC\uC138\uC694" : "\uCD5C\uC885 \uC601\uC0C1 \uD655\uC778 \uD6C4 \uC9D1\uD589"), !authenticated && /* @__PURE__ */ React.createElement("button", { className: "secondary full", disabled: !!busy || ad.demo, onClick: () => run("\uC9C0\uAC11 \uBCF8\uC778 \uD655\uC778", connect) }, "\uC9C0\uAC11 \uC11C\uBA85\uC73C\uB85C \uBCF8\uC778 \uD655\uC778"), role === "advertiser" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\uC9C0\uCD9C \uD5C8\uC6A9 \uD6C4 \uC608\uCE58\uD558\uBA74 \uAD8C\uB9AC\uC790\uAC00 \uAC80\uD1A0\uD560 \uC218 \uC788\uC5B4\uC694."), /* @__PURE__ */ React.createElement("button", { className: "secondary full", disabled: !!busy || ad.demo || !can(ad, role, "approve"), onClick: () => run("CAD \uC9C0\uCD9C \uD5C8\uC6A9", () => transact(ad, "approve")) }, "1. CAD \uC9C0\uCD9C \uD5C8\uC6A9"), /* @__PURE__ */ React.createElement("button", { className: "primary full", disabled: !!busy || ad.demo || !can(ad, role, "deposit") || !ad.hasVideo, onClick: () => run("\uAD11\uACE0\uBE44 \uC608\uCE58", () => transact(ad, "deposit")) }, "2. ", formatCAD(ad.TOTAL_FEE), " CAD \uC608\uCE58"), !ad.hasVideo && /* @__PURE__ */ React.createElement(UploadExisting, { ad, busy, run, ensureSession, refresh }), /* @__PURE__ */ React.createElement("button", { className: "danger-outline full", disabled: !!busy || ad.demo || !can(ad, role, "refund"), onClick: () => {
    if (confirm("\uC608\uCE58\uAE08\uC744 \uAD11\uACE0\uC8FC \uC9C0\uAC11\uC73C\uB85C \uD658\uBD88\uD560\uAE4C\uC694?")) run("\uC608\uCE58\uAE08 \uD658\uBD88", () => transact(ad, "refund"));
  } }, "\uC608\uCE58\uAE08 \uD658\uBD88 \uC694\uCCAD")), role === "rightsHolder" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\uC6D0\uBCF8\uC744 \uC5F4\uC5B4 \uD574\uC2DC \uC77C\uCE58\uB97C \uD655\uC778\uD55C \uB4A4 \uC0AC\uC6A9 \uC5EC\uBD80\uB97C \uACB0\uC815\uD558\uC138\uC694."), /* @__PURE__ */ React.createElement("button", { className: "primary full", disabled: !!busy || ad.demo || !verified || !can(ad, role, "approveUse"), onClick: () => {
    if (confirm("\uD655\uC778\uD55C \uC601\uC0C1\uC758 \uAD11\uACE0 \uC0AC\uC6A9\uC744 \uC2B9\uC778\uD560\uAE4C\uC694?")) run("\uAD11\uACE0 \uC0AC\uC6A9 \uC2B9\uC778", () => transact(ad, "approveUse"));
  } }, /* @__PURE__ */ React.createElement(Check, { size: 17 }), "\uAD11\uACE0 \uC0AC\uC6A9 \uC2B9\uC778"), /* @__PURE__ */ React.createElement("button", { className: "danger-outline full", disabled: !!busy || ad.demo || !can(ad, role, "rejectUse"), onClick: () => {
    if (confirm("\uC774 \uAD11\uACE0\uC758 \uC0AC\uC6A9\uC744 \uAC70\uC808\uD560\uAE4C\uC694?")) run("\uAD11\uACE0 \uC0AC\uC6A9 \uAC70\uC808", () => transact(ad, "rejectUse"));
  } }, "\uAC70\uC808 / \uC9D1\uD589 \uC804 \uC2B9\uC778 \uCCA0\uD68C")), role === "platform" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "\uAC80\uD1A0\uC6A9 \uC6D0\uBCF8\uC744 \uD655\uC778\uD558\uAC70\uB098, \uC2E4\uC81C \uAC8C\uC2DC\uD560 \uD30C\uC77C\uC744 \uC120\uD0DD\uD574 \uD574\uC2DC\uB97C \uB300\uC870\uD558\uC138\uC694."), /* @__PURE__ */ React.createElement("label", { className: "file-compare" }, /* @__PURE__ */ React.createElement(Upload, { size: 17 }), "\uAC8C\uC2DC\uD560 MP4 \uD30C\uC77C \uB300\uC870", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "video/mp4,.mp4", disabled: !!busy || ad.demo, onChange: (e) => run("\uD30C\uC77C \uD574\uC2DC \uBE44\uAD50", () => inspectFile(e.target.files[0])) })), checkResult && /* @__PURE__ */ React.createElement("p", { className: checkResult.startsWith("\uC77C\uCE58") ? "check-good" : "check-bad" }, checkResult), /* @__PURE__ */ React.createElement("button", { className: "primary full", disabled: !!busy || ad.demo || !ad.hasVideo || !same(actual, ad.videoHash) || !can(ad, role, "activateAd"), onClick: () => {
    if (confirm("\uAD11\uACE0\uB97C \uC9D1\uD589\uD558\uACE0 \uAD8C\uB9AC\uC790\xB7\uD50C\uB7AB\uD3FC\uC5D0 \uC815\uC0B0\uD560\uAE4C\uC694?")) run("\uAD11\uACE0 \uC9D1\uD589 \xB7 \uC815\uC0B0", () => transact(ad, "activateAd", actual));
  } }, "\uC9D1\uD589 \xB7 \uC790\uB3D9 \uC815\uC0B0 ", /* @__PURE__ */ React.createElement(ArrowUpRight, { size: 17 })), /* @__PURE__ */ React.createElement("p", { className: "fine" }, "\uC9D1\uD589 \uC2DC \uACC4\uC57D\uC5D0 \uC815\uD55C \uC0AC\uC6A9 \uAE30\uAC04 ", formatDuration(ad.USAGE_PERIOD), "\uC774 \uC2DC\uC791\uB429\uB2C8\uB2E4. \uC774 \uC0AC\uC774\uD2B8\uC758 \uACF5\uAC1C \uAD11\uACE0 \uD654\uBA74\uC5D0\uC11C \uC7AC\uC0DD\uD560 \uC218 \uC788\uC5B4\uC694."))) : /* @__PURE__ */ React.createElement("div", { className: "public-notice" }, /* @__PURE__ */ React.createElement(Eye, { size: 21 }), /* @__PURE__ */ React.createElement("strong", null, "\uC9C4\uD589 \uC0C1\uD0DC\uB97C \uD568\uAED8 \uD655\uC778\uD558\uC138\uC694"), /* @__PURE__ */ React.createElement("p", null, "\uAC70\uB798 \uC2E4\uD589\uC740 \uACC4\uC57D\uC5D0 \uC9C0\uC815\uB41C \uCC38\uC5EC\uC790\uB9CC \uD560 \uC218 \uC788\uC5B4\uC694. \uC6D0\uBCF8\uC740 \uAC8C\uC2DC \uD6C4 \uC0AC\uC6A9 \uAE30\uAC04 \uB3D9\uC548 \uACF5\uAC1C\uB429\uB2C8\uB2E4.")))), /* @__PURE__ */ React.createElement("details", { className: "technical" }, /* @__PURE__ */ React.createElement("summary", null, "\uACC4\uC57D \uC8FC\uC18C\uC640 \uC601\uC0C1 \uD574\uC2DC"), /* @__PURE__ */ React.createElement("p", null, "\uB124\uD2B8\uC6CC\uD06C: Bifrost Testnet / 49088"), /* @__PURE__ */ React.createElement("p", null, "\uAD11\uACE0 \uACC4\uC57D ", /* @__PURE__ */ React.createElement("code", null, ad.address)), /* @__PURE__ */ React.createElement("p", null, "CADToken ", /* @__PURE__ */ React.createElement("code", null, ad.cad || "\uC608\uC2DC")), /* @__PURE__ */ React.createElement("p", null, "\uB4F1\uB85D\uB41C \uC601\uC0C1 SHA-256 ", /* @__PURE__ */ React.createElement("code", null, ad.videoHash)), /* @__PURE__ */ React.createElement("p", null, "\uCD5C\uADFC \uC870\uD68C \uBE14\uB85D ", ad.blockNumber || "\u2014"), /* @__PURE__ */ React.createElement("button", { className: "text-button", onClick: refresh }, /* @__PURE__ */ React.createElement(RefreshCw, { size: 14 }), "\uC0C1\uD0DC \uC0C8\uB85C\uACE0\uCE68")));
}
function UploadExisting({ ad, busy, run, ensureSession, refresh }) {
  return /* @__PURE__ */ React.createElement("label", { className: "file-compare" }, /* @__PURE__ */ React.createElement(Upload, { size: 16 }), "\uB4F1\uB85D\uB41C \uD574\uC2DC\uC758 \uC6D0\uBCF8 \uC5C5\uB85C\uB4DC", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "video/mp4,.mp4", disabled: !!busy || ad.demo || ![1, 2, 3, 4].includes(ad.status), onChange: (e) => {
    const f = e.target.files[0];
    if (!f) return;
    run("\uC6D0\uBCF8 \uC5C5\uB85C\uB4DC", async () => {
      await ensureSession();
      if (f.size > 50 * 1024 * 1024) throw new Error("50MB \uC774\uD558 \uD30C\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694.");
      if (!same(await fileHash(f), ad.videoHash)) throw new Error("Video hash mismatch");
      const t = await thumbnail(f);
      const d = new FormData();
      d.append("video", f);
      d.append("thumbnail", t, "blur.jpg");
      await api("/ads/" + ad.address + "/media", { method: "POST", body: d });
      await refresh();
    });
  } }));
}
function DurationInput({ label, value, unit, onValue, onUnit }) {
  return /* @__PURE__ */ React.createElement("label", { className: "field" }, label, /* @__PURE__ */ React.createElement("div", { className: "duration-input" }, /* @__PURE__ */ React.createElement("input", { "aria-label": label + " \uAC12", type: "number", min: "1", step: "1", required: true, value, onChange: (e) => onValue(e.target.value) }), /* @__PURE__ */ React.createElement("select", { "aria-label": label + " \uB2E8\uC704", value: unit, onChange: (e) => onUnit(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "days" }, "\uC77C"), /* @__PURE__ */ React.createElement("option", { value: "hours" }, "\uC2DC\uAC04"), /* @__PURE__ */ React.createElement("option", { value: "minutes" }, "\uBD84"), /* @__PURE__ */ React.createElement("option", { value: "seconds" }, "\uCD08"))));
}
export {
  App
};
