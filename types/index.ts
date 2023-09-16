import { MouseEventHandler } from "react";
export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit" ;
    rightIcon?: string;
    textStyles?: string;
    isDisabled?: boolean;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}

export interface OptionProps {
    title: string;
    value: string;
}



export interface SaerchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}


export interface CarCardProps {
    car: {
        city_mpg: number;
        class: string;
        combination_mpg:number;
        cylinders:number;
        displacement:number;
        drive:string;
        fuel_type:string;
        highway_mpg:number;
        make:string;
        model:string;
        transmission:string;
        year:number;
            }
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
  }


export interface FilterProps {
    manufacturer: string;
    model: string;
    year: number;
    limit: number;
    fuel: string;
}

export interface HomeProps {
    searchParams: FilterProps;
  }


export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}