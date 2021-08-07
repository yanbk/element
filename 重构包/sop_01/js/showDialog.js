showDialog = (function () {
    var j = [],
        objIfrBg, eMsgClose, fixOverlay, fixIECenter, objOverLay, hasOverlay, longPop = false,
        NU = navigator.userAgent,
        NA = navigator.appVersion,
        isIE = ((NU.indexOf('MSIE') == -1) ? false : true),
        isIE6 = (/MSIE 6.0/ig.test(NA)),
        isIE9 = (/MSIE 9.0/ig.test(NA)),
        isCHROME = (NU.indexOf('chrome') == -1),
        objWin = window,
        objDoc = document,
        objBody = objDoc.body,
        objDel = objDoc.documentElement,
        sIframeId = '_PopupIframe_',
        sPopupMsgId = '_PopupMsg_',
        sOverLayId = '_overlay_';

    function gEl(e) {
        return (typeof (e) === 'object') ? e : objDoc.getElementById(e)
    }

    function setOpacity(e, a) {
        e.style.opacity = a / 100;
        e.style.filter = 'alpha(opacity=' + a + ')';
        if (isIE) e.style.zoom = 1
    }

    function setStyle(e, a) {
        var i;
        for (i in a) {
            e.style[i] = a[i]
        }
    }

    function getStyle(e, a) {
        var b = (typeof objDoc.defaultView == 'function') ? objDoc.defaultView() : objDoc.defaultView,
            s;
        if (b && b.getComputedStyle) {
            s = b.getComputedStyle(e, null);
            return s && s.getPropertyValue(a)
        }
        return (e.currentStyle && (e.currentStyle[a] || null) || null)
    }

    function getPageHeight() {
        var h = (objWin.innerHeight && objWin.scrollMaxY) ? (objWin.innerHeight + objWin.scrollMaxY) : (objBody.scrollHeight > objBody.offsetHeight ? objBody.scrollHeight : objBody.offsetHeight);
        return Math.max(h, objDel.scrollHeight)
    }

    function getPageWidth() {
        return (objWin.innerWidth && objWin.scrollMaxX) ? (objWin.innerWidth + objWin.scrollMaxX) : (Math.max(objBody.scrollWidth, objBody.offsetWidth))
    }

    function getWinHeight() {
        return (objWin.innerHeight) ? objWin.innerHeight : (objDel && objDel.clientHeight) ? objDel.clientHeight : objBody.offsetHeight
    }

    function getWinWidth() {
        return (objWin.innerWidth) ? objWin.innerWidth : (objDel && objDel.clientWidth) ? objDel.clientWidth : objBody.offsetWidth
    }

    function getMaxH() {
        var a = getPageHeight(),
            wh = getWinHeight();
        return Math.max(a, wh)
    }

    function getMaxW() {
        var a = getPageWidth(),
            ww = getWinWidth();
        return Math.max(a, ww)
    }

    function addEvent(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
    }

    function removeEvent(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent("on" + b, c)
    }
    return {
        show: function (p) {
            var a = (typeof (p) === 'object') ? p : {},
                b;
            this.id = a.id || null;
            this.bgcolor = a.bgcolor || '#111';
            this.opacity = a.opacity || 70;
            this.src = a.src || null;
            this.iWidth = a.iWidth || 'auto';
            this.iHeight = a.iHeight || 'auto';
            this.sMsg = a.sMsg || null;
            this.sClass = a.sClass || null;
            this.sStyles = a.sStyle || 'padding:10px;border:4px solid #dedede;background-color:#fff';
            this.sTime = a.sTime || null;
            this.delayPop = a.delayPop || false;
            this.onPopupCallback = a.onPopupCallback || null;
            this.onCloseCallback = a.onCloseCallback || null;
            b = arguments.length;
            if (b == 1) {
                if (typeof (p) === 'string' && p != null && p != '') {
                    this.id = p
                }
            } else if (b == 4) {
                this.src = arguments[0];
                this.iWidth = arguments[1];
                this.iHeight = arguments[2]
            }
            if (this.id == null && this.src == null && this.sMsg == null) {
                return
            }
            if (this.src != null) {
                this.id = sIframeId
            }
            if (this.sMsg != null) {
                this.id = sPopupMsgId
            }
            if (this.id != null) {
                j.push(this.id)
            }
            this.popupInit()
        },
        popupInit: function () {
            var a = this.onPopupCallback,
                b, c, d, f, g, k, h, _length, _src;
            if (a != null && typeof (a) === 'function') {
                a()
            }
            b = this.id, _src = this.src;
            if (!hasOverlay) {
                c = gEl(sOverLayId);
                if (c) {
                    setStyle(c, {
                        backgroundColor: this.bgcolor,
                        display: 'block'
                    })
                } else {
                    this.overlay()
                }
            }
            if (_src != null) {
                if (!gEl(sIframeId)) {
                    d = objDoc.createElement('div');
                    objOverLay.parentNode.insertBefore(d, objOverLay)
                } else {
                    d = gEl(sIframeId).parentNode
                }
                d.style.display = 'none';
                d.innerHTML = '<iframe onload="showDialog.ifrAutoHeight(this)" style="display:block" scrolling="no" id="' + sIframeId + '" src="' + _src + '" width = "' + this.iWidth + '" height = "' + this.iHeight + '" frameborder = "0" allowtransparency="true"></iframe>';
                if (!this.delayPop) {
                    d.style.display = 'block'
                }
            }
            if (this.sMsg != null) {
                if (!gEl(sPopupMsgId)) {
                    k = objDoc.createElement('div');
                    k.style.cssText = this.sStyles;
                    k.setAttribute('id', sPopupMsgId);
                    objOverLay.parentNode.insertBefore(k, objOverLay)
                } else {
                    k = gEl(sPopupMsgId)
                }
                if (this.sClass != null) {
                    f = isIE ? 'className' : 'class';
                    k.setAttribute(f, this.sClass)
                }
                k.style.display = 'none';
                k.innerHTML = this.sMsg;
                if (!this.delayPop) {
                    k.style.display = 'block'
                }
                if (this.sTime != null) {
                    g = this;
                    objWin.setTimeout(function () {
                        g.hide(k)
                    }, this.sTime)
                } else {
                    eMsgClose = function () {
                        showDialog.hide()
                    };
                    addEvent(objOverLay, 'click', eMsgClose)
                }
            }
            if (b != null && gEl(b)) {
                h = gEl(b), _length = j.length;
                if (_length > 1) {
                    gEl(j[_length - 2]).style.display = 'none'
                }
                h.style.position = 'absolute';
                if (!!this.delayPop) {
                    h.style.display = 'none'
                } else {
                    h.style.display = 'block'
                }
                setStyle(h, {
                    visibility: 'visible',
                    zIndex: '9999',
                    left: '50%',
                    top: '50%'
                })
            }
            if (!this.delayPop) {
                this.adjust()
            }
        },
        popup: function () {
            var a, b, c;
            if (!!this.delayPop) {
                a = this.id;
                if (this.src != null) {
                    b = gEl(sIframeId).parentNode;
                    b.style.display = 'block'
                }
                if (a != null && gEl(a)) {
                    c = gEl(a);
                    c.style.display = 'block'
                }
            }
            this.adjust()
        },
        adjust: function () {
            var a = this.id,
                _h = getWinHeight(),
                _rt = null,
                _st = null,
                _iw, _ih, b;
            if (a != null && gEl(a)) {
                b = gEl(a), _iw = b.offsetWidth, _ih = b.offsetHeight;
                if (_ih >= _h) {
                    longPop = true;
                    setStyle(b, {
                        position: 'absolute',
                        top: '100px',
                        marginLeft: '-' + _iw / 2 + 'px',
                        marginBottom: '100px'
                    })
                } else {
                    longPop = false;
                    isIE6 ? (b.style.position = 'absolute') : (b.style.position = 'fixed');
                    setStyle(b, {
                        marginTop: '-' + _ih / 2 + 'px',
                        marginLeft: '-' + _iw / 2 + 'px'
                    })
                }
                fixOverlay = function () {
                    if (_rt) {
                        clearTimeout(_rt)
                    }
                    _rt = setTimeout(function () {
                        showDialog.fix_Overlay()
                    }, 250)
                };
                addEvent(objWin, 'resize', fixOverlay);
                if (isIE || isCHROME) {
                    this.fix_Overlay();
                    if (isIE6) {
                        this.fixIE6_Center();
                        fixIECenter = function () {
                            if (_st) {
                                clearTimeout(_st)
                            }
                            _st = setTimeout(function () {
                                showDialog.fixIE6_Center()
                            }, 250)
                        };
                        addEvent(objWin, 'scroll', fixIECenter)
                    }
                }
            }
        },
        fix_Overlay: function () {
            var a = getMaxW(),
                _h = getMaxH(),
                _wh = getWinHeight(),
                _obj = gEl(this.id),
                _ih;
            if (objOverLay === undefined) {
                objOverLay = gEl(sOverLayId)
            }
            if (isIE9 && objDoc.documentMode == 9) {
                a = a - 17
            }
            _h = _h - 3;
            try {
                _ih = _obj.offsetHeight
            } catch (e) {
                _ih = this.iHeight;
                _obj = gEl(sIframeId)
            }
            if (_ih >= _wh) {
                longPop = true;
                setStyle(_obj, {
                    position: 'absolute',
                    top: '100px',
                    marginTop: '0',
                    marginBottom: '100px'
                })
            } else {
                longPop = false
            }
            if (isIE) {
                objOverLay.style.width = a + 'px'
            }
            objOverLay.style.height = _h + 'px'
        },
        fixIE6_Center: function () {
            var a = objBody.scrollTop || objDel.scrollTop;
            if (!longPop) {
                _obj = gEl(this.id);
                setStyle(_obj, {
                    marginTop: parseInt(a - _obj.offsetHeight / 2) + 'px',
                    top: '50%'
                })
            }
        },
        ifrAutoHeight: function (a) {
            var b = gEl(a),
                h, c;
            if (this.iHeight != 'auto') {
                return
            }
            try {
                c = b.contentWindow.document.body.scrollHeight, _dh = b.contentWindow.document.documentElement.scrollHeight;
                h = Math.max(c, _dh);
                this.iHeight = b.height = h
            } catch (e) {}
            setStyle(b, {
                marginTop: '-' + b.offsetHeight / 2 + 'px',
                marginLeft: '-' + b.offsetWidth / 2 + 'px'
            });
            this.fix_Overlay()
        },
        hide: function (p) {
            var a = (typeof (p) === 'object') ? p : {},
                b, c;
            this.cancleCallback = a.cancleCallback || false;
            b = j[j.length - 1];
            if (b == null) {
                return
            }
            if (b !== sPopupMsgId) {
                gEl(b).style.display = 'none'
            } else {
                objBody.removeChild(gEl(b))
            }
            j = [];
            objOverLay.style.display = 'none';
            hasOverlay = false;
            if (fixOverlay != null) {
                removeEvent(objWin, 'resize', fixOverlay)
            }
            if (eMsgClose != null) {
                removeEvent(objOverLay, 'click', eMsgClose)
            }
            if (isIE6 && fixIECenter != null) {
                removeEvent(objWin, 'scroll', fixIECenter)
            }
            c = this.onCloseCallback;
            if (c != null && typeof (c) === 'function' && !this.cancleCallback) {
                c()
            }
            return
        },
        overlay: function () {
            var a = getMaxH(),
                b, c;
            if (isIE) {
                b = parseInt(getStyle(objBody, 'marginTop')), ib = parseInt(getStyle(objBody, 'marginBottom'));
                a = a + b + ib
            }
            objOverLay = objDoc.createElement('div');
            objOverLay.setAttribute('id', sOverLayId);
            setStyle(objOverLay, {
                backgroundColor: this.bgcolor,
                borderTop: '1px solid ' + this.bgcolor,
                position: 'absolute',
                height: a + 'px',
                zIndex: '9998',
                width: '100%',
                left: '0',
                top: '0'
            });
            if (isIE6) {
                c = getMaxW();
                objOverLay.style.width = c + 'px';
                objOverLay.innerHTML = '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);z-index:9997" src="javascript:void(0)"></iframe>'
            }
            setOpacity(objOverLay, this.opacity);
            hasOverlay = true;
            return objBody.appendChild(objOverLay)
        }
    }
})();