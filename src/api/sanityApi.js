import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';



export const client = createClient({
    projectId: 'oeam3q7c',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    token: 'skFHryZvzViwBV4ckw7IZlEdoecOxinBDHRZaVfmJSk0rVA3JiNhTeEoWrzM4hylXfp7ySJmjLK7di6al02q3oB56btk1Eu2jo7hTFA2ndaE6UAd85nn48iaJUhDfQqnN8CuyXszMPnkcycaXeFVv6AxZFSxUnKfKJou4fxHj06IZT0XlD8U'
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
            createdAt: new Date().toISOString()
        });
        console.log('Email request created:', result);
        return result;
    } catch (error) {
        console.error('Error creating email request:', error);
        throw error;
    }
};




// export async function createPost(post) {
//     const result = client.create(post)
//     return result
// }

// export async function updateDocumentTitle(_id, title) {
//     return client.patch(_id).set({title})
// }