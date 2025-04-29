/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.37.0.
 * Original file: /npm/@impactechs/janus-js@0.7.6/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(e) {
  if (e.__esModule) return e;
  var r = Object.defineProperty({}, "__esModule", { value: !0 });
  return (
    Object.keys(e).forEach(function (n) {
      var o = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(
        r,
        n,
        o.get
          ? o
          : {
              enumerable: !0,
              get: function () {
                return e[n];
              },
            }
      );
    }),
    r
  );
}
var r = {},
  n = {};
(t.sessions = {}),
  (t.isExtensionEnabled = function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
      return !0;
    if (window.navigator.userAgent.match("Chrome")) {
      var e = parseInt(
          window.navigator.userAgent.match(/Chrome\/(.*) /)[1],
          10
        ),
        r = 33;
      return (
        window.navigator.userAgent.match("Linux") && (r = 35),
        (e >= 26 && e <= r) || t.extension.isInstalled()
      );
    }
    return !0;
  });
var o = {
  extensionId: "hapfgfdkleiggjjpfpenajgdnfckjpaj",
  isInstalled: function () {
    return null !== document.querySelector("#janus-extension-installed");
  },
  getScreen: function (e) {
    var r = window.setTimeout(function () {
      var r = new Error("NavigatorUserMediaError");
      return (
        (r.name =
          'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)'),
        e(r)
      );
    }, 1e3);
    (this.cache[r] = e),
      window.postMessage({ type: "janusGetScreen", id: r }, "*");
  },
  init: function () {
    var e = {};
    (this.cache = e),
      window.addEventListener("message", function (r) {
        if (r.origin == window.location.origin)
          if ("janusGotScreen" == r.data.type && e[r.data.id]) {
            var n = e[r.data.id];
            if ((delete e[r.data.id], "" === r.data.sourceId)) {
              var o = new Error("NavigatorUserMediaError");
              (o.name =
                "You cancelled the request for permission, giving up..."),
                n(o);
            } else n(null, r.data.sourceId);
          } else
            "janusGetScreenPending" == r.data.type &&
              (console.log("clearing ", r.data.id),
              window.clearTimeout(r.data.id));
      });
  },
};
function t(e) {
  if (
    (((e = e || {}).success =
      "function" == typeof e.success ? e.success : t.noop),
    (e.error = "function" == typeof e.error ? e.error : t.noop),
    (e.destroyed = "function" == typeof e.destroyed ? e.destroyed : t.noop),
    !t.initDone)
  )
    return e.error("Library not initialized"), {};
  if (!t.isWebrtcSupported())
    return e.error("WebRTC not supported by this browser"), {};
  if ((t.log("Library initialized: " + t.initDone), !e.server))
    return e.error("Invalid server url"), {};
  var r = !1,
    n = null,
    o = {},
    i = null,
    a = null,
    s = 0,
    d = e.server;
  t.isArray(d)
    ? (t.log(
        "Multiple servers provided (" +
          d.length +
          "), will use the first that works"
      ),
      (d = null),
      (a = e.server),
      t.debug(a))
    : 0 === d.indexOf("ws")
    ? ((r = !0), t.log("Using WebSockets to contact Janus: " + d))
    : ((r = !1), t.log("Using REST API to contact Janus: " + d));
  var c = e.iceServers || [{ urls: "stun:stun.l.google.com:19302" }],
    l = e.iceTransportPolicy,
    u = e.bundlePolicy,
    f = !0 === e.ipv6,
    v = !1;
  void 0 !== e.withCredentials &&
    null !== e.withCredentials &&
    (v = !0 === e.withCredentials);
  var p = 10;
  void 0 !== e.max_poll_events &&
    null !== e.max_poll_events &&
    (p = e.max_poll_events),
    p < 1 && (p = 1);
  var g = null;
  void 0 !== e.token && null !== e.token && (g = e.token);
  var m = null;
  void 0 !== e.apisecret && null !== e.apisecret && (m = e.apisecret),
    (this.destroyOnUnload = !0),
    void 0 !== e.destroyOnUnload &&
      null !== e.destroyOnUnload &&
      (this.destroyOnUnload = !0 === e.destroyOnUnload);
  var b = 25e3;
  void 0 !== e.keepAlivePeriod &&
    null !== e.keepAlivePeriod &&
    (b = e.keepAlivePeriod),
    isNaN(b) && (b = 25e3);
  var h = 6e4;
  function w(e) {
    var r = { high: 9e5, medium: 3e5, low: 1e5 };
    return (
      null != e &&
        (e.high && (r.high = e.high),
        e.medium && (r.medium = e.medium),
        e.low && (r.low = e.low)),
      r
    );
  }
  void 0 !== e.longPollTimeout &&
    null !== e.longPollTimeout &&
    (h = e.longPollTimeout),
    isNaN(h) && (h = 6e4);
  var S = !1,
    y = null,
    k = {},
    T = this,
    C = 0,
    A = {};
  function D() {
    if (null != y)
      if ((t.debug("Long poll..."), S)) {
        var r = d + "/" + y + "?rid=" + new Date().getTime();
        p && (r = r + "&maxev=" + p),
          g && (r = r + "&token=" + encodeURIComponent(g)),
          m && (r = r + "&apisecret=" + encodeURIComponent(m)),
          t.httpAPICall(r, {
            verb: "GET",
            withCredentials: v,
            success: R,
            timeout: h,
            error: function (r, n) {
              if ((t.error(r + ":", n), ++C > 3))
                return (
                  (S = !1),
                  void e.error("Lost connection to the server (is it down?)")
                );
              D();
            },
          });
      } else t.warn("Is the server down? (connected=false)");
  }
  function R(e, o) {
    if (((C = 0), r || null == y || !0 === o || D(), r || !t.isArray(e)))
      if ("keepalive" !== e.janus)
        if ("server_info" !== e.janus)
          if ("ack" !== e.janus)
            if ("success" !== e.janus)
              if ("trickle" === e.janus) {
                if (!(c = e.sender)) return void t.warn("Missing sender...");
                if (!(u = k[c]))
                  return void t.debug(
                    "This handle is not attached to this session"
                  );
                var i = e.candidate;
                t.debug("Got a trickled candidate on session " + y), t.debug(i);
                var a = u.webrtcStuff;
                a.pc && a.remoteSdp
                  ? (t.debug("Adding remote candidate:", i),
                    i && !0 !== i.completed
                      ? a.pc.addIceCandidate(i)
                      : a.pc.addIceCandidate(t.endOfCandidates))
                  : (t.debug(
                      "We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate"
                    ),
                    a.candidates || (a.candidates = []),
                    a.candidates.push(i),
                    t.debug(a.candidates));
              } else {
                if ("webrtcup" === e.janus)
                  return (
                    t.debug("Got a webrtcup event on session " + y),
                    t.debug(e),
                    (c = e.sender)
                      ? (u = k[c])
                        ? void u.webrtcState(!0)
                        : void t.debug(
                            "This handle is not attached to this session"
                          )
                      : void t.warn("Missing sender...")
                  );
                if ("hangup" === e.janus) {
                  if (
                    (t.debug("Got a hangup event on session " + y),
                    t.debug(e),
                    !(c = e.sender))
                  )
                    return void t.warn("Missing sender...");
                  if (!(u = k[c]))
                    return void t.debug(
                      "This handle is not attached to this session"
                    );
                  u.webrtcState(!1, e.reason), u.hangup();
                } else if ("detached" === e.janus) {
                  if (
                    (t.debug("Got a detached event on session " + y),
                    t.debug(e),
                    !(c = e.sender))
                  )
                    return void t.warn("Missing sender...");
                  if (!(u = k[c])) return;
                  u.ondetached(), u.detach();
                } else if ("media" === e.janus) {
                  if (
                    (t.debug("Got a media event on session " + y),
                    t.debug(e),
                    !(c = e.sender))
                  )
                    return void t.warn("Missing sender...");
                  if (!(u = k[c]))
                    return void t.debug(
                      "This handle is not attached to this session"
                    );
                  u.mediaState(e.type, e.receiving);
                } else if ("slowlink" === e.janus) {
                  if (
                    (t.debug("Got a slowlink event on session " + y),
                    t.debug(e),
                    !(c = e.sender))
                  )
                    return void t.warn("Missing sender...");
                  if (!(u = k[c]))
                    return void t.debug(
                      "This handle is not attached to this session"
                    );
                  u.slowLink(e.uplink, e.lost);
                } else {
                  if ("error" === e.janus) {
                    var s, d;
                    if (
                      (t.error("Ooops: " + e.error.code + " " + e.error.reason),
                      t.debug(e),
                      (s = e.transaction))
                    )
                      (d = A[s]) && d(e), delete A[s];
                    return;
                  }
                  if ("event" === e.janus) {
                    var c;
                    if (
                      (t.debug("Got a plugin event on session " + y),
                      t.debug(e),
                      !(c = e.sender))
                    )
                      return void t.warn("Missing sender...");
                    var l = e.plugindata;
                    if (!l) return void t.warn("Missing plugindata...");
                    t.debug(
                      "  -- Event is coming from " + c + " (" + l.plugin + ")"
                    );
                    var u,
                      f = l.data;
                    if ((t.debug(f), !(u = k[c])))
                      return void t.warn(
                        "This handle is not attached to this session"
                      );
                    var v = e.jsep;
                    v && (t.debug("Handling SDP as well..."), t.debug(v));
                    var p = u.onmessage;
                    p
                      ? (t.debug("Notifying application..."), p(f, v))
                      : t.debug("No provided notification callback");
                  } else {
                    if ("timeout" === e.janus)
                      return (
                        t.error("Timeout on session " + y),
                        t.debug(e),
                        void (r && n.close(3504, "Gateway timeout"))
                      );
                    t.warn(
                      "Unknown message/event  '" + e.janus + "' on session " + y
                    ),
                      t.debug(e);
                  }
                }
              }
            else
              t.debug("Got a success on session " + y),
                t.debug(e),
                (s = e.transaction) && ((d = A[s]) && d(e), delete A[s]);
          else
            t.debug("Got an ack on session " + y),
              t.debug(e),
              (s = e.transaction) && ((d = A[s]) && d(e), delete A[s]);
        else
          t.debug("Got info on the Janus instance"),
            t.debug(e),
            (s = e.transaction) && ((d = A[s]) && d(e), delete A[s]);
      else t.vdebug("Got a keepalive on session " + y);
    else for (var g = 0; g < e.length; g++) R(e[g], !0);
  }
  function I() {
    if (d && r && S) {
      i = setTimeout(I, b);
      var e = {
        janus: "keepalive",
        session_id: y,
        transaction: t.randomString(12),
      };
      g && (e.token = g), m && (e.apisecret = m), n.send(JSON.stringify(e));
    }
  }
  function P(c) {
    var l = t.randomString(12),
      u = { janus: "create", transaction: l };
    if (
      (c.reconnect &&
        ((S = !1),
        (u.janus = "claim"),
        (u.session_id = y),
        n &&
          ((n.onopen = null),
          (n.onerror = null),
          (n.onclose = null),
          i && (clearTimeout(i), (i = null)))),
      g && (u.token = g),
      m && (u.apisecret = m),
      !d &&
        t.isArray(a) &&
        (0 === (d = a[s]).indexOf("ws")
          ? ((r = !0),
            t.log(
              "Server #" +
                (s + 1) +
                ": trying WebSockets to contact Janus (" +
                d +
                ")"
            ))
          : ((r = !1),
            t.log(
              "Server #" +
                (s + 1) +
                ": trying REST API to contact Janus (" +
                d +
                ")"
            ))),
      r)
    )
      for (var f in ((n = t.newWebSocket(d, "janus-protocol")),
      (o = {
        error: function () {
          if (
            (t.error("Error connecting to the Janus WebSockets server... " + d),
            t.isArray(a) && !c.reconnect)
          )
            return ++s === a.length
              ? void c.error(
                  "Error connecting to any of the provided Janus servers: Is the server down?"
                )
              : ((d = null),
                void setTimeout(function () {
                  P(c);
                }, 200));
          c.error(
            "Error connecting to the Janus WebSockets server: Is the server down?"
          );
        },
        open: function () {
          (A[l] = function (e) {
            if ((t.debug(e), "success" !== e.janus))
              return (
                t.error("Ooops: " + e.error.code + " " + e.error.reason),
                void c.error(e.error.reason)
              );
            (i = setTimeout(I, b)),
              (S = !0),
              (y = e.session_id ? e.session_id : e.data.id),
              c.reconnect
                ? t.log("Claimed session: " + y)
                : t.log("Created session: " + y),
              (t.sessions[y] = T),
              c.success();
          }),
            n.send(JSON.stringify(u));
        },
        message: function (e) {
          R(JSON.parse(e.data));
        },
        close: function () {
          d &&
            S &&
            ((S = !1), e.error("Lost connection to the server (is it down?)"));
        },
      })))
        n.addEventListener(f, o[f]);
    else
      t.httpAPICall(d, {
        verb: "POST",
        withCredentials: v,
        body: u,
        success: function (e) {
          if ((t.debug(e), "success" !== e.janus))
            return (
              t.error("Ooops: " + e.error.code + " " + e.error.reason),
              void c.error(e.error.reason)
            );
          (S = !0),
            (y = e.session_id ? e.session_id : e.data.id),
            c.reconnect
              ? t.log("Claimed session: " + y)
              : t.log("Created session: " + y),
            (t.sessions[y] = T),
            D(),
            c.success();
        },
        error: function (e, r) {
          if ((t.error(e + ":", r), t.isArray(a) && !c.reconnect))
            return ++s === a.length
              ? void c.error(
                  "Error connecting to any of the provided Janus servers: Is the server down?"
                )
              : ((d = null),
                void setTimeout(function () {
                  P(c);
                }, 200));
          "" === r
            ? c.error(e + ": Is the server down?")
            : c.error(e + ": " + r);
        },
      });
  }
  function V(e, o) {
    if (
      (((o = o || {}).success =
        "function" == typeof o.success ? o.success : t.noop),
      (o.error = "function" == typeof o.error ? o.error : t.noop),
      !S)
    )
      return (
        t.warn("Is the server down? (connected=false)"),
        void o.error("Is the server down? (connected=false)")
      );
    var i = k[e];
    if (!i || !i.webrtcStuff)
      return t.warn("Invalid handle"), void o.error("Invalid handle");
    var a = o.message,
      s = o.jsep,
      c = t.randomString(12),
      l = { janus: "message", body: a, transaction: c };
    if (
      (i.token && (l.token = i.token),
      m && (l.apisecret = m),
      s &&
        ((l.jsep = { type: s.type, sdp: s.sdp }),
        s.e2ee && (l.jsep.e2ee = !0),
        ("hml" !== s.rid_order && "lmh" !== s.rid_order) ||
          (l.jsep.rid_order = s.rid_order)),
      t.debug("Sending message to plugin (handle=" + e + "):"),
      t.debug(l),
      r)
    )
      return (
        (l.session_id = y),
        (l.handle_id = e),
        (A[c] = function (e) {
          if ((t.debug("Message sent!"), t.debug(e), "success" === e.janus)) {
            var r = e.plugindata;
            if (!r)
              return (
                t.warn("Request succeeded, but missing plugindata..."),
                void o.success()
              );
            t.log("Synchronous transaction successful (" + r.plugin + ")");
            var n = r.data;
            return t.debug(n), void o.success(n);
          }
          "ack" === e.janus
            ? o.success()
            : e.error
            ? (t.error("Ooops: " + e.error.code + " " + e.error.reason),
              o.error(e.error.code + " " + e.error.reason))
            : (t.error("Unknown error"), o.error("Unknown error"));
        }),
        void n.send(JSON.stringify(l))
      );
    t.httpAPICall(d + "/" + y + "/" + e, {
      verb: "POST",
      withCredentials: v,
      body: l,
      success: function (e) {
        if ((t.debug("Message sent!"), t.debug(e), "success" === e.janus)) {
          var r = e.plugindata;
          if (!r)
            return (
              t.warn("Request succeeded, but missing plugindata..."),
              void o.success()
            );
          t.log("Synchronous transaction successful (" + r.plugin + ")");
          var n = r.data;
          return t.debug(n), void o.success(n);
        }
        "ack" === e.janus
          ? o.success()
          : e.error
          ? (t.error("Ooops: " + e.error.code + " " + e.error.reason),
            o.error(e.error.code + " " + e.error.reason))
          : (t.error("Unknown error"), o.error("Unknown error"));
      },
      error: function (e, r) {
        t.error(e + ":", r), o.error(e + ": " + r);
      },
    });
  }
  function M(e, o) {
    if (S) {
      var i = k[e];
      if (i && i.webrtcStuff) {
        var a = {
          janus: "trickle",
          candidate: o,
          transaction: t.randomString(12),
        };
        if (
          (i.token && (a.token = i.token),
          m && (a.apisecret = m),
          t.vdebug("Sending trickle candidate (handle=" + e + "):"),
          t.vdebug(a),
          r)
        )
          return (
            (a.session_id = y),
            (a.handle_id = e),
            void n.send(JSON.stringify(a))
          );
        t.httpAPICall(d + "/" + y + "/" + e, {
          verb: "POST",
          withCredentials: v,
          body: a,
          success: function (e) {
            t.vdebug("Candidate sent!"),
              t.vdebug(e),
              "ack" === e.janus ||
                t.error("Ooops: " + e.error.code + " " + e.error.reason);
          },
          error: function (e, r) {
            t.error(e + ":", r);
          },
        });
      } else t.warn("Invalid handle");
    } else t.warn("Is the server down? (connected=false)");
  }
  function O(e, r, n, o, i) {
    var a = k[e];
    if (a && a.webrtcStuff) {
      var s = a.webrtcStuff;
      if (s.pc) {
        var d = function (e) {
          t.log("Received state change on data channel:", e);
          var r = e.target.label,
            n = e.target.protocol,
            o = s.dataChannel[r] ? s.dataChannel[r].readyState : "null";
          if (
            (t.log("State change on <" + r + "> data channel: " + o),
            "open" === o)
          ) {
            if (
              s.dataChannel[r].pending &&
              s.dataChannel[r].pending.length > 0
            ) {
              for (var i of (t.log(
                "Sending pending messages on <" + r + ">:",
                s.dataChannel[r].pending.length
              ),
              s.dataChannel[r].pending))
                t.log("Sending data on data channel <" + r + ">"),
                  t.debug(i),
                  s.dataChannel[r].send(i);
              s.dataChannel[r].pending = [];
            }
            a.ondataopen(r, n);
          }
        };
        if (o) s.dataChannel[r] = o;
        else {
          var c = { ordered: !0 };
          n && (c.protocol = n),
            (s.dataChannel[r] = s.pc.createDataChannel(r, c));
        }
        (s.dataChannel[r].onmessage = function (e) {
          t.log("Received message on data channel:", e);
          var r = e.target.label;
          a.ondata(e.data, r);
        }),
          (s.dataChannel[r].onopen = d),
          (s.dataChannel[r].onclose = d),
          (s.dataChannel[r].onerror = function (e) {
            t.error("Got error on data channel:", e);
          }),
          (s.dataChannel[r].pending = []),
          i && s.dataChannel[r].pending.push(i);
      } else t.warn("Invalid PeerConnection");
    } else t.warn("Invalid handle");
  }
  function j(e, r) {
    ((r = r || {}).success =
      "function" == typeof r.success ? r.success : t.noop),
      (r.error = "function" == typeof r.error ? r.error : t.noop);
    var n = k[e];
    if (!n || !n.webrtcStuff)
      return t.warn("Invalid handle"), void r.error("Invalid handle");
    var o = n.webrtcStuff,
      i = r.text || r.data;
    if (!i) return t.warn("Invalid data"), void r.error("Invalid data");
    var a = r.label ? r.label : t.dataChanDefaultLabel;
    return o.dataChannel[a]
      ? "open" !== o.dataChannel[a].readyState
        ? (o.dataChannel[a].pending.push(i), void r.success())
        : (t.log("Sending data on data channel <" + a + ">"),
          t.debug(i),
          o.dataChannel[a].send(i),
          void r.success())
      : (O(e, a, r.protocol, !1, i, r.protocol), void r.success());
  }
  function x(e, r) {
    ((r = r || {}).success =
      "function" == typeof r.success ? r.success : t.noop),
      (r.error = "function" == typeof r.error ? r.error : t.noop);
    var n = k[e];
    if (!n || !n.webrtcStuff)
      return t.warn("Invalid handle"), void r.error("Invalid handle");
    var o = n.webrtcStuff;
    if (!o.dtmfSender) {
      if (o.pc) {
        var i = o.pc.getSenders().find(function (e) {
          return e.track && "audio" === e.track.kind;
        });
        if (!i)
          return (
            t.warn("Invalid DTMF configuration (no audio track)"),
            void r.error("Invalid DTMF configuration (no audio track)")
          );
        (o.dtmfSender = i.dtmf),
          o.dtmfSender &&
            (t.log("Created DTMF Sender"),
            (o.dtmfSender.ontonechange = function (e) {
              t.debug("Sent DTMF tone: " + e.tone);
            }));
      }
      if (!o.dtmfSender)
        return (
          t.warn("Invalid DTMF configuration"),
          void r.error("Invalid DTMF configuration")
        );
    }
    var a = r.dtmf;
    if (!a)
      return (
        t.warn("Invalid DTMF parameters"),
        void r.error("Invalid DTMF parameters")
      );
    var s = a.tones;
    if (!s)
      return t.warn("Invalid DTMF string"), void r.error("Invalid DTMF string");
    var d = "number" == typeof a.duration ? a.duration : 500,
      c = "number" == typeof a.gap ? a.gap : 50;
    t.debug(
      "Sending DTMF string " + s + " (duration " + d + "ms, gap " + c + "ms)"
    ),
      o.dtmfSender.insertDTMF(s, d, c),
      r.success();
  }
  function E(e, o) {
    ((o = o || {}).success =
      "function" == typeof o.success ? o.success : t.noop),
      (o.error = "function" == typeof o.error ? o.error : t.noop);
    var i = !0 === o.noRequest;
    t.log("Destroying handle " + e + " (only-locally=" + i + ")"), G(e);
    var a = k[e];
    if (!a || a.detached) return delete k[e], void o.success();
    if (((a.detached = !0), i)) return delete k[e], void o.success();
    if (!S)
      return (
        t.warn("Is the server down? (connected=false)"),
        void o.error("Is the server down? (connected=false)")
      );
    var s = { janus: "detach", transaction: t.randomString(12) };
    if ((a.token && (s.token = a.token), m && (s.apisecret = m), r))
      return (
        (s.session_id = y),
        (s.handle_id = e),
        n.send(JSON.stringify(s)),
        delete k[e],
        void o.success()
      );
    t.httpAPICall(d + "/" + y + "/" + e, {
      verb: "POST",
      withCredentials: v,
      body: s,
      success: function (r) {
        t.log("Destroyed handle:"),
          t.debug(r),
          "success" !== r.janus &&
            t.error("Ooops: " + r.error.code + " " + r.error.reason),
          delete k[e],
          o.success();
      },
      error: function (r, n) {
        t.error(r + ":", n), delete k[e], o.success();
      },
    });
  }
  function _(e, r, n, o, i) {
    var a = k[e];
    if (!a || !a.webrtcStuff)
      return (
        t.warn("Invalid handle"),
        o.stream || t.stopAllTracks(i),
        void o.error("Invalid handle")
      );
    var s = a.webrtcStuff;
    t.debug("streamsDone:", i),
      i &&
        (t.debug("  -- Audio tracks:", i.getAudioTracks()),
        t.debug("  -- Video tracks:", i.getVideoTracks()));
    var d = !1;
    if (
      s.myStream &&
      n.update &&
      (!s.streamExternal || n.replaceAudio || n.replaceVideo)
    ) {
      if (
        ((!n.update && z(n)) || (n.update && (n.addAudio || n.replaceAudio))) &&
        i.getAudioTracks() &&
        i.getAudioTracks().length
      )
        if ((s.myStream.addTrack(i.getAudioTracks()[0]), t.unifiedPlan)) {
          t.log(
            (n.replaceAudio ? "Replacing" : "Adding") + " audio track:",
            i.getAudioTracks()[0]
          );
          var v = null;
          if ((g = s.pc.getTransceivers()) && g.length > 0)
            for (var p of g)
              if (
                (p.sender &&
                  p.sender.track &&
                  "audio" === p.sender.track.kind) ||
                (p.receiver &&
                  p.receiver.track &&
                  "audio" === p.receiver.track.kind)
              ) {
                v = p;
                break;
              }
          v && v.sender
            ? v.sender.replaceTrack(i.getAudioTracks()[0])
            : s.pc.addTrack(i.getAudioTracks()[0], i);
        } else
          t.log(
            (n.replaceAudio ? "Replacing" : "Adding") + " audio track:",
            i.getAudioTracks()[0]
          ),
            s.pc.addTrack(i.getAudioTracks()[0], i);
      if (
        ((!n.update && H(n)) || (n.update && (n.addVideo || n.replaceVideo))) &&
        i.getVideoTracks() &&
        i.getVideoTracks().length
      )
        if ((s.myStream.addTrack(i.getVideoTracks()[0]), t.unifiedPlan)) {
          t.log(
            (n.replaceVideo ? "Replacing" : "Adding") + " video track:",
            i.getVideoTracks()[0]
          );
          var g,
            m = null;
          if ((g = s.pc.getTransceivers()) && g.length > 0)
            for (var p of g)
              if (
                (p.sender &&
                  p.sender.track &&
                  "video" === p.sender.track.kind) ||
                (p.receiver &&
                  p.receiver.track &&
                  "video" === p.receiver.track.kind)
              ) {
                m = p;
                break;
              }
          m && m.sender
            ? m.sender.replaceTrack(i.getVideoTracks()[0])
            : s.pc.addTrack(i.getVideoTracks()[0], i);
        } else
          t.log(
            (n.replaceVideo ? "Replacing" : "Adding") + " video track:",
            i.getVideoTracks()[0]
          ),
            s.pc.addTrack(i.getVideoTracks()[0], i);
    } else (s.myStream = i), (d = !0);
    if (!s.pc) {
      var b = { iceServers: c, iceTransportPolicy: l, bundlePolicy: u };
      "chrome" === t.webRTCAdapter.browserDetails.browser &&
        (b.sdpSemantics =
          t.webRTCAdapter.browserDetails.version < 72
            ? "plan-b"
            : "unified-plan");
      var h = { optional: [{ DtlsSrtpKeyAgreement: !0 }] };
      if (
        (f && h.optional.push({ googIPv6: !0 }),
        o.rtcConstraints && "object" == typeof o.rtcConstraints)
      )
        for (var S in (t.debug(
          "Adding custom PeerConnection constraints:",
          o.rtcConstraints
        ),
        o.rtcConstraints))
          h.optional.push(o.rtcConstraints[S]);
      "edge" === t.webRTCAdapter.browserDetails.browser &&
        (b.bundlePolicy = "max-bundle"),
        RTCRtpSender &&
          (RTCRtpSender.prototype.createEncodedStreams ||
            (RTCRtpSender.prototype.createEncodedAudioStreams &&
              RTCRtpSender.prototype.createEncodedVideoStreams)) &&
          (o.senderTransforms || o.receiverTransforms) &&
          ((s.senderTransforms = o.senderTransforms),
          (s.receiverTransforms = o.receiverTransforms),
          (b.forceEncodedAudioInsertableStreams = !0),
          (b.forceEncodedVideoInsertableStreams = !0),
          (b.encodedInsertableStreams = !0)),
        t.log("Creating PeerConnection"),
        t.debug(h),
        (s.pc = new RTCPeerConnection(b, h)),
        t.debug(s.pc),
        s.pc.getStats && ((s.volume = {}), (s.bitrate.value = "0 kbits/sec")),
        t.log(
          "Preparing local SDP and gathering candidates (trickle=" +
            s.trickle +
            ")"
        ),
        (s.pc.oniceconnectionstatechange = function (e) {
          s.pc && a.iceState(s.pc.iceConnectionState);
        }),
        (s.pc.onicecandidate = function (r) {
          if (
            !r.candidate ||
            ("edge" === t.webRTCAdapter.browserDetails.browser &&
              r.candidate.candidate.indexOf("endOfCandidates") > 0)
          )
            t.log("End of candidates."),
              (s.iceDone = !0),
              !0 === s.trickle
                ? M(e, { completed: !0 })
                : (function (e, r) {
                    (r = r || {}),
                      (r.success =
                        "function" == typeof r.success ? r.success : t.noop),
                      (r.error =
                        "function" == typeof r.error ? r.error : t.noop);
                    var n = k[e];
                    if (!n || !n.webrtcStuff)
                      return void t.warn(
                        "Invalid handle, not sending anything"
                      );
                    var o = n.webrtcStuff;
                    if ((t.log("Sending offer/answer SDP..."), !o.mySdp))
                      return void t.warn(
                        "Local SDP instance is invalid, not sending anything..."
                      );
                    (o.mySdp = {
                      type: o.pc.localDescription.type,
                      sdp: o.pc.localDescription.sdp,
                    }),
                      !1 === o.trickle && (o.mySdp.trickle = !1);
                    t.debug(r), (o.sdpSent = !0), r.success(o.mySdp);
                  })(e, o);
          else {
            var n = {
              candidate: r.candidate.candidate,
              sdpMid: r.candidate.sdpMid,
              sdpMLineIndex: r.candidate.sdpMLineIndex,
            };
            !0 === s.trickle && M(e, n);
          }
        }),
        (s.pc.ontrack = function (e) {
          if (
            (t.log("Handling Remote Track"),
            t.debug(e),
            e.streams &&
              ((s.remoteStream = e.streams[0]),
              a.onremotestream(s.remoteStream),
              !e.track.onended))
          ) {
            if (s.receiverTransforms) {
              var r = null;
              RTCRtpSender.prototype.createEncodedStreams
                ? (r = e.receiver.createEncodedStreams())
                : (RTCRtpSender.prototype.createAudioEncodedStreams ||
                    RTCRtpSender.prototype.createEncodedVideoStreams) &&
                  ("audio" === e.track.kind && s.receiverTransforms.audio
                    ? (r = e.receiver.createEncodedAudioStreams())
                    : "video" === e.track.kind &&
                      s.receiverTransforms.video &&
                      (r = e.receiver.createEncodedVideoStreams())),
                r &&
                  (console.log(r),
                  r.readableStream && r.writableStream
                    ? r.readableStream
                        .pipeThrough(s.receiverTransforms[e.track.kind])
                        .pipeTo(r.writableStream)
                    : r.readable &&
                      r.writable &&
                      r.readable
                        .pipeThrough(s.receiverTransforms[e.track.kind])
                        .pipeTo(r.writable));
            }
            var n = null;
            t.log("Adding onended callback to track:", e.track),
              (e.track.onended = function (e) {
                t.log("Remote track removed:", e),
                  s.remoteStream &&
                    (clearTimeout(n),
                    s.remoteStream.removeTrack(e.target),
                    a.onremotestream(s.remoteStream));
              }),
              (e.track.onmute = function (e) {
                t.log("Remote track muted:", e),
                  s.remoteStream &&
                    null == n &&
                    (n = setTimeout(function () {
                      t.log("Removing remote track"),
                        s.remoteStream &&
                          (s.remoteStream.removeTrack(e.target),
                          a.onremotestream(s.remoteStream)),
                        (n = null);
                    }, 2520));
              }),
              (e.track.onunmute = function (e) {
                if ((t.log("Remote track flowing again:", e), null != n))
                  clearTimeout(n), (n = null);
                else
                  try {
                    s.remoteStream.addTrack(e.target),
                      a.onremotestream(s.remoteStream);
                  } catch (e) {
                    t.error(e);
                  }
              });
          }
        });
    }
    if (d && i) {
      t.log("Adding local stream");
      var y = !0 === o.simulcast2;
      i.getTracks().forEach(function (e) {
        t.log("Adding local track:", e);
        var r = null;
        if (y && "audio" !== e.kind) {
          t.log("Enabling rid-based simulcasting:", e);
          var n = w(o.simulcastMaxBitrates),
            a = s.pc.addTransceiver(e, {
              direction: "sendrecv",
              streams: [i],
              sendEncodings: o.sendEncodings || [
                { rid: "h", active: !0, maxBitrate: n.high },
                {
                  rid: "m",
                  active: !0,
                  maxBitrate: n.medium,
                  scaleResolutionDownBy: 2,
                },
                {
                  rid: "l",
                  active: !0,
                  maxBitrate: n.low,
                  scaleResolutionDownBy: 4,
                },
              ],
            });
          a && (r = a.sender);
        } else r = s.pc.addTrack(e, i);
        if (r && s.senderTransforms) {
          var d = null;
          RTCRtpSender.prototype.createEncodedStreams
            ? (d = r.createEncodedStreams())
            : (RTCRtpSender.prototype.createAudioEncodedStreams ||
                RTCRtpSender.prototype.createEncodedVideoStreams) &&
              ("audio" === r.track.kind && s.senderTransforms.audio
                ? (d = r.createEncodedAudioStreams())
                : "video" === r.track.kind &&
                  s.senderTransforms.video &&
                  (d = r.createEncodedVideoStreams())),
            d &&
              (console.log(d),
              d.readableStream && d.writableStream
                ? d.readableStream
                    .pipeThrough(s.senderTransforms[r.track.kind])
                    .pipeTo(d.writableStream)
                : d.readable &&
                  d.writable &&
                  d.readable
                    .pipeThrough(s.senderTransforms[r.track.kind])
                    .pipeTo(d.writable));
        }
      });
    }
    (function (e) {
      if (
        (t.debug("isDataEnabled:", e),
        "edge" === t.webRTCAdapter.browserDetails.browser)
      )
        return t.warn("Edge doesn't support data channels yet"), !1;
      return null != e && !0 === e.data;
    })(n) &&
      !s.dataChannel[t.dataChanDefaultLabel] &&
      (t.log("Creating default data channel"),
      O(e, t.dataChanDefaultLabel, null, !1),
      (s.pc.ondatachannel = function (r) {
        t.log("Data channel created by Janus:", r),
          O(e, r.channel.label, r.channel.protocol, r.channel);
      })),
      s.myStream && a.onlocalstream(s.myStream),
      r
        ? s.pc.setRemoteDescription(r).then(function () {
            if (
              (t.log("Remote description accepted!"),
              (s.remoteSdp = r.sdp),
              s.candidates && s.candidates.length > 0)
            ) {
              for (var i = 0; i < s.candidates.length; i++) {
                var a = s.candidates[i];
                t.debug("Adding remote candidate:", a),
                  a && !0 !== a.completed
                    ? s.pc.addIceCandidate(a)
                    : s.pc.addIceCandidate(t.endOfCandidates);
              }
              s.candidates = [];
            }
            !(function (e, r, n) {
              (n = n || {}),
                (n.success =
                  "function" == typeof n.success ? n.success : t.noop),
                (n.error = "function" == typeof n.error ? n.error : t.noop),
                (n.customizeSdp =
                  "function" == typeof n.customizeSdp
                    ? n.customizeSdp
                    : t.noop);
              var o = k[e];
              if (!o || !o.webrtcStuff)
                return t.warn("Invalid handle"), void n.error("Invalid handle");
              var i = o.webrtcStuff,
                a = !0 === n.simulcast;
              a
                ? t.log(
                    "Creating answer (iceDone=" +
                      i.iceDone +
                      ", simulcast=" +
                      a +
                      ")"
                  )
                : t.log("Creating answer (iceDone=" + i.iceDone + ")");
              var s = null;
              if (t.unifiedPlan) {
                s = {};
                var d = null,
                  c = null,
                  l = i.pc.getTransceivers();
                if (l && l.length > 0)
                  for (var u of l)
                    (u.sender &&
                      u.sender.track &&
                      "audio" === u.sender.track.kind) ||
                    (u.receiver &&
                      u.receiver.track &&
                      "audio" === u.receiver.track.kind)
                      ? d || (d = u)
                      : ((u.sender &&
                          u.sender.track &&
                          "video" === u.sender.track.kind) ||
                          (u.receiver &&
                            u.receiver.track &&
                            "video" === u.receiver.track.kind)) &&
                        (c || (c = u));
                var f = z(r),
                  v = q(r);
                if (f || v) {
                  if (f && v) {
                    if (d)
                      try {
                        d.setDirection
                          ? d.setDirection("sendrecv")
                          : (d.direction = "sendrecv"),
                          t.log("Setting audio transceiver to sendrecv:", d);
                      } catch (e) {
                        t.error(e);
                      }
                  } else if (f && !v)
                    try {
                      d &&
                        (d.setDirection
                          ? d.setDirection("sendonly")
                          : (d.direction = "sendonly"),
                        t.log("Setting audio transceiver to sendonly:", d));
                    } catch (e) {
                      t.error(e);
                    }
                  else if (!f && v)
                    if (d)
                      try {
                        d.setDirection
                          ? d.setDirection("recvonly")
                          : (d.direction = "recvonly"),
                          t.log("Setting audio transceiver to recvonly:", d);
                      } catch (e) {
                        t.error(e);
                      }
                    else
                      (d = i.pc.addTransceiver("audio", {
                        direction: "recvonly",
                      })),
                        t.log("Adding recvonly audio transceiver:", d);
                } else if (r.removeAudio && d)
                  try {
                    d.setDirection
                      ? d.setDirection("inactive")
                      : (d.direction = "inactive"),
                      t.log("Setting audio transceiver to inactive:", d);
                  } catch (e) {
                    t.error(e);
                  }
                var p = H(r),
                  g = Q(r);
                if (p || g) {
                  if (p && g) {
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("sendrecv")
                          : (c.direction = "sendrecv"),
                          t.log("Setting video transceiver to sendrecv:", c);
                      } catch (e) {
                        t.error(e);
                      }
                  } else if (p && !g) {
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("sendonly")
                          : (c.direction = "sendonly"),
                          t.log("Setting video transceiver to sendonly:", c);
                      } catch (e) {
                        t.error(e);
                      }
                  } else if (!p && g)
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("recvonly")
                          : (c.direction = "recvonly"),
                          t.log("Setting video transceiver to recvonly:", c);
                      } catch (e) {
                        t.error(e);
                      }
                    else
                      (c = i.pc.addTransceiver("video", {
                        direction: "recvonly",
                      })),
                        t.log("Adding recvonly video transceiver:", c);
                } else if (r.removeVideo && c)
                  try {
                    c.setDirection
                      ? c.setDirection("inactive")
                      : (c.direction = "inactive"),
                      t.log("Setting video transceiver to inactive:", c);
                  } catch (e) {
                    t.error(e);
                  }
              } else s = "firefox" === t.webRTCAdapter.browserDetails.browser || "edge" === t.webRTCAdapter.browserDetails.browser ? { offerToReceiveAudio: q(r), offerToReceiveVideo: Q(r) } : { mandatory: { OfferToReceiveAudio: q(r), OfferToReceiveVideo: Q(r) } };
              t.debug(s);
              var m = H(r);
              if (
                m &&
                a &&
                "firefox" === t.webRTCAdapter.browserDetails.browser
              ) {
                t.log("Enabling Simulcasting for Firefox (RID)");
                var b = i.pc.getSenders()[1];
                t.log(b);
                var h = b.getParameters();
                t.log(h);
                var S = w(n.simulcastMaxBitrates);
                b.setParameters({
                  encodings: n.sendEncodings || [
                    { rid: "h", active: !0, maxBitrate: S.high },
                    {
                      rid: "m",
                      active: !0,
                      maxBitrate: S.medium,
                      scaleResolutionDownBy: 2,
                    },
                    {
                      rid: "l",
                      active: !0,
                      maxBitrate: S.low,
                      scaleResolutionDownBy: 4,
                    },
                  ],
                });
              }
              i.pc.createAnswer(s).then(function (e) {
                t.debug(e);
                var r = { type: e.type, sdp: e.sdp };
                n.customizeSdp(r),
                  (e.sdp = r.sdp),
                  t.log("Setting local description"),
                  m &&
                    a &&
                    ("chrome" === t.webRTCAdapter.browserDetails.browser
                      ? t.warn(
                          "simulcast=true, but this is an answer, and video breaks in Chrome if we enable it"
                        )
                      : "firefox" !== t.webRTCAdapter.browserDetails.browser &&
                        t.warn(
                          "simulcast=true, but this is not Chrome nor Firefox, ignoring"
                        )),
                  (i.mySdp = { type: "answer", sdp: e.sdp }),
                  i.pc.setLocalDescription(e).catch(n.error),
                  (i.mediaConstraints = s),
                  i.iceDone || i.trickle
                    ? ((i.senderTransforms || i.receiverTransforms) &&
                        (e.e2ee = !0),
                      n.success(e))
                    : t.log("Waiting for all candidates...");
              }, n.error);
            })(e, n, o);
          }, o.error)
        : (function (e, r, n) {
            (n = n || {}),
              (n.success = "function" == typeof n.success ? n.success : t.noop),
              (n.error = "function" == typeof n.error ? n.error : t.noop),
              (n.customizeSdp =
                "function" == typeof n.customizeSdp ? n.customizeSdp : t.noop);
            var o = k[e];
            if (!o || !o.webrtcStuff)
              return t.warn("Invalid handle"), void n.error("Invalid handle");
            var i = o.webrtcStuff,
              a = !0 === n.simulcast;
            a
              ? t.log(
                  "Creating offer (iceDone=" +
                    i.iceDone +
                    ", simulcast=" +
                    a +
                    ")"
                )
              : t.log("Creating offer (iceDone=" + i.iceDone + ")");
            var s = {};
            if (t.unifiedPlan) {
              var d = null,
                c = null,
                l = i.pc.getTransceivers();
              if (l && l.length > 0)
                for (var u of l)
                  (u.sender &&
                    u.sender.track &&
                    "audio" === u.sender.track.kind) ||
                  (u.receiver &&
                    u.receiver.track &&
                    "audio" === u.receiver.track.kind)
                    ? d || (d = u)
                    : ((u.sender &&
                        u.sender.track &&
                        "video" === u.sender.track.kind) ||
                        (u.receiver &&
                          u.receiver.track &&
                          "video" === u.receiver.track.kind)) &&
                      (c || (c = u));
              var f = z(r),
                v = q(r);
              f || v
                ? f && v
                  ? d &&
                    (d.setDirection
                      ? d.setDirection("sendrecv")
                      : (d.direction = "sendrecv"),
                    t.log("Setting audio transceiver to sendrecv:", d))
                  : f && !v
                  ? d &&
                    (d.setDirection
                      ? d.setDirection("sendonly")
                      : (d.direction = "sendonly"),
                    t.log("Setting audio transceiver to sendonly:", d))
                  : !f &&
                    v &&
                    (d
                      ? (d.setDirection
                          ? d.setDirection("recvonly")
                          : (d.direction = "recvonly"),
                        t.log("Setting audio transceiver to recvonly:", d))
                      : ((d = i.pc.addTransceiver("audio", {
                          direction: "recvonly",
                        })),
                        t.log("Adding recvonly audio transceiver:", d)))
                : r.removeAudio &&
                  d &&
                  (d.setDirection
                    ? d.setDirection("inactive")
                    : (d.direction = "inactive"),
                  t.log("Setting audio transceiver to inactive:", d));
              var p = H(r),
                g = Q(r);
              p || g
                ? p && g
                  ? c &&
                    (c.setDirection
                      ? c.setDirection("sendrecv")
                      : (c.direction = "sendrecv"),
                    t.log("Setting video transceiver to sendrecv:", c))
                  : p && !g
                  ? c &&
                    (c.setDirection
                      ? c.setDirection("sendonly")
                      : (c.direction = "sendonly"),
                    t.log("Setting video transceiver to sendonly:", c))
                  : !p &&
                    g &&
                    (c
                      ? (c.setDirection
                          ? c.setDirection("recvonly")
                          : (c.direction = "recvonly"),
                        t.log("Setting video transceiver to recvonly:", c))
                      : ((c = i.pc.addTransceiver("video", {
                          direction: "recvonly",
                        })),
                        t.log("Adding recvonly video transceiver:", c)))
                : r.removeVideo &&
                  c &&
                  (c.setDirection
                    ? c.setDirection("inactive")
                    : (c.direction = "inactive"),
                  t.log("Setting video transceiver to inactive:", c));
            } else
              (s.offerToReceiveAudio = q(r)), (s.offerToReceiveVideo = Q(r));
            var m = !0 === n.iceRestart;
            m && (s.iceRestart = !0);
            t.debug(s);
            var b = H(r);
            if (
              b &&
              a &&
              "firefox" === t.webRTCAdapter.browserDetails.browser
            ) {
              t.log("Enabling Simulcasting for Firefox (RID)");
              var h = i.pc.getSenders().find(function (e) {
                return e.track && "video" === e.track.kind;
              });
              if (h) {
                var S = h.getParameters();
                S || (S = {});
                var y = w(n.simulcastMaxBitrates);
                (S.encodings = n.sendEncodings || [
                  { rid: "h", active: !0, maxBitrate: y.high },
                  {
                    rid: "m",
                    active: !0,
                    maxBitrate: y.medium,
                    scaleResolutionDownBy: 2,
                  },
                  {
                    rid: "l",
                    active: !0,
                    maxBitrate: y.low,
                    scaleResolutionDownBy: 4,
                  },
                ]),
                  h.setParameters(S);
              }
            }
            i.pc.createOffer(s).then(function (e) {
              t.debug(e);
              var r = { type: e.type, sdp: e.sdp };
              n.customizeSdp(r),
                (e.sdp = r.sdp),
                t.log("Setting local description"),
                b &&
                  a &&
                  ("chrome" === t.webRTCAdapter.browserDetails.browser ||
                  "safari" === t.webRTCAdapter.browserDetails.browser
                    ? (t.log("Enabling Simulcasting for Chrome (SDP munging)"),
                      (e.sdp = (function (e) {
                        for (
                          var r = e.split("\r\n"),
                            n = !1,
                            o = [-1],
                            i = [-1],
                            a = null,
                            s = null,
                            d = null,
                            c = null,
                            l = -1,
                            u = 0;
                          u < r.length;
                          u++
                        ) {
                          if ((v = r[u].match(/m=(\w+) */))) {
                            if ("video" === v[1]) {
                              if (!(o[0] < 0)) {
                                l = u;
                                break;
                              }
                              n = !0;
                            } else if (o[0] > -1) {
                              l = u;
                              break;
                            }
                          } else if (n) {
                            if (
                              r[u].match(/a=ssrc-group:SIM (\d+) (\d+) (\d+)/)
                            )
                              return (
                                t.warn(
                                  "The SDP already contains a SIM attribute, munging will be skipped"
                                ),
                                e
                              );
                            var f = r[u].match(/a=ssrc-group:FID (\d+) (\d+)/);
                            if (f)
                              (o[0] = f[1]), (i[0] = f[2]), r.splice(u, 1), u--;
                            else {
                              if (o[0]) {
                                if (
                                  ((g = r[u].match(
                                    "a=ssrc:" + o[0] + " cname:(.+)"
                                  )) && (a = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " msid:(.+)"
                                  )) && (s = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " mslabel:(.+)"
                                  )) && (d = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " label:(.+)"
                                  )) && (c = g[1]),
                                  0 === r[u].indexOf("a=ssrc:" + i[0]))
                                ) {
                                  r.splice(u, 1), u--;
                                  continue;
                                }
                                if (0 === r[u].indexOf("a=ssrc:" + o[0])) {
                                  r.splice(u, 1), u--;
                                  continue;
                                }
                              }
                              0 != r[u].length || (r.splice(u, 1), u--);
                            }
                          }
                        }
                        if (o[0] < 0) {
                          (l = -1), (n = !1);
                          for (u = 0; u < r.length; u++) {
                            var v;
                            if ((v = r[u].match(/m=(\w+) */))) {
                              if ("video" === v[1]) {
                                if (!(o[0] < 0)) {
                                  l = u;
                                  break;
                                }
                                n = !0;
                              } else if (o[0] > -1) {
                                l = u;
                                break;
                              }
                            } else if (n) {
                              if (o[0] < 0) {
                                var p = r[u].match(/a=ssrc:(\d+)/);
                                if (p) {
                                  (o[0] = p[1]), r.splice(u, 1), u--;
                                  continue;
                                }
                              } else {
                                var g;
                                if (
                                  ((g = r[u].match(
                                    "a=ssrc:" + o[0] + " cname:(.+)"
                                  )) && (a = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " msid:(.+)"
                                  )) && (s = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " mslabel:(.+)"
                                  )) && (d = g[1]),
                                  (g = r[u].match(
                                    "a=ssrc:" + o[0] + " label:(.+)"
                                  )) && (c = g[1]),
                                  0 === r[u].indexOf("a=ssrc:" + i[0]))
                                ) {
                                  r.splice(u, 1), u--;
                                  continue;
                                }
                                if (0 === r[u].indexOf("a=ssrc:" + o[0])) {
                                  r.splice(u, 1), u--;
                                  continue;
                                }
                              }
                              0 !== r[u].length || (r.splice(u, 1), u--);
                            }
                          }
                        }
                        if (o[0] < 0)
                          return (
                            t.warn(
                              "Couldn't find the video SSRC, simulcasting NOT enabled"
                            ),
                            e
                          );
                        l < 0 && (l = r.length);
                        (o[1] = Math.floor(4294967295 * Math.random())),
                          (o[2] = Math.floor(4294967295 * Math.random())),
                          (i[1] = Math.floor(4294967295 * Math.random())),
                          (i[2] = Math.floor(4294967295 * Math.random()));
                        for (u = 0; u < o.length; u++)
                          a &&
                            (r.splice(l, 0, "a=ssrc:" + o[u] + " cname:" + a),
                            l++),
                            s &&
                              (r.splice(l, 0, "a=ssrc:" + o[u] + " msid:" + s),
                              l++),
                            d &&
                              (r.splice(
                                l,
                                0,
                                "a=ssrc:" + o[u] + " mslabel:" + d
                              ),
                              l++),
                            c &&
                              (r.splice(l, 0, "a=ssrc:" + o[u] + " label:" + c),
                              l++),
                            a &&
                              (r.splice(l, 0, "a=ssrc:" + i[u] + " cname:" + a),
                              l++),
                            s &&
                              (r.splice(l, 0, "a=ssrc:" + i[u] + " msid:" + s),
                              l++),
                            d &&
                              (r.splice(
                                l,
                                0,
                                "a=ssrc:" + i[u] + " mslabel:" + d
                              ),
                              l++),
                            c &&
                              (r.splice(l, 0, "a=ssrc:" + i[u] + " label:" + c),
                              l++);
                        r.splice(l, 0, "a=ssrc-group:FID " + o[2] + " " + i[2]),
                          r.splice(
                            l,
                            0,
                            "a=ssrc-group:FID " + o[1] + " " + i[1]
                          ),
                          r.splice(
                            l,
                            0,
                            "a=ssrc-group:FID " + o[0] + " " + i[0]
                          ),
                          r.splice(
                            l,
                            0,
                            "a=ssrc-group:SIM " + o[0] + " " + o[1] + " " + o[2]
                          ),
                          (e = r.join("\r\n")).endsWith("\r\n") ||
                            (e += "\r\n");
                        return e;
                      })(e.sdp)))
                    : "firefox" !== t.webRTCAdapter.browserDetails.browser &&
                      t.warn(
                        "simulcast=true, but this is not Chrome nor Firefox, ignoring"
                      )),
                (i.mySdp = { type: "offer", sdp: e.sdp }),
                i.pc.setLocalDescription(e).catch(n.error),
                (i.mediaConstraints = s),
                i.iceDone || i.trickle
                  ? ((i.senderTransforms || i.receiverTransforms) &&
                      (e.e2ee = !0),
                    n.success(e))
                  : t.log("Waiting for all candidates...");
            }, n.error);
          })(e, n, o);
  }
  function L(e, r, n) {
    ((n = n || {}).success =
      "function" == typeof n.success ? n.success : t.noop),
      (n.error = "function" == typeof n.error ? n.error : B);
    var o = n.jsep;
    if (r && o)
      return (
        t.error("Provided a JSEP to a createOffer"),
        void n.error("Provided a JSEP to a createOffer")
      );
    if (!(r || (o && o.type && o.sdp)))
      return (
        t.error("A valid JSEP is required for createAnswer"),
        void n.error("A valid JSEP is required for createAnswer")
      );
    n.media =
      "object" == typeof n.media && n.media
        ? n.media
        : { audio: !0, video: !0 };
    var i = n.media,
      a = k[e];
    if (!a || !a.webrtcStuff)
      return t.warn("Invalid handle"), void n.error("Invalid handle");
    var s,
      d = a.webrtcStuff;
    if (
      ((d.trickle =
        ((s = n.trickle), t.debug("isTrickleEnabled:", s), !1 !== s)),
      d.pc)
    ) {
      if ((t.log("Updating existing media session"), (i.update = !0), n.stream))
        n.stream !== d.myStream &&
          t.log("Renegotiation involves a new external stream");
      else {
        if (i.addAudio) {
          if (
            ((i.keepAudio = !1),
            (i.replaceAudio = !1),
            (i.removeAudio = !1),
            (i.audioSend = !0),
            d.myStream &&
              d.myStream.getAudioTracks() &&
              d.myStream.getAudioTracks().length)
          )
            return (
              t.error("Can't add audio stream, there already is one"),
              void n.error("Can't add audio stream, there already is one")
            );
        } else
          i.removeAudio
            ? ((i.keepAudio = !1),
              (i.replaceAudio = !1),
              (i.addAudio = !1),
              (i.audioSend = !1))
            : i.replaceAudio &&
              ((i.keepAudio = !1),
              (i.addAudio = !1),
              (i.removeAudio = !1),
              (i.audioSend = !0));
        if (
          (d.myStream &&
          d.myStream.getAudioTracks() &&
          0 !== d.myStream.getAudioTracks().length
            ? !z(i) || i.removeAudio || i.replaceAudio || (i.keepAudio = !0)
            : (i.replaceAudio &&
                ((i.keepAudio = !1),
                (i.replaceAudio = !1),
                (i.addAudio = !0),
                (i.audioSend = !0)),
              z(i) && ((i.keepAudio = !1), (i.addAudio = !0))),
          i.addVideo)
        ) {
          if (
            ((i.keepVideo = !1),
            (i.replaceVideo = !1),
            (i.removeVideo = !1),
            (i.videoSend = !0),
            d.myStream &&
              d.myStream.getVideoTracks() &&
              d.myStream.getVideoTracks().length)
          )
            return (
              t.error("Can't add video stream, there already is one"),
              void n.error("Can't add video stream, there already is one")
            );
        } else
          i.removeVideo
            ? ((i.keepVideo = !1),
              (i.replaceVideo = !1),
              (i.addVideo = !1),
              (i.videoSend = !1))
            : i.replaceVideo &&
              ((i.keepVideo = !1),
              (i.addVideo = !1),
              (i.removeVideo = !1),
              (i.videoSend = !0));
        d.myStream &&
        d.myStream.getVideoTracks() &&
        0 !== d.myStream.getVideoTracks().length
          ? !H(i) || i.removeVideo || i.replaceVideo || (i.keepVideo = !0)
          : (i.replaceVideo &&
              ((i.keepVideo = !1),
              (i.replaceVideo = !1),
              (i.addVideo = !0),
              (i.videoSend = !0)),
            H(i) && ((i.keepVideo = !1), (i.addVideo = !0))),
          i.addData && (i.data = !0);
      }
      if (z(i) && i.keepAudio && H(i) && i.keepVideo)
        return a.consentDialog(!1), void _(e, o, i, n, d.myStream);
    } else (i.update = !1), (i.keepAudio = !1), (i.keepVideo = !1);
    if (
      i.update &&
      (!d.streamExternal ||
        (d.streamExternal && (i.replaceAudio || i.replaceVideo)))
    ) {
      if (i.removeAudio || i.replaceAudio) {
        if (
          d.myStream &&
          d.myStream.getAudioTracks() &&
          d.myStream.getAudioTracks().length
        ) {
          var c = d.myStream.getAudioTracks()[0];
          t.log("Removing audio track:", c), d.myStream.removeTrack(c);
          try {
            c.stop();
          } catch (R) {}
        }
        if (d.pc.getSenders() && d.pc.getSenders().length) {
          var l = !0;
          if ((i.replaceAudio && t.unifiedPlan && (l = !1), l))
            for (var u of d.pc.getSenders())
              u &&
                u.track &&
                "audio" === u.track.kind &&
                (t.log("Removing audio sender:", u), d.pc.removeTrack(u));
        }
      }
      if (i.removeVideo || i.replaceVideo) {
        if (
          d.myStream &&
          d.myStream.getVideoTracks() &&
          d.myStream.getVideoTracks().length
        ) {
          var f = d.myStream.getVideoTracks()[0];
          t.log("Removing video track:", f), d.myStream.removeTrack(f);
          try {
            f.stop();
          } catch (I) {}
        }
        if (d.pc.getSenders() && d.pc.getSenders().length) {
          var v = !0;
          if ((i.replaceVideo && t.unifiedPlan && (v = !1), v))
            for (var p of d.pc.getSenders())
              p &&
                p.track &&
                "video" === p.track.kind &&
                (t.log("Removing video sender:", p), d.pc.removeTrack(p));
        }
      }
    }
    if (n.stream) {
      var g = n.stream;
      return (
        t.log("MediaStream provided by the application"),
        t.debug(g),
        !i.update ||
          !d.myStream ||
          d.myStream === n.stream ||
          d.streamExternal ||
          i.replaceAudio ||
          i.replaceVideo ||
          (t.stopAllTracks(d.myStream), (d.myStream = null)),
        (d.streamExternal = !0),
        a.consentDialog(!1),
        void _(e, o, i, n, g)
      );
    }
    if (z(i) || H(i)) {
      if (!t.isGetUserMediaAvailable())
        return void n.error("getUserMedia not available");
      var m = { mandatory: {}, optional: [] };
      a.consentDialog(!0);
      var b = z(i);
      b && i && "object" == typeof i.audio && (b = i.audio);
      var h = H(i);
      if (h && i) {
        var w = !0 === n.simulcast,
          S = !0 === n.simulcast2;
        if (
          ((!w && !S) || o || i.video || (i.video = "hires"),
          i.video && "screen" != i.video && "window" != i.video)
        )
          if ("object" == typeof i.video) h = i.video;
          else {
            var y = 0,
              T = 0;
            "lowres" === i.video
              ? ((T = 240), (y = 320))
              : "lowres-16:9" === i.video
              ? ((T = 180), (y = 320))
              : "hires" === i.video ||
                "hires-16:9" === i.video ||
                "hdres" === i.video
              ? ((T = 720), (y = 1280))
              : "fhdres" === i.video
              ? ((T = 1080), (y = 1920))
              : "4kres" === i.video
              ? ((T = 2160), (y = 3840))
              : "stdres" === i.video
              ? ((T = 480), (y = 640))
              : "stdres-16:9" === i.video
              ? ((T = 360), (y = 640))
              : (t.log("Default video setting is stdres 4:3"),
                (T = 480),
                (y = 640)),
              t.log("Adding media constraint:", i.video),
              (h = { height: { ideal: T }, width: { ideal: y } }),
              t.log("Adding video constraint:", h);
          }
        else if ("screen" === i.video || "window" === i.video) {
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
            return (
              (m.video = {}),
              i.screenshareFrameRate &&
                (m.video.frameRate = i.screenshareFrameRate),
              i.screenshareHeight && (m.video.height = i.screenshareHeight),
              i.screenshareWidth && (m.video.width = i.screenshareWidth),
              (m.audio = i.captureDesktopAudio),
              void navigator.mediaDevices.getDisplayMedia(m).then(
                function (r) {
                  a.consentDialog(!1),
                    z(i) && !i.keepAudio
                      ? navigator.mediaDevices
                          .getUserMedia({ audio: !0, video: !1 })
                          .then(function (t) {
                            r.addTrack(t.getAudioTracks()[0]), _(e, o, i, n, r);
                          })
                      : _(e, o, i, n, r);
                },
                function (e) {
                  a.consentDialog(!1), n.error(e);
                }
              )
            );
          function P(r, t) {
            a.consentDialog(!1), r ? n.error(r) : _(e, o, i, n, t);
          }
          function V(e, r, n) {
            t.log("Adding media constraint (screen capture)"),
              t.debug(e),
              navigator.mediaDevices
                .getUserMedia(e)
                .then(function (e) {
                  n
                    ? navigator.mediaDevices
                        .getUserMedia({ audio: !0, video: !1 })
                        .then(function (n) {
                          e.addTrack(n.getAudioTracks()[0]), r(null, e);
                        })
                    : r(null, e);
                })
                .catch(function (e) {
                  a.consentDialog(!1), r(e);
                });
          }
          if ("chrome" === t.webRTCAdapter.browserDetails.browser) {
            var C = t.webRTCAdapter.browserDetails.version,
              A = 33;
            window.navigator.userAgent.match("Linux") && (A = 35),
              C >= 26 && C <= A
                ? V(
                    (m = {
                      video: {
                        mandatory: {
                          googLeakyBucket: !0,
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: i.screenshareFrameRate,
                          maxFrameRate: i.screenshareFrameRate,
                          chromeMediaSource: "screen",
                        },
                      },
                      audio: z(i) && !i.keepAudio,
                    }),
                    P
                  )
                : t.extension.getScreen(function (e, r) {
                    if (e) return a.consentDialog(!1), n.error(e);
                    ((m = {
                      audio: !1,
                      video: {
                        mandatory: {
                          chromeMediaSource: "desktop",
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: i.screenshareFrameRate,
                          maxFrameRate: i.screenshareFrameRate,
                        },
                        optional: [
                          { googLeakyBucket: !0 },
                          { googTemporalLayeredScreencast: !0 },
                        ],
                      },
                    }).video.mandatory.chromeMediaSourceId = r),
                      V(m, P, z(i) && !i.keepAudio);
                  });
          } else if ("firefox" === t.webRTCAdapter.browserDetails.browser) {
            if (!(t.webRTCAdapter.browserDetails.version >= 33)) {
              var D = new Error("NavigatorUserMediaError");
              return (
                (D.name =
                  "Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)"),
                a.consentDialog(!1),
                void n.error(D)
              );
            }
            V(
              (m = {
                video: { mozMediaSource: i.video, mediaSource: i.video },
                audio: z(i) && !i.keepAudio,
              }),
              function (e, r) {
                if ((P(e, r), !e))
                  var n = r.currentTime,
                    o = window.setInterval(function () {
                      r || window.clearInterval(o),
                        r.currentTime == n &&
                          (window.clearInterval(o), r.onended && r.onended()),
                        (n = r.currentTime);
                    }, 500);
              }
            );
          }
          return;
        }
      }
      (i && "screen" === i.video) ||
        navigator.mediaDevices
          .enumerateDevices()
          .then(function (r) {
            var s = r.some(function (e) {
                return "audioinput" === e.kind;
              }),
              d =
                (function (e) {
                  if ((t.debug("isScreenSendEnabled:", e), !e)) return !1;
                  if (
                    "object" != typeof e.video ||
                    "object" != typeof e.video.mandatory
                  )
                    return !1;
                  var r = e.video.mandatory;
                  if (r.chromeMediaSource)
                    return (
                      "desktop" === r.chromeMediaSource ||
                      "screen" === r.chromeMediaSource
                    );
                  if (r.mozMediaSource)
                    return (
                      "window" === r.mozMediaSource ||
                      "screen" === r.mozMediaSource
                    );
                  if (r.mediaSource)
                    return (
                      "window" === r.mediaSource || "screen" === r.mediaSource
                    );
                  return !1;
                })(i) ||
                r.some(function (e) {
                  return "videoinput" === e.kind;
                }),
              c = z(i),
              l = H(i),
              u = (function (e) {
                return (
                  t.debug("isAudioSendRequired:", e),
                  !!e &&
                    !1 !== e.audio &&
                    !1 !== e.audioSend &&
                    void 0 !== e.failIfNoAudio &&
                    null !== e.failIfNoAudio &&
                    !0 === e.failIfNoAudio
                );
              })(i),
              f = (function (e) {
                return (
                  t.debug("isVideoSendRequired:", e),
                  !!e &&
                    !1 !== e.video &&
                    !1 !== e.videoSend &&
                    void 0 !== e.failIfNoVideo &&
                    null !== e.failIfNoVideo &&
                    !0 === e.failIfNoVideo
                );
              })(i);
            if (c || l || u || f) {
              var v = !!c && s,
                p = !!l && d;
              if (!v && !p)
                return (
                  a.consentDialog(!1), n.error("No capture device found"), !1
                );
              if (!v && u)
                return (
                  a.consentDialog(!1),
                  n.error(
                    "Audio capture is required, but no capture device found"
                  ),
                  !1
                );
              if (!p && f)
                return (
                  a.consentDialog(!1),
                  n.error(
                    "Video capture is required, but no capture device found"
                  ),
                  !1
                );
            }
            var m = {
              audio: !(!s || i.keepAudio) && b,
              video: !(!d || i.keepVideo) && h,
            };
            t.debug("getUserMedia constraints", m),
              m.audio || m.video
                ? navigator.mediaDevices
                    .getUserMedia(m)
                    .then(function (r) {
                      a.consentDialog(!1), _(e, o, i, n, r);
                    })
                    .catch(function (e) {
                      a.consentDialog(!1),
                        n.error({
                          code: e.code,
                          name: e.name,
                          message: e.message,
                        });
                    })
                : (a.consentDialog(!1), _(e, o, i, n, g));
          })
          .catch(function (e) {
            a.consentDialog(!1), n.error(e);
          });
    } else _(e, o, i, n);
  }
  function N(e, r) {
    ((r = r || {}).success =
      "function" == typeof r.success ? r.success : t.noop),
      (r.error = "function" == typeof r.error ? r.error : B),
      (r.customizeSdp =
        "function" == typeof r.customizeSdp ? r.customizeSdp : t.noop);
    var n = r.jsep,
      o = k[e];
    if (!o || !o.webrtcStuff)
      return t.warn("Invalid handle"), void r.error("Invalid handle");
    var i = o.webrtcStuff;
    if (n) {
      if (!i.pc)
        return (
          t.warn(
            "Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep"
          ),
          void r.error(
            "No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep"
          )
        );
      r.customizeSdp(n),
        i.pc.setRemoteDescription(n).then(function () {
          if (
            (t.log("Remote description accepted!"),
            (i.remoteSdp = n.sdp),
            i.candidates && i.candidates.length > 0)
          ) {
            for (var e = 0; e < i.candidates.length; e++) {
              var o = i.candidates[e];
              t.debug("Adding remote candidate:", o),
                o && !0 !== o.completed
                  ? i.pc.addIceCandidate(o)
                  : i.pc.addIceCandidate(t.endOfCandidates);
            }
            i.candidates = [];
          }
          r.success();
        }, r.error);
    } else r.error("Invalid JSEP");
  }
  function F(e, r) {
    var n = k[e];
    if (!n || !n.webrtcStuff) return t.warn("Invalid handle"), 0;
    var o = r ? "remote" : "local",
      i = n.webrtcStuff;
    return (
      i.volume[o] || (i.volume[o] = { value: 0 }),
      !i.pc.getStats ||
      ("chrome" !== t.webRTCAdapter.browserDetails.browser &&
        "safari" !== t.webRTCAdapter.browserDetails.browser)
        ? (t.warn("Getting the " + o + " volume unsupported by browser"), 0)
        : r && !i.remoteStream
        ? (t.warn("Remote stream unavailable"), 0)
        : r || i.myStream
        ? i.volume[o].timer
          ? i.volume[o].value
          : (t.log("Starting " + o + " volume monitor"),
            (i.volume[o].timer = setInterval(function () {
              i.pc.getStats().then(function (e) {
                e.forEach(function (e) {
                  e &&
                    "audio" === e.kind &&
                    ((r && !e.remoteSource) ||
                      (!r && "media-source" !== e.type) ||
                      (i.volume[o].value = e.audioLevel ? e.audioLevel : 0));
                });
              });
            }, 200)),
            0)
        : (t.warn("Local stream unavailable"), 0)
    );
  }
  function J(e, r) {
    var n = k[e];
    if (!n || !n.webrtcStuff) return t.warn("Invalid handle"), !0;
    var o = n.webrtcStuff;
    return o.pc
      ? o.myStream
        ? r
          ? o.myStream.getVideoTracks() &&
            0 !== o.myStream.getVideoTracks().length
            ? !o.myStream.getVideoTracks()[0].enabled
            : (t.warn("No video track"), !0)
          : o.myStream.getAudioTracks() &&
            0 !== o.myStream.getAudioTracks().length
          ? !o.myStream.getAudioTracks()[0].enabled
          : (t.warn("No audio track"), !0)
        : (t.warn("Invalid local MediaStream"), !0)
      : (t.warn("Invalid PeerConnection"), !0);
  }
  function U(e, r, n) {
    var o = k[e];
    if (!o || !o.webrtcStuff) return t.warn("Invalid handle"), !1;
    var i = o.webrtcStuff;
    return i.pc
      ? i.myStream
        ? r
          ? i.myStream.getVideoTracks() &&
            0 !== i.myStream.getVideoTracks().length
            ? ((i.myStream.getVideoTracks()[0].enabled = !n), !0)
            : (t.warn("No video track"), !1)
          : i.myStream.getAudioTracks() &&
            0 !== i.myStream.getAudioTracks().length
          ? ((i.myStream.getAudioTracks()[0].enabled = !n), !0)
          : (t.warn("No audio track"), !1)
        : (t.warn("Invalid local MediaStream"), !1)
      : (t.warn("Invalid PeerConnection"), !1);
  }
  function W(e) {
    var r = k[e];
    if (!r || !r.webrtcStuff) return t.warn("Invalid handle"), "Invalid handle";
    var n = r.webrtcStuff;
    return n.pc
      ? n.pc.getStats
        ? n.bitrate.timer
          ? n.bitrate.value
          : (t.log("Starting bitrate timer (via getStats)"),
            (n.bitrate.timer = setInterval(function () {
              n.pc.getStats().then(function (e) {
                e.forEach(function (e) {
                  if (e) {
                    var r = !1;
                    if (
                      (("video" === e.mediaType ||
                        e.id.toLowerCase().indexOf("video") > -1) &&
                      "inbound-rtp" === e.type &&
                      e.id.indexOf("rtcp") < 0
                        ? (r = !0)
                        : "ssrc" != e.type ||
                          !e.bytesReceived ||
                          ("VP8" !== e.googCodecName &&
                            "" !== e.googCodecName) ||
                          (r = !0),
                      r)
                    )
                      if (
                        ((n.bitrate.bsnow = e.bytesReceived),
                        (n.bitrate.tsnow = e.timestamp),
                        null === n.bitrate.bsbefore ||
                          null === n.bitrate.tsbefore)
                      )
                        (n.bitrate.bsbefore = n.bitrate.bsnow),
                          (n.bitrate.tsbefore = n.bitrate.tsnow);
                      else {
                        var o = n.bitrate.tsnow - n.bitrate.tsbefore;
                        "safari" === t.webRTCAdapter.browserDetails.browser &&
                          (o /= 1e3);
                        var i = Math.round(
                          (8 * (n.bitrate.bsnow - n.bitrate.bsbefore)) / o
                        );
                        "safari" === t.webRTCAdapter.browserDetails.browser &&
                          (i = parseInt(i / 1e3)),
                          (n.bitrate.value = i + " kbits/sec"),
                          (n.bitrate.bsbefore = n.bitrate.bsnow),
                          (n.bitrate.tsbefore = n.bitrate.tsnow);
                      }
                  }
                });
              });
            }, 1e3)),
            "0 kbits/sec")
        : (t.warn("Getting the video bitrate unsupported by browser"),
          "Feature unsupported by browser")
      : "Invalid PeerConnection";
  }
  function B(e) {
    t.error("WebRTC error:", e);
  }
  function G(e, o) {
    t.log("Cleaning WebRTC stuff");
    var i = k[e];
    if (i) {
      var a = i.webrtcStuff;
      if (a) {
        if (!0 === o) {
          var s = { janus: "hangup", transaction: t.randomString(12) };
          i.token && (s.token = i.token),
            m && (s.apisecret = m),
            t.debug("Sending hangup request (handle=" + e + "):"),
            t.debug(s),
            r
              ? ((s.session_id = y),
                (s.handle_id = e),
                n.send(JSON.stringify(s)))
              : t.httpAPICall(d + "/" + y + "/" + e, {
                  verb: "POST",
                  withCredentials: v,
                  body: s,
                });
        }
        (a.remoteStream = null),
          a.volume &&
            (a.volume.local &&
              a.volume.local.timer &&
              clearInterval(a.volume.local.timer),
            a.volume.remote &&
              a.volume.remote.timer &&
              clearInterval(a.volume.remote.timer)),
          (a.volume = {}),
          a.bitrate.timer && clearInterval(a.bitrate.timer),
          (a.bitrate.timer = null),
          (a.bitrate.bsnow = null),
          (a.bitrate.bsbefore = null),
          (a.bitrate.tsnow = null),
          (a.bitrate.tsbefore = null),
          (a.bitrate.value = null),
          !a.streamExternal &&
            a.myStream &&
            (t.log("Stopping local stream tracks"),
            t.stopAllTracks(a.myStream)),
          (a.streamExternal = !1),
          (a.myStream = null);
        try {
          a.pc.close();
        } catch (e) {}
        (a.pc = null),
          (a.candidates = null),
          (a.mySdp = null),
          (a.remoteSdp = null),
          (a.iceDone = !1),
          (a.dataChannel = {}),
          (a.dtmfSender = null),
          (a.senderTransforms = null),
          (a.receiverTransforms = null);
      }
      i.oncleanup();
    }
  }
  function z(e) {
    return (
      t.debug("isAudioSendEnabled:", e),
      !e ||
        (!1 !== e.audio &&
          (void 0 === e.audioSend ||
            null === e.audioSend ||
            !0 === e.audioSend))
    );
  }
  function q(e) {
    return (
      t.debug("isAudioRecvEnabled:", e),
      !e ||
        (!1 !== e.audio &&
          (void 0 === e.audioRecv ||
            null === e.audioRecv ||
            !0 === e.audioRecv))
    );
  }
  function H(e) {
    return (
      t.debug("isVideoSendEnabled:", e),
      !e ||
        (!1 !== e.video &&
          (void 0 === e.videoSend ||
            null === e.videoSend ||
            !0 === e.videoSend))
    );
  }
  function Q(e) {
    return (
      t.debug("isVideoRecvEnabled:", e),
      !e ||
        (!1 !== e.video &&
          (void 0 === e.videoRecv ||
            null === e.videoRecv ||
            !0 === e.videoRecv))
    );
  }
  P(e),
    (this.getServer = function () {
      return d;
    }),
    (this.isConnected = function () {
      return S;
    }),
    (this.reconnect = function (e) {
      ((e = e || {}).success =
        "function" == typeof e.success ? e.success : t.noop),
        (e.error = "function" == typeof e.error ? e.error : t.noop),
        (e.reconnect = !0),
        P(e);
    }),
    (this.getSessionId = function () {
      return y;
    }),
    (this.getInfo = function (e) {
      !(function (e) {
        if (
          ((e = e || {}),
          (e.success = "function" == typeof e.success ? e.success : t.noop),
          (e.error = "function" == typeof e.error ? e.error : t.noop),
          t.log("Getting info on Janus instance"),
          !S)
        )
          return (
            t.warn("Is the server down? (connected=false)"),
            void e.error("Is the server down? (connected=false)")
          );
        var o = t.randomString(12),
          i = { janus: "info", transaction: o };
        g && (i.token = g);
        m && (i.apisecret = m);
        if (r)
          return (
            (A[o] = function (r) {
              t.log("Server info:"),
                t.debug(r),
                "server_info" !== r.janus &&
                  t.error("Ooops: " + r.error.code + " " + r.error.reason),
                e.success(r);
            }),
            void n.send(JSON.stringify(i))
          );
        t.httpAPICall(d, {
          verb: "POST",
          withCredentials: v,
          body: i,
          success: function (r) {
            t.log("Server info:"),
              t.debug(r),
              "server_info" !== r.janus &&
                t.error("Ooops: " + r.error.code + " " + r.error.reason),
              e.success(r);
          },
          error: function (r, n) {
            t.error(r + ":", n),
              "" === n
                ? e.error(r + ": Is the server down?")
                : e.error(r + ": " + n);
          },
        });
      })(e);
    }),
    (this.destroy = function (a) {
      !(function (a) {
        (a = a || {}),
          (a.success = "function" == typeof a.success ? a.success : t.noop),
          (a.error = "function" == typeof a.error ? a.error : t.noop);
        var s = !0 === a.unload,
          c = !0;
        void 0 !== a.notifyDestroyed &&
          null !== a.notifyDestroyed &&
          (c = !0 === a.notifyDestroyed);
        var l = !0 === a.cleanupHandles;
        if ((t.log("Destroying session " + y + " (unload=" + s + ")"), !y))
          return (
            t.warn("No session to destroy"),
            a.success(),
            void (c && e.destroyed())
          );
        if (l) for (var u in k) E(u, { noRequest: !0 });
        if (!S)
          return (
            t.warn("Is the server down? (connected=false)"),
            (y = null),
            void a.success()
          );
        var f = { janus: "destroy", transaction: t.randomString(12) };
        g && (f.token = g);
        m && (f.apisecret = m);
        if (s)
          return (
            r
              ? ((n.onclose = null), n.close(), (n = null))
              : navigator.sendBeacon(d + "/" + y, JSON.stringify(f)),
            t.log("Destroyed session:"),
            (y = null),
            (S = !1),
            a.success(),
            void (c && e.destroyed())
          );
        if (r) {
          f.session_id = y;
          var p = function () {
              for (var e in o) n.removeEventListener(e, o[e]);
              n.removeEventListener("message", b),
                n.removeEventListener("error", h),
                i && clearTimeout(i),
                n.close();
            },
            b = function (r) {
              var n = JSON.parse(r.data);
              n.session_id == f.session_id &&
                n.transaction == f.transaction &&
                (p(), a.success(), c && e.destroyed());
            },
            h = function (r) {
              p(),
                a.error("Failed to destroy the server: Is the server down?"),
                c && e.destroyed();
            };
          return (
            n.addEventListener("message", b),
            n.addEventListener("error", h),
            void (1 === n.readyState ? n.send(JSON.stringify(f)) : h())
          );
        }
        t.httpAPICall(d + "/" + y, {
          verb: "POST",
          withCredentials: v,
          body: f,
          success: function (r) {
            t.log("Destroyed session:"),
              t.debug(r),
              (y = null),
              (S = !1),
              "success" !== r.janus &&
                t.error("Ooops: " + r.error.code + " " + r.error.reason),
              a.success(),
              c && e.destroyed();
          },
          error: function (r, n) {
            t.error(r + ":", n),
              (y = null),
              (S = !1),
              a.success(),
              c && e.destroyed();
          },
        });
      })(a);
    }),
    (this.attach = function (e) {
      !(function (e) {
        if (
          ((e = e || {}),
          (e.success = "function" == typeof e.success ? e.success : t.noop),
          (e.error = "function" == typeof e.error ? e.error : t.noop),
          (e.consentDialog =
            "function" == typeof e.consentDialog ? e.consentDialog : t.noop),
          (e.iceState = "function" == typeof e.iceState ? e.iceState : t.noop),
          (e.mediaState =
            "function" == typeof e.mediaState ? e.mediaState : t.noop),
          (e.webrtcState =
            "function" == typeof e.webrtcState ? e.webrtcState : t.noop),
          (e.slowLink = "function" == typeof e.slowLink ? e.slowLink : t.noop),
          (e.onmessage =
            "function" == typeof e.onmessage ? e.onmessage : t.noop),
          (e.onlocalstream =
            "function" == typeof e.onlocalstream ? e.onlocalstream : t.noop),
          (e.onremotestream =
            "function" == typeof e.onremotestream ? e.onremotestream : t.noop),
          (e.ondata = "function" == typeof e.ondata ? e.ondata : t.noop),
          (e.ondataopen =
            "function" == typeof e.ondataopen ? e.ondataopen : t.noop),
          (e.oncleanup =
            "function" == typeof e.oncleanup ? e.oncleanup : t.noop),
          (e.ondetached =
            "function" == typeof e.ondetached ? e.ondetached : t.noop),
          !S)
        )
          return (
            t.warn("Is the server down? (connected=false)"),
            void e.error("Is the server down? (connected=false)")
          );
        var o = e.plugin;
        if (!o)
          return t.error("Invalid plugin"), void e.error("Invalid plugin");
        var i = e.opaqueId,
          a = e.token ? e.token : g,
          s = t.randomString(12),
          c = { janus: "attach", plugin: o, opaque_id: i, transaction: s };
        a && (c.token = a);
        m && (c.apisecret = m);
        if (r)
          return (
            (A[s] = function (r) {
              if ((t.debug(r), "success" !== r.janus))
                return (
                  t.error("Ooops: " + r.error.code + " " + r.error.reason),
                  void e.error("Ooops: " + r.error.code + " " + r.error.reason)
                );
              var n = r.data.id;
              t.log("Created handle: " + n);
              var i = {
                session: T,
                plugin: o,
                id: n,
                token: a,
                detached: !1,
                webrtcStuff: {
                  started: !1,
                  myStream: null,
                  streamExternal: !1,
                  remoteStream: null,
                  mySdp: null,
                  mediaConstraints: null,
                  pc: null,
                  dataChannel: {},
                  dtmfSender: null,
                  trickle: !0,
                  iceDone: !1,
                  volume: { value: null, timer: null },
                  bitrate: {
                    value: null,
                    bsnow: null,
                    bsbefore: null,
                    tsnow: null,
                    tsbefore: null,
                    timer: null,
                  },
                },
                getId: function () {
                  return n;
                },
                getPlugin: function () {
                  return o;
                },
                getVolume: function () {
                  return F(n, !0);
                },
                getRemoteVolume: function () {
                  return F(n, !0);
                },
                getLocalVolume: function () {
                  return F(n, !1);
                },
                isAudioMuted: function () {
                  return J(n, !1);
                },
                muteAudio: function () {
                  return U(n, !1, !0);
                },
                unmuteAudio: function () {
                  return U(n, !1, !1);
                },
                isVideoMuted: function () {
                  return J(n, !0);
                },
                muteVideo: function () {
                  return U(n, !0, !0);
                },
                unmuteVideo: function () {
                  return U(n, !0, !1);
                },
                getBitrate: function () {
                  return W(n);
                },
                send: function (e) {
                  V(n, e);
                },
                data: function (e) {
                  j(n, e);
                },
                dtmf: function (e) {
                  x(n, e);
                },
                consentDialog: e.consentDialog,
                iceState: e.iceState,
                mediaState: e.mediaState,
                webrtcState: e.webrtcState,
                slowLink: e.slowLink,
                onmessage: e.onmessage,
                createOffer: function (e) {
                  L(n, !0, e);
                },
                createAnswer: function (e) {
                  L(n, !1, e);
                },
                handleRemoteJsep: function (e) {
                  N(n, e);
                },
                onlocalstream: e.onlocalstream,
                onremotestream: e.onremotestream,
                ondata: e.ondata,
                ondataopen: e.ondataopen,
                oncleanup: e.oncleanup,
                ondetached: e.ondetached,
                hangup: function (e) {
                  G(n, !0 === e);
                },
                detach: function (e) {
                  E(n, e);
                },
              };
              (k[n] = i), e.success(i);
            }),
            (c.session_id = y),
            void n.send(JSON.stringify(c))
          );
        t.httpAPICall(d + "/" + y, {
          verb: "POST",
          withCredentials: v,
          body: c,
          success: function (r) {
            if ((t.debug(r), "success" !== r.janus))
              return (
                t.error("Ooops: " + r.error.code + " " + r.error.reason),
                void e.error("Ooops: " + r.error.code + " " + r.error.reason)
              );
            var n = r.data.id;
            t.log("Created handle: " + n);
            var i = {
              session: T,
              plugin: o,
              id: n,
              token: a,
              detached: !1,
              webrtcStuff: {
                started: !1,
                myStream: null,
                streamExternal: !1,
                remoteStream: null,
                mySdp: null,
                mediaConstraints: null,
                pc: null,
                dataChannel: {},
                dtmfSender: null,
                trickle: !0,
                iceDone: !1,
                volume: { value: null, timer: null },
                bitrate: {
                  value: null,
                  bsnow: null,
                  bsbefore: null,
                  tsnow: null,
                  tsbefore: null,
                  timer: null,
                },
              },
              getId: function () {
                return n;
              },
              getPlugin: function () {
                return o;
              },
              getVolume: function () {
                return F(n, !0);
              },
              getRemoteVolume: function () {
                return F(n, !0);
              },
              getLocalVolume: function () {
                return F(n, !1);
              },
              isAudioMuted: function () {
                return J(n, !1);
              },
              muteAudio: function () {
                return U(n, !1, !0);
              },
              unmuteAudio: function () {
                return U(n, !1, !1);
              },
              isVideoMuted: function () {
                return J(n, !0);
              },
              muteVideo: function () {
                return U(n, !0, !0);
              },
              unmuteVideo: function () {
                return U(n, !0, !1);
              },
              getBitrate: function () {
                return W(n);
              },
              send: function (e) {
                V(n, e);
              },
              data: function (e) {
                j(n, e);
              },
              dtmf: function (e) {
                x(n, e);
              },
              consentDialog: e.consentDialog,
              iceState: e.iceState,
              mediaState: e.mediaState,
              webrtcState: e.webrtcState,
              slowLink: e.slowLink,
              onmessage: e.onmessage,
              createOffer: function (e) {
                L(n, !0, e);
              },
              createAnswer: function (e) {
                L(n, !1, e);
              },
              handleRemoteJsep: function (e) {
                N(n, e);
              },
              onlocalstream: e.onlocalstream,
              onremotestream: e.onremotestream,
              ondata: e.ondata,
              ondataopen: e.ondataopen,
              oncleanup: e.oncleanup,
              ondetached: e.ondetached,
              hangup: function (e) {
                G(n, !0 === e);
              },
              detach: function (e) {
                E(n, e);
              },
            };
            (k[n] = i), e.success(i);
          },
          error: function (r, n) {
            t.error(r + ":", n),
              "" === n
                ? e.error(r + ": Is the server down?")
                : e.error(r + ": " + n);
          },
        });
      })(e);
    });
}
(t.useDefaultDependencies = function (e) {
  var r = (e && e.fetch) || fetch,
    n = (e && e.Promise) || Promise,
    i = (e && e.WebSocket) || WebSocket;
  return {
    newWebSocket: function (e, r) {
      return new i(e, r);
    },
    extension: (e && e.extension) || o,
    isArray: function (e) {
      return Array.isArray(e);
    },
    webRTCAdapter: (e && e.adapter) || adapter,
    httpAPICall: function (e, o) {
      var i = {
        method: o.verb,
        headers: { Accept: "application/json, text/plain, */*" },
        cache: "no-cache",
      };
      "POST" === o.verb && (i.headers["Content-Type"] = "application/json"),
        void 0 !== o.withCredentials &&
          (i.credentials =
            !0 === o.withCredentials
              ? "include"
              : o.withCredentials
              ? o.withCredentials
              : "omit"),
        o.body && (i.body = JSON.stringify(o.body));
      var a = r(e, i).catch(function (e) {
        return n.reject({
          message: "Probably a network error, is the server down?",
          error: e,
        });
      });
      if (o.timeout) {
        var s = new n(function (e, r) {
          var n = setTimeout(function () {
            return (
              clearTimeout(n),
              r({ message: "Request timed out", timeout: o.timeout })
            );
          }, o.timeout);
        });
        a = n.race([a, s]);
      }
      return (
        a
          .then(function (e) {
            return e.ok
              ? typeof o.success == typeof t.noop
                ? e.json().then(
                    function (e) {
                      try {
                        o.success(e);
                      } catch (e) {
                        t.error(
                          "Unhandled httpAPICall success callback error",
                          e
                        );
                      }
                    },
                    function (r) {
                      return n.reject({
                        message: "Failed to parse response body",
                        error: r,
                        response: e,
                      });
                    }
                  )
                : void 0
              : n.reject({ message: "API call failed", response: e });
          })
          .catch(function (e) {
            typeof o.error == typeof t.noop &&
              o.error(e.message || "<< internal error >>", e);
          }),
        a
      );
    },
  };
}),
  (t.useOldDependencies = function (e) {
    var r = (e && e.jQuery) || jQuery,
      n = (e && e.WebSocket) || WebSocket;
    return {
      newWebSocket: function (e, r) {
        return new n(e, r);
      },
      isArray: function (e) {
        return r.isArray(e);
      },
      extension: (e && e.extension) || o,
      webRTCAdapter: (e && e.adapter) || adapter,
      httpAPICall: function (e, n) {
        var o =
            void 0 !== n.body
              ? {
                  contentType: "application/json",
                  data: JSON.stringify(n.body),
                }
              : {},
          i =
            void 0 !== n.withCredentials
              ? { xhrFields: { withCredentials: n.withCredentials } }
              : {};
        return r.ajax(
          r.extend(o, i, {
            url: e,
            type: n.verb,
            cache: !1,
            dataType: "json",
            async: n.async,
            timeout: n.timeout,
            success: function (e) {
              typeof n.success == typeof t.noop && n.success(e);
            },
            error: function (e, r, o) {
              typeof n.error == typeof t.noop && n.error(r, o);
            },
          })
        );
      },
    };
  }),
  (t.noop = function () {}),
  (t.dataChanDefaultLabel = "JanusDataChannel"),
  (t.endOfCandidates = null),
  (t.stopAllTracks = function (e) {
    try {
      var r = e.getTracks();
      for (var n of r) t.log(n), n && n.stop();
    } catch (e) {}
  }),
  (t.init = function (e) {
    if (
      (((e = e || {}).callback =
        "function" == typeof e.callback ? e.callback : t.noop),
      t.initDone)
    )
      e.callback();
    else {
      if (
        (("undefined" != typeof console && void 0 !== console.log) ||
          (console = { log: function () {} }),
        (t.trace = t.noop),
        (t.debug = t.noop),
        (t.vdebug = t.noop),
        (t.log = t.noop),
        (t.warn = t.noop),
        (t.error = t.noop),
        !0 === e.debug || "all" === e.debug)
      )
        (t.trace = console.trace.bind(console)),
          (t.debug = console.debug.bind(console)),
          (t.vdebug = console.debug.bind(console)),
          (t.log = console.log.bind(console)),
          (t.warn = console.warn.bind(console)),
          (t.error = console.error.bind(console));
      else if (Array.isArray(e.debug))
        for (var r of e.debug)
          switch (r) {
            case "trace":
              t.trace = console.trace.bind(console);
              break;
            case "debug":
              t.debug = console.debug.bind(console);
              break;
            case "vdebug":
              t.vdebug = console.debug.bind(console);
              break;
            case "log":
              t.log = console.log.bind(console);
              break;
            case "warn":
              t.warn = console.warn.bind(console);
              break;
            case "error":
              t.error = console.error.bind(console);
              break;
            default:
              console.error(
                "Unknown debugging option '" +
                  r +
                  "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')"
              );
          }
      t.log("Initializing library");
      var n = e.dependencies || t.useDefaultDependencies();
      (t.isArray = n.isArray),
        (t.webRTCAdapter = n.webRTCAdapter),
        (t.httpAPICall = n.httpAPICall),
        (t.newWebSocket = n.newWebSocket),
        (t.extension = n.extension),
        t.extension.init(),
        (t.listDevices = function (e, r) {
          (e = "function" == typeof e ? e : t.noop),
            null == r && (r = { audio: !0, video: !0 }),
            t.isGetUserMediaAvailable()
              ? navigator.mediaDevices
                  .getUserMedia(r)
                  .then(function (r) {
                    navigator.mediaDevices
                      .enumerateDevices()
                      .then(function (n) {
                        t.debug(n), e(n), t.stopAllTracks(r);
                      });
                  })
                  .catch(function (r) {
                    t.error(r), e([]);
                  })
              : (t.warn("navigator.mediaDevices unavailable"), e([]));
        }),
        (t.attachMediaStream = function (e, r) {
          try {
            e.srcObject = r;
          } catch (n) {
            try {
              e.src = URL.createObjectURL(r);
            } catch (e) {
              t.error("Error attaching stream to element");
            }
          }
        }),
        (t.reattachMediaStream = function (e, r) {
          try {
            e.srcObject = r.srcObject;
          } catch (n) {
            try {
              e.src = r.src;
            } catch (e) {
              t.error("Error reattaching stream to element");
            }
          }
        });
      var o =
          ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0
            ? "pagehide"
            : "beforeunload",
        i = window["on" + o];
      if (
        (window.addEventListener(o, function (e) {
          for (var r in (t.log("Closing window"), t.sessions))
            t.sessions[r] &&
              t.sessions[r].destroyOnUnload &&
              (t.log("Destroying session " + r),
              t.sessions[r].destroy({ unload: !0, notifyDestroyed: !1 }));
          i && "function" == typeof i && i();
        }),
        (t.safariVp8 = !1),
        "safari" === t.webRTCAdapter.browserDetails.browser &&
          t.webRTCAdapter.browserDetails.version >= 605)
      )
        if (
          RTCRtpSender &&
          RTCRtpSender.getCapabilities &&
          RTCRtpSender.getCapabilities("video") &&
          RTCRtpSender.getCapabilities("video").codecs &&
          RTCRtpSender.getCapabilities("video").codecs.length
        ) {
          for (var a of RTCRtpSender.getCapabilities("video").codecs)
            if (a && a.mimeType && "video/vp8" === a.mimeType.toLowerCase()) {
              t.safariVp8 = !0;
              break;
            }
          t.safariVp8
            ? t.log("This version of Safari supports VP8")
            : t.warn(
                "This version of Safari does NOT support VP8: if you're using a Technology Preview, try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu"
              );
        } else {
          var s = new RTCPeerConnection({});
          s.createOffer({ offerToReceiveVideo: !0 }).then(function (e) {
            (t.safariVp8 = -1 !== e.sdp.indexOf("VP8")),
              t.safariVp8
                ? t.log("This version of Safari supports VP8")
                : t.warn(
                    "This version of Safari does NOT support VP8: if you're using a Technology Preview, try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu"
                  ),
              s.close(),
              (s = null);
          });
        }
      if (
        ((t.unifiedPlan = !1),
        "firefox" === t.webRTCAdapter.browserDetails.browser &&
          t.webRTCAdapter.browserDetails.version >= 59)
      )
        t.unifiedPlan = !0;
      else if (
        "chrome" === t.webRTCAdapter.browserDetails.browser &&
        t.webRTCAdapter.browserDetails.version >= 72
      )
        t.unifiedPlan = !0;
      else if (
        window.RTCRtpTransceiver &&
        "currentDirection" in RTCRtpTransceiver.prototype
      ) {
        var d = new RTCPeerConnection();
        try {
          d.addTransceiver("audio"), (t.unifiedPlan = !0);
        } catch (e) {}
        d.close();
      } else t.unifiedPlan = !1;
      (t.initDone = !0), e.callback();
    }
  }),
  (t.isWebrtcSupported = function () {
    return !!window.RTCPeerConnection;
  }),
  (t.isGetUserMediaAvailable = function () {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  }),
  (t.randomString = function (e) {
    for (
      var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        n = "",
        o = 0;
      o < e;
      o++
    ) {
      var t = Math.floor(62 * Math.random());
      n += r.substring(t, t + 1);
    }
    return n;
  });
var i,
  a = e(Object.freeze({ __proto__: null, default: t }));
(i = n),
  Object.defineProperty(i, "__esModule", { value: !0 }),
  (function (e) {
    for (var r in e) i.hasOwnProperty(r) || (i[r] = e[r]);
  })(a),
  (function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (function (r) {
        for (var n in r) e.hasOwnProperty(n) || (e[n] = r[n]);
      })(n);
  })(r);
var s = r.__esModule;
export { s as __esModule, r as default };
//# sourceMappingURL=/sm/97abcccd94231c95b9f60a86a5c6b429c08bc32d6df5deafbc00246bd874ed1b.map
