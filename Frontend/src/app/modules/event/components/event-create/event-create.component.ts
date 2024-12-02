import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { ICategory } from '@app/modules/shared/entities';
import { FormGroup, FormControl } from '@angular/forms';
import { ICreateEvent } from '@app/modules/shared/create-entities';
import { CompanyService } from '@app/modules/core/company.service';

@Component({
  selector: 'tp-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})

export class EventCreateComponent implements OnInit {
  categories: ICategory[] = []
  choosenCategory!: number
  choosenFormat!: number
  companyId!: number
  choosenFormatName: string = ""
  choosenCategoryName: string = ""

  profileForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    ticketCount: new FormControl(),
    ticketPrice: new FormControl(),
    date: new FormControl()
  });

  ShowList(id: string) {
    let x = document.getElementById(id);

    console.log(id)
    if (x?.className === "event-create__list-" + id) {
      x.className += " responsive";
    }
    else if (x?.className) {
        x.className = "event-create__list-" + id;
    }
  }


  ChooseCategory(category: number, name: string) {
    this.choosenCategory = category
    this.choosenCategoryName = name
    let x = document.getElementById("category");

    if (x?.className) {
      x.className = "event-create__list-category";
    }
  }

  ChooseFormat(format: number, name: string) {
    this.choosenFormat = format
    this.choosenFormatName = name
    let x = document.getElementById("format");

    if (x?.className) {
      x.className = "event-create__list-format";
    }
  }

  onSubmit() {
    let newEvent: ICreateEvent = {
      company_id: this.companyId,
      category_id: this.choosenCategory,
      name: this.profileForm.value.title ? this.profileForm.value.title : "",
      description: this.profileForm.value.content ? this.profileForm.value.content : "",
      format: this.choosenFormat,
      ticket_count: this.profileForm.value.ticketCount,
      ticket_price: this.profileForm.value.ticketPrice,
      date: this.profileForm.value.date
    }

    console.log(newEvent)

    this.eventService.createEvent(newEvent)
  }


  constructor(private eventService: EventService, private companyService: CompanyService) { }

  ngOnInit(): void {
    //this.eventService.getCategories().subscribe((categories) => this.categories = categories)
    this.companyService.Company().subscribe((company) => this.companyId = company.id)
  }

}
