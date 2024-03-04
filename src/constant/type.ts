import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

export interface ReviewType {
    meal?: string,
    noOfPeople?: number,
    restaurant?: string,
    dishesOrders?: DishesOrder[]
}

export interface DishesOrder {
    dish?: string,
    noOfSer?: number,
    id: string,
}

export interface Dishes {
    availableMeals: string[],
    id: number,
    name: string,
    restaurant: string

}

export interface ReviewSLiceType {
    review: ReviewType,
    isValid?: boolean,
    dishesList?: Dishes[],
    errors: []
}

export interface ChildComponentProps {
    reviewDataPass: ReviewSLiceType,
    register: UseFormRegister<FieldValues>,
    errors:FieldErrors<FieldValues>,
}