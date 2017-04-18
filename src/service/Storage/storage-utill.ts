'use strict';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageUtility {
    constructor(private storage: Storage) {

    }

    setJwtInStorage(jwt: string): Promise<string> {
        return this.storage.set('auth_token', jwt);
    }

    getJwtFromStorage(): Promise<string> {
        return this.storage.get('auth_token');
    }

    isJwtInStorage(): boolean {
        console.log(this.storage.keys());
        return true;
    }
    clearStorage(): Promise<boolean> {
        return this.storage.clear();
    }


    setAllUnit(allUnit: any): Promise<any> {
        return this.storage.set('allUnit', allUnit);
    }

    getAllUnit(): Promise<any> {
        return this.storage.get('allUnit');
    }

    setUnitFuelReport(report: any, unitID: any): Promise<any> {
        return this.storage.set(unitID, report);
    }

    getUnitFuelReport(unitID: any): Promise<any> {
        return this.storage.get(unitID);
    }


    setUnitAvgFuelReport(report: any, unitID: any): Promise<any> {
        return this.storage.set(unitID, report);
    }

    getUnitAvgFuelReport(unitID: any): Promise<any> {
        return this.storage.get(unitID);
    }
}