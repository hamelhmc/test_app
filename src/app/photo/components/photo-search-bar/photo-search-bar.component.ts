import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-photo-search-bar',
  templateUrl: './photo-search-bar.component.html',
  styleUrls: ['./photo-search-bar.component.css'],
})
export class PhotoSearchBarComponent implements OnInit {
  searchForm: FormGroup;
  @Output() initialSearchTextChange = new EventEmitter<string>();
  @Input() initialSearchText = '';

  constructor(private readonly fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: [this.initialSearchText],
    });
  }

  ngOnInit(): void {
    this.searchForm.get('searchText')?.valueChanges.subscribe((value) => {
      this.initialSearchTextChange.emit(value);
    });
  }

  clearSearch(): void {
    this.searchForm.get('searchText')?.setValue('');
  }
}
