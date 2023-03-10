import { writeFile } from "fs"
import deliveryClient from "../../utilities/client";

export default async function handler(req, res) {
  if (req.query.secret !== process.env.NAVBUILDER_SECRET) {
    return res
      .status(401)
      .json({ message: "Invalid secret" });
  }

  var urlArr = [];

  const response = await deliveryClient
    .item("root")
    .depthParameter(5)
    .toPromise();

  const mappings = buildNavigationMap(response.data.item, urlArr);

  res.status(200).json(mappings);
}

function buildNavigationMap(root, urlArr) {
  const rootSubpages = root.elements.subpages;
  rootSubpages.linkedItems.map((page) => {
    const url = buildUrl(page.elements.url.value);
    const pageMap = buildMapObject(page, url);
    urlArr.push(pageMap);
    getSubpages(page, urlArr);
  });

  fileOutput(urlArr);

  return urlArr;
}

function getSubpages(page, urlArr, parentUrl = null) {
  const subpagesElement = page.elements.subpages;
  if (subpagesElement.value.length > 0) {
    subpagesElement.linkedItems.map((subpage) => {
      const url = buildUrl(
        subpage.elements.url.value,
        subpage.system.collection,
        parentUrl
      );
      const subpageMap = buildMapObject(subpage, url);
      urlArr.push(subpageMap);
      if (subpage.elements.subpages.value.length > 0) {
        getSubpages(subpage, urlArr, url);
      }
    });
  }
}

function buildUrl(subpageUrl, collection, parentUrl = null) {
  let url;
  if (parentUrl) {
    return (url = `${parentUrl}/${subpageUrl}`);
  }
  if (collection) {
    return (url = `/${collection}/${subpageUrl}`);
  }
  return (url = `/${subpageUrl}`);
}

function buildMapObject(subpage, url) {
  return {
    codename: subpage.system.codename,
    value: {
      url: url,
      collection: subpage.system.collection,
      language: subpage.system.language,
    },
  };
}

function fileOutput(map) {
  writeFile("nav.json", JSON.stringify(map), (err) => {
    if (err) {
      console.error(err);
    }
  });
}
