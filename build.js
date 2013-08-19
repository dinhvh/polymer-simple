Polymer.addResolvePath = function (proto, element) {
  // monkey patch addResolvePath to use assetpath attribute
  var assetPath = element.getAttribute('assetpath');
  var url = HTMLImports.getDocumentUrl(element.ownerDocument) || '';
  if (url) {
    var parts = url.split('/');
    parts.pop();
    if (assetPath) {
      parts.push(assetPath);
    }
    parts.push('');
    url = parts.join('/');
  }
  proto.resolvePath = function(path) {
    return url + path;
  };
};;

    PolymerUI = { 
      findTheme: function() {
        var p = this, theme;
        while (p && !theme) {
          theme = p.getAttribute && p.getAttribute('theme');
          p = p.parentNode || p.host;
        }
        this.theme = theme;
      }
    };
    Polymer('polymer-ui-theme-aware', {
      inserted: function() {
        if (!this.theme) {
          this.findTheme();
        }
      },
      findTheme: PolymerUI.findTheme,
      themeChanged: function(old) {
        this.classList.switch(old, this.theme);
      }
    });
  ;

    Polymer('polymer-media-query', {
      queryMatches: false,
      query: '',
      ready: function() {
        this._mqHandler = this.queryHandler.bind(this);
        this._mq = null;
      },
      queryChanged: function() {
        if (this._mq) {
          this._mq.removeListener(this._mqHandler);
        }
        this._mq = window.matchMedia('(' + this.query + ')');
        this._mq.addListener(this._mqHandler);
        this.queryHandler(this._mq);
      },
      queryHandler: function(mq) {
        this.queryMatches = mq.matches;
        this.asyncFire('polymer-mediachange', mq);
      }
    });
  ;

    Polymer('polymer-flex-layout', {
      vertical: false,
      isContainer: false,
      inserted: function() {
        this.installControllerStyles();
        this.layoutContainer = this.isContainer ? 
            this : (this.parentNode.host || this.parentNode);
        if (!this.isContainer) {
          this.style.display = 'none';
        }
        this.layoutContainer.classList.add('flexbox');
        this.verticalChanged();
        this.alignChanged();
        this.justifyChanged();
      },
      switchContainerClass: function(prefix, old, name) {
        if (this.layoutContainer && name) {
          this.layoutContainer.classList.switch(
              prefix + old, prefix + name);
        }
      },
      verticalChanged: function() {
        if (this.layoutContainer) {
          this.layoutContainer.classList.toggle('column', this.vertical);
        }
      },
      alignChanged: function(old) {
        this.switchContainerClass('align-', old, this.align);
      },
      justifyChanged: function(old) {
        this.switchContainerClass('justify-', old, this.justify);
      }
    });
  ;

    Polymer('polymer-ui-toolbar', {
      responsiveWidth: '800px',
      queryMatches: false,
      queryMatchesChanged: function() {
        this.classList.toggle('narrow-layout', this.queryMatches);
      }
    });
  ;

    (function() {
      var icons = [
       'drawer',
       'menu',
       'search',
       'dropdown',
       'close',
       'add',
       'trash',
       'refresh',
       'settings',
       'dialoga',
       'left',
       'right',
       'down',
       'up',
       'grid',
       'contact',
       'account',
       'plus',
       'time',
       'marker',
       'briefcase',
       'array',
       'columns',
       'list',
       'modules',
       'quilt',
       'stream',
       'maximize',
       'shrink',
       'sort',
       'shortcut',
       'dialog',
       'twitter',
       'facebook',
       'favorite',
       'gplus',
       'filter',
       'tag',
       'plusone',
       'dots'
      ];
      var map = {};
      icons.forEach(function(name, i) {
        map[name] = i;
      });
      icons = map;

      Polymer('polymer-ui-icon', {
        /**
         * The URL of an image for the icon.
         *
         * @attribute src
         * @type string
         * @default ''
         */
        src: '',
        /**
         * Specifies the size of the icon.
         *
         * @attribute size
         * @type string
         * @default 24
         */
        size: 24,
        /**
         * Specifies the icon from the Polymer icon set.
         *
         * @attribute icon
         * @type string
         * @default ''
         */
        icon: '',
        bx: 0,
        by: 0,
        icons: icons,
        ready: function() {
          this.sizeChanged();
        },
        sizeChanged: function() {
          this.style.width = this.style.height = this.size + 'px';
        },
        iconChanged: function() {
          this.index = this.icon in icons ? icons[this.icon] : -1;
        },
        indexChanged: function() {
          this.classList.add('polymer-ui-icons');
          this.by = -this.size * this.index;
          this.updateIcon();
        },
        srcChanged: function() {
          this.classList.remove('polymer-ui-icons');
          this.style.backgroundImage = 'url(' + this.src + ')';
          this.updateIcon();
        },
        themeChanged: function(old) {
          this.style.backgroundPosition = '';
          this.classList.switch(old, this.theme);
          this.asyncMethod('updateIcon');
        },
        updateIcon: function() {
          if (this.src) {
            this.style.backgroundPosition = 'center';
          } else {
            //this.bx = parseFloat(getComputedStyle(this).backgroundPosition.split(' ').shift());
            //this.style.backgroundPosition = (this.bx + 'px') + ' ' + (this.by + 'px');
            this.style.backgroundPositionY = this.by + 'px';
          }
        }
      });
    })();
  ;

    Polymer('polymer-ui-icon-button', {
      /**
       * The URL of an image for the icon.
       *
       * @attribute src
       * @type string
       * @default ''
       */
      src: '',
      /**
       * If true, border is placed around the button to indicate
       * active state.
       *
       * @attribute active
       * @type boolean
       * @default false
       */
      active: false,
      /**
       * Specifies the icon from the Polymer icon set.
       *
       * @attribute icon
       * @type string
       * @default ''
       */
      icon: '',
      /**
       * If a theme is applied that includes an icon set, the index of the 
       * icon to display.
       *
       * @attribute index
       * @type number
       * @default -1
       */     
      index: -1,
      activeChanged: function() {
        // TODO(sjmiles): sugar this common case
        this.classList.toggle('selected', this.active);
      }
    });
  