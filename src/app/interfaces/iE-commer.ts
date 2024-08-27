export interface IECommerceResponse {
 results: Result[];
}

export interface Result{
results: any;
images: string[];
id:          number;
title:       string;
price:       number;
description: string;
category:    Category;
image:       string;
rating:      Rating;
}


export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface Rating {
  rate:  number;
  count: number;
}
