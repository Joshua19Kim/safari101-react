
type ContentsTopic = {
    id: string,
    title: string,
    image: string,
    contentLink: string,
}

type Contents = {
    id: number;
    attributes: {
        name: string;
        cost: number;
        shortDescription: string;
        longDescription: string;
        mainImage: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            };
        };
    };
}

type Category = {
    id: number;
    attributes: {
        name: string;
        price: number;
        description: string;
        link: string;
        mainImage: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            };
        };
    };
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



