sap.ui.core.UIComponent.extend('my.simple.app.Component', {
    metadata: {
        name: 'Sample my.simple.app app',
        version: '1.0.0',
        includes: ['css/styles.css'],
        dependencies: {
            libs: ['sap.m']
        },
        rootView: 'my.simple.app.view.App'
    },

    init: function() {

        var that = this;
        var oPreprocessors = {};

        // when auto prefixing is enabled we add the prefix
        if (this.getAutoPrefixId()) {
            oPreprocessors.id = function(sId) {
                return that.createId(sId);
            };
        }

        // create the routing
        var oMetadata = this.getMetadata();
        // extend the metadata config, so that the metadata object cannot be modified afterwards
        var oRoutingConfig = jQuery.extend({}, oMetadata.getRoutingConfig());
        var aRoutes = oMetadata.getRoutes();

        // create the router for the component instance
        if (aRoutes) {
            jQuery.sap.require("sap.ui.core.routing.Router");
            var fnRouterConstructor = oRoutingConfig.routerClass || sap.ui.core.routing.Router;
            if (typeof fnRouterConstructor === "string") {
                fnRouterConstructor = jQuery.sap.getObject(fnRouterConstructor);
            }

            this._oRouter = new fnRouterConstructor(aRoutes, oRoutingConfig, this);
        }

        // create the content
        this.runAsOwner(function() {
            sap.ui.base.ManagedObject.runWithPreprocessors(function() {
                that.setAggregation("rootControl", that.createContent());
            }, oPreprocessors);
        });
    }
});