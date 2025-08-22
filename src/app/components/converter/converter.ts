import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Currency } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency-service';

@Component({
  selector: 'app-converter',
  imports: [FormsModule, CommonModule],
  templateUrl: './converter.html',
  styleUrl: './converter.css',
})
export class Converter implements OnInit {
  amount: number = 1;
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';

  result: number = 0;
  rate: number = 0;
  isLoading: boolean = false;

  isFromDropdownOpen: boolean = false;
  isToDropdownOpen: boolean = false;

  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getSupportedCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  convert() {
    this.isLoading = true;

    this.currencyService.convertCurrency(this.amount, this.fromCurrency, this.toCurrency).subscribe({
      next: (response => {
        this.result = response.convertedAmount;
        this.rate = response.exchangeRate;
        this.isLoading = false;
      }),
      error: (error) => {
        console.error('Erro:', error);
        this.isLoading = false;
      }
    });
  }

  swap() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }


  getCurrencyFlag(currencyCode: string): string {
    const currency = this.currencies.find(c => c.code === currencyCode);
    return currency?.flag || 'https://flagcdn.com/w640/us.png';
  }

  toggleFromDropdown() {
    this.isFromDropdownOpen = !this.isFromDropdownOpen;
    this.isToDropdownOpen = false;
  }

  toggleToDropdown() {
    this.isToDropdownOpen = !this.isToDropdownOpen;
    this.isFromDropdownOpen = false;
  }

  selectFromCurrency(currencyCode: string) {
    this.fromCurrency = currencyCode;
    this.isFromDropdownOpen = false;
  }

  selectToCurrency(currencyCode: string) {
    this.toCurrency = currencyCode;
    this.isToDropdownOpen = false;
  }
}
