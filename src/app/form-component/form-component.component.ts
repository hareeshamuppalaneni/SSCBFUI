import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  availableAccounts: IAvailableAccounts[] = [];
  showReadOnlyForm: boolean = false;
  cbfForm: FormGroup;
  accNum: string;
  showErrorMessage = false;
  errorMessage: string = '';

  onSubmit() {
    
  }

  constructor(private fb: FormBuilder,
    private dataService: DataService, private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.accNum = params['accNum'];
        if(!this.accNum) {
          console.log('Defaulting accNum to : 09')
          this.accNum = '09';
        }
      });
  }

  handleCancel(){
    this.formInitialize(this.fb);
    this.showReadOnlyForm = false;
    this.showReadOnlyForm = false;
  }

  handleContinue(){
    this.disableForm();
    this.showReadOnlyForm = true;
  }

  handleMakeTransfer(){
    //TODO
  }

  ngOnInit(): void {
    this.showReadOnlyForm = false;
    this.dataService.getAccounts(this.accNum).subscribe(resp => {
      console.log(resp);
      if(resp.accounts){
        for(var i=0; i<resp.accounts.length ; i++) {
          var inputObj = {} as IAvailableAccounts;
          inputObj.label = resp.accounts[i].accountNumer+ '-' +resp.accounts[i].productDescription + '-' + resp.accounts[i].availableBalance ;
          inputObj.value = resp.accounts[i].accountNumer;
          this.availableAccounts.push(inputObj);
        }
      }
    },
    err => {
      console.log(err);
      this.showErrorMessage = true;
      this.errorMessage = err.error.statusHeader['statusDesc'];
    });
    this.formInitialize(this.fb);
  }

  formInitialize(fb) {
    this.cbfForm = this.fb.group({
      memberName: fb.control(''),
      streetAddress: fb.control(''),
      zipCode: fb.control(''),
      cardNumber: fb.control(''),
      expirationDate: fb.control(''),
      securityCode: fb.control(''),
      amount: fb.control(''),
      navyFederalAccNum: fb.control('')
    });
  }

  disableForm() {
    this.cbfForm.disable();
  }

}

export interface IAvailableAccounts {
  label: string,
  value: string
}
