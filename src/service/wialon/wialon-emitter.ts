import { EventEmitter, Injectable } from '@angular/core';

/**
 * This service is for emitting filtered data in account-feed
 * @class AccountFeedFilterService
 */

@Injectable()
export class WialonFilterService {

    static isCreating: Boolean = false;
    static instance: WialonFilterService;
    filterDataEvent: EventEmitter<any> = new EventEmitter();

    static getInstance() {
        if (WialonFilterService.instance == null) {
            WialonFilterService.isCreating = true;
            WialonFilterService.instance = new WialonFilterService();
            WialonFilterService.isCreating = false;
        }
        return WialonFilterService.instance;
    }

    /**
     * Emits filter text entered in account-filter component
     * to account-history and notification component
     */

    sendData(data: any): void {
        this.filterDataEvent.emit(data);
    }
}
