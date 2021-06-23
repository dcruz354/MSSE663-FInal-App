import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.css']
})
export class OrderHomeComponent implements OnInit {

  newOrderForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.newOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      numberOfHoles: ['', Validators.required],
      size: ['', Validators.required]
    })
  }

  get field() {
    return this.newOrderForm.controls;
  }

  savings: number;

  calculateSavings(): number {
    let stringToConvertNumberOfHoles = this.field.numberOfHoles.value;
    let stringToConvertSize = this.field.size.value;

    if(!isNaN(Number(stringToConvertNumberOfHoles)) && !isNaN(Number(stringToConvertSize))){
      let numberValueNumberOfHoles = Number(stringToConvertNumberOfHoles);
      let numberValueSize = Number(stringToConvertSize);

      if(numberValueSize === 2){
        this.savings = numberValueNumberOfHoles * .5;
      } else {
        this.savings = numberValueNumberOfHoles * .75;
      }
      
    } else{
        console.log('Not a Number');
    }

    return this.savings;
  }

  addOrder() {
    this.submitted = true;
    if(this.newOrderForm.invalid) {
      return;
    }

    this.loading = true;
    let sav = this.calculateSavings();

    let stringToConvertNumberOfHoles = this.field.numberOfHoles.value;
    let stringToConvertSize = this.field.size.value;

    let numberValueNumberOfHoles = 0;
    let numberValueSize = 0;

    if(!isNaN(Number(stringToConvertNumberOfHoles)) && !isNaN(Number(stringToConvertSize))){
      numberValueNumberOfHoles = Number(stringToConvertNumberOfHoles);
      numberValueSize = Number(stringToConvertSize);      
    } else{
        console.log('Not a Number');
    }


    this.orderService.saveOrder(
      this.field.title.value,
      numberValueNumberOfHoles,
      sav,
      numberValueSize
    )
    .pipe(first())
    .subscribe(
      data => {
        window.alert('New order added');
        window.location.reload();
        //this.router.navigate([]);
      },
      error => { this.error;
        this.loading = false;
      }
    )
  }

}
