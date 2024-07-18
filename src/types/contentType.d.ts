
type ActivityTopic = {
    id: string,
    image: string,
}

type CategoryTopic = {
    id: string,
    image: string,
}


type Trip = {
    _id: string;
    name: string;
    cost: number;
    shortDescription: any[]; // You might want to type this more specifically
    longDescription: any[]; // You might want to type this more specifically
    mainImage: any; // You might want to type this more specifically
    slug: {
        current: string;
    };
    AreaReference: any; // You might want to type this more specifically
    ActivityReference: any; // You might want to type this more specifically
    ClimbingAreaReference: any; // You might want to type this more specifically
}

type Category = {
    _id: number;
    name: string;
    shortDescription: any[];
    mainImage: any;
    slug: {
        current: string;
    };
    link: string;

}

type TripInfo = {
    adults: number;
    children: number;
    arrivalDate: string;
    description: string;
    email: string;
}


type RequestInputInteraction = {
    adults: boolean;
    children: boolean;
    email: boolean;
    arrivalDate: boolean;
    description: boolean;
}



