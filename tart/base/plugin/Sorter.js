// Copyright 2011 Tart. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview tart.base.plugin.Sorter model sorter plugin.
 */

goog.provide('tart.base.plugin.Sorter');

goog.require('tart.base.plugin.BasePlugin');


/**
 * @param {tart.base.Model} model
 *
 * @extends {tart.base.plugin.BasePlugin}
 * @constructor
 */
tart.base.plugin.Sorter = function (model) {
    goog.events.EventTarget.call(this);

    /** @protected */
    this.model = model;

    /** @protected **/
    this.sorts = [];

    this.model.params.set(this.key, this.sorts);
};
goog.inherits(tart.base.plugin.Sorter, tart.base.plugin.BasePlugin);

/**
 * Set plugin's param
 */
tart.base.plugin.Sorter.prototype.key = "sortParams";


/**
 * @param {string} field field to be sorted.
 * @param {string} order order by directive, which is asc or desc.
 */
tart.base.plugin.Sorter.prototype.addSort = function (field, order) {

    /**
     * There can be multiple condition-value pair for a field
     */
    var fieldSorter = goog.array.find(this.sorts, function(item){
        return goog.object.getAnyKey(item) == field;
    });

    //and if this field did not set before create a new object
    if (!fieldSorter) {
        fieldSorter = {};
    }

    fieldSorter[field] = order;
    this.model.params.get(this.key).push(fieldSorter);
};

/**
 * clear map for plugin
 */
tart.base.plugin.Sorter.prototype.clear = function () {
    this.sorts = [];
    this.model.params.set(this.key, this.sorts);
};
