import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';



export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: process.env.REACT_APP_SANITY_API_VERSION, // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.REACT_APP_SANITY_TOKEN
});

const imageBuilder = imageUrlBuilder(client);

export function getImage(source) {
    return imageBuilder.image(source);
}


export async function getAllTrips() {
    return await client.fetch('*[_type == "trip"]')
}
export async function getCategories(category){
    return await client.fetch(`*[_type == $category]`, { category });
}

export async function getTripWithActivity(activity) {
    return client.fetch(`
    *[_type == "trip" && references(*[_type == "activityList" && name == $activity]._id)]{
      _id,
      name,
      cost,
      shortDescription,
      longDescription,
      mainImage,
      slug,
      areaReference->,
      activityReference->,
      climbingAreaReference->
    }
  `, { activity });
}

export async function getTripWithEastAfricaArea(eastAfricaArea) {
    return client.fetch(`
    *[_type == "trip" && references(*[_type == "eastAfricaAreaList" && name == $eastAfricaArea]._id)]{
      _id,
      name,
      cost,
      shortDescription,
      longDescription,
      mainImage,
      slug,
      areaReference->,
      activityReference->,
      climbingAreaReference->
    }
  `, { eastAfricaArea });
}


export async function getTripWithClimbingArea(climbingArea) {
    return client.fetch(`
    *[_type == "trip" && references(*[_type == "climbingAreaList" && name == $climbingArea]._id)]{
      _id,
      name,
      cost,
      shortDescription,
      longDescription,
      mainImage,
      slug,
      areaReference->,
      activityReference->,
      climbingAreaReference->
    }
  `, { climbingArea });
}




export const sendEmail = async (tripInfo) => {
    try {
        const result = await client.create({
            _type: 'emailRequest',
            ...tripInfo,
            createdAt: new Date().toISOString().split('T')[0],
        });
        return {
            success: true,
            message: "Your request has been successfully submitted!",
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to submit your request. Please try again."
        };
    }
};