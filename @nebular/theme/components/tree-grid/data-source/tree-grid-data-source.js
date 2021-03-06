/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbDataSource } from '../../cdk/table';
import { NbTreeGridDataService } from './tree-grid-data.service';
import { NbTreeGridFilterService } from './tree-grid-filter.service';
import { NbTreeGridSortService } from './tree-grid-sort.service';
import { NB_DEFAULT_ROW_LEVEL } from './tree-grid.model';
import { NbTreeGridService } from './tree-grid.service';
var NbTreeGridDataSource = /** @class */ (function (_super) {
    __extends(NbTreeGridDataSource, _super);
    function NbTreeGridDataSource(sortService, filterService, treeGridService, treeGridDataService) {
        var _this = _super.call(this) || this;
        _this.sortService = sortService;
        _this.filterService = filterService;
        _this.treeGridService = treeGridService;
        _this.treeGridDataService = treeGridDataService;
        /** Stream emitting render data to the table (depends on ordered data changes). */
        _this.renderData = new BehaviorSubject([]);
        _this.filterRequest = new BehaviorSubject('');
        _this.sortRequest = new BehaviorSubject(null);
        return _this;
    }
    NbTreeGridDataSource.prototype.setData = function (data, customGetters) {
        var presentationData = [];
        if (data) {
            presentationData = this.treeGridDataService.toPresentationNodes(data, customGetters);
        }
        this.data = new BehaviorSubject(presentationData);
        this.updateChangeSubscription();
    };
    NbTreeGridDataSource.prototype.connect = function (collectionViewer) {
        return this.renderData;
    };
    NbTreeGridDataSource.prototype.disconnect = function (collectionViewer) {
    };
    NbTreeGridDataSource.prototype.expand = function (row) {
        this.treeGridService.expand(this.data.value, row);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.collapse = function (row) {
        this.treeGridService.collapse(this.data.value, row);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.toggle = function (row, options) {
        this.treeGridService.toggle(this.data.value, row, options);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.toggleByIndex = function (dataIndex, options) {
        var node = this.renderData.value && this.renderData.value[dataIndex];
        if (node) {
            this.toggle(node.data, options);
        }
    };
    NbTreeGridDataSource.prototype.getLevel = function (rowIndex) {
        var row = this.renderData.value[rowIndex];
        return row ? row.level : NB_DEFAULT_ROW_LEVEL;
    };
    NbTreeGridDataSource.prototype.sort = function (sortRequest) {
        this.sortRequest.next(sortRequest);
    };
    NbTreeGridDataSource.prototype.filter = function (searchQuery) {
        this.filterRequest.next(searchQuery);
    };
    NbTreeGridDataSource.prototype.updateChangeSubscription = function () {
        var _this = this;
        var dataStream = this.data;
        var filteredData = combineLatest(dataStream, this.filterRequest)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this.treeGridDataService.copy(data);
        }), map(function (data) { return _this.filterData(data); }));
        var sortedData = combineLatest(filteredData, this.sortRequest)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this.sortData(data);
        }));
        sortedData
            .pipe(map(function (data) { return _this.treeGridDataService.flattenExpanded(data); }))
            .subscribe(function (data) { return _this.renderData.next(data); });
    };
    NbTreeGridDataSource.prototype.filterData = function (data) {
        return this.filterService.filter(this.filterRequest.value, data);
    };
    NbTreeGridDataSource.prototype.sortData = function (data) {
        return this.sortService.sort(this.sortRequest.value, data);
    };
    return NbTreeGridDataSource;
}(NbDataSource));
export { NbTreeGridDataSource };
var NbTreeGridDataSourceBuilder = /** @class */ (function () {
    function NbTreeGridDataSourceBuilder(filterService, sortService, treeGridService, treeGridDataService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this.treeGridService = treeGridService;
        this.treeGridDataService = treeGridDataService;
    }
    NbTreeGridDataSourceBuilder.prototype.create = function (data, customGetters) {
        var dataSource = new NbTreeGridDataSource(this.sortService, this.filterService, this.treeGridService, this.treeGridDataService);
        dataSource.setData(data, customGetters);
        return dataSource;
    };
    NbTreeGridDataSourceBuilder = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NbTreeGridFilterService,
            NbTreeGridSortService,
            NbTreeGridService,
            NbTreeGridDataService])
    ], NbTreeGridDataSourceBuilder);
    return NbTreeGridDataSourceBuilder;
}());
export { NbTreeGridDataSourceBuilder };
//# sourceMappingURL=tree-grid-data-source.js.map