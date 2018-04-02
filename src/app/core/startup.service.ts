import { Injectable } from '@angular/core';
import { NzI18nService, zh_CN } from 'ng-zorro-antd';

@Injectable()
export class StartupService {
    constructor(private nzI18nService: NzI18nService) { }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nzI18nService.setLocale(zh_CN);
            resolve(null);
        });
    }
}
