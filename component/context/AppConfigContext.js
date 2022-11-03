import { createContext } from "react"

export const AppConfigContext = createContext({})

export const initialConfigState = {
  banners: [],
  paymentConfiguation:[
    {
      subscriptionType:"Monthly",
      price:50,
      pTPoints:3
    },
    {
      subscriptionType:"Annually",
      price:450,
      pTPoints:40
    },
  ],
  sortCatergories: [
      {"1": "Latest Shows"},
      {"2": "Popular Now"},
      {"3": "Active TV Originals"},
      {"4": "Free To Watch"},
      {"5": "Favourites"}
  ],
  setCatergorySizeAndType: [
    {
      categoryName:"Latest Shows",  
      type: "",
      height: "",
      width: ""
    },
    {
      categoryName:"Popular Shows",  
      type: "",
      height: "",
      width: ""
    },
    {
      categoryName:"Active TV Originals",
      type: "",
      height: "",
      width: ""
    },
    {
      categoryName:"Free To Watch",
      type: "",
      height: "",
      width: ""
    },
    {
         "categoryName":"Favourites",
      "type": "grid ? swiper",
      "height": "sm",
      "width": "lg"
    }
  ]
    }