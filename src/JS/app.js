        // Модель
var model = {
    categories: 
        [{name: 'Motherboard', href: '/Categories/Motherboard'},
        {name: 'CPU', href: '/Categories/CPU'},
        {name: 'RAM', href: '/Categories/RAM'},
        {name: 'VideoAdapter', href: '/Categories/VideoAdapter'},
        {name: 'HDD', href: '/Categories/HDD'},
        {name: 'PowerSource', href: '/Categories/PowerSource'},
        {name: 'Cooling', href: '/Categories/Cooling'}]
    };
        // Модуль
var categoriesListApp = angular.module("categoriesListApp", []);
    //Контроллер
categoriesListApp.controller("categoriesListCtrl", function($scope){
    $scope.data = model;
})


function categoriesListCtrl($scope){
    $scope.data = model;
}