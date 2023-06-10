import { Component, OnInit } from "@angular/core";

import { MoviesService } from "../content/services/movies.service";
import { OnTVService } from "../content/services/onTV.service";
import { SeoService } from "../../core/services/seo.service";
import SwiperCore, { Pagination, SwiperOptions } from "swiper";
import { take } from "rxjs/operators";
import { MovieModel } from "../content/models/movie.model";
import { TvModel } from "../content/models/tv.model";
import { SeriesModel } from "../content/models/series.model";
import { DatabaseService } from "../content/services/database.service";

SwiperCore.use([Pagination]);

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 2.3,
    spaceBetween: 20,
    navigation: true,
    watchSlidesProgress: true,
    grabCursor: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      992: {
        slidesPerView: 6.3,
        spaceBetween: 20,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      768: {
        slidesPerView: 4.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      576: {
        slidesPerView: 3.3,
        spaceBetween: 15,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
      320: {
        slidesPerView: 2.3,
        spaceBetween: 10,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
      },
    },
  };

  movieTabList = ["Now playing", "Upcoming", "Popular"];
  moviesList: Array<MovieModel> = [];
  selectedMovieTab = 0;

  tvShowsTabList = ["All"];
  tvShowsList: Array<TvModel> = [];
  selectedTVTab = 0;

  seriesList: Array<SeriesModel> = [];

  constructor(
    private moviesService: MoviesService,
    private onTvService: OnTVService,
    private seo: SeoService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.getMovies("now_playing", 1);
    this.getTVShows("airing_today", 1);
    this.getSeries();
  }

  tabChange(event) {
    this.selectedMovieTab = event.index;
    if (event.index === 0) {
      this.getMovies("now_playing", 1);
    } else if (event.index === 1) {
      this.getMovies("upcoming", 1);
    } else if (event.index === 2) {
      this.getMovies("popular", 1);
    }
  }

  getMovies(type: string, page: number): void {
    this.moviesService
      .getMovies(type, page)
      .pipe(take(1))
      .subscribe((res) => {
        this.moviesList = res.results;
      });
  }

  getTVShows(type: string, page: number): void {
    this.onTvService.getTVShows(type, page).subscribe((res) => {
      this.tvShowsList = res.results;
    });
  }

  getSeries(): void {
    this.databaseService.getAllSeries().pipe().subscribe((res) => {
      this.seriesList = res.results;
      console.log(res);
    })
  }
}