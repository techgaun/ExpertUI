/**
 * @overview This controller renders and handles switches.
 * @author Martin Vach
 */

/**
 * Switch root controller
 * @class SwitchController
 *
 */
appController.controller('SwitchController', function($scope, $filter, $timeout,$interval,dataService, cfg,_) {
    $scope.switches = {
        all: [],
        interval: null,
        rangeSlider: [],
        switchButton: [],
        show: false
    };
    /**
     * Cancel interval on page destroy
     */
    $scope.$on('$destroy', function() {
        $interval.cancel($scope.switches.interval);
    });

    /**
     * Load zwave data
     */
    $scope.loadZwaveData = function() {
        dataService.loadZwaveApiData().then(function(ZWaveAPIData) {
            setData(ZWaveAPIData);
             if(_.isEmpty($scope.switches.all)){
                $scope.alert = {message: $scope._t('error_404'), status: 'alert-warning', icon: 'fa-exclamation-circle'};
                return;
            }
            $scope.switches.show = true;
            $scope.refreshZwaveData(ZWaveAPIData);
        }, function(error) {
            alertify.alertError($scope._t('error_load_data'));
        });
    };
    $scope.loadZwaveData();

    /**
     * Refresh zwave data
     * @param {object} ZWaveAPIData
     */
    $scope.refreshZwaveData = function(ZWaveAPIData) {
        var refresh = function() {
            dataService.loadJoinedZwaveData(ZWaveAPIData).then(function(response) {
                setData(response.data.joined);
            }, function(error) {});
        };
        $scope.switches.interval = $interval(refresh, $scope.cfg.interval);
    };

    /**
     * Update switch
     * @param {string} url
     */
    $scope.updateSwitch = function(url) {
        $scope.toggleRowSpinner(url);
        dataService.runZwaveCmd(cfg.store_url + url).then(function (response) {
            $timeout($scope.toggleRowSpinner, 1000);
        }, function (error) {
            $scope.toggleRowSpinner();
            alertify.alertError($scope._t('error_update_data') + '\n' + url);
        });
    };
    /**
     * Update all switches
     * @param {string} id
     * @param {string} urlType
     */
    $scope.updateAllSwitches = function(id,urlType) {
        var lastItem = _.last($scope.switches.all);
        $scope.toggleRowSpinner(id);
        angular.forEach($scope.switches.all, function(v, k) {
            $scope.toggleRowSpinner(v[urlType]);
            dataService.runZwaveCmd(cfg.store_url + v[urlType]).then(function (response) {
                alertify.dismissAll();
            }, function (error) {
                alertify.dismissAll();
                alertify.alertError($scope._t('error_update_data') + '\n' +  v[urlType]);
            });
            if(lastItem.rowId === v.rowId){
                $timeout($scope.toggleRowSpinner, 1000);
            }
        });

    };
    /**
     * Update switch with slider
     * @param {string} cmd
     * @param {int} index
     */
    $scope.sliderChange = function(cmd, index) {
        var val = $scope.switches.rangeSlider[index];
        var url = cmd + '.Set(' + val + ')';
        dataService.runZwaveCmd(cfg.store_url + url).then(function (response) {
            $scope.toggleRowSpinner();
        }, function (error) {
            $scope.toggleRowSpinner();
            alertify.alertError($scope._t('error_update_data') + '\n' + url);
        });
    };

    /// --- Private functions --- ///

    /**
     * Set zwave data
     * @param {object} ZWaveAPIData
     */
    function setData(ZWaveAPIData) {
        var controllerNodeId = ZWaveAPIData.controller.data.nodeId.value;
        // Loop throught devices
        angular.forEach(ZWaveAPIData.devices, function(node, nodeId) {
            if (nodeId == 255 || nodeId == controllerNodeId || node.data.isVirtual.value) {
                return;
            }

            // Loop throught instances
            var cnt = 1;
            angular.forEach(node.instances, function(instance, instanceId) {
                angular.forEach([0x25, 0x26], function(ccId) {
                    if (!(ccId in instance.commandClasses)) return;
                    var switchAllValue = null;
                    var hasSwitchAll = (0x27 in instance.commandClasses) && (instanceId == 0);
                    if (hasSwitchAll) {
                        switchAllValue = instance.commandClasses[0x27].data.mode.value;
                    }

                    var deviceType = ccId == 0x25 ? 'binary' : 'multilevel';
                    
                    var genericType = ZWaveAPIData.devices[nodeId].data.genericType.value;
                    var specificType = ZWaveAPIData.devices[nodeId].data.specificType.value;
                    var genspecType = genericType + '/' + specificType;

                    // Set object
                    var obj = {};

                    // Motor devices
                    var btnOn = $scope._t('switched_on');
                    var btnOff = $scope._t('switched_off');
                    var btnFull = $scope._t('btn_full');
                    var hasMotor = false;
                    var motorDevices = ['17/3', '17/5', '17/6', '17/7', '9/0', ' 9/1'];
                    if (motorDevices.indexOf(genspecType) !== -1) {
                        btnOn = $scope._t('btn_switched_up');
                        btnOff = $scope._t('btn_switched_down');
                        hasMotor = true;
                    }
                    //console.log(nodeId + '.' + instanceId + ': ' + genspecType + ' motor: ' + hasMotor);
                    var multiChannel = false;
                    if (0x60 in instance.commandClasses) {
                        multiChannel = true;
                    }
                    var level = updateLevel(instance.commandClasses[ccId].data.level, ccId, btnOn, btnOff);

                    obj['id'] = nodeId;
                    obj['cmd'] = instance.commandClasses[ccId].data.name + '.level';
                    obj['iId'] = instanceId;
                    obj['ccId'] = ccId;
                    obj['hasMotor'] = hasMotor;
                    obj['multiChannel'] = multiChannel;
                    obj['deviceType'] = deviceType;
                    obj['genericType'] = genericType;
                    obj['specificType'] = specificType;
                    obj['hasSwitchAll'] = hasSwitchAll;
                    obj['switchAllValue'] = switchAllValue;
                    obj['rowId'] = 'switch_' + nodeId + '_' + cnt;
                    obj['name'] = $filter('deviceName')(nodeId, node);
                    obj['updateTime'] = instance.commandClasses[ccId].data.level.updateTime;
                    obj['invalidateTime'] = instance.commandClasses[ccId].data.level.invalidateTime;
                    obj['dateTime'] = $filter('getDateTimeObj')(instance.commandClasses[ccId].data.level.updateTime);
                    obj['urlToStore'] = 'devices[' + nodeId + '].instances[' + instanceId + '].commandClasses[' + ccId + '].Get()';
                    obj['isUpdated'] = ((obj['updateTime'] > obj['invalidateTime']) ? true : false);
                    //obj['level'] = ZWaveAPIData.devices[nodeId].instances[instanceId].commandClasses[ccId].data.level;
                    obj['level'] = level.level_cont;
                    obj['levelColor'] = level.level_color;
                    obj['levelStatus'] = level.level_status;
                    obj['levelMax'] = level.level_max;
                    obj['levelVal'] = level.level_val;
                    obj['urlToOff'] = 'devices[' + nodeId + '].instances[' + instanceId + '].commandClasses[' + ccId + '].Set(0)';
                    obj['urlToOn'] = 'devices[' + nodeId + '].instances[' + instanceId + '].commandClasses[' + ccId + '].Set(255)';
                    obj['urlToFull'] = 'devices[' + nodeId + '].instances[' + instanceId + '].commandClasses[' + ccId + '].Set(99)';
                    obj['urlToSlide'] = 'devices[' + nodeId + '].instances[' + instanceId + '].commandClasses[' + ccId + ']';
                    obj['btnOn'] = btnOn;
                    obj['btnOff'] = btnOff;
                    obj['btnFull'] = btnFull;
                    obj['cmdToUpdate'] = 'devices.' + nodeId + '.instances.' + instanceId + '.commandClasses.' + ccId + '.data.level';
                    var findIndex = _.findIndex($scope.switches.all, {rowId: obj.rowId});
                    if(findIndex > -1){
                        angular.extend($scope.switches.all[findIndex],obj);
                        $scope.switches.rangeSlider[findIndex] = level.level_val;

                    }else{
                        $scope.switches.all.push(obj);
                        $scope.switches.rangeSlider.push(obj['range_' + nodeId] = level.level_val);
                    }


                    cnt++;
                });
            });
        });
    }
    ;

    /**
     * Update level
     * @param {object} obj
     * @param {number}  ccId
     * @param {string} btnOn
     * @param {string} btnOff
     * @returns {{level_cont: *, level_color: *, level_status: string, level_val: number, level_max: number}}
     */
    function updateLevel(obj, ccId, btnOn, btnOff) {

        var level_cont;
        var level_color;
        var level_status = 'off';
        var level_val = 0;
        var level_max = 99;

        //var level = obj.value;
        var level = (angular.isDefined(obj.value) ? obj.value : null);

        if (level === '' || level === null) {
            level_cont = '?';
            level_color = 'gray';
        } else {
            if (level === false)
                level = 0;
            if (level === true)
                level = 255;
            level = parseInt(level, 10);
            if (level === 0) {
                level_cont = btnOff;
                level_color = '#a94442';
            } else if (level === 255 || level === 99) {
                level_status = 'on';
                level_cont = btnOn;
                level_color = '#3c763d';
//                if(level > 99){
//                    level_max = 255;
//                }
                //level_val = level;
                level_val = (level < 100 ? level : 99);
            } else {
                level_cont = level.toString() + ((ccId == 0x26) ? '%' : '');
                var lvlc_r = ('00' + parseInt(0x9F + 0x60 * level / 99).toString(16)).slice(-2);
                var lvlc_g = ('00' + parseInt(0x7F + 0x50 * level / 99).toString(16)).slice(-2);
                level_color = '#' + lvlc_r + lvlc_g + '00';
                level_status = 'on';
                // level_val = level;
                level_val = (level < 100 ? level : 99);
            }
        }
        ;
        return {"level_cont": level_cont, "level_color": level_color, "level_status": level_status, "level_val": level_val, "level_max": level_max};
    }
    ;
});