import {GraphService} from "./services/graph.service";
import {SettingsInitUtil} from "./utils/settings-init.util";
import {DataUtil} from "./utils/data.util";

import "../scss/stili.scss";

GraphService.initializeGoogleCharts();
SettingsInitUtil.initializeEventListeners("minutes-setting");
DataUtil.getDataAndDrawGraphs();
DataUtil.getExtremesAndDisplay();
