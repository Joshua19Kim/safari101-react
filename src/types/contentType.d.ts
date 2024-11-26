
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


type SimpleTripInfo = {
    adults: string;
    children: string;
    arrivalDate: Date | null;
}

type TripInfo = {
    description: string;
    clientEmail: string;
} & SimpleTripInfo


type RequestInputInteraction = {
    adults: boolean;
    children: boolean;
    clientEmail: boolean;
    arrivalDate: boolean;
    description: boolean;
}



