angular.module('myAppTemplates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/views/auth/auth_default.html',
    "<div ng-controller=AuthController></div>"
  );


  $templateCache.put('app/views/auth/auth_installer.html',
    "<div ng-controller=AuthInstallerController></div>"
  );


  $templateCache.put('app/views/auth/logout_installer.html',
    "<div ng-controller=LogoutInstallerController></div>"
  );


  $templateCache.put('app/views/configuration/_header.html',
    "<div class=\"page-header form-inline\" ng-if=\"_.size(devices) > 0\"><label>{{_t('h1_configuration_for')}}</label><select name=devices class=form-control ng-model=deviceId ng-change=changeDevice(deviceId)><option value=\"\" ng-selected=\"v.id != deviceId\">--- {{_t('select_device')}} ---</option><option ng-repeat=\"v in devices| orderBy:predicate:reverse\" value={{v.id}} ng-selected=\"v.id == deviceId\">(#{{v.id}}) {{v.name}}</option></select></div><bb-alert alert=alert></bb-alert><ul class=\"nav nav-tabs\" role=tablist ng-show=\"deviceId > 0\"><li ng-class=\"activeTab == 'interview' ? 'active' : ''\"><a href=#configuration/interview/{{deviceId}}>{{_t('nav_device_interview')}}</a></li><li ng-class=\"activeTab == 'configuration' ? 'active' : ''\"><a href=#configuration/configuration/{{deviceId}}>{{_t('nav_device_configuration')}}</a></li><li ng-class=\"activeTab == 'association' ? 'active' : ''\"><a href=#configuration/association/{{deviceId}}>{{_t('nav_device_assoc')}}</a></li><li ng-class=\"activeTab == 'health' ? 'active' : ''\"><a href=#configuration/health/{{deviceId}}>{{_t('link_health')}}</a></li><li ng-class=\"activeTab == 'commands' ? 'active' : ''\"><a href=#configuration/commands/{{deviceId}}>{{_t('nav_expert_commands')}}</a></li><li ng-class=\"activeTab == 'firmware' ? 'active' : ''\"><a href=#configuration/firmware/{{deviceId}}>{{_t('nav_firmware_update')}}</a></li><li ng-class=\"activeTab == 'postfix' ? 'active' : ''\" ng-if=cfg.zwavecfg.debug><a href=#configuration/postfix/{{deviceId}}>{{_t('nav_postfix_update')}}</a></li></ul>"
  );


  $templateCache.put('app/views/configuration/assoc.html',
    "<div id=AssociationTable ng-controller=ConfigAssocController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=deviceId><div class=table-responsive ng-if=\"assocGroups.length > 0\"><button class=\"btn btn-primary\" type=button ng-click=\"updateFromDevice('updateFromDevice')\" ng-disabled=\"rowSpinner['updateFromDevice']\"><bb-row-spinner spinner=\"rowSpinner['updateFromDevice']\" label=\"_t('btn_update_from_device')\" icon=\"'fa-files-o'\"></bb-row-spinner></button><br><br><div class=\"alert alert-warning\" ng-if=\"nodeCfg.hasBattery && nodeCfg.notAwake.length > 0\"><i class=\"fa fa-info-circle text-warning\"></i> {{_t('conf_apply_battery')}}</div><table class=\"table table-striped_ table-condensed\"><tbody><tr ng-repeat=\"v in assocGroups track by $index\"><td class=association-text><h5>{{v.label}} ({{ _t('assoc_max')}} {{v.max}} {{ _t('assoc_nodes')}}) <span>| <i class=\"fa fa-clock-o\"></i> <span class={{v.timeClass}}>{{v.updateTime| isTodayFromUnix}}</span></span></h5><div><div class=\"btn-group btn-group-assoc-devices {{d.status}}\" role=group ng-repeat=\"d in assocGroupsDevices[v.groupId] track by d.elId\" id={{d.elId}}><button type=button class=\"btn btn-info\"><i class=\"fa fa-exclamation-triangle text-danger\" ng-if=\"d.status !== 'true-true'\"></i>(#{{d.id}}<span ng-if=nodeCfg.hasMca>.{{d.instance}}</span>) {{d.name|cutText:true:20}}</button> <button type=button class=\"btn btn-primary\" ng-click=deleteAssoc(d) ng-if=!d.isNew><i class=\"fa fa-times text-danger\"></i></button></div></div><p class=text-alert-list ng-if=\"v.remaining < 1\"><i class=\"fa fa-exclamation-circle text-warning\"></i> {{_t('assoc_max_nodes_reached')}}</p></td><td class=association-action style=\"text-align: right; width: 20%\"><button class=\"btn btn-primary\" type=button ng-if=\"v.remaining > 0\" ng-click=\"handleAssocModal('assocAddModal',$event,v)\" ng-disabled=\"rowSpinner['group_' + v.groupId]\"><bb-row-spinner spinner=\"rowSpinner['group_' + v.groupId]\" icon=\"'fa-plus'\"></bb-row-spinner></button></td></tr><tr><td class=association-text colspan=2><h3>{{_t('legend')}}</h3><div><i class=\"fa fa-square fa-lg\" style=\"color: #f0ad4e\"></i> {{_t('assoc_legend_2')}}</div><div><i class=\"fa fa-square fa-lg\" style=\"color: #ccc\"></i> {{_t('assoc_legend_3')}}</div><div><i class=\"fa fa-square fa-lg\" style=\"color: #5bc0de;\"></i> {{_t('assoc_legend_4')}}</div></td></tr></tbody></table></div><div ng-include=\"'app/views/configuration/modal_assoc_add.html'\"></div><div class=\"modal fade\" id=modal_assoc_add tabindex=-1 role=dialog aria-labelledby=myModalLabel aria-hidden=true><div class=modal-dialog><div class=modal-content><form name=form_assoc id=form_assoc ng-submit_=storeAssoc(input) novalidate><div class=modal-header><button type=button class=close data-dismiss=modal aria-hidden=true>&times;</button><h4 class=modal-title>{{ _t('assoc_add_title')}}</h4></div><div class=modal-body style=\"white-space: normal\"><div class=form-inline>{{ _t('fro')}} {{nodeCfg.name}} {{ _t('to_locate')}}<br><div class=form-group><select class=form-control ng-model=input.toNode ng-change=showAssocNodeInstance(input.toNode,nodeCfg.hasMca)><option value=\"\" ng-selected=true>&lt; {{ _t('assoc_select_to_node')}} &gt;</option><option ng-repeat=\"v in assocAddDevices\" value={{v.id}}>(#{{v.id}}) {{v.name}}</option></select></div><div class=form-group ng-if=\"nodeCfg.hasMca && assocAddInstances\"><select class=form-control ng-model=input.toInstance><option value=\"\" ng-selected=true>&lt; {{ _t('assoc_select_to_instance')}} &gt;</option><option value=plain ng-selected=true>{{ _t('plain_association')}}</option><option ng-repeat=\"v in assocAddInstances\" value={{v.key}}>{{v.val}}</option></select></div></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" data-dismiss=modal ng-click=modalAssocHide()>{{ _t('dialog_abort')}}</button> <button type=submit class=\"btn btn-primary\" data-dismiss=modal ng-click=storeAssoc(input) ng-disabled=\"!input.toNode || ((assocAddInstances) && !input.toInstance)\">{{ _t('dialog_add')}}</button></div></form></div></div></div></div></div>"
  );


  $templateCache.put('app/views/configuration/commands.html',
    "<div ng-controller=ConfigCommandsController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div id=table_mobile ng-show=deviceId><table class=table><thead><tr><th>{{_t('th_instance')}}</th><th>{{_t('th_command_class')}}</th><th>{{_t('th_command_param')}}</th></tr></thead><tbody><tr ng-repeat=\"(k,v) in commands | orderBy:predicate:reverse\" id=\"{{ v.nodeId}}\"><td data-title=\"{{_t('th_instance')}}\" ng-class=\"($index == 0 ? 'no-class' : 'mobile-hide')\"><button class=\"btn btn-default\" ng-click=\"handleCmdClassModal('cmdClassModal',$event,v.instanceId, $index, v.ccId, 'cmdDataIn')\">{{v.instanceId}}</button> &nbsp;</td><td data-title=\"{{_t('th_command_class')}}\"><button class=\"btn btn-default\" href=\"\" ng-click=\"handleCmdClassModal('cmdClassModal',$event,v.instanceId,$index,v.ccId, 'cmdData')\">{{v.commandClass}}</button>&nbsp;</td><td data-title=\"{{_t('th_command_param')}}\"><div class=commands-data ng-repeat=\"c in v.command| orderBy:predicate:reverse\" ng-init=\"formName = 'form_' + c.data.method + '_' + v.rowId\"><form name={{formName}} id={{formName}} class=\"form form_commands\" role=form ng-submit=\"storeExpertCommnds(formName, v.cmd + '.' + c.data.method)\" novalidate><div class=commands-data-control><div class=form-inline ng-repeat=\"(pk,p) in c.data.params\"><expert-command-input collection=p values=c.data.values[pk] devices=devices name=c.data.method get-node-devices=getNodeDevices></expert-command-input></div><button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner[v.cmd + '.' + c.data.method]\"><bb-row-spinner spinner=\"rowSpinner[v.cmd + '.' + c.data.method]\" label=c.data.method icon=\"'fa-circle-o'\"></bb-row-spinner></button></div></form></div>&nbsp;</td></tr></tbody></table></div><div ng-include=\"'app/views/configuration/modal_cmdclass.html'\"></div></div>"
  );


  $templateCache.put('app/views/configuration/configuration.html',
    "<div ng-controller=ConfigConfigurationController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=deviceId><div ng-include=\"'app/views/configuration/configuration_commands.html'\"></div><div ng-if=\"!configCont && deviceZddx.length > 0\"><button id=btn_show_description class=\"btn btn-default\" ng-click=\"handleModal('loadXmlModal', $event)\"><i class=\"fa fa-clone\"></i> {{_t('select_zddx_help')}}</button><div ng-include=\"'app/views/configuration/modal_loadxml.html'\"></div></div><div ng-include=\"'app/views/configuration/configuration_config.html'\"></div><div ng-include=\"'app/views/configuration/configuration_wakeup.html'\"></div><div ng-include=\"'app/views/configuration/configuration_switchall.html'\"></div><div ng-include=\"'app/views/configuration/configuration_protection.html'\"></div></div></div>"
  );


  $templateCache.put('app/views/configuration/configuration_commands.html',
    "<div class=cfg-block ng-if=hasConfigurationCc.command ng-controller=ConfigCommandsController><h4>{{hasConfigurationCc.commandClass}}</h4><div class=commands-data ng-repeat=\"c in hasConfigurationCc.command| orderBy:predicate:reverse\" ng-init=\"formName = 'form_' + c.data.method + '_' + v.rowId\"><form name={{formName}} id={{formName}} class=\"form form_commands\" role=form ng-submit=\"storeExpertCommnds(formName, hasConfigurationCc.cmd + '.' + c.data.method)\" novalidate><div class=commands-data-control><div class=form-inline ng-repeat=\"(pk,p) in c.data.params\"><expert-command-input collection=p values=c.data.values[pk] devices=devices name=c.data.method get-node-devices=getNodeDevices></expert-command-input></div><button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner[hasConfigurationCc.cmd + '.' + c.data.method]\"><bb-row-spinner spinner=\"rowSpinner[hasConfigurationCc.cmd + '.' + c.data.method]\" label=c.data.method icon=\"'fa-circle-o'\"></bb-row-spinner></button></div></form></div></div>"
  );


  $templateCache.put('app/views/configuration/configuration_config.html',
    "<div class=cfg-block-content ng-if=configCont ng-init=\"formName = 'form_config'\"><form name={{formName}} id={{formName}} class=form ng-submit=\"submitApplyConfigCfg(formName,{'id': deviceId,'instance': '0','commandclass': '70','command': 'Set'}, configCont, hasBattery,false,false,false,'saveIntoDevice')\" novalidate><div class=cfg-block><button class=\"btn btn-primary\" type=button ng-click=\"updateFromDeviceCfg('devices[' + deviceId + '].instances[0].commandClasses[0x70].Get', configCont, deviceId, formName,'updateFromDevice')\" ng-disabled=\"rowSpinner['updateFromDevice']\"><bb-row-spinner spinner=\"rowSpinner['updateFromDevice']\" label=\"_t('btn_update_from_device')\" icon=\"'fa-files-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner['saveIntoDevice']\"><bb-row-spinner spinner=\"rowSpinner['saveIntoDevice']\" label=\"_t('apply_config')\" icon=\"'fa-save'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" type=button ng-click=\"setAllToDefault({'id': deviceId, 'instance': '0', 'commandclass': '70', 'command': 'Set'}, configCont, hasBattery, formName,'allToDefault')\" ng-disabled=\"rowSpinner['allToDefault']\"><bb-row-spinner spinner=\"rowSpinner['allToDefault']\" label=\"_t('set_all_default')\" icon=\"'fa-undo'\"></bb-row-spinner></button></div><div class=cfg-control-content id=cfg_control_{{v.confNum}} ng-repeat=\"v in configCont\"><div class=form-inline><expert-command-input collection=v div_id=$index default_value=v.defaultValue show_default_value=v.showDefaultValue curr_value=v.configCconfigValue></expert-command-input></div><div class=\"text-danger text-alert\" ng-if=\"v.configCconfigValue != v.configZwaveValue\" title=\"Val: {{v.configCconfigValue}} | Device: {{v.configZwaveValue}}\"><i class=\"fa fa-exclamation-triangle\"></i> {{_t('value_changed_to')}} <strong>{{v.configCconfigValue}}</strong> {{_t('value_not_stored_indevice')}}</div><p class=cfg-info><span class=is-updated-{{v.isUpdated}}>{{_t('rt_header_update_time')}}: {{v.updateTime}}</span> <span>| {{_t('set_value')}}: {{v.configCconfigValue}}</span> <span>| {{_t('default_value_is')}}:<config-default-value collection=v show_default_value=v.showDefaultValue default_value=v.defaultValue></config-default-value></span></p><br><p ng-if=v.description><i class=\"fa fa-info-circle fa-lg text-primary\"></i> <em>{{v.description}}</em></p><div><button class=\"btn btn-default\" type=button ng-click=\"submitApplyConfigCfg(formName, {'id': deviceId, 'instance': '0', 'commandclass': '70', 'command': 'Set'}, configCont, hasBattery, v.confNum,false,false,'save_' + v.confNum)\" ng-disabled=\"rowSpinner['save_' + v.confNum]\"><bb-row-spinner spinner=\"rowSpinner['save_' + v.confNum]\" label=\"_t('apply_config_into_device')\" icon=\"'fa-save text-success'\"></bb-row-spinner></button> <button class=\"btn btn-default\" type=button ng-click=\"submitApplyConfigCfg(formName, {'id': deviceId, 'instance': '0', 'commandclass': '70', 'command': 'Set'}, configCont, hasBattery, v.confNum, {confNum: v.confNum, showDefaultValue: v.showDefaultValue},false,'default_' + v.confNum)\" ng-disabled=\"rowSpinner['default_' + v.confNum]\"><bb-row-spinner spinner=\"rowSpinner['default_' + v.confNum]\" label=\"_t('set_to_default')\" icon=\"'fa-undo text-success'\"></bb-row-spinner></button></div></div></form></div>"
  );


  $templateCache.put('app/views/configuration/configuration_protection.html',
    "<div class=cfg-block id=protection_cont ng-if=protectionCont><h4>{{_t('protection_list')}}</h4><div class=cfg-block-content ng-init=\"formName = 'form_protection_list'\"><form name={{formName}} id={{formName}} class=form ng-submit=\"submitApplyConfigCfg(formName,{'id': deviceId,'instance': '0','commandclass': '75','command': 'Set'}, protectionCont, hasBattery,false,false,false,'saveIntoDeviceProtection')\" novalidate><div><button class=\"btn btn-primary\" type=button ng-click=\"uupdateFromDevice(protectionCont.cmd + '.Get()', hasBattery, deviceId, formName,'updateFromDeviceProtection')\" ng-disabled=\"rowSpinner['updateFromDeviceProtection']\"><bb-row-spinner spinner=\"rowSpinner['updateFromDeviceProtection']\" label=\"_t('btn_update_from_device')\" icon=\"'fa-files-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner['saveIntoDeviceProtection']\"><bb-row-spinner spinner=\"rowSpinner['saveIntoDeviceProtection']\" label=\"_t('apply_config')\" icon=\"'fa-save'\"></bb-row-spinner></button></div><div class=cfg-control-content ng-repeat=\"v in protectionCont.params\"><div class=form-inline><expert-command-input collection=v values=protectionCont.values[0] default_value=protectionCont.defaultValue curr_value=protectionCont.configCconfigValue name=protectionCont.name is_dropdown=1></expert-command-input></div><p class=cfg-info><span class=is-updated-{{protectionCont.isUpdated}}>{{_t('updated')}}: {{protectionCont.updateTime}} </span><span>| {{_t('default_value_is')}}:<config-default-value collection=v show_default_value=protectionCont.showDefaultValue default_value=protectionCont.defaultValue></config-default-value></span></p></div></form></div></div>"
  );


  $templateCache.put('app/views/configuration/configuration_switchall.html',
    "<div class=cfg-block id=switchall_cont ng-if=switchAllCont><h4>{{_t('switchall_list')}}</h4><div class=cfg-block-content ng-init=\"formName = 'form_switch_all'\"><form name={{formName}} id={{formName}} class=form ng-submit=\"submitApplyConfigCfg(formName,{'id': deviceId,'instance': '0','commandclass': '27','command': 'Set'}, switchAllCont, hasBattery,false,false,false,'saveIntoDeviceSwitchall')\" novalidate><div><button class=\"btn btn-primary\" type=button ng-click=\"updateFromDevice(switchAllCont.cmd + '.Get()', hasBattery, deviceId, formName,'updateFromDeviceSwitchall')\" ng-disabled=\"rowSpinner['updateFromDeviceSwitchall']\"><bb-row-spinner spinner=\"rowSpinner['updateFromDeviceSwitchall']\" label=\"_t('btn_update_from_device')\" icon=\"'fa-files-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner['saveIntoDeviceSwitchall']\"><bb-row-spinner spinner=\"rowSpinner['saveIntoDeviceSwitchall']\" label=\"_t('apply_config')\" icon=\"'fa-save'\"></bb-row-spinner></button></div><div class=cfg-control-content ng-repeat=\"v in switchAllCont.params\"><div class=form-inline><expert-command-input collection=v values=switchAllCont.values[0] default_value=switchAllCont.defaultValue curr_value=switchAllCont.configCconfigValue name=switchAllCont.name is_dropdown=1></expert-command-input></div><p class=cfg-info><span class=is-updated-{{switchAllCont.isUpdated}}>{{_t('updated')}}: {{switchAllCont.updateTime}} </span><span>| {{_t('default_value_is')}}:<config-default-value collection=v show_default_value=switchAllCont.showDefaultValue default_value=switchAllCont.defaultValue></config-default-value></span></p></div></form></div></div>"
  );


  $templateCache.put('app/views/configuration/configuration_wakeup.html',
    "<div class=cfg-block id=wakeup_cont ng-if=wakeupCont><h4>{{_t('wakeup_list')}}</h4><div class=cfg-block-content ng-init=\"formName = 'form_wakeup'\"><form name={{formName}} id={{formName}} class=form ng-submit=\"submitApplyConfigCfg(formName,{'id': deviceId,'instance': '0','commandclass': '84','command': 'Set'}, wakeupCont, hasBattery,false,false,false,'saveIntoDeviceWakeup')\" novalidate><div><button class=\"btn btn-primary\" type=button ng-click=\"updateFromDevice(wakeupCont.cmd + '.Get()', hasBattery, deviceId, formName,'updateFromDeviceWakeup')\" ng-disabled=\"rowSpinner['updateFromDeviceWakeup']\"><bb-row-spinner spinner=\"rowSpinner['updateFromDeviceWakeup']\" label=\"_t('btn_update_from_device')\" icon=\"'fa-files-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" type=submit ng-disabled=\"rowSpinner['saveIntoDeviceWakeup']\"><bb-row-spinner spinner=\"rowSpinner['saveIntoDeviceWakeup']\" label=\"_t('apply_config')\" icon=\"'fa-save'\"></bb-row-spinner></button></div><div class=clearfix></div><div class=cfg-control-content><div ng-repeat=\"v in wakeupCont.params\"><div class=form-inline><expert-command-input collection=v values=wakeupCont.values[0] devices=devices get-node-devices=getNodeDevices curr_value=wakeupCont.configCconfigValue curr_node_value=wakeupCont.configCconfigNodeValue name=wakeupCont.name></expert-command-input></div></div><div class=clearfix></div><p class=cfg-info><span class=is-updated-{{wakeupCont.isUpdated}}>{{_t('updated')}}: {{wakeupCont.updateTime}} </span><span>| {{_t('default_value_is')}}:<config-default-value collection=v show_default_value=wakeupCont.showDefaultValue default_value=wakeupCont.defaultValue></config-default-value></span></p></div></form></div></div>"
  );


  $templateCache.put('app/views/configuration/firmware.html',
    "<div ng-controller=ConfigFirmwareController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=deviceId><form name=form_firmware_update id=form_firmware_update class=\"form form-inline\" ng-submit=\"updateDeviceFirmware(firmware.input,'btn_update')\" novalidate><input id=url name=url class=form-control ng-model=firmware.input.url placeholder=URL title=\"please use format http:// ...... \"> <input type=file class=form-control file-model=myFile><select name=devices class=form-control ng-model=firmware.input.targetId><option value=\"\" ng-selected=\"v.id != deviceId\">--- {{_t('Target')}} ---</option><option value={{k}} ng-repeat=\"(k,v) in ['Z-Wave','EnOcean']\" ng-selected=\"k === 0\">{{v}}</option></select><button type=submit class=\"btn btn-primary\" id=btn_update ng-disabled=\"rowSpinner['btn_update']\"><bb-row-spinner spinner=\"rowSpinner['btn_update']\" label=\"_t('update')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></form></div></div>"
  );


  $templateCache.put('app/views/configuration/health.html',
    "<div ng-controller=ConfigHealthController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=\"deviceId && !_.isEmpty(health.neighbours)\"><div id=table_mobile><div class=\"alert ng-scope alert-warning\" ng-if=!health.device.hasPowerLevel><i class=\"fa fa-exclamation-circle\"></i> {{_t('link_health_no_powerlevel')}}</div><table class=\"table table-striped table-condensed table-hover\"><thead class=cf><tr><th><a href=\"\" ng-click=\"orderBy('id')\">{{ _t('link_to_node')}} <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('type')\">{{_t('device_description_device_type')}} <span ng-show=\"predicate == 'type'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>{{ _t('linkquality')}}</th><th class=mobile-show><button class=\"btn btn-primary\" id=btn_test_all_1 ng-if=health.device.hasPowerLevel ng-click=\"testAllLinks('all_1')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner icon=\"'fa-circle-o'\" spinner=\"rowSpinner['all_1']\" label=\"_t('test_all_links')\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in health.neighbours| orderBy:predicate:reverse track by $index\" id={{v.rowId}}><td data-title=#><button class=\"btn btn-default btn-{{v.type}}\">{{ v.id}}</button></td><td data-title=\"{{ _t('device_description_device_type')}}\">{{ v.name}}</td><td data-title=\"{{ _t('type')}}\"><i class=fa ng-class=v.icon></i></td><td data-title=\"{{ _t('datetime')}}\"><span class=\"row-time {{v.indicator.updateTimeColor}}\" ng-if=v.powerLevel>{{ v.indicator.updateTime | isTodayFromUnix }} </span><span class=\"row-time {{health.timing.indicator.updateTimeColor}}\" ng-if=\"!v.powerLevel && v.id === health.ctrlNodeId\">{{ health.timing.indicator.updateTime | isTodayFromUnix }}</span></td><td data-title=\"{{ _t('linkquality')}}\"><i class=\"fa fa-circle fa-2x clickable {{v.indicator.color}}\" ng-if=v.powerLevel ng-click=\"handlePowerLevelModal('healthPowerLevelModal', $event, v)\"></i> <i class=\"fa fa-circle fa-2x clickable {{health.timing.indicator.color}}\" ng-if=\"!v.powerLevel && v.id === health.ctrlNodeId\" ng-click=\"handleTimingModal('healthTimingModal', $event, v)\"></i></td><td data-title=\"\" ng-switch on=v.deviceType><button class=\"btn btn-default\" id=\"btn_test_{{ v.id}}\" ng-if=health.device.hasPowerLevel ng-click=runZwaveCmd(v.cmdTestNode) ng-disabled=rowSpinner[v.cmdTestNode]><bb-row-spinner icon=\"'fa-circle-o text-success'\" spinner=rowSpinner[v.cmdTestNode] label=\"_t('test_link')\"></bb-row-spinner></button> <button class=\"btn btn-default\" id=\"btn_nop_{{ v.id}}\" ng-if=\"!health.device.hasPowerLevel && v.type === 'static'\" ng-click=runZwaveNopCmd(v.cmdNop) ng-disabled=rowSpinner[v.cmdNop]><bb-row-spinner icon=\"'fa-circle-o text-success'\" spinner=rowSpinner[v.cmdNop] label=\"_t('nop')\"></bb-row-spinner></button></td></tr></tbody></table></div></div><div id=healthPowerLevelModal class=appmodal ng-if=modalArr.healthPowerLevelModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handlePowerLevelModal('healthPowerLevelModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{health.device.find.name|cutText:true:30}}</h3></div><div class=appmodal-body ng-bind-html=\"health.device.commandClass | toTrusted\"></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handlePowerLevelModal('healthPowerLevelModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_close')}}</span></button></div></div></div><div id=healthTimingModal class=appmodal ng-if=modalArr.healthTimingModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleTimingModal('healthTimingModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{health.device.find.name|cutText:true:30}}</h3></div><div class=appmodal-body><p><strong>{{_t('th_total')}} (pkts)</strong>: {{health.timing.find.totalPackets}}</p><p><strong>{{_t('th_ok')}}</strong>: {{health.timing.find.okPackets}}%</p><p><strong>{{_t('th_lastpackets')}}</strong>: <span ng-bind-html=\"health.timing.find.lastPackets | toTrusted\"></span></p><p><strong>{{_t('timing_color_description')}}:</strong><br><i class=\"fa fa-square fa-lg\" style=\"color: green\"></i> {{_t('timing_green')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: black\"></i> {{_t('timing_black')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: red\"></i> {{_t('timing_red')}}.<br></p></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleTimingModal('healthTimingModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_close')}}</span></button></div></div></div></div>"
  );


  $templateCache.put('app/views/configuration/interview.html',
    "<div ng-controller=ConfigInterviewController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=deviceId><div class=cfg-block id=rename_cont><h4><a href=\"\" ng-click=\"goRename = !goRename\">{{_t('device_rename_tooltip')}} <i class=\"fa fa-pencil\"></i></a></h4><div ng-show=goRename><form name=form_rename id=form_rename ng-model=form_rename class=\"form form-inline\" ng-submit=\"renameDevice(deviceName,'deviceName')\" novalidate><input name=device_name id=device_name class=form-control value={{deviceName}} ng-model=deviceName> <button type=submit class=\"btn btn-primary\" id=btn_update ng-disabled=\"rowSpinner['deviceName']\"><bb-row-spinner spinner=\"rowSpinner['deviceName']\" label=\"_t('btn_save_name')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></form></div></div><div class=cfg-block><div class=row><div class=col-md-8><div class=table-responsive_><table class=\"table table-striped table-condensed table-cfg-interview\"><tbody><tr ng-repeat=\"v in descriptionCont\" ng-hide=\"v.val === '' || v.val === false || v.val === null\"><th>{{_t(v.key)}}</th><td id={{v.key}}><div ng-switch on=v.key><div ng-switch-when=command_class><span ng-repeat=\"cc in interviewCommands\"><a href=\"\" ng-click=\"handleCmdClassModal('cmdClassModal',$event,cc.iId,cc.ccId, 'cmdData')\">{{cc.ccName}} </a>&#8226;&nbsp;</span></div><div class=config-interview-val ng-switch-default ng-bind-html=\"v.val | toTrusted\"></div></div></td></tr><tr><th>{{_t('device_interview_indicator')}}</th><td><div class=progress ng-if_=\"zwaveInterview.progress > 0 && zwaveInterview.progress < 101\"><div class=progress-bar style=\"min-height:40px;min-width: 2em; width: {{zwaveInterview.progress}}%\" ng-class=\"zwaveInterview.progress < 100 ? 'progress-bar-danger progress-bar-striped active' : 'progress-bar-success'\">{{zwaveInterview.progress}}%</div></div></td></tr></tbody></table></div></div><div class=col-md-4><img src={{deviceImage}} class=config-device-img alt=Image></div></div></div><div class=cfg-block><button id=btn_request_nif class=\"btn btn-primary\" ng-click=\"requestNodeInformation('devices[' + deviceId + '].RequestNodeInformation()')\" ng-disabled=\"rowSpinner['devices[' + deviceId + '].RequestNodeInformation()']\"><bb-row-spinner spinner=\"rowSpinner['devices[' + deviceId + '].RequestNodeInformation()']\" label=\"_t('config_ui_request_node_info')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" id=btn_interview_force ng-click=\"interviewForce('devices[' + deviceId + '].InterviewForce()')\" ng-disabled=\"rowSpinner['devices[' + deviceId + '].InterviewForce()']\"><bb-row-spinner spinner=\"rowSpinner['devices[' + deviceId + '].InterviewForce()']\" label=\"_t('config_ui_force_interview')\" icon=\"'fa-fire'\"></bb-row-spinner></button> <button id=btn_show_interview_result class=\"btn btn-default\" ng-click=\"handleModal('interviewModal',$event)\"><i class=\"fa fa-clone\"></i> {{_t('config_ui_show_interview_results')}}</button> <button id=btn_show_description class=\"btn btn-default\" ng-click=\"handleModal('loadXmlModal', $event)\"><i class=\"fa fa-clone\"></i> {{_t('config_ui_select_xml')}}</button> <a href=\"{{cfg.server_url + cfg.zddx_create_url + deviceId}}\" class=\"btn btn-default\" id=btn_create_zddx target=_blank><i class=\"fa fa-clone\"></i> {{_t('btn_zddx_create')}}</a></div></div><div ng-include=\"'app/views/configuration/modal_interview.html'\"></div><div ng-include=\"'app/views/configuration/modal_cmdclass.html'\"></div><div ng-include=\"'app/views/configuration/modal_loadxml.html'\"></div></div>"
  );


  $templateCache.put('app/views/configuration/modal_assoc_add.html',
    "<div id=assocAddModal class=appmodal ng-show=modalArr.assocAddModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=closeAssocModal()><i class=\"fa fa-times\"></i></span><h3>{{_t('th_command_class')}}</h3></div><div class=\"appmodal-body modal-h-600\" style=\"white-space: normal\"><div class=form-inline>{{ _t('fro')}} {{nodeCfg.name}} {{ _t('to_locate')}}<br><div class=form-group><select class=form-control ng-model=input.toNode ng-change=showAssocNodeInstance(input.toNode,nodeCfg.hasMca)><option value=\"\" ng-selected=true>&lt; {{ _t('assoc_select_to_node')}} &gt;</option><option ng-repeat=\"v in assocAddDevices track by $index\" value={{v.id}}>(#{{v.id}}) {{v.name}}</option></select></div><div class=form-group ng-if=\"nodeCfg.hasMca && assocAddInstances\"><select class=form-control ng-model=input.toInstance><option value=\"\" ng-selected=true>&lt; {{ _t('assoc_select_to_instance')}} &gt;</option><option value=plain ng-selected=true>{{ _t('plain_association')}}</option><option ng-repeat=\"v in assocAddInstances track by $index\" value={{v.key}}>{{v.val}}</option></select></div></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=closeAssocModal()><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=submit class=\"btn btn-primary\" ng-click=storeAssoc(input) ng-disabled=\"!input.toNode || ((assocAddInstances) && !input.toInstance)\"><i class=\"fa fa-circle-o\"></i> <span class=btn-name>{{ _t('dialog_add')}}</span></button></div></div></div>"
  );


  $templateCache.put('app/views/configuration/modal_cmdclass.html',
    "<div id=cmdClassModal class=appmodal ng-show=modalArr.cmdClassModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('cmdClassModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('th_command_class')}}</h3></div><div class=\"appmodal-body modal-h-600\"><div ng-bind-html=commandClass|toTrusted></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('cmdClassModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button></div></div></div>"
  );


  $templateCache.put('app/views/configuration/modal_interview.html',
    "<div id=interviewModal class=appmodal ng-show=modalArr.interviewModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('interviewModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('interview_results_dialog_title')}}</h3></div><div class=\"appmodal-body modal-h-600\"><p>{{_t('interview_results_title')}} <button class=\"btn btn-default\" ng-click=\"handleCmdClassModal('cmdClassModal',$event)\"><i class=\"fa fa-clone\"></i> {{deviceName}}</button></p><div id=table_mobile_modal_1><table class=\"table table-condensed\"><thead><tr><th>{{_t('th_instance')}}</th><th>{{_t('th_command_class')}}</th><th>{{_t('th_result')}}</th></tr></thead><tbody><tr ng-repeat=\"v in interviewCommands\" id={{v.ccId}}><td data-title=\"{{_t('th_instance')}}\" ng-class=\"($index == 0 ? 'no-class' : 'mobile-hide')\"><a href=\"\" ng-click=\"handleCmdClassModal('cmdClassModal',$event,v.iId,v.ccId, 'cmdDataIn')\">{{v.iId}}</a> &nbsp;</td><td data-title=\"{{_t('th_command_class')}}\"><a href=\"\" ng-click=\"handleCmdClassModal('cmdClassModal',$event,v.iId,v.ccId, 'cmdData')\">{{v.ccName}}</a></td><td data-title=\"{{_t('th_result')}}\"><span ng-if=v.interviewDone><i class=\"fa fa-check text-success\"></i></span> <button id=btn_force_interview_{{v.ccId}} class=\"btn btn-primary btn-sm\" ng-init=\"apiUrl = 'devices[' +deviceId + '].instances[' + v.iId+'].commandClasses[' + v.ccId + '].Interview()'\" ng-if=!v.interviewDone ng-click=interviewForceDevice(apiUrl) ng-disabled=rowSpinner[apiUrl]><bb-row-spinner spinner=rowSpinner[apiUrl] label=\"_t('config_ui_force_interview')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> &nbsp;</td></tr></tbody></table></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('interviewModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button></div></div></div>"
  );


  $templateCache.put('app/views/configuration/modal_loadxml.html',
    "<div id=loadXmlModa class=appmodal ng-if=modalArr.loadXmlModal><div class=appmodal-in ng-controller=LoadDeviceXmlController><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('loadXmlModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('config_ui_select_xml')}}</h3></div><div class=\"appmodal-body modal-h-600\"><p ng-bind-html=\"_t('select_zddx_help') | toTrusted\"></p><select id=select_zddx_help class=form-control ng-change=changeDeviceXml(deviceXml.input) ng-model=deviceXml.input.fileName><option value=\"\">---</option><option ng-init=\"selectCfg = {\r" +
    "\n" +
    "                                'name':((v.brandName == '' && v.productName == '')?('Unnamed ZDDX: ' + v.fileName):(v.brandName + ' ' + v.productName))}\" ng-repeat=\"v in deviceXml.all | orderBy:'brandName':false track by $index\" ng-selected=\"deviceZddxFile == v.fileName\" value={{v.fileName}}>{{selectCfg.name}}</option></select><div id=device_select_image_container ng-if=\"!_.isEmpty(deviceXml.find) && deviceXml.find.deviceImage\"><div id=device_select_image><img ng-src={{deviceXml.find.deviceImage}}></div></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('loadXmlModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button class=\"btn btn-primary\" ng-if=!_.isEmpty(deviceXml.find) ng-click=\"storeDeviceXml(deviceXml.input,'storeDeviceXml')\" ng-disabled=\"rowSpinner['storeDeviceXml']\"><bb-row-spinner spinner=\"rowSpinner['storeDeviceXml']\" label=\"_t('btn_save')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></div></div></div>"
  );


  $templateCache.put('app/views/configuration/navi.html',
    "<div class=\"tabs-wrap form-inline\" ng-show=\"deviceId > 0\"><div class=\"btn-group btn-goup-tabs\" ng-class=\"cfg.zwavecfg.debug ? 'btn-tabs-7': 'btn-tabs-6'\"><a class=\"btn btn-default\" title=\"{{_t('nav_device_interview')}}\" href=#configuration/interview/{{deviceId}} ng-class=\"activeTab == 'interview' ? 'active' : ''\"><i class=\"fa fa-commenting\"></i> <span class=btn-name>{{_t('nav_device_interview')}}</span> </a><a class=\"btn btn-default\" title=\"{{_t('nav_device_configuration')}}\" href=#configuration/configuration/{{deviceId}} ng-class=\"activeTab == 'configuration' ? 'active' : ''\"><i class=\"fa fa-cogs\"></i> <span class=btn-name>{{_t('nav_device_configuration')}}</span> </a><a class=\"btn btn-default\" title=\"{{_t('nav_device_assoc')}}\" href=#configuration/association/{{deviceId}} ng-class=\"activeTab == 'association' ? 'active' : ''\"><i class=\"fa fa-share-alt\"></i> <span class=btn-name>{{_t('nav_device_assoc')}} </span></a><a class=\"btn btn-default\" title=\"{{_t('link_health')}}\" href=#configuration/health/{{deviceId}} ng-class=\"activeTab == 'health' ? 'active' : ''\"><i class=\"fa fa-unlink\"></i> <span class=btn-name>{{_t('link_health')}}</span> </a><a class=\"btn btn-default\" title=\"{{_t('nav_expert_commands')}}\" href=#configuration/commands/{{deviceId}} ng-class=\"activeTab == 'commands' ? 'active' : ''\"><i class=\"fa fa-file-code-o\"></i> <span class=btn-name>{{_t('nav_expert_commands')}}</span> </a><a class=\"btn btn-default\" title=\"{{_t('nav_firmware_update')}}\" href=#configuration/firmware/{{deviceId}} ng-class=\"activeTab == 'firmware' ? 'active' : ''\"><i class=\"fa fa-upload\"></i> <span class=btn-name>{{_t('nav_firmware_update')}}</span> </a><a class=\"btn btn-default\" title=\"{{_t('nav_postfix_update')}}\" href=#configuration/postfix/{{deviceId}} ng-class=\"activeTab == 'postfix' ? 'active' : ''\" ng-if=cfg.zwavecfg.debug><i class=\"fa fa-tasks\"></i> <span class=btn-name>{{_t('nav_postfix_update')}}</span></a></div></div><div class=\"page-header form-inline\" ng-if=\"_.size(devices) > 0\"><label>{{_t('h1_configuration_for')}}</label><select name=devices class=form-control ng-model=deviceId ng-change=changeDevice(deviceId)><option value=\"\" ng-selected=\"v.id != deviceId\">--- {{_t('select_device')}} ---</option><option ng-repeat=\"v in devices| orderBy:predicate:reverse\" value={{v.id}} ng-selected=\"v.id == deviceId\">(#{{v.id}}) {{v.name}}</option></select></div><bb-alert alert=alert></bb-alert>"
  );


  $templateCache.put('app/views/configuration/postfix.html',
    "<div ng-controller=ConfigPostfixController><div ng-include=\"'app/views/configuration/navi.html'\"></div><div ng-show=deviceId><div class=\"alert alert-warning\" ng-if=!postfix.model.p_id><i class=\"fa fa-exclamation-circle\"></i> {{_t('postfix_missingid')}}</div><form id=postfix_form name=postfix_form role=form class=form novalidate ng-if=postfix.model.p_id ng-submit=updatePostfix()><div class=cfg-block><table class=\"table table-striped table-condensed table-cfg-interview\"><tbody><tr><th>{{_t('p_id')}}</th><td>{{postfix.model.p_id}}</td><td>&nbsp;</td></tr><tr><th>{{_t('product')}}</th><td><input name=product id=product class=form-control ng-model=postfix.model.product></td><td>&nbsp;</td></tr><tr><th>{{_t('preInterview')}}</th><td><input name=preInterview id=preInterview class=form-control ng-model=postfix.interview.preInterview><div ng-repeat=\"v in postfix.model.preInterview track by $index\">{{v}} <span class=clickable ng-click=\"removeInterview('preInterview',$index)\"><i class=\"fa fa-times text-danger\"></i></span></div></td><td><button type=button class=\"btn btn-default\" ng-click=\"addInterview('preInterview')\"><i class=\"fa fa-plus text-success\"></i></button></td></tr><tr><th>{{_t('postInterview')}}</th><td><input name=postInterview id=postInterview class=form-control ng-model=postfix.interview.postInterview><div ng-repeat=\"v in postfix.model.postInterview\">{{v}} <span class=clickable ng-click=\"removeInterview('postInterview',$index)\"><i class=\"fa fa-times text-danger\"></i></span></div></td><td><button type=button class=\"btn btn-default\" ng-click=\"addInterview('postInterview')\"><i class=\"fa fa-plus text-success\"></i></button></td></tr><tr><th>{{_t('tester')}}</th><td><input name=tester id=tester class=form-control ng-model=postfix.model.tester></td><td>&nbsp;</td></tr><tr><th>{{_t('commentary')}}</th><td><input name=commentary id=commentary class=form-control ng-model=postfix.model.commentary></td><td>&nbsp;</td></tr></tbody></table></div><div class=\"cfg-block text-right\"><button type=button class=\"btn btn-default\" ng-click=\"deletePostfix(_t('lb_delete_confirm'))\" ng-if=postfix.find><i class=\"fa fa-times text-danger\"></i> {{_t('dialog_remove')}}</button> <a class=\"btn btn-default\" href=\"{{cfg.postfixget_url + '/' + postfix.model.p_id}}\" target=blank ng-if=postfix.find><i class=\"fa fa-file-code-o text-success\"></i> {{_t('show_json')}} </a><button type=submit class=\"btn btn-primary\"><i class=\"fa fa-circle-o\"></i> {{_t('btn_save')}}</button></div></form></div></div>"
  );


  $templateCache.put('app/views/controll/locks.html',
    "<div ng-controller=LocksController><div class=page-header><h1>{{_t('nav_locks')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=locks.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('level')\">{{ _t('th_level')}} <span ng-show=\"predicate == 'status'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody><tr ng-repeat=\"v in locks.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id}}</td><td data-title=\"{{ _t('device_name')}}\">{{ v.name}}</td><td data-title=\"{{ _t('th_level')}}\" class=row-level>{{ v.level |lockStatus }} &nbsp;</td><td data-title=\"{{ _t('datetime')}}\" class=\"row-time is-updated-{{v.isUpdated}}\">{{ v.updateTime | isTodayFromUnix }} &nbsp;</td><td class=td-action data-title=\"\"><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateLock(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td><td class=\"lock-controll td-action\" data-title=\"\"><div class=\"btn-group btn-group-lock\"><button type=button class=\"btn btn-default btn-lock\" id=\"btn_lock_{{ v.rowId}}\" title=\"{{_t('btn_close')}}\" ng-class=\"{active: v.level=='255'}\" ng-click=updateLock(v.urlToOn) ng-disabled=rowSpinner[v.urlToOn]><bb-row-spinner spinner=rowSpinner[v.urlToOn] icon=\"'fa-lock text-success'\"></bb-row-spinner></button> <button type=button class=\"btn btn-default btn-unlock\" id=\"btn_unlock_{{ v.rowId}}\" title=\"{{_t('btn_open')}}\" ng-class=\"{active: v.level=='0'}\" ng-click=updateLock(v.urlToOff) ng-disabled=rowSpinner[v.urlToOff]><bb-row-spinner spinner=rowSpinner[v.urlToOff] icon=\"'fa-unlock text-danger'\"></bb-row-spinner></button></div></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/controll/meters.html',
    "<div ng-controller=MetersController><div class=page-header><h1>{{_t('nav_meters')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=meters.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('purpose')\">{{ _t('device_description_device_type')}} <span ng-show=\"predicate == 'purpose'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=text-right><a href=\"\" ng-click=\"orderBy('level')\">{{ _t('th_level')}} <span ng-show=\"predicate == 'level'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('levelExt')\">{{ _t('th_scale')}} <span ng-show=\"predicate == 'levelExt'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=\"mobile-show td-action\"><button class=\"btn btn-primary\" id=btn_update_all_1 ng-click=\"updateAllMeters('all_1','urlToStore')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner spinner=\"rowSpinner['all_1']\" label=\"_t('switches_update_all')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in meters.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id}}<span ng-show=\"v.iId != 0\">.{{v.iId}}</span></td><td data-title=\"{{ _t('device_name')}}\"><i class=\"fa fa-lightbulb-o fa-lg\"></i> {{ v.name}}</td><td data-title=\"{{ _t('device_description_device_type')}}\">{{ v.purpose}} &nbsp;</td><td data-title=\"{{ _t('th_level')}}\" class=\"row-level text-right\">{{ v.level}} &nbsp;</td><td data-title=\"{{ _t('th_scale')}}\" class=row-level-ext>{{ v.levelExt}} &nbsp;</td><td data-title=\"{{ _t('datetime')}}\" class=\"row-time is-updated-{{v.isUpdated}}\" title=\"{{v.dateTime.date}} {{v.dateTime.time}}\">{{v.dateTime.today}}</td><td class=td-action data-title=\"\"><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateMeter(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button> <button class=\"btn btn-default\" id=\"btn_reset_{{ v.rowId}}\" ng-if=v.urlToReset ng-click=updateMeter(v.urlToReset) ng-disabled=rowSpinner[v.urlToReset]><bb-row-spinner spinner=rowSpinner[v.urlToReset] label=\" _t('reset')\" icon=\"'fa-refresh text-success'\"></bb-row-spinner></button></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/controll/sensors.html',
    "<div ng-controller=SensorsController><div class=page-header><h1>{{ _t('h1_sensor')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=sensors.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('purpose')\">{{ _t('device_description_device_type')}} <span ng-show=\"predicate == 'purpose'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=text-right><a href=\"\" ng-click=\"orderBy('level')\">{{ _t('th_level')}} <span ng-show=\"predicate == 'level'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('levelExt')\">{{ _t('th_scale')}} <span ng-show=\"predicate == 'levelExt'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=\"mobile-show td-action\"><button class=\"btn btn-primary\" id=btn_update_all_1 ng-click=\"updateAllSensors('all_1','urlToStore')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner spinner=\"rowSpinner['all_1']\" label=\"_t('switches_update_all')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in sensors.all| orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id}}<span ng-show=\"v.iId != 0\">.{{v.iId}}</span></td><td data-title=\"{{ _t('device_name')}}\" ng-switch on=v.type><i ng-switch-when=SensorBinary class=\"fa fa-eye fa-lg\"></i> <i ng-switch-when=Meter class=\"fa fa-lightbulb-o fa-lg\"></i> <i ng-switch-default class=\"fa fa-bullseye fa-lg\"></i> {{ v.name}}</td><td data-title=\"{{ _t('device_description_device_type')}}\">{{v.purpose}} &nbsp;</td><td data-title=\"{{ _t('th_level')}}\" class=\"row-level text-right\"><span ng-if=!v.html ng-bind=v.level></span> <span ng-if=v.html ng-bind-html=v.level|toTrusted></span> &nbsp;</td><td data-title=\"{{ _t('th_scale')}}\" class=row-level-ext>{{v.levelExt}} &nbsp;</td><td data-title=\"{{ _t('datetime')}}\" class=\"row-time is-updated-{{v.isUpdated}}\" title=\"{{v.dateTime.date}} {{v.dateTime.time}}\">{{v.dateTime.today}}</td><td class=td-action data-title=\"\"><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateSensor(v.cmdToUpdate,v.urlToStore) ng-disabled=rowSpinner[v.cmdToUpdate]><bb-row-spinner spinner=rowSpinner[v.cmdToUpdate] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/controll/switch.html',
    "<div ng-controller=SwitchController><div class=page-header><h1>{{_t('nav_switch')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=switches.show><table class=\"table table-striped table-condensed table-hover\"><thead class=cf><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=text-right><a href=\"\" ng-click=\"orderBy('level')\">{{ _t('th_level')}} <span ng-show=\"predicate == 'level'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('switchAllValue')\">{{ _t('th_switchall')}} <span ng-show=\"predicate == 'switchAllValue'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=mobile-show><button class=\"btn btn-primary\" id=btn_update_all_1 ng-click=\"updateAllSwitches('all_1','urlToStore')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner spinner=\"rowSpinner['all_1']\" label=\"_t('switches_update_all')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th><th class=mobile-show><div class=btn-group style=\"min-width: 150px !important\"><button class=\"btn btn-primary\" id=btn_all_of ng-click=\"updateAllSwitches('btn_all_of','urlToOff')\" ng-disabled=\"rowSpinner['btn_all_of']\"><bb-row-spinner spinner=\"rowSpinner['btn_all_of']\" label=\" _t('btn_all_off')\" icon=\"'fa-toggle-off'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" id=btn_all_on ng-click=\"updateAllSwitches('btn_all_on','urlToOn')\" ng-disabled=\"rowSpinner['btn_all_on']\"><bb-row-spinner spinner=\"rowSpinner['btn_all_on']\" label=\"_t('btn_all_on')\" icon=\"'fa-toggle-on'\"></bb-row-spinner></button></div></th><th class=\"th-slider td-action\">&nbsp;</th></tr></thead><tbody><tr ng-repeat=\"v in switches.all| orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\" ng-init=\"range.maxs = v.levelVal\"><td data-title=#>{{ v.id}}<span ng-show=\"v.multiChannel || v.iId > 0\">.{{v.iId}}</span></td><td data-title=\"{{ _t('device_name')}}\"><switch-type-icon generic=\"{{ v.genericType}}\" specific=\"{{ v.specificType}}\"></switch-type-icon>{{ v.name}}</td><td data-title=\"{{ _t('th_level')}}\"><strong class=\"row-level text-right\" style=\"color: {{ v.levelColor}}\">{{ v.level}}</strong></td><td data-title=\"{{ _t('datetime')}}\" lass=\"row-time is-updated-{{v.isUpdated}}\" title=\"{{v.dateTime.date}} {{v.dateTime.time}}\">{{v.dateTime.today}}</td><td data-title=\"{{ _t('th_switchall')}}\"><switch-all-icon hasall=\"{{ v.switchAllValue}}\" ng-if=\"v.switchAllValue !== null\"></switch-all-icon>&nbsp;</td><td data-title=\"\"><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateSwitch(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td><td data-title=\"\" ng-switch on=v.deviceType><div ng-switch-when=multilevel><div class=btn-group style=\"min-width: 110px !important\"><label class=switcher title={{v.levelStatus}} ng-class=\"v.levelStatus === 'on' ? 'ison':'isoff'\" ng-hide=\"rowSpinner['btn_all_of'] || rowSpinner['btn_all_on']\" ng-click=\"updateSwitch(\r" +
    "\n" +
    "                               v.levelStatus === 'on' ?  v.urlToOff : v.urlToOn);\r" +
    "\n" +
    "                               v.levelStatus = (v.levelStatus === 'on' ?  'off' : 'on')\"><div class=\"switcher-slider round\"></div></label><i class=\"fa fa-spinner fa-spin fa-lg\" ng-if=\"rowSpinner['btn_all_of'] || rowSpinner['btn_all_on'] \"></i></div><button class=\"btn btn-default\" id=\"btn_full_{{ v.rowId}}\" ng-show_=!v.hasMotor ng-disabled=rowSpinner[v.urlToFull] ng-click=updateSwitch(v.urlToFull)><bb-row-spinner spinner=rowSpinner[v.urlToFull] label=v.btnFull icon=\"'fa-circle-o-notch text-success'\"></bb-row-spinner></button></div><div class=btn-group ng-switch-when=binary><label class=switcher title={{v.levelStatus}} ng-class=\"v.levelStatus === 'on' ? 'ison':'isoff'\" ng-hide=\"rowSpinner['btn_all_of'] || rowSpinner['btn_all_on']\" ng-click=\"updateSwitch(\r" +
    "\n" +
    "                               v.levelStatus === 'on' ?  v.urlToOff : v.urlToOn);\r" +
    "\n" +
    "                               v.levelStatus = (v.levelStatus === 'on' ?  'off' : 'on')\"><div class=\"switcher-slider round\"></div></label><i class=\"fa fa-spinner fa-spin fa-lg\" ng-if=\"rowSpinner['btn_all_of'] || rowSpinner['btn_all_on'] \"></i></div><div ng-switch-default>&nbsp;</div></td><td class=td-action data-title=\"\" ng-switch on=v.deviceType><div ng-switch-when=multilevel id=range_slider_{{$index}} class=app-range-slider range-slider min=0 max=v.levelMax model-max=switches.rangeSlider[$index] pin-handle=min on-handle-down=sliderOnHandleDown() on-handle-up=sliderOnHandleUp(v.urlToSlide,$index)></div><div ng-switch-default>&nbsp;</div></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/controll/thermostat.html',
    "<div ng-controller=ThermostatController><div class=page-header><h1>{{_t('nav_thermostat')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=thermostats.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('temp')\">{{ _t('switch_point_temp')}} <span ng-show=\"predicate == 'temp'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>&nbsp;</th><th>&nbsp;</th><th class=th-slider>&nbsp;</th></tr></thead><tbody><tr ng-repeat=\"v in thermostats.all| orderBy:predicate:reverse track by v.id\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id}}</td><td data-title=\"{{ _t('device_name')}}\"><i class=\"fa fa-sort-amount-asc fa-lg\"></i> {{ v.name}}</td><td data-title=\"{{ _t('switch_point_temp')}}\" class=row-level><span class=level-val ng-show=\"v.level != null\">{{ v.level}}</span>&nbsp;<span ng-show=v.hasExt>{{ v.scale}}</span></td><td data-title=\"{{ _t('datetime')}}\" class=row-time><span class=is-updated-{{v.isUpdated}} ng-show=\"v.level != null\">{{ v.updateTime | isTodayFromUnix }}</span></td><td><div class=form-inline ng-show=v.isThermostatMode><select class=form-control ng-model=thermostats.mChangeMode[v.id] ng-change=updateThermostatMode(v.urlToStore,thermostats.mChangeMode[v.id])><option value=\"\">--- {{_t.('thermostat_mode_change')}} ---</option><option ng-repeat=\"m in v.modeList\" value={{m.key}} ng-selected=\"m.key == v.curThermMode\">{{m.val}}</option></select><bb-row-spinner spinner=rowSpinner[v.urlToStore]></bb-row-spinner></div></td><td><div class=btn-group ng-show=!v.curThermMode><button title=\"{{_t.('btn_minus')}}\" class=\"btn btn-default\" ng-click=\"updateThermostatTempClick(v.urlChangeTemperature, $index, '-')\"><i class=\"fa fa-minus text-danger\"></i></button> <button title=\"{{_t.('btn_plus')}}\" class=\"btn btn-default\" ng-click=\"updateThermostatTempClick(v.urlChangeTemperature, $index, '+')\"><i class=\"fa fa-plus text-success\"></i></button></div><bb-row-spinner spinner=rowSpinner[v.urlChangeTemperature]></bb-row-spinner></td><td><div ng-show=!v.curThermMode><div id=range_slider_{{$index}} class=app-range-slider range-slider min=cfg.thermostat_range.min max=cfg.thermostat_range.max model-max=thermostats.rangeSlider[$index] pin-handle=min on-handle-down=sliderOnHandleDown() on-handle-up=sliderOnHandleUp(v.urlChangeTemperature,$index)></div></div></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/device/associations.html',
    "<div ng-controller=AssociationsController><div class=page-header><h1>{{_t('nav_active_associations')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=devices.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th style=\"width: 20%\"><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>{{ _t('th_assoc_group_name')}}</th><th class=\"mobile-show td-action\" style=\"width: 20%\"><button class=\"btn btn-primary\" ng-show=!hideLifeline ng-click=\"hideLifeline = !hideLifeline;\r" +
    "\n" +
    "                                        lifeline(true)\"><i class=\"fa fa-eye\"></i> {{ _t('btn_show_lifeline')}}</button> <button class=\"btn btn-default\" ng-show=hideLifeline ng-click=\"hideLifeline = false;\r" +
    "\n" +
    "                                        lifeline(false)\"><i class=\"fa fa-eye-slash\"></i> {{ _t('btn_hide_lifeline')}}</button></th></tr></thead><tbody><tr ng-repeat=\"v in devices.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\" ng-show=v.assocGroup><td data-title=#>{{ v.id}}</td><td data-title=\"{{ _t('device_name')}}\"><a href=#configuration/interview/{{v.id}}>{{ v.name}}</a></td><td data-title=\"{{ _t('th_assoc_group_name')}}\"><div ng-repeat=\"g in v.assocGroup\"><p>{{g.name}}<br><button class=\"btn btn-default\" ng-repeat=\"d in g.devices\">{{d}}</button></p>&nbsp;</div></td><td class=td-action><a class=\"btn btn-default\" href=#configuration/interview/{{v.id}}><i class=\"fa fa-pencil text-success\"></i> {{ _t('btn_change')}}</a>&nbsp;</td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/device/battery.html',
    "<div ng-controller=BatteryController><div class=page-header><h1>{{_t('nav_battery')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=batteries.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('batteryType')\">{{ _t('th_battery_type')}} <span ng-show=\"predicate == 'batteryType'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('level')\">{{ _t('th_level')}} <span ng-show=\"predicate == 'level'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th class=\"mobile-show td-action\"><button class=\"btn btn-primary\" id=btn_update_all_1 ng-click=\"updateAllBatteries('all_1','urlToStore')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner spinner=\"rowSpinner['all_1']\" label=\"_t('switches_update_all')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in batteries.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id }}</td><td data-title=\"{{ _t('device_name')}}\"><a href=#configuration/interview/{{v.id}}>{{ v.name}}</a></td><td data-title=\"{{ _t('th_battery_type')}}\">{{ v.batteryCount }}<span ng-show=v.batteryCount>*</span>{{ v.batteryType }} &nbsp;</td><td data-title=\"{{ _t('th_level')}}\"><i class=\"fa fa-lg {{ v.level | getBatteryIcon }}\"></i>&nbsp;<span class=row-level>{{ v.level+v.scale }}</span></td><td data-title=\"{{ _t('datetime')}}\" class=\"row-time is-updated-{{v.isUpdated}}\">{{ v.updateTime | isTodayFromUnix }} &nbsp;</td><td class=td-action><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateBattery(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/device/modal_status_interview.html',
    "<div id=interviewModal class=appmodal ng-show=modalArr.interviewModal><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"interviewDeviceId = null;handleModal('interviewModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('interview_results_dialog_title')}}: {{deviceInfo.name}}</h3></div><div class=\"appmodal-body modal-h-600\"><div id=table_mobile_modal_1><table class=\"table table-condensed\"><thead><tr><th>{{_t('th_command_class')}}</th><th>{{_t('th_result')}}</th></tr></thead><tbody><tr ng-repeat=\"v in interviewCommands\" id={{v.ccId}}><td data-title=\"{{_t('th_command_class')}}\">{{v.ccName}}</td><td data-title=\"{{_t('th_result')}}\"><span ng-if=v.interviewDone><i class=\"fa fa-check text-success\"></i></span> <button id=btn_force_interview_{{v.ccId}} class=\"btn btn-primary btn-sm\" ng-init=\"apiUrl = 'devices[' + deviceInfo.id + '].instances[' + v.iId + '].commandClasses[' +v.ccId+ '].Interview()'\" ng-if=!v.interviewDone ng-click=interviewForceDevice(apiUrl) ng-disabled=rowSpinner[apiUrl]><bb-row-spinner spinner=rowSpinner[apiUrl] label=\"_t('config_ui_force_interview')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> &nbsp;</td></tr></tbody></table></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"interviewDeviceId = null;handleModal('interviewModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button></div></div></div>"
  );


  $templateCache.put('app/views/device/status.html',
    "<div ng-controller=StatusController><div class=page-header><h1>{{_t('nav_status')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=statuses.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('sleeping')\">{{ _t('th_sleeping')}} <span ng-show=\"predicate == 'sleeping'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('interval')\">{{ _t('wakeup_interval')}} <span ng-show=\"predicate == 'interval'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('awake')\">{{ _t('th_awake')}} <span ng-show=\"predicate == 'awake'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('updateTime')\">{{ _t('datetime')}} <span ng-show=\"predicate == 'updateTime'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>&nbsp;</th><th class=\"mobile-show td-action\"><button class=\"btn btn-primary\" id=btn_ping_all_1 ng-click=\"pingAllDevices('btn_ping_all_1','urlToStore')\" ng-disabled=\"rowSpinner['btn_ping_all_1']\"><bb-row-spinner spinner=\"rowSpinner['btn_ping_all_1']\" label=\"_t('btn_checkall')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in statuses.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=#>{{ v.id}}</td><td data-title=\"{{ _t('device_name')}}\"><switch-type-icon generic=\"{{ v.genericType}}\" specific=\"{{ v.specificType}}\"></switch-type-icon><a href=#configuration/interview/{{v.id}}>{{ v.name}}</a></td><td data-title=\"{{ _t('th_sleeping')}}\" class=row-sleeping><span ng-bind-html=\"v.sleeping | toTrusted\"></span> &nbsp;</td><td data-title=\"{{ _t('wakeup_interval')}}\" class=row-wakeupint><span ng-if=v.interval>{{v.interval}}s</span> &nbsp;</td><td data-title=\"{{ _t('th_awake')}}\" class=row-awake><span ng-bind-html=\"v.awake | toTrusted\"></span> &nbsp;</td><td data-title=\"{{ _t('datetime')}}\"><span class=row-isfailed ng-bind-html=\"v.isFailed | toTrusted\"></span> <span class=row-time ng-bind-html=\"v.updateTime | toTrusted\"></span> &nbsp;</td><td class=row-interview><button class=\"btn btn-default\" ng-if=v.interview ng-click=\"handleModalInterview('interviewModal',$event,$index,v.id,v.name)\" title={{v.interview}}><i class=\"fa fa-search-minus fa-lg text-danger\"></i></button> &nbsp;</td><td class=\"row-ping td-action\"><button class=\"btn btn-default\" id=\"btn_ping_{{ v.rowId}}\" title=\"{{_t('pingDevice')}}\" title=\"{{ _t('pingDevice')}}\" ng-if=v.urlToStore ng-click=pingDevice(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td></tr></tbody></table></div><div ng-include=\"'app/views/device/modal_status_interview.html'\"></div></div>"
  );


  $templateCache.put('app/views/device/type.html',
    "<div ng-controller=TypeController><div class=page-header><h1>{{_t('nav_type_info')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=devices.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\"># <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\"><span ng-bind=\"_t('device_name')\"></span> <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('security')\"><span ng-bind=\"_t('th_security')\"></span> <span ng-show=\"predicate == 'security'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('mwief')\" title=\"{{ _t('th_mwief_tip')}}\" tooltip><span ng-bind=\"_t('th_mwief')\"></span> <span ng-show=\"predicate == 'mwief'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('ZWavePlusInfo')\"><span ng-bind=\"_t('th_zwaveplus')\"></span> <span ng-show=\"predicate == 'zWavePlus'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('sdk')\"><span ng-bind=\"_t('th_sdk')\"></span> <span ng-show=\"predicate == 'sdk'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('vendorName')\"><span ng-bind=\"_t('th_vendor')\"></span> <span ng-show=\"predicate == 'vendorName'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('productName')\"><span ng-bind=\"_t('th_product')\"></span> <span ng-show=\"predicate == 'productName'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('appVersion')\"><span ng-bind=\"_t('th_appversion')\"></span> <span ng-show=\"predicate == 'appVersion'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('type')\"><span ng-bind=\"_t('device_description_device_type')\"></span> <span ng-show=\"predicate == 'type'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th></tr></thead><tbody><tr ng-repeat=\"v in devices.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=# ng-bind=v.id></td><td data-title=\"{{ _t('device_name')}}\"><switch-type-icon generic=\"{{ v.genericType}}\" specific=\"{{ v.specificType}}\"></switch-type-icon><a href=#configuration/interview/{{v.id}} ng-bind=v.name></a></td><td data-title=\"{{ _t('th_security')}}\"><i class=\"{{ v.security | securityIcon }}\"></i>&nbsp;</td><td data-title=\"{{ _t('th_mwief')}}\"><i class=\"{{v.mwief| mwiefIcon}}\"></i>&nbsp;</td><td data-title=\"{{ _t('th_zwaveplus')}}\"><i class=\"{{ v.ZWavePlusInfo | zWavePlusIcon}}\"></i>&nbsp;</td><td data-title=\"{{ _t('th_sdk')}}\"><span ng-show=v.fromSdk ng-bind=v.sdk></span> <span ng-show=!v.fromSdk>(<em ng-bind=v.sdk></em>)</span></td><td data-title=\"{{ _t('th_vendor')}}\"><span ng-bind=v.vendorName></span>&nbsp;</td><td data-title=\"{{ _t('th_product')}}\"><span ng-bind=productNames[v.id]></span>&nbsp;</td><td data-title=\"{{ _t('th_appversion')}}\"><span ng-bind=v.appVersion></span>&nbsp;</td><td data-title=\"{{ _t('device_description_device_type')}}\"><span ng-bind=v.deviceType></span>&nbsp;</td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/dir-pagination.html',
    "<ul class=pagination ng-if=\"1 < pages.length\"><li ng-if=boundaryLinks ng-class=\"{ disabled : pagination.current == 1 }\"><a href=\"\" ng-click=setCurrent(1)>&laquo;</a></li><li ng-if=directionLinks ng-class=\"{ disabled : pagination.current == 1 }\" class=ng-scope><a href=\"\" ng-click=\"setCurrent(pagination.current - 1)\" class=ng-binding>‹</a></li><li ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\"><a href=\"\" ng-click=setCurrent(pageNumber)>{{ pageNumber }}</a></li><li ng-if=directionLinks ng-class=\"{ disabled : pagination.current == pagination.last }\" class=ng-scope><a href=\"\" ng-click=\"setCurrent(pagination.current + 1)\" class=ng-binding>›</a></li><li ng-if=boundaryLinks ng-class=\"{ disabled : pagination.current == pagination.last }\"><a href=\"\" ng-click=setCurrent(pagination.last)>&raquo;</a></li></ul>"
  );


  $templateCache.put('app/views/error.html',
    "<div ng-controller=ErrorController><div class=\"alert alert-danger\"><i class=\"fa {{errorCfg.icon}}\"></i> <span ng-bind=\"_t('error_' + errorCfg.code)\"></span></div></div>"
  );


  $templateCache.put('app/views/help/help.html',
    "<div ng-controller=HelpController><div class=page-header><h1>{{ _t('nav_help')}}</h1></div><h3>Interview is not complete</h3><p>Right after inclusion Z-Way determines the functions and capabilities of the new device by sending a lot of requests to the very device. The message „Interview is not complete“ indicates that Z-Way did not receive all the information requested. There are multiple reasons for this:</p><ul><li>Z-Way is just too busy and needs more time. You should wait up to 30 seconds.</li><li>The new device is battery operated and went into deep sleep mode too fast to complete the interview. Just wake up the battery-operated device following the instructions for manual wakeup in the devices manual. Usually this completes the interview.</li><li>The device has a malfunction and can’t complete the interview. This must not happen for certified Z-wave devices but may sometimes happen for uncertified test and evaluation devices.</li></ul><p>It is also possible that some wireless interference impacted the interview process. You can go to the <a href=#configuration/interview/{{nodeId}}>“Interview” page </a>and review the process of the interview by clicking the button “Show Interview Results”. All incomplete command classes offer a button to re-do the interview for this command class only. Doing this sometimes helps to finish interview. It is also possible to re-do the whole interview process by hitting the button “Force re-Interview”.</p><p><em>Note: If the reason for an incomplete interview is a failed secure command class you must re-include the device. The secure communication must be established within 10 seconds after inclusion.</em></p><h3>Device Failed</h3><p>Z-Way can’t connect to this device anymore. This means that the device is</p><ul><li>not powered: Repower it!</li><li>moved to a position outside the wireless network coverage. Move the device back within the wireless range of the network.</li><li>damaged. Remove or Replace the device using the function in the <a href=#network/control>network management tab</a>.</li></ul></div>"
  );


  $templateCache.put('app/views/home/_home.html',
    "<div ng-controller=HomeController><div class=\"form-inline form-home-ip\" ng-if=cfg.custom_ip><div class=\"form-home-ip-in product-data-list\"><input name=custom_ip id=custom_ip class=form-control ng-model=customIP.url value={{customIP.url}} placeholder=\"Server Name or IP, e.g. 192.168.1.1\"> <button type=button class=\"btn btn-primary\" id=btn_add_ip ng-click=setIP(customIP.url)>Connect</button><div class=\"text-danger custom-ip-message custom-ip-error\">Error in connecting {{cfg.server_url}}</div><div class=\"text-success custom-ip-message custom-ip-success\">Connected to {{cfg.server_url}}</div></div></div><div class=\"row home-page_\" ng-if=home.show><div class=\"col-sm-6 home-page-image\"><img class=product-logo ng-src=\"{{getCustomCfgArr('logo')}}\" alt=Logo><p></p><div class=product-description ng-bind-html=\"_t('txt_homepage_promo_' + cfg.app_type) | toTrusted\"></div><div class=\"panel panel-default\" ng-controller=SettingsController><div class=panel-heading><i class=\"fa fa-list text-info\"></i> {{_t('txt_notes')}}</div><div class=\"panel-body newlines\" ng-if=settings.input.notes>{{settings.input.notes|stripTags}}</div><div class=\"panel-footer text-right\"><button class=\"btn btn-default\" ng-click=\"handleModal('notesModal', $event)\"><i class=\"fa fa-pencil text-info\"></i> {{_t('edit')}}</button></div></div></div><div class=\"col-sm-6 product-data-list_ pull-right_\"><div class=\"panel panel-default\" ng-controller=DongleController ng-if=\"cfg.app_type !== 'installer'\"><div class=panel-heading><i class=\"fa fa-code-fork\"></i> {{_t('zwave_network')}}</div><div class=panel-body><div ng-if=\"homeDongle.data.length < 1\"><strong>{{cfg.dongle}}</strong></div><div ng-if=\"homeDongle.data.length > 0\"><select class=form-control ng-model=homeDongle.model.dongle ng-change=setHomeDongle()><option value=\"\" class=hidden-selectopt>--- Select one ---</option><option ng-repeat=\"v in homeDongle.data\" ng-selected=\"homeDongle.model.current == v\" value={{v}}>{{v}}</option></select></div></div></div><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-info-circle\"></i> {{_t('txt_network_info')}} (<em>{{countDevices}} {{_t('txt_devices_present')}})</em></div><div class=panel-body><ul class=list-report><li><strong>{{mainsDevices}}</strong> {{_t('txt_devices_mains')}}</li><li><strong>{{batteryWakeupDevices}}</strong> {{_t('txt_devices_battery')}}</li><li><strong>{{flirsDevices}}</strong> {{_t('txt_devices_flirs')}}</li></ul></div></div><div ng-if=\"cfg.app_type !== 'installer'\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-plus-square\"></i> {{_t('txt_net_health')}}</div><div class=panel-body><ul class=list-report><li ng-if=\"lowBatteryDevices.length > 0\"><p ng-repeat=\"v in lowBatteryDevices\"><a class=text-danger href=#device/battery>(#{{v.id}}) {{v.name}} {{_t('txt_low_battery')}} ({{v.battery_charge}}%)</a></p></li><li ng-if=\"cfg.app_type === 'default'\"><p ng-repeat=\"v in notInterviewDevices\"><a class=text-danger href=#help/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_interview_not')}}</a></p></li><li ng-show=\"assocRemovedDevices.length > 1\"><p ng-repeat=\"v in assocRemovedDevices\"><a class=text-danger href=#configuration/interview/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_assoc_removed')}}:</a><br><em ng-repeat=\"a in v.assoc\">{{a.name}},</em></p></li><li><p ng-repeat=\"v in failedDevices\"><a class=text-danger href=#help/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_failed')}}</a></p></li><li><p ng-repeat=\"v in notConfigDevices| unique:id\"><a class=text-danger href=#configuration/interview/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('device_changed_configuration')}}</a></p></li></ul></div></div><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-info-circle\"></i> {{_t('device_reset_locally')}}</div><div class=panel-body><ul class=list-report><li ng-repeat=\"v in localyResetDevices\">(#{{v.id}}) {{v.name}}</li><li ng-show=\"localyResetDevices.length < 1\">{{_t('no_device_reset_locally')}}</li></ul></div></div></div><div class=form-inline ng-if=\"cfg.app_type === 'installer'\"><div class=\"panel panel-default\"><div class=panel-body><div ng-if=\"boxData.controller.isRealPrimary && (!boxData.controller.hasDevices && boxData.controller.controllerState == 0)\"><p class=input-help>{{_t('device_not_included_info')}}</p><button class=\"btn btn-primary\" id=btn_learn_start ng-click=\"runZwaveCmd('controller.SetLearnMode(1)')\" onclick=refreshPage()>{{_t('include_into_network')}}</button></div><div ng-if=\"boxData.controller.isRealPrimary && (boxData.controller.hasDevices)\"><p class=input-help>{{_t('device_included_info')}}</p><button class=\"btn btn-primary\" id=btn_learn_start_2 ng-click=\"runZwaveCmd('controller.SetLearnMode(1)')\" style=\"background-color: grey\" disabled>{{_t('leave_network')}}</button></div><div ng-if=!boxData.controller.isRealPrimary><p class=input-help>{{_t('device_included_info')}}</p><button class=\"btn btn-danger\" id=btn_learn_stop ng-click=\"runZwaveCmd('controller._SetLearnMode(0)',_t('before_leaving_network'))\">{{_t('leave_network')}}</button></div><button class=\"btn btn-danger\" id=btn_learn_stop_2 ng-click=\"runZwaveCmd('controller.SetLearnMode(0)')\" ng-if=\"boxData.controller.controllerState == 9 && boxData.controller.isPrimary\" onclick=refreshPage()>{{_t('Stop inclusion')}}</button></div></div><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-download\"></i> {{_t('nm_backup_title')}}</div><div class=panel-body><a class=\"btn btn-info\" href={{cfg.server_url}}/ZWaveAPI/Backup><i class=\"fa fa-download\"></i> {{_t('nm_backup_download')}} </a><button class=\"btn btn-primary\" ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-repeat\"></i> {{_t('nm_restore_backup_upload')}}</button></div></div></div></div></div></div><div id=settingsModal class=appmodal ng-if=modalArr.settingsModal ng-controller=SettingsController><div class=appmodal-in><form name=form_settings id=form_nsettings class=form ng-model=notes.input ng-submit=\"handleModal('settingsModal', $event);storeSettings(settings.input)\" novalidate><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('settingsModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('settings')}}</h3></div><div class=appmodal-body><fieldset><div class=form-group ng-if=\"cfg.app_type === 'installer'\"><label for=network_name>{{_t('network_name')}}:</label><input name=network_name id=network_name class=form-control placeholder=\"{{_t('network_name')}}\" value={{settings.input.network_name}} ng-model=settings.input.network_name></div><div class=form-group><label>{{_t('date_format')}}:</label><select name=date_format name=date_format class=form-control ng-model=settings.input.date_format><option ng-repeat=\"v in cfg.date_format_list\" value={{v}} ng-selected=\"v === cfg.zwavecfg.date_format\">{{v}}</option></select></div><div class=form-group><label>{{_t('time_format')}}:</label><select name=time_format name=time_format class=form-control ng-model=settings.input.time_format><option ng-repeat=\"v in cfg.time_format_list\" value={{v}} ng-selected=\"v === cfg.zwavecfg.time_format\">{{v}} {{_t('hours')}}</option></select></div></fieldset></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('settingsModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=submit class=\"btn btn-submit\" title=\"{{_t('btn_save')}}\"><i class=\"fa fa-check\"></i> <span class=btn-name>{{_t('btn_save')}}</span></button></div></form></div></div><div id=notesModal class=appmodal ng-if=modalArr.notesModal ng-controller=SettingsController><div class=appmodal-in><form name=form_notes id=form_notes class=form ng-model=notes.input ng-submit=\"handleModal('notesModal', $event);storeSettings(settings.input)\" novalidate><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('notesModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('txt_notes')}}</h3></div><div class=appmodal-body><textarea id=notes name=notes class=form-control rows=20 ng-model=settings.input.notes>{{settings.input.notes}}</textarea></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('notesModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=submit class=\"btn btn-submit\" title=\"{{_t('btn_save')}}\"><i class=\"fa fa-check\"></i> <span class=btn-name>{{_t('btn_save')}}</span></button></div></form></div></div>"
  );


  $templateCache.put('app/views/home/_network_inclusion.html',
    "<div class=\"panel panel-default\" ng-controller=IncludeNetworkController><div class=panel-heading><i class=\"fa fa-sitemap\"></i> {{_t('nm_inc_into_nw')}}</div><div class=panel-body><div ng-if=\"boxData.controller.isRealPrimary && (!boxData.controller.hasDevices && boxData.controller.controllerState == 0)\"><p class=input-help>{{_t('device_not_included_info')}}</p><button class=\"btn btn-primary\" id=btn_learn_start ng-disabled=\"rowSpinner['controller.SetLearnMode(1)']\" ng-click=\"includeToNetwork('controller.SetLearnMode(1)')\"><bb-row-spinner spinner=\"rowSpinner['controller.SetLearnMode(1)']\" label=\"_t('include_into_network')\" icon=\"'fa-check'\"></bb-row-spinner></button></div><div ng-if=\"boxData.controller.isRealPrimary && (boxData.controller.hasDevices)\"><p class=input-help>{{_t('device_included_info')}}</p><button class=\"btn btn-primary\" id=btn_learn_start_2 ng-click=\"runZwaveCmd('controller.SetLearnMode(1)')\" style=\"background-color: grey\" disabled>{{_t('leave')}} {{boxData.controller.homeName}}</button></div><div ng-if=!boxData.controller.isRealPrimary><p class=input-help>{{_t('device_included_info')}}</p><button class=\"btn btn-danger\" id=btn_learn_stop ng-disabled=\"rowSpinner['controller.SetLearnMode(1)']\" ng-click=\"excludeFromNetwork('controller.SetLearnMode(1)',_t('before_leaving_network'))\"><bb-row-spinner spinner=\"rowSpinner['controller.SetLearnMode(1)']\" label=\"_t('leave') + ' ' + boxData.controller.homeName\" icon=\"'fa-check'\"></bb-row-spinner></button></div></div></div>"
  );


  $templateCache.put('app/views/home/_notes.html',
    "<div class=\"panel panel-default\" ng-controller=NoteController><div class=panel-heading><i class=\"fa fa-list text-info\"></i> {{_t('txt_notes')}}</div><div class=\"panel-body newlines\" ng-if=note.input.notes>{{note.input.notes|stripTags}}</div><div class=\"panel-footer text-right\"><button class=\"btn btn-default\" ng-click=\"handleModal('notesModal', $event)\"><i class=\"fa fa-pencil text-info\"></i> {{_t('edit')}}</button></div></div>"
  );


  $templateCache.put('app/views/home/backup_restore.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-download\"></i> {{_t('nm_backup_title')}}</div><div class=panel-body><a class=\"btn btn-info\" href={{cfg.server_url}}/ZWaveAPI/Backup><i class=\"fa fa-download\"></i> {{_t('nm_backup_download')}} </a>&nbsp; <button class=\"btn btn-info\" ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-repeat\"></i> {{_t('nm_restore_backup_upload')}}</button></div></div>"
  );


  $templateCache.put('app/views/home/device_reset.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-info-circle\"></i> {{_t('device_reset_locally')}}</div><div class=panel-body><ul class=list-report><li ng-repeat=\"v in localyResetDevices\">(#{{v.id}}) {{v.name}}</li><li ng-show=\"localyResetDevices.length < 1\">{{_t('no_device_reset_locally')}}</li></ul></div></div>"
  );


  $templateCache.put('app/views/home/dongle.html',
    "<div class=\"panel panel-default\" ng-controller=DongleController ng-if=\"cfg.app_type !== 'installer'\"><div class=panel-heading><i class=\"fa fa-code-fork\"></i> {{_t('zwave_network')}}</div><div class=panel-body><div ng-if=\"homeDongle.data.length < 1\"><strong>{{cfg.dongle}}</strong></div><div ng-if=\"homeDongle.data.length > 0\"><select class=form-control ng-model=homeDongle.model.dongle ng-change=setHomeDongle()><option value=\"\" class=hidden-selectopt>--- Select one ---</option><option ng-repeat=\"v in homeDongle.data\" ng-selected=\"homeDongle.model.current == v\" value={{v}}>{{v}}</option></select></div></div></div>"
  );


  $templateCache.put('app/views/home/home_default.html',
    "<div ng-controller=HomeController><div ng-include=\"'app/views/home/ip.html'\"></div><div class=\"row home-page_\" ng-if=home.show><div class=\"col-sm-6 home-page-image\"><div ng-include=\"'app/views/home/promo_default.html'\"></div><div ng-include=\"'app/views/home/notes.html'\"></div></div><div class=\"col-sm-6 product-data-list_ pull-right_\"><div ng-include=\"'app/views/home/dongle.html'\"></div><div ng-include=\"'app/views/home/network_informations.html'\"></div><div ng-include=\"'app/views/home/network_health.html'\"></div><div ng-include=\"'app/views/home/device_reset.html'\"></div></div></div></div>"
  );


  $templateCache.put('app/views/home/home_installer.html',
    "<div ng-controller=HomeController><div ng-include=\"'app/views/home/ip.html'\"></div><div class=\"row home-page_\" ng-if=home.show><div class=\"col-sm-6 home-page-image\"><div ng-include=\"'app/views/home/promo_installer.html'\"></div><div ng-include=\"'app/views/home/network_name.html'\"></div><div ng-include=\"'app/views/home/notes.html'\"></div></div><div class=\"col-sm-6 product-data-list_ pull-right_\"><div ng-include=\"'app/views/home/network_informations.html'\"></div><div ng-include=\"'app/views/network/control/control_different.html'\" ng-controller=ControlController></div><div ng-include=\"'app/views/network/control/control_restore.html'\"></div></div></div></div>"
  );


  $templateCache.put('app/views/home/ip.html',
    "<div class=\"form-inline form-home-ip\" ng-if=cfg.custom_ip><div class=\"form-home-ip-in product-data-list\"><input name=custom_ip id=custom_ip class=form-control ng-model=customIP.url value={{customIP.url}} placeholder=\"Server Name or IP, e.g. 192.168.1.1\"> <button type=button class=\"btn btn-primary\" id=btn_add_ip ng-click=setIP(customIP.url)>Connect</button><div class=\"text-danger custom-ip-message custom-ip-error\">Error in connecting {{cfg.server_url}}</div><div class=\"text-success custom-ip-message custom-ip-success\">Connected to {{cfg.server_url}}</div></div></div>"
  );


  $templateCache.put('app/views/home/modal_restore.html',
    "<div id=restoreModal class=appmodal ng-if=modalArr.restoreModal ng-controller=RestoreController><div class=appmodal-in><form name=form_notes id=form_modal class=form ng-model=notes.input ng-submit=\"handleModal('restoreModal', $event);storeSettings(settings.input)\" novalidate><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nm_restore_backup_upload')}}</h3></div><div class=appmodal-body><bb-loader></bb-loader><div class=restore-backup-control ng-if_=\"restoreBackupStatus == 0\"><div class=\"alert alert-warning\"><input type=checkbox name=restore_confirm value=1 id=restore_confirm ng-click=\"restore.allow = !restore.allow\"> <span ng-bind-html=\"_t('are_you_sure_restore') | toTrusted\"></span></div><div ng-if=restore.allow><p><input type=checkbox name=restore_chip_info id=restore_chip_info value=1 ng-true-value=1 ng-false-value=0 ng-model=restore.input.restore_chip_info> {{_t('restore_backup_chip')}}</p><p class=text-center><input id=btn_upload type=file name=file onchange=angular.element(this).scope().restoreFromBackup(this.files)></p></div></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button></div></form></div></div>"
  );


  $templateCache.put('app/views/home/network_health.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-plus-square\"></i> {{_t('txt_net_health')}}</div><div class=panel-body><ul class=list-report><li ng-if=\"lowBatteryDevices.length > 0\"><p ng-repeat=\"v in lowBatteryDevices\"><a class=text-danger href=#device/battery>(#{{v.id}}) {{v.name}} {{_t('txt_low_battery')}} ({{v.battery_charge}}%)</a></p></li><li ng-if=\"cfg.app_type === 'default'\"><p ng-repeat=\"v in notInterviewDevices\"><a class=text-danger href=#help/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_interview_not')}}</a></p></li><li ng-show=\"assocRemovedDevices.length > 1\"><p ng-repeat=\"v in assocRemovedDevices\"><a class=text-danger href=#configuration/interview/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_assoc_removed')}}:</a><br><em ng-repeat=\"a in v.assoc\">{{a.name}},</em></p></li><li><p ng-repeat=\"v in failedDevices\"><a class=text-danger href=#help/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('txt_failed')}}</a></p></li><li><p ng-repeat=\"v in notConfigDevices| unique:id\"><a class=text-danger href=#configuration/interview/{{v.id}}>(#{{v.id}}) {{v.name}} {{_t('device_changed_configuration')}}</a></p></li></ul></div></div>"
  );


  $templateCache.put('app/views/home/network_informations.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-info-circle\"></i> {{_t('txt_network_info')}} (<em>{{countDevices}} {{_t('txt_devices_present')}})</em></div><div class=panel-body><ul class=list-report><li><strong>{{mainsDevices}}</strong> {{_t('txt_devices_mains')}}</li><li><strong>{{batteryWakeupDevices}}</strong> {{_t('txt_devices_battery')}}</li><li><strong>{{flirsDevices}}</strong> {{_t('txt_devices_flirs')}}</li></ul></div></div>"
  );


  $templateCache.put('app/views/home/network_name.html',
    "<div class=\"panel panel-default\" ng-controller=DataHolderController><div class=panel-heading><i class=\"fa fa-code-fork\"></i> {{_t('network_name')}}</div><div class=panel-body ng-hide=goNetworkName>{{dataHolder.controller.homeName}} <button type=button class=\"btn btn-default\" ng-class=\"goNetworkName ? 'active' : ''\" ng-click=\"goNetworkName = !goNetworkName\"><i class=\"fa fa-pencil\"></i></button></div><form name=form_network_name id=form_network_name class=\"form form-inline\" ng-show=goNetworkName ng-submit=\"storeNetworkName(dataHolder.controller.homeName,'spinNetworkName');goNetworkName = !goNetworkName\" novalidate><div class=panel-body><input name=network_name class=form-control placeholder=\"{{_t('network_name')}}\" ng-model=dataHolder.controller.homeName value={{dataHolder.controller.homeName}}></div><div class=\"panel-footer text-right\"><button type=button class=\"btn btn-default\" title=\"{{_t('btn_cancel')}}\" ng-click=\"goNetworkName = !goNetworkName\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button class=\"btn btn-primary\" title=\"{{_t('btn_save')}}\" ng-disabled=\"rowSpinner['spinNetworkName']\"><bb-row-spinner spinner=\"rowSpinner['spinNetworkName']\" label=\" _t('btn_save')\" icon=\"'fa-check'\"></bb-row-spinner></button></div></form></div>"
  );


  $templateCache.put('app/views/home/notes.html',
    "<div class=\"panel panel-default\" ng-controller=DataHolderController><div class=panel-heading><i class=\"fa fa-list text-info\"></i> {{_t('txt_notes')}}</div><div class=\"panel-body newlines\" ng-hide=goNotes><span ng-if=dataHolder.controller.homeNotes>{{dataHolder.controller.homeNotes|stripTags}} </span><button type=button class=\"btn btn-default\" ng-class=\"goNotes ? 'active' : ''\" ng-click=\"goNotes = !goNotes\"><i class=\"fa fa-pencil\"></i></button></div><form name=form_notes id=form_notes class=form ng-show=goNotes ng-submit=\"storeNotes(dataHolder.controller.homeNotes,'spinNotes');goNotes = !goNotes\" novalidate><div class=panel-body><textarea id=notes class=form-control rows=10 ng-model=dataHolder.controller.homeNotes>{{dataHolder.controller.homeNotes}}\r" +
    "\n" +
    "            </textarea></div><div class=\"panel-footer text-right\"><button type=button class=\"btn btn-default\" title=\"{{_t('btn_cancel')}}\" ng-click=\"goNotes = !goNotes\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button class=\"btn btn-primary\" title=\"{{_t('btn_save')}}\" ng-disabled=\"rowSpinner['spinNotes']\"><bb-row-spinner spinner=\"rowSpinner['spinNotes']\" label=\" _t('btn_save')\" icon=\"'fa-check'\"></bb-row-spinner></button></div></form></div>"
  );


  $templateCache.put('app/views/home/promo_default.html',
    "<img class=product-logo ng-src=\"{{getCustomCfgArr('logo')}}\" alt=Logo><p></p><div class=product-description ng-bind-html=\"_t('txt_homepage_promo_default') | toTrusted\"></div>"
  );


  $templateCache.put('app/views/home/promo_installer.html',
    "<img class=product-logo ng-src=\"{{getCustomCfgArr('logo')}}\" alt=Logo><p></p><div class=product-description ng-bind-html=\"_t('txt_homepage_promo_installer') | toTrusted\"></div>"
  );


  $templateCache.put('app/views/installer/history.html',
    "<div ng-controller=ZnifferHistoryController><div class=page-header><h1>{{ _t('nav_history')}}</h1></div><table class=\"table table-condensed table-hover\"><thead><tr><th>&nbsp;</th><th>{{ _t('date')}}</th><th>{{ _t('time')}}</th><th><div class=input-group><i class=\"fa fa-filter clickable\" ng-class=\"zniffer.filter.model['src'].value !== '' ? 'text-success' : ''\" ng-click=\"expandFilter('znifferFilterSrc', $event)\"></i> {{ _t('src')}}<div class=\"app-dropdown app-dropdown-left\" ng-if=filterExpanded.znifferFilterSrc><div class=app-dropdown-content><div class=form-group><input class=form-control id=filter_src placeholder=\"{{_t('enter_value')}}. {{_t('use_charcter_delimit')}}\" ng-model=zniffer.filter.model.src.value></div><div class=\"form-group form-inline\"><input class=form-control_ type=radio name=src_show value=1 ng-model=zniffer.filter.model.src.show ng-checked=\"zniffer.filter.model.src.show == '1'\"> {{_t('show')}} <input class=form-control_ type=radio name=src_show value=0 ng-model=zniffer.filter.model.src.show ng-checked=\"zniffer.filter.model.src.show == '0'\"> {{_t('hide')}}</div></div><div class=appdropdown-footer ng-click=resetZnifferFilter()><button class=\"btn btn-default\" type=button ng-click=\"expandFilter('znifferFilterSrc', $event);resetZnifferFilter('src')\"><i class=\"fa fa-times text-danger\"></i> {{_t('reset_filter')}}</button> <button class=\"btn btn-success\" type=button ng-click=\"expandFilter('znifferFilterSrc', $event);setZnifferFilter('src')\"><i class=\"fa fa-check\"></i> {{_t('th_ok')}}</button></div></div></div></th><th><div class=input-group><i class=\"fa fa-filter clickable\" ng-class=\"zniffer.filter.model['dest'].value !== '' ? 'text-success' : ''\" ng-click=\"expandFilter('znifferFilterDest', $event)\"></i> {{ _t('dest')}}<div class=\"app-dropdown app-dropdown-left\" ng-if=filterExpanded.znifferFilterDest><div class=app-dropdown-content><div class=form-group><input class=form-control id=filter_dest placeholder=\"{{_t('enter_value')}}. {{_t('use_charcter_delimit')}}\" ng-model=zniffer.filter.model.dest.value></div><div class=\"form-group form-inline\"><input class=form-control_ type=radio name=dest_show value=1 ng-model=zniffer.filter.model.dest.show ng-checked=\"zniffer.filter.model.dest.show == '1'\"> {{_t('show')}} <input class=form-control_ type=radio name=dest_show value=0 ng-model=zniffer.filter.model.dest.show ng-checked=\"zniffer.filter.model.dest.show == '0'\"> {{_t('hide')}}</div></div><div class=appdropdown-footer ng-click=resetZnifferFilter()><button class=\"btn btn-default\" type=button ng-click=\"expandFilter('znifferFilterDest', $event);resetZnifferFilter('dest')\"><i class=\"fa fa-times text-danger\"></i> {{_t('reset_filter')}}</button> <button class=\"btn btn-success\" type=button ng-click=\"expandFilter('znifferFilterDest', $event);setZnifferFilter('dest')\"><i class=\"fa fa-check\"></i> {{_t('th_ok')}}</button></div></div></div></th><th>{{ _t('speed')}}</th><th>{{ _t('rssi')}}</th><th>{{ _t('hops')}}</th><th>{{ _t('encapsulation')}}</th><th>{{ _t('application')}}</th><th class=text-right><button class=\"btn btn-default\" type=button ng-show=!_.isEmpty(zniffer.filter.used) ng-click=resetZnifferFilterAll()><i class=\"fa fa-times text-danger\"></i> {{_t('reset_all_filters')}}</button></th></tr></thead><tbody><tr class=zniffer-row-{{v.data}} dir-paginate=\"v in zniffer.all| orderBy: '-id' | itemsPerPage: pageSize\" current-page=currentPage id=row_{{v.id}}><td><i title={{v.type}} class=\"fa fa-long-arrow-right\" ng-if=\"v.type === 'incoming'\"></i> <i title={{v.type}} class=\"fa fa-long-arrow-left\" ng-if=\"v.type === 'outgoing'\"></i></td><td>{{v.dateTime.date}}</td><td>{{v.dateTime.time}}</td><td ng-class=\"zniffer.filter.model['src'].value !== '' ? 'bcg-success' : ''\">{{v.src}}</td><td ng-class=\"zniffer.filter.model['dest'].value !== '' ? 'bcg-success' : ''\">{{v.dest}}</td><td>{{v.speed||'-'}}</td><td>{{v.rssi||'-'}}</td><td>{{v.hops||'-'}}</td><td>{{v.encaps||'-'}}</td><td title={{v.bytes}}>{{v.application}} ({{v.bytes|cutText:tue:20}})</td><td>&nbsp;</td></tr></tbody></table><div class=\"text-center mobile-padding\" ng-if_=\"collection.length > 0\"><dir-pagination-controls boundary-links=true></dir-pagination-controls></div></div>"
  );


  $templateCache.put('app/views/installer/rssi_background.html',
    "<div ng-controller=ZnifferRSSIController><div id=chart1 style=\"height: 400px; width: 100%\"></div><div id=chart2 style=\"height: 400px; width: 100%\"></div></div>"
  );


  $templateCache.put('app/views/installer/rssi_chart.html',
    ""
  );


  $templateCache.put('app/views/installer/zniffer.html',
    "<div ng-controller=ZnifferController><div class=page-header><h1>{{ _t('nav_zniffer')}}</h1></div><div class=form-inline><div class=form-group><div class=btn-group><button class=\"btn btn-default\" title=\"Start new trace\" ng-class=\"zniffer.trace === 'start' ? 'btn-success' : ''\" ng-disabled=\"zniffer.trace === 'start'\" ng-click=\"setTrace('start')\"><i class=\"fa fa-play\"></i></button> <button class=\"btn btn-default\" title=\"Pause trace\" ng-class=\"zniffer.trace === 'pause' ? 'btn-warning' : ''\" ng-disabled=\"zniffer.trace === 'pause'\" ng-click=\"setTrace('pause')\"><i class=\"fa fa-pause\"></i></button> <button class=\"btn btn-default\" title=\"Stop trace\" ng-class=\"zniffer.trace === 'stop' ? 'btn-danger' : ''\" ng-disabled=\"zniffer.trace === 'stop'\" ng-click=\"setTrace('stop')\"><i class=\"fa fa-stop\"></i></button></div></div></div><table class=\"table table-condensed table-hover\"><thead><tr><th>&nbsp;</th><th>{{ _t('date')}}</th><th>{{ _t('time')}}</th><th>{{ _t('src')}}</th><th>{{ _t('dest')}}</th><th>{{ _t('speed')}}</th><th>{{ _t('rssi')}}</th><th>{{ _t('hops')}}</th><th>{{ _t('encapsulation')}}</th><th>{{ _t('application')}}</th></tr></thead><tbody><tr class=zniffer-row-{{v.data}} ng-repeat=\"v in zniffer.all| orderBy: '-id' track by $index\"><td><i title={{v.type}} class=\"fa fa-long-arrow-right\" ng-if=\"v.type === 'incoming'\"></i> <i title={{v.type}} class=\"fa fa-long-arrow-left\" ng-if=\"v.type === 'outgoing'\"></i></td><td>{{v.dateTime.date}}</td><td>{{v.dateTime.time}}</td><td>{{v.src}}</td><td>{{v.dest}}</td><td>{{v.speed||'-'}}</td><td>{{v.rssi||'-'}}</td><td>{{v.hops||'-'}}</td><td>{{v.encaps||'-'}}</td><td title={{v.bytes}}>{{v.application}} ({{v.bytes|cutText:tue:20}})</td></tr></tbody></table></div>"
  );


  $templateCache.put('app/views/installer/zniffer_table.html',
    "<table class=\"table table-condensed table-hover\"><thead><tr><th>&nbsp;</th><th>{{ _t('date')}}</th><th>{{ _t('time')}}</th><th><div class=input-group><span class=clickable ng-class=\"zniffer.filter.model['src'].value !== '' ? 'text-success' : ''\" ng-click=\"expandFilter('znifferFilterSrc', $event)\"><i class=\"fa fa-filter\"></i> {{ _t('src')}}</span><div class=\"app-dropdown app-dropdown-left\" ng-if=filterExpanded.znifferFilterSrc><div class=app-dropdown-content><div class=form-group><input class=form-control id=filter_src placeholder=\"{{_t('enter_value')}}. {{_t('use_charcter_delimit')}}\" ng-model=zniffer.filter.model.src.value></div><div class=\"form-group form-inline\"><input class=form-control_ type=radio name=src_show value=1 ng-model=zniffer.filter.model.src.show ng-checked=\"zniffer.filter.model.src.show == '1'\"> {{_t('show')}} <input class=form-control_ type=radio name=src_show value=0 ng-model=zniffer.filter.model.src.show ng-checked=\"zniffer.filter.model.src.show == '0'\"> {{_t('hide')}}</div></div><div class=appdropdown-footer ng-click=resetZnifferFilter()><button class=\"btn btn-default\" type=button ng-click=\"expandFilter('znifferFilterSrc', $event);resetZnifferFilter('src')\"><i class=\"fa fa-times text-danger\"></i> {{_t('reset_filter')}}</button> <button class=\"btn btn-success\" type=button ng-click=\"expandFilter('znifferFilterSrc', $event);setZnifferFilter('src')\"><i class=\"fa fa-check\"></i> {{_t('th_ok')}}</button></div></div></div></th><th><div class=input-group><span class=clickable ng-class=\"zniffer.filter.model['dest'].value !== '' ? 'text-success' : ''\" ng-click=\"expandFilter('znifferFilterDest', $event)\"><i class=\"fa fa-filter\"></i> {{ _t('dest')}}</span><div class=\"app-dropdown app-dropdown-left\" ng-if=filterExpanded.znifferFilterDest><div class=app-dropdown-content><div class=form-group><input class=form-control id=filter_dest placeholder=\"{{_t('enter_value')}}. {{_t('use_charcter_delimit')}}\" ng-model=zniffer.filter.model.dest.value></div><div class=\"form-group form-inline\"><input class=form-control_ type=radio name=dest_show value=1 ng-model=zniffer.filter.model.dest.show ng-checked=\"zniffer.filter.model.dest.show == '1'\"> {{_t('show')}} <input class=form-control_ type=radio name=dest_show value=0 ng-model=zniffer.filter.model.dest.show ng-checked=\"zniffer.filter.model.dest.show == '0'\"> {{_t('hide')}}</div></div><div class=appdropdown-footer ng-click=resetZnifferFilter()><button class=\"btn btn-default\" type=button ng-click=\"expandFilter('znifferFilterDest', $event);resetZnifferFilter('dest')\"><i class=\"fa fa-times text-danger\"></i> {{_t('reset_filter')}}</button> <button class=\"btn btn-success\" type=button ng-click=\"expandFilter('znifferFilterDest', $event);setZnifferFilter('dest')\"><i class=\"fa fa-check\"></i> {{_t('th_ok')}}</button></div></div></div></th><th><div class=input-group><span class=clickable ng-class=\"zniffer.filter.model['data'].value !== '' ? 'text-success' : ''\" ng-click=\"expandFilter('znifferFilterData', $event)\"><i class=\"fa fa-filter\"></i> {{ _t('data')}}</span><div class=\"app-dropdown app-dropdown\" ng-if=filterExpanded.znifferFilterData><div class=app-dropdown-content><div class=form-group><select class=form-control ng-model=zniffer.filter.model.data.value><option value={{v}} ng-repeat=\"v in zniffer.filter.items.data\">{{v}}</option></select></div><div class=\"form-group form-inline\"><input class=form-control_ type=radio name=data_show value=1 ng-model=zniffer.filter.model.data.show ng-checked=\"zniffer.filter.model.data.show == '1'\"> {{_t('show')}} <input class=form-control_ type=radio name=data_show value=0 ng-model=zniffer.filter.model.data.show ng-checked=\"zniffer.filter.model.data.show == '0'\"> {{_t('hide')}}</div></div><div class=appdropdown-footer ng-click=resetZnifferFilter()><button class=\"btn btn-default\" type=button ng-click=\"expandFilter('znifferFilterData', $event);resetZnifferFilter('data')\"><i class=\"fa fa-times text-danger\"></i> {{_t('reset_filter')}}</button> <button class=\"btn btn-success\" type=button ng-click=\"expandFilter('znifferFilterData', $event);setZnifferFilter('data')\"><i class=\"fa fa-check\"></i> {{_t('th_ok')}}</button></div></div></div></th><th>{{ _t('application')}}</th><th class=text-right><button class=\"btn btn-default\" type=button ng-show=!_.isEmpty(zniffer.filter.used) ng-click=resetZnifferFilterAll()><i class=\"fa fa-times text-danger\"></i> {{_t('reset_all_filters')}}</button></th></tr></thead><tbody><tr class=zniffer-row-{{v.data}} ng-repeat=\"v in zniffer.all| orderBy: '-id' track by $index\"><td><i title={{v.type}} class=\"fa fa-long-arrow-right\" ng-if=\"v.type === 'incoming'\"></i> <i title={{v.type}} class=\"fa fa-long-arrow-left\" ng-if=\"v.type === 'outgoing'\"></i></td><td>{{v.dateTime.date}}</td><td>{{v.dateTime.time}}</td><td ng-class=\"zniffer.filter.model['src'].value !== '' ? 'bcg-success' : ''\">{{v.src}}</td><td ng-class=\"zniffer.filter.model['dest'].value !== '' ? 'bcg-success' : ''\">{{v.dest}}</td><td ng-class=\"zniffer.filter.model['data'].value !== '' ? 'bcg-success' : ''\">{{v.data}}</td><td>{{v.application}}</td><td>{{v.bytes}}</td></tr></tbody></table>"
  );


  $templateCache.put('app/views/network/control/control_controller_maintance.html',
    "<div class=\"panel panel-default\" ng-controller=ZwaveChipRebootResetController><div class=panel-heading><i class=\"fa fa-gear\"></i> {{_t('nm_ctrl_maintance')}}</div><div class=panel-body><div class=\"cfg-block form-inline\"><p class=input-help>{{_t('nm_chip_reboot_war')}}</p><button class=\"btn btn-primary\" id=btn_chip_reboot ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"serialAPISoftReset('SerialAPISoftReset()')\" ng-disabled=\"rowSpinner['SerialAPISoftReset()']\"><bb-row-spinner spinner=\"rowSpinner['SerialAPISoftReset()']\" label=\"_t('nm_soft_reset_controller')\" icon=\"'fa-refresh'\"></bb-row-spinner></button></div><div class=\"cfg-block form-inline\"><p class=input-help ng-hide=\"cfg.app_type === 'installer'\">{{_t('nm_chip_reset_war')}}</p><p class=input-help ng-if=\"cfg.app_type === 'installer'\">{{_t('nm_chip_reset_war_ima')}}</p><button class=\"btn btn-danger\" ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"handleModal('rebootResetModal', $event)\"><i class=\"fa fa-exclamation-triangle\"></i> {{_t('nm_reset_controller')}}</button></div></div></div><div id=rebootResetModal class=appmodal ng-if=modalArr.rebootResetModal ng-controller=ZwaveChipRebootResetController><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('rebootResetModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nm_reset_controller')}}</h3></div><div class=appmodal-body><div class=\"alert alert-warning\"><p>{{_t('nm_controller_reset_war')}}</p><p></p><p><input type=checkbox name=reset_confirm id=reset_confirm value=1 ng-click=\"goSetDefault = !goSetDefault\"> {{_t('yes')}}</p><p></p></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('rebootResetModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=button class=\"btn btn-danger\" id=btn_reset_controller ng-show=goSetDefault ng-click=\"setDefault('controller.SetDefault()');handleModal('rebootResetModal', $event)\" ng-disabled=\"rowSpinner['controller.SetDefault()']\"><bb-row-spinner spinner=\"rowSpinner['controller.SetDefault()']\" label=\"_t('nm_reset_controller')\" icon=\"'fa-exclamation-triangle'\"></bb-row-spinner></button></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_default.html',
    "<div ng-controller=ControlController><div class=page-header><h1>{{_t('nav_control')}}</h1></div><div class=row id=row_controll><div class=\"col-md-6 col-lg-6\"><div ng-include=\"'app/views/network/control/control_management.html'\"></div><div ng-include=\"'app/views/network/control/control_different.html'\"></div><div ng-include=\"'app/views/network/control/control_restore.html'\"></div><div ng-include=\"'app/views/network/control/control_controller_maintance.html'\"></div><div ng-include=\"'app/views/network/control/control_frequency.html'\"></div></div><div class=\"col-md-6 col-lg-6\"><div ng-include=\"'app/views/network/control/control_network_maintance.html'\"></div><div ng-include=\"'app/views/network/control/control_sucsic.html'\"></div></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_different.html',
    "<div class=\"panel panel-default\" ng-controller=IncludeDifferentNetworkController><div class=panel-heading><i class=\"fa fa-sitemap\"></i> {{_t('nm_inc_into_nw')}}</div><div class=panel-body><div ng-if=\"controlDh.controller.isRealPrimary && (!controlDh.controller.hasDevices)\"><p class=input-help>{{_t('device_not_included_info')}}</p><bb-alert alert=controlDh.network.alert></bb-alert><button class=\"btn btn-primary\" id=btn_learn_start ng-disabled=\"rowSpinner['controller.SetLearnMode(1)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-show=\"[9].indexOf(controlDh.controller.controllerState) == -1\" ng-click=\"includeToNetwork('controller.SetLearnMode(1)','successNetworkIncludeModal',$event)\"><i class=\"fa fa-play-circle\"></i> {{_t('include_into_network')}}</button> <button class=\"btn btn-danger\" id=btn_learn_stop ng-show=\"[9].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"includeToNetwork('controller.SetLearnMode(0)')\"><i class=\"fa fa-stop-circle\"></i> {{_t('include_into_network_stop')}}</button></div><div ng-if=\"controlDh.controller.isRealPrimary && (controlDh.controller.hasDevices)\"><p class=input-help>{{_t('device_included_info')}}</p><button class=\"btn btn-primary\" id=btn_learn_start_2 disabled>{{_t('leave_network')}} {{controlDh.controller.homeName}}</button></div><div ng-if=!controlDh.controller.isRealPrimary><p class=input-help>{{_t('device_included_info')}}</p><div ng-hide=\"[0].indexOf(controlDh.controller.controllerState) > -1\"><bb-alert alert=controlDh.network.alert></bb-alert></div><button class=\"btn btn-info\" id=btn_learn_stop ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-hide=\"[9].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"excludeFromNetwork('controller.SetLearnMode(1)',_t('before_leaving_network'))\"><i class=\"fa fa-play-circle\"></i> {{_t('leave_network') + ' ' + controlDh.controller.homeName}}</button> <button class=\"btn btn-danger\" id=btn_learn_stop ng-show=\"[9].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"includeToNetwork('controller.SetLearnMode(0)')\"><i class=\"fa fa-stop-circle\"></i> {{_t('leave_network_stop') + ' ' + controlDh.controller.homeName}}</button></div></div><div id=successNetworkIncludeModal class=appmodal ng-if=\"controlDh.network.modal && !controlDh.controller.isRealPrimary\"><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"closeNetworkModal('successNetworkIncludeModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('include_into_network')}}</h3></div><div class=appmodal-body><div class=\"alert alert-success\"><i class=\"fa fa-smile-o\"></i> {{_t('success_controller_include')}}</div><div class=cfg-block><button class=\"btn btn-primary\" ng-click=\"handleModal('restoreModal', $event);handleModal('successNetworkIncludeModal', $event)\"><i class=\"fa fa-repeat\"></i> {{_t('make_restore')}}</button></div><div class=cfg-block ng-controller=RequestNifAllController><button class=\"btn btn-primary\" id=btn_request_nif ng-click=\"requestNifAll('requestNifAll');handleModal('successNetworkIncludeModal', $event)\" ng-disabled=\"rowSpinner['requestNifAll']\"><bb-row-spinner spinner=\"rowSpinner['requestNifAll']\" label=\"_t('detect_all_nodes')\" icon=\"'fa-search-plus'\"></bb-row-spinner></button></div><div class=cfg-block><button type=button class=\"btn btn-default\" ng-click=\"closeNetworkModal('successNetworkIncludeModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('just_proceed')}}</span></button></div></div></div></div></div><div ng-include=\"'app/views/network/control/control_restore_modal.html'\"></div>"
  );


  $templateCache.put('app/views/network/control/control_frequency.html',
    "<div class=\"panel panel-default\" ng-if=controlDh.controller.frequency><div class=panel-heading><i class=\"fa fa-map-marker\"></i> {{_t('nm_frequency_title')}}</div><div class=panel-body ng-controller=ChangeFrequencyController><div>{{_t('current_frequency')}}: <strong>{{controlDh.controller.frequency}}</strong></div><div class=text-alert-list><i class=\"fa fa-info-circle text-info\"></i> {{_t('frequency_info')}}</div><div class=\"cfg-block form-inline block-frequency\"><button class=btn id=btn_nm_freq_change_eu ng-class=\"controlDh.controller.frequency === cfg.frequency[0] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(0)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(0)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(0)']\"></bb-row-spinner>EU</button> <button class=btn id=btn_nm_freq_change_ru ng-class=\"controlDh.controller.frequency === cfg.frequency[1] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(1)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(1)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(1)']\"></bb-row-spinner>RU</button> <button class=btn id=btn_nm_freq_change_in ng-class=\"controlDh.controller.frequency === cfg.frequency[2] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(2)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(2)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(2)']\"></bb-row-spinner>IN</button> <button class=btn id=btn_nm_freq_change_cn ng-class=\"controlDh.controller.frequency === cfg.frequency[6] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(6)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(6)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(6)']\"></bb-row-spinner>CN</button> <button class=btn id=btn_nm_freq_change_my ng-class=\"controlDh.controller.frequency === cfg.frequency[10] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(10)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(10)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(10)']\"></bb-row-spinner>MY</button></div><div class=\"cfg-block form-inline\"><button class=btn id=btn_nm_freq_change_anz ng-class=\"controlDh.controller.frequency === cfg.frequency[4] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(4)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(4)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(4)']\"></bb-row-spinner>ANZ/BR</button> <button class=btn id=btn_nm_freq_change_hk ng-class=\"controlDh.controller.frequency === cfg.frequency[5] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(5)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(5)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(5)']\"></bb-row-spinner>HK</button> <button class=btn id=btn_nm_freq_change_kr ng-class=\"controlDh.controller.frequency === cfg.frequency[8] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(8)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(8)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(8)']\"></bb-row-spinner>KR</button> <button class=btn id=btn_nm_freq_change_jp ng-class=\"controlDh.controller.frequency === cfg.frequency[7] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(7)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(7)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(7)']\"></bb-row-spinner>JP</button></div><div class=\"cfg-block form-inline\"><button class=btn id=btn_nm_freq_change_us ng-class=\"controlDh.controller.frequency === cfg.frequency[3] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(3)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(3)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(3)']\"></bb-row-spinner>US</button> <button class=btn id=btn_nm_freq_change_il ng-class=\"controlDh.controller.frequency === cfg.frequency[9] ? 'btn-default' : 'btn-primary'\" ng-disabled=\"rowSpinner['ZMEFreqChange(9)'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"zmeFreqChange('ZMEFreqChange(9)')\"><bb-row-spinner spinner=\"rowSpinner['ZMEFreqChange(9)']\"></bb-row-spinner>IL</button></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_installer.html',
    "<div ng-controller=ControlController><div class=page-header><h1>{{_t('nav_control')}}</h1></div><div class=row id=row_controll><div class=\"col-md-6 col-lg-6\"><div ng-include=\"'app/views/network/control/control_management.html'\"></div><div ng-include=\"'app/views/network/control/control_different.html'\"></div><div ng-include=\"'app/views/network/control/control_controller_maintance.html'\"></div></div><div class=\"col-md-6 col-lg-6\"><div ng-include=\"'app/views/network/control/control_link_controller.html'\"></div><div ng-include=\"'app/views/network/control/control_network_maintance.html'\"></div><div ng-include=\"'app/views/network/control/control_sucsic.html'\"></div></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_link_controller.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><a href=#network/controller><i class=\"fa fa-info-circle\"></i> {{_t('nav_controller_info')}}</a></div></div>"
  );


  $templateCache.put('app/views/network/control/control_management.html',
    "<div class=\"panel panel-default panel-highlighted\"><div class=panel-heading><i class=\"fa fa-cubes\"></i> {{_t('nm_device_management')}}</div><div class=panel-body><div class=cfg-block ng-controller=SetSecureInclusionController>{{_t('nm_force_unsecure')}}<div class=btn-group><button type=button class=\"btn btn-primary\" id=btn_force_secure_lock ng-class=\"controlDh.controller.secureInclusion ? 'active' : ''\" ng-click=\"setSecureInclusion('controller.data.secureInclusion=true')\" ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1 || rowSpinner['controller.data.secureInclusion=true']\"><bb-row-spinner spinner=\"rowSpinner['controller.data.secureInclusion=true']\" label=\"_t('btn_secure')\" icon=\"'fa-lock'\"></bb-row-spinner></button> <button type=button class=\"btn btn-primary\" id=btn_force_unsecure_lock ng-class=\"!controlDh.controller.secureInclusion ? 'active' : ''\" ng-click=\"setSecureInclusion('controller.data.secureInclusion=false')\" ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1 || rowSpinner['controller.data.secureInclusion=false']\"><bb-row-spinner spinner=\"rowSpinner['controller.data.secureInclusion=false']\" label=\"_t('btn_unsecure')\" icon=\"'fa-unlock'\"></bb-row-spinner></button></div></div><div class=cfg-block ng-controller=IncludeExcludeDeviceController><p class=input-help ng-show=\"controlDh.controller.isSIS || controlDh.controller.isPrimary\">{{_t('nm_learn_mode_you_are_primary_no_sis')}}</p><p class=input-help ng-show=\"!controlDh.controller.isSIS && !controlDh.controller.isPrimary\">{{_t('nm_learn_mode_you_are_secondary_can_not_add')}}</p><div ng-hide=\"controlDh.inclusion.lastIncludedDevice.message || controlDh.inclusion.lastExcludedDevice.message\"><bb-alert alert=controlDh.inclusion.alertPrimary></bb-alert><bb-alert alert=controlDh.inclusion.alert></bb-alert></div><bb-alert alert=controlDh.inclusion.lastIncludedDevice></bb-alert><bb-alert alert=controlDh.inclusion.lastExcludedDevice></bb-alert><button class=\"btn btn-primary\" id=btn_nm_include_start title=\"{{_t('nm_include_start_tooltip')}}\" ng-disabled=\"[5, 6, 7, 20].indexOf(controlDh.controller.controllerState) > -1\" ng-show=\"[1, 2, 3, 4].indexOf(controlDh.controller.controllerState) == -1\" ng-click=\"addNodeToNetwork('controller.AddNodeToNetwork(1)')\"><i class=\"fa fa-play-circle\"></i> {{_t('nm_include_start')}}</button> <button class=\"btn btn-danger\" id=btn_nm_include_stop ng-show=\"[1, 2, 3, 4].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"addNodeToNetwork('controller.AddNodeToNetwork(0)')\"><i class=\"fa fa-stop-circle\"></i> {{_t('nm_include_stop')}}</button> <button class=\"btn btn-info\" id=nm_exclude_start title=\"{{_t('nm_exclude_start_tooltip')}}\" ng-disabled=\"[1, 2, 3, 4, 20].indexOf(controlDh.controller.controllerState) > -1\" ng-show=\"[5, 6, 7].indexOf(controlDh.controller.controllerState) == -1\" ng-click=\"removeNodeToNetwork('controller.RemoveNodeFromNetwork(1)')\"><i class=\"fa fa-play-circle\"></i> {{_t('nm_exclude_start')}}</button> <button class=\"btn btn-danger\" id=nm_exclude_stop ng-show=\"[5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"removeNodeToNetwork('controller.RemoveNodeFromNetwork(0)')\"><i class=\"fa fa-stop-circle\"></i> {{_t('nm_exclude_stop')}}</button></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_network_maintance.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-sitemap\"></i> {{_t('nm_net_maintance')}}</div><div class=panel-body><div><div class=\"cfg-block form-inline\"><p class=input-help>{{_t('nm_remove_node_war')}}</p><select name=remove_failed_node id=remove_failed_node class=form-control ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-hide=_.isEmpty(controlDh.nodes.failedNodes) ng-model=controlDh.input.failedNodes><option ng-hide=\"controlDh.removed.failedNodes.indexOf(v) > -1\" ng-repeat=\"v in controlDh.nodes.failedNodes track by $index\" value={{v}}>{{v}}</option></select><button class=\"btn btn-primary\" id=btn_remove_failed_mode ng-click=\"handleModal('failedNodeModal', $event)\" ng-disabled=!controlDh.input.failedNodes><bb-row-spinner spinner=\"rowSpinner['devices[' + controlDh.input.failedNodes + '].RemoveFailedNode()']\" label=\"_t('nm_remove_failed')\" icon=\"'fa-minus-circle'\"></bb-row-spinner></button></div><div class=\"cfg-block form-inline\" ng-controller=ReplaceFailedNodeController><p class=input-help>{{_t('nm_replace_node_war')}}</p><div class=\"alert nm-response alert-danger\" ng-show=\"[17, 18].indexOf(controllerState) != -1\">{{_t('nm_controller_state_' + controllerState)}}</div><select name=replace_failed_node id=replace_failed_node class=form-control ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-hide=_.isEmpty(controlDh.nodes.failedNodes) ng-model=controlDh.input.replaceNodes><option ng-hide=\"controlDh.removed.replaceNodes.indexOf(v) > -1\" ng-repeat=\"v in controlDh.nodes.failedNodes track by $index\" value={{v}}>{{v}}</option></select><button class=\"btn btn-primary\" id=btn_replace_failed_node ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"replaceFailedNode('ReplaceFailedNode(' + controlDh.input.replaceNodes + ')')\" ng-disabled=!controlDh.input.replaceNodes><bb-row-spinner spinner=\"rowSpinner['ReplaceFailedNode(' + controlDh.input.replaceNodes + ')']\" label=\"_t('nm_replace_node')\" icon=\"'fa-exchange'\"></bb-row-spinner>{{_t('')}}</button></div><div class=\"cfg-block form-inline\"><p class=input-help>{{_t('nm_mark_node_war')}}</p><select name=mark_battery_failed id=mark_battery_failed class=form-control ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-hide=_.isEmpty(controlDh.nodes.failedBatteries) ng-change=changeSelectNode(modelBatteryFailed) ng-model=controlDh.input.failedBatteries><option ng-hide=\"controlDh.removed.failedBatteries.indexOf(v) > -1\" ng-repeat=\"v in controlDh.nodes.failedBatteries track by $index\" value={{v}}>{{v}}</option></select><button class=\"btn btn-primary\" ng-click=\"handleModal('failedBatteryModal', $event)\" ng-disabled=!controlDh.input.failedBatteries><bb-row-spinner spinner=\"rowSpinner['devices[' + controlDh.input.failedBatteries + '].SendNoOperation()']\" label=\"_t('nm_mark_battery_as_failed')\" icon=\"'fa-thumb-tack'\"></bb-row-spinner></button></div></div><div><div class=\"cfg-block form-inline\" ng-controller=ControllerChangeController><p class=input-help>{{_t('nm_change_controller_war')}}</p><div class=nm-response ng-class=\"controllerState == 0 ? 'text-info' : 'text - danger'\" ng-show=\"[13, 14, 15, 16].indexOf(controllerState) > -1\">{{_t('nm_controller_state_' + controllerState)}}</div><button class=\"btn btn-primary\" id=btn_controller_change_start ng-show=\"[13, 14, 15, 16].indexOf(controlDh.controller.controllerState) == -1\" ng-click=\"controllerChange('controller.ControllerChange(1)')\" ng-disabled=\"[1, 2, 3, 4, 5, 6, 7, 20].indexOf(controlDh.controller.controllerState) > -1 || isPrimary == false || rowSpinner['controller.ControllerChange(1)']\"><bb-row-spinner spinner=\"rowSpinner['controller.ControllerChange(1)']\" label=\"_t('nm_controller_change_start')\" icon=\"'fa-database'\"></bb-row-spinner></button> <button class=\"btn btn-danger\" id=btn_controller_change_stop ng-show=\"[13, 14, 15, 16].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"controllerChange('controller.ControllerChange(0)')\" ng-disabled=\"rowSpinner['controller.ControllerChange(0)']\"><bb-row-spinner spinner=\"rowSpinner['controller.ControllerChange(0)']\" label=\"_t('nm_controller_change_stop')\" icon=\"'fa-database'\"></bb-row-spinner></button></div><div class=\"cfg-block form-inline\" ng-controller=RequestNifAllController><p class=input-help>{{_t('nm_nif_all_war')}}</p><button class=\"btn btn-primary\" id=btn_request_nif ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"requestNifAll('requestNifAll')\" ng-disabled=\"rowSpinner['requestNifAll']\"><bb-row-spinner spinner=\"rowSpinner['requestNifAll']\" label=\"_t('nm_request_all_node_information')\" icon=\"'fa-search-plus'\"></bb-row-spinner></button></div></div></div></div><div id=failedNodeModal class=appmodal ng-if=modalArr.failedNodeModal ng-controller=RemoveFailedNodeController><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('failedNodeModal', $event);controlDh.input.failedNodes = 0\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nm_remove_failed') + ' #' + controlDh.input.failedNodes}}</h3></div><div class=appmodal-body><div class=\"alert alert-warning\"><input type=checkbox name=remove_node_confirm id=remove_node_confirm value=1 ng-click=\"goFailedNode = !goFailedNode\"> <span ng-bind-html=\"_t('are_you_sure_remove_node') | toTrusted\"></span> <strong>{{deviceInfo.name}}</strong><p>{{_t('txt_controller_delete_node')}}</p></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('failedNodeModal', $event);controlDh.input.failedNodes = 0\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=button class=\"btn btn-danger\" id=btn_reset_controller ng-show=goFailedNode ng-click=\"removeFailedNode('devices[' + controlDh.input.failedNodes + '].RemoveFailedNode()',handleModal('failedNodeModal', $event))\"><i class=\"fa fa-exclamation-triangle\"></i> {{_t('nm_remove_failed')}}</button></div></div></div><div id=failedBatteryModal class=appmodal ng-if=modalArr.failedBatteryModal ng-controller=BatteryDeviceFailedController><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('failedBatteryModal', $event);controlDh.input.failedBatteries = 0\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nm_mark_battery_as_failed') + ' #' + controlDh.input.failedBatteries}}</h3></div><div class=appmodal-body>{{_t('nm_mark_node_war_modal')}}</div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('failedBatteryModal', $event);controlDh.input.failedBatteries = 0\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button> <button type=button class=\"btn btn-primary\" id=btn_reset_controller ng-click=\"markFailedNode(\r" +
    "\n" +
    "                    ['devices[' + controlDh.input.failedBatteries + '].SendNoOperation()',\r" +
    "\n" +
    "                    'devices[' + controlDh.input.failedBatteries + '].WakeupQueue()'],handleModal('failedBatteryModal', $event))\"><i class=\"fa fa-check\"></i> {{_t('nm_mark_battery_as_failed')}}</button></div></div></div>"
  );


  $templateCache.put('app/views/network/control/control_restore.html',
    "<div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-download\"></i> {{_t('nm_backup_title')}}</div><div class=panel-body><a class=\"btn btn-primary\" href={{cfg.server_url}}/ZWaveAPI/Backup ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><i class=\"fa fa-download\"></i> {{_t('nm_backup_download')}} </a>&nbsp; <button class=\"btn btn-primary\" ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-repeat\"></i> {{_t('nm_restore_backup_upload')}}</button></div></div><div ng-include=\"'app/views/network/control/control_restore_modal.html'\"></div>"
  );


  $templateCache.put('app/views/network/control/control_restore_modal.html',
    "<div id=restoreModal class=appmodal ng-if=modalArr.restoreModal ng-controller=BackupRestoreController><div class=appmodal-in><form name=form_notes id=form_modal class=form ng-model=notes.input ng-submit=\"handleModal('restoreModal', $event);storeSettings(settings.input)\" novalidate><div class=appmodal-header><span class=appmodal-close ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nm_restore_backup_upload')}}</h3></div><div class=appmodal-body><bb-loader></bb-loader><div class=restore-backup-control ng-if_=\"restoreBackupStatus == 0\"><div class=\"alert alert-warning\"><input type=checkbox name=restore_confirm value=1 id=restore_confirm ng-click=\"restore.allow = !restore.allow\"> <span ng-bind-html=\"_t('are_you_sure_restore') | toTrusted\"></span></div><div ng-if=restore.allow><p><input type=checkbox name=restore_chip_info id=restore_chip_info value=1 ng-true-value=1 ng-false-value=0 ng-model=restore.input.restore_chip_info> {{_t('restore_backup_chip')}}</p><p class=text-center><input id=btn_upload type=file name=file onchange=angular.element(this).scope().restoreFromBackup(this.files)></p></div></div></div><div class=appmodal-footer><button type=button class=\"btn btn-default\" ng-click=\"handleModal('restoreModal', $event)\"><i class=\"fa fa-times text-danger\"></i> <span class=btn-name>{{_t('btn_cancel')}}</span></button></div></form></div></div>"
  );


  $templateCache.put('app/views/network/control/control_sucsic.html',
    "<div class=\"panel panel-default\" ng-controller=SucSisController><div class=panel-heading><i class=\"fa fa-share-alt\"></i> {{_t('nm_suc_sis_title')}}</div><div class=panel-body><div class=\"cfg-block form-inline\"><button class=\"btn btn-primary\" ng-click=\"getSUCNodeId('controller.GetSUCNodeId()')\" ng-disabled=\"rowSpinner['controller.GetSUCNodeId()'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><bb-row-spinner spinner=\"rowSpinner['controller.GetSUCNodeId()']\" label=\"_t('nm_get_suc_nodeid')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" ng-click=\"requestNetworkUpdate('controller.RequestNetworkUpdate()')\" ng-disabled=\"controlDh.controller.disableSUCRequest || rowSpinner['controller.RequestNetworkUpdate()'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><bb-row-spinner spinner=\"rowSpinner['controller.RequestNetworkUpdate()']\" label=\"_t('nm_request_network_update')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></div><div class=\"cfg-block form-inline\"><button class=\"btn btn-primary\" data-ng-click=\"setSUCNodeId('controller.SetSUCNodeId(' + controlDh.input.sucSis + ')')\" ng-disabled=\"rowSpinner['controller.SetSUCNodeId(' + controlDh.input.sucSis + ')'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><bb-row-spinner spinner=\"rowSpinner['controller.SetSUCNodeId(' + controlDh.input.sucSis + ')']\" label=\"_t('nm_start_suc')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" data-ng-click=\"setSISNodeId('controller.SetSISNodeId(' + controlDh.input.sucSis + ')')\" ng-disabled=\"rowSpinner['controller.SetSISNodeId(' + controlDh.input.sucSis + ')']|| [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><bb-row-spinner spinner=\"rowSpinner['controller.SetSISNodeId(' + controlDh.input.sucSis + ')']\" label=\"_t('nm_start_sis')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button> <button class=\"btn btn-primary\" data-ng-click=\"disableSUCNodeId('controller.DisableSUCNodeId(' + controlDh.input.sucSis + ')')\" ng-disabled=\"rowSpinner['controller.DisableSUCNodeId(' + controlDh.input.sucSis + ')'] || [1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\"><bb-row-spinner spinner=\"rowSpinner['controller.DisableSUCNodeId(' + controlDh.input.sucSis + ')']\" label=\"_t('nm_stop_suc_sis')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button><p><br>{{_t('nm_start_suc_on_node')}}<select name=suc_sic_node id=suc_sic_node class=form-control ng-disabled=\"[1, 2, 3, 4, 5, 6, 7].indexOf(controlDh.controller.controllerState) > -1\" ng-model=controlDh.input.sucSis><option ng-repeat=\"v in controlDh.nodes.sucSis track by $index\" value={{v}} ng-selected=\"v == controlDh.controller.nodeId\">{{v}}</option></select></p><p></p></div></div></div>"
  );


  $templateCache.put('app/views/network/controller_default.html',
    "<!-- Controller info default -->\r" +
    "\n" +
    "<div ng-controller=\"ControllerController\">\r" +
    "\n" +
    "    <div class=\"page-header\"><h1>{{_t('nav_controller_info')}}</h1></div>\r" +
    "\n" +
    "    <div class=\"well well-sm\">\r" +
    "\n" +
    "        <a href=\"#network/queue\" target=\"_blank\" class=\"btn btn-primary\" _ngs-click=\"openQueue()\"><i\r" +
    "\n" +
    "                class=\"fa fa-search\"></i> {{_t('nm_inspect_queue_title')}}</a> <em>{{_t('txt_inspect_queue')}}</em>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"table-responsive table-controller\">\r" +
    "\n" +
    "        <!-- Role in Network -->\r" +
    "\n" +
    "        <h3>{{_t('ctrl_info_role_title')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_nodeid_title\" class=\"controller-th\">{{_t('ctrl_info_nodeid_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_nodeid_value\">{{master['controller.data.nodeId']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_homeid_title\" class=\"controller-th\">{{_t('ctrl_info_homeid_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_homeid_value\">{{master['txtHomeId']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_primary_title\" class=\"controller-th\">{{_t('ctrl_info_primary_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_primary_value\">{{master['controller.data.isPrimary']? 'Yes': 'No'}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_real_primary_title\" class=\"controller-th\">{{_t('ctrl_info_real_primary_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_real_primary_value\">{{master['controller.data.isRealPrimary']? 'Yes': 'No'}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_suc_sis_title\" class=\"controller-th\">{{_t('ctrl_info_suc_sis_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_suc_sis_value\">{{master['txtSucSis']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "        <!-- Hardware -->\r" +
    "\n" +
    "        <h3>{{_t('ctrl_info_hw_title')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_vendor_title\" class=\"controller-th\">{{_t('ctrl_info_hw_vendor_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_vendor_value\">{{master['controller.data.vendor']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_product_title\" class=\"controller-th\">{{_t('ctrl_info_hw_product_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_product_value\">{{master['controller.data.manufacturerProductType']}} /\r" +
    "\n" +
    "                    {{master['controller.data.manufacturerProductId']}}\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_chip_title\" class=\"controller-th\">{{_t('ctrl_info_hw_chip_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_hw_chip_value\">{{master['controller.data.ZWaveChip']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "        <!-- Firmware -->\r" +
    "\n" +
    "        <h3>{{_t('ctrl_info_sw_title')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_lib_title\" class=\"controller-th\">{{_t('ctrl_info_sw_lib_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_lib_value\">{{master['controller.data.libType']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_sdk_title\" class=\"controller-th\">{{_t('ctrl_info_sw_sdk_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_sdk_value\">{{master['controller.data.SDK']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_api_title\" class=\"controller-th\">{{_t('ctrl_info_sw_api_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_api_value\">{{master['controller.data.APIVersion']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "        <!-- Capabilities -->\r" +
    "\n" +
    "        <h3>{{_t('ctrl_info_sw_caps_title')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_uuid_title\" class=\"controller-th\">{{_t('ctrl_info_uuid_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_uuid_value\">{{master['controller.data.uuid']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_subvendor_title\" class=\"controller-th\">{{_t('ctrl_info_caps_subvendor_title')}}\r" +
    "\n" +
    "                </td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_subvendor_value\">{{master['controller.data.caps.subvendor']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_nodes_title\" class=\"controller-th\">{{_t('ctrl_info_caps_nodes_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_nodes_value\">{{master['controller.data.caps.nodes']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_cap_title\" class=\"controller-th\">{{_t('ctrl_info_caps_cap_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_caps_cap_value\">{{master['controller.data.caps.cap']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "        <!-- Z_Way Software Information -->\r" +
    "\n" +
    "        <h3>{{_t('ctrl_info_sw_rev_title')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_ver_title\" class=\"controller-th\">{{_t('ctrl_info_sw_rev_ver_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_ver_value\">{{master['controller.data.softwareRevisionVersion']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_id_title\" class=\"controller-th\">{{_t('ctrl_info_sw_rev_id_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_id_value\">{{master['controller.data.softwareRevisionId']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_date_title\" class=\"controller-th\">{{_t('ctrl_info_sw_rev_date_title')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_info_sw_rev_date_value\">{{master['controller.data.softwareRevisionDate']}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- Z_Way Software Information -->\r" +
    "\n" +
    "        <h3>{{_t('ui')}}</h3>\r" +
    "\n" +
    "        <table class=\"table table-condensed\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "            <tr>\r" +
    "\n" +
    "                <td id=\"ctrl_ui_version\" class=\"controller-th\">{{_t('ui_version')}}</td>\r" +
    "\n" +
    "                <td id=\"ctrl_ui_version_value\">{{cfg.app_version}}</td>\r" +
    "\n" +
    "            </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"well well-sm\">\r" +
    "\n" +
    "        <!-- nm_send_node_information  -->\r" +
    "\n" +
    "        <button class=\"btn btn-primary\"\r" +
    "\n" +
    "                ng-controller=\"SendNodeInformationController\"\r" +
    "\n" +
    "                data-ng-click=\"sendNodeInformation('controller.SendNodeInformation()')\"\r" +
    "\n" +
    "                ng-disabled=\"rowSpinner['controller.SendNodeInformation()']\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <bb-row-spinner\r" +
    "\n" +
    "                    spinner=\"rowSpinner['controller.SendNodeInformation()']\"\r" +
    "\n" +
    "                    label=\"_t('nm_send_node_information')\"\r" +
    "\n" +
    "                    icon=\"'fa-circle-o'\">\r" +
    "\n" +
    "            </bb-row-spinner>\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- Debug mode  -->\r" +
    "\n" +
    "        <button class=\"btn\"\r" +
    "\n" +
    "                ng-class=\"cfg.zwavecfg.debug === true ? 'btn-success active': 'btn-primary'\"\r" +
    "\n" +
    "                ng-click=\"setDebugMode(cfg.zwavecfg.debug === true ? false : true,'debugMode')\"\r" +
    "\n" +
    "                ng-disabled=\"rowSpinner['debugMode']\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <bb-row-spinner\r" +
    "\n" +
    "                    spinner=\"rowSpinner['debugMode']\"\r" +
    "\n" +
    "                    label=\"_t('debug_mode')\"\r" +
    "\n" +
    "                    icon=\"'fa-bug'\">\r" +
    "\n" +
    "            </bb-row-spinner>\r" +
    "\n" +
    "            <!--<i class=\"fa fa-bug\"></i> {{_t('Debug mode')}}-->\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- ctrl_info_data  -->\r" +
    "\n" +
    "        <button class=\"btn btn-default\"\r" +
    "\n" +
    "                ng-controller=\"DataHolderInfoController\"\r" +
    "\n" +
    "                ng-click=\"dataHolderModal('dataHolderModal',$event, ZWaveAPIData.controller.data)\">\r" +
    "\n" +
    "            <i class=\"fa fa-clone\"></i> {{_t('ctrl_info_data')}}\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- ctrl_info_device_data  -->\r" +
    "\n" +
    "        <button class=\"btn btn-default\"\r" +
    "\n" +
    "                ng-controller=\"DataHolderInfoController\"\r" +
    "\n" +
    "                ng-click=\"dataHolderModal('dataHolderModal',$event, ZWaveAPIData.devices[ZWaveAPIData.controller.data.nodeId.value].data)\">\r" +
    "\n" +
    "            <i class=\"fa fa-clone\"></i> {{_t('ctrl_info_device_data')}}\r" +
    "\n" +
    "        </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- Update fitmware  -->\r" +
    "\n" +
    "        <a href=\"#uzb\" class=\"btn btn-default\"\r" +
    "\n" +
    "           ng-if_\"master['controller.data.manufacturerProductId'] == 1 && (master['controller.data.manufacturerId'] == 277 || master['controller.data.manufacturerId'] == 327)&& master['controller.data.manufacturerProductType'] == 1024 && master['controller.data.ZWaveChip'] == 'ZW0500'\">\r" +
    "\n" +
    "            <i class=\"fa fa-long-arrow-up\"></i> {{_t('upgrade_bootloader_firmware')}}\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- Update licence  -->\r" +
    "\n" +
    "        <a href=\"#licence\" class=\"btn btn-default\"\r" +
    "\n" +
    "           ng-if_=\"master['controller.data.manufacturerProductId'] == 1 && master['controller.data.manufacturerId'] == 277 && master['controller.data.manufacturerProductType'] == 1024 && master['controller.data.ZWaveChip'] == 'ZW0500'\">\r" +
    "\n" +
    "            <i class=\"fa fa-level-up\"></i> {{_t('licence_upgrade')}}\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"panel panel-default\">\r" +
    "\n" +
    "        <div class=\"panel-heading\">\r" +
    "\n" +
    "            <h3 class=\"panel-title\">{{_t('ctrl_info_func_list_title')}}</h3>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"panel-body\" ng-bind-html=\"funcList | toTrusted\"></div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- dataHolderModal -->\r" +
    "\n" +
    "    <div id=\"dataHolderModal\" class=\"appmodal appmodal-100\" ng-show=\"modalArr.dataHolderModal\">\r" +
    "\n" +
    "        <div class=\"appmodal-in\">\r" +
    "\n" +
    "            <div class=\"appmodal-header\">\r" +
    "\n" +
    "                <span class=\"appmodal-close\" ng-click=\"handleModal('dataHolderModal', $event)\"><i\r" +
    "\n" +
    "                        class=\"fa fa-times\"></i></span>\r" +
    "\n" +
    "                    <h3>{{_t('th_command_class')}}</h3>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"appmodal-body modal-h-400\">\r" +
    "\n" +
    "                    {{dataHolderInfo.all}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"appmodal-footer\">\r" +
    "\n" +
    "                    <!-- Close -->\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"handleModal('dataHolderModal', $event)\">\r" +
    "\n" +
    "                        <i class=\"fa fa-times text-danger\"></i> <span class=\"btn-name\">{{_t('btn_cancel')}}</span>\r" +
    "\n" +
    "                    </button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div><!-- /#modal dataHolderModal -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- Modal command -->\r" +
    "\n" +
    "    <div class=\"modal fade\" id=\"modal_controller\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\r" +
    "\n" +
    "         aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\">{{_t('th_command_class')}}</h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\"></div>\r" +
    "\n" +
    "                <div class=\"modal-footer\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">{{_t('btn_cancel')}}</button>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div><!-- /.Modal -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!-- Modal debugging -->\r" +
    "\n" +
    "    <div class=\"modal fade modal_wide\" id=\"modal_queue\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"\r" +
    "\n" +
    "         aria-hidden=\"true\">\r" +
    "\n" +
    "        <div class=\"modal-dialog\">\r" +
    "\n" +
    "            <div class=\"modal-content\">\r" +
    "\n" +
    "                <div class=\"modal-header\">\r" +
    "\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r" +
    "\n" +
    "                    <h4 class=\"modal-title\">{{_t('nm_inspect_queue_title')}}</h4>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"modal-body\">\r" +
    "\n" +
    "                    <div class=\"table-responsive\">\r" +
    "\n" +
    "                        <table id=\"inspect_queue_table\" class=\"table-striped\">\r" +
    "\n" +
    "                            <thead>\r" +
    "\n" +
    "                            <tr>\r" +
    "\n" +
    "                                <th>n</th>\r" +
    "\n" +
    "                                <th>U</th>\r" +
    "\n" +
    "                                <th>W</th>\r" +
    "\n" +
    "                                <th>S</th>\r" +
    "\n" +
    "                                <th>E</th>\r" +
    "\n" +
    "                                <th>D</th>\r" +
    "\n" +
    "                                <th>Ack</th>\r" +
    "\n" +
    "                                <th>Resp</th>\r" +
    "\n" +
    "                                <th>Cbk</th>\r" +
    "\n" +
    "                                <th>Timeout</th>\r" +
    "\n" +
    "                                <th>NodeId</th>\r" +
    "\n" +
    "                                <th>Description</th>\r" +
    "\n" +
    "                                <th>Progress</th>\r" +
    "\n" +
    "                                <th>Buffer</th>\r" +
    "\n" +
    "                            </tr>\r" +
    "\n" +
    "                            </thead>\r" +
    "\n" +
    "                            <tbody id=\"inspect_queue_table_body\"></tbody>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                        <div>\r" +
    "\n" +
    "                            <div id=\"inspect_queue_len\"></div>\r" +
    "\n" +
    "                            <br/>\r" +
    "\n" +
    "                            <div><strong>{{_t('inspect_queue_legend_title')}}</strong>\r" +
    "\n" +
    "                                <p ng-bind-html=\"_t('inspect_queue_legend_help') | toTrusted\"></p>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"modal-footer\">\r" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\"\r" +
    "\n" +
    "                                    ng-click=\"inspectQueue('#modal_queue',true)\">{{_t('btn_cancel')}}\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div><!-- /.Modal -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div><!-- /ng-controler -->\r" +
    "\n"
  );


  $templateCache.put('app/views/network/controller_installer.html',
    "<div ng-controller=ControllerController><div class=page-header><h1>{{_t('nav_controller_info')}}</h1></div><div class=\"well well-sm\"><a href=#network/queue target=_blank class=\"btn btn-primary\" _ngs-click=openQueue()><i class=\"fa fa-search\"></i> {{_t('nm_inspect_queue_title')}}</a> <em>{{_t('txt_inspect_queue')}}</em></div><div class=\"table-responsive table-controller\"><h3>{{_t('ctrl_info_role_title')}}</h3><table class=\"table table-condensed\"><tbody><tr><td id=ctrl_info_nodeid_title class=controller-th>{{_t('ctrl_info_nodeid_title')}}</td><td id=ctrl_info_nodeid_value>{{master['controller.data.nodeId']}}</td></tr><tr><td id=ctrl_info_homeid_title class=controller-th>{{_t('ctrl_info_homeid_title')}}</td><td id=ctrl_info_homeid_value><span ng-if=\"boxData.controller.isPrimary && boxData.controller.hasDevices\">{{_t('my_own')}} </span><span ng-if=\"!boxData.controller.isPrimary || !boxData.controller.hasDevices\">{{_t('other_network')}}</span></td></tr><tr><td id=ctrl_info_primary_title class=controller-th>{{_t('ctrl_info_primary_title')}}</td><td id=ctrl_info_primary_value>{{master['controller.data.isPrimary']? 'Yes': 'No'}}</td></tr><tr><td id=ctrl_info_real_primary_title class=controller-th>{{_t('ctrl_info_real_primary_title')}}</td><td id=ctrl_info_real_primary_value>{{master['controller.data.isRealPrimary']? 'Yes - ' + _t('secondary_inclusion_controller') : 'No'}}</td></tr><tr><td id=ctrl_info_suc_sis_title class=controller-th>{{_t('ctrl_info_suc_sis_title')}}</td><td id=ctrl_info_suc_sis_value>{{master['txtSucSis']}}</td></tr></tbody></table><h3>{{_t('ctrl_info_hw_title')}}</h3><table class=\"table table-condensed\"><tbody><tr><td id=ctrl_info_hw_vendor_title class=controller-th>{{_t('ctrl_info_hw_vendor_title')}}</td><td id=ctrl_info_hw_vendor_value>{{master['controller.data.vendor']}}</td></tr><tr><td id=ctrl_info_hw_product_title class=controller-th>{{_t('ctrl_info_hw_product_title')}}</td><td id=ctrl_info_hw_product_value>0001 / 0001</td></tr><tr><td id=ctrl_info_hw_chip_title class=controller-th>{{_t('ctrl_info_hw_chip_title')}}</td><td id=ctrl_info_hw_chip_value>{{master['controller.data.ZWaveChip']}}</td></tr></tbody></table><h3>{{_t('ctrl_info_sw_title')}}</h3><table class=\"table table-condensed\"><tbody><tr><td id=ctrl_info_sw_lib_title class=controller-th>{{_t('ctrl_info_sw_lib_title')}}</td><td id=ctrl_info_sw_lib_value>{{master['controller.data.libType']}}</td></tr><tr><td id=ctrl_info_sw_sdk_title class=controller-th>{{_t('ctrl_info_sw_sdk_title')}}</td><td id=ctrl_info_sw_sdk_value>{{master['controller.data.SDK']}}</td></tr><tr><td id=ctrl_info_sw_api_title class=controller-th>{{_t('ctrl_info_sw_api_title')}}</td><td id=ctrl_info_sw_api_value>{{master['controller.data.APIVersion']}}</td></tr></tbody></table><h3>{{_t('ctrl_info_sw_rev_title')}}</h3><table class=\"table table-condensed\"><tbody><tr><td id=ctrl_info_sw_rev_ver_title class=controller-th>{{_t('ctrl_info_sw_rev_ver_title')}}</td><td id=ctrl_info_sw_rev_ver_value>{{master['controller.data.softwareRevisionVersion']}}</td></tr><tr><td id=ctrl_info_sw_rev_id_title class=controller-th>{{_t('ctrl_info_sw_rev_id_title')}}</td><td id=ctrl_info_sw_rev_id_value>{{master['controller.data.softwareRevisionId']}}</td></tr><tr><td id=ctrl_info_sw_rev_date_title class=controller-th>{{_t('ctrl_info_sw_rev_date_title')}}</td><td id=ctrl_info_sw_rev_date_value>{{master['controller.data.softwareRevisionDate']}}</td></tr></tbody></table><h3>{{_t('ui')}}</h3><table class=\"table table-condensed\"><tbody><tr><td id=ctrl_ui_version class=controller-th>{{_t('ui_version')}}</td><td id=ctrl_ui_version_value>{{cfg.app_version}}</td></tr></tbody></table><h3>{{_t('nm_frequency_title')}}</h3><table class=\"table table-condensed\"><tbody><tr><td class=controller-th>{{_t('current_frequency')}}</td><td>{{master['controller.data.frequency']}}</td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/network/map.html',
    "<div ng-controller=NetworkMapController><div id=cy></div></div>"
  );


  $templateCache.put('app/views/network/queue.html',
    "<div ng-controller=QueueController><div class=page-header><h1>{{_t('nm_inspect_queue_title')}}</h1></div><div><strong>{{_t('inspect_queue_legend_title')}}</strong><p ng-bind-html=\"_t('inspect_queue_legend_help') | toTrusted\"></p></div><div class=table-responsive><table id=inspect_queue_table class=table-striped><thead><tr><th>n</th><th>U</th><th>W</th><th>S</th><th>E</th><th>D</th><th>Ack</th><th>Resp</th><th>Cbk</th><th>{{_t('th_timeout')}}</th><th>{{_t('th_nodeid')}}</th><th>{{_t('th_description')}}</th><th>{{_t('th_progress')}}</th><th>{{_t('th_buffer')}}</th></tr></thead><tbody id=inspect_queue_table_body></tbody></table><div><div id=inspect_queue_len></div><br></div></div><script>function closeWindow() {\r" +
    "\n" +
    "                    window.open('', '_parent', '');\r" +
    "\n" +
    "                    window.close();\r" +
    "\n" +
    "                }</script><a class=\"btn btn-primary\" href=javascript:closeWindow();>{{_t('btn_close')}}</a></div>"
  );


  $templateCache.put('app/views/network/reorganization.html',
    "<div ng-controller=ReorganizationController><div class=page-header><h1>{{ _t('reorg_title')}}</h1></div><div class=table-responsive><input id=mainsPowered type=checkbox ng-model=mainsPowered><label for=mainsPowered>{{ _t('reorg_mains_powered')}}</label><br><input id=batteryPowered type=checkbox ng-model=batteryPowered><label for=batteryPowered>{{ _t('reorg_battery_powered')}}</label><br><button class=\"btn btn-primary update\" data-ng-click=reorgAll() data-action=reorgAll id=btn_reorg_all_1 ng-disabled=reorganizing>{{ _t('reorg_start')}}</button> <button class=\"btn btn-primary update\" data-ng-click=downloadLog() ng-disabled=\"logged == ''\">{{ _t('reorg_download_log')}}</button><textarea id=reorg_log ng-model=logged ng-readonly=true style=\"width:100%; height: 300px\"></textarea></div></div>"
  );


  $templateCache.put('app/views/network/routing.html',
    "<div ng-controller=RoutingController><div class=page-header><h1>{{ _t('tab_routing_table_title')}}</h1></div><div class=table-responsive ng-if=routings.show><table id=RoutingTable class=\"table table-striped table-condensed table-hover\"><thead><tr><th>#</th><th>{{ _t('device_name')}}</th><th>{{ _t('nav_type_info')}}</th><th>{{ _t('rt_header_update_time')}}</th><th ng-repeat=\"v in routings.all\" style=text-align:center>{{v.id}}</th><th class=\"mobile-show td-action\"><button class=\"btn btn-primary\" id=btn_update_all_1 ng-click=\"updateAllRoutess('all_1','urlToStore')\" ng-disabled=\"rowSpinner['all_1']\"><bb-row-spinner spinner=\"rowSpinner['all_1']\" label=\"_t('switches_update_all')\" icon=\"'fa-circle-o'\"></bb-row-spinner></button></th></tr></thead><tbody><tr ng-repeat=\"v in routings.all track by $index\"><td>{{v.id}}</td><td>{{v.name}}</td><td><i class=fa ng-class=v.icon></i></td><td class=\"row-time is-updated-{{v.isUpdated}}\">{{ v.updateTime | isTodayFromUnix }} &nbsp;</td><td ng-repeat=\"n in devices\" class=rtCell><div id=cell{{nodeId}}-{{n}} class={{data[nodeId][n].clazz}} title={{data[nodeId][n].tooltip}} data-toggle=tooltip data-position=top tooltip_><span class=info>{{data[nodeId][n].info}}</span></div></td><td class=rtCell ng-repeat=\"n in v.cellState\"><div class={{n.cssClass}} title={{n.tooltip}}><span class=info ng-if=n.hasAssoc>*</span> <span class=info ng-if=!n.hasAssoc>&nbsp;</span></div></td><td class=td-action><button class=\"btn btn-default\" id=\"btn_update_{{ v.rowId}}\" ng-click=updateRoute(v.urlToStore) ng-disabled=rowSpinner[v.urlToStore]><bb-row-spinner spinner=rowSpinner[v.urlToStore] label=\" _t('update')\" icon=\"'fa-circle-o text-success'\"></bb-row-spinner></button></td></tr></tbody></table></div><div id=RoutingComments><i class=\"fa fa-square fa-lg\" style=\"color: green\"></i> {{_t('direct')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: #8C0\"></i> {{_t('routed')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: yellow\"></i> {{_t('badly_routed')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: red\"></i> {{_t('not_linked')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: gray\"></i> {{_t('unavailable')}}<br></div></div>"
  );


  $templateCache.put('app/views/network/timing.html',
    "<div ng-controller=TimingController><div class=page-header><h1>{{_t('nav_timing_info')}}</h1></div><bb-alert alert=alert></bb-alert><div id=table_mobile ng-if=devices.show><table class=\"table table-striped table-condensed table-hover\"><thead><tr><th><a href=\"\" ng-click=\"orderBy('id')\">{{_t('th_node')}} <span ng-show=\"predicate == 'id'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('name')\">{{ _t('device_name')}} <span ng-show=\"predicate == 'name'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('type')\">{{_t('th_type')}} <span ng-show=\"predicate == 'type'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('totalPackets')\">{{_t('th_total')}} (pkts) <span ng-show=\"predicate == 'totalPackets'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th><a href=\"\" ng-click=\"orderBy('okPackets')\">{{_t('th_ok')}} <span ng-show=\"predicate == 'okPackets'\"><i ng-show=!reverse class=\"fa fa-sort-asc\"></i><i ng-show=reverse class=\"fa fa-sort-desc\"></i></span></a></th><th>{{_t('th_lastpackets')}}</th></tr></thead><tbody><tr ng-repeat=\"v in devices.all | orderBy:predicate:reverse track by $index\" id=\"{{ v.rowId}}\"><td data-title=\"{{_t('th_node')}}\">{{ v.id}}</td><td data-title=\"{{ _t('device_name')}}\">{{ v.name }}</td><td data-title=\"{{_t('th_type')}}\"><i class=fa ng-class=v.icon></i></td><td data-title=\"{{_t('th_total')}}\">{{ v.totalPackets}} &nbsp;</td><td data-title=\"{{_t('th_ok')}}\">{{ v.okPackets}}% &nbsp;</td><td data-title=\"{{_t('th_lastpackets')}}\"><span ng-bind-html=\"v.lastPackets | toTrusted\"></span> &nbsp;</td></tr></tbody></table></div><p><strong>{{_t('timing_color_description')}}:</strong><br><i class=\"fa fa-square fa-lg\" style=\"color: green\"></i> {{_t('timing_green')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: black\"></i> {{_t('timing_black')}}<br><i class=\"fa fa-square fa-lg\" style=\"color: red\"></i> {{_t('timing_red')}}.<br></p></div>"
  );


  $templateCache.put('app/views/pages/license.html',
    "<div ng-controller=LicenseController><div class=page-header><h1>{{_t('licence_upgrade')}}</h1></div><p>{{_t('licence_upgrade_info')}}</p><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-sign-in\"></i> {{_t('licence_key_get')}}</div><div class=panel-body><p><a ng-href={{cfg.buy_licence_key}} class=\"btn btn-info btn-lg\">{{_t('btn_licence_buy')}}</a></p></div></div><p>{{_t('licence_upgrade_key')}}</p><div class=\"panel panel-default panel-highlighted\"><div class=panel-heading><i class=\"fa fa-key\"></i> {{_t('licence_key_insert')}}</div><div class=panel-body><div class=\"alert alert-danger\" ng-if=controllerIsZeroUuid><i class=\"fa fa-plug\"></i> {{_t('replug_device')}}</div><div class=cfg-block><div class=form-inline><input class=\"form-control spin-true verify-ctrl\" name=scratch_id id=scratch_id ng-disabled=controllerIsZeroUuid ng-model=formData.scratch_id> <button class=\"btn btn-primary verify-ctrl\" ng-click=getLicense(formData) ng-disabled=controllerIsZeroUuid>{{_t('btn_licence_verify')}}</button></div></div><p ng-if=proccessVerify.message><i class=fa-lg ng-class=proccessVerify.status></i> <span ng-bind=proccessVerify.message></span></p><p ng-if=proccessUpdate.message><i class=fa-lg ng-class=proccessUpdate.status></i> <span ng-bind=proccessUpdate.message></span></p></div></div></div>"
  );


  $templateCache.put('app/views/pages/uzb.html',
    "<div data-ng-controller=UzbController><div class=page-header><h1>{{_t('upgrade_bootloader_firmware')}}</h1></div><p>{{_t('txt_uzb_info')}}</p><div class=\"alert alert-dismissible\" ng-if=alert.message ng-class=alert.status><i class=\"fa fa-lg\" ng-class=alert.icon></i> <span ng-bind=alert.message></span></div><div><p class=text-info ng-if=noData ng-bind=noData></p><table class=\"table table-striped table-condensed table-hover\" ng-if=\"uzbUpgrade.length > 0\"><tbody><tr ng-repeat=\"v in uzbUpgrade| orderBy:predicate:reverse\" id=row_{{v.id}} ngif=\"v.file == 'bin'\"><td style=\"white-space: nowrap\"><strong>{{v.released | date:'yyyy-MM-dd'}}</strong></td><td>{{v.appVersionMajor + '.' + v.appVersionMinor}}</td><td>{{v.comment}}</td><td class=update-ctrl><button data-ng-click=\"upgrade('#row_' + v.id,'/ZWaveAPI/ZMEBootloaderUpgrade', cfg.uzb_url + v.fileURL)\" class=\"btn btn-primary spin-true\" id=btn_boot_{{v.id}} ng-show=\"v.type == 'bootloader'\">{{_t('upgrade_bootloader')}}</button> <button data-ng-click=\"upgrade('#btn_firmware_' + v.id, '/ZWaveAPI/ZMEFirmwareUpgrade', cfg.uzb_url + v.fileURL)\" data-action=reset class=\"btn btn-info spin-true\" id=btn_firmware_{{v.id}} ng-show=\"v.type=='firmware'\">{{_t('upgrade_firmware')}}</button></td></tr></tbody></table></div></div>"
  );


  $templateCache.put('app/views/settings/settings_app.html',
    "<h2 class=accordion-entry-title ng-click=\"expandElement('settingsApp')\"><i class=\"fa fa-cogs\"></i> {{_t('app_settings')}} <i class=\"fa accordion-arrow\" ng-class=\"expand.settingsApp ? 'fa-chevron-up':'fa-chevron-down'\"></i></h2><div class=accordion-entry-ctrl ng-class=\"\" ng-if=expand.settingsApp ng-controller=SettingsAppController><bb-loader></bb-loader><form name=form_settings id=form_settings class=\"form form-page\" ng-if_=\"cfg.app_type === 'installer'\" ng-submit=\"storeSettings(settings.input, cfg.zwavecfg)\" novalidate><fieldset><div class=\"form-group form-inline\"><label for=network_name>{{_t('network_name')}}:</label><input name=network_name id=network_name class=form-control placeholder=\"{{_t('network_name')}}\" value={{settings.input.network_name}} ng-model=settings.input.network_name></div><div class=\"form-group form-inline\"><label>{{_t('date_format')}}:</label><select name=date_format name=date_format class=form-control ng-model=settings.input.date_format><option ng-repeat=\"v in cfg.date_format_list\" value={{v}} ng-selected=\"v === cfg.zwavecfg.date_format\">{{v}}</option></select></div><div class=\"form-group form-inline\"><label>{{_t('time_format')}}:</label><select name=time_format name=time_format class=form-control ng-model=settings.input.time_format><option ng-repeat=\"v in cfg.time_format_list\" value={{v}} ng-selected=\"v === cfg.zwavecfg.time_format\">{{v}} {{_t('hours')}}</option></select></div><div class=\"form-group form-inline\"><label>{{_t('timezone')}}:</label><select name=time_zone name=time_zone class=form-control ng-model=settings.input.time_zone><option ng-repeat=\"v in cfg.time_zone_list\" value={{v}} ng-selected=\"v === cfg.zwavecfg.time_zone\">{{v}}</option></select></div></fieldset><fieldset class=submit-entry><button type=submit class=\"btn btn-submit\" title=\"{{_t('btn_save')}}\"><i class=\"fa fa-check\"></i> <span class=btn-name>{{_t('btn_save')}}</span></button></fieldset></form></div>"
  );


  $templateCache.put('app/views/settings/settings_default.html',
    "<div class=page-header><h1>{{_t('settings')}}</h1></div><div class=accordion-entry ng-include=\"'app/views/settings/settings_lang.html'\"></div>"
  );


  $templateCache.put('app/views/settings/settings_firmware.html',
    "<h2 class=accordion-entry-title ng-click=\"expandElement('settingsFirmware')\"><i class=\"fa fa-level-up\"></i> {{_t('nav_firmware_update')}} <i class=\"fa accordion-arrow\" ng-class=\"expand.settingsFirmware  ? 'fa-chevron-up':'fa-chevron-down'\"></i></h2><div class=accordion-entry-ctrl ng-class=\"\" ng-if=expand.settingsFirmware ng-controller=SettingsFirmwareController><bb-loader></bb-loader><form name=form_firmware id=form_firmware class=\"form form-page\" ng-submit=updateFirmware() ng-if_=!firmwareUpdate.isUpToDate><fieldset><p class=form-control-static><span ng-bind=\"_t('current_firmware')\"></span>: {{firmwareUpdate.softwareCurrentVersion}}</p><div class=form-group><bb-help-text trans=\"_t('firmware_update_info')\"></bb-help-text></div></fieldset><fieldset class=submit-entry><button type=button class=\"btn btn-submit\" title=\"{{_t('update_to_latest')}}\" ng-click=\"setAccess('?allow_access=1',true);handleModal('firmwareUpdateModal', $event)\"><i class=\"fa fa-level-up\"></i> <span class=btn-name>{{_t('update_to_latest')}} ({{firmwareUpdate.softwareLatestVersion}})</span></button></fieldset></form><div id=firmwareUpdateModal class=\"appmodal appmodal-100\" ng-if=\"modalArr.firmwareUpdateModal && firmwareUpdate.show\"><div class=appmodal-in><div class=appmodal-header><span class=appmodal-close ng-click=\"setAccess('?allow_access=0');handleModal('firmwareUpdateModal', $event)\"><i class=\"fa fa-times\"></i></span><h3>{{_t('nav_firmware_update')}}</h3></div><div class=\"appmodal-body text-center\"><iframe ng-src={{firmwareUpdate.url}} height=600 style=\"width: 100%\" ng-if=firmwareUpdate.loaded></iframe></div></div></div></div>"
  );


  $templateCache.put('app/views/settings/settings_installer.html',
    "<div class=page-header><h1>{{_t('settings')}}</h1></div><div class=accordion-entry ng-include=\"'app/views/settings/settings_lang.html'\"></div><div class=accordion-entry ng-include=\"'app/views/settings/settings_app.html'\"></div><div class=accordion-entry ng-include=\"'app/views/settings/settings_firmware.html'\"></div>"
  );


  $templateCache.put('app/views/settings/settings_lang.html',
    "<h2 class=\"accordion-entry-title expanded-only_\" ng-init_=\"expandElement('settingsLang')\" ng-click=\"expandElement('settingsLang')\"><i class=\"fa fa-globe\"></i> {{_t('language')}} <i class=\"fa accordion-arrow\" ng-class=\"expand.settingsLang  ? 'fa-chevron-up':'fa-chevron-down'\"></i></h2><div class=accordion-entry-ctrl ng-class=\"\" ng-if=expand.settingsLang ng-controller=SettingsLangController><div class=form-page><div class=\"fieldset settings-lang\"><a href=\"\" title={{v}} ng-repeat=\"v in lang_list\" ng-click=setLang(v) ng-class=\"v === lang ? 'active': ''\"><img ng-src=app/images/flags/{{v}}.png alt=\"{{ v }}\"></a></div></div></div>"
  );


  $templateCache.put('app/views/test.html',
    "<div><h1>Test page</h1></div>"
  );

}]);
