import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePostsComponent } from './see-posts.component';

describe('SeePostsComponent', () => {
  let component: SeePostsComponent;
  let fixture: ComponentFixture<SeePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
