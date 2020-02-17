import * as angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';

import { AppComponent } from './app/app.component';
import { IGridoption } from './app/interface/igridoption';
export function initUiGrid() {

  const uiGridComponent: angular.IComponentOptions = {
    bindings: {
      data: '<',
      onEdit: '&',
      onDelete: '&',
      onSelect: '&',
      gridOptions: '='
    },
    transclude: true,
    controller: ['$scope', 'uiGridConstants', function ($scope, uiGridConstants) {

      const ctrl = this;

      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
          return 'header-filtered';
        } else {
          return '';
        }
      };

      $scope.msg = {};
      $scope.gridOptions = {
        enableFiltering: true,
        showGridFooter: false,
        showColumnFooter: false,
        enableSorting: true,
        treeRowHeaderAlwaysVisible: false,

        paginationPageSizes: [50, 100, 200, 500],
        paginationPageSize: 25,
        headerCellClass: 'white',
        enableColumnResizing: true,
        width: 100,
        exporterMenuPdf: false,
        exporterMenuCsv: true,
        exporterMenuExcel: true,
        enableGridMenu: true,
        exporterCsvFilename: 'data.csv',

        //exporterExcelFilename: 'myFile.xlsx',
        exporterExcelSheetName: 'Sheet1',
        selectionRowHeaderWidth: 0,

        //for pdf
        // exporterPdfDefaultStyle: {fontSize: 9},
        // exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
        // exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
        // exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
        // exporterPdfFooter: function ( currentPage, pageCount ) {
        //   return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        // },
        // exporterPdfCustomFormatter: function ( docDefinition ) {
        //   docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        //   docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        //   return docDefinition;
        // },
        // exporterPdfOrientation: 'portrait',
        // exporterPdfPageSize: 'LETTER',
        // exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
          $scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            ctrl.onSelect({
              row: $scope.gridApi.selection.getSelectedRows()
            });
          });
          gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
            ctrl.onSelect({
              row: $scope.gridApi.selection.getSelectedRows()
            });
          });
        },
      };

      $scope.editEmployee = function (row) {
        ctrl.onEdit({
          // "City":row.City,
          // "Designation":row.Designation,
          // "ID":row.ID,
          // "Name":row.Name
          row
        });
      }
      $scope.deleteEmployee = function (row) {
        ctrl.onDelete({
          row
        });
      }

      $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
      };

      function makeColDefs(row) {
        const colDefs = [];
        let exist = [];

        for (let i = 0; i < row.length; i++) {

          for (const colName in row[i]) {

            if (exist.indexOf(colName) === -1) {

              colDefs.push({
                'field': colName,
                'width': 200
              });
              exist.push(colName);
            }
          }
        }
        exist = undefined;
        return colDefs;
      }

      this.$onChanges = function (obj: { data: { currentValue: Array<{}> }, gridOptions: { currentValue: IGridoption } }) {
        if (obj.data.currentValue && obj.data.currentValue.length) {
          const colDefs = makeColDefs(obj.data.currentValue);
          $scope.gridOptions.data = obj.data.currentValue;
          if (obj.gridOptions && obj.gridOptions !== undefined) {
            Object.keys(obj.gridOptions.currentValue).map(function (key, index) {
              $scope.gridOptions[key] = obj.gridOptions.currentValue[key];
            });
            if (obj.gridOptions.currentValue.columnDefs && obj.gridOptions.currentValue.columnDefs !== undefined) {
              $scope.gridOptions.columnDefs = obj.gridOptions.currentValue.columnDefs;
            }
          } else {
            $scope.gridOptions.columnDefs = colDefs;
          }
        }
      };

      this.$onInit = function () { }

    }],
    template: '<div ui-grid="gridOptions" ui-grid-selection ui-grid-resize-columns ui-grid-exporter ui-grid-auto-resize ui-grid-pagination class="grid" style="width:100%;"></div>'
  };
  return angular.module('uigridmodule', ['ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.pagination'])
    .component('ui-grid', uiGridComponent)
    .directive('appRoot', downgradeComponent({ component: AppComponent }));
}
