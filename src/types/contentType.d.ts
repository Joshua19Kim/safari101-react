
type ActivityTopic = {
    id: string,
    value: string,
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
    tripCategory: string;
    duration: number;
    tripType: string[];
    shortDescription: any[];
    longDescription: any[];
    mainImage: any;
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

type NavLink = DropdownNavLink | SimpleNavLink;

type SortOption = {
    label: string;
    field: 'duration' | 'cost';
    order: 'asc' | 'desc';
};
