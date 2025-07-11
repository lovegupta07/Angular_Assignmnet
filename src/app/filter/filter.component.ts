import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  roles: string[] = ['Admin', 'Editor', 'Viewer'];
  selectedRole: string = '';
  fromDate: string = '';
  toDate: string = '';

  // Emit close event to parent
  @Output() close = new EventEmitter<void>();

  applyFilter() {
    const filterData = {
      role: this.selectedRole,
      fromDate: this.fromDate,
      toDate: this.toDate
    };
    console.log('Filter applied:', filterData);
    this.close.emit(); 
  }

  closeFilter() {
    this.close.emit();
  }
}