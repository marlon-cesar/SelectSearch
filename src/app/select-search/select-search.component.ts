import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, distinctUntilChanged, debounceTime } from 'rxjs';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit {

  @Output("elementSelected") elementSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output("getElements") getElements: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  isLoading: boolean = false;

  @Input() placeholder: string = '';

  @Input() elements: Observable<any[]> | undefined;
  @Input() needSelection: boolean = true;
  @Input() selectedElement: any;

  error: string = '';

  constructor(private _formBuilder: FormBuilder) {

    this.form = this._formBuilder.group({
      userInput: [undefined]
    })
  }

  ngAfterViewInit(): void {
    this.form.get('userInput')?.setValue(this.selectedElement);
  }

  ngOnInit() {
    this.form
      .get('userInput')!.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
      ).subscribe(c => this.getElements.emit(c));

  }

  displayFn(value: any) {
    return value ? value.name : '';
  }

  selectElement(element: any) {
    this.selectedElement = element;
    this.elementSelected.emit(element);
    if (!this.needSelection)
      this.form.get('userInput')!.setValue('');
  }

  setError(error: string) {
    this.error = error;
  }

  filtrar(target: any) {
    if (!target.value && (!this.needSelection || !this.selectedElement)) {
      this.getElements.emit('');
    }
  }

}
