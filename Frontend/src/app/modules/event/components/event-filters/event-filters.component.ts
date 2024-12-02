import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FindOptionsService } from '../../filters.service';

@Component({
  selector: 'tp-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})

export class EventFiltersComponent implements OnInit {
  isBusiness: boolean = false;
  isPolitics: boolean = false;
  isPsychology: boolean = false;
  isHobbies: boolean = false;

  isConference: boolean = false;
  isLecture: boolean = false;
  isWorkshop: boolean = false;
  isFest: boolean = false;

  constructor(private findOptionsService: FindOptionsService) { }

  changeFilter() {
    let categories: number[] = []
    this.isBusiness && categories.push(9)
    this.isPolitics && categories.push(11)
    this.isPsychology && categories.push(12)
    this.isHobbies && categories.push(10)

    let formats: number[] = []
    this.isConference && formats.push(1)
    this.isLecture && formats.push(2)
    this.isWorkshop && formats.push(3)
    this.isFest && formats.push(4)
    this.findOptionsService.setFilters([categories[0] ? categories [0] : 0, formats[0] ? formats[0] : 0])
  }

  ngOnInit(): void {
    this.findOptionsService.setFilters([])
  }

}
