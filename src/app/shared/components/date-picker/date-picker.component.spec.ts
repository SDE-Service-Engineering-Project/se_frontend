import { ComponentFixture } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbDate,
  NgbDatepickerI18n,
  NgbDatepickerI18nDefault,
  NgbInputDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let spectator: Spectator<DatePickerComponent>;
  let calender: NgbCalendar;
  let toEmitSpy: jest.SpyInstance;
  let fromEmitSpy: jest.SpyInstance;
  let date: NgbDate;

  const createComponent = createComponentFactory({
    component: DatePickerComponent,
    imports: [NgbInputDatepicker, FormsModule],
    providers: [
      {
        provide: NgbCalendar,
        useClass: NgbCalendarGregorian,
      },
      {
        provide: NgbDatepickerI18n,
        useClass: NgbDatepickerI18nDefault,
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    fixture = spectator.fixture;
    calender = spectator.inject(NgbCalendar);
  });

  it('should render the component', () => {
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  describe('onDateSelection', () => {
    beforeEach(() => {
      date = new NgbDate(2021, 1, 1);
      toEmitSpy = jest.spyOn(component.endDate, 'emit');
      fromEmitSpy = jest.spyOn(component.startDate, 'emit');
    });

    it('should set fromDate and toDate to the date and emit them', () => {
      component.fromDate = null;
      component.toDate = null;
      component.onDateSelection(date);
      expect(component.fromDate).toEqual(date);
      expect(component.toDate).toEqual(date);
      expect(toEmitSpy).toHaveBeenCalledWith(date);
      expect(fromEmitSpy).toHaveBeenCalledWith(date);
    });

    it('should set the toDate to the date and emit the endDate', () => {
      component.fromDate = new NgbDate(2020, 1, 1);
      component.toDate = null;
      component.onDateSelection(date);
      expect(component.toDate).toEqual(date);
      expect(toEmitSpy).toHaveBeenCalledWith(date);
      expect(fromEmitSpy).not.toHaveBeenCalledWith(date);
    });

    it('should set the fromDate to the date and emit the startDate', () => {
      component.onDateSelection(date);
      expect(component.toDate).toEqual(null);
      expect(component.fromDate).toEqual(date);
      expect(fromEmitSpy).toHaveBeenCalledWith(date);
      expect(toEmitSpy).not.toHaveBeenCalledWith(date);
    });
  });

  describe('date picker properties', () => {
    let fromDate: NgbDate;
    let toDate: NgbDate;

    beforeEach(() => {
      fromDate = new NgbDate(2020, 1, 1);
      toDate = new NgbDate(2020, 1, 5);
    });

    it('should set isInside to true if the toDate is defined and is inside the possible range', () => {
      component.fromDate = fromDate;
      component.toDate = toDate;
      expect(component.isInside(new NgbDate(2020, 1, 3))).toEqual(true);
    });

    it('should set isHovered to false if the date is after the fromDate', () => {
      component.fromDate = fromDate;
      expect(component.isHovered(new NgbDate(2020, 1, 2))).toEqual(false);
    });

    it('should set isHovered to true if fromDate is defined, toDate is false, hoverDate is defined, the date is after fromDate and before hoverDate', () => {
      component.fromDate = fromDate;
      component.toDate = null;
      component.hoveredDate = new NgbDate(2020, 1, 10);
      expect(component.isHovered(new NgbDate(2020, 1, 3))).toEqual(true);
    });

    it('should set isRange to true if the date is equal to fromDate', () => {
      component.fromDate = fromDate;
      expect(component.isRange(date)).toEqual(true);
    });

    it('should set isRange to false if all conditions are not met', () => {
      date = new NgbDate(2020, 2, 1);
      expect(component.isRange(date)).toEqual(false);
    });

    it('should set isRange to true if the date is equal to toDate', () => {
      component.toDate = toDate;
      expect(component.isRange(toDate)).toEqual(true);
    });

    it('should set isInside to false if the toDate is defined but is outside the possible range', () => {
      component.fromDate = fromDate;
      component.toDate = toDate;
      expect(component.isInside(new NgbDate(2020, 1, 6))).toEqual(false);
    });

    it('should validate and parse the date and return the input as a NgbDate', () => {
      const input = '2021-01-01';
      const parsed = component.formatter.parse(input);
      expect(component.validateInput(fromDate, input)).toEqual(
        NgbDate.from(parsed)
      );
    });

    it('should validate and parse the date and return the currentValue', () => {
      expect(component.validateInput(fromDate, '')).toEqual(fromDate);
    });
  });
});
