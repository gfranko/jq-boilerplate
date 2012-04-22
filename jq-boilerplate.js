//      jqBoilerPlate - jQuery Stateful Plugin Boilerplate


//		(c) 2012 Greg Franko

//		jqBoilerplate may be freely distributed
//		under the MIT license

/* 
Immediately-Invoked Function Expression (IIFE) [Ben Alman Blog Post]
(http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
that locally passes in `jQuery`, the `window` object, the `document` object,
and an `undefined` variable.  The `jQuery`, `window` and `document` objects 
are passed in locally to improve performance (JavaScript first searches for 
a variable match within the local variables set before searching the global 
variables set).  All of the global variables are also passed in locally to 
be minifier friendly. `undefined` can be passed in locally, because it is not
a reserved word in JavaScript
*/
(function ($, window, document, undefined) {

    /*
    ECMAScript 5 Strict Mode: [John Resig Blog Post]
    (http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
    */
    "use strict";

    //Plugin name (Change this)
    var pluginName = "defaultName",

    //Plugin version number (Change this)
    pluginVersion = "0.1.0",

    //Plugin Object
    // ------------
    //		Holds all of the plugin logic

    /*
    **Convention:** Methods or properties starting with `_` are meant to be 
    private. You can make them public by including them in the return statement
    at the bottom of the Constructor
    */
    Plugin = function(element, options, dataName) {

        //Self (Add to this)
        // -----------------
        //		Stores all of the `Plugin` object instance variables
        var self = {

            //The DOM element that called the plugin
            element: element,

            //The DOM element that called the plugin (wrapped in a jQuery object)
            $element: $(element),

            //The plugin options object
            options: options,

            //The name of the plugin
            dataName: dataName
        },

        //_Callback Support
        // ----------------
        //      Calls the function passed in as the parameter
        _callbackSupport = function(callback) {

            //Checks to make sure the parameter passed in is a function
            if($.isFunction(callback)) {

                /*
                Calls the method passed in as a parameter and sets the context to 
                the `Plugin` object, which is stored in the jQuery `data()`
                method.  This allows for the `this` context to reference the 
                Plugin API Methods in the callback function. The original element 
                that called the plugin(wrapped in a jQuery object) is the only 
                parameter passed back to the callback
                */
                callback.call(self.$element.data(dataName), self.$element);
            }

            //Maintains chainability
            return this;
        },  

        //_Events (Add to this)
        // --------------------
        //      Adds plugin event handlers
        _events = function() {

            //Maintains chainability
            return this;
        },

        //Get Option
        // ---------
        //      Returns a single plugin option
        getOption = function(key, callback) {

            /*
            Returns the plugin option if it exists, and returns undefined if the 
            option does not exist
            */
            return self.options[key] || undefined;    
        },

        //Get Options
        // ----------
        //      Returns all of the plugin options      
        getOptions = function(callback) {
        
            //Returns an object of all of the plugin's options
            return self.options || undefined;
        },

        //Set Option
        // ---------
        //      Replaces a single existing plugin option
        setOption = function(key, value, callback) {

            //Makes sure a string is passed in
            if(typeof key === "string") {
                //Sets the plugin option to the new value provided by the user
                self.options[key] = value;    
            }
            //Provides callback function support
            _callbackSupport(callback);

            //Maintains chainability
            return this;
        },

        //Set Options
        // ----------
        //      Accepts an object to replace plugin options properties
        setOptions = function(newOptions, callback) {
        
            //If the passed in parameter is an object literal
            if($.isPlainObject(newOptions)) {
        
                /*
                Uses the jQuery `extend` method to merge the user specified 
                options object with the self.options` object to create a new 
                object.  The options variable is set to the newly created 
                object.
                */
                self.options = $.extend({}, self.options, newOptions);
            }
  
            //Provide callback function support
            _callbackSupport(callback);

            //Maintains chainability
            return this;
        },

        //Disable (Add to this)
        // --------------------
        //      Disables the DOM element created by the plugin
        disable = function(callback) {
        
            //Provides callback function support
            _callbackSupport(callback);
        
            //Maintains chainability
            return this;
        },

        //Enable (Add to this)
        // -------------------
        //      Enables the DOM element created by the plugin
        enable = function(callback) {
        
            _callbackSupport(callback);
        
            //Maintains chainability
            return this;
        },

        //Destroy (Add to this)
        // --------------------
        //      Brings the page back to it's intial state
        destroy = function(callback) {
        
            //Provides callback function support
            _callbackSupport(callback);
        
            //Maintains chainability
            return this;
        },

        //Create (Add to this)
        // -------------------
        //      Constructs the plugin
        create = function(callback) {

            //Provides callback function support
            _callbackSupport(callback);
              
            //Maintains chainability
            return this;
        };

        //Public API (Add to this if you create custom public methods/properties)
        // -----------------------
        //		All of these methods or properties are public
        
            return {
            
            //**version**: The current version of the plugin
            version: pluginVersion,

            //**self**: Object holding all of the plugin instance properties
            self: self,

            /*
            **getOption**: Returns a single plugin option.
            Accepts one parameter (String key)
            */
            getOption: getOption,

            /*
            **getOptions**: Returns an object containing all of the current 
            plugin options
            Does not accept parameters
            */
            getOptions: getOptions,

            /*
            **setOption**: Sets a single plugin option.
            Accepts two parameters (String key, value)
            */
            setOption: setOption,

            /*
            **setOptions**: Sets or adds new plugin option settings.
            Accepts one parameter (Object newOptions)
            */
            setOptions: setOptions,

            /*
            **disable**: Disables the DOM element associated with the plugin
            Does not accept parameters 
            */
            disable: disable,

            /*
            **enable**: Enables the DOM element associated with the plugin
            Does not accept parameters
            */
            enable: enable,

            /*
            **destroy**: Removes all plugin events, data, and DOM elements
            Does not accept parameters
            */
            destroy: destroy,

            /*
            **create**: Constructs the plugin
            Does not accept parameters
            */
            create: create

            };
        };

        //PLUGIN DEFINITION
        // ----------------
       //		Adds the plugin method to the jQuery prototype object
        $.fn[pluginName] = function (options) {
        
            //Maintains chainability for all calling elements
            return this.each(function () {
        
                /*
                Stores the calling element and the data name into local variables,
                instantiates the plugin variable (which will hold the Plugin 
                object), and instantiates an empty object literal (which will be 
                used to dynamically create a jQuery custom pseudo selector)
                */
                var element = $(this), plugin, dataName = pluginName, obj = {};
        
                /* 
                Returns early if the calling element already has a plugin 
                instance associated with it inside of the jQuery `data` method
                */
                if ($.data(element[0], dataName)) { 
        
                    return;
        
                }
        
                /*
                Uses the jQuery `extend` method to merge the user specified 
                options object with the `self.options`object to create a new 
                object. The options variable is set to the newly created 
                object.
                */
                options = $.extend({}, $.fn[pluginName].options, options);
            
                // Instantiates a new `Plugin` object and creates the plugin
                plugin = new Plugin(this, options, dataName).create();
            
                /*
                Stores the new `Plugin` object in the calling element's 
                jQuery `data` method
                */
                $.data(element[0], dataName, plugin);

                /*
                Uses the name of the plugin to create a dynamic property 
                of an empty object literal
                */
                obj[pluginName] = function(elem) {
                    /*
                    Returns all DOM elements that have jQuery `data()`
                    created by the plugin
                    */
                    return $(elem).data(dataName) !== undefined;
                };

                //Adds custom jQuery pseudo selectors
                $.extend($.expr[":"], obj); 
                //end extending jQuery pseudo selectors
        
            }); //end return statement

        };  //end plugin
    
    //Default plugin Options (Add to this)
    // -----------------------------------
    //		Adds default options to the plugin
    $.fn[pluginName].options = {
   
    };

//      End of Plugin
}(jQuery, window, document));
//passes in the `jQuery`, `window`, and `document` global objects locally