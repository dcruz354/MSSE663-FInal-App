import { first } from 'rxjs/operator';
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

  calculateSavings() {
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
  }

  addOrder() {
    this.submitted = true;
    if(this.newOrderForm.invalid) {
      return;
    }

    this.loading = true;
    this.calculateSavings();

    this.orderService.saveOrder(
      this.field.title.value,
      this.field.numberOfHoles.value,
      this.savings,
      this.field.size.value
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
