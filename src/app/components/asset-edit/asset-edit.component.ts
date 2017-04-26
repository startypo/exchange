import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetModel } from '../../models/asset.model';
import { AssetService } from '../../services/asset.service';

@Component({
    selector: 'asset-edit',
    templateUrl: 'asset-edit.component.html',
    styleUrls: ['asset-edit.component.css']
})

export class AssetEditComponent implements OnInit {

    public model: AssetModel = new AssetModel();
    public form: FormGroup;

    constructor (private service: AssetService, private fb: FormBuilder) {}

    public ngOnInit(): void {

        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            imgs: ['']
        });
    }

    public onSubmit(asset) {

        this.service.create(this.model).subscribe((res) => console.log(res), (err) => console.log(err));
    }
}
