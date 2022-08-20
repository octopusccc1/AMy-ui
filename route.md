# 前端路由整理

## 基础服务

### 目前路由

| 名称     |                                路由                                 | 级  |   父节点 |
| :------- | :-----------------------------------------------------------------: | :-: | -------: |
| 数据管理 |                                  -                                  |  0  |        - |
| 基础数据 |                                  -                                  |  1  | 数据管理 |
| 路线管理 |               /main/data-manage/base-data/path-manage               |  2  | 基础数据 |
| 路段     |    /main/data-manage/base-data/road-section-manage/road-section     |  2  | 基础数据 |
| 路基路面 |  /main/data-manage/base-data/road-section-manage/roadbed-pavement   |  2  | 基础数据 |
| 桥涵     |   /main/data-manage/base-data/road-section-manage/bridge-culvert    |  2  | 基础数据 |
| 隧道     |       /main/data-manage/base-data/road-section-manage/tunnel        |  2  | 基础数据 |
| 服务区   |    /main/data-manage/base-data/road-section-manage/service-area     |  2  | 基础数据 |
| 收费站   |      /main/data-manage/base-data/road-section-manage/toll-gate      |  2  | 基础数据 |
| 枢纽     | /main/data-manage/base-data/road-section-manage/hub-interconnection |  2  | 基础数据 |
| 交安设施 |   /main/data-manage/base-data/road-section-manage/traffic-safety    |  2  | 基础数据 |
| 其他     |        /main/data-manage/base-data/road-section-manage/other        |  2  | 基础数据 |
| 角色管理 |                       /main/user/role-manage                        |  2  | 基础数据 |
| 用户管理 |                       /main/user/user-manage                        |  2  | 基础数据 |

## 重点车辆管理系统

### 目前路由

| 名称               |         路由         | 级  |   父节点 |
| :----------------- | :------------------: | :-: | -------: |
| 预警列表           |          /           |  0  |        - |
| 过车记录           |     /passRecord      |  0  |        - |
| 统计报表           |    /MountFlowList    |  0  |        - |
| 卡口布控           |  /checkpointControl  |  0  |        - |
| 车辆档案           |    /vehicleFiles     |  0  |        - |
| 基础管理           |        /basic        |  0  |        - |
| 卡口预警           | /checkpointForewarn  |  1  | 预警列表 |
| 交通事件           |       /Traffic       |  1  | 预警列表 |
| 卡口流量统计       |      /MountFlow      |  1  | 统计报表 |
| 交通参数统计       | /parameterStatistics |  1  | 统计报表 |
| 组织机构管理       |         /org         |  1  | 基础管理 |
| 卡口管理           |     /checkpoint      |  1  | 基础管理 |
| 车道管理           |        /lane         |  1  | 基础管理 |
| 第三方卡口平台管理 |        /third        |  1  | 基础管理 |

## 闪马智慧高速运营

### 目前路由

| 名称         |               路由               | 级  |       父节点 |
| :----------- | :------------------------------: | :-: | -----------: |
| 系统首页     |     /monitor/highSpeedEvents     |  0  |            - |
| 运行动态统计 |             /events              |  0  |            - |
| 视频监控     |          /videoMonitor           |  0  |            - |
| 交通管制     |             /manage              |  0  |            - |
| 施工养护     |          /construction           |  0  |            - |
| 基础管理     |              /basic              |  0  |            - |
| 事件档案     |           /events/list           |  1  | 运行动态统计 |
| 事件统计     |  /events/eventsStatistics/list   |  1  | 运行动态统计 |
| 交参统计     | /events/parameterStatistics/list |  1  | 运行动态统计 |
| 视频巡查     |            /videoScan            |  1  |     视频监控 |
| 交通管制管理 |         /manage/traffic          |  1  |     交通管制 |
| 施工计划管理 |  /construction/constructionPlan  |  1  |     施工养护 |
| 道路设施管理 |      /basic/facilities/list      |  1  |     基础管理 |
| 日历维护     |      /basic/calendarManage       |  1  |     基础管理 |

## 闪马智慧高速运营 oldMenus

### 目前路由

| 名称             |                 路由                 | 级  |           父节点 |
| :--------------- | :----------------------------------: | :-: | ---------------: |
| 查询统计         |               /events                |  0  |                - |
| 设施管理         |             /facilities              |  0  |                - |
| 决策辅助系统     |             /decisionAid             |  0  |                - |
| 免费通行日历     |         /freeAccessCalendar          |  0  |                - |
| 应急事件处置中心 |               /manage                |  0  |                - |
| 出行信息服务     |             /infoService             |  0  |                - |
| 风险源监测       |             /riskMonitor             |  0  |                - |
| 交通事件查询     |             /events/list             |  1  |         查询统计 |
| 交通事件统计     |    /events/eventsStatistics/list     |  1  |         查询统计 |
| 拥堵成因分析     |    /events/congestionReason/list     |  1  |         查询统计 |
| 交通参数统计     |   /events/parameterStatistics/list   |  1  |         查询统计 |
| 主线拥堵统计     |      /events/jamStatistics/list      |  1  |         查询统计 |
| 道路设施         |           /facilities/list           |  1  |         设施管理 |
| 车辆来源地分析   |     /decisionAid/carOriginReason     |  1  |     决策辅助系统 |
| 拥堵热力分析     |    /decisionAid/congestionHeatMap    |  1  |     决策辅助系统 |
| 事件热力分析     |      /decisionAid/eventsHeatMap      |  1  |     决策辅助系统 |
| 日历维护         | /freeAccessCalendar/freePassCalendar |  1  |     免费通行日历 |
| 交通管制         |           /manage/traffic            |  1  | 应急事件处置中心 |
| 施工管理         |         /manage/construction         |  1  | 应急事件处置中心 |
| 电子地图         |    /infoService/electronMap/list     |  1  |     出行信息服务 |
| 信息发布         |    /infoService/infoRelease/list     |  1  |     出行信息服务 |
| 节目管理         |   /infoService/programManage/list    |  1  |     出行信息服务 |
| 系统维护         |   /infoService/sysMaintenance/list   |  1  |     出行信息服务 |
| 危化品车辆管控   |          /riskMonitor/list           |  1  |       风险源监测 |

## 闪马应急事件处置平台

### 目前路由

| 名称             |                路由                 | 级  |   父节点 |
| :--------------- | :---------------------------------: | :-: | -------: |
| 处置中心         |               /manage               |  0  |        - |
| 当班管理         |                /duty                |  0  |        - |
| 统计中心         |             /statistics             |  0  |        - |
| 实时动态         |    /manage/eventAndWorkOrder/map    |  1  | 处置中心 |
| 车辆轨迹         | /manage/eventAndWorkOrder/mapDetail |  1  | 处置中心 |
| 事件处置         |      /manage/eventAndWorkOrder      |  1  | 处置中心 |
| 快处快撤         |       /manage/retreatQuickly        |  1  | 处置中心 |
| 冲卡查卡         |          /manage/rushCheck          |  1  | 处置中心 |
| 施救车辆管理     |      /manage/rescueVehicleMgt       |  1  | 处置中心 |
| 一岗双职         |         /manage/doublePosts         |  1  | 处置中心 |
| 交通管制         |           /manage/traffic           |  1  | 处置中心 |
| 施工管理         |        /manage/construction         |  1  | 处置中心 |
| 客户投诉         |          /duty/complaints           |  1  | 当班管理 |
| 当班统计         |           /duty/statistic           |  1  | 当班管理 |
| 排班管理         |         /duty/schedulingMgt         |  1  | 当班管理 |
| 值班人员         |         /duty/onDutyPerson          |  1  | 当班管理 |
| 当班日志         |           /duty/onDutyLog           |  1  | 当班管理 |
| 清障施救统计     |      /statistics/removeRescue       |  1  | 统计中心 |
| 施救时间统计     |       /statistics/rescueTime        |  1  | 统计中心 |
| 交通事故统计     |     /statistics/trafficAccident     |  1  | 统计中心 |
| 各类事件统计     |        /statistics/allEvents        |  1  | 统计中心 |
| 月度拖车统计     |     /statistics/monthlyTrailer      |  1  | 统计中心 |
| 每公里拖车统计   |     /statistics/perKiloTrailer      |  1  | 统计中心 |
| 每日清障统计     |       /statistics/dailyClean        |  1  | 统计中心 |
| 拖车施救统计     |       /statistics/freeRescue        |  1  | 统计中心 |
| 预警时间统计     |       /statistics/warningTime       |  1  | 统计中心 |
| 抛洒物次数统计   |        /statistics/otherData        |  1  | 统计中心 |
| 路段施救统计     |       /statistics/roadRescue        |  1  | 统计中心 |
| 2-4 小时事故统计 |      /statistics/hourAccident       |  1  | 统计中心 |
| 事故统计汇总     |  /statistics/accidentCountSummary   |  1  | 统计中心 |
| 收费站管制统计   |       /statistics/tollControl       |  1  | 统计中心 |
| 月报分析         |   /statistics/monthReportAnalyse    |  1  | 统计中心 |
| 事故月报表       |   /statistics/monthAccidentReport   |  1  | 统计中心 |
| 封道管制汇总     |   /statistics/roadClosureSummary    |  1  | 统计中心 |
| 当班记录统计     |        /statistics/onDutyLog        |  1  | 统计中心 |
| 天气情况统计     |         /statistics/weather         |  1  | 统计中心 |
| 简易事故统计     |     /statistics/simpleAccident      |  1  | 统计中心 |

## 路网运营监控系统

### 目前路由

| 名称     |   路由   | 级  |   父节点 |
| :------- | :------: | :-: | -------: |
| 视频监控 | /monitor |  0  |        - |
| 电子巡查 | /patrol  |  1  | 视频监控 |

## 应急处置小程序

### 目前路由

| 名称 |           路由            | 级  | 父节点 |
| :--- | :-----------------------: | :-: | -----: |
| 工单 | /pages/event/index/index  |  0  |      - |
| 日报 | /pages/report/index/index |  0  |      - |
