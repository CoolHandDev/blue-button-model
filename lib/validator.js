"use strict";
/*jslint node: true */

var validator = function validator() {

    var fs = require("fs");
    var ZSchema = require("z-schema");
    var lastError;

    //setup references
    var shared = fs.readFileSync(__dirname + '/schemas/shared.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/common_models', shared);
    var sharedSchema = {
        '$ref': 'http://local.com/common_models'
    };

    var demographics = fs.readFileSync(__dirname + '/schemas/demographics.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/demographics', demographics);
    var demographicsSchema = {
        '$ref': 'http://local.com/demographics'
    };

    var allergy = fs.readFileSync(__dirname + '/schemas/allergy.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/allergy', allergy);
    var allergySchema = {
        '$ref': 'http://local.com/allergy'
    };

    var encounter = fs.readFileSync(__dirname + '/schemas/encounter.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/encounter', encounter);
    var encounterSchema = {
        '$ref': 'http://local.com/encounter'
    };

    var immunization = fs.readFileSync(__dirname + '/schemas/immunization.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/immunization', immunization);
    var immunizationSchema = {
        '$ref': 'http://local.com/immunization'
    };

    var medication = fs.readFileSync(__dirname + '/schemas/medication.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/medication', medication);
    var medicationSchema = {
        '$ref': 'http://local.com/medication'
    };

    var problem = fs.readFileSync(__dirname + '/schemas/problem.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/problem', problem);
    var problemSchema = {
        '$ref': 'http://local.com/problem'
    };

    var procedure = fs.readFileSync(__dirname + '/schemas/procedure.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/procedure', procedure);
    var procedureSchema = {
        '$ref': 'http://local.com/procedure'
    };

    var plan_of_care = fs.readFileSync(__dirname + '/schemas/plan_of_care.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/plan_of_care', plan_of_care);
    var plan_of_careSchema = {
        '$ref': 'http://local.com/plan_of_care'
    };

    var payers = fs.readFileSync(__dirname + '/schemas/payers.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/payers', payers);
    var payersSchema = {
        '$ref': 'http://local.com/payers'
    };

    var result = fs.readFileSync(__dirname + '/schemas/result.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/result', result);
    var resultSchema = {
        '$ref': 'http://local.com/result'
    };

    var social_history = fs.readFileSync(__dirname + '/schemas/social_history.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/social_history', social_history);
    var socialHistorySchema = {
        '$ref': 'http://local.com/social_history'
    };

    var vital = fs.readFileSync(__dirname + '/schemas/vital.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/vital', vital);
    var vitalSchema = {
        '$ref': 'http://local.com/vital'
    };

    var insurance = fs.readFileSync(__dirname + '/schemas/insurance.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/insurance', insurance);
    var insuranceSchema = {
        '$ref': 'http://local.com/insurance'
    };

    var claim = fs.readFileSync(__dirname + '/schemas/claim.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/claim', claim);
    var claimSchema = {
        '$ref': 'http://local.com/claim'
    };

    var provider = fs.readFileSync(__dirname + '/schemas/provider.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/provider', provider);
    var providerSchema = {
        '$ref': 'http://local.com/provider'
    };

    var medical_device = fs.readFileSync(__dirname + '/schemas/medical_device.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/medical_device', medical_device);
    var medicalDeviceSchema = {
        '$ref': 'http://local.com/medical_device'
    };

    var family_history = fs.readFileSync(__dirname + '/schemas/family_history.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/family_history', family_history);
    var familyHistorySchema = {
        '$ref': 'http://local.com/family_history'
    };

    var participant = fs.readFileSync(__dirname + '/schemas/participant.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/participant', participant);
    var participantSchema = {
        '$ref': 'http://local.com/participant'
    };

    var document_model = fs.readFileSync(__dirname + '/schemas/document_model.json', 'utf8');
    ZSchema.setRemoteReference('http://local.com/document_model', document_model);
    var documentModelSchema = {
        '$ref': 'http://local.com/document_model'
    };

    var zschema = new ZSchema({
        sync: true,
        noExtraKeywords: true
    });
    //add a key function value object that keeps track of which key goes with
    //what function

    var keySchemaMap = {};
    keySchemaMap.shared = sharedSchema;
    keySchemaMap.demographics = demographicsSchema;
    keySchemaMap.allergy = allergySchema;
    keySchemaMap.encounter = encounterSchema;
    keySchemaMap.immunization = immunizationSchema;
    keySchemaMap.medication = medicationSchema;
    keySchemaMap.problem = problemSchema;
    keySchemaMap.procedure = procedureSchema;
    keySchemaMap.result = resultSchema;
    keySchemaMap.social_history = socialHistorySchema;
    keySchemaMap.vital = vitalSchema;
    keySchemaMap.insurance = insuranceSchema;
    keySchemaMap.claim = claimSchema;
    keySchemaMap.plan_of_care = plan_of_careSchema;
    keySchemaMap.payers = payersSchema;
    keySchemaMap.provider = providerSchema;
    keySchemaMap.medical_device = medicalDeviceSchema;
    keySchemaMap.family_history = familyHistorySchema;
    keySchemaMap.participants = participantSchema;

    this.validateDocumentModel = function (documentModel) {
        var compiledSchema = zschema.compileSchema(documentModelSchema);
        var valid = zschema.validate(documentModel, compiledSchema);
        lastError = zschema.getLastError();
        return valid;
    };

    this.getSectionDocumentModel = function (sectionName) {
        if (sectionName in keySchemaMap) {
            var sectionSchema = keySchemaMap[sectionName];
            var compiledSchema = zschema.compileSchema(sectionSchema);
            lastError = zschema.getLastError();
            return compiledSchema;
        }
        return {};
    };

    this.getDocumentModel = function () {
        var compiledSchema = zschema.compileSchema(documentModelSchema);
        lastError = zschema.getLastError();
        return compiledSchema;
    };

    /*validates a single section child, this means a section with a section. For example, a *SINGLE*
    problem in the problems section */

    this.validateSectionObj = function validateSectionObj(sectionObj, sectionName) {
        var valid;
        if (sectionName in keySchemaMap) {
            var sectionSchema = keySchemaMap[sectionName];
            var compiledSchema = zschema.compileSchema(sectionSchema);
            valid = zschema.validate(sectionObj, compiledSchema);
            lastError = zschema.getLastError();
            return valid;
        }
        var sharedSchema = zschema.compileSchema(keySchemaMap.shared);
        var sharedModels = sharedSchema['__$refResolved'].properties; //nevermind, use an alternative approach
        if (sectionName in sharedModels) {
            var sharedObjects = {};
            sharedObjects[sectionName] = sectionObj;
            valid = zschema.validate(sharedObjects, sharedSchema);
            lastError = zschema.getLastError();
            return valid;
        }
        return false;
    };

    this.getLastError = function () {
        return lastError;
    };

    // this.validateSection = function validateSection(section, sectionName) {
    //     /*not sure about triple equals here because object strings and primitive
    //     string =S */
    //     var valid;
    //     var sectionSchema;
    //     var compiledSchema;
    //     if (sectionName.toLowerCase() === 'demographics' || sectionName.toLowerCase() === 'social history') {
    //         sectionSchema = keySchemaMap[sectionName];
    //         compiledSchema = zschema.compileSchema(sectionSchema);
    //         valid = zschema.validate(sectionObj, compiledSchema);
    //         lastError = zschema.getLastError();
    //         return valid;
    //     } else if (sectionName in keySchemaMap) {
    //         sectionSchema = keySchemaMap[sectionName];
    //         compiledSchema = zschema.compileSchema(sectionSchema);
    //         for (var x in section) { // appears to be a bug, return will short circuit the loop
    //             valid = zschema.validate(section[x], compiledSchema);
    //             if (!valid) {
    //                 return false;
    //             }
    //             return true;
    //         }
    //     } else {
    //         var sharedSchema = zschema.compileSchema(keySchemaMap.shared);
    //         var sharedModels = sharedSchema['__$refResolved'].properties; //nevermind, use an alternative approach
    //         if (sectionName in sharedModels) {
    //             var sharedObjects = {};
    //             sharedObjects[sectionName] = section;
    //             valid = zschema.validate(sharedObjects, sharedSchema);
    //             lastError = zschema.getLastError();
    //             return valid;
    //         }
    //         return false;
    //     }
    // };
};

validator.instance = null;
validator.getInstance = function () {
    if (this.instance === null) {
        this.instance = new validator();
    }
    return this.instance;
};

module.exports = validator.getInstance();