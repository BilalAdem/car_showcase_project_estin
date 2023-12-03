import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "b29c122d38mshffa8d90fdf0242ep16c8f4jsn49e42cd373eb",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&limit=${limit}&fuel_type=${fuel}`;

  const response = await fetch(url, { headers });
  const responseData = await response.json();
  return responseData;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 100; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarsImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle || 0}`);
  return url.toString();
};

export const generateCostumeCarsImageUrl = (
  make: string,
  model: string,
  year: string,
  angle?: string
) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle || 0}`);
  return url.toString();
};

export const UpdateParams = (type: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(type, value);
  const newPathName = `${window.location.pathname}?${params.toString()}`;
  return newPathName;
};
