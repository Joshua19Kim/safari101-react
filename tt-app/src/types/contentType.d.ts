
type Content = Safari | Climbing | DayTrip;

type Safari = {
    id: number;
    attributes: {
        safariName: string;
        safariPrice: number;
        safariDescription: string;
        safariMainImage: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            };
        };
    };
}

type Climbing = {
    id: number;
    attributes: {
        climbingName: string;
        climbingPrice: number;
        climbingDescription: string;
        climbingMainImage: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            };
        };
    };
}

type DayTrip = {
    id: number;
    attributes: {
        dayTripName: string;
        dayTripPrice: number;
        dayTripDescription: string;
        dayTripMainImage: {
            data: {
                id: number;
                attributes: {
                    url: string;
                };
            };
        };
    };
}

