import { createContext } from "react";

export const AppConfigContext = createContext({});

export const initialConfigState = {
  banners: [],
  paymentConfiguation: [
    {
      subscriptionType: "Monthly",
      price: 50,
      pTPoints: 3,
    },
    {
      subscriptionType: "Annually",
      price: 450,
      pTPoints: 40,
    },
  ],
  sortCatergories: [
    { 1: "Latest Videos" },
    { 2: "Popular Now" },
    { 3: "Active TV Originals" },
    { 4: "Free To Watch" },
    { 5: "Favourites" },
  ],
  HomeCatergorySizeAndType: [
    {
      categoryName: "Latest Videos",
      type: "",
      height: "",
      width: "",
    },
    {
      categoryName: "Featured Shows",
      type: "",
      height: "",
      width: "",
    },
    {
      categoryName: "Free To Watch",
      type: "",
      height: "",
      width: "",
    },
    {
      categoryName: "Exclusive Shows",
      type: "",
      height: "",
      width: "",
    },
    {
      categoryName: "Recommend Shows",
      type: "",
      height: "",
      width: "",
    },
    {
      categoryName: "Popular Now",
      type: "",
      height: "",
      width: "",
    },

    
  ],
  ShowsCatergorySizeAndType: [
    {
      categoryName:"Popular Shows",  
      type: "",
      height: "sm",
      width: ""
    },
    {
      categoryName:"React Series",  
      type: "",
      height: "sm",
      width: "sm"
    },
    {
      categoryName:"Exclusives",
      type: "",
      height: "sm",
      width: "sm"
    },
    {
      categoryName:"The Crew Show",
      type: "",
      height: "sm",
      width: "sm"
    },
    {
      categoryName : "Visual Effects",
      type : "",
      height : "sm",
      width : "sm"
    },
    {
      categoryName : "Crew Specials",
      type : "",
      height : "sm",
      width : "sm"
    },
    {
      categoryName : "Filmmaking",
      type : "",
      height : "sm",
      width : "sm"
    },
    {
      categoryName : "Crew Favourites",
      type : "",
      height : "sm",
      width : "sm"
    },
    {
         "categoryName":"Favourites",
      "type": "grid ? swiper",
      "height": "sm",
      "width": "lg"
    }
  ],
};
