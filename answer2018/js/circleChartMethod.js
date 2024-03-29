 function circleChart(a,b) {
	var c = {
		color: "#3459eb",
		backgroundColor: "#e6e6e6",
		background: !0,
		speed: 2e3,
		widthRatio: .2,
		value: 66,
		unit: "percent",
		counterclockwise: !1,
		size: 110,
		startAngle: 0,
		animate: !0,
		backgroundFix: !0,
		lineCap: "round",
		animation: "easeInOutCubic",
		text: !1,
		redraw: !1,
		cAngle: 0,
		textCenter: !0,
		textSize: !1,
		textWeight: "normal",
		textFamily: "sans-serif",
		relativeTextSize: 1 / 7,
		autoCss: !0,
		onDraw: !1
	};
	Math.linearTween = ((a, b, c, d) => c * a / d + b), Math.easeInQuad = ((a, b, c, d) => {
		a /= d;
		return c * a * a + b
	}), Math.easeOutQuad = ((a, b, c, d) => {
		a /= d;
		return -c * a * (a - 2) + b
	}), Math.easeInOutQuad = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * a * a + b;
		a--;
		return -c / 2 * (a * (a - 2) - 1) + b
	}), Math.easeInCubic = ((a, b, c, d) => {
		a /= d;
		return c * a * a * a + b
	}), Math.easeOutCubic = ((a, b, c, d) => {
		a /= d;
		a--;
		return c * (a * a * a + 1) + b
	}), Math.easeInOutCubic = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * a * a * a + b;
		a -= 2;
		return c / 2 * (a * a * a + 2) + b
	}), Math.easeInQuart = ((a, b, c, d) => {
		a /= d;
		return c * a * a * a * a + b
	}), Math.easeOutQuart = ((a, b, c, d) => {
		a /= d;
		a--;
		return -c * (a * a * a * a - 1) + b
	}), Math.easeInOutQuart = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * a * a * a * a + b;
		a -= 2;
		return -c / 2 * (a * a * a * a - 2) + b
	}), Math.easeInQuint = ((a, b, c, d) => {
		a /= d;
		return c * a * a * a * a * a + b
	}), Math.easeOutQuint = ((a, b, c, d) => {
		a /= d;
		a--;
		return c * (a * a * a * a * a + 1) + b
	}), Math.easeInOutQuint = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * a * a * a * a * a + b;
		a -= 2;
		return c / 2 * (a * a * a * a * a + 2) + b
	}), Math.easeInSine = ((a, b, c, d) => -c * Math.cos(a / d * (Math.PI / 2)) + c + b), Math.easeOutSine = ((a, b, c, d) => c * Math.sin(a / d * (Math.PI / 2)) + b), Math.easeInOutSine = ((a, b, c, d) => -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b), Math.easeInExpo = ((a, b, c, d) => c * Math.pow(2, 10 * (a / d - 1)) + b), Math.easeOutExpo = ((a, b, c, d) => c * (1 - Math.pow(2, -10 * a / d)) + b), Math.easeInOutExpo = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * Math.pow(2, 10 * (a - 1)) + b;
		a--;
		return c / 2 * (2 - Math.pow(2, -10 * a)) + b
	}), Math.easeInCirc = ((a, b, c, d) => {
		a /= d;
		return -c * (Math.sqrt(1 - a * a) - 1) + b
	}), Math.easeOutCubic = ((a, b, c, d) => {
		a /= d;
		a--;
		return c * (a * a * a + 1) + b
	}), Math.easeInOutCubic = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return c / 2 * a * a * a + b;
		a -= 2;
		return c / 2 * (a * a * a + 2) + b
	}), Math.easeOutCirc = ((a, b, c, d) => {
		a /= d;
		a--;
		return c * Math.sqrt(1 - a * a) + b
	}), Math.easeInOutCirc = ((a, b, c, d) => {
		a /= d / 2;
		if(a < 1) return -c / 2 * (Math.sqrt(1 - a * a) - 1) + b;
		a -= 2;
		return c / 2 * (Math.sqrt(1 - a * a) + 1) + b
	});
	var d = (a, b, c, e, f, g, h, i) => {
		let j = Object.create(d.prototype);
		j.pos = a;
		j.bAngle = b;
		j.eAngle = c;
		j.cAngle = e;
		j.radius = f;
		j.lineWidth = g;
		j.sAngle = h;
		j.settings = i;
		return j
	};
	d.prototype = {
		onDraw(a) {
			if(!1 !== this.settings.onDraw) {
				let c = Object.assign({}, this);
				var b = {
					percent: i,
					rad: a => a,
					default: f
				};
				c.value = (b[this.settings.unit] || b.default)(c.cAngle), c.text = (b => e(a, b)), c.settings.onDraw(a, c)
			}
		},
		drawBackground(a) {
			a.beginPath(), a.arc(this.pos, this.pos, this.settings.backgroundFix ? .9999 * this.radius : this.radius, 0, 2 * Math.PI), a.lineWidth = this.settings.backgroundFix ? .95 * this.lineWidth : this.lineWidth, a.strokeStyle = this.settings.backgroundColor, a.stroke()
		},
		draw(a) {
			if(a.beginPath(), this.settings.counterclockwise) {
				let b = 2 * Math.PI;
				a.arc(this.pos, this.pos, this.radius, b - this.bAngle, b - (this.bAngle + this.cAngle), this.settings.counterclockwise)
			} else a.arc(this.pos, this.pos, this.radius, this.bAngle, this.bAngle + this.cAngle, this.settings.counterclockwise);
			a.lineWidth = this.lineWidth, a.lineCap = this.settings.lineCap, a.strokeStyle = this.settings.color, a.stroke()
		},
		animate(a, b, c, d, e) {
			let f = (new Date).getTime() - c;
			f < 1 && (f = 1), c - d < 1.05 * this.settings.speed && (!e && 1e3 * this.cAngle <= Math.floor(1e3 * this.eAngle) || e && 1e3 * this.cAngle >= Math.floor(1e3 * this.eAngle)) ? (this.cAngle = Math[this.settings.animation]((c - d) / f, this.sAngle, this.eAngle - this.sAngle, this.settings.speed / f), b.clearRect(0, 0, this.settings.size, this.settings.size), this.settings.background && this.drawBackground(b), this.draw(b), this.onDraw(a), c = (new Date).getTime(), j(() => this.animate(a, b, c, d, e))) : (this.cAngle = this.eAngle, b.clearRect(0, 0, this.settings.size, this.settings.size), this.settings.background && this.drawBackground(b), this.draw(b), this.setCurrentAnglesData(a))
		},
		setCurrentAnglesData(a) {
			var b = {
				percent: i,
				rad: a => a,
				default: f
			};
			let c = b[this.settings.unit] || b.default;
			a.data("current-c-angle", c(this.cAngle)), a.data("current-start-angle", c(this.bAngle))
		}
	};
	let e = (b, c) => {
			b.data("text", c);
			$(".circleChart_text", b).html(c)
		},
		f = a => a / Math.PI * 180,
		g = a => a / 180 * Math.PI,
		h = a => g(a / 100 * 360),
		i = a => f(a) / 360 * 100,
		j = (a => window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b) {
			window.setTimeout(a, 1e3 / 60)
		})();
	return $(a).each((e, f) => {
		let i = $(f);
		var k = {};
		var l = i.data();
		for(let a in l) l.hasOwnProperty(a) && 0 === a.indexOf("_cache_") && c.hasOwnProperty(a.substring(7)) && (k[a.substring(7)] = l[a]);
		let m = Object.assign({}, c, k, l, b);
		for(let a in m) 0 !== a.indexOf("_cache_") && i.data("_cache_" + a, m[a]);
		$("canvas.circleChart_canvas", i).length || i.append(function() {
			return $("<canvas/>", {
				class: "circleChart_canvas"
			}).prop({
				width: m.size,
				height: m.size
			}).css(m.autoCss ? {
				"margin-left": "auto",
				"margin-right": "auto",
				display: "block"
			} : {})
		});
		$("p.circleChart_text", i).length || !1 !== m.text && (i.append("<p class='circleChart_text'>" + m.text + "</p>"), m.autoCss && (m.textCenter ? $("p.circleChart_text", i).css({
			position: "absolute",
			"line-height": m.size + "px",
			top: 0,
			width: "100%",
			margin: 0,
			padding: 0,
			"text-align": "center",
			"font-size": !1 !== m.textSize ? m.textSize : m.size * m.relativeTextSize,
			"font-weight": m.textWeight,
			"font-family": m.textFamily
		}) : a("p.circleChart_text", i).css({
			"padding-top": "5px",
			"text-align": "center",
			"font-weight": m.textWeight,
			"font-family": m.textFamily,
			"font-size": !1 !== m.textSize ? m.textSize : m.size * m.relativeTextSize
		})));
		m.autoCss && i.css("position", "relative");
		m.redraw || (m.cAngle = m.currentCAngle ? m.currentCAngle : m.cAngle, m.startAngle = m.currentStartAngle ? m.currentStartAngle : m.startAngle);
		var n = $("canvas", i).get(0);
		var o = n.getContext("2d");
		var p = {
			percent: h,
			rad: a => a,
			default: g
		};
		var q = p[m.unit] || p.default;
		var  r = q(m.startAngle);
		var s = q(m.value);
		var t = q(m.cAngle);
		var u = m.size / 2;
		var v = u * (1 - m.widthRatio / 2);
		var w = v * m.widthRatio;
		var x = d(u, r, s, t, v, w, t, m);
		i.data("size", m.size);
		m.animate ? 0 !== m.value ? x.animate(i, o, (new Date).getTime(), (new Date).getTime(), t > s) : j(() => {
			o.clearRect(0, 0, this.settings.size, this.settings.size);
			x.settings.background && x.drawBackground(o)
		}) : (x.cAngle = x.eAngle, j(() => {
			m.background && x.drawBackground(o);
			0 !== m.value ? (x.draw(o), x.onDraw(i), x.setCurrentAnglesData(i)) : (o.clearRect(0, 0, this.settings.size, this.settings.size), x.settings.background && x.drawBackground(o))
		}))
	})
}