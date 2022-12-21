import deliveryClient from "./client";

//API
export async function getRootByCodenameAsync(codename){
    const response = await deliveryClient
    .item(codename)
    .depthParameter(5)
    .toPromise();

    const root = response.data;

    return root
}

export async function getItemsByTypeAsync(type){
    const response = await deliveryClient
    .items()
    .type(type)
    .toPromise();

    return response.data.items;
}

//MAPS

export function getCollectionPathsFromEnv(){
    const collectionsCodenames = process.env.KONTENT_COLLECTIONS.split(",");
    const collectionPaths = collectionsCodenames.map((collectionCodename) => {
    return {
      params: { collection: collectionCodename },
    };
  });
  return collectionPaths
}

export function getPageMap(codename){
  try {
    const data = readFileSync('./nav.json', 'utf8');
    const map = JSON.parse(data);
    const pageArr = map.filter(page => page['codename'] === codename)
    return pageArr[0]
  } catch (err) {
    console.error(err);
  }

}

//FILTERS
export function filterPageByCollection(root, params){
    const pageByCollection = root.item.elements.subpages.linkedItems.filter(
      (page) => page.system.collection === params.collection
    );
  
    return pageByCollection[0];
  }

export function filterItemsByCollection(item, params = {collection: "default"}){
    const itemByCollection = item.filter(
        (i) => i.system.collection === params.collection
      );
    
      return itemByCollection
}

export function filterContentBySystemType(elements, type){
   const itemArray = elements.content.linkedItems.filter(
        (item) => item.system.type === type
      );
    
      return itemArray
}

export function filterSubPageByUrl(parentPage, url){
    const subPage = parentPage.elements.subpages.linkedItems.filter(
        (item) => item.elements.url.value === url
      );
      return subPage[0];
}

export function filterPageMapBySlugAndCollection(map, collection, slug) {
  const page = map.filter((page) => page["value"]["collection"] === collection && page["value"]["slug"] === slug);

  return page[0];
}