import { inject as Je, reactive as wt, watch as ie, ref as A, computed as R, shallowRef as hn, markRaw as Yn, defineComponent as te, onMounted as ve, nextTick as Ve, openBlock as u, createElementBlock as h, withKeys as ut, unref as i, createElementVNode as a, withModifiers as ae, renderSlot as xe, createCommentVNode as L, toDisplayString as y, createBlock as U, resolveDynamicComponent as ht, withCtx as se, createVNode as N, Fragment as ue, renderList as pe, withDirectives as fe, vModelCheckbox as yt, vModelText as vt, onUnmounted as ke, useTemplateRef as Xe, createTextVNode as ce, resolveComponent as mn, normalizeClass as ne, customRef as Qn, Teleport as bt, normalizeStyle as Oe, isRef as Xn, vModelSelect as At, onBeforeUnmount as gn, vModelRadio as Dt, mergeProps as Ae, toHandlers as He, vShow as Ue, normalizeProps as Ke, guardReactiveProps as je, onUpdated as Jn, useModel as wn, mergeModels as Zn, Transition as eo, provide as Mt, useSlots as to } from "vue";
import no from "mitt";
import { useStore as q } from "@nanostores/vue";
import { persistentAtom as yn } from "@nanostores/persistent";
import { toast as _t, Toaster as oo } from "vue-sonner";
import { normalizeFeatures as bn } from "./features.js";
import { atom as Fe, computed as Ne } from "nanostores";
import { QueryClient as so } from "@tanstack/vue-query";
import io from "@uppy/core";
import { Cropper as ao } from "vue-advanced-cropper";
import kn from "vanilla-lazyload";
import { OverlayScrollbars as it, SizeObserverPlugin as ro } from "overlayscrollbars";
import { computePosition as Ze, offset as at, flip as rt, shift as lt, autoUpdate as Vt } from "@floating-ui/dom";
import lo from "@viselect/vanilla";
import co from "@uppy/xhr-upload";
const Bt = /* @__PURE__ */ new Map(), Ot = /* @__PURE__ */ Symbol("ServiceContainerId");
function uo(n, e) {
  Bt.set(n, e);
}
function vo(n) {
  Bt.delete(n);
}
function ee(n) {
  const e = n ?? Je(Ot);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Bt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function fo(n) {
  const e = localStorage.getItem(n + "_storage"), t = wt(JSON.parse(e ?? "{}"));
  ie(t, o);
  function o() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function s(c, v) {
    t[c] = v;
  }
  function l(c) {
    delete t[c];
  }
  function r() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, v = null) => c in t ? t[c] : v, setStore: s, removeStore: l, clearStore: r };
}
function Pe(n, e = "An error occurred") {
  if (!n)
    return e;
  if (typeof n == "string")
    return n || e;
  if (n instanceof Error)
    return n.message || e;
  if (typeof n == "object" && n !== null) {
    const t = n;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function po(n, e) {
  return yn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function _o(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function Qe(n, e, t) {
  const o = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", o), !!_o(n))
    switch (e) {
      case "success":
        _t.success(t);
        break;
      case "error":
        _t.error(t);
        break;
      case "warning":
        _t.warning(t);
        break;
      default:
        _t.info(t);
        break;
    }
}
function De(n) {
  return {
    success(e) {
      Qe(n, "success", e);
    },
    error(e) {
      Qe(n, "error", e);
    },
    info(e) {
      Qe(n, "info", e);
    },
    warning(e) {
      Qe(n, "warning", e);
    },
    emit(e, t) {
      Qe(n, e, t);
    }
  };
}
const Tt = /* @__PURE__ */ new Map();
async function Et(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function ho(n, e, t, o, s) {
  const l = De({ emitter: t, config: s }), r = "vuefinder_locale", d = "global";
  let c;
  if (Tt.has(d))
    c = Tt.get(d), e && e !== c.get() && c.set(e);
  else {
    const b = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = po(r, e || b || "en"), Tt.set(d, c);
  }
  const v = "vuefinder_translations", p = (b) => {
    try {
      const P = localStorage.getItem(v);
      if (P)
        return JSON.parse(P)[b] || null;
    } catch {
    }
    return null;
  }, w = (b, P) => {
    try {
      const S = localStorage.getItem(v), M = S ? JSON.parse(S) : {};
      M[b] = P, localStorage.setItem(v, JSON.stringify(M));
    } catch {
    }
  }, _ = q(c), $ = String(_.value), C = p($), x = A(C || {});
  let m = !1;
  !C && Object.keys(o).length > 0 && Et($, o).then((b) => {
    x.value = b, w($, b);
  }).catch(() => {
  }), ie(
    _,
    async (b, P) => {
      if (P && b === P)
        return;
      if (!m) {
        m = !0;
        const M = p(String(b));
        if (M)
          x.value = M;
        else if (Object.keys(o).length > 0)
          try {
            const T = await Et(String(b), o);
            x.value = T, w(String(b), T);
          } catch {
          }
        return;
      }
      const S = p(String(b));
      if (S)
        x.value = S;
      else
        try {
          const M = await Et(String(b), o);
          x.value = M, w(String(b), M);
        } catch (M) {
          const T = Pe(M, "Locale cannot be loaded!");
          l.error(T);
          return;
        }
      Object.values(o).length > 1 && (l.success("The language is set to " + b), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const k = (b, ...P) => P.length ? k(b = b.replace("%s", String(P.shift())), ...P) : b;
  function g(b, ...P) {
    return x.value && Object.prototype.hasOwnProperty.call(x.value, b) ? k(x.value[b] || b, ...P) : k(b, ...P);
  }
  const f = R({
    get: () => _.value,
    set: (b) => {
      c.set(b);
    }
  });
  return wt({ t: g, locale: f, localeAtom: c });
}
const mo = "4.1.1";
function Rt(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1024, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function $n(n, e, t, o, s) {
  return e = Math, t = e.log, o = 1e3, s = t(n) / t(o) | 0, (n / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function go(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!o) return 0;
  const s = parseFloat(o[1] || "0"), l = (o[2] || "").toLowerCase(), r = e[l] ?? 0;
  return Math.round(s * Math.pow(1024, r));
}
function wo(n) {
  const e = hn(null), t = A(!1), o = A(), s = A(!1);
  return { visible: t, type: e, data: o, open: (c, v = null) => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = c, o.value = v;
  }, close: () => {
    n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null;
  }, setEditMode: (c) => {
    s.value = c;
  }, editMode: s };
}
const mt = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: [],
  notificationsEnabled: !0,
  expandTreeByDefault: !1,
  expandedTreePaths: []
}, gt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: "bottom-center",
  notificationDuration: 3e3,
  notificationVisibleToasts: 4,
  notificationRichColors: !0
}, yo = new Set(
  Object.keys(gt)
);
function bo(n) {
  return n || "silver";
}
function xn(n) {
  return yo.has(n);
}
function on(n) {
  const e = {}, t = {}, o = n;
  for (const s in o)
    if (xn(s))
      t[s] = o[s];
    else if (s in mt) {
      const l = s;
      e[l] = o[s];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function sn(n, e) {
  const t = { ...mt, ...e, ...n };
  return t.theme = bo(t.theme), t;
}
function an(n, e) {
  return { ...gt, ...e, ...n };
}
const ko = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: o, nonPersistenceConfig: s } = on(e), l = sn(
    o,
    mt
  ), r = an(
    s,
    gt
  ), d = yn(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Fe(r), v = Ne(
    [d, c],
    (m, k) => ({
      ...m,
      ...k
    })
  ), p = (m = {}) => {
    const k = d.get(), g = c.get(), { persistenceConfig: f, nonPersistenceConfig: b } = on(m), P = sn(f, k), S = an(
      b,
      g
    );
    d.set(P), c.set(S);
  }, w = (m) => xn(m) ? c.get()[m] : d.get()[m], _ = () => ({
    ...d.get(),
    ...c.get()
  }), $ = (m, k) => {
    const g = d.get();
    typeof m == "object" && m !== null ? d.set({ ...g, ...m }) : d.set({
      ...g,
      [m]: k
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: p,
    get: w,
    set: $,
    toggle: (m) => {
      const k = d.get();
      $(m, !k[m]);
    },
    all: _,
    reset: () => {
      d.set({ ...mt }), c.set({ ...gt });
    }
  };
};
function $o(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, o = Number(e) || 0;
  return t === o ? 0 : t < o ? -1 : 1;
}
const xo = () => {
  const n = Fe(""), e = Fe([]), t = Fe(!1), o = Fe([]), s = Fe({ active: !1, column: "", order: "" }), l = Fe({
    kind: "all",
    showHidden: !1
  }), r = Fe(/* @__PURE__ */ new Set()), d = Fe({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Fe(null), v = Fe(0), p = Fe(!1), w = Fe([]), _ = Fe(-1), $ = Ne([n], (H) => {
    const K = (H ?? "").trim(), Q = K.indexOf("://"), oe = Q >= 0 ? K.slice(0, Q) : "", Te = (Q >= 0 ? K.slice(Q + 3) : K).split("/").filter(Boolean);
    let Ie = "";
    const tt = Te.map((Se) => (Ie = Ie ? `${Ie}/${Se}` : Se, {
      basename: Se,
      name: Se,
      path: oe ? `${oe}://${Ie}` : Ie,
      type: "dir"
    }));
    return { storage: oe, breadcrumb: tt, path: K };
  }), C = Ne([o, s, l], (H, K, Q) => {
    let oe = H;
    Q.kind === "files" ? oe = oe.filter((Se) => Se.type === "file") : Q.kind === "folders" && (oe = oe.filter((Se) => Se.type === "dir")), Q.showHidden || (oe = oe.filter((Se) => !Se.basename.startsWith(".")));
    const { active: Le, column: Te, order: Ie } = K;
    if (!Le || !Te) return oe;
    const tt = Ie === "asc" ? 1 : -1;
    return oe.slice().sort((Se, Ft) => $o(Se[Te], Ft[Te]) * tt);
  }), x = Ne([o, r], (H, K) => K.size === 0 ? [] : H.filter((Q) => K.has(Q.path))), m = (H, K) => {
    const Q = n.get();
    if ((K ?? !0) && Q !== H) {
      const oe = w.get(), Le = _.get();
      Le < oe.length - 1 && oe.splice(Le + 1), oe.length === 0 && Q && oe.push(Q), oe.push(H), w.set([...oe]), _.set(oe.length - 1);
    }
    n.set(H);
  }, k = (H) => {
    o.set(H ?? []);
  }, g = (H) => {
    e.set(H ?? []);
  }, f = (H, K) => {
    s.set({ active: !0, column: H, order: K });
  }, b = (H) => {
    const K = s.get();
    K.active && K.column === H ? s.set({
      active: K.order === "asc",
      column: H,
      order: "desc"
    }) : s.set({
      active: !0,
      column: H,
      order: "asc"
    });
  }, P = () => {
    s.set({ active: !1, column: "", order: "" });
  }, S = (H, K) => {
    l.set({ kind: H, showHidden: K });
  }, M = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, T = (H, K = "multiple") => {
    const Q = new Set(r.get());
    K === "single" && Q.clear(), Q.add(H), r.set(Q);
  }, B = (H, K = "multiple") => {
    const Q = new Set(r.get());
    K === "single" && Q.clear(), H.forEach((oe) => Q.add(oe)), r.set(Q);
  }, j = (H) => {
    const K = new Set(r.get());
    K.delete(H), r.set(K);
  }, O = (H) => r.get().has(H), G = (H, K = "multiple") => {
    const Q = new Set(r.get());
    Q.has(H) ? Q.delete(H) : (K === "single" && Q.clear(), Q.add(H)), r.set(Q);
  }, E = (H = "multiple", K) => {
    if (H === "single") {
      const Q = o.get()[0];
      if (Q) {
        const oe = Q.path;
        r.set(/* @__PURE__ */ new Set([oe])), v.set(1);
      }
    } else {
      if (K?.selectionFilterType || K?.selectionFilterMimeIncludes && K.selectionFilterMimeIncludes.length > 0) {
        const Q = o.get().filter((oe) => {
          const Le = K.selectionFilterType, Te = K.selectionFilterMimeIncludes;
          return Le === "files" && oe.type === "dir" || Le === "dirs" && oe.type === "file" ? !1 : Te && Array.isArray(Te) && Te.length > 0 && oe.type !== "dir" ? oe.mime_type ? Te.some((Ie) => oe.mime_type?.startsWith(Ie)) : !1 : !0;
        }).map((oe) => oe.path);
        r.set(new Set(Q));
      } else {
        const Q = new Set(o.get().map((oe) => oe.path));
        r.set(Q);
      }
      J(r.get().size);
    }
  }, X = () => {
    r.set(/* @__PURE__ */ new Set()), v.set(0);
  }, W = (H) => {
    const K = new Set(H ?? []);
    r.set(K), v.set(K.size);
  }, J = (H) => {
    v.set(H);
  }, I = (H) => {
    p.set(!!H);
  }, D = () => p.get(), F = (H, K) => {
    const Q = o.get().filter((oe) => K.has(oe.path));
    d.set({
      type: H,
      path: $.get().path,
      items: new Set(Q)
    });
  }, z = (H) => Ne([d], (K) => K.type === "cut" && Array.from(K.items).some((Q) => Q.path === H)), V = (H) => Ne([d], (K) => K.type === "copy" && Array.from(K.items).some((Q) => Q.path === H)), Y = (H) => {
    const K = z(H);
    return q(K).value ?? !1;
  }, le = (H) => {
    const K = V(H);
    return q(K).value ?? !1;
  }, _e = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, $e = () => d.get(), ge = (H) => {
    c.set(H);
  }, We = () => c.get(), qe = () => {
    c.set(null);
  }, we = () => {
    const H = w.get(), K = _.get();
    if (K > 0) {
      const Q = K - 1, oe = H[Q];
      oe && (_.set(Q), m(oe, !1));
    }
  }, Z = () => {
    const H = w.get(), K = _.get();
    if (K < H.length - 1) {
      const Q = K + 1, oe = H[Q];
      oe && (_.set(Q), m(oe, !1));
    }
  }, de = Ne([_], (H) => H > 0), re = Ne(
    [w, _],
    (H, K) => K < H.length - 1
  );
  return {
    // Atoms (state)
    files: o,
    storages: e,
    currentPath: n,
    sort: s,
    filter: l,
    selectedKeys: r,
    selectedCount: v,
    loading: p,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: $,
    sortedFiles: C,
    selectedItems: x,
    // Actions
    setPath: m,
    setFiles: k,
    setStorages: g,
    setSort: f,
    toggleSort: b,
    clearSort: P,
    setFilter: S,
    clearFilter: M,
    select: T,
    selectMultiple: B,
    deselect: j,
    toggleSelect: G,
    selectAll: E,
    isSelected: O,
    clearSelection: X,
    setSelection: W,
    setSelectedCount: J,
    setLoading: I,
    isLoading: D,
    setClipboard: F,
    createIsCut: z,
    createIsCopied: V,
    isCut: Y,
    isCopied: le,
    clearClipboard: _e,
    getClipboard: $e,
    setDraggedItem: ge,
    getDraggedItem: We,
    clearDraggedItem: qe,
    setReadOnly: (H) => {
      t.set(H);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (H) => t.get() ? !0 : H.read_only ?? !1,
    // Navigation
    goBack: we,
    goForward: Z,
    canGoBack: de,
    canGoForward: re,
    navigationHistory: w,
    historyIndex: _
  };
};
class Ut {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, t) {
    if (e == null)
      throw new Error(`${t} is required`);
  }
  /**
   * Validate that a file path is provided
   */
  validatePath(e) {
    if (!e)
      throw new Error("Path must be a non-empty string");
  }
  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  parsePath(e) {
    if (!e)
      return {};
    if (e.includes("://")) {
      const [t, ...o] = e.split("://");
      return { storage: t, path: o.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, t) {
    return e && t ? `${e}://${t}` : t || "";
  }
}
class So extends Ut {
  filesSource;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files;
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "memory"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "memory", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  ensureWritable() {
    if (this.readOnly)
      throw new Error("Driver is read-only");
  }
  ensureStorageSupported(e) {
    if (!this.storagesSet.has(e))
      throw new Error(`Unsupported storage: ${e}`);
  }
  combine(e, t = this.defaultStorage) {
    this.ensureStorageSupported(t);
    const o = e ?? "";
    return o === "" ? `${t}://` : `${t}://${o}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: o, path: s } = this.split(e || ""), l = o || t;
    return this.combine(s ?? "", l);
  }
  parent(e) {
    const { storage: t, path: o } = this.split(e), s = t || this.defaultStorage;
    if (!o) return this.combine("", s);
    const l = o.replace(/\/+$/g, "").replace(/^\/+/, ""), r = l.lastIndexOf("/");
    return r <= 0 ? this.combine("", s) : this.combine(l.slice(0, r), s);
  }
  join(e, t) {
    const { storage: o, path: s } = this.split(e), l = o || this.defaultStorage, r = (s ?? "").replace(/\/$/, ""), d = r ? `${r}/${t}` : t;
    return this.combine(d, l);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    return this.files.find((t) => t.path === e);
  }
  listChildren(e) {
    return this.files.filter((t) => t.dir === e);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), o = t.findIndex((s) => s.path === e.path);
    o === -1 ? t.push(e) : t[o] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((o) => o.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], o = [];
    for (const s of this.files)
      this.isInTree(s.path, e) ? t.push(s) : o.push(s);
    this.replaceAll(o);
    for (const s of t)
      this.contentStore.delete(s.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((o) => this.isInTree(o.path, e)).sort((o, s) => o.path.length - s.path.length);
  }
  uniqueName(e, t, o) {
    if (!o.has(this.join(e, t))) return t;
    const s = t.lastIndexOf("."), l = s > 0 ? t.slice(0, s) : t, r = s > 0 ? t.slice(s) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${r}`, v = this.join(e, c);
      if (!o.has(v)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const o = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, r) => l.length - r.length), s = [];
    for (const l of o)
      s.some((r) => this.isInTree(l, r)) || s.push(l);
    return s;
  }
  makeDirEntry(e, t) {
    const o = this.join(e, t), { storage: s } = this.split(o);
    return {
      storage: s || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: o,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, o = 0, s = null) {
    const l = this.join(e, t), { storage: r } = this.split(l);
    return {
      storage: r || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
      type: "file",
      file_size: o,
      last_modified: Date.now(),
      mime_type: s,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: this.storages,
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = this.normalizePath(e?.path);
    return {
      storages: this.storages,
      dirname: t,
      files: this.listChildren(t),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.ensureWritable(), this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = [];
    for (const r of e.items) {
      const d = this.normalizePath(r.path, o || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? s.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), s.push(c)));
    }
    return { ...this.resultForDir(t), deleted: s };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: o } = this.split(t), s = this.normalizePath(
      e.item || e.path,
      o || this.defaultStorage
    ), l = this.findByPath(s);
    if (!l) throw new Error("Item not found");
    const r = l.dir, d = this.join(r, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const v = l.path, p = d, w = this.files.map((_) => {
        if (_.storage !== l.storage || !this.isInTree(_.path, v)) return _;
        const $ = p + _.path.slice(v.length);
        return this.cloneEntry(_, {
          path: $,
          dir: this.parent($),
          basename: _.path === v ? e.name : _.basename,
          last_modified: Date.now()
        });
      });
      for (const [_, $] of Array.from(this.contentStore.entries()))
        this.isInTree(_, v) && (this.contentStore.delete(_), this.contentStore.set(p + _.slice(v.length), $));
      this.replaceAll(w);
    } else {
      const v = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(l.path);
      const p = this.contentStore.get(l.path);
      p !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(v.path, p));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : r;
    return this.resultForDir(c || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), r = [];
    for (const d of s) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const _ = this.uniqueName(t, c.basename, l), $ = this.makeFileEntry(
          t,
          _,
          c.file_size || 0,
          c.mime_type
        );
        r.push($), l.add($.path);
        const C = this.contentStore.get(c.path);
        C !== void 0 && this.contentStore.set($.path, C);
        continue;
      }
      const v = this.getTree(c.path), p = this.uniqueName(t, c.basename, l), w = /* @__PURE__ */ new Map();
      w.set(c.path, this.join(t, p));
      for (const _ of v) {
        const $ = _.path === c.path ? w.get(c.path) : this.join(w.get(_.dir), _.basename);
        w.set(_.path, $);
        const C = _.path === c.path ? t : w.get(_.dir), x = _.path === c.path ? p : _.basename, m = this.cloneEntry(_, {
          path: $,
          dir: C,
          basename: x,
          extension: _.type === "file" ? this.getExtension(x) : "",
          last_modified: Date.now()
        });
        if (r.push(m), l.add(m.path), _.type === "file") {
          const k = this.contentStore.get(_.path);
          k !== void 0 && this.contentStore.set(m.path, k);
        }
      }
    }
    return this.replaceAll(this.files.concat(r)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: o } = this.split(t), s = this.topLevelSources(e.sources, o || this.defaultStorage);
    let l = this.files.slice();
    for (const r of s) {
      const d = l.find((C) => C.path === r);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), v = new Set(c.map((C) => C.path)), p = new Set(l.filter((C) => !v.has(C.path)).map((C) => C.path)), w = this.uniqueName(t, d.basename, p), _ = /* @__PURE__ */ new Map();
      _.set(d.path, this.join(t, w));
      const $ = /* @__PURE__ */ new Map();
      for (const C of c) {
        const x = C.path === d.path ? _.get(d.path) : this.join(_.get(C.dir), C.basename);
        _.set(C.path, x);
        const m = C.path === d.path ? t : _.get(C.dir), k = C.path === d.path ? w : C.basename;
        $.set(
          C.path,
          this.cloneEntry(C, {
            path: x,
            dir: m,
            basename: k,
            extension: C.type === "file" ? this.getExtension(k) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((C) => $.get(C.path) || C);
      for (const [C, x] of _.entries()) {
        if (C === x) continue;
        const m = this.contentStore.get(C);
        m !== void 0 && (this.contentStore.delete(C), this.contentStore.set(x, m));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, s = this.makeFileEntry(t, o, 0, "application/zip");
    return this.upsert(s), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), o = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("Archive not found");
    const l = s.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(o, l);
    return this.upsert(r), this.resultForDir(o);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(o), this.contentStore.set(o.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), o = this.makeDirEntry(t, e.name);
    return this.upsert(o), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), o = this.contentStore.get(t);
    if (typeof o == "string" || o === void 0)
      return {
        content: o ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const s = new Uint8Array(o);
    let l = "";
    for (let r = 0; r < s.length; r++) l += String.fromCharCode(s[r]);
    return {
      content: btoa(l),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), o = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((s) => {
      if (o) {
        if (e.deep) {
          if (!this.isInTree(s.path, o)) return !1;
        } else if (s.dir !== o)
          return !1;
      }
      return s.basename.toLowerCase().includes(t) || s.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), o = this.findByPath(t);
    if (!o) throw new Error("File not found");
    if (o.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(o, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  configureUploader(e, t) {
    e && e.on("upload-success", async (o) => {
      try {
        this.ensureWritable();
        const s = this.normalizePath(t.getTargetPath()), l = o?.name || "file", r = o?.type || null, d = o?.data, c = o?.size || 0, v = this.makeFileEntry(s, l, c, r);
        if (this.upsert(v), d)
          try {
            const p = await d.arrayBuffer();
            this.contentStore.set(v.path, p);
          } catch {
            this.contentStore.set(v.path, "");
          }
        else
          this.contentStore.set(v.path, "");
      } catch {
      }
    });
  }
}
function rn(n, e, t) {
  const o = `HTTP ${e}: ${t}`;
  if (!n)
    return o;
  try {
    const s = JSON.parse(n);
    if (s.message)
      return s.message;
    if (s.error) {
      if (typeof s.error == "string")
        return s.error;
      if (s.error.message)
        return s.error.message;
    }
    if (s.errors && Array.isArray(s.errors) && s.errors.length > 0) {
      const l = s.errors.map((r) => r.message).filter((r) => !!r);
      if (l.length > 0)
        return l.join(", ");
    }
    return s.detail ? s.detail : s.title ? s.title : n;
  } catch {
    return n || o;
  }
}
class Sn extends Ut {
  config;
  /**
   * Default URL endpoints
   */
  static DEFAULT_URLS = {
    list: "",
    upload: "/upload",
    delete: "/delete",
    rename: "/rename",
    copy: "/copy",
    move: "/move",
    archive: "/archive",
    unarchive: "/unarchive",
    createFile: "/create-file",
    createFolder: "/create-folder",
    preview: "/preview",
    download: "/download",
    search: "/search",
    save: "/save"
  };
  constructor(e) {
    super();
    const t = {
      ...Sn.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: t
    };
  }
  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(e) {
    this.config.baseURL = e || "";
  }
  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(e) {
    this.config.token = e;
  }
  configureUploader(e, t) {
    const o = this.getHeaders();
    delete o["Content-Type"], e.use(co, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: o,
      formData: !0
    }), e.on("upload", () => {
      const s = t.getTargetPath();
      e.getFiles().forEach((r) => {
        e.setFileMeta(r.id, { path: s });
      });
    });
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json",
      ...this.config.headers
    };
    return this.config.token && (e.Authorization = `Bearer ${this.config.token}`), e;
  }
  async request(e, t = {}) {
    const o = `${this.config.baseURL}${e}`, s = await fetch(o, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!s.ok) {
      const r = await s.text(), d = rn(r, s.status, s.statusText);
      throw new Error(d);
    }
    return (s.headers.get("content-type") || "").includes("application/json") ? await s.json() : await s.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const o = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(o, { method: "GET" });
  }
  async delete(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.path, "path"), await this.request(this.config.url.delete, {
      method: "POST",
      body: JSON.stringify({ path: e.path, items: e.items })
    });
  }
  async rename(e) {
    return this.validateParam(e.path, "path"), this.validateParam(e.item, "item"), this.validateParam(e.name, "name"), this.validatePath(e.path), await this.request(this.config.url.rename, {
      method: "POST",
      body: JSON.stringify({ path: e.path, item: e.item, name: e.name })
    });
  }
  async copy(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.move, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async archive(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.archive, {
      method: "POST",
      body: JSON.stringify({ items: e.items, path: e.path, name: e.name })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({ item: e.item, path: e.path })
    });
  }
  async createFile(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFile, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  async createFolder(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFolder, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  getPreviewUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), o = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, s = await fetch(o, { headers: this.getHeaders() });
    if (!s.ok) {
      const r = await s.text(), d = rn(r, s.status, s.statusText);
      throw new Error(d);
    }
    return { content: await s.text(), mimeType: s.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, o = new URLSearchParams();
    e.path && o.set("path", e.path), e.filter && o.set("filter", e.filter), e.deep && o.set("deep", "1"), e.size && e.size !== "all" && o.set("size", e.size);
    const s = o.toString() ? `${t}?${o.toString()}` : t;
    return (await this.request(s, {
      method: "GET"
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders()
    });
  }
}
class sf extends Ut {
  dbName;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  entries = [];
  contentStore = /* @__PURE__ */ new Map();
  driver;
  readyPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder";
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "indexeddb"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new So({
      files: this.entries,
      storage: this.defaultStorage,
      storages: this.storages,
      readOnly: this.readOnly,
      contentStore: this.contentStore
    }), this.readyPromise = this.loadSnapshotFromDB();
  }
  isManagedStorage(e) {
    return !!(e && this.storagesSet.has(e));
  }
  isManagedPath(e) {
    if (!e) return !1;
    const { storage: t } = this.parsePath(e);
    return this.isManagedStorage(t);
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const o = indexedDB.open(this.dbName, this.version);
      o.onerror = () => t(o.error), o.onsuccess = () => {
        this.db = o.result, e(this.db);
      }, o.onupgradeneeded = (s) => {
        const l = s.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const r = l.createObjectStore("files", { keyPath: "path" });
          r.createIndex("storage", "storage", { unique: !1 }), r.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, o) => {
      e.onsuccess = () => t(e.result), e.onerror = () => o(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, o) => {
      e.oncomplete = () => t(), e.onerror = () => o(e.error), e.onabort = () => o(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), o = t.objectStore("files"), s = t.objectStore("content"), [l, r] = await Promise.all([
      this.requestToPromise(o.getAll()),
      this.requestToPromise(s.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of r)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), o = t.objectStore("files"), s = t.objectStore("content"), l = this.requestToPromise(
      o.getAll()
    ), r = this.requestToPromise(
      s.getAll()
    ), [d, c] = await Promise.all([
      l,
      r
    ]);
    o.clear(), s.clear();
    for (const v of d)
      this.isManagedStorage(v.storage) || o.put(v);
    for (const v of c)
      this.isManagedPath(v.path) || s.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && o.put(v);
    for (const [v, p] of this.contentStore.entries())
      this.isManagedPath(v) && s.put({ path: v, content: p });
    await this.waitTransaction(t);
  }
  async ensureReady() {
    this.readyPromise || (this.readyPromise = this.loadSnapshotFromDB()), await this.readyPromise;
  }
  async list(e) {
    return await this.ensureReady(), this.driver.list(e);
  }
  async delete(e) {
    await this.ensureReady();
    const t = await this.driver.delete(e);
    return await this.persistSnapshot(), t;
  }
  async rename(e) {
    await this.ensureReady();
    const t = await this.driver.rename(e);
    return await this.persistSnapshot(), t;
  }
  async copy(e) {
    await this.ensureReady();
    const t = await this.driver.copy(e);
    return await this.persistSnapshot(), t;
  }
  async move(e) {
    await this.ensureReady();
    const t = await this.driver.move(e);
    return await this.persistSnapshot(), t;
  }
  async archive(e) {
    await this.ensureReady();
    const t = await this.driver.archive(e);
    return await this.persistSnapshot(), t;
  }
  async unarchive(e) {
    await this.ensureReady();
    const t = await this.driver.unarchive(e);
    return await this.persistSnapshot(), t;
  }
  async createFile(e) {
    await this.ensureReady();
    const t = await this.driver.createFile(e);
    return await this.persistSnapshot(), t;
  }
  async createFolder(e) {
    await this.ensureReady();
    const t = await this.driver.createFolder(e);
    return await this.persistSnapshot(), t;
  }
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  async getContent(e) {
    return await this.ensureReady(), this.driver.getContent(e);
  }
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  async search(e) {
    return await this.ensureReady(), this.driver.search(e);
  }
  async save(e) {
    await this.ensureReady();
    const t = await this.driver.save(e);
    return await this.persistSnapshot(), t;
  }
  configureUploader(e, t) {
    this.ensureReady(), this.driver.configureUploader?.(e, t), e && e.on("upload-success", async () => {
      try {
        await this.ensureReady(), await this.persistSnapshot();
      } catch {
      }
    });
  }
}
const ln = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, o) => ["adapter", "search", n, e, t, o],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Co {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new so({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
          staleTime: t.staleTime ?? 300 * 1e3,
          retry: t.retry ?? 2
        },
        mutations: {
          retry: t.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
      staleTime: t.staleTime ?? 300 * 1e3,
      cacheTime: t.cacheTime ?? 600 * 1e3,
      retry: t.retry ?? 2,
      onBeforeOpen: this.onBeforeOpen ?? (() => {
      }),
      onAfterOpen: this.onAfterOpen ?? (() => {
      })
    };
  }
  /**
   * Get the underlying driver instance
   */
  getDriver() {
    return this.driver;
  }
  /**
   * Get the query client instance
   */
  getQueryClient() {
    return this.queryClient;
  }
  /**
   * List files with caching and automatic refetching
   */
  async list(e) {
    const t = ln.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.list({ path: e }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Open a path and optionally update state
   * @param path
   * @returns
   */
  async open(e) {
    this.onBeforeOpen && this.onBeforeOpen();
    const t = await this.list(e);
    return this.onAfterOpen && this.onAfterOpen(t), t;
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const t = await this.driver.delete(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const t = await this.driver.rename(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const t = await this.driver.copy(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const t = await this.driver.move(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const t = await this.driver.archive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const t = await this.driver.unarchive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const t = await this.driver.createFile(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const t = await this.driver.createFolder(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const t = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.getContent(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const t = ln.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: () => this.driver.search(e),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const t = await this.driver.save(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Invalidate all list queries
   */
  invalidateListQueries() {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter"],
      exact: !1
    });
  }
  invalidateListQuery(e) {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter", "list", e],
      exact: !0
    });
  }
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
function Fo(n) {
  const e = q(n.state);
  return {
    current: R(() => e.value.theme || "silver"),
    set: (s) => {
      n.set("theme", s);
    }
  };
}
const Po = (n, e) => {
  const t = fo(n.id ?? "vf"), o = no(), s = e.i18n, l = n.locale ?? e.locale, r = ko(n.id ?? "vf", n.config ?? {}), d = xo();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Co(n.driver);
  return wt({
    // app version
    version: mo,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const v = Fo(r);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: d,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: o,
    // storage
    storage: t,
    // localization object
    i18n: ho(
      t,
      l,
      o,
      s,
      r
    ),
    // modal state
    modal: wo(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: Yn(c),
    // active features
    features: bn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: R(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: R(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? $n : Rt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, Do = ["data-theme"], Mo = { class: "vuefinder__modal-layout__container" }, To = { class: "vuefinder__modal-layout__content" }, Eo = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, Io = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, Ao = { class: "vuefinder__modal-drag-message" }, Me = /* @__PURE__ */ te({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {}
  },
  setup(n) {
    const e = A(null), t = ee();
    t.config;
    const o = n;
    ve(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ve(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const s = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, r) => (u(), h("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[1] || (r[1] = ut((d) => i(t).modal.close(), ["esc"]))
    }, [
      r[2] || (r[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", Mo, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: s,
          onMousedown: r[0] || (r[0] = ae((d) => i(t).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", To, [
              xe(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), h("div", Eo, [
              xe(l.$slots, "buttons")
            ])) : L("", !0)
          ], 512)
        ], 32)
      ]),
      o.showDragOverlay ? (u(), h("div", Io, [
        a("div", Ao, y(o.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : L("", !0)
    ], 40, Do));
  }
}), Cn = /* @__PURE__ */ Symbol("VueFinderModalHeaderSlot"), Fn = /* @__PURE__ */ Symbol("VueFinderModalHeaderActionsSlot"), Oo = {
  key: 1,
  class: "vuefinder__modal-header"
}, zo = { class: "vuefinder__modal-header__content" }, Lo = { class: "vuefinder__modal-header__icon-container" }, Vo = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Bo = {
  key: 0,
  class: "vuefinder__modal-header__actions"
}, Ee = /* @__PURE__ */ te({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    const e = n, t = ee(), o = Je(Cn, null), s = Je(Fn, null), l = R(() => ({
      title: e.title,
      icon: e.icon,
      modal: t.modal,
      app: t
    })), r = R(() => o ? {
      render() {
        return o(l.value);
      }
    } : null), d = R(() => s ? {
      render() {
        return s(l.value);
      }
    } : null);
    return (c, v) => r.value ? (u(), U(ht(r.value), { key: 0 })) : (u(), h("div", Oo, [
      a("div", zo, [
        a("div", Lo, [
          (u(), U(ht(n.icon), { class: "vuefinder__modal-header__icon" }))
        ]),
        a("div", Vo, y(n.title), 1)
      ]),
      d.value ? (u(), h("div", Bo, [
        (u(), U(ht(d.value)))
      ])) : L("", !0)
    ]));
  }
}), Ro = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function Uo(n, e) {
  return u(), h("svg", Ro, [...e[0] || (e[0] = [
    a("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const Pn = { render: Uo }, No = { class: "vuefinder__about-modal__content" }, Ho = { class: "vuefinder__about-modal__main" }, Ko = { class: "vuefinder__about-modal__tab-content" }, jo = { class: "vuefinder__about-modal__lead" }, qo = { class: "vuefinder__about-modal__description" }, Go = { class: "vuefinder__about-modal__links" }, Wo = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, Yo = { class: "vuefinder__about-modal__meta" }, Qo = { class: "vuefinder__about-modal__meta-item" }, Xo = { class: "vuefinder__about-modal__meta-label" }, Jo = { class: "vuefinder__about-modal__meta-value" }, Zo = { class: "vuefinder__about-modal__meta-item" }, es = { class: "vuefinder__about-modal__meta-label" }, Dn = /* @__PURE__ */ te({
  __name: "ModalAbout",
  setup(n) {
    const e = ee(), { t } = e.i18n;
    return (o, s) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: s[0] || (s[0] = (l) => i(e).modal.close())
        }, y(i(t)("Close")), 1)
      ]),
      default: se(() => [
        a("div", No, [
          N(Ee, {
            icon: i(Pn),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Ho, [
            a("div", Ko, [
              a("div", jo, y(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              a("div", qo, y(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              a("div", Go, [
                a("a", Wo, y(i(t)("Project Home")), 1),
                s[1] || (s[1] = a("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              a("div", Yo, [
                a("div", Qo, [
                  a("span", Xo, y(i(t)("Version")), 1),
                  a("span", Jo, y(i(e).version), 1)
                ]),
                a("div", Zo, [
                  a("span", es, y(i(t)("License")), 1),
                  s[2] || (s[2] = a("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ts = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function ns(n, e) {
  return u(), h("svg", ts, [...e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Mn = { render: ns }, os = { class: "vuefinder__delete-modal__content" }, ss = { class: "vuefinder__delete-modal__form" }, is = { class: "vuefinder__delete-modal__description" }, as = { class: "vuefinder__delete-modal__files vf-scrollbar" }, rs = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ls = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ds = { class: "vuefinder__delete-modal__file-name" }, cs = { class: "vuefinder__delete-modal__confirmation" }, us = { class: "vuefinder__delete-modal__confirmation-label" }, vs = { class: "vuefinder__delete-modal__confirmation-text" }, fs = ["disabled"], kt = /* @__PURE__ */ te({
  __name: "ModalDelete",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), r = A(e.modal.data.items), d = A(!1), c = () => {
      r.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        }))
      }).then((v) => {
        t.success(o("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to delete files")));
      });
    };
    return (v, p) => (u(), U(Me, null, {
      buttons: se(() => [
        a("div", cs, [
          a("label", us, [
            fe(a("input", {
              "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [yt, d.value]
            ]),
            a("span", vs, y(i(o)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, y(i(o)("Yes, Delete!")), 9, fs),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Mn),
            title: i(o)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", os, [
            a("div", ss, [
              a("p", is, y(i(o)("Are you sure you want to delete these files?")), 1),
              a("div", as, [
                (u(!0), h(ue, null, pe(r.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", rs, [...p[2] || (p[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", ls, [...p[3] || (p[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  a("span", ds, y(w.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function _s(n, e) {
  return u(), h("svg", ps, [...e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Tn = { render: _s }, hs = { class: "vuefinder__rename-modal__content" }, ms = { class: "vuefinder__rename-modal__item" }, gs = { class: "vuefinder__rename-modal__item-info" }, ws = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ys = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bs = { class: "vuefinder__rename-modal__item-name" }, $t = /* @__PURE__ */ te({
  __name: "ModalRename",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), r = A(e.modal.data.items[0]), d = A(r.value.basename), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((v) => {
        t.success(o("%s is renamed.", d.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to rename")));
      });
    };
    return (v, p) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Rename")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Tn),
            title: i(o)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", hs, [
            a("div", ms, [
              a("p", gs, [
                r.value.type === "dir" ? (u(), h("svg", ws, [...p[2] || (p[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", ys, [...p[3] || (p[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                a("span", bs, y(r.value.basename), 1)
              ]),
              fe(a("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => d.value = w),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: ut(c, ["enter"])
              }, null, 544), [
                [vt, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function ze() {
  const n = ee(), e = R(() => n.features);
  return {
    enabled: (o) => e.value[o] ?? !1
  };
}
const ks = { class: "vuefinder__text-preview" }, $s = { class: "vuefinder__text-preview__header" }, xs = ["title"], Ss = { class: "vuefinder__text-preview__actions" }, Cs = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Fs = { key: 1 }, Ps = /* @__PURE__ */ te({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = A(""), s = A(""), l = A(null), r = A(!1), d = ee(), c = De(d), { enabled: v } = ze(), { t: p } = d.i18n;
    ve(async () => {
      try {
        const $ = await d.adapter.getContent({ path: d.modal.data.item.path });
        o.value = $.content, t("success");
      } catch ($) {
        Pe($, "Failed to load text content"), t("success");
      }
    });
    const w = () => {
      r.value = !r.value, s.value = o.value, d.modal.setEditMode(r.value);
    }, _ = async () => {
      try {
        const $ = d.modal.data.item.path;
        await d.adapter.save({
          path: $,
          content: s.value
        }), o.value = s.value, c.success(p("Updated.")), t("success"), r.value = !r.value;
      } catch ($) {
        c.error(Pe($, p("Failed to save file")));
      }
    };
    return ($, C) => (u(), h("div", ks, [
      a("div", $s, [
        a("div", {
          id: "modal-title",
          class: "vuefinder__text-preview__title",
          title: i(d).modal.data.item.path
        }, y(i(d).modal.data.item.basename), 9, xs),
        a("div", Ss, [
          r.value ? (u(), h("button", {
            key: 0,
            class: "vuefinder__text-preview__save-button",
            onClick: _
          }, y(i(p)("Save")), 1)) : L("", !0),
          i(v)("edit") ? (u(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: C[0] || (C[0] = (x) => w())
          }, y(r.value ? i(p)("Cancel") : i(p)("Edit")), 1)) : L("", !0)
        ])
      ]),
      a("div", null, [
        r.value ? (u(), h("div", Fs, [
          fe(a("textarea", {
            ref_key: "editInput",
            ref: l,
            "onUpdate:modelValue": C[1] || (C[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [vt, s.value]
          ])
        ])) : (u(), h("pre", Cs, y(o.value), 1))
      ])
    ]));
  }
}), Nt = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((o) => {
        e.file(o);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), o = await new Promise((s) => {
        t.readEntries(s);
      });
      for (const s of o)
        await Nt(n, s);
    }
  }
}, me = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function En(n) {
  const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = e.config, r = A({ QUEUE_ENTRY_STATUS: me }), d = A(null), c = A(null), v = A(null), p = A(null), w = A(null), _ = A([]), $ = A(""), C = A(!1), x = A(!1), m = A(null);
  let k;
  const g = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !0;
  }, f = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !0;
  }, b = (I) => {
    I.preventDefault(), I.stopPropagation(), (!I.relatedTarget || I.relatedTarget === document.body) && (x.value = !1);
  }, P = (I) => {
    I.preventDefault(), I.stopPropagation(), x.value = !1;
    const D = /^[/\\](.+)/, F = I.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((z) => {
      if (z.kind === "file") {
        const V = z.webkitGetAsEntry?.();
        if (V)
          Nt((Y, le) => {
            const _e = D.exec(Y?.fullPath || "");
            M(le, _e ? _e[1] : le.name);
          }, V);
        else {
          const Y = z.getAsFile?.();
          Y && M(Y);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((z) => M(z)));
  }, S = (I) => _.value.findIndex((D) => D.id === I), M = (I, D) => k.addFile({ name: D || I.name, type: I.type, data: I, source: "Local" }), T = (I) => I.status === me.DONE ? "text-green-600" : I.status === me.ERROR || I.status === me.CANCELED ? "text-red-600" : "", B = (I) => I.status === me.DONE ? "✓" : I.status === me.ERROR || I.status === me.CANCELED ? "!" : "...", j = () => p.value?.click(), O = () => e.modal.close(), G = (I) => {
    if (C.value || !_.value.filter((D) => D.status !== me.DONE).length) {
      C.value || ($.value = t("Please select file to upload first."));
      return;
    }
    $.value = "", m.value = I || s.value, k.upload();
  }, E = () => {
    k.cancelAll(), _.value.forEach((I) => {
      I.status !== me.DONE && (I.status = me.CANCELED, I.statusName = t("Canceled"));
    }), C.value = !1;
  }, X = (I) => {
    C.value || (k.removeFile(I.id), _.value.splice(S(I.id), 1));
  }, W = (I) => {
    if (!C.value)
      if (k.cancelAll(), I) {
        const D = _.value.filter((F) => F.status !== me.DONE);
        _.value = [], D.forEach((F) => M(F.originalFile, F.name));
      } else
        _.value = [];
  }, J = (I) => {
    I.forEach((D) => {
      M(D);
    });
  };
  return ve(() => {
    k = new io({
      debug: e.debug,
      restrictions: { maxFileSize: go(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (z, V) => {
        if (V[z.id] != null) {
          const le = S(z.id);
          _.value[le]?.status === me.PENDING && ($.value = k.i18n("noDuplicates", { fileName: z.name })), _.value = _.value.filter((_e) => _e.id !== z.id);
        }
        return _.value.push({
          id: z.id,
          name: z.name,
          size: e.filesize(z.size),
          status: me.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: z.data
        }), !0;
      }
    });
    const I = {
      getTargetPath: () => (m.value || s.value).path
    };
    if (n)
      n(k, I);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(k, I);
    else
      throw new Error("No uploader configured");
    k.on("restriction-failed", (z, V) => {
      const Y = _.value[S(z.id)];
      Y && X(Y), $.value = V.message;
    }), k.on("upload-start", (z) => {
      z.forEach((V) => {
        const Y = _.value[S(V.id)];
        Y && (Y.status = me.UPLOADING, Y.statusName = t("Uploading"), Y.percent = "0%");
      });
    }), k.on("upload-progress", (z, V) => {
      const Y = V.bytesTotal ?? 1, le = Math.floor(V.bytesUploaded / Y * 100), _e = S(z.id);
      _e !== -1 && _.value[_e] && (_.value[_e].percent = `${le}%`);
    }), k.on("upload-success", (z) => {
      const V = _.value[S(z.id)];
      V && (V.status = me.DONE, V.statusName = t("Done"));
    }), k.on("upload-error", (z, V) => {
      const Y = _.value[S(z.id)];
      Y && (Y.percent = null, Y.status = me.ERROR, Y.statusName = V?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : V?.message || t("Unknown Error"));
    }), k.on("error", (z) => {
      $.value = z.message, C.value = !1;
    }), k.on("complete", (z) => {
      C.value = !1;
      const V = m.value || s.value;
      e.adapter.invalidateListQuery(V.path), e.adapter.open(V.path);
      const Y = _.value.filter(
        (le) => le.status === me.DONE && z.successful.includes(le.id)
      ).map((le) => le.name);
      e.emitter.emit("vf-upload-complete", Y);
    }), p.value?.addEventListener("click", () => c.value?.click()), w.value?.addEventListener("click", () => v.value?.click());
    const D = { capture: !0 };
    document.addEventListener("dragover", g, D), document.addEventListener("dragenter", f, D), document.addEventListener("dragleave", b, D), document.addEventListener("drop", P, D);
    const F = (z) => {
      const V = z.target, Y = V.files;
      if (Y) {
        for (const le of Y) M(le);
        V.value = "";
      }
    };
    c.value?.addEventListener("change", F), v.value?.addEventListener("change", F);
  }), ke(() => {
    const I = { capture: !0 };
    document.removeEventListener("dragover", g, I), document.removeEventListener("dragenter", f, I), document.removeEventListener("dragleave", b, I), document.removeEventListener("drop", P, I);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: v,
    pickFiles: p,
    pickFolders: w,
    queue: _,
    message: $,
    uploading: C,
    hasFilesInDropArea: x,
    definitions: r,
    openFileSelector: j,
    upload: G,
    cancel: E,
    remove: X,
    clear: W,
    close: O,
    getClassNameForEntry: T,
    getIconForEntry: B,
    addExternalFiles: J
  };
}
const Ds = { class: "vuefinder__image-preview" }, Ms = { class: "vuefinder__image-preview__header" }, Ts = ["title"], Es = { class: "vuefinder__image-preview__actions" }, Is = { class: "vuefinder__image-preview__image-container" }, As = ["src"], Os = /* @__PURE__ */ te({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = De(o), { enabled: l } = ze(), { t: r } = o.i18n, d = A(!1), c = A(
      o.modal.data.item.previewUrl ?? o.adapter.getPreviewUrl({ path: o.modal.data.item.path })
    ), v = A(c.value), { addExternalFiles: p, upload: w, queue: _ } = En(o.customUploader), $ = o.fs, C = q($.path), x = Xe("cropperRef"), m = async () => {
      d.value = !d.value, o.modal.setEditMode(d.value);
    }, k = async () => {
      const f = x.value?.getResult({
        size: { width: 795, height: 341 },
        fillColor: "#ffffff"
      })?.canvas;
      if (!f) return;
      let b = f;
      if (f.width > 1200 || f.height > 1200) {
        const B = Math.min(1200 / f.width, 1200 / f.height), j = document.createElement("canvas");
        j.width = Math.floor(f.width * B), j.height = Math.floor(f.height * B);
        const O = j.getContext("2d");
        O && (O.drawImage(f, 0, 0, j.width, j.height), b = j);
      }
      const P = o.modal.data.item.basename, S = P.split(".").pop()?.toLowerCase() || "jpg", M = S === "png" ? "image/png" : S === "gif" ? "image/gif" : "image/jpeg", T = await new Promise((B) => {
        b.toBlob((j) => B(j), M);
      });
      if (!T) {
        s.error(r("Failed to save image"));
        return;
      }
      try {
        const B = new File([T], P, { type: M }), O = o.modal.data.item.path.split("/");
        O.pop();
        const E = {
          path: O.join("/") || (C.value?.path ?? "")
        };
        p([B]), await new Promise((I) => setTimeout(I, 100));
        const X = _.value.find((I) => I.name === B.name);
        if (!X)
          throw new Error("File was not added to upload queue");
        w(E);
        let W = 0;
        for (; W < 150; ) {
          await new Promise((D) => setTimeout(D, 200));
          const I = _.value.find((D) => D.id === X.id);
          if (I?.status === me.DONE) break;
          if (I?.status === me.ERROR)
            throw new Error(I.statusName || "Upload failed");
          W++;
        }
        s.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const J = o.root?.querySelector?.('[data-src="' + c.value + '"]');
        J && J instanceof HTMLElement && kn.resetStatus(J), o.emitter.emit("vf-refresh-thumbnails"), await m(), t("success");
      } catch (B) {
        s.error(Pe(B, r("Failed to save image")));
      }
    };
    return ve(() => {
      t("success");
    }), (g, f) => (u(), h("div", Ds, [
      a("div", Ms, [
        a("h3", {
          id: "modal-title",
          class: "vuefinder__image-preview__title",
          title: i(o).modal.data.item.path
        }, y(i(o).modal.data.item.basename), 9, Ts),
        a("div", Es, [
          d.value ? (u(), h("button", {
            key: 0,
            class: "vuefinder__image-preview__crop-button",
            onClick: k
          }, y(i(r)("Crop")), 1)) : L("", !0),
          i(l)("edit") ? (u(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: f[0] || (f[0] = (b) => m())
          }, y(d.value ? i(r)("Cancel") : i(r)("Edit")), 1)) : L("", !0)
        ])
      ]),
      a("div", Is, [
        d.value ? (u(), U(i(ao), {
          key: 1,
          ref_key: "cropperRef",
          ref: x,
          class: "h-full w-full",
          crossorigin: "anonymous",
          src: v.value,
          "auto-zoom": !0,
          priority: "image",
          transitions: !0
        }, null, 8, ["src"])) : (u(), h("img", {
          key: 0,
          style: {},
          src: i(o).modal.data.item.previewUrl ?? i(o).adapter.getPreviewUrl({ path: i(o).modal.data.item.path }),
          class: "vuefinder__image-preview__image h-full w-full"
        }, null, 8, As))
      ])
    ]));
  }
}), zs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ls(n, e) {
  return u(), h("svg", zs, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const dt = { render: Ls }, Vs = { class: "vuefinder__default-preview" }, Bs = { class: "vuefinder__default-preview__content" }, Rs = { class: "vuefinder__default-preview__header" }, Us = ["title"], Ns = { class: "vuefinder__default-preview__icon-container" }, Hs = ["title"], Ks = /* @__PURE__ */ te({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e;
    return ve(() => {
      o("success");
    }), (s, l) => (u(), h("div", Vs, [
      a("div", Bs, [
        a("div", Rs, [
          a("h3", {
            id: "modal-title",
            class: "vuefinder__default-preview__title",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Us)
        ]),
        a("div", Ns, [
          N(i(dt), { class: "vuefinder__default-preview__file-icon" }),
          a("div", {
            id: "modal-title",
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Hs)
        ])
      ])
    ]));
  }
}), js = { class: "vuefinder__video-preview" }, qs = ["title"], Gs = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ws = ["src"], Ys = /* @__PURE__ */ te({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ve(() => {
      o("success");
    }), (l, r) => (u(), h("div", js, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__video-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, qs),
      a("div", null, [
        a("video", Gs, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Ws),
          r[0] || (r[0] = ce(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Qs = { class: "vuefinder__audio-preview" }, Xs = ["title"], Js = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Zs = ["src"], ei = /* @__PURE__ */ te({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      t("success");
    }), (l, r) => (u(), h("div", Qs, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__audio-preview__title",
        title: i(o).modal.data.item.path
      }, y(i(o).modal.data.item.basename), 9, Xs),
      a("div", null, [
        a("audio", Js, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Zs),
          r[0] || (r[0] = ce(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), ti = { class: "vuefinder__pdf-preview" }, ni = ["title"], oi = ["data"], si = ["src"], ii = /* @__PURE__ */ te({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ee(), o = e, s = () => {
      const l = ee();
      return l.adapter.getPreviewUrl({ path: l.modal.data.item.path });
    };
    return ve(() => {
      o("success");
    }), (l, r) => (u(), h("div", ti, [
      a("h3", {
        id: "modal-title",
        class: "vuefinder__pdf-preview__title",
        title: i(t).modal.data.item.path
      }, y(i(t).modal.data.item.basename), 9, ni),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, si)
        ], 8, oi)
      ])
    ]));
  }
});
function ai(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const ri = {
  key: 0,
  class: "vuefinder__preview-modal__nav-overlay"
}, li = ["disabled", "title"], di = ["disabled", "title"], ci = { class: "vuefinder__preview-modal__content" }, ui = { key: 0 }, vi = { class: "vuefinder__preview-modal__loading" }, fi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, pi = { class: "vuefinder__preview-modal__details" }, _i = { class: "font-bold" }, hi = { class: "pl-2 font-bold" }, mi = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, gi = ["download", "href"], ft = /* @__PURE__ */ te({
  __name: "ModalPreview",
  setup(n) {
    const e = ee(), { enabled: t } = ze(), { t: o } = e.i18n, s = A(!1), l = (g) => {
      const f = (g || "").split("/").pop() || "", b = f.lastIndexOf(".");
      return b >= 0 ? f.slice(b + 1).toLowerCase() : "";
    }, r = (g, f) => {
      if (!f) return !1;
      const b = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), P = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), S = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), M = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "json",
        "js",
        "ts",
        "css",
        "scss",
        "html",
        "xml",
        "csv",
        "log",
        "yml",
        "yaml"
      ]);
      return g === "image" ? b.has(f) : g === "video" ? P.has(f) : g === "audio" ? S.has(f) : g === "text" ? M.has(f) : g === "application/pdf" ? f === "pdf" : !1;
    }, d = (g) => {
      const f = e.modal.data.item.mime_type;
      if (f && typeof f == "string") return f.startsWith(g);
      const b = l(e.modal.data.item.path);
      return r(g, b);
    }, c = t("preview");
    c || (s.value = !0);
    const v = R(() => e.modal.data.item), p = q(e.fs.sortedFiles), w = R(() => p.value.filter((g) => g.type === "file")), _ = R(
      () => w.value.findIndex((g) => g.path === v.value.path)
    ), $ = R(() => _.value > 0), C = R(() => _.value < w.value.length - 1), x = () => {
      if (e.modal.editMode || !$.value) return;
      const g = w.value[_.value - 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, m = () => {
      if (e.modal.editMode || !C.value) return;
      const g = w.value[_.value + 1];
      g && (e.fs.clearSelection(), e.fs.select(g.path), e.modal.data.item = g);
    }, k = (g) => {
      if (g.key === "Escape") {
        g.preventDefault(), g.stopPropagation(), e.modal.close();
        return;
      }
      (g.key === "ArrowLeft" || g.key === "ArrowRight") && (g.preventDefault(), g.stopPropagation(), g.key === "ArrowLeft" ? x() : m());
    };
    return ve(() => {
      const g = document.querySelector(".vuefinder__preview-modal");
      g && g.focus();
    }), (g, f) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[6] || (f[6] = (b) => i(e).modal.close())
        }, y(i(o)("Close")), 1),
        i(t)("download") ? (u(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: i(e).adapter.getDownloadUrl(i(e).modal.data.item),
          href: i(e).adapter.getDownloadUrl(i(e).modal.data.item)
        }, y(i(o)("Download")), 9, gi)) : L("", !0)
      ]),
      default: se(() => [
        a("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: k
        }, [
          i(e).modal.editMode ? L("", !0) : (u(), h("div", ri, [
            a("button", {
              disabled: !$.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
              title: i(o)("Previous file"),
              onClick: x
            }, [...f[7] || (f[7] = [
              a("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("polyline", { points: "15,18 9,12 15,6" })
              ], -1)
            ])], 8, li),
            a("button", {
              disabled: !C.value,
              class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
              title: i(o)("Next file"),
              onClick: m
            }, [...f[8] || (f[8] = [
              a("svg", {
                class: "vuefinder__preview-modal__nav-icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                a("polyline", { points: "9,18 15,12 9,6" })
              ], -1)
            ])], 8, di)
          ])),
          a("div", ci, [
            i(c) ? (u(), h("div", ui, [
              d("text") ? (u(), U(Ps, {
                key: `text-${v.value.path}`,
                onSuccess: f[0] || (f[0] = (b) => s.value = !0)
              })) : d("image") ? (u(), U(Os, {
                key: `image-${v.value.path}`,
                onSuccess: f[1] || (f[1] = (b) => s.value = !0)
              })) : d("video") ? (u(), U(Ys, {
                key: `video-${v.value.path}`,
                onSuccess: f[2] || (f[2] = (b) => s.value = !0)
              })) : d("audio") ? (u(), U(ei, {
                key: `audio-${v.value.path}`,
                onSuccess: f[3] || (f[3] = (b) => s.value = !0)
              })) : d("application/pdf") ? (u(), U(ii, {
                key: `pdf-${v.value.path}`,
                onSuccess: f[4] || (f[4] = (b) => s.value = !0)
              })) : (u(), U(Ks, {
                key: `default-${v.value.path}`,
                onSuccess: f[5] || (f[5] = (b) => s.value = !0)
              }))
            ])) : L("", !0),
            a("div", vi, [
              s.value === !1 ? (u(), h("div", fi, [
                f[9] || (f[9] = a("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  a("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  a("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                a("span", null, y(i(o)("Loading")), 1)
              ])) : L("", !0)
            ])
          ])
        ], 32),
        a("div", pi, [
          a("div", null, [
            a("span", _i, y(i(o)("File Size")) + ": ", 1),
            ce(y(i(e).filesize(i(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", hi, y(i(o)("Last Modified")) + ": ", 1),
            ce(" " + y(i(ai)(i(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        i(t)("download") ? (u(), h("div", mi, [
          a("span", null, y(i(o)(
            `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
          )), 1)
        ])) : L("", !0)
      ]),
      _: 1
    }));
  }
}), wi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function yi(n, e) {
  return u(), h("svg", wi, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const bi = { render: yi }, ki = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function $i(n, e) {
  return u(), h("svg", ki, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Ht = { render: $i }, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Si(n, e) {
  return u(), h("svg", xi, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Be = { render: Si }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fi(n, e) {
  return u(), h("svg", Ci, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const xt = { render: Fi }, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Di(n, e) {
  return u(), h("svg", Pi, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const St = { render: Di }, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ti(n, e) {
  return u(), h("svg", Mi, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const Kt = { render: Ti }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ii(n, e) {
  return u(), h("svg", Ei, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const jt = { render: Ii }, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Oi(n, e) {
  return u(), h("svg", Ai, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const qt = { render: Oi }, zi = { class: "vuefinder__modal-tree__folder-item" }, Li = { class: "vuefinder__modal-tree__folder-content" }, Vi = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Bi = { class: "vuefinder__modal-tree__folder-text" }, Ri = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Ui = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Ni = 300, Hi = /* @__PURE__ */ te({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {},
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = A({}), r = n, d = e;
    q(s.path);
    const c = R(() => {
      const M = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[M] || !1;
    }), v = R(() => r.modelValue?.path === r.folder.path), p = R(() => r.currentPath?.path === r.folder.path), w = R(() => r.modalTreeData[r.folder.path] || []), _ = R(() => {
      const M = w.value, T = l.value[r.folder.path] || 50;
      return M.length > T ? M.slice(0, T) : M;
    }), $ = R(() => w.value.length), C = R(() => l.value[r.folder.path] || 50), x = R(() => $.value > C.value), m = () => {
      l.value[r.folder.path] = (C.value || 50) + 50;
    }, k = R(() => w.value.length > 0 || r.folder.type === "dir"), g = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, f = () => {
      d("update:modelValue", r.folder);
    }, b = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let P = 0;
    const S = () => {
      const M = Date.now();
      M - P < Ni ? b() : f(), P = M;
    };
    return (M, T) => {
      const B = mn("ModalTreeFolderItem", !0);
      return u(), h("div", zi, [
        a("div", Li, [
          k.value ? (u(), h("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), U(i(St), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), U(i(xt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), h("div", Vi)),
          a("div", {
            class: ne(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": p.value
            }]),
            onClick: f,
            onDblclick: b,
            onTouchend: S
          }, [
            c.value ? (u(), U(i(qt), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), U(i(Be), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            a("span", Bi, y(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && k.value ? (u(), h("div", Ri, [
          (u(!0), h(ue, null, pe(_.value, (j) => (u(), U(B, {
            key: j.path,
            folder: j,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": T[0] || (T[0] = (O) => M.$emit("update:modelValue", O)),
            onSelectAndClose: T[1] || (T[1] = (O) => M.$emit("selectAndClose", O)),
            onToggleFolder: T[2] || (T[2] = (O, G) => M.$emit("toggleFolder", O, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          x.value ? (u(), h("div", Ui, [
            a("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(i(o)("load more")), 1)
          ])) : L("", !0)
        ])) : L("", !0)
      ]);
    };
  }
}), Ki = { class: "vuefinder__modal-tree" }, ji = { class: "vuefinder__modal-tree__header" }, qi = { class: "vuefinder__modal-tree__title" }, Gi = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Wi = { class: "vuefinder__modal-tree__section-title" }, Yi = { class: "vuefinder__modal-tree__list" }, Qi = ["onClick", "onDblclick", "onTouchend"], Xi = { class: "vuefinder__modal-tree__text" }, Ji = { class: "vuefinder__modal-tree__text-storage" }, Zi = { class: "vuefinder__modal-tree__section-title" }, ea = { class: "vuefinder__modal-tree__list" }, ta = { class: "vuefinder__modal-tree__storage-item" }, na = { class: "vuefinder__modal-tree__storage-content" }, oa = ["onClick"], sa = ["onClick", "onDblclick", "onTouchend"], ia = { class: "vuefinder__modal-tree__storage-text" }, aa = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ra = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, la = ["onClick"], dn = 300, Gt = /* @__PURE__ */ te({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ee(), { t: o } = t.i18n, s = t.fs, l = t.config, r = e, d = q(s.sortedFiles), c = q(s.storages), v = R(() => c.value || []), p = q(s.path), w = A(null), _ = A({}), $ = A({}), C = A({});
    ie(d, (E) => {
      const X = E.filter((J) => J.type === "dir"), W = p.value?.path || "";
      W && ($.value[W] = X.map((J) => ({
        ...J,
        type: "dir"
      })));
    });
    const x = (E, X) => {
      const W = `${E}:${X}`;
      _.value = {
        ..._.value,
        [W]: !_.value[W]
      }, _.value[W] && !$.value[X] && t.adapter.list(X).then((J) => {
        const D = (J.files || []).filter((F) => F.type === "dir");
        $.value[X] = D.map((F) => ({
          ...F,
          type: "dir"
        }));
      });
    }, m = (E) => $.value[E] || [], k = (E) => C.value[E] || 50, g = (E) => {
      const X = m(E), W = k(E);
      return X.length > W ? X.slice(0, W) : X;
    }, f = (E) => m(E).length, b = (E) => f(E) > k(E), P = (E) => {
      C.value[E] = k(E) + 50;
    }, S = (E) => {
      E && r("update:modelValue", E);
    }, M = (E) => {
      E && (r("update:modelValue", E), r("selectAndClose", E));
    }, T = (E) => {
      const X = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      r("update:modelValue", X);
    }, B = (E) => {
      const X = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      r("update:modelValue", X), r("selectAndClose", X);
    };
    let j = 0;
    const O = (E) => {
      if (!E) return;
      const X = Date.now();
      X - j < dn ? M(E) : S(E), j = X;
    }, G = (E) => {
      const X = Date.now();
      X - j < dn ? B(E) : T(E), j = X;
    };
    return ve(() => {
      w.value && it(w.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (E, X) => (u(), h("div", Ki, [
      a("div", ji, [
        a("div", qi, y(i(o)("Select Target Folder")), 1)
      ]),
      a("div", {
        ref_key: "modalContentElement",
        ref: w,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && i(t).features.pinned && i(l).get("pinnedFolders").length ? (u(), h("div", Gi, [
          a("div", Wi, y(i(o)("Pinned Folders")), 1),
          a("div", Yi, [
            (u(!0), h(ue, null, pe(i(l).get("pinnedFolders"), (W) => (u(), h("div", {
              key: W.path,
              class: ne(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === W.path }]),
              onClick: (J) => S(W),
              onDblclick: (J) => M(W),
              onTouchend: (J) => O(W)
            }, [
              N(i(Be), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              a("div", Xi, y(W.basename), 1),
              a("div", Ji, y(W.storage), 1),
              N(i(Kt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Qi))), 128))
          ])
        ])) : L("", !0),
        a("div", Zi, y(i(o)("Storages")), 1),
        (u(!0), h(ue, null, pe(v.value, (W) => (u(), h("div", {
          key: W,
          class: "vuefinder__modal-tree__section"
        }, [
          a("div", ea, [
            a("div", ta, [
              a("div", na, [
                a("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: ae((J) => x(W, W + "://"), ["stop"])
                }, [
                  _.value[`${W}:${W}://`] ? (u(), U(i(St), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), U(i(xt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, oa),
                a("div", {
                  class: ne(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === W + "://"
                  }]),
                  onClick: (J) => T(W),
                  onDblclick: (J) => B(W),
                  onTouchend: (J) => G(W)
                }, [
                  N(i(jt), { class: "vuefinder__modal-tree__storage-icon" }),
                  a("span", ia, y(W), 1)
                ], 42, sa)
              ]),
              _.value[`${W}:${W}://`] ? (u(), h("div", aa, [
                (u(!0), h(ue, null, pe(g(W + "://"), (J) => (u(), U(Hi, {
                  key: J.path,
                  folder: J,
                  storage: W,
                  "model-value": n.modelValue,
                  "expanded-folders": _.value,
                  "modal-tree-data": $.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: M,
                  onToggleFolder: x
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                b(W + "://") ? (u(), h("div", ra, [
                  a("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (J) => P(W + "://")
                  }, y(i(o)("load more")), 9, la)
                ])) : L("", !0)
              ])) : L("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), da = ["title"], zt = /* @__PURE__ */ te({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, o = ee(), { t: s } = o.i18n, l = A(!1), r = A(null), d = A(r.value?.innerHTML);
    ie(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (v, p) => (u(), h("div", null, [
      l.value ? L("", !0) : (u(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: ne(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        xe(v.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          title: i(s)("Close"),
          onClick: c
        }, [...p[0] || (p[0] = [
          a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, da)
      ], 2))
    ]));
  }
}), ca = { class: "vuefinder__move-modal__content" }, ua = { class: "vuefinder__move-modal__description" }, va = { class: "vuefinder__move-modal__files vf-scrollbar" }, fa = { class: "vuefinder__move-modal__file-name" }, pa = { class: "vuefinder__move-modal__target-title" }, _a = { class: "vuefinder__move-modal__target-container" }, ha = { class: "vuefinder__move-modal__target-path" }, ma = { class: "vuefinder__move-modal__target-storage" }, ga = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, wa = { class: "vuefinder__move-modal__target-badge" }, ya = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ba = { class: "vuefinder__move-modal__checkbox-label" }, ka = { class: "vuefinder__move-modal__checkbox-text" }, $a = ["disabled"], xa = { class: "vuefinder__move-modal__selected-items" }, In = /* @__PURE__ */ te({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ee(), t = De(e), { enabled: o } = ze(), { t: s } = e.i18n, l = n, r = A(e.modal.data.items.from), d = A(e.modal.data.items.to), c = A(""), v = A(l.copy || !o("move")), p = R(() => v.value ? "copy" : "move"), w = A(!1), _ = q(e.fs.path), $ = R(() => v.value ? s("Copy files") : s("Move files")), C = R(
      () => v.value ? s("Are you sure you want to copy these files?") : s("Are you sure you want to move these files?")
    ), x = R(() => v.value ? s("Yes, Copy!") : s("Yes, Move!"));
    R(() => v.value ? s("Files copied.") : s("Files moved."));
    const m = (S) => {
      S && (d.value = S);
    }, k = (S) => {
      S && (d.value = S, w.value = !1);
    }, g = R(() => {
      const S = d.value;
      return S ? r.value.some((M) => !!(S.path === M.path || M.path.startsWith(S.path + "/") || M.type === "dir" && S.path.startsWith(M.path + "/"))) : !0;
    }), f = R(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? r.value.find((T) => S.path === T.path || T.path.startsWith(S.path + "/") || T.type === "dir" && S.path.startsWith(T.path + "/")) ? s("Cannot move/copy item to itself or its parent/child directory") : s("Invalid destination directory") : s("Please select a destination directory");
    }), b = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const M = S.split("://");
      return {
        storage: M[0] || "local",
        path: M[1] || ""
      };
    }, P = async () => {
      if (r.value.length)
        try {
          const { files: S } = await e.adapter[p.value]({
            path: _.value.path,
            sources: r.value.map(({ path: M }) => M),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Pe(S, s("Failed to transfer files")));
        }
    };
    return (S, M) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: P
        }, y(x.value), 9, $a),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: M[4] || (M[4] = (T) => i(e).modal.close())
        }, y(i(s)("Cancel")), 1),
        a("div", xa, y(i(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: v.value ? i(Ht) : i(bi),
            title: $.value
          }, null, 8, ["icon", "title"]),
          a("div", ca, [
            a("p", ua, y(C.value), 1),
            a("div", va, [
              (u(!0), h(ue, null, pe(r.value, (T) => (u(), h("div", {
                key: T.path,
                class: "vuefinder__move-modal__file"
              }, [
                a("div", null, [
                  T.type === "dir" ? (u(), U(i(Be), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), U(i(dt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                a("div", fa, y(T.path), 1)
              ]))), 128))
            ]),
            a("h4", pa, y(i(s)("Target Directory")), 1),
            a("div", _a, [
              a("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: M[0] || (M[0] = (T) => w.value = !w.value)
              }, [
                a("div", ha, [
                  a("span", ma, y(b().storage) + "://", 1),
                  b().path ? (u(), h("span", ga, y(b().path), 1)) : L("", !0)
                ]),
                a("span", wa, y(i(s)("Browse")), 1)
              ])
            ]),
            a("div", {
              class: ne([
                "vuefinder__move-modal__tree-selector",
                w.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              N(Gt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  M[1] || (M[1] = (T) => d.value = T),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: k
              }, null, 8, ["modelValue"])
            ], 2),
            i(o)("copy") && i(o)("move") ? (u(), h("div", ya, [
              a("label", ba, [
                fe(a("input", {
                  "onUpdate:modelValue": M[2] || (M[2] = (T) => v.value = T),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [yt, v.value]
                ]),
                a("span", ka, y(i(s)("Create a copy instead of moving")), 1)
              ])
            ])) : L("", !0),
            f.value ? (u(), U(zt, {
              key: 1,
              error: ""
            }, {
              default: se(() => [
                ce(y(f.value), 1)
              ]),
              _: 1
            })) : L("", !0),
            c.value.length && !f.value ? (u(), U(zt, {
              key: 2,
              error: "",
              onHidden: M[3] || (M[3] = (T) => c.value = "")
            }, {
              default: se(() => [
                ce(y(c.value), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), et = /* @__PURE__ */ te({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), U(In, { copy: !1 }));
  }
}), Wt = /* @__PURE__ */ te({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), U(In, { copy: !0 }));
  }
}), Sa = (n, e = 0, t = !1) => {
  let o;
  return (...s) => {
    t && !o && n(...s), clearTimeout(o), o = setTimeout(() => {
      n(...s);
    }, e);
  };
}, An = (n, e, t) => {
  const o = A(n);
  return Qn((s, l) => ({
    get() {
      return s(), o.value;
    },
    set: Sa(
      (r) => {
        o.value = r, l();
      },
      e,
      !1
    )
  }));
}, Ca = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fa(n, e) {
  return u(), h("svg", Ca, [...e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const Yt = { render: Fa }, Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Da(n, e) {
  return u(), h("svg", Pa, [...e[0] || (e[0] = [
    a("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    a("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Ct = { render: Da }, Ma = { class: "vuefinder__search-modal__search-input" }, Ta = ["value", "placeholder", "disabled"], Ea = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, Ia = /* @__PURE__ */ te({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = t, s = ee(), { t: l } = s.i18n, r = A(null), d = (v) => {
      const p = v.target;
      o("update:modelValue", p.value);
    }, c = (v) => {
      o("keydown", v);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (v, p) => (u(), h("div", Ma, [
      N(i(Yt), { class: "vuefinder__search-modal__search-icon" }),
      a("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: i(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: p[0] || (p[0] = ae(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, Ta),
      n.isSearching ? (u(), h("div", Ea, [
        N(i(Ct), { class: "vuefinder__search-modal__loading-icon" })
      ])) : L("", !0)
    ]));
  }
}), Aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Oa(n, e) {
  return u(), h("svg", Aa, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const On = { render: Oa }, za = ["disabled", "title"], La = ["data-theme"], Va = { class: "vuefinder__search-modal__dropdown-content" }, Ba = { class: "vuefinder__search-modal__dropdown-section" }, Ra = { class: "vuefinder__search-modal__dropdown-title" }, Ua = { class: "vuefinder__search-modal__dropdown-options" }, Na = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ha = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ka = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, ja = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, qa = /* @__PURE__ */ te({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = ee(), { t: r } = l.i18n, d = A(null), c = A(null);
    let v = null;
    const p = (x) => {
      if (s("update:selectedOption", x), x.startsWith("size-")) {
        const m = x.split("-")[1];
        s("update:sizeFilter", m);
      }
    }, w = async () => {
      o.disabled || (o.visible ? (s("update:visible", !1), v && (v(), v = null)) : (s("update:visible", !0), await Ve(), await _()));
    }, _ = async () => {
      if (!(!d.value || !c.value) && (await Ve(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x, y: m } = await Ze(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [at(8), rt({ padding: 16 }), lt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${x}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (x) {
          console.warn("Floating UI initial positioning error:", x);
          return;
        }
        try {
          v = Vt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x, y: m } = await Ze(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [at(8), rt({ padding: 16 }), lt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${x}px`,
                  top: `${m}px`
                });
              } catch (x) {
                console.warn("Floating UI positioning error:", x);
              }
          });
        } catch (x) {
          console.warn("Floating UI autoUpdate setup error:", x), v = null;
        }
      }
    }, $ = (x) => {
      if (!o.visible) return;
      const m = ["size-all", "size-small", "size-medium", "size-large"], k = m.findIndex((g) => g === o.selectedOption);
      if (x.key === "ArrowDown") {
        x.preventDefault();
        const g = (k + 1) % m.length;
        s("update:selectedOption", m[g] || null);
      } else if (x.key === "ArrowUp") {
        x.preventDefault();
        const g = k <= 0 ? m.length - 1 : k - 1;
        s("update:selectedOption", m[g] || null);
      } else x.key === "Enter" ? (x.preventDefault(), o.selectedOption?.startsWith("size-") && s(
        "update:sizeFilter",
        o.selectedOption.split("-")[1]
      )) : x.key === "Escape" && (x.preventDefault(), s("update:visible", !1), v && (v(), v = null));
    }, C = () => {
      v && (v(), v = null);
    };
    return ie(
      () => o.visible,
      (x) => {
        !x && v && (v(), v = null);
      }
    ), ke(() => {
      C();
    }), e({
      cleanup: C
    }), (x, m) => (u(), h(ue, null, [
      a("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ne(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: i(r)("Search Options"),
        onClick: ae(w, ["stop"])
      }, [
        N(i(On), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, za),
      (u(), U(bt, { to: "body" }, [
        n.visible ? (u(), h("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(l).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = ae(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          a("div", Va, [
            a("div", Ba, [
              a("div", Ra, y(i(r)("File Size")), 1),
              a("div", Ua, [
                a("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = ae((k) => p("size-all"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), h("div", Na, [...m[5] || (m[5] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                a("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = ae((k) => p("size-small"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), h("div", Ha, [...m[6] || (m[6] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                a("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = ae((k) => p("size-medium"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), h("div", Ka, [...m[7] || (m[7] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2),
                a("div", {
                  class: ne(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = ae((k) => p("size-large"), ["stop"]))
                }, [
                  a("span", null, y(i(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), h("div", ja, [...m[8] || (m[8] = [
                    a("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      a("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : L("", !0)
                ], 2)
              ])
            ])
          ])
        ], 40, La)) : L("", !0)
      ]))
    ], 64));
  }
});
function zn(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const o = t[1], s = t[2] ?? "", l = s.split("/").filter(Boolean), r = l.pop();
  if (!r) return o + s;
  let d = `${o}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (d.length <= e) return d;
  const c = r.split(/\.(?=[^\.]+$)/), v = c[0] ?? "", p = c[1] ?? "", w = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, _ = p ? `${w}.${p}` : w;
  return d = `${o}${l.join("/")}${l.length ? "/" : ""}${_}`, d.length > e && (d = `${o}.../${_}`), d;
}
async function Ln(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function ct(n) {
  await Ln(n);
}
async function Ga(n) {
  await Ln(n);
}
const Wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Ya(n, e) {
  return u(), h("svg", Wa, [...e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const Vn = { render: Ya }, Qa = ["title"], Xa = { class: "vuefinder__search-modal__result-icon" }, Ja = { class: "vuefinder__search-modal__result-content" }, Za = { class: "vuefinder__search-modal__result-name" }, er = {
  key: 0,
  class: "vuefinder__search-modal__result-size"
}, tr = ["title"], nr = ["title"], or = ["data-item-dropdown", "data-theme"], sr = { class: "vuefinder__search-modal__item-dropdown-content" }, ir = /* @__PURE__ */ te({
  name: "SearchResultItem",
  __name: "SearchResultItem",
  props: {
    item: {},
    index: {},
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {}
  },
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = ee(), { t: l } = s.i18n, r = A(null);
    let d = null, c = null, v = [], p = null;
    ie(
      () => t.activeDropdown,
      (M) => {
        d && (d(), d = null), c && (v.forEach((T) => {
          T === window ? window.removeEventListener("scroll", c, !0) : T.removeEventListener("scroll", c, !0);
        }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null), M === t.item.path && r.value && Ve(() => {
          k(t.item.path, r.value), _(), $();
        });
      }
    );
    const w = (M) => {
      const T = [];
      let B = M;
      for (; B && B !== document.body && B !== document.documentElement; ) {
        const j = window.getComputedStyle(B), O = j.overflow + j.overflowX + j.overflowY;
        (O.includes("scroll") || O.includes("auto")) && T.push(B), B = B.parentElement;
      }
      return T;
    }, _ = () => {
      if (t.activeDropdown !== t.item.path) return;
      const M = w(r.value);
      v = [window, ...M], c = () => {
        t.activeDropdown === t.item.path && o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const T = c;
      T && v.forEach((B) => {
        B === window ? window.addEventListener("scroll", T, !0) : B.addEventListener("scroll", T, !0);
      });
    }, $ = () => {
      t.activeDropdown === t.item.path && (p = (M) => {
        if (t.activeDropdown !== t.item.path) return;
        const T = M.target;
        if (!T) return;
        const B = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (B && B.contains(T) || r.value && r.value.contains(T))
          return;
        const j = s.root;
        if (j && j.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const O = document.querySelector(".vuefinder__modal-layout");
        if (O && O.contains(T)) {
          o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        o("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        p && (document.addEventListener("mousedown", p, !0), document.addEventListener("touchstart", p, !0));
      }, 100));
    };
    ke(() => {
      d && (d(), d = null), c && (v.forEach((M) => {
        M === window ? window.removeEventListener("scroll", c, !0) : M.removeEventListener("scroll", c, !0);
      }), c = null, v = []), p && (document.removeEventListener("mousedown", p, !0), document.removeEventListener("touchstart", p, !0), p = null);
    });
    const C = (M) => t.expandedPaths.has(M), x = (M) => M.type === "dir" || !M.file_size ? "" : Rt(M.file_size), m = (M, T) => {
      T.stopPropagation(), o("toggleItemDropdown", M, T);
    }, k = async (M, T) => {
      const B = document.querySelector(
        `[data-item-dropdown="${M}"]`
      );
      if (!(!B || !T) && (await Ve(), !(!B || !T))) {
        Object.assign(B.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: j, y: O } = await Ze(T, B, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [at(8), rt({ padding: 16 }), lt({ padding: 16 })]
          });
          Object.assign(B.style, {
            left: `${j}px`,
            top: `${O}px`
          }), requestAnimationFrame(() => {
            B && Object.assign(B.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (j) {
          console.warn("Floating UI initial positioning error:", j);
          return;
        }
        try {
          d = Vt(T, B, async () => {
            if (!(!T || !B))
              try {
                const { x: j, y: O } = await Ze(T, B, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [at(8), rt({ padding: 16 }), lt({ padding: 16 })]
                });
                Object.assign(B.style, {
                  left: `${j}px`,
                  top: `${O}px`
                });
              } catch (j) {
                console.warn("Floating UI positioning error:", j);
              }
          });
        } catch (j) {
          console.warn("Floating UI autoUpdate setup error:", j), d = null;
        }
      }
    }, g = (M) => {
      o("update:selectedItemDropdownOption", M);
    }, f = async (M) => {
      await ct(M.path), o("copyPath", M);
    }, b = (M) => {
      o("openContainingFolder", M);
    }, P = (M) => {
      o("preview", M);
    }, S = (M) => {
      if (!t.activeDropdown) return;
      const T = ["copy-path", "open-folder", "preview"], B = t.selectedItemDropdownOption, j = T.findIndex((O) => B?.includes(O));
      if (M.key === "ArrowDown") {
        M.preventDefault();
        const O = (j + 1) % T.length;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else if (M.key === "ArrowUp") {
        M.preventDefault();
        const O = j <= 0 ? T.length - 1 : j - 1;
        o(
          "update:selectedItemDropdownOption",
          `${T[O] || ""}-${t.activeDropdown}`
        );
      } else M.key === "Enter" ? (M.preventDefault(), B && (B.includes("copy-path") ? f(t.item) : B.includes("open-folder") ? b(t.item) : B.includes("preview") && P(t.item))) : M.key === "Escape" && (M.preventDefault(), o("update:selectedItemDropdownOption", null));
    };
    return (M, T) => (u(), h("div", {
      class: ne(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: T[9] || (T[9] = (B) => o("select", n.index))
    }, [
      a("div", Xa, [
        n.item.type === "dir" ? (u(), U(i(Be), { key: 0 })) : (u(), U(i(dt), { key: 1 }))
      ]),
      a("div", Ja, [
        a("div", Za, [
          ce(y(n.item.basename) + " ", 1),
          x(n.item) ? (u(), h("span", er, y(x(n.item)), 1)) : L("", !0)
        ]),
        a("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: T[0] || (T[0] = ae((B) => {
            o("select", n.index), o("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(C(n.item.path) ? n.item.path : i(zn)(n.item.path)), 9, tr)
      ]),
      a("button", {
        ref_key: "buttonElementRef",
        ref: r,
        class: "vuefinder__search-modal__result-actions",
        title: i(l)("More actions"),
        onClick: T[1] || (T[1] = (B) => {
          o("selectWithDropdown", n.index), m(n.item.path, B);
        })
      }, [
        N(i(Vn), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, nr),
      (u(), U(bt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), h("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(s).theme.current,
          tabindex: "-1",
          onClick: T[8] || (T[8] = ae(() => {
          }, ["stop"])),
          onKeydown: S
        }, [
          a("div", sr, [
            a("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: T[2] || (T[2] = (B) => {
                g(`copy-path-${n.item.path}`), f(n.item);
              }),
              onFocus: T[3] || (T[3] = (B) => g(`copy-path-${n.item.path}`))
            }, [
              N(i(Ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Copy Path")), 1)
            ], 34),
            a("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: T[4] || (T[4] = (B) => {
                g(`open-folder-${n.item.path}`), b(n.item);
              }),
              onFocus: T[5] || (T[5] = (B) => g(`open-folder-${n.item.path}`))
            }, [
              N(i(Be), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Open Containing Folder")), 1)
            ], 34),
            a("div", {
              class: ne(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: T[6] || (T[6] = (B) => {
                g(`preview-${n.item.path}`), P(n.item);
              }),
              onFocus: T[7] || (T[7] = (B) => g(`preview-${n.item.path}`))
            }, [
              N(i(dt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              a("span", null, y(i(l)("Preview")), 1)
            ], 34)
          ])
        ], 40, or)) : L("", !0)
      ]))
    ], 10, Qa));
  }
}), ar = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, rr = { class: "vuefinder__search-modal__loading-icon" }, lr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, dr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, cr = { class: "vuefinder__search-modal__results-header" }, Ge = 60, cn = 5, ur = /* @__PURE__ */ te({
  name: "SearchResultsList",
  __name: "SearchResultsList",
  props: {
    searchResults: {},
    isSearching: { type: Boolean },
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {},
    resultsEnter: { type: Boolean }
  },
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "preview"],
  setup(n, { expose: e, emit: t }) {
    const o = n, s = t, l = ee(), { t: r } = l.i18n, d = Xe("scrollableContainer"), c = R(() => o.searchResults.length > 0), v = R(() => o.searchResults.length), p = A(0), w = A(600), _ = R(() => o.searchResults.length * Ge), $ = R(() => {
      const f = Math.max(0, Math.floor(p.value / Ge) - cn), b = Math.min(
        o.searchResults.length,
        Math.ceil((p.value + w.value) / Ge) + cn
      );
      return { start: f, end: b };
    }), C = R(() => {
      const { start: f, end: b } = $.value;
      return o.searchResults.slice(f, b).map((P, S) => ({
        item: P,
        index: f + S,
        top: (f + S) * Ge
      }));
    }), x = (f) => {
      const b = f.target;
      p.value = b.scrollTop;
    }, m = () => {
      d.value && (w.value = d.value.clientHeight);
    }, k = () => {
      if (o.selectedIndex >= 0 && d.value) {
        const f = o.selectedIndex * Ge, b = f + Ge, P = d.value.scrollTop, S = d.value.clientHeight, M = P + S;
        let T = P;
        f < P ? T = f : b > M && (T = b - S), T !== P && d.value.scrollTo({
          top: T,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, p.value = 0);
    };
    return ve(() => {
      m(), window.addEventListener("resize", m);
    }), ke(() => {
      window.removeEventListener("resize", m);
    }), ie(
      () => d.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: k,
      resetScroll: g,
      getContainerHeight: () => w.value,
      scrollTop: () => p.value
    }), (f, b) => (u(), h("div", {
      class: ne(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), h("div", ar, [
        a("div", rr, [
          N(i(Ct), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        a("span", null, y(i(r)("Searching...")), 1)
      ])) : c.value ? (u(), h("div", dr, [
        a("div", cr, [
          a("span", null, y(i(r)("Found %s results", v.value)), 1)
        ]),
        a("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: x
        }, [
          a("div", {
            class: "vuefinder__search-modal__results-items",
            style: Oe({ height: `${_.value}px`, position: "relative" })
          }, [
            (u(!0), h(ue, null, pe(C.value, (P) => (u(), h("div", {
              key: P.item.path,
              style: Oe({
                position: "absolute",
                top: `${P.top}px`,
                left: "0",
                width: "100%",
                height: `${Ge}px`
              })
            }, [
              N(ir, {
                item: P.item,
                index: P.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: b[0] || (b[0] = (S) => s("selectResultItem", S)),
                onSelectWithDropdown: b[1] || (b[1] = (S) => s("selectResultItemWithDropdown", S)),
                onTogglePathExpansion: b[2] || (b[2] = (S) => s("togglePathExpansion", S)),
                onToggleItemDropdown: b[3] || (b[3] = (S, M) => s("toggleItemDropdown", S, M)),
                "onUpdate:selectedItemDropdownOption": b[4] || (b[4] = (S) => s("update:selectedItemDropdownOption", S)),
                onCopyPath: b[5] || (b[5] = (S) => s("copyPath", S)),
                onOpenContainingFolder: b[6] || (b[6] = (S) => s("openContainingFolder", S)),
                onPreview: b[7] || (b[7] = (S) => s("preview", S))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), h("div", lr, [
        a("span", null, y(i(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), vr = { class: "vuefinder__search-modal" }, fr = { class: "vuefinder__search-modal__content" }, pr = { class: "vuefinder__search-modal__search-bar" }, _r = { class: "vuefinder__search-modal__search-location" }, hr = ["title"], mr = ["disabled"], gr = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, wr = { class: "vuefinder__search-modal__folder-selector-content" }, yr = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, br = { class: "vuefinder__search-modal__instructions-text" }, Qt = /* @__PURE__ */ te({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = A(null), r = A(null), d = A(null), c = An("", 300), v = A([]), p = A(!1), w = A(-1), _ = A(!1), $ = A(!1), C = A(null), x = A("all"), m = A(!1), k = A(`size-${x.value}`), g = A(null), f = A(/* @__PURE__ */ new Set()), b = A(null), P = q(s.path), S = (F) => {
      f.value.has(F) ? f.value.delete(F) : f.value.add(F);
    }, M = (F, z) => {
      z && typeof z.stopPropagation == "function" && z.stopPropagation(), b.value === F ? b.value = null : b.value = F;
    }, T = () => {
      b.value = null;
    }, B = (F) => {
      try {
        const z = F.dir || `${F.storage}://`;
        e.adapter.open(z), e.modal.close(), T();
      } catch {
        t.error(o("Failed to open containing folder"));
      }
    }, j = (F) => {
      e.modal.open(ft, {
        storage: P?.value?.storage ?? "local",
        item: F
      }), T();
    }, O = (F) => {
      w.value = F, T();
    }, G = (F) => {
      w.value = F;
    }, E = async (F) => {
      await ct(F.path), T();
    };
    ie(c, async (F) => {
      F.trim() ? (await X(F.trim()), w.value = 0) : (v.value = [], p.value = !1, w.value = -1);
    }), ie(x, async (F) => {
      k.value = `size-${F}`, c.value.trim() && !$.value && (await X(c.value.trim()), w.value = 0);
    }), ie(m, async () => {
      c.value.trim() && !$.value && (await X(c.value.trim()), w.value = 0);
    });
    const X = async (F) => {
      if (F) {
        p.value = !0;
        try {
          const z = C.value?.path || P?.value?.path, V = await e.adapter.search({
            path: z,
            filter: F,
            deep: m.value,
            size: x.value
          });
          v.value = V || [], p.value = !1;
        } catch (z) {
          t.error(Pe(z, o("Search failed"))), v.value = [], p.value = !1;
        }
      }
    };
    ve(() => {
      document.addEventListener("click", D), k.value = `size-${x.value}`;
    });
    const W = () => {
      $.value ? ($.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0)) : (_.value = !1, $.value = !0);
    }, J = (F) => {
      F && (C.value = F);
    }, I = (F) => {
      F && (J(F), $.value = !1, c.value.trim() && (X(c.value.trim()), w.value = 0));
    };
    ke(() => {
      document.removeEventListener("click", D), r.value && r.value.cleanup();
    });
    const D = (F) => {
      const z = F.target;
      if (_.value && (z.closest(".vuefinder__search-modal__dropdown") || (_.value = !1, Ve(() => {
        l.value && l.value.focus();
      }))), b.value) {
        const V = z.closest(".vuefinder__search-modal__item-dropdown"), Y = z.closest(".vuefinder__search-modal__result-item");
        !V && !Y && T();
      }
    };
    return (F, z) => (u(), U(Me, { class: "vuefinder__search-modal-layout" }, {
      default: se(() => [
        a("div", vr, [
          N(Ee, {
            icon: i(Yt),
            title: i(o)("Search files")
          }, null, 8, ["icon", "title"]),
          a("div", fr, [
            a("div", pr, [
              N(Ia, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: i(c),
                "onUpdate:modelValue": z[0] || (z[0] = (V) => Xn(c) ? c.value = V : null),
                "is-searching": p.value,
                disabled: $.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              N(qa, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: _.value,
                "onUpdate:visible": z[1] || (z[1] = (V) => _.value = V),
                "size-filter": x.value,
                "onUpdate:sizeFilter": z[2] || (z[2] = (V) => x.value = V),
                "selected-option": k.value,
                "onUpdate:selectedOption": z[3] || (z[3] = (V) => k.value = V),
                disabled: $.value
              }, null, 8, ["visible", "size-filter", "selected-option", "disabled"])
            ]),
            a("div", {
              class: "vuefinder__search-modal__options",
              onClick: z[7] || (z[7] = ae(() => {
              }, ["stop"]))
            }, [
              a("div", _r, [
                a("button", {
                  class: ne(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": $.value }]),
                  onClick: ae(W, ["stop"])
                }, [
                  N(i(Be), { class: "vuefinder__search-modal__location-icon" }),
                  a("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: C.value?.path || i(P).path
                  }, y(i(zn)(C.value?.path || i(P).path)), 9, hr),
                  z[10] || (z[10] = a("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    a("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              a("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: z[6] || (z[6] = ae(() => {
                }, ["stop"]))
              }, [
                fe(a("input", {
                  "onUpdate:modelValue": z[4] || (z[4] = (V) => m.value = V),
                  type: "checkbox",
                  disabled: $.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: z[5] || (z[5] = ae(() => {
                  }, ["stop"]))
                }, null, 8, mr), [
                  [yt, m.value]
                ]),
                a("span", null, y(i(o)("Include subfolders")), 1)
              ])
            ]),
            $.value ? (u(), h("div", gr, [
              a("div", wr, [
                N(Gt, {
                  modelValue: C.value,
                  "onUpdate:modelValue": [
                    z[8] || (z[8] = (V) => C.value = V),
                    J
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(P),
                  onSelectAndClose: I
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : L("", !0),
            !i(c).trim() && !$.value ? (u(), h("div", yr, [
              a("p", br, y(i(o)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : L("", !0),
            i(c).trim() && !$.value ? (u(), U(ur, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": v.value,
              "is-searching": p.value,
              "selected-index": w.value,
              "expanded-paths": f.value,
              "active-dropdown": b.value,
              "selected-item-dropdown-option": g.value,
              "results-enter": !0,
              onSelectResultItem: O,
              onSelectResultItemWithDropdown: G,
              onTogglePathExpansion: S,
              onToggleItemDropdown: M,
              "onUpdate:selectedItemDropdownOption": z[9] || (z[9] = (V) => g.value = V),
              onCopyPath: E,
              onOpenContainingFolder: B,
              onPreview: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : L("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), kr = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const o = ee(), s = A(!1), { t: l } = o.i18n;
    let r = null;
    const d = () => {
      r && clearTimeout(r), s.value = !0, r = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return ve(() => {
      o.emitter.on(n.on, d);
    }), ke(() => {
      r && clearTimeout(r);
    }), {
      shown: s,
      t: l
    };
  }
}, $r = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [o, s] of e)
    t[o] = s;
  return t;
}, xr = { key: 1 };
function Sr(n, e, t, o, s, l) {
  return u(), h("div", {
    class: ne(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    n.$slots.default ? xe(n.$slots, "default", { key: 0 }) : (u(), h("span", xr, y(o.t("Saved.")), 1))
  ], 2);
}
const un = /* @__PURE__ */ $r(kr, [["render", Sr]]), Cr = [
  { name: "silver", displayName: "Silver" },
  { name: "valorite", displayName: "Valorite" },
  { name: "midnight", displayName: "Midnight" },
  { name: "latte", displayName: "Latte" },
  { name: "rose", displayName: "Rose" },
  { name: "mythril", displayName: "Mythril" },
  { name: "lime", displayName: "lime" },
  { name: "sky", displayName: "Sky" },
  { name: "ocean", displayName: "Oceanic" },
  { name: "palenight", displayName: "Palenight" },
  { name: "arctic", displayName: "Arctic" },
  { name: "code", displayName: "Code" }
], Fr = { class: "vuefinder__settings-modal__content" }, Pr = { class: "vuefinder__settings-modal__main" }, Dr = { class: "vuefinder__settings-modal__sections" }, Mr = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, Tr = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, Er = { class: "vuefinder__settings-modal__input-group" }, Ir = ["value"], Ar = ["value"], Or = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, zr = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Lr = { class: "vuefinder__settings-modal__input-group" }, Vr = ["value"], Br = { class: "vuefinder__settings-modal__reset-section" }, Rr = { class: "vuefinder__settings-modal__reset-content" }, Ur = { class: "vuefinder__settings-modal__reset-title" }, Nr = { class: "vuefinder__settings-modal__reset-description" }, Bn = /* @__PURE__ */ te({
  __name: "ModalSettings",
  setup(n) {
    const e = ee(), { enabled: t } = ze(), o = e.config, { clearStore: s } = e.storage, { t: l, localeAtom: r } = e.i18n, d = q(r), c = R({
      get: () => String(d.value || "en"),
      set: (m) => r.set(m || "en")
    }), v = q(o.state), p = R(() => v.value.theme || "silver"), w = async () => {
      o.reset(), s(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, _ = (m) => {
      o.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: $ } = Je("VueFinderOptions"), x = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        zhCN: "Chinese-Simplified (简体中文)",
        zhTW: "Chinese-Traditional (繁體中文)",
        nl: "Dutch (Nederlands)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        it: "Italian (Italiano)",
        ja: "Japanese (日本語)",
        fa: "Persian (فارسی)",
        pl: "Polish (Polski)",
        pt: "Portuguese (Português)",
        ru: "Russian (Pусский)",
        es: "Spanish (Español)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)"
      }).filter(([m]) => Object.keys($).includes(m))
    );
    return (m, k) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: k[2] || (k[2] = (g) => i(e).modal.close())
        }, y(i(l)("Close")), 1)
      ]),
      default: se(() => [
        a("div", Fr, [
          N(Ee, {
            icon: i(On),
            title: i(l)("Settings")
          }, null, 8, ["icon", "title"]),
          a("div", Pr, [
            a("div", Dr, [
              i(t)("theme") ? (u(), h("div", Mr, [
                a("label", Tr, [
                  ce(y(i(l)("Theme")) + " ", 1),
                  N(un, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: se(() => [
                      ce(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                a("div", Er, [
                  a("select", {
                    id: "theme",
                    value: p.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: k[0] || (k[0] = (g) => _(g.target?.value))
                  }, [
                    (u(!0), h(ue, null, pe(i(Cr), (g) => (u(), h("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, Ar))), 128))
                  ], 40, Ir)
                ])
              ])) : L("", !0),
              Object.keys(i(x)).length > 1 ? (u(), h("div", Or, [
                a("label", zr, [
                  ce(y(i(l)("Language")) + " ", 1),
                  N(un, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: se(() => [
                      ce(y(i(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                a("div", Lr, [
                  fe(a("select", {
                    id: "language",
                    "onUpdate:modelValue": k[1] || (k[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), h(ue, null, pe(i(x), (g, f) => (u(), h("option", {
                      key: f,
                      value: f
                    }, y(g), 9, Vr))), 128))
                  ], 512), [
                    [At, c.value]
                  ])
                ])
              ])) : L("", !0)
            ]),
            a("div", Br, [
              a("div", Rr, [
                a("div", Ur, y(i(l)("Reset")), 1),
                a("div", Nr, y(i(l)("Reset all settings to default")), 1)
              ]),
              a("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: w
              }, y(i(l)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ce = {
  ESCAPE: "Escape",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV",
  KEY_S: "KeyS",
  KEY_R: "KeyR"
};
function Hr() {
  const n = ee(), e = De(n), t = n.fs, o = n.config, { enabled: s } = ze(), l = q(t.path), r = q(t.selectedItems), d = (c) => {
    if (c.code === Ce.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Ce.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Ce.KEY_R && s("rename") && r.value.length === 1 && (n.modal.open($t, { items: r.value }), c.preventDefault()), c.code === Ce.DELETE && r.value.length !== 0 && n.modal.open(kt, { items: r.value }), c.metaKey && c.code === Ce.BACKSLASH && n.modal.open(Dn), c.metaKey && c.code === Ce.KEY_F && s("search") && (n.modal.open(Qt), c.preventDefault()), c.metaKey && c.code === Ce.KEY_E && (o.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Ce.KEY_S && (n.modal.open(Bn), c.preventDefault()), c.metaKey && c.code === Ce.ENTER && (o.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Ce.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Ce.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(ft, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Ce.KEY_C && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Ce.KEY_X && s("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((v) => v.path))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Ce.KEY_V && s("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(et, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(Wt, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  ve(async () => {
    if (await Ve(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), gn(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Kr() {
  const n = A(!1), e = A([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((p) => p.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), v = d.clientX, p = d.clientY;
      (v < c.left || v > c.right || p < c.top || p > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const v = Array.from(c).filter((p) => p.kind === "file");
        if (v.length > 0) {
          e.value = [];
          for (const p of v) {
            const w = p.webkitGetAsEntry?.();
            if (w)
              await Nt((_, $) => {
                e.value.push({
                  name: $.name,
                  size: $.size,
                  type: $.type,
                  lastModified: new Date($.lastModified),
                  file: $
                });
              }, w);
            else {
              const _ = p.getAsFile();
              _ && e.value.push({
                name: _.name,
                size: _.size,
                type: _.type,
                lastModified: new Date(_.lastModified),
                file: _
              });
            }
          }
          return e.value;
        }
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const jr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function qr(n, e) {
  return u(), h("svg", jr, [...e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const Rn = { render: qr }, Gr = { class: "vuefinder__new-folder-modal__content" }, Wr = { class: "vuefinder__new-folder-modal__form" }, Yr = { class: "vuefinder__new-folder-modal__description" }, Qr = ["placeholder"], Xt = /* @__PURE__ */ te({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), r = A(""), d = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, o("Failed to create folder")));
      });
    };
    return (c, v) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Rn),
            title: i(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Gr, [
            a("div", Wr, [
              a("p", Yr, y(i(o)("Create a new folder")), 1),
              fe(a("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => r.value = p),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(o)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: ut(d, ["enter"])
              }, null, 40, Qr), [
                [vt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Xr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Jr(n, e) {
  return u(), h("svg", Xr, [...e[0] || (e[0] = [
    a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const Un = { render: Jr }, Zr = { class: "vuefinder__new-file-modal__content" }, el = { class: "vuefinder__new-file-modal__form" }, tl = { class: "vuefinder__new-file-modal__description" }, nl = ["placeholder"], Nn = /* @__PURE__ */ te({
  __name: "ModalNewFile",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), r = A(""), d = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(o("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Pe(c, o("Failed to create file")));
      });
    };
    return (c, v) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(i(o)("Create")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (p) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Un),
            title: i(o)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", Zr, [
            a("div", el, [
              a("p", tl, y(i(o)("Create a new file")), 1),
              fe(a("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (p) => r.value = p),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(o)("File Name"),
                type: "text",
                onKeyup: ut(d, ["enter"])
              }, null, 40, nl), [
                [vt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function sl(n, e) {
  return u(), h("svg", ol, [...e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const Hn = { render: sl };
function Lt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const il = { class: "vuefinder__upload-modal__content relative" }, al = { class: "vuefinder__upload-modal__target-section" }, rl = { class: "vuefinder__upload-modal__target-label" }, ll = { class: "vuefinder__upload-modal__target-container" }, dl = { class: "vuefinder__upload-modal__target-path" }, cl = { class: "vuefinder__upload-modal__target-storage" }, ul = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, vl = { class: "vuefinder__upload-modal__target-badge" }, fl = { class: "vuefinder__upload-modal__drag-hint" }, pl = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, _l = ["textContent"], hl = { class: "vuefinder__upload-modal__file-info" }, ml = { class: "vuefinder__upload-modal__file-name hidden md:block" }, gl = { class: "vuefinder__upload-modal__file-name md:hidden" }, wl = {
  key: 0,
  class: "ml-auto"
}, yl = ["title", "disabled", "onClick"], bl = {
  key: 0,
  class: "py-2"
}, kl = ["aria-expanded"], $l = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, xl = ["disabled"], Sl = ["aria-expanded"], Cl = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Jt = /* @__PURE__ */ te({
  __name: "ModalUpload",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.path), l = A(s.value), r = A(!1), d = () => {
      const I = l.value.path;
      if (!I) return { storage: "local", path: "" };
      if (I.endsWith("://"))
        return { storage: I.replace("://", ""), path: "" };
      const D = I.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (I) => {
      I && (l.value = I);
    }, v = (I) => {
      I && (l.value = I, r.value = !1);
    }, {
      container: p,
      internalFileInput: w,
      internalFolderInput: _,
      pickFiles: $,
      queue: C,
      message: x,
      uploading: m,
      hasFilesInDropArea: k,
      definitions: g,
      openFileSelector: f,
      upload: b,
      cancel: P,
      remove: S,
      clear: M,
      close: T,
      getClassNameForEntry: B,
      getIconForEntry: j,
      addExternalFiles: O
    } = En(e.customUploader), G = () => {
      b(l.value);
    };
    ve(() => {
      e.emitter.on("vf-external-files-dropped", (I) => {
        O(I);
      });
    }), ke(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const E = A(!1), X = A(null), W = A(null), J = (I) => {
      if (!E.value) return;
      const D = I.target, F = X.value?.contains(D) ?? !1, z = W.value?.contains(D) ?? !1;
      !F && !z && (E.value = !1);
    };
    return ve(() => document.addEventListener("click", J)), ke(() => document.removeEventListener("click", J)), (I, D) => (u(), U(Me, {
      "show-drag-overlay": i(k),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: se(() => [
        a("div", {
          ref_key: "actionsMenuMobileRef",
          ref: X,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          a("div", {
            class: ne([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              E.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[3] || (D[3] = (F) => i(f)())
            }, y(i(t)("Select Files")), 1),
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": E.value ? "true" : "false",
              onClick: D[4] || (D[4] = ae((F) => E.value = !E.value, ["stop"]))
            }, [...D[17] || (D[17] = [
              a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                a("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, kl)
          ], 2),
          E.value ? (u(), h("div", $l, [
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[5] || (D[5] = (F) => {
                i(f)(), E.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (F) => {
                i(_)?.click(), E.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[18] || (D[18] = a("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            a("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[7] || (D[7] = (F) => i(m) ? null : (i(M)(!1), E.value = !1))
            }, y(i(t)("Clear all")), 3),
            a("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (F) => i(m) ? null : (i(M)(!0), E.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(m) || !i(C).length,
          onClick: ae(G, ["prevent"])
        }, y(i(t)("Upload")), 9, xl),
        i(m) ? (u(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[9] || (D[9] = ae(
            //@ts-ignore
            (...F) => i(P) && i(P)(...F),
            ["prevent"]
          ))
        }, y(i(t)("Cancel")), 1)) : (u(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = ae(
            //@ts-ignore
            (...F) => i(T) && i(T)(...F),
            ["prevent"]
          ))
        }, y(i(t)("Close")), 1)),
        a("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: W,
          class: "relative mr-auto hidden sm:block"
        }, [
          a("div", {
            class: ne(["vuefinder__upload-actions", E.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            a("button", {
              ref_key: "pickFiles",
              ref: $,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(i(t)("Select Files")), 513),
            a("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": E.value ? "true" : "false",
              onClick: D[11] || (D[11] = ae((F) => E.value = !E.value, ["stop"]))
            }, [...D[19] || (D[19] = [
              a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                a("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, Sl)
          ], 2),
          E.value ? (u(), h("div", Cl, [
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[12] || (D[12] = (F) => {
                i(f)(), E.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            a("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (F) => {
                i(_)?.click(), E.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[20] || (D[20] = a("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            a("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[14] || (D[14] = (F) => i(m) ? null : (i(M)(!1), E.value = !1))
            }, y(i(t)("Clear all")), 3),
            a("div", {
              class: ne(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (F) => i(m) ? null : (i(M)(!0), E.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : L("", !0)
        ], 512)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Hn),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", il, [
            a("div", al, [
              a("div", rl, y(i(t)("Target Directory")), 1),
              a("div", ll, [
                a("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (F) => r.value = !r.value)
                }, [
                  a("div", dl, [
                    a("span", cl, y(d().storage) + "://", 1),
                    d().path ? (u(), h("span", ul, y(d().path), 1)) : L("", !0)
                  ]),
                  a("span", vl, y(i(t)("Browse")), 1)
                ])
              ]),
              a("div", {
                class: ne([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                N(Gt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (F) => l.value = F),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            a("div", fl, y(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            a("div", {
              ref_key: "container",
              ref: p,
              class: "hidden"
            }, null, 512),
            a("div", pl, [
              (u(!0), h(ue, null, pe(i(C), (F) => (u(), h("div", {
                key: F.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                a("span", {
                  class: ne(["vuefinder__upload-modal__file-icon", i(B)(F)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(i(j)(F))
                  }, null, 8, _l)
                ], 2),
                a("div", hl, [
                  a("div", ml, y(i(Lt)(F.name, 40)) + " (" + y(F.size) + ") ", 1),
                  a("div", gl, y(i(Lt)(F.name, 16)) + " (" + y(F.size) + ") ", 1),
                  a("div", {
                    class: ne(["vuefinder__upload-modal__file-status", i(B)(F)])
                  }, [
                    ce(y(F.statusName) + " ", 1),
                    F.status === i(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), h("b", wl, y(F.percent), 1)) : L("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: ne(["vuefinder__upload-modal__file-remove", i(m) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(m),
                  onClick: (z) => i(S)(F)
                }, [...D[16] || (D[16] = [
                  a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, yl)
              ]))), 128)),
              i(C).length ? L("", !0) : (u(), h("div", bl, y(i(t)("No files selected!")), 1))
            ]),
            i(x).length ? (u(), U(zt, {
              key: 0,
              error: "",
              onHidden: D[2] || (D[2] = (F) => x.value = "")
            }, {
              default: se(() => [
                ce(y(i(x)), 1)
              ]),
              _: 1
            })) : L("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: w,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
          ref_key: "internalFolderInput",
          ref: _,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), Fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pl(n, e) {
  return u(), h("svg", Fl, [...e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const Kn = { render: Pl }, Dl = { class: "vuefinder__unarchive-modal__content" }, Ml = { class: "vuefinder__unarchive-modal__items" }, Tl = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, El = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Il = { class: "vuefinder__unarchive-modal__item-name" }, Al = { class: "vuefinder__unarchive-modal__info" }, Zt = /* @__PURE__ */ te({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ee(), t = De(e), o = e.fs, s = q(o.path), { t: l } = e.i18n, r = A(e.modal.data.items[0]), d = A([]), c = () => {
      e.adapter.unarchive({
        item: r.value.path,
        path: s.value.path
      }).then((v) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, l("Failed to unarchive")));
      });
    };
    return (v, p) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(l)("Unarchive")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[0] || (p[0] = (w) => i(e).modal.close())
        }, y(i(l)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(Kn),
            title: i(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Dl, [
            a("div", Ml, [
              (u(!0), h(ue, null, pe(d.value, (w) => (u(), h("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), h("svg", Tl, [...p[1] || (p[1] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), h("svg", El, [...p[2] || (p[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                a("span", Il, y(w.basename), 1)
              ]))), 128)),
              a("p", Al, y(i(l)("The archive will be unarchived at")) + " (" + y(i(s).path) + ") ", 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function zl(n, e) {
  return u(), h("svg", Ol, [...e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const jn = { render: zl }, Ll = { class: "vuefinder__archive-modal__content" }, Vl = { class: "vuefinder__archive-modal__form" }, Bl = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Rl = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ul = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nl = { class: "vuefinder__archive-modal__file-name" }, Hl = ["placeholder"], en = /* @__PURE__ */ te({
  __name: "ModalArchive",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = q(s.path), r = A(""), d = A(e.modal.data.items), c = () => {
      d.value.length && e.adapter.archive({
        path: l.value.path,
        items: d.value.map(({ path: v, type: p }) => ({
          path: v,
          type: p
        })),
        name: r.value
      }).then((v) => {
        t.success(o("The file(s) archived.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Pe(v, o("Failed to archive files")));
      });
    };
    return (v, p) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(i(o)("Archive")), 1),
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: p[1] || (p[1] = (w) => i(e).modal.close())
        }, y(i(o)("Cancel")), 1)
      ]),
      default: se(() => [
        a("div", null, [
          N(Ee, {
            icon: i(jn),
            title: i(o)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Ll, [
            a("div", Vl, [
              a("div", Bl, [
                (u(!0), h(ue, null, pe(d.value, (w) => (u(), h("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), h("svg", Rl, [...p[2] || (p[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), h("svg", Ul, [...p[3] || (p[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  a("span", Nl, y(w.basename), 1)
                ]))), 128))
              ]),
              fe(a("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (w) => r.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: i(o)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: ut(c, ["enter"])
              }, null, 40, Hl), [
                [vt, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Kl = { class: "vuefinder__about-modal__content" }, jl = { class: "vuefinder__about-modal__main" }, ql = { class: "vuefinder__about-modal__shortcuts" }, Gl = { class: "vuefinder__about-modal__shortcut" }, Wl = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Yl = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Ql = { class: "vuefinder__about-modal__shortcut" }, Xl = { class: "vuefinder__about-modal__shortcut" }, Jl = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, Zl = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, ed = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, td = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, nd = { class: "vuefinder__about-modal__shortcut" }, od = { class: "vuefinder__about-modal__shortcut" }, sd = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, id = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, ad = /* @__PURE__ */ te({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ee(), { enabled: t } = ze(), { t: o } = e.i18n;
    return (s, l) => (u(), U(Me, null, {
      buttons: se(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => i(e).modal.close())
        }, y(i(o)("Close")), 1)
      ]),
      default: se(() => [
        a("div", Kl, [
          N(Ee, {
            icon: i(Pn),
            title: i(o)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          a("div", jl, [
            a("div", ql, [
              a("div", Gl, [
                a("div", null, y(i(o)("Refresh")), 1),
                l[1] || (l[1] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (u(), h("div", Wl, [
                a("div", null, y(i(o)("Rename")), 1),
                l[2] || (l[2] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "Shift"),
                  ce(" + "),
                  a("kbd", null, "R")
                ], -1))
              ])) : L("", !0),
              i(t)("delete") ? (u(), h("div", Yl, [
                a("div", null, y(i(o)("Delete")), 1),
                l[3] || (l[3] = a("kbd", null, "Del", -1))
              ])) : L("", !0),
              a("div", Ql, [
                a("div", null, y(i(o)("Escape")), 1),
                l[4] || (l[4] = a("kbd", null, "Esc", -1))
              ]),
              a("div", Xl, [
                a("div", null, y(i(o)("Select All")), 1),
                l[5] || (l[5] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (u(), h("div", Jl, [
                a("div", null, y(i(o)("Cut")), 1),
                l[6] || (l[6] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "X")
                ], -1))
              ])) : L("", !0),
              i(t)("copy") ? (u(), h("div", Zl, [
                a("div", null, y(i(o)("Copy")), 1),
                l[7] || (l[7] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "C")
                ], -1))
              ])) : L("", !0),
              i(t)("copy") ? (u(), h("div", ed, [
                a("div", null, y(i(o)("Paste")), 1),
                l[8] || (l[8] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "V")
                ], -1))
              ])) : L("", !0),
              i(t)("search") ? (u(), h("div", td, [
                a("div", null, y(i(o)("Search")), 1),
                l[9] || (l[9] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "F")
                ], -1))
              ])) : L("", !0),
              a("div", nd, [
                a("div", null, y(i(o)("Toggle Sidebar")), 1),
                l[10] || (l[10] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "E")
                ], -1))
              ]),
              a("div", od, [
                a("div", null, y(i(o)("Open Settings")), 1),
                l[11] || (l[11] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (u(), h("div", sd, [
                a("div", null, y(i(o)("Toggle Full Screen")), 1),
                l[12] || (l[12] = a("div", null, [
                  a("kbd", null, "⌘"),
                  ce(" + "),
                  a("kbd", null, "Enter")
                ], -1))
              ])) : L("", !0),
              i(t)("preview") ? (u(), h("div", id, [
                a("div", null, y(i(o)("Preview")), 1),
                l[13] || (l[13] = a("kbd", null, "Space", -1))
              ])) : L("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), rd = { class: "vuefinder__menubar__container" }, ld = ["onClick", "onMouseenter"], dd = { class: "vuefinder__menubar__label" }, cd = ["onMouseenter"], ud = ["onClick"], vd = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, fd = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, pd = /* @__PURE__ */ te({
  __name: "MenuBar",
  setup(n) {
    const e = ee(), t = De(e), { enabled: o } = ze(), { t: s } = e?.i18n || { t: (f) => f }, l = e?.fs, r = e?.config, d = q(r.state), c = q(l.selectedItems), v = q(l?.storages || []), p = A(null), w = A(!1), _ = R(() => window.opener !== null || window.name !== "" || window.history.length <= 1), $ = R(() => [
      {
        id: "file",
        label: s("File"),
        items: [
          {
            id: "new-folder",
            label: s("New Folder"),
            action: () => e?.modal?.open(Xt, { items: c.value }),
            enabled: () => o("newfolder")
          },
          {
            id: "new-file",
            label: s("New File"),
            action: () => e?.modal?.open(Nn, { items: c.value }),
            enabled: () => o("newfile")
          },
          { type: "separator" },
          {
            id: "upload",
            label: s("Upload"),
            action: () => e?.modal?.open(Jt, { items: c.value }),
            enabled: () => o("upload")
          },
          { type: "separator" },
          {
            id: "search",
            label: s("Search"),
            action: () => e.modal.open(Qt),
            enabled: () => o("search")
          },
          { type: "separator" },
          {
            id: "archive",
            label: s("Archive"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(en, { items: c.value });
            },
            enabled: () => c.value.length > 0 && o("archive")
          },
          {
            id: "unarchive",
            label: s("Unarchive"),
            action: () => {
              c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && e?.modal?.open(Zt, { items: c.value });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.mime_type === "application/zip" && o("unarchive")
          },
          { type: "separator" },
          {
            id: "preview",
            label: s("Preview"),
            action: () => {
              c.value.length === 1 && c.value[0]?.type !== "dir" && e?.modal?.open(ft, {
                storage: l?.path?.get()?.storage,
                item: c.value[0]
              });
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir" && o("preview")
          },
          // Only show exit option if we can actually close the window
          ..._.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: s("Exit"),
              action: () => {
                try {
                  window.close();
                } catch {
                }
              },
              enabled: () => !0
            }
          ] : []
        ]
      },
      {
        id: "edit",
        label: s("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: s("Select All"),
              action: () => l?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: s("Deselect All"),
              action: () => l?.clearSelection(),
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...o("copy") ? [
            {
              id: "cut",
              label: s("Cut"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "cut",
                  new Set(c.value.map((f) => f.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "copy",
              label: s("Copy"),
              action: () => {
                c.value.length > 0 && l?.setClipboard(
                  "copy",
                  new Set(c.value.map((f) => f.path))
                );
              },
              enabled: () => c.value.length > 0
            },
            {
              id: "paste",
              label: s("Paste"),
              action: () => {
                const f = l?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? et : Wt, {
                  items: { from: Array.from(f.items), to: l?.path?.get() }
                });
              },
              enabled: () => l?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...o("move") ? [
            {
              id: "move",
              label: s("Move files"),
              action: () => {
                if (c.value.length > 0) {
                  const f = e?.fs, b = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(et, { items: { from: c.value, to: b } });
                }
              },
              enabled: () => c.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: s("Copy Path"),
            action: async () => {
              if (c.value.length === 1) {
                const f = c.value[0];
                await ct(f.path);
              } else {
                const f = l?.path?.get();
                f?.path && await ct(f.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: s("Copy Download URL"),
            action: async () => {
              if (c.value.length === 1) {
                const f = c.value[0];
                l?.path?.get()?.storage;
                const b = e?.adapter?.getDownloadUrl({ path: f.path });
                b && await Ga(b);
              }
            },
            enabled: () => c.value.length === 1 && c.value[0]?.type !== "dir"
          },
          { type: "separator" },
          {
            id: "rename",
            label: s("Rename"),
            action: () => {
              c.value.length === 1 && e?.modal?.open($t, { items: c.value });
            },
            enabled: () => c.value.length === 1 && o("rename")
          },
          {
            id: "delete",
            label: s("Delete"),
            action: () => {
              c.value.length > 0 && e?.modal?.open(kt, { items: c.value });
            },
            enabled: () => c.value.length > 0 && o("delete")
          }
        ]
      },
      {
        id: "view",
        label: s("View"),
        items: [
          {
            id: "refresh",
            label: s("Refresh"),
            action: () => {
              e.adapter.invalidateListQuery(l.path.get().path), e.adapter.open(l.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: s("Grid View"),
            action: () => r?.set("view", "grid"),
            enabled: () => !0,
            checked: () => d.value?.view === "grid"
          },
          {
            id: "list-view",
            label: s("List View"),
            action: () => r?.set("view", "list"),
            enabled: () => !0,
            checked: () => d.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: s("Tree View"),
            action: () => r?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => d.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: s("Show Thumbnails"),
            action: () => r?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => d.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: s("Show Hidden Files"),
            action: () => r?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => d.value?.showHiddenFiles
          },
          { type: "separator" },
          {
            id: "fullscreen",
            label: s("Full Screen"),
            action: () => r?.toggle("fullScreen"),
            enabled: () => o("fullscreen"),
            checked: () => d.value?.fullScreen
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: s("Persist Path"),
            action: () => {
              r?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.persist
          },
          {
            id: "metric-units",
            label: s("Metric Units"),
            action: () => {
              r?.toggle("metricUnits"), e.filesize = r?.get("metricUnits") ? $n : Rt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => d.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: s("Go"),
        items: [
          ...o("history") ? [
            {
              id: "forward",
              label: s("Forward"),
              action: () => {
                l?.goForward();
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: s("Back"),
              action: () => {
                l?.goBack();
                const f = l?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => l?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: s("Open containing folder"),
            action: () => {
              const f = l?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const P = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(P);
              }
            },
            enabled: () => {
              const f = l?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(v.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const b = `${f}://`;
              e?.adapter.open(b);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: s("Go to Folder"),
            action: async () => {
              const f = prompt(s("Enter folder path:"));
              if (f) {
                if (!f.includes("://")) {
                  alert(s("Invalid path format. Path must be in format: storage://path/to/folder"));
                  return;
                }
                const b = f.indexOf("://"), P = f.slice(0, b);
                if (!v.value || !v.value.includes(P)) {
                  alert(s('Invalid storage. Storage "%s" is not available.', P));
                  return;
                }
                try {
                  await e?.adapter.open(f);
                } catch (S) {
                  const M = Pe(S, s("Failed to navigate to folder"));
                  t.error(M), e.fs.setLoading(!1);
                }
              }
            },
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: s("Help"),
        items: [
          {
            id: "settings",
            label: s("Settings"),
            action: () => e?.modal?.open(Bn),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: s("Shortcuts"),
            action: () => e?.modal?.open(ad),
            enabled: () => !0
          },
          {
            id: "about",
            label: s("About"),
            action: () => e?.modal?.open(Dn),
            enabled: () => !0
          }
        ]
      }
    ]), C = (f) => {
      p.value === f ? m() : (p.value = f, w.value = !0);
    }, x = (f) => {
      w.value && (p.value = f);
    }, m = () => {
      p.value = null, w.value = !1;
    }, k = (f) => {
      m(), f();
    }, g = (f) => {
      f.target.closest(".vuefinder__menubar") || m();
    };
    return ve(() => {
      document.addEventListener("click", g);
    }), ke(() => {
      document.removeEventListener("click", g);
    }), (f, b) => (u(), h("div", {
      class: "vuefinder__menubar",
      onClick: b[0] || (b[0] = ae(() => {
      }, ["stop"]))
    }, [
      a("div", rd, [
        (u(!0), h(ue, null, pe($.value, (P) => (u(), h("div", {
          key: P.id,
          class: ne(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": p.value === P.id }]),
          onClick: (S) => C(P.id),
          onMouseenter: (S) => x(P.id)
        }, [
          a("span", dd, y(P.label), 1),
          p.value === P.id ? (u(), h("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (S) => x(P.id)
          }, [
            (u(!0), h(ue, null, pe(P.items, (S) => (u(), h("div", {
              key: S.id || S.type,
              class: ne(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": S.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": S.enabled && !S.enabled(),
                "vuefinder__menubar__dropdown__item--checked": S.checked && S.checked()
              }]),
              onClick: ae((M) => S.type !== "separator" && S.enabled && S.enabled() ? k(S.action) : null, ["stop"])
            }, [
              S.type !== "separator" ? (u(), h("span", vd, y(S.label), 1)) : L("", !0),
              S.checked && S.checked() ? (u(), h("span", fd, " ✓ ")) : L("", !0)
            ], 10, ud))), 128))
          ], 40, cd)) : L("", !0)
        ], 42, ld))), 128))
      ])
    ]));
  }
}), _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function hd(n, e) {
  return u(), h("svg", _d, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const md = { render: hd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function wd(n, e) {
  return u(), h("svg", gd, [...e[0] || (e[0] = [
    a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const yd = { render: wd }, bd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function kd(n, e) {
  return u(), h("svg", bd, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const $d = { render: kd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sd(n, e) {
  return u(), h("svg", xd, [...e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Cd = { render: Sd }, Fd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pd(n, e) {
  return u(), h("svg", Fd, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Dd = { render: Pd }, Md = { class: "vuefinder__toolbar" }, Td = { class: "vuefinder__toolbar__actions" }, Ed = ["title"], Id = ["title"], Ad = ["title"], Od = ["title"], zd = ["title"], Ld = ["title"], Vd = ["title"], Bd = { class: "vuefinder__toolbar__controls" }, Rd = ["title"], Ud = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, Nd = ["title"], Hd = { class: "relative" }, Kd = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, jd = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, qd = { class: "vuefinder__toolbar__dropdown-content" }, Gd = { class: "vuefinder__toolbar__dropdown-section" }, Wd = { class: "vuefinder__toolbar__dropdown-label" }, Yd = { class: "vuefinder__toolbar__dropdown-row" }, Qd = { value: "name" }, Xd = { value: "size" }, Jd = { value: "modified" }, Zd = { value: "" }, ec = { value: "asc" }, tc = { value: "desc" }, nc = { class: "vuefinder__toolbar__dropdown-section" }, oc = { class: "vuefinder__toolbar__dropdown-label" }, sc = { class: "vuefinder__toolbar__dropdown-options" }, ic = { class: "vuefinder__toolbar__dropdown-option" }, ac = { class: "vuefinder__toolbar__option-text" }, rc = { class: "vuefinder__toolbar__dropdown-option" }, lc = { class: "vuefinder__toolbar__option-text" }, dc = { class: "vuefinder__toolbar__dropdown-option" }, cc = { class: "vuefinder__toolbar__option-text" }, uc = { class: "vuefinder__toolbar__dropdown-toggle" }, vc = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, fc = { class: "vuefinder__toolbar__dropdown-reset" }, pc = ["title"], _c = ["title"], hc = /* @__PURE__ */ te({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ee(), { enabled: t } = ze(), { t: o } = e.i18n, s = e.fs, l = e.config, r = q(l.state), d = q(s.selectedItems), c = q(s.sort), v = q(s.filter);
    ie(
      () => r.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const p = A(!1), w = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (p.value = !1);
    };
    ve(() => {
      const m = document.querySelector("body");
      m && r.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", w);
    }), ke(() => {
      document.removeEventListener("click", w);
    });
    const _ = A({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    ie(
      () => _.value.sortBy,
      (m) => {
        if (!_.value.sortOrder) {
          s.clearSort();
          return;
        }
        m === "name" ? s.setSort("basename", _.value.sortOrder) : m === "size" ? s.setSort("file_size", _.value.sortOrder) : m === "modified" && s.setSort("last_modified", _.value.sortOrder);
      }
    ), ie(
      () => _.value.sortOrder,
      (m) => {
        if (!m) {
          s.clearSort();
          return;
        }
        _.value.sortBy === "name" ? s.setSort("basename", m) : _.value.sortBy === "size" ? s.setSort("file_size", m) : _.value.sortBy === "modified" && s.setSort("last_modified", m);
      }
    ), ie(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? _.value.sortBy = "name" : m.column === "file_size" ? _.value.sortBy = "size" : m.column === "last_modified" && (_.value.sortBy = "modified"), _.value.sortOrder = m.order) : _.value.sortOrder = "";
      },
      { immediate: !0 }
    ), ie(
      () => _.value.filterKind,
      (m) => {
        s.setFilter(m, r.value.showHiddenFiles);
      }
    ), ie(
      () => _.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), s.setFilter(_.value.filterKind, m);
      }
    ), ie(
      v,
      (m) => {
        _.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), ie(
      () => r.value.showHiddenFiles,
      (m) => {
        _.value.showHidden = m, s.setFilter(_.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const $ = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), C = R(() => v.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), x = () => {
      _.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), s.clearSort(), s.clearFilter();
    };
    return (m, k) => (u(), h("div", Md, [
      a("div", Td, [
        i(t)("newfolder") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("New Folder"),
          onClick: k[0] || (k[0] = (g) => i(e).modal.open(Xt, { items: i(d) }))
        }, [
          N(i(Rn))
        ], 8, Ed)) : L("", !0),
        i(t)("newfile") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("New File"),
          onClick: k[1] || (k[1] = (g) => i(e).modal.open(Nn, { items: i(d) }))
        }, [
          N(i(Un))
        ], 8, Id)) : L("", !0),
        i(t)("rename") ? (u(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: i(o)("Rename"),
          onClick: k[2] || (k[2] = (g) => i(d).length !== 1 || i(e).modal.open($t, { items: i(d) }))
        }, [
          N(i(Tn), {
            class: ne(i(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ad)) : L("", !0),
        i(t)("delete") ? (u(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: i(o)("Delete"),
          onClick: k[3] || (k[3] = (g) => !i(d).length || i(e).modal.open(kt, { items: i(d) }))
        }, [
          N(i(Mn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Od)) : L("", !0),
        i(t)("upload") ? (u(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: i(o)("Upload"),
          onClick: k[4] || (k[4] = (g) => i(e).modal.open(Jt, { items: i(d) }))
        }, [
          N(i(Hn))
        ], 8, zd)) : L("", !0),
        i(t)("unarchive") && i(d).length === 1 && i(d)[0].mime_type === "application/zip" ? (u(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: i(o)("Unarchive"),
          onClick: k[5] || (k[5] = (g) => !i(d).length || i(e).modal.open(Zt, { items: i(d) }))
        }, [
          N(i(Kn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ld)) : L("", !0),
        i(t)("archive") ? (u(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: i(o)("Archive"),
          onClick: k[6] || (k[6] = (g) => !i(d).length || i(e).modal.open(en, { items: i(d) }))
        }, [
          N(i(jn), {
            class: ne(i(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Vd)) : L("", !0)
      ]),
      a("div", Bd, [
        i(t)("search") ? (u(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: i(o)("Search Files"),
          onClick: k[7] || (k[7] = (g) => i(e).modal.open(Qt))
        }, [
          N(i(Yt), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, Rd)) : L("", !0),
        a("div", Ud, [
          a("div", {
            title: i(o)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: k[8] || (k[8] = (g) => p.value = !p.value)
          }, [
            a("div", Hd, [
              N(i(Dd), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              C.value ? (u(), h("div", Kd)) : L("", !0)
            ])
          ], 8, Nd),
          p.value ? (u(), h("div", jd, [
            a("div", qd, [
              a("div", Gd, [
                a("div", Wd, y(i(o)("Sorting")), 1),
                a("div", Yd, [
                  fe(a("select", {
                    "onUpdate:modelValue": k[9] || (k[9] = (g) => _.value.sortBy = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    a("option", Qd, y(i(o)("Name")), 1),
                    a("option", Xd, y(i(o)("Size")), 1),
                    a("option", Jd, y(i(o)("Date")), 1)
                  ], 512), [
                    [At, _.value.sortBy]
                  ]),
                  fe(a("select", {
                    "onUpdate:modelValue": k[10] || (k[10] = (g) => _.value.sortOrder = g),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    a("option", Zd, y(i(o)("None")), 1),
                    a("option", ec, y(i(o)("Asc")), 1),
                    a("option", tc, y(i(o)("Desc")), 1)
                  ], 512), [
                    [At, _.value.sortOrder]
                  ])
                ])
              ]),
              a("div", nc, [
                a("div", oc, y(i(o)("Show")), 1),
                a("div", sc, [
                  a("label", ic, [
                    fe(a("input", {
                      "onUpdate:modelValue": k[11] || (k[11] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Dt, _.value.filterKind]
                    ]),
                    a("span", ac, y(i(o)("All items")), 1)
                  ]),
                  a("label", rc, [
                    fe(a("input", {
                      "onUpdate:modelValue": k[12] || (k[12] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Dt, _.value.filterKind]
                    ]),
                    a("span", lc, y(i(o)("Files only")), 1)
                  ]),
                  a("label", dc, [
                    fe(a("input", {
                      "onUpdate:modelValue": k[13] || (k[13] = (g) => _.value.filterKind = g),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Dt, _.value.filterKind]
                    ]),
                    a("span", cc, y(i(o)("Folders only")), 1)
                  ])
                ])
              ]),
              a("div", uc, [
                a("label", vc, y(i(o)("Show hidden files")), 1),
                fe(a("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": k[14] || (k[14] = (g) => _.value.showHidden = g),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [yt, _.value.showHidden]
                ])
              ]),
              a("div", fc, [
                a("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: x
                }, y(i(o)("Reset")), 1)
              ])
            ])
          ])) : L("", !0)
        ]),
        i(t)("fullscreen") ? (u(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: i(o)("Toggle Full Screen"),
          onClick: k[15] || (k[15] = (g) => i(l).toggle("fullScreen"))
        }, [
          i(r).fullScreen ? (u(), U(i(yd), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), U(i(md), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, pc)) : L("", !0),
        a("div", {
          class: "mx-1.5",
          title: i(o)("Change View"),
          onClick: k[16] || (k[16] = (g) => $())
        }, [
          i(r).view === "grid" ? (u(), U(i($d), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : L("", !0),
          i(r).view === "list" ? (u(), U(i(Cd), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : L("", !0)
        ], 8, _c)
      ])
    ]));
  }
}), mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function gc(n, e) {
  return u(), h("svg", mc, [...e[0] || (e[0] = [
    a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const wc = { render: gc }, yc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function bc(n, e) {
  return u(), h("svg", yc, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const kc = { render: bc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function xc(n, e) {
  return u(), h("svg", $c, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Sc = { render: xc }, Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Fc(n, e) {
  return u(), h("svg", Cc, [...e[0] || (e[0] = [
    a("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Pc = { render: Fc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Mc(n, e) {
  return u(), h("svg", Dc, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Tc = { render: Mc }, Ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ic(n, e) {
  return u(), h("svg", Ec, [...e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Ac = { render: Ic }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function zc(n, e) {
  return u(), h("svg", Oc, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const Lc = { render: zc };
function pt(n, e = []) {
  const t = "vfDragEnterCounter", o = n.fs, s = q(o.selectedItems);
  function l(w, _) {
    return !!(!w || w.type !== "dir" || w.path.startsWith(_) || s.value.some((C) => C.path === _ ? !1 : !!w.path.startsWith(C.path)));
  }
  function r(w, _) {
    if (w.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none");
      return;
    }
    w.preventDefault();
    const C = o.getDraggedItem();
    l(_, C) ? w.dataTransfer && (w.dataTransfer.dropEffect = "none", w.dataTransfer.effectAllowed = "none") : (w.dataTransfer && (w.dataTransfer.dropEffect = "copy", w.dataTransfer.effectAllowed = "all"), w.currentTarget.classList.add(...e));
  }
  function d(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, C = Number($.dataset[t] || 0);
    $.dataset[t] = String(C + 1);
  }
  function c(w) {
    if (w.isExternalDrag || !(n.features?.move ?? !1))
      return;
    w.preventDefault();
    const $ = w.currentTarget, x = Number($.dataset[t] || 0) - 1;
    x <= 0 ? (delete $.dataset[t], $.classList.remove(...e)) : $.dataset[t] = String(x);
  }
  function v(w, _) {
    if (w.isExternalDrag || !(n.features?.move ?? !1) || !_) return;
    w.preventDefault();
    const C = w.currentTarget;
    delete C.dataset[t], C.classList.remove(...e);
    const x = w.dataTransfer?.getData("items") || "[]", k = JSON.parse(x).map(
      (g) => o.sortedFiles.get().find((f) => f.path === g)
    );
    o.clearDraggedItem(), n.modal.open(et, { items: { from: k, to: _ } });
  }
  function p(w) {
    return {
      dragover: (_) => r(_, w),
      dragenter: d,
      dragleave: c,
      drop: (_) => v(_, w)
    };
  }
  return { events: p };
}
const Vc = { class: "vuefinder__breadcrumb__container" }, Bc = ["title"], Rc = ["title"], Uc = ["title"], Nc = ["title"], Hc = { class: "vuefinder__breadcrumb__path-container" }, Kc = { class: "vuefinder__breadcrumb__list" }, jc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, qc = { class: "relative" }, Gc = ["title", "onClick"], Wc = ["title"], Yc = { class: "vuefinder__breadcrumb__path-mode" }, Qc = { class: "vuefinder__breadcrumb__path-mode-content" }, Xc = ["title"], Jc = { class: "vuefinder__breadcrumb__path-text" }, Zc = ["title"], eu = ["data-theme"], tu = ["onClick"], nu = { class: "vuefinder__breadcrumb__hidden-item-content" }, ou = { class: "vuefinder__breadcrumb__hidden-item-text" }, su = /* @__PURE__ */ te({
  __name: "Breadcrumb",
  setup(n) {
    const e = ee(), t = De(e), { t: o } = e.i18n, s = e.fs, l = e.config, r = q(l.state), d = q(s.path), c = q(s.loading), v = A(null), p = An(0, 100), w = A(5), _ = A(!1), $ = A(!1), C = R(() => d.value?.breadcrumb ?? []);
    function x(I, D) {
      return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
    }
    const m = R(
      () => x(C.value, w.value)[0]
    ), k = R(
      () => x(C.value, w.value)[1]
    );
    ie(p, () => {
      if (!v.value) return;
      const I = v.value.children;
      let D = 0, F = 0;
      const z = 5, V = 1;
      w.value = z, Ve(() => {
        for (let Y = I.length - 1; Y >= 0; Y--) {
          const le = I[Y];
          if (D + le.offsetWidth > p.value - 40)
            break;
          D += parseInt(le.offsetWidth.toString(), 10), F++;
        }
        F < V && (F = V), F > z && (F = z), w.value = F;
      });
    });
    const g = () => {
      v.value && (p.value = v.value.offsetWidth);
    }, f = A(null);
    ve(() => {
      f.value = new ResizeObserver(g), v.value && f.value.observe(v.value);
    }), ke(() => {
      f.value && f.value.disconnect();
    });
    const b = pt(e, ["vuefinder__drag-over"]);
    function P(I = null) {
      I ??= C.value.length - 2;
      const D = {
        basename: d.value?.storage ?? "local",
        extension: "",
        path: (d.value?.storage ?? "local") + "://",
        storage: d.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return C.value[I] ?? D;
    }
    const S = () => {
      e.adapter.invalidateListQuery(d.value.path), e.adapter.open(d.value.path);
    }, M = () => {
      m.value.length > 0 && e.adapter.open(
        C.value[C.value.length - 2]?.path ?? (d.value?.storage ?? "local") + "://"
      );
    }, T = (I) => {
      e.adapter.open(I.path), _.value = !1;
    }, B = () => {
      _.value && (_.value = !1);
    }, j = {
      mounted(I, D) {
        I.clickOutsideEvent = function(F) {
          I === F.target || I.contains(F.target) || D.value();
        }, document.body.addEventListener("click", I.clickOutsideEvent);
      },
      beforeUnmount(I) {
        document.body.removeEventListener("click", I.clickOutsideEvent);
      }
    }, O = () => {
      l.toggle("showTreeView");
    }, G = A({
      x: 0,
      y: 0
    }), E = (I, D = null) => {
      if (I.currentTarget instanceof HTMLElement) {
        const { x: F, y: z, height: V } = I.currentTarget.getBoundingClientRect();
        G.value = { x: F, y: z + V };
      }
      _.value = D ?? !_.value;
    }, X = () => {
      $.value = !$.value;
    }, W = async () => {
      await ct(d.value?.path || ""), t.success(o("Path copied to clipboard"));
    }, J = () => {
      $.value = !1;
    };
    return (I, D) => (u(), h("div", Vc, [
      a("span", {
        title: i(o)("Toggle Tree View")
      }, [
        N(i(Ac), {
          class: ne(["vuefinder__breadcrumb__toggle-tree", i(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: O
        }, null, 8, ["class"])
      ], 8, Bc),
      a("span", {
        title: i(o)("Go up a directory")
      }, [
        N(i(kc), Ae({
          class: C.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, He(C.value.length ? i(b).events(P()) : {}), { onClick: M }), null, 16, ["class"])
      ], 8, Rc),
      i(s).isLoading() ? (u(), h("span", {
        key: 1,
        title: i(o)("Cancel")
      }, [
        N(i(Sc), {
          onClick: D[0] || (D[0] = (F) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Nc)) : (u(), h("span", {
        key: 0,
        title: i(o)("Refresh")
      }, [
        N(i(wc), { onClick: S })
      ], 8, Uc)),
      fe(a("div", Hc, [
        a("div", null, [
          N(i(Pc), Ae({ class: "vuefinder__breadcrumb__home-icon" }, He(i(b).events(P(-1))), {
            onClick: D[1] || (D[1] = ae((F) => i(e).adapter.open(i(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        a("div", Kc, [
          k.value.length ? fe((u(), h("div", jc, [
            D[3] || (D[3] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", qc, [
              a("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: D[2] || (D[2] = (F) => E(F, !0)),
                onClick: ae(E, ["stop"])
              }, [
                N(i(Vn), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [j, B]
          ]) : L("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), h(ue, null, pe(m.value, (F, z) => (u(), h("div", { key: z }, [
            D[4] || (D[4] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", Ae({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: F.basename
            }, He(i(b).events(F), !0), {
              onClick: ae((V) => i(e).adapter.open(F.path), ["stop"])
            }), y(F.name), 17, Gc)
          ]))), 128))
        ], 512),
        i(l).get("loadingIndicator") === "circular" && i(c) ? (u(), U(i(Ct), { key: 0 })) : L("", !0),
        a("span", {
          title: i(o)("Toggle Path Copy Mode"),
          onClick: X
        }, [
          N(i(Lc), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, Wc)
      ], 512), [
        [Ue, !$.value]
      ]),
      fe(a("div", Yc, [
        a("div", Qc, [
          a("div", {
            title: i(o)("Copy Path")
          }, [
            N(i(Ht), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: W
            })
          ], 8, Xc),
          a("div", Jc, y(i(d).path), 1),
          a("div", {
            title: i(o)("Exit")
          }, [
            N(i(Tc), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: J
            })
          ], 8, Zc)
        ])
      ], 512), [
        [Ue, $.value]
      ]),
      (u(), U(bt, { to: "body" }, [
        a("div", null, [
          fe(a("div", {
            style: Oe({
              position: "absolute",
              top: G.value.y + "px",
              left: G.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (u(!0), h(ue, null, pe(k.value, (F, z) => (u(), h("div", Ae({
              key: z,
              class: "vuefinder__breadcrumb__hidden-item"
            }, He(i(b).events(F), !0), {
              onClick: (V) => T(F)
            }), [
              a("div", nu, [
                a("span", null, [
                  N(i(Be), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                a("span", ou, y(F.name), 1)
              ])
            ], 16, tu))), 128))
          ], 12, eu), [
            [Ue, _.value]
          ])
        ])
      ]))
    ]));
  }
}), iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function au(n, e) {
  return u(), h("svg", iu, [...e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const vn = { render: au }, ru = { class: "vuefinder__drag-item__container" }, lu = { class: "vuefinder__drag-item__count" }, du = /* @__PURE__ */ te({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, o) => (u(), h("div", ru, [
      e.count > 1 ? (u(), U(i(vn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : L("", !0),
      N(i(vn), { class: "vuefinder__drag-item__icon" }),
      a("div", lu, y(e.count), 1)
    ]));
  }
}), cu = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, fn = /* @__PURE__ */ te({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ee(), o = q(t.config.state), s = R(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = R(() => {
      const d = s.value, c = o.value?.listIconSize, v = o.value?.gridIconSize;
      return o.value?.gridItemWidth, o.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), r = {
      app: t,
      config: o.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), h("div", {
      class: ne(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": s.value === "small",
        "vuefinder__item-icon--large": s.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Oe(l.value)
    }, [
      xe(d.$slots, "icon", Ke(je(r)), () => [
        n.item.type === "dir" ? (u(), U(i(Be), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), U(i(dt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), h("div", cu, y(n.item.extension.substring(0, 3)), 1)) : L("", !0)
      ])
    ], 6));
  }
}), uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function vu(n, e) {
  return u(), h("svg", uu, [...e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const pn = { render: vu }, fu = ["data-key", "data-row", "data-col", "draggable"], pu = { key: 0 }, _u = { class: "vuefinder__explorer__item-grid-content" }, hu = ["data-src", "alt"], mu = { class: "vuefinder__explorer__item-title" }, gu = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, wu = { class: "vuefinder__explorer__item-list-name" }, yu = { class: "vuefinder__explorer__item-list-icon" }, bu = { class: "vuefinder__explorer__item-name" }, ku = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, $u = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, xu = { key: 0 }, Su = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Cu = /* @__PURE__ */ te({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = ee(), l = s.fs, r = s.config, d = R(() => {
      const O = s.selectionFilterType;
      return !O || O === "both" ? !0 : O === "files" && t.item.type === "file" || O === "dirs" && t.item.type === "dir";
    }), c = R(() => {
      const O = s.selectionFilterMimeIncludes;
      return !O || !O.length || t.item.type === "dir" ? !0 : t.item.mime_type ? O.some((G) => t.item.mime_type?.startsWith(G)) : !1;
    }), v = R(() => d.value && c.value), p = R(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      v.value ? "" : "vf-explorer-item--unselectable"
    ]), w = R(() => ({
      opacity: t.isDragging || l.isCut(t.item.path) || !v.value ? 0.5 : ""
    })), _ = A(null);
    let $ = !1, C = null, x = null, m = !1;
    const { enabled: k } = ze(), g = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), f = R(() => g ? !1 : k("move")), b = () => {
      C && (clearTimeout(C), C = null), x = null;
    }, P = (O) => {
      b(), x = O, m = !1, O.stopPropagation(), C = setTimeout(() => {
        !x || C === null || (m = !0, x.cancelable && x.preventDefault(), x.stopPropagation(), o("contextmenu", x), b());
      }, 500);
    }, S = (O) => {
      if (m) {
        O.preventDefault(), O.stopPropagation(), b();
        return;
      }
      setTimeout(() => {
        m || (b(), j(O));
      }, 100);
    }, M = (O) => {
      if (!x) return;
      const G = x.touches[0] || x.changedTouches[0], E = O.touches[0] || O.changedTouches[0];
      if (G && E) {
        const X = Math.abs(E.clientX - G.clientX), W = Math.abs(E.clientY - G.clientY);
        (X > 15 || W > 15) && b();
      }
    }, T = (O) => {
      g && O.type !== "click" || o("click", O);
    }, B = (O) => {
      if (m)
        return O.preventDefault(), O.stopPropagation(), !1;
      o("dragstart", O);
    }, j = (O) => {
      if (!$)
        $ = !0, o("click", O), _.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, o("dblclick", O), !1;
    };
    return (O, G) => (u(), h("div", {
      class: ne(p.value),
      style: Oe(w.value),
      "data-key": n.item.path,
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: f.value,
      onTouchstartCapture: G[1] || (G[1] = (E) => P(E)),
      onTouchendCapture: G[2] || (G[2] = (E) => S(E)),
      onTouchmoveCapture: M,
      onTouchcancelCapture: G[3] || (G[3] = () => b()),
      onClick: T,
      onDblclick: G[4] || (G[4] = (E) => o("dblclick", E)),
      onContextmenu: G[5] || (G[5] = ae((E) => o("contextmenu", E), ["prevent", "stop"])),
      onDragstart: B,
      onDragend: G[6] || (G[6] = (E) => o("dragend", E))
    }, [
      n.view === "grid" ? (u(), h("div", pu, [
        i(l).isReadOnly(n.item) ? (u(), U(i(pn), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : L("", !0),
        a("div", _u, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), h("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? i(s).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: G[0] || (G[0] = (E) => E.preventDefault())
          }, null, 40, hu)) : (u(), U(fn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: se((E) => [
              xe(O.$slots, "icon", Ke(je(E)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        a("span", mu, y(i(Lt)(n.item.basename)), 1)
      ])) : (u(), h("div", gu, [
        a("div", wu, [
          a("div", yu, [
            N(fn, {
              item: n.item,
              view: n.view
            }, {
              icon: se((E) => [
                xe(O.$slots, "icon", Ke(je(E)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          a("span", bu, y(n.item.basename), 1),
          a("div", null, [
            i(l).isReadOnly(n.item) ? (u(), U(i(pn), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : L("", !0)
          ])
        ]),
        n.showPath ? (u(), h("div", ku, y(n.item.path), 1)) : L("", !0),
        n.showPath ? L("", !0) : (u(), h("div", $u, [
          n.item.file_size ? (u(), h("div", xu, y(i(s).filesize(n.item.file_size)), 1)) : L("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), h("div", Su, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : L("", !0)
      ])),
      i(k)("pinned") && i(r).get("pinnedFolders").find((E) => E.path === n.item.path) ? (u(), U(i(Kt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : L("", !0)
    ], 46, fu));
  }
}), Fu = ["data-row"], _n = /* @__PURE__ */ te({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, o = e, s = R(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = R(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = R(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), h("div", {
      class: ne(s.value),
      "data-row": n.rowIndex,
      style: Oe(l.value)
    }, [
      a("div", {
        class: ne(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Oe(r.value)
      }, [
        (u(!0), h(ue, null, pe(n.items, (v, p) => (u(), U(Cu, Ae({
          key: v.path,
          item: v,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(v.path),
          "is-dragging": n.isDraggingItem(v.path),
          "row-index": n.rowIndex,
          "col-index": p,
          "explorer-id": n.explorerId
        }, He(n.dragNDropEvents(v)), {
          onClick: c[0] || (c[0] = (w) => o("click", w)),
          onDblclick: c[1] || (c[1] = (w) => o("dblclick", w)),
          onContextmenu: c[2] || (c[2] = (w) => o("contextmenu", w)),
          onDragstart: c[3] || (c[3] = (w) => o("dragstart", w)),
          onDragend: c[4] || (c[4] = (w) => o("dragend", w))
        }), {
          icon: se((w) => [
            xe(d.$slots, "icon", Ae({ ref_for: !0 }, w))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Fu));
  }
}), Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Du(n, e) {
  return u(), h("svg", Pu, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Mu = { render: Du }, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Eu(n, e) {
  return u(), h("svg", Tu, [...e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Iu = { render: Eu }, It = /* @__PURE__ */ te({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), h("div", null, [
      n.direction === "asc" ? (u(), U(i(Mu), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0),
      n.direction === "desc" ? (u(), U(i(Iu), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : L("", !0)
    ]));
  }
}), Au = { class: "vuefinder__explorer__header" }, Ou = /* @__PURE__ */ te({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ee(), t = e.fs, { t: o } = e.i18n, s = q(t.sort);
    return (l, r) => (u(), h("div", Au, [
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (d) => i(t).toggleSort("basename"))
      }, [
        ce(y(i(o)("Name")) + " ", 1),
        fe(N(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "basename"]
        ])
      ]),
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (d) => i(t).toggleSort("file_size"))
      }, [
        ce(y(i(o)("Size")) + " ", 1),
        fe(N(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "file_size"]
        ])
      ]),
      a("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (d) => i(t).toggleSort("last_modified"))
      }, [
        ce(y(i(o)("Date")) + " ", 1),
        fe(N(It, {
          direction: i(s).order
        }, null, 8, ["direction"]), [
          [Ue, i(s).active && i(s).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function zu(n, e) {
  const {
    scrollContainer: t,
    itemWidth: o = 100,
    rowHeight: s,
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: d
  } = e, c = n, v = () => typeof s == "number" ? s : s.value, p = () => o ? typeof o == "number" ? o : o.value : 100, w = () => r ? typeof r == "number" ? r : r.value : 0, _ = A(0), $ = A(6), C = A(600);
  let x = null;
  const m = R(() => Math.ceil(c.value.length / $.value)), k = R(() => m.value * v()), g = R(() => {
    const O = v(), G = Math.max(0, Math.floor(_.value / O) - l), E = Math.min(
      m.value,
      Math.ceil((_.value + C.value) / O) + l
    );
    return { start: G, end: E };
  }), f = R(() => {
    const { start: O, end: G } = g.value;
    return Array.from({ length: G - O }, (E, X) => O + X);
  }), b = () => C.value, P = () => typeof d == "object" ? d.value : !1, S = () => {
    if (P()) {
      $.value = 1;
      return;
    }
    if (t.value) {
      const O = w(), G = t.value.clientWidth - O, E = p();
      E > 0 && ($.value = Math.max(Math.floor(G / E), 2));
    }
  }, M = (O) => {
    const G = O.target;
    _.value = G.scrollTop;
  };
  ie(
    () => c.value.length,
    () => {
      S();
    }
  ), o && typeof o != "number" && ie(o, () => {
    S();
  }), r && typeof r != "number" && ie(r, () => {
    S();
  }), s && typeof s != "number" && ie(s, () => {
  });
  const T = (O, G) => {
    if (!O || !Array.isArray(O))
      return [];
    const E = G * $.value;
    return O.slice(E, E + $.value);
  }, B = (O, G, E, X, W) => {
    if (!O || !Array.isArray(O))
      return [];
    const J = [];
    for (let I = G; I <= E; I++)
      for (let D = X; D <= W; D++) {
        const F = I * $.value + D;
        F < O.length && O[F] && J.push(O[F]);
      }
    return J;
  }, j = (O) => ({
    row: Math.floor(O / $.value),
    col: O % $.value
  });
  return ve(async () => {
    await Ve(), t.value && (C.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (C.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && (x = new ResizeObserver((O) => {
      const G = O[0];
      G && (C.value = Math.round(G.contentRect.height)), S();
    }), x.observe(t.value));
  }), ke(() => {
    window.removeEventListener("resize", S), x && (x.disconnect(), x = null);
  }), {
    scrollTop: _,
    itemsPerRow: $,
    totalRows: m,
    totalHeight: k,
    visibleRange: g,
    visibleRows: f,
    updateItemsPerRow: S,
    handleScroll: M,
    getRowItems: T,
    getItemsInRange: B,
    getItemPosition: j,
    getContainerHeight: b
  };
}
function Lu(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: o,
    getKey: s,
    selectionObject: l,
    rowHeight: r,
    itemWidth: d,
    osInstance: c
  } = n, v = () => typeof d == "number" ? d : d.value, p = Math.floor(Math.random() * 2 ** 32).toString(), w = ee(), _ = w.fs, $ = q(_.selectedKeys), C = q(_.sortedFiles), x = R(() => {
    const D = /* @__PURE__ */ new Map();
    return C.value && C.value.forEach((F) => {
      D.set(s(F), F);
    }), D;
  }), m = A(/* @__PURE__ */ new Set()), k = A(!1), g = A(!1), f = (D) => D.map((F) => F.getAttribute("data-key")).filter((F) => !!F), b = (D) => {
    D.selection.clearSelection(!0, !0);
  }, P = (D) => {
    if ($.value && $.value.size > 0) {
      const F = document.querySelectorAll(`.file-item-${p}[data-key]`), z = /* @__PURE__ */ new Map();
      F.forEach((Y) => {
        const le = Y.getAttribute("data-key");
        le && z.set(le, Y);
      });
      const V = [];
      $.value.forEach((Y) => {
        const le = z.get(Y);
        le && S(Y) && V.push(le);
      }), V.forEach((Y) => {
        D.selection.select(Y, !0);
      });
    }
  }, S = (D) => {
    const F = x.value.get(D);
    if (!F) return !1;
    const z = w.selectionFilterType, V = w.selectionFilterMimeIncludes;
    return z === "files" && F.type === "dir" || z === "dirs" && F.type === "file" ? !1 : V && Array.isArray(V) && V.length > 0 ? F.type === "dir" ? !0 : F.mime_type ? V.some((Y) => F.mime_type?.startsWith(Y)) : !1 : !0;
  }, M = (D) => {
    if (w.selectionMode === "single")
      return !1;
    k.value = !1, !D.event?.metaKey && !D.event?.ctrlKey && (g.value = !0), D.selection.resolveSelectables(), b(D), P(D);
  }, T = A(0), B = ({ event: D, selection: F }) => {
    T.value = (l.value?.getAreaLocation().y1 ?? 0) - (w.root.getBoundingClientRect().top ?? 0);
    const z = document.querySelector(
      ".selection-area-container"
    );
    if (z && (z.dataset.theme = w.theme.current), w.selectionMode === "single")
      return;
    const V = D;
    V && "type" in V && V.type === "touchend" && V.preventDefault();
    const Y = D;
    !Y?.ctrlKey && !Y?.metaKey && (_.clearSelection(), F.clearSelection(!0, !0)), m.value.clear();
  }, j = (D) => {
    if (w.selectionMode === "single")
      return;
    const F = f(D.store.changed.added), z = f(D.store.changed.removed);
    g.value = !1, k.value = !0, F.forEach((V) => {
      $.value && !$.value.has(V) && S(V) && (m.value.add(V), _.select(V, w.selectionMode || "multiple"));
    }), z.forEach((V) => {
      document.querySelector(`[data-key="${V}"]`) && x.value.has(V) && m.value.delete(V), _.deselect(V);
    }), D.selection.resolveSelectables(), P(D);
  }, O = () => {
    m.value.clear();
  }, G = (D) => {
    if (!D.event)
      return;
    const F = document.querySelector(".scroller-" + p);
    if (!F)
      return;
    const z = F.getBoundingClientRect(), V = z.left, Y = z.top;
    let le = F.scrollTop;
    if (c?.value) {
      const { viewport: Re } = c.value.elements();
      Re && (le = Re.scrollTop);
    }
    const _e = l.value?.getAreaLocation();
    if (!_e)
      return;
    const $e = Math.min(_e.x1, _e.x2), ge = le + Math.min(_e.y1, _e.y2), We = Math.max(_e.x1, _e.x2), qe = le + Math.max(_e.y1, _e.y2), we = 4, Z = v();
    let de = Math.floor(($e - V - we) / Z), re = Math.floor((We - V - we) / Z);
    const ye = $e - V - we - de * Z, Ye = We - V - we - re * Z;
    ye > Z - we && (de = de + 1), Ye < we && (re = re - 1);
    const tn = Math.max(0, de), H = Math.min(e.value - 1, re);
    let K = Math.floor((ge - Y - we) / r.value), Q = Math.floor((qe - Y - we) / r.value);
    const oe = ge - Y - we - K * r.value, Le = qe - Y - we - Q * r.value, Te = Math.floor((t.value - we) / r.value);
    oe > r.value - we && (K = K + 1), Le < we && (Q = Q - 1);
    const Ie = Math.max(0, K), tt = Math.min(Q, Te), Se = o(
      C.value,
      Ie,
      tt,
      tn,
      H
    ), Ft = document.querySelectorAll(`.file-item-${p}[data-key]`), nn = /* @__PURE__ */ new Map();
    Ft.forEach((Re) => {
      const nt = Re.getAttribute("data-key");
      nt && nn.set(nt, Re);
    });
    const Pt = [];
    if (Se.forEach((Re) => {
      const nt = s(Re);
      nn.get(nt) || Pt.push(nt);
    }), Pt.length > 0) {
      const Re = w.selectionMode || "multiple";
      _.selectMultiple(Pt, Re);
    }
  }, E = (D) => {
    G(D), b(D), P(D), _.setSelectedCount($.value?.size || 0), k.value = !1;
  }, X = () => {
    let D = [".scroller-" + p];
    if (c?.value) {
      const { viewport: F } = c.value.elements();
      F && (D = F);
    }
    l.value = new lo({
      selectables: [".file-item-" + p + ":not(.vf-explorer-item--unselectable)"],
      boundaries: D,
      selectionContainerClass: "selection-area-container",
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 }
        }
      },
      features: {
        touch: !0,
        range: !0,
        deselectOnBlur: !0,
        singleTap: {
          allow: !1,
          intersect: "native"
        }
      }
    }), l.value.on("beforestart", M), l.value.on("start", B), l.value.on("move", j), l.value.on("stop", E);
  }, W = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, J = () => {
    l.value && (Array.from(
      $.value ?? /* @__PURE__ */ new Set()
    ).forEach((F) => {
      S(F) || _.deselect(F);
    }), W(), X());
  }, I = (D) => {
    g.value && (l.value?.clearSelection(), O(), g.value = !1);
    const F = D;
    !m.value.size && !g.value && !F?.ctrlKey && !F?.metaKey && (_.clearSelection(), l.value?.clearSelection());
  };
  return ve(() => {
    const D = (F) => {
      !F.buttons && k.value && (k.value = !1);
    };
    document.addEventListener("dragleave", D), ke(() => {
      document.removeEventListener("dragleave", D);
    });
  }), {
    explorerId: p,
    isDragging: k,
    initializeSelectionArea: X,
    updateSelectionArea: J,
    handleContentClick: I
  };
}
function Vu(n) {
  const e = (o) => {
    if (!o)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const s = n.selectionFilterType, l = n.selectionFilterMimeIncludes, r = !s || s === "both" || s === "files" && o.type === "file" || s === "dirs" && o.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (o.type === "dir" ? d = !0 : o.mime_type ? d = l.some((c) => o.mime_type.startsWith(c)) : d = !1), { typeAllowed: r, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (o) => {
      const { typeAllowed: s, mimeAllowed: l } = e(o);
      return s && l;
    }
  };
}
function Bu(n) {
  const e = (o) => ({
    item: o,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (o, s, l) => {
      const r = e(o);
      if (o.type === "file" && s) {
        if (n.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (o.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
        return;
      const d = n.contextMenuItems?.find((c) => c.show(n, {
        items: [o],
        target: o,
        searchQuery: ""
      }));
      d && d.action(n, [o]);
    }
  };
}
function Ru(n, e, t, o, s, l, r) {
  const d = n.fs, { canSelectItem: c } = Vu(n), { openItem: v } = Bu(n), p = (m) => {
    const k = m.target?.closest(".file-item-" + e);
    if (!k) return null;
    const g = String(k.getAttribute("data-key")), f = t.value?.find((b) => b.path === g);
    return { key: g, item: f };
  }, w = () => {
    const m = o.value;
    return t.value?.filter((k) => m?.has(k.path)) || [];
  };
  return {
    handleItemClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k, b = m;
      if (!c(f))
        return;
      const P = n.selectionMode || "multiple";
      !b?.ctrlKey && !b?.metaKey && (m.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), s.value?.clearSelection(!0, !0)), s.value?.resolveSelectables(), m.type === "touchstart" && d.isSelected(g) ? d.select(g, P) : d.toggleSelect(g, P), d.setSelectedCount(o.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const k = p(m);
      if (!k) return;
      const { item: g } = k;
      c(g) && g && v(g, l, r);
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const k = p(m);
      if (!k) return;
      const { key: g, item: f } = k;
      c(f) && (o.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: w(),
        target: f
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: m, items: w() });
    },
    getSelectedItems: w
  };
}
function Uu(n, e) {
  const t = A(null);
  return ve(() => {
    if (it.plugin([ro]), n.value) {
      const o = it(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (s) => {
            t.value = s;
            const { viewport: l } = s.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (s) => {
            const { viewport: l } = s.elements();
          }
        }
      );
      t.value = o;
    }
  }), ke(() => {
    if (t.value) {
      const { viewport: o } = t.value.elements();
      o && o.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
function Nu(n, e) {
  const t = A(null);
  return ve(() => {
    n.value && (t.value = new kn({
      elements_selector: ".lazy",
      container: n.value
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), Jn(() => {
    t.value && t.value.update();
  }), ke(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const Hu = { class: "vuefinder__explorer__container" }, Ku = {
  key: 0,
  class: "vuefinder__linear-loader"
}, ju = /* @__PURE__ */ te({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ee(), o = pt(t, ["vuefinder__drag-over"]), s = Xe("dragImage"), l = hn(null), r = Xe("scrollContainer"), d = Xe("scrollContent"), c = t.fs, v = t.config, p = q(v.state), w = q(c.sortedFiles), _ = q(c.selectedKeys), $ = q(c.loading), C = (Z) => _.value?.has(Z) ?? !1, x = R(() => {
      if (p.value?.view === "grid") {
        const ye = p.value?.gridItemHeight ?? 80, Ye = p.value?.gridItemGap ?? 8;
        return ye + Ye * 2;
      }
      const de = p.value?.listItemHeight ?? 32, re = p.value?.listItemGap ?? 2;
      return de + re * 2;
    }), m = R(() => {
      if (p.value?.view === "grid") {
        const de = p.value?.gridItemWidth ?? 96, re = p.value?.gridItemGap ?? 8;
        return de + re * 2;
      }
      return 104;
    }), k = R(() => p.value?.view === "grid" ? (p.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: f,
      totalHeight: b,
      visibleRows: P,
      handleScroll: S,
      getRowItems: M,
      getItemsInRange: T,
      updateItemsPerRow: B
    } = zu(
      R(() => w.value ?? []),
      {
        scrollContainer: r,
        itemWidth: m,
        rowHeight: x,
        overscan: 2,
        containerPadding: k,
        lockItemsPerRow: R(() => p.value.view === "list")
      }
    ), { osInstance: j } = Uu(r, S), { explorerId: O, isDragging: G, initializeSelectionArea: E, updateSelectionArea: X, handleContentClick: W } = Lu({
      itemsPerRow: f,
      totalHeight: b,
      getItemsInRange: T,
      getKey: (Z) => Z.path,
      selectionObject: l,
      rowHeight: x,
      itemWidth: m,
      osInstance: j
    }), J = A(null), I = (Z) => {
      if (!Z || !J.value) return !1;
      const de = _.value?.has(J.value) ?? !1;
      return G.value && (de ? _.value?.has(Z) ?? !1 : Z === J.value);
    };
    ie(
      () => v.get("view"),
      (Z) => {
        Z === "list" ? f.value = 1 : B();
      },
      { immediate: !0 }
    ), ie(f, (Z) => {
      v.get("view") === "list" && Z !== 1 && (f.value = 1);
    });
    const D = (Z) => w.value?.[Z];
    Nu(r, t);
    const { handleItemClick: F, handleItemDblClick: z, handleItemContextMenu: V, handleContentContextMenu: Y } = Ru(
      t,
      O,
      w,
      _,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    ve(() => {
      const Z = () => {
        l.value || E(), l.value && l.value.on("beforestart", ({ event: de }) => {
          const re = de?.target === d.value;
          if (!de?.metaKey && !de?.ctrlKey && !de?.altKey && !re)
            return !1;
        });
      };
      if (j.value)
        Z();
      else {
        const de = setInterval(() => {
          j.value && (clearInterval(de), Z());
        }, 50);
        setTimeout(() => {
          clearInterval(de), l.value || Z();
        }, 500);
      }
      ie(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], X, {
        deep: !0
      });
    });
    const le = (Z) => {
      if (!(t.features?.move ?? !1) || Z.altKey || Z.ctrlKey || Z.metaKey)
        return Z.preventDefault(), !1;
      G.value = !0;
      const re = Z.target?.closest(
        ".file-item-" + O
      );
      if (J.value = re ? String(re.dataset.key) : null, Z.dataTransfer && J.value) {
        Z.dataTransfer.setDragImage(s.value, 0, 15), Z.dataTransfer.effectAllowed = "all", Z.dataTransfer.dropEffect = "copy";
        const ye = _.value?.has(J.value) ? Array.from(_.value) : [J.value];
        Z.dataTransfer.setData("items", JSON.stringify(ye)), c.setDraggedItem(J.value);
      }
    }, _e = () => {
      J.value = null;
    };
    let $e = null, ge = null;
    const We = (Z) => {
      Z.target?.closest(".file-item-" + O) || (ge = Z, $e && clearTimeout($e), $e = setTimeout(() => {
        ge && (ge.cancelable && ge.preventDefault(), ge.stopPropagation(), Y(ge)), ge = null, $e = null;
      }, 500));
    }, qe = (Z) => {
      $e && (clearTimeout($e), $e = null), ge = null;
    }, we = (Z) => {
      if (!ge) return;
      const de = ge.touches[0] || ge.changedTouches[0], re = Z.touches[0] || Z.changedTouches[0];
      if (de && re) {
        const ye = Math.abs(re.clientX - de.clientX), Ye = Math.abs(re.clientY - de.clientY);
        (ye > 15 || Ye > 15) && ($e && (clearTimeout($e), $e = null), ge = null);
      }
    };
    return (Z, de) => (u(), h("div", Hu, [
      i(p).view === "list" ? (u(), U(Ou, { key: 0 })) : L("", !0),
      a("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: ne(["vuefinder__explorer__selector-area", "scroller-" + i(O)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i($) ? (u(), h("div", Ku)) : L("", !0),
        a("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Oe({ height: `${i(b)}px`, position: "relative", width: "100%" }),
          onContextmenu: de[0] || (de[0] = ae(
            //@ts-ignore
            (...re) => i(Y) && i(Y)(...re),
            ["self", "prevent"]
          )),
          onClick: de[1] || (de[1] = ae(
            //@ts-ignore
            (...re) => i(W) && i(W)(...re),
            ["self"]
          )),
          onTouchstartCapture: ae(We, ["self"]),
          onTouchendCapture: ae(qe, ["self"]),
          onTouchmoveCapture: ae(we, ["self"]),
          onTouchcancelCapture: ae(qe, ["self"])
        }, [
          a("div", {
            ref_key: "dragImage",
            ref: s,
            class: "vuefinder__explorer__drag-item"
          }, [
            N(du, {
              count: J.value && i(_).has(J.value) ? i(_).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(p).view === "grid" ? (u(!0), h(ue, { key: 0 }, pe(i(P), (re) => (u(), U(_n, {
            key: re,
            "row-index": re,
            "row-height": x.value,
            view: "grid",
            "items-per-row": i(f),
            items: i(M)(i(w), re),
            "show-thumbnails": i(p).showThumbnails,
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(z),
            onContextmenu: i(V),
            onDragstart: le,
            onDragend: _e
          }, {
            icon: se((ye) => [
              xe(Z.$slots, "icon", Ae({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), h(ue, { key: 1 }, pe(i(P), (re) => (u(), U(_n, {
            key: re,
            "row-index": re,
            "row-height": x.value,
            view: "list",
            items: D(re) ? [D(re)] : [],
            "is-dragging-item": I,
            "is-selected": C,
            "drag-n-drop-events": (ye) => i(o).events(ye),
            "explorer-id": i(O),
            onClick: i(F),
            onDblclick: i(z),
            onContextmenu: i(V),
            onDragstart: le,
            onDragend: _e
          }, {
            icon: se((ye) => [
              xe(Z.$slots, "icon", Ae({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), qu = ["href", "download"], Gu = ["onClick"], Wu = /* @__PURE__ */ te({
  __name: "ContextMenu",
  setup(n) {
    const e = ee(), t = A(null), o = A([]);
    let s = null, l = null, r = null, d = [], c = null;
    const v = wt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", ($) => {
      o.value = $;
    });
    const p = ($) => $.link(e, o.value), w = ($) => {
      e.emitter.emit("vf-contextmenu-hide"), $.action(e, o.value);
    };
    e.emitter.on("vf-contextmenu-show", ($) => {
      const { event: C, items: x, target: m = null } = $ || {};
      v.items = (e.contextMenuItems || []).filter((k) => k.show(e, {
        items: x,
        target: m
      })).sort((k, g) => {
        const f = k.order ?? 1 / 0, b = g.order ?? 1 / 0;
        return f - b;
      }), m ? x.length > 1 && x.some((k) => k.path === m.path) ? e.emitter.emit("vf-context-selected", x) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), _(C);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, s && (s(), s = null), r && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", r, !0) : $.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, v.positions = {};
    });
    const _ = async ($) => {
      s && (s(), s = null);
      const x = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const M = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return M ? { x: M.clientX, y: M.clientY } : { x: 0, y: 0 };
      })($);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: x.x,
          y: x.y,
          top: x.y,
          left: x.x,
          right: x.x,
          bottom: x.y
        })
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await Ve(), !t.value || !l) return;
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
        });
      });
      const m = [
        at(8),
        rt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        lt({ padding: 16 })
      ];
      let k = 0, g = 0;
      try {
        const S = await Ze(l, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        k = S.x, g = S.y;
      } catch (S) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", S);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${k}px`,
        top: `${g}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (v.positions = {
          ...v.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const b = ((S) => {
        const M = [];
        let T = S;
        for (; T && T !== document.body && T !== document.documentElement; ) {
          const B = window.getComputedStyle(T), j = B.overflow + B.overflowX + B.overflowY;
          (j.includes("scroll") || j.includes("auto")) && M.push(T), T = T.parentElement;
        }
        return M;
      })(t.value);
      d = [window, ...b], r = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const P = r;
      P && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", P, !0) : S.addEventListener("scroll", P, !0);
      }), c = (S) => {
        if (!v.active) return;
        const M = S.target;
        if (!M || t.value && t.value.contains(M))
          return;
        const T = e.root;
        T && T.contains(M) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            s = Vt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: S, y: M } = await Ze(l, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${S}px`,
                    top: `${M}px`
                  };
                } catch (S) {
                  console.warn("Floating UI positioning error:", S);
                }
            });
          } catch (S) {
            console.warn("Floating UI autoUpdate setup error:", S), s = null;
          }
      }, 200);
    };
    return ke(() => {
      s && (s(), s = null), r && (d.forEach(($) => {
        $ === window ? window.removeEventListener("scroll", r, !0) : $.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), ($, C) => fe((u(), h("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: ne([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Oe(v.positions)
    }, [
      (u(!0), h(ue, null, pe(v.items, (x) => (u(), h("li", {
        key: x.title,
        class: "vuefinder__context-menu__item"
      }, [
        x.link ? (u(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: p(x),
          download: p(x),
          onClick: C[0] || (C[0] = (m) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, qu)) : (u(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (m) => w(x)
        }, [
          a("span", null, y(x.title(i(e).i18n)), 1)
        ], 8, Gu))
      ]))), 128))
    ], 6)), [
      [Ue, v.active]
    ]);
  }
}), Yu = { class: "vuefinder__status-bar__wrapper" }, Qu = { class: "vuefinder__status-bar__storage" }, Xu = ["title"], Ju = { class: "vuefinder__status-bar__storage-icon" }, Zu = ["value"], ev = ["value"], tv = { class: "vuefinder__status-bar__info space-x-2" }, nv = { key: 0 }, ov = { key: 1 }, sv = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, iv = { class: "vuefinder__status-bar__actions" }, av = /* @__PURE__ */ te({
  __name: "Statusbar",
  setup(n) {
    const e = ee(), { t } = e.i18n, o = e.fs, s = q(o.sortedFiles), l = q(o.path), r = q(o.selectedCount), d = q(o.storages), c = q(o.selectedItems), v = q(o.path), p = (m) => {
      const k = m.target.value;
      e.adapter.open(k + "://");
    }, w = R(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((m, k) => m + (k.file_size || 0), 0)), _ = R(() => d.value), $ = R(() => s.value), C = R(() => r.value || 0), x = R(() => c.value || []);
    return (m, k) => (u(), h("div", Yu, [
      a("div", Qu, [
        a("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          a("div", Ju, [
            N(i(jt))
          ]),
          a("select", {
            name: "vuefinder-media-selector",
            value: i(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (u(!0), h(ue, null, pe(_.value, (g) => (u(), h("option", {
              key: g,
              value: g
            }, y(g), 9, ev))), 128))
          ], 40, Zu),
          k[0] || (k[0] = a("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, Xu),
        a("div", tv, [
          C.value === 0 ? (u(), h("span", nv, y($.value.length) + " " + y(i(t)("items")), 1)) : (u(), h("span", ov, [
            ce(y(C.value) + " " + y(i(t)("selected")) + " ", 1),
            w.value ? (u(), h("span", sv, y(i(e).filesize(w.value)), 1)) : L("", !0)
          ]))
        ])
      ]),
      a("div", iv, [
        xe(m.$slots, "actions", {
          path: i(v).path,
          count: C.value || 0,
          selected: x.value
        })
      ])
    ]));
  }
}), rv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function lv(n, e) {
  return u(), h("svg", rv, [...e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const dv = { render: lv };
function qn(n, e) {
  const t = n.findIndex((o) => o.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const cv = { class: "vuefinder__folder-loader-indicator" }, uv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Gn = /* @__PURE__ */ te({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Zn({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = ee(), o = wn(n, "modelValue"), s = A(!1);
    ie(
      () => o.value,
      () => l()
    );
    const l = async () => {
      s.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        qn(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (r) {
        Pe(r, "Failed to fetch subfolders");
      } finally {
        s.value = !1;
      }
    };
    return (r, d) => (u(), h("div", cv, [
      s.value ? (u(), U(i(Ct), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), h("div", uv, [
        o.value ? (u(), U(i(St), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : L("", !0),
        o.value ? L("", !0) : (u(), U(i(xt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), vv = { key: 0 }, fv = { class: "vuefinder__treesubfolderlist__no-folders" }, pv = { class: "vuefinder__treesubfolderlist__item-content" }, _v = ["onClick"], hv = ["title", "onDblclick", "onClick"], mv = { class: "vuefinder__treesubfolderlist__item-icon" }, gv = { class: "vuefinder__treesubfolderlist__subfolder" }, wv = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, yv = /* @__PURE__ */ te({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = pt(e, ["vuefinder__drag-over"]), s = A({}), l = e.config, r = q(l.state), { t: d } = e.i18n, c = q(t.path), v = n, p = A(null), w = A(50);
    ve(() => {
      v.path === v.storage + "://" && p.value && it(p.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = R(() => {
      const f = e.treeViewData.find((b) => b.path === v.path)?.folders || [];
      return f.length > w.value ? f.slice(0, w.value) : f;
    }), $ = R(() => e.treeViewData.find((f) => f.path === v.path)?.folders?.length || 0), C = R(() => $.value > w.value), x = R(() => `${v.storage}://`), m = (g, f) => g === f || g.startsWith(`${f}/`);
    ie(
      _,
      (g) => {
        const f = r.value.expandTreeByDefault && v.path === x.value, b = r.value.expandedTreePaths || [];
        g.forEach((P) => {
          const S = b.some(
            (M) => m(M, P.path)
          );
          (f || S) && s.value[P.path] === void 0 && (s.value[P.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const k = () => {
      w.value += 50;
    };
    return (g, f) => {
      const b = mn("TreeSubfolderList", !0);
      return u(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: p,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? L("", !0) : (u(), h("li", vv, [
          a("div", fv, y(i(d)("No folders")), 1)
        ])),
        (u(!0), h(ue, null, pe(_.value, (P) => (u(), h("li", {
          key: P.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", pv, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => s.value[P.path] = !s.value[P.path]
            }, [
              N(Gn, {
                modelValue: s.value[P.path],
                "onUpdate:modelValue": (S) => s.value[P.path] = S,
                storage: n.storage,
                path: P.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, _v),
            a("div", Ae({
              class: "vuefinder__treesubfolderlist__item-link",
              title: P.path
            }, He(
              i(o).events({
                ...P,
                dir: P.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (S) => s.value[P.path] = !s.value[P.path],
              onClick: (S) => i(e).adapter.open(P.path)
            }), [
              a("div", mv, [
                i(c)?.path === P.path ? (u(), U(i(qt), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), U(i(Be), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              a("div", {
                class: ne(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(c).path === P.path
                }])
              }, y(P.basename), 3)
            ], 16, hv)
          ]),
          a("div", gv, [
            fe(N(b, {
              storage: v.storage,
              path: P.path
            }, null, 8, ["storage", "path"]), [
              [Ue, s.value[P.path]]
            ])
          ])
        ]))), 128)),
        C.value ? (u(), h("li", wv, [
          a("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: k
          }, y(i(d)("load more")), 1)
        ])) : L("", !0)
      ], 512);
    };
  }
}), bv = /* @__PURE__ */ te({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ee(), t = e.fs, o = e.config, s = n, l = q(o.state), r = R(() => {
      const $ = l.value.expandedTreePaths || [], C = `${s.storage}://`;
      return $.some(
        (x) => x === C || x.startsWith(`${C}`)
      );
    }), d = A(l.value.expandTreeByDefault || r.value), c = pt(e, ["vuefinder__drag-over"]), v = q(t.path), p = R(() => s.storage === v.value?.storage);
    ie(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      ($) => {
        ($.expandTreeByDefault || $.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const w = {
      storage: s.storage,
      path: s.storage + "://",
      dir: s.storage + "://",
      type: "dir",
      basename: s.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function _($) {
      $ === v.value?.storage ? d.value = !d.value : e.adapter.open($ + "://");
    }
    return ($, C) => (u(), h(ue, null, [
      a("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: C[2] || (C[2] = (x) => _(n.storage))
      }, [
        a("div", Ae({
          class: ["vuefinder__treestorageitem__info", p.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, He(i(c).events(w), !0)), [
          a("div", {
            class: ne(["vuefinder__treestorageitem__icon", p.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            N(i(jt))
          ], 2),
          a("div", null, y(n.storage), 1)
        ], 16),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: C[1] || (C[1] = ae((x) => d.value = !d.value, ["stop"]))
        }, [
          N(Gn, {
            modelValue: d.value,
            "onUpdate:modelValue": C[0] || (C[0] = (x) => d.value = x),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      fe(N(yv, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ue, d.value]
      ])
    ], 64));
  }
}), kv = { class: "vuefinder__folder-indicator" }, $v = { class: "vuefinder__folder-indicator--icon" }, xv = /* @__PURE__ */ te({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = wn(n, "modelValue");
    return (t, o) => (u(), h("div", kv, [
      a("div", $v, [
        e.value ? (u(), U(i(St), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : L("", !0),
        e.value ? L("", !0) : (u(), U(i(xt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Sv = {
  key: 0,
  class: "vuefinder__treeview__header"
}, Cv = { class: "vuefinder__treeview__pinned-label" }, Fv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Pv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Dv = ["onClick"], Mv = ["title"], Tv = ["onClick"], Ev = { key: 0 }, Iv = { class: "vuefinder__treeview__no-pinned" }, Av = /* @__PURE__ */ te({
  __name: "TreeView",
  setup(n) {
    const e = ee(), { enabled: t } = ze(), { t: o } = e.i18n, { getStore: s, setStore: l } = e.storage, r = e.fs, d = e.config, c = q(d.state), v = q(r.sortedFiles), p = q(r.storages), w = R(() => p.value || []), _ = q(r.path), $ = pt(e, ["vuefinder__drag-over"]), C = A(190), x = A(s("pinned-folders-opened", !0));
    ie(x, (f) => l("pinned-folders-opened", f));
    const m = (f) => {
      const b = d.get("pinnedFolders");
      d.set("pinnedFolders", b.filter((P) => P.path !== f.path));
    }, k = (f) => {
      const b = f.clientX, P = f.target.parentElement;
      if (!P) return;
      const S = P.getBoundingClientRect().width;
      P.classList.remove("transition-[width]"), P.classList.add("transition-none");
      const M = (B) => {
        C.value = S + B.clientX - b, C.value < 50 && (C.value = 0, d.set("showTreeView", !1)), C.value > 50 && d.set("showTreeView", !0);
      }, T = () => {
        const B = P.getBoundingClientRect();
        C.value = B.width, P.classList.add("transition-[width]"), P.classList.remove("transition-none"), window.removeEventListener("mousemove", M), window.removeEventListener("mouseup", T);
      };
      window.addEventListener("mousemove", M), window.addEventListener("mouseup", T);
    }, g = A(null);
    return ve(() => {
      g.value && it(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), ie(v, (f) => {
      const b = f.filter((P) => P.type === "dir");
      qn(e.treeViewData, {
        path: _.value.path || "",
        folders: b.map((P) => ({
          storage: P.storage,
          path: P.path,
          basename: P.basename,
          type: "dir"
        }))
      });
    }), (f, b) => (u(), h(ue, null, [
      a("div", {
        class: ne(["vuefinder__treeview__overlay", i(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: b[0] || (b[0] = (P) => i(d).toggle("showTreeView"))
      }, null, 2),
      a("div", {
        style: Oe(
          i(c).showTreeView ? "min-width:100px;max-width:75%; width: " + C.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (u(), h("div", Sv, [
            a("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: b[2] || (b[2] = (P) => x.value = !x.value)
            }, [
              a("div", Cv, [
                N(i(Kt), { class: "vuefinder__treeview__pin-icon" }),
                a("div", Fv, y(i(o)("Pinned Folders")), 1)
              ]),
              N(xv, {
                modelValue: x.value,
                "onUpdate:modelValue": b[1] || (b[1] = (P) => x.value = P)
              }, null, 8, ["modelValue"])
            ]),
            x.value ? (u(), h("ul", Pv, [
              (u(!0), h(ue, null, pe(i(c).pinnedFolders, (P) => (u(), h("li", {
                key: P.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                a("div", Ae({ class: "vuefinder__treeview__pinned-folder" }, He(i($).events(P), !0), {
                  onClick: (S) => i(e).adapter.open(P.path)
                }), [
                  i(_).path !== P.path ? (u(), U(i(Be), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : L("", !0),
                  i(_).path === P.path ? (u(), U(i(qt), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : L("", !0),
                  a("div", {
                    title: P.path,
                    class: ne(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(_).path === P.path
                    }])
                  }, y(P.basename), 11, Mv)
                ], 16, Dv),
                a("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (S) => m(P)
                }, [
                  N(i(dv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Tv)
              ]))), 128)),
              i(c).pinnedFolders.length ? L("", !0) : (u(), h("li", Ev, [
                a("div", Iv, y(i(o)("No folders pinned")), 1)
              ]))
            ])) : L("", !0)
          ])) : L("", !0),
          (u(!0), h(ue, null, pe(w.value, (P) => (u(), h("div", {
            key: P,
            class: "vuefinder__treeview__storage"
          }, [
            N(bv, { storage: P }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        a("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: k
        }, null, 32)
      ], 4)
    ], 64));
  }
}), be = {
  new_folder: "new_folder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
  move: "move",
  copy: "copy",
  paste: "paste"
};
function Ov(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function he(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, o) => !(e.needsSearchQuery !== !!o.searchQuery || e.target !== void 0 && e.target !== Ov(o) || e.targetType !== void 0 && e.targetType !== o.target?.type || e.mimeType !== void 0 && e.mimeType !== o.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ot(...n) {
  return (e, t) => n.some((o) => o(e, t));
}
function st(...n) {
  return (e, t) => n.every((o) => o(e, t));
}
const Wn = [
  {
    id: be.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: he({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: be.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ot(he({ target: "none" }), he({ target: "many" })),
    order: 20
  },
  {
    id: be.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && he({ target: "none" })(n, e),
    order: 30
  },
  {
    id: be.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Xt),
    show: he({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: be.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: he({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: be.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders"), s = o.concat(
        e.filter(
          (l) => o.findIndex((r) => r.path === l.path) === -1
        )
      );
      t.set("pinnedFolders", s);
    },
    show: st(he({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: be.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, o = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        o.filter(
          (s) => !e.find((l) => l.path === s.path)
        )
      );
    },
    show: st(he({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((s) => s.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: be.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(ft, { storage: e[0]?.storage, item: e[0] }),
    show: st(
      he({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: be.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: st(
      he({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: be.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open($t, { items: e }),
    show: he({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: be.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, o = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(et, { items: { from: e, to: o } });
    },
    show: ot(
      he({ target: "one", feature: "move" }),
      he({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: be.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => t.path)));
    },
    show: ot(
      he({ target: "one", feature: "copy" }),
      he({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: be.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const s = n.fs.path.get();
        let l = s.path, r = s.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, r = e[0].storage);
        const d = {
          storage: r || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? et : Wt, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: be.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(en, { items: e }),
    show: ot(
      he({ target: "many", feature: "archive" }),
      st(
        he({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: be.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Zt, { items: e }),
    show: he({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: be.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(kt, { items: e });
    },
    show: ot(
      he({ feature: "delete", target: "one" }),
      he({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], zv = ["data-theme"], Lv = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, Vv = { class: "vuefinder__external-drop-message" }, Bv = { class: "vuefinder__main__content" }, Rv = /* @__PURE__ */ te({
  __name: "VueFinderView",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean },
    locale: {},
    contextMenuItems: {},
    selectionMode: {},
    selectionFilterType: {},
    selectionFilterMimeIncludes: {},
    onError: { type: Function },
    onSelect: { type: Function },
    onPathChange: { type: Function },
    onUploadComplete: { type: Function },
    onDeleteComplete: { type: Function },
    onNotify: { type: Function },
    onReady: { type: Function },
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function },
    customUploader: { type: Function }
  },
  emits: [
    "select",
    "path-change",
    "upload-complete",
    "delete-complete",
    "notify",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick",
    "update:locale"
  ],
  setup(n, { emit: e }) {
    const t = e, o = n, s = ee(), l = Xe("root"), r = s.config;
    ie(
      () => o.features,
      (g) => {
        const f = bn(g);
        Object.keys(s.features).forEach((b) => {
          delete s.features[b];
        }), Object.assign(s.features, f);
      },
      { deep: !0 }
    );
    const d = s.fs, c = q(s.i18n.localeAtom), v = q(r.state), p = R(() => {
      const g = v.value;
      return {
        "--vf-grid-item-width": `${g.gridItemWidth}px`,
        "--vf-grid-item-height": `${g.gridItemHeight}px`,
        "--vf-grid-item-gap": `${g.gridItemGap}px`,
        "--vf-grid-icon-size": `${g.gridIconSize}px`,
        "--vf-list-item-height": `${g.listItemHeight}px`,
        "--vf-list-item-gap": `${g.listItemGap}px`,
        "--vf-list-icon-size": `${g.listIconSize}px`
      };
    });
    Hr();
    const { isDraggingExternal: w, handleDragEnter: _, handleDragOver: $, handleDragLeave: C, handleDrop: x } = Kr();
    function m(g) {
      d.setPath(g.dirname), r.get("persist") && r.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), s.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    s.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, s.adapter.onAfterOpen = (g) => {
      m(g), d.setLoading(!1);
    }, s.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), s.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), s.emitter.on("vf-notify", (g) => {
      t("notify", g);
    }), s.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), s.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), ie(
      () => o.config?.theme,
      (g) => {
        g && r.set("theme", i(g));
      },
      { immediate: !0 }
    ), ie(
      c,
      (g, f) => {
        g !== f && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ve(() => {
      s.root = l.value, ie(
        () => r.get("path"),
        (f) => {
          s.adapter.open(f);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      d.setPath(g), s.adapter.open(g), d.path.listen((f) => {
        t("path-change", f.path);
      }), d.selectedItems.listen((f) => {
        t("select", f);
      }), t("ready");
    });
    const k = async (g) => {
      const f = await x(g);
      f.length > 0 && (s.modal.open(Jt), setTimeout(() => {
        s.emitter.emit(
          "vf-external-files-dropped",
          f.map((b) => b.file)
        );
      }, 100));
    };
    return (g, f) => (u(), h("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: ne(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(w) }]),
      "data-theme": i(s).theme.current,
      style: Oe(p.value),
      onDragenter: f[2] || (f[2] = //@ts-ignore
      (...b) => i(_) && i(_)(...b)),
      onDragover: f[3] || (f[3] = //@ts-ignore
      (...b) => i($) && i($)(...b)),
      onDragleave: f[4] || (f[4] = //@ts-ignore
      (...b) => i(C) && i(C)(...b)),
      onDrop: k
    }, [
      a("div", {
        class: ne(i(s).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        a("div", {
          class: ne([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: f[0] || (f[0] = (b) => i(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (b) => i(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(w) ? (u(), h("div", Lv, [
            a("div", Vv, y(i(s).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : L("", !0),
          i(v).showMenuBar ? (u(), U(pd, { key: 1 })) : L("", !0),
          i(v).showToolbar ? (u(), U(hc, { key: 2 })) : L("", !0),
          N(su),
          a("div", Bv, [
            N(Av),
            N(ju, {
              "on-file-dclick": o.onFileDclick,
              "on-folder-dclick": o.onFolderDclick
            }, {
              icon: se((b) => [
                xe(g.$slots, "icon", Ke(je(b)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          N(av, null, {
            actions: se((b) => [
              xe(g.$slots, "status-bar", Ke(je(b)))
            ]),
            _: 3
          })
        ], 34),
        (u(), U(bt, { to: "body" }, [
          N(eo, { name: "fade" }, {
            default: se(() => [
              i(s).modal.visible ? (u(), U(ht(i(s).modal.type), { key: 0 })) : L("", !0)
            ]),
            _: 1
          })
        ])),
        N(Wu, { items: i(Wn) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (u(), U(i(oo), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : L("", !0)
      ], 2)
    ], 46, zv));
  }
}), Uv = /* @__PURE__ */ te({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => Wn },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onNotify: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {},
    customUploader: {}
  },
  setup(n) {
    const e = n, t = e.id ?? Je(Ot);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const o = Po(e, Je("VueFinderOptions") || {});
    ie(
      () => e.config,
      (l) => {
        if (l) {
          const r = {};
          for (const d in l) {
            const c = i(l[d]);
            c !== void 0 && (r[d] = c);
          }
          o.config.init(r);
        }
      },
      { deep: !0, immediate: !0 }
    ), ie(
      () => e.locale,
      (l) => {
        l && o.i18n.localeAtom && o.i18n.localeAtom.get() !== l && o.i18n.localeAtom.set(l);
      },
      { immediate: !0 }
    ), uo(t, o), Mt(Ot, t);
    const s = to();
    return Mt(Cn, s["modal-header"]), Mt(Fn, s["modal-header-actions"]), gn(() => {
      vo(t);
    }), (l, r) => (u(), U(Rv, Ke(je(e)), {
      icon: se((d) => [
        xe(l.$slots, "icon", Ke(je(d)))
      ]),
      "status-bar": se((d) => [
        xe(l.$slots, "status-bar", Ke(je(d)))
      ]),
      _: 3
    }, 16));
  }
});
function af(n) {
  const e = ee(n), t = (s) => s || e.fs.path.get().path || "", o = (s) => {
    Array.isArray(s.files) && e.fs.setFiles(s.files);
  };
  return {
    async refresh() {
      const s = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(s), await e.adapter.open(s);
    },
    async open(s) {
      await e.adapter.open(s);
    },
    preview(s) {
      const l = (e.fs.files.get() || []).find((r) => r.path === s);
      !l || l.type !== "file" || e.modal.open(ft, { storage: l.storage, item: l });
    },
    notify(s, l) {
      Qe(e, s, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    select(s) {
      const l = new Set((e.fs.files.get() || []).map((d) => d.path)), r = (s || []).filter((d) => l.has(d));
      e.fs.setSelection(r);
    },
    selectOne(s) {
      new Set((e.fs.files.get() || []).map((r) => r.path)).has(s) && e.fs.setSelection([s]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((s) => s.path);
    },
    async createFolder(s, l) {
      const r = await e.adapter.createFolder({ path: t(l), name: s });
      o(r);
    },
    async createFile(s, l) {
      const r = await e.adapter.createFile({ path: t(l), name: s });
      o(r);
    },
    async delete(s, l) {
      const r = t(l), d = new Map(
        (e.fs.files.get() || []).map((p) => [p.path, p])
      ), c = (s || []).map((p) => d.get(p)).filter((p) => !!p).map((p) => ({ path: p.path, type: p.type })), v = await e.adapter.delete({ path: r, items: c });
      o(v);
    },
    async rename(s, l, r) {
      const d = await e.adapter.rename({
        path: t(r),
        item: s,
        name: l
      });
      o(d);
    },
    async copy(s, l, r) {
      const d = await e.adapter.copy({
        path: t(r),
        sources: s,
        destination: l
      });
      o(d);
    },
    async move(s, l, r) {
      const d = await e.adapter.move({
        path: t(r),
        sources: s,
        destination: l
      });
      o(d);
    },
    getFiles() {
      return e.fs.files.get() || [];
    },
    getStorages() {
      return e.fs.storages.get() || [];
    },
    isLoading() {
      return e.fs.isLoading();
    },
    isReadOnly() {
      return e.fs.getReadOnly();
    }
  };
}
const rf = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Uv);
  }
};
export {
  So as ArrayDriver,
  Ut as BaseAdapter,
  be as ContextMenuIds,
  sf as IndexedDBDriver,
  Sn as RemoteDriver,
  Uv as VueFinder,
  rf as VueFinderPlugin,
  Uv as VueFinderProvider,
  Wn as contextMenuItems,
  po as createLocaleAtom,
  rf as default,
  rn as parseBackendError,
  af as useVueFinder
};
