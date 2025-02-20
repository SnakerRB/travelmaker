import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-trip',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.css'
})
export class NewTripComponent implements OnInit{

  ngOnInit(): void {
      
  }
}
