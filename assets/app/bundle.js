
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function (IconsManifest, SvelteIcon, HiOutlineClipboardCopy, IconsManifest$1, Icon) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var IconsManifest__default = /*#__PURE__*/_interopDefaultLegacy(IconsManifest);
    var SvelteIcon__default = /*#__PURE__*/_interopDefaultLegacy(SvelteIcon);
    var HiOutlineClipboardCopy__default = /*#__PURE__*/_interopDefaultLegacy(HiOutlineClipboardCopy);
    var IconsManifest__default$1 = /*#__PURE__*/_interopDefaultLegacy(IconsManifest$1);
    var Icon__default = /*#__PURE__*/_interopDefaultLegacy(Icon);

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const PAGE = {
      HOME: 1,
      PACK: 2,
      SEARCH: 3,
    };

    function createAppState() {
      const { subscribe, set, update } = writable({
        page: PAGE.HOME,
        param: null,
      });

      return {
        subscribe,
        clear: () => set([]),
        setPage: (pageId, param = null) =>
          set({
            page: pageId,
            param,
          }),
        __update: (id) =>
          update((state) => {
            return state;
          }),
      };
    }

    const appState = createAppState();

    /* src/components/SvelteLogo.svelte generated by Svelte v3.48.0 */

    const file$6 = "src/components/SvelteLogo.svelte";

    function create_fragment$7(ctx) {
    	let svg;
    	let style;
    	let t;
    	let path0;
    	let path1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			style = svg_element("style");
    			t = text(".st0 {\n      fill: #ff3e00;\n    }\n    .st1 {\n      fill: #ffffff;\n    }\n  ");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(style, "type", "text/css");
    			add_location(style, file$6, 10, 23, 245);
    			attr_dev(path0, "class", "st0");
    			attr_dev(path0, "d", "M91.8,15.6C80.9-0.1,59.2-4.7,43.6,5.2L16.1,22.8C8.6,27.5,3.4,35.2,1.9,43.9c-1.3,7.3-0.2,14.8,3.3,21.3\n\tc-2.4,3.6-4,7.6-4.7,11.8c-1.6,8.9,0.5,18.1,5.7,25.4c11,15.7,32.6,20.3,48.2,10.4l27.5-17.5c7.5-4.7,12.7-12.4,14.2-21.1\n\tc1.3-7.3,0.2-14.8-3.3-21.3c2.4-3.6,4-7.6,4.7-11.8C99.2,32.1,97.1,22.9,91.8,15.6");
    			add_location(path0, file$6, 18, 2, 358);
    			attr_dev(path1, "class", "st1");
    			attr_dev(path1, "d", "M40.9,103.9c-8.9,2.3-18.2-1.2-23.4-8.7c-3.2-4.4-4.4-9.9-3.5-15.3c0.2-0.9,0.4-1.7,0.6-2.6l0.5-1.6l1.4,1\n\tc3.3,2.4,6.9,4.2,10.8,5.4l1,0.3l-0.1,1c-0.1,1.4,0.3,2.9,1.1,4.1c1.6,2.3,4.4,3.4,7.1,2.7c0.6-0.2,1.2-0.4,1.7-0.7L65.5,72\n\tc1.4-0.9,2.3-2.2,2.6-3.8c0.3-1.6-0.1-3.3-1-4.6c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7l-10.5,6.7\n\tc-1.7,1.1-3.6,1.9-5.6,2.4c-8.9,2.3-18.2-1.2-23.4-8.7c-3.1-4.4-4.4-9.9-3.4-15.3c0.9-5.2,4.1-9.9,8.6-12.7l27.5-17.5\n\tc1.7-1.1,3.6-1.9,5.6-2.5c8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.2,0.9-0.4,1.7-0.7,2.6l-0.5,1.6l-1.4-1\n\tc-3.3-2.4-6.9-4.2-10.8-5.4l-1-0.3l0.1-1c0.1-1.4-0.3-2.9-1.1-4.1c-1.6-2.3-4.4-3.3-7.1-2.6c-0.6,0.2-1.2,0.4-1.7,0.7L32.4,46.1\n\tc-1.4,0.9-2.3,2.2-2.6,3.8s0.1,3.3,1,4.6c1.6,2.3,4.4,3.3,7.1,2.6c0.6-0.2,1.2-0.4,1.7-0.7l10.5-6.7c1.7-1.1,3.6-1.9,5.6-2.5\n\tc8.9-2.3,18.2,1.2,23.4,8.7c3.2,4.4,4.4,9.9,3.5,15.3c-0.9,5.2-4.1,9.9-8.6,12.7l-27.5,17.5C44.8,102.5,42.9,103.3,40.9,103.9");
    			add_location(path1, file$6, 23, 2, 695);
    			attr_dev(svg, "width", "50");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "id", "Layer_1");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "x", "0px");
    			attr_dev(svg, "y", "0px");
    			attr_dev(svg, "viewBox", "0 0 98.1 118");
    			set_style(svg, "enable-background", "new 0 0 98.1 118");
    			attr_dev(svg, "xml:space", "preserve");
    			add_location(svg, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, style);
    			append_dev(style, t);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SvelteLogo', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SvelteLogo> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SvelteLogo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SvelteLogo",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/LeftMenu.svelte generated by Svelte v3.48.0 */
    const file$5 = "src/components/LeftMenu.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (91:4) {#each IconsManifest as item}
    function create_each_block$1(ctx) {
    	let li;
    	let a;
    	let t0_value = /*item*/ ctx[2].name + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(a, "href", "#/pack/" + /*item*/ ctx[2].path);
    			attr_dev(a, "class", "icon-pack svelte-1nvbgap");
    			toggle_class(a, "liActive", /*item*/ ctx[2].path === /*$appState*/ ctx[0].param);
    			add_location(a, file$5, 92, 8, 1826);
    			add_location(li, file$5, 91, 6, 1813);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, t0);
    			append_dev(li, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*IconsManifest, $appState*/ 1) {
    				toggle_class(a, "liActive", /*item*/ ctx[2].path === /*$appState*/ ctx[0].param);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(91:4) {#each IconsManifest as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let nav;
    	let a;
    	let div1;
    	let sveltelogo;
    	let t0;
    	let div0;
    	let t2;
    	let div2;
    	let input;
    	let t3;
    	let ul;
    	let current;
    	let mounted;
    	let dispose;
    	sveltelogo = new SvelteLogo({ $$inline: true });
    	let each_value = IconsManifest__default["default"];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			a = element("a");
    			div1 = element("div");
    			create_component(sveltelogo.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "@deboxsoft/svelte-icons";
    			t2 = space();
    			div2 = element("div");
    			input = element("input");
    			t3 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "title svelte-1nvbgap");
    			add_location(div0, file$5, 83, 6, 1608);
    			attr_dev(div1, "class", "top svelte-1nvbgap");
    			add_location(div1, file$5, 81, 4, 1563);
    			attr_dev(a, "href", "#/");
    			add_location(a, file$5, 80, 2, 1545);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Search icons");
    			attr_dev(input, "class", "svelte-1nvbgap");
    			add_location(input, file$5, 87, 4, 1687);
    			add_location(div2, file$5, 86, 2, 1677);
    			attr_dev(ul, "class", "svelte-1nvbgap");
    			add_location(ul, file$5, 89, 2, 1768);
    			attr_dev(nav, "class", "svelte-1nvbgap");
    			add_location(nav, file$5, 79, 0, 1537);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, a);
    			append_dev(a, div1);
    			mount_component(sveltelogo, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(nav, t2);
    			append_dev(nav, div2);
    			append_dev(div2, input);
    			append_dev(nav, t3);
    			append_dev(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*onChanged*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*IconsManifest, $appState*/ 1) {
    				each_value = IconsManifest__default["default"];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sveltelogo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sveltelogo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_component(sveltelogo);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function debounce(func, wait, immediate) {
    	var timeout;

    	return function executedFunction() {
    		var context = this;
    		var args = arguments;

    		var later = function () {
    			timeout = null;
    			if (!immediate) func.apply(context, args);
    		};

    		var callNow = immediate && !timeout;
    		clearTimeout(timeout);
    		timeout = setTimeout(later, wait);
    		if (callNow) func.apply(context, args);
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $appState;
    	validate_store(appState, 'appState');
    	component_subscribe($$self, appState, $$value => $$invalidate(0, $appState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LeftMenu', slots, []);

    	var onChanged = debounce(
    		function (ev) {
    			const searchVal = ev.target.value;
    			location.hash = "#/search/" + searchVal;
    		},
    		500
    	);

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LeftMenu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		appState,
    		SvelteLogo,
    		IconsManifest: IconsManifest__default["default"],
    		debounce,
    		onChanged,
    		$appState
    	});

    	$$self.$inject_state = $$props => {
    		if ('onChanged' in $$props) $$invalidate(1, onChanged = $$props.onChanged);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$appState, onChanged];
    }

    class LeftMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LeftMenu",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/IconsTable.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$2 } = globals;
    const file$4 = "src/components/IconsTable.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (194:0) {#if !!copiedIconName}
    function create_if_block$2(ctx) {
    	let h3;
    	let t1;
    	let code;
    	let t2;
    	let span0;
    	let t3;
    	let t4;
    	let span1;
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let t9;
    	let t10;
    	let button;
    	let svelteicon;
    	let current;
    	let mounted;
    	let dispose;

    	svelteicon = new SvelteIcon__default["default"]({
    			props: { src: HiOutlineClipboardCopy__default["default"], size: 16 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Import";
    			t1 = space();
    			code = element("code");
    			t2 = text("import\n    ");
    			span0 = element("span");
    			t3 = text(/*copiedIconName*/ ctx[2]);
    			t4 = text("\n    from\n    ");
    			span1 = element("span");
    			t5 = text("\"svelte-icons-pack/");
    			t6 = text(/*copiedIconNamePath*/ ctx[5]);
    			t7 = text("/");
    			t8 = text(/*copiedIconName*/ ctx[2]);
    			t9 = text("\"");
    			t10 = text(";\n    ");
    			button = element("button");
    			create_component(svelteicon.$$.fragment);
    			attr_dev(h3, "class", "svelte-14uangj");
    			add_location(h3, file$4, 194, 2, 4157);
    			set_style(span0, "color", "#9cdcfe");
    			add_location(span0, file$4, 197, 4, 4197);
    			set_style(span1, "color", "#ce9178");
    			add_location(span1, file$4, 199, 4, 4262);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "title", "Copy to clipboard");
    			attr_dev(button, "class", "svelte-14uangj");
    			add_location(button, file$4, 201, 4, 4366);
    			attr_dev(code, "class", "svelte-14uangj");
    			add_location(code, file$4, 195, 2, 4175);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, code, anchor);
    			append_dev(code, t2);
    			append_dev(code, span0);
    			append_dev(span0, t3);
    			append_dev(code, t4);
    			append_dev(code, span1);
    			append_dev(span1, t5);
    			append_dev(span1, t6);
    			append_dev(span1, t7);
    			append_dev(span1, t8);
    			append_dev(span1, t9);
    			append_dev(code, t10);
    			append_dev(code, button);
    			mount_component(svelteicon, button, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*onCopyImport*/ ctx[8], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*copiedIconName*/ 4) set_data_dev(t3, /*copiedIconName*/ ctx[2]);
    			if (!current || dirty & /*copiedIconNamePath*/ 32) set_data_dev(t6, /*copiedIconNamePath*/ ctx[5]);
    			if (!current || dirty & /*copiedIconName*/ 4) set_data_dev(t8, /*copiedIconName*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelteicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelteicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(code);
    			destroy_component(svelteicon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(194:0) {#if !!copiedIconName}",
    		ctx
    	});

    	return block;
    }

    // (211:2) {#each iconsList as ic}
    function create_each_block(ctx) {
    	let div2;
    	let div0;
    	let svelteicon;
    	let t0;
    	let div1;
    	let t1_value = /*ic*/ ctx[12] + "";
    	let t1;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;

    	svelteicon = new SvelteIcon__default["default"]({
    			props: {
    				src: /*icons*/ ctx[6][/*ic*/ ctx[12]],
    				size: 30
    			},
    			$$inline: true
    		});

    	function click_handler() {
    		return /*click_handler*/ ctx[9](/*ic*/ ctx[12]);
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(svelteicon.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(div0, "class", "icon svelte-14uangj");
    			add_location(div0, file$4, 215, 6, 4749);
    			attr_dev(div1, "class", "icon-name svelte-14uangj");
    			add_location(div1, file$4, 218, 6, 4836);
    			attr_dev(div2, "class", "icon-blk svelte-14uangj");
    			toggle_class(div2, "iconActive", /*ic*/ ctx[12] === /*copiedIconName*/ ctx[2]);
    			add_location(div2, file$4, 211, 4, 4628);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(svelteicon, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, t1);
    			append_dev(div2, t2);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const svelteicon_changes = {};
    			if (dirty & /*icons, iconsList*/ 65) svelteicon_changes.src = /*icons*/ ctx[6][/*ic*/ ctx[12]];
    			svelteicon.$set(svelteicon_changes);
    			if ((!current || dirty & /*iconsList*/ 1) && t1_value !== (t1_value = /*ic*/ ctx[12] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*iconsList, copiedIconName*/ 5) {
    				toggle_class(div2, "iconActive", /*ic*/ ctx[12] === /*copiedIconName*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelteicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelteicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(svelteicon);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(211:2) {#each iconsList as ic}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let t0;
    	let h2;
    	let t1;
    	let t2;
    	let input;
    	let t3;
    	let div0;
    	let t4;
    	let div1;
    	let t5;
    	let current;
    	let if_block = !!/*copiedIconName*/ ctx[2] && create_if_block$2(ctx);
    	let each_value = /*iconsList*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t0 = space();
    			h2 = element("h2");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			input = element("input");
    			t3 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div1 = element("div");
    			t5 = text(/*notifyText*/ ctx[4]);
    			attr_dev(h2, "class", "svelte-14uangj");
    			add_location(h2, file$4, 207, 0, 4530);
    			attr_dev(input, "id", "copy-input");
    			attr_dev(input, "class", "svelte-14uangj");
    			add_location(input, file$4, 208, 0, 4547);
    			attr_dev(div0, "class", "icons-list svelte-14uangj");
    			add_location(div0, file$4, 209, 0, 4573);
    			attr_dev(div1, "class", "notify svelte-14uangj");
    			toggle_class(div1, "notifyActive", /*notifyActive*/ ctx[3]);
    			add_location(div1, file$4, 223, 0, 4899);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, input, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			insert_dev(target, t4, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t5);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!!/*copiedIconName*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*copiedIconName*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t0.parentNode, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);

    			if (dirty & /*iconsList, copiedIconName, onClickIcon, icons*/ 197) {
    				each_value = /*iconsList*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*notifyText*/ 16) set_data_dev(t5, /*notifyText*/ ctx[4]);

    			if (dirty & /*notifyActive*/ 8) {
    				toggle_class(div1, "notifyActive", /*notifyActive*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(input);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconsTable', slots, []);
    	let { iconsList } = $$props;
    	let { title = "Icons" } = $$props;
    	let notifyActive;
    	let notifyText;
    	let copiedIconName;
    	let copiedIconNamePath;
    	let hideNotify;
    	let icons = {};

    	for (const ic of IconsManifest__default$1["default"]) {
    		icons = { ...icons, ...ic.icons };
    	}

    	function getPackPath(iconName) {
    		for (const ic of IconsManifest__default$1["default"]) {
    			if (Object.keys(ic.icons).indexOf(iconName) >= 0) {
    				return ic.path;
    			}
    		}

    		return "Unknown";
    	}

    	function onClickIcon(iconName) {
    		const copyText = document.getElementById("copy-input");

    		if (copyText) {
    			copyText.value = iconName;
    			copyText.select();
    			copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    			/* Copy the text inside the text field */
    			document.execCommand("copy");

    			$$invalidate(2, copiedIconName = iconName);
    			$$invalidate(4, notifyText = `Copied '${copiedIconName}' to clipboard`);
    			$$invalidate(3, notifyActive = true);
    			clearTimeout(hideNotify);

    			hideNotify = setTimeout(
    				() => {
    					$$invalidate(3, notifyActive = false);
    				},
    				5000
    			);
    		}
    	}

    	function onCopyImport() {
    		const copyText = document.getElementById("copy-input");

    		if (copyText) {
    			copyText.value = `import ${copiedIconName} from "svelte-icons-pack/${copiedIconNamePath}/${copiedIconName}";`;
    			copyText.select();
    			copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    			/* Copy the text inside the text field */
    			document.execCommand("copy");

    			$$invalidate(4, notifyText = `Copied import to clipboard`);
    			$$invalidate(3, notifyActive = true);
    			clearTimeout(hideNotify);

    			hideNotify = setTimeout(
    				() => {
    					$$invalidate(3, notifyActive = false);
    				},
    				5000
    			);
    		}
    	}

    	const writable_props = ['iconsList', 'title'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconsTable> was created with unknown prop '${key}'`);
    	});

    	const click_handler = ic => onClickIcon(ic);

    	$$self.$$set = $$props => {
    		if ('iconsList' in $$props) $$invalidate(0, iconsList = $$props.iconsList);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({
    		SvelteIcon: SvelteIcon__default["default"],
    		HiOutlineClipboardCopy: HiOutlineClipboardCopy__default["default"],
    		IconsManifest: IconsManifest__default$1["default"],
    		iconsList,
    		title,
    		notifyActive,
    		notifyText,
    		copiedIconName,
    		copiedIconNamePath,
    		hideNotify,
    		icons,
    		getPackPath,
    		onClickIcon,
    		onCopyImport
    	});

    	$$self.$inject_state = $$props => {
    		if ('iconsList' in $$props) $$invalidate(0, iconsList = $$props.iconsList);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('notifyActive' in $$props) $$invalidate(3, notifyActive = $$props.notifyActive);
    		if ('notifyText' in $$props) $$invalidate(4, notifyText = $$props.notifyText);
    		if ('copiedIconName' in $$props) $$invalidate(2, copiedIconName = $$props.copiedIconName);
    		if ('copiedIconNamePath' in $$props) $$invalidate(5, copiedIconNamePath = $$props.copiedIconNamePath);
    		if ('hideNotify' in $$props) hideNotify = $$props.hideNotify;
    		if ('icons' in $$props) $$invalidate(6, icons = $$props.icons);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*iconsList, copiedIconName*/ 5) {
    			{
    				if ((iconsList || []).indexOf(copiedIconName) === -1) {
    					if (Array.isArray(iconsList) && iconsList.length > 0) {
    						$$invalidate(2, copiedIconName = iconsList[0]);
    					} else {
    						$$invalidate(2, copiedIconName = "");
    					}
    				}
    			}
    		}

    		if ($$self.$$.dirty & /*copiedIconName*/ 4) {
    			$$invalidate(5, copiedIconNamePath = getPackPath(copiedIconName));
    		}
    	};

    	return [
    		iconsList,
    		title,
    		copiedIconName,
    		notifyActive,
    		notifyText,
    		copiedIconNamePath,
    		icons,
    		onClickIcon,
    		onCopyImport,
    		click_handler
    	];
    }

    class IconsTable extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { iconsList: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconsTable",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*iconsList*/ ctx[0] === undefined && !('iconsList' in props)) {
    			console.warn("<IconsTable> was created without expected prop 'iconsList'");
    		}
    	}

    	get iconsList() {
    		throw new Error("<IconsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconsList(value) {
    		throw new Error("<IconsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<IconsTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<IconsTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/IconsPackPage.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$1 } = globals;
    const file$3 = "src/pages/IconsPackPage.svelte";

    // (47:0) {#if !!ipack}
    function create_if_block$1(ctx) {
    	let main;
    	let div;
    	let h1;
    	let t0_value = /*ipack*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let table;
    	let tbody;
    	let tr0;
    	let td0;
    	let t3;
    	let td1;
    	let t4_value = /*ipack*/ ctx[0].license + "";
    	let t4;
    	let t5;
    	let tr1;
    	let td2;
    	let t7;
    	let td3;
    	let a;
    	let t8_value = /*ipack*/ ctx[0].sourceUrl + "";
    	let t8;
    	let a_href_value;
    	let t9;
    	let iconstable;
    	let current;

    	iconstable = new IconsTable({
    			props: {
    				iconsList: Object.keys(/*ipack*/ ctx[0].icons).sort()
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			table = element("table");
    			tbody = element("tbody");
    			tr0 = element("tr");
    			td0 = element("td");
    			td0.textContent = "License";
    			t3 = space();
    			td1 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			tr1 = element("tr");
    			td2 = element("td");
    			td2.textContent = "Project";
    			t7 = space();
    			td3 = element("td");
    			a = element("a");
    			t8 = text(t8_value);
    			t9 = space();
    			create_component(iconstable.$$.fragment);
    			attr_dev(h1, "class", "svelte-12glr15");
    			add_location(h1, file$3, 49, 6, 982);
    			attr_dev(td0, "class", "svelte-12glr15");
    			add_location(td0, file$3, 53, 12, 1061);
    			attr_dev(td1, "class", "svelte-12glr15");
    			add_location(td1, file$3, 54, 12, 1090);
    			add_location(tr0, file$3, 52, 10, 1044);
    			attr_dev(td2, "class", "svelte-12glr15");
    			add_location(td2, file$3, 57, 12, 1158);
    			attr_dev(a, "href", a_href_value = /*ipack*/ ctx[0].sourceUrl);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$3, 59, 14, 1206);
    			attr_dev(td3, "class", "svelte-12glr15");
    			add_location(td3, file$3, 58, 12, 1187);
    			add_location(tr1, file$3, 56, 10, 1141);
    			add_location(tbody, file$3, 51, 8, 1026);
    			add_location(table, file$3, 50, 6, 1010);
    			add_location(div, file$3, 48, 4, 970);
    			add_location(main, file$3, 47, 2, 959);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(div, h1);
    			append_dev(h1, t0);
    			append_dev(div, t1);
    			append_dev(div, table);
    			append_dev(table, tbody);
    			append_dev(tbody, tr0);
    			append_dev(tr0, td0);
    			append_dev(tr0, t3);
    			append_dev(tr0, td1);
    			append_dev(td1, t4);
    			append_dev(tbody, t5);
    			append_dev(tbody, tr1);
    			append_dev(tr1, td2);
    			append_dev(tr1, t7);
    			append_dev(tr1, td3);
    			append_dev(td3, a);
    			append_dev(a, t8);
    			append_dev(main, t9);
    			mount_component(iconstable, main, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*ipack*/ 1) && t0_value !== (t0_value = /*ipack*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*ipack*/ 1) && t4_value !== (t4_value = /*ipack*/ ctx[0].license + "")) set_data_dev(t4, t4_value);
    			if ((!current || dirty & /*ipack*/ 1) && t8_value !== (t8_value = /*ipack*/ ctx[0].sourceUrl + "")) set_data_dev(t8, t8_value);

    			if (!current || dirty & /*ipack*/ 1 && a_href_value !== (a_href_value = /*ipack*/ ctx[0].sourceUrl)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			const iconstable_changes = {};
    			if (dirty & /*ipack*/ 1) iconstable_changes.iconsList = Object.keys(/*ipack*/ ctx[0].icons).sort();
    			iconstable.$set(iconstable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconstable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconstable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(iconstable);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(47:0) {#if !!ipack}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !!/*ipack*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!!/*ipack*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ipack*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $appState;
    	validate_store(appState, 'appState');
    	component_subscribe($$self, appState, $$value => $$invalidate(1, $appState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IconsPackPage', slots, []);
    	let ipack;
    	let notifyActive;
    	let copiedIconName;
    	let hideNotify;

    	function onClickIcon(iconName) {
    		const copyText = document.getElementById("copy-input");

    		if (copyText) {
    			copyText.value = iconName;
    			copyText.select();
    			copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    			/* Copy the text inside the text field */
    			document.execCommand("copy");

    			notifyActive = true;
    			copiedIconName = iconName;
    			clearTimeout(hideNotify);

    			hideNotify = setTimeout(
    				() => {
    					notifyActive = false;
    				},
    				5000
    			);
    		}
    	}

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IconsPackPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		IconsManifest: IconsManifest__default["default"],
    		appState,
    		IconsTable,
    		ipack,
    		notifyActive,
    		copiedIconName,
    		hideNotify,
    		onClickIcon,
    		$appState
    	});

    	$$self.$inject_state = $$props => {
    		if ('ipack' in $$props) $$invalidate(0, ipack = $$props.ipack);
    		if ('notifyActive' in $$props) notifyActive = $$props.notifyActive;
    		if ('copiedIconName' in $$props) copiedIconName = $$props.copiedIconName;
    		if ('hideNotify' in $$props) hideNotify = $$props.hideNotify;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$appState*/ 2) {
    			{
    				$$invalidate(0, ipack = IconsManifest__default["default"].find(x => x.path === $appState.param));
    			}
    		}
    	};

    	return [ipack, $appState];
    }

    class IconsPackPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IconsPackPage",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/pages/SearchPage.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1 } = globals;

    function create_fragment$3(ctx) {
    	let iconstable;
    	let current;

    	iconstable = new IconsTable({
    			props: {
    				title: "Found " + /*foundList*/ ctx[0].length + " icons",
    				iconsList: /*foundList*/ ctx[0].sort()
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(iconstable.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(iconstable, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const iconstable_changes = {};
    			if (dirty & /*foundList*/ 1) iconstable_changes.title = "Found " + /*foundList*/ ctx[0].length + " icons";
    			if (dirty & /*foundList*/ 1) iconstable_changes.iconsList = /*foundList*/ ctx[0].sort();
    			iconstable.$set(iconstable_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconstable.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconstable.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(iconstable, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $appState;
    	validate_store(appState, 'appState');
    	component_subscribe($$self, appState, $$value => $$invalidate(2, $appState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SearchPage', slots, []);
    	let foundList = [];
    	let iconsNameList = [];

    	for (const ic of IconsManifest__default["default"]) {
    		iconsNameList = [...iconsNameList, ...Object.keys(ic.icons)];
    	}

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SearchPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		IconsManifest: IconsManifest__default["default"],
    		IconsTable,
    		appState,
    		foundList,
    		iconsNameList,
    		$appState
    	});

    	$$self.$inject_state = $$props => {
    		if ('foundList' in $$props) $$invalidate(0, foundList = $$props.foundList);
    		if ('iconsNameList' in $$props) $$invalidate(1, iconsNameList = $$props.iconsNameList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$appState, iconsNameList*/ 6) {
    			{
    				if ($appState.param) {
    					$$invalidate(0, foundList = iconsNameList.filter(x => {
    						return x.toLowerCase().indexOf($appState.param.toLowerCase()) >= 0;
    					}));
    				} else {
    					$$invalidate(0, foundList = []);
    				}
    			}
    		}
    	};

    	return [foundList, iconsNameList, $appState];
    }

    class SearchPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SearchPage",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    // VscLinkExternal
    var VscLinkExternal = {
      a: {
        viewBox: '0 0 16 16',
        fill: 'currentColor'
      },
      c: '<path d="M1.5 1H6v1H2v12h12v-4h1v4.5l-.5.5h-13l-.5-.5v-13l.5-.5z"></path><path d="M15 1.5V8h-1V2.707L7.243 9.465l-.707-.708L13.293 2H8V1h6.5l.5.5z"></path>'
    };

    /* src/pages/Home.svelte generated by Svelte v3.48.0 */
    const file$2 = "src/pages/Home.svelte";

    function create_fragment$2(ctx) {
    	let div1;
    	let h1;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div0;
    	let a;
    	let t3;
    	let icon;
    	let current;

    	icon = new Icon__default["default"]({
    			props: { src: VscLinkExternal },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Svelte Icons Pack";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			div0 = element("div");
    			a = element("a");
    			t3 = text("README\n      ");
    			create_component(icon.$$.fragment);
    			add_location(h1, file$2, 12, 2, 220);
    			if (!src_url_equal(img.src, img_src_value = "https://img.shields.io/npm/v/svelte-icons-pack.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "npm");
    			add_location(img, file$2, 13, 2, 249);
    			attr_dev(a, "href", "https://github.com/deboxosft/svelte-icons");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$2, 15, 4, 349);
    			attr_dev(div0, "class", "info svelte-x2n362");
    			add_location(div0, file$2, 14, 2, 326);
    			add_location(div1, file$2, 11, 0, 212);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(div1, t1);
    			append_dev(div1, img);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, a);
    			append_dev(a, t3);
    			mount_component(icon, a, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Icon: Icon__default["default"], VscLinkExternal });
    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/MainPage.svelte generated by Svelte v3.48.0 */
    const file$1 = "src/components/MainPage.svelte";

    // (21:43) 
    function create_if_block_2(ctx) {
    	let searchpage;
    	let current;
    	searchpage = new SearchPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(searchpage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(searchpage, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(searchpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(searchpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(searchpage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(21:43) ",
    		ctx
    	});

    	return block;
    }

    // (19:41) 
    function create_if_block_1(ctx) {
    	let iconspackpage;
    	let current;
    	iconspackpage = new IconsPackPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(iconspackpage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(iconspackpage, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconspackpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconspackpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(iconspackpage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(19:41) ",
    		ctx
    	});

    	return block;
    }

    // (17:2) {#if $appState.page === PAGE.HOME}
    function create_if_block(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(17:2) {#if $appState.page === PAGE.HOME}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$appState*/ ctx[0].page === PAGE.HOME) return 0;
    		if (/*$appState*/ ctx[0].page === PAGE.PACK) return 1;
    		if (/*$appState*/ ctx[0].page === PAGE.SEARCH) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "svelte-y0g14o");
    			add_location(div, file$1, 15, 0, 317);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					}

    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $appState;
    	validate_store(appState, 'appState');
    	component_subscribe($$self, appState, $$value => $$invalidate(0, $appState = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MainPage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MainPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		IconsPackPage,
    		SearchPage,
    		Home,
    		appState,
    		PAGE,
    		$appState
    	});

    	return [$appState];
    }

    class MainPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainPage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.48.0 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div2;
    	let div0;
    	let leftmenu;
    	let t;
    	let div1;
    	let mainpage;
    	let current;
    	leftmenu = new LeftMenu({ $$inline: true });
    	mainpage = new MainPage({ $$inline: true });

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(leftmenu.$$.fragment);
    			t = space();
    			div1 = element("div");
    			create_component(mainpage.$$.fragment);
    			attr_dev(div0, "class", "left svelte-1wv9dnp");
    			add_location(div0, file, 57, 2, 1242);
    			attr_dev(div1, "class", "right svelte-1wv9dnp");
    			add_location(div1, file, 60, 2, 1289);
    			attr_dev(div2, "class", "container svelte-1wv9dnp");
    			add_location(div2, file, 56, 0, 1216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(leftmenu, div0, null);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    			mount_component(mainpage, div1, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(leftmenu.$$.fragment, local);
    			transition_in(mainpage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(leftmenu.$$.fragment, local);
    			transition_out(mainpage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(leftmenu);
    			destroy_component(mainpage);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	function urlHashChanged() {
    		const urlHash = location.hash;

    		// console.log("hash", urlHash);
    		const [isPash, pageId, pageParams] = urlHash.split("/");

    		if (isPash && pageId === "pack") {
    			// Pack
    			appState.setPage(PAGE.PACK, pageParams);
    		} else if (isPash && pageId === "search") {
    			appState.setPage(PAGE.SEARCH, pageParams);
    		} else {
    			// Home
    			appState.setPage(PAGE.HOME);
    		}
    	}

    	onMount(() => {
    		window.addEventListener("hashchange", urlHashChanged, false);
    	});

    	onDestroy(() => {
    		window.removeEventListener("hashchange", urlHashChanged);
    	});

    	urlHashChanged();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		onDestroy,
    		appState,
    		PAGE,
    		LeftMenu,
    		MainPage,
    		urlHashChanged
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})(IconsManifest, SvelteIcon, HiOutlineClipboardCopy, IconsManifest$1, Icon);
//# sourceMappingURL=bundle.js.map
