"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergenciesModule = void 0;
const common_1 = require("@nestjs/common");
const emergencies_service_1 = require("./emergencies.service");
const emergencies_controller_1 = require("./emergencies.controller");
const notifications_module_1 = require("../notifications/notifications.module");
let EmergenciesModule = class EmergenciesModule {
};
exports.EmergenciesModule = EmergenciesModule;
exports.EmergenciesModule = EmergenciesModule = __decorate([
    (0, common_1.Module)({
        imports: [notifications_module_1.NotificationsModule],
        controllers: [emergencies_controller_1.EmergenciesController],
        providers: [emergencies_service_1.EmergenciesService],
    })
], EmergenciesModule);
//# sourceMappingURL=emergencies.module.js.map