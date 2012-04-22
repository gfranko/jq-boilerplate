jq-boilerplate - Build stateful jQuery widgets
==============

##Description
If you are not using the jQueryUI Widget Factory to build stateful UI widgets, you might feel lost about how to properly organize your jQuery plugin code.  Jq-Boilerplate uses the Revealing Module Object-Oriented Design Pattern to organize and provide structure to a stateful jQuery plugin.

##The Revealing Module Pattern
The Revealing Module Pattern uses closures to allow both private and public plugin properties.  Privacy is very useful when you want to provide a public API while also hiding certain plugin functionality from a user.

##Notable Features
-Provides a ready-made public API and private methods (All private methods are preceded with an underscore)

-Protects against multiple plugin instances being created

-Provides a custom jQuery pseudo-selector for your plugin

-Default plugin options can be retrieved and set at any time using the 4 completed 
 methods provided (getOption(), getOptions(), setOption(), and setOptions)

-Callback function and chaining support are built-in

-A solution for dealing with the context of the this keyword (all instance properties are inside 
 of an object literal called self)

-Common methods used with stateful plugins are included (events, disable, enable, destroy, create).
 These methods are blank, since your custom jQuery plugin logic will go here.

##Getting Started
**1.** Download jq-boilerplate.js

**2.** Change the `pluginName` and `pluginVersion` variables at the top of the file to your jQuery plugin name and version.

**3.** Write the custom logic for the `create()`, `destroy()`, `enable()`, `disable()`, and `_events`.

**4.** Celebrate!
 