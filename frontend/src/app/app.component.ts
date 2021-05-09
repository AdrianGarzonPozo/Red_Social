import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'frontend';

  constructor() { }

  ngOnInit() {
    if (!localStorage.getItem("x-access-token") && !localStorage.getItem("usuario")) {
      $(".breadcrumbs").hide();
      $(".tl-menu").hide();
      $(".tl-menu-pc").hide();
    } else {
      $(".breadcrumbs").show();
      const ventana = $(window).width();
      if (ventana <= 415) {
        $(".tl-menu").show();
      } else {
        $(".tl-menu-pc").show();
      }
    }
  }

}