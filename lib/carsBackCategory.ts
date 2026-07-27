// Shared sessionStorage key: CarsGrid writes the selected tab here right
// before navigating to a car's detail page, and the detail page's back
// arrow reads it back, so the "Find a car" category survives the trip
// without ever showing up in either page's URL.
export const BACK_CATEGORY_KEY = "modikia:cars-back-category";
