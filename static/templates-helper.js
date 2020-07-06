(function ($) {
	var GX_LABEL_CLASS = "gx-label",
		CONTROL_LABEL_CLASS = "control-label",
		LABEL_CLASS_SUFIX = "Label",
		FORM_CONTROL_CLASS = "form-control",
		NAVBAR_TEXT_CLASS = "navbar-text",
		LABEL_CLASS_REGEX = /(col-(?:xs|sm|md|lg)-\d{1,2})/g;
		
	var registerTemplate = function (cfg) {
		gx.plugdesign.registerTemplate(new gx.plugdesign.Template(cfg));
	};

	var editEnabledHelper = function (control, value) {
		var $span = $(control).parent().find('span');
		if (gx.lang.gxBoolean(value)) {
			$span.parent("p").hide();
		}
		else {
			$span.removeClass(FORM_CONTROL_CLASS);
			var $parent = $span.parent("p");
			if ($parent.length === 0) {
				gx.plugdesign.applyTemplateOnElement("readonly-atts-vars", $span[0], true);
			}
			else {
				$parent.show();
			}
		}
	};
	var editVisibleHelper = function (control, value, max) {
		max = max || 5;

		var label,
			i = max, 
			stopElement = control;

		while (i) {
			stopElement = stopElement.parentNode;
			i--;
		}

		label = gx.html.getFieldLabel(control, stopElement);
		if (!label)
			return;

		$(control).parent().closest('.gx-form-group', stopElement).toggle(gx.lang.gxBoolean(value));				
	}; 

	var labelClassHelper = function (control, value) {
		value = value.trim();
		var labelEl = gx.html.getFieldLabel(control),
			labelClasses = value.split(" ").join(LABEL_CLASS_SUFIX + " ") + (value ? LABEL_CLASS_SUFIX : ""),
			colClass;

		if (!labelEl)
			return;
		var labelMatch = labelEl.className.match(LABEL_CLASS_REGEX);
		if (labelMatch)
			colClass = labelMatch.join(" ") || "";
		else
			colClass = "";
		labelEl.className = [GX_LABEL_CLASS, colClass, labelClasses, CONTROL_LABEL_CLASS].join(" ");
	};
	
	// Attributes and variables Labels
	registerTemplate({
		name: 'labels',
		selector: 'div.gx-attribute:has(label.' + GX_LABEL_CLASS + ':not([data-gx-sr-only]))',
		excluded: 'div:has(.gx_usercontrol)',
		template: '<div class="form-group gx-form-group">{{$labelEl$}}{{$el$}}</div>',
		setContext: function (context, el) {
			var $labelEl = $(el).find("label." + GX_LABEL_CLASS).addClass(CONTROL_LABEL_CLASS);
			context.labelEl = $labelEl[0];
			return context;
		},
		listeners: {
			control: function (context) {
				return $(context.labelEl).attr('for');
			},
			after: {
				"Class": labelClassHelper
			}
		}
	});

	// Attributes and variables
	registerTemplate({
		name: 'atts-vars',
		selector:'.gx-attribute > input, .gx-attribute > select, .gx-attribute > textarea, .gx-attribute > img:first-child',
		initialize: function (context) {
			var el = $("#" + context.id)[0],
				spanEl = $("#span_" + el.id)[0],
				visible = gx.fn.isVisible(el, 0);

			if (el.tagName != 'IMG' && spanEl) {
				visible = visible || gx.fn.isVisible(spanEl, 0);
			}
			editVisibleHelper(el, visible);
			labelClassHelper(el, el.className.replace(FORM_CONTROL_CLASS, ""));
		},
		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Enabled": editEnabledHelper,
				"Visible": editVisibleHelper
			}
		}
	});

	var readonlyVisibleHelper = function (control, value) {		
		$(control).parent("p").toggle(gx.lang.gxBoolean(value));				
		editVisibleHelper(control, value);
	};

	// Readonly attributes/vars
	registerTemplate({
		name: 'readonly-atts-vars',
		selector: '.gx-attribute span[class^="Readonly"]:not(:has(input[type="checkbox"]))',
		template: '<p class="form-control-static">{{{outerHTML}}}</p>',
		outerHTML: true,
		initialize: function (context) {
			var el = $("#" + context.id)[0];
			if (el) {
				readonlyVisibleHelper(el, gx.fn.isVisible(el, 0));
			}
		},
		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Visible": readonlyVisibleHelper
			}
		}
	});

	var checkboxVisibleHelper = function (control, value) {
		var $checkBoxCt = $(control).parent().closest('.checkbox');
		if (gx.lang.gxBoolean(value)) {
			$checkBoxCt.show();			
			$checkBoxCt.children().show();
		}
		else {
			$checkBoxCt.hide();
		}
		editVisibleHelper(control, value);
	};
	// Checkboxes
	registerTemplate({
		name: 'checkbox',
		selector: '.gx-attribute > input[type="checkbox"], .gx-attribute label > input[type="checkbox"]',
		setContext: function (context, el) {
			context.id = $(el)[0].id;
			return context;
		},
		initialize: function (context) {
			var $el = $("#" + context.id),
				el = $el.get(0),
				$label = $(el).closest('label');
			$label.wrap("<div class='checkbox'></div>");			
			checkboxVisibleHelper(el, gx.fn.isVisible($label[0], 0));			
		},
		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Visible": checkboxVisibleHelper
			}
		}
	});

	// Usercontrol
	registerTemplate({
		name: 'usercontrol',
		onDemandInvoke:true,
		selector: '.gx_usercontrol',
		setContext: function (context, el) {
			context.id = $(el)[0].id;
			return context;
		},
		initialize: function (context) {
			var el = $("#" + context.id)[0];
			if (el) {
				editVisibleHelper(el, gx.fn.isVisible(el, 0));
			}
		},
		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Visible": editVisibleHelper
			}
		}
	});

	// Datepickers
	var datePickerVisibleHandler = function (control, value) {
		this.visible = value;
		var $trigger = $(control).parent().find('.input-group-btn');
		if (gx.lang.gxBoolean(value) && gx.fn.isVisible(control, 0)) {
			if (this.enabled || this.enabled === undefined) {
				$trigger.show();
			}
		}
		else {
			$trigger.hide();
		}

		editVisibleHelper(control, value);
	};
	registerTemplate({
		name: 'datepicker',
		selector: '.dp_container:has(img):has(input)',
		template: ['<div class="dp_container {{alignClass}}" id="{{datePickerCt.id}}">',
						'<div class="input-group">',
							'{{$inputEl$}}',
							'{{$spaneEl$}}',
							'<span class="input-group-btn">',
								'<a class="btn btn-default">',
									'{{$imgEl$}}',
								'</a>',
							'</span>',
						'</div>',
					'</div>'].join(""),
		outerHTML: true,
		setContext: function (context, el) {
			var $el = $(el), 
				align = $el.attr('data-align');
			context.datePickerCt = el;
			context.inputEl = $el.find('input')[0];
			context.imgEl = $el.find('img')[0];
			context.inputElId = context.inputEl.id;
			context.alignClass = (align)? 'pull-' + align: '';
			var $span = $("#span_" + context.inputEl.id);
			if ($span.length > 0) {
				var pEl = $span.parent("p")[0];
				context.spaneEl = (pEl) ? pEl : $span;
				if (pEl){ // When readonly, span is outside .dp_container. We must remove it to prevent duplicates
					$(pEl).remove();
				}
			}
			return context;
		},
		initialize: function (context) {
			var $inputEl = $('#' + context.inputElId);
			var parent = $inputEl.parent().closest('.dp_container');
			parent.find('a').click(function (evtObj) { 
				try {
					if (evtObj.target.nodeName != 'IMG') {
						parent.find('img')[0].click();
						return false;
					}
				}
				catch(e) {
					return false;
				}
			});

			var visible = gx.fn.isVisible($inputEl[0], 0);
			var $span = $("#span_" + context.inputEl.id);
			if ($span.length > 0) 
				visible = visible || gx.fn.isVisible($span[0], 0);
			datePickerVisibleHandler.call(this, $inputEl[0], visible);
		},
		listeners: {
			control: function (context) {
				return context.inputEl.id;
			},
			after: {
				"Enabled": function (control, value) {
					this.enabled = gx.lang.gxBoolean(value);
					var $trigger = $(control).parent().find('.input-group-btn');
					if (gx.lang.gxBoolean(value)) {
						if (this.visible || this.visible === undefined) {
							$trigger.show();
						}
					}
					else {
						$trigger.hide();
					}

					editEnabledHelper(control, value);
				},
				"Visible": datePickerVisibleHandler
			}
		}
	});
	
	var getRootRadioCtrl = function (ctrl) {
		return $(ctrl).parent().closest("span");
	}
	
	var radioCheckedHelper = function(rootRadio) {		
		rootRadio.find(':checked').parent('label').button('toggle');		
	}
	
	var radioValueHelper = function (control) {
		radioCheckedHelper(getRootRadioCtrl(control));		
	};
	
	var radioSetEnabled = function (rootRadio, enabled){
		var radioLabels = rootRadio.find('label');
		if (!enabled) {
			radioLabels.attr('disabled', 'disabled');	
			rootRadio.find('input, label').css('pointer-events', 'auto');			
			radioLabels.addClass('disabled');
		}
		else {
			radioLabels.removeAttr('disabled');
			radioLabels.removeClass('disabled');
		}
	};
	var radioEnabledHelper = function (el, enabled){
		radioSetEnabled(getRootRadioCtrl(el), enabled);
	}
	
	var radioInitialized = function (rootRadio) {
		return $(rootRadio).prop('initialized');
	}
	//Radio Buttons
	registerTemplate({
		name: 'radio-button',
		selector: '.gx-radio-button label',
		setContext: function (context, el) {
			var rootCtrl = getRootRadioCtrl(el);
			context.name = $(el).children('input').attr('name');
			context.spanEl = rootCtrl;
			if (!radioInitialized(rootCtrl)) {
				rootCtrl.children('label').addClass('gx-radio-label btn btn-default');
				var disabled = $(el).children().prop('disabled');
				radioCheckedHelper(rootCtrl);
				radioSetEnabled(rootCtrl, !(disabled === true || disabled === 'disabled'));
				rootCtrl.find('script').remove();
				rootCtrl.attr('data-toggle', 'buttons');
				var suffix = (rootCtrl.hasClass('gx-radio-button-vertical')) ? '-vertical' : '';
				rootCtrl
					.addClass('btn-group' + suffix)
					.removeClass('gx-radio-button-vertical')
					.css('vertical-align','baseline');
			}			
			return context;
		},
		
		initialize: function (context) {
			editVisibleHelper(context.spanEl[0], gx.fn.isVisible(context.spanEl[0], 0));
			if (!radioInitialized(context.spanEl)) {
				context.spanEl.prop('initialized', true);
				context.spanEl.children('label').on('click', function() {
					var $el = $(this).children('input');
					$el.focus();
					$el.attr('checked', '');
					$el.prop('checked', true);
					gx.evt.onchange($el.get(0));
				});
			}
		},
		
		listeners: {
			control: function (context) {
				return context.name;
			},
			after: {
				"Visible": editVisibleHelper,
				"Enabled": radioEnabledHelper,
				"Value": radioValueHelper
			}
		}
	});
	

	// Prompts
	registerTemplate({
		name: 'prompt',
		selector: function (baseSelector) {
			return $(baseSelector + 'a:has(img[id*="PROMPT"])')
						.prevUntil("", "input, select");
		},
		template: '<div class="input-group">{{$inputEl$}}<span class="input-group-btn">{{$promptEl$}}</span></div>',
		setContext: function (context, el) {
			context.inputEl = el;
			context.promptEl = $(el)
								.nextUntil("", 'a:has(img[id*="PROMPT"])')
								.addClass("btn btn-default");
			return context;
		},
		listeners: {
			control: function (context) {
				return context.inputEl.id;
			},
			before: {
				"Visible": function (control, value) {
					var $parent = $(control).parent();
					if (gx.lang.gxBoolean(value)) {
						$parent.show();
					}
					else {
						$parent.hide();
					}
				},
				"Enabled": function (control, value) {
					var $trigger = $(control).parent().find('.input-group-btn');
					if (gx.lang.gxBoolean(value)) {
						$trigger.show();
					}
					else {
						$trigger.hide();
					}
				}
			}
		}
	});

	// GeoLocation
	var geolocationVisibleHandler = function (control, value) {
		var $parent = $(control).parent();
		if (gx.lang.gxBoolean(value)) {
			$parent.show();
		}
		else {
			$parent.hide();
		}
	};
	registerTemplate({
		name: 'geolocation',
		selector: 'input + img.GeoLocOption',
		template: '<div class="input-group"><div id="{{inputEl.id}}_hook"></div><span class="input-group-btn"><a class="btn btn-default"><div id="{{inputEl.id}}_trigger_hook"></div></a></span></div>',
		setContext: function (context, el) {
			context.inputEl = $(el).prev()[0];
			context.triggerEl = $(el)[0];
			return context;
		},
		initialize: function (context) {
			gx.evt.attach(context.el, 'click',
				function() {
					gx.geolocation.getMyPosition(this);
				}
			);
			$("#" + context.inputEl.id + "_hook").replaceWith(context.inputEl);
			$("#" + context.inputEl.id + "_trigger_hook").replaceWith(context.triggerEl);
			geolocationVisibleHandler.call(this, context.inputEl, gx.fn.isVisible(context.inputEl, 0));
		},
		listeners: {
			control: function (context) {
				return context.inputEl.id;
			},
			before: {
				"Visible": geolocationVisibleHandler,
				"Enabled": function (control, value) {
					var $trigger = $(control).parent().find('.input-group-btn');
					if (gx.lang.gxBoolean(value)) {
						$trigger.show();
					}
					else {
						$trigger.hide();
					}
				}
			}
		}

	});

	// Multimedia upload dialog
	registerTemplate({
		name: 'multimedia-upload',
		selector: '.gx-multimedia-upload .fields-ct',
		template: [	'<div class="row">',
						'<div class="col-sm-4">',
							'<div class="row">',
								'<div class="col-sm-12">',
									'<div id="{{fileField.id}}_fileOption_hook"></div>',
								'</div>',
								'<div class="col-sm-12">',
									'<div id="{{fileField.id}}_uriOption_hook"></div>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="col-sm-8">',
							'<div id="{{fileField.id}}_uriField_hook"></div>',
							'<div id="{{fileField.id}}_fileField_hook"></div>',
						'</div>',
					'</div>',
					'<div class="row">',
						'<div class="col-sm-12">',
							'<div id="{{fileField.id}}_button_hook"></div>',
						'</div>',
					'</div>'
		].join(""),
		applyTo: 'inner',
		setContext: function (context, el) {
			var container = $(el).parent().closest(".gx-multimedia-upload")[0];
			var multimediaEls = gx.html.multimediaUpload.getElements(container);
			multimediaEls.fileOptionLbl = multimediaEls.fileOption.parentNode.cloneNode(true);
			multimediaEls.uriOptionLbl = multimediaEls.uriOption.parentNode.cloneNode(true);
			gx.lang.apply(context, multimediaEls);
			context.container = container;
			return context;
		},
		initialize: function (context) {
			$("#" + context.fileField.id + "_fileOption_hook").replaceWith(context.fileOptionLbl);
			$("#" + context.fileField.id + "_uriOption_hook").replaceWith(context.uriOptionLbl);
			$("#" + context.fileField.id + "_uriField_hook").replaceWith(context.uriField);
			$("#" + context.fileField.id + "_fileField_hook").replaceWith(context.fileField);
			var $button = $(context.container).find('input[type="button"]');
			$("#" + context.fileField.id + "_button_hook").replaceWith($button[0]);
			$button.attr("class", "btn btn-default Button");
			$(context.uriField).addClass(FORM_CONTROL_CLASS);
			var el = $(context.container)[0];
			if (el) {
				editVisibleHelper(el, gx.fn.isVisible(el, 0));
			}
		},
		listeners: {
			control: function (context) {
				return gx.html.multimediaUpload.CtrlId(context.container.id);
			},
			after: {
				"Visible": function( el, ptyVal) { 
					editVisibleHelper(el, ptyVal, 7);
				}
			}
		}
	});

	// Navbars
	registerTemplate({
		name: 'navbar',
		selector: '.gx-navbar',
		setContext: function (context, el) {
			context.toggleBtn = $(el).find('.gx-navbar-toggle');
			context.navBarInner = $(el).find('.gx-navbar-inner');
			return context;
		},
		initialize: function (context) {
			context.toggleBtn.attr('data-target', '#' + context.navBarInner.attr("id"));
		}
	});
	
	var navbar_draw = function(context) {
		if (context.anchor.get(0).href == location.href) {
			context.anchor.parent().addClass('active');
		}
		else {
			context.anchor.parent().removeClass('active');
		}
	};
	
	// Navbars Textblock with link
	registerTemplate({
		name: 'navbar-textblock-link',
		selector: 'a.gx-navbar-textblock, .gx-navbar-textblock:has(a)',
		template: '{{$anchor$}}',
		setContext: function (context, el) {
			var $el = $(el);
			context.anchor = $el.children('a');
			if (context.anchor.length === 0 && $el.is('a')) {
				context.anchor = $el;
			}
			context.anchor.attr('id', $el.attr('id'));
			context.anchor.attr('class', $el.attr('class'));
			context.anchor.attr('style', $el.attr('style'));
			return context;
		},
		reDraw: navbar_draw,
		initialize: navbar_draw,
		listeners: {
			control: function (context) {
				return context.id;
			},
			before: {
				"Caption": function (control, value) {
					$(control).text(value);
					return true;
				},
				"Link": function (control, value) {
					$(control).attr('href', value);
					return true;
				}
			}
		}
	});

	// Navbars Textblock (text only)
	registerTemplate({
		name: 'navbar-textblock-text',
		selector: 'span.gx-navbar-textblock:not(:has(a))',
		initialize: function (context) {
			$(context.el).addClass(NAVBAR_TEXT_CLASS);
		},
		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Link": function (control, value) {
					var $control = $(control);
					if (value && $control.hasClass(NAVBAR_TEXT_CLASS)) {
						$control.removeClass(NAVBAR_TEXT_CLASS);
						gx.plugdesign.applyTemplateOnElement("navbar-textblock-link", control);
					}
				}
			}
		}
	});
	
	// Navbars Textblock (text only)
	registerTemplate({
		name: 'errorviewer',		
		selector: '.gx_ev div',		
		initialize: function (context) {
			var $errViewerLine = $(context.el),
			$errViewer = $errViewerLine.parent('.gx_ev'),
			posAtt = $errViewer.css("position"),
			floatingPanel = posAtt === 'fixed' || posAtt === 'absolute';
			
			if (floatingPanel) {
				if ($errViewer[0].effect) //WA for disabling Highlight Error Viewer.
					$errViewer[0].effect.end();
				$errViewerLine.addClass('alert alert-dismissible fade in')
				.attr('style', '')
				.attr('role', 'alert')
				.prepend($('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'));		
			}
		}
	});

	//TextArea AutoExpand
	registerTemplate({		
		name: 'textarea-auto-expand',		
		selector: '.gx-attribute > textarea[data-gx-text-maxlines]',
		
		setContext: function (context, el) {
			context.el = $(el);
			return context;
		},
		initialize: function (context) {
			var $el = context.el,
				el = $el[0], $window = $(window), 
				minLines = parseInt($el.attr('rows'), 10),
				maxLines = parseInt($el.attr('data-gx-text-maxlines'), 10);
			$el.css('overflow-x', 'hidden');
			var setRows = function ($ctrl, rows, increment) {
				rows = rows + increment;
				$ctrl.attr('rows', rows);	
				return rows;
			}
			var autoExpand = function() {			
				var scrollPos = $window.scrollTop(),
					rows = parseInt($(this).attr('rows'), 10),
					$this = $(this);
				
				while (rows > minLines && this.scrollHeight >= this.clientHeight)
				{										
					rows = setRows($this, rows, -1);
				}
				while ($(this).val() !== '' && (rows < maxLines) && this.scrollHeight > this.clientHeight)
				{				
					rows = setRows($this, rows, 1);	
				}
				
				$window.scrollTop(scrollPos);
			};
			gx.evt.attach(el, ['input', 'keyup'], autoExpand.closure(el, []));
			gx.evt.on_ready(el, autoExpand.closure(el, []))
		}
	});

	var imageIsScaled = function ($imgEl) {
		return ($imgEl.css('box-sizing') === 'border-box' && $imgEl.css('display') === 'block') && 
				($imgEl.css('background-size') === 'contain' || 
					$imgEl.css('background-size') === 'cover' ||
					$imgEl.css('background-size') === '100% 100%' ||
					$imgEl.css('background-repeat') === 'repeat');
	};

	var setImageAlignAttr = function ($imgEl) {
		var $baseEl = $imgEl;
		if (imageIsScaled($imgEl)) {
			if ($imgEl.parent('a').length > 0)
				$baseEl = $imgEl.parent('a');
			$baseEl.parent('div[data-align-inner]')
				.parent()
					.parent()
						.attr('data-align-image', '');
		}
	};

	//Images
	registerTemplate({
		name: 'image',
		selector: 'img[data-gx-image]',

		setContext: function (context, el) {
			context.el = $(el);
			return context;
		},
		initialize: function (context) {
			var $el = context.el,
				src = $el.get(0).currentSrc || $el.attr('src');

			if (src && imageIsScaled($el)) {
				$el.css('background-image', 'url(' + src + ')')
			}

			setImageAlignAttr($el);
		},

		listeners: {
			control: function (context) {
				return context.id;
			},
			after: {
				"Bitmap": function (control, value) {
					var $imgEl = $(control);
					if (value && imageIsScaled($imgEl)) {
						$imgEl.css('background-image', 'url(' + value + ')');
					}
					else {
						$imgEl.css('background-image', 'none');
					}
				},

				"Class": function (control) {
					var $imgEl = $(control);
					if (control.src && imageIsScaled($imgEl)) {
						$imgEl.css('background-image', 'url(' + control.src + ')');
					}
					else {
						$imgEl.css('background-image', 'none');
					}
					setImageAlignAttr($imgEl);
				}
			}
		}
	});
}(gx.$));
