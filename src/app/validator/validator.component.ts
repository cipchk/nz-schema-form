import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ObjectProperty } from '../../../lib/src/model/objectproperty';

@Component({
    selector: 'app-validator',
    templateUrl: './validator.component.html'
})
export class ValidatorComponent implements OnInit {
    aceOptions: any = {
        fontSize: '16px'
    };

    schemaStr: any;
    modelStr: any;
    actionsStr = `actions = {
    send: (form: ObjectProperty) => {
        this.msg.success(JSON.stringify(form.value));
    },
    reset: (form: ObjectProperty) => {
        form.reset({});
    }
};`;

    schema: any;
    model: any;
    layout = 'vertical';
    actions = {
        send: (form: ObjectProperty) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: ObjectProperty) => {
            form.reset({});
        }
    };
    value: any;

    constructor(private msg: NzMessageService) {
        this.schemaStr = require('!!raw-loader!../sampleschema.json');
        this.modelStr = require('!!raw-loader!../samplemodel.json');
    }

    ngOnInit(): void {
        this.run();
    }

    private parseJson(value: string) {
        try {
            return JSON.parse(value);
        } catch (ex) {
            this.msg.error(`parse json get error, ${ex}`);
            console.log(ex);
        }
        return null;
    }

    run() {
        const s = this.parseJson(this.schemaStr);
        const m = this.parseJson(this.modelStr);
        if (!s || !m) return ;
        console.log('run', s, m);
        this.schema = s;
        this.model = m;
    }
}
