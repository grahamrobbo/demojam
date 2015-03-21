sap.ui.controller('my.simple.app.view.App', {

    onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel({
            cities: [{
                id: "SYD",
                name: "Sydney"
            }, {
                id: "MEL",
                name: "Melbourne"
            }],
            items: [{
                description: "Master data quality check",
                errors: 4,
                cityId: "A1"
            }, {
                description: "Pre payroll process",
                errors: 8,
                cityId: "A1"
            }, {
                description: "Errors from payroll run",
                errors: 0,
                cityId: "A2"
            }, {
                description: "Payroll data validations",
                errors: 20,
                cityId: "A1"
            }]
        }));
    },

    formatter: {
        info: function(errors) {
            return errors ? "Errors" : "All OK";
        },
        infoState: function(errors) {
            return errors ? "Error" : "Success";
        }
    }

});