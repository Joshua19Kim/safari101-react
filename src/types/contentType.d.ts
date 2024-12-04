
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
    shortDescription: any[];
    longDescription: any[];
    mainImage: any;
    slug: {
        current: string;
    };
    AreaReference: any;
    ActivityReference: any;
    ClimbingAreaReference: any;
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
    selectedOptions: string[];
    selectedTripName: string;
    selectedTripPrice: string;
    selectedTripDescription: string;
} & SimpleTripInfo


type RequestInputInteraction = {
    adults: boolean;
    children: boolean;
    clientEmail: boolean;
    arrivalDate: boolean;
    description: boolean;
    selectedOptions: boolean;
    selectedTripName: boolean;
    selectedTripPrice: boolean;
    selectedTripDescription: boolean;
}



