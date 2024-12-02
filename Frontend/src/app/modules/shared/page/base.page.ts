import { Component } from '@angular/core';
import { ISection } from './interfaces';


@Component({
  selector: 'tp-base-page',
  template: '',
  styleUrls: ['./base.page.scss'],
})
export class BasePage {
  protected title?: string;
  protected breadcrumbs?: string;

  protected headerSection?: ISection;
  protected mainSections?: ISection[];
  protected asideSections?: ISection[];
  protected footerSection?: ISection;

  public static template = `
    <header class="page__header">
      <ndc-dynamic *ngIf="headerSection"
        [ndcDynamicComponent]="headerSection.component"
        [ndcDynamicInputs]="headerSection.inputs ? headerSection.inputs : {}"
        [ndcDynamicOutputs]="headerSection.outputs ? headerSection.outputs : {}"
        [ndcDynamicAttributes]="headerSection.attributes ? headerSection.attributes : {}"
      ></ndc-dynamic>
    </header>

    <div [className]="asideSections ? 'page__wrapper' : 'page__wrapper page__wrapper_without-aside'">

      <header class="page__subheader" *ngIf="title || breadcrumbs">
        <p class="page__breadcrumbs">{{breadcrumbs}}</p>
        <h1 class="page__title">{{title}}</h1>
      </header>

      <main class="page__main" *ngIf="mainSections">
        <section
          *ngFor="let section of mainSections"
          [className]="section.borderless ? 'page__section page__section_borderless' : 'page__section'"
        >
          <h2 class="page__subtitle" *ngIf="section.title">{{section.title}}</h2>
          <ndc-dynamic
            [ndcDynamicComponent]="section.component"
            [ndcDynamicInputs]="section.inputs ? section.inputs : {}"
            [ndcDynamicOutputs]="section.outputs ? section.outputs : {}"
            [ndcDynamicAttributes]="section.attributes ? section.attributes : {}"
          ></ndc-dynamic>
        </section>
      </main>

      <aside class="page__aside" *ngIf="asideSections">
        <section
          *ngFor="let section of asideSections"
          [className]="section.borderless ? 'page__section page__section_borderless' : 'page__section'"
        >
          <h2 class="page__subtitle" *ngIf="section.title">{{section.title}}</h2>
          <ndc-dynamic
            [ndcDynamicComponent]="section.component"
            [ndcDynamicInputs]="section.inputs ? section.inputs : {}"
            [ndcDynamicOutputs]="section.outputs ? section.outputs : {}"
            [ndcDynamicAttributes]="section.attributes ? section.attributes : {}"
          ></ndc-dynamic>
        </section>
      </aside>

    </div>

    <footer class="page__footer">
      <ndc-dynamic *ngIf="footerSection"
        [ndcDynamicComponent]="footerSection.component"
        [ndcDynamicInputs]="footerSection.inputs ? footerSection.inputs : {}"
        [ndcDynamicOutputs]="footerSection.outputs ? footerSection.outputs : {}"
        [ndcDynamicAttributes]="footerSection.attributes ? footerSection.attributes : {}"
      ></ndc-dynamic>
    </footer>
  `;

  constructor() {}
}
