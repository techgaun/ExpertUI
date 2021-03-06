

/**
 * ZnifferController
 * @author Martin Vach
 */
appController.controller('ZnifferController', function ($scope, $interval, $timeout, $cookies, $location, $http, cfg, dataService, deviceService, myCache, _) {
    $scope.zniffer = {
        run: true,
        spin: true,
        updateTime: Math.round(+new Date() / 1000),
        trace: 'start',
        interval: null,
        all: []

    };
    /**
     * Cancel interval on page destroy
     */
    $scope.$on('$destroy', function () {
        $interval.cancel($scope.zniffer.interval);
    });

    /**
     * Load cached zniffer
     * @returns {undefined}
     */
    $scope.loadCachedZniffer = function () {
        if (myCache.get('zniffer_inout')) {
            $scope.zniffer.all = myCache.get('zniffer_inout');
        }

    };
    $scope.loadCachedZniffer();

    /**
     * Run Zniffer
     * @returns {undefined}
     */
    $scope.runZniffer = function (updateTime) {
        var refresh = function () {
            if($scope.zniffer.trace === 'stop'){
                angular.copy([], $scope.zniffer.all);
                return;
            }
            $scope.zniffer.spin = true;
            if ($http.pendingRequests.length > 0) {
                return;
            }
            //var time = 1472729277;//(updateTime ? '/' + updateTime : '');
            var time = updateTime;//(updateTime ? '/' + updateTime : '');
            //dataService.getApi('communication_history_url', '/' + time, true).then(function (response) {
            dataService.getApi('zniffer_url',null,true).then(function (response) {
                var znifferData = deviceService.setZnifferData(response.data.data);
                $scope.zniffer.updateTime = response.data.updateTime;
                _.filter(znifferData.value(), function (v) {
                    //var exist = _.findWhere($scope.zniffer.all, {updateTime: v.updateTime, bytes: v.bytes});
                    var exist = _.findWhere($scope.zniffer.all, {id: v.id, bytes: v.bytes});
                    if (!exist) {
                        $scope.zniffer.all.push(v);
                    }
                    ;
                });
                myCache.put('zniffer_inout', $scope.zniffer.all);
                $scope.zniffer.spin = false;
                $scope.zniffer.run = true;
            }, function (error) {
                $scope.zniffer.spin = false;
                $scope.zniffer.run = false;
                $interval.cancel($scope.zniffer.interval);
            });
        };
        if ($scope.zniffer.run && $scope.zniffer.trace === 'start') {
            $scope.zniffer.interval = $interval(refresh, cfg.zniffer_interval);
        }
    };
    $scope.runZniffer($scope.zniffer.updateTime);

    /**
     * Set trace
     */
    $scope.setTrace = function (trace) {
        switch (trace) {
            case 'pause':
                 $scope.zniffer.spin = false;
                $scope.zniffer.trace = 'pause';
                $interval.cancel($scope.zniffer.interval);
                break;
            case 'stop':
                 $scope.zniffer.spin = false;
                $scope.zniffer.trace = 'stop';
                angular.copy([], $scope.zniffer.all);
                 //$scope.runZniffer($scope.zniffer.updateTime);
                $interval.cancel($scope.zniffer.interval);
                myCache.remove('zniffer_inout');
                //angular.copy([], $scope.zniffer.all);
                $timeout(function(){angular.copy([], $scope.zniffer.all);}, 3000);
                break;
            default:
                 $scope.zniffer.spin = true;
                $scope.zniffer.trace = 'start';
                $scope.runZniffer($scope.zniffer.updateTime);
                break;

        }
        //console.log('Set trace: ',  $scope.zniffer.trace)
    };

});

/**
 * ZnifferHistoryController
 * @author Martin Vach
 */
appController.controller('ZnifferHistoryController', function ($scope, $interval, $filter, $cookies, $location, cfg, dataService, deviceService, paginationService, _) {
    $scope.zniffer = {
        all: [],
        filter: {
            model: {
                src: {
                    value: '',
                    show: '1'
                },
                dest: {
                    value: '',
                    show: '1'
                },
                data: {
                    value: '',
                    show: '1'
                }
            },
            items: {
                data: ['Singlecast', 'Predicast', 'Multicast']
            },
            used: []
        }

    };
    $scope.currentPage = 1;
    $scope.pageSize = cfg.page_results_history;
    /**
     * Cancel interval on page destroy
     */
    //$scope.$on('$destroy', function () {
    //});
    
    /**
     * Load cached zniffer filter
     * @returns {undefined}
     */
    $scope.loadCachedZnifferFilter = function () {
        if ($cookies.znifferFilter) {
            angular.extend($scope.zniffer.filter.model, angular.fromJson($cookies.znifferFilter));
        }

    };
    $scope.loadCachedZnifferFilter();

    /**
     * Detect zniffer filter
     * @returns {undefined}
     */
    $scope.detectZnifferFilter = function () {
        angular.forEach($scope.zniffer.filter.model, function (v, k) {
            var index = $scope.zniffer.filter.used.indexOf(k);
            if (v['value'] !== '' && index === -1) {
                $scope.zniffer.filter.used.push(k);
            }
        });
    };
    $scope.detectZnifferFilter();

    /**
     * Load communication history
     * @returns {undefined}
     */
    $scope.loadCommunicationHistory = function () {
        var filter = '?filter=' + JSON.stringify($scope.zniffer.filter.model);
        $scope.loading = {status: 'loading-spin', icon: 'fa-spinner fa-spin'};
        dataService.getApi('communication_history_url', filter, true).then(function (response) {
            $scope.loading = false;
            $scope.zniffer.all = deviceService.setZnifferData(response.data.data).value();
            //$scope.zniffer.all = zniffer.value();
            $scope.zniffer.run = true;
        }, function (error) {
            $scope.loading = false;
            alertify.alertError($scope._t('error_load_data') + ': ' + cfg.communication_history_url);
        });
    };
    $scope.loadCommunicationHistory();
    /**
     * Reset Communication History
     * @returns {undefined}
     */
    $scope.resetCommunicationHistory = function () {
        $scope.zniffer.all = [];
        $scope.loadCommunicationHistory();
    };
    /**
     * Set zniffer filter
     * @returns {undefined}
     */
    $scope.setZnifferFilter = function (key) {
        //$cookies.znifferFilter =  JSON.stringify($scope.zniffer.filter.model);
        if (!$scope.zniffer.filter.model[key].value) {
            return false;
        }
        $cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        if (!_.contains($scope.zniffer.filter.used, key)) {
            $scope.zniffer.filter.used.push(key);
        }
        $scope.resetCommunicationHistory();
    };
    /**
     * Reset zniffer filter
     * @returns {undefined}
     */
    $scope.resetZnifferFilter = function (key) {
        $scope.zniffer.filter.model[key].value = '';
        $scope.zniffer.filter.model[key].show = '1';
        $scope.zniffer.filter.used = _.without($scope.zniffer.filter.used, key);
        delete $cookies['znifferFilter'];
        //$cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        $scope.resetCommunicationHistory();
    };
    /**
     * Reset all zniffer filters
     * @returns {undefined}
     */
    $scope.resetZnifferFilterAll = function () {
        angular.forEach($scope.zniffer.filter.model, function (v, k) {
            $scope.zniffer.filter.model[k].value = '';
            $scope.zniffer.filter.model[k].show = '1';
        });

        $scope.zniffer.filter.used = [];
        delete $cookies['znifferFilter'];
        //$cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        $scope.resetCommunicationHistory();
    };
    
    // Watch for pagination change
    $scope.$watch('currentPage', function (page) {
        paginationService.setCurrentPage(page);
    });

    $scope.setCurrentPage = function (val) {
        $scope.currentPage = val;
    };

});


/**
 * ZnifferHistoryController
 * @author Martin Vach
 */
appController.controller('ZnifferController_', function ($scope, $interval, $filter, $cookies, $location, cfg, dataService, myCache, _) {
    $scope.zniffer = {
        run: true,
        trace: 'start',
        interval: null,
        updateTime: Math.round(+new Date() / 1000),
        controller: {},
        cmdClass: [],
        all: [],
        collection: {},
        filter: {
            model: {
                src: {
                    value: '',
                    show: '1'
                },
                dest: {
                    value: '',
                    show: '1'
                }
            },
            items: {
                data: ['Singlecast', 'Predicast', 'Multicast']
            },
            used: []
        }

    };
    /**
     * Cancel interval on page destroy
     */
    $scope.$on('$destroy', function () {
        $interval.cancel($scope.zniffer.interval);
    });



    /**
     * Load cached zniffer filter
     * @returns {undefined}
     */
    $scope.loadCachedZnifferFilter = function () {
        if ($cookies.znifferFilter) {
            angular.extend($scope.zniffer.filter.model, angular.fromJson($cookies.znifferFilter));
        }

    };
    $scope.loadCachedZnifferFilter();

    /**
     * Detect zniffer filter
     * @returns {undefined}
     */
    $scope.detectZnifferFilter = function () {
        angular.forEach($scope.zniffer.filter.model, function (v, k) {
            var index = $scope.zniffer.filter.used.indexOf(k);
            if (v['value'] !== '' && index === -1) {
                $scope.zniffer.filter.used.push(k);
            }
        });
    };
    $scope.detectZnifferFilter();

    /**
     * Load communication history
     * @returns {undefined}
     */
    $scope.loadCommunication = function (updateTime) {
        var params;
        var time = (updateTime ? '/' + updateTime : '');
        var filter = '?filter=' + JSON.stringify($scope.zniffer.filter.model);
        params = time + filter;
        if (!updateTime) {
            $scope.loading = {status: 'loading-spin', icon: 'fa-spinner fa-spin'};
        }
        dataService.getApi('communication_history_url', params, true).then(function (response) {
            $scope.loading = false;
            $scope.zniffer.updateTime = response.data.updateTime;
            setZnifferData(response.data.data);
            //$scope.zniffer.all = zniffer.value();
            $scope.zniffer.run = true;
        }, function (error) {
            $scope.zniffer.run = false;
            $interval.cancel($scope.zniffer.interval);
            $scope.loading = false;
            alertify.alertError($scope._t('error_load_data') + ': ' + cfg.communication_history_url);
        });
    };
//    if ($scope.routeMatch('/installer/history')) {
//        $scope.loadCommunication();
//    }


    /**
     * Refresh communication history
     * @returns {undefined}
     */
    $scope.refreshCommunication = function (time) {
//        if ($scope.routeMatch('/installer/history')) {
//            return;
//        }
        var refresh = function () {
            $scope.zniffer.updateTime += Math.round(+cfg.interval / 1000);
            //var updateTime = Math.round(+new Date() / 1000);
            $scope.loadCommunication($scope.zniffer.updateTime);
        };
        if ($scope.zniffer.run && $scope.zniffer.trace === 'start') {
            $scope.zniffer.interval = $interval(refresh, cfg.interval);
        }


    };
    //$scope.refreshCommunication($scope.zniffer.updateTime);

    /**
     * Reset zniffer filter
     * @returns {undefined}
     */
    $scope.resetZniffer = function () {
        $scope.zniffer.trace = 'start';
        $interval.cancel($scope.zniffer.interval);
        $scope.zniffer.all = [];
        if ($scope.routeMatch('/installer/history')) {
            $scope.loadCommunication();
        }
        if ($scope.routeMatch('/installer/zniffer')) {
            $scope.refreshCommunication($scope.zniffer.updateTime);
        }
    };
    $scope.resetZniffer();
    /**
     * Set zniffer filter
     * @returns {undefined}
     */
    $scope.setZnifferFilter = function (key) {
        //$cookies.znifferFilter =  JSON.stringify($scope.zniffer.filter.model);
        if (!$scope.zniffer.filter.model[key].value) {
            return false;
        }
        $cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        if (!_.contains($scope.zniffer.filter.used, key)) {
            $scope.zniffer.filter.used.push(key);
        }
        $scope.resetZniffer();
    };
    /**
     * Reset zniffer filter
     * @returns {undefined}
     */
    $scope.resetZnifferFilter = function (key) {
        $scope.zniffer.filter.model[key].value = '';
        $scope.zniffer.filter.used = _.without($scope.zniffer.filter.used, key);
        delete $cookies['znifferFilter'];
        //$cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        $scope.resetZniffer();
    };
    /**
     * Reset all zniffer filters
     * @returns {undefined}
     */
    $scope.resetZnifferFilterAll = function () {
        angular.forEach($scope.zniffer.filter.model, function (v, k) {
            $scope.zniffer.filter.model[k].value = '';
        });

        $scope.zniffer.filter.used = [];
        delete $cookies['znifferFilter'];
        //$cookies.znifferFilter = angular.toJson($scope.zniffer.filter.model);
        $scope.resetZniffer();
    };

    /**
     * Set trace
     */
    $scope.setTrace = function (trace) {
        switch (trace) {
            case 'pause':
                $scope.zniffer.trace = 'pause';
                $interval.cancel($scope.zniffer.interval);
                break;
            case 'stop':
                $scope.zniffer.trace = 'stop';
                $interval.cancel($scope.zniffer.interval);
                myCache.remove('incoming_packet');
                angular.copy([], $scope.zniffer.all);
                break;
            default:
                $scope.zniffer.trace = 'start';
                $scope.refreshCommunication($scope.zniffer.updateTime);
                break;

        }
        //console.log('Set trace: ',  $scope.zniffer.trace)
    };

    /// --- Private functions --- ///
    /**
     * Set a Zniffer data
     * @param {object} packet
     * @returns {undefined}
     */
    function setZnifferData(data) {
        var zniffer = _.chain(data)
                .flatten()
                .filter(function (v) {
                    var bytes = v.value;
                    var exist = _.findWhere($scope.zniffer.all, {updateTime: v.updateTime, bytes: bytes});
                    v.dateTime = $filter('getDateTimeObj')(v.updateTime);
                    v.bytes = (bytes ? bytes.toString() : '');
                    if (!exist) {
                        $scope.zniffer.all.push(v)
                    }
                    ;
                    return v;
                });
    }

});
/**
 * ZnifferController
 * @author Martin Vach
 */
appController.controller('ZnifferController_', function ($scope, $interval, $filter, cfg, dataService, myCache, _) {
    $scope.zniffer = {
        interval: null,
        controller: {},
        trace: 'start',
        cmdClass: [],
        all: []

    };

    /**
     * Cancel interval on page destroy
     */
    $scope.$on('$destroy', function () {
        //$interval.cancel( $scope.zniffer.interval);
    });

    /**
     * Load zwave API
     */
    $scope.loadZwaveApi = function () {
        dataService.loadZwaveApiData().then(function (ZWaveAPIData) {
            $scope.zniffer.controller.nodeId = ZWaveAPIData.controller.data.nodeId.value;
        }, function (error) {
            alertify.alertError($scope._t('error_load_data'));
            return;
        });
    };
    $scope.loadZwaveApi();

    /**
     * Load zwave command classes
     * @returns {undefined}
     */
    $scope.loadCmdClass = function () {
        dataService.xmlToJson(cfg.zwave_classes_url).then(function (response) {
            $scope.zniffer.cmdClass = response.zw_classes.cmd_class;
        }, function (error) {
            alertify.alertError($scope._t('error_xml_load'));
        });

    };
    $scope.loadCmdClass();

    /**
     * Load cached packet
     * @returns {undefined}
     */
    $scope.loadCachedPackets = function () {
        if (myCache.get('inout_packet')) {
            $scope.zniffer.all = myCache.get('inout_packet');
        }

    };
    $scope.loadCachedPackets();

    /**
     * Load packet data
     * @returns {undefined}
     */
    $scope.loadIncomingPacket = function () {
        dataService.getApi('incoming_packet_url', null, true).then(function (response) {
            var exist = _.find($scope.zniffer.all, {updateTime: response.data.updateTime});
            if (exist || !response.data.value) {
                return;
            }
            $scope.zniffer.all.push(
                    {
                        type: 'incoming',
                        updateTime: response.data.updateTime,
                        value: response.data.value,
                        dateTime: $filter('getDateTimeObj')(response.data.updateTime),
                        src: response.data.value[3],
                        dest: $scope.zniffer.controller.nodeId,
                        data: setZnifferDataType(response.data.value[2]),
                        application: packetApplication(response.data.value)
                    }
            );
            myCache.put('inout_packet', $scope.zniffer.all);
            //console.log(exist)
        }, function (error) {});
    };
    //$scope.loadIncomingPacket();
    /**
     * Load packet data
     * @returns {undefined}
     */
    $scope.loadOutgoingPacket = function () {
        dataService.getApi('outgoing_packet_url', null, true).then(function (response) {
            var exist = _.find($scope.zniffer.all, {updateTime: response.data.updateTime});
            if (exist || !response.data.value) {
                return;
            }
            $scope.zniffer.all.push(
                    {
                        type: 'outgoing',
                        updateTime: response.data.updateTime,
                        value: response.data.value,
                        dateTime: $filter('getDateTimeObj')(response.data.updateTime),
                        src: $scope.zniffer.controller.nodeId,
                        dest: response.data.value[3],
                        data: setZnifferDataType(response.data.value[2]),
                        application: packetApplication(response.data.value)
                    }
            );
            myCache.put('inout_packet', $scope.zniffer.all);
            //console.log(exist)
        }, function (error) {});
    };
    //$scope.loadOutgoingPacket();

    /**
     * Refresh packet
     */
    $scope.refreshPacket = function () {
        var refresh = function () {
            $scope.loadIncomingPacket();
            $scope.loadOutgoingPacket();
        };
        if ($scope.zniffer.trace === 'start') {
            $scope.zniffer.interval = $interval(refresh, $scope.cfg.interval);
        }

    };

    $scope.refreshPacket();
    /**
     * Set trace
     */
    $scope.setTrace = function (trace) {
        switch (trace) {
            case 'pause':
                $scope.zniffer.trace = 'pause';
                $interval.cancel($scope.zniffer.interval);
                break;
            case 'stop':
                $scope.zniffer.trace = 'stop';
                $interval.cancel($scope.zniffer.interval);
                myCache.remove('incoming_packet');
                angular.copy([], $scope.zniffer.all);
                break;
            default:
                $scope.zniffer.trace = 'start';
                $scope.loadCachedPackets();
                $scope.refreshPacket();
                break;

        }
        //console.log('Set trace: ',  $scope.zniffer.trace)
    };

    /// --- Private functions --- ///
    /**
     * Set an application col
     * @param {array} packet
     * @returns {undefined}
     */
    function packetApplication(packet) {
        // Get a command class from position 5
        var cmdClassKey = $filter('decToHex')(packet[5], 2, '0x');
        //key = '0x20'; // cc with cmd array
        var cmdKey = $filter('decToHex')(packet[6], 2, '0x');
        //keyCmd = '0x03';
        //console.log('cmdClassKey: ', cmdClassKey)

        var cmdClassVersion = '1';
        var ret = {};
        //var cc = _.findWhere( $scope.zniffer.cmdClass, {_key: cmdClassKey, _version: cmdClassVersion });

        if (_.isEmpty($scope.zniffer.cmdClass)) {
            return;
        }
        var findCmdClass = _.where($scope.zniffer.cmdClass, {_key: '0x71'});
        if (!findCmdClass || _.isEmpty(findCmdClass)) {

            return ret;
        }
        var cmdClass = findCmdClass.pop();
        if (_.isArray(cmdClass.cmd)) {
            ret = _.findWhere(cmdClass.cmd, {_key: cmdKey});
        } else {
            ret = cmdClass.cmd;
        }
        return ret;
    }

    function setZnifferDataType(data) {
        switch (data) {
            case 0:
                return 'Singlecast';
            case 255:
                return 'Predicast';
            default:
                return 'Multicast';
        }
    }

});

/**
 * The controller that handles Zniffer Rssi Background.
 * @class ZnifferRSSIController
 * @author Niels Roche
 */
appController.controller('ZnifferRSSIController', function ($scope, $interval, $filter, cfg, dataService, myCache, _) {
    $scope.rssi = {
        chartOptions1: {
            title:{
                text: ""
            },
            axisX:{
                title: "Time",
                tickColor: "black",
                tickLength: 5,
                tickThickness: 2,
                valueFormatString: "HH:mm"
            },
            axisY:{
                title: "RSSI (dBm)",
                tickColor: "black",
                tickLength: 5,
                tickThickness: 2
            },
            data: [
                {
                    type: "line",
                    xValueType: "dateTime",
                    xValueFormatString: "HH:mm:ss",
                    dataPoints: [],
                }
            ],
            zoomEnabled:true
        },
        chartOptions2: {
            title:{
                text: ""
            },
            axisX:{
                title: "Time",
                tickColor: "black",
                tickLength: 5,
                tickThickness: 2,
                valueFormatString: "HH:mm"
            },
            axisY:{
                title: "RSSI (dBm)",
                tickColor: "black",
                tickLength: 5,
                tickThickness: 2
            },
            data: [
                {
                    type: "line",
                    xValueType: "dateTime",
                    xValueFormatString: "HH:mm:ss",
                    dataPoints: [],
                }
            ],
            zoomEnabled:true
        },
        chartData1: [],
        chartData2: [],
        interval: null
    }

    /**
     * Cancel interval on page destroy
     */
    $scope.$on('$destroy', function () {
        $interval.cancel($scope.rssi.interval);
    });

    $scope.loadingRSSIData = function() {
        $scope.loading = {status: 'loading-spin', icon: 'fa-spinner fa-spin'};
        dataService.getApi('rssi_chart','', true).then(function (response) {
            $scope.loading = false;

            var rssiData = typeof response === 'string'? JSON.parse(response) : response;
            var tInterval = (new Date()).getTime() - 86400000; //86400000 - 24h
            var chartData1 = [];
            var chartData2 = [];

            rssiData.data.data.forEach(function (entry){
                var timestamp = new Date(entry.time * 1000);

                if (timestamp) {

                    if ((entry.time * 1000) > tInterval) {

                        if (typeof parseInt(entry.channel1) === 'number') {
                            chartData1.push({x: timestamp, y: parseInt(entry.channel1)});
                        }

                        if (typeof parseInt(entry.channel2) === 'number') {
                            chartData2.push({x: timestamp, y: parseInt(entry.channel2)});
                        }
                    }
                }
            });

            $scope.rssi.chartData1 = chartData1;
            $scope.rssi.chartData2 = chartData2;

            if (!$scope.rssi['chart1']) {
                $scope.createChart('chart1',$scope.rssi.chartOptions1,$scope.rssi.chartData1, 'Channel 1');
            }

            if (!$scope.rssi['chart2']) {
                $scope.createChart('chart2',$scope.rssi.chartOptions2,$scope.rssi.chartData2, 'Channel 2');
            }


        }, function (error) {
            $scope.loading = false;
            alertify.alertError($scope._t('error_load_data') + ': ' + cfg.rssi_chart);
        });
    };
    $scope.loadingRSSIData();

    $scope.createChart = function (elementID,chartOptions,chartData, chartTitle) {
        chartOptions.title.text = chartTitle;
        chartOptions.data[0].dataPoints = chartData;

        $scope.rssi[elementID] = new CanvasJS.Chart(elementID,chartOptions);
        $scope.rssi[elementID].render();
    };

    $scope.updateChart = function(elementID, chartData, chartTitle){
        var length = chartData.length;
        if(length > 0) {
            $scope.rssi[elementID].options.title.text = chartTitle;
            $scope.rssi[elementID].options.data[0].dataPoints = chartData;
            $scope.rssi[elementID].render();
        }
    };

    $scope.initRefresh = function() {
        var refresh = function () {
            $scope.loadingRSSIData();

            $scope.updateChart('chart1', $scope.rssi.chartData1,'Channel 1');
            $scope.updateChart('chart2', $scope.rssi.chartData2,'Channel 2');
        }

        $scope.rssi.interval = $interval(refresh, 30000);
    };
    $scope.initRefresh();
});
