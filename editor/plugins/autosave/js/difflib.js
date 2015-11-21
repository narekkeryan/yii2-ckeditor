﻿__whitespace = {" ": !0, "\t": !0, "\n": !0, "\f": !0, "\r": !0};
difflib = {
    defaultJunkFunction: function (b) {
        return b in __whitespace
    }, stripLinebreaks: function (b) {
        return b.replace(/^[\n\r]*|[\n\r]*$/g, "")
    }, stringAsLines: function (b) {
        var a = b.indexOf("\n"), f = b.indexOf("\r");
        b = b.split(-1 < a && -1 < f || 0 > f ? "\n" : "\r");
        for (a = 0; a < b.length; a++)b[a] = difflib.stripLinebreaks(b[a]);
        return b
    }, __reduce: function (b, a, f) {
        if (null != f)var d = 0; else if (a)f = a[0], d = 1; else return null;
        for (; d < a.length; d++)f = b(f, a[d]);
        return f
    }, __ntuplecomp: function (b, a) {
        for (var f = Math.max(b.length, a.length), d = 0; d <
        f; d++) {
            if (b[d] < a[d])return -1;
            if (b[d] > a[d])return 1
        }
        return b.length == a.length ? 0 : b.length < a.length ? -1 : 1
    }, __calculate_ratio: function (b, a) {
        return a ? 2 * b / a : 1
    }, __isindict: function (b) {
        return function (a) {
            return a in b
        }
    }, __dictget: function (b, a, f) {
        return a in b ? b[a] : f
    }, SequenceMatcher: function (b, a, f) {
        this.set_seqs = function (d, n) {
            this.set_seq1(d);
            this.set_seq2(n)
        };
        this.set_seq1 = function (d) {
            d != this.a && (this.a = d, this.matching_blocks = this.opcodes = null)
        };
        this.set_seq2 = function (d) {
            d != this.b && (this.b = d, this.matching_blocks =
                this.opcodes = this.fullbcount = null, this.__chain_b())
        };
        this.__chain_b = function () {
            for (var d = this.b, n = d.length, c = this.b2j = {}, p = {}, g = 0; g < d.length; g++) {
                var e = d[g];
                if (e in c) {
                    var b = c[e];
                    200 <= n && 100 * b.length > n ? (p[e] = 1, delete c[e]) : b.push(g)
                } else c[e] = [g]
            }
            for (e in p)delete c[e];
            d = this.isjunk;
            n = {};
            if (d) {
                for (e in p)d(e) && (n[e] = 1, delete p[e]);
                for (e in c)d(e) && (n[e] = 1, delete c[e])
            }
            this.isbjunk = difflib.__isindict(n);
            this.isbpopular = difflib.__isindict(p)
        };
        this.find_longest_match = function (d, n, c, p) {
            for (var g = this.a,
                     e = this.b, b = this.b2j, a = this.isbjunk, h = d, l = c, m = 0, f = null, q = {}, x = [], r = d; r < n; r++) {
                var t = {}, u = difflib.__dictget(b, g[r], x), v;
                for (v in u)if (f = u[v], !(f < c)) {
                    if (f >= p)break;
                    t[f] = k = difflib.__dictget(q, f - 1, 0) + 1;
                    k > m && (h = r - k + 1, l = f - k + 1, m = k)
                }
                q = t
            }
            for (; h > d && l > c && !a(e[l - 1]) && g[h - 1] == e[l - 1];)h--, l--, m++;
            for (; h + m < n && l + m < p && !a(e[l + m]) && g[h + m] == e[l + m];)m++;
            for (; h > d && l > c && a(e[l - 1]) && g[h - 1] == e[l - 1];)h--, l--, m++;
            for (; h + m < n && l + m < p && a(e[l + m]) && g[h + m] == e[l + m];)m++;
            return [h, l, m]
        };
        this.get_matching_blocks = function () {
            if (null != this.matching_blocks)return this.matching_blocks;
            for (var d = this.a.length, n = this.b.length, c = [[0, d, 0, n]], p = [], g, e, b, a, h, l, m, f; c.length;)if (a = c.pop(), g = a[0], e = a[1], b = a[2], a = a[3], f = this.find_longest_match(g, e, b, a), h = f[0], l = f[1], m = f[2])p.push(f), g < h && b < l && c.push([g, h, b, l]), h + m < e && l + m < a && c.push([h + m, e, l + m, a]);
            p.sort(difflib.__ntuplecomp);
            c = j1 = k1 = block = 0;
            g = [];
            for (var q in p)block = p[q], i2 = block[0], j2 = block[1], k2 = block[2], c + k1 == i2 && j1 + k1 == j2 ? k1 += k2 : (k1 && g.push([c, j1, k1]), c = i2, j1 = j2, k1 = k2);
            k1 && g.push([c, j1, k1]);
            g.push([d, n, 0]);
            return this.matching_blocks =
                g
        };
        this.get_opcodes = function () {
            if (null != this.opcodes)return this.opcodes;
            var d = 0, n = 0, c = [];
            this.opcodes = c;
            var a, g, e, b, f = this.get_matching_blocks(), h;
            for (h in f)a = f[h], g = a[0], e = a[1], a = a[2], b = "", d < g && n < e ? b = "replace" : d < g ? b = "delete" : n < e && (b = "insert"), b && c.push([b, d, g, n, e]), d = g + a, n = e + a, a && c.push(["equal", g, d, e, n]);
            return c
        };
        this.get_grouped_opcodes = function (d) {
            d || (d = 3);
            var a = this.get_opcodes();
            a || (a = [["equal", 0, 1, 0, 1]]);
            var c, b, g, e, f;
            "equal" == a[0][0] && (c = a[0], b = c[0], g = c[1], e = c[2], f = c[3], c = c[4], a[0] = [b,
                Math.max(g, e - d), e, Math.max(f, c - d), c]);
            "equal" == a[a.length - 1][0] && (c = a[a.length - 1], b = c[0], g = c[1], e = c[2], f = c[3], c = c[4], a[a.length - 1] = [b, g, Math.min(e, g + d), f, Math.min(c, f + d)]);
            var w = d + d, h = [], l;
            for (l in a)c = a[l], b = c[0], g = c[1], e = c[2], f = c[3], c = c[4], "equal" == b && e - g > w && (h.push([b, g, Math.min(e, g + d), f, Math.min(c, f + d)]), g = Math.max(g, e - d), f = Math.max(f, c - d)), h.push([b, g, e, f, c]);
            h && "equal" == h[h.length - 1][0] && h.pop();
            return h
        };
        this.ratio = function () {
            matches = difflib.__reduce(function (a, b) {
                    return a + b[b.length - 1]
                }, this.get_matching_blocks(),
                0);
            return difflib.__calculate_ratio(matches, this.a.length + this.b.length)
        };
        this.quick_ratio = function () {
            var a, b;
            if (null == this.fullbcount) {
                this.fullbcount = a = {};
                for (var c = 0; c < this.b.length; c++)b = this.b[c], a[b] = difflib.__dictget(a, b, 0) + 1
            }
            a = this.fullbcount;
            for (var f = {}, g = difflib.__isindict(f), e = numb = 0, c = 0; c < this.a.length; c++)b = this.a[c], numb = g(b) ? f[b] : difflib.__dictget(a, b, 0), f[b] = numb - 1, 0 < numb && e++;
            return difflib.__calculate_ratio(e, this.a.length + this.b.length)
        };
        this.real_quick_ratio = function () {
            var a =
                this.a.length, b = this.b.length;
            return _calculate_ratio(Math.min(a, b), a + b)
        };
        this.isjunk = f ? f : difflib.defaultJunkFunction;
        this.a = this.b = null;
        this.set_seqs(b, a)
    }
};